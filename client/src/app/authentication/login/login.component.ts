import { Component, OnInit } from '@angular/core';
import {User} from '../user/user';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';
import {async} from 'q';
import {__await} from 'tslib';
declare function sign(see: any): any;
declare  var s: any;

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


     // sign(1).then(this.secondFunction).then(this.thirdFunction);


   // alert(JSON.stringify(my1));
    this.authenticationService.login(this.username, this.password);
    // console.log(this.user);
    // this.authenticationService.login(this.user.username, this.user.password);
  }
  ngOnInit() {
  }

  secondFunction(per: any) {
    return new Promise(function (resolve, reject) {
      console.log(per);
      setTimeout(function() {
        resolve(per);
      }, 1);
    });
  }


   thirdFunction() {
     return new Promise(function (resolve, reject) {
       console.log('thirdFunction');
     });
  }

}
