import { Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/dashboard/customer-dashboard/customer-dashboard.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ProductDetailsComponent } from './components/webshop/product-details/product-details.component';
import { ProductListComponent } from './components/webshop/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './components/orders/order-form/order-form.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'login', component: LandingComponent },
    { path: 'customer-login', component: LoginComponent },
    { path: 'driver-login', component: LoginComponent }, 
    { path: 'admin-login', component: LoginComponent },   
    { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
    { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'order-form', component: OrderFormComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
