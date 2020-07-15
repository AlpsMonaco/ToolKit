const fs = require('fs')
const { log } = require('./log')


//Update file or truncate file before write.
//Return a Promise object.
const excludeRW = {
    updateFile: (filePath, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, err => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    },

    readFile: filePath => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}

//Session
//Use to save some session history config,such as last used Content-Type in ToolKits.
const Session = {
    session: {},
    filePath: './session.json',

    loadFile: async () => {
        let data = await excludeRW.readFile(Session.filePath)

        try {
            Session.session = JSON.parse(data)
        } catch (error) {
            return Promise.reject(error)
        }
    },

    updateFile: async () => {
        var data
        try {
            data = JSON.stringify(Session.session)
        } catch (error) {
            return Promise.reject(error)
        }

        await excludeRW.updateFile(Session.filePath, data)
    },

    setLastContentType: contentType => { Session.session.contentType = contentType; Session.updateFile().catch(err => log.error(err)) },
    setLastRequestMethod: method => { Session.session.method = method; Session.updateFile().catch(err => log.error(err)) }
}

exports.Session = Session