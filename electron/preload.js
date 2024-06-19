const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    addTask: (task) => ipcRenderer.send('add-task', task),
    getTasks: () => ipcRenderer.invoke('get-tasks'),
    deleteTask: (taskId) => ipcRenderer.invoke('delete-task', taskId), // Nueva función
    onTaskAdded: (callback) => ipcRenderer.on('task-added', (event, result) => callback(result)),
});
