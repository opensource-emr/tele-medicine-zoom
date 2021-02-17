import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import {NavigationExtras,Router} from '@angular/router'

@Component({
  selector: 'app-doctor',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class PatientLoginComponent implements OnInit {
  public form: any;

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
 
 constructor(public fb: FormBuilder,public router:Router) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      userName:['',Validators.required]
    })
  }

  startLiveVideo() {
    let navigationExtras: NavigationExtras =
    {
      queryParams: {
        "userName": this.form.value.userName
      }
    };
    this.router.navigate(['/patient/live'], navigationExtras);
  }
  
  get formControls() {
    return this.form.controls;
  }
  
}
