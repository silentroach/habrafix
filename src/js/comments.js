( function(h) {

	// отрабатываем только на странице с топиком
	if (!h.location.topic) {
		return;
	}

	var 
		commentsElement = document.querySelector('#comments'),
		expanderCount = 0,
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
	
	var
		// ищем автора топика для подсветки его комментариев
		authorElement   = document.querySelector('.vcard.author a span'),
		author = authorElement ? authorElement.innerText : false,
		// предки комментариев
		commentParents = {};
	
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
			}
		
			return false;
		}
		
		var expander = element.querySelector('.hf_expander');
		
		// раскрываем список
		h.utils.removeClass(list, 'hf_collapsed');
		
		// удаляем разворачиватель
		if (expander) {
			expander.parentNode.removeChild(expander);
			--expanderCount;
		}
	
		// проверяем предков
		if (id in commentParents) {
			expandCommentsNode(commentParents[id]);
			
			// приберемся за собой немного
			delete commentParents[id];
		}
		
		if (
			expandAllElement
			&& expanderCount == 0
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
		expanderCount = 0;
		delete commentParents;
	}
	
	// создаем заранее p.reply
	var preplyBase = document.createElement('p');
	h.utils.addClass(preplyBase, 'reply');

	// создаем заранее разворачиватель
	var expanderElementBase = document.createElement('a');
			
	// добавляем отступ, но только для авторизированных
	// для остальных он не нужен - слева будет пусто
	if (h.user) {
		h.utils.addClass(expanderElementBase, 'hf_extra_left');
	}

	h.utils.addClass(expanderElementBase, 'hf_expander');
			
	// делаем ссылку похожей на ссылку "ответить"
	h.utils.addClass(expanderElementBase, 'js-serv');				

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
		}
		
		if (id) {
			// автор этого комментария случаем не автор топика?
			var metaElement = element.querySelector('.msg-meta');
			
			if (metaElement) {
				var nickElement = metaElement.querySelector('.nickname a');
				
				if (
					nickElement
					&& nickElement.innerText == author
				) {
					h.utils.addClass(metaElement, 'hf_author_reply');
				}
			}
		}
	
		// ищем вложенные комментарии, без них нет смысла продолжать выполнение
		var clist = element.querySelector('ul.hentry');

		if (!clist) {
			return;
		}

		// пробуем найти абзац с кнопкой "ответить"
		var preply = element.querySelector('p.reply');

		if (!preply) {			
			// так что придется создать лишний блок в .entry-content
			var ec = element.querySelector('div.entry-content');

			if (!ec) {
				return;
			}
			
			preply = preplyBase.cloneNode();
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
			var expanderElement = expanderElementBase.cloneNode();
			
			expanderElement.innerText = '+ развернуть ' + commentCount + ' ' + 
				h.utils.getPluralForm(commentCount, ['ответ', 'ответа', 'ответов']);
				
			expanderElement.onclick = onExpandCommentClick;

			preply.appendChild(expanderElement);
			++expanderCount;

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
	if (expanderCount > 0) {
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
