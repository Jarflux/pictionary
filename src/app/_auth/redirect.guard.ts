import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AngularFire } from "angularfire2";

@Injectable()
export class RedirectGuard implements CanActivate {

  constructor(public af: AngularFire, private router: Router) {
  }

  canActivate() {
    let redirect = true;

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/home']);
        redirect = false;
      }
    });

    return redirect;
  }
}
