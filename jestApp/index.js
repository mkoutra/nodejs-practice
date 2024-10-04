const mathOperations = {
    sum: function(a, b) {
        return a + b;
    },

    diff: function(a, b) {
        return a - b;
    },

    mult: function(a, b) {
        return a * b;
    },

    divide: function(a, b) {
        if (b == 0) return 0;
        return a / b;
    }
}

module.exports = mathOperations;