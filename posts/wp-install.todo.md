# Oh Wordpress, How Do I Love Thee
## Let Me Count the Ways

###  wp-config.php
1. copy
2. enter salts
3. enter db uri, user, pass, db name

### set up wp dir
1. copy wordpress to deployment dir
2. NGINX: see below

### Satisfy dependencies

#### PHP
1. `sudo apt-get install php5-gd` for thumbnail generation
2. `sudo apt-get install php5-fpm` for fastcgi
3. set cgi.fix\_pathinfo=0 in /etc/php5/fpm/php.ini
4. set listen = /var/run/php5-fpm.sock in /etc/php5/fpm/pool.d/www.conf
5. `sudo service php5-fpm restart`

#### MySQL
1. `sudo apt-get install mysql-server php5-mysql`
2. `sudo mysql_install_db`
3. `sudo /usr/bin/mysql_secure_installation`
4. create database 'wordpress'
    `CREATE DATABASE wordpress;`

5. create user 'wordpress-hss-blog' and set a password (crazy hash)
    `CREATE USER wordpress-hss-blog@localhost;`
    `SET PASSWORD FOR wordpress-hss-blog@localhost= PASSWORD("password");`

6. set user privileges
    `GRANT ALL PRIVILEGES ON wordpress.* TO wordpress-hss-blog@localhost IDENTIFIED BY 'password';`

7. flush
    `FLUSH PRIVILEGES;`

To change mysql root pass:
`/usr/bin/mysqladmin -u root password 'new-password'`
`/usr/bin/mysqladmin -u root -h hss-dev password 'new-password'`


#### nginx

Give ownership of wp dir to nginx

        sudo chown www-data:www-data $wp-dir -R
        sudo usermod -a -G www-data `whoami`

Consider creating a server block in a seperate file and linking it to 
a sites active dir

In /etc/nginx/nginx.conf

        server {
            listen   80;
        
            root /usr/share/nginx/www;
            index index.php index.html index.htm;
        
            server_name example.com;

            # we're serving the blog at hairshopsearch.com/launch
            # and we're passing the query string so we can use permalinks
            location /launch { 
                    try_files $uri $uri/ /index.php?q=$uri&$args;
            }
        
            error_page 404 /404.html;
        
            error_page 500 502 503 504 /50x.html;
            location = /50x.html {
                  root /usr/share/nginx/www;
            }
        
            # pass the PHP scripts to FastCGI server listening on /var/run/php5-fpm.sock
            location ~ \.php$ {
                    try_files $uri =404;
                    fastcgi_pass unix:/var/run/php5-fpm.sock;
                    fastcgi_index index.php;
                    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                    include fastcgi_params;
                    
            }
        }

### Access the fresh install to complete installation

Hit up domain.com/admin/install.php a follow the instructions.

----------
