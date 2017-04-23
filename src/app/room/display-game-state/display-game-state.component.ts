import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.scss']
})
export class DisplayGameStateComponent implements OnInit {
  @Input() gameStateRunningArtist: boolean = false;
  @Input() gameStateRunningGuesser: boolean = false;
  @Input() gameStateStopped: boolean = false;
  @Input() gameStateWaiting: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
