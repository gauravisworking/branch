module.exports = {
	initLocalServer : function () {
		
		var ipaddress = "192.168.0.124";
		var port = 8080;
		var http = require('http');

		replaceall = require("replaceall");

		var server = http.createServer(function(request, response) {
			console.log((new Date()) + ' Received request for ' + request.url);
			response.writeHead(200, {
				'Content-Type' : 'text/plain'
			});
			response.write("Welcome to Node.js on OpenShift Gaurav!\n\n");
			response.end("Thanks for visiting us! \n");
		});
		server.listen(port, ipaddress, function() {
			console.log((new Date()) + ' Server is listening on port 8080');
		});

		var WebSocketServer = require('ws').Server;

		var houseClients = [];
		var userClients = [];


		var wss = new WebSocketServer({
			server : server,
			autoAcceptConnections : true
		});


		wss.on('connection', function(ws) {
			try{
				var rawURLparams = ws.upgradeReq.url;
				rawURLparams = replaceall('/', '', rawURLparams);
				rawURLparams = replaceall('%22', '"', rawURLparams);
				rawURLparams = replaceall('%7B', '{', rawURLparams);
				rawURLparams = replaceall('%7D', '}', rawURLparams);
				var params = JSON.parse(rawURLparams);
				console.log("url: ", params);
				if(params.isUser)
				{
					if(params.registerMe)
					{
						ws.name = params.name;
						ws.houseId = params.houseId;
						userClients.push(ws);
						console.log("New User online : ",params.name);
						ws.send('Welcome ',params.name);
					}
				}
				else
				{
					ws.close();
					ws.terminate();
					return;
				}
			}
			catch(e){
				console.log("unknown breach : ", ws.upgradeReq.url);
				ws.close();
				ws.terminate();
				return;
			}

			ws.on('message', function(message) {
				try{
					var msg = JSON.parse(message);
					
					if(msg.isUser)
					{
						if(msg.performAction)
						{
							console.log('Performed ',message)						
						}
					}
				}
				catch(e){
					console.log("Error parsing json : ",message)
				}
				
			});
		});



		console.log("Local websocket server started");
				
	}
}
