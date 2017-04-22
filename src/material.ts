import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule
  ],
})
export class MaterialModule { }
