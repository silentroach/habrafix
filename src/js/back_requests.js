/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {	
		if (request['method'] == 'getTags') {
			h.tags.list( function(list) {
				sendResponse(list);
			} );
		}
	
	} );

} )(habrafix);
