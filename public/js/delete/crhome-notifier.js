function notify() {
	var havePermission = window.webkitNotifications.checkPermission();
	if (havePermission == 0) {
		// 0 is PERMISSION_ALLOWED
		var notification = window.webkitNotifications
				.createNotification(
						'//skypeblogs.files.wordpress.com/2013/09/skype-logo-feb_2012_rgb_500.png',
						'Chrome notification!', 'Here is the notification text');

		notification.onclick = function() {
			window.open("//localhost");
			notification.close();
		};
		notification.show();
	} else {
		window.webkitNotifications.requestPermission();
	}
}
