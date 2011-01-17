/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var 
		textareas = document.querySelectorAll('textarea[name]'),
		tforms = [];
	
	var storagePath = function(element) {
		return 'backup_' + location.pathname + '#' + element.name;
	}
	
	for (var i = 0; i < textareas.length; i++) {
		var element = textareas[i];
		
		if (!element.form) {
			continue;
		}
		
		var value = localStorage.getItem(storagePath(element));
		
		if (
			element.value == ''
			&& value
		) {
			element.value = value;
		}
		
		element.addEventListener('keyup', function(e) {
			localStorage.setItem(storagePath(e.target), e.target.value);
		}, false );
		
		if (tforms.indexOf(element.form) < 0) {
			element.form.addEventListener('submit', function(e) {
				for (var i = 0; i < textareas.length; i++) {
					var ta = textareas[i];
					
					if (ta.form == e.target) {
						localStorage.removeItem(storagePath(ta));
					}
				}
			}, false );
			
			tforms.push(element.form);
		}
	}
	
	delete tforms;

} )(habrafix);
