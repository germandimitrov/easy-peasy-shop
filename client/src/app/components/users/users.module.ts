import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersUserComponent } from './orders-user/orders-user.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    OrdersUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ProfileComponent,
    OrdersUserComponent
  ]
})
export class UsersModule { }
