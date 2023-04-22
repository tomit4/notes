const mathOperations = require('../calculator')

describe("Calculator tests", () => {
    test('adding 1 + 2 should return 3', () => {
        // arrange and act
        expect(mathOperations.sum(1,2)).toBe(3)
    })

    test("subtracting 2 from 10 should return 8", () => {
        // arrange and act
        let result = mathOperations.diff(10,2)
        // assert
        expect(result).toBe(8)
    })

    test("multiplying 2 and 8 should return 16", () => {
        // arrange and act
        let result = mathOperations.product(2,8)
        // assert
        expect(result).toBe(16)
    })
})
