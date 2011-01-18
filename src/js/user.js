/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var habraElement = $('.panel-personal a.habrauser').first();
	
	h.user = habraElement ? habraElement.innerHTML : false;

	if (h.user) {
		localStorage.setItem('user', h.user);
	}

} )(habrafix);
