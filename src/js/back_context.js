/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	/* оставим на будущее, когда будет много пунктов или появится поддержка
	   иконок при создании меню в расширениях 
	h.globalMenu = chrome.contextMenus.create( {
		'title': h.name,
		'contexts': [
			'link'
		],
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
	*/

	h.globalMenu = chrome.contextMenus.create( {
		'title': 'Выделять топики с тегом',
		'contexts': [
			'link'
		],
		//'parentId': h.globalMenu,
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
