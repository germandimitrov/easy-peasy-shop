import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  { path: 'create/product' , component: CreateProductComponent },
  { path: 'create/category' , component: CreateCategoryComponent },
  { path: 'products' , component: ListProductsComponent },
  { path: 'products/:id/edit' , component: EditProductComponent },
  { path: 'orders' , component: OrdersAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
