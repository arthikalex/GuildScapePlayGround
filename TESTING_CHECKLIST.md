# GuildScape Frontend Testing Checklist

## Pre-Launch Testing Requirements

### 🔒 Security (Critical - COMPLETED ✅)
- [x] Update Next.js to 14.2.33+ (fixed critical vulnerabilities)
- [x] Run `npm audit` - 0 vulnerabilities found
- [ ] Review all external dependencies for known issues
- [ ] Implement Content Security Policy (CSP) headers
- [ ] Add rate limiting for form submissions
- [ ] Sanitize all user inputs (for future backend integration)

---

## 🧪 Functional Testing

### Great Hall (Dashboard) - `/`
- [ ] **Visual Verification**
  - [ ] Hero section displays with medieval theme
  - [ ] Personal shield shows correct user name, tier, and reputation
  - [ ] Tier medallion displays correct icon and color
  - [ ] Progress wheel renders with 6 colored segments
  - [ ] Candlelight animations visible (pulsing candles)

- [ ] **Interactive Elements**
  - [ ] Hover over progress wheel segments shows tooltip with dimension details
  - [ ] Click on each navigation portal navigates to correct page
  - [ ] Portal cards scale on hover (1.05x)
  - [ ] Notice board proposal cards clickable (opens Council page)
  - [ ] Recent badges display correctly

- [ ] **Data Display**
  - [ ] Reputation score matches mock data (2400)
  - [ ] Badge count shows 25
  - [ ] Tier progress bar calculates correctly
  - [ ] Active proposals limited to 4 items
  - [ ] Guild activity stats accurate

### Workshop - `/workshop`
- [ ] **Tab Navigation**
  - [ ] Gallery tab active by default
  - [ ] In Review tab shows artworks in 30-day review
  - [ ] Analytics tab displays metrics
  - [ ] Tab switching doesn't lose state

- [ ] **Gallery View**
  - [ ] Artwork grid responsive (3 cols desktop, 2 tablet, 1 mobile)
  - [ ] Quality borders render correctly (Green/Blue/Purple/Gold)
  - [ ] Border glow effect visible on quality artworks
  - [ ] Category filter buttons work
  - [ ] Favorite toggle works (heart icon changes color)
  - [ ] Click artwork opens detail (functionality TBD)
  - [ ] Empty state shows when no artworks in category

- [ ] **Upload Modal**
  - [ ] "Upload Artwork" button opens modal
  - [ ] Modal has illuminated input (large first letter)
  - [ ] Category dropdown populated
  - [ ] File upload area displays
  - [ ] Review process info box visible
  - [ ] Cancel closes modal
  - [ ] Upload shows alert (demo mode)

- [ ] **In Review View**
  - [ ] Shows "wet paint" effect (grayscale + blur)
  - [ ] Days remaining countdown accurate
  - [ ] Review progress bar updates
  - [ ] Feedback notes display in scrollable area
  - [ ] Empty state when no reviews pending

- [ ] **Analytics View**
  - [ ] 4 summary cards display metrics
  - [ ] Revenue chart shows 6-month trend
  - [ ] Top performers table sortable
  - [ ] Traffic sources with percentage bars
  - [ ] Pie chart representation visible
  - [ ] Improvement suggestions display

### Council Chamber - `/council`
- [ ] **Voting Power Display**
  - [ ] Shows formula: Reputation × Tier Multiplier
  - [ ] Calculates correctly (2400 × 3 = 7200 for Elder)
  - [ ] Displays prominently in header card

- [ ] **Proposal List**
  - [ ] Category filter buttons work
  - [ ] Proposals display with correct status colors
  - [ ] Vote percentage bar accurate
  - [ ] Days remaining calculation correct
  - [ ] Voting/Passed/Rejected/Upcoming statuses display

- [ ] **Voting Interface**
  - [ ] Approve (green) and Reject (red) buttons visible
  - [ ] Buttons disappear after voting
  - [ ] "You voted" confirmation appears
  - [ ] Cannot vote twice on same proposal
  - [ ] Vote updates percentage immediately
  - [ ] Vote count increments

- [ ] **Proposal Detail Modal**
  - [ ] Click proposal opens modal
  - [ ] Full description displays
  - [ ] Metadata shows (category, author, date)
  - [ ] Voting status with progress bar
  - [ ] Vote buttons in modal footer
  - [ ] Close button works
  - [ ] ESC key closes modal

- [ ] **Vote Confirmation Modal**
  - [ ] Opens when voting
  - [ ] Shows voting power amount
  - [ ] Confirm/Cancel buttons work
  - [ ] Modal closes after confirmation

