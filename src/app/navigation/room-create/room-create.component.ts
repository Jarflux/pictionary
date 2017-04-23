import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../room/room.service";
import {Router} from '@angular/router';


@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss'],
  providers: [RoomService]
})
export class RoomCreateComponent implements OnInit {

  constructor(private roomService: RoomService, private router: Router) {
  }

  ngOnInit() {

  }

  addRoom(){
    let newRoomRef = this.roomService.addNewRoom();

    let detailUrl = this.router.createUrlTree(['/room', newRoomRef.key]);
;
    this.router.navigateByUrl(detailUrl);
  }
}
