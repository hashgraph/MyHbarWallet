/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
    plugins: [
        require("postcss-normalize")(),
        require("postcss-font-magician")({
            variants: {
                Montserrat: {
                    "300": [],
                    "400": [],
                    "500": [],
                    "600": [],
                    "700": []
                }
            },
            foundries: ["google"]
        }),
        require("postcss-preset-env")({
            stage: 0,
            importFrom: [path.join(__dirname, "src/main.css")]
        })
    ]
};
