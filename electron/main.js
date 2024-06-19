const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Datastore = require('nedb');

// Crear una nueva base de datos y cargarla automáticamente
let tasks = new Datastore({ filename: path.join(__dirname, 'tasks.db'), autoload: true });

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    win.loadFile("index.html");
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

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

// Manejar el evento 'add-task' desde el proceso de renderizado
ipcMain.on('add-task', (event, task) => {
    tasks.insert(task, (err, newDoc) => {
        if (err) {
            event.reply('task-added', 'Error saving task');
        } else {
            event.reply('task-added', 'Task saved successfully');
        }
    });
});
