import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_ALERTS } from './shared/mock-data';
import { NotificationSignalService } from './core/services/notification-signal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  private readonly notificationService = inject(NotificationSignalService);

  ngOnInit(): void {
    this.notificationService.setNotifications(
      MOCK_ALERTS.map((a) => ({
        id: a.id,
        type: a.type,
        message: a.message,
        priority: a.priority,
        time: a.time,
        team: a.team,
        read: false,
      }))
    );
  }
}
