habrafix.notify = function(title, description) {
	var notification = webkitNotifications.createNotification(
		'icons/48.png',
		title,
		description
	);

	notification.show();

	setTimeout( function() {
		if (notification) {
			notification.cancel();
		}
	}, 3000);
};
