/* eslint-env node */
module.exports = {
    env: { jest: true },
    extends: [ "plugin:jest/all" ],
    rules: {
        "jest/prefer-expect-assertions": "off",
        "no-secrets/no-secrets": "off",
        "jest/lowercase-name": [
            "error",
            { ignore: [ "describe" ]}
        ]
    }
};
