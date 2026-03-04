import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Lang = 'fr' | 'en';

const STORAGE_KEY = 'shiftmaster_lang';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly currentLang = signal<Lang>(this.getStoredLang());
  private readonly translations = signal<Record<string, unknown>>({});

  readonly lang = this.currentLang.asReadonly();
  readonly onLangChange = computed(() => this.currentLang());

  constructor(private http: HttpClient) {
    this.load(this.currentLang());
  }

  private getStoredLang(): Lang {
    if (typeof localStorage === 'undefined') return 'fr';
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'fr' ? stored : 'fr';
  }

  private setStoredLang(lang: Lang): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, lang);
  }

  load(lang: Lang): void {
    this.http.get<Record<string, unknown>>(`assets/i18n/${lang}.json`).subscribe({
      next: (data) => {
        this.translations.set(data);
        this.currentLang.set(lang);
        this.setStoredLang(lang);
      },
      error: () => {
        this.translations.set({});
      },
    });
  }

  use(lang: Lang): void {
    if (lang === this.currentLang()) return;
    this.load(lang);
  }

  instant(key: string): string {
    const t = this.translations();
    const parts = key.split('.');
    let value: unknown = t;
    for (const p of parts) {
      value = value && typeof value === 'object' && p in value ? (value as Record<string, unknown>)[p] : undefined;
    }
    return typeof value === 'string' ? value : key;
  }
}
