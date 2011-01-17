/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// функция печати должна быть доступна только из топика
	if (!h.location.topic) {
		return;
	}

	var
		body  = document.querySelector('body'),
		place = document.querySelector('.entry-info .twitter');

	var togglePrintMode = function(comments) {
		h.utils.toggleClass(body, 'hf_printmode');

		if (h.utils.hasClass(body, 'hf_printmode')) {
			window.scroll(0, 0);
			
			if (comments) {
				h.utils.addClass(body, 'hf_printmode_comments');
			}
		} else {
			h.utils.removeClass(body, 'hf_printmode_comments');
		}
	};

	var printDiv = document.createElement('div');
	h.utils.addClass(printDiv, 'hf_print');

	var printLink = document.createElement('a');
	printLink.title = 'распечатать';
	printLink.onclick = function(e) {
		e.stopPropagation();	
		togglePrintMode(false);
	};
	
	var printWithCommentsLink = document.createElement('a');
	printWithCommentsLink.innerText = '+ комментарии';
	printWithCommentsLink.title = 'распечатать с комментариями';
	printWithCommentsLink.onclick = function(e) {
		e.stopPropagation();
		togglePrintMode(true);
	};
	h.utils.addClass(printWithCommentsLink, 'hf_print_comments');

	printLink.appendChild(printWithCommentsLink);
	
	printDiv.appendChild(printLink);

	place.parentNode.insertBefore(printDiv, place);

	// для выхода из режима печати используем кнопку Esc
	document.onkeydown = function(e) {
		if (
			e.keyCode == 27
			&& h.utils.hasClass(body, 'hf_printmode')
		) {
			togglePrintMode(true);
		}
	};

} )(habrafix);
