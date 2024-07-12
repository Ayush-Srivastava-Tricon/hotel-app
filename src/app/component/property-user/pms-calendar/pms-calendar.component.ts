import { Component, } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-pms-calendar',
  templateUrl: './pms-calendar.component.html',
  styleUrls: ['./pms-calendar.component.scss'],
})
export class PmsCalendarComponent {

  loader: boolean = false;
  mainData: any = [];
  datesData: any = [];
  selectDate: any;
  todayDate: any = new Date();
  currentMonth: any = '';
  currentDate: any = '';
  nextDisplayMonth: any;
  weekdaysWithDates: any = [];
  dragEl: any = {};
  pmsRoomList: any = [];
  timeoutId: any = null;
  dragEventStart: boolean = false;
  selectedStartDate: any;
  pmsGroupData: any = [];
  pmsRoomListData: any = [];
  lastDateCalendar: any = '';
  showModal: boolean = false;

  editReservationDataConfig: any = { reservationData: {} };
  paymentModeList: any = [];
  pmsRoomMapConfig: any = [];
  daysBetweenDates: any = '';
  currentPropertyId: number = 0;


  constructor(private alert: AlertService, private _service: PropertyService) { }

  ngOnInit() {
    this.loader = true;

    this.selectedDate({ target: { value: this.formatDate(this.todayDate) } });


    this.pmsGroupData = [
      {
        group: 1,
        rooms: [
          {
            name: "Ayush",
            roomId: 1,
          },
          {
            name: "Ayush2",
            roomId: 2,
          },
          {
            name: "Ayush3",
            roomId: 3,
          },
        ]
      },
      {
        group: 2,
        rooms: [
          {
            name: "Bittu",
            roomId: 4,
          },
          {
            name: "Bittu 2",
            roomId: 5,
          },
          {
            name: "Bittu 3",
            roomId: 6,
          },
        ]
      },
      {
        group: 3,
        rooms: [
          {
            name: "Golu 3",
            roomId: 7,
          },
          {
            name: "Golu 4",
            roomId: 8,
          },
          {
            name: "Golu 5",
            roomId: 9,
          },
        ]
      },

    ];

    this.pmsRoomListData = [
      {
        date: '2024-08-01',
        reservation: 10,
        reservation_customer_name: "Ayush",
        checkin: '2024-08-01',
        checkout: '2024-08-03',
        roomId: 1
      },
      {
        date: '2024-08-10',
        reservation: 5,
        reservation_customer_name: "Bituu",
        checkin: '2024-08-10',
        checkout: '2024-08-15',
        roomId: 2
      },
      {
        date: '2024-08-02',
        reservation: 5,
        reservation_customer_name: "Bituu",
        checkin: '2024-08-02',
        checkout: '2024-08-05',
        roomId: 5
      },
    ]

  }

  getPMSData() {
  }


