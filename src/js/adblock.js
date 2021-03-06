/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	h.config.hideads = new h.configOption('hideads', false, 'Скрывать самую назойливую (сверху) рекламу');

	if (!h.config.hideads.value()) {

		h.dom('a[target=_top]').show();
		h.dom('object').show();
		h.dom('iframe').show();

	} else {

		// iframe? O.o
		h.dom('iframe').each( function() {
			var frm = this;

			if (!frm.src.match(/youtube.com/)) {
				h.dom(frm).remove();
			} else {
				h.dom(frm).show();
			}
		} );

		// показываем ссылки, если они не на pink.habralab

		h.dom('a[target=_top]').each( function() {
			var link = this;

			if (!link.href.match(/http:\/\/pink.habralab/)) {
				h.dom(link).show();
			} else {
				h.dom(link).remove();
			}
		} );

		// показываем ранее скрытые в css object, если в них не содержится
		// ролик с pink.habralab.*

		h.dom('object').each( function() {
			var
				obj   = this,
				embed =
					h.dom('embed[src]', obj).first() ||
					h.dom('param[name=movie][value]', obj).first(),
				param = (!embed) ? false : (h.dom(embed).attr('src') || h.dom(embed).attr('value'));

			if (
				param
				&& param.match(/http:\/\/pink.habralab/)
			) {
				h.dom(obj).remove();
			} else {
				h.dom(obj).show();
			}
		} );

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

	}

} )(habrafix);
