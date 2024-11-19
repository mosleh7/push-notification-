import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PushNotificationService} from "./push.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'push-notification';
  constructor(private pushService: PushNotificationService) {}

  ngOnInit() {
    this.pushService.listenToNotifications();
  }

  subscribe() {
    console.log('subscribe btn clicked');
    this.pushService.subscribeToNotifications();
  }
}
