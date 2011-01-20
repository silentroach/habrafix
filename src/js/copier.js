/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
( function(h) {

	h.dom('#main-content code').each( function() {
		var 
			element = this.parentNode.nodeName == 'BLOCKQUOTE' ? this.parentNode : this,
			copier = document.createElement('a');
			
		copier.innerText = '[ копировать в буфер обмена ]';
		h.dom(copier).addClass('hf_copier');
		element.parentNode.insertBefore(copier, element);
		
		copier.onclick = function() {
			chrome.extension.sendRequest( {
				'method' : 'copy',
				'data'   : element.innerText
			}, function(reply) {
				if (reply) {
					h.dom(copier).addClass('copied');
					
					setTimeout( function() {
						h.dom(copier).removeClass('copied');
					}, 1000);
				}
			} );
		}
	} );

} )(habrafix);
