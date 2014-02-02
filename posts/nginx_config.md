---
{
    title:  Configuring nginx,
    slug: configuring-nginx,
    publishDate: 2014-01-13
}
----

## Like buttaahh
ITT, we configure nginx to do stuff.

Consider `/etc/nginx/nginx.conf`. (_Note_: This path is specific to Ubuntu.
Consult the docs for your os to find where you nginx config is haning out.)

### It Has variables.

<table class="table">
    <thead>
        <tr>
            <th>Var</th>
            <th>Desc</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$request_uri</td>
            <td>original, unaltered path and args</td>
            <td>/path/to/resource?foo=bar&baz=butts+booty</td>
        </tr>
        <tr>
            <td>$arg_PARAM</td>
            <td>contains the value of a GET query param named by PARAM</td>
            <td>$arg_foo</td>
        </tr>
        <tr>
            <td>$args</td>
            <td>mutatable GET query string</td>
            <td>foo=butts&bar=123+go</td>
        </tr>
        <tr>
            <td>$binary_remote_addr</td>
            <td>remote address of client in binary</td>
            <td>n/a</td>
        </tr>
        <tr>
            <td>$body_bytes_sent</td>
            <td>number of bytes sent as part of body of resp</td>
            <td>4567</td>
        </tr>
        <tr>
            <td>$content_length</td>
            <td>value of 'Content-Length' header from req</td>
            <td>3456</td>
        </tr>
        <tr>
            <td>$content_type</td>
            <td>value of the $content_type header from req</td>
            <td>text/html; charset=ISO-8859-4</td>
        </tr>
        <tr>
            <td>$cookie_COOKIE</td>
            <td>value of a cookie on req named by COOKIE</td>
            <td></td>
        </tr>
        <tr>
            <td>$document_root</td>
            <td>contains value of <code>root</code> directive for current req</td>
            <td>/var/www</td>
        </tr>
        <tr>
            <td>$document_uri</td>
            <td>same as <code>$uri</code></td>
            <td></td>
        </tr>
        <tr>
            <td>$host</td>
            <td>value of Host header OR name of server handling request</td>
            <td>domain.com</td>
        </tr>
        <tr>
            <td>$hostname</td>
            <td>value returned by machine's gethostname</td>
            <td>secksmachine_002</td>
        </tr>
        <tr>
            <td>$http_HEADER</td>
            <td>value of http header named by HEADER</td>
            <td>for 'X-Requested-With': XMLHttpRequest</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
----------
