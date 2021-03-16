import LoginPage from'../pageobjects/login.page'
module.exports = class Page {
   
    open (path) {
        return browser.url("https://www.saucedemo.com/")
    }
}
