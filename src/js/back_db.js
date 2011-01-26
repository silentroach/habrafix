/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.db = ( function(h) {

	var migrations = {
		'0': {
			version: '0.1',
			callback: function(t) {
				t.executeSql('create table tags_subscribe (tag text primary key not null);');
			}
		}
	};

	/**
	 * Миграция
	 * @param {Database} db База данных
	 * @param {string} ver Исходная версия
	 */
	var migrate = function(db, ver) {
		var version = (ver == '') ? '0' : ver;

		if (version in migrations) {
			var migration = migrations[version];

			db.changeVersion(ver, migration.version, function(t) {
				migration.callback(t);
			}, function() {
				migrate(db, migration.version);							
			} );
		}
	};
	
	var database = null;
	
	var getDatabase = function() {
		if (!database) {
			h.notify('db', 'init');
		
			database = openDatabase(h.name, '', h.name, null);
			migrate(database, database.version);
		}
		
		return database;
	};

	return {
		/**
		 * Транзакция
		 * @param {function(SQLTransactionCallback)}
		 */
		transaction: function(callback) {
			getDatabase().transaction(callback);
		},
		/**
		 * Транзакция для чтения
		 * @param {function(SQLTransactionCallback)}
		 */
		readTransaction: function(callback) {
			getDatabase().readTransaction(callback);
		}
	};

} )(habrafix);