### Library - `/library`
- [ ] **Stats Header**
  - [ ] Shows 25 badges earned
  - [ ] Shows 40 total badges
  - [ ] Completion percentage correct (62.5%)
  - [ ] In progress count accurate (15)

- [ ] **Badge Collection View**
  - [ ] Category filter works (All + 12 categories)
  - [ ] Earned/Unearned toggle filters work
  - [ ] Earned badges show in full color
  - [ ] Unearned badges show in grayscale
  - [ ] Badge rarity colors correct (Common→Legendary)
  - [ ] Legendary badges shimmer effect
  - [ ] Progress bars on unearned badges
  - [ ] Earned date displays
  - [ ] "Held by X%" text accurate

- [ ] **Badge Details**
  - [ ] Hover shows enhanced shadow
  - [ ] Icon (emoji) displays correctly
  - [ ] Requirements text readable
  - [ ] Progress percentage accurate
  - [ ] Rarity badge color-coded

- [ ] **Resources View**
  - [ ] Tab switches to Resources
  - [ ] Mastery chronicles show 4 paths
  - [ ] Progress bars on learning paths
  - [ ] Guild resources grid (6 items)
  - [ ] Resource cards hoverable
  - [ ] Recent achievements feed displays

### Treasury - `/treasury`
- [ ] **Key Metrics Cards**
  - [ ] This Month revenue displays
  - [ ] Total revenue calculates correctly
  - [ ] Monthly average accurate
  - [ ] Average per sale correct
  - [ ] Growth percentage shows with +/-
  - [ ] Card colors/gradients render

- [ ] **Revenue Trends Chart**
  - [ ] 6 months of data display
  - [ ] Bar width proportional to revenue
  - [ ] GLD percentage shown
  - [ ] Transaction counts visible
  - [ ] Artworks sold count accurate

- [ ] **Payment Split**
  - [ ] GLD vs Fiat percentages correct
  - [ ] Progress bars match percentages
  - [ ] Dollar amount calculation accurate
  - [ ] Diamond icon displays

- [ ] **Traffic Sources**
  - [ ] 5 sources listed (Discovery, Search, etc.)
  - [ ] Percentages add to 100%
  - [ ] Progress bars proportional
  - [ ] View counts shown

- [ ] **Top Performers Table**
  - [ ] Ranks 1-5 with medal icons
  - [ ] Artwork thumbnails display
  - [ ] Conversion rate color-coded (green if >1%)
  - [ ] Hover effect on rows
  - [ ] All columns populated

- [ ] **Insights Section**
  - [ ] Two insight boxes display
  - [ ] Strong Performance items listed
  - [ ] Growth Opportunities listed
  - [ ] Icons render correctly

### Forum Courtyard - `/forum`
- [ ] **Thread List**
  - [ ] Category filter works (9 categories)
  - [ ] Pinned threads show first with 📌 icon
  - [ ] Thread cards display metadata (author, date, counts)
  - [ ] Tier medallion shows for author
  - [ ] Reply count accurate
  - [ ] View count displays
  - [ ] Last activity date shown
  - [ ] Hover effect on cards

- [ ] **Thread Detail Modal**
  - [ ] Click thread opens modal
  - [ ] Thread title and category display
  - [ ] Original post with author info
  - [ ] Author's tier medallion visible
  - [ ] Top 3 badges show for author
  - [ ] Post content readable
  - [ ] Nested replies indented with border

- [ ] **Upvote System**
  - [ ] Wax seal icon displays
  - [ ] Click toggles upvote state
  - [ ] Count increments/decrements
  - [ ] Color changes when upvoted (red)
  - [ ] Cannot upvote twice (prevents spam)

- [ ] **Reply Interface**
  - [ ] Reply button shows on posts
  - [ ] Click opens textarea
  - [ ] Textarea has parchment styling
  - [ ] Post Reply button visible
  - [ ] Cancel button works
  - [ ] Reply indented properly (4 levels max)

- [ ] **New Thread Modal**
  - [ ] "New Thread" button opens modal
  - [ ] Title input field works
  - [ ] Category dropdown populated
  - [ ] Content textarea expandable
  - [ ] Guidelines box displays
  - [ ] Create button shows alert (demo)
  - [ ] Cancel closes modal

---

## 🎨 Visual Design Testing

