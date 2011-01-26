/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	h.config.undownvote = new h.configOption('undownvote', true, 'Убрать возможность понижения кармы и творить <a href="http://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%B1%D1%80%D0%BE">добро</a>');

	if (h.config.undownvote.value()) {
		h.dom('.vote_minus').remove();
		
		h.dom('.entry-info-wrap').addClass('hf_undown');
	}
	
} )(habrafix);
