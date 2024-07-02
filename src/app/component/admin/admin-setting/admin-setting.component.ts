import { Component } from '@angular/core';
import { FormControl,FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent {
  loginForm:any

  constructor(private _formBuilder:FormBuilder){

    this.loginForm = this._formBuilder.group({
      name:'',
      address:'',
      contact:'',
    })
  }
    getFormValues(){
      console.log(this.loginForm.value);
      
    
  }

}
