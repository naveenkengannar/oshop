import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
        // tslint:disable-next-line:forin
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {

            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem ({ ...item, $key: productId }));
        }
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.$key];
        if (!item) { return 0; }
        return item.quantity;
      }

    get totalPrice() {
        let sum = 0;
        for (const item of this.items) {
            sum += item.totalPrice;
        }
        return sum;
    }
    get totalItemsCount() {
        let count = 0;
      // tslint:disable-next-line:forin
      for (const productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
      }
      return count;
    }
}
