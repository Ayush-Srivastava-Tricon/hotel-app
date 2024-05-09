import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss']
})
export class MultiselectDropdownComponent {

  @Input() inputConfig:any;
  @Output() emitToParent:any = new EventEmitter();
  showDropDown:boolean=false;
  reservationPageConfig:any={reservation_status:[]};
  showSelectedData:any={};




  getSelectedValue(status: Boolean, value: any, type: String,filterProperty?:any) {
     if (type === 'reservation_status'){
      if (status) {
        let isExist = this.reservationPageConfig.reservation_status.some((ele:any)=>ele.value.toUpperCase() == value.value.toUpperCase() && ele.checked == value.checked);
        if(!isExist){
          this.reservationPageConfig.reservation_status.push(value);
          this.emitToParent.emit({action:'selectedReservationStatus',value:this.reservationPageConfig.reservation_status.map((e:any)=>{return e.value})});
        }
      } else {
        this.reservationPageConfig.reservation_status.forEach((e: any, idx: any) => {
          if (e.value == value.value) {
            this.reservationPageConfig.reservation_status.splice(idx, 1);
            this.emitToParent.emit({action:'selectedReservationStatus',value:this.reservationPageConfig.reservation_status.map((e:any)=>{return e.value})});
          }
        });
        
      }
    }
  
      this.showSelectedData[filterProperty] =true;
  }

  toggleSelectedItem(field:any){
    this.showSelectedData[field] = !this.showSelectedData[field];
}

clearSelectedValues(){
  this.reservationPageConfig.reservation_status=[];
}
}
