import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AuthGuard} from '../auth.guard';

import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserDisplayComponent} from './user/user-display/user-display.component';
import {AuthenticationComponent} from './authentication/authentication.component';

import {UserSearchComponent} from './user/user-search/user-search.component';
import {RoleSearchComponent} from './role/role-search/role-search.component';
import {RoleCreateComponent} from './role/role-create/role-create.component';


const authenticationRoutes: Routes = [
  {
    path: '', component: AuthenticationComponent,
    children: [
      {
        path: 'user' , canActivateChild : [AuthGuard],
        children: [
          {path: 'search', component: UserSearchComponent},
          {path: 'edit/:id', component: UserCreateComponent},
          {path: 'create', component: UserCreateComponent},
          {path: 'display', component: UserDisplayComponent} ,
        ]
      },
      {
        path: 'role', canActivateChild : [AuthGuard],
        children: [
          {path: 'search', component: RoleSearchComponent},
          {path: 'edit/:id', component: RoleCreateComponent},
          {path: 'create', component: RoleCreateComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule {}
