/* eslint-env node */
module.exports = {
    root: true,
    extends: [
        "@launchbadge/eslint-config/vue",
        "@launchbadge/eslint-config/vue-typescript"
    ],
    // parserOptions: {
    //     project: "./tsconfig.json",
    //     extraFileExtensions: [ ".vue" ]
    // },
    rules: {
        // v-html is used for rich text formatting for i18n
        "vue/no-v-html": "off",

        // This rule has many false positives in this codebase
        "require-atomic-updates": "off",

        // this lint only works on static imports
        // it is used to enforce dynamically importing the Hedera sdk
        "no-restricted-imports": [
            "error",
            {
                name: "@hashgraph/sdk",
                message: "The hashgraph sdk must be imported dynamically"
            }
        ]
    }
};
