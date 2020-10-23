/* eslint-env node */
/* 
    eslint-disable 
    no-process-env, 
    @typescript-eslint/explicit-function-return-type, 
    @typescript-eslint/no-var-requires, 
    @typescript-eslint/no-require-imports, 
    import/order
*/
const path = require("path");
const package = require("./package.json");
const webpack = require("webpack");

// current git revision in footer of app
const hash = require("child_process").execSync("git rev-parse --short HEAD");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

// is electron or web
const is_electron = process.env.IS_ELECTRON === "true" ? true : false;

// environment variables present in app and output stats
const plugins = [
    new webpack.DefinePlugin({
        MHW_ENV: `"${process.env.MHW_ENV || process.env.NODE_ENV || "test"}"`,
        VERSION: `"${package.version.toString()}"`,
        COMMIT_HASH: `"${hash.toString().trim()}"`,
        IS_ELECTRON: is_electron,
        HEDERA_NETWORK: `"${process.env.HEDERA_NETWORK || "testnet"}"`,
        MOONPAY_API_KEY: `"${process.env.MOONPAY_API_KEY || "pk_test_ypQ0mhShRarhXwAbGvdLfxAL89AtfQ"}"`
    }),
    new StatsPlugin("stats.json")
];

// service worker if web production
if (process.env.MHW_ENV === "production" && !is_electron) {
    plugins.push(
        new WorkboxPlugin.GenerateSW({
            mode: "production",
            cacheId: "mhw",
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true
        })
    );
}

// if electron, manually copy bindings for some packages that need this
if (is_electron) {
    plugins.push(
        new CopyWebpackPlugin([
            "node_modules/node-hid/build/Release/HID-hidraw.node",
            "node_modules/node-hid/build/Release/HID.node"
        ]));
    plugins.push(
        new webpack.NormalModuleReplacementPlugin(
            /^bindings$/,
            `${__dirname}/src/electron/bindings`
        ));
}

// boilerplate for electron
const electronOptions = {
    pluginOptions: {
        electronBuilder: {
            outputDir: "dist/electron",
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
                files: [ "**", "dist/electron/icon.*" ],
                npmRebuild: true,
                win: {
                    target: [ "nsis" ],
                    icon: "./dist/electron/icons/icon.ico"
                },
                mac: {
                    category: "public.app-category.utilities",
                    target: "dmg",
                    icon: "./dist/electron/icons/icon.icns"
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

// write to disk preferred for electron
const electronDevServer = { devServer: { writeToDisk: true }};

// source map in dev, test
const css = {
    css: {
        sourceMap: process.env.NODE_ENV !== "production"
    }
};

// Keep entrypoint small and asynchronously load chunks at a reasonable pace
const performance = {
    performance: {
        hints: process.env.NODE_ENV === "production" ? "error" : "warning",
        maxEntrypointSize: 512000,
        maxAssetSize: 1600000
    },
    optimization: { splitChunks: { chunks: "all", maxInitialRequests: 4, maxAsyncRequests: 7 }}
};

// explicitly use node version of the hashgraph SDK in electron
const electronConfig = {
    outputDir: "dist/electron",
    configureWebpack: {
        target: "electron-renderer",
        ...performance,
        plugins,
        resolve: { alias: { "@hashgraph/sdk": path.resolve(__dirname, "node_modules/@hashgraph/sdk/lib/index-node.js") }}
    },
    ...electronOptions,
    ...electronDevServer
};

// pretend these packages don't exist in web environment
const webExternals = {
    externals: {
        "@ledgerhq/hw-transport-node-hid-noevents": "module",
        "@improbable-eng/grpc-web-node-http-transport": "module",
        "node-hid": "module",
        "grpc-js": "module"
    }
};

// mostly the same except ignoring packages that won't build in web
const webConfig = {
    outputDir: "dist/web",
    configureWebpack: {
        target: "web",
        ...performance,
        ...webExternals,
        plugins
    }
};

// some optimization and qol
const chainConfig = {
    chainWebpack(config) {
        config.plugin("html").tap((args) => [
            {
                ...args[ 0 ],
                template: path.resolve(__dirname, "src/index.html")
            }
        ]);

        config.plugin("fork-ts-checker").tap((args) => [
            {
                ...args[ 0 ],
                silent: true,
                workers: require("os").cpus().length * 2
            }
        ]);

        if (process.env.NODE_ENV === "production") {
            config.plugin("optimize-css").tap((args) => [
                {
                    ...args[ 0 ],
                    preset: [
                        "advanced",
                        { discardComments: { removeAll: true }}
                    ]
                }
            ]);

            config.module
                .rule("optimize-images")
                .test(/\.(jpg|png|gif|svg)$/)
                .pre()
                .use()
                .loader("image-webpack-loader");
        }
    }
};

const electron = { ...css, ...electronConfig, ...chainConfig };
const web = { ...css, ...webConfig, ...chainConfig };

if (is_electron) module.exports = electron;
else module.exports = web;