// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain, nativeTheme } = require('electron')
const path = require("path")
const ScriptPath = __dirname

nativeTheme.themeSource = 'light'

app.whenReady().then(() => {
  window = createMainWindow()
  Menu.setApplicationMenu(null)
})

var createMainWindow = () => {
  var window = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(ScriptPath, 'preload.js'),
    }
  })

  window.webContents.openDevTools()
  window.loadFile('index.html')

  return window
}