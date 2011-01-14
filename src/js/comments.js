( function() {

	var commentsElement = document.querySelector('#comments');

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
		
		if (list) {
		console.info(list['classList']);
		}

		// если вложенные комментарии уже раскрыты, то все ок
		if (
			!list
			|| !list['classList'].contains('collapsed')
		) {
			if (id in commentParents) {
				delete commentParents[id];
			}
		
			return false;
		}
		
		var expander = element.querySelector('.expander');
		
		// раскрываем список
		list['classList'].remove('collapsed');
		
		// удаляем разворачиватель
		if (expander) {
			expander.parentNode.removeChild(expander);
		}
	
		// проверяем предков
		if (id in commentParents) {
			expandCommentsNode(commentParents[id]);
			
			// приберемся за собой немного
			delete commentParents[id];
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
			preply['classList'].add('reply');
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
				commentCount.plural(['ответ', 'ответа', 'ответов']);
				
			expanderElement.onclick = onExpandCommentClick;
			
			// добавляем отступ, но только для авторизированных
			// для остальных он не нужен - слева будет пусто
			if (authorized) {
				expanderElement['classList'].add('expander');
			}
			
			// делаем ссылку похожей на ссылку "ответить"
			expanderElement['classList'].add('js-serv');				

			preply.appendChild(expanderElement);

			clist['classList'].add('collapsed');
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
		location = location;
	}
	
	hashExpand();
	
	//window.onhashchange = hashExpand;	

} )();
