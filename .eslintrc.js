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
        "require-atomic-updates": "off"
    }
};
