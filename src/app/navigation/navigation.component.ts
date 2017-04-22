import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public af: AngularFire) { }

  logout() {
    this.af.auth.logout();
  }

  ngOnInit() {
  }

}
