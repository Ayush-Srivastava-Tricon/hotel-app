import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  dates: any;
  roomData: any;
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
  loader: Boolean = false;
  dragEl: any = {};
  activeModalRoomName: string = '';
  tdData: any = {};
  dragEventStart: boolean = false;

  selectedStartDate: any;
  selectedEndDate: any;
  timeoutId: any = null;





  constructor(private _service: CalendarService, private fb: FormBuilder, private alertService: AlertService,private router:Router) {
    console.log(this.router.url);
    
    this.modalFieldForm = this.fb.group({
      "pr": ['', [Validators.required, Validators.pattern(/^\d+\.\d{2}$/)]],
      "ss": ['', Validators.required],
      "mn": ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]*$")]],
      "mx": ['', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
      "cta": ['', Validators.required],
      "ctd": ['', Validators.required],
      "cu": ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      "al": ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      "start": ['', Validators.required,],
      "end": ['', Validators.required,],
      "resource": [''],
    })
  }

  ngOnInit(): void {
    this.getHotelRooms();
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
    while (begindateInx < 31 - dateIndex) {

      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const daysInNextMonth: number = new Date(nextYear, nextMonth + 1, 0).getDate();

      const currentDayIndex = (firstDayOfMonth + begindateInx) % 7;
      const dayName = weekDays[currentDayIndex];
      let date = begindateInx - daysInMonth + 1; // Start from 1st day of the current month if necessary
      let monthToShow = monthNames[currentMonth];
      let yearToShow = currentYear;

      if (date <= 0) {
        date += daysInMonth;
        monthToShow = monthNames[currentMonth];
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
      // this.selectDate = '';
    }, 0);
  }

  extractEventData(allData: string): any {
    const eventData: any = {};
    const keyValuePairs = allData.split("<br>");
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split(":");
      eventData[key.replace(/"/g, "").trim()] = value.replace(/"/g, "").trim();
    });
    console.log(eventData);
    
    return eventData;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.datesData = [];
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.datesData = [];
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  getHotelRooms() {
    this._service.getHotelRooms((res: any) => {
      if (res.status == 200) {
        this.hotelRooms = res;
        this.getHotelPrice();
      }else{
        
        this.hotelRooms = res;
      }
    })
  }

  openModal(data: any, roomName: any, endDate?: any) {
    this.dragEventStart ? '' : this.selectedEndDate = endDate;
    this.dragEl = {};
    this.dragEventStart = false;
    let eventData: any = data || {};

    if (eventData) {
      this.modalFieldForm.patchValue({
        "pr": eventData.all_data?.pr,
        "ss": eventData.all_data?.ss,
        "mn": eventData.all_data?.mn,
        "mx": eventData.all_data?.mx,
        "cta": eventData.all_data?.cta,
        "ctd": eventData.all_data?.ctd,
        "cu": eventData.all_data?.cu,
        "al": eventData.all_data?.al,
        "start": this.selectedStartDate ? this.selectedStartDate : eventData.start,
        "end": this.selectedEndDate ? this.selectedEndDate : eventData.end,
        "resource": eventData.resource,
      });
      this.activeModalRoomName = roomName;
    } else {
      this.modalFieldForm.reset();
    }
    this.showModal = true;

  }

  updateValue() {
    if (this.modalFieldForm.status == 'VALID') {
      let params: any = {
        data: this.modalFieldForm.value
      };
      this._service.updatePriceAlot(params, (res: any) => {
        if (res) {
          this.showModal = false;
          this.alertService.alert("success", "Data Saved Successfully", "Success", { displayDuration: 2000, pos: 'top' });
          this.modalFieldForm.reset();
          // this.getHotelPrice();
        }
      })
    } else {
      this.errorMsg = "Please Fill the fields";
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }


  }

  getHotelPrice() {
    this.loader = true;
    this._service.getHotelPrice((res: any) => {
      if (res) {
        this.hotelPrice = res;
        this.hotelPrice.forEach((e: any) => {
          e.all_data = this.extractEventData(e.all_data);
        });
        this.loader = false;
        this.combineRoomsAndHotelPriceData();
      }

    });
  }

  combineRoomsAndHotelPriceData() {
    let data: any = [];
    this.loader = true;
    this.mainData = this.hotelRooms.map((e: any, idx: any) => {
      this.hotelPrice.forEach((ele: any) => {
        if(e.id == ele.resource){    //id == resource 
        data.push(ele);
        e['data'] = data;
        }
      })
      return e;
    });
    setTimeout(() => {
      this.loader = false;
      this.renderCalendar();
    }, 0);


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
      e?.data?.forEach((item: any) => {
        this.datesData.forEach((dayData: any, idx: any) => {
          if (new Date(item.start).setHours(0, 0, 0, 0) == new Date(dayData.formateDate).setHours(0, 0, 0, 0)) {
            dayData['newData'] = item;
          }
        });
      });
    });
    console.log(this.mainData);
    
  }

  closeModal() {
    this.showModal = false;
    this.showAdvanceSection = false;
    this.selectedStartDate = '';
    this.selectedEndDate = '';
  }

  selectCalendarDateRange(startingDate: any, dIdx: number, calIdx: number) {
    if(new Date(startingDate).setHours(0,0,0,0) >= new Date(this.selectedStartDate).setHours(0,0,0,0) ){        
      this.dragEl[`head${dIdx}${calIdx}`] = !this.dragEl[`head${dIdx}${calIdx}`];
    }    
  }


  handleClickEvent(startDate: any, dayData: any, roomName: any) {
    if (this.timeoutId !== null) {            //this part will run if double clicked within 200ms
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.openModal(dayData, roomName, startDate);
    } else {                                      //this part will run if single clicked 
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null;
        if(!this.selectedStartDate) {
          this.selectedStartDate =  startDate;
        }
        this.dragEventStart = !this.dragEventStart ;
        
        if(!this.dragEventStart) {

          this.openModal(dayData, roomName, startDate);
        }
       
      }, 200);
    }
  }
}
