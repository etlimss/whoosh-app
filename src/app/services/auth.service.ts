import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  // for testing when needed
  private mockUser = {
    id: 1,
    username: "test@test.com",
    password: "test123",
    roles: ["customer"],
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  login(username: string, password: string): Observable<boolean> {
    const user = this.userService
      .getUsers()
      .find((u) => u.mail === username && u.password === password);
    if (user) {
      return this.http.get("https://jsonplaceholder.typicode.com/posts/1").pipe(
        map((response) => {
          localStorage.setItem("token", "mock-token");
          localStorage.setItem("userId", user.id.toString());
          return true;
        }),
        catchError((error) => {
          console.error("Login failed", error);
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getAuthenticatedUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getCurrentUser(): User | undefined {
    const userId = localStorage.getItem("userId");
    return userId ? this.userService.getUserById(+userId) : undefined;
  }

  getCurrentUserRoles(): Role[] {
    const user = this.getCurrentUser();
    return user ? user.userRoles.map((userRole) => userRole.role) : [];
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  }
}
