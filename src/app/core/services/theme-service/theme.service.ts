import { Injectable } from '@angular/core';
import { isDarkMode } from '@utils/helpers/window.helpers';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service that provides methods for managing the application theme based on the color scheme.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode: boolean = isDarkMode();
  private theme!: string;

  private userThemeQuery: MediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );
  private colorSchemeSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.theme);

  constructor() {
    this.emitThemeSubjectValue();

    this.userThemeQuery.addEventListener('change', (e: MediaQueryListEvent) => {
      this.isDarkMode = e.matches;
      this.emitThemeSubjectValue();
    });
  }

  /**
   * Emits the current theme value to its subscribers.
   *
   * @private
   */
  private emitThemeSubjectValue(): void {
    this.theme = this.isDarkMode ? 'dark' : 'light';
    this.colorSchemeSubject.next(this.theme);
  }

  /**
   * Toggles the theme between light and dark mode.
   */
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.emitThemeSubjectValue();
  }

  /**
   * Gets an observable of the current color scheme.
   *
   * @returns {Observable<string>} An observable of the current color scheme.
   */
  getColorScheme(): Observable<string> {
    return this.colorSchemeSubject.asObservable();
  }
}
