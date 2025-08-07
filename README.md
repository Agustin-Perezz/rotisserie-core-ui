# Svelte Template

Minimal SvelteKit template with Firebase, Tailwind CSS, TypeScript, Playwright, and CI/CD via GitHub Actions.

## Technologies

- SvelteKit
- TypeScript
- Tailwind CSS
- Firebase JS SDK
- Playwright (E2E testing)
- ESLint & Prettier
- Husky (Git hooks)
- Vite
- Axios

## Getting Started

Install dependencies:

```
pnpm install
```

Start the development server:

```
pnpm run dev
```

Build for production:

```
pnpm run build
```

Preview the production build:

```
pnpm run preview
```

Lint and format code:

```
pnpm run lint
pnpm run format
```

Run type checks:

```
pnpm run check
```

Run E2E tests:

```
pnpm run test
```

## Environment Variables

Set the following variables in your .env file:

```
VITE_API_BASE_URL=your_base_api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

## CI/CD

GitHub Actions workflow runs on push to main:

- Installs dependencies
- Lints and formats code
- Runs type checks
- Installs Playwright browsers
- Runs E2E tests
- Builds the app
- Deploys to GitHub Pages

## Husky Git Hooks

- pre-commit: runs lint-staged
- pre-push: runs tests
