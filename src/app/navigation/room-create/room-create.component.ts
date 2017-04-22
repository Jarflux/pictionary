import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../room/room.service";


@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss'],
  providers: [RoomService]
})
export class RoomCreateComponent implements OnInit {

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {
  }

  addRoom(){
    this.roomService.addNewRoom();
  }
}
