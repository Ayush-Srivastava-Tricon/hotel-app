import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';
import { AlertService } from 'src/app/shared/alert.service';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent {
  currentDate: Date = new Date();
  currentMonth: any = '';
  currentYear: number = 0;
  weekdaysWithDates: any = [];
  randomTexts: string[] = ['Units to Sell', 'Lenght of Stay', 'Restriction', 'Price'];
  datesData: any = [];
  showModal: boolean = false;
  mainData: any = [];
  hotelPrice: any = [];
  hotelRooms: any = [];
  todayDate: any = new Date();
  // showModalConfig: any = {
  //   "all_data": {
  //     "pr": "",
  //     "ss": "",
  //     "mn": "",
  //     "mx": "",
  //     "cta": "",
  //     "ctd": "",
  //     "cu": "",
  //     "al": "",
  //   }
  // };
  showAdvanceSection: boolean = false;
  selectDate: any = '';
  errorMsg: any = '';
  nextDisplayMonth: any;
  modalFieldForm: any;
  loader: boolean = false;
  dragEl: any = {};
  activeModalRoomName: string = '';
  dragEventStart: boolean = false;
  selectedStartDate: any;
  selectedEndDate: any;
  timeoutId: any = null;
  allPropertyList:any=[];
  loggedProperty: any = { 'isLoginProperty': false, 'propertyId': 0 };
  isAdmin:boolean=false;
  isOwner:boolean=false;

  constructor(private _service: CalendarService, private fb: FormBuilder, private alertService: AlertService, private router: Router) {
    this.modalFieldForm = this.fb.group({
      "pr": ['', [Validators.pattern(/^\d*\.?\d*$/)]],
      "ss": ['',],
      "mn": ['', [Validators.maxLength(2), Validators.pattern("^[0-9]*$")]],
      "mx": ['', [Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
      "cta": ['',],
      "ctd": ['',],
      "cu": ['', [Validators.pattern("^[0-9]*$")]],
      "al": ['', [Validators.pattern("^[0-9]*$")]],
      "start": ['',],
      "end": ['',],
      "resource": [''],
    });
  }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(<any>localStorage.getItem("isadmin"));
    this.isOwner = JSON.parse(<any>localStorage.getItem("isowner"));
    if (localStorage.getItem("selectedPropertyId")) {
      this.loggedProperty.isLoginProperty = true;
      this.loggedProperty.propertyId = localStorage.getItem("selectedPropertyId");
      this.setDataToAllPropertyDropdown();
      this.fetchCalendarData();
    } else {
      this.loggedProperty.propertyId = localStorage.getItem("userId");
      this.fetchCalendarData();
    }
  }

  setDataToAllPropertyDropdown(){
    this.allPropertyList = JSON.parse(<any>localStorage.getItem("propertyList"));
  }

  fetchCalendarData(nextButtonDate?: any,isFromDateRange?:boolean) {
    this.mainData = [];
    let startEndDate: any = this.getStartAndEndDate(nextButtonDate,isFromDateRange);
    this.loader = true;
    this._service.getAllCalendarData(this.loggedProperty.propertyId, startEndDate, (res: any) => {
      if (res.status == 200 && res.responseData.length>0) {
        console.log(res);
        this.mainData = res.responseData;
        this.alertService.alert(res.responseData.length> 0 ? "success" : 'error', res.message, "Success", { displayDuration: 2000, pos: 'top' });
        setTimeout(() => {
          this.renderCalendar(this.selectDate);
        }, 0);
      } else if (res.status == 404) {
        this.alertService.alert("error", res.error.message, "error", { displayDuration: 2000, pos: 'top' });
        setTimeout(() => {
          this.renderCalendar(this.selectDate);
        }, 0);
      } else{
        this.mainData = [];
        this.loader=false;
      }
    })
  }

  getStartAndEndDate(nextButtonDate: any,isFromDateRange?:boolean) {
    let now: any;
    if (isFromDateRange) {
      now = new Date(nextButtonDate);
    }
    else if (nextButtonDate) {
      now = new Date(nextButtonDate).setDate(1);
      now = new Date(now);
    } else {
      now = new Date();
    }
    let current;
    if (now.getMonth() == 11) {
      current = new Date(now.getFullYear() + 1, 0, now.getDate());
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }

    return `start_date=${this.formatDate(now)}&end_date=${this.formatDate(current)}`;
  }

  selectedDate(event: any) {
    this.selectDate = new Date(event.target.value);
    this.datesData = [];

    this.fetchCalendarData(this.selectDate,true);
  }


  renderCalendar(selectedDate?: Date): void {
    const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.currentDate = selectedDate ? new Date(selectedDate) : this.currentDate;
    const currentMonth: number = this.currentDate.getMonth();
    const currentYear: number = this.currentDate.getFullYear();
    const todayDate: number = new Date().getDate();
    const todayMonth: number = new Date().getMonth();
    const todayYear: number = new Date().getFullYear();

    const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay();

    this.currentMonth = `${monthNames[currentMonth]} ${currentYear}`;
    this.weekdaysWithDates = [];
    this.datesData = [];

    let dateIndex = 0;
    let dayCounter = selectedDate ? selectedDate.getDate() - 1 : 0;
    let currentDayIndex = (firstDayOfMonth + dayCounter) % 7;

    for (let i = selectedDate ? selectedDate.getDate() : 1; i <= daysInMonth && dateIndex < 31; i++) {
        const dayName = weekDays[currentDayIndex % 7];
        const date = i;
        const isPassed = this.isDatePassed(this.formatDate(`${date} ${monthNames[currentMonth]} ${currentYear}`));

        this.weekdaysWithDates.push({
            weekday: dayName,
            date: date,
            isPassed: isPassed,
            formateDate: this.formatDate(`${date} ${monthNames[currentMonth]} ${currentYear}`),
            isSelectedDate: selectedDate && selectedDate.getDate() === date
        });
        this.datesData.push({ date: date, formateDate: this.formatDate(`${date} ${monthNames[currentMonth]} ${currentYear}`), isDatePassed: isPassed });
        dateIndex++;
        currentDayIndex++;
    }

    let monthCounter = 1;
    while (dateIndex < 31) {
        const nextMonth = (currentMonth + monthCounter) % 12;
        const nextYear = currentMonth + monthCounter > 11 ? currentYear + 1 : currentYear;
        const nextMonthDays = new Date(nextYear, nextMonth + 1, 0).getDate();

        for (let i = 1; i <= nextMonthDays && dateIndex < 31; i++) {
            const dayName = weekDays[currentDayIndex % 7];
            const isPassed = (nextYear === todayYear && nextMonth === todayMonth) ?
                (i < todayDate) :
                (nextYear < todayYear || (nextYear === todayYear && nextMonth < todayMonth));

            this.weekdaysWithDates.push({
                weekday: dayName,
                date: i,
                isPassed: isPassed,
                formateDate: this.formatDate(`${i} ${monthNames[nextMonth]} ${nextYear}`)
            });
            this.datesData.push({ date: i, formateDate: this.formatDate(`${i} ${monthNames[nextMonth]} ${nextYear}`), isDatePassed: isPassed });
            dateIndex++;
            currentDayIndex++;
        }
        monthCounter++;
    }
    setTimeout(() => {
          this.makeCalendarData();
        }, 0);
}

  isDatePassed(date:any){
    const inputDate = new Date(date);
    const currentDate = this.todayDate;
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    if (inputYear < currentYear) {
        return true; 
    } else if (inputYear === currentYear && inputMonth < currentMonth) {
        return true; 
    } else if (inputYear === currentYear && inputMonth === currentMonth && inputDay < currentDay) {
        return true; 
    }

    return false;
  }

  extractEventData(allData: string): any {
    const eventData: any = {};
    const keyValuePairs = allData.split("<br>");
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split(":");
      eventData[key.replace(/"/g, "").trim()] = value.replace(/"/g, "").trim();
    });

    return eventData;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.selectDate ='';
    this.datesData = [];
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.fetchCalendarData(this.formatDate(this.currentDate));
    let selectedRangeDate: any = document.getElementById("date");
    selectedRangeDate.value = '';
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.datesData = [];
    this.selectDate ='';
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.fetchCalendarData(this.formatDate(this.currentDate));
    let selectedRangeDate: any = document.getElementById("date");
    selectedRangeDate.value = '';
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  makeCalendarData() {
    this.mainData.forEach((e: any) => {
      e.data.forEach((item: any) => {
        for (let i = 0; i < this.datesData.length; i++) {
          if (new Date(item.date).setHours(0, 0, 0, 0) == new Date(this.datesData[i].formateDate).setHours(0, 0, 0, 0)) {
            this.datesData[i]['newData'] = item;
            this.datesData[i].newData['resource'] = e.room_id;
            this.datesData[i].newData['start'] = item.date;
            break;
          }
        }
      })
      e['datesData'] = JSON.parse(JSON.stringify(this.datesData));
    });
    this.loader = false;
  }

  closeModal() {
    this.showModal = false;
    this.showAdvanceSection = false;
    this.selectedStartDate = '';
    this.selectedEndDate = '';
    this.dragEl = {};
  }

  resetDefault(){
    this.dragEl = {};
    this.showModal = false;
    this.selectDate=''
    this.datesData=[];
    let selectedRangeDate: any = document.getElementById("date");
    selectedRangeDate.value = '';
  }

  selectCalendarDateRange(startingDate: any, dIdx: number, calIdx: number) {
    this.dragEl[`head${dIdx}${calIdx}`] = !this.dragEl[`head${dIdx}${calIdx}`];
  }

  handleClickEvent(startDate: any, dayData: any, roomName: any, roomId: any) {
    if (this.timeoutId !== null) {            //this part will run if double clicked within 200ms
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.openModal(dayData, roomName, startDate, roomId);
    } else {                                      //this part will run if single clicked 
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null;

        if (!this.selectedStartDate) {
          this.selectedStartDate = startDate;
        }
        this.dragEventStart = !this.dragEventStart;
        if (!this.dragEventStart) {
          if (new Date(this.selectedStartDate).setHours(0, 0, 0, 0) >= new Date(startDate).setHours(0, 0, 0, 0)) {
            let tempDate: any = this.selectedStartDate;
            this.selectedStartDate = startDate;
            startDate = tempDate;
            this.openModal({}, roomName, startDate, roomId);
          }
          this.openModal({}, roomName, startDate, roomId);
        }

      }, 200);
    }
  }

  openModal(data: any, roomName: any, endDate?: any, roomId?: any) {
    this.dragEventStart ? '' : this.selectedEndDate = endDate;
    this.dragEl = {};
    this.dragEventStart = false;
    let eventData: any = data || {};
    console.log(eventData);

    if (eventData) {
      this.modalFieldForm.patchValue({
        "pr": eventData?.pr,
        "ss": eventData?.ss,
        "mn": eventData?.mn,
        "mx": eventData?.mx,
        "cta": eventData?.cta,
        "ctd": eventData?.ctd,
        "cu": eventData?.cu,
        "al": eventData?.al,
        "start": this.selectedStartDate ? this.selectedStartDate : eventData.start,
        "end": this.selectedEndDate ? this.selectedEndDate : eventData.end,
        "resource": roomId,
      });
      this.activeModalRoomName = roomName;
    } else {
      this.modalFieldForm.reset();
    }
    this.showModal = true;
  }

  updateValue() {
    if (this.modalFieldForm.status == 'VALID') {
      const selectedRoomId: any = this.modalFieldForm.value.resource;
      delete this.modalFieldForm.value.resource;
      const params: any = {
        'room_id': selectedRoomId,
        "data": [this.modalFieldForm.value]
      }
      this.loader= true;
      this._service.updateCalendar(params, (res: any) => {
        if (res) {
          this.loader = false;
          this.resetDefault();
          this.currentDate=new Date();          
          this.fetchCalendarData();
          this.alertService.alert("success", "Data Saved Successfully", "Success", { displayDuration: 2000, pos: 'top' });
          this.modalFieldForm.reset();
        }
      })
    } else {
      this.loader= false;
      this.errorMsg = "Please Fill the fields";
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
  }

  changeCalendarByProperty(event:any){
    localStorage.setItem("selectedPropertyId",JSON.parse(event.target.value));  
    this.loggedProperty.propertyId = event.target.value;
    this.datesData = [];
    this.selectDate ='';
    this.currentDate = new Date();
    this.fetchCalendarData(this.currentDate);
  }

  identify(index:any, item:any){
    return item.id;
  }
}



