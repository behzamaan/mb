import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {SearchBuilder} from '../../../share/search-builder';
import {Search} from '../../../share/search.enum';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  users: Array<User>;
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'enabled', 'tokenExpired' , 'remove' , 'edit'];
  user =  new User();

  constructor(private userService: UserService) {}


  ngOnInit() {
    if (this.user.username === null) {
      this.findAll();
    } else {
      this.search();
    }
  }

  findAll() {
    this.userService.findAll().then(users => this.users = users);
  }

  search() {
    const s = new SearchBuilder()
      .add('username', Search.Contains, this.user.username)
      .build();
    this.userService.search(s).then(list => this.users = list);
  }

  remove(id: Number) {
    this.userService.deleteById(id).subscribe(() => {
      console.log('remove entity by id : ' + id);
    });
  }

}
