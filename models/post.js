var mongoose = require('mongoose')


var postSchema = new mongoose.Schema({
        title: String,
        body: String,
        publishDate: Date,
        tags: Array
})

module.exports = mongoose.model('Post', postSchema)

