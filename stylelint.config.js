/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
    extends: [ "stylelint-config-standard", "stylelint-a11y/recommended" ],
    plugins: [
        "stylelint-csstree-validator",
        "stylelint-a11y",
        "stylelint-declaration-block-no-ignored-properties",
        "stylelint-no-indistinguishable-colors",
        "stylelint-no-unsupported-browser-features",
        "stylelint-order",
        "stylelint-prettier",
        "stylelint-use-logical",
        "stylelint-value-no-unknown-custom-properties",
        "stylelint-declaration-strict-value"
    ],
    rules: {
        "indentation": [ 4 ],

        // https://stylelint.io/user-guide/rules/selector-class-pattern
        "selector-class-pattern": [
            "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            { resolveNestedSelectors: true }
        ],

        // Autoprefixer does this for us
        // https://stylelint.io/user-guide/rules/selector-no-vendor-prefix
        "selector-no-vendor-prefix": true,

        // https://stylelint.io/user-guide/rules/font-weight-notation
        "font-weight-notation": "numeric",

        // https://github.com/stylelint/stylelint/blob/2b73704b65f0bd69a2c2bada4e53b20d534547d1/lib/rules/selector-max-specificity
        // Limit the specificity of selectors (and prevents IDs).
        "selector-max-specificity": [
            "0,4,2",
            { severity: "warning", ignoreSelectors: [ "/#app/" ]}
        ],

        // https://github.com/prettier/stylelint-prettier
        "prettier/prettier": true,

        // https://github.com/csstree/stylelint-validator/
        // Validate compiled CSS against W3C standards (incl. common browser extensions)
        "csstree/validator": true,

        // https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
        "plugin/declaration-block-no-ignored-properties": true,

        // Disallows colors that are suspiciously close to being identical
        // https://github.com/ierhyna/stylelint-no-indistinguishable-colors
        "plugin/stylelint-no-indistinguishable-colors": [
            true,
            {
                ignore: [ "#ffffff" ],
                allowEquivalentNotation: true
            }
        ],

        // https://github.com/csstools/stylelint-use-logical
        "csstools/use-logical": true,

        // https://github.com/csstools/stylelint-value-no-unknown-custom-properties
        "csstools/value-no-unknown-custom-properties": [
            true,
            { importFrom: [ path.join(__dirname, "src/main.css") ]}
        ],

        // https://github.com/ismay/stylelint-no-unsupported-browser-features
        "plugin/no-unsupported-browser-features": [
            true,
            {
                ignore: [
                    // [...] not supporting the avoid-column, column, and avoid (in the column
                    // context) values for the properties break-before, break-after,
                    // and break-inside.
                    "multicolumn",
                    // Not supported in older Edge (use chrome Edge)
                    "intrinsic-width",
                    // Not supported in older Edge
                    "css-resize",
                    // Just a decoration
                    "css-filters",
                    "css-appearance"
                ]
            }
        ],

        // https://github.com/hudochenkov/stylelint-order
        "order/properties-alphabetical-order": true,
        "order/order": [
            "custom-properties",
            "declarations",
            "rules",
            "at-rules"
        ],

        // https://github.com/YozhikM/stylelint-a11y#rules
        "a11y/content-property-no-static-value": true,
        "a11y/line-height-is-vertical-rhythmed": true,
        "a11y/no-obsolete-attribute": true,
        "a11y/no-obsolete-element": true,
        "a11y/no-text-align-justify": true,

        // https://github.com/AndyOGo/stylelint-declaration-strict-value
        "scale-unlimited/declaration-strict-value": [
            [ "/color/" ],
            {
                ignoreKeywords: { "/color/": [ "inherit", "transparent" ]},
                severity: "warning",
                disableFix: true
            }
        ]
    }
};
