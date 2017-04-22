import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AngularFire } from "angularfire2";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public af: AngularFire, private router: Router) {
  }

  canActivate() {
    let isAuthenticated = false;

    this.af.auth.subscribe(auth => {
      if (auth) {
        isAuthenticated = true;
        console.log('user is logged in', auth);
      } else {
        this.router.navigate(['/login']);
        isAuthenticated = false;
      }
    });

    return isAuthenticated;
  }

}