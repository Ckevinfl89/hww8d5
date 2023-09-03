import { Item } from "./item";

export class Shop {
  private items: Item[];

  constructor() {
    this.items = [];
    const boxenOfDoughnuts = new Item("Dozen Doughnuts", 7.99, "Buy the holes too. Don't leave em hangin'.");
    const canOpener = new Item("The opener of cans", 1.99, "Has spinny blades with handles.");
    const cheese = new Item("Cheese", 8.99, "Solid creamy goodness.");
    this.items.push(boxenOfDoughnuts, canOpener, cheese);
  }

  getItems(): Item[] {
    return this.items;
  }
}