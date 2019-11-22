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
        // This rule has many false positives in this codebase
        "require-atomic-updates": "off",
        "no-warning-comments": "warn",
        "no-process-env": "off",
        // This rule causes issues with dynamically importing the hedera SDK
        "@typescript-eslint/no-extra-parens": "off",
        // This rule causes false positives with watch
        "@typescript-eslint/unbound-method": "off",
        // todo [2020-01-01]: re-evaluate if these are false-positives
        // the following vue rules have many false positives in this codebase
        "vue/valid-v-bind": "off",
        "vue/no-parsing-error": "off",
        "vue/valid-v-for": "off",
        "vue/valid-v-if": "off",
        "vue/valid-v-on": "off",
        // boost the line length to 120 to avoid conflicting rules
        "max-len": [
            "error", {
                code: 120,
                ignoreStrings: true,
                ignoreComments: true,
                ignoreTemplateLiterals: true
            }
        ],
    }
};
