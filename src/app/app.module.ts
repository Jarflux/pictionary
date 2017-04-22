import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";
import { MaterialModule } from '../material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { DrawboardComponent } from './play/drawboard/drawboard.component';
import { DisplayWordComponent } from './play/display-word/display-word.component';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { DisplayTimerComponent } from './play/display-timer/display-timer.component';
import { environment } from '../environments/environment';

// Must export the config
export const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  databaseURL: environment.databaseURL,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    DisplayWordComponent,
    PlayComponent,
    LoginComponent,
    DisplayTimerComponent,
    AppComponent,
    DrawboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
