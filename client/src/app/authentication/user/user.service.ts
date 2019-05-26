import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public USER_API =  '/users/';
  constructor(private http: HttpClient, private router: Router) { }

  all(): Observable<any> {
    return this.http.get(this.USER_API);
  }

  search(p): Observable<any> {
    const search = new HttpParams().set('search', p);
    return this.http.get<any>('/users' , {params: search});
  }

  saveOrUpdate(user): Observable<any> {
    return this.http.post(this.USER_API, user);
  }

  load(id: Number) {
    const url = '${USER_API}/${id}';
    return this.http.get<any>(this.USER_API + id);
  }

}
