import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "./room.service";
import {Room} from "../models/room";
import {Subscription} from "rxjs/Subscription";
import {FirebaseObjectObservable} from "angularfire2";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit{
  private isGuessing: boolean = false;
  private isArtist: boolean = false;
  private drawLines: string[];

  private room: Room;
  private room$: FirebaseObjectObservable<Room>;

  private guessingWord: string = 'banaan';
  private endTimeStamp: number;
  private currentUserId: string = "";

  constructor(private route: ActivatedRoute,
              private roomService: RoomService) {
  }

  ngOnInit() {
    this.room$ = this.roomService.getRoomById(this.route.snapshot.params['id']);
    this.room$
      .subscribe((room: Room) => {
        this.checkIfRoomStartsGame(room);
        this.room = room;
      });
  }


  handleDrawing(drawLines: string[]) {
    this.roomService.updateDrawings(this.room$, drawLines);
  }

  handleGuess(guess: string) {
    console.log('someone guessed', guess);
  }

  handleTimerRanOut() {
    console.log('timer has ended');
  }

  private checkIfRoomStartsGame(newRoom: Room) {
    this.currentUserId = this.roomService.currentUserId;

    if ((isNullOrUndefined(this.room) || !this.roomService.isRoomInPlayingMode(this.room)) && this.roomService.isRoomInPlayingMode(newRoom)) {
      this.isGuessing = true;
      this.isArtist = this.roomService.isCurrentUserTheArtist(newRoom);

      newRoom.startRoundTimestamp = new Date();
      this.endTimeStamp = this.getEndTimeStamp(newRoom.startRoundTimestamp).getTime();
    } else {
      console.log("Nope...");
      this.isGuessing = false;
      this.isArtist = false;
      this.endTimeStamp = undefined;
    }
  }

  private getEndTimeStamp(startTimestamp: Date) {
    let endTimestamp = new Date(startTimestamp.getTime());
    endTimestamp.setMinutes(startTimestamp.getMinutes() + 1);

    return endTimestamp;
  }
}
