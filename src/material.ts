import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdCardModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdButtonModule,
        MdCardModule
    ],
    exports: [
        MdButtonModule,
        MdCardModule
    ],
})
export class MaterialModule {
}
