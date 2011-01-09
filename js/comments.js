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

	if (commentCount == 0) {
		return;
	}

	console.info('Количество комментариев: ' + commentCount);

	var prepareCommentsTree = function(element, collapse) {
		var commentElements = element.querySelectorAll('ul.hentry > li.comment_holder');

		for (var i = 0; i < commentElements.length; i++) {
			var commentElement = commentElements[i];

			console.info(commentElement);

			prepareCommentsTree(commentElement, true);
		}
	};


	prepareCommentsTree(commentsElement, false);
}
