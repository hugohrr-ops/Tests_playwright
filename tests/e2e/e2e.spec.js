const { test, expect} = require('@playwright/test');
const { login } = require('../../pages/login');
const { inventario } = require('../../pages/inventario');
const { infoCompra } = require('../../pages/infoCompra');

test('añadir producto al carrito', async ({ page }) => {
    const loginPage = new login(page);
    const invent = new inventario(page);

    //login
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    //añadir producto al carrito
    await invent.añadirProductosAlCarrito();
    await invent.EntrarCarrito();

    //verificar que el producto se añadió al carrito
    await expect(invent.productosCarrito).toHaveCount(1);
});

test('eliminar producto del carrito', async ({ page }) => {
    const loginPage = new login(page);
    const invent = new inventario(page);

    //login
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    //eliminar producto del carrito
    await invent.añadirProductosAlCarrito();
    await invent.EntrarCarrito();
    await invent.eliminarProductoDelCarrito();

    //verificar que el producto se eliminó del carrito
    await expect(invent.productosCarrito).toHaveCount(0);
});

test('filtrar productos por precio', async ({ page }) => {
    const loginPage = new login(page);
    const invent = new inventario(page);

    //login
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    //filtrar productos por precio
    await invent.filtros.selectOption('lohi');

    //verificar que los productos se filtraron por precio de menor a mayor
    const precios = await invent.precio.allTextContents();
    const preciosNumericos = precios.map(precio => parseFloat(precio.replace('$', '')));
    const preciosOrdenados = [...preciosNumericos].sort((a, b) => a - b);
    expect(preciosNumericos).toEqual(preciosOrdenados);
});

test('realizar compra', async ({ page }) => {
    const loginPage = new login(page);
    const invent = new inventario(page);
    const info = new infoCompra(page);

    //login
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    //realizar compra
    await invent.añadirProductosAlCarrito();
    await invent.EntrarCarrito();
    await invent.checkout();
    await info.ingresarInfoCompra('John', 'Doe', '12345');
    await info.finalizarCompra();
});

test('vaciar carrito', async ({ page }) => {
    const loginPage = new login(page);
    const invent = new inventario(page);

    //login
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    //vaciar carrito
    await invent.añadirProductosAlCarrito(0);
    await invent.añadirProductosAlCarrito(1);
    await expect(invent.cartIcon).toHaveText('2');
    await invent.EntrarCarrito();
    await invent.eliminarProductoDelCarrito(0);
    await invent.eliminarProductoDelCarrito(0);

    //verificar que el carrito esté vacío
    await expect(invent.productosCarrito).toHaveCount(0);
});

test('el carrito se mantiene después de reiniciar la pagina', async ({ page }) => {
    const loginPage = new login(page);
    const invent = new inventario(page);

    //login
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    //añadir producto al carrito
    await invent.añadirProductosAlCarrito();
    await invent.EntrarCarrito();
    await expect(invent.productosCarrito).toHaveCount(1);

    //reiniciar la pagina
    await page.reload();

    //verificar que el producto sigue en el carrito
    await expect(invent.productosCarrito).toHaveCount(1);
});