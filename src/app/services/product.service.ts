import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    new Product(
      1,
      "Product 1",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      229.99,
      1,
      "../../assets/images/product1.jpg"
    ),
    new Product(
      2,
      "Product 2",
      "Hac habitasse platea dictumst quisque sagittis purus. Condimentum vitae sapien pellentesque habitant morbi tristique senectus.",
      339.99,
      1,
      "../../assets/images/product2.jpg"
    ),
    new Product(
      3,
      "Product 3",
      "Orci porta non pulvinar neque laoreet suspendisse. Tristique senectus et netus et malesuada.",
      449.99,
      1,
      "../../assets/images/product3.jpg"
    ),
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
