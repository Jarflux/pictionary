import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/distinctUntilChanged';
import {Line} from "../models/line";

@Component({
  selector: 'app-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.scss']
})

export class DrawboardComponent implements OnInit {
  @ViewChild('drawboard') drawboardRef: ElementRef;

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
      .map((event: MouseEvent | Touch): Line => this.generateLine(event));

    inputDown$
      .switchMapTo(inputMove$)
      .subscribe((line: Line) => this.drawLine(line));

    inputUp$
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

  private generateLine(event: MouseEvent | Touch): Line {
    let pointX = (event.clientX - this.drawboardOffsetLeft) / this.drawboardScaleFactor;
    let pointY = (event.clientY - this.drawboardOffsetTop) / this.drawboardScaleFactor;

    return new Line(pointX, pointY);
  }

  private drawLine(line: Line) : void{
    let lastIndex = this.polyLines.length - 1;
    this.polyLines[lastIndex] = this.polyLines[lastIndex].concat(line.toSvgLine() + ' ');
  }
}
