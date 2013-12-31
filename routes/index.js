
/*
 * GET home page.
 */
var path = require('path')
    , fs = require('fs')
    , md = require('node-markdown').Markdown

exports.index = function(req, res){
    var body = ''

    fs.readdir(path.join(__dirname, 'posts'), function (err, files) {
        if (err)
            throw err

        if (files.length == 0) {
            body = 'no posts'
            res.render('index', { title: 'POSTing to S3', body: body });
        } else {
            var re = new RegExp('\.swp$')

            for (var i = 0; i < files.length; i++) {
                // only if it ain't a swap 
                if (!re.test(files[i])) {
                    fs.readFile( path.join(__dirname, 'posts', files[i]), {encoding: 'utf-8'}, function (err, data) {
                        if (err)
                            throw err

                        body += md(data) 

                        if (i == files.length)
                            res.render('index', { title: 'POSTing to S3', body: body });
                    })      
                }
            } 
        }
    })
}
