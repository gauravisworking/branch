function markDelayASCompleted(delay){
	
	setTimeout(function(){
		delayCompleted = true;
	},Number(delay));
}

function updateServer()
{
	if (config.useLocalServer)
	{
		config.usedServerPort = config.localServerPort;
		config.usedServerIp = config.localServerIp;
		config.usedServer = config.localServerIp + ":" + config.localServerPort;
	}
	else
	{
		config.usedServerPort = config.staticServerPort;
		config.usedServerIp = config.staticServerIp;
		config.usedServer = config.staticServerIp + ":" + config.staticServerPort;
	}

	showInfo('Ip Updated to : ' + config.usedServer);
	connectToServer();
}

function connectToServer()
{
	window.tlantic.plugins.socket.disconnectAll(
		function (){
			window.tlantic.plugins.socket.connect(function ()
			{
				if (!domEventAdded){
					domEventAdded = true;
					document.addEventListener(
						window.tlantic.plugins.socket.receiveHookName,function (ev)
						{
							//alert('Data received : ' + ev.metadata.data);
							var respData = ev.metadata.data;
							try{
								var resp = JSON.parse(respData.trim());
								//alert(resp.jobId);
								if(resp.massage == "ACK")
									if(resp.jobId == pervious.jobId)
									{
										pervious.jobDone = true;
									}
									
								if(resp.isDataFromHome)
								{
									
									if(resp.payload.indexOf("EdgeBoard")!=-1){
										//alert("update : "+resp.payload);
										var tempData = resp.payload.split("-");
										var btnId = "#"+tempData[0]+"-"+tempData[2];
										if(tempData[1]=="ON" && !$(btnId).hasClass("checked")){
											$(btnId).toggleClass('checked');
										}
										else
										{
											if($(btnId).hasClass("checked"))
											{
												$(btnId).toggleClass('checked');
											}
										}
										
									}
								}
							}
							catch (e){
							pervious.jobDone = true;
								//alert('error in parcing json');
							}
							
						}
					);
				}
				unMaskPage();
			},
			function ()  {},
			config.usedServerIp,
			Number(config.usedServerPort));
		},

		function (){
			unMaskPage();
			console.log('failed!');
		}
	);

}

function disconnectAll()  {}

function showInfo(text)
{
	if (debugApp)
		alert(text);
}

function onOffline()
{
	showInfo('device offline');
	checkConnection();
};

function onOnline()
{
	/*
	showInfo('device online');
	newConnectionType = checkConnection();
	showInfo('oldConnectionType : ' + oldConnectionType + ' | newConnectionType : ' + newConnectionType);

	if (newConnectionType != oldConnectionType)
{
	if (newConnectionType.indexOf('Cell') != -1)
{

	showInfo('changing connection to Cloud');
	maskPage();
	window.tlantic.plugins.socket.disconnectAll(
	function ()
{
	console.log('disconnectAll!');
	useLocalServer = false;
	localStorage.setItem('useLocalServer', useLocalServer);
	usedIp = useLocalServer ? localServerIp : staticServerIp;
	showInfo('Using ip  = ' + usedIp);
	usedIpWithPort = useLocalServer ? localServerIpWithPort : staticServerIpWithPort;
	showInfo('with port +' + usedIpWithPort);
	connectToServer();
	unMaskPage();
	},

	function ()
{
	unMaskPage();
	console.log('failed!');
	}
	);
	}
	if (newConnectionType.toString().indexOf('WiFi') != -1)
{
	ons.notification.confirm(
{
	message : 'Are you connected to your Home Wifi ?',
	modifier : 'material',
	buttonLabels : ['No', 'Yes'],
	callback : function (idx)
{
	switch (idx)
{
	case 0:
	maskPage();
	window.tlantic.plugins.socket.disconnectAll(
	function ()
{
	usedIp = staticServerIp;
	usedIpWithPort = staticServerIpWithPort;
	connectToServer();
	unMaskPage();
	},

	function ()
{
	unMaskPage();
	console.log('failed!');
	}
	);

	break;
	case 1:

	maskPage();
	window.tlantic.plugins.socket.disconnectAll(
	function ()
{
	usedIp = localServerIp;
	usedIpWithPort = localServerIpWithPort;
	connectToServer();
	unMaskPage();
	},

	function ()
{
	unMaskPage();
	console.log('failed!');
	}
	);

	break;
	}
	}
	}
	);
	}

	}

	oldConnectionType = newConnectionType;
	 */
};

function checkConnection()
{
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.CELL] = 'Cell generic connection';
	states[Connection.NONE] = 'No network connection';
	showInfo('Connection Type : ' + states[networkState]);
	if (!networkListnerAdded)
	{
		networkListnerAdded = true;
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);
	}
	return states[networkState];
}