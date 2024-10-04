const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../index');

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => {console.log("Connection to MongoDB established.")},
            err => {console.log("Failed to connect to MongoDB.")}
        )
});

afterEach(async () => {
    await mongoose.connection.close()
});

describe("For /api/users requests", () => {

})

describe("For /api/users/{username} requests", () => {
    
})

describe("For /api/users requests", () => {
    
})