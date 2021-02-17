import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import {ZoomSettingsModel} from "../Common/zoom-model"
ZoomMtg.setZoomJSLib("/js/@zoomus/websdk/dist/lib", "/av")
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'zoom-app',
  template: `<div class="meet" id="meet"></div>`, 
})
export class ZoomComponent implements OnInit {
    @Input('userName') userName : string;
    @Input('role') role :number;

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
 
  zoomSettings:ZoomSettingsModel =  new ZoomSettingsModel();
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {
    //For Doctor
    if(this.role === 1){
      this.httpClient.get("/Home/getDoctorConfig")
      .subscribe((res:any)=>{
        this.zoomSettings=res;
        this.getSignatureForDoctor();
      },(err)=>{ 
      });
    }

    //For Patient
    else if(this.role === 0){
      this.httpClient.get("/Home/getPatientConfig")
      .subscribe((res:any)=>{
        this.zoomSettings=res;
        this.getSignatureForPatient();
      },(err)=>{ 
      });
    }
  
  }

  //For Doctor
  getSignatureForDoctor() {
    this.startMeeting(this.zoomSettings.signature);
  }

  //For Patient
  getSignatureForPatient(){ 
    this.joinMeeting(this.zoomSettings.signature);
  }

  //For Doctor
  startMeeting(signature) {
   document.getElementById('zmmtg-root').style.display = 'block'
   ZoomMtg.init({
      leaveUrl: this.zoomSettings.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          meetingNumber: this.zoomSettings.meetingId,
          userName: this.userName,
          signature: signature,
          apiKey: this.zoomSettings.apiKey,
          passWord: this.zoomSettings.password,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  //For Patient
  joinMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.zoomSettings.leaveUrl,
      isSupportAV: true,
      screenShare: false,
      disableInvite: true,

      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          meetingNumber: this.zoomSettings.meetingId,
          userName: this.userName,
          signature: signature,
          apiKey: this.zoomSettings.apiKey,          
          passWord: this.zoomSettings.password,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  
}
