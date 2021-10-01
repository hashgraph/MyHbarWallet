const path = require("path");
const { app, BrowserWindow } = require("electron");

function createMainWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
    },
  });

  win.loadFile("dist/web/index.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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