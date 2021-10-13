/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-env node */
import path from "path";

import html from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { VitePWA } from "vite-plugin-pwa";
import { getLastCommit } from "git-last-commit";
import { defineConfig } from "vite";

import packageJson from "./package.json";

export default async function ({ mode }) {
    require("dotenv").config({path: `./.env.${mode}`});
    const isProduction = mode === "production";

    const lastCommit = await new Promise((resolve, reject) =>
        getLastCommit((err, commit) => {
            if (err != null) reject(err);
            else resolve(commit);
        })
    );
    //icanhazip and ipify are used to collect user's public API, please see simplex-get-quote.ts for details
    let contentSecurityPolicy = [
        "default-src 'self'",
        "connect-src 'self' " +
            [
                "grpc-web.testnet.myhbarwallet.com",
                "grpc-web.previewnet.myhbarwallet.com",
                "grpc-web.myhbarwallet.com",
                "api.coingecko.com",
                "v2.api.testnet.kabuto.sh",
                "https://ipv4.icanhazip.com/",
                "https://api.ipify.org/",
                "https://sandbox.test-simplexcc.com/",
            ].join(" "),
        "font-src 'self' data:",
        "script-src-elem 'self' https://iframe.sandbox.test-simplexcc.com/form-sdk.js https://cdn.test-simplexcc.com/sdk/v1/js/sdk.js 'unsafe-eval' 'unsafe-inline'; object-src 'self'",
        isProduction ? "style-src 'self'" : "style-src 'self' 'unsafe-inline'",
    ];

    return defineConfig({
        plugins: [
            html({
                inject: {
                    injectData: {
                        contentSecurityPolicy: contentSecurityPolicy.join("; "),
                    },
                    process: "process"
                },
            }),
            vue(),
            vueI18n({
                include: path.resolve(__dirname, "./locales/**"),
            }),
            VitePWA()
        ],
        resolve: {
            alias: {
                awilix: "awilix/lib/awilix.browser.js",
                "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",
            },
        },
        optimizeDeps: {
            exclude: ["path", "electron-window-state"],
            include: ["long/src/long.js"],
        },
        define: {
            __TEST__: !isProduction,
            __APP_VERSION__: JSON.stringify(packageJson.version),
            __APP_LAST_COMMIT_SHORT_HASH__: JSON.stringify(
                lastCommit.shortHash
            ),
            __SIMPLEX_AUTH__: JSON.stringify(process.env.VUE_APP_SIMPLEX_AUTH),
            __SIMPLEX_WALLET_ID__: JSON.stringify(process.env.VUE_APP_SIMPLEX_WALLET_ID)
        },
        build: {
            outDir: "dist/web",
        },
    });
}
