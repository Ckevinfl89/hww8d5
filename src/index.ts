import { User } from "./user";
import { Shop } from "./shop";

// Create instances of Shop and User
const shop = new Shop();
const user = new User("Mr.Man", 35);

// Function to update the UI with cart information
function updateUI() {
    const availableItemsList = document.getElementById("availableItems");
    const userCartList = document.getElementById("userCart");
    const totalAmountDisplay = document.getElementById("totalAmount");

    if (availableItemsList && userCartList && totalAmountDisplay) {
        // Clear the lists before updating
        availableItemsList.innerHTML = "";
        userCartList.innerHTML = "";

        // Initialize totalAmount
        let totalAmount = 0;

        // Populate available items
        shop.getItems().forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.getName()} - $${item.getPrice().toFixed(2)}`;
            const addToCartBtn = document.createElement("button");
            addToCartBtn.textContent = "Add to Cart";
            addToCartBtn.className = "btn btn-primary cartButton"; // Add the cartButton class
            addToCartBtn.addEventListener("click", () => {
                const existingCartItem = user.getCart().find((cartItem) => cartItem.getId() === item.getId());

                if (existingCartItem) {
                    // If the item already exists, increase the quantity
                    existingCartItem.increaseQuantity();
                } else {
                    // If it doesn't exist, add a new item to the cart with quantity 1
                    user.addToCart(item);
                }

                updateUI();
            });
            listItem.appendChild(addToCartBtn);
            availableItemsList.appendChild(listItem);
        });

        // Populate user's cart
        user.getCart().forEach((item) => {
            const listItem = document.createElement("li");
            const itemTotalPrice = item.getPrice() * item.getQuantity();
            listItem.textContent = `${item.getName()} (Quantity: ${item.getQuantity()})`;

            // Button to remove one item from the cart
            const removeOneBtn = document.createElement("button");
            removeOneBtn.textContent = "Remove 1";
            removeOneBtn.className = "btn btn-danger cartButton"; // Add the cartButton class
            removeOneBtn.addEventListener("click", () => {
                // Decrease the quantity by 1
                user.updateCartQuantity(item, -1); // Pass -1 to decrease by 1
                updateUI();
            });
            listItem.appendChild(removeOneBtn);

            // Button to remove the entire item from the cart
            const removeFromCartBtn = document.createElement("button");
            removeFromCartBtn.textContent = "Remove from Cart";
            removeFromCartBtn.className = "btn btn-danger cartButton"; // Add the cartButton class
            removeFromCartBtn.addEventListener("click", () => {
                user.removeFromCart(item);
                updateUI();
            });

            listItem.appendChild(removeFromCartBtn);
            userCartList.appendChild(listItem);

            totalAmount += itemTotalPrice;
        });

        // Calculate and display the total amount
        totalAmountDisplay.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateUI(); // Initial UI update

    // Get print cart button
    const printCartBtn = document.getElementById("printCartBtn");

    // Print cart
    if (printCartBtn) {
        printCartBtn.addEventListener("click", () => {
            user.printCart();
        });
    }
});