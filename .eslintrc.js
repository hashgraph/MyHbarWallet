/* eslint-env node */
module.exports = {
    root: true,
    extends: [
        "plugin:import/recommended",
        "plugin:import/warnings",
        "plugin:import/errors",
        "plugin:import/typescript",
        "@launchbadge/eslint-config/vue",
        "@launchbadge/eslint-config/vue-typescript"
    ],
    rules: {
        "vue/no-v-html": "off",
        "require-atomic-updates": "off",
        "vue/html-indent": [ "warn", 4 ],
        "@typescript-eslint/member-naming": "off",
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
        "sonarjs/no-useless-catch": "off",
        "no-useless-catch": "off",
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
        "unicorn/no-unsafe-regex": "warn",
        "import/order": [
            "warn",
            {
                "groups": [ "builtin", "external", "parent", "sibling", "index" ],
                "newlines-between": "always"
            }
        ],
        "import/dynamic-import-chunkname": "warn"
    }
};
