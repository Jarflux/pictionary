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

  private isGuessing: boolean = false;
  private room: Room;
  private roomSubscription$: Subscription;

  private guessingWord: string = 'banaan';
  private endTimeStamp: number;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.roomSubscription$ = this.route.params
      .switchMap((params: Params) => this.roomService.getRoomById(params['id']))
      .subscribe((room:Room) => this.room = room);


    this.endTimeStamp = this.getEndTimeStamp();
  }

  ngOnDestroy() {
    this.roomSubscription$.unsubscribe();
  }


  handleGuess(guess: string) {
    console.log('someone guessed', guess);
  }

  handleTimerRanOut() {
    console.log('timer has ended');
  }


  toggleGuessMode() {
    this.isGuessing = !this.isGuessing;
  }

  private getEndTimeStamp() {
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 1);
    return date.getTime();
  }
}
