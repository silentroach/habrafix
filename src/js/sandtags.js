/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// специально для песочницы, где теги строкой
	h.dom('#main-page.sandbox ul.tags li').each( function() {
		var 
			tagList = this,
			list = h.dom(tagList).text().split(', ');
			
		if (list.length == 0) {
			return;
		}
			
		var
			parent = tagList.parentNode, 
			frag = document.createDocumentFragment();
		
		h.dom(tagList).remove();
		
		for (var i = 0; i < list.length; i++) {
				var
					tag = list[i], 
					li  = document.createElement('li'),
					a   = document.createElement('a');
					
				a.rel = 'tag';
				a.href = 'http://habrahabr.ru/tag/' + encodeURIComponent(tag) + '/';
				a.innerText = tag;
				
				if (i > 0) {
					li.appendChild(document.createTextNode(', '));
				}
								
				li.appendChild(a);
				
				frag.appendChild(li);
		}
		
		parent.appendChild(frag);
	} );
	
} )(habrafix);