import { Injectable, OnDestroy } from '@angular/core';
import { isDarkMode } from '@utils/helpers/window.helpers';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private isDarkMode: boolean = isDarkMode(); // Initialize based on user preferences
  private userThemeQuery: MediaQueryList;
  private colorSchemeSubject: BehaviorSubject<string>;

  constructor() {
    this.userThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.userThemeQuery.addEventListener(
      'change',
      this.handleColorSchemeChange
    );
    this.colorSchemeSubject = new BehaviorSubject<string>(
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  private handleColorSchemeChange = (e: MediaQueryListEvent) => {
    this.isDarkMode = e.matches;
    this.colorSchemeSubject.next(this.isDarkMode ? 'dark' : 'light');
  };

  ngOnDestroy(): void {
    // Remove the event listener when the service is destroyed
    this.userThemeQuery.removeEventListener(
      'change',
      this.handleColorSchemeChange
    );
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.colorSchemeSubject.next(this.isDarkMode ? 'dark' : 'light');
    // You can save the current theme mode in localStorage if needed
  }

  getColorScheme(): Observable<string> {
    return this.colorSchemeSubject.asObservable();
  }
}
