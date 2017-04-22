import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "./room.service";
import {Room} from "../models/room";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [RoomService ]
})
export class RoomComponent implements OnInit, OnDestroy {
  private room: Room;
  private roomSubscription$: Subscription;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.roomSubscription$ = this.route.params
      .switchMap((params: Params) => this.roomService.getRoomById(params['id']))
      .subscribe((room:Room) => this.room = room);

  }

  ngOnDestroy() {
    this.roomSubscription$.unsubscribe();
  }
}
