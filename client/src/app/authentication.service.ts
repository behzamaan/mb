import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Autentication} from './authentication/authentication/autentication';


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

  login(username: string, password: string): Observable<any>  {
    const headers = new HttpHeaders((username && password) ? {
      authorization: 'Basic ' + btoa(username + ':' + password)
    } : {});
    return this.http.get<any>('/login', {headers: headers}).pipe(
      map(u => {
        if (u) {
          this.currentUserSubject.next(u);
          localStorage.setItem('currentUser', JSON.stringify(u));
        }
      })
    );
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

  logout(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/html',
        'Authorization': 'Basic',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };
    this.currentUserSubject.next(null);
    localStorage.setItem('currentUser', null);
    return this.http.get('/ll');
  }
}
