import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class AccountService {
    private currentUserId: string;

    constructor(private af: AngularFire) {
        this.currentUserId = this.af.auth.getAuth().uid;
    }

    getProfile() {
        return this.af.database.object(`/playerInfo/${this.currentUserId}`);
    }

}
