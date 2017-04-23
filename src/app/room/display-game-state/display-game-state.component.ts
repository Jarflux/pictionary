import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.scss']
})
export class DisplayGameStateComponent implements OnInit {
  @Input() gameState: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
