import { Component, OnInit, Inject } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'



@Component({
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.css']
})
export class DoctorLiveVideoComponent implements OnInit {
  public userName:string;
  public role = 1;
  public isMeet= false;

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js

  constructor(public fb: FormBuilder, public router:Router,public activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(m => {
      this.userName = m['userName'];
    });
  }

  ngOnInit() {
   this.isMeet=true;
  }
  

}
