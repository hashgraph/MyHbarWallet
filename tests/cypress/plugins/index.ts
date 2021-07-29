/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path";

import { startDevServer } from "@cypress/vite-dev-server";
import html from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { VitePWA } from "vite-plugin-pwa";

const contentSecurityPolicy = [
    "default-src 'self'",
    "connect-src 'self' " +
        [
            "grpc-web.testnet.myhbarwallet.com",
            "grpc-web.previewnet.myhbarwallet.com",
            "grpc-web.myhbarwallet.com",
            "api.coingecko.com",
        ].join(" "),
    "font-src 'self' data:"
];

module.exports = async (on, config) => {
    if (config.testingType === "component") {
        const viteConfig = {
            plugins: [
                html({
                    inject: {
                        injectData: {
                            contentSecurityPolicy: contentSecurityPolicy.join("; "),
                        },
                    },
                }),
                vue(),
                vueI18n({
                    include: path.resolve(__dirname, "../../../locales/**"),
                }),
                VitePWA()
            ]
        };

        on("dev-server:start", (options) =>
            startDevServer({ options, viteConfig })
        );
    }
};
