import { Component } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-rate-plan',
  templateUrl: './rate-plan.component.html',
  styleUrls: ['./rate-plan.component.scss']
})
export class RatePlanComponent {

  ratepPlanModal: any = {
    ratePlanData:[
      {
        treatment: null,
        price_type: 'percentage',
        "payment_policy": null,
        "cancellation_policy": null,
        language: {
          en: { package_name: '', title: '', description: '' }
        },
        property_id:0
      }
    ],
    roomsForRatePlan:[]

  };
  parentRoomData: any = [];
  currentPropertyId: any = 0;
  languageData: any = {
    en: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'English', placeholder: 'Enter English Text' },
    it: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'Italian', placeholder: 'Inserisci il testo italiano' },
    fr: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'French', placeholder: 'Entrez le texte français' },
    es: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'Spanish', placeholder: 'Ingrese texto en español' },
    de: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'German', placeholder: 'Geben Sie deutschen Text ein' },
    ru: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'Russian', placeholder: 'Введите текст на русском' },
    pt: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'Portuguese', placeholder: 'Insira o texto em português' },
    nl: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'Dutch', placeholder: 'Voer Nederlandse tekst in' },
    jp: { src: 'http://via.placeholder.com/50x50?text=Product1', name: 'Japanese', placeholder: '日本語のテキストを入力してください' },
  };
  languages: any = ['en', 'it', 'fr', 'es', 'de', 'ru', 'pt', 'nl', 'jp'];
  selectedLanguage = 'en';
  selectedLanguageData: any = {};
  translateX = 0;
  sliderIndex = 0;
  loader:boolean=false;
  showModal:any={};
  rateplanData:any=[];
  showActionDropDown:any={};
  isEditModal:boolean=false;
  currentRatePlanId:any=0;
  mapRatePlanWithRoomsConfig:any={
    "rate_plan_id":0,
    "roomsForRatePlan":[]
  }

  constructor(private _service: PropertyService,private alert:AlertService) { }

  ngOnInit() {
    if (localStorage.getItem("selectedPropertyId")) {
      this.currentPropertyId = localStorage.getItem("selectedPropertyId");
    } else {
      this.currentPropertyId = localStorage.getItem("userId");
    }
    this.fetchRateplan();
    this.selectedLanguageData = this.languageData[this.selectedLanguage];
  }

  fetchRateplan(){
    this.loader=true;
    this.ratepPlanModal.ratePlanData[0]['property_id'] = this.currentPropertyId;
    this._service.fetchRateplan(this.currentPropertyId,(res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.loader=false;
        this.rateplanData = res.data;
        }else{
          this.rateplanData=[];
        }
      })
  }

  fetchParentRoom() {
    this._service.fetchAllRooms(this.currentPropertyId, (res: any) => {
      if (res.status == 200) {
        this.parentRoomData = res.data.filter((e: any) => e.parent_room_id || e.parent_room_id == 0).map((e: any) => { return { 'value': e.room_name, 'checked': false, 'room_id': e.room_id } });
      }
    })
  }


  selectLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.selectedLanguageData = this.languageData[lang];
    let newLangModel: any = {
      package_name: '',
      title: '',
      description: ''
    }
    this.ratepPlanModal.ratePlanData[0].language[lang] = newLangModel;
  }

  prev(): void {
    this.sliderIndex = (this.sliderIndex - 1 + this.languages.length) % this.languages.length;
    this.translateX = -this.sliderIndex * 100;
  }

  next(): void {
    this.sliderIndex = (this.sliderIndex + 1) % this.languages.length;
    this.translateX = -this.sliderIndex * 100;
  }

  receiveChildEvent(event:any){
    if(event.action === 'selectedParentRoom'){
        this.ratepPlanModal.roomsForRatePlan  = event.value;
        this.mapRatePlanWithRoomsConfig.roomsForRatePlan = event.value;
    }
  }

  save() {
    this.loader=true;
    if(this.ratepPlanModal.ratePlanData[0].name && this.ratepPlanModal.ratePlanData[0].treatment){
      this.ratepPlanModal.ratePlanData[0]['property_id'] = this.currentPropertyId;
      this._service.saveRatePlan(this.ratepPlanModal,(res:any)=>{
        if(res.status == 200){
          console.log(res);
          this.loader=false;
          this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' })
        }
      })
    }else{
      this.alert.alert("error","Check Mandatory Fields","Error",{ displayDuration: 2000, pos: 'top' })
      this.loader=false;
    }
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  resetModal(){
    this.ratepPlanModal  = JSON.parse(JSON.stringify(
      {
        ratePlanData:[
          {
            treatment: null,
            price_type: 'percentage',
            "payment_policy": null,
            "cancellation_policy": null,
            language: {
              en: { package_name: '', title: '', description: '' }
            }
          }
        ],
        roomsForRatePlan:[]
      }
    ));
  }

  openModal(){
    this.showModal.rateplan = true;
    this.resetModal();
    this.isEditModal = false;
    this.fetchParentRoom();
  }

  editOpenRateplan(item:any){
    this._service.getSingleRateplan(item.id,(res:any)=>{
      if(res.status == 200){
        this.isEditModal = true;
        this.showModal.rateplan = true;
        this.currentRatePlanId = item.id;
        this.ratepPlanModal.ratePlanData = res.data;
      }
    })
  }

  editRatePlan(){
    this.loader=true;
    delete this.ratepPlanModal.ratePlanData[0].add_time;
    delete this.ratepPlanModal.ratePlanData[0].cancellation_policy;
    delete this.ratepPlanModal.ratePlanData[0].status;
    delete this.ratepPlanModal.ratePlanData[0].update_time;
    this.ratepPlanModal.ratePlanData[0]['rate_plan_id'] = this.ratepPlanModal.ratePlanData[0].id;
    delete this.ratepPlanModal.ratePlanData[0].id;
    delete this.ratepPlanModal.roomsForRatePlan;
    
    this._service.updateRateplan(this.ratepPlanModal,(res:any)=>{
      if(res.status == 200){
      this.loader=false;
      this.isEditModal = false;
      this.showModal.rateplan=false;
      this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' })
      this.closeModal();
      this.fetchRateplan();
    }else{
      this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' })
      this.loader=false;
    }
   })
    console.log(this.ratepPlanModal);
    
  }

  deleteRateplanModal(rateplan_id:any,idx:any){
    this.showModal.delete=true;
    this.currentRatePlanId = rateplan_id;
    
  }

  backToRateplan(){
    this.showModal.rateplan=false;
    this.showActionDropDown={};
    this.resetModal();
  }

  closeModal(){
    this.showModal.delete=false;
    this.showModal.map = false;
    this.showActionDropDown={};
    this.resetModal();
  }

  deletePMS(){
   this._service.deleteRatePlans(this.currentRatePlanId,(res:any)=>{
    if(res.status == 200){
      console.log(res);
      this.closeModal();
      this.alert.alert("error",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
    }else{
      this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
    }
   })
  }

  mapOpenModal(rateplan_id:any,idx:any){
    this.fetchParentRoom();
    this.mapRatePlanWithRoomsConfig.rate_plan_id = rateplan_id;
    this.showModal.map= true;
  }
  
  mapRatePlan(){
    this.loader=true;
    this._service.mapRatePlan(this.mapRatePlanWithRoomsConfig,(res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.loader=false;
        this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
        this.closeModal();
      }else{
        this.loader=false;
        this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
      }
    })
  }
}
