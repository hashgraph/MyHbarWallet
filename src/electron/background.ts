import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import path from "path";

// hack to get __static working
// see: https://github.com/electron-userland/electron-webpack/issues/172
declare const __static: string;

const isDevelopment = process.env.NODE_ENV !== "production";

let win: BrowserWindow | null;

protocol.registerSchemesAsPrivileged([
    { scheme: "mhw", privileges: { secure: true, standard: true } }
]);

function createWindow(): void {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__static, "icon.png"),
        webPreferences: {
            nodeIntegration: true
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

    win.on("closed", () => {
        win = null;
    });
}

app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

app.on("ready", async () => {
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", data => {
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
