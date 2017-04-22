import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '../material';
import { AppComponent } from './app.component';
import { DrawboardComponent } from './drawboard/drawboard.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDlhRyWbIzZmO8LqhqQpAhg8jdBXhoM814',
  authDomain: 'pictionary-9dca6.firebaseapp.com',
  databaseURL: 'https://pictionary-9dca6.firebaseio.com',
  storageBucket: 'pictionary-9dca6.appspot.com',
  messagingSenderId: '1006398482597'
};

@NgModule({
  declarations: [
    AppComponent,
    DrawboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
