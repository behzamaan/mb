import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    const c = this.authenticationService.currentUserValue;
    if (c) {
      this.router.navigate(['/authentication/user']);
    } else {
      this.router.navigate(['/authentication/login']);
    }
  }


  logout() {
    this.authenticationService.logout()
      .subscribe(
        () => {
          console.log('Autentication logout');
          this.router.navigate(['/authentication/login']);
        }
      );
  }

}
