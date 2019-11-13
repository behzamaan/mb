import {Role} from '../role/role';

export class Privilege {
  id: number = null;
  name: string = null;
  roles: Array<Role> = [];
}
