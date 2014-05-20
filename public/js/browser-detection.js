/**
 * When ready load the properly notification function.
 */

$(document).ready(function() {
	if ($.browser.mozilla && Printer.config["web notifications"] && Printer.config["desktop notificatios"] ) {
		Printer.notify = function(message) {
			// Let's check if the browser supports notifications
			if (!("Notification" in window)) {
				alert("This browser does not support desktop notification");
			}

			// Let's check if the user is okay to get some
			// notification
			else if (Notification.permission === "granted") {
				// If it's okay let's create a notification
				var notification = new Notification(message);
			}

			// Otherwise, we need to ask the user for permission
			// Note, Chrome does not implement the permission
			// static property
			// So we have to check for NOT 'denied' instead of
			// 'default'
			else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function(
						permission) {

					// Whatever the user answers, we make sure
					// we store the information
					if (!('permission' in Notification)) {
						Notification.permission = permission;
					}

					// If the user is okay, let's create a
					// notification
					if (permission === "granted") {
						var notification = new Notification(message);
					}
				});
			}
		};
	} else if ($.browser.chrome  && Printer.config["web notifications"] && Printer.config["desktop notificatios"] ) {
		Printer.notify = function(message,link) {
			var havePermission = window.webkitNotifications
					.checkPermission();
			if (havePermission == 0) {
				// 0 is PERMISSION_ALLOWED
				var notification = window.webkitNotifications
						.createNotification(
								link,'Printer notification',message);

				notification.onclick = function() {
					window.open(link);
					notification.close();
				};
				notification.show();
			} else {
				window.webkitNotifications.requestPermission();
			}
		};
	} else {
		Printer.notify = function(message,link) {
			$("#notifications").append('<div id=""><div class="alert alert-default"><div class="row"><div class="col-md-3"><img src="//skypeblogs.files.wordpress.com/2013/09/skype-logo-feb_2012_rgb_500.png" width="70px" height="30px" class="img-rounded" /></div><div class="col-md-9"><a href="#" class="close" data-dismiss="alert">&times;</a>' +message+'<a href="' +link+'">View</a></div></div></div></div>');
		};
	}
});