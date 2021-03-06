import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { MdSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire, public snackBar: MdSnackBar, private router: Router) {
  }

  public animateIn: boolean = true;
  public animateOut: boolean = false;
  public showLogin: boolean = false;

  public login(platform) {
    switch (platform) {
      case "twitter":
        this._loginWithAuthProvider(AuthProviders.Twitter);
        break;
      case "facebook":
        this._loginWithAuthProvider(AuthProviders.Facebook);
        break;
      case "google":
        this._loginWithAuthProvider(AuthProviders.Google);
        break;
      case "github":
        this._loginWithAuthProvider(AuthProviders.Github);
        break;
    }
  }

  public showLoginCard() {
    this.animateOut = true;
    setTimeout(() => {
      this.showLogin = true;
    }, 500);
  }

  private _loginWithAuthProvider(authProvider) {
    this.af.auth.login({
      provider: authProvider
    })
      .then((success) => {
        this.animateOut = true;
      })
      .catch((error: any) => {
        console.log("Firebase failure: ", error);
        if (error.code === 'auth/account-exists-with-different-credential') {
          let msg = `Account already exist. Sign in using a provider associated with: ${error.email}`;
          this.snackBar.open(msg, null, {
            duration: 10000
          });
        } else {
          this.snackBar.open('An error occurred, please try again.', null, {
            duration: 5000
          });
        }
      });
  }

  ngOnInit() {
  }

}
