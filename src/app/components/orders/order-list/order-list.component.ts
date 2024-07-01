import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  displayedColumns: string[] = ['id', 'createdAt', 'amount', 'price', 'products', 'state'];

  // mockup orders
  // orders = [
  //   { id: 1, item: 'Product 1', status: 'Delivered' },
  //   { id: 2, item: 'Product 2', status: 'Pending' },
  //   { id: 3, item: 'Product 3', status: 'Shipped' }
  // ];

  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const customerId = 1; // this is hard coded - but it needs to be replaced with real customerId logic
    this.orders = this.orderService.getOrdersByCustomer(customerId);
    console.log('Orders fetched:', this.orders);
  }

  dataSource = this.orders;

}
