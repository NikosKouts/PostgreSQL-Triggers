const express = require('express');
const db = require('../db/pool');

const router = express.Router();

router
  // return all available courses
  .get('/all', async (req, res) => {
    try {
      
      let result = await db.query
      (
        'SELECT * \
         FROM courses'
      )
      
      res.status(200).json(result.rows)

    } catch(error){
      res.status(500).json({'message':error.message})
    }
  })
  // return courses registered a certain university
  .get('/university/:university', async (req, res) => {
    const {university} = req.params

    try {
      
      let result = await db.query(
        'SELECT *       \
         FROM courses   \
         WHERE courses.university_pk_fk = $1', [university]
      )
      
      res.status(200).json(result.rows)

    } catch(error){
      return res.status(500).json({'message':error.message})
    }
  })
  // return courses that a certain professor is teaching
  .get('/professor/:professor', async (req, res) => {
    const { professor } = req.params

    try {
      
      let result = await db.query(
        'SELECT *     \
         FROM courses \
         WHERE courses.professor_id_fk = $1', [professor]
      )
      
      res.status(200).json(result.rows)

    } catch(error){
      return res.status(500).json({'message':error.message})
    }
  })
  // return courses that a certain student attends
  .get('/student/:student', async (req, res) => {
    const { student } = req.params

    try {
      
      let result = await db.query(
        'SELECT * FROM attends  \
        INNER JOIN courses ON attends.course_id_pk_fk = courses.id_pk \
        WHERE attends.student_id_pk_fk = $1', [student]
      )
      
      res.status(200).json(result.rows)

    } catch(error){
      return res.status(500).json({'message': error.message})
    }
  })
  // return students that are registered to a certain course
  .get('/:course/:university/students', async (req, res) => {
    const { course, university } = req.params

    try {
      
      let result = await db.query(
        'SELECT * FROM attends                                                \
         INNER JOIN students ON attends.student_id_pk_fk = students.id_pk_fk  \
         INNER JOIN members ON students.id_pk_fk = members.id_pk              \
         WHERE attends.course_id_pk_fk = $1 AND attends.university_name_pk_fk = $2', [course, university]
      )
      
      res.status(200).json(result.rows)

    } catch(error){
      return res.status(500).json({'message':error.message})
    }
  })
  // register a new university course
  .put('/register', async (req, res) => {
    const { id, university, name, professor } = req.body;

    try {
        // start transaction
        await db.query('BEGIN')
      
        // insert into the database
        let result = await db.query(
          'INSERT INTO courses      \
           VALUES($1, $2, $3, $4)   \
           RETURNING *', [id, university, professor, name])
        
        // finish transaction
        await db.query('COMMIT')
        
        return res.status(200).json(result.rows[0])

    } catch (error){
      
      // rollback when failed transaction
      await db.query('ROLLBACK')

      return res.status(400).json({'message': error.message})
    }
  })
  // register a student to a course 
  .put('/:student/register', async (req, res) => {
    const { course, university } = req.body;
    const { student } = req.params;

    try {
        // start transaction
        await db.query('BEGIN')
      
        // insert into the database
        let result = await db.query(
          'INSERT INTO attends      \
           VALUES($1, $2, $3)       \
           RETURNING *', [student, course, university]
        )
        
        // finish transaction
        await db.query('COMMIT')
        
        return res.status(200).json(result.rows[0])

    } catch (error){
      
      // rollback when failed transaction
      await db.query('ROLLBACK')

      return res.status(400).json({'message': error.message})
    }
  })
  // delete a student from a course
  .delete('/:student/:course/:university', async (req, res) => {
    const { student, course, university } = req.params
    
    try {

      // start transaction
      await db.query('BEGIN')

      // delete from the database
      let result = await db.query(
        'DELETE FROM attends                    \
         WHERE attends.student_id_pk_fk = $1    \
         AND attends.course_id_pk_fk = $2       \
         AND attends.university_name_pk_fk = $3 \
         RETURNING *', [student, course, university]
      )

      // finish transaction
      await db.query('COMMIT')
      console.log(result.rows);
      // send the object that was deleted as a response
      return res.status(200).json(result.rows[0])

    } catch(error){
      // rollback when failed transaction
      await db.query('ROLLBACK')

      // send error message and exit
      return res.status(400).json({'message': error.message})
    }
  })
  // delete a course from database
  .delete('/:course/:university', async (req, res) => {
    const { course, university } = req.params
    
    try {

      // start transaction
      await db.query('BEGIN')

      // delete from the database
      let result = await db.query(
        'DELETE FROM courses  \
         WHERE courses.id_pk = $1 AND courses.university_pk_fk = $2 \
         RETURNING *', [course, university]
      )

      // finish transaction
      await db.query('COMMIT')
      console.log(result.rows);
      // send the object that was deleted as a response
      return res.status(200).json(result.rows[0])


    } catch(error){
      // rollback when failed transaction
      await db.query('ROLLBACK')

      // send error message and exit
      return res.status(400).json({'message': error.message})
    }
  })


module.exports = router