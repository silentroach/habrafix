/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.tags = ( function(h) {

	var 
		/**
		 * @const
		 * @type {string}
		 */
		subscriptionTitle = 'Подписки',
		// FIXME выделить оповещения в отдельный файл
		tagsChangedNotification = {
			'notification': 'tagsChanged'
		},
		cache = [],
		cached = false;

	/**
	 * Получение списка тегов
	 * @param {function(Array.<string>)} callback Callback-функция со списком
	 */		
	var tagList = function(callback) {
		if (cached) {
			callback(cache);
		} else {
			// чтобы не запутаться сразу ставим cached
			cached = true;
		
			h.db.readTransaction( function(t) {
				t.executeSql('select tag from tags_subscribe', [], function(t, r) {
					cache = [];

					for (var i = 0; i < r.rows.length; i++) {
						cache.push(r.rows.item(i)['tag']);
					}

					callback(cache);
				} );
			} );
		}
	};

	/**
	 * Проверяем подписку, результат идет в callback
	 * @param {string} tag Тег
	 * @param {function(boolean)}
	 */
	var checkSubscription = function(tag, callback) {
		if (cached) {
			callback(cache.indexOf(tag) >= 0);
			return;
		}
	
		h.db.readTransaction( function(t) {
			t.executeSql('select tag from tags_subscribe where tag = ? limit 1;', [
				tag
			], function(t, r) {
				callback(r.rows.length > 0);
			} );
		} );
	};
	
	/**
	 * Подписка
	 * @param {string} tag Тег
	 */
	var subscribe = function(tag) {
		if (cached) {
			cache.push(tag);
		}
	
		h.db.transaction( function(t) {
			t.executeSql('insert into tags_subscribe (tag) select ?;', [
				tag
			], function(t, r) {
				if (r.rowsAffected > 0) {
					h.notify(subscriptionTitle, 'Выделение по тегу [' + tag + '] добавлено');

					h.requests.broadcast( tagsChangedNotification );
				}
			} );
		} );
	};
	
	/**
	 * Отписка
	 * @param {string} tag Тег
	 */
	var unsubscribe = function(tag) {
		if (cached) {
			var i = cache.indexOf(tag);
			
			if (i >= 0) {
				cache.splice(i, 1);
			}
		}
	
		h.db.transaction( function(t) {
			t.executeSql('delete from tags_subscribe where tag = ?;', [
				tag
			], function(t, r) {
				if (r.rowsAffected > 0) {
					h.notify(subscriptionTitle, 'Выделение по тегу [' + tag + '] убрано');

					h.requests.broadcast( tagsChangedNotification );
				}
			} );
		} );
	};
	
	h.requests.addListener('getTags', function(request, sendResponse) {
		h.tags.list( function(list) {
			sendResponse(list);
		} );
	} );

	return {
		/**
		 * Применяем/отменяем подписку на тег
		 * @param {string} tag Тег
		 */
		toggleSubscription: function(tag) {
			tag = tag.toLowerCase();
		
			checkSubscription(tag, function(result) {
				if (result) {
					unsubscribe(tag);
				} else {
					subscribe(tag);
				}
			} )
		},

		list: tagList
	};

} )(habrafix);
