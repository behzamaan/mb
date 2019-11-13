import {Role} from '../role/role';

export class User {
  password: string = null;
  id: number = null;
  username: string = null;
  firstName: string = null;
  lastName: string = null;
  email: string = null;
  enabled: boolean = null;
  tokenExpired: boolean = null;
  roles: Array<Role> = [];
}

