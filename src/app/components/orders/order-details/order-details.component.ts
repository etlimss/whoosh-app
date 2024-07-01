import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  displayedColumns: string[] = ['item', 'status', 'description'];
  dataSource: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.order = this.getOrderDetails(orderId);
    this.dataSource = [this.order]; 
  }

  getOrderDetails(id: string | null): any {
    
    const orders = [
      { id: '1', item: 'Product 1', status: 'Delivered', description: 'Delivered product 1' },
      { id: '2', item: 'Product 2', status: 'Pending', description: 'Pending product 2' },
      { id: '3', item: 'Product 3', status: 'Shipped', description: 'Shipped product 3' },
    ];
    return orders.find(order => order.id === id);
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
