/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-env node */
import path from "path";

import html from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { VitePWA } from "vite-plugin-pwa";
import { getLastCommit } from "git-last-commit";
import { defineConfig } from "vite";
import dotenv from "dotenv"

import packageJson from "./package.json";

export default async function ({ mode }) {
    dotenv.config({path: `./env.${mode}`});
    const isProduction = mode === "production";
    const isElectron = process.env.IS_ELECTRON === "true";
    // Output directories
    const webOutDir = "dist/web";
    const electronOutDir = "dist/electron";

    const lastCommit = await new Promise((resolve, reject) =>
        getLastCommit((err, commit) => {
            if (err != null) reject(err);
            else resolve(commit);
        })
    );

    let contentSecurityPolicy = [
        "default-src 'self'",
        "connect-src 'self' " +
            [
                "grpc-web.testnet.myhbarwallet.com",
                "grpc-web.previewnet.myhbarwallet.com",
                "grpc-web.myhbarwallet.com",
                "api.coingecko.com",
                "v2.api.testnet.kabuto.sh",
                "https://api.moonpay.com"
            ].join(" "),
        "font-src 'self' data:",
        "frame-src 'self' https://buy.moonpay.io https://buy-staging.moonpay.io https://buy-staging.moonpay.com 'unsafe-eval' 'unsafe-inline'",
        isProduction ? "style-src 'self'" : "style-src 'self' 'unsafe-inline'",
    ];

    return defineConfig({
        base: isElectron ? "./" : "/",
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
            __MOONPAY_AUTH__: JSON.stringify(process.env.VUE_APP_MOONPAY_AUTH)
        },
        build: {
            outDir: isElectron ? electronOutDir : webOutDir,
        },
    });
}
