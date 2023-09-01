import { v4 as uuidv4 } from "uuid";

class Item {
  private id: string;
  private name: string;
  private price: number;
  private description: string;
  private quantity: number;

  constructor(name: string, price: number, description: string, quantity: number = 1) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity >= 0 ? quantity : 0; // Ensure quantity is non-negative
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.description;
  }

  getQuantity(): number {
    return this.quantity;
  }

  increaseQuantity(amount: number = 1): void {
    if (amount > 0) {
      this.quantity += amount;
    }
  }

  decreaseQuantity(amount: number = 1): void {
    if (amount > 0) {
      this.quantity = Math.max(0, this.quantity - amount);
    }
  }

  resetQuantity(): void {
    this.quantity = 1;
  }
}

export { Item };