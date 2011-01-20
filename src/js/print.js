/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// функция печати должна быть доступна только из топика
	if (
		!h.location.topic
		&& !h.location.sandtopic
	) {
		return;
	}

	var
		body  = h.dom('body'),
		place = 
			h.dom('.entry-info .twitter').first() ||
			h.dom('.entry-info .author').first();
		
	if (!place) {
		return;
	}

	/**
	 * Переключиться в/из режима печати
	 * @param {boolean} comments Отображать комментарии?
	 */
	var togglePrintMode = function(comments) {
		body.toggleClass('hf_printmode');

		if (body.hasClass('hf_printmode')) {
			window.scroll(0, 0);
			
			if (comments) {
				body.addClass('hf_printmode_comments');
			}
		} else {
			body.removeClass('hf_printmode_comments');
		}
	};

	var printDiv = document.createElement('div');
	h.dom(printDiv).addClass('hf_print');

	var printLink = document.createElement('a');
	printLink.title = 'распечатать';
	printLink.onclick = function(e) {
		e.stopPropagation();	
		togglePrintMode(false);
	};
	
	// функция печати с комментариями доступна только в обычных 
	// топиках, не в топиках из песочницы
	if (!h.location.sandtopic) {
		var printWithCommentsLink = document.createElement('a');
		printWithCommentsLink.innerText = '+ комментарии';
		printWithCommentsLink.title = 'распечатать с комментариями';
		printWithCommentsLink.onclick = function(e) {
			e.stopPropagation();
			togglePrintMode(true);
		};
		h.dom(printWithCommentsLink).addClass('hf_print_comments');

		printLink.appendChild(printWithCommentsLink);
	}
	
	printDiv.appendChild(printLink);

	place.parentNode.insertBefore(printDiv, place);

	// для выхода из режима печати используем кнопку Esc
	document.onkeydown = function(e) {
		if (
			e.keyCode == 27
			&& body.hasClass('hf_printmode')
		) {
			togglePrintMode(true);
		}
	};
	
	var escDiv = document.createElement('div');
	escDiv.innerText = 'для выхода из режима нажмите кнопку Esc';
	escDiv.id = 'hf_print_esc';
	body.first().appendChild(escDiv);

} )(habrafix);
