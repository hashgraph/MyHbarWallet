/* eslint-disable no-process-env */
import { app, BrowserWindow, protocol } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

// hack to get __static working
// see: https://github.com/electron-userland/electron-webpack/issues/172
declare const __static: string;

const isDevelopment = process.env.NODE_ENV !== "production";

let win: BrowserWindow | null;

protocol.registerSchemesAsPrivileged([{ scheme: "mhw", privileges: { secure: true, standard: true }}]);

function createWindow(): void {
    win = new BrowserWindow({
        width: 1024,
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

    if (process.env.WEBPACK_DEV_SERVER_URL != null) {
        void win.loadURL(process.env.WEBPACK_DEV_SERVER_URL!);
        if (process.env.IS_TEST != null) win.webContents.openDevTools();
    } else {
        createProtocol("mhw");
        // Load the index.html when not in development
        void win.loadURL("mhw://./index.html");
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

app.on("activate", () => {
    if (win == null) {
        createWindow();
    }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
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
