class infoCompra {
    constructor(page) {
        this.page = page;

        this.nombre = page.locator('[data-test="firstName"]');
        this.apellido = page.locator('[data-test="lastName"]');
        this.codigoPostal = page.locator('[data-test="postalCode"]');
        this.continuarButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmacionCompra = page.locator('.complete-header');
    }

    async ingresarInfoCompra(nombre, apellido, codigoPostal) {
        await this.nombre.fill(nombre);
        await this.apellido.fill(apellido);
        await this.codigoPostal.fill(codigoPostal);
        await this.continuarButton.click();
    }   

    async finalizarCompra() {
        await this.finishButton.click();
    }
}

module.exports = { infoCompra };