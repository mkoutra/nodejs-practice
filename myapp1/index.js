const express = require('express'); // Import `express` library
const app = express();              // app is something like alias for express
const port = 3000;                  // TCP port

// GET request arrived On localhost:3000 (this is `/`)
app.get('/', (req, res) => {
    if (req) {
        res.send("Hello World!")
    }
})

// GET request arrived on localhost:3000/about
app.get('/about', (req, res) => {
    console.log("'About' request");
    res.send("This is the 'about' page.")
})

// GET request arrived on localhost:3000/login
app.get('/login', (req, res) => {
    console.log("Login Request");
    res.send("This is the 'login' page");
})


// tested with 127.0.0.1:3000/user?name=Bob&surname=Dylan&age=81
app.get('/user', (req, res) => {
    let query = req.query;  // returns a json with parameters and their values
    console.log(query)

    let name = query.name;
    let surname = query.surname;
    let age = query.age;

    res.send("Name: " + name + " Surname: " + surname + " Age:" + age);
})

// Path parameters /value1/value2/value3
// tested with 127.0.0.1:3000/details/Bob/Dylan/81
app.get('/details/:name/:surname/:age', (req, res) => {
    let params = req.params;    // returns a json
    console.log(params);

    let name = params.name;
    let surname = params.surname;
    let age = params.age;

    res.send("Name: " + name + " Surname: " + surname + " Age: " + age);
})

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
});