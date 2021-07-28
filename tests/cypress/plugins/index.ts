import { startDevServer } from "@cypress/vite-dev-server";

module.exports = (on, config) => {
    if (config.testingType === "component") {
        const viteConfig = require("../../../vite.config");

        on("dev-server:start", (options) =>
            startDevServer({ options, viteConfig })
        );
    }
};
