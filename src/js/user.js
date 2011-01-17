/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	var habraElement = document.querySelector('.panel-personal a.habrauser');
	
	h.user = habraElement ? habraElement.innerHTML : false;

	if (h.user) {
		localStorage.setItem('user', h.user);
	}

} )(habrafix);
