# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npx tailwindcss -i ./public/css/iapp.css -o ./public/css/app.css
npx tailwindcss -i ./public/css/imain.css -o ./public/css/main.css
npm run init-db
npm run dev
```

## Production

Build the application for production:

```bash
npx tailwindcss -i ./public/input.css -o ./public/output.css
npm run init-db
npm run build
```
