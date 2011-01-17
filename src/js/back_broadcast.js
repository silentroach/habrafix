/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.broadcast = function(obj) {

	chrome.windows.getAll( {
		'populate': true
	}, function(w) {
		for (var i = 0; i < w.length; i++) {
			var wnd = w[i];

			console.dir(wnd);
		}
	} );

};
