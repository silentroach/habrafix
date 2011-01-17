/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
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

	h.utils.seekAndCallback('a[target=_top]', function(link) {
		if (!link.href.match(/http:\/\/pink.habralab/)) {
			h.utils.show(link);
		} else {
			h.utils.removeElement(link);
		}
	} );

	// показываем ранее скрытые в css object, если в них не содержится
	// ролик с pink.habralab.*

	h.utils.seekAndCallback('object', function(obj) {
		var embed = obj.querySelector('embed[src]');

		if (
			!embed
			|| !embed.src.match(/http:\/\/pink.habralab/)
		) {
			h.utils.show(obj);
		} else {
			h.utils.removeElement(obj);
		}
	} );

} )(habrafix);
