/* eslint-env node */
module.exports = {
    env: {
        jest: true
    },
    extends: ["plugin:jest/all"],
    rules: {
        "jest/prefer-expect-assertions": "off",
        "jest/lowercase-name": [
            "error",
            {
                ignore: ["describe"]
            }
        ]
    }
};
