const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        }
    });

    mainWindow.loadURL("http://localhost:5173");
});

// Handle file selection
ipcMain.handle("select-file", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "PDFs", extensions: ["pdf"] }],
    });

    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];  // Return the selected file path
    }
    return null;
});

// Print PDF
ipcMain.on("print-pdf", (event, filePath) => {
    console.log("🔹 Received request to print PDF with path:", filePath);
    if (!filePath) {
        console.error("❌ ERROR: No file path received for printing.");
        return;
    }

    let win = new BrowserWindow({ show: false });
    win.loadURL(`file://${filePath}`);

    win.webContents.once("did-finish-load", () => {
        console.log("✅ PDF loaded, sending to printer...");
        win.webContents.print({ silent: false });
    });
});

// Print HTML Component
ipcMain.on("print-component", (event, content) => {
    console.log("🔹 Received request to print HTML content:", content);
    if (!content) {
        console.error("❌ ERROR: No HTML content received.");
        return;
    }

    let printWindow = new BrowserWindow({ show: false });
    printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(content)}`);

    printWindow.webContents.once("did-finish-load", () => {
        console.log("✅ HTML Bill loaded, sending to printer...");
        printWindow.webContents.print({ silent: false });
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});




// const { app, BrowserWindow } = require('electron');
// const path = require('node:path');

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

// const createWindow = () => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   // and load the index.html of the app.
//   mainWindow.loadFile(path.join(__dirname, 'index.html'));

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();
// };

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow();

//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and import them here.
