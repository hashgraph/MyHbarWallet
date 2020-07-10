// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, no-undef
const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-undef
module.exports = (on, config) => {
    on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chrome") {
            launchOptions.args.push("--disable-dev-shm-usage");
        }

        return launchOptions;
    });

    on("file:preprocessor", cypressTypeScriptPreprocessor);
};
