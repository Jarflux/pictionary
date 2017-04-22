import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RoomComponent } from "./room/room.component";
import { RoomListComponent } from "./room-list/room-list.component";

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
    // Todo: If user is logged in redirect to home
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
