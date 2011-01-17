/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// чистим dom от уже скрытых в css элементов
	h.utils.seekAndDestroy('#sidebar');

	// будто и не было, правда?
	h.utils.seekAndDestroy('.vote_minus');
	
} )(habrafix);
