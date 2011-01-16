habrafix.tags = ( function(h) {

	var subscriptionTitle = 'Подписки';

	// проверяем подписку, результат идет в callback
	var checkSubscription = function(tag, callback) {
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
		h.db.transaction( function(t) {
			t.executeSql('insert into tags_subscribe (tag) select ?;', [
				tag
			], function(t, r) {
				if (r.rowsAffected > 0) {
					h.notify(subscriptionTitle, 'Добавлено выделение топиков с тегом ' + tag);
				}
			} );
		} );
	};
	
	// отписка
	var unsubscribe = function(tag) {
		h.db.transaction( function(t) {
			t.executeSql('delete from tags_subscribe where tag = ?;', [
				tag
			], function(t, r) {
				if (r.rowsAffected > 0) {
					h.notify(subscriptionTitle, 'Убрано выделение топиков с тегом ' + tag);
				}
			} );
		} );
	};

	return {
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
		list: function(callback) {
			h.db.readTransaction( function(t) {
				t.executeSql('select tag from tags_subscribe', [], function(t, r) {
					var tags = [];

					for (var i = 0; i < r.rows.length; i++) {
						tags.push(r.rows.item(i)['tag']);
					}

					callback(tags);
				} );
			}, function(e) {
				console.dir(e);
			} );
		}
	};

} )(habrafix);
