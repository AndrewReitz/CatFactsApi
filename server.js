
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');

// Configuration

var pub = __dirname + '/public';

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
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

app.listen(process.env['app_port'] || process.env.PORT || 3000, function () {
    console.log("Express server listening in %s mode", app.settings.env);
});
