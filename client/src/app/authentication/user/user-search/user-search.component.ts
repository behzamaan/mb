import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users: Array<User>;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'enabled', 'tokenExpired' , 'remove' , 'edit'];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.search().subscribe(list => {
      this.users = list;
      console.log(this.users[0]);
    });
  }

  remove(id: Number) {
    console.log('remove entity by id : ' + id);
  }

}
