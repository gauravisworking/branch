
myApp.onPageInit('auth', function (page)
{
	window.localStorage.setItem('isLoggedIn', "no");
	$$(page.container).find('.button').on('click', function ()
	{
		myApp.showIndicator();
		var userName = $$(page.container).find('input[name="username"]').val();
		var password = $$(page.container).find('input[name="password"]').val();
		try{
			
			function userLoggedIn( user )
				{
				 if (user != null)
					{
						localStorage.setItem('userName', user.email);
						var houseRowState = localStorage.getItem("houseRowState");
						if (Number(houseRowState) != user.rowstate)
						{
							var houseDetails = Backendless.Persistence.of(House);
							var dataQuery ={
								condition : "id = " + user.houseFk
							};
							var house = houseDetails.find(dataQuery);
							localStorage.setItem('json', house.data[0].json);
							localStorage.setItem('boards', house.data[0].boards);
							localStorage.setItem('homeId',house.data[0].homeId );
							localStorage.setItem('localServerIp',house.data[0].localServerIp );
							localStorage.setItem('staticServerIp',house.data[0].staticServerIp );
							localStorage.setItem('localServerPort',house.data[0].localServerPort );
							localStorage.setItem('staticServerPort',house.data[0].staticServerPort );
							//this.items = JSON.parse(house.data[0].json);
							console.log('HouseJson : ',json);
							//updateServer();
							window.localStorage.setItem('isLoggedIn', "yes");
							

						}
						
						mainView.router.load(
						{
							url : 'roomBox.html',
							context : Template7.data.house.rooms
						}
						);
						myApp.hideIndicator();
					}
					else
					{
						alert("Login failed");
						myApp.hideIndicator();
					}
				}
				 
				function gotError( err ) // see more on error handling
				{
					myApp.hideIndicator();
				  console.log( "error message - " + err.message );
				  console.log( "error code - " + err.statusCode );
				}


			var user = Backendless.UserService.login(userName, password, true, new Backendless.Async( userLoggedIn, gotError ) );
		}
		catch (e)
		{
			alert("Login failed. " + e.message);
			myApp.hideIndicator();
		}
	}
	);

}
)
