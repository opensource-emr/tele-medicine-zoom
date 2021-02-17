import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoomComponent } from '../Common/zoom.component';
import { PatientRoutingModule } from './patient.routing.module';
import { PatientLiveVideoComponent } from './Live-Video/live-video.component';
import { PatientLoginComponent } from './Login/login.component';
import { PatientComponent } from './patient.component';
import { SharedModule } from '../Common/shared.module';

@NgModule({
    declarations:[PatientComponent,PatientLiveVideoComponent,PatientLoginComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,PatientRoutingModule,SharedModule],
    providers:[]

})
export class PatientModule{

}