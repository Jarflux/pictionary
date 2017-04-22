import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayPageComponent} from './play-page/play-page.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'play',
    component: PlayPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
