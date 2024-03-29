import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CrudService} from '../../share/crudService';
import {User} from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(http: HttpClient,  router: Router) {
    super(http, router, '/users');
  }

}
