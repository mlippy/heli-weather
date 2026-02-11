# How to Deploy Heli-Vibe for Free

This project is a static React application built with Vite. It can be deployed to any static hosting provider.

## Recommended: GitHub Pages

The easiest way to deploy is using GitHub Pages.

### 1. Push to GitHub
Ensure your code is pushed to a GitHub repository.

### 2. Configure Settings
1. Go to your Repository on GitHub.
2. Select **Settings** > **Pages**.
3. **Build and deployment**: Select **GitHub Actions** from the source dropdown.
4. GitHub will suggest a "Static HTML" workflow or you can use a custom one for Vite.

### 3. Workflow for Vite
Create a file `.github/workflows/deploy.yml` with the following content (if not already present):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Alternative: Vercel / Netlify

You can also deploy to Vercel or Netlify by importing your Git repository. They will automatically detect Vite and configure the build settings:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
