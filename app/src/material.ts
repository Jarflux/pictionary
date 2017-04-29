import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdCardModule,
    MdSnackBarModule,
    MdIconModule,
    MdTooltipModule,
    MdSidenavModule,
    MdChipsModule
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
        MdSidenavModule,
        MdChipsModule
    ],
    exports: [
        MdButtonModule,
        MdCardModule,
        MdSnackBarModule,
        MdIconModule,
        MdTooltipModule,
        MdSidenavModule,
        MdChipsModule
    ],
})
export class MaterialModule {
}
