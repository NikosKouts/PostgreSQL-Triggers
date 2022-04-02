const express = require('express');
const db = require('../db/pool');

const router = express.Router();


router
  // returns every information stored about the available universities 
  .get('/all', async (req, res) => {
    try {
      
      let result = await db.query(
        'SELECT * \
         FROM universities'
      );
      
      res.status(200).json(result.rows)
      
    } catch(error){
      res.status(500).json({'message':error.message})
    }
  })
  // returns every professor registered at a certain university
  .get('/:university/professors', async (req, res) => {
    const { university } = req.params
    
    try {
      let result = await db.query(
        'SELECT *                                                             \
         FROM universities                                                    \
         INNER JOIN members ON universities.name_pk = members.university_fk   \
         WHERE universities.name_pk = $1 AND members.id_pk IN (               \
           SELECT professors.id_pk_fk                                         \
           FROM professors                                                    \
         )', [university]
      )
      
      
      res.status(200).json(result.rows)
    } catch(error){
      res.status(500).json({'message':error.message})
    }
  })
  // returns every student registerd at a certain university
  .get('/:university/students', async (req, res) => {
    const { university } = req.params

    try {
      let result = await db.query(
        'SELECT *                                                               \
         FROM universities                                                      \
         INNER JOIN members ON universities.name_pk = members.university_fk     \
         INNER JOIN students ON members.id_pk = students.id_pk_fk               \
         WHERE universities.name_pk = $1', [university]
      )
      
      
      res.status(200).json(result.rows)
    } catch(error){
      res.status(500).json({'message':error.message})
    }
  })
  // returns every course that a certain university entails
  .get('/:university/courses', async (req, res) => {
    const { university } = req.params

    try {
      // each field is written to rename courses.id_pk as course_id
      let result = await db.query(
        'SELECT *                                                               \
         FROM universities                                                      \
         INNER JOIN courses ON universities.name_pk = courses.university_pk_fk  \
         WHERE universities.name_pk = $1', [university]
      )
      
      res.status(200).json(result.rows)

    } catch(error){
      res.status(500).json({'message':error.message})
    }
  })
  // register a new university at database
  .put('/register', async (req, res) => {
    const { name, country, region} = req.body
    
    // check invalid data
    if(!name || !country || !region)
      return res.status(400).json({'message':'Invalid JSON Format'})

    try {
      
      // start transaction
      await db.query('BEGIN')

      // insert into the database
      let result = await db.query(
        'INSERT INTO universities  \
         VALUES ($1, $2, $3, 0, 0, 0) RETURNING *', [name, country, region]
      )

      // finish transaction
      await db.query('COMMIT')
      
      // send the object that was inserted as a response
      return res.status(200).json(result.rows[0])


    } catch (error) {
      // rollback when failed transaction
      await db.query('ROLLBACK')

      // send error message and exit
      return res.status(400).json({'message': error.message})
    }
  })
  // delete a university from database
  .delete('/:university', async (req, res) => {
    const { university } = req.params
    try {

      // start transaction
      await db.query('BEGIN')

      // delete from the database
      let result = await db.query(
        'DELETE FROM universities  \
         WHERE universities.name_pk = $1 RETURNING *', [university]
      )

      // finish transaction
      await db.query('COMMIT')
      
      // send the object that was inserted as a response
      return res.status(200).json(result.rows[0])


    } catch(error){
      // rollback when failed transaction
      await db.query('ROLLBACK')

      // send error message and exit
      return res.status(400).json({'message': error.message})
    }
  })

  
module.exports = router;