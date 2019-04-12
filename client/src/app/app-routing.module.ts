import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: 'app', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule'},

];




@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
