import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PlayComponent} from './play/play.component';
import {RoomComponent} from "./room/room.component";

const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'play',
        component: PlayComponent
    },
    {
        path: 'room/:id',
        component: RoomComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
