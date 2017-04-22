import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RoomComponent} from "./room/room.component";
import {RoomListComponent} from "./room-list/room-list.component";

const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'room',
        component: RoomListComponent
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
