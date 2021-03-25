// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// import { contextBridge, ipcRenderer, remote } from 'electron';

// // user-preferences
// const store = new Store({
//   configFile: 'preferences.json',
//   configData: {
//     originPath: '',
//     destinationPath: '',
//     companiesConfigPath: '',
//     departamentsConfigPath: '',
//   },
// });

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld('electron', {
//   showOpenDialog: async (defaultPath: string) => {
//     const returnedPath = await remote.dialog.showOpenDialog({
//       title: 'Selecione a pasta',
//       buttonLabel: 'Selecionar',
//       defaultPath,
//       properties: ['openDirectory'],
//     });

//     console.log('showOpenDialog');
//     ipcRenderer.send('countdown-start');
//     if (returnedPath && !returnedPath.canceled) {
//       return returnedPath.filePaths[0];
//     }

//     return '';
//   },
//   storeGet: (key: keyof ConfigData) => store.get(key),
//   storeSet: (key: keyof ConfigData, value: any) => store.set(key, value),
// });
