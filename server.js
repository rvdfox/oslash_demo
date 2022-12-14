var app = require('./app');
var port = process.env.port || 5000;
var server = require('http').createServer(app);

server.listen(port,function(){
	console.log('Server listening on ',port);
});