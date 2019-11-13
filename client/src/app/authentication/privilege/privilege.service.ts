import {Injectable} from '@angular/core';
import {CrudService} from '../../share/crudService';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Privilege} from './privilege';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService extends CrudService<Privilege>  {

  constructor(http: HttpClient,  router: Router) {
    super(http, router, '/privileges');
  }
}
