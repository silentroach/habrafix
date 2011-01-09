var commentsElement = document.querySelector('#comments');

// отрабатываем ветку только если на странице есть комментарии
if (commentsElement) {
	var
		commentCount = 0,
		elCount = commentsElement.querySelector('.js-comments-count');

	if (
		elCount
		&& elCount.innerText.match(/^(\d+)$/g)
	) {
		commentCount = parseInt(elCount.innerText);
	}

	if (commentCount > 0) {
		var expandCommentsNode = function() {
			var top = this.parentNode;

			var ul = top.parentNode.parentNode.querySelector('ul.hentry.collapsed');

			if (ul) {
				ul['classList'].remove('collapsed');
			}

			top.removeChild(this);
		};

		var prepareCommentsTree = function(element, collapse) {
			var clist = element.querySelector('ul.hentry');

			if (!clist) {
				return;
			}

			var preply = element.querySelector('p.reply');

			if (!preply) {
				return;
			}

			var commentCount = 0;

			for (var i = 0; i < clist.childNodes.length; i++) {
				var node = clist.childNodes[i];

				if (node.nodeName === 'LI') {
					++commentCount;
					prepareCommentsTree(node, true);
				}
			}

			if (collapse) {
				var expanderElement = document.createElement('a');
				expanderElement.innerText = '+ развернуть ' + commentCount + ' ' + 
					commentCount.plural(['ответ', 'ответа', 'ответов']);
				expanderElement['classList'].add('js-serv');
				expanderElement['classList'].add('expander');
				expanderElement.onclick = expandCommentsNode;

				preply.appendChild(expanderElement);

				clist['classList'].add('collapsed');
			}
		}

		prepareCommentsTree(commentsElement, false);
	}
}
