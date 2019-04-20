import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart/shopping-cart.component';
import { DetailsComponent } from './components/products/details/details.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login' , component: LoginComponent },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart', component: ShoppingCartComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'product/details/:id', component: DetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './components/admin/admin.module#AdminModule',
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
