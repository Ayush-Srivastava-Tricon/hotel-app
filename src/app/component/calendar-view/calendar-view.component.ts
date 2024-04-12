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
  selectDate: any = new Date();
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
      "pr": ['', [Validators.pattern("^[0-9]*$")]],
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

  fetchCalendarData(nextButtonDate?: any) {
    this.mainData = [];
    let startEndDate: any = this.getStartAndEndDate(nextButtonDate);
    this.loader = true;
    this._service.getAllCalendarData(this.loggedProperty.propertyId, startEndDate, (res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.mainData = res.responseData;
        this.alertService.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
        setTimeout(() => {
          this.renderCalendar();
        }, 0);
      } else if (res.status == 404) {
        this.alertService.alert("error", res.error.message, "error", { displayDuration: 2000, pos: 'top' });
        setTimeout(() => {
          this.renderCalendar();
        }, 0);
      }
    })
  }

  getStartAndEndDate(nextButtonDate: any) {
    let now: any;
    if (nextButtonDate) {
      now = new Date(nextButtonDate).setDate(1);
      now = new Date(now);
    } else {
      now = new Date();
    }
    let current;
    if (now.getMonth() == 11) {
      current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    return `start_date=${this.formatDate(now)}&end_date=${this.formatDate(current)}`;
  }

  selectedDate(event: any) {
    this.selectDate = new Date(event.target.value);
    this.datesData = [];
    this.renderCalendar(this.selectDate);
  }

  renderCalendar(selectedDate?: Date): void {
    const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // this.currentDate = selectedDate || new Date(); 
    const currentMonth: number = this.currentDate.getMonth();
    const currentYear: number = this.currentDate.getFullYear();
    const todayDate: number = new Date().getDate();
    const todayMonth: number = new Date().getMonth();
    const todayYear: number = new Date().getFullYear();

    const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay();
    this.currentMonth = `${monthNames[currentMonth]} ${currentYear}`;
    this.weekdaysWithDates = [];
    this.datesData = [];

    let dateIndex = 0;

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    this.nextDisplayMonth = `${monthNames[nextMonth]} ${nextYear}`;

    const startDayOfMonth = selectedDate ? selectedDate.getDate() : 1;
    for (let i = startDayOfMonth; i <= daysInMonth && dateIndex < 31; i++) {
      const currentDayIndex = (firstDayOfMonth + (i - 1)) % 7;
      const dayName = weekDays[currentDayIndex];
      const date = i;
      const isPassed = (currentYear === todayYear && currentMonth === todayMonth) ?
        (date < todayDate) :
        (currentYear < todayYear || currentMonth < todayMonth);

      this.weekdaysWithDates.push({
        weekday: dayName,
        date: date,
        isPassed: isPassed,
        formateDate: this.formatDate(`${date}${monthNames[currentMonth]} ${currentYear}`),
        isSelectedDate: selectedDate && selectedDate.getDate() === date
      });
      this.datesData.push({ date: date, formateDate: this.formatDate(`${date}${monthNames[currentMonth]} ${currentYear}`), isDatePassed: isPassed });
      dateIndex++;
    }
    let begindateInx = 0;
    while (begindateInx < (31 - dateIndex)) {

      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

      const currentDayIndex = (firstDayOfMonth + begindateInx) % 7;
      const dayName = weekDays[currentDayIndex];
      let date = begindateInx - daysInMonth + 1; // Start from 1st day of the current month if necessary
      let monthToShow = monthNames[currentMonth];


      let yearToShow = currentYear;

      if (date <= 0) {
        date += daysInMonth;
        monthToShow = monthNames[currentMonth + 1];
        yearToShow = currentYear;
      } else {
        monthToShow = monthNames[nextMonth];
        yearToShow = nextYear;
      }

      const isPassed = (nextYear === this.currentDate.getFullYear() && nextMonth === this.currentDate.getMonth()) ?
        (date < todayDate) :
        (nextYear < this.currentDate.getFullYear() || nextMonth < this.currentDate.getMonth());

      this.weekdaysWithDates.push({
        weekday: dayName,
        date: date,
        isPassed: isPassed,
        formateDate: this.formatDate(`${date}${monthToShow} ${yearToShow}`)
      });

      this.datesData.push({ date: date, formateDate: this.formatDate(`${date}${monthToShow} ${yearToShow}`), isDatePassed: isPassed });
      begindateInx++;
    }
    setTimeout(() => {
      this.makeCalendarData();
    }, 0);
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
    this.datesData = [];
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.fetchCalendarData();

    let selectedRangeDate: any = document.getElementById("date");
    selectedRangeDate.value = '';
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.datesData = [];
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
      this._service.updateCalendar(params, (res: any) => {
        if (res) {
          this.showModal = false;
          this.alertService.alert("success", "Data Saved Successfully", "Success", { displayDuration: 2000, pos: 'top' });
          this.modalFieldForm.reset();
        }
      })
    } else {
      this.errorMsg = "Please Fill the fields";
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
  }

  changeCalendarByProperty(event:any){
    localStorage.setItem("selectedPropertyId",JSON.parse(event.target.value));  
    this.loggedProperty.propertyId = event.target.value;
    this.fetchCalendarData();
  }
}



