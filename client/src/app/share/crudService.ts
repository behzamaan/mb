import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

export class CrudService<E> {
  private http: HttpClient;
  private router: Router;
  private readonly api: string ;

  constructor(http: HttpClient, router: Router, api: string) {
    this.http = http;
    this.router = router;
    this.api = api;
  }

  findAll(): Observable<any> {
    return this.http.get<Array<E>>(this.api + '/');
  }

  search(p): Observable<Array<E>> {
    const search = new HttpParams().set('search', p);
    return this.http.get<Array<E>>(this.api, {params: search});
  }

  saveOrUpdate(model: E) {
    return this.http.post(this.api, model);
  }

  findById(id: Number) {
    const url = `${this.api}/${id}`;
    return this.http.get<E>(url);
  }

  deleteById(id: Number): Observable<{}> {
    const url = `${this.api}/${id}`;
    return this.http.delete<E>(url);
  }

}
