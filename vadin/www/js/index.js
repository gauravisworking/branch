
var myApp = new Framework7({
		modalTitle : 'Framework7',
		material : true,
		pushState : true,
		tapHold : false,
		template7Pages : true,
        materialPageLoadDelay : 200,
		template7Data : houseJson
	});
var $$ = Dom7;
var theme_string = localStorage.getItem("theme_string");
var layout_string = localStorage.getItem("layout_string");

var delayCompleted = true;

if (theme_string) {

	var classList = $$('body')[0].classList;
	for (var i = 0; i < classList.length; i++) {
		if (classList[i].indexOf('theme') === 0)
			classList.remove(classList[i]);
	}
	console.log(theme_string);
	classList.add('theme-' + theme_string);

}
if (layout_string) {

	var classList = $$('body')[0].classList;
	for (var i = 0; i < classList.length; i++) {
		if (classList[i].indexOf('layout-') === 0)
			classList.remove(classList[i]);
	}
	console.log(layout_string);
	classList.add('layout-' + layout_string);
}

isUserLoggedIn = window.localStorage.getItem('isLoggedIn') == "yes" ? true : false;
// Expose Internal DOM library


// Add main view
var mainView = myApp.addView('.view-main', {});
setTimeout(function ()
	{
		if (!isUserLoggedIn) {
			mainView.router.loadPage('auth.html');
		} else {
			mainView.router.load({
				url : 'roomBox.html',
				context : Template7.data.house.rooms,
				animatePages : false
				
			});
		}
	},2000)
		


$$(document).on('ajaxStart', function (e) {
	myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
	myApp.hideIndicator();
});

$$('.open-scene').on('click', function () {
	myApp.closeModal();

	mainView.router.load({
		url : 'scenes.html',
		context : Template7.data.house
	});
});

$$('.open-fav').on('click', function () {

	mainView.router.load({
		url : 'favorites.html',
		context : Template7.data.house
	});
});

$$('.open-controls').on('click', function (e) {

	mainView.router.load({
		url : 'roomBox.html',
		context : Template7.data.house.rooms
	});
});

$$('.panel-left').on('open', function () {
	$$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
	$$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
	$$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});
//http://codepen.io/Vidy/pen/ltjmi
//http://codepen.io/Vidy/pen/KyqHn
$$('.push-new').click(function() {
  $$(this).find('div').toggleClass('active').toggleClass('non');
});


function addMasking(){
	$$(document.body).append('<div id="loadingFrame" class="wrap"><div class="loader"></div><div class="loaderbefore"></div><div class="circular"></div><div class="circular another"></div><div class="text">Loading</div></div>');
}


function removeMasking(){

}

// Add another view, which is in right panel


/* var myApp = new Framework7(
{
modalTitle : 'Framework7',
material : true,
tapHold : true,
template7Pages : true,
template7Data : houseJson
}
);

console.log('json',houseJson);
var $$ = Dom7;
var myApp = new Framework7();
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

var mainView = myApp.addView('.view-main',
{
dynamicNavbar : true
}
);

var rightView = myApp.addView('.view-right', {}

);

if (!isUserLoggedIn)
{
mainView.router.loadPage('auth.html');
}
else
{
console.log('rooms : ',Template7.data.house.rooms);
mainView.router.load(
{
url : 'roomBox.html',
context : Template7.data.house.rooms
}
);
}



*/
