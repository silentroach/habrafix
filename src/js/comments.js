/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
( function(h) {

	// отрабатываем только на странице с топиком
	if (!h.location.topic) {
		return;
	}

	var 
		commentsElement = h.dom('#comments').first(),
		expanderCount = 0,
		expandAllElement = null;

	// отрабатываем ветку только если на странице есть комментарии
	if (!commentsElement) {
		return;
	}
	
	var
		commentCount = 0,
		elCount = h.dom('.js-comments-count', commentsElement).html();
	
	if (
		elCount
		&& elCount.match(/^(\d+)$/g)
	) {
		commentCount = parseInt(elCount);
	}

	// нет комментариев - не обрабатываем
	if (commentCount == 0) {
		return;
	}
	
	var
		// ищем автора топика для подсветки его комментариев
		author = h.dom('.vcard.author a span').html() || false,
		// проверять ли комментарии на авторство (если мы - автор, то не за чем)
		checkAuthor = author && author !== h.user,
		// предки комментариев
		commentParents = {};

	/**
	 * Получаем идентификатор комментария
	 * @param {HTMLElement} element HTML элемент
	 * @return {number|boolean}
	 */
	var extractCommentId = function(element) {
		var tmp = element.id.match(/(\d+)/g);
		
		return !tmp ? false : tmp[0];
	}
	
	/**
	 * Раскрываем ветку по идентификатору
	 * @param {number} id Идентификатор комментария
	 */
	var expandCommentsNode = function(id) {
		var element = h.dom('#comment_' + id).first();
		
		if (!element) {
			return false;
		}
		
		var list = h.dom('ul.hentry', element).first();
		
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
		
		var expander = h.dom('.hf_expander', element).first();
		
		// раскрываем список
		h.utils.removeClass(list, 'hf_collapsed');
		
		// удаляем разворачиватель
		if (expander) {
			h.utils.removeElement(expander);
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
			h.utils.removeElement(expandAllElement);
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
		h.dom('.hf_collapsed').removeClass('hf_collapsed');
		
		// убираем все раскрыватели
		h.dom('.hf_expander').remove();
		
		// скрываем ссылку для разворота
		h.utils.removeElement(expandAllElement);
		
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

	/**
	 * Подготавливаем ветку комментариев
	 * @param {HTMLElement} element HTML элемент
	 * @param {number|boolean} parentId Идентификатор предка
	 */
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
		
		if (
			id
			&& checkAuthor
		) {
			// автор этого комментария случаем не автор топика?
			var metaElement = h.dom('.msg-meta', element).first();
			
			if (metaElement) {
				if (h.dom('.nickname a').html() === author) {
					h.utils.addClass(metaElement, 'hf_author_reply');
				}
			}
		}
	
		// ищем вложенные комментарии, без них нет смысла продолжать выполнение
		var clist = h.dom('ul.hentry', element).first();

		if (!clist) {
			return;
		}

		// пробуем найти абзац с кнопкой "ответить"
		var preply = h.dom('p.reply', element).first();

		if (!preply) {			
			// так что придется создать лишний блок в .entry-content
			var ec = h.dom('div.entry-content', element).first();

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

	// скрываем комментарии чтобы быстрее их обработать
	h.utils.hide(commentsElement);
	prepareCommentsTree(commentsElement, false);
	commentsElement.style.display = '';
	
	// функция для раскрытия комментария, если мы переходим к нему по хэшу
	var hashExpand = function() {
		var 
			hash = location.hash,
			tmp = hash.match(/(\d+)/g);
		
		// если хеша нет - извините
		if (hash == '') {
			return;
		}
		
		// если в хеше идентификатор топика - надо его сначала развернуть
		if (tmp) {
			var id = tmp[0];
			
			if (id in commentParents) {
				expandCommentsNode(commentParents[id]);
			}
		}
		
		// передергиваем location для того чтобы перейти к комментарию 
		// или к их началу если идентификатора нет
		// с небольшой вынужденной задержкой
		setTimeout( function() {
			location = location;
		}, 100);
	}
	
	hashExpand();
	
	//window.onhashchange = hashExpand;	
	
	// есть сложенные комментарии? тогда покажем ссылку "развернуть все"
	if (expanderCount > 0) {
		var headerElement = h.dom('.comments-header', commentsElement).first();
		
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
