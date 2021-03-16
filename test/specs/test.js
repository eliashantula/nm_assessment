const assert = require("assert");
import LoginPage from'../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import UserInfo from '../pageobjects/userinfo.page'
describe("Saucelabs Testcase", function () {
	const selectedItems = [];
	it("Should login with valid credentials", () => {
		LoginPage.open()
		LoginPage.login("standard_user", "secret_sauce")
		LoginPage.submit()
		const loggedinPageUrl = "https://www.saucedemo.com/inventory.html";
		const currentUrl = browser.getUrl();
		assert.equal(currentUrl, loggedinPageUrl);
	});

	it("should sort products from low-high price", () => {
		InventoryPage.itemdropdown.waitForExist(5000);
		InventoryPage.itemdropdown.selectByAttribute("value", "lohi");
		const prices = InventoryPage.generatePriceList()
		const pricesCheck = [...prices].sort((a, b) => {
			return a - b;
		});

		const checkSort =
			prices.length === pricesCheck.length &&
			prices.every((v, i) => v === pricesCheck[i]);

		assert.equal(true, checkSort);
	});

	it("should add 2 or more products to the shopping cart", () => {
		const items = Math.floor(Math.random() * (6 - 2) + 2);
		for (let i = 0; i < items; i++) {
			InventoryPage.inventoryItems[i].$(".btn_inventory").click();
			selectedItems.push(
				InventoryPage.inventoryItems[i].$("a > .inventory_item_name").getText()
			);
		}

	});

	it("should visit the shopping cart and reflect the correct items are added to the cart", () => {
	
		CartPage.checkCart()
		
		const checkCartContents = CartPage.getCartInfo()

		const cartCheck =
			checkCartContents.length === selectedItems.length &&
			checkCartContents.every((v, i) => v === selectedItems[i]);
		assert.equal(true, cartCheck);
	});
	it("should remove item and return to shopping", () => {
		selectedItems.splice(0, 1);
		CartPage.removeItem()
		CartPage.continueShopping()
		const currentUrl = browser.getUrl();
		assert.equal(currentUrl, "https://www.saucedemo.com/inventory.html");
	});

	it("should add another item", () => {
		const oldCartCount = parseInt(CartPage.cartCount);
		const availableItems = InventoryPage.remainingItems()
		InventoryPage.addItem(availableItems[0])
		selectedItems.push(
			InventoryPage.itemName(availableItems[0]).getText()
		);
		const newCartCount = parseInt(CartPage.cartCount);

		assert.equal(oldCartCount + 1, newCartCount);
	});

	it("should checkout with the correct items", () => {
		CartPage.goToShoppingCart()
		CheckoutPage.goToCheckOut();
		UserInfo.fillForm("Elias", "Hantula", "10012")
		CheckoutPage.continueCheckoutBtn();
		browser.setTimeout({ pageLoad: 10000 });
		let checkOutItems = CartPage.getCartInfo()

		const checkoutCheck =
			checkOutItems.length === selectedItems.length &&
			checkOutItems.every((v, i) => v === selectedItems[i]);
		assert.equal(true, checkoutCheck);
	});
	it("should calculate the total price correctly in checkout", () => {
		const tax = CheckoutPage.taxAmount;
		let correctTotal = CartPage.calculateCorrectTotal(tax, 0, 0)

		const onlineTotal = CheckoutPage.totalOnline()

		assert.equal(correctTotal, onlineTotal);
	});

	it("should complete the checkout process successfully",()=>{


		CheckoutPage.finishCheckoutBtn()
CheckoutPage.checkOutComplete.waitForExist()
    const thankMessage = "THANK YOU FOR YOUR ORDER"
    assert.equal(thankMessage,CheckoutPage.checkOutMsgConfirm)
			})
});
