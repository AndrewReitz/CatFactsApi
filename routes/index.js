var reddit = require('../code/reddit');

exports.index = function(req, res){
    res.render('index', { title: 'Express' })
};

exports.getJson = function(req, res) {
    reddit.getJson(null, function(reddit) {
	var theGoods = JSON.parse(reddit);
	var imgur = /^https?:\/\/(?:[i.]|[edge.]|[www.])*imgur.com\/(?:r\/[\w]+\/)?([\w]{5,})(\..+)?$/i;
	var returnArray = [];
	theGoods.data.children.forEach(function(child) {
	    var imageData = imgur.exec(child.data.url);
	    console.log(JSON.stringify(imageData));
	    if (imageData) {
		returnArray.push({
		    url: 'http://i.imgur.com/' + imageData[1] + '.jpg',
		    thumb: child.data.thumbnail,
		    title: child.data.title
		});
	    }

	});

	var returnValue = {after: theGoods.data.after, images: returnArray};
	res.send(returnValue);
    });
};