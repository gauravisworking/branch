myApp.onPageInit('favorites', function (page)
{

	$$('.point-notify').on('click', function (e)
	{
		setTimeout(function (obj)
		{
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

	}
	);

	$$('.point-time').on('click', function (e)
	{
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

	}
	);

	$$('.point-fav').on('click', function (e)
	{

		setTimeout(function (obj)
		{
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

	}
	);

	try
	{

		for (var x = 0; x < page.context.rooms.length; x++)
		{

			for (var i = 0; i < page.context.rooms[x].points.length; i++)
			{
				var parentNodeId = '#' + page.context.rooms[x].points[i].id + '@';
				$$(parentNodeId).on('click', function (e)
				{
					var nodeId = e.target.parentElement.id.replace('@', '');
					if (delayCompleted)
					{
						delayCompleted = false;
						changeState(nodeId);
					}

				}
				);
			}
		}

	}
	catch (e)
	{
		console.log('error ; ', e);

	}

}
);
