import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateProductComponent} from './create-product/create-product.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { ListProductsComponent } from './list-products/list-products.component';

@NgModule({
  declarations: [
    CreateCategoryComponent,
    EditProductComponent,
    OrdersAdminComponent,
    CreateProductComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
  ],
  exports: [
    CreateCategoryComponent,
    EditProductComponent,
    OrdersAdminComponent,
    CreateProductComponent,
    ListProductsComponent,
  ]
})
export class AdminModule { }
