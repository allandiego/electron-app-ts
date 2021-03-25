import { app, BrowserWindow, ipcMain } from 'electron';
// import { initialize } from '@electron/remote/main';
import * as path from 'path';

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: any;
// initialize();

function createWindow() {
  // const image =
  //   process.platform === 'darwin'
  //     ? path.join(__dirname, 'assets', 'icon.icns')
  //     : path.join(__dirname, 'assets', 'icon.ico');

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    // icon: image,
    transparent: false,
    frame: true,
    // titleBarStyle: 'hidden', for custom-title-bar
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      // preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, '/pages/index.html'));
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.removeMenu();
  // Disable the default Menu Bar
  // Menu.setApplicationMenu(null);

  // mainWindow.webContents.on('did-finish-load', async () => {
  //   // mainWindow.webContents.send('user-data-path', app.getPath('userData'));
  //   console.log('userData', app.getPath('userData'));
  //   // console.log('userDataPath', (app || remote.app).getPath('userData'));
  // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// ipcMain.handle('getUserDataPath', async event => {
//   // mainWindow.webContents.send('user-data-path', app.getPath('userData'));
//   return app.getPath('userData');
// });

// ipcMain.handle('getStoreValue', (event, key) => {
//   return store.get(key);
// });

// ipcMain.handle('setStoreValue', (event, key, value) => {
//   return store.set(key, value);
// });

// ipcMain.on('open-dialog', async () => {
//   const returnedPath = dialog.showOpenDialogSync(mainWindow, {
//     title: 'Selecione a pasta',
//     buttonLabel: 'Selecionar',
//     // defaultPath: store.get('companiesConfigPath'),
//     properties: ['openDirectory'],
//   });

//   mainWindow.webContents.send('open-dialog-response', returnedPath);
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
