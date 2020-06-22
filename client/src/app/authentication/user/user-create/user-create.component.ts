import {Component, OnInit} from '@angular/core';
import {User} from '../user';

import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService, private route: ActivatedRoute , private location: Location) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.load(id);
      }
    });
  }


  load(id: any): any {
    this.userService.findById(id).subscribe(model  => {
        this.user = model;
    });
    console.log(id);
    return null;
  }

  saveOrUpdate(model: User): User {
    model.roles=null;
    this.userService.saveOrUpdate(model).subscribe(
      (user) => {
        return user;
      }
    );
    return null;
  }

  back(): void {
    this.location.back();
  }


}
