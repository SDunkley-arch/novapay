# NovaPay UI Component Guide

Quick reference for using the new UI components across the NovaPay application.

## Table of Contents
1. [Buttons](#buttons)
2. [Forms](#forms)
3. [Cards](#cards)
4. [Navigation](#navigation)
5. [Icons](#icons)
6. [Layout](#layout)
7. [States](#states)

---

## Buttons

### Primary Button (Modern)
```html
<button class="btn-primary-modern">
  Sign In
</button>
```
**Use for:** Main actions, form submissions
**Features:** Gradient background, shadow, hover lift effect

### Outline Button (Small)
```html
<button class="btn-outline-sm">
  Edit Profile
</button>
```
**Use for:** Secondary actions
**Features:** Outlined style, hover fill effect

### Icon Button
```html
<button class="icon-btn">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
</button>
```
**Use for:** Back buttons, action icons
**Features:** Square with rounded corners, shadow, hover scale

---

## Forms

### Form Field
```html
<div class="form-field">
  <label class="form-label" for="email">Email Address</label>
  <div class="input-wrapper">
    <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    <input 
      type="email" 
      id="email" 
      class="form-input-modern" 
      placeholder="your@email.com"
      required
    >
  </div>
  <p class="form-hint">Optional helper text</p>
</div>
```
**Features:** Icon support, focus states, helper text

### Checkbox
```html
<label class="checkbox-wrapper">
  <input type="checkbox" id="rememberMe">
  <span class="checkbox-label">Remember me</span>
</label>
```

### Toggle Switch
```html
<label class="toggle-switch">
  <input type="checkbox" id="toggleNotifications" checked>
  <span class="toggle-slider"></span>
</label>
```
**Use for:** On/off settings

---

## Cards

### Transaction Card
```html
<div class="tx-card">
  <div class="tx-icon-wrapper tx-icon-green">
    <!-- SVG icon -->
  </div>
  <div class="tx-details">
    <div class="tx-label">Salary Deposit</div>
    <div class="tx-time">Today, 10:30 AM</div>
  </div>
  <div class="tx-amount-wrapper">
    <div class="tx-amount tx-amount-positive">+$2,500.00</div>
    <div class="tx-currency">USD</div>
  </div>
</div>
```
**Icon Colors:** `.tx-icon-green`, `.tx-icon-blue`, `.tx-icon-orange`, `.tx-icon-red`

### KYC Tier Card
```html
<div class="kyc-tier-card active">
  <div class="kyc-tier-header">
    <div class="kyc-tier-icon tier-1">
      <!-- SVG icon -->
    </div>
    <div class="kyc-tier-info">
      <h4 class="kyc-tier-title">Basic Verification</h4>
      <p class="kyc-tier-limit">Up to $1,000/month</p>
    </div>
    <button class="kyc-tier-btn">Start</button>
  </div>
  <ul class="kyc-requirements">
    <li>Email verification</li>
    <li>Phone number</li>
  </ul>
</div>
```
**States:** `.active`, `.completed`
**Tier Icons:** `.tier-1`, `.tier-2`, `.tier-3`

### Settings Item
```html
<button class="settings-item">
  <div class="settings-item-icon">
    <!-- SVG icon -->
  </div>
  <div class="settings-item-content">
    <div class="settings-item-title">Personal Information</div>
    <div class="settings-item-desc">Update your details</div>
  </div>
  <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
</button>
```
**Variant:** `.settings-item.danger` for destructive actions

---

## Navigation

### Page Header (Modern)
```html
<div class="page-header-modern">
  <button class="icon-btn" id="btnBack">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  </button>
  <h1 class="page-title-modern">Page Title</h1>
  <div class="icon-btn-placeholder"></div>
</div>
```

### Filter Tabs
```html
<div class="filter-tabs">
  <button class="filter-tab active" data-filter="all">All</button>
  <button class="filter-tab" data-filter="income">Income</button>
  <button class="filter-tab" data-filter="expense">Expense</button>
</div>
```
**Features:** Horizontal scroll, active state

### Bottom Navigation (Dashboard)
```html
<nav class="bottom-nav">
  <a href="#/dashboard" class="nav-item nav-item-active">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
    <span>Home</span>
  </a>
  <!-- More items -->
</nav>
```

---

## Icons

### Icon Wrapper (Transaction)
```html
<div class="tx-icon-wrapper tx-icon-green">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
</div>
```
**Colors:** 
- `.tx-icon-green` - Success/Income
- `.tx-icon-blue` - Transfer
- `.tx-icon-orange` - Bills/Warning
- `.tx-icon-red` - Withdrawal/Error

### Icon Sizes
- Small: 16x16px
- Medium: 20x20px
- Large: 24x24px
- Extra Large: 48x48px

---

## Layout

### Auth Container
```html
<div class="auth-container">
  <div class="auth-header">
    <button class="icon-btn"><!-- Back --></button>
  </div>
  <div class="auth-content">
    <!-- Content -->
  </div>
</div>
```
**Use for:** Login, Register pages

### Page Container
```html
<div class="page-container">
  <div class="page-header-modern">
    <!-- Header -->
  </div>
  <!-- Content -->
</div>
```
**Use for:** All authenticated pages

### Auth Brand Section
```html
<div class="auth-brand">
  <div class="auth-logo">
    <!-- Logo SVG -->
  </div>
  <h1 class="auth-title">Welcome Back</h1>
  <p class="auth-subtitle">Sign in to continue to NovaPay</p>
</div>
```

---

## States

### Empty State
```html
<div class="empty-state">
  <div class="empty-icon">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- Icon -->
    </svg>
  </div>
  <h3 class="empty-title">No Transactions Yet</h3>
  <p class="empty-text">Your transaction history will appear here</p>
</div>
```

### Loading Skeleton (Transaction)
```html
<div class="tx-skeleton-group">
  <div class="tx-skeleton-date"></div>
  <div class="tx-skeleton-item"></div>
  <div class="tx-skeleton-item"></div>
</div>
```

---

## Color Classes

### Text Colors
- `.text-muted` - Muted text (charcoal-60)
- `.text-accent` - Accent color (primary)
- `.text-success` - Success green
- `.text-error` - Error red

### Background Colors
- `.bg-accent-light` - Light accent background
- `.bg-yellow-50` - Light yellow
- `.bg-blue-50` - Light blue

---

## Typography Classes

### Sizes
- `.text-xs` - 12px
- `.text-sm` - 14px
- `.text-base` - 16px
- `.text-lg` - 18px
- `.text-xl` - 20px
- `.text-2xl` - 24px
- `.text-3xl` - 30px

### Weights
- `.font-normal` - 400
- `.font-medium` - 500
- `.font-semibold` - 600
- `.font-bold` - 700

---

## Utility Classes

### Spacing
- `.mt-2`, `.mt-4`, `.mt-6`, `.mt-8` - Margin top
- `.mb-2`, `.mb-4`, `.mb-6`, `.mb-8` - Margin bottom
- `.p-4`, `.p-6` - Padding
- `.px-4`, `.py-2`, `.py-3` - Padding x/y

### Flexbox
- `.flex` - Display flex
- `.flex-col` - Flex direction column
- `.items-center` - Align items center
- `.justify-center` - Justify content center
- `.justify-between` - Justify content space-between
- `.gap-2`, `.gap-4`, `.gap-6` - Gap

---

## Best Practices

### Do's ✅
- Use semantic HTML elements
- Include proper labels for form inputs
- Add hover states for interactive elements
- Use consistent spacing (multiples of 4px)
- Include loading states for async operations
- Provide empty states for lists
- Use appropriate icon colors for transaction types

### Don'ts ❌
- Don't mix old and new button styles
- Don't forget focus states for accessibility
- Don't use inline styles (use classes)
- Don't hardcode colors (use CSS variables)
- Don't skip loading indicators
- Don't forget mobile responsiveness

---

## Animation Guidelines

### Hover Effects
```css
transition: all 0.2s ease;
transform: translateY(-2px);
```

### Button Press
```css
transform: scale(0.98);
```

### Loading
```css
animation: pulse 1.5s ease-in-out infinite;
```

---

## Responsive Breakpoints

```css
/* Mobile-first (default) */
/* Styles for ≤480px */

@media (min-width: 480px) {
  /* Desktop enhancements */
}
```

---

## Quick Start Template

### New Page Template
```javascript
import { qs, on, showToast } from '../lib/dom.js';
import { navigate, goBack } from '../router.js';

export function renderMyPage() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">My Page</h1>
        <div class="icon-btn-placeholder"></div>
      </div>
      
      <!-- Your content here -->
      
    </div>
  `;
  
  // Event listeners
  on('click', '#btnBack', () => goBack());
}
```

---

## Resources

- **Design Tokens:** `src/styles.css`
- **Component Styles:** `src/styles/pages.css`
- **Dashboard Styles:** `src/styles/dashboard.css`
- **Icons:** Inline SVG (Feather Icons style)
- **Colors:** CSS variables (--colorsprimary-*, --colorssecondary-*, etc.)

---

**Last Updated:** December 2024
**Version:** 1.0.0
