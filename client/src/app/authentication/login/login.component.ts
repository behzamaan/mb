import { Component, OnInit } from '@angular/core';
import {User} from '../user/user';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  user: User;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  login() {
    this.authenticationService.login(this.username, this.password)
      .subscribe(
        () => {
          this.user = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.user.username);
          this.router.navigate(['authentication']);
        }
      );
    // console.log(this.user);
    // this.authenticationService.login(this.user.username, this.user.password);
  }
  ngOnInit() {
  }

}
