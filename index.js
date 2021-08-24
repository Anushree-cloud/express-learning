const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const members = require('./Members')
// const logger = require('./middleware/logger')

const app = express() //creates express application


//initializing expressHandlebar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//initializing body parser middleware
app.use(express.json())
//to read url-encoded data
app.use(express.urlencoded({ extended: false }))


//home page route
app.use('/', (req, res) => {
    res.render('home', {
        title: 'Member App',
        members
    })
})


//set static folder
app.use(express.static(path.join(__dirname, 'public'))) // use method is for sending all the files inside a static folder.


//routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server listening to http://localhost:${PORT}`))






//initializing middleware function
// app.use(logger)

//route
// app.get('/', (req, res) => {
//     // res.send('<h1>Backend with EXPRESS</h1>') //print on browser screen
//     res.sendFile(path.join(__dirname, 'public', 'index.html')) //path.join is for including files or folders
// })