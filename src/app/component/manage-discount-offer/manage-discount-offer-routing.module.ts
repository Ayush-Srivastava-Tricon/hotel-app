import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDiscountOfferComponent } from './manage-discount-offer.component';

const routes: Routes = [
  {
    path:'',
    component:ManageDiscountOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDiscountOfferRoutingModule { }
