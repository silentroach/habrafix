/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	h.config.backup = new h.configOption('backup', false, 'Резервное хранение полей для ввода комментариев, топиков и писем (бета)');
	
	if (!h.config.backup.value()) {
		return;
	}

	if (
		!h.location.writer
		&& !h.location.mailer
		&& !h.location.topic
	) {
		return;
	}

	var 
		storage = window.localStorage;

	/**
	 * Название элемента в localStorage
	 * @param {HTMLElement} element HTML элемент
	 * @return {string}
	 */
	var storagePath = function(element) {
		return 'backup_' + h.location.pathname + '#' + element.name;
	}
	
	var handleTextarea = function(textareaSelector, clearerSelector) {
		var element = h.dom(textareaSelector).first();
		
		if (!element) {
			return;
		}
		
		var clearElement = h.dom(clearerSelector);
		
		if (clearElement.size() == 0) {
			return false;
		}
		
		var 
			path  = storagePath(element),
			value = storage.getItem(path);

		if (
			value
			&& element.value == ''
		) {
			// и подставить его, если оно было пустым
			element.value = value;
		}
		
		// по нажатии на кнопку внутри textarea сохраняем его содержимое
		element.addEventListener('keyup', function(e) {
			storage.setItem(path, e.target.value);
		}, false );
		
		// очищаем при сабмите
		element.form.addEventListener('submit', function(e) {
			storage.removeItem(path);
		} );
		
		// и на всякий на клике
		clearElement.each( function() {
			this.addEventListener('click', function(e) {
				storage.removeItem(path);
			} );
		} );
	}
	
	if (h.location.mailer) {
		handleTextarea('#htmlarea', '#send');
	} else 
	if (h.location.writer) {
		handleTextarea('#topic-message', 'input[name=publish],input[name=draft]');
	} else
	if (h.location.topic) {
		handleTextarea('#js-field-comment', 'input[name=write_comment]');
	}

} )(habrafix);
