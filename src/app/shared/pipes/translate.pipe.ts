import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '../../core/services/translate.service';

@Pipe({ name: 'translate', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(key: string, _langTrigger?: string): string {
    _langTrigger = this.translate.lang(); // lecture du signal pour réagir au changement de langue
    return this.translate.instant(key);
  }
}
