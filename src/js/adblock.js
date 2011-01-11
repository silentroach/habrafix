var elements = document.querySelectorAll('#main-page > *');

for (var i = 0; i < elements.length; i++) {
	var element = elements[i];

	if (
		element.nodeName == 'DIV'
		&& element.className == 'header'
	) {
		break;
	}

	removeElement(element);
}

var objects = document.querySelectorAll('object');

for (var i = 0; i < objects.length; i++) {
	var obj = objects[i];

	var embed = obj.querySelector('embed[src]');

	if (
		!embed
		|| !embed.src.match(/http:\/\/pink.habralab/)
	) {
		obj.style.display = 'block';
	}
}
