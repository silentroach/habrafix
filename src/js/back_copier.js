/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// почему в background? потому что если создать на странице с content_script,
	// то execCommand не срабатывает и возвращает false, понятия не имею почему
	// скорее всего какие-то ограничения хитрые

	// не за чем тащить за собой h.dom, сделаем обычным getElementById
	var copier = document.getElementById('copier');
	
	if (!copier) {
		return;
	}

	h.requests.addListener('copy', function(request, sendResponse) {
		copier.value = request['data'];
		copier.select();
		
		if (document.execCommand('cut')) {
			sendResponse(true);
		} else {
			sendResponse(false);
		}
	} );

} )(habrafix);
