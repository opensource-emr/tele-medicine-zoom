import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientLiveVideoComponent } from './Live-Video/live-video.component';
import { PatientLoginComponent } from './Login/login.component';
import { PatientComponent } from './patient.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:PatientLoginComponent},
  {path:'live',component:PatientLiveVideoComponent},
  {path: 'patient', component:PatientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
