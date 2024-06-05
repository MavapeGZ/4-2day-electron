const { app, BrowserWindow } = require('electron');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: '4 2DAY!',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    // Llama a LoadDataFromStorage tan pronto como la aplicación esté lista
    const formScript = `require('./form').LoadDataFromStorage();`;
    app.on('browser-window-created', (event, window) => {
        window.webContents.executeJavaScript(formScript);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});