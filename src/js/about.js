/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var about = h.dom('#about').first();

	if (!about) {
		return;
	}

	var aboutLabel = document.createElement('div');
	aboutLabel.innerHTML = '+ <a href="' + h.url + '">' + h.name + '</a>';
	h.dom(aboutLabel).addClass('hf');

	about.appendChild(aboutLabel);

} )(habrafix)
