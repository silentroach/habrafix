/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// удаляем "можно использовать html"
	h.dom('#js-field-holder-with-help .comment-help').remove();

	// закругленные уголки теперь через border-radius делаются в css
	h.dom('.entry-info .corner').remove();
	
	// будто и не было, правда?
	h.dom('.vote_minus').remove();
	
} )(habrafix);
