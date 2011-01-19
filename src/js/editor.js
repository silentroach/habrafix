/**
 * @preserve Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var makeEditor = function(textarea) {
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
	};

	if (h.location.mailer) {
		var ta = document.querySelector('#htmlarea');
		
		if (ta) {
			makeEditor(ta);
		}
	}

} )(habrafix);
