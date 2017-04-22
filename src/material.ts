import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdSnackBarModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdSnackBarModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdSnackBarModule
  ],
})
export class MaterialModule {
}
