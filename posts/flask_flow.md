# The Flow of Data Through Flask
## Data in flask goes all over the place, you know

## Request

Incoming data gets wrapped up in a `flask.Resquest`, accessible as such:

### Attributes
* form
* args
* values
* cookies
* stream
* headers
* data
* files
* environ
* method
* is\_xhr
* blueprint
* module
* endpoint
* json _use get\_json() instead_
* max\_content\_length
* routing\_exception
* view\_args

* path
* script\_root
* url
* base\_url
* url\_root

### Methods

* get\_json()
* on\_json\_loading\_failed(e) 

## Response

    return 'this string as a response'

`make_response()` picks up the value returned by a given view function and
bundles is up as a `flask.Response`.

To overwrite or customize, subclass `flask.Response` and set your work on
`app.response_class`.

A Response has several attributes and a few moving parts:

### Attributes
* headers
* status
* statusCode
* data __deprecatation warning__
* mimetype

### Methods
* set\_cookie(k, v, max\_age=None, expires=None, path='/', domain=None, secure=None, httponly=False)

------

# Consider Flask Sessions
## So Handy, Those Things

As a prerequisite, you must set `app.config['SECRET_KEY']` to a secret string.
Flask will us this value to sign the cookie it uses to keep track of sessions.

Thereupon, session data will be available on`app.session`.

### Attributes
* new
* modified
* permanent

## As Always, You Have Options

If you so desire it, you can implement your own session management logic
by implementing [`flask.sessions.SessionInterface`](http://flask.pocoo.org/docs/api/#session-interface).

------

# Useful Shit and Globals
## Ain't Nothin But a `g` Thang

For general purpose storage withing the application context, put stuff on
`app.g`.  Given that this is bound to the app context, you can only access
it with an active app context.

    with app.app_context():
        app.g.butts = 'yes'

Also, dig on the fact that you can access `g` via a dict style `.get()`
method. 

Also also note that `g` is a proxy.

## The Aforementioned Useful Shit


### Context Management

`flask.current_app` points to the app object handling a given request.
This handy for accessing the application object in the context of a blueprint.

`flask.has_request_context()` returns a bool on the presence of a request.

`flask.copy_request_context(f)` is a decorator.

`flask.has_app_context()`

### Handy URL Generator

`flask.url_for(endpoint, **endpoint_args)`


### Response Utilities

`flask.abort(stat_code)`

`flask.redirect(location, code=302)`

`flask.make_response(*args)` used internaly to make `flask.Response` objects

`flask.after_this_request()` decorator

`flask.send_file(fname_or_fp, mimetype=None, as_attachment=False, add_etags=True, cache_timeout=None, conditional=False)`

`flask.send_from_directory(directory, fname, **options)`

`flask.safe_join(dir, fname)`


### HTML

`flask.escape(str)`

`flask.Markup` now here's a lovely class.  A string passed into it's
constructor will be marked as safe for use in a template.

Further, pass html into `Markup.escape()` and it will be escaped.

Further further, you can `unescape()` and `strip_tags()`.

### Flashing

`flask.flash(message, category='message')`

`flask.get_flashed_messages(with_categories=False, category_filter=[])`

-----
