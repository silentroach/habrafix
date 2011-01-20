/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
( function(h) {

	var proxy = document.createElement('textarea');
	proxy.contentEditable = true;
	
	var copyCode = function(element) {
		proxy.value = element.innerText;
		proxy.value = element.innerText;
		proxy.select();
		document.execCommand('cut');
	};

	h.dom('#main-content code').each( function() {
		var 
			element = this.parentNode.nodeName == 'BLOCKQUOTE' ? this.parentNode : this,
			copier = document.createElement('a');
			
		copier.innerText = '[ копировать в буфер обмена ]';
		h.dom(copier).addClass('hf_copier');
		element.parentNode.insertBefore(copier, element);
		
		copier.onclick = function() {
			copyCode(element);
		}
	} );

} )(habrafix);