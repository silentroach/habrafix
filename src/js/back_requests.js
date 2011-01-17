/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.requests = ( function(h) {

	chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {	
		if (request['method'] == 'getTags') {
			h.tags.list( function(list) {
				sendResponse(list);
			} );
		}
	} );

	return {
		broadcast: function(obj) {
			chrome.windows.getAll( {
				'populate': true
			}, function(w) {
				for (var i = 0; i < w.length; i++) {
					var wnd = w[i];

					for (var n = 0; n < wnd.tabs.length; n++) {
						var tab = wnd.tabs[n];

						if (!tab.url.match(/habrahabr.ru[\/|$]/)) {
							continue;
						}

						chrome.tabs.sendRequest(tab.id, obj, function(response) {

						} );
					}
				}
			} );
		}
	};

} )(habrafix);
