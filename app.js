var express     = require('express')
    , routes    = require('./routes')
    , http      = require('http')
    , path      = require('path')
    , mongoose  = require('mongoose')
    , md        = require('node-markdown').Markdown
    , locals    = require('./locals')
    , passport  = require('./passport')
    , flash     = require('connect-flash')
    , helpers   = require('./helpers')
    , fs        = require('fs')

 
var app = express()
var config = helpers.getConfig('config.json')

app.set('post dir', path.join(__dirname, 'posts'))

app.set('port', config.app_port || 3000)
app.set('env', config.app_env || 'development')
app.set('secret', config.app_secret || 'WHAT IS A MAN')
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
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


var less_opts = {
   src              : path.join(__dirname, 'static'),
   compress         : false,
   debug            : false,//true,
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

    var mongoose_user = config.mongo_user || ''
      , mongoose_pass = config.mongo_pass || ''
      , mongoose_host = config.mongo_host || 'localhost'
      , mongoose_port = config.mongo_port || 27017
      , mongo_db_name = config.mongo_db_name || 'posts'

    
    mongoose.connect('mongodb://' + mongoose_user + ':' + mongoose_pass + '@' + mongoose_host + '/'  + mongo_db_name)
}

app.use(require('less-middleware')(less_opts))
app.use(express.static(path.join(__dirname, 'static')))

// Template locals
app.locals.md = md
app.locals.pretty_date = locals.pretty_date

// User template setter
app.use(function (req, res, next) {
    res.locals.user = req.user || false
    next()
})

// Login middleware
function loginRequired(req, res, next) {
    if (!req.user) {
        console.log('~~~~~> login required for %s', req.path)
        req.flash('error', 'Hey you dumb guy you gotta log in first!')
        res.redirect('/login')
    }
    next()
}

// Flash template local setter middleware
app.use(function (req, res, next) {
    res.locals.flashes = req.flash()
    next()
})

// So, this has to be the last use statement, apparently
app.use(app.router)

// Routes
// Frontend Routes
app.get('/', routes.posts)
app.get('/tags/:tag', routes.posts_by_tag)
app.get('/posts/:slug', routes.post_by_slug)
app.get('/posts/:id', routes.post)

// Dashboard Routes
app.get('/dash', loginRequired, routes.dash)
app.get('/dash/post/new', loginRequired, routes.new_post)
app.post('/dash/post/new', loginRequired, routes.new_post)
app.get('/dash/post/:id', loginRequired, routes.edit_post)
app.post('/dash/post/:id', loginRequired, routes.edit_post)

app.get('/dash/post/:id/delete', loginRequired, routes.del_post)

// Auth routes
app.get('/logout', loginRequired, function(req, res) { req.logout(); res.redirect('/') })
app.get('/login', routes.login)
app.post('/login', passport.authenticate('local', {
            successRedirect: '/dash',
            failureRedirect: '/login',
            failureFlash: true
}))

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})
