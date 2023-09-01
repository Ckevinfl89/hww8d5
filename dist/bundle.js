/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

class User {
    constructor(name, age) {
        this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.name = name;
        this.age = age;
        this.cart = [];
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getCart() {
        return this.cart;
    }
    addToCart(item) {
        this.cart.push(item);
    }
    removeFromCart(item) {
        this.cart = this.cart.filter((cartItem) => cartItem.getId() !== item.getId());
        item.resetQuantity();
    }
    updateCartQuantity(item, quantity) {
        const cartItem = this.cart.find((cartItem) => cartItem.getId() === item.getId());
        if (cartItem) {
            if (quantity > 0) {
                cartItem.increaseQuantity(quantity);
            }
            else if (quantity < 0) {
                cartItem.decreaseQuantity(Math.abs(quantity));
            }
        }
    }
    cartTotal() {
        return this.cart.reduce((total, item) => total + item.getPrice() * item.getQuantity(), 0);
    }
    printCart() {
        console.log(`Receipt for ${this.name}:\n`);
        console.log("Item Name".padEnd(50) + "Quantity".padEnd(15) + "Price");
        console.log("=".repeat(80));
        const printedItems = new Set();
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



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Shop: () => (/* binding */ Shop)
/* harmony export */ });
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

class Shop {
    constructor() {
        this.items = [];
        const boxenOfDoughnuts = new _item__WEBPACK_IMPORTED_MODULE_0__.Item("Dozen Doughnuts", 7.99, "Buy the holes too. Don't leave em hangin'.");
        const canOpener = new _item__WEBPACK_IMPORTED_MODULE_0__.Item("The opener of cans", 1.99, "Has spinny blades with handles.");
        const cheese = new _item__WEBPACK_IMPORTED_MODULE_0__.Item("Tillamook Cheese: Medium", 8.99, "Medium. Solid creamy goodness.");
        this.items.push(boxenOfDoughnuts, canOpener, cheese);
    }
    getItems() {
        return this.items;
    }
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Item: () => (/* binding */ Item)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

class Item {
    constructor(name, price, description, quantity = 1) {
        this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity >= 0 ? quantity : 0; // Ensure quantity is non-negative
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
    getQuantity() {
        return this.quantity;
    }
    increaseQuantity(amount = 1) {
        if (amount > 0) {
            this.quantity += amount;
        }
    }
    decreaseQuantity(amount = 1) {
        if (amount > 0) {
            this.quantity = Math.max(0, this.quantity - amount);
        }
    }
    resetQuantity() {
        this.quantity = 1;
    }
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _shop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


// Create instances of Shop and User
const shop = new _shop__WEBPACK_IMPORTED_MODULE_1__.Shop();
const user = new _user__WEBPACK_IMPORTED_MODULE_0__.User("Mr.Man", 35);
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
                }
                else {
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

})();

/******/ })()
;