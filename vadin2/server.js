var express = require('express');
var app = express();
var http = require('http');
var osipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var osport = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.set('port', osport || 3000);
app.set('ipaddress', osipaddress);

var server = http.createServer(app);
var io = require('socket.io').listen(server);


require('socketio-auth')(io, {
  authenticate: function (socket, data, callback) {
	console.log('authenticate in progress');
    var username = data.username;
    var password = data.password;
    console.log('Authenticated....');
    if(username == password)
    	{
    		return callback(new Error("User not  found"));
    	}
    else
    	{
    		return callback(null, true); 
    	}
  },
  postAuthenticate : function(socket, data) {
	  socket.houseId = data.houseId;
	  console.log('User joined room : ',data);
	  socket.join(socket.houseId);
	  socket.broadcast.to(socket.houseId).emit('newUserJoined', data.name);
	},
  timeout : 4000 
});

io.sockets.on('connection', function(socket){ 

    socket.on('houseUpdates',function(data){
    	var obj = JSON.parse(data);
    	socket.broadcast.to(socket.houseId).emit('recieve', data);
    	console.log("Form house : "+socket.houseId,obj);
    });
    
});

server.listen(app.get('port'), app.get('ipaddress'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


//socket.on('message', function (data) {
    /*considering data.room is the correct room name you want to send message to */
   // io.sockets.in(data.room).emit('recieve', data.message) //will send event to everybody in the room while 
   // socket.broadcast.to(data.room).emit('recieve', data.message) //will broadcast to all sockets in the given room, except to the socket which called it
    /* Also socket.broadcast.emit will send to every connected socket except to socket which called it */
//});

//... code to continue

/*var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
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


wss = new WebSocketServer({
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
		if(params.isHouse)
		{
			
			if(params.registerMe)
			{
				
				var count = houseClients.length;
				while(count--)
				{
					if(houseClients[count] && houseClients[count].houseId == params.houseId)
					{
						houseClients[count].close();
						houseClients.splice(count, 1);
						console.log("Existing house removed : ",params.houseId);
						break;
					}
					
				}
				
				ws.name = params.name;
				ws.houseId = params.houseId;
				houseClients.push(ws);
				console.log("New House online : ",params.houseId);
				ws.send('Welcome ',params.name);
			}
		}
		else if(params.isUser)
		{
			if(params.registerMe)
			{
				
				var count = userClients.length;
				while(count--)
				{
					if(userClients[count] && userClients[count].houseId == params.houseId && userClients[count].name == params.name)
					{
						userClients[count].close();
						userClients.splice(count, 1);
						console.log("Existing user removed : ",params.name);
						break;
					}
					
				}
				ws.name = params.name;
				ws.houseId = params.houseId;
				userClients.push(ws);
				console.log("New User online : ",params.name);
				ws.send('Welcome user ',params.name);
				
				var count = houseClients.length;
				console.log("Sending updates to user");
				while(count--)
				{
					if(houseClients[count] && houseClients[count].houseId == params.houseId)
					{
						
						var message = {
								stat : true
						}
						houseClients[count].send(JSON.stringify(message));
						console.log("house found : ",params.houseId);
						break;
					}
					
				}
				
				
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
			console.log('houseId : ',ws.houseId);
			var msg = JSON.parse(message);
			console.log('msg received : ',message)
			if(msg.isHouse)
			{
				
			}
			if(msg.isUser)
			{
				if(msg.performAction)
				{
					var action = msg.action;
					var count = houseClients.length;
					console.log("Performing action");
					while(count--)
					{
						if(houseClients[count] && houseClients[count].houseId == msg.houseId)
						{
							houseClients[count].send(message);
							console.log("house found : ",msg.houseId);
							break;
						}
						
					}
				}
			}
			else if(msg.isHouse)
			{
				if(msg.publish)
				{
					var count = userClients.length;
					console.log("Publishing to users ");
					while(count--)
					{
						if(userClients[count] && userClients[count].houseId == msg.houseId)
						{
							userClients[count].send(message);
							console.log("user found : ",userClients[count].name);
						}
						
					}
				}
			}
		}
		catch(e){
			console.log("Error parsing json : ",message)
		}
		
	});
});



console.log("Listening to " + ipaddress + ":" + port + "...");*/