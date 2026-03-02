import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDarkMode = signal(this.loadSaved());

  constructor() {
    effect(() => {
      const dark = this.isDarkMode();
      this.apply(dark);
      this.save(dark);
    });
  }

  toggle(): void {
    this.isDarkMode.update((v) => !v);
  }

  private apply(dark: boolean): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark);
    }
  }

  private loadSaved(): boolean {
    if (typeof localStorage !== 'undefined') {
      const v = localStorage.getItem('shiftmaster-dark');
      return v === 'true';
    }
    return false;
  }

  private save(dark: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('shiftmaster-dark', String(dark));
    }
  }
}
