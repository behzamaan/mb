import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {User} from './user';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public USER_API =  '/users';
  constructor(private http: HttpClient, private router: Router) { }

  all(): Observable<any> {
    return this.http.get(this.USER_API + '/');
  }

  search(p): Observable<any> {
    const search = new HttpParams().set('search', p);
    return this.http.get<any>(this.USER_API, {params: search});
  }

  saveOrUpdate(user): Observable<any> {
    return this.http.post(this.USER_API, user);
  }

  load(id: Number) {
    const url = `${this.USER_API}/${id}`;
    return this.http.get<any>(url);
  }

  remove(id: Number): Observable<{}> {
    const url = `${this.USER_API}/${id}`;
    return this.http.delete<any>(url);
  }
}
