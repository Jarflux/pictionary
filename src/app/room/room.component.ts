import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "./room.service";
import {Room} from "../models/room";
import {FirebaseObjectObservable} from "angularfire2";
import {isNullOrUndefined} from "util";
import {DrawLine} from "../models/draw-line";
import {RecognitionComponent} from "./recognition/recognition.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {
  private isGuessing: boolean = false;
  private isArtist: boolean = false;
  private drawLines: DrawLine[];

  private roomUid: string;
  private room: Room;
  private room$: FirebaseObjectObservable<Room>;

  private guessingWord: string = 'banaan';
  private endTimeStamp: number;
  private currentUserId: string = "";

  @ViewChild(RecognitionComponent)
  private recognitionComponent: RecognitionComponent;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService) {
  }

  ngOnInit() {
    this.roomUid = this.route.snapshot.params['id'];
    this.enterRoom(this.roomUid);
    this.room$ = this.roomService.getRoomById(this.roomUid);
    this.room$
      .subscribe((room: Room) => {
        this.checkIfRoomStartsGame(room);

        if (!isNullOrUndefined(room.currentGameDrawing)) {
          this.drawLines = room.currentGameDrawing.map((rawDrawLine) => {
            let drawLine: DrawLine = new DrawLine();
            Object.assign(drawLine, rawDrawLine);

            return drawLine;
          });
        } else {
          this.drawLines = [];
        }

        this.room = room;
      });
  }

  handleLineDrawn() {
    if (this.isArtist) {
      this.recognitionComponent.processDrawing(this.drawLines);
    }
  }

  handleDrawing(drawLines: DrawLine[]) {
    this.roomService.updateLastDrawingLine(this.room$, drawLines);
  }

  handleGuess(guess: string) {
    console.log('someone guessed', guess);
    this.roomService.guess(this.roomUid, guess);
  }

  handleTimerRanOut() {
    console.log('timer has ended');
  }

  leaveRoom() {
    this.roomService.leaveRoom(this.roomUid);
  }

  private enterRoom(roomUid: string) {
    this.roomService.enterRoom(roomUid);
  }

  private checkIfRoomStartsGame(newRoom: Room) {
    this.currentUserId = this.roomService.currentUserId;

    if ((isNullOrUndefined(this.room) || !this.roomService.isRoomInPlayingMode(this.room)) && this.roomService.isRoomInPlayingMode(newRoom)) {
      this.isGuessing = true;
      this.isArtist = this.roomService.isCurrentUserTheArtist(newRoom);
      this.endTimeStamp = this.getEndTimeStamp(new Date(newRoom.startRoundTimestamp)).getTime();
    } else if (!this.roomService.isRoomInPlayingMode(newRoom)) {
      this.isGuessing = false;
      this.isArtist = false;
      this.endTimeStamp = undefined;
      this.drawLines = [];
    }
  }

  private getEndTimeStamp(startTimestamp: Date) {
    let endTimestamp = new Date(startTimestamp.getTime());
    endTimestamp.setMinutes(startTimestamp.getMinutes() + 1);

    return endTimestamp;
  }
}
