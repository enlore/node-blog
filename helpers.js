var fs = require('fs')
  , path = require('path')

exports.getConfig = function (path) {
    try {
        var configString = fs.readFileSync(path)

        if (configString.length == 0) {
            console.log('empty config')
        } else {
            return JSON.parse(configString.toString())
        }
    } catch (e) {
        if (e.code == 'ENOENT') {
            var config = {
                "app_host": "",
                "app_port": "",
                "app_secret": "",
                "mongo_user": "",
                "mongo_pwd": "",
                "mongo_host": "",
                "mongo_port": ""
            }

            fs.writeFileSync('config.json', JSON.stringify(config), {encoding: 'utf8'})

            console.log('No config, yo, so I wrote a default one to the fs.  You should, you know, look at it.')
            process.exit(1)
        }
    }
}
