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
        "@typescript-eslint/member-naming": "off"
    }
};
