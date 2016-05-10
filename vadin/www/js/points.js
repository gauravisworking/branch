myApp.onPageInit('points', function (page)
{

	$$('.open-controls').on('click', function (e){
		mainView.router.load({
			url : 'roomBox.html',
			context : Template7.data.house.rooms
		});
	});

	$$('.point-notify').on('click', function (e){
		setTimeout(function (obj){
			var id = obj.getAttribute('dataobj');
			if (obj.style.backgroundColor == 'dodgerblue')
			{
				obj.style.backgroundColor = '#c7c7cc';
				obj.innerHTML = '<i class="ion-android-notifications-off" style="font-size:1.62em;"></i>';
				getNodeById(id).notify = 'no';
			}
			else
			{
				obj.style.backgroundColor = 'dodgerblue';
				obj.innerHTML = '<i class="ion-android-notifications" style="font-size:1.62em;"></i>';
				getNodeById(id).notify = 'yes';
			}
		}, 300, this);
	});

	$$('.point-time').on('click', function (e){
		setTimeout(function (obj)
		{
			var id = obj.getAttribute('dataobj');
			if (obj.style.backgroundColor == 'salmon')
			{
				obj.style.backgroundColor = '#c7c7cc';
				obj.innerHTML = '<i class="ion-ios-stopwatch-outline" style="font-size:1.62em;"></i>';
				getNodeById(id).sch = 'no';
			}
			else
			{
				obj.style.backgroundColor = 'salmon';
				obj.innerHTML = '<i class="ion-ios-stopwatch" style="font-size:1.62em;"></i>';
				getNodeById(id).sch = 'yes';
			}
		}, 300, this);
	});

	$$('.point-fav').on('click', function (e)
	{
		setTimeout(function (obj){
			var id = obj.getAttribute('dataobj');
			if (obj.style.backgroundColor == 'gold')
			{
				obj.style.backgroundColor = '#c7c7cc';
				obj.innerHTML = '<i class="ion-android-star-outline" style="font-size:1.62em;"></i>';
				getNodeById(id).fav = 'no';
			}
			else
			{
				obj.style.backgroundColor = 'gold'
					obj.innerHTML = '<i class="ion-android-star" style="font-size:1.62em;"></i>'
					getNodeById(id).fav = 'yes';
			}
		}, 300, this);
	});

	try
	{
		for (var i = 0; i < page.context.points.length; i++)
		{
			var parentNodeId = '#' + page.context.points[i].id;
			$$(parentNodeId).on('click', function (e)
			{
				var nodeId = e.target.parentElement.id;
				var node = getNodeById(nodeId);
				var sendRequest = true;
				if (delayCompleted)
				{
					delayCompleted = false;
					changeState(nodeId,undefined,node,sendRequest);
				}

			});
		}
	}
	catch (e)
	{
		console.log('error : ', e);
	}

	function getPopOverHTML(scenes)
	{
		var lableList = "";
		for (var i = 0; i < scenes.length; i++)
		{
			var scene = scenes[i];
			lableList = lableList + '<label class="label-radio item-content ">' +
				'<input type="radio" name="ks-radio" value="' + scene.name + '"/>' +
				'<div class="item-media"><i class="icon icon-form-radio" style="border-color: #868686;" ></i></div>' +
				'<div class="item-inner" style="margin:0px;">' +
				'<div class="item-title">' + scene.name + '</div>' +
				'</div>' +
				'</label>';
		}

		var html = '<div class="popover scenePopover">' +
			'<div class="popover-inner">' +
			'<div class="list-block">' +
			'<div class="row no-gutter" style="height:48px;border-bottom: solid 0.3px #F1EDED">' +
			'<div class="col-66 open-scene" style="padding: 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' +
			'<a href="#" class="button" style="height: 48px;padding: 8px;text-align: left;font-size: 14px;font-weight: 500;color: rgba(0, 0, 0, 0.54);text-transform: capitalize;">&nbsp;&nbsp;&nbsp;Scenes</a></div>' +
			'<div class="col-33 add-scene">' +
			'<a href="#" class="button" style="height: 48px;padding: 8px;"><i class="ion-android-add" style="font-size: 1.8em;"></i></a></div>' +
			'</div>' +
			'<ul>' +
			'<li>' + lableList +
			'</li>' +
			'</ul>' +
			'</div>' +
			'<div class="list-block">' +
			'<ul>' +
			'<li><a href="#" class="list-button item-link toggleSortMode">Rearrange</a></li>' +
			'<li><a href="popover.html" class="list-button item-link">Filter</a></li>' +
			'</ul>' +
			'</div>' +
			'</div>' +
			'</div>'
			return html;
	}

	function initSaveSceneEvent()
	{
		function getScenePopUpHTML(points)
		{
			var nodeList = "";
			for (var i = 0; i < points.length; i++)
			{
				var point = points[i];
				nodeList = nodeList + '<li class="swipeout" ><div class="item-content swipeout-content" ><div class="item-inner"><div class="item-title">' +
					point.name +
					'</div><div class="item-after"><label class="label-switch"><input name="' + point.name + '^' + point.id + '" type="checkbox"  ' + point.state + ' /><div class="checkbox"></div></label></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete">Delete</a></div><div class="sortable-handler"></div></li>';

			}

			var html = '<div class="popup">' +
				' <div class="view navbar-fixed">' +
				'  <div class="pages">' +
				'   <div class="page">' +
				'    <div class="navbar">' +
				'     <div class="navbar-inner">' +
				'       <div class="left"><a href="#" class="close-sortable close-popup link icon-only"><i class="icon icon-back"></i></a></div>' +
				'      <div class="center">New Scene</div>' +
				'     <div class="right"><a href="#" data-sortable=".sortable" class="link close-sortable" id="saveScene"><i class="ion-android-done" style="font-size: 1.3em;"></i></a></div>' +
				'  </div>' +
				' </div>' +
				'<div class="page-content">' +
				'<form id="my-form">' +
				'  	<div class="content-block" style="padding:0px;margin:0px">' +
				'<div class="content-block-title">Details</div><div class="list-block inputs-list"><ul><li><div class="item-content"><div class="item-media"><i class="icon icon-form-toggle"></i></div><div class="item-inner"><div class="item-title floating-label">Scene name</div><div class="item-input"><input name="sceneName" type="text" placeholder=""/></div></div></div></li></ul></div>' +
				'<div class="content-block">Delay will be executed according to the sorted list</div><div class="list-block"><ul><li><label data-sortable=".sortable"  class="label-radio item-content  close-sortable"><input type="radio"name="ks-radio"value="0"checked="checked"/><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">No delay</div></div></label></li><li><label data-sortable=".sortable"  class="label-radio item-content  open-sortable"><input type="radio"name="ks-radio"value="0.5"/><div class="item-media"><i class="icon icon-form-radio"></i></div><div data-sortable=".sortable" class="item-inner open-sortable"><div  class="item-title">0.5 sec</div></div></label></li><li><label data-sortable=".sortable"  class="label-radio item-content  open-sortable"><input type="radio"name="ks-radio"value="0.75"/><div class="item-media"><i class="icon icon-form-radio"></i></div><div data-sortable=".sortable" class="item-inner open-sortable"><div class="item-title">0.75 sec</div></div></label></li><li><label data-sortable=".sortable"  class="label-radio item-content  open-sortable"><input type="radio"name="ks-radio"value="1"/><div class="item-media"><i class="icon icon-form-radio"></i></div><div data-sortable=".sortable" class="item-inner open-sortable"><div class="item-title">1 sec</div></div></label></li></ul></div>' +
				'<div class="content-block"><p>Following will be included in the scene. To remove any node swipe to right</p></div><div class="list-block tablet-inset sortable" id="scenePointSeq"><ul>' +
				nodeList +
				'</ul></div></form>' +

				'</div>' +

				'      </div>' +
				'    </div>' +
				'   </div>' +
				'  </div>' +
				' </div>' +
				'</div>';

			return html;
		}

		function initSaveScene(){
			$$('#saveScene').on('click', function (){
				var newList = $$('#scenePointSeq')[0].innerText.split('\n');
				console.log('seq : ', newList);
				var formData = myApp.formToJSON('#my-form');
				console.log('Form Data : ', formData);
				if (formData.sceneName.trim() == "")
				{
					myApp.alert("Please provide a name for this scene.");
					return;
				}
				var pointList = []
				var parentId = "";
				for (var i = 0; i < newList.length; i++)
				{
					if (newList[i] != "Delete")
					{
						for (var key in formData)
						{
							if (key.indexOf('^') != -1)
							{
								var temp_name = key.split('^')[0];

								if (temp_name == newList[i])
								{
									var temp_state = formData[key].length == 1 ? 'checked' : '';
									var temp_id = key.split('^')[1];
									parentId = temp_id.split('*')[0];
									var obj =
									{
										id : temp_id,
										state : temp_state
									}
									pointList.push(obj);
									break;
								}
							}
						}
					}
				}

				var scene =
				{
					name : formData.sceneName,
					parentId : parentId,
					action : pointList
				};

				for (var f = 0; f < Template7.data.house.rooms.length; f++)
				{
					var room = Template7.data.house.rooms[f];
					if (currentRoomName == room.name)
					{
						Template7.data.house.rooms[f].scenes.push(scene);
						break;
					}
				}
				console.log('scene : ', scene);
				myApp.showIndicator();
				setTimeout(function ()
				{
					myApp.hideIndicator();
					myApp.closeModal();
				}, 1000)

			}
			)
		}

		$$('.add-scene').on('click', function (){
			myApp.closeModal();
			var points = myApp.getCurrentView().activePage.context.points;
			var popupHTML = getScenePopUpHTML(points);
			myApp.popup(popupHTML);
			initSaveScene();
		});

		$$('.open-scene').on('click', function (){
			myApp.closeModal();
			mainView.router.load({
				url : 'scenes.html',
				context : Template7.data.house
			});
		});
	}

	function initToggleSortEvent()
	{
		$$('.toggleSortMode').on('click', function ()
		{
			myApp.sortableToggle('.sortable');
			myApp.closeModal();
			$$('#point-page-right-icon')[0].innerHTML = "<a href='#' id='games' class='link icon-only'><i class ='ion-android-done' style='font-size: 1.2em;' id='sortComplete'></i>"
				$$('#games').on('click', function ()
				{
					myApp.sortableToggle('.sortable');
					$$('#point-page-right-icon')[0].innerHTML = "<a href='#' class='link icon-only point-page-right-a' style='width: 50px;'><i class ='ion-android-more-vertical' style='font-size: 1.35em;'></i>"
						var newList = $$('#pointListId')[0].innerText.split('\n');
					$$('.point-page-right-a').on('click', function ()
					{
						var clickedLink = this;
						var scenes = myApp.getCurrentView().activePage.context.scenes;
						var popoverHTML = getPopOverHTML(scenes);
						myApp.popover(popoverHTML, clickedLink);
						initToggleSortEvent();
						initSaveSceneEvent();
					}
					);
					var roomId = myApp.getCurrentView().activePage.context.points[0].id.split('*')[0];
					for (var f = 0; f < Template7.data.house.rooms.length; f++)
					{
						var room = Template7.data.house.rooms[f];
						if (roomId == room.id)
						{
							var pointList = room.points;
							Template7.data.house.rooms[f].points = [];
							for (var z = 0; z < (newList.length - 1); z++)
							{
								var newPointName = newList[z];
								if (newPointName != "")
								{
									for (var o = 0; o < pointList.length; o++)
									{
										if (newPointName == pointList[o].name)
										{
											Template7.data.house.rooms[f].points.push(pointList[o]);
											break;
										}
									}
								}
							}
							console.log(Template7.data.house.rooms[f].points);
							break;
						}
					}

				}
				)
		}
		);
	}

	$$('.point-page-right-a').on('click', function ()
	{
		var clickedLink = this;
		var scenes = myApp.getCurrentView().activePage.context.scenes;
		currentRoomName = myApp.getCurrentView().activePage.context.roomName;
		var popoverHTML = getPopOverHTML(scenes);
		myApp.popover(popoverHTML, clickedLink);
		initToggleSortEvent();
		initSaveSceneEvent();
		$$('.some-link').on('taphold', function ()  {}

		);
		//initEditScene();

	}
	);

}
);

function getNodeNameById(id)
{

	if (id == Template7.data.house.id)
	{
		return Template7.data.house.name;
	}
	else
	{
		for (var i = 0; i < Template7.data.house.rooms.length; i++)
		{
			var room = Template7.data.house.rooms[i];
			if (id == room.id)
			{
				return room.name;
			}
			else
			{
				var points = room.points;
				for (var j = 0; j < points.length; j++)
				{
					if (id == points[j].id)
					{
						return points[j].name;
					}
				}
			}
		}
	}

}

function getNodeById(id)
{

	if (id == Template7.data.house.id)
	{
		return Template7.data.house;
	}
	else
	{
		for (var i = 0; i < Template7.data.house.rooms.length; i++)
		{
			var room = Template7.data.house.rooms[i];
			if (id == room.id)
			{
				return room;
			}
			else
			{
				var points = room.points;
				for (var j = 0; j < points.length; j++)
				{
					if (id == points[j].id)
					{
						return points[j];
					}
				}
			}
		}
	}

}

function changeState(id, toState,node, sendRequest)
{
    
	var nodeIdCB = '#' + id + '_checkbox';
	var nowState = false;
	if (typeof toState !== 'undefined')
	{
		nowState = toState;
	}
	else
	{
		nowState = !$$(nodeIdCB).prop('checked');
	}
	var roomId = id.split('*')[0];
	for (var f = 0; f < Template7.data.house.rooms.length; f++)
	{
		var room = Template7.data.house.rooms[f];
		if (roomId == room.id)
			for (var x = 0; x < room.points.length; x++)
			{
				var point = room.points[x];
				if (id == point.id)
				{

					if (nowState)
					{
						Template7.data.house.rooms[f].points[x].state = 'checked';
					}
					else
					{
						Template7.data.house.rooms[f].points[x].state = '';
					}
					console.log(Template7.data.house.rooms[f].points[x].state);
					break;
				}
			}
	}

	if (typeof sendRequest !== 'undefined')
	{
		/*if(!pervious.jobDone)
		{
			alert('Waiting for previou job to complete')
			return;
		}*/
		var checked = nowState;
		var board = node.b;
		
		ack = false;
		var action;
		
		
		
		for (var x = 0; x < node.a.length; x++)
		{
			if (checked)
			{
				if (node.a[x].t == "ON")
				{
					action = node.a[x].p;
					break;
				}
			}
			else{
				if (node.a[x].t == "OFF")
				{
					action = node.a[x].p;
					break;
				}
			}
		}

		//action = board+'.'+action;
		var jobId = Math.random();
		var obj = {
				houseId : 'house_1',
				isThisHome : false,
				isUser : true,
				name : 'One Beast',
				registerMe : true,
				performAction : true,
				topic : board,
				jobId : jobId,
				action : action,
				room : connectionObj.house
			};
			
			
		pervious.jobDone = false;
		pervious.jobId = jobId;
		console.log('sendRequest obj : ', obj);
		
		sendioData(JSON.stringify(obj));
		
		/*window.tlantic.plugins.socket.send(function (){
			//alert("datasemd");
		},
		
		function ()
		{
			pervious.jobDone = true;
			alert('error in sending data' + config.userServer + " action :" + JSON.stringify(obj));
		}, config.usedServer, );*/
	}
	
	markDelayASCompleted(200);

}
