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
    if (this.checkCredentials()) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/authentication'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  private checkCredentials() {
    return this.authenticationService.checkCredentials();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.checkCredentials()) {
      // authorised so return true
      return true;
    }
    this.router.navigate(['/authentication'], {queryParams: {returnUrl: state.url}});
  }

}
