import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AppConstants {

    public reservation_status:any=[
        {
            value:'Awaiting confirmation',
            checked:false
        },
        {
            value:'Confirmed',
            checked:false
        },
        {
            value:'Rejected',
            checked:false
        },
        {
            value:'Cancelled',
            checked:false
        },
        {
            value:'Room not assigned',
            checked:false
        },
    ];

    public monthsName:any={
        "January":31,
         "February":new Date().getFullYear() % 4 == 0  ? 29 : 28,
         "March":31,
         "April":30,
         "May":31,
         "June":30,
         "July":31,
         "August":31,
         "September":30,
         "October":31,
         "November":30,
         "December":31
    };

}