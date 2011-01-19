/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var 
		storage = window.localStorage,
		textareas = document.querySelectorAll('textarea[name]'),
		tforms = [];

	/**
	 * Название элемента в localStorage
	 * @param {HTMLElement} element HTML элемент
	 * @return {string}
	 */
	var storagePath = function(element) {
		return 'backup_' + window.location.pathname + '#' + element.name;
	}
	
	for (var i = 0; i < textareas.length; i++) {
		var element = textareas[i];
		
		if (!element.form) {
			continue;
		}
		
		var value = storage.getItem(storagePath(element));
		
		if (
			value
			&& element.value == ''
		) {
			element.value = value;
		}
		
		element.addEventListener('keyup', function(e) {
			storage.setItem(storagePath(e.target), e.target.value);
		}, false );
		
		if (tforms.indexOf(element.form) < 0) {
			element.form.addEventListener('submit', function(e) {
				for (var i = 0; i < textareas.length; i++) {
					var ta = textareas[i];
					
					if (ta.form == e.target) {
						storage.removeItem(storagePath(ta));
					}
				}
			}, false );
			
			tforms.push(element.form);
		}
	}
	
	delete tforms;

} )(habrafix);
