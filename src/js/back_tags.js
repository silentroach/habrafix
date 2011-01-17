/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.tags = ( function(h) {

	var 
		subscriptionTitle = 'Подписки',
		cache = [],
		cached = false;
		
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

	// проверяем подписку, результат идет в callback
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
	
	// подписка
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
				}
			} );
		} );
	};
	
	// отписка
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
				}
			} );
		} );
	};

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
		/**
		 * Получение списка тегов
		 * @param {function(Array.<string>)} callback Callback-функция со списком
		 */
		list: function(callback) {
			tagList(callback);
		}
	};

} )(habrafix);
