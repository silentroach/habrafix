var habrafix = ( function() {

	var 
		habraElement = document.querySelector('a.habrauser'),
		userName = habraElement ? habraElement.innerHTML : false;

	if (userName) {
		localStorage.setItem('user', userName);
	}

	return {
		user: userName
	};
	
} )();
