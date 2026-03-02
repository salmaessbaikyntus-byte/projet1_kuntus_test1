import { Injectable, signal } from '@angular/core';

export interface ShiftItem {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  status: string;
  cellId?: string;
}

@Injectable({ providedIn: 'root' })
export class ShiftSignalService {
  private readonly _todayShifts = signal<ShiftItem[]>([]);
  private readonly _weekShifts = signal<ShiftItem[]>([]);
  private readonly _isLoading = signal(false);

  readonly todayShifts = this._todayShifts.asReadonly();
  readonly weekShifts = this._weekShifts.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  setTodayShifts(shifts: ShiftItem[]): void {
    this._todayShifts.set(shifts);
  }

  setWeekShifts(shifts: ShiftItem[]): void {
    this._weekShifts.set(shifts);
  }

  updateShift(id: string, patch: Partial<ShiftItem>): void {
    this._todayShifts.update((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
    this._weekShifts.update((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  addShift(shift: ShiftItem): void {
    this._todayShifts.update((prev) => {
      const exists = prev.some((s) => s.id === shift.id);
      if (exists) return prev.map((s) => (s.id === shift.id ? shift : s));
      return [shift, ...prev];
    });
    this._weekShifts.update((prev) => {
      const exists = prev.some((s) => s.id === shift.id);
      if (exists) return prev.map((s) => (s.id === shift.id ? shift : s));
      return [shift, ...prev];
    });
  }
}
