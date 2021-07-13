import path from "path";

import { BrowserWindow, app } from "electron";
import type { BrowserWindowConstructorOptions } from "electron";
import windowStateKeeper from "electron-window-state";

function createMainWindow() {
  const options: BrowserWindowConstructorOptions = {
    minWidth: 800,
    title: "MyHbarWallet v0.6.0+??",
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      devTools: true,
      spellcheck: false,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.ts"),
    },
  };

  const windowState = windowStateKeeper({
    defaultWidth: options.minWidth,
    defaultHeight: options.minHeight,
  });

  const win = new BrowserWindow({
    ...options,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  });

  windowState.manage(win);

  win.once("ready-to-show", () => {
    win.show();
    win.focus();
  });

  if (app.isPackaged) {
    win.loadFile("dist/index.html");
  } else {
    win.loadURL("http://localhost:3000#wallet/new");
  }
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", function () {
    // re-create the window when the application is activated
    // if there are no windows open (common behavior in Mac OS)
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  // when all windows are closed, quit the application (except on Mac OS)
  if (process.platform !== "darwin") app.quit();
});
