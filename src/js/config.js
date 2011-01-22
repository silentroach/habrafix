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

	/*
	var configLabel = document.createElement('a');
	configLabel.innerText = 'настройки';
	h.dom(configLabel).addClass('hf_config');
	aboutLabel.appendChild(configLabel);

	aboutLabel.onclick = function() {
		var configForm = document.createElement('div');
		configForm.id = 'hf_config';

		document.body.appendChild(configForm);

		var configTitle = document.createElement('div');
		configTitle.innerText = 'Настройки Habrafix';
		h.dom(configTitle).addClass('hf_title');

		configForm.appendChild(configTitle);
	};
	*/

} )(habrafix)