  makeCalendarData() {

  //   let pmsData: any = [
  //     { pmsName: 'Aman', reservation_id: 10 },
  //     { pmsName: 'Arnav', reservation_id: 20 },
  //     { pmsName: 'Golu', reservation_id: 30 },
  //     { pmsName: 'Danny', reservation_id: 40 },
  //     { pmsName: 'Bobby', reservation_id: 50 },
  //     { pmsName: 'Prafull', reservation_id: 60 },
  //     { pmsName: 'Prateek', reservation_id: 70 },
  //     { pmsName: 'Ranu', reservation_id: 80 },
  //     { pmsName: 'Jitu', reservation_id: 90 }
  //   ];

  //   let data: any = [
  //     {
  //       date: '2024-07-06',
  //       reservation: 10,
  //       reservation_id: 10,
  //       reservation_customer_name: "Ayush",
  //       checkin: '2024-08-01',
  //       checkout: '2024-08-07',
  //       img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
  //     },
  //     {
  //       date: '2024-07-15',
  //       reservation: 5,
  //       reservation_id: 20,
  //       reservation_customer_name: "Bituu",
  //       checkin: '2024-07-15',
  //       checkout: '2024-07-18',
  //       img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
  //     },
  //   ];

  //   const dateArray:any = JSON.parse(JSON.stringify(this.datesData));

  //  let m =  pmsData.map((e: any) => {
  //   this.datesData = dateArray;
  //     data.forEach((ele: any) => {

  //       for (let i = 0; i < this.datesData.length; i++) {
  //         if (((new Date(this.datesData[i].formateDate).setHours(0, 0, 0, 0) >= new Date(ele.checkin).setHours(0, 0, 0, 0))
  //           &&
  //           (new Date(this.datesData[i].formateDate).setHours(0, 0, 0, 0) <= new Date(ele.checkout).setHours(0, 0, 0, 0))) && ele.reservation_id == e.reservation_id ) {
  //           this.datesData[i]['data'] = ele;
  //         }
  //       }
  //     })
  //     e['datesData'] = JSON.parse(JSON.stringify(this.datesData));
  //     return e;
  //   });





    // this.mainData.forEach((e: any) => {
    //     e.data.pmsRoomList.forEach((ele:any)=>{
    //       // this.datesData
    //       ele.data.forEach((item: any) => {
    //         for (let i = 0; i < this.datesData.length; i++) {
    //           if (new Date(item.date).setHours(0, 0, 0, 0) == new Date(this.datesData[i].formateDate).setHours(0, 0, 0, 0)) {
    //             this.datesData[i]['newData'] = item;
    //             this.datesData[i].newData['resource'] = e.room_id;
    //             this.datesData[i].newData['start'] = item.date;
    //             break;
    //           }
    //         }
    //       });
    //       ele['datesData'] = JSON.parse(JSON.stringify(this.datesData));
    //     });
    //   });


    this.mainData = [
      {
        group: "1",
        data: {
          pmsRoomList: [
            {

              pmsName: "Aman",
              data: [
                {
                  date: '2024-08-07',
                  reservation: 6,
                  reservation_id: 42,
                  reservation_customer_name: "Ayush",
                  checkin: '2024-08-07',
                  checkout: '2024-08-10',
                  color: "#4caf50",
                  img: 'https://i.ytimg.com/vi/C_FvZs4dOEw/sddefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
                {
                  date: '2024-07-28',
                  reservation: 80,
                  reservation_customer_name: "Bituu ",
                  checkin: '2024-07-28',
                  checkout: '2024-08-02',
                  color: "#4caf50",
                  img: 'https://i.ytimg.com/vi/C_FvZs4dOEw/sddefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
              ]
            },

            {
              pmsName: "Arnav",
              data: [
                {
                  date: '2024-07-06',
                  reservation: 10,
                  reservation_customer_name: "Arnav",
                  checkin: '2024-07-06',
                  checkout: '2024-07-08',
                  color: "#3d50b4",
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
                {
                  date: '2024-07-15',
                  reservation: 5,
                  reservation_id: 42,
                  reservation_customer_name: "Bituu",
                  checkin: '2024-07-15',
                  checkout: '2024-07-18',
                  color: "#3d50b4",
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
              ]
            },
            {
              pmsName: "Golu",
              data: [
                {
                  date: '2024-07-09',
                  reservation: 10,
                  reservation_customer_name: "Ayush",
                  checkin: '2024-07-09',
                  checkout: '2024-07-10',
                  color: "#4caf50",
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
                {
                  date: '2024-07-25',
                  reservation: 5,
                  reservation_customer_name: "Bituu",
                  checkin: '2024-07-25',
                  checkout: '2024-07-28',
                  color: "#3d50b4",
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
              ]
            },
          ]
        }
      },
      {
        group: "2",
        data: {
          pmsRoomList: [
            {

              pmsName: "Danny",
              data: [
                {
                  date: '2024-07-05',
                  reservation: 6,
                  reservation_customer_name: "Danny",
                  checkin: '2024-07-05',
                  checkout: '2024-07-07',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
                {
                  date: '2024-07-11',
                  reservation: 80,
                  reservation_customer_name: "Danny",
                  checkin: '2024-07-11',
                  checkout: '2024-07-17',
                  color: "#3d50b4",
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
              ]
            },

            {
              pmsName: "Bobby",
              data: [
                {
                  date: '2024-07-31',
                  reservation: 10,
                  reservation_customer_name: "Bobby",
                  checkin: '2024-07-31',
                  checkout: '2024-08-12',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
                {
                  date: '2024-08-13',
                  reservation: 5,
                  reservation_customer_name: "Bobby",
                  checkin: '2024-08-13',
                  checkout: '2024-08-15',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
              ]
            },
            {
              pmsName: "Prafull",
              data: [
                {
                  date: '2024-07-16',
                  reservation: 10,
                  reservation_customer_name: "Nayak",
                  checkin: '2024-07-16',
                  checkout: '2024-07-16',
                  img: 'https://i.ytimg.com/vi/C_FvZs4dOEw/sddefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
                {
                  date: '2024-08-04',
                  reservation: 5,
                  reservation_customer_name: "Guru",
                  checkin: '2024-08-04',
                  checkout: '2024-08-11',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg',
                  otaImg: 'https://static.vecteezy.com/system/resources/thumbnails/000/579/928/small/01-01.jpg'
                },
                {
                  date: '2024-07-12',
                  reservation: 5,
                  reservation_customer_name: "Naman",
                  checkin: '2024-07-12',
                  checkout: '2024-07-14',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
              ]
            },
          ]
        }
      },
      {
        group: "3",
        data: {
          pmsRoomList: [
            {

              pmsName: "Prateek",
              data: [
                {
                  date: '2024-07-04',
                  reservation: 6,
                  reservation_customer_name: "Ayush",
                  checkin: '2024-07-03',
                  checkout: '2024-07-06',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
                {
                  date: '2024-07-10',
                  reservation: 80,
                  reservation_customer_name: "Bituu",
                  checkin: '2024-07-10',
                  checkout: '2024-07-12',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
              ]
            },

            {
              pmsName: "Ranu",
              data: [
                {
                  date: '2024-07-06',
                  reservation: 10,
                  reservation_customer_name: "Ayush",
                  checkin: '2024-07-06',
                  checkout: '2024-07-10',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
                {
                  date: '2024-07-15',
                  reservation: 5,
                  reservation_customer_name: "Bituu",
                  checkin: '2024-07-15',
                  checkout: '2024-07-18',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
              ]
            },
            {
              pmsName: "Jitu",
              data: [
                {
                  date: '2024-08-01',
                  reservation: 10,
                  reservation_customer_name: "Ayush",
                  checkin: '2024-08-01',
                  checkout: '2024-08-03',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
                {
                  date: '2024-08-10',
                  reservation: 5,
                  reservation_customer_name: "Bituu",
                  checkin: '2024-08-10',
                  checkout: '2024-08-15',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
                {
                  date: '2024-08-05',
                  reservation: 5,
                  reservation_customer_name: "Bituu",
                  checkin: '2024-08-05',
                  checkout: '2024-08-05',
                  img: 'https://i.ytimg.com/vi/RPrXxYBZO9c/maxresdefault.jpg'
                },
              ]
            },
          ]
        }
      },
    ]
  }

  handleClickEvent(startDate: any, dayData: any, roomName: any, roomId: any, isDeriveModalActive: boolean) {
    if (this.timeoutId !== null) {            //this part will run if double clicked within 200ms
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      // this.openModal(dayData, roomName, startDate, roomId);
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
            // this.openModal({}, roomName, startDate, roomId);
          }
          // this.openModal({}, roomName, startDate, roomId);
        }

      }, 200);
    }
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
    this.nextDisplayMonth = monthNames[new Date(this.currentDate).getMonth() + 1 == 12 ? 0 : new Date(this.currentDate).getMonth() + 1];

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
      this.lastDateCalendar = this.datesData[this.datesData.length - 1];
      this.loader = false;

    }, 0);
  }

  isDatePassed(date: any) {
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

  getStartAndEndDate(nextButtonDate: any, isFromDateRange?: boolean) {
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
    let current: any;
    if (now.getMonth() == 11) {
      current = new Date(now.getFullYear() + 1, 0, now.getDate());
    }
    else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }
    return `start_date=${this.formatDate(now)}&end_date=`;
  }

  selectedDate(event: any) {
    this.selectDate = new Date(event.target.value);
    this.datesData = [];
    this.renderCalendar(this.selectDate);

  }


  formatDate(date: any) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.datesData = [];
    if ((this.currentDate.getMonth() + 1) != (new Date().getMonth() + 1)) {
      this.selectDate = '';
      let selectedRangeDate: any = document.getElementById("date");
      let setFirstMonthDate: any = new Date(this.currentDate).setDate(1)
      selectedRangeDate.value = this.formatDate(new Date(setFirstMonthDate));
      this.renderCalendar(this.currentDate);
      // this.fetchCalendarData(this.formatDate(this.currentDate), false);
    } else {
      this.selectDate = new Date();
      let selectedRangeDate: any = document.getElementById("date");
      selectedRangeDate.value = this.formatDate(this.selectDate);
      this.renderCalendar(this.selectDate);
      // this.fetchCalendarData(this.formatDate(this.selectDate), true);
    }
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate);
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.datesData = [];
    if ((this.currentDate.getMonth() + 1) != (new Date().getMonth() + 1)) {
      this.selectDate = '';
      let selectedRangeDate: any = document.getElementById("date");
      let setFirstMonthDate: any = new Date(this.currentDate).setDate(1);
      let now: any = new Date(setFirstMonthDate);
      selectedRangeDate.value = this.formatDate(new Date(setFirstMonthDate));
      this.renderCalendar(now);
      // this.fetchCalendarData(this.formatDate(this.currentDate), false);
    } else {
      this.selectDate = new Date();
      let selectedRangeDate: any = document.getElementById("date");
      selectedRangeDate.value = this.formatDate(this.selectDate);
      this.renderCalendar(this.selectDate);
      // this.fetchCalendarData(this.formatDate(this.selectDate), true);
    }
  }

  identify(index: any, item: any) {
    return item.id;
  }


  getReservationDaysWidth(room: any, date: any): number {
    const reservation = room.data.find((reservation: any) => reservation.checkin === date.formateDate);
    if (reservation) {
      const checkinDate = new Date(reservation.checkin);
      const checkoutDate = new Date(reservation.checkout);
      const diffTime = checkoutDate.getTime() - checkinDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (checkoutDate > new Date(this.lastDateCalendar.formateDate)) {

        let time: any = checkoutDate.getTime() - new Date(this.lastDateCalendar.formateDate).getTime();
        let days: any = Math.ceil(time / (1000 * 60 * 60 * 24));


        return (diffDays + 1) - days;
      }

      return diffDays + 1;
    }
    return 1; // Default width for 1 day
  }


  getReservationCustomerName(room: any, date: any): string {
    const reservation = room.data.find((reservation: any) => (date.formateDate >= reservation.checkin) && (date.formateDate <= reservation.checkout));
    return reservation ? reservation.reservation_customer_name : '';
  }

  getReservationData(room: any, date: any): any {
    const reservation = room.data.find((reservation: any) => (date.formateDate >= reservation.checkin) && (date.formateDate <= reservation.checkout));
    return reservation;
  }

  getReservationColor(room: any, date: any): string {
    const reservation = room.data.find((reservation: any) => (date.formateDate >= reservation.checkin) && (date.formateDate <= reservation.checkout));
    return reservation ? reservation.color : '#fff';
  }

  hasReservation(room: any, date: any): boolean {
    return room.data.some((reservation: any) => (date.formateDate >= reservation.checkin) && (date.formateDate <= reservation.checkout));
  }

  hasClashReservation(room: any, date: any): boolean {
    const reservations = room.data.filter((reservation: any) => date.formateDate >= reservation.checkin && date.formateDate <= reservation.checkout);
    return reservations.length > 1;
  }

  isStartOfReservation(room: any, date: any): boolean {
    return room.data.some((reservation: any) => reservation.checkin === date.formateDate);
  }

  getReservationImage(room: any, date: any): string {
    const reservation = room.data.find((reservation: any) => (date.formateDate >= reservation.checkin) && (date.formateDate <= reservation.checkout));
    return reservation ? reservation.img : '';
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev: any) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  hasReservationAcrossMonth(room: any, date: any) {
    return room.data.some((reservation: any) => (reservation.checkout >= date.formateDate));

  }

  closeModal() {
    this.showModal = false;
  }


  setAdultGuestReserve(event: any) {

    const totalAdults = +event.target.value;
    const numRooms = this.editReservationDataConfig.rooms.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingAdults = totalAdults % numRooms;
    let additionalAdultsRooms = remainingAdults;

    this.editReservationDataConfig.rooms.forEach((room: any, index: any) => {
      room.adult = baseAdultsPerRoom + (additionalAdultsRooms > 0 ? 1 : 0);
      additionalAdultsRooms = Math.max(0, additionalAdultsRooms - 1);
    });
  }

  setChildGuestReserve(event: any) {
    const totalAdults = +event.target.value;
    const numRooms = this.editReservationDataConfig.rooms.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingChild = totalAdults % numRooms;
    let additionalChildRooms = remainingChild;

    this.editReservationDataConfig.rooms.forEach((room: any, index: any) => {
      room.children = baseAdultsPerRoom + (additionalChildRooms > 0 ? 1 : 0);
      additionalChildRooms = Math.max(0, additionalChildRooms - 1);
    });
  }

  setBabyGuestReserve(event: any) {

  }

  addMoreGuestInfo() {
    this.editReservationDataConfig.guestData.push(
      {
        "first_name": "",
        "last_name": "",
        "email": "",
        "mobile": "",
        "language": "",
        "travel_agency": "",
        "customer_type": 2
      }
    )
  }

  getPaymentDetails(event: any) {
    this.editReservationDataConfig.payments[0].payment_method_id = event.target.value;
  }

  setPaymentsData() {
    this.editReservationDataConfig.payments = this.editReservationDataConfig.payments.map((e: any) => {
      return {
        "payment_id": e.id,
        "payment_method_id": e.payment_method_id,
        "paid_amt": e.paid_amt,
        "payment_date": e.payment_date,
        "received_by": e.received_by
      }
    });
  }

  trackBy(idx: any) {
    return idx;
  }

  addExtraFacility(item: any) {
    item[`showExtraFac`] = !item[`showExtraFac`];
  }

  selectExtraFac(event: any, typ: any, item: any) {

  }

  editReservation() {
    this.reMakePayloadData();
    setTimeout(() => {
      this.loader = true;
      this._service.updateReservation(this.editReservationDataConfig, (res: any) => {
        if (res.status == 200) {
          this.loader = false;
          this.editReservationDataConfig = {};
          this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
        } else {
          this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' });
        }
      })
    }, 0)
  }

  reMakePayloadData() {
    this.editReservationDataConfig.rooms.forEach((e: any) => {
      e['reserved_room_id'] = e.id;
      delete e.id;
      delete e.reservations_id;
      delete e.internal_room_name;
      delete e.ota_room_id;
      delete e.reservation_status;
    });
    this.editReservationDataConfig['pmsAssigned'] = this.pmsRoomMapConfig;
    delete this.editReservationDataConfig['reservationData'].reservation_status;
    delete this.editReservationDataConfig['reservationData'].guest_name;
    delete this.editReservationDataConfig['reservationData'].reservations_no;
    this.setPaymentsData();
    this.setGuestData();
  }

  setGuestData() {
    this.editReservationDataConfig.guestData.forEach((e: any) => {
      e['guest_id'] = e.id;
      delete e.id;
      delete e.reservations_id;
      delete e.reservations_no;
      delete e.status;
      delete e.add_time;
    })
  }

  copyCode(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alert.alert("success", "Reseration Code Copied", "Success", { displayDuration: 1000, pos: 'top' })
  }


  selectPmsRoom(event: any, reservationData: any) {
    if (event.target.value) {
      let value: any = JSON.parse(event.target.value)

      if (this.pmsRoomMapConfig.length == 0) {
        this.pmsRoomMapConfig.push({
          'pms_room_id': value.pms_room_id,
          "internal_room_id": reservationData.internal_room_id,
          "check_in": reservationData.check_in,
          "check_out": reservationData.check_out,
          "reservation_id": reservationData.reservations_id,
          "reservation_room_id": reservationData.id
        });
      } else {
        let isExist: any = this.pmsRoomMapConfig.some((e: any) => e.pms_room_id == value.pms_room_id);
        if (!isExist) {
          this.pmsRoomMapConfig.push({
            'pms_room_id': value.pms_room_id,
            "internal_room_id": reservationData.internal_room_id,
            "check_in": reservationData.check_in,
            "check_out": reservationData.check_out,
            "reservation_id": reservationData.reservations_id,
            "reservation_room_id": reservationData.id
          });
        } else {
          //
        }
      }
      this.pmsRoomList[value.index].isSelected = true;
    } else {
      this.pmsRoomList.forEach((e: any) => e.isSelected = false);
    }

  }

  calculateDaysBetweenDates(reservationDetail: any) {
    let date1 = new Date(reservationDetail.checkin);
    let date2 = new Date(reservationDetail.checkout);

    let Difference_In_Time = date2.getTime() - date1.getTime();

    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    this.daysBetweenDates = Difference_In_Days;
  }

  getPaymentMethod() {
    this._service.getPaymentMethod((res: any) => {
      if (res.status == 200) {
        this.paymentModeList = res.data;
        this.editReservationDataConfig.payments;
      }
    })
  }


  getAvailablePMSRoom(data: any) {
    this._service.getAvailablePMSRoom(data.internal_room_id, data.check_in.split(" ")[0], (res: any) => {
      if (res.status == 200) {
        this.pmsRoomList = res.data.map((e: any) => { return { ...e, isSelected: false } });
      }
    })
  }

  getReserationDetails(room: any, date: any) {
    const reservation: any = room.data.find((e: any) => e.checkin === date.formateDate)
    if (reservation?.reservation_id) {
      this._service.getSingleReservation(reservation?.reservation_id, (res: any) => {
        if (res.status == 200) {
          this.editReservationDataConfig = res.responseData;
          this.editReservationDataConfig['reservationData'] = reservation;
          this.editReservationDataConfig['reservationData']['reservation_id'] = reservation?.reservation_id;
          delete this.editReservationDataConfig['reservationData'].id;
          this.editReservationDataConfig['reservationData']['cancellation_date'] = "";
          this.editReservationDataConfig['reservationData']['property_id'] = this.currentPropertyId;
          this.editReservationDataConfig['reservationData']['created_by'] = this.editReservationDataConfig['reservationData'].guest_name;
          this.editReservationDataConfig['reservationData']['property_id'] = this.currentPropertyId;
          this.calculateDaysBetweenDates(reservation);
          this.getPaymentMethod();
          this.getAvailablePMSRoom(res.responseData.rooms[0]);
          this.showModal = true;
        }
      })
    }

  }

  createImage(room: any, date: any, indexes: any) {

    let reservation: any = room.data.find((ele: any) => (date.formateDate >= ele.checkin) && (date.formateDate <= ele.checkout))
    if (reservation) {

      let code: any;
      let el: any = document.getElementById(`td${indexes.groupIndex}${indexes.roomIdx}${indexes.dateIndex}`);
      el.innerHTML = "";
      let charsArray: any = reservation.reservation_customer_name.toUpperCase();
      let captcha = [];
      for (let i = 0; i < charsArray.length; i++) {
        captcha.push(charsArray[i]);
      }

      let text = captcha.join("");

      let canv: any = document.createElement("canvas");
      canv.id = `captcha${indexes.groupIndex}${indexes.roomIdx}${indexes.dateIndex}`;
      canv.width = this.getReservationDaysWidth(room, date) * 50;
      canv.height = 60;



      let ctx = canv.getContext("2d");
      let fontSize = 25;  // Fixed font size
      ctx.font = `${fontSize}px Georgia`;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canv.width, canv.height);

      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      let textWidth = ctx.measureText(text).width;
      let scaleX = canv.width / textWidth;
      ctx.save();
      ctx.scale(scaleX, 1);

      let paddingLeft = 37; 
      ctx.strokeText(text, paddingLeft / scaleX, 40);

      ctx.restore();

      code = captcha.join("");
      el.appendChild(canv);
      
      let element:any = document.getElementById(canv.id);
          element.style.borderTopLeftRadius = "20px";
          element.style.borderBottomRightRadius = "20px";

      canv.addEventListener('click',(e:any)=>{});
      
    }

  }


}
