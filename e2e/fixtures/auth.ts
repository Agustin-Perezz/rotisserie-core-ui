import { test as base, Page } from '@playwright/test';

export async function setupAuthenticatedPage(page: Page) {
  await page.route('**/identitytoolkit.googleapis.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        kind: 'identitytoolkit#GetAccountInfoResponse',
        users: [
          {
            localId: 'test-user-id',
            email: 'test@example.com',
            displayName: 'Test User',
            emailVerified: true,
            idToken: 'mock-id-token'
          }
        ]
      })
    });
  });

  await page.route('**/securetoken.googleapis.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'mock-access-token',
        expires_in: '3600',
        token_type: 'Bearer',
        refresh_token: 'mock-refresh-token',
        id_token: 'mock-id-token',
        user_id: 'test-user-id',
        project_id: 'test-project'
      })
    });
  });

  await page.addInitScript((apiKey) => {
    const mockAuthData = {
      uid: 'test-user-id',
      email: 'test@example.com',
      emailVerified: true,
      displayName: 'Test User',
      isAnonymous: false,
      providerData: [
        {
          providerId: 'google.com',
          uid: 'test-user-id',
          displayName: 'Test User',
          email: 'test@example.com',
          photoURL: null,
          phoneNumber: null
        }
      ],
      stsTokenManager: {
        refreshToken: 'mock-refresh-token',
        accessToken: 'mock-access-token',
        expirationTime: Date.now() + 3600000
      },
      createdAt: Date.now().toString(),
      lastLoginAt: Date.now().toString(),
      apiKey: apiKey,
      appName: '[DEFAULT]'
    };

    const key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    localStorage.setItem(key, JSON.stringify(mockAuthData));
  }, process.env.VITE_FIREBASE_API_KEY);
}

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await setupAuthenticatedPage(page);
    await use(page);
  }
});

export { expect } from '@playwright/test';
