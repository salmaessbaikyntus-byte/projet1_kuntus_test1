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
  private readonly analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.analytics.getAlerts().subscribe((alerts) => {
      this.notificationService.setNotifications(
        alerts.map((a) => ({
          id: a.id,
          type: a.type,
          message: a.title + ': ' + a.message,
          priority: a.priority,
          time: a.time,
          team: a.team,
          read: false,
        }))
      );
    });
  }
}
