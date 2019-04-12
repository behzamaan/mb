import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public USER_API =  '/userEntities';
  constructor(private http: HttpClient, private router: Router) { }

  search(): Observable<any> {
    return this.http.get(this.USER_API);
  }

  saveOrUpdate(user): Observable<any> {
    return this.http.post(this.USER_API, user);
  }

}
