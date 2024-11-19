import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private readonly VAPID_PUBLIC_KEY = 'BHsscdk5PUWLDjaaDyHvN5jU1vobhdrA40mVFN6nwg_qSfix4WYbHZIA3zju9VQIn5-gko6zKvseYKb23gVXWeM';

  constructor(private swPush: SwPush, private http: HttpClient) {
    if (!swPush.isEnabled) {
      console.warn('Notifications are not enabled on this browser.');
      return;
    }else {
      console.log('Notifications enabled');
    }
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(subscription => {
        // Send the subscription to the backend
        this.http.post('http://localhost:3000/subscribe', subscription).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  listenToNotifications() {
    this.swPush.messages.subscribe(message => {
      console.log('Received a push message:', message);
      // Here you could display a notification to the user
    });

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log('Notification clicked', notification);
      // Handle notification click event
    });
  }
}
