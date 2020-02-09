/* eslint-env node */
module.exports = {
    root: true,
    extends: [
        "@launchbadge/eslint-config/vue",
        "@launchbadge/eslint-config/vue-typescript"
    ],
    rules: {
        // v-html is used for rich text formatting for i18n
        "vue/no-v-html": "off",

        // this rule has many false positives in this codebase
        "require-atomic-updates": "off",

        // default rule is for 2-space indent
        "vue/html-indent": [ "warn", 4 ],

        // this isn't a library so we don't need to be as strict
        "@typescript-eslint/member-naming": "off",

        //
        // what follows is several rules that aren't _that_ important to
        // fix at this time. we should go back and fix these in the
        // future
        //

        "new-cap": "off",
        "no-plusplus": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/class-name-casing": "off",
        "@typescript-eslint/require-await": "off",
        "import/named": "off",
        "no-return-assign": "warn",
        "default-case": "warn",
        "promise/always-return": "warn",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "import/default": "off",
        "implicit-arrow-linebreak": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-collapsible-if": "off",
        "sonarjs/no-small-switch": "off",
        "no-undef": "warn",
        "no-secrets/no-secrets": "off",
        "no-mixed-operators": "off",
        "sonarjs/no-identical-functions": "warn",
        "radix": "off",
        "sonarjs/cognitive-complexity": "warn",
        "@typescript-eslint/no-require-imports": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "consistent-return": "warn",
        "promise/catch-or-return": "warn",
        "no-undefined": "off",
        "@typescript-eslint/unified-signatures": "off",
        "function-paren-newline": "off",
        "max-len": "off",
        "no-param-reassign": "off",
        "require-unicode-regexp": "off",
        "require-await": "off",
        "unicorn/no-unsafe-regex": "warn"
    }
};
