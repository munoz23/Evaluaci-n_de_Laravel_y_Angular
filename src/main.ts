import { bootstrapApplication } from '@angular/platform-browser';
import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app/app.routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule),
    provideRouter(routes)
  ]
});