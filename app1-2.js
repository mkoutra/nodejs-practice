const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// Create a server that listens on localhost:3000

// Accepts requests and sends responses
const server = http.createServer((req, res) => {
    // If there is a request
    if (req) {
        console.log("This is a request");
        res.setHeader('Content-Type', 'text/plain');    // Type of sent message is text
        res.end("Hello World\n");                       // The text of the response
    }
})

server.listen(port, hostname, () => {
    // This is a callback function.
    console.log(`Server running at ${hostname}:${port}`)
})