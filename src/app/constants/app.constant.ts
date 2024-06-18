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

    public timeZones = [
        { offset: "-12:00", cities: ["Baker Island"] },
        { offset: "-11:00", cities: ["Niue"] },
        { offset: "-10:00", cities: ["Hawaii"] },
        { offset: "-09:00", cities: ["Alaska"] },
        { offset: "-08:00", cities: ["Pacific Time (US & Canada)"] },
        { offset: "-07:00", cities: ["Mountain Time (US & Canada)"] },
        { offset: "-06:00", cities: ["Central Time (US & Canada)"] },
        { offset: "-05:00", cities: ["Eastern Time (US & Canada)"] },
        { offset: "-04:00", cities: ["Atlantic Time (Canada)"] },
        { offset: "-03:30", cities: ["Newfoundland"] },
        { offset: "-03:00", cities: ["Brasilia", "Buenos Aires"] },
        { offset: "-02:00", cities: ["Mid-Atlantic"] },
        { offset: "-01:00", cities: ["Azores", "Cape Verde Islands"] },
        { offset: "+00:00", cities: ["London", "Dublin", "Lisbon"] },
        { offset: "+01:00", cities: ["Berlin", "Madrid", "Paris", "Rome"] },
        { offset: "+02:00", cities: ["Athens", "Helsinki", "Jerusalem"] },
        { offset: "+03:00", cities: ["Moscow", "Nairobi", "Riyadh"] },
        { offset: "+03:30", cities: ["Tehran"] },
        { offset: "+04:00", cities: ["Yerevan"] },
        { offset: "+04:30", cities: ["Kabul"] },
        { offset: "+05:00", cities: ["Ashgabat", "Tashkent", "Astana", "Ekaterinburg", "Islamabad", "Karachi"] },
        { offset: "+05:30", cities: ["Chennai", "Kolkata", "Mumbai", "New Delhi", "Sri Jayawardenepura"] },
        { offset: "+05:45", cities: ["Kathmandu"] },
        { offset: "+06:00", cities: ["Bishkek", "Dhaka", "Omsk"] },
        { offset: "+06:30", cities: ["Yangon (Rangoon)"] },
        { offset: "+07:00", cities: ["Bangkok", "Hanoi", "Jakarta"] },
        { offset: "+08:00", cities: ["Beijing", "Perth", "Singapore"] },
        { offset: "+09:00", cities: ["Tokyo", "Seoul"] },
        { offset: "+09:30", cities: ["Adelaide", "Darwin"] },
        { offset: "+10:00", cities: ["Sydney", "Guam"] },
        { offset: "+11:00", cities: ["Solomon Islands"] },
        { offset: "+12:00", cities: ["Auckland", "Fiji"] }
    ];

}