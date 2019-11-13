import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CrudService} from '../../share/crudService';
import {Role} from './role';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {

  constructor(http: HttpClient,  router: Router) {
    super(http, router, '/roles');
  }
}
