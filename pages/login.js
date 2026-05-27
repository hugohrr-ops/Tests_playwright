class login {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginbutton = page.locator('#login-button');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbutton.click();
    }

    async navegar() {
        await this.page.goto('https://www.saucedemo.com/');
    }
}

module.exports = { login };