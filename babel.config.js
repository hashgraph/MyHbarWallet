/* eslint-env node */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: "3",
                targets: { node: "current" }
            }
        ]
    ]
};
