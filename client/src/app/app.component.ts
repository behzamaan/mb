import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authenticationService: AuthenticationService, private router: Router, private ngZone: NgZone ) {
  }

  angularFunctionCalled() {
    alert('Angular 2+ function is called');
  }

  ngOnInit(): void {
    window['angularComponentReference'] = { component: this, zone: this.ngZone, loadAngularFunction: () => {
        return this.angularFunctionCalled();
      } };
    const c = this.authenticationService.checkCredentials();
    if (c) {
      this.router.navigate(['authentication']);
    } else {
      this.router.navigate(['/login']);
    }
  }


  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy(): void {
    this.logout();
  }

}
