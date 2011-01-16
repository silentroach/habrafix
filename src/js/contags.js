( function(h) {

	chrome.extension.sendRequest( {
		'method': 'getTags'
	}, function(tags) {

		// нет подписок - извините
		if (tags.length == 0) {
			return;
		};
		
		var entries = document.querySelectorAll('#main-content .hentry');
		
		for (var i = 0; i < entries.length; i++) {
			var 
				entry = entries[i],
				tagElements = entry.querySelectorAll('a[rel=tag]');
		
			for (var n = 0; n < tagElements.length; n++) {
				var element = tagElements[n];
			
				if (tags.indexOf(element.innerText.toLowerCase()) >= 0) {
					h.utils.addClass(element, 'hf_subscribed');
					h.utils.addClass(entry, 'hf_subscribed');
				}
			}
		}

	} );

} )(habrafix);
