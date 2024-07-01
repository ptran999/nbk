/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 * Modified By:  Phuong Tran
 * Description: WEB 450 - nodebucket.
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface AppUser {
  fullName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  appUser: AppUser;
  isSignedIn: boolean;

  constructor(private cookieService: CookieService) {
    this.appUser = {} as AppUser;
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;

    if(this.isSignedIn) {
      this.appUser = {
        fullName: this.cookieService.get('session_name')
      }
      console.log('Signed in as', this.appUser);
    }
  }

  // Function to sign out the user.
  signOut() {
    console.log('Removing the session_user from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }
}