import { Order } from "./order.model";
import { UserRole } from "./user-role.model";

export class User {
    constructor(
      public id: number,
      public name: string,
      public displayName: string,
      public addressLine: string,
      public postalCode: string,
      public city: string,
      public countryCode: string,
      public phoneNumber: string,
      public mail: string,
      public password: string,
      public userRoles: UserRole[] = [],
      public orders: Order[] = []
    ) {}
}