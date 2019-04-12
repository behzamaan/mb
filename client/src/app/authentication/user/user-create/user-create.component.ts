import {Component, OnInit} from '@angular/core';
import {User} from '../user';

import {UserService} from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  delete(id: Number) {
  }

  load(id: Number): any {
    return null;
  }

  saveOrUpdate(model: User): User {
    this.userService.saveOrUpdate(model).subscribe(
      (user) => {
        return user;
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('ok');
      }
    );
    return null;
  }


}
