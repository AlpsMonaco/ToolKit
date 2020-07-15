const fs = require('fs')

const log = {
    path: './toolkit.log',
    info: s => {
        s = log.logPrefix('INFO') + s
        log.writeLog(s)
    },

    error: s => {
        s = log.logPrefix('ERROR') + s
        log.writeLog(s)
    },

    getCurrentDate: () => {
        var date = new Date()

        var YYYY = date.getFullYear()
        var MM = date.getMonth() + 1
        MM = MM < 10 ? '0' + MM : MM

        var DD = date.getDay()
        DD = DD < 10 ? '0' + DD : DD

        var hh = date.getHours()
        hh = hh < 10 ? '0' + hh : hh

        var mm = date.getMinutes()
        mm = mm < 10 ? '0' + mm : mm

        var ss = date.getSeconds()
        ss = ss < 10 ? '0' + ss : ss

        return YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    },

    logPrefix: logType => '[' + logType + '] ' + log.getCurrentDate() + ' ',
    writeLog: s => {
        s += "\n"
        fs.writeFile(log.path, s, { flag: 'a' },
            err => {
                if (err) {
                    console.log(err)
                }
            }
        )
    }
}

exports.log = log