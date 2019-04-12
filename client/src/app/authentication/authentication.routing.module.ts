import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AuthGuard} from '../auth.guard';
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserDisplayComponent} from './user/user-display/user-display.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './login/login.component';
import {UserSearchComponent} from './user/user-search/user-search.component';


const authenticationRoutes: Routes = [
  {
    path: '', component: AuthenticationComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {
        path: 'user', component: UserComponent , canActivateChild : [AuthGuard],
        children: [
          {path: 'search', component: UserSearchComponent},
          {path: 'create', component: UserCreateComponent},
          {path: 'display', component: UserDisplayComponent} ,
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
