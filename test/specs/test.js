const assert = require("assert");
 
describe("Saucelabs Testcase", function() {
	const selectedItems = []
    it("Should login with valid credentials", ()=> {
         browser.url("https://www.saucedemo.com/");
        $("#user-name").setValue("standard_user");
        $("#password").setValue("secret_sauce");
       $("#login-button").click();
       const loginPageUrl = 'https://www.saucedemo.com/inventory.html'
       const currentUrl = browser.getUrl()
       assert.equal(currentUrl,loginPageUrl)
         
        


        
    });
        
     it("should sort products from low-high price", ()=>{
     	$('.product_sort_container').waitForExist(5000)
     $('.product_sort_container').selectByAttribute("value","lohi")
      const prices = $$('.inventory_item_price').map(price=>{
      	return parseFloat(price.getAttribute('innerText').slice(1))
      })
      const pricesCheck = [...prices].sort((a,b)=>{
      	return a-b
      })

      const checkSort = prices.length === pricesCheck.length && prices.every((v,i)=> v === pricesCheck[i])


      assert.equal(true, checkSort)


     })

     it('should add 2 or more products to the shopping cart', ()=>{
	 const items = Math.floor(Math.random() * (6-2) + 2)
    
      const inventory_list = $('.inventory_list')
     let allItems = inventory_list.$$('.inventory_item')
 
     for (let i = 0; i < items; i++){

     	allItems[i].$('.pricebar').$('.btn_inventory').click()
     	selectedItems.push(allItems[i].$('a > .inventory_item_name').getText())


     }

     console.log(selectedItems, "***********123**************************************************************************************************************************************")
     })

   it('should visit the shopping cart and reflect the correct items are added to the cart', ()=>{
   $('.shopping_cart_link').click()
  /* const currentUrl = browser.getUrl()*/
   const checkCount = $('.cart_list').$$('.cart_item').map(item=>{
   	return item.$('.cart_item_label > a > .inventory_item_name').getText()
   })

const cartCheck = checkCount.length === selectedItems.length && checkCount.every((v,i)=> v === selectedItems[i])
assert.equal(true,cartCheck)
   })
   it('should remove item and return to shopping',()=>{

$('.cart_list').$$('.cart_item')[0].$('.cart_item_label > .item_pricebar > .cart_button').click()
selectedItems.splice(0,1)
$('.cart_footer > .btn_secondary').click()
 


   })

   it('should add another item',()=>{
   	const oldCartCount = parseInt($('.shopping_cart_badge').getText())
   	const currentUrl = browser.getUrl()
   	assert.equal(currentUrl,'https://www.saucedemo.com/inventory.html')
   let availableItems =	$('.inventory_list').$$('.inventory_item').filter((item,i)=>{
   	return item.$('.pricebar > .btn_inventory').getText() === "ADD TO CART"
   })
      availableItems[0].$('.pricebar > .btn_inventory').click()
      selectedItems.push(availableItems[0].$('a > .inventory_item_name').getText())
      const newCartCount = parseInt($('.shopping_cart_badge').getText())
   
     assert.equal(oldCartCount +1, newCartCount)
   })

   it('should checkout with the correct items',()=>{
   $('.shopping_cart_link').click()
   $('.checkout_button').click()
   $('#first-name').setValue('Elias')
   $('#last-name').setValue('Hantula')
   $('#postal-code').setValue('10012')
   $('.checkout_buttons > .cart_button').click()
   browser.setTimeout({ 'pageLoad': 10000 })

   console.log(browser.getUrl(), "************************")
   let checkOutItems = $('.cart_list').$$('.cart_item').map((item,i)=>{
 
   	return item.$('a > .inventory_item_name').getText()
   })

const checkoutCheck = checkOutItems.length === selectedItems.length && checkOutItems.every((v,i)=> v === selectedItems[i])
assert.equal(true, checkoutCheck)
   })
  it('should calculate the total price correctly in checkout', ()=>{
   const tax = parseFloat($('.summary_tax_label').getText().slice(6))

   let total=0;
   total += tax
   $('.cart_list').$$('.cart_item').forEach(item=>{
  
      total+= parseFloat(item.$('.cart_item_label').$('.inventory_item_price').getAttribute('innerText').slice(1))
   })
    const onlineTotal = parseFloat($('.summary_total_label').getText().slice(8))

     assert.equal(total,onlineTotal)



  })
});