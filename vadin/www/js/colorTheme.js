/* ===== Color themes ===== */
myApp.onPageInit('color-themes', function (page)
{
 	$$(page.container).find('.ks-color-theme').click(function ()
	{
		var classList = $$('body')[0].classList;
		var theme_string = $$(this).attr('data-theme');
		localStorage.setItem('theme_string', theme_string);
		for (var i = 0; i < classList.length; i++)
		{
			if (classList[i].indexOf('theme') === 0)
				classList.remove(classList[i]);
		}
		classList.add('theme-' + theme_string);
		//$$('.push-new div.active').css('background',theme_string);
		//$$('.push-new div.active')[0].style.background = theme_string;
	}
	);
	$$(page.container).find('.ks-layout-theme').click(function ()
	{
		var classList = $$('body')[0].classList;
		var layout_string = $$(this).attr('data-theme');
		localStorage.setItem('layout_string', layout_string);
		for (var i = 0; i < classList.length; i++)
		{
			if (classList[i].indexOf('layout-') === 0)
				classList.remove(classList[i]);
		}
		classList.add('layout-' + layout_string);
	}
	);
}
);
