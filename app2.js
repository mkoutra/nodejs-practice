// Create a server that creates a file and returns it on response.
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');

const osType = os.type();
const osArch = os.arch();

console.log(osType);    // OS Type
console.log(osArch);    // OS Architecture

const htmlContent= `<!DOCTYPE html>
                        <html>
                            <h3>Your OS is ${osType} with architecture ${osArch}</h3>
                        </html>`;
const server = http.createServer((req, res) => {
    if (req) {
        // Write on file `index.html` the contents of `htmlContent`.
        // If error occurs then put it on err and print `Problem in writing file`,
        // otherwise ...
        fs.writeFile('./index.html', htmlContent, err => {
            if (err) {
                console.log("Problem in writing file", err);
            } else {
                // If no error occurs then read from `index.html` file
                fs.readFile('index.html', (err, content) => {
                    if (err) {
                        console.log("Problem in reading file.");
                    } else {
                        console.log("Request arrived.");
                        res.setHeader('Content-Type', 'text/html');
                        res.end(content);   // content is the result of the reading the file.
                    }
                })
            }
        });
    } else {
        console.log("Problem in request's arrival.");
    }
})

// Message for us to verify that server is running
server.listen(3000, 'localhost', () => {
    console.log('Server is running on localhost:3000');
})