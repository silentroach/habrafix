/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var 
		about = h.dom('#about').first(),
		prefix = 'hf_option_';

	if (!about) {
		return;
	}

	var aboutLabel = document.createElement('div');
	aboutLabel.innerHTML = '+ <a href="' + h.url + '">' + h.name + '</a>';
	h.dom(aboutLabel).addClass('hf');

	about.appendChild(aboutLabel);

	var configLabel = document.createElement('a');
	configLabel.innerText = '[#]';
	configLabel.title = 'настройки';
	h.dom(configLabel).addClass('hf_config');
	aboutLabel.appendChild(configLabel);

	var changeConfigValue = function(e) {
		h.config[e.target.id.replace(prefix, '')].setValue(e.target.checked);
	};

	var configForm = null;

	aboutLabel.onclick = function() {
		if (configForm) {
			return;
		}

		configForm = document.createElement('div');
		configForm.id = 'hf_config';

		document.body.appendChild(configForm);

		var configTitle = document.createElement('h1');
		configTitle.innerText = 'Настройки Habrafix';

		configForm.appendChild(configTitle);

		var optionList = document.createElement('ul');
		configForm.appendChild(optionList);

		for (var item in h.config) {
			var 
				listItem       = document.createElement('li'),
				checkboxOption = document.createElement('input'),
				labelOption    = document.createElement('label');

			labelOption.innerHTML = h.config[item].caption();

			checkboxOption.type = 'checkbox';
			checkboxOption.id = prefix + item;

			if (h.config[item].value()) {
				checkboxOption.checked = true;
			}

			checkboxOption.onchange = changeConfigValue;

			labelOption.htmlFor = prefix + item;

			listItem.appendChild(checkboxOption);
			listItem.appendChild(labelOption);

			optionList.appendChild(listItem);
		}
		
		var span = document.createElement('span');
		span.innerText = 'применятся после перезагрузки страницы';
		configForm.appendChild(span);

		var closeButton = document.createElement('input');
		closeButton.type = 'button';
		closeButton.value = 'закрыть';
		closeButton.onclick = function() {
			h.dom(configForm).remove();

			configForm = null;
		};
		configForm.appendChild(closeButton);
	};

} )(habrafix)
