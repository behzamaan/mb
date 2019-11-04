import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

export class CrudService {
  private http: HttpClient;
  private router: Router;
  private readonly api: string ;

  constructor(http: HttpClient, router: Router, api: string) {
    this.http = http;
    this.router = router;
    this.api = api;
  }


  all(): Observable<any> {
    return this.http.get(this.api + '/');
  }

  search(p): Observable<any> {
    const search = new HttpParams().set('search', p);
    return this.http.get<any>(this.api, {params: search});
  }

  saveOrUpdate(user) {
    return this.http.post(this.api, user);
  }

  load(id: Number) {
    const url = `${this.api}/${id}`;
    return this.http.get<any>(url);
  }

  remove(id: Number): Observable<{}> {
    const url = `${this.api}/${id}`;
    return this.http.delete<any>(url);
  }

}
