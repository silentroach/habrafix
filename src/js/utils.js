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
	var
		mod10  = this % 10,
		mod100 = this % 100;

	if (
		mod10 == 1 
		&& mod100 != 11
	) {
		return endings[0];
	}	else
	if (
		mod10 >= 2 
		&& mod10 <= 4
		&& (
			mod100 < 10 
			|| mod100 >= 20
		)
	) {
		return endings[1];
	} else {
		return endings[2];
	}
}
