/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports,no-process-env */
const path = require("path");

const webpack = require("webpack");

const package = require("./package.json");

// eslint-disable-next-line import/order
const hash = require("child_process").execSync("git rev-parse --short HEAD");

module.exports = {
    css: {
        // Turn on CSS source maps in development
        sourceMap: process.env.NODE_ENV !== "production"
    },
    configureWebpack: {
        target: "web",
        performance: {
            // only report this as an error when building for production
            hints: process.env.NODE_ENV === "production" ? "error" : false,
            maxEntrypointSize: 512000,
            maxAssetSize: 1280000
        },
        plugins: [
            new webpack.DefinePlugin({
                VERSION: `"${package.version.toString()}"`,
                COMMIT_HASH: `"${hash.toString().trim()}"`,
                HEDERA_NETWORK: `"${process.env.HEDERA_NETWORK || "testnet"}"`
            })
        ]
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: "src/electron/background.ts",
            customFileProtocol: "mhw://./",
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            chainWebpackRendererProcess(config) {
                config.plugin("define").tap((args) => {
                    args[ 0 ].IS_ELECTRON = true;
                    return args;
                });
            },
            builderOptions: {
                appId: "com.myhbarwallet.app",
                productName: "MyHbarWallet",
                copyright: "Copyright © 2019 MyHbarWallet",
                files: [ "**", "build/icon.*" ],
                win: {
                    target: [ "nsis" ],
                    icon: "./build/icons/icon.ico"
                },
                mac: {
                    category: "public.app-category.utilities",
                    target: "dmg",
                    icon: "./build/icons/icon.icns"
                },
                linux: {
                    target: [ "pacman", "deb", "rpm" ],
                    executableName: "MyHbarWallet",
                    category: "Utility",
                    desktop: {
                        Name: "MyHbarWallet",
                        Type: "Application"
                    }
                }
            }
        }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    chainWebpack(config) {
        // Use a standard HTML template instead of rolling our own (which is default)
        // https://github.com/jaketrent/html-webpack-template#basic-usage
        config.plugin("html").tap((args) => [
            {
                ...args[ 0 ],
                template: path.resolve(__dirname, "src/index.html")
            }
        ]);

        config.plugin("fork-ts-checker").tap((args) => [
            {
                ...args[ 0 ],
                // Only report errors
                silent: true,
                // Use as much threads as we have physical CPUs
                workers: require("os").cpus().length
            }
        ]);

        if (process.env.NODE_ENV === "production") {
            // Use the advanced preset for cssnano instead of the default.
            // https://cssnano.co/guides/optimisations
            config.plugin("optimize-css").tap((args) => [
                {
                    ...args[ 0 ],
                    preset: [
                        "advanced",
                        { discardComments: { removeAll: true }}
                    ]
                }
            ]);

            // Pass images through an optimization pipeline
            config.module
                .rule("optimize-images")
                .test(/\.(jpg|png|gif|svg)$/u)
                .pre()
                .use()
                .loader("image-webpack-loader");
        }
    }
};
