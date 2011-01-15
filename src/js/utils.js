// удаление элемента
var removeElement = function(element) {
	element.parentNode.removeChild(element);
}

// найти элемент(ы) и удалить
var seekAndDestroy = function(selector) {
	var 
		elements = document.querySelectorAll(selector),
		element = null;

	for (var i = 0; i < elements.length; i++) {
		element = elements[i];
		removeElement(element);
	}
};

var hasClass = function(element, className) {
	return element['classList'].contains(className);
}

var removeClass = function(element, className) {
	if (hasClass(element, className)) {
		element['classList'].remove(className);
	}
}

var addClass = function(element, className) {
	if (!hasClass(element, className)) {
		element['classList'].add(className);
	}
}

var toggleClass = function(element, className) {
	if (hasClass(element, className)) {
		removeClass(element, className);
	} else {
		addClass(element, className);
	}
}

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
