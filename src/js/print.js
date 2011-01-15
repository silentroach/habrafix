( function(h) {

	// функция печати должна быть доступна только из топика
	if (!location.pathname.match(/\/blog[s\/|\/]/)) {
		return;
	}

	var
		body  = document.querySelector('body'),
		place = document.querySelector('.entry-info .twitter');

	var togglePrintMode = function() {
		h.utils.toggleClass(body, 'hf_printmode');

		if (h.utils.hasClass(body, 'hf_printmode')) {
			window.scroll(0, 0);
		}
	};

	var printDiv = document.createElement('div');
	h.utils.addClass(printDiv, 'hf_print');

	var printLink = document.createElement('a');
	printLink.title = 'распечатать';
	printLink.onclick = togglePrintMode; 

	printDiv.appendChild(printLink);

	place.parentNode.insertBefore(printDiv, place);

	// для выхода из режима печати используем кнопку Esc
	document.onkeydown = function(e) {
		if (
			e.keyCode == 27
			&& h.utils.hasClass(body, 'hf_printmode')
		) {
			console.dir(e);

			togglePrintMode();
		}
	};

} )(habrafix);
