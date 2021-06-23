/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-env node */
import path from "path";
import html from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import packageJson from "./package.json";
import { getLastCommit } from "git-last-commit";
import { defineConfig } from "vite";

export default async function ({ mode }) {
  const isProduction = mode === "production";

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
      ].join(" "),
    "font-src 'self' data:",
    isProduction ? "style-src 'self'" : "style-src 'self' 'unsafe-inline'",
  ];

  return defineConfig({
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
        include: path.resolve(__dirname, "./locales/**"),
      }),
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
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __APP_LAST_COMMIT_SHORT_HASH__: JSON.stringify(lastCommit.shortHash),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/@hashgraph")) {
              return "hashgraph";
            }

            if (id.includes("node_modules/") && !id.endsWith(".css")) {
              return "vendor";
            }
          },
        },
      },
    },
  });
}