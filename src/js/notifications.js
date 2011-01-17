/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
/**
 * Показываем оповещение
 * @param {string} title Заголовок
 * @param {string} description Описание
 */
habrafix.notify = function(title, description) {
	var notification = webkitNotifications.createNotification(
		'icons/48.png',
		title,
		description
	);

	notification.show();

	// скрываем уведомление через 3 секунды после его появления
	setTimeout( function() {
		if (notification) {
			notification.cancel();
		}
	}, 3000);
};
