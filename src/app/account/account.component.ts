import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';
import {UserProfile} from '../models/user-profile';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    user: UserProfile;


    constructor(private accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService
            .getProfile()
            .do(console.log)
            .subscribe(user => {
                this.user = user;
            });
    }
}
