import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, NgControl} from '@angular/forms';

import {AppMaterialModule} from './app-material.module';


import {AppRoutingModule} from './app-routing.module';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthInterceptor} from './auth-interceptor';
import {LoginComponent} from './authentication/login/login.component';
import {HttpErrorInterceptor} from './http-error-interceptor';
import {AppPrimeModule} from './app-prime.module';
import {CookieService} from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CdkTableModule,
    ScrollingModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    AppPrimeModule,
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
