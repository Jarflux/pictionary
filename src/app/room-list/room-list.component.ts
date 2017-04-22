import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../room/room.service";
import {Room} from "../models/room";
import {Subscription} from "rxjs/Subscription";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  providers: [RoomService ]
})
export class RoomListComponent implements OnInit, OnDestroy  {
  private rooms$: FirebaseListObservable<Room[]>;


  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getRooms();
  }

  ngOnDestroy(){

  }

}
