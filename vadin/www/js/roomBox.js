myApp.onPageInit('rooms-box', function (page)
{
	$$('.roomtopoint').on('click', function (e)
	{
		try
		{
			myApp.showIndicator();
			var dataContextIndex = this.getAttribute('data-context-name').split('.')[1];
			var room = Template7.data.house.rooms[Number(dataContextIndex)];
			mainView.router.load(
			{
				url : 'points.html',
				context :
				{
					roomName : room.name,
					points : Template7.data.house.rooms[Number(dataContextIndex)].points,
					scenes : Template7.data.house.rooms[Number(dataContextIndex)].scenes
				}
			}
			);
			setTimeout(function ()
			{
				myApp.hideIndicator();
			}, 500)
		}
		catch (e)
		{
			console.log('error : ', e);
		}
	}
	);
}
)
