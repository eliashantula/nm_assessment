const Page = require('./page');

class CheckoutPage extends Page {


get checkoutBtn (){
	return $("a.checkout_button")
}


goToCheckOut(){
	this.checkoutBtn.click()
}

get continueBtn(){
	return $('.cart_button')
}

continueCheckoutBtn(){
	this.continueBtn.click()
}

get taxInfo(){
	return $(".summary_tax_label")

}

get taxAmount(){
	return parseFloat(this.taxInfo.getText().slice(6))
}
get summaryTotal (){
	return $(".summary_total_label")
}
 totalOnline(){
	return parseFloat(this.summaryTotal.getText().slice(8))
}

get finishCheckout (){
	return $('.cart_button')
}

finishCheckoutBtn(){
	this.finishCheckout.click()
}


get checkOutComplete(){
	return $('#checkout_complete_container')
}

get checkOutMsgConfirm(){
	return $('.complete-header').getText()
}

}



module.exports = new CheckoutPage()