/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.location = ( function(h) {

	var 
		m,
		obj = {
			/** @type {string|boolean} */ tag: false,
			/** @type {string|boolean} */ profile: false,
			/** @type {string|boolean} */ topic: false
		};
	
	// топик
	if (location.pathname.match(/\/blog[\/|s\/][^$]/)) {
		obj.topic = true;
		return obj;
	}
	
	// страница профиля
	if (location.pathname == '/') {
		m = location.host.match(/(.*?).habrahabr.ru/)

		if (m) {
			obj.profile = m.pop();
			return obj;
		}
	}
	
	// страница с топиками определенного тега
	m = location.pathname.match(/\/tag\/(.*?)\//);
	if (m) {
		obj.tag = m.pop();
		return obj;
	}
	
	return obj;

} )(habrafix);
