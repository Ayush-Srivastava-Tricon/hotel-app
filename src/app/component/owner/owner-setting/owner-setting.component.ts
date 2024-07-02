import { Component } from '@angular/core';
import { FormControl,FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-owner-setting',
  templateUrl: './owner-setting.component.html',
  styleUrls: ['./owner-setting.component.scss']
})
export class OwnerSettingComponent {
  loginForm:any

  constructor(private _formBuilder:FormBuilder){

    this.loginForm = this._formBuilder.group({
      name:'',
      address:'',
      contact:'',
      cityTax:''
    })
  }
    getFormValues(){
      console.log(this.loginForm.value);
      
    
  }
}
