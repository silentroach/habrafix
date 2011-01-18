/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	/**
	 * @const
	 * @type {string}
	 */
	var subscribedClassName = 'hf_subscribed';

	var processTags = function() {
		// если мы на странице с тегами - ничего не делаем
		if (h.location.tag) {
			return;
		}

		// запрашиваем у background список тегов
		chrome.extension.sendRequest( {
			'method': 'getTags'
		}, function(tags) {
			// нет тегов - извините
			if (tags.length == 0) {
				return;
			};
		
			if (
				h.location.profile
				&& h.user
				&& h.location.profile == h.user
			) {
				// показываем подписанные теги на странице своего профиля
				var firstWrap = $('.dl_logic_wrap').first();
			
				if (!firstWrap) {
					// извините
					return;
				}
			
				// FIXME вот это ж лапша
				var wrap = document.createElement('div');
				wrap.id = 'hf_taglist';
				h.utils.addClass(wrap, 'dl_logic_wrap');
			
				var dl = document.createElement('dl');
			
				var dt = document.createElement('dt');
				dt.innerText = 'Интересующие теги:';
			
				dl.appendChild(dt);
			
				var dd = document.createElement('dd');
			
				var ul = document.createElement('ul');
				h.utils.addClass(ul, 'hf_taglist');
			
				for (var i = 0; i < tags.length; i++) {
					var tag = tags[i];
				
					var li = document.createElement('li');
				
					var a = document.createElement('a');
					a.rel = 'tag';
					a.href = 'http://habrahabr.ru/tag/' + encodeURIComponent(tag) + '/';
					a.innerText = tag;
				
					h.utils.addClass(a, 'hf_tag');
				
					li.appendChild(a);
				
					ul.appendChild(li);
				}
			
				dd.appendChild(ul);
			
				dl.appendChild(dd);
			
				wrap.appendChild(dl);
			
				firstWrap.parentNode.insertBefore(wrap, firstWrap);
			} else {		
				var entries = $('#main-content .hentry').all();
		
				for (var i = 0; i < entries.length; i++) {
					var 
						entry = entries[i],
						tagElements = $('a[rel=tag]', entry).all();
		
					for (var n = 0; n < tagElements.length; n++) {
						var element = tagElements[n];
			
						if (tags.indexOf(element.innerText.toLowerCase()) >= 0) {
							h.utils.addClass(element, subscribedClassName);
						
							// если мы находимся в списке топиков, то подсвечиваем его
							if (!h.location.topic) {
								h.utils.addClass(entry, subscribedClassName);
							}
						}
					}
				}
			}

		} );
	};
	
	processTags();
	
	chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
		if (
			'notification' in request
			&& request['notification'] == 'tagsChanged'
		) {
			sendResponse({});
			
			// если мы в профиле - удаляем список интересующих тегов
			h.utils.seekAndDestroy('#hf_taglist');
		
			// в остальных местах убираем выделяющий класс
			h.utils.seekAndCallback('.' + subscribedClassName, function(element) {
				h.utils.removeClass(element, subscribedClassName);
			} );
			
			// ну и заново поехали
			processTags();
		}
	} );

} )(habrafix);