### Theme & Colors
- [ ] Parchment background (#FFFEF9) throughout
- [ ] Guild wood color for primary text
- [ ] Purple accents on active states
- [ ] Gold, green, blue accent colors present
- [ ] Wax seal red for important actions
- [ ] Subtle texture visible on cards

### Typography
- [ ] EB Garamond font loads and displays
- [ ] Serif font used for body text
- [ ] Headings bold and prominent
- [ ] Monospace for data/numbers
- [ ] Font sizes hierarchical
- [ ] Line height comfortable for reading

### Components
- [ ] Buttons have hover states (lift + shadow)
- [ ] Cards have subtle shadows (candlelight effect)
- [ ] Borders rounded (8px)
- [ ] Modal entrance animation (scale)
- [ ] Progress bars animated smoothly
- [ ] Tier medallions render as circles with icons

---

## 📱 Responsive Design Testing

### Desktop (1920x1080)
- [ ] All 6 pages render correctly
- [ ] Desktop navigation visible in header
- [ ] Footer displays
- [ ] 3-column grids work
- [ ] Sidebar layouts function
- [ ] No horizontal scroll
- [ ] Hover states work

### Tablet (768x1024)
- [ ] 2-column grids adapt
- [ ] Navigation still in header
- [ ] Cards stack appropriately
- [ ] Touch targets 44px minimum
- [ ] Modals fit screen
- [ ] Progress wheel scales (240px → smaller)

### Mobile (375x667)
- [ ] Bottom tab navigation visible
- [ ] 5 tabs: Hall, Workshop, Council, Library, Treasury
- [ ] Active tab highlighted
- [ ] Single column layouts
- [ ] Cards full width
- [ ] Modals scrollable
- [ ] Progress wheel 120px
- [ ] Text readable without zoom
- [ ] No horizontal scroll
- [ ] Forms stack vertically

### Breakpoint Testing
- [ ] Test at 320px (small phone)
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (desktop)
- [ ] Test at 1440px (large desktop)
- [ ] Test at 1920px (full HD)

---

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible (2px blue outline)
- [ ] Skip link works ("Skip to main content")
- [ ] Modal traps focus
- [ ] ESC closes modals
- [ ] Enter activates buttons/links
- [ ] Arrow keys work in select dropdowns
- [ ] Tab order logical (left→right, top→bottom)

### Screen Reader Testing
- [ ] Use NVDA (Windows) or VoiceOver (Mac)
- [ ] All images have alt text
- [ ] Buttons have aria-labels
- [ ] Links descriptive
- [ ] Form labels associated with inputs
- [ ] Error messages announced
- [ ] Dynamic content updates announced (aria-live)
- [ ] Progress bars have aria-valuenow
- [ ] Modal has role="dialog" and aria-modal
- [ ] Lists use proper list markup

### ARIA Labels (Spot Check)
- [ ] Voting button: "Vote to approve proposal #X"
- [ ] Progress bar: aria-valuenow, aria-valuemin, aria-valuemax
- [ ] Badge list: role="list", items role="listitem"
- [ ] Dynamic status: role="status", aria-live="polite"
- [ ] Artwork image alt: "Artwork titled 'X' by Y"
- [ ] Decorative elements: role="presentation" or aria-hidden

### Color Contrast
- [ ] Text on parchment meets 4.5:1 ratio
- [ ] Button text on purple background readable
- [ ] Link colors distinguishable
- [ ] Use WebAIM Contrast Checker
- [ ] Test in grayscale mode

---

## 🚀 Performance Testing

### Load Times
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Test with slow 3G throttling
- [ ] Check Lighthouse score (aim for 90+)

### Asset Optimization
- [ ] Images optimized (use Next.js Image component)
- [ ] Fonts preloaded
- [ ] CSS minified
- [ ] JavaScript code-split by route
- [ ] Unused CSS purged

### Runtime Performance
- [ ] No memory leaks (check DevTools)
- [ ] Smooth 60fps animations
- [ ] No layout thrashing
- [ ] React DevTools Profiler shows fast renders

---

## 🧩 Component Testing

### State Management
- [ ] Voting updates state immediately
- [ ] Favorite toggle persists during session
- [ ] Upvotes increment correctly
- [ ] Filter selections apply
- [ ] Modal open/close doesn't lose data
- [ ] Tab switching preserves state

### Props & Data Flow
- [ ] User data propagates to all pages
- [ ] Artwork data filters correctly
- [ ] Badge progress calculates accurately
- [ ] Reputation totals sum correctly
- [ ] Revenue data charts properly

---

## 🌐 Browser Compatibility

### Modern Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Functionality Checks
- [ ] All features work in each browser
- [ ] CSS renders consistently
- [ ] Animations smooth
- [ ] Fonts load properly
- [ ] No console errors

---

## 🐛 Error Handling

### User Errors
- [ ] Required fields show validation
- [ ] Invalid inputs show error messages
- [ ] Empty states display when no data
- [ ] 404 page for invalid routes
- [ ] Network errors handled gracefully

### Developer Experience
- [ ] No console errors on any page
- [ ] No TypeScript errors
- [ ] No React warnings
- [ ] PropTypes valid (if used)
- [ ] No missing keys in lists

---

## 🔄 User Flow Testing

### New User Journey
1. [ ] Land on Great Hall
2. [ ] See welcome and personal shield
3. [ ] Click Workshop portal
4. [ ] View gallery with mock artworks
5. [ ] Click Library portal
6. [ ] Browse badge collection
7. [ ] Return to Great Hall via navigation

### Artist Journey
1. [ ] Go to Workshop
2. [ ] Click "Upload Artwork"
3. [ ] Fill out form
4. [ ] Submit (see demo alert)
5. [ ] Switch to "In Review" tab
6. [ ] View pending artwork
7. [ ] Check Analytics tab

### Governance Journey
1. [ ] Go to Council Chamber
2. [ ] Filter by "Governance" category
3. [ ] Click a proposal to view details
4. [ ] Click "Approve"
5. [ ] Confirm vote
6. [ ] See "You voted" message
7. [ ] Verify vote count increased

### Community Journey
1. [ ] Go to Forum Courtyard
2. [ ] Filter by "Technique" category
3. [ ] Click a pinned thread
4. [ ] Read original post
5. [ ] Upvote post
6. [ ] Click Reply
7. [ ] Type and cancel

---

## 📊 Data Validation

### Mock Data Integrity
- [ ] All 8 users have complete profiles
- [ ] 20 artworks have all required fields
- [ ] 12 proposals have valid dates
- [ ] 40 badges have descriptions
- [ ] 40 forum threads with posts
- [ ] 6 months revenue data accurate
- [ ] No null/undefined values displayed
- [ ] Calculations correct (percentages, totals)

---

## 🎯 Production Readiness

### Before Deployment
- [ ] Environment variables configured
- [ ] Build succeeds with no warnings
- [ ] All dependencies up to date
- [ ] Security vulnerabilities: 0
- [ ] Git repository clean
- [ ] README updated
- [ ] .gitignore includes node_modules, .next, .env

### Post-Deployment
- [ ] Verify on production URL
- [ ] Test from different locations
- [ ] Check SSL certificate
- [ ] Monitor error logs
- [ ] Set up analytics
- [ ] Configure CDN (if applicable)

---

## 🔮 Future Enhancements

When adding backend:
- [ ] API error handling
- [ ] Loading skeletons
- [ ] Optimistic UI updates
- [ ] Real-time updates (WebSocket)
- [ ] Image upload with preview
- [ ] Form validation with Zod/Yup
- [ ] Authentication flow
- [ ] Protected routes
- [ ] Rate limiting
- [ ] CSRF protection

---

## ✅ Sign-Off Checklist

Before marking as "Production Ready":
- [ ] All Critical items completed
- [ ] 90%+ of Functional tests pass
- [ ] All Accessibility tests pass
- [ ] Performance score >90
- [ ] No security vulnerabilities
- [ ] Tested on 3+ devices
- [ ] Tested on 4+ browsers
- [ ] No console errors
- [ ] Stakeholder approval
- [ ] Documentation complete

---

## 📝 Testing Log

| Date | Tester | Section | Pass/Fail | Notes |
|------|--------|---------|-----------|-------|
| 2025-11-12 | - | Security | ✅ Pass | Updated to Next.js 14.2.33 |
| | | | | 0 vulnerabilities |
| | | Build | ✅ Pass | All pages compile successfully |
|      |        |         |           |       |
|      |        |         |           |       |

---

## 🚨 Known Issues

*Document any bugs or limitations found during testing:*

1. **Demo Mode Alerts**: All form submissions show browser alerts instead of real functionality
2. **Mock Data Only**: No persistence - refreshing page resets state
3. **No Image Uploads**: File upload is visual only
4. **No Authentication**: All users see same data
5. **Placeholder Images**: Using picsum.photos for artwork images

---

## 📞 Support

For questions or issues during testing:
- Create GitHub issue with [TEST] prefix
- Include browser, device, and steps to reproduce
- Attach screenshots if visual bug
- Note expected vs actual behavior
