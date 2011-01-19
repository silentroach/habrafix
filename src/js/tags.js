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
				var firstWrap = h.dom('.dl_logic_wrap').first();
			
				if (!firstWrap) {
					// извините
					return;
				}
			
				// FIXME вот это ж лапша
				var wrap = document.createElement('div');
				wrap.id = 'hf_taglist';
				h.dom(wrap).addClass('dl_logic_wrap');
			
				var dl = document.createElement('dl');
			
				var dt = document.createElement('dt');
				dt.innerText = 'Интересующие теги:';
			
				dl.appendChild(dt);
			
				var dd = document.createElement('dd');
			
				var ul = document.createElement('ul');
				h.dom(ul).addClass('hf_taglist');
			
				for (var i = 0; i < tags.length; i++) {
					var tag = tags[i];
				
					var li = document.createElement('li');
				
					var a = document.createElement('a');
					a.rel = 'tag';
					a.href = 'http://habrahabr.ru/tag/' + encodeURIComponent(tag) + '/';
					a.innerText = tag;
				
					h.dom(a).addClass('hf_tag');
				
					li.appendChild(a);
				
					ul.appendChild(li);
				}
			
				dd.appendChild(ul);
			
				dl.appendChild(dd);
			
				wrap.appendChild(dl);
			
				firstWrap.parentNode.insertBefore(wrap, firstWrap);
			} else {		
				h.dom('#main-content .hentry').each( function() {
					var entry = this;
					
					h.dom('a[rel=tag]', entry).each( function() {
						var element = this;
			
						if (tags.indexOf(element.innerText.toLowerCase()) >= 0) {
							h.dom(element).addClass(subscribedClassName);
						
							// если мы находимся в списке топиков, то подсвечиваем его
							if (
								!h.location.topic
								&& !h.location.qaq
								&& !h.location.sandtopic
							) {
								h.dom(entry).addClass(subscribedClassName);
							}
						}
					} );
				} );
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
			h.dom('#hf_taglist').remove();
		
			// в остальных местах убираем выделяющий класс
			h.dom('.' + subscribedClassName).removeClass(subscribedClassName);
			
			// ну и заново поехали
			processTags();
		}
	} );

} )(habrafix);
