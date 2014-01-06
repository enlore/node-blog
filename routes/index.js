
/*
 * GET home page.
 */
var path = require('path')
    , fs = require('fs')
    , md = require('node-markdown').Markdown


exports.index = function(req, res){
    console.log(req.app.get('post dir'))
    var res_queue = []

    fs.readdir(req.app.get('post dir'), function (err, files) {
        if (err)
            throw err

        if (files.length == 0) {
            res_queue.push('no posts')
            res.render('index', { title: 'POSTing to S3', body: res_queue });
        } else {
            var re = new RegExp('\.swp$')

            for (var i = 0; i < files.length; i++) {
                // only if it ain't a swap 
                if (!re.test(files[i])) {
                    fs.readFile(
                        path.join(req.app.get('post dir'), files[i]),
                        {encoding: 'utf-8'},
                        function (err, data) {
                            if (err)
                                throw err

                            res_queue.unshift(md(data))

                            if (res_queue.length == files.length - 1)
                                res.render('index', { title: 'POSTing to S3', body: res_queue });
                    })      
                }
            } 
        }
    })
}

exports.test = function (req, res) {
    res.location('http://google.com')
    res.writeHead(303)
    res.end()
}
