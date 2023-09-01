import { v4 as uuidv4 } from "uuid";
import { Item } from "./item"; // Import the Item class

class User {
  private id: string;
  private name: string;
  private age: number;
  private cart: Item[];

  constructor(name: string, age: number) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.cart = [];
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getCart(): Item[] {
    return this.cart;
  }

  addToCart(item: Item): void {
    this.cart.push(item);
  }

  removeFromCart(item: Item): void {
    this.cart = this.cart.filter(
      (cartItem) => cartItem.getId() !== item.getId()
    );
    item.resetQuantity();
  }

  updateCartQuantity(item: Item, quantity: number): void {
    const cartItem = this.cart.find((cartItem) => cartItem.getId() === item.getId());
  
    if (cartItem) {
      if (quantity > 0) {
        cartItem.increaseQuantity(quantity);
      } else if (quantity < 0) {
        cartItem.decreaseQuantity(Math.abs(quantity));
      }
    }
  }

  cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.getPrice() * item.getQuantity(), 0);
  }

  printCart(): void {
    console.log(`Receipt for ${this.name}:\n`);
    console.log("Item Name".padEnd(50) + "Quantity".padEnd(15) + "Price");
    console.log("=".repeat(80));

    const printedItems: Set<string> = new Set();

    this.cart.forEach((item) => {
      if (!printedItems.has(item.getId())) {
        const itemName = item.getName().padEnd(50);
        const itemQuantity = `x${item.getQuantity()}`.padEnd(15);
        const itemPrice = `$${(item.getPrice() * item.getQuantity()).toFixed(2)}`;
        console.log(`${itemName}${itemQuantity}${itemPrice}`);
        console.log(`Description: ${item.getDescription()}\n`);
        console.log("-".repeat(80));

        printedItems.add(item.getId());
      }
    });

    console.log("\n" + "=".repeat(80));

    const totalLabel = "Total:".padEnd(65);
    const totalValue = `$${this.cartTotal().toFixed(2)}`;
    const totalPadding = 100 - (totalLabel.length + totalValue.length);
    console.log(`${totalLabel.padStart(totalPadding / 2)}${totalValue.padEnd(totalPadding / 2)}`);

    console.log("\n\n");
  }
}

export { User };