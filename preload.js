const { log } = require('./log')
const { Session } = require('./StaticData')

//Load last session preferences.
Session.loadFile().then(() => {
    log.info("Load session history successfully.")
}).catch(err => {
    log.error(err)
})

window.preload = {
    Session: Session
}