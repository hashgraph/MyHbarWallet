/* eslint-disable no-process-env, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, import/order */
/* eslint-env node */
const path = require("path");

const package = require("./package.json");

const webpack = require("webpack");

const hash = require("child_process").execSync("git rev-parse --short HEAD");

const WorkboxPlugin = require("workbox-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const plugins = [
    new webpack.DefinePlugin({
        MHW_ENV: `"${process.env.NODE_ENV}"`,
        VERSION: `"${package.version.toString()}"`,
        COMMIT_HASH: `"${hash.toString().trim()}"`,
        IS_ELECTRON: "false",
        HEDERA_NETWORK: `"${process.env.HEDERA_NETWORK || "testnet"}"`,
        CARBON_API_KEY: `"${process.env.CARBON_API_KEY || "89fa28dd-b26e-4af4-8313-1536054767d5"}"`
    }),
    new StatsPlugin("stats.json")
];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        new WorkboxPlugin.GenerateSW({
            // Do not precache images
            exclude: [ /\.(?:png|jpg|jpeg|svg)$/ ],
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "images",
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 30 * 24 * 60 * 60
                        }
                    }
                }
            ]
        })
    );
}

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
        maxAssetSize: 1500000
    },
    optimization: { splitChunks: { chunks: "all", maxInitialRequests: 4, maxAsyncRequests: 7 }}
};

// Webpack externals are modules that are expected to be present externally
// Therefore, webpack will not bundle dependencies from this list
// So, to exclude node only libraries on the front end, list here
const frontEndExternals = {
    externals: {
        "@ledgerhq/hw-transport-node-hid-noevents": "module",
        "@improbable-eng/grpc-web-node-http-transport": "module",
        "node-hid": "module",
        "grpc": "module"
    }
};

const frontWebpack = {
    outputDir: "dist/web",
    configureWebpack: {
        target: "web",
        ...performance,
        ...frontEndExternals,
        plugins
    }
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

const frontEnd = { ...css, ...frontWebpack, ...chainConfig };

module.exports = frontEnd;
