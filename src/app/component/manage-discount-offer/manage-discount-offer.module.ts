import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDiscountOfferRoutingModule } from './manage-discount-offer-routing.module';
import { ManageDiscountOfferComponent } from './manage-discount-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageDiscountOfferComponent],
  imports: [
    CommonModule,
    ManageDiscountOfferRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ManageDiscountOfferComponent]
})
export class ManageDiscountOfferModule { }
