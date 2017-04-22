import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {RoomService} from "../../room/room.service";
import {Room} from "../../models/room";


@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss'],
  providers: [RoomService]
})
export class RoomCreateComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  ngOnInit() {
  }

  addRoom(){
    this.roomService.addRoom();
}



}
