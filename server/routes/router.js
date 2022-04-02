const universities = require('./universities')
const professors = require('./professors')
const students = require('./students')
const courses = require('./courses')

module.exports = (app) => {
  app.use('/universities', universities)
  app.use('/professors', professors)
  app.use('/students', students)
  app.use('/courses', courses)
};