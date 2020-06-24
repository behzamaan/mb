import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication.routing.module';
import {AppMaterialModule} from '../app-material.module';

import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserDisplayComponent} from './user/user-display/user-display.component';
import {AuthenticationComponent} from './authentication/authentication.component';

import {UserSearchComponent} from './user/user-search/user-search.component';

import {RoleCreateComponent} from './role/role-create/role-create.component';
import {RoleSearchComponent} from './role/role-search/role-search.component';
import {PrivilegeSearchComponent} from './privilege/privilege-search.component';
import {ListboxModule} from 'primeng/listbox';
import {AppPrimeModule} from '../app-prime.module';



@NgModule({
  declarations: [
    AuthenticationComponent,
    UserCreateComponent,
    UserDisplayComponent,
    UserSearchComponent,
    RoleCreateComponent,
    RoleSearchComponent,
    PrivilegeSearchComponent
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
    AppPrimeModule,
  ]
})
export class AuthenticationModule {}
