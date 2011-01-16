( function(h) {

	chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {	
		if (request['method'] == 'getTags') {
			h.tags.list( function(list) {
				sendResponse(list);
			} );
		}
	
	} );

} )(habrafix);
