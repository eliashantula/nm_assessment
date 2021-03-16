const Page = require('./page');





class CartPage extends Page {
get shoppingCartButton () {
	return $(".shopping_cart_link")
}


get cartItems (){
	return $(".cart_list").$$(".cart_item")
}

get cartItemName (){
	return $(".cart_item_label > a > .inventory_item_name")
}

get cartCount (){
	return $(".shopping_cart_badge").getText()
}

checkCart (){
	 this.shoppingCartButton.click()
}


getCartInfo (){
	return this.cartItems.map((item) => {
				return item
					.$(".cart_item_label > a > .inventory_item_name").getText();
			});
}

removeItem(){
	$(".cart_list")
			.$$(".cart_item")[0]
			.$(".cart_item_label > .item_pricebar > .cart_button")
			.click();
}

get continueShoppingBtn(){
	return $("a.btn_secondary")
}

continueShopping(){
	 this.continueShoppingBtn.click()
}

goToShoppingCart (){
this.shoppingCartButton.click()
}

calculateCorrectTotal(tax,total,shipping=0){
total+= tax + shipping
this.cartItems.forEach((item) => {
				total += parseFloat(
					item
						.$(".cart_item_label")
						.$(".inventory_item_price")
						.getAttribute("innerText")
						.slice(1)
				);
			});
return total
}
}


module.exports = new CartPage()