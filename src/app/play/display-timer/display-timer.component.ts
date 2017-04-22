import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'app-display-timer',
    templateUrl: 'display-timer.component.html',
    styleUrls: ['display-timer.component.scss']
})
export class DisplayTimerComponent implements OnChanges {
    @Input() endTimestamp: number = 0;
    timeLeft: number = 0;

    private timerObservable$: Observable<number>;
    private endTimerSubject$: Subject<boolean> = new Subject();

    /**
     * Assign time to public value
     * @param seconds
     * @private
     */
    private _setTimeLeft(seconds: number) {
        this.timeLeft = seconds > 0 ? seconds : 0;
    }

    /**
     * Set up a timer observable to count down
     * @private
     */
    private _startTimer() {
        if (this.timerObservable$) {
            this.endTimerSubject$.next(false);
        }
        if (this.endTimestamp > 0) {
            const offset = this._getOffset();
            if (offset > 0) {
                this.timerObservable$ = Observable.timer(0, 1000)
                    .takeUntil(this.endTimerSubject$.asObservable())
                    .takeUntil(Observable.timer((offset + 1) * 1000));

                this.timerObservable$.subscribe(() => {
                    this._setTimeLeft(this._getOffset());
                });
            }
        }
    }

    /**
     * Calculate the amount of seconds between the endTimestamp and now
     * @returns {number}
     * @private
     */
    private _getOffset(): number {
        if (this.endTimestamp) {
            return Math.floor((new Date(this.endTimestamp).getTime() - Date.now()) / 1000);
        }
        return 0;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.endTimestamp) {
            this._startTimer();
        }
    }

}
