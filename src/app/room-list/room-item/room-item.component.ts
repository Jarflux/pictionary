import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../models/room";
import {SimpleChanges} from "../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";


@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input()
  private room: Room;

  public playerCount: number;

  constructor() { }

  ngOnChanges(changes:SimpleChanges){
    if(changes.room){
      this.playerCount = Object.keys(changes.room.currentValue.players).length;
    }
  }

  ngOnInit() {
  }

}
