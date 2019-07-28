module.exports = {
    plugins: [
        require("postcss-normalize")(),
        require("postcss-preset-env")({
            stage: 0,
            importFrom: ["./src/main.css"]
        })
    ]
};
