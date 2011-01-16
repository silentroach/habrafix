habrafix.db = ( function(h) {

	var migrations = {
		'0': {
			version: '0.1',
			callback: function(t) {
				t.executeSql('create table tags_subscribe (tag text primary key not null);');
			}
		}
	};

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

	var database = openDatabase(h.name, '', h.name, null);
	migrate(database, database.version);	

	return database;

} )(habrafix);