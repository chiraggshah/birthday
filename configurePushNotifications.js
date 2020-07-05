import PushNotificationIOS from '@react-native-community/push-notification-ios';
var PushNotification = require('react-native-push-notification');
import AsyncStorage from '@react-native-community/async-storage';
import { CARDS, BIRTHDATE, TIMEZONE } from './configurations';

const configurePushNotifications = (refreshCallback) => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification
      refreshCallback();

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios',
  });
};

const schedulePushNotifications = () => {
  AsyncStorage.getItem('@pns_scheduled').then((value) => {
    if (value === null) {
      const nowDateObject = new Date(new Date().toUTCString());
      CARDS.forEach((card) => {
        const unlockTimeInUTC = new Date(
          `${BIRTHDATE}T${card.unlockTime}:00.000${TIMEZONE}`,
        ).toUTCString();
        const unlockTimeDate = new Date(unlockTimeInUTC);
        if (unlockTimeDate > nowDateObject) {
          PushNotification.localNotificationSchedule({
            /* iOS only properties */
            alertAction: 'view', // (optional) default: view
            category: '', // (optional) default: empty string
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

            /* iOS and Android properties */
            title: 'Happy Birthday', // (optional)
            message: 'Someone has sent a birthday wish for you.', // (required)

            // schedule
            date: unlockTimeDate,
          });
        }
      });
      AsyncStorage.setItem('@pns_scheduled', 'true');
    }
  });
};

export { configurePushNotifications, schedulePushNotifications };
