const express = require('express');
const app = express();
const port = 3000;

// Here we specify that inside the http body there is a JSON.
app.use(express.json())

// POST method on `/user`
app.post('/user', (req, res) => {
    console.log(req.body);
    res.send(`Post request: ${req.body.name} ${req.body.surname}`);
})

app.listen(port, (req, res) => {
    if (req) {
        console.log(`Server is running on localhost:${port}`);
    }
})
