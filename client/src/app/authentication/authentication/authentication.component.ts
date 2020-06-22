import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {
  }
  showFiller = false;
  events: string[] = [];
  opened: boolean;


  ngOnInit() {
  }




  logout() {
    this.auth.logout();
  }
}
