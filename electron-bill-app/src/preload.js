// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    selectFile: () => ipcRenderer.invoke("select-file"),
    printPDF: (filePath) => {
        console.log("📨 Sending PDF to main process:", filePath);
        ipcRenderer.send("print-pdf", filePath);
    },
    printComponent: (content) => {
        console.log("📨 Sending HTML content to main process");
        ipcRenderer.send("print-component", content);
    }
});
