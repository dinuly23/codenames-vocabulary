import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import './web-vitals';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
