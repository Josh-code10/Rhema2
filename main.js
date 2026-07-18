const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let model = null;
let rec = null;
let voskInitError = null;
let voskLoaded = false;

function initVosk() {
    if (voskLoaded) {
        return { success: !voskInitError, error: voskInitError };
    }
    
    voskLoaded = true;
    try {
        const modelPath = app.isPackaged
            ? path.join(process.resourcesPath, 'model')
            : path.join(__dirname, 'model');
        
        console.log("Lazy initializing Vosk Speech Recognition...");
        console.log("Expected Model Path:", modelPath);
        
        if (!fs.existsSync(modelPath)) {
            throw new Error(`Vosk model not found at path: ${modelPath}`);
        }
        
        console.log("Loading vosk-koffi...");
        const { Model, Recognizer } = require('vosk-koffi');
        
        console.log("Loading Vosk Model into memory...");
        model = new Model(modelPath);
        rec = new Recognizer({ model: model, sampleRate: 16000 });
        
        console.log("Vosk speech recognizer initialized successfully!");
        return { success: true };
    } catch (err) {
        console.error("Vosk lazy initialization failed:", err);
        voskInitError = err.message || String(err);
        return { success: false, error: voskInitError };
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 820,
        title: "Kairos Church Media Software",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');

    // Handle child windows (Projector Popup)
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        return {
            action: 'allow',
            overrideBrowserWindowOptions: {
                width: 1000,
                height: 650,
                autoHideMenuBar: true,
                title: "Kairos - Live Projector Screen",
                webPreferences: {
                    contextIsolation: true,
                    nodeIntegration: false
                }
            }
        };
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        // Clean up Vosk resources if initialized
        if (rec) {
            rec.free();
        }
        if (model) {
            model.free();
        }
        app.quit();
    }
});

// IPC Handler to process raw audio stream chunks from frontend
ipcMain.on('audio-chunk', (event, pcmBuffer) => {
    const initResult = initVosk();
    if (!initResult.success) {
        event.reply('speech-error', initResult.error);
        return;
    }

    try {
        const result = rec.acceptWaveform(pcmBuffer);
        if (result) {
            const finalRes = rec.result();
            if (finalRes.text.trim()) {
                event.reply('speech-text', { text: finalRes.text, isFinal: true });
            }
        } else {
            const partialRes = rec.partialResult();
            if (partialRes.partial.trim()) {
                event.reply('speech-text', { text: partialRes.partial, isFinal: false });
            }
        }
    } catch (err) {
        console.error("Vosk audio processing error:", err);
        event.reply('speech-error', err.message || String(err));
    }
});
