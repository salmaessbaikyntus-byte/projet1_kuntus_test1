import { Injectable, signal } from '@angular/core';

export interface NotificationItem {
  id: string;
  type: string;
  message: string;
  priority: string;
  time: string;
  team: string;
  read?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationSignalService {
  private readonly _notifications = signal<NotificationItem[]>([]);
  private readonly _unreadCount = signal(0);

  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = this._unreadCount.asReadonly();

  setNotifications(items: NotificationItem[]): void {
    this._notifications.set(items);
    this._unreadCount.set(items.filter((n) => !n.read).length);
  }

  addNotification(item: NotificationItem): void {
    this._notifications.update((prev) => [item, ...prev]);
    this._unreadCount.update((c) => c + 1);
  }

  markAsRead(id: string): void {
    this._notifications.update((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    this._unreadCount.update((c) => Math.max(0, c - 1));
  }

  markAllAsRead(): void {
    this._notifications.update((prev) => prev.map((n) => ({ ...n, read: true })));
    this._unreadCount.set(0);
  }

  remove(id: string): void {
    const item = this._notifications().find((n) => n.id === id);
    this._notifications.update((prev) => prev.filter((n) => n.id !== id));
    if (item && !item.read) this._unreadCount.update((c) => Math.max(0, c - 1));
  }
}
