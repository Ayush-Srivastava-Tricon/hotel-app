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
    language: 'en',
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
  filteredTemplateData:any=[];
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  selectedTemplateId: any = 0;

  languages = [
    {
      'lang': 'English',
      'key':'en',
      isSelected: true,
    },
    {
      'lang': 'Spanish',
      'key':'es',
      isSelected: false,
    },
    {
      'lang': 'French',
      'key':'fr',
      isSelected: false,
    },
  ];

  currentType:any='Language';

  selectedLanguageItems: any = []; // Default to English tab
  objectsArray: any[] = [];
  newObject: any = { templateType: '', message: '', subject: '' };

  constructor(public constants: AppConstants, private _service: OwnerService, private alert: AlertService) {

  }


  ngOnInit() {
    this.currentOwnerId = localStorage.getItem("userId");
    this.userType = localStorage.getItem("roleId");
    this.fetchEmailTempalte();
    this.emailTemplateConfig.role_id = this.userType;
    this.emailTemplateConfig.user_id = this.currentOwnerId;
    this.changeTypedPlaceholder();
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
        this.filteredTemplateData = [...res.data];
        this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' })
      } else {
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' })
      }
    })
  }

  openModal() {
    this.showModal.template = true;
    this.selectedLanguageItems.push(this.emailTemplateConfig);
    this.removeBrandingFromTinyMce();
  }

  addMailTemplate() {
    this.loader = true;
    this._service.addMailTemplate(this.selectedLanguageItems, (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' })
        this.backToTemplate();
      } else {
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' })
      }
    })

    console.log(this.selectedLanguageItems);
    
  }

  removeBrandingFromTinyMce() {
    setTimeout(() => {
      let el: any = document.querySelectorAll(".tox-promotion");
      el.forEach((element:any)=>element.style.display = "none");
      let brand: any = document.querySelectorAll(".tox-statusbar__branding");
      brand.forEach((element:any)=>element.style.display = "none");
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
        this.selectedLanguageItems = res.data;
        this.showModal.template = true;
        this.isEditModal = true;
        this.removeBrandingFromTinyMce();
      } else {
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  editTemplate() {
    this.loader = true;
    this._service.updateTemplate(this.selectedLanguageItems[0], (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
        this.backToTemplate();
      } else {
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' });
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
    this.selectedLanguageItems=[];
    this.languages.forEach((e:any)=>e.key !== 'en' ? e.isSelected=false : '')
    this.fetchEmailTempalte();
  }

  closeModal() {
    this.showModal.delete = false;
  }


  selectDay(day: any) {
    if(this.selectedLanguageItems.length == 1 && day.isSelected){
      return;
    }
    let isExist: any = this.selectedLanguageItems.some((item: any) => item.language == day.key);
    if (!isExist) {
      day.isSelected = true;
      this.selectedLanguageItems.push({
        language: day.key,
        template_type: '',
        subject: '',
        message_format: '',
        role_id: this.userType,
        user_id: this.currentOwnerId
      })
    } else {
      this.selectedLanguageItems.forEach((e: any, idx: any) => {
        if(e.language == day.key){
          day.isSelected = false;
          this.selectedLanguageItems.splice(idx, 1);
        }
      });
    }
    this.removeBrandingFromTinyMce();
  }

  changeTypedPlaceholder(){
    setInterval(()=>{
      this.currentType == 'Language' ? this.currentType = 'Subject' : this.currentType = 'Language';
    },1000)
  }


  searchFilter(event:any){
    let searchText = event.target.value;
    if (!searchText.trim()) {
      this.filteredTemplateData = this.emailTemplateData; // Show all items if search text is empty
    } else {
      const searchTextLower = searchText.trim().toLowerCase();
      this.filteredTemplateData = this.emailTemplateData.filter((item:any) =>
        item.language.toLowerCase().includes(searchTextLower) ||
        item.subject.toLowerCase().includes(searchTextLower)
      );
    }


  }

}
