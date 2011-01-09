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

// [яблоко, яблока, яблок]
Number.prototype.plural = function(endings) {
	if (this % 10 == 1 && this % 100 != 11) {
		return endings[0];
	}	else
	if (this % 10 >= 2 && this % 10 <= 4 && (
		this % 100 < 10 || this % 100 >= 20
	)) {
		return endings[1];
	} else {
		return endings[2];
	}
}
