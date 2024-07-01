import { Injectable } from "@angular/core";
import { Order } from "../models/order.model";
import { UserService } from "./user.service";
import { Product } from "../models/product.model";
import { OrderState } from "../models/order-state";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private orders: Order[] = [];

  constructor(private userService: UserService) {}

  createOrder(
    customerId: number,
    products: Product[],
    amount: number,
    price: number
  ): void {
    const customer = this.userService.getUserById(customerId);
    if (customer) {
      const order = new Order(
        this.orders.length + 1,
        new Date(),
        amount,
        price,
        null,
        null,
        new Date(),
        customer,
        customer,
        null,
        products,
        OrderState.CREATED
      );
      this.orders.push(order);
      console.log("Order created:", order);
      this.userService.addUserOrder(customerId, order);
    }
  }

  assignOrderToDriver(orderId: number, driverId: number): void {
    const order = this.orders.find((o) => o.id === orderId);
    const driver = this.userService.getUserById(driverId);
    if (order && driver) {
      order.driver = driver;
      order.assignedToDriverAt = new Date();
      order.lastModifiedAt = new Date();
      order.lastModifiedBy = driver;
      order.state = OrderState.ASSIGNED_TO_DRIVER;
    }
  }

  deliverOrder(orderId: number): void {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.deliveredAt = new Date();
      order.lastModifiedAt = new Date();
      order.state = OrderState.DELIVERED;
    }
  }

  getOrdersByCustomer(customerId: number): Order[] {
    return this.orders.filter((order) => order.customer.id === customerId);
  }

  getOrdersByDriver(driverId: number): Order[] {
    return this.orders.filter((order) => order.driver?.id === driverId);
  }
}
