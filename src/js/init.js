var habrafix = ( function() {

	var habraElement = document.querySelector('a.habrauser');

	return {
		user: habraElement ? habraElement.innerHTML : false
	};
	
} )();
