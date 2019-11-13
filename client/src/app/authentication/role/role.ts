import {User} from '../user/user';
import {Privilege} from '../privilege/privilege';

export class Role {
  id: number = null;
  name: string = null;
  users: Array<User> = [];
  privileges: Array<Privilege> = [];
}
