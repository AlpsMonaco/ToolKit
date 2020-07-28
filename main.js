// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, MenuItem, nativeTheme, ipcMain } = require('electron')
const path = require("path")
const ScriptPath = __dirname
var window

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

  window.loadFile('index.html')

  return window
}

ipcMain.on('switchDevTools', (event, args) => {
  if (event.sender.isDevToolsOpened()) {
    event.sender.closeDevTools()
  } else {
    event.sender.openDevTools()
  }
})