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
            typescript: {
                alwaysTryTypes: true
            }
        },
        polyfills: [
            // TODO: Actually add this as a polyfill via webpack
            "BigInt"
        ]
    },
    rules: {
        indent: ["error", 4],

        // FIXME: Make these error on build
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

        // Broken in eslint@6.x
        // See https://github.com/benmosher/eslint-plugin-import/issues/1341
        "import/named": "off",

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
        "unicorn/filename-case": "off",
        "unicorn/prevent-abbreviations": "off",

        // Typescript
        "no-var": "error",
        "prefer-const": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/camelcase": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/interface-name-prefix": "error",
        "@typescript-eslint/member-delimiter-style": "error",
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/type-annotation-spacing": "error"
    }
};
