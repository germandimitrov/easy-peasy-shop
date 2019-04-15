import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersUserComponent } from './orders-user/orders-user.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfileComponent,
    OrdersUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProfileComponent,
    OrdersUserComponent
  ]
})
export class UsersModule { }
