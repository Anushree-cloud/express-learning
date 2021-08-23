const express = require('express')
const path = require('path')
const members = require('./Members')
const logger = require('./middleware/logger')

const app = express() //creates express application

//initializing middleware function
app.use(logger)

//route
// app.get('/', (req, res) => {
//     // res.send('<h1>Backend with EXPRESS</h1>') //print on browser screen
//     res.sendFile(path.join(__dirname, 'public', 'index.html')) //path.join is for including files or folders
// })

//get all members
app.get('/api/members', (req, res) => {
    res.json(members)
})

app.get('/api/members/:id', (req, res) => {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)))
})

//set static folder
app.use(express.static(path.join(__dirname, 'public'))) // use method is for sending all the files inside a static folder.

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server listening to http://localhost:${PORT}`))