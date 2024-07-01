import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ShoppingCartService } from "../../../services/shopping-cart.service";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { OrderService } from "../../../services/order.service";
import { Product } from "../../../models/product.model";

@Component({
  selector: "app-order-form",
  templateUrl: "./order-form.component.html",
  styleUrls: ["./order-form.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]],
      date: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderDetails = this.orderForm.value;
      const customer = this.authService.getAuthenticatedUser();
      console.log("Authenticated User:", customer);
      const products: Product[] = this.shoppingCartService.getCartItems();
      const amount = orderDetails.amount;
      const price = products.reduce(
        (total, product) => total + product.price,
        0
      );

      if (customer) {
        this.orderService.createOrder(customer.id, products, amount, price);
        this.shoppingCartService.clearCart();
        alert("Order placed successfully!");
        this.router.navigate(["/orders"]);
      } else {
        alert("User not authenticated.");
      }
    }
  }
}
