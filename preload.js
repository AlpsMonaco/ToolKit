const { log } = require('./log')
const { Session } = require('./StaticData')
const { ipcRenderer } = require('electron')

//Load last session preferences.
Session.loadFile().then(() => {
    log.info("Load session history successfully.")
}).catch(err => {
    log.error(err)
})

var switchDevTools = () => {
    ipcRenderer.send('switchDevTools')
}

window.preload = {
    Session: Session,
    switchDevTools: switchDevTools
}

window.addEventListener('keydown', (ev) => {
    if (ev.key == 'F12') {
        switchDevTools()
    }
}, true)