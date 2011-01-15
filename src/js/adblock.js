( function(h) {

	// удаляем все элементы в #main-page до div.header

	var elements = document.querySelectorAll('#main-page > *');

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];

		if (
			element.nodeName == 'DIV'
			&& element.className == 'header'
		) {
			break;
		}

		h.utils.removeElement(element);
	}

	// показываем ссылки, если они не на pink.habralab

	var links = document.querySelectorAll('a[target=_top]');

	for (var i = 0; i < links.length; i++) {
		var link = links[i];

		if (!link.href.match(/http:\/\/pink.habralab/)) {
			h.utils.show(link);
		} else {
			h.utils.removeElement(link);
		}
	}

	// показываем ранее скрытые в css object, если в них не содержится
	// ролик с pink.habralab.*

	var objects = document.querySelectorAll('object');

	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];

		var embed = obj.querySelector('embed[src]');

		if (
			!embed
			|| !embed.src.match(/http:\/\/pink.habralab/)
		) {
			h.utils.show(obj);
		} else {
			h.utils.removeElement(obj);
		}
	}

} )(habrafix);
