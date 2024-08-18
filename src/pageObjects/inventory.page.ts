import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly pageHeader: string;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly filter: Locator;
  readonly cartBadge: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = 'div[class="app_logo"]';
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.filter = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('span[data-test="shopping-cart-badge"]');
    this.cart = page.locator('a[data-test="shopping-cart-link"]');
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async getItemDetails(
    index: number
  ): Promise<{ name: string; price: string; description: string }> {
    const item = this.inventoryItems.nth(index);
    const name = await item
      .locator('[data-test="inventory-item-name"]')
      .innerText();
    const price = await item
      .locator('[data-test="inventory-item-price"]')
      .innerText();
    const description = await item
      .locator('[data-test="inventory-item-desc"]')
      .innerText();

    return { name, price, description };
  }

  async addItemToCart(index: number): Promise<void> {
    const addItemButton = this.inventoryItems
      .nth(index)
      .locator('[data-test^="add-to-cart"]');
    await addItemButton.click();
  }
  async removeItemToCart(index: number): Promise<void> {
    const addItemButton = this.inventoryItems
      .nth(index)
      .locator('[data-test^="remove"]');
    await addItemButton.click();
  }

  async addAllItemsToCart(): Promise<void> {
    const itemCount = await this.getItemCount();
    for (let i = 0; i < itemCount; i++) {
      await this.addItemToCart(i);
    }
  }

  async isItemAddedToCart(index: number): Promise<boolean> {
    const addItemButton = this.inventoryItems
      .nth(index)
      .locator('[data-test^="remove"]');
    return addItemButton.isVisible();
  }
  async clickOnItemTitle(index: number): Promise<void> {
    const itemDetail = this.inventoryItems
      .nth(index)
      .locator('[data-test^="inventory-item-name"]');
    await itemDetail.click();
  }
  async selectFilter(option: string): Promise<void> {
    await this.filter.selectOption(option);
  }
  async getItemPrice(index: number): Promise<string> {
    const itemPrice = this.inventoryItems
      .nth(index)
      .locator('[data-test="inventory-item-price"]');
    return (await itemPrice.innerText()).replace("$", "");
  }
  async getCartItemCount(): Promise<number> {
    return parseFloat(await this.cartBadge.innerText());
  }
  async clickOnCart(): Promise<void> {
    await this.cart.click();
  }
}
