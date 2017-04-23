import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RecognitionService} from './recognition.service';
import {DrawLine} from "../../models/draw-line";
import {environment} from "../../../environments/environment"
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  providers: [RecognitionService]
})
export class RecognitionComponent {

  constructor(private recognitionService: RecognitionService, private snackBar: MdSnackBar) {
  }

  processDrawing(drawing: DrawLine[]) {

    let trace = [];

    for (let line of drawing) {

      let tempX = [];
      let tempY = [];

      for (let point of line.points) {
        tempX.push(point.x);
        tempY.push(point.y);
      }

      trace.push([tempX, tempY])
    }

    this.recognitionService.getGuess(trace, environment.drawboardCanvasWidth, environment.drawboardCanvasHeight).subscribe(
      (guess: string) => this.showGuess(guess),
      error => {
        console.log(error);
      }
    );
  }

  private showGuess(guess: string) {
    this.snackBar.open('Google thinks you are drawing a ' + guess + "!", null, {
      duration: 10000
    });
  }

}
