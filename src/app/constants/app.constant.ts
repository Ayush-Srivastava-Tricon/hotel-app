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
    ]

}