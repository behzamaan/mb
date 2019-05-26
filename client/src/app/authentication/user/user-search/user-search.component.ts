import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {SearchBuilder} from '../../../share/search-builder';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }
  user =  <User> {};
  users: Array<User>;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'enabled', 'tokenExpired' , 'remove' , 'edit'];


  ngOnInit() {
    if (this.user.username === undefined) {
      this.userService.all().subscribe(list => {
        this.users = list;
        console.log(this.users[0]);
      });
    } else {
      this.search();
    }
  }
  search() {
    const s = new SearchBuilder()
      .add('username', ':', this.user.username)
      .build();
    this.userService.search(s).subscribe(list => {
      this.users = list;
      console.log(this.users[0]);
    });
  }

  remove(id: Number) {
    console.log('remove entity by id : ' + id);
  }

}
