/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// удаляем все элементы в #main-page до div.header

	h.dom('#main-page > *').each( function() {
		var element = this;
		
		if (
			element.nodeName == 'DIV'
			&& element.className == 'header'
		) {
			return false;
		}
		
		h.dom(element).remove();
	} );

	// показываем ссылки, если они не на pink.habralab

	h.dom('a[target=_top]').each( function() {
		var link = this;
	
		if (!link.href.match(/http:\/\/pink.habralab/)) {
			h.utils.show(link);
		} else {
			h.dom(link).remove();
		}	
	} );

	// показываем ранее скрытые в css object, если в них не содержится
	// ролик с pink.habralab.*

	h.dom('object').each( function() {
		var 
			obj   = this,
			embed = h.dom('embed[src]', obj);

		if (
			embed.size() > 0
			&& embed.attr('src').match(/http:\/\/pink.habralab/)
		) {
			h.utils.removeElement(obj);
		} else {
			h.utils.show(obj);
		}
	} );

} )(habrafix);
