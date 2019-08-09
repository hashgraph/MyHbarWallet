module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:vue/recommended",
        "@vue/prettier",
        "@vue/typescript",
        "plugin:compat/recommended",
        "plugin:unicorn/recommended"
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    settings: {
        "import/extensions": [".js", ".ts"],
        "import/resolver": {
            webpack: {},
            typescript: {}
        },
        polyfills: [
            // TODO: Actually add this as a polyfill via webpack
            "BigInt"
        ]
    },
    rules: {
        indent: ["error", 4],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

        // Require Object Literal Shorthand Syntax
        // https://eslint.org/docs/rules/object-shorthand
        "object-shorthand": ["error", "always"],

        // Vue
        // https://eslint.vuejs.org/rules/#uncategorized
        "vue/array-bracket-spacing": "error",
        "vue/arrow-spacing": "error",
        "vue/block-spacing": "error",
        "vue/brace-style": "error",
        "vue/camelcase": "error",
        "vue/comma-dangle": "error",
        "vue/component-name-in-template-casing": "error",
        "vue/eqeqeq": ["error", "smart"],
        "vue/key-spacing": "error",
        "vue/match-component-file-name": "error",
        "vue/no-boolean-default": "error",
        "vue/object-curly-spacing": ["error", "always"],
        "vue/script-indent": ["error", 4],
        "vue/space-infix-ops": "error",
        "vue/space-unary-ops": "error",
        "vue/v-on-function-call": "error",

        // Unicorn
        "unicorn/filename-case": false,
        "unicorn/prevent-abbreviations": false
    }
};
