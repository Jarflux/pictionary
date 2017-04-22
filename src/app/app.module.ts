import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '../material';
import { AppComponent } from './app.component';
import { DisplayWordComponent } from './play-page/display-word/display-word.component';
import { PlayPageComponent } from './play-page/play-page.component';
import {environment} from '../environments/environment';

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
    PlayPageComponent
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
