const mathOperations = require('../index');

// With describe we define a block of tests we want to perform.
describe("Calculator Tests", () => {
    test("Addition of 2 numbers", () => {
        let result = mathOperations.sum(1, 2);
        expect(result).toBe(3);
    })

    test("Subtraction of 2 numbers", () => {
        let result = mathOperations.diff(10, 3);

        expect(result).toBe(7);
    })

    test("Multiplication of 2 numbers", () => {
        let result = mathOperations.mult(4, 4);

        expect(result).toBe(161);   // error
    })

    test("Division of 2 numbers", () => {
        let result = mathOperations.divide(10, 5);

        expect(result).toBe(2);
    })
})

// describe("Test only sums", () => {

// })

// describe("Test only difs", () => {

// })