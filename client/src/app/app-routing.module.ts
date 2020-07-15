import {ModuleWithProviders, NgModule, forwardRef} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './authentication/login/login.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {UserCreateComponent} from './authentication/user/user-create/user-create.component';

const routes: Routes = [
  {path: 'app', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule'},

];




@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  // providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UserCreateComponent), multi: true } ]
})
export class AppRoutingModule { }
