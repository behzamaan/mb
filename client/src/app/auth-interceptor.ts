import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authenticationService: AuthenticationService , private router: Router) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const username = localStorage.getItem('username');
    // if (username) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${username}`
    //     }
    //   });
    // }

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        this.router.navigate(['/']);
      }
      if (err.status === 504 || err.status === 504 ) {
        this.router.navigate(['app']);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
