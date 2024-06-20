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
  multiselectPageConfig:any={reservation_status:[],parentRooms:[],pmsData:[]};
  showSelectedData:any={};
  filteredOptions:any={};
  searchText:any='';
  togggleDropdown:boolean=false;

constructor(){}

ngOnInit(){
  this.setSelectedValue();
}


  getSelectedValue(status: Boolean, value: any, type: String,filterProperty?:any) {
     if (type === 'reservation_status'){
      if (status) {
        let isExist = this.multiselectPageConfig.reservation_status.some((ele:any)=>ele.value.toUpperCase() == value.value.toUpperCase() && ele.checked == value.checked);
        if(!isExist){
          this.multiselectPageConfig.reservation_status.push(value);
          this.emitToParent.emit({action:'selectedReservationStatus',value:this.multiselectPageConfig.reservation_status.map((e:any)=>{return e.value})});
        }
      } else {
        this.multiselectPageConfig.reservation_status.forEach((e: any, idx: any) => {
          if (e.value == value.value) {
            this.multiselectPageConfig.reservation_status.splice(idx, 1);
            this.emitToParent.emit({action:'selectedReservationStatus',value:this.multiselectPageConfig.reservation_status.map((e:any)=>{return e.value})});
          }
        });
        
      }
    }
     if (type === 'parentRooms'){
      if (status) {
        let isExist = this.multiselectPageConfig.parentRooms.some((ele:any)=>ele.value.toUpperCase() == value.value.toUpperCase() && ele.checked == value.checked);
        if(!isExist){
          this.multiselectPageConfig.parentRooms.push(value);
          this.emitToParent.emit({action:'selectedParentRoom',value:this.multiselectPageConfig.parentRooms.map((e:any)=>{return e.room_id})});
        }
      } else {
        this.multiselectPageConfig.parentRooms.forEach((e: any, idx: any) => {
          if (e.value == value.value) {
            this.multiselectPageConfig.parentRooms.splice(idx, 1);
            this.emitToParent.emit({action:'selectedParentRoom',value:this.multiselectPageConfig.parentRooms.map((e:any)=>{return e.room_id})});
          }
        });
        
      }
    }
     if (type === 'pmsData'){
      if (status) {
        let isExist = this.multiselectPageConfig.pmsData.some((ele:any)=>ele.value.toUpperCase() == value.value.toUpperCase() && ele.checked == value.checked);
        if(!isExist){
          this.multiselectPageConfig.pmsData.push(value);
          this.emitToParent.emit({action:'getPMSRoom',value:this.multiselectPageConfig.pmsData.map((e:any)=>{return e.id})});
        }
      } else {
        this.multiselectPageConfig.pmsData.forEach((e: any, idx: any) => {
          if (e.value == value.value) {
            this.multiselectPageConfig.pmsData.splice(idx, 1);
            this.emitToParent.emit({action:'getPMSRoom',value:this.multiselectPageConfig.pmsData.map((e:any)=>{return e.id})});
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
  this.multiselectPageConfig.reservation_status=[];
}

clearAll(value:string,actions:string){
  this.multiselectPageConfig[value].forEach((e:any)=>e.checked=false);
  this.inputConfig[value].forEach((e:any)=>e.checked=false);
  this.multiselectPageConfig[value]= [];
  this.filteredOptions[value].forEach((e:any)=>e.checked=false);
  if(actions === 'getparentRooms'){
    this.emitToParent.emit({action:'selectedParentRoom',value:[]});
  }
}

filterOptions(filterProperty: any, sortBy?: any) {
  const allOptions = this.inputConfig[filterProperty];
  const searchTextLower = this.searchText.toLowerCase();

  const matchingOptions = allOptions.filter((option: any) => {
    const optionValue = sortBy ? option[sortBy] : option['name'];
    return optionValue.toLowerCase().includes(searchTextLower);
  });

  if (matchingOptions.length === 0) {
    this.filteredOptions[filterProperty] = [];
  } else {
    this.filteredOptions[filterProperty] = allOptions.filter((option: any) => {
      const optionValue = sortBy ? option[sortBy] : option['name'];
      return optionValue.toLowerCase().includes(searchTextLower);
    });
  }
}

toggleDropdown(prop:any){
    this.filteredOptions[prop]= this.inputConfig[prop];
    this.togggleDropdown = true;
    
}


setSelectedValue(){
  if(this.inputConfig.houseKeepePage && this.inputConfig.pmsData?.length>0){
         this.inputConfig.pmsData?.forEach((e:any)=>{
          if(e.checked){
            this.multiselectPageConfig.pmsData.push(e);
          }
         })

  }
}




}


