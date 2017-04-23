import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { RedirectGuard } from './_auth/redirect.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from "./room/room.component";
import { RoomListComponent } from "./room-list/room-list.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'room',
    component: RoomListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'room/:id',
    component: RoomComponent,
    canActivate: [AuthGuard]
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
