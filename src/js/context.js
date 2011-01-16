( function(h) {

	h.globalMenu = chrome.contextMenus.create( {
		'title': 'Выделение топиков с тегом',
		'contexts': [
			'link'
		],
		'onclick': function(info, tab) {
			var tagPart = info.linkUrl.match(/\/tag\/(.*?)\//);

			if (tagPart) {
				var tag = decodeURIComponent(tagPart.pop());

				h.tags.toggleSubscription(tag);
			}
		},
		'documentUrlPatterns': [
			'http://*.habrahabr.ru/*',
			'http://habrahabr.ru/*',
			'http://habrahabr.ru/'
		],
		'targetUrlPatterns': [
			'http://*.habrahabr.ru/tag/*',
			'http://habrahabr.ru/tag/*'
		]
	} );

} )(habrafix);
