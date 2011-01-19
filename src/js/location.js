/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.location = ( function(h) {

	var 
		m,
		l = window.location,
		obj = {
			/** @type {string}         */ pathname: l.pathname,
			/** @type {string|boolean} */ tag: false,
			/** @type {string|boolean} */ profile: false,
			/** @type {boolean}        */ topic: false,
			/** @type {boolean}        */ mailer: false,
			/** @type {boolean}        */ qaq: false,
			/** @type {boolean}        */ sandtopic: false
		};
	
	// топик
	if (l.pathname.match(/\/blog[\/|s\/][^$]/)) {
		obj.topic = true;
		return obj;
	}
	
	// qa-вопрос
	if (l.pathname.match(/\/qa\/(\d+)\/$/)) {
		obj.qaq = true;
		return obj;
	}

	// топик из песочницы
	if (l.pathname.match(/\/sandbox\/(\d+)\/$/)) {
		obj.sandtopic = true;
		return obj;
	}
	
	// страница профиля
	if (l.pathname == '/') {
		m = l.host.match(/(.*?).habrahabr.ru/)

		if (m) {
			obj.profile = m.pop();
			return obj;
		}
	}
	
	// почтовик
	if (l.pathname.match(/\/mail\/write\/(.*?)\//)) {
		obj.mailer = true;
		return obj;
	}
	
	// страница с топиками определенного тега
	m = l.pathname.match(/\/tag\/(.*?)\//);
	if (m) {
		obj.tag = m.pop();
		return obj;
	}
	
	return obj;

} )(habrafix);
