const mongoose = require('mongoose');
const request = require('supertest');   // To make http calls

const app = require('../index');

const helpers = require('../services/user.service');

// Connect with db before each test
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => {console.log("Connection to MongoDB from Jest established.")},
            err => {console.log("Failed to connect to MongoDB.")}
        )
});

// Close the connection to db after each test
afterEach(async () => {
    await mongoose.connection.close()
});

describe("Test for /api/users requests", () => {
    // it() is an alias of test()
    it("GET /api/users", async() => {
        const result = await request(app).get("/api/users");    // Supertest is used.

        expect(result.statusCode).toBe(200);
        expect(result.body.status).toBeTruthy();        // the `status` we defined in the controller
        expect(result.body.data.length).toBeGreaterThan(0);    // data should exist
    }, 10000)   // 10000ms timeout, not necessary since it is given as argument in script call inside package.json

    it("POST /api/users request", async() => {
        const res = await request(app).post("/api/users")
            .send({
                username: "test4",
                password: "12345",
                name: "name4",
                surname: "surname4",
                email: "test@test.gr",
                address: {
                    area: "area4",
                    read: "road4"
                }
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBeTruthy();
    })

    // Check if the creation of a user that already exists is not allowed.
    it("POST /api/users request check for existing user", async() => {
        const res = await request(app).post("/api/users")
            .send({
                username: "test4",
                password: "12345",
                name: "name4",
                surname: "surname4",
                email: "test@test.gr",
                address: {
                    area: "area4",
                    read: "road4"
                }
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeFalsy();
    })
})

describe("Tests for /api/users/{username} requests", () => {
    it("GET /api/users/{username}", async() => {
        const result = await helpers.findLastInsertedUser();
        console.log(result);

        const res = await request(app).get('/api/users/' + result.username);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email)
    })

    it("PATCH for /api/users/{username}", async() => {
        const result = await helpers.findLastInsertedUser();
        const res = await request(app)
            .patch('/api/users/' + result.username)
            .send({
                name: "newTest4",
                surname: "newTest4",
                email:"xxx@aueb.gr",
                address: {
                    area: "new area",
                    road: "new road"
                }
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.name).toBe(result.name); // returns the object as it was before the update
        expect(res.body.data.surname).toBe(result.surname);
    })

    it("DELETE /api/users/{username}", async () => {
        const result = await helpers.findLastInsertedUser();

        const res = await request(app).delete('/api/users/' + result.username);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })
})
