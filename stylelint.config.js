module.exports = {
    extends: "stylelint-config-standard",
    plugins: ["stylelint-csstree-validator"],
    rules: {
        indentation: [4],

        // https://github.com/csstree/stylelint-validator/
        // Validate compiled CSS against W3C standards (incl. common browser extensions)
        "csstree/validator": true
    }
};
