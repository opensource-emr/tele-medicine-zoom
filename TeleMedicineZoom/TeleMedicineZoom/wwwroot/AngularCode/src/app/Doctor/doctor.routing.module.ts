import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DoctorLiveVideoComponent } from './Live-Video/live-video.component';
import { DoctorLoginComponent } from './Login/login.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:DoctorLoginComponent},
  {path:'live',component:DoctorLiveVideoComponent},
  {path: 'doctor', component:DoctorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
