import { Component } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constant';
import { OwnerService } from 'src/app/services/owner.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-e-mail-template',
  templateUrl: './e-mail-template.component.html',
  styleUrls: ['./e-mail-template.component.scss']
})
export class EMailTemplateComponent {

  emailTemplateConfig: any = {
    language: '',
    template_type: '',
    subject: '',
    message_format: '',
    role_id: 0,
    user_id: 0
  };
  editorConfig: any = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: 'lists link wordcount codesample',
    menubar: "format insert"
  };
  loader: boolean = false;
  currentOwnerId: any = 0;
  userType: any = '';
  showModal: any = {};
  emailTemplateData: any = [];
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  selectedTemplateId: any = 0;

  languages = ['English', 'French', 'Spanish'];
  selectedLanguageIndex: number = 0; // Default to English tab
  objectsArray: any[] = [];
  newObject: any = { templateType: '', message: '', subject: '' };

  constructor(public constants: AppConstants, private _service: OwnerService, private alert: AlertService) {

  }


  ngOnInit() {
    this.currentOwnerId = localStorage.getItem("userId");
    this.userType = localStorage.getItem("roleId");
    this.fetchEmailTempalte();
  }

  fetchEmailTempalte() {
    let param = {
      'role_id': this.userType,
      'user_id': this.currentOwnerId
    };
    this.loader = true;
    this._service.fetchEmailTempalte(param, (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.emailTemplateData = res.data;
        this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' })
      } else {
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' })
      }
    })
  }


  // ngAfterViewInit(){
  //   setTimeout(() => {
  //     this.removeBrandingFromTinyMce();
  //   }, 300);
  // }

  openModal() {
    this.showModal.template = true;
    this.removeBrandingFromTinyMce();
  }

  addMailTemplate() {
    this.loader = true;
    this.emailTemplateConfig.user_id = this.currentOwnerId;
    this.emailTemplateConfig.role_id = this.userType;
    this._service.addMailTemplate([this.emailTemplateConfig], (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' })
        this.backToTemplate();
      } else {
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' })
      }
    })

  }

  removeBrandingFromTinyMce() {
    setTimeout(() => {
      let el: any = document.getElementsByClassName("tox-promotion");
      el[0].style.display = "none";
      let brand: any = document.getElementsByClassName("tox-statusbar__branding");
      brand[0].style.display = "none";
    }, 200);
  }


  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  fetchEmailTempalteById(id: any) {
    this.loader = true;
    this._service.fetchEmailTempalteById(id, (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.emailTemplateConfig = res.data[0];
        this.showModal.template = true;
        this.isEditModal = true;
        this.removeBrandingFromTinyMce();
      }else{
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  editTemplate(){
    this.loader=true;
    this._service.updateTemplate(this.emailTemplateConfig,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        this.backToTemplate();
        this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
      } else {
        this.alert.alert("error", res.error ? res.error.message : res.message , "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  deleteTemplateModal(template_id: any, idx: any) {
    this.showModal.delete = true;
    this.selectedTemplateId = +template_id;
  }

  deleteTemplate() {
    this._service.deleteTemplate(this.selectedTemplateId, (res: any) => {
      if (res.status == 200) {
        this.showModal.delete = false;
        this.fetchEmailTempalte();
        this.closeModal();
        this.alert.alert("error", "Template Deleted", "Success", { displayDuration: 2000, pos: 'top' });
      } else {
        this.alert.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  backToTemplate() {
    this.showModal.template = false;
    this.isEditModal = false;
    this.showActionDropDown = {};
    this.fetchEmailTempalte();
  }

  closeModal() {
    this.showModal.delete = false;
  }


  toggleLanguageTab(index: number): void {
    if (this.selectedLanguageIndex === index) {
      this.selectedLanguageIndex = -1; // Deselect if already selected
    } else {
      this.selectedLanguageIndex = index; // Select the tab
    }
  }

  submitForm(language: string): void {
    if (this.newObject.templateType && this.newObject.message && this.newObject.subject) {
      const obj = { language, ...this.newObject };
      this.objectsArray.push(obj);
      this.clearForm();
    } else {
      alert('Please fill all fields.');
    }
  }

  clearForm(): void {
    this.newObject = { templateType: '', message: '', subject: '' };
  }

  selectDay(day: string) {
    // if (this.selectedDays.includes(day)) {
      // this.selectedDays = this.selectedDays.filter((d:any) => d !== day);
    // } else {
      // this.selectedDays.push(day);
    // }
  }

  isSelected(day: string): boolean {
    return true;
  }

}
