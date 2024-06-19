const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    addTask: (task) => ipcRenderer.send('add-task', task),
    onTaskAdded: (callback) => ipcRenderer.on('task-added', (event, message) => callback(message))
});
