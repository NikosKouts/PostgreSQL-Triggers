const express = require('express');
const db = require('../db/pool');

const router = express.Router();

router
  // return all available students
  .get('/all', async (req, res) => {
    try{
      
      let result = await db.query(
        'SELECT *       \
         FROM students  \
         INNER JOIN members ON students.id_pk_fk = members.id_pk'
      );

      res.status(200).json(result.rows)
      
    } catch (error){
      res.status(500).json({'message': error.message})
    }
  })
  // return a student with a certain id 
  .get('/:student', async (req, res) => {
    const { student } = req.params
    
    try {

      let result = await db.query(
        'SELECT * \
         FROM students \
         INNER JOIN members ON students.id_pk_fk = members.id_pk \
         WHERE members.id_pk = $1', [student]
      ) 
      
      res.status(200).json(result.rows)
    
    } catch(error){
      res.status(500).json({'message': error.message})
    }
  })
  // register a new student 
  .put('/register', async (req, res) => {
    const data = {id, university, first_name, last_name, email, phone, student_id, semester, gpa} = req.body
    
    if(!id || !university || !first_name || !last_name || !email || !phone || !student_id || !semester || !gpa){
      // send error message and exit
      return res.status(400).json({'message':error.message})
    }
      
    try {
      // start transaction
      await db.query('BEGIN')
    
      // insert into the database
      let result = await db.query(
        'INSERT INTO members_disjoint_students      \
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) \
         RETURNING *', [id, university, first_name, last_name, email, phone, student_id, semester, gpa])
      
      // finish transaction
      await db.query('COMMIT')
      
      return res.status(200).json(result.rows[0])
      
    } catch (error) {
        // rollback when failed transaction
        await db.query('ROLLBACK')

        // send error message and exit
        return res.status(400).json({'message':error.message})
      }
  })
  // delete a student with a certain id
  .delete('/:student', async (req, res) => {
    const { student } = req.params
    
    try {
      // start transaction
      await db.query('BEGIN')
    
      // insert into the database
      let result = await db.query(
        'DELETE FROM students \
         WHERE students.id_pk_fk = $1  \
         RETURNING *', [student]
      )
      
      // finish transaction
      await db.query('COMMIT')
      
      return res.status(200).json(result.rows[0])
    } catch(error){
      // rollback when failed transaction
      await db.query('ROLLBACK')

      // send error message and exit
      return res.status(400).json({'message':error.message})
    }
  })

  
module.exports = router;