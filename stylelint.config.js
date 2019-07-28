module.exports = {
    extends: ["stylelint-config-standard", "stylelint-a11y/recommended"],
    plugins: ["stylelint-csstree-validator", "stylelint-a11y"],
    rules: {
        indentation: [4],

        // https://github.com/csstree/stylelint-validator/
        // Validate compiled CSS against W3C standards (incl. common browser extensions)
        "csstree/validator": true,

        // https://github.com/YozhikM/stylelint-a11y#rules
        "a11y/content-property-no-static-value": true,
        "a11y/line-height-is-vertical-rhythmed": true,
        "a11y/no-display-none": true,
        "a11y/no-obsolete-attribute": true,
        "a11y/no-obsolete-element": true,
        "a11y/no-text-align-justify": true,
    }
};
