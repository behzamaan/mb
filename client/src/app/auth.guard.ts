import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser()) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/authentication'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  private currentUser() {
    return this.authenticationService.currentUserValue;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser()) {
      // authorised so return true
      return true;
    }
    this.router.navigate(['/authentication'], {queryParams: {returnUrl: state.url}});
  }

}
