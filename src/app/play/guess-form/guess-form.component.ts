import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-guess-form',
    templateUrl: './guess-form.component.html',
    styleUrls: ['./guess-form.component.scss']
})
export class GuessFormComponent implements OnInit {
    @ViewChild('guessElement') guessElement;
    @Output() onGuess: EventEmitter<string> = new EventEmitter();

    guess: string;

    constructor() {
    }

    ngOnInit() {
        Observable.fromEvent(this.guessElement.nativeElement, 'keyup')
            .filter((event: KeyboardEvent) => {
                return event.keyCode === 13;
            })
            .subscribe(() => {
                this.onGuess.emit(this.guess);
            });
    }

}
