import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/distinctUntilChanged';
import {DrawLine, DrawPoint} from "../../models/draw-line";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {isNullOrUndefined} from "util";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.scss']
})

export class DrawboardComponent implements OnInit {
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

  @Input() drawnLines: DrawLine[];

  @Output() onDrawing: EventEmitter<DrawLine[]> = new EventEmitter();
  @Output() onLineDrawn: EventEmitter<any> = new EventEmitter();

  @ViewChild('drawboard') drawboardRef: ElementRef;

  //ToDo: viewbox dynamic shizzle
  private defaultViewBoxWidth: number = environment.drawboardCanvasWidth;

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
      .map((event: MouseEvent | Touch): DrawPoint => this.generateLine(event));

    inputDown$
      .skipWhile(() => this._inDrawingMode.getValue() === false)
      .switchMapTo(inputMove$)
      .subscribe((drawPoint: DrawPoint) => this.drawPoint(drawPoint));

    inputUp$
    //.skipWhile(() => this._inDrawingMode.getValue() === false)
      .do(event => this.onLineDrawn.emit(null))
      .subscribe(() => this.createNewPolyLine());
  }

  private createNewPolyLine() {

    if (isNullOrUndefined(this.drawnLines[this.drawnLines.length - 1]) || this.drawnLines[this.drawnLines.length - 1].points.length > 0) {
      this.drawnLines.push(new DrawLine());
    }
  }

  private setInitialValues() {
    if (isNullOrUndefined(this.drawnLines)) {
      this.drawnLines = [];
    }
    this.createNewPolyLine();

    this.drawboardOffsetTop = 0;
    this.drawboardOffsetLeft = 0;
    this.drawboardScaleFactor = 1;
  }

  private updateDrawboard(drawboardEl: HTMLElement) {
    this.drawboardOffsetTop = drawboardEl.getBoundingClientRect().top || 0;
    this.drawboardOffsetLeft = drawboardEl.getBoundingClientRect().left || 0;
    this.drawboardScaleFactor = drawboardEl.getBoundingClientRect().width / this.defaultViewBoxWidth;
  }

  private generateLine(event: MouseEvent | Touch): DrawPoint {
    let pointX = Math.round((event.clientX - this.drawboardOffsetLeft) / this.drawboardScaleFactor);
    let pointY = Math.round((event.clientY - this.drawboardOffsetTop) / this.drawboardScaleFactor);

    return new DrawPoint(pointX, pointY);
  }

  private drawPoint(drawPoint: DrawPoint): void {
    if (this.drawnLines.length == 0) {
      this.createNewPolyLine();
    }
    this.drawnLines[this.drawnLines.length - 1].points.push(drawPoint);

    this.onDrawing.emit(this.drawnLines);
  }

  generateSvgPath(drawLine: DrawLine): string {
    let path: string = "";

    if (!isNullOrUndefined(drawLine)) {
      drawLine.points.forEach((drawPoint: DrawPoint) => {
        path = path.concat(`${drawPoint.x},${drawPoint.y} `);
      });
    }

    return path;
  }
}
