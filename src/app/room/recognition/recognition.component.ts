import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RecognitionService} from './recognition.service';
import {DrawLine} from "../../models/draw-line";

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  providers: [RecognitionService]
})
export class RecognitionComponent {

  public guesses: String[];

  constructor(private recognitionService: RecognitionService) {
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

    this.recognitionService.getGuess(trace, 1000, 618).subscribe(
      (guesses: String[]) => this.guesses = guesses,
      error => {
        console.log(error);
      }
    );
  }


}
