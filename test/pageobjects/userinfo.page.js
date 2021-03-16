const Page = require("./page");

class UserInfo extends Page {
	get firstName() {
		return $("#first-name");
	}

	get lastName() {
		return $("#last-name");
	}

	get zipCode() {
		return $("#postal-code");
	}

	fillForm(firstName, lastName, zipCode) {
		this.firstName.setValue(firstName);
		this.lastName.setValue(lastName);
		this.zipCode.setValue(zipCode);
	}
}

module.exports = new UserInfo();
