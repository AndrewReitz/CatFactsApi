
/**
 * Module dependencies.
 */

var express = require('express')
, gzippo = require('gzippo') //Gzip files that can https://github.com/tomgco/gzippo
, connect = require('connect')
, minify = require('./code/minify.js')
, routes = require('./routes');

//run minification of files (server starts b4 this is done, if client side js errors this is why)
minify.run;

var app = module.exports = express.createServer();

// Configuration

var pub = __dirname + '/public';

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src: pub }));
    app.use(app.router);
    app.use(gzippo.staticGzip(pub));
    app.use(gzippo.compress());
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/.json', routes.getJson);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
