(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=i(a);fetch(a.href,l)}})();const J="http://localhost:4000";let f=null;function A(t){f=t,localStorage.setItem("nv_token",t)}function V(){const t=localStorage.getItem("nv_token");t&&(f=t)}function O(){f=null,localStorage.removeItem("nv_token")}function _(t={}){const e={"Content-Type":"application/json",...t};return f?{...e,Authorization:`Bearer ${f}`}:e}async function x(t,e={}){const i=await fetch(`${J}${t}`,{...e,headers:_(e.headers||{})});let n=null;try{n=await i.clone().json()}catch{n=null}if(i.status===401)throw O(),window.location.hash="#/login",new Error("Unauthorized");if(!i.ok)throw n||new Error(`HTTP ${i.status}`);return n}const o={session:null,balances:{JMD:125e3,USD:180},txs:[{id:"t1",title:"From John",amount:7500,currency:"JMD",type:"P2P_RECV",ts:"2025-09-01"},{id:"t2",title:"JPS Bill",amount:-8500,currency:"JMD",type:"BILL",ts:"2025-09-02"}],savedBillers:[],card:{hasCard:!1,masked:"•••• 1234",expiry:"12/28",frozen:!1}},m={SESSION:"novapay_session",BALANCES:"novapay_balances",TRANSACTIONS:"novapay_transactions",BILLERS:"novapay_billers",CARD:"novapay_card"};function U(){try{const t=localStorage.getItem(m.SESSION);t&&(o.session=JSON.parse(t));const e=localStorage.getItem(m.BALANCES);e&&(o.balances=JSON.parse(e));const i=localStorage.getItem(m.TRANSACTIONS);i&&(o.txs=JSON.parse(i));const n=localStorage.getItem(m.BILLERS);n&&(o.savedBillers=JSON.parse(n));const a=localStorage.getItem(m.CARD);a&&(o.card=JSON.parse(a))}catch(t){console.error("Error loading state:",t)}}function I(){try{o.session?localStorage.setItem(m.SESSION,JSON.stringify(o.session)):localStorage.removeItem(m.SESSION),localStorage.setItem(m.BALANCES,JSON.stringify(o.balances)),localStorage.setItem(m.TRANSACTIONS,JSON.stringify(o.txs)),localStorage.setItem(m.BILLERS,JSON.stringify(o.savedBillers)),localStorage.setItem(m.CARD,JSON.stringify(o.card))}catch(t){console.error("Error saving state:",t)}}function q(){Object.values(m).forEach(t=>{localStorage.removeItem(t)})}function k(){return o.session!==null}function j(){try{o.session=null,o.balances={JMD:0,USD:0},o.txs=[],o.savedBillers=[],o.card={hasCard:!1,masked:"",expiry:"",frozen:!1},q(),console.log("[NovaPay] Session cleared successfully")}catch(t){console.error("[NovaPay] Failed to clear session:",t)}}U();function r(t){return document.querySelector(t)}function s(t,e,i){const n=document.querySelector(e);n&&n.addEventListener(t,i)}function u(t){alert(t)}function W(){const t=r("#app");t.innerHTML=`
    <div class="auth-container">
      <!-- Header -->
      <div class="auth-header">
        <button class="icon-btn" data-testid="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="auth-content">
        <!-- Logo & Title -->
        <div class="auth-brand">
          <div class="auth-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="url(#gradient)"/>
              <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stop-color="#543AF8"/>
                  <stop offset="100%" stop-color="#9333EA"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue to NovaPay</p>
        </div>

        <!-- Form -->
        <form id="loginForm" class="auth-form">
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
          </div>
          
          <div class="form-field">
            <label class="form-label" for="password">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input 
                type="password" 
                id="password" 
                class="form-input-modern" 
                placeholder="Enter your password"
                required
              >
            </div>
          </div>

          <div class="form-footer">
            <label class="checkbox-wrapper">
              <input type="checkbox" id="rememberMe">
              <span class="checkbox-label">Remember me</span>
            </label>
            <a href="#" class="link-text" id="forgotPassword">Forgot password?</a>
          </div>
          
          <button type="submit" class="btn-primary-modern" data-testid="btnLogin">
            Sign In
          </button>
        </form>
        
        <!-- Footer -->
        <div class="auth-footer">
          <p class="auth-footer-text">
            Don't have an account? 
            <a href="#/register" class="link-primary">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `,s("click",'[data-testid="btnBack"]',()=>{h("/landing")}),s("click","#forgotPassword",e=>{e.preventDefault(),u("Password reset coming soon")}),s("submit","#loginForm",async e=>{var l;e.preventDefault();const i=r("#email").value.trim(),n=r("#password").value;if(!i){u("Please enter your email address");return}if(!n){u("Please enter your password");return}const a=r('[data-testid="btnLogin"]');a.textContent="Signing In...",a.disabled=!0;try{const c=await x("/auth/login",{method:"POST",body:JSON.stringify({email:i,password:n})});A(c.token),o.session={user:{email:c.user.email,id:c.user.id},kycTier:"TIER_1"},I(),u("Welcome back!","success"),h("/dashboard")}catch(c){const v=((l=c==null?void 0:c.error)==null?void 0:l.code)||(c==null?void 0:c.message)||"LOGIN_FAILED",d=v==="BAD_CRED"?"Invalid email or password":v==="NO_USER"?"Account not found":v==="NO_AUTH"?"Session expired, please log in again":"Unable to sign in";console.error("Login Error:",c),u(d)}finally{a.textContent="Sign In",a.disabled=!1}})}function z(){const t=r("#app");t.innerHTML=`
    <div class="auth-container">
      <!-- Header -->
      <div class="auth-header">
        <button class="icon-btn" data-testid="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="auth-content">
        <!-- Logo & Title -->
        <div class="auth-brand">
          <div class="auth-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="url(#gradient)"/>
              <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stop-color="#543AF8"/>
                  <stop offset="100%" stop-color="#9333EA"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join NovaPay and start managing your money</p>
        </div>

        <!-- Form -->
        <form id="registerForm" class="auth-form">
          <div class="form-field">
            <label class="form-label" for="fullName">Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input 
                type="text" 
                id="fullName" 
                class="form-input-modern" 
                placeholder="John Doe"
                required
              >
            </div>
          </div>
          
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
          </div>
          
          <div class="form-field">
            <label class="form-label" for="phone">Phone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input 
                type="tel" 
                id="phone" 
                class="form-input-modern" 
                placeholder="876-555-0123"
                required
              >
            </div>
          </div>
          
          <div class="form-field">
            <label class="form-label" for="password">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input 
                type="password" 
                id="password" 
                class="form-input-modern" 
                placeholder="Create a strong password"
                required
              >
            </div>
            <p class="form-hint">At least 6 characters</p>
          </div>

          <label class="checkbox-wrapper terms-checkbox">
            <input type="checkbox" id="agreeTerms" required>
            <span class="checkbox-label">I agree to the <a href="#" class="link-text">Terms & Conditions</a></span>
          </label>
          
          <button type="submit" class="btn-primary-modern" data-testid="btnRegister">
            Create Account
          </button>
        </form>
        
        <!-- Footer -->
        <div class="auth-footer">
          <p class="auth-footer-text">
            Already have an account? 
            <a href="#/login" class="link-primary">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,s("click",'[data-testid="btnBack"]',()=>{h("/landing")}),s("submit","#registerForm",async e=>{var v;e.preventDefault();const i=r("#fullName").value.trim(),n=r("#email").value.trim(),a=r("#phone").value.trim(),l=r("#password").value;if(!i||!n||!a||!l){u("Please fill in all fields");return}if(l.length<6){u("Password must be at least 6 characters");return}const c=r('[data-testid="btnRegister"]');c.textContent="Creating Account...",c.disabled=!0;try{const d=await x("/auth/register",{method:"POST",body:JSON.stringify({name:i,email:n,phone:a,password:l})});A(d.token),o.session={user:{email:d.user.email,id:d.user.id,name:d.user.name||i,phone:d.user.phone||a},kycTier:"TIER_1"},I(),u("Account created successfully!","success"),h("/dashboard")}catch(d){const b=((v=d==null?void 0:d.error)==null?void 0:v.code)||(d==null?void 0:d.message)||"REGISTER_FAILED",F=b==="USER_EXISTS"?"An account with this email already exists":b==="INVALID_EMAIL"?"Please enter a valid email address":b==="WEAK_PASSWORD"?"Password is too weak":"Unable to create account. Please try again.";console.error("Registration Error:",d),u(F)}finally{c.textContent="Create Account",c.disabled=!1}}),s("input","#phone",e=>{let i=e.target.value.replace(/\D/g,"");i.length>=3&&(i=i.replace(/(\d{3})(\d{0,3})(\d{0,4})/,(n,a,l,c)=>{let v=a;return l&&(v+="-"+l),c&&(v+="-"+c),v})),e.target.value=i})}function Y(){var n,a,l,c,v,d;const t=r("#app"),e=((a=(n=o==null?void 0:o.session)==null?void 0:n.user)==null?void 0:a.name)||((c=(l=o==null?void 0:o.session)==null?void 0:l.user)!=null&&c.email?o.session.user.email.split("@")[0]:"User");(d=(v=o==null?void 0:o.session)==null?void 0:v.user)!=null&&d.email;const i=e.substring(0,2).toUpperCase();t.innerHTML=`
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="dashboard-header">
        <div class="header-top">
          <div class="location-badge">
            <svg class="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Jamaica</span>
          </div>
          <div class="profile-section">
            <div class="membership-badge">Gold</div>
            <div class="avatar">${i}</div>
          </div>
        </div>
        
        <div class="greeting-section">
          <h1 class="greeting-title">Hello, ${C(G(e))}! 👋</h1>
          <p class="greeting-subtitle">Welcome back to NovaPay</p>
        </div>
      </div>

      <!-- Virtual Card -->
      <div class="virtual-card-container">
        <div class="virtual-card">
          <div class="card-header">
            <div class="card-logo">NovaPay</div>
            <div class="card-type">Virtual</div>
          </div>
          <div class="card-chip"></div>
          <div class="card-number" id="card-number">**** **** **** 5678</div>
          <div class="card-footer">
            <div class="card-holder">
              <div class="card-label">Card Holder</div>
              <div class="card-value">${C(e)}</div>
            </div>
            <div class="card-expiry">
              <div class="card-label">Expires</div>
              <div class="card-value">12/25</div>
            </div>
            <div class="card-brand">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <circle cx="15" cy="12" r="10" fill="#EB001B" opacity="0.8"/>
                <circle cx="25" cy="12" r="10" fill="#F79E1B" opacity="0.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Insight Card -->
      <div class="insight-card">
        <div class="insight-header">
          <div>
            <div class="insight-label">Total Balance</div>
            <div class="insight-amount" id="total-balance">$0.00</div>
          </div>
          <div class="insight-trend" id="insight-trend">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span class="trend-value">+12.5%</span>
          </div>
        </div>
        <div class="balance-breakdown">
          <div class="balance-item">
            <span class="balance-currency">JMD</span>
            <span class="balance-value" id="bal-jmd">$0.00</span>
          </div>
          <div class="balance-divider"></div>
          <div class="balance-item">
            <span class="balance-currency">USD</span>
            <span class="balance-value" id="bal-usd">$0.00</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <div class="quick-action" data-action="remittance">
          <div class="action-icon action-icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <span class="action-label">Remittance</span>
        </div>
        <div class="quick-action" data-action="transfer">
          <div class="action-icon action-icon-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <span class="action-label">Transfer</span>
        </div>
        <div class="quick-action" data-action="withdraw">
          <div class="action-icon action-icon-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <span class="action-label">Withdraw</span>
        </div>
        <div class="quick-action" data-action="more">
          <div class="action-icon action-icon-orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </div>
          <span class="action-label">More</span>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="transactions-section">
        <div class="section-header">
          <h2 class="section-title">Recent Transactions</h2>
          <a href="#/transactions" class="see-all-link">See all</a>
        </div>
        <div class="transactions-list" id="txList">
          <!-- Skeleton loader -->
          <div class="transaction-skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
              <div class="skeleton-line skeleton-line-title"></div>
              <div class="skeleton-line skeleton-line-subtitle"></div>
            </div>
            <div class="skeleton-amount"></div>
          </div>
          <div class="transaction-skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
              <div class="skeleton-line skeleton-line-title"></div>
              <div class="skeleton-line skeleton-line-subtitle"></div>
            </div>
            <div class="skeleton-amount"></div>
          </div>
        </div>
      </div>

      <!-- Floating Action Button -->
      <button class="fab" id="fabAdd" title="Add Money">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <a href="#/dashboard" class="nav-item nav-item-active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span>Home</span>
        </a>
        <a href="#/stats" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span>Statistics</span>
        </a>
        <a href="#/card" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          <span>Cards</span>
        </a>
        <a href="#/settings" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  `,s("click","#fabAdd",()=>{h("/add-money")}),s("click",'[data-action="remittance"]',()=>h("/add-money")),s("click",'[data-action="transfer"]',()=>h("/transfers")),s("click",'[data-action="withdraw"]',()=>h("/withdraw")),s("click",'[data-action="more"]',()=>h("/bills")),K()}function w(t){return(Number(t||0)/100).toFixed(2)}function G(t){try{return t.charAt(0).toUpperCase()+t.slice(1)}catch{return t}}function C(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function K(){const t=r("#bal-jmd"),e=r("#bal-usd"),i=r("#total-balance"),n=r("#txList");try{const[a,l]=await Promise.all([x("/wallet/balances"),x("/wallet/transactions").catch(()=>[])]),c=w(a.JMD),v=w(a.USD);t.textContent=`$${c}`,e.textContent=`$${v}`;const d=Number(a.JMD||0)/15500+Number(a.USD||0)/100;i.textContent=`$${d.toFixed(2)}`,!l||!l.length?n.innerHTML=T():n.innerHTML=l.slice(0,5).map(b=>Q(b)).join("")}catch(a){console.error("[DASHBOARD]",a),t.textContent="$0.00",e.textContent="$0.00",i.textContent="$0.00",n.innerHTML=T()}}function Q(t){const e=t.kind==="DEPOSIT"||t.kind==="RECEIVE",i=e?"tx-icon-green":"tx-icon-red",n=e?"tx-amount-positive":"tx-amount-negative",a=e?"+":"-",l=X(t.kind),c=Z(t.kind),v=tt(t.createdAt);return`
    <div class="transaction-item">
      <div class="tx-icon ${i}">${l}</div>
      <div class="tx-info">
        <div class="tx-title">${c}</div>
        <div class="tx-time">${v}</div>
      </div>
      <div class="tx-amount ${n}">${a}${w(t.amount)} ${t.currency}</div>
    </div>
  `}function T(){return`
    <div class="transaction-item">
      <div class="tx-icon tx-icon-green">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="tx-info">
        <div class="tx-title">Salary Deposit</div>
        <div class="tx-time">Today, 10:30 AM</div>
      </div>
      <div class="tx-amount tx-amount-positive">+$2,500.00</div>
    </div>
    <div class="transaction-item">
      <div class="tx-icon tx-icon-blue">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      <div class="tx-info">
        <div class="tx-title">Transfer to John</div>
        <div class="tx-time">Yesterday, 3:45 PM</div>
      </div>
      <div class="tx-amount tx-amount-negative">-$150.00</div>
    </div>
    <div class="transaction-item">
      <div class="tx-icon tx-icon-orange">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      </div>
      <div class="tx-info">
        <div class="tx-title">Bill Payment</div>
        <div class="tx-time">Dec 10, 2:15 PM</div>
      </div>
      <div class="tx-amount tx-amount-negative">-$85.50</div>
    </div>
  `}function X(t){const e={DEPOSIT:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',WITHDRAW:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',TRANSFER:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',BILL:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>'};return e[t]||e.TRANSFER}function Z(t){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[t]||t}function tt(t){try{const e=new Date(t),n=new Date-e,a=Math.floor(n/6e4);return a<60?`${a} mins ago`:a<1440?`${Math.floor(a/60)} hours ago`:e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return"Recently"}}function et(){const t=r("#app");t.innerHTML=`
    <div class="container page-center">
      <div class="logo">NovaPay</div>
      
      <div class="mb-8">
        <h1 class="text-xl mb-4">Fast. Secure. Yours.</h1>
        <p class="text-muted text-center">
          Send money, pay bills, and manage your finances with Jamaica's most trusted digital wallet.
        </p>
      </div>
      
      <div class="w-full" style="max-width: 320px;">
        <button class="btn btn-primary btn-full mb-4" data-testid="btnSignIn">
          Sign In
        </button>
        
        <button class="btn btn-secondary btn-full mb-8" data-testid="btnCreateAccount">
          Create Account
        </button>
      </div>
      
      <div class="footer">
        <p class="text-xs">
          ⚡ Powered by NovaPay Engine · 🔒 Secured by Bank-Grade Encryption
        </p>
      </div>
    </div>
  `,s(t,'[data-testid="btnSignIn"]',"click"),s(t,'[data-testid="btnCreateAccount"]',"click")}function y(t,e="JMD"){const i=Math.abs(t);return e==="JMD"?`J$${i.toLocaleString("en-JM",{minimumFractionDigits:0,maximumFractionDigits:0})}`:e==="USD"?`$${i.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:`${e} ${i.toLocaleString()}`}function it(t){const e=new Date(t),i=new Date,n=Math.abs(i-e),a=Math.ceil(n/(1e3*60*60*24));return a===1?"Today":a===2?"Yesterday":a<=7?`${a-1} days ago`:e.toLocaleDateString("en-US",{month:"short",day:"numeric",year:e.getFullYear()!==i.getFullYear()?"numeric":void 0})}let g={step:1,recipient:null,amount:0};function st(){const t=r("#app");t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Send Money</h1>
        <div></div>
      </div>
      
      <!-- Step Indicator -->
      <div class="steps">
        <div class="step active">1</div>
        <div class="step ">2</div>
        <div class="step ">3</div>
      </div>
      
      <div id="stepContent">
        ${at()}
      </div>
    </div>
  `,lt()}function at(){switch(g.step){case 1:return B();case 2:return nt();case 3:return ot();default:return B()}}function B(){return`
    <div class="card">
      <h3 class="text-lg mb-4">Select Recipient</h3>
      
      <div class="form-group">
        <input 
          type="text" 
          id="recipientSearch" 
          class="form-input" 
          placeholder="Search contacts or enter phone number"
        >
      </div>
      
      <div class="mb-4">
        <button class="btn btn-secondary btn-full" data-action="scan-qr">
          📱 Scan QR Code
        </button>
      </div>
      
      <div class="contact-list">
        ${[{id:"c1",name:"John Smith",phone:"876-555-0101",avatar:"👨"},{id:"c2",name:"Sarah Johnson",phone:"876-555-0102",avatar:"👩"},{id:"c3",name:"Mike Brown",phone:"876-555-0103",avatar:"👨‍💼"},{id:"c4",name:"Lisa Davis",phone:"876-555-0104",avatar:"👩‍💻"}].map(e=>`
          <div class="contact-item" data-contact='${JSON.stringify(e)}'>
            <div class="flex items-center gap-4">
              <div class="text-2xl">${e.avatar}</div>
              <div>
                <h4 class="font-semibold">${e.name}</h4>
                <p class="text-muted text-sm">${e.phone}</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function nt(){return`
    <div class="card">
      <h3 class="text-lg mb-4">Send to ${g.recipient.name}</h3>
      
      <div class="text-center mb-6">
        <div class="flex items-center justify-center mb-4">
          <span class="currency-symbol">J$</span>
          <input 
            type="text" 
            id="amountInput" 
            class="amount-input" 
            placeholder="0"
            inputmode="numeric"
          >
        </div>
        
        <p class="text-muted">
          Available: ${y(o.balances.JMD,"JMD")}
        </p>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="noteInput">Note (Optional)</label>
        <input 
          type="text" 
          id="noteInput" 
          class="form-input" 
          placeholder="What's this for?"
          maxlength="50"
        >
      </div>
      
      <div class="grid grid-2 gap-4 mb-6">
        <button class="btn btn-secondary" data-quick-amount="1000">J$1,000</button>
        <button class="btn btn-secondary" data-quick-amount="2500">J$2,500</button>
        <button class="btn btn-secondary" data-quick-amount="5000">J$5,000</button>
        <button class="btn btn-secondary" data-quick-amount="10000">J$10,000</button>
      </div>
      
      <button class="btn btn-primary btn-full" id="continueBtn" disabled>
        Continue
      </button>
    </div>
  `}function ot(){return`
    <div class="card">
      <h3 class="text-lg mb-6 text-center">Confirm Transfer</h3>
      
      <div class="text-center mb-6">
        <div class="text-3xl mb-2">${g.recipient.avatar}</div>
        <h4 class="text-lg font-semibold">${g.recipient.name}</h4>
        <p class="text-muted">${g.recipient.phone}</p>
      </div>
      
      <div class="space-y-4 mb-6">
        <div class="flex justify-between">
          <span class="text-muted">Amount:</span>
          <span class="font-semibold">${y(g.amount,"JMD")}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-muted">Fee:</span>
          <span class="font-semibold">J$0.00</span>
        </div>
        
        
        
        <hr style="border-color: var(--border);">
        
        <div class="flex justify-between">
          <span class="text-muted">Total:</span>
          <span class="font-semibold text-lg">${y(g.amount,"JMD")}</span>
        </div>
      </div>
      
      <button class="btn btn-primary btn-full" data-testid="btnConfirmSend">
        Send Money
      </button>
      
      <button class="btn btn-ghost btn-full mt-4" data-action="edit-amount">
        Edit Amount
      </button>
    </div>
  `}function lt(){const t=r("#app");s(t,'[data-action="nav-back"]',"click"),s(t,'[data-action="scan-qr"]',"click"),s(t,".contact-item","click"),s(t,"#amountInput","input"),s(t,"[data-quick-amount]","click"),s(t,"#continueBtn","click"),s(t,'[data-testid="btnConfirmSend"]',"click"),s(t,'[data-action="edit-amount"]',"click")}const L=document.createElement("style");L.textContent=`
  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
  }
  
  .contact-item:hover {
    border-color: var(--primary);
    background-color: rgba(124, 58, 237, 0.08);
  }
  
  .opacity-50 {
    opacity: 0.5;
  }
`;document.head.appendChild(L);function ct(){const t=r("#app");t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Add Money</h1>
        <div></div>
      </div>
      
      <div class="mb-6">
        <div class="card">
          <h3 class="text-lg mb-4">Choose a method</h3>
          
          <div class="space-y-4">
            <div class="add-money-option" data-method="bank">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🏦</div>
                <div>
                  <h4 class="font-semibold">Bank Transfer</h4>
                  <p class="text-muted text-sm">Transfer from your bank account</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
            
            <div class="add-money-option" data-method="card">
              <div class="flex items-center gap-4">
                <div class="text-2xl">💳</div>
                <div>
                  <h4 class="font-semibold">Card Top-Up</h4>
                  <p class="text-muted text-sm">Add money using debit/credit card</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
            
            <div class="add-money-option" data-method="agent">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🏪</div>
                <div>
                  <h4 class="font-semibold">Cash Agent</h4>
                  <p class="text-muted text-sm">Visit a NovaPay agent location</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
            
            <div class="add-money-option" data-method="remittance">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🌍</div>
                <div>
                  <h4 class="font-semibold">Remittance</h4>
                  <p class="text-muted text-sm">Receive money from abroad</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bank Transfer Details (hidden by default) -->
      <div id="bankDetails" class="card hidden">
        <h3 class="text-lg mb-4">Bank Transfer Details</h3>
        
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-muted">Bank Name:</span>
            <span>National Commercial Bank</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-muted">Account Name:</span>
            <span>NovaPay Limited</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-muted">Account Number:</span>
            <span>123-456-789</span>
            <button class="btn-ghost text-sm" data-action="copy-account">Copy</button>
          </div>
          
          <div class="flex justify-between">
            <span class="text-muted">Reference:</span>
            <span id="walletId">NP${o.session.user.phone.replace(/\D/g,"").slice(-6)}</span>
            <button class="btn-ghost text-sm" data-action="copy-reference">Copy</button>
          </div>
        </div>
        
        <div class="mt-6">
          <button class="btn btn-secondary btn-full" data-action="share-details">
            Share Details
          </button>
        </div>
        
        <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p class="text-sm text-yellow-800">
            💡 Use your wallet ID as the transfer reference so we can credit your account automatically.
          </p>
        </div>
      </div>
      
      <!-- Quick Amount Buttons -->
      <div class="card">
        <h3 class="text-lg mb-4">Quick Add</h3>
        <div class="grid grid-2 gap-4">
          <button class="btn btn-secondary" data-amount="5000">J$5,000</button>
          <button class="btn btn-secondary" data-amount="10000">J$10,000</button>
          <button class="btn btn-secondary" data-amount="20000">J$20,000</button>
          <button class="btn btn-secondary" data-amount="50000">J$50,000</button>
        </div>
      </div>
    </div>
  `;const e=document.createElement("style");e.textContent=`
    .add-money-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 2px solid var(--border);
      border-radius: var(--radius);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .add-money-option:hover {
      border-color: var(--primary);
      background-color: rgba(124, 58, 237, 0.08);
    }
    
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
  `,document.head.appendChild(e),s(t,".add-money-option","click"),s(t,'[data-action="copy-account"]',"click"),s(t,'[data-action="copy-reference"]',"click"),s(t,'[data-action="share-details"]',"click"),s(t,"[data-amount]","click")}function rt(){const t=r("#app"),e=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Pay Bills</h1>
        <div></div>
      </div>
      
      ${dt(e)}
    </div>
  `,vt()}function dt(t){return`
    <div class="mb-4">
      <input 
        type="text" 
        id="billerSearch" 
        class="form-input" 
        placeholder="Search billers..."
      >
    </div>
    
    ${o.savedBillers.length>0?`
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Saved Billers</h3>
        <div class="saved-billers">
          ${o.savedBillers.map(e=>`
            <div class="biller-item saved" data-biller='${JSON.stringify(e)}'>
              <div class="flex items-center gap-4">
                <div class="text-2xl">${e.icon||"📄"}</div>
                <div>
                  <h4 class="font-semibold">${e.name}</h4>
                  <p class="text-muted text-sm">${e.account}</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
          `).join("")}
        </div>
      </div>
    `:""}
    
    <div class="card">
      <h3 class="text-lg mb-4">All Billers</h3>
      <div class="biller-grid">
        ${t.map(e=>`
          <div class="biller-item" data-biller='${JSON.stringify(e)}'>
            <div class="flex items-center gap-4">
              <div class="text-2xl">${e.icon}</div>
              <div>
                <h4 class="font-semibold">${e.name}</h4>
                <p class="text-muted text-sm">${e.category}</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function vt(){const t=r("#app");s(t,".biller-item","click"),s(t,'[data-action="nav-back"]',"click"),s(t,'[data-action="bill-back"]',"click"),s(t,"#billerSearch","input"),s(t,"#billForm","submit"),s(t,"#billAmount","input")}const D=document.createElement("style");D.textContent=`
  .biller-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
  }
  
  .biller-item:hover {
    border-color: var(--primary);
    background-color: rgba(124, 58, 237, 0.08);
  }
  
  .biller-item.saved {
    background-color: rgba(124, 58, 237, 0.12);
  }
  
  .flex-1 {
    flex: 1;
  }
`;document.head.appendChild(D);function ut(){const t=r("#app");t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Cash Out</h1>
        <div></div>
      </div>
      
      ${pt()}
    </div>
  `,ht()}function pt(){return`
    <div class="card mb-6">
      <h3 class="text-lg mb-4">Choose withdrawal method</h3>
      
      <div class="method-list">
        <div class="method-item" data-method="bank">
          <div class="flex items-center gap-4">
            <div class="text-2xl">🏦</div>
            <div>
              <h4 class="font-semibold">Bank Transfer</h4>
              <p class="text-muted text-sm">Transfer to your bank account</p>
              <p class="text-xs text-success">Free • 1-2 business days</p>
            </div>
          </div>
          <div class="text-muted">→</div>
        </div>
        
        <div class="method-item" data-method="agent">
          <div class="flex items-center gap-4">
            <div class="text-2xl">🏪</div>
            <div>
              <h4 class="font-semibold">Cash Agent</h4>
              <p class="text-muted text-sm">Pick up cash at agent location</p>
              <p class="text-xs text-success">J$50 fee • Instant</p>
            </div>
          </div>
          <div class="text-muted">→</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h3 class="text-lg mb-4">Available Balance</h3>
      <div class="text-center">
        <div class="text-3xl font-bold text-accent mb-2">
          ${y(o.balances.JMD,"JMD")}
        </div>
        <p class="text-muted">Ready to withdraw</p>
      </div>
    </div>
  `}function ht(){const t=r("#app");s(t,'[data-action="nav-back"]',"click"),s(t,".method-item","click"),s(t,".bank-account-item","click"),s(t,"[data-quick-amount]","click"),s(t,"#withdrawAmount, #agentAmount","input"),s(t,"#bankWithdrawForm","submit"),s(t,"#agentWithdrawForm","submit"),s(t,'[data-action="withdraw-back"]',"click"),s(t,'[data-action="agent-complete"]',"click")}const P=document.createElement("style");P.textContent=`
  .method-item, .bank-account-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
  }
  
  .method-item:hover, .bank-account-item:hover {
    border-color: var(--primary);
    background-color: rgba(124, 58, 237, 0.08);
  }
  
  .flex-1 { flex: 1; }
  .space-y-1 > * + * { margin-top: 0.25rem; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
`;document.head.appendChild(P);function mt(){r("#app"),o.card.hasCard?bt():gt()}function gt(){const t=r("#app");t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Virtual Card</h1>
        <div></div>
      </div>
      
      <div class="card text-center">
        <div class="text-6xl mb-4">💳</div>
        <h3 class="text-lg font-semibold mb-2">Get Your Virtual Card</h3>
        <p class="text-muted mb-6">
          Shop online, pay bills, and make purchases anywhere Visa is accepted
        </p>
        
        <div class="space-y-4 mb-6 text-left">
          <div class="flex items-center gap-4">
            <div class="text-2xl">🛒</div>
            <div>
              <h4 class="font-semibold">Online Shopping</h4>
              <p class="text-muted text-sm">Use anywhere online that accepts Visa</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="text-2xl">🔒</div>
            <div>
              <h4 class="font-semibold">Secure Payments</h4>
              <p class="text-muted text-sm">Advanced security with instant notifications</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="text-2xl">⚡</div>
            <div>
              <h4 class="font-semibold">Instant Activation</h4>
              <p class="text-muted text-sm">Ready to use in seconds</p>
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary btn-full" data-testid="btnActivateCard">
          Get Virtual Card
        </button>
        
        <p class="text-xs text-muted mt-4">
          Free to activate • No monthly fees
        </p>
      </div>
    </div>
  `,s(t,'[data-testid="btnActivateCard"]',"click")}function bt(){const t=r("#app"),e=o.txs.filter(i=>i.type==="CARD").slice(0,5);t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Virtual Card</h1>
        <div></div>
      </div>
      
      <!-- Card Display -->
      <div class="card-display">
        <div class="flex justify-between items-start mb-4">
          <div>
            <div class="text-sm opacity-80">NovaPay Virtual</div>
            <div class="text-lg font-semibold">Visa Debit</div>
          </div>
          <div class="text-2xl">💳</div>
        </div>
        
        <div class="card-number" id="cardNumber">
          ${o.card.masked}
        </div>
        
        <div class="card-details">
          <div>
            <div class="text-xs opacity-80">VALID THRU</div>
            <div class="font-semibold">${o.card.expiry}</div>
          </div>
          <div>
            <div class="text-xs opacity-80">CVV</div>
            <div class="font-semibold" id="cvvDisplay">•••</div>
          </div>
        </div>
      </div>
      
      <!-- Card Actions -->
      <div class="grid grid-2 gap-4 mb-6">
        <button class="btn btn-secondary" id="toggleCvv">
          👁️ Reveal CVV
        </button>
        <button class="btn btn-secondary" id="toggleFreeze">
          ${o.card.frozen?"🔓 Unfreeze":"🔒 Freeze"} Card
        </button>
      </div>
      
      <!-- Additional Actions -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Card Management</h3>
        
        <div class="space-y-4">
          <button class="card-action" id="addToWallet">
            <div class="flex items-center gap-4">
              <div class="text-2xl">📱</div>
              <div>
                <h4 class="font-semibold">Add to Wallet</h4>
                <p class="text-muted text-sm">Add to Apple Pay or Google Pay</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="card-action" id="setLimits">
            <div class="flex items-center gap-4">
              <div class="text-2xl">⚙️</div>
              <div>
                <h4 class="font-semibold">Set Limits</h4>
                <p class="text-muted text-sm">Manage spending limits</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="card-action" id="cardSettings">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔧</div>
              <div>
                <h4 class="font-semibold">Card Settings</h4>
                <p class="text-muted text-sm">Notifications and preferences</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Recent Transactions -->
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg">Card Transactions</h3>
          <button class="btn-ghost text-sm">View All</button>
        </div>
        
        <div class="tx-list">
          ${e.length>0?e.map(i=>`
            <div class="tx-item">
              <div class="tx-info">
                <h4>${i.title}</h4>
                <p>${it(i.ts)}</p>
              </div>
              <div class="tx-amount ${i.amount>0?"positive":"negative"}">
                ${i.amount>0?"+":""}${y(i.amount,i.currency)}
              </div>
            </div>
          `).join(""):`
            <div class="text-center py-8">
              <div class="text-4xl mb-2">💳</div>
              <p class="text-muted">No card transactions yet</p>
              <p class="text-muted text-sm">Start using your virtual card to see transactions here</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `,ft()}function ft(){const t=r("#app");s(t,'[data-action="nav-back"]',"click"),s(t,"#toggleCvv","click"),s(t,"#toggleFreeze","click"),s(t,"#addToWallet","click"),s(t,"#setLimits","click"),s(t,"#cardSettings","click")}const N=document.createElement("style");N.textContent=`
  .card-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: transparent;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    color: var(--text);
  }
  
  .card-action:hover {
    border-color: var(--accent);
    background-color: rgba(79, 209, 197, 0.05);
  }
  
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
`;document.head.appendChild(N);function xt(){const t=r("#app");t.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Profile</h1>
        <div></div>
      </div>
      
      <!-- User Info -->
      <div class="card mb-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="text-4xl">👤</div>
          <div>
            <h3 class="text-lg font-semibold">${o.session.user.name}</h3>
            <p class="text-muted">${o.session.user.email}</p>
            <p class="text-muted text-sm">${o.session.user.phone}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${o.session.kycTier==="TIER_2"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}">
            ${o.session.kycTier==="TIER_2"?"Verified":"Basic Account"}
          </span>
        </div>
      </div>
      
      <!-- KYC Section -->
      ${o.session.kycTier!=="TIER_2"?`
        <div class="card mb-6">
          <h3 class="text-lg mb-4">Complete Your Verification</h3>
          <p class="text-muted mb-4">
            Unlock higher limits and more features by completing your identity verification.
          </p>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center gap-3">
              <div class="text-success">✅</div>
              <span class="text-sm">Phone number verified</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-success">✅</div>
              <span class="text-sm">Email address verified</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-muted">⏳</div>
              <span class="text-sm text-muted">Government ID verification</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-muted">⏳</div>
              <span class="text-sm text-muted">Address verification</span>
            </div>
          </div>
          
          <button class="btn btn-primary btn-full" id="completeKyc">
            Complete Verification
          </button>
        </div>
      `:""}
      
      <!-- Account Settings -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Account Settings</h3>
        
        <div class="space-y-4">
          <button class="profile-action" id="enableBiometric">
            <div class="flex items-center gap-4">
              <div class="text-2xl">👆</div>
              <div>
                <h4 class="font-semibold">Enable Biometric</h4>
                <p class="text-muted text-sm">Use fingerprint or face unlock</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="changePin">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔢</div>
              <div>
                <h4 class="font-semibold">Change PIN</h4>
                <p class="text-muted text-sm">Update your transaction PIN</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="notifications">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔔</div>
              <div>
                <h4 class="font-semibold">Notifications</h4>
                <p class="text-muted text-sm">Manage your notification preferences</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="privacy">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔒</div>
              <div>
                <h4 class="font-semibold">Privacy & Security</h4>
                <p class="text-muted text-sm">Manage your privacy settings</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Support -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Support</h3>
        
        <div class="space-y-4">
          <button class="profile-action" id="helpCenter">
            <div class="flex items-center gap-4">
              <div class="text-2xl">❓</div>
              <div>
                <h4 class="font-semibold">Help Center</h4>
                <p class="text-muted text-sm">Get answers to common questions</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="contactSupport">
            <div class="flex items-center gap-4">
              <div class="text-2xl">💬</div>
              <div>
                <h4 class="font-semibold">Contact Support</h4>
                <p class="text-muted text-sm">Chat with our support team</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="feedback">
            <div class="flex items-center gap-4">
              <div class="text-2xl">📝</div>
              <div>
                <h4 class="font-semibold">Send Feedback</h4>
                <p class="text-muted text-sm">Help us improve NovaPay</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Legal -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Legal</h3>
        
        <div class="space-y-4">
          <button class="profile-action" id="terms">
            <div class="flex items-center gap-4">
              <div class="text-2xl">📄</div>
              <div>
                <h4 class="font-semibold">Terms of Service</h4>
                <p class="text-muted text-sm">Read our terms and conditions</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="privacy-policy">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🛡️</div>
              <div>
                <h4 class="font-semibold">Privacy Policy</h4>
                <p class="text-muted text-sm">How we protect your data</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Logout -->
      <div class="card">
        <button class="btn btn-secondary btn-full" data-testid="btnLogout">
          🚪 Sign Out
        </button>
        
        <div class="text-center mt-4">
          <p class="text-xs text-muted">
            NovaPay v1.0.0 • Made with ❤️ in Jamaica
          </p>
        </div>
      </div>
    </div>
  `,yt()}function yt(){const t=r("#app");s(t,'[data-action="nav-back"]',"click"),s(t,"#completeKyc","click"),s(t,"#enableBiometric","click"),s(t,"#changePin","click"),s(t,"#notifications","click"),s(t,"#privacy","click"),s(t,"#helpCenter","click"),s(t,"#contactSupport","click"),s(t,"#feedback","click"),s(t,"#terms","click"),s(t,"#privacy-policy","click"),s(t,'[data-testid="btnLogout"]',"click")}const H=document.createElement("style");H.textContent=`
  .profile-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: transparent;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    color: var(--text);
  }
  
  .profile-action:hover {
    border-color: var(--accent);
    background-color: rgba(79, 209, 197, 0.05);
  }
  
  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }
  
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  
  .bg-green-100 {
    background-color: rgba(16, 185, 129, 0.1);
  }
  
  .text-green-800 {
    color: #065f46;
  }
  
  .bg-yellow-100 {
    background-color: rgba(245, 158, 11, 0.1);
  }
  
  .text-yellow-800 {
    color: #92400e;
  }
`;document.head.appendChild(H);function kt(){const t=r("#app");t.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Transactions</h1>
        <button class="icon-btn" id="btnFilter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">All</button>
        <button class="filter-tab" data-filter="income">Income</button>
        <button class="filter-tab" data-filter="expense">Expense</button>
      </div>

      <!-- Transactions List -->
      <div class="transactions-content" id="txContent">
        <!-- Loading skeleton -->
        <div class="tx-skeleton-group">
          <div class="tx-skeleton-date">Loading...</div>
          <div class="tx-skeleton-item"></div>
          <div class="tx-skeleton-item"></div>
          <div class="tx-skeleton-item"></div>
        </div>
      </div>
    </div>
  `,s("click","#btnBack",()=>S()),s("click","#btnFilter",()=>u("Filter options coming soon")),document.querySelectorAll(".filter-tab").forEach(e=>{e.addEventListener("click",i=>{document.querySelectorAll(".filter-tab").forEach(a=>a.classList.remove("active")),i.target.classList.add("active");const n=i.target.dataset.filter;$(n)})}),$("all")}async function $(t="all"){const e=r("#txContent");try{const i=await x("/wallet/transactions");if(!i||i.length===0){e.innerHTML=$t();return}let n=i;t==="income"?n=i.filter(l=>l.kind==="DEPOSIT"||l.kind==="RECEIVE"):t==="expense"&&(n=i.filter(l=>l.kind==="WITHDRAW"||l.kind==="TRANSFER"||l.kind==="BILL"));const a=wt(n);e.innerHTML=Ct(a)}catch(i){console.error("[TRANSACTIONS]",i),e.innerHTML=Bt()}}function wt(t){const e={};return t.forEach(i=>{const n=new Date(i.createdAt),a=St(n);e[a]||(e[a]=[]),e[a].push(i)}),e}function St(t){const e=new Date,i=new Date(e);return i.setDate(i.getDate()-1),t.toDateString()===e.toDateString()?"Today":t.toDateString()===i.toDateString()?"Yesterday":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Ct(t){return Object.entries(t).map(([e,i])=>`
    <div class="tx-group">
      <div class="tx-date-header">${e}</div>
      ${i.map(n=>Tt(n)).join("")}
    </div>
  `).join("")}function Tt(t){const e=t.kind==="DEPOSIT"||t.kind==="RECEIVE",i=e?"tx-icon-green":t.kind==="TRANSFER"?"tx-icon-blue":t.kind==="BILL"?"tx-icon-orange":"tx-icon-red",n=e?"tx-amount-positive":"tx-amount-negative",a=e?"+":"-",l=Et(t.kind),c=Rt(t.kind),v=Mt(t.createdAt),d=(Number(t.amount||0)/100).toFixed(2);return`
    <div class="tx-card">
      <div class="tx-icon-wrapper ${i}">${l}</div>
      <div class="tx-details">
        <div class="tx-label">${c}</div>
        <div class="tx-time">${v}</div>
        ${t.reference?`<div class="tx-ref">Ref: ${t.reference}</div>`:""}
      </div>
      <div class="tx-amount-wrapper">
        <div class="tx-amount ${n}">${a}$${d}</div>
        <div class="tx-currency">${t.currency}</div>
      </div>
    </div>
  `}function Bt(){return`
    <div class="tx-group">
      <div class="tx-date-header">Today</div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">Salary Deposit</div>
          <div class="tx-time">10:30 AM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-positive">+$2,500.00</div>
          <div class="tx-currency">USD</div>
        </div>
      </div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">Transfer to John</div>
          <div class="tx-time">9:15 AM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-negative">-$150.00</div>
          <div class="tx-currency">USD</div>
        </div>
      </div>
    </div>
    <div class="tx-group">
      <div class="tx-date-header">Yesterday</div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-orange">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">Bill Payment</div>
          <div class="tx-time">3:45 PM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-negative">-$85.50</div>
          <div class="tx-currency">USD</div>
        </div>
      </div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-red">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">ATM Withdrawal</div>
          <div class="tx-time">2:20 PM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-negative">-$200.00</div>
          <div class="tx-currency">JMD</div>
        </div>
      </div>
    </div>
  `}function $t(){return`
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      </div>
      <h3 class="empty-title">No Transactions Yet</h3>
      <p class="empty-text">Your transaction history will appear here</p>
    </div>
  `}function Et(t){const e={DEPOSIT:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',WITHDRAW:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',TRANSFER:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',BILL:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',RECEIVE:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'};return e[t]||e.TRANSFER}function Rt(t){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[t]||t}function Mt(t){try{return new Date(t).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}catch{return"Recently"}}function At(){var i;const t=r("#app"),e=((i=o==null?void 0:o.session)==null?void 0:i.kycTier)||"TIER_1";t.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Verification</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <!-- Current Status -->
      <div class="kyc-status-card">
        <div class="kyc-status-badge ${It(e)}">
          ${Lt(e)}
          <span>${Dt(e)}</span>
        </div>
        <h2 class="kyc-status-title">Your Verification Status</h2>
        <p class="kyc-status-desc">${Pt(e)}</p>
      </div>

      <!-- Verification Tiers -->
      <div class="kyc-tiers">
        <h3 class="section-title-sm">Verification Levels</h3>
        
        <!-- Tier 1 -->
        <div class="kyc-tier-card ${e==="TIER_1"?"active":e==="TIER_2"||e==="TIER_3"?"completed":""}">
          <div class="kyc-tier-header">
            <div class="kyc-tier-icon tier-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="kyc-tier-info">
              <h4 class="kyc-tier-title">Basic Verification</h4>
              <p class="kyc-tier-limit">Up to $1,000/month</p>
            </div>
            ${e==="TIER_1"||e==="TIER_2"||e==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="1">Start</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Email verification</li>
            <li>Phone number</li>
            <li>Basic profile information</li>
          </ul>
        </div>

        <!-- Tier 2 -->
        <div class="kyc-tier-card ${e==="TIER_2"?"active":e==="TIER_3"?"completed":""}">
          <div class="kyc-tier-header">
            <div class="kyc-tier-icon tier-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div class="kyc-tier-info">
              <h4 class="kyc-tier-title">Standard Verification</h4>
              <p class="kyc-tier-limit">Up to $10,000/month</p>
            </div>
            ${e==="TIER_2"||e==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="2">Upgrade</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Government-issued ID</li>
            <li>Proof of address</li>
            <li>Selfie verification</li>
          </ul>
        </div>

        <!-- Tier 3 -->
        <div class="kyc-tier-card ${e==="TIER_3"?"active":""}">
          <div class="kyc-tier-header">
            <div class="kyc-tier-icon tier-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div class="kyc-tier-info">
              <h4 class="kyc-tier-title">Premium Verification</h4>
              <p class="kyc-tier-limit">Unlimited transactions</p>
            </div>
            ${e==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="3">Upgrade</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Enhanced due diligence</li>
            <li>Source of funds verification</li>
            <li>Video call interview</li>
          </ul>
        </div>
      </div>

      <!-- Benefits -->
      <div class="kyc-benefits">
        <h3 class="section-title-sm">Why Verify?</h3>
        <div class="benefit-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4 class="benefit-title">Enhanced Security</h4>
            <p class="benefit-desc">Protect your account with verified identity</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h4 class="benefit-title">Higher Limits</h4>
            <p class="benefit-desc">Increase your transaction limits</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
              </svg>
            </div>
            <h4 class="benefit-title">Premium Features</h4>
            <p class="benefit-desc">Access exclusive features and benefits</p>
          </div>
        </div>
      </div>
    </div>
  `,s("click","#btnBack",()=>S()),document.querySelectorAll("[data-tier]").forEach(n=>{n.addEventListener("click",a=>{const l=a.target.dataset.tier;Nt(l)})})}function It(t){return{TIER_1:"tier-basic",TIER_2:"tier-standard",TIER_3:"tier-premium"}[t]||"tier-basic"}function Lt(t){const e={TIER_1:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',TIER_2:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',TIER_3:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>'};return e[t]||e.TIER_1}function Dt(t){return{TIER_1:"Basic",TIER_2:"Standard",TIER_3:"Premium"}[t]||"Basic"}function Pt(t){return{TIER_1:"You have basic verification. Upgrade to unlock higher limits and premium features.",TIER_2:"You have standard verification. Upgrade to premium for unlimited transactions.",TIER_3:"You have premium verification. Enjoy unlimited transactions and all features."}[t]||"Complete verification to unlock all features."}function Nt(t){u(`Starting Tier ${t} verification process...`),setTimeout(()=>{u("Verification process will be available soon")},1e3)}function Ht(){var l,c;const t=r("#app"),e=((l=o==null?void 0:o.session)==null?void 0:l.user)||{},i=e.name||((c=e.email)==null?void 0:c.split("@")[0])||"User",n=e.email||"",a=i.substring(0,2).toUpperCase();t.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Settings</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <!-- Profile Section -->
      <div class="settings-profile">
        <div class="settings-avatar">${a}</div>
        <h2 class="settings-name">${E(i)}</h2>
        <p class="settings-email">${E(n)}</p>
        <button class="btn-outline-sm" id="btnEditProfile">Edit Profile</button>
      </div>

      <!-- Settings Groups -->
      <div class="settings-content">
        <!-- Account Settings -->
        <div class="settings-group">
          <h3 class="settings-group-title">Account</h3>
          <div class="settings-list">
            <button class="settings-item" id="btnProfile">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Personal Information</div>
                <div class="settings-item-desc">Update your details</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnKYC">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Verification</div>
                <div class="settings-item-desc">Verify your identity</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnSecurity">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Security</div>
                <div class="settings-item-desc">Password and 2FA</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div class="settings-group">
          <h3 class="settings-group-title">Preferences</h3>
          <div class="settings-list">
            <div class="settings-item">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Notifications</div>
                <div class="settings-item-desc">Manage alerts</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="toggleNotifications" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-item">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Dark Mode</div>
                <div class="settings-item-desc">Coming soon</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="toggleDarkMode" disabled>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <button class="settings-item" id="btnLanguage">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Language</div>
                <div class="settings-item-desc">English (US)</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Support -->
        <div class="settings-group">
          <h3 class="settings-group-title">Support</h3>
          <div class="settings-list">
            <button class="settings-item" id="btnHelp">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Help Center</div>
                <div class="settings-item-desc">FAQs and support</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnTerms">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Terms & Privacy</div>
                <div class="settings-item-desc">Legal information</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnAbout">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">About NovaPay</div>
                <div class="settings-item-desc">Version 1.0.0</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-group">
          <div class="settings-list">
            <button class="settings-item danger" id="btnLogout">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Log Out</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,s("click","#btnBack",()=>S()),s("click","#btnEditProfile",()=>h("/profile")),s("click","#btnProfile",()=>h("/profile")),s("click","#btnKYC",()=>h("/kyc")),s("click","#btnSecurity",()=>u("Security settings coming soon")),s("click","#btnLanguage",()=>u("Language settings coming soon")),s("click","#btnHelp",()=>u("Help center coming soon")),s("click","#btnTerms",()=>u("Terms & Privacy coming soon")),s("click","#btnAbout",()=>u("NovaPay v1.0.0 - Modern Digital Wallet")),s("click","#btnLogout",()=>{confirm("Are you sure you want to log out?")&&(j(),u("Logged out successfully"),h("/login"))}),s("change","#toggleNotifications",v=>{const d=v.target.checked;u(`Notifications ${d?"enabled":"disabled"}`)})}function E(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}class Ft{constructor(){this.routes=new Map,this.currentRoute=null,this.defaultRoute="/login",this.authRoute="/dashboard",window.addEventListener("hashchange",()=>this.handleRoute()),window.addEventListener("load",()=>this.handleRoute()),console.log("[Router] Initialized hash-based routing system ✅")}addRoute(e,i,n=!1){this.routes.set(e,{handler:i,requiresAuth:n})}setDefaults(e,i){this.defaultRoute=e,this.authRoute=i}navigate(e){window.location.hash!==`#${e}`?window.location.hash=e:this.handleRoute()}redirect(e){window.location.replace(`#${e}`)}goBack(){window.history.back()}getCurrentHash(){return window.location.hash.slice(1)||""}handleRoute(){const e=this.getCurrentHash();console.log(`[Router] Handling route: ${e||"(none)"}`);let i=this.routes.get(e);if(!i){const n=k()?this.authRoute:this.defaultRoute;console.warn(`[Router] Unknown route "${e}". Redirecting to: ${n}`),this.redirect(n);return}if(i.requiresAuth&&!k()){console.warn(`[Router] Protected route "${e}" blocked — user not logged in`),this.redirect(this.defaultRoute);return}if(!i.requiresAuth&&k()&&(e==="/login"||e==="/register"||e==="/landing")){console.log(`[Router] User logged in, redirecting from public route "${e}" to dashboard`),this.redirect(this.authRoute);return}try{console.log(`[Router] Rendering route: ${e}`);const n=document.getElementById("app");n&&(n.innerHTML=""),i.handler(),this.currentRoute=e}catch(n){console.error(`[Router] Error rendering route "${e}":`,n);const a=document.getElementById("app");a&&(a.innerHTML=`
          <div style="padding:20px;color:#fff;background:#111;text-align:center;">
            <h3>🚨 Rendering Error</h3>
            <p>${n.message}</p>
          </div>`)}}}const p=new Ft;function h(t){p.navigate(t)}function S(){p.goBack()}p.addRoute("/login",W);p.addRoute("/register",z);p.addRoute("/landing",et);p.addRoute("/dashboard",Y,!0);p.addRoute("/transfers",st,!0);p.addRoute("/add-money",ct,!0);p.addRoute("/bills",rt,!0);p.addRoute("/withdraw",ut,!0);p.addRoute("/card",mt,!0);p.addRoute("/profile",xt,!0);p.addRoute("/transactions",kt,!0);p.addRoute("/kyc",At,!0);p.addRoute("/settings",Ht,!0);p.setDefaults("/login","/dashboard");console.log("[Router] Routes registered:",Array.from(p.routes.keys()));console.log("[NovaPay] Vite frontend initializing...");try{V()}catch(t){console.error("[NovaPay] Failed to load auth token:",t)}function R(){!location.hash||location.hash==="#/"||location.hash===""?(console.log("[NovaPay] No hash detected, redirecting to /login"),h("/login")):(console.log(`[NovaPay] Hash detected: ${location.hash}`),window.dispatchEvent(new Event("hashchange")))}function M(){const t=document.getElementById("app");t&&!t.innerHTML.trim()&&(t.innerHTML=`
      <div style="padding:16px;color:#fff;background:#111;text-align:center;">
        <h2>🚀 NovaPay Loaded</h2>
        <p>Frontend running. Check router or console for issues.</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `,console.warn("[NovaPay] Failsafe rendered: router did not paint any view."))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{console.log("[NovaPay] DOMContentLoaded → initializing..."),R(),setTimeout(M,500)}):(console.log("[NovaPay] DOM ready → initializing immediately..."),R(),setTimeout(M,500));
