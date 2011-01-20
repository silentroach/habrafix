/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// чистим dom от уже скрытых в css элементов
	
	/*
	if (h.location.people) {
		h.dom('#sidebar').addClass('hf_show');
	} else {
		h.dom('#sidebar').remove();
	}*/
	
	// iframe? O.o
	h.dom('iframe').remove();

	// будто и не было, правда?
	h.dom('.vote_minus').remove();
	
} )(habrafix);
