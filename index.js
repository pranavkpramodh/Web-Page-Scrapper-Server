// import express
const express = require('express');
// import cors
const cors = require('cors');
const dataServices = require('./Services/dataservice');
// create an application using express
const app = express();
// use server parser for the server response
app.use(express.json());
// using cors specify the origin to the server 
app.use(cors({
    origin:[ 'http://localhost:4200' ]
}))
// setup a port number
app.listen(3000, () => {
    console.log('listening on port 3000');
})


app.post('/getinsights', (req, res) => {
    console.log(req.body);
    dataServices.getInsights(req.body.searchedUrl )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})

app.get('/getalldata', (req, res) => {
    dataServices.getAllData()
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})

app.put('/addfav', (req, res) => {
    dataServices.addfav(req.body.id )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})
app.put('/removefav', (req, res) => {
    dataServices.removefav(req.body.id )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})


app.delete('/remove/:id', (req, res) => {
    dataServices.remove(req.params.id)
    .then(result => {
            res.status(result.statusCode).json(result)
        }
    )
})

