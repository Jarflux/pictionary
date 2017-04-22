import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdSnackBarModule,
  MdIconModule,
  MdTooltipModule,
  MdSidenavModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdSnackBarModule,
    MdIconModule,
    MdTooltipModule,
    MdSidenavModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdSnackBarModule,
    MdIconModule,
    MdTooltipModule,
    MdSidenavModule
  ],
})
export class MaterialModule {
}
