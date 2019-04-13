import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';


const routes: Routes = [
  { path: 'create' , component: ProductCreateComponent },
  { path: 'orders' , component: OrdersAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
