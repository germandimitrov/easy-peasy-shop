import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart/shopping-cart.component';
import { DetailsComponent } from './components/products/details/details.component';

const routes: Routes = [
  {
  path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: 'register', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'profile' , component: ProfileComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'product/details/:id', component: DetailsComponent },
  { path: '' , pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
