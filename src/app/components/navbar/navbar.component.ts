import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isCustomer: boolean = false;
  isDriver: boolean = false;
  isAdmin: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService, 
    public authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.shoppingCartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  // updateCartItemCount(): void {
  //   const cartItems = this.shoppingCartService.getCartItems();
  //   this.cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  // }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    this.router.navigate(['/']);
  }
}
