/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// не за чем тут h.dom, сделаем обычным getElementById
	var copier = document.getElementById('copier');
	
	if (!copier) {
		console.info('fail!!!');
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
