const express = require('express');
const app = express();
const port = 3000;

// Here we specify that inside the http body is a JSON.
app.use(express.json())

// For decoding characters on the submit pressed
app.use(express.urlencoded({extended:true}))

// Inside a folder called `files` there are static html pages. 
app.use('/', express.static('files'));

// Endiamesi synartisi (filter)
const logger = (req, res, next) => {
    let url = req.url;
    let time = new Date();
    console.log('Received request from ' + url + 'at' + time);
    next();
}

// app.get('/public', (req, res) => {
//     console.log("This is a get request.")
//     res.send("This is a public request.")
// })

app.get('/public', logger, (req, res) => {
    console.log("This is a get request.")
    res.send("This is a public request.")
})

// POST method on `/user`
app.post('/user', (req, res) => {
    console.log(req.body);
    res.send(`Post request: ${req.body["name"]} ${req.body.surname}`);
})


app.post('/userForm', (req, res) => {
    if (req) {
        console.log(req.body)
        res.send(req.body.firstname + req.body.surname + req.body.email + req.body.sex);
    }
})

app.listen(port, (req, res) => {
    if (req) {
        console.log(`Server is running on localhost:${port}`);
    }
})
