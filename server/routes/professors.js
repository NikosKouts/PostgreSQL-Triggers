const express = require('express');
const db = require('../db/pool');

const router = express.Router();

router
  // return all available professors
  .get('/all', async (req, res) => {
    try{
      
      let result = await db.query(
        'SELECT *         \
         FROM professors  \
         INNER JOIN members ON professors.id_pk_fk = members.id_pk'
      );
      res.status(200).json(result.rows)
      
    } catch (error){
      res.status(500).json({'message':error.message})
    }
  })
  //return professor with a certain id
  .get('/:id', async (req, res) => {
    const { id } = req.params

    try{
      
      let result = await db.query(
        'SELECT *                                                   \
         FROM professors                                            \
         INNER JOIN members ON professors.id_pk_fk = members.id_pk  \
         WHERE members.id_pk = $1', [id]
      );
      res.status(200).json(result.rows)
      
    } catch (error){
      res.status(500).json({'message':error.message})
    }
  })
  //register a new professor into the database
  .put('/register', async (req, res) => {
    const {id, first_name, last_name, email, phone, experience, salary, specialty, university} = req.body
        
    try {
      // start transaction
      await db.query('BEGIN')
      
      // insert into the database
      let result = await db.query(
        'INSERT INTO members_disjoint_professors    \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)  \
        RETURNING *' , [id, university, first_name, last_name, email, phone, experience, salary, specialty]
      )
      
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
  //delete a certain professor from the database
  .delete('/:professor', async (req, res) => {
    const { professor } = req.params

    try {

      // start transaction
      await db.query('BEGIN')

      // delete from the database
      let result = await db.query(
        'DELETE FROM professors  \
         WHERE professors.id_pk_fk = $1 RETURNING *', [professor]
      )

      // finish transaction
      await db.query('COMMIT')
      
      // send the object that was deleted as a response
      return res.status(200).json(result.rows[0])


    } catch(error){
      // rollback when failed transaction
      await db.query('ROLLBACK')

      // send error message and exit
      return res.status(400).json({'message': error.message})
    }
  })

  
module.exports = router;