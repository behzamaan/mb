import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationRoutingModule} from './authentication.routing.module';
import {AppMaterialModule} from '../app-material.module';
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserDisplayComponent} from './user/user-display/user-display.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './login/login.component';
import {UserSearchComponent} from './user/user-search/user-search.component';






@NgModule({
  declarations: [
    AuthenticationComponent,
    UserComponent,
    UserCreateComponent,
    UserDisplayComponent,
    LoginComponent,
    UserSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // CdkTableModule,
    // CdkTreeModule,
    // ScrollingModule,
    // HttpClientModule,
    AppMaterialModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule {}
