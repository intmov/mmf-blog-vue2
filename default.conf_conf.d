upstream server-api{
    server 127.0.0.1:4000;    
}

server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
    
    root   /usr/local/src/mmf-blog-vue2/dist;
    index  index.html;
    location / {
	try_files $uri $uri/ @router;
        index index.html;
    }
    location /backend/ {
	try_files $uri $uri/ @router;
	index admin.html;
    }

    location @router {
         rewrite ^.*$ /index.html last;
    }

    location ^~/api/ {
        rewrite ^/(.*)$ /$1 break;
        proxy_pass http://server-api;
    }
   
    location ~ .*\.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm)$
    {
        expires      7d;
    }

    location ~ .*\.(?:js|css)$
    {
        expires      7d;
    }

    location ~ .*\.(?:htm|html)$
    {
        add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
    }
 
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

