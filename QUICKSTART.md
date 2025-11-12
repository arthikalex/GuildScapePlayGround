# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

```bash
# Clone the repository (if not already done)
git clone https://github.com/arthikalex/GuildScapePlayGround.git
cd GuildScapePlayGround

# Install dependencies
npm install

# Verify no security issues
npm audit
# Should show: found 0 vulnerabilities
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

## First Time Setup Verification

### 1. Check the Build
```bash
npm run build
```
You should see:
```
✓ Compiled successfully
Route (app)                              Size     First Load JS
┌ ○ /                                    2.32 kB         112 kB
├ ○ /council                             3.22 kB         104 kB
├ ○ /forum                               4.21 kB         105 kB
├ ○ /library                             4.34 kB         101 kB
├ ○ /treasury                            5.43 kB         102 kB
└ ○ /workshop                            5.11 kB         106 kB
```

### 2. Start Dev Server
```bash
npm run dev
```
Should see:
```
✓ Ready in 2.8s
- Local:        http://localhost:3000
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

You should land on **The Great Hall** with:
- Personal shield showing "Emma Rodriguez" (Elder tier, 2400 reputation)
- Six-dimensional progress wheel
- Notice board with active proposals
- Navigation portals to other spaces

## Quick Navigation Tour

### 1. Great Hall - `/`
The main dashboard. Try:
- Hover over the progress wheel segments
- Click on navigation portals to explore other spaces

### 2. Workshop - `/workshop`
Artwork management. Try:
- Browse the gallery (filter by category)
- Click "Upload Artwork" button
- Switch to "Analytics" tab

### 3. Council Chamber - `/council`
Governance and voting. Try:
- Filter proposals by category
- Click a proposal to see details
- Vote "Approve" on a proposal (you can only vote once)

### 4. Library - `/library`
Badges and learning. Try:
- Filter badges by category
- Toggle "Earned" and "Unearned" filters
- Switch to "Resources" tab

### 5. Treasury - `/treasury`
Economics and analytics. Try:
- View revenue trends chart
- Check top performing artworks
- Review traffic sources

### 6. Forum Courtyard - `/forum`
Community discussions. Try:
- Click a thread to read posts
- Upvote posts (wax seal icon)
- Click "Reply" button

## Testing the Application

### Basic Smoke Test (5 minutes)
1. ✅ Great Hall loads without errors
2. ✅ Navigate to all 6 spaces
3. ✅ Click at least one interactive element on each page
4. ✅ Check browser console - should have no red errors

### Interactive Features Test (15 minutes)
1. ✅ Vote on a proposal in Council Chamber
2. ✅ Toggle favorites in Workshop gallery
3. ✅ Filter badges in Library
4. ✅ Upvote posts in Forum
5. ✅ Open and close modals

### Responsive Test (10 minutes)
1. ✅ Open Chrome DevTools (F12)
2. ✅ Click "Toggle device toolbar" (Ctrl+Shift+M)
3. ✅ Test on:
   - Mobile (375x667) - should see bottom tab nav
   - Tablet (768x1024) - adjusted layouts
   - Desktop (1920x1080) - full desktop view

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive testing.

## Common Issues & Solutions

### Issue: Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build fails
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint issues
npm run lint
```

### Issue: Styles not loading
```bash
# Rebuild CSS
rm -rf .next
npm run dev
```

## Development Tips

### Hot Reload
Next.js has Fast Refresh enabled by default:
- Save any file to see changes instantly
- Component state is preserved
- Only the changed component re-renders

### Debugging
1. **React DevTools**: Install browser extension
2. **Console Logs**: Check browser console for errors
3. **Network Tab**: Monitor API calls (none in this version)
4. **React Error Overlay**: Shows errors in development mode

### Project Structure
```
app/               # Pages (Next.js App Router)
  page.tsx         # Great Hall
  workshop/        # Workshop page
  council/         # Council page
  library/         # Library page
  treasury/        # Treasury page
  forum/           # Forum page

components/        # Reusable components
  ui/             # UI primitives (Button, Card, Modal)
  layout/         # Layout components (Nav, Footer)

hooks/            # Custom React hooks
data/             # Mock data
```

## Mock Data Overview

All data is hardcoded in `data/mockData.ts`:

- **Current User**: Emma Rodriguez (Elder, 2400 rep)
- **Users**: 8 users across 5 tiers
- **Artworks**: 20 pieces with quality ratings
- **Proposals**: 12 governance proposals
- **Badges**: 40 total (25 earned, 15 in progress)
- **Forum Threads**: 40 threads with replies
- **Revenue Data**: 6 months of mock analytics

### Modifying Mock Data

To change the current user or add data:
1. Open `data/mockData.ts`
2. Edit the relevant arrays/objects
3. Save and the app will hot-reload

Example - Change current user reputation:
```typescript
// In data/mockData.ts, find:
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Emma Rodriguez',
    reputation: 2400,  // Change this number
    // ...
  }
]
```

## Environment Setup (Optional)

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Performance Monitoring

### Lighthouse Audit
```bash
# Build production version
npm run build
npm start

# In Chrome:
# 1. Open DevTools (F12)
# 2. Go to "Lighthouse" tab
# 3. Click "Generate report"
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

## Security

### Current Status
✅ **Updated to Next.js 14.2.33** (all critical vulnerabilities fixed)
✅ **0 vulnerabilities** in dependencies

### Regular Checks
```bash
# Check for vulnerabilities weekly
npm audit

# Update dependencies monthly
npm update
npm audit fix
```

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms
- **Netlify**: Connect GitHub repo, auto-deploys on push
- **Railway**: Simple deployment with CLI
- **Docker**: See Dockerfile (if created)

## Need Help?

1. **Check Console**: Browser DevTools → Console tab
2. **Check Logs**: Terminal where `npm run dev` is running
3. **Read Docs**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
4. **Testing Checklist**: See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)
5. **Create Issue**: GitHub Issues with [BUG] or [HELP] prefix

## Next Steps

1. ✅ Complete the Quick Navigation Tour above
2. ✅ Run the Basic Smoke Test
3. ✅ Review [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)
4. ⬜ Add backend API integration
5. ⬜ Implement authentication
6. ⬜ Connect to blockchain/Web3

## What Works vs What's Mocked

### ✅ Fully Functional
- All navigation between pages
- Interactive UI components
- State management (voting, favorites, upvotes)
- Filtering and sorting
- Modals and forms (UI only)
- Responsive design
- Accessibility features

### 🎭 Demo/Mocked
- File uploads (button click shows alert)
- Form submissions (shows alert)
- User authentication (hardcoded user)
- Data persistence (resets on refresh)
- API calls (all data from mockData.ts)
- Blockchain integration (not implemented)

## Summary

This is a **fully functional frontend** with mock data. All UI interactions work, but nothing persists to a backend. It's production-ready in terms of code quality and design, but needs backend integration for real usage.

**Estimated time to add backend**: 2-4 weeks depending on complexity.
