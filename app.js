var express     = require('express')
    , routes    = require('./routes')
    , http      = require('http')
    , path      = require('path')
    , mongoose  = require('mongoose')

var app = express()

app.set('post dir', path.join(__dirname, 'posts'))

app.set('port', process.env.PORT || 3000)
app.set('env', process.env.NODE_ENV || 'development')
app.set('secret', process.env.SECRET || 'WHAT IS A MAN')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.compress())
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(express.cookieParser(app.get('secret')))
app.use(express.bodyParser())
app.use(express.session())
app.use(app.router)

var less_opts = {
   src              : path.join(__dirname, 'static'),
   compress         : false,
   debug            : true,
   paths            : [path.join(__dirname, 'static')],
   once             : false,
   dest             : path.join(__dirname, 'static'),
   dumpLineNumbers  : 'comments',
   sourceMap        : true,
}

// dev config
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
  app.locals.pretty = true

  mongoose.connect('mongodb://localhost/posts')
}

// pro config
if ('production' == app.get('env')) {
    less_opts.debug             = false
    less_opts.compress          = true
    less_opts.once              = true
    less_opts.dumpLineNumbers   = 0
    less_opts.sourcemap         = false
}

app.use(require('less-middleware')(less_opts))
app.use(express.static(path.join(__dirname, 'static')))

// Models
var Post = require('./models/post')

// Routes
app.get('/', routes.index)
app.get('/posts', routes.posts)

app.get('/post/new', routes.new_post)
app.post('/post/new', routes.new_post)
app.get('/post/edit', routes.edit_post)
app.post('/post/edit', routes.edit_post)

app.get('/tags/:tag', routes.posts_by_tag)

app.get('/posts/:id', routes.post)

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})
