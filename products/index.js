const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

app.use(express.json());    // To read input json in body

// process.env is used to read from .env file
// Connect returns a Promise object
mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => { console.log(`Connection to MongoDB established.`)},
            err => { console.log('Failed to connect to MongoDB.')}   // In case of error
        )


const user = require('./routes/user.routes')
const userProduct = require('./routes/user.product.routes');

// When you receive a call to `/api/user` go to file user.routes.js
// and check the call types that exist there.
// There is a `get()` methods with `/` as entry path 

// /api/user is a prefix of the final end-point
app.use('/api/users', user);

// User actions related to products
app.use('/api/user-product', userProduct);

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})