import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "./room.service";
import {Room} from "../models/room";
import {FirebaseObjectObservable} from "angularfire2";
import {isNullOrUndefined} from "util";
import {DrawLine} from "../models/draw-line";
import {RecognitionComponent} from "./recognition/recognition.component";
import {Word} from "../models/word";
import {WordService} from "./word.service";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    providers: [RoomService, WordService]
})
export class RoomComponent implements OnInit {
    private isArtist: boolean = false;
    private gameIsStopped: boolean = false;
    private gameIsRunning: boolean = false;
    private gameIsWaiting: boolean = true;

    private drawLines: DrawLine[];

    private roomUid: string;
    private room: Room;
    private room$: FirebaseObjectObservable<Room>;
    private word$: FirebaseObjectObservable<Word>;

    private guessingWord: string;
    private endTimeStamp: number;
    private currentUserId: string = "";

    @ViewChild(RecognitionComponent)
    private recognitionComponent: RecognitionComponent;

    constructor(private snackBar: MdSnackBar,
                private route: ActivatedRoute,
                private roomService: RoomService,
                private wordService: WordService,
                private router: Router) {
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
                this.setCorrectGameState(this.room);
                this.checkWinner(this.room);
            });


    }

    handleLineDrawn() {
        if (this.isArtist) {
            this.recognitionComponent.processDrawing(this.drawLines);
        }
    }

    handleDrawing(drawLines: DrawLine[]) {
        this.roomService.updateCurrentGameDrawing(this.room$, drawLines);
    }

    handleClearDrawingboard() {
        this.roomService.clearCurrentGameDrawing(this.room$);
    }

    handleGuess(guess: string) {
        console.log('someone guessed', guess);
        this.roomService.guess(this.roomUid, guess)
            .then(
                (result) => {
                    if (result.status === 204) {
                        this.snackBar.open('Wrong, You guessed ' + guess + ' but it wasn\'t correct.', null, {
                            duration: 5000
                        });
                    } else {
                        this.snackBar.open('AWESOME, You guessed ' + guess + ' and it was correct!!', null, {
                            duration: 5000
                        });
                    }
                },
                () => {
                    this.snackBar.open('Wrong, You guessed ' + guess + ' but it wasn\'t correct.', null, {
                        duration: 5000
                    });
                }
            );
    }

    handleTimerRanOut() {
        console.log('timer has ended');
    }

    leaveRoom() {
        this.roomService.leaveRoom(this.roomUid);

        let detailUrl = this.router.createUrlTree(['/room']);
        this.router.navigateByUrl(detailUrl);
    }

    private getToGuessWord(wordUid: string) {
        this.word$ = this.wordService.getWordById(wordUid);
        this.word$.subscribe((word: Word) => {
            this.guessingWord = word.word;
        });
    }

    private enterRoom(roomUid: string) {
        this.roomService.enterRoom(roomUid);


    }

    private setCorrectGameState(room: Room) {
        this.gameIsRunning = this.roomService.isRoomInPlayingMode(room);
        this.gameIsStopped = this.roomService.isRoomInStoppedMode(room);
        this.gameIsWaiting = this.roomService.isRoomInWaitingMode(room);
    }

    private checkIfRoomStartsGame(newRoom: Room) {
        this.currentUserId = this.roomService.currentUserId;

        if ((isNullOrUndefined(this.room) || !this.roomService.isRoomInPlayingMode(this.room)) && this.roomService.isRoomInPlayingMode(newRoom)) {
            this.isArtist = this.roomService.isCurrentUserTheArtist(newRoom);
            if (this.isArtist) {
                this.getToGuessWord(newRoom.wordUid);
            }
            this.endTimeStamp = this.getEndTimeStamp(new Date(newRoom.startRoundTimestamp)).getTime();
        } else if (!this.roomService.isRoomInPlayingMode(newRoom)) {
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

    private checkWinner(room: Room) {
        if (room.winnerUid && room.winnerUid !== this.roomService.currentUserId) {
            this.word$ = this.wordService.getWordById(room.wordUid);
            this.word$.subscribe((word: Word) => {
                this.snackBar.open('You are out of luck, the word was ' + word.word + '!', null, {
                    duration: 5000
                });
            });
        }
    }
}
