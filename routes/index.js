/*
 * GET home page.
 */
var path = require('path')
    , fs = require('fs')
    , md = require('node-markdown').Markdown
    , Post = require('../models/post')
    , slug = require('slug')


exports.post = function (req, res) {
    Post.findById(req.params.id, function (err, doc) {
            if (err)
                res.send(400, 'nope')
            res.render('post', {post: doc}) 
    })
}

exports.edit_post = function (req, res) {
    if (req.method == 'GET')  {
        res.render('edit_post', {post: post}) 
    } else {}
}

exports.posts_by_tag = function (req, res) {
    console.log(req.params.tag)
    var query = Post.find({tags: req.params.tag}) 
    query.sort('-publishDate')
    query.exec(function(err, docs) {
        if (err)
           throw err 
       console.log(docs)
       res.render('posts', {posts: docs})
    }) 
}

exports.new_post = function (req, res) {
    if (req.method == 'GET') {
        res.render('new_post')
    } else {
        post = new Post()
        post.title = req.body.title
        post.body = req.body.body
        post.tags = req.body.tags.split(',')
        // slug or title hyphenated
        post.slug = req.body.slug || slug(req.body.title)
        post.publishDate = new Date()
        post.save(function (err) {
            if (err) throw err 
            res.redirect('posts')
        })
    }
}

exports.posts = function (req, res) {
    //res.render('posts', {posts: [{title: 'Test Donkey', body: 'This is the test donkey', tags: ['test', 'donkey'] }]})
    query = Post.find()
    query.sort('-publishDate')
    query.exec(function (err, docs) {
        if (err) throw err
        console.log(typeof(docs[0])) 
        res.render('posts', { posts: docs }) 
    })
}

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

exports.dash = function (req, res) {
    Post.find(function(err, posts) {
        if (err) throw err 
        res.render('dash', {posts: posts})
    })
}

exports.edit_post = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
            if (err) throw err
            res.render('edit_post', {post: post}) 
    })
}
