# Moar Butts
## or We Need to Talk About CORS

__Cross Origin Resource Sharing__ is the art of setting request and response
headers to allow cross domain requests to go off.

### But What Headers Must Me Employ?
Only acceptable for `GET`, `HEAD`, or `POST` requests.

If `POST`, only a `Content-Type` of `x-www-form-urlencoded`,
`multipart/form-data`, or `text/plain` is acceptable.

#### Thither
* `Origin: http://anexampledomain.poo`

#### Return
* `Access-Control-Allow-Origin: http://anexampledomain.poo`

### You Have Laid Out Some Rather Stringent Constraints
_But what if we intend the use of such a request in exception to these_
_constraints?_

Such as a different HTTP verb or some other `Content-Type`, or even further
if customer headers are used.

In such an event, god help you, you must use some additional headers informing
the server of the verb you intend to use as well as any additional such
headers.

#### Thither
Modern browsers understand your problems, and will send an `OPTIONS` request
in advance of your payload bearing request to inform the server of your
 intentions.

* `Origin: http://ourdomain.wee`
* `Access-Control-Request-Method: POST`
* `Access-Control-Request-Headers: X-THINGDOODY`

#### Return
* `Access-Control-Allow-Origin: http://ourdomain.wee`
* `Access-Control-Allow-Methods: GET, POST, PUT`
* `Access-Control-Allow-Headers: X-THINGDOODY`
* `Access-Control-Max-Age: 1728000` _number of seconds the preflight OPTIONS req can be cached_

#### And Again, Sent
* `Origin: http://ourdomain.wee`
* `X-THINGDOODY: someval`  _as indicated_

#### The Conversation Continues
* `Access-Control-Allow-Origin: http://ourdomain.wee`

------------
