import { InventoryPage } from "@pages/inventory.page";
import {
  testBase,
  testWithLogedIn,
  globalConfig,
  expect,
} from "../../test-setup";

testWithLogedIn(
  "should display all inventory items",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    const itemCount = await inventoryPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0); // Ensure there are items present
  }
);

testWithLogedIn(
  "should add a specific item to the cart",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCart(0);

    const isAdded = await inventoryPage.isItemAddedToCart(0);
    expect(isAdded).toBeTruthy();
  }
);

testWithLogedIn(
  "should get item details and validate",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    const itemDetails = await inventoryPage.getItemDetails(0);

    expect(itemDetails.name).toBe("Sauce Labs Backpack");
    expect(itemDetails.price).toBe("$29.99");
    expect(itemDetails.description).toContain(
      "carry.allTheThings() with the sleek, streamlined Sly Pack"
    );
  }
);

testWithLogedIn(
  "should correctly filter items by price (low to high)",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    // Select "Price (low to high)" from the filter dropdown
    await inventoryPage.selectFilter("Price (low to high)");

    const firstItemPrice = await inventoryPage.getItemPrice(0);
    const secondItemPrice = await inventoryPage.getItemPrice(1);
    expect(parseFloat(firstItemPrice)).toBeLessThanOrEqual(
      parseFloat(secondItemPrice)
    );
  }
);

testWithLogedIn(
  "should allow removing an item from the cart",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    // Add the first item to the cart
    await inventoryPage.addItemToCart(0);

    // Verify that the item was added
    expect(await inventoryPage.isItemAddedToCart(0)).toBeTruthy();

    // Remove the item from the cart
    await inventoryPage.removeItemToCart(0);

    // Verify that the item was removed
    expect(await inventoryPage.isItemAddedToCart(0)).toBeFalsy();
  }
);
testWithLogedIn(
  "should update the cart icon when an item is added",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCart(0);

    const initialCartCount = await inventoryPage.getCartItemCount();

    await inventoryPage.addItemToCart(1);

    const updatedCartCount = await inventoryPage.getCartItemCount();
    expect(updatedCartCount).toBe(initialCartCount + 1);
  }
);

testWithLogedIn(
  "should allow adding all items to the cart",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addAllItemsToCart();

    const itemCount = await inventoryPage.getItemCount();
    for (let i = 0; i < itemCount; i++) {
      const isAdded = await inventoryPage.isItemAddedToCart(i);
      expect(isAdded).toBeTruthy();
    }
  }
);
testWithLogedIn(
  "should navigate to the item details page when clicking on the item title",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.clickOnItemTitle(0);

    expect(page.url()).toContain("/inventory-item.html");
  }
);
testWithLogedIn(
  "should navigate to the cart details page when clicking on cart icon",
  async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.clickOnCart();

    expect(page.url()).toContain("/cart.html");
  }
);
