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
	
	// раскрываем ветку
	var expandCommentsNode = function() {
		var top = this.parentNode;

		var ul = top.parentNode.parentNode.querySelector('ul.hentry.collapsed');

		if (ul) {
			ul['classList'].remove('collapsed');
		}

		top.removeChild(this);
	};

	// подготавливаем ветку
	var prepareCommentsTree = function(element, collapse) {
		var clist = element.querySelector('ul.hentry');

		if (!clist) {
			// не нашли списка вложенных комментариев
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

				// рекурсия - вложенные комментарии тоже нужно
				// сложить
				prepareCommentsTree(node, true);
			}
		}

		if (collapse) {
			var expanderElement = document.createElement('a');
			
			expanderElement.innerText = '+ развернуть ' + commentCount + ' ' + 
				commentCount.plural(['ответ', 'ответа', 'ответов']);
				
			expanderElement.onclick = expandCommentsNode;
			
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

} )();
