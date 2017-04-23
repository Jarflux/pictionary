import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-drawboard-clear',
  templateUrl: './drawboard-clear.component.html',
  styleUrls: ['./drawboard-clear.component.scss']
})
export class DrawboardClearComponent implements OnInit {
  @Output() onClearDrawboard: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  clearDrawboard() {
    this.onClearDrawboard.emit({});
  }
}
