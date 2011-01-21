/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var 
		storage = window.localStorage,
		textareas = h.dom('textarea[name]'),
		tforms = [];

	/**
	 * Название элемента в localStorage
	 * @param {HTMLElement} element HTML элемент
	 * @return {string}
	 */
	var storagePath = function(element) {
		return 'backup_' + h.location.pathname + '#' + element.name;
	}
	
	textareas.each( function() {
		var element = this;
		
		if (!element.form) {
			return;
		}
		
		// пытаемся получить значение поля
		var value = storage.getItem(storagePath(element));
		
		if (
			value
			&& element.value == ''
		) {
			// и подставить его, если оно было пустым
			element.value = value;
		}
		
		// по нажатии на кнопку внутри textarea сохраняем его содержимое
		element.addEventListener('keyup', function(e) {
			storage.setItem(storagePath(e.target), e.target.value);
		}, false );
		
		if (tforms.indexOf(element.form) < 0) {
			// вешаем на каждую форму обработчик сабмита
			element.form.addEventListener('submit', function(e) {
				textareas.each( function() {
					var ta = this;
					
					if (ta.form == e.target) {
						// чтобы удалить сохраненное сообщение из хранилища
						storage.removeItem(storagePath(ta));
					}
				} );
			}, false );
			
			tforms.push(element.form);
		}
	} );
	
	delete tforms;

} )(habrafix);
