import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Common/shared.module';
import { ZoomComponent } from '../Common/zoom.component';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutingModule } from './doctor.routing.module';
import { DoctorLiveVideoComponent } from './Live-Video/live-video.component';
import { DoctorLoginComponent } from './Login/login.component';

@NgModule({
    declarations:[DoctorComponent,DoctorLiveVideoComponent,DoctorLoginComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,DoctorRoutingModule,SharedModule],
    providers:[]

})
export class DoctorModule{

}