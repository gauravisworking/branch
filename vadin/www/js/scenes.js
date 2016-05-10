myApp.onPageInit('scenes', function (page)
{

	$$('.edit-scene').on('click', function (e)
	{

		var parentId = e.target.getAttribute('parent-id');
		var nodeName = e.target.getAttribute('node-name');

		var sceneObj = null;

		if (parentId == Template7.data.house.id)
		{
			var scenes = Template7.data.house.scenes;
			for (var i = 0; i < scenes.length; i++)
			{
				if (nodeName == scenes[i].name)
				{
					sceneObj = scenes[i];
					break;
				}
			}
		}
		else
		{
			for (var i = 0; i < Template7.data.house.rooms.length; i++)
			{
				var room = Template7.data.house.rooms[i];
				for (var j = 0; j < room.scenes.length; j++)
				{
					if (nodeName == room.scenes[j].name)
					{
						sceneObj = room.scenes[j];
						break;
					}
				}
			}
		}

		function getEditScenePopUpHTML(scene)
		{
			var nodeList = "";
			for (var i = 0; i < scene.actions.length; i++)
			{
				var point = scene.actions[i];
				nodeList = nodeList + '<li class="swipeout" ><div class="item-content swipeout-content" ><div class="item-inner"><div class="item-title">' +
					getNodeNameById(point.id) +
					'</div><div class="item-after"><label class="label-switch"><input name="' + getNodeNameById(point.id) + '^' + point.id + '" type="checkbox"  ' + point.state + ' /><div class="checkbox"></div></label></div></div></div><div class="swipeout-actions-right"><a href="#" class="swipeout-delete">Delete</a></div><div class="sortable-handler"></div></li>';

			}

			var html = '<div class="popup">' +
				' <div class="view navbar-fixed">' +
				'  <div class="pages">' +
				'   <div class="page">' +
				'    <div class="navbar">' +
				'     <div class="navbar-inner">' +
				'       <div class="left"><a href="#" class="close-sortable close-popup link icon-only"><i class="icon icon-back"></i></a></div>' +
				'      <div class="center">' + scene.name + '</div>' +
				'     <div class="right"><a href="#" data-sortable=".sortable" class="link close-sortable" id="saveScene"><i class="ion-android-done" style="font-size: 1.3em;"></i></a>' +
				'     </div>' +
				'  </div>' +
				' </div>' +
				'<div class="page-content">' +
				'<form id="my-form">' +
				'  	<div class="content-block" style="padding:0px;margin:0px">' +
				'<div class="content-block-title">Details</div><div class="list-block inputs-list"><ul><li><div class="item-content"><div class="item-media"><i class="icon icon-form-toggle"></i></div><div class="item-inner"><div class="item-title floating-label">Scene name</div><div class="item-input"><input name="sceneName" type="text" value="' + scene.name + '" placeholder=""/></div></div></div></li></ul></div>' +
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

		var popupHTML = getEditScenePopUpHTML(sceneObj);
		myApp.popup(popupHTML);

	}
	)

	$$('.scene-remove-callback').on('deleted', function ()
	{
		myApp.alert('Thanks, item removed!');
	}
	);

}
);
