/* eslint-disable no-process-env, no-undef */
import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

// hack to get __static working
// see: https://github.com/electron-userland/electron-webpack/issues/172
declare const __static: string;

declare const MHW_ENV: string;

const isDevelopment = MHW_ENV === "development";

let win: BrowserWindow | null;

protocol.registerSchemesAsPrivileged([{ scheme: "mhw", privileges: { secure: true, standard: true }}]);

function createWindow(): void {
    win = new BrowserWindow({
        width: 1025,
        height: 768,
        webPreferences: { nodeIntegration: true },
        show: false
    });

    // wait to show the window until the page is actually loaded
    win.once("ready-to-show", () => {
        if (win != null) {
            win.show();
        }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL!);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("mhw");
        // Load the index.html when not in development
        win.loadURL("mhw://./index.html");
    }

    // Remove the default menu
    win.setMenuBarVisibility(false);

    win.on("closed", () => {
        win = null;
    });
}

app.on("window-all-closed", () => {
    app.quit();
});

// app.on("activate", () => {
//     if (win == null) {
//         createWindow();
//     }
// });

app.on("ready", async() => {
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
