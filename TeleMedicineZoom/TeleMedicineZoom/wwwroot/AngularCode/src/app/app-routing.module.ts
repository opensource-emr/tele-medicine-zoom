import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorModule } from './Doctor/doctor.module';
import { PatientModule } from './Patient/patient.module';



const routes: Routes = [
  { path: '', redirectTo: '/doctor/login', pathMatch: 'full' },
  { path: 'doctor', loadChildren: () => DoctorModule },
  { path: 'patient', loadChildren: () => PatientModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
