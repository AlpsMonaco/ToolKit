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
    width: 600,
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
    window.setSize(600, 900, true)
    event.sender.closeDevTools()
  } else {
    window.setSize(1400, 900, true)
    event.sender.openDevTools()
  }
})