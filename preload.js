const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendAudioChunk: (buffer) => ipcRenderer.send('audio-chunk', buffer),
    onSpeechText: (callback) => {
        // Remove existing listener if any to avoid stacking up listeners on re-registers
        ipcRenderer.removeAllListeners('speech-text');
        ipcRenderer.on('speech-text', (event, data) => callback(data));
    },
    onSpeechError: (callback) => {
        ipcRenderer.removeAllListeners('speech-error');
        ipcRenderer.on('speech-error', (event, errorMsg) => callback(errorMsg));
    }
});
