// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, no-undef
const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-undef
module.exports = (on, config) => {
    on("file:preprocessor", cypressTypeScriptPreprocessor);

    return { ...config };
};
