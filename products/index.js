const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');   // document
const cors = require('cors');

const mongoose = require('mongoose');

// We define the addresses that can make a request to our server
app.use(cors({
    origin: ['http://localhost:8000', 'http://www.aueb.gr']
}))

app.use(express.json());                        // To read input json in body
app.use(express.urlencoded({extended: true})); // To read the form

// When / is required show that files inside the `files` directory
app.use('/', express.static('files'));

// process.env is used to read from .env file
// Connect returns a Promise object
mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => { console.log(`Connection to MongoDB established.`)},
            err => { console.log('Failed to connect to MongoDB.')}   // In case of error
        )


const user = require('./routes/user.routes')
const userProduct = require('./routes/user.product.routes');
const product = require('./routes/product.routes');

// When you receive a call to `/api/user` go to file user.routes.js
// and check the call types that exist there.
// There is a `get()` methods with `/` as entry path 

// /api/user is a prefix of the final end-point
app.use('/api/users', user);

// User actions related to products
app.use('/api/user-product', userProduct);

app.use('/api/products', product)

app.use('/api-docs',
        swaggerUi.serve,    // a new server for backend documentation
        swaggerUi.setup(swaggerDocument.options))

module.exports = app;