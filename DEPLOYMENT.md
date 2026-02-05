# How to Deploy AlyeskaNext for Free

The best way to deploy a Next.js application for free is used **Vercel** (the creators of Next.js). It offers a generous "Hobby" tier that costs $0 forever.

## Prerequisites
1. A GitHub account.
2. The code pushed to a GitHub repository.

# How to Deploy to GitHub Pages (Free)

I have configured the app to auto-deploy to GitHub Pages.

## Steps

### 1. Push to GitHub
Create a **Public** repository named `heli-weather`.
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/heli-weather.git
git branch -M main
git push -u origin main
```

### 2. Configure Settings
1. Go to your Repository on GitHub.
2. Settings -> Pages.
3. **Build and deployment**: Select **GitHub Actions** (Beta) from the dropdown.

### 3. Verify
- The "Deploy to GitHub Pages" action will run automatically after push.
- Your site will satisfy: `https://<username>.github.io/heli-weather/`

> [!IMPORTANT]
> Since we set `basePath: "/heli-weather"`, local development (`npm run dev`) will now be at `http://localhost:3000/heli-weather`.


## Alternative: Netlify
Netlify also offers a free tier for Next.js.
1. Login to Netlify with GitHub.
2. "Import from Git".
3. Select repo.
4. Deploy.

> [!NOTE]
> Vercel is recommended as it supports Next.js features (like ISR/Revalidation) natively with slightly better performance on the free tier.
