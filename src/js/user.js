( function(h) {

	var habraElement = document.querySelector('a.habrauser');
	
	h.user = habraElement ? habraElement.innerHTML : false;

	if (h.user) {
		localStorage.setItem('user', h.user);
	}

} )(habrafix);
