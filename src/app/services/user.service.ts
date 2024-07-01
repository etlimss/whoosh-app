import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { UserRole } from '../models/user-role.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        new User(1, 'Test', 'Testertan', '123 Testenhavn street', '12345', 'Testenhavn', 'DK', '11111111', 'test@test.com', 'test123', [], []),
        new User(2, 'Driver', 'Driverstan', '123 Testenhavn street', '12345', 'Testenhavn', 'DK', '11111111', 'driver@test.com', 'test123', [], [])
      ];

      constructor() {
        this.users[0].userRoles.push(new UserRole(1, this.users[0], Role.CUSTOMER));
        this.users[1].userRoles.push(new UserRole(2, this.users[1], Role.DRIVERY));
      }

  getUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  getUserOrders(userId: number): Order[] | undefined {
    const user = this.getUserById(userId);
    return user ? user.orders : undefined;
  }

  addUserOrder(userId: number, order: Order): void {
    const user = this.getUserById(userId);
    if (user) {
        user.orders.push(order);
        console.log('Order added to user:', user);
      } else {
        console.error('User not found:', userId); 
      }
  }

  getUserRoles(userId: number): UserRole[] | undefined {
    const user = this.getUserById(userId);
    return user ? user.userRoles : undefined;
  }

  addUserRole(userId: number, role: Role): void {
    const user = this.getUserById(userId);
    if (user) {
      const newUserRole = new UserRole(this.users.length + 1, user, role);
      user.userRoles.push(newUserRole);
    }
  }
}
