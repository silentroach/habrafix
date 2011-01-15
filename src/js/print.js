( function() {

	// функция печати должна быть доступна только из топика
	if (!location.pathname.match(/^\/blogs/)) {
		return;
	}

	var
		body  = document.querySelector('body'),
		place = document.querySelector('.entry-info .twitter');

	var togglePrintMode = function() {
		toggleClass(body, 'hf_printmode');

		if (hasClass(body, 'hf_printmode')) {
			window.scroll(0, 0);
		}
	};

	var printDiv = document.createElement('div');
	addClass(printDiv, 'hf_print');

	var printLink = document.createElement('a');
	printLink.title = 'распечатать';
	printLink.onclick = togglePrintMode; 

	printDiv.appendChild(printLink);

	place.parentNode.insertBefore(printDiv, place);

	// для выхода из режима печати используем кнопку Esc
	document.onkeydown = function(e) {
		if (
			e.keyCode = 27
			&& hasClass(body, 'hf_printmode')
		) {
			togglePrintMode();
		}
	};

} )();
