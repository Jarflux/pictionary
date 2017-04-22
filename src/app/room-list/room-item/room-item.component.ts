import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../models/room";


@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input()
  private room: Room;

  constructor() { }

  ngOnInit() {
  }

}
