import { test, expect } from '@playwright/test';

test('Famosos en Granada box', async ({ page }) => {
  await page.goto('/');

  // There is no login in e2e tests, so we need to mock the user session.
  // We can do this by setting a cookie.
  await page.context().addCookies([
    {
      name: 'sb-access-token',
      value: 'your-test-access-token',
      domain: 'localhost',
      path: '/',
    },
  ]);

  await page.goto('/');

  // Click the settings button
  await page.getByLabel('settings').click();

  // Change the frequency to daily
  await page.getByLabel('Frecuencia').selectOption('daily');

  // Change the time
  await page.getByLabel('Hora').fill('10:00');

  // Save the changes
  await page.getByRole('button', { name: 'Guardar Cambios' }).click();

  // Reopen the settings modal and verify that the changes were saved
  await page.getByLabel('settings').click();
  await expect(page.getByLabel('Frecuencia')).toHaveValue('daily');
  await expect(page.getByLabel('Hora')).toHaveValue('10:00');
  await page.getByRole('button', { name: 'Cancelar' }).click();

  // Click the "Ejecutar" button
  await page.getByRole('button', { name: 'Ejecutar' }).click();

  // Check that the "Última ejecución" text is updated
  await expect(page.getByText(/Última ejecución:/)).toBeVisible();
});
