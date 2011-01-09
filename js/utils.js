var seekAndDestroy = function(selector) {
	var 
		elements = document.querySelectorAll(selector),
		element = null;

	for (var i = 0; i < elements.length; i++) {
		console.info('removed ' + selector);

		element = elements[i];
		element.parentNode.removeChild(element);
	}
};
