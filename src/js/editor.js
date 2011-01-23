/**
 * @preserve Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	if (!h.config.etoolbar.value()) {
		return;
	}

	var makeEditor = function() {
		var 
			textarea = this,
			panel = document.createElement('ul');
			
		/**
		 * Добавляем кнопку в тулбар
		 * @param {string} imageSource Адрес картинки кнопки
		 * @param {string} title Выводится при наведении курсора на кнопку
		 * @param {function} callback Callback
		 * @param {string} accesskey Alt + ? - шорткат
		 * @return {HTMLElement}
		 */
		var createButton = function(imageSource, title, callback, accesskey) {
				var 
					li  = document.createElement('li'),
					a   = document.createElement('a'),
					img = document.createElement('img');
					
				img.src = '/i/panel/' + imageSource + '.gif';
				a.title = title + (accesskey ? ' (alt + ' + accesskey + ')' : '');
				
				a.onclick = callback;
				if (accesskey) {
					a.accessKey = accesskey;
				}
				
				a.appendChild(img);
				li.appendChild(a);
				panel.appendChild(li);
				
				return li;
			};

		/**
		 * Вставка тега
		 * @param {string} before То, что перед
		 * @param {string} end То, что после
		 */
		var insertTag = function(before, end) {
			textarea.focus();
			
			var 
				sb  = textarea.selectionStart,
				se  = textarea.selectionEnd,
				val = textarea.value;
				
			val = val.substr(0, sb) + 
				before + val.substr(sb, se - sb) + end + 
				val.substr(se, val.length - se);
				
			textarea.value = val;

			textarea.selectionStart = se + before.length;
			textarea.selectionEnd   = se + before.length;
		}
			
		h.dom(panel).addClass('hf_etoolbar');
			
		createButton('bold_ru', 'жирный', function() {
			insertTag('<b>', '</b>');
		}, 'b' );
		
		createButton('italic_ru', 'курсив', function() {
			insertTag('<i>', '</i>');
		}, 'i' );
		
		createButton('underline_ru', 'подчеркнутый', function() {
			insertTag('<u>', '</u>');
		}, 'u' );
		
		var tmp = createButton('strikethrough', 'зачеркнутый', function() {
			insertTag('<s>', '</s>');
		}, 's' );
		
		h.dom(tmp).addClass('hf_space');

		createButton('user', 'хабраюзер', function() {
			var tmp = prompt('Имя пользователя');
			
			if (tmp) {
				insertTag('<hh user="' + tmp + '" />', '');
			}
		} );
		
		createButton('link', 'ссылка', function() {
			var tmp = prompt('Введите ссылку', 'http://');
			
			if (tmp) {
				insertTag('<a href="' + tmp + '">', '</a>');
			}
		} );
		
		createButton('image', 'изображение', function() {
			var tmp = prompt('Введите адрес изображения', 'http://');
			
			if (tmp) {
				insertTag('<img src="' + tmp + '" />', '');
			}
		} );

		textarea.parentNode.insertBefore(panel, textarea);

		return panel;

/* визуальный редактор
		textarea.rows = 2;
		
		var editor = document.createElement('div');
		editor.contentEditable = true;
		editor.innerHTML = '<b>test</b><br /><br />ololo <ul><li>test</li><li>323423</li></ul>';
		h.dom(editor).addClass('hf_editor');
		
		// fixme onblur будет достаточно, я считаю, так пока для теста
		editor.onkeyup = function(e) {
			var text = editor.innerHTML;
			text = text.replace('<br>', "\r");
			
			textarea.value = text;
		};
		
		textarea.parentNode.insertBefore(editor, textarea);
*/
	};

	if (h.location.mailer) {
		h.dom('#htmlarea').each( function() {
			var editor = makeEditor.apply(this);
			h.dom(editor).addClass('hf_mailer');
		} );
	} else 
	if (h.location.topic) {
		h.dom('#js-field-comment').each( makeEditor );
	}

} )(habrafix);
