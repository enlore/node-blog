var fs = require('fs')
  , path = require('path')

exports.getConfig = function (path) {
    var configString = fs.readFileSync(path)

    if (typeof configString !== 'undefined') {
        if (configString.length == 0) {
            console.log('empty config')
        } else {
            return JSON.parse(configString.toString())
        }
    }
}
