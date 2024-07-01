import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
      CommonModule,
      MatCardModule,
      MatListModule,
      RouterModule,
      MatToolbarModule,
      MatButtonModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  user = {
      name: 'Test Tester'
  };

  orderSummary = {
      totalOrders: 25,
      pendingOrders: 5,
      deliveredOrders: 20
  };

  recentOrders = [{
      item: 'Product 1',
      status: 'Delivered'
  }, {
      item: 'Product 2',
      status: 'Pending'
  }, {
      item: 'Product 3',
      status: 'Delivered'
  }];

  ngOnInit(): void {
      // Future feature to fetch user info, order summary, and recent orders from a service
  }

}