/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path";

import { devServer } from "@cypress/vite-dev-server";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { VitePWA } from "vite-plugin-pwa";

const contentSecurityPolicy = [
    "default-src 'self'",
    "connect-src 'self' " +
        [
                "api.coingecko.com",
                "mainnet-public.mirrornode.hedera.com",
                "testnet.mirrornode.hedera.com",
                "previewnet.mirrornode.hedera.com",
                "*.swirlds.com", // grpc proxies
                "*.hedera.com" // grpc proxies
        ].join(" "),
    "font-src 'self' data:"
];

module.exports = async (on, config) => {
    if (config.testingType === "component") {
        const viteConfig = {
            plugins: [
                createHtmlPlugin({
                    inject: {
                        data: {
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

        on("dev-server:start", (options) => {
            options.viteConfig = viteConfig;
            devServer(options)
        });
    }
};
