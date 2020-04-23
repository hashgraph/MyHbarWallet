/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const wp = require("@cypress/webpack-preprocessor");

const webpackOptions = {
    resolve: { extensions: [ ".ts", ".js", ".vue" ]},
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [ /node_modules/ ],
                use: [{ loader: "ts-loader" }]
            }
        ]
    }
};

const options = { webpackOptions };

module.exports = wp(options);
