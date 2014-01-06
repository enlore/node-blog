# It's A Date
## In JS

### Like so many things, it all starts with a constructor

    var d = new Date()
    console.log(d)
    // Sun Jan 05 2014 23:40:50 GMT-0600 (CST)

A brand new date object initialized to the moment in time at which it was
created.

The `Date` constructor has several different signatures, serving up different
vectors for creating dates.

It accepts a timestamp:

    var d_from_stamp = new Date(1388987183152)

A string in the [ietf RFC 2882](http://tools.ietf.org/html/rfc2822#page-14) format
or the [ISO 8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format:

    // YYYY-MM-DDTHH:mm:ss.sssZ, being ISO 8601, for instance
    var d_from_string = new Date('2013-05-22T11:93:33.325Z')
    

A bunch of integers:

    // integers, integers, integers (only year and month required)
    var d_from_stuff = new Date(year, month, day, hour, min, sec, millisecond)

__Note__ that hitting up `Date` as a function will just return a string
rep of the date.

    console.log(Date()) 
    // 'Mon Jan 06 2014 00:07:24 GMT-0600 (CST)'


So that's how to make dates, in a nutshell, but of course there's more.

### Static methods

Is that cool?  Calling them static methods?  I mean, it's not like we
actually have access control or anything.  Class methods? It's not really
a class, per se.

Hrm.  Maybe...

### Methods on the Constructor Prototype (I Think)

Get us a timestamp:

    Date.now()
    // 1388988712511

This is spiffy, but IE < 9 won't like it. If you care about browser
compatability, use:

    new Date().getTime()

How about a timestamp parsed from a string?

    Date.parse('Mon Jan 06 2014 00:07:24 GMT-0600 (CST)')
    // 1388988444000

And now for a constructor that craps out a UTC timestamp:

    Date.UTC(year, month, day, hour, min, sec, millisec)
    // only year and month are mandatory, just like the new Date() sig

### Timestamps

UNIX-y timestamps are in seconds.  JS timestamps are in milliseconds. Hrm.

    ts = Math.round( new Date().getTime() / 1000 )
    // make a new date, call an instance method that returns a js timestamp,
    // shave off a few places, and round

--------
