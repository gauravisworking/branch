require.cache = {};

mosca 			= require('mosca');
net 			= require('net');
replaceall		= require("replaceall");
Agenda		    = require("agenda");

config = {
	staticMasterIp : '123.201.194.202',
	staticMasterPort : 5001,
	localServerPort : 5000,
	moscaPort : 1883,
	homeId : 'house_1',
	projectDbUrl : "mongodb://localhost:27017/myproject",
	agendaDbUrl : "mongodb://localhost:27017/agenda",
};

clients = [];
pubSubServer = null;
mongoClient = null;
agenda = null;

ws = null;

var localServer = null;
var staticServer = null;
var mongoUtils = null;
var agendaUtils = null;
var moscaServer = null;
var staticClient = null;

var webSocketObj = null;

ioClient = null;


/*
// -------------------------------------------------------- Mongo DB ---------------------------------------------
mongoUtils = require('./mongoUtils');
mongoUtils.createClient();
mongoUtils.connect(config.projectDbUrl);
// -------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------- Mosca Server ---------------------------------------------
agendaUtils = require('./agendaUtils');
agendaUtils.init(config.agendaDbUrl);
agendaUtils.execute();
// -------------------------------------------------------------------------------------------------------------------
*/




// --------------------------------------------------- Websocket Client  -------------------------------------------------
webSocketObj = require('./websocket');
webSocketObj.initWebSocketServer();
//



// -------------------------------------------------------- Local Websocket Server ---------------------------------------------
localServer = require('./localServer');
localServer.initLocalServer();
// -------------------------------------------------------------------------------------------------------------------




// -------------------------------------------------------- Mosca Server ---------------------------------------------
moscaServer = require('./moscaServer');
moscaServer.initMoscaServer();
// -------------------------------------------------------------------------------------------------------------------

