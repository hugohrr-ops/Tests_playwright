const { test, expect } = require('@playwright/test');
const { login } = require('../../pages/login');

test('Login exitoso', async ({ page }) => {

    const loginPage = new login(page);
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');

    // Verificar que el login fue exitoso
    await expect(page.locator('.title')).toHaveText('Products');
});

test('Login fallido', async ({ page }) => {

    const loginPage = new login(page);
    await loginPage.navegar();
    await loginPage.login('standard_user', 'wrong_password');

    // Verificar que el login falló
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('logout exitoso', async ({ page }) => {

    const loginPage = new login(page);
    await loginPage.navegar();
    await loginPage.login('standard_user', 'secret_sauce');
    // Verificar que el login fue exitoso
    await expect(page.locator('.title')).toHaveText('Products');
    // Cerrar sesión
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    // Verificar que se ha cerrado sesión
    await expect(page.locator('#login-button')).toBeVisible();
});
