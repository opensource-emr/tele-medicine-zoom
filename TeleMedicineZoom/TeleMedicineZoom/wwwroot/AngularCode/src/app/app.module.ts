import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DoctorComponent } from './Doctor/doctor.component';
import { PatientComponent } from './Patient/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
