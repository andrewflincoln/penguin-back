//initialize
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')

const port = process.env.PORT || 3000

const penguins = ['Barry', 'Jack', 'Milo', 'Kate', 'Brody']

//middleware
app.use(bodyParser.json())
app.use(morgan('dev'))


//routes
app.get('/penguins', (req, res) => {
    res.status(200).send(penguins)
})
app.post('/penguins', (req, res) => {
    penguins.push(req.body.name)
    res.status(201).send(`Created penguin ${req.body.name}`)
})
app.delete('/penguins', (req, res) => {
    let toDel = penguins.find((peng) => peng === req.body.name)
    penguins.splice(penguins.indexOf(toDel), 1)
    res.send(`Deleted penguin ${toDel}`) 
})



app.use((err, req, res, next) => {
    res.status(404).json({error: {status: 404, message: `Penguin not found.`}})
})

//start server
app.listen(port, () => console.log("Good morning online penguin personalities you're listening to 3000!") )