( function(h) {

	var 
		commentsElement = document.querySelector('#comments'),
		hiddenCommentsCount = 0,
		expandAllElement = null;

	// отрабатываем ветку только если на странице есть комментарии
	if (!commentsElement) {
		return;
	}
	
	var
		commentCount = 0,
		elCount = commentsElement.querySelector('.js-comments-count');

	if (
		elCount
		&& elCount.innerText.match(/^(\d+)$/g)
	) {
		commentCount = parseInt(elCount.innerText);
	}

	// нет комментариев - не обрабатываем
	if (commentCount == 0) {
		return;
	}
	
	// предки комментариев
	var commentParents = {};
	
	var extractCommentId = function(element) {
		var tmp = element.id.match(/(\d+)/g);
		
		if (!tmp) {
			return false;
		}
		
		return tmp[0];
	}
	
	// раскрываем ветку по идентификатору
	var expandCommentsNode = function(id) {
		var element = commentsElement.querySelector('#comment_' + id);
		
		if (!element) {
			return false;
		}
		
		var list = element.querySelector('ul.hentry');
		
		// если вложенные комментарии уже раскрыты, то все ок
		if (
			!list
			|| !h.utils.hasClass(list, 'hf_collapsed')
		) {
			if (id in commentParents) {
				delete commentParents[id];
				--hiddenCommentsCount;
			}
		
			return false;
		}
		
		var expander = element.querySelector('.hf_expander');
		
		// раскрываем список
		h.utils.removeClass(list, 'hf_collapsed');
		
		// удаляем разворачиватель
		if (expander) {
			expander.parentNode.removeChild(expander);
		}
	
		// проверяем предков
		if (id in commentParents) {
			expandCommentsNode(commentParents[id]);
			
			// приберемся за собой немного
			delete commentParents[id];
			--hiddenCommentsCount;
		}
		
		if (
			expandAllElement
			&& hiddenCommentsCount == 0
		) {
			expandAllElement.parentNode.removeChild(expandAllElement);
			expandAllElement = null;
		}
	};
	
	// раскрываем ветку
	var onExpandCommentClick = function() {
		// FIXME опасносте, три parent'а
		var id = extractCommentId(this.parentNode.parentNode.parentNode);
		
		if (id) {
			expandCommentsNode(id);
		}		
	}
	
	// раскрываем все ветки обсуждений
	var expandAll = function() {
		// раскрываем все списки
		var collapsed = document.querySelectorAll('.hf_collapsed');
		
		for (var i = 0; i < collapsed.length; i++) {
			var element = collapsed[i];
			
			h.utils.removeClass(element, 'hf_collapsed');
		}
		
		// убираем все раскрыватели
		var expanders = document.querySelectorAll('.hf_expander');
		
		for (var i = 0; i < expanders.length; i++) {
			var element = expanders[i];
			
			element.parentNode.removeChild(element);
		}		
		
		// скрываем ссылку для разворота
		expandAllElement.parentNode.removeChild(expandAllElement);		
		
		// обнуляем служебное
		hiddenCommentsCount = 0;
		delete commentParents;
	}

	// подготавливаем ветку
	var prepareCommentsTree = function(element, parentId) {
		// ищем идентификатор комментария
		var id  = extractCommentId(element);	
		
		// если у нас есть идентификатор и идентификатор предка,
		// то добавляем это дело в хэш
		if (
			id
			&& parentId
		) {
			commentParents[id] = parentId;
			++hiddenCommentsCount;
		}
	
		// ищем вложенные комментарии, без них нет смысла продолжать выполнение
		var clist = element.querySelector('ul.hentry');

		if (!clist) {
			return;
		}
		
		// авторизованы или не? (используется для отступа в ссылке раскрытия комментариев)
		// FIXME вынести куда-нибудь
		var authorized = true;

		// пробуем найти абзац с кнопкой "ответить"
		var preply = element.querySelector('p.reply');

		if (!preply) {
			// если не нашли - значит мы не авторизованы
			authorized = false;
			
			// так что придется создать лишний блок в .entry-content
			var ec = element.querySelector('div.entry-content');

			if (!ec) {
				return;
			}
			
			preply = document.createElement('p');
			h.utils.addClass(preply, 'reply');
			ec.appendChild(preply);
		}

		// счетчик вложенных комментариев
		var commentCount = 0;

		for (var i = 0; i < clist.childNodes.length; i++) {
			var node = clist.childNodes[i];

			if (node.nodeName === 'LI') {
				++commentCount;

				// рекурсия - вложенные комментарии тоже нужно сложить
				prepareCommentsTree(node, id);
			}
		}

		if (element != commentsElement) {
			var expanderElement = document.createElement('a');
			
			expanderElement.innerText = '+ развернуть ' + commentCount + ' ' + 
				h.utils.getPluralForm(commentCount, ['ответ', 'ответа', 'ответов']);
				
			expanderElement.onclick = onExpandCommentClick;
			
			// добавляем отступ, но только для авторизированных
			// для остальных он не нужен - слева будет пусто
			if (authorized) {
				h.utils.addClass(expanderElement, 'hf_extra_left');
			}
			
			h.utils.addClass(expanderElement, 'hf_expander');
			
			// делаем ссылку похожей на ссылку "ответить"
			h.utils.addClass(expanderElement, 'js-serv');				

			preply.appendChild(expanderElement);

			h.utils.addClass(clist, 'hf_collapsed');
		}
	}

	prepareCommentsTree(commentsElement, false);
	
	// функция для раскрытия комментария, если мы переходим к нему по хэшу
	var hashExpand = function() {
		var 
			hash = location.hash,
			tmp = hash.match(/(\d+)/g);
		
		if (!tmp) {
			return;
		}
		
		var id = tmp[0];
		
		if (id in commentParents) {
			expandCommentsNode(commentParents[id]);
		}
		
		// передергиваем location для того чтобы перейти к комментарию
		// с небольшой вынужденной задержкой
		setTimeout( function() {
			location = location;
		}, 100);
	}
	
	hashExpand();
	
	//window.onhashchange = hashExpand;	
	
	// есть сложенные комментарии? тогда покажем ссылку "развернуть все"
	if (hiddenCommentsCount > 0) {
		var headerElement = commentsElement.querySelector('.comments-header');
		
		if (headerElement) {
			expandAllElement = document.createElement('a');
			h.utils.addClass(expandAllElement, 'js-serv');
			h.utils.addClass(expandAllElement, 'hf_extra_left');
			expandAllElement.innerText = 'развернуть все';
			expandAllElement.onclick = expandAll;
			
			headerElement.appendChild(expandAllElement);
		}
	}

} )(habrafix);
