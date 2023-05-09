import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  currentLanguage = 'English';
  dropdownOpen = false;

  constructor(private translate: TranslateService) { // Inject the TranslateService
    translate.setDefaultLang('en'); // Set the default language

    // Retrieve the language preference from local storage
    const storedLanguage = localStorage.getItem('language');

    if (storedLanguage) {
      // If the stored language exists, use it
      this.changeLanguage(storedLanguage);
    } else {
      // Otherwise, use the default language
      this.changeLanguage('en');
    }
  }

  openDropdown(): void {
    this.dropdownOpen = true;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  changeLanguage(language: string): void {
    // Implement language change logic here
    switch (language) {
      case "en":
        this.currentLanguage = 'English';
        break;
      case "ru":
        this.currentLanguage = 'Русский';
        break;
      case "kz":
        this.currentLanguage = 'Қазақша';
        break;
      default:
        break;
    }
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.closeDropdown();
    console.log('Language changed to:', language);
  }
}
