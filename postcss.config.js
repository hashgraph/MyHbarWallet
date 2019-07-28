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
            importFrom: ["./src/main.css"]
        })
    ]
};
