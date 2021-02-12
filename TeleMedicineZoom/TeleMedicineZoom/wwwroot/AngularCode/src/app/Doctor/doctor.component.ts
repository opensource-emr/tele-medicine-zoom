import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import {ZoomSettings} from "../app.model"
ZoomMtg.setZoomJSLib("/js/@zoomus/websdk/dist/lib", "/av")
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
 
  zoomSettings:any =  new ZoomSettings();
  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {
    
    httpClient.get("/Home/getDoctorConfig")
      .subscribe((res:ZoomSettings)=>{
        this.zoomSettings=res;
      },(res)=>{
       
      });

  }

  ngOnInit() {

  }

  getSignature() {
    this.startMeeting(this.zoomSettings.signature);
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.zoomSettings.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          meetingNumber: this.zoomSettings.meetingId,
          userName: this.zoomSettings.username,
          signature: this.zoomSettings.signature,
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
