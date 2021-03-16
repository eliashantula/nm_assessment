const Page = require('./page');


class InventoryPage extends Page {


get itemdropdown (){

return $(".product_sort_container")


}

get inventory () {
	return $(".inventory_list")
}



get inventoryItems (){
	return $(".inventory_list").$$(".inventory_item")
}


get inventoryPrices (){
	return $$(".inventory_item_price")
}

get price (){
	return $(".pricebar")
}

get addItemBtn(){ return $(".pricebar > .btn_inventory")}

itemName (element){
	return element.$("a > .inventory_item_name")
}



addItem(element) {

    element.$(".pricebar > .btn_inventory").click()

}


remainingItems() {
return this.inventoryItems.filter((item) => {  
					 return item.$('.btn_inventory').getText() === "ADD TO CART"
				
			});





}

generatePriceList(){

	return this.inventoryPrices.map((price) => {
			return parseFloat(price.getAttribute("innerText").slice(1));
		});
}

}



module.exports = new InventoryPage()
