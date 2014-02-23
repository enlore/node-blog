var mongoose = require('mongoose')


var postSchema = new mongoose.Schema({
        title: String,
        teaser: String,
        body: String,
        publishDate: Date,
        publishOn: Date,
        slug: String,
        tags: Array
})

module.exports = mongoose.model('Post', postSchema)

