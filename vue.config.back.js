/* eslint-disable no-process-env, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
/* eslint-env node */
const path = require("path");
const package = require("./package.json");
const webpack = require("webpack");
const hash = require("child_process").execSync("git rev-parse --short HEAD");

const plugins = [
    new webpack.DefinePlugin({
        MHW_ENV: `"${process.env.NODE_ENV}"`,
        VERSION: `"${package.version.toString()}"`,
        COMMIT_HASH: `"${hash.toString().trim()}"`,
        IS_ELECTRON: "false",
        HEDERA_NETWORK: `"${process.env.HEDERA_NETWORK || "testnet"}"`,
        CARBON_API_KEY: `"${process.env.CARBON_API_KEY || "89fa28dd-b26e-4af4-8313-1536054767d5"}"`
    })
];

const css = {
    css: {
        // Turn on CSS source maps in development
        sourceMap: process.env.NODE_ENV !== "production"
    }
};

const performance = {
    performance: {
        // only report this as an error when building for production
        hints: process.env.NODE_ENV === "production" ? "error" : false,
        maxEntrypointSize: 512000,
        maxAssetSize: 1450000
    }
};

const pluginOptions = {
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: "src/electron/background.ts",
            customFileProtocol: "mhw://./",
            chainWebpackRendererProcess(config) {
                config.plugin("define").tap((args) => {
                    args[ 0 ].IS_ELECTRON = "true";
                    return args;
                });
            },
            nodeIntegration: true,
            builderOptions: {
                appId: "com.myhbarwallet.app",
                productName: "MyHbarWallet",
                copyright: "Copyright © 2020 MyHbarWallet",
                files: [ "**", "dist/icon.*" ],
                npmRebuild: true,
                win: {
                    target: [ "nsis" ],
                    icon: "./dist/icons/icon.ico"
                },
                mac: {
                    category: "public.app-category.utilities",
                    target: "dmg",
                    icon: "./dist/icons/icon.icns"
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
    }
};

const backWebpack = {
    outputDir: "dist/node",
    configureWebpack: {
        target: "electron-renderer",
        ...performance,
        plugins
    },
    ...pluginOptions
};

const chainConfig = {
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
                .test(/\.(jpg|png|gif|svg)$/)
                .pre()
                .use()
                .loader("image-webpack-loader");
        }
    }
};

const backEnd = { ...css, ...backWebpack, ...chainConfig };

module.exports = backEnd;
