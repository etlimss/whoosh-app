import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems: Product[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  getCartItems(): Product[] {
    return [...this.cartItems];
  }

  addToCart(product: Product, quantity: number): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateCartItemCount();
  }

  private loadCart(): void {
    const cart = localStorage.getItem('cartItems');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.updateCartItemCount();
  }

  private updateCartItemCount(): void {
    const itemCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
    this.cartItemCountSubject.next(itemCount);
  }
 
}
