# 🚀 Deployment Guide - Betting Tracker

This guide will help you deploy your Betting Tracker application to Vercel and other platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Vercel account (free at [vercel.com](https://vercel.com))

## 🎯 Option 1: Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your repository

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Step 3: Deploy via Vercel CLI (Alternative)

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy from project directory**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Confirm settings
   - Deploy

## 🎯 Option 2: Deploy to Netlify

### Step 1: Create netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Or connect your Git repository

## 🎯 Option 3: Deploy to GitHub Pages

### Step 1: Update vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add this line
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
```

### Step 2: Deploy
1. Build your project: `npm run build`
2. Push to GitHub
3. Go to Settings > Pages
4. Set source to GitHub Actions
5. Create `.github/workflows/deploy.yml`

## 🔧 Environment Variables (If Needed)

If you need environment variables:

### Vercel
1. Go to Project Settings > Environment Variables
2. Add your variables
3. Redeploy

### Netlify
1. Go to Site Settings > Environment Variables
2. Add your variables
3. Redeploy

## 📱 PWA Configuration

Your app is already configured as a PWA with:
- ✅ Manifest file (`public/manifest.json`)
- ✅ Service worker ready
- ✅ Mobile-optimized
- ✅ Installable on mobile devices

## 🚀 Post-Deployment Checklist

- [ ] Test all features on live site
- [ ] Verify mobile responsiveness
- [ ] Test PWA installation
- [ ] Check data persistence (localStorage)
- [ ] Test import/export functionality
- [ ] Verify sample data loading

## 🔍 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues
- Ensure `vercel.json` has proper rewrites
- Check that React Router is configured correctly

### Mobile Issues
- Test on real devices, not just browser dev tools
- Check PWA manifest and service worker

## 📊 Performance Optimization

Your app is already optimized with:
- ✅ Code splitting (Vite)
- ✅ Tree shaking
- ✅ Minified CSS/JS
- ✅ Optimized images
- ✅ Mobile-first design

## 🔒 Security Notes

- All data is stored locally (localStorage)
- No backend server required
- No sensitive data transmitted
- PWA works offline

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version is 18+
4. Check Vercel build logs

---

**Your Betting Tracker is now ready for deployment! 🎉** 