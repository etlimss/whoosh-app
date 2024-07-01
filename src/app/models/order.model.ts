import { OrderState } from './order-state';
import { Product } from './product.model';
import { User } from './user.model';

export class Order {
  constructor(
    public id: number,
    public createdAt: Date,
    public amount: number,
    public price: number,
    public assignedToDriverAt: Date | null,
    public deliveredAt: Date | null,
    public lastModifiedAt: Date,
    public lastModifiedBy: User,
    public customer: User, 
    public driver: User | null,
    public products: Product[],
    public state: OrderState
  ) {}
}
