const Page = require('./page');


class LoginPage extends Page {
    
    get username () { return $('#user-name') }
    get password () { return $('#password') }
    get submitBtn () { return $('#login-button') }

    
    login (username, password) {
        this.username.setValue(username);
        this.password.setValue(password);
       
    }

   submit() {
       this.submitBtn.click()
   }
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
