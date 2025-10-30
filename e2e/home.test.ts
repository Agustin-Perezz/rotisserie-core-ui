import { expect, test } from '@playwright/test';

test('Home page', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Hola!, como andas ?' })
  ).toBeVisible();
  await expect(page.getByTestId('navigate-login-button')).toBeVisible();
});
