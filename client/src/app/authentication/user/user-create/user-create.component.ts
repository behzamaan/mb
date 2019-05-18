import {Component, OnInit} from '@angular/core';
import {User} from '../user';

import {UserService} from '../user.service';
import {ActivatedRoute, ParamMap, Params, Route, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {load} from '@angular/core/src/render3';
import { Location } from '@angular/common';


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
      this.load(params.get('id'));
    });
  }

  delete(id: Number) {
  }

  load(id: any): any {
    this.userService.load(id).subscribe(model  => {
        this.user = model;
    });
    console.log(id);
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

  back(): void {
    this.location.back();
  }


}
