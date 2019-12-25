import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Autentication} from './authentication/authentication/autentication';
import {CookieService} from 'ngx-cookie-service';
import {DOCUMENT} from '@angular/common';
import { Cookie } from 'ng2-cookies/cookie';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Autentication>;
  public currentUser: Observable<Autentication>;


  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Autentication>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Autentication {
    return this.currentUserSubject.value;
  }

  // login(username: string, password: string): Observable<any>  {
  //   const headers = new HttpHeaders((username && password) ? {
  //     authorization: 'Basic ' + btoa(username + ':' + password)
  //   } : {});
  //   return this.http.get<any>('/login', {headers: headers}).pipe(
  //     map(u => {
  //       if (u) {
  //         this.currentUserSubject.next(u);
  //         localStorage.setItem('currentUser', JSON.stringify(u));
  //       }
  //     })
  //   );
  // }

  login(username: string, password: string)  {

    const param = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'basic ' + btoa('fooClientIdPassword:secret')} )
    };

    console.log(param.toString());
    this.http.post('/oauth/token',
      param, httpOptions)
      .subscribe(
        data => {
          this.saveToken(data);
          this.router.navigate(['authentication']);
        },
        err => alert('Invalid Credentials'));
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set( 'access_token' , token.access_token , expireDate);
    console.log('Obtained Access token');
    this.router.navigate(['/']);
  }

  getResource(resourceUrl): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')} )
    };
    return this.http.get(resourceUrl, httpOptions);

  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      console.log('logout');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    Cookie.delete('access_token');
    this.router.navigate(['/login']);
  }

  public isSession(): boolean {
    this.http.get('isSession').subscribe(u => {
        return u;
      },
      error => {
        console.log(error);
      }
    );
    return false;
  }
  //
  // logout(): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'text/html',
  //       'Authorization': 'Basic',
  //       'Access-Control-Allow-Origin': 'http://localhost:4200'
  //     })
  //   };
  //   this.currentUserSubject.next(null);
  //   localStorage.setItem('currentUser', null);
  //   return this.http.get('http://localhost:8181/logout');
  // }
}
