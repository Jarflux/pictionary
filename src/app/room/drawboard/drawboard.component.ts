import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/distinctUntilChanged';
import {DrawboardLine} from "../../models/drawboard-line";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.scss']
})

export class DrawboardComponent implements OnInit {
  @ViewChild('drawboard') drawboardRef: ElementRef;
  @Output() onDrawing: EventEmitter<string[]> = new EventEmitter();


  private _inDrawingMode = new BehaviorSubject<boolean>(false);
  // change data to use getter and setter
  @Input()
  set inDrawingMode(value) {
    // set the latest value for _data BehaviorSubject
    this._inDrawingMode.next(value);
  };

  get inDrawingMode() {
    // get the latest value from _data BehaviorSubject
    return this._inDrawingMode.getValue();
  }

  @Input() drawnLines: string[];


  //ToDo: viewbox dynamic shizzle
  private defaultViewBoxSize: number = 1000;

  private polyLines: string[];
  private drawboardOffsetTop: number;
  private drawboardOffsetLeft: number;
  private drawboardScaleFactor: number;

  ngAfterViewInit(): void {
    let drawboardEl = this.drawboardRef.nativeElement;
    this.updateDrawboard(drawboardEl);
    this.captureEvents(drawboardEl);
  }

  ngOnInit() {
    this.setInitialValues();
  }

  private captureEvents(drawboardEl: HTMLElement) {
    Observable.fromEvent(window, 'resize')
      .subscribe(() => this.updateDrawboard(this.drawboardRef.nativeElement));

    const inputUp$ = Observable.merge(
      Observable.fromEvent(drawboardEl, 'mouseup'),
      Observable.fromEvent(drawboardEl, 'touchend')
    );

    const inputDown$ = Observable.merge(
      Observable.fromEvent(drawboardEl, 'mousedown'),
      Observable.fromEvent(drawboardEl, 'touchstart')
    );

    const inputMove$ = Observable.merge(
      Observable.fromEvent(drawboardEl, 'mousemove'),
      Observable.fromEvent(drawboardEl, 'touchmove').map((e: TouchEvent) => e.touches[0])
    )
      .takeUntil(inputUp$)
      .map((event: MouseEvent | Touch): DrawboardLine => this.generateLine(event));

    inputDown$
      .skipWhile(() => this._inDrawingMode.getValue() === false)
      .switchMapTo(inputMove$)
      .subscribe((line: DrawboardLine) => this.drawLine(line));

    inputUp$
      .skipWhile(() => this._inDrawingMode.getValue() === false)
      .subscribe(() => this.createNewPolyLine());
  }

  private createNewPolyLine() {
    this.polyLines.push("");
  }

  private setInitialValues(){
    this.polyLines = [];
    this.createNewPolyLine();

    this.drawboardOffsetTop = 0;
    this.drawboardOffsetLeft = 0;
    this.drawboardScaleFactor = 1;
  }

  private updateDrawboard(drawboardEl: HTMLElement) {
    this.drawboardOffsetTop = drawboardEl.getBoundingClientRect().top || 0;
    this.drawboardOffsetLeft = drawboardEl.getBoundingClientRect().left || 0;
    this.drawboardScaleFactor = drawboardEl.getBoundingClientRect().width / this.defaultViewBoxSize;
  }

  private generateLine(event: MouseEvent | Touch): DrawboardLine {
    let pointX = (event.clientX - this.drawboardOffsetLeft) / this.drawboardScaleFactor;
    let pointY = (event.clientY - this.drawboardOffsetTop) / this.drawboardScaleFactor;

    return new DrawboardLine(pointX, pointY);
  }

  private drawLine(line: DrawboardLine) : void{
    let lastIndex = this.polyLines.length - 1;
    this.polyLines[lastIndex] = this.polyLines[lastIndex].concat(line.toSvgLine() + ' ');


    this.onDrawing.emit(this.polyLines);
  }
}
