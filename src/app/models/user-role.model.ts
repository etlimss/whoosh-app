import { User } from './user.model';
import { Role } from './role.model';

export class UserRole {
  constructor(
    public id: number,
    public user: User,
    public role: Role
  ) {}
}
