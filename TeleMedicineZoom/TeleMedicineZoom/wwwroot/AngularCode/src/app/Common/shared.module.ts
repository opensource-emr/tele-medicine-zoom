import { ngModuleJitUrl } from '@angular/compiler';
import {NgModule} from '@angular/core'
import { ZoomSettingsModel } from './zoom-model';
import { ZoomComponent } from './zoom.component';

@NgModule({
declarations:[ZoomComponent],
exports:[ZoomComponent]
})
export class SharedModule{

}