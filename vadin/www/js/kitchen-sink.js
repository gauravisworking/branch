
var myApp = new Framework7(
	{
		modalTitle : 'Framework7',
		material : true,
		tapHold : true,
		template7Pages : true,
		template7Data : houseJson
	}
	);
var $$ = Dom7;
var theme_string = localStorage.getItem("theme_string");
var layout_string = localStorage.getItem("layout_string");

var delayCompleted = true;

if (theme_string)
{

	var classList = $$('body')[0].classList;
	for (var i = 0; i < classList.length; i++)
	{
		if (classList[i].indexOf('theme') === 0)
			classList.remove(classList[i]);
	}
	console.log(theme_string);
	classList.add('theme-' + theme_string);

}
if (layout_string)
{

	var classList = $$('body')[0].classList;
	for (var i = 0; i < classList.length; i++)
	{
		if (classList[i].indexOf('layout-') === 0)
			classList.remove(classList[i]);
	}
	console.log(layout_string);
	classList.add('layout-' + layout_string);
}

isUserLoggedIn = true;
// Expose Internal DOM library


// Add main view
var mainView = myApp.addView('.view-main', {}

	);

if (!isUserLoggedIn)
{
	mainView.router.loadPage('auth.html');
}
else
{
	mainView.router.load(
	{
		url : 'roomBox.html',
		context : Template7.data.house.rooms
	}
	);
}
// Add another view, which is in right panel
