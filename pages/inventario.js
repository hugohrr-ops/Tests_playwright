class inventario {
    constructor(page) {
        this.page = page;

        //navegar
        this.pagina = page.locator('.title');
        this.productos = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('.btn_inventory');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.filtros = page.locator('[data-test="product-sort-container"]');
        this.precio = page.locator('.inventory_item_price');
        this.catalogo = page.locator('.inventory_list');

        //carrito
        this.productosCarrito = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.deleteItemButtons = page.locator('.cart_button, .btn_secondary');
        this.cantidadProductosCarrito = page.locator('.cart_item').count();
        this.precioUnidad = page.locator('.cart_item_price');
        this.precioTotal = page.locator('.summary_total_label');

    }

    async añadirProductosAlCarrito(index = 0) {
        await this.addToCartButtons.nth(index).click();
    }

    async EntrarCarrito() {
        await this.cartIcon.click();
    }

    async eliminarProductoDelCarrito(index = 0) {
        await this.deleteItemButtons.nth(index).click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async CerrarSesion() {
        await this.page.click('#react-burger-menu-btn');
        await this.page.click('#logout_sidebar_link');
    }
}

module.exports = { inventario };