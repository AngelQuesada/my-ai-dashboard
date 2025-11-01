import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');

  // Fill in the email address
  await page.getByLabel('Email').fill('test@example.com');

  // Click the "Send Magic Link" button
  await page.getByRole('button', { name: 'Send Magic Link' }).click();

  // Check that the confirmation message is displayed
  await expect(
    page.getByText('Please check your email for the magic link.')
  ).toBeVisible();
});
