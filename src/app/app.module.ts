import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { DrawboardComponent } from './room/drawboard/drawboard.component';
import { DisplayWordComponent } from './room/display-word/display-word.component';
import { LoginComponent } from './login/login.component';
import { DisplayTimerComponent } from './room/display-timer/display-timer.component';
import { environment } from '../environments/environment';
import { GuessFormComponent } from './room/guess-form/guess-form.component';
import { RoomComponent } from './room/room.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RoomCreateComponent } from './navigation/room-create/room-create.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomItemComponent } from './room-list/room-item/room-item.component';

// Must export the config
export const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  databaseURL: environment.databaseURL,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId
};

@NgModule({
  declarations: [
    AppComponent,
    DisplayWordComponent,
    LoginComponent,
    DisplayTimerComponent,
    GuessFormComponent,
    AppComponent,
    DrawboardComponent,
    RoomComponent,
    NavigationComponent,
    RoomCreateComponent,
    RoomListComponent,
    RoomItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
