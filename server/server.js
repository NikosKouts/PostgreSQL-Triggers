const express = require('express')
const cors = require('cors')
const router = require('./routes/router')

const PORT = 8080
const app = express();

//Middleware
app.use(cors());
app.use(express.json())
router(app)


app.listen(PORT)
console.log(`Listening at Port: ${PORT}`)