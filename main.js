// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
<<<<<<< HEAD
const path = require("path")
var mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  mainWindow.webContents.openDevTools()

  Menu.setApplicationMenu(null)
  mainWindow.loadFile('index.html')
=======
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  Menu.setApplicationMenu(null)
  mainWindow.loadFile('index.html')

>>>>>>> 60a1e225046780a1b1d41e99ce1c883464185ddc
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})