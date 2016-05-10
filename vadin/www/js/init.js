var localStorage = window.localStorage;

var pervious = {
jobDone : true,
jobId : 0
};
var config =
{
	homeId : "homeId_1001",
	userName : (localStorage.getItem("userName")) ? localStorage.getItem("userName") : "-1",
	staticServerIp : localStorage.getItem("staticServerIp"),
	staticServerPort : localStorage.getItem("staticServerPort"),
	staticServer : null,

	localServerIp : localStorage.getItem("localServerIp"),
	localServerPort : localStorage.getItem("localServerPort"),
	localServer : null,

	useLocalServer : localStorage.getItem("useLocalServer"),

	usedServerPort : null,
	usedServerIp : null,
	usedServer : null

};

localStorage.setItem('houseRowState', "0");




if(!localStorage.getItem("json"))
{
	localStorage.setItem('json',JSON.stringify(json));
}
localStorage.setItem('json', JSON.stringify(json));
var houseJson = JSON.parse(localStorage.getItem("json"));
	

	

var currentRoomName = "";

var isFirstTimeLaunch = false;
if(config.userName == "-1")
{
	//alert('first time launch');
	isFirstTimeLaunch = true;
}

var domEventAdded = false;
var networkListnerAdded = false;
var oldConnectionType = '';
var newConnectionType = '';
var ack = false;


var ws2;
function sendwData(msg){
	/*var msg ={};
	msg.isUser = true;
	msg.performAction = true;
	msg.action = "ABCD";
	msg.name = "oneBeast";
	msg.houseId = "house_1";*/
	ws2.send(msg);
	console.log('data send',msg);
}
 function WebSocketTest()
 {
	if ("WebSocket" in window)
	{
	   console.log("WebSocket is supported by your Browser!");
	   
	   
	   var obj = {
			isUser : true,
			registerMe : true,
			name : "Gaurav",
			houseId : "house_1"
		}
		var queryStrnig = JSON.stringify(obj);
		ws2 = new WebSocket('wss://websocket-hometesting.rhcloud.com:8443/'+queryStrnig);
		//ws = new WebSocket('ws://192.168.0.124:8080/'+queryStrnig);

	   // Let us open a web socket
	   
		
	  
	   
		ws2.onopen = function()
	   {
		  // Web Socket is connected, send data using send()
		 // ws.send("Message to send");
		  console.log("Connection created 2");
		   //alert("static connected");
	   };
		
	  
	    ws2.onmessage = function (evt) 
	   { 
		  var received_msg = evt.data;
		  console.log("----",received_msg);
		  
	   try{
		   var obj = JSON.parse(evt.data);
		   var list= null;
		   if(obj.payload.indexOf('-OFF-')!=-1)
			{
				list = document.getElementById(obj.payload.replace('OFF','ON'));
				list.getElementsByTagName('input')[0].checked = false;
			}
			else{
				list = document.getElementById(obj.payload);
				list.getElementsByTagName('input')[0].checked = true;
			}
	   }
	   catch(e){
		   
	   }
		   
			  
			  
		   //alert("2 -- "+received_msg);
	   };
		
	   ws2.onclose = function()
	   { 
		  // websocket is closed.
		  console.log("Connection is closed..."); 
	   };
	}
	
	else
	{
	   // The browser doesn't support WebSocket
	   console.log("WebSocket NOT supported by your Browser!");
	}
 }
 
 //WebSocketTest();
 
 
 /*
 var socket;

              socket = io.connect('wss://websocket-hometesting.rhcloud.com:8443');
 
              socket.on('news', function(data) {
                console.log(data);
                socket.emit('my other event', {
                  my: 'data'
                });
              });
			  */
var socket = io.connect('wss://websocket-hometesting.rhcloud.com:8443');
var houseId = 'house_1';
var connectionObj = {
house : 'house_1',
name : 'Gaurav'
};

var authenticationObj = {
	username : 'Gaurav',
	password : 'Solanke',
	isUser : true,
	isHome : false,
	name : 'oneBeast',
	houseId : houseId
}
socket.on('connect', function(){
	
  socket.emit('authentication', authenticationObj);
  
  socket.on('authenticated', function() {
	  	
	socket.on('newUserJoined',function(msg){
		console.log('New user is online : ', msg);
	});
	socket.on('recieve',function(msg){
		console.log('form other deviec', msg);
		
		try{
		   var obj = JSON.parse(msg);
		   var list= null;
			   
			   if(obj.payload )
				{
					if(obj.payload.indexOf('*')!=-1)
				{ 
					var arr = obj.payload.split("*");
					var boardName = arr[0];
					var pointLists = arr[1];//OFF-53,OFF-45,OFF-39,OFF-33,OFF-27,OFF-25,
					var pointarr = pointLists.split(",");
					for(var x = 0; x < pointarr.length-1;x++){
						var point = boardName+"-"+pointarr[x];
						
						if(point.indexOf('-OFF-')!=-1)
						{
							list = document.getElementById(point.replace('OFF','ON'));
							if(list && list.getElementsByTagName('input'))
							list.getElementsByTagName('input')[0].checked = false;
						}
						else if (point.indexOf('-ON-')!=-1){
							list = document.getElementById(point);
							if(list && list.getElementsByTagName('input'))
							list.getElementsByTagName('input')[0].checked = true;
						}
						
						updateFrameworkData(point);
						
					
					}
				}
				else{
					if(obj.payload.indexOf('-OFF-')!=-1)
					{
						list = document.getElementById(obj.payload.replace('OFF','ON'));
						list.getElementsByTagName('input')[0].checked = false;
					}
					else{
						list = document.getElementById(obj.payload);
						list.getElementsByTagName('input')[0].checked = true;
					}
					
					updateFrameworkData(obj.payload);
					
				}
					
				}
			else{
				var payload = obj.topic +"-"+obj.action;
				if(payload.indexOf('-OFF-')!=-1)
					{
						list = document.getElementById(payload.replace('OFF','ON'));
						list.getElementsByTagName('input')[0].checked = false;
					}
					else{
						list = document.getElementById(payload);
						list.getElementsByTagName('input')[0].checked = true;
					}
					
					updateFrameworkData(payload);
			}
		   
	   }
	   catch(e){
		   console.log('Unable to parse');
	   }
	})
  });
  
  socket.on('disconnect', function() {
	console.log('disconnected');
  });
  
  socket.on('unauthorized', function(err){
	  console.log("There was an error with the authentication:", err.message); 
  });
});


function sendioData(msg){
	/*var msg ={};
	msg.isUser = true;
	msg.performAction = true;
	msg.action = "ABCD";
	msg.name = "oneBeast";
	msg.houseId = "house_1";*/
	socket.emit('houseUpdates', msg);
	//ws2.send(msg);
	//console.log('data send',msg);
}

function updateFrameworkData(nodeString){
	
	console.log("Changing: ",nodeString);
	var newState = null;
	
	if(nodeString.indexOf('-OFF-')!=-1)
	{
		newState = "";
	}
	else{
		newState = "checked";
	}

	var obj = nodeString.split("-");
	var boardName = obj[0];
	var pinNumber = obj[2];
	var roomMatch = false;
	for (var f = 0; f < Template7.data.house.rooms.length; f++)
	{
		if(roomMatch)
			{
				break;
			}
		var room = Template7.data.house.rooms[f];
			for (var x = 0; x < room.points.length; x++)
			{
				var point = room.points[x];
				if (boardName == point.b)
				{
					var match = false;
					if(point.a && point.a.length > 0)
					{
						for(var i=0; i < point.a.length; i++)
						{
							if(point.a[i].p == ("ON-"+pinNumber))
							{
								match = true;
								break;
							}
						}
					}
					
					if(match)
							{
								Template7.data.house.rooms[f].points[x].state = newState;
								roomMatch = true;
								break;
							}
					
					console.log(Template7.data.house.rooms[f].points[x].state);
					
				}
			}
	}
}
		 
		 
