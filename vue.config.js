const path = require("path");

module.exports = {
    chainWebpack(config) {
        // Use a standard HTML template instead of rolling our own (which is default)
        // https://github.com/jaketrent/html-webpack-template#basic-usage
        config.plugin("html").tap(args => [
            {
                ...args[0],
                template: path.resolve(__dirname, "src/index.html")
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
