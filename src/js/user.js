/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	h.user = h.dom('.panel-personal a.habrauser').html() || false;

	if (h.user) {
		localStorage.setItem('user', h.user);
	}

} )(habrafix);
