module.exports = {
    chainWebpack(config) {
        // Use a standard HTML template instead of rolling our own (which is default)
        // https://github.com/jaketrent/html-webpack-template#basic-usage
        config.plugin("html").tap(args => [
            {
                ...args[0],
                inject: false,
                template: require("html-webpack-template"),
                appMountId: "app",
                title: "MyHederaWallet",
                mobile: true,
                lang: "en"
            }
        ]);

        config.plugin("fork-ts-checker").tap(args => [
            {
                ...args[0],
                // Only report errors
                silent: true,
                // Use as much threads as we have physical CPUs
                workers: require("os").cpus().length
            }
        ]);

        if (process.env.NODE_ENV === "production") {
            // Use the advanced preset for cssnano instead of the default.
            // https://cssnano.co/guides/optimisations
            config.plugin("optimize-css").tap(args => [
                {
                    ...args[0],
                    preset: [
                        "advanced",
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            ]);
        }
    }
};
