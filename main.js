const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Datastore = require('nedb');
const dbPath = path.join(app.getPath('userData'), 'tasks.db');

// Crear una nueva base de datos y cargarla automáticamente
let tasks = new Datastore({ filename: path.join(__dirname, './tasks.db'), autoload: true });

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

// Function to fetch all tasks
ipcMain.handle('get-tasks', async () => {
    return new Promise((resolve, reject) => {
        tasks.find({}, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
});

// Handle add-task event
ipcMain.on('add-task', (event, task) => {
    tasks.insert(task, (err, newDoc) => {
        if (err) {
            event.reply('task-added', { success: false, message: 'Error saving task' });
        } else {
            event.reply('task-added', { success: true, message: 'Task saved successfully', task: newDoc });
        }
    });
});


ipcMain.handle('delete-task', async (event, taskId) => {
    return new Promise((resolve, reject) => {
        tasks.remove({ _id: taskId }, {}, (err, numRemoved) => {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true, message: 'Task deleted successfully' });
            }
        });
    });
});