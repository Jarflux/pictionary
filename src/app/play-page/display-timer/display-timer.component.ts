import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-display-timer',
    templateUrl: './display-timer.component.html',
    styleUrls: ['./display-timer.component.scss']
})
export class DisplayTimerComponent implements OnInit {
    @Input() time: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

}
