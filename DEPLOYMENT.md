# 🚀 GuildScape Deployment Guide

This guide covers deploying GuildScape to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build` to verify successful build
- [ ] Test production build locally with `npm run preview`
- [ ] Update environment variables (if any)
- [ ] Verify all routes work correctly
- [ ] Check responsive design on various devices
- [ ] Test error boundaries and 404 page

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero configuration needed
- Automatic deployments from Git
- Built-in CDN
- Free SSL certificate
- Excellent performance

**Steps:**

1. Push your code to GitHub/GitLab/Bitbucket

2. Visit [vercel.com](https://vercel.com) and sign up

3. Click "New Project" and import your repository

4. Vercel will auto-detect Vite configuration

5. Click "Deploy"

6. Your site will be live at `https://your-project.vercel.app`

**Configuration:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### Option 2: Netlify

**Advantages:**
- Simple drag-and-drop deployment
- Continuous deployment from Git
- Form handling (if needed later)
- Free tier available

**Steps:**

1. Build your project:
   ```bash
   npm run build
   ```

2. Visit [netlify.com](https://netlify.com) and sign up

3. Drag and drop the `dist` folder to Netlify

   OR

4. Connect to Git:
   - Click "New site from Git"
   - Choose your Git provider
   - Select your repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

5. Click "Deploy site"

**Netlify Configuration (`netlify.toml`):**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Steps:**

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/GuildScapePlayGround",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/GuildScapePlayGround/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

---

### Option 4: AWS S3 + CloudFront

**For production-grade deployments:**

1. Build the project:
   ```bash
   npm run build
   ```

2. Create S3 bucket and enable static website hosting

3. Upload `dist` folder contents to S3

4. Set up CloudFront distribution

5. Configure Route 53 for custom domain

**AWS CLI commands:**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### Option 5: Docker

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and run:**
```bash
docker build -t guildscape .
docker run -p 80:80 guildscape
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.production` file:

```bash
# Production API URL (when backend is ready)
VITE_API_URL=https://api.guildscape.com

# Analytics
VITE_ENABLE_ANALYTICS=true
```

### Build Optimization

Already included in `vite.config.ts`:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

---

## 🔒 Security Headers

Add to your hosting platform:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 📊 Performance Optimization

### CDN Configuration

Recommended CDN settings:
- Cache static assets for 1 year
- Use gzip/brotli compression
- Enable HTTP/2
- Set up edge caching

### Monitoring

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [Google Analytics](https://analytics.google.com) for usage metrics
- [Vercel Analytics](https://vercel.com/analytics) for performance monitoring

---

## 🔄 Continuous Deployment

### GitHub Actions Example

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## ✅ Post-Deployment

1. **Test all routes**
   - Homepage
   - Workshop
   - Library
   - Bazaar
   - Council
   - Profile
   - Guilds
   - Messages

2. **Verify functionality**
   - User interactions
   - Form submissions
   - Navigation
   - Responsive design

3. **Check performance**
   - Lighthouse audit
   - Page load times
   - Asset loading

4. **Monitor errors**
   - Check browser console
   - Review error logs
   - Test error boundary

---

## 🆘 Troubleshooting

### Routes return 404

**Solution:** Configure your hosting platform to redirect all routes to `index.html`

### Styles not loading

**Solution:** Check `base` setting in `vite.config.ts` matches your deployment path

### Assets not found

**Solution:** Verify build output and deployment directory match

### Performance issues

**Solution:**
- Enable compression
- Configure CDN caching
- Optimize images
- Review bundle size

---

## 📈 Scaling

For high-traffic scenarios:
1. Use CDN (CloudFront, Cloudflare)
2. Implement caching strategies
3. Consider code splitting for large routes
4. Enable HTTP/2 push
5. Use service workers for offline support

---

## 📞 Support

For deployment issues:
- Check hosting platform documentation
- Review build logs
- Test locally with production build
- Consult the README.md

---

**Happy Deploying! ⚔️**
