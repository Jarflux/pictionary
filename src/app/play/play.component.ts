import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

    guessingWord: string = 'banaan';
    endTimeStamp: number;

    constructor() {
    }

    ngOnInit() {
        this.endTimeStamp = this.getEndTimeStamp();
    }

    private getEndTimeStamp() {
        const date = new Date(Date.now());
        date.setMinutes(date.getMinutes() + 1);
        return date.getTime();
    }

}
