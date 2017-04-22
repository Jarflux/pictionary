import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { DisplayWordComponent } from './play-page/display-word/display-word.component';
import { PlayPageComponent } from './play-page/play-page.component';

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
    DisplayWordComponent,
    PlayPageComponent
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
