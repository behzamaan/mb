import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService , private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== '/oauth/token') {
      this.authenticationService.checkCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
      };
      request = request.clone(httpOptions);
    }
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        this.router.navigate(['login']);
      }
      if (err.status === 504 || err.status === 504 ) {
        this.router.navigate(['app']);
      }
      const error = err.error.message || err.statusText;
      console.log(error);
      return throwError(error);
    }));
  }
}
