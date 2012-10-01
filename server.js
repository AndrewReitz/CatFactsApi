
/**
 * Module dependencies.
 */

var express = require('express')
, gzippo = require('gzippo') //Gzip files that can https://github.com/tomgco/gzippo
, connect = require('connect')
, routes = require('./routes');

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
app.get('/:numberOfCatFacts', routes.index);

app.listen(process.env['app_port'] || process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
