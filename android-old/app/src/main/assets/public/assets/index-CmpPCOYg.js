(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function l(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function r(u){if(u.ep)return;u.ep=!0;const h=l(u);fetch(u.href,h)}})();const $v=/Android/i.test(navigator.userAgent),gp=location.hostname==="localhost"||location.hostname==="127.0.0.1",tg=typeof window<"u"&&!!window.Capacitor;let Di="http://localhost:4000";if(!Di){const i=location.hostname;tg?Di=`http://${i}:4000`:$v&&(i==="10.0.2.2"||gp)?Di="http://10.0.2.2:4000":gp?Di="http://localhost:4000":Di=`http://${i}:4000`}!$v&&!tg&&(Di="http://localhost:4000");const eg=Di;try{console.log("[NovaPay] API_BASE_URL =",eg)}catch{}let Us=null;function ng(i,a){Us=i;try{const l=a||{},r=l.persist!==void 0?l.persist:!0,u=typeof l.ttlMs=="number"&&l.ttlMs>0;if(!r){localStorage.removeItem("nv_token"),localStorage.removeItem("nv_token_exp");return}if(localStorage.setItem("nv_token",i),u){const h=Date.now()+l.ttlMs;localStorage.setItem("nv_token_exp",String(h))}else localStorage.removeItem("nv_token_exp")}catch{}}function y1(){try{const i=localStorage.getItem("nv_token");if(!i)return;const a=localStorage.getItem("nv_token_exp");if(a){const l=Number(a);if(!Number.isNaN(l)&&Date.now()>l){ig();return}}Us=i}catch{}}function ig(){Us=null,localStorage.removeItem("nv_token"),localStorage.removeItem("nv_token_exp")}function b1(i={}){const a={"Content-Type":"application/json",...i};return Us?{...a,Authorization:`Bearer ${Us}`}:a}async function zi(i,a={}){const l=`${eg}${i}`;try{console.log("[NovaPay] Fetch",a.method||"GET",l)}catch{}const r=await fetch(l,{...a,headers:b1(a.headers||{})});let u=null;try{u=await r.clone().json()}catch{u=null}if(r.status===401)throw ig(),window.location.hash="#/login",new Error("Unauthorized");if(!r.ok)throw u||new Error(`HTTP ${r.status}`);return u}const j={session:null,balances:{JMD:125e3,USD:180},txs:[{id:"t1",title:"From John",amount:7500,currency:"JMD",type:"P2P_RECV",ts:"2025-09-01"},{id:"t2",title:"JPS Bill",amount:-8500,currency:"JMD",type:"BILL",ts:"2025-09-02"}],notifications:[],savedBillers:[],card:{hasCard:!1,masked:"•••• 1234",expiry:"12/28",frozen:!1,linkedAccounts:[]}},ne={SESSION:"novapay_session",BALANCES:"novapay_balances",TRANSACTIONS:"novapay_transactions",NOTIFICATIONS:"novapay_notifications",BILLERS:"novapay_billers",CARD:"novapay_card"};function A1(){try{const i=localStorage.getItem(ne.SESSION);if(i)try{const f=JSON.parse(i),p=f.rememberMe,v=f.rememberMeExpiresAt;p===!0&&v&&Date.now()>v?localStorage.removeItem(ne.SESSION):j.session=f}catch(f){console.error("Error parsing stored session:",f)}const a=localStorage.getItem(ne.BALANCES);a&&(j.balances=JSON.parse(a));const l=localStorage.getItem(ne.TRANSACTIONS);l&&(j.txs=JSON.parse(l));const r=localStorage.getItem(ne.NOTIFICATIONS);r&&(j.notifications=JSON.parse(r));const u=localStorage.getItem(ne.BILLERS);u&&(j.savedBillers=JSON.parse(u));const h=localStorage.getItem(ne.CARD);h&&(j.card=JSON.parse(h))}catch(i){console.error("Error loading state:",i)}}function en(){try{if(j.session){const{rememberMe:i,rememberMeExpiresAt:a}=j.session,l=Date.now();i===!0?!a||l<a?localStorage.setItem(ne.SESSION,JSON.stringify(j.session)):localStorage.removeItem(ne.SESSION):i===!1?localStorage.removeItem(ne.SESSION):localStorage.setItem(ne.SESSION,JSON.stringify(j.session))}else localStorage.removeItem(ne.SESSION);localStorage.setItem(ne.BALANCES,JSON.stringify(j.balances)),localStorage.setItem(ne.TRANSACTIONS,JSON.stringify(j.txs)),localStorage.setItem(ne.NOTIFICATIONS,JSON.stringify(j.notifications||[])),localStorage.setItem(ne.BILLERS,JSON.stringify(j.savedBillers)),localStorage.setItem(ne.CARD,JSON.stringify(j.card))}catch(i){console.error("Error saving state:",i)}}function S1(){Object.values(ne).forEach(i=>{localStorage.removeItem(i)})}function Kc(){return j.session!==null}function x1(){j.session=null,en()}function js(i){const a={id:"t"+Date.now(),ts:new Date().toISOString().split("T")[0],...i};return j.txs.unshift(a),en(),a}function Ys(i,a){j.balances[i]!==void 0&&(j.balances[i]+=a,en())}function Ni(i,a="JMD"){return j.balances[a]>=i}function T1(i){j.savedBillers.find(l=>l.name===i.name&&l.account===i.account)||(j.savedBillers.push({id:"b"+Date.now(),...i}),en())}function C1(){try{j.session=null,j.balances={JMD:0,USD:0},j.txs=[],j.notifications=[],j.savedBillers=[],j.card={hasCard:!1,masked:"",expiry:"",frozen:!1,linkedAccounts:[]},S1(),console.log("[NovaPay] Session cleared successfully")}catch(i){console.error("[NovaPay] Failed to clear session:",i)}}A1();function U(i){return document.querySelector(i)}function L(i,a,l,r){try{let u=document,h,f,p;const v=y=>typeof y=="string"&&(y[0]==="#"||y[0]==="."||y[0]==="["||y.includes(" "));if(typeof i=="string"&&typeof a=="string"&&typeof l=="function"&&r===void 0){u=document;const y=i,b=a;v(y)&&!v(b)?(h=y,f=b):(v(b)&&v(y),h=b,f=y),p=l}else u=i instanceof Element?i:document,h=a,f=l,p=r;if(typeof p!="function"||typeof f!="string"||typeof h!="string"){console.warn(`[NovaPay] Invalid listener for ${h??a} (${f??l})`);return}if(!u.querySelector(h)){u.addEventListener(f,y=>{y.target.closest(h)&&p(y)});return}const m=u.querySelector(h);m?m.addEventListener(f,p):console.warn(`[NovaPay] Invalid listener for ${h} (${f})`)}catch(u){console.error("[NovaPay] Event binding failed:",u)}}function X(i){alert(i)}const yp=300*1e3;function E1(){const i=U("#app");i.innerHTML=`
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
          <p class="auth-subtitle">Let's sign you in!</p>
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
            <label class="checkbox-wrapper remember-checkbox">
              <input type="checkbox" id="rememberMe">
              <span class="checkbox-icon"></span>
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
  `,L("click",'[data-testid="btnBack"]',()=>{K("/landing")}),L("click","#forgotPassword",a=>{a.preventDefault(),K("/forgot-password",{animate:"slide-right-fade"})}),L("submit","#loginForm",async a=>{a.preventDefault();const l=U("#email").value.trim(),r=U("#password").value,u=U("#rememberMe"),h=!!u&&u.checked;if(!l){X("Please enter your email address");return}if(!r){X("Please enter your password");return}const f=U('[data-testid="btnLogin"]');f.textContent="Signing In...",f.disabled=!0;try{const p=await zi("/auth/login",{method:"POST",body:JSON.stringify({email:l,password:r})});ng(p.token,{persist:h,ttlMs:h?yp:0});const v=Date.now();j.session={user:{email:p.user.email,id:p.user.id},kycTier:"TIER_1",rememberMe:h,rememberMeExpiresAt:h?v+yp:null},Array.isArray(j.notifications)||(j.notifications=[]),j.notifications.unshift({id:"n"+Date.now(),message:"Welcome to NovaPay!",createdAt:new Date().toISOString()}),en(),X("Welcome back!","success"),K("/dashboard")}catch(p){const v=p?.error?.code||p?.message||"LOGIN_FAILED",m=v==="BAD_CRED"?"Invalid email or password":v==="NO_USER"?"Account not found":v==="NO_AUTH"?"Session expired, please log in again":"Unable to sign in";console.error("Login Error:",p),X(m)}finally{f.textContent="Sign In",f.disabled=!1}})}function w1(){const i=U("#app");i.innerHTML=`
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
            <label class="form-label" for="firstName">First Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input 
                type="text" 
                id="firstName" 
                class="form-input-modern" 
                placeholder="John"
                required
              >
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="lastName">Last Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input 
                type="text" 
                id="lastName" 
                class="form-input-modern" 
                placeholder="Doe"
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
            <span class="checkbox-icon"></span>
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
  `,L("click",'[data-testid="btnBack"]',()=>{K("/landing")}),L("submit","#registerForm",async a=>{a.preventDefault();const l=U("#firstName").value.trim(),r=U("#lastName").value.trim(),u=`${l} ${r}`.trim(),h=U("#email").value.trim(),f=U("#phone").value.trim(),p=U("#password").value,v=!!U("#agreeTerms")&&U("#agreeTerms").checked;if(!l||!r||!h||!f||!p||!v){X("Please fill in all fields and agree to the Terms & Conditions");return}if(p.length<6){X("Password must be at least 6 characters");return}const m=U('[data-testid="btnRegister"]');m.textContent="Creating Account...",m.disabled=!0;try{const y=await zi("/auth/register",{method:"POST",body:JSON.stringify({name:u,email:h,phone:f,password:p})});ng(y.token),j.session={user:{email:y.user.email,id:y.user.id,name:y.user.name||u,phone:y.user.phone||f},kycTier:"TIER_1"},en(),X("Account created successfully!","success"),K("/dashboard")}catch(y){const b=y?.error?.code||y?.message||"REGISTER_FAILED",T=b==="USER_EXISTS"?"An account with this email already exists":b==="INVALID_EMAIL"?"Please enter a valid email address":b==="WEAK_PASSWORD"?"Password is too weak":"Unable to create account. Please try again.";console.error("Registration Error:",y),X(T)}finally{m.textContent="Create Account",m.disabled=!1}}),L("input","#phone",a=>{let l=a.target.value.replace(/\D/g,"");l.length>=3&&(l=l.replace(/(\d{3})(\d{0,3})(\d{0,4})/,(r,u,h,f)=>{let p=u;return h&&(p+="-"+h),f&&(p+="-"+f),p})),a.target.value=l})}const ag="/assets/Popup-VzOhX8gb.png";function M1(){const i=U("#app");i&&(i.innerHTML=`
    <div class="password-recovery-wrapper">
      <div class="auth-container" id="forgotRecoveryBase">
        <div class="auth-header">
          <button class="icon-btn" data-testid="btnBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        <div class="auth-content">
          <div class="auth-brand">
            <div class="auth-logo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="url(#gradient-forgot)"/>
                <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="gradient-forgot" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stop-color="#543AF8"/>
                    <stop offset="100%" stop-color="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 class="auth-title">Password Recovery</h1>
            <p class="auth-subtitle">Hello There. You forget your password?</p>
          </div>

          <form id="forgotPasswordForm" class="auth-form">
            <div class="form-field">
              <label class="form-label" for="forgotEmail">Email</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  id="forgotEmail"
                  class="form-input-modern"
                  placeholder="Email"
                  required
                >
              </div>
            </div>

            <button type="submit" class="btn-primary-modern" data-testid="btnForgotPasswordContinue">
              Continue
            </button>
          </form>
        </div>
      </div>

      <div class="password-recovery-sheet" id="forgotRecoverySheet" style="display: none;">
        <div class="password-recovery-sheet-card">
          <div class="password-recovery-sheet-icon">
            <img src="${ag}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnForgotPopupDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `,L("click",'[data-testid="btnBack"]',()=>{K("/login",{animate:"slide-left-fade"})}),L("submit","#forgotPasswordForm",async a=>{a.preventDefault();const l=U("#forgotEmail"),r=l?l.value.trim():"";if(!r){X("Please enter your email address");return}sessionStorage.setItem("novapay_password_recovery_email",r);const u=U('[data-testid="btnForgotPasswordContinue"]');u&&(u.textContent="Sending...",u.disabled=!0);try{X("If an account exists for this email, we will send reset instructions.","info")}finally{u&&(u.textContent="Continue",u.disabled=!1)}const h=U("#forgotRecoveryBase"),f=U("#forgotRecoverySheet");h&&h.classList.add("password-recovery-base"),f&&(f.style.display="flex")}),L("click","#btnForgotPopupDone",()=>{const a=U("#forgotRecoveryBase"),l=U("#forgotRecoverySheet");a&&a.classList.remove("password-recovery-base"),l&&(l.style.display="none"),sessionStorage.removeItem("novapay_password_recovery_email"),K("/login",{animate:"slide-left-fade"})}))}function D1(){const i=U("#app");if(!i)return;const l=sessionStorage.getItem("novapay_password_recovery_email")||""||"your email",r=R1(l);i.innerHTML=`
    <div class="password-recovery-wrapper">
      <div class="auth-container password-recovery-base">
        <div class="auth-header">
          <button class="icon-btn" data-testid="btnBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        <div class="auth-content">
          <div class="auth-brand">
            <div class="auth-logo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="url(#gradient-check-email)"/>
                <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="gradient-check-email" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stop-color="#543AF8"/>
                    <stop offset="100%" stop-color="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 class="auth-title">Password Recovery</h1>
            <p class="auth-subtitle">Hello There. You forget your password?</p>
          </div>

          <div class="form-field">
            <label class="form-label" for="confirmEmail">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="confirmEmail"
                class="form-input-modern"
                value="${r}"
                disabled
              >
            </div>
          </div>
        </div>
      </div>

      <div class="password-recovery-sheet">
        <div class="password-recovery-sheet-card">
          <div class="password-recovery-sheet-icon">
            <img src="${ag}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnCheckEmailDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `,L("click",'[data-testid="btnBack"]',()=>{K("/forgot-password",{animate:"slide-left-fade"})}),L("click","#btnCheckEmailDone",()=>{sessionStorage.removeItem("novapay_password_recovery_email"),K("/login",{animate:"slide-left-fade"})})}function R1(i){return String(i).replace(/[&<>"']/g,a=>a==="&"?"&amp;":a==="<"?"&lt;":a===">"?"&gt;":a==='"'?"&quot;":"&#39;")}const B1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABQCAYAAACzg5PLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAjYSURBVHhe7ZxNTFvZFcf/59omJngkWBDBaoxUNuNKsUdirKRqMKuqsCApgW1hZtdkymwymyxipIlaqZuhgu6SMMsCScOCdImZSJMykcZEKrNhMZ4VESzGVZzYiZ/v6eL5mefr5+cP3jMfzk+KCPe+gO8/55x77rn3PsIxMD7M3d5cLkwkwyDPRTB3s6AwABAQLHuYOc2gFAFpJtomqf3MLLY1v397bZPSZc+2AFIb3GIimo3BI8aJOQxCTO1vBmZsgyiBglx7uNWZUPvdwFXBxqPZoM9DfwTzFyDqVvsdJgVGIi95bm2rM6V2OoUrgk1EszESdMcpS2oYyY+ZMe+G1Tkq2LELpaJb3IyTFueIYOPD3O3N5+4Q6Au170TAWHLKVY8s2B8u5a4K8IMWxKijkpLguUffdS6pHY3QtGAn3qqqwMxfax3+uWZTkqYEG49mg14PbVTkTKeHVL7AI824qFAbajE5lAmfcrEAIOjz0MbkUCasdtSiIQubHMqE2evZOAXxqj4YadK0kZXngW21qxp1C3bmxDJoULS6BDuzYhk0IFpNwc5AgK+XuiYCW8H01OFtsg3EMkjlfecidimH7Syp51ltIxYABL3vcnfURjNVLWwymp1mDz1Q29sBybj26Jn/sdqOaoK1UdyyhpHOd5wbsHJNS5f0Cmo3VyyH0F3NNSssrFj0+0ltb0e4wCNqTa3CwnyiPeOWFSSowsrKBJuIZmMnpvh3EiDEJqLZMj3KXPL65bf/Aviqua2VnA8QAh8AvX2E/T3GwUtWHykRHCR0BSoiSs1/1zCMxOoz/4jxbek3HlfsCkUIQ1c8CEUEgoOHArzOANO/e1v2rEFsVODGbZ/aXOLWdB6pXak2N02+wAPGCqDkkl4Lf3WTUIQQX/AhvtCBsSlPmVj7e2w74DevgNQuY39P//MmU25RXYGyb4+MV2Da+HvpU05czv3UilTifIAw9ZkHY1OeUttOUiKxLvHjtsT+XmPu1NtHmFvwobf/UPD4zTx2ktUFbxhGevWZvweGYBPRbIw8tKE+5zTq4BJPCli+X8BBgyIZmH/ewUtGV0D/D3FcMFOKobukx/1Arw4ufjOPxbuaY2LduZlH5pX6lIN4cBWlGEY0rPY7yflA5eCOYgFWYjUrfL0Q00UAEOPDv3QT6wdB3GJm1uPY4I5DLEDPycaHuVt4c35XxQpFBGKjeoBf/Ko+FwxFCKFIxSIEAGzF+mZew9K8diTrtcOby4UFkXRVsMlPvUAxwNczkK4AEF/oQHzBOs/a34OlWADw/VOJ9eVCWZuTEFGYJi6/+ZogZtVOJwgOCvxtSR/4n66/qxigmVCEMD3rK8vHUEw5Fr/SnM3em4WxJIjFRbXdKWK/193q+6fSVqzePkJ8oaNCLBRdem7Bh/MWy6CWw7JHsGDXdoJ+/bEu2PNv7V3RSGJTu3q6YXBr+h0OXjJ6+wmxUeuY1lKEuChIupfdf1i0mNRudesCgK4P9K87SYl9k+uldhkb63pMumDK5I8T4dZeY3Dw0CLs1oUwCTo25cHMnw+XTACQ+LfE8j3N1WDeAEHX7NxYANvFLoP15QIST3RBhq4cCnbjthcX+ggrdS6fvvyLD/9Y7XA13rkmWKMs3tUQv5kvCQcAsVFPsaJhnWKofDhI6O0nDFhMHk7hmmBGLDJXEarR20eYnvVif4+xfP9QMEO8UERg1FTdqIYR515n1B7nEAzYbo03y5tXhy5UK2CPTenlHnUmXLyrYf2fumi1rKaRmNk0jLRrFvY6A/xcDOYfhe0HaySlI6MeDPzq8NkL/YRQMTWpZTXBQf2ra2IBYHBKEKjmiZVm+e8P+oePjdm7U+JJoZRv3frrYbxaXD1MZmvNkp/8Vv8dO8nak0OzECgtJMv/qR1O8fypLlgoItDbV93KXmegl3x+qByskczazZK9fYShK7olJp64aGHEL4Rg6ZqF7SRlSYSpz+yt7GCPEf/8XdnGx+Rv3uLW9Luai3bjZ+8kpasuSZJSglm4JhgArNzXgGKKUK1kY8awNvMSyY5QhErlo5V79m57VJh5W2j+nKuC7SQlnhRnuhu3vbauafBjUta0KhRd0dhuq7d8dBQ0v39brG32pMFw/E6OmeX7enmmt79YLa1DtFqoldcHf3ffutY2SU8rmOQL9QEnMdzMLFo97lmNUKSyTG3O+1yBsIlSpl8gy8NjTnKwV6ySFkWLL/jqdlED3QW9iC90VC1Tu0YBj2HeyL1+KfuLW5ULM10BYHrWWwrUKBYYn3+rz3BqKehCP+GjMCE2Vj5prC/re5quW5ZOavU7/wDKdr4vZeNErTsuEIoITH7qRejjSgszdr+tllQ7SYmVe+4H+DIYS6vP/DM4CYdRgoN6WqAeRjGT2mXsJHUrbKlQRcyHUco+4fVLuY3jPh9mPsZ08JKRyZQv5FuOlGur/zlfOhlQJlirzlicJtRjm2Vz+8OtzoTbOdmpgpGoecaVJc+pbe1KXvKM2lYh2MOtzgRDzqvtbQdjyereUYVgAKD53sbBXHGov41I5at4mqVga5s9aQlZYY7tgkT1NxBYCgYAj551PW5H12TwvN2bB6oKhqJrurVJckJJaT5/XG00YyvY2mZPWivwSJuIpl8wtbiQZcZWMABY2+pMibx27UxPAsxpymvXqsUtM9aLNwvO7L1v5jRphbrue6MRwXAWRWtQLNTjkmZWnge2SSuclZiWalQsNGphBmfgxm5dbxCwoiELM1jb6kxpvmzkNOZpDJ7P+85FmhELzVqYmclodlp6TsGVZ+a0BM1Uu/xeL01ZmJmVrc4lrcAjkvkbte+kwOD5fId/4KhiwQkLMzMezQZ9gh4cd9W2BCPBkufUmtZRcFQwg4loNkaEWQhy/dKXJS4IZeCKYAbj0WzQIxAnomHXYxxzmoF5TVrXsZzCVcHM6C++xVUwhokcugzGSDDxCxTw2A1rsqJlgpkxv1qZhQgS00UGdxMQVFcRRpJMkrdBlAYXXhznq5Xf8573vOc083/1eD/nOqRuRwAAAABJRU5ErkJggg==",N1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABQCAYAAACzg5PLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAjGSURBVHhe7ZxNTFtXFsf/5z6bmI9KsADBqkYaNvVIwZUYKx1NMKvRwIJkCGwH2t0kHbpJNVIWMVKjjtRNGcHskjDLARLBgswS02iaoZFqIg3dZFF3RRQWdTWmJvj5ni6en3m+fn7+4D3z4fw2hHsfju9f55x77rn3PsIpMD7Mnb7Dw0EiOQjSLoO5kwUNAgABwaKHmVMMShKQYqIdkvoPzGJHDwR21rcoVfRsAyC1wSsmIpkoNDFOzIMgRNX+emDGDojiyMn1R9utcbXfCzwVbDySCfo1+hOYPwFRp9rvMkkw4lnJc+vbrUm10y08EWwikomSoLtuWVLNSF5jxrwXVueqYKculIphcTNuWpwrgo0Pc6cve3iXQJ+ofWcCxpJbrnpiwf545fCaAD9sQIw6KUkJnnv8deuS2lELdQt25q2qDMz8pd4SmKs3JalLsPFIJujTaLMkZzo/JLM5HqnHRYXaUInJofTgORcLAIJ+jTYnh9KDakclarKwyaH0IPu0zXMQr6qDkSJdH1l53rGjdpWjasEunFgmNYpWlWAXViyTGkSrKNgFCPDVUtVE4CiYkTq8STSBWCbJrP9S2CnlcJwljTyracQCgKDv6PCu2milrIVNRjLTrNFDtb0ZkIzrj58F1tR2lBOsieKWPYxUtuVSv51r2rqkT1CzuWIxhM5yrlliYfmi3/dqezPCOR5Ra2olFuYXzRm37CBBJVZWJNhEJBM9M8W/swAhOhHJFOlRJBhpYtb6e6Np6yD09BFCYYHu3pJoUZG2Dqrr75xQrazw6acVu0JhwtBVDaGwQHDgeLAHaWD692+KnnWiu5cwt+BHdx/h9nQWyZdSfaRusjnuN1cABQvz2firl4TChNiCH7GFFoxNaUVivd7jsgMem9Jw+2/+ojarWPuvGAdpLuo/KT6BafPfhW858cHh941IJdo6CFMfaRib0gptuwmJ+IbEdzsSr/ecB7vyn0sAgJs3jvB6j0vEunsri/0Kn1EzjNTqs0AXTMEmIpkoabSpPuc21sEBQPxJDssPcjUN0CoYM7wXK4+ZYhguqfE19QG3US0hdiuLxXt63QNUP89LsQAAGq6hEMOIhtV+N2nrKB3cbsI+RlXLp5/7GicWAGK6DABifPjHTmLjIIhXzMxqrg+u7R3CQRpYvKeDAPTk3dwzCNHxYe4kr+NXKCwQWzBmtViVlhUKEwCyfdaMYXZ881Tii79m1WbX4ByPCCLpqXVNfugD8gHeTgCV9g4gttBSEFll99vy1umG5TpBRIM08cHPXxK8yfCDAwJfLBkD//ONI8cBhcKE6Vl/UT6GfMqx+JmO/Vfl/7ZhMJYEsbistrtF9A/GnPLNU+koVncvIbbQUiIW8i49t+BHW0dpX8Nh2SVYsGc7Qb9+3xDs+VfOrmgmscmXRrphcnv6CPuvGN19hOhoSWGl8QhxWZD0Lrt/N28xyZflrQsA2t8xfu4mJF5bXC/5krG5kQMaMQtWifBqrzE4cGwR5daFJqagY1MaZv5yvGQCgPi/JZbv69hYNoQ7ZYKe2Xl7h/HTKXaZbCznCrPf0NVjwW7e8aGnl7BS5fLp08/9+Mdqi6fxzjPBaiX28RFit7KIPzm2pOiolq9o2KcYKu8OELr7CP02k4dbeCaYGYvMhbYT3b2E6VkfXu8xlh8cC2aKFwoLjFqqG+Uw49xBWu1xD8GA49Z4vfz8/2MXqhSwx6aMco86Ey7e07HxL0O0SlZTS8ysG0bKMws7SAM/5IP5e4POgzWT0pFRDf2/On62p48QyqcmlawmOGD89EwsAAxOCgJVPLFSL//71vjy0TFnd4o/yRXyLWs1dXH1OJmtNEv+5nfG/7GbqDw51AuBUkKy/EntcIvnTw3BKm1qHKRhlHxs1olmMus0S3b3EoauGpYYf+KhhRG/EIKlZxa2m5AFEaY+cray/T1G7OOjoo2Pyd++we3po4qLdvOzdxPSU5ckSUnBLDwTDABWHuhAPkUIhSuHTNParEskJ0JhQnTUEGzlvrPbnhRm3hF64NBTwXYTEk/yM93NOz5H1zT5LiErWhXyrnjzjhHzqi0fnQQ9ENgR61tdKTBcv5NjZfmBUZ7p7suXqqsQrRJqTf/h3723rvUtMtIKJvlCfcBNTDezilaNe5YjFC7dI7DmfZ5A2EIh08+R7eExN9nfy9fz86LFFvxVu6iJ4YI+xBZaXN8jqEgOa7Bu5N64kvnRq8qFlfYOYHrWVwjUyBcYn39lzHBqKainj/DeICE6VjxpbCwbe5qeW5ZBcvXrQD+Kdr6vZGJEjTsuEAoLTH7oQ+j9Ugszd7/tllS7CYmV+94H+CIYS6vPAjM4C4dRggNGWqAeRrGSfMnYTRhW2FCh8lgPoxR9wxtXDjdP+3xYcIDQnq9n7b9ipNPFC/mGI+X66n/bCicDigTzeo/yPKIe2yya2x9tt8a9zsnOFYx4xTOuLHlObWtWspJn1LYSwR5tt8YZcl5tbzoYS3b3jkoEAwDd/yYG5pJD/U1EMlvG02wFW9/qSknIEnNsFiTKv4HAVjAAePysfa0ZXZPB805vHigrGPKu6dUmyRklqfsDMbXRiqNg61tdKT3HI00imnHB1OZClhVHwQBgfbs1KbL69Qs9CTCnKKtfLxe3rNgv3my4sPe+mVOk56q6741aBMNFFK1GsVCNS1pZed6xQ3ruosS0ZK1ioVYLM7kAN3areoOAHTVZmMn6dmtS92fC5zFPY/B81n8pXI9YqNfCrExGMtNSOwdXnplTEjRT7vJ7tdRlYVZWtluX9ByPSOZ/qn1nBQbPZ1sC/ScVC25YmJXxSCboF/TwtKu2BRhxljyn1rROgquCmUxEMlEizEKQ55e+bPFAKBNPBDMZj2SCmkCMiIY9j3HMKQbmdWlfx3ILTwWzYrz4FtfAGCZy6TIYI87EL5DDmhfWZEfDBLNifbUyCxEkpssM7iQgqK4izCSZJO+AKAXOvTjNVyu/5S1vect55hdr3ia21UN5zQAAAABJRU5ErkJggg==",U1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgB7VbRbYMwFHyOGIARvEHTDRghI7QbZIMqE7QbQCZoM0HoBtmgdIKmE7h3immMZSyIzV9OOhmM7cPn9x6I3JEZKtRpjCnRPIGlTEcHtkqpTuYCgrW5DT/gOrb2aqT/V24DHXmNDRhYSithydlaWsk8S6+LKtVMGgihLbiRBVF499zRO0Q7ScMZPIE7P4iKkQla0sHgqfDyjzymvnMly0KDgyNaWrAX/UcheUDLPsDvwLM2tyCFnt1ziiFVsKMYLxAcL3LJXR97Ny9TBQ+2UNRWjOKMTrfafLoTUoOmt1HzGuIs3m+xCamCD7Y9gGtb9I+xCamWbiCguSu0rCxaLhbunTGnnILEEWK7qQU7R+JrsLbfwq8At+7gXIlPlBL+nA36/B22kh9t9CksaEw+NP76Yz9RlYSrxqydMS/ljqXxB/k6ALvfpL2mAAAAAElFTkSuQmCC",k1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEzSURBVHgB7ZWBjcIwDEUddAN0hIxwI5QNboTcCEyAboITE8AIMAFsABvQDWCD8K02UhTqBNOCBOJJVqo4yU+c2CV6d0za4b2v0Vgah8YYsxO9ENv78dlLYrV/HHXQmUSalh6HDR9fwoAzbEbD+IdVaacoiMte0QAQxrlGMEz6oXanGmbY7FpyZgWp3aElHVXOOaEnc6/grjM1pZCmNLAp7ohbvmOLhhO7Ksw7h4/4hOvYIbAJYkz3vaAyhytBTGaxX8qH69DT1whjuZ8PMY03mQUhc0mJ2vaMWSZjXG5N7aPhejuHffP9wThHHY1FzwlvweXWfJk8/KPhxf0aIaTHyH/UhlSb+Aw/liW1OWt7/KVclsHCFezkdVgagte9VFdaz9woatHwv1GqmRzGVVetPjyXCx7A5lXFoOlHAAAAAElFTkSuQmCC",z1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGDSURBVHgB7VXtUcMwDFV6/U/YIBuQDUg36AhlArJBzATABC0TFCZImYAwQbpB2cA8XWVwffmQc5QfHO/unRNH0ossyyb6C7DW5uCKfgsQq0Hb9W3e41BgyMGUdHhIkuSDpgBilY1HFsSo+zIMxTIbj4Pn34JrJ+j9fNEnWNp4+IKbju+t9VZgFmhqa/YI3jkflwHquMLw5NntwQXm951R4GgUGdVgKmxlbh3E2YSZTRU0Az4VxWJEsBYb3lhrYSZztcsUzL146WCWI4JGbLYdP7ENbA/CLz+HGelxJeMr6Jq8ENFlYJtSzwaMEVzycmHH8alyifcFHXdrHhEjSpBRQ/QeLCC6A0sRPptgA5YizDUqIcpzz9oAMYIvCM7Z7OSda1TI8zspMSc9LmS8AV3PudPmmqbAjjd+1eFTjfgY3z62hvxDb/b7aOOWMDEBYpbUgdvglk5rOFlQe2sb0uMkZrikDf08hlvG6q4oLUwYP+kRzeh4Pmov5BC8jA2fRvSPc+MTgqzMtqJz5AQAAAAASUVORK5CYII=",O1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAA4CAYAAABXJB78AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA8LSURBVHgBxVtbjJ1VFf7WPmcqM4Uw0vok0oMvxkRoqzGEmMg0VYNcbNUXVALVp0aDFIJGhKSt8dIgiTPGh5JYmEogBjFcvJGovZCI+GCYoTHRBsNMgvrCdIYXpp0551/uy1pr7/8M0HNmzpSdmTn/+S/73/v71/rWt9b+h/Autd1jPHrJJe2tFTrbnXNbibENxKMgavlPfwYxUdjiGXI0A8cLRHwSncbU5JNDJ/AuNcIFbAGki4eXxuDoTn/nrf53NIDiD3HEx39JYPkPJ8MLP+GMAkR//TyhOukPPPPw4xsmcQHbBQEsADUysnSnv1kA6r1+ohx+4gDChgvjYAGH/BZHkNI24vEEmnUp18R93gLdCW95B448TrNY57augCWg2h4o3udxGWVOE40gUADBb8oIyCULi2A5MbtwmEhGmbejpwbAzfrE8oADPNScPHJk/YBbN8C+9Nlzu71XPZwsSm5GJK4Xv6TdAT4Srwyf0RUZejBi4bSD+FesS6xULI/y+bMVuQNHHmkexTq0gQMWrGrj8PJ+Du6XXKuwhHhLm6jtMysrgCMbIQu3kYIi1sW1vuOhZLHReh3Gl9rNg5OTtIABtoECdsv1iy1Hjaf85tYwH52AupRzoGxtQJd1ZGJXzoKew4oMB9e1/VCAghVqv5SvITdDy8s7Dk8Oz2BAbWCARbBAx4MskMkm8yqtSe5o2ykSMolVZPfUKAmWbXpr65RzA/Ula8vnp3sFs5wl50E7PBjQHAbQDCx4sJCesrqLPhI2a0D6k8g7fSogxmXpkuRaYi5Adl8jv3AOp46yHCFYlI37W8xDx/buXWxhAG3NgCWw3HFSy3KIkS6YVgp22YKIyEAp+EbOh8kK5SdGUhXJveo8CBf3kwWCOu+ZJceTHF8JahwfBGhrAiwQfLIstFh6S/NJxOyBKCIZq1Ek2SBWoUB2cZa6XddnwsU5vY1Ys9NtCwawSJv1Xss1mk/t2+eziTW0NQG28T3L+/1ot1DBS6xSIE6ESK1GCIo1EgIyseJa7ScBGJAhzjpLCYqgFpeCQLqUJbqSWnUpRRLHhRtuXeZqP9bQVk36X7l+6XY/yEcKgkUO9SokuSYsk2AVgaqiFNnVVsiM7v2l9oJEzFofuc+47fIxFcuRKhr4ws/Gm09jFW1VgCnJ+wG1ylQGSiOBxzwiLk3IwGPhNVXzKFIcBRbQa7q0GmoBo4iGXdmAqz+EckzpmvhtZoga28fH+9doq3JJ55q3+/C1JX3jt7IEpKef+CeStyskRnYXk2B17loJVuJFUh4kA0gjrvRrfFgGkUK+pAiDLW2092EVrW8LC9bVcO5Vu5qUsxIz5WiWRicEb8dWulyRiLvkOi5m5KJ5nVpwVvGpYwsGqeuw15X9xs13yAb4jSY3r+zXyvq2MA9WIk0qIlPwwBWAiHSAUHwpHdK5nK2kPhLjNwEQJvW1n6jsJY4IaAaIbpOCZcElRnEnCoRotO36t7LVuORYjooa+cQzxCU0Sqk16DHjkzQBiaSaHKb9uZTDMMqSIJlclYpgQYVFZ7FaPLjCwtTSFcho/Xf2KzP6AuzLNyzu8bdqMXKOqGWZUvuU+R5154+mmZJn5cgnUt0EmyKQXBWi+kXZm+BlQBPNnEnU0i2sCBxMlk5c2t7QGUMfrdnPyb6UvEvmRDZRQDkmz1fGn12JS4Diz4c+DOz6YtN/pgvffBN07z1t/2mRNYKxcSPTDw81MTKS+j99mnHsWIWpKZYnBUHReI5U+Ktr1sZAoIIywvP7pv/Ss8Qg9NFuvfncvP8YxYpaFOkACjlANUuwyOiv/djHCd+4q0FzrwMv/b0KIOHNReDYHxldaVPs5tpPON60KU302msd/DYeeqiD6WkuOJNYM4fSqvKDNOKPaRUZmWLenWt8sFfy7xmwW29aHgOq42ROrKVloYWu/bmqapFOhTo9MDEUzzx4f5u9ZSkH1QqFVBYWnZSq/c/IRsd33+1o0ybC3fd0oncld5V7dxcVhStMMEdLc/5PRfpQfUlq7Cc/opM9wNC7SzJ1trkUgrgrGpIxefGEHWXuKguJm99H2LQZ+OVjHSwusk1048WEyz+QrTJbAPHcHNOZMxEWLJ5lOnaMcdtthM2bQXNzRQCinJrBnhlgI9F+zcKSK3doeZs/OljAnGtc543kLetRzmVGTZagw0vuxTZmqy54sGCgf26Xo5t3v238iVf86okKx45X0hUXR7UCK7xqawNyLLacQkF0G8Sqw0GHxjb0igN6bmHNkEmFqN07AaIaYEUxUNyStMRsTAYJ9f5z52fOP4ybbnalokh9UPevLNXpUEL3wS0caaRFLnVDSifhT9UzYD1bmAenpTGxnLm6Wv6uT5N0ZajINQmvz3F0x3/9E3ERKRwfGTn//YeHoS5EL59iPPnrCnNnWMQc7OYwUBU460KTb51QqqZE3FzPWqwPDkPLRfUoUQ9FziYgpkKgU7clK/XYZNLT/fOfKsCuZ/zm2ao+uS4rsn1CB4tngeMnK70/W1eF5hPXS11ICahLk5GQRPhpYdCAqTxIPEHFIoUJTqjw1zDvUkYoJKylLbNOO++3z3bEd4Girm+pTTrGhTumPrnQggqURUHkKFimbawflEqcNu7BA6Ydc+GP4oJpDjU+MThygOBDDzYpRMjurt/ulu9w3I7NnQH2f7+TKryUBbJfDdf4U1umy5kBtOyU5UwPrXelT0COPlz8UV2T1XV6orIooZbgB/bsMx1ccQVh56cdpl5ivPZaOicQei/t93+oYv+Xv59w9VWE489X+O//MldCybz2EKmIqhqUWModjMz/vbU+UiOe8d23hCzSg7IXRlakItAHm0s+xH/9S0WnTyfApqcYL7xQxT56Buy5yH18zTVMV1/VwMnnGWfmmai+eh79FAqiPKxCRiDpxDLflXJVD61nWeFvvgCYvDH+qUkF45oMYCEzNHMW00ukFkJlyA/P1177T+ovJe9lVJB6D5CqJQ7IgQblEp5Jn3B+zKOc/HI1ix5bPxY27Qe6LQwwT68rl0NOS0qpIY7LqfqTY0ToK+z7xdEObrypEZT7yubP8yofv3uu4pIXiz5q+KXjVBtTKkxq0Ci9wVrPRcTeAWvwS/4ut5PReVc93sizCJpyMI8fSm4UV+CEhANxP/poh0rpYX0Y+GT3uugiORwWDXxOyIU2zKtHIho0Pumn1vyd3cNbGU6gx9a70ieehk0aXXwlEChalAuCsJpV2jU3V1FIuHd+ymF4pIiolF3dMgeUNTLEouTIMGjHJ53nLm9581V+YPoQqZ7r5qoJIWtGG3O8pNOpptErDL2euGc3j9LwsidHujSSqHEJm+UouZoEqQ0UUIva/lGivXsbCInziy8m0RrF6AmpaFOxcuS/7LiOKIA7Muyj40cIl10G/PxohVP/QHd0LlbZ0fVgC1eMAtEWZOYfvL9xWa849OySk0/TwldvWZrykxhDUauXdCMn5TI+lG4FWdqXryFCHj7cxs6dDdx4YzLykIy/+LcOh2pEOVmfNtEN17uUGvn2yr8Zjz3BeOXVLHCzhaIQx4wcmDjmk1YRFlqRCu5J9NH6qrj6ssS4V9Bj2QKgPEPI0S8nt04SKcppnArHl08BL5/qqBVapTS7UtJvZ8+Cvn1/x2rzpVvZvtTYxmHlHZhFJalqeo2V8YgbfS3o9gUYb2icdO0qRJRRmEWJ5oGVVZgNROPqbAVpp6nwNCXVRCqOAMFXSbwLLJLIqzIHxQ2lYiGJj9GBiC/dlBvMPHAfHUUfra9FkPA2nx/uOEtsNl0o9XEWYjbqUv4qXpBL/FJYkpZdBK+cQBccaLEEoILMiVKhUlKcmEWnB8YmmJ1I+zr3s6r/E+iz9b3MVjWbE/6mb6SnW4jBuGwlz056VRKGWoLVpOK34u1oYq28gnI52Vxf61moWawgCLlGKEnG4GRZz1cHUzCC3lst1Dvj8tJB9Nn6BixYGTV4wgp0ZVSq5XHyWhIJMFn3pHk6syOV5SzWJQ6ea5LQYl/h7mLdZnZp3dNWyznamERDs3TKY/Dq/nuHDvT/VuKq3q1oY8N48P+UXRjTMGwSDNNTggcbAhk0cRWqETrLsmEyBbXiBKOzGly0WGevU3FOsNNjUJpLYtqB84OKl8w0XXsSq2irAixYWQV3F2w5LMsKZ0LIwEnnuLJEXUQwW1M0d44aD8Zn9nKxWW+OjvUqhEbDrOptyCSgJTnEfPDQvat753XVL9QdmWw+7Qc0oSq+ePrmL0L8hbtCeYSg1GOAcJZV6mJxqgx1f+mPM4DByriUFtKXqlTLdbXGFFxx4sf3NSexyramNxDDe/B+XNMqZGtPPlBSdBmW6AnjtjiZaEXZ0iyFkTVIuQWnWlu2Gmg1BKrriPOrVWqp4qJi6Touf8vZ5eXmAayhrQmw4Jqu3f68B2a2lgI5mLWIpZGSm0kDZE5LE9K0yCbI0k+iwO780kmB2cpGgCo3spCJbGGecx2WdowfWNs/Oqz5Ler4TwO0vMNvzoTvBW+w1dwLjlOgct1MI5jjvERmFkfpxeJQmEAtZSKzHjGuJFnYoieQokc6fXZoyI2tlrfKNpD39OM/DQTQiGfCd5UN+p8flmc6pvpbiLKmWRgPFTxXupPOXKqrrPzEElYTcDFntApK4j2KlvWDewbzD1sDASy0CBp3PGg0YwSEEoDMU6binWo5kncdZLsowdh7ZYX7lqvv5cJylhRyDdOUw7kdg7AsbQMDLLQA2nuGGtv9eCcyjxU1M4h1qN4iEr6jvL88x6Km9KMj1tfR4+4UU9iJNlHAgfGlJRooWOl269S+fsfSHkqvd27JCXGZ9oSzVKmzmFvWY0VAWGGZAVB92UUWYgkWOjHvHf1rD3x3da+Vn6+tG2Ch7d232GqiucffZb8BozlkvHuuaZXl7iwtOEdMywasrCSklXjLf1lg7vy0vdwcX2skfKe2roBpi8A1Ggf8zK7zILXK3I70P9HQ9cZzJm5dE8saz+mqbBUU/AIqnmh31hcobRcEsLLd8a12sLhd3ojG/OdoXZTWea/7f8EL5b7gv055STux1GmcuBBAIQ/x3Wv7vrM8Vjm31fN1BM+bUMvT9xbnxHmTC874jwVP6lNAZ9pVNNVGc+pCglS2/wNn6OJqhyu4ZQAAAABJRU5ErkJggg==",L1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFoSURBVHgBrZXbbYNAEEWHtWxA4oN0sCWkBFxB0kGcDtIBJSSpwC4hrgCng5RAB9kfxEtA7lhgYV6xYY+0WljgMtyZHQwaIY5jb7VaPVVV9YxTWS8rjFNZlkfbtg9jzxrdBYi4eZ77mN9omhDiW4iHk6K1YID5kW5D4f6t4zg/7UXRPsmy7P0OQcZdr9cBrJKDouwhph3djwvv/UFRIcQLzYSTydb1RA3DkDQfN4oi2RNFJiUtABb0I9WJrs9n5JUoMr+jheDzL4kWXGPIvE8LQfa9JEnOu9BI03RP8+pzkM1m88Civzh2SROoolehU7BBwIuQ9BJypJ+kjxCt8CQsy/pAtDqEz/2VDy79lGuVaw0vkNQq5H9QtdiRg8MGUleiXbjroO6aJMqiKBReqprrQx2/YVS0jt6jTtTYKMo0zS+aAwuihquhgT/EfurZ0S4Fj/i/Ew5dgxXfNBfuCxgH3nV1hEFtySR/WBXHjIkhXncAAAAASUVORK5CYII=",V1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADTSURBVHgB7ZTBEYIwEEU/2gB2ELvwaAmUYCmUoBU4VoIdaAfYAXjzhsuQjMm4rmGDnvgz77LZ/D8kG4BZShVERXSRXIjdGPNOSfHN3BB1QkBD5FLAMcHcUUoBzQQBjW+4wPTKpYArs+Fkia2fIcjgNZ79p5be2t7WpHplPf6nJVMzRIvhLDcYJmtL3ImbUIdde/hmGRPQIU2B5y+mCNqAfmJWxBr89ETr0wMyXk8u9AUacweZpo87ohZ6ve3lAg7QK/pu3Ot051ozPTXCH1yJWRo9AWswf6s6QjKFAAAAAElFTkSuQmCC",H1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABQSURBVHgB7ZNRCgAgCENX94foxNZH/QSKmBGUDwRBxsApEDhSetGoohUl6CGLNuMwYTBhD8ArZHb2XgamZ5JYMzDtGV9lEAb3DSrT78wCmQZLVxLaXDTBfgAAAABJRU5ErkJggg==",j1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB9SURBVHgB7ZVLDoAgDEQHLw6cAD2CJ9QbIH5DGrES60LTl0wgs5ih6QJAqcAmDUnxoeaMQMODQDCVywskXn42CcxWEPEOpoHC8P0d/LfAY92PZzyW0pJNdo8XHptfmsCSs+TxDah7US3HBCPkWTL3gg7y9NRoIffhOCh3mQDL5l2owbHtIgAAAABJRU5ErkJggg==",Y1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEDSURBVHgB5ZWxEYJAEEW/mhhiZiYlWAKhIR1wHaChEdgBHWgrdqAVQGoEHegynA6Du7geJI5v5s8w3L/b29vbOeCfiEglKbffo1MvfLcqtZNmwv+EZEgT0pIUkzat8TnJJ11Ja+tfkC5QYFo7/VZpd7EpEyCAOyuNKYB7BmF3MS6DAu5UmgAJeA5oCllrJ3hC9PC851zqW8afCt4cQp/kkM/WY/xej//VJ9POhLGouJ8GchYp448h796ghwxyHTyrRPAcoSCAex/43cW4azqkFr4mQO9d/kCkCVDAnbPWaNAULECT9gnv553Z8dB6Uwyk3eW5dtIMem5oHpeaPZSPy+/zAFjEgUDFn9v8AAAAAElFTkSuQmCC",q1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM6SURBVHgB7ZRpTFRXFMd/bxiwKNs0VKBpp40oaUtL05KorbYdatPGhRabmKZpNTSmIRo1rjEuHzRGonGJQeMaiXuC+zaIiIoaISGKxuCIiNsYAWFgZpBlZnDmen2QkWUAv+in9/ty3zn33HP+97yTCxoaGhoaGhoa7wqlD5+um1/XS1z3tTtBAc4ETPj6QMbWkeywFLPdUsa222Ucs1YyPPVTjlstmEydz+kxpUWQbbnImdYmTjocbCjNVHe+mxRPscvDn/OMHYUVhg4d0FFXx5hpn1DocZFZsFLagn4Z838CF5sFh58L8lpbOeN2caLyOqvyF3PAJsjI+tt/sanrvuGyR3C6RXDMVsVZn2D3Uxd7K8yMmmzE7BbM2bVRjd5fuY0ir2Dx0SmqfarWSkGb8Ivul2V5m8lpEMzfNb6L/1DVY3Kl4M9/i/P7ioTgnBQzfpqh3WHSkyeLX5AF45IHYpaiZ2xfw/cTB5Pf/Eq0YNPN83wxLhZzo7QrzgUSFfhXDkv8GY+8aeJPWeyzPqDAaVP9UbFGgkPhztlq1Z6TPYMnDsjd8xfmLc72w4Veah5dw+0DQ3h7fn3IM6Zm7qRedlURL3A115GxfCWK1LN69uQ3F/ZBbAJCdiImOpLwKAMheIlJGoQcBxqfPfTHxSePZUAwFOeV0D4jirrGffw174XIWLdXjauztvDhsAlYri6V+RQaquoxJk7BZbdgya2REb7+hRlHGxA+hUh9LePCo/kjwsCPkTFMSE+lyQO3SnP8sY7qcpwOH/8t29IhTLDzbg42ezBlpWuJ8kWoFX6fmYVealyRlsmg0CCSUjKgTc/+Df/21hx9D09K6rfY5SzUPL7RxT/ky9G4mnx89cNCDtVOxxgWxoiBQZSIuZRX/0L+C4/slw57YxDhbSX8k7yABFM0OtnElka501CkdvSV7WqF6FAnR9bfoBd6qk0aOZEwpZ7sJel0foeW/DoL7/MSFM8T2RgHjuYKdWd4SjAt9is0Oe3UPb3HpYNpjI0ZoeauKLThqy3no/edTIofpcbX3b/AkMFuFqV/Rtd3rE+UPkQHarmenoOrdNvv/K3rJ5+GhoaGhoaGxlviJcCiMFEyZLgHAAAAAElFTkSuQmCC",G1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU7SURBVHgB7VhNaFxVFP7em0zGMWk6SWw7JqZOiIm1VjQuJNiCFUFEu+hC3Qg22YgLsUbcCIqpLlyJfwtxI1ZEsODGgKALm1JF0IWJYMmPmokmlJrYtE3SziQzc/3OnDfTmcy900abQEsPvHnv3fe9c7577jnfnRngul0j5lV7aIyJ8XQP1seGPc87g7UaSR3gMW/Wz8T3/v9CaqPswOWS2m823irIeatIJXj6mUcM/9sMLlHCpcZaS3V7XjQJK7HM9CSMn6gIEGog8gZe1wDZU8DyL7xvgJNQqAkId6r73Gkg/RMvY268Vw9EdkkzdFcQM2N4jZgB67u5MHDHMi+yen8iQo5ZTYrNVnjcucQPTsbzgVEG9pfceHG9kxP2mg55ofCADPl5UiefTfDUC8a3Hxlg7iAvQjqX9mMkK+OeHR/l+MwjSgp8t2NE5+TC1xE3vYdsag4alSglhvgHe+FvTsAL2Wfk0+HseyTDUjBkFN3NYxecNSTDC8eZiRN6E+4AGh6G2+gzNQGc/5akci8UXLDos5NIjyTwx71caxmy5NxwDmGS2T4ixcj3zwITNwG1DrxMMsc4HXN8vKLHeB3xvhKx4VdYIl1LSdZau8/UUdm9BCKsu/r74M4Cg59n0ad+0CUKNQNNfdYYOhGuXfYf4NxHxLNp/Ciw7XWubM6N9y4ApwcS5LTX44ek7u38A7MIjHGWkSqzytwIdJ4jlhXr1RLPIglLxrJ2fJp+bl9Rfx6x42yEcEqJVBjxKY7vONsvDB4oOvE3A1v6GcO4Z2UWgPk3NYgsYcsnXIKsGy+wv/sCPMm1fUWygretDP1FKTN+Qz5jIqjBRp1V1uNMe80y7OsUUsc7RA7CGvD3LTzPw5o16S/JWtcsL2O6rFM7CR1b5Z9E0yTWOcXYbUnJWKIsqLBu/YIdlYN9Vlkt4Jl9QRbYCG3fV8kC/UTod/p+JSWNc8txJVuKN7yOPUZS22U8JsQqJbnuUTq7FQU1qTBphMWjJD+qzmu7KAcPwm0kfUHkYOhi4zQ/XZIw6UjexAd1ouQkS2msjjJU4olWt3zk5aCRcjCrWTBpNkK9ZsfVCCoHivV4/Ru3NX9BuWx9i3ReLMIlJZYva3RS0wI0Pu7eRvJyQI1a+DhoHHbrtlcZpEoj+JSDmT3QevqR5yWlIHtlnlTx3TOSsUmU1VmJI2ElclBbJQtFOciqfIiIhtMOOSCJHH1mjJZXLX2n+W7iO26rPZoQtWHJ2DBsJkHlaPmwehak/k89paRkIm1fVm8EnxiBhoP3o3eR1G6squcpuTsGp9FJwzN8pxHOfdQjgfnPSf6k1lr0IQa6DZf+LhbISOvXSrgcP+TOWOHlvCgeVUV2ygFxf/WofEgWbHJgeQ2NT7CWb4al+4d8bphDvEi6PdB55G7uoz1wB5LZ/xnsd9I4cQZ90t04UkuyZ8aPIJCHUpNNfLhA9TCqEZOArd8EWQhVPl8WkR3UZRUTfPwzyoOx4KE1G38fyrxm9dNDwVTz9g6sslGILXKwic7eCPbFUsWmiwi3mLp9F8fz9cjx1k9JOovypRJfWykPz8Gy5SV5DBWJBT8830VVY4DGV9gM1LaUUZ+iEobfydp/hS5J6VITs4nd2vy8ZrqAl28nHTMo7svldphckhWhZUOv/itrWU+pEWNmXzJmcTAYX3Hgg/H0qDFzLxuzcCQYz9jAk6VcrsDPN0mFf/lwO15WrLs0W2WI4EE/1mRrIeXE91mXcLUxc71m46wXazGjfxWs958qva74V9/fUNftarN/AeLLTGIP9RljAAAAAElFTkSuQmCC",Q1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALtSURBVHgB7ZRdSFNhGMff93xtxzXXps1N86hDLZ2muZEMQpSs0LwoL4I+b4q8KIUIxC6KBCEM66aomxIJkq5CCtJuzCwro5VW6DDTNdfmN9vcV9vZeTvzI2QbRjdKcX43z+F5n4//eZ7zHgAEBAQEBAQE/muIZYuBdeKPjdqz0y+X8nZwl7aTNxxYJ/A1zrCewuxbc8A30KRLfZtAY5mUDz0plysOdztd/WADoc6oxcx4SdY9/hmGHfbyXDPYaI4oFFquqgA1aRL1YGnl8GeFlnuv3z4INgAY6UDVRShsXxdrGrt16ReXY9btEvxma8Fpizrv5FhK/qkb9Yxy77J7cWLtuRnHY+Uka08MMLraYGLWwWbwd0B5WkkliPGiRKQDIai0f7lPq3KOtt0OMHwzQ41/wTrinjT2nHMy39Q5xc/swy8Obck2NGM4MeadHx9FAMosxpskn04pNVXXgyHfB5KiU0KItWGQ2jbz9XFjoubAJcAhO8DYQrft81VcLN1MximLJHJtKylSNE6PdFxZrSNKKQJsKDGj4gIhlhXS8anHfLY3HRIZ0wCANEEkTyuzDz/cr87b1zIz8qjW67S8g2TQBHECMkVnkVRt0JBSVR1i3TaSVjYHfE4HFZfUEK8o2EPSCef9LnOvWJpRI5KnbpGl7h4IOOa6MBwHrmlTG4j4jKKEYQDHZsc7W6wf7xRiEDAez/QUQJCVpe3csWDuu7tYgAsa4lX6SpwNJbms1knbp9b02YlXRVJFZhcf63L8sPQDjPAQXtNLxAYcSCTScqzH6J4fGsIIEb8VBFHQ0+f1DtvDHf0OkzlSWNQqIUmLV4YHcdHSOU6Rzu+93Yy+lpUs2J7ahzpL1fnVRn4yE3JKPBqv0g3yzYBrylgmSzY8XyxMSkQcJ8VwSkJzLu8DSpXUwujqQnxZFqc2UZCMo8NxoaDfkl5cj8z916IuXqwJwhjiiRi+1TlhyAi7ErfWjzxWHQEBAQEBAYF/lV/A+QWwS3rEYgAAAABJRU5ErkJggg==";function X1(){const i=U("#app"),a=j?.session?.user?.name||(j?.session?.user?.email?j.session.user.email.split("@")[0]:"User");j?.session?.user?.email;const l=a.substring(0,2).toUpperCase(),r=Array.isArray(j.notifications)?j.notifications.length:0,u=r>0,h=r>9?"9+":String(r),f=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),p=f?'<img src="'+f+'" alt="'+a+'" class="np-avatar-img" />':l;i.innerHTML=`
    <div class="dashboard-container">
      <!-- Header Section -->
      <header class="np-top-nav">
        <div class="np-avatar-wrapper">
          <div class="np-avatar-circle">${p}</div>
        </div>
        <button class="np-bell-btn${u?" np-bell-nudge":""}" type="button" aria-label="Notifications">
          <img src="${L1}" alt="Notifications" class="np-bell-img" />
          ${u?`<span class="np-bell-badge">${h}</span>`:""}
        </button>
      </header>

      <!-- Balance Section -->
      <section class="np-balance-section">
        <p class="np-balance-title">Current Wallet Balance</p>
        <p class="np-balance-amount" id="wallet-balance">$ 5,323.00</p>
      </section>

      <!-- Send / Receive Main Actions -->
      <section class="np-main-actions">
        <button class="np-main-action np-main-action-send" type="button">
          <div class="np-main-action-circle">
            <img src="${B1}" alt="Send" class="np-main-action-img" />
          </div>
          <span class="np-main-action-label">Send</span>
        </button>
        <button class="np-main-action np-main-action-receive" type="button">
          <div class="np-main-action-circle">
            <img src="${N1}" alt="Receive" class="np-main-action-img" />
          </div>
          <span class="np-main-action-label">Receive</span>
        </button>
      </section>

      <!-- Insight Card -->
      <section class="np-insight-card">
        <div class="np-insight-left">
          <div class="np-insight-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <polyline points="4 19 10 11 14 15 20 5"></polyline>
              <polyline points="4 4 4 19 21 19"></polyline>
            </svg>
          </div>
          <div class="np-insight-copy">
            <div class="np-insight-title">Insight</div>
            <div class="np-insight-subtitle">Balance trend</div>
          </div>
        </div>
        <div class="np-insight-right">
          <div class="np-insight-balance">$98,432.65</div>
          <div class="np-insight-trend">+4.3% vs last week</div>
        </div>
        <button type="button" class="np-insight-close" aria-label="Dismiss insight">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CFCFCF" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </section>

      <!-- Mid-level Action Menu -->
      <section class="np-mid-actions">
        <button class="np-mid-action" data-action="remittance" type="button">
          <div class="np-mid-action-icon">
            <img src="${U1}" alt="Remittance" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Remittance</span>
        </button>
        <button class="np-mid-action" data-action="transfer" type="button">
          <div class="np-mid-action-icon">
            <img src="${z1}" alt="Transfer" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Transfer</span>
        </button>
        <button class="np-mid-action" data-action="withdraw" type="button">
          <div class="np-mid-action-icon">
            <img src="${k1}" alt="Withdraw" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Withdraw</span>
        </button>
        <button class="np-mid-action" data-action="more" type="button">
          <div class="np-mid-action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <circle cx="8" cy="8" r="1.5"></circle>
              <circle cx="16" cy="8" r="1.5"></circle>
              <circle cx="8" cy="16" r="1.5"></circle>
              <circle cx="16" cy="16" r="1.5"></circle>
            </svg>
          </div>
          <span class="np-mid-action-label">More</span>
        </button>
      </section>

      <!-- Recent Transactions -->
      <section class="np-transactions">
        <div class="np-transactions-card">
          <div class="np-transactions-header">
            <h2 class="np-transactions-title">Recent Transactions</h2>
            <a href="#/transactions" class="np-transactions-see-all">See all</a>
          </div>
          <div class="np-transactions-list" id="txList"></div>
        </div>
      </section>

      <!-- Floating Action Button -->
      <button class="fab" id="fabAdd" title="Scan QR">
        <div class="fab-icon-wrapper">
          <img src="${O1}" alt="Scan QR" class="fab-icon" />
        </div>
      </button>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item nav-item-home nav-item-active" type="button">
          <div class="nav-item-icon">
            <img src="${V1}" alt="Home" class="nav-item-icon-img" />
          </div>
          <span>Home</span>
        </button>

        <button class="nav-item nav-item-statistics" type="button">
          <div class="nav-item-icon">
            <img src="${H1}" alt="Finances" class="nav-item-icon-img" />
          </div>
          <span>Finances</span>
        </button>

        <div class="nav-item nav-item-spacer" aria-hidden="true"></div>

        <button class="nav-item nav-item-cards" type="button">
          <div class="nav-item-icon">
            <img src="${j1}" alt="Cards" class="nav-item-icon-img" />
          </div>
          <span>Cards</span>
        </button>

        <button class="nav-item nav-item-settings" type="button">
          <div class="nav-item-icon">
            <img src="${Y1}" alt="Settings" class="nav-item-icon-img" />
          </div>
          <span>Settings</span>
        </button>
      </nav>
      <div class="home-indicator" aria-hidden="true"></div>
    </div>
  `,L("click","#fabAdd",()=>{K("/scan-qr")}),L("click",".np-bell-btn",()=>{K("/notifications",{animate:"slide-right-fade"})}),L("click",".np-main-action-send",()=>{K("/transfers")}),L("click",".np-main-action-receive",()=>{K("/add-money")}),L("click",".np-avatar-circle",()=>{K("/change-profile-picture")}),L("click",".np-insight-close",()=>{const v=U(".np-insight-card");v&&(v.style.display="none")}),L("click",'[data-action="remittance"]',()=>K("/remittance",{animate:"slide-right-fade"})),L("click",'[data-action="transfer"]',()=>K("/transfers")),L("click",'[data-action="withdraw"]',()=>K("/withdraw")),L("click",".nav-item-home",()=>{K("/dashboard")}),L("click",".nav-item-statistics",()=>{K("/finances")}),L("click",".nav-item-cards",()=>{K("/card")}),L("click",".nav-item-settings",()=>{K("/settings")}),K1()}function J1(i){return(Number(i||0)/100).toFixed(2)}function bp(i){return String(i).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}async function K1(){const i=U("#wallet-balance"),a=U("#txList");try{const[l,r]=await Promise.all([zi("/wallet/balances"),zi("/wallet/transactions").catch(()=>[])]),u=Number(l.JMD||0)/15500+Number(l.USD||0)/100;i&&(i.textContent=`$ ${u.toFixed(2)}`),!r||!r.length?a.innerHTML=Ap():a.innerHTML=r.slice(0,3).map(h=>sg(h)).join("")}catch(l){console.error("[DASHBOARD]",l),i&&(i.textContent="$ 0.00"),a&&(a.innerHTML=Ap())}}function sg(i){const a=i.kind==="DEPOSIT"||i.kind==="RECEIVE",l=a?"np-tx-amount-positive":"np-tx-amount-negative",r=a?"+ ":"- ",u=J1(i.amount),h=i.merchant||i.counterparty||_1(i.kind),f=i.description||i.reference||"Pro Subscription",p=Z1(i.createdAt),v=bp(h||""),m=bp(f);let y=null;/flow/i.test(h||"")?y=q1:/western/i.test(h||"")?y=G1:/pricemart/i.test(h||"")&&(y=Q1);const b=a?"np-tx-status-positive":"np-tx-status-negative";return`
    <div class="np-tx-row">
      <div class="np-tx-icon">
        ${y?`<img src="${y}" alt="${v}" class="np-tx-icon-img" />`:""}
      </div>
      <div class="np-tx-main">
        <div class="np-tx-company">${v}</div>
        <div class="np-tx-desc-row">
          <div class="np-tx-desc">${m}</div>
          <span class="np-tx-status ${b}"></span>
        </div>
      </div>
      <div class="np-tx-meta">
        <div class="np-tx-amount ${l}">${r}$${u}</div>
        <div class="np-tx-time">${p}</div>
      </div>
    </div>
  `}function Ap(){const i=new Date().toISOString();return[{kind:"BILL",merchant:"Flow Ltd",description:"Pro Subscription",createdAt:i,amount:12e4},{kind:"RECEIVE",merchant:"Western Union",description:"Pro Subscription",createdAt:i,amount:78e4},{kind:"BILL",merchant:"Pricemart",description:"Pro Subscription",createdAt:i,amount:54e4}].map(l=>sg(l)).join("")}function _1(i){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[i]||i}function Z1(i){try{const a=new Date(i),r=new Date-a,u=Math.floor(r/6e4);return u<60?`${u} mins ago`:u<1440?`${Math.floor(u/60)} hours ago`:a.toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return"Recently"}}function P1(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var _c={exports:{}},st={};var Sp;function F1(){if(Sp)return st;Sp=1;var i=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),v=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),T=Symbol.iterator;function O(x){return x===null||typeof x!="object"?null:(x=T&&x[T]||x["@@iterator"],typeof x=="function"?x:null)}var H={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Q=Object.assign,J={};function Y(x,z,G){this.props=x,this.context=z,this.refs=J,this.updater=G||H}Y.prototype.isReactComponent={},Y.prototype.setState=function(x,z){if(typeof x!="object"&&typeof x!="function"&&x!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,x,z,"setState")},Y.prototype.forceUpdate=function(x){this.updater.enqueueForceUpdate(this,x,"forceUpdate")};function P(){}P.prototype=Y.prototype;function q(x,z,G){this.props=x,this.context=z,this.refs=J,this.updater=G||H}var it=q.prototype=new P;it.constructor=q,Q(it,Y.prototype),it.isPureReactComponent=!0;var W=Array.isArray;function lt(){}var $={H:null,A:null,T:null,S:null},et=Object.prototype.hasOwnProperty;function Ct(x,z,G){var F=G.ref;return{$$typeof:i,type:x,key:z,ref:F!==void 0?F:null,props:G}}function Vt(x,z){return Ct(x.type,z,x.props)}function It(x){return typeof x=="object"&&x!==null&&x.$$typeof===i}function Wt(x){var z={"=":"=0",":":"=2"};return"$"+x.replace(/[=:]/g,function(G){return z[G]})}var Fe=/\/+/g;function pe(x,z){return typeof x=="object"&&x!==null&&x.key!=null?Wt(""+x.key):z.toString(36)}function ce(x){switch(x.status){case"fulfilled":return x.value;case"rejected":throw x.reason;default:switch(typeof x.status=="string"?x.then(lt,lt):(x.status="pending",x.then(function(z){x.status==="pending"&&(x.status="fulfilled",x.value=z)},function(z){x.status==="pending"&&(x.status="rejected",x.reason=z)})),x.status){case"fulfilled":return x.value;case"rejected":throw x.reason}}throw x}function B(x,z,G,F,ot){var ft=typeof x;(ft==="undefined"||ft==="boolean")&&(x=null);var Tt=!1;if(x===null)Tt=!0;else switch(ft){case"bigint":case"string":case"number":Tt=!0;break;case"object":switch(x.$$typeof){case i:case a:Tt=!0;break;case y:return Tt=x._init,B(Tt(x._payload),z,G,F,ot)}}if(Tt)return ot=ot(x),Tt=F===""?"."+pe(x,0):F,W(ot)?(G="",Tt!=null&&(G=Tt.replace(Fe,"$&/")+"/"),B(ot,z,G,"",function(Ba){return Ba})):ot!=null&&(It(ot)&&(ot=Vt(ot,G+(ot.key==null||x&&x.key===ot.key?"":(""+ot.key).replace(Fe,"$&/")+"/")+Tt)),z.push(ot)),1;Tt=0;var fe=F===""?".":F+":";if(W(x))for(var Gt=0;Gt<x.length;Gt++)F=x[Gt],ft=fe+pe(F,Gt),Tt+=B(F,z,G,ft,ot);else if(Gt=O(x),typeof Gt=="function")for(x=Gt.call(x),Gt=0;!(F=x.next()).done;)F=F.value,ft=fe+pe(F,Gt++),Tt+=B(F,z,G,ft,ot);else if(ft==="object"){if(typeof x.then=="function")return B(ce(x),z,G,F,ot);throw z=String(x),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(x).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.")}return Tt}function V(x,z,G){if(x==null)return x;var F=[],ot=0;return B(x,F,"","",function(ft){return z.call(G,ft,ot++)}),F}function _(x){if(x._status===-1){var z=x._result;z=z(),z.then(function(G){(x._status===0||x._status===-1)&&(x._status=1,x._result=G)},function(G){(x._status===0||x._status===-1)&&(x._status=2,x._result=G)}),x._status===-1&&(x._status=0,x._result=z)}if(x._status===1)return x._result.default;throw x._result}var dt=typeof reportError=="function"?reportError:function(x){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof x=="object"&&x!==null&&typeof x.message=="string"?String(x.message):String(x),error:x});if(!window.dispatchEvent(z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",x);return}console.error(x)},pt={map:V,forEach:function(x,z,G){V(x,function(){z.apply(this,arguments)},G)},count:function(x){var z=0;return V(x,function(){z++}),z},toArray:function(x){return V(x,function(z){return z})||[]},only:function(x){if(!It(x))throw Error("React.Children.only expected to receive a single React element child.");return x}};return st.Activity=b,st.Children=pt,st.Component=Y,st.Fragment=l,st.Profiler=u,st.PureComponent=q,st.StrictMode=r,st.Suspense=v,st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=$,st.__COMPILER_RUNTIME={__proto__:null,c:function(x){return $.H.useMemoCache(x)}},st.cache=function(x){return function(){return x.apply(null,arguments)}},st.cacheSignal=function(){return null},st.cloneElement=function(x,z,G){if(x==null)throw Error("The argument must be a React element, but you passed "+x+".");var F=Q({},x.props),ot=x.key;if(z!=null)for(ft in z.key!==void 0&&(ot=""+z.key),z)!et.call(z,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&z.ref===void 0||(F[ft]=z[ft]);var ft=arguments.length-2;if(ft===1)F.children=G;else if(1<ft){for(var Tt=Array(ft),fe=0;fe<ft;fe++)Tt[fe]=arguments[fe+2];F.children=Tt}return Ct(x.type,ot,F)},st.createContext=function(x){return x={$$typeof:f,_currentValue:x,_currentValue2:x,_threadCount:0,Provider:null,Consumer:null},x.Provider=x,x.Consumer={$$typeof:h,_context:x},x},st.createElement=function(x,z,G){var F,ot={},ft=null;if(z!=null)for(F in z.key!==void 0&&(ft=""+z.key),z)et.call(z,F)&&F!=="key"&&F!=="__self"&&F!=="__source"&&(ot[F]=z[F]);var Tt=arguments.length-2;if(Tt===1)ot.children=G;else if(1<Tt){for(var fe=Array(Tt),Gt=0;Gt<Tt;Gt++)fe[Gt]=arguments[Gt+2];ot.children=fe}if(x&&x.defaultProps)for(F in Tt=x.defaultProps,Tt)ot[F]===void 0&&(ot[F]=Tt[F]);return Ct(x,ft,ot)},st.createRef=function(){return{current:null}},st.forwardRef=function(x){return{$$typeof:p,render:x}},st.isValidElement=It,st.lazy=function(x){return{$$typeof:y,_payload:{_status:-1,_result:x},_init:_}},st.memo=function(x,z){return{$$typeof:m,type:x,compare:z===void 0?null:z}},st.startTransition=function(x){var z=$.T,G={};$.T=G;try{var F=x(),ot=$.S;ot!==null&&ot(G,F),typeof F=="object"&&F!==null&&typeof F.then=="function"&&F.then(lt,dt)}catch(ft){dt(ft)}finally{z!==null&&G.types!==null&&(z.types=G.types),$.T=z}},st.unstable_useCacheRefresh=function(){return $.H.useCacheRefresh()},st.use=function(x){return $.H.use(x)},st.useActionState=function(x,z,G){return $.H.useActionState(x,z,G)},st.useCallback=function(x,z){return $.H.useCallback(x,z)},st.useContext=function(x){return $.H.useContext(x)},st.useDebugValue=function(){},st.useDeferredValue=function(x,z){return $.H.useDeferredValue(x,z)},st.useEffect=function(x,z){return $.H.useEffect(x,z)},st.useEffectEvent=function(x){return $.H.useEffectEvent(x)},st.useId=function(){return $.H.useId()},st.useImperativeHandle=function(x,z,G){return $.H.useImperativeHandle(x,z,G)},st.useInsertionEffect=function(x,z){return $.H.useInsertionEffect(x,z)},st.useLayoutEffect=function(x,z){return $.H.useLayoutEffect(x,z)},st.useMemo=function(x,z){return $.H.useMemo(x,z)},st.useOptimistic=function(x,z){return $.H.useOptimistic(x,z)},st.useReducer=function(x,z,G){return $.H.useReducer(x,z,G)},st.useRef=function(x){return $.H.useRef(x)},st.useState=function(x){return $.H.useState(x)},st.useSyncExternalStore=function(x,z,G){return $.H.useSyncExternalStore(x,z,G)},st.useTransition=function(){return $.H.useTransition()},st.version="19.2.0",st}var xp;function Lu(){return xp||(xp=1,_c.exports=F1()),_c.exports}var ct=Lu();const I1=P1(ct);var Zc={exports:{}},Ts={},Pc={exports:{}},Fc={};var Tp;function W1(){return Tp||(Tp=1,(function(i){function a(B,V){var _=B.length;B.push(V);t:for(;0<_;){var dt=_-1>>>1,pt=B[dt];if(0<u(pt,V))B[dt]=V,B[_]=pt,_=dt;else break t}}function l(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var V=B[0],_=B.pop();if(_!==V){B[0]=_;t:for(var dt=0,pt=B.length,x=pt>>>1;dt<x;){var z=2*(dt+1)-1,G=B[z],F=z+1,ot=B[F];if(0>u(G,_))F<pt&&0>u(ot,G)?(B[dt]=ot,B[F]=_,dt=F):(B[dt]=G,B[z]=_,dt=z);else if(F<pt&&0>u(ot,_))B[dt]=ot,B[F]=_,dt=F;else break t}}return V}function u(B,V){var _=B.sortIndex-V.sortIndex;return _!==0?_:B.id-V.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;i.unstable_now=function(){return h.now()}}else{var f=Date,p=f.now();i.unstable_now=function(){return f.now()-p}}var v=[],m=[],y=1,b=null,T=3,O=!1,H=!1,Q=!1,J=!1,Y=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function it(B){for(var V=l(m);V!==null;){if(V.callback===null)r(m);else if(V.startTime<=B)r(m),V.sortIndex=V.expirationTime,a(v,V);else break;V=l(m)}}function W(B){if(Q=!1,it(B),!H)if(l(v)!==null)H=!0,lt||(lt=!0,Wt());else{var V=l(m);V!==null&&ce(W,V.startTime-B)}}var lt=!1,$=-1,et=5,Ct=-1;function Vt(){return J?!0:!(i.unstable_now()-Ct<et)}function It(){if(J=!1,lt){var B=i.unstable_now();Ct=B;var V=!0;try{t:{H=!1,Q&&(Q=!1,P($),$=-1),O=!0;var _=T;try{e:{for(it(B),b=l(v);b!==null&&!(b.expirationTime>B&&Vt());){var dt=b.callback;if(typeof dt=="function"){b.callback=null,T=b.priorityLevel;var pt=dt(b.expirationTime<=B);if(B=i.unstable_now(),typeof pt=="function"){b.callback=pt,it(B),V=!0;break e}b===l(v)&&r(v),it(B)}else r(v);b=l(v)}if(b!==null)V=!0;else{var x=l(m);x!==null&&ce(W,x.startTime-B),V=!1}}break t}finally{b=null,T=_,O=!1}V=void 0}}finally{V?Wt():lt=!1}}}var Wt;if(typeof q=="function")Wt=function(){q(It)};else if(typeof MessageChannel<"u"){var Fe=new MessageChannel,pe=Fe.port2;Fe.port1.onmessage=It,Wt=function(){pe.postMessage(null)}}else Wt=function(){Y(It,0)};function ce(B,V){$=Y(function(){B(i.unstable_now())},V)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(B){B.callback=null},i.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):et=0<B?Math.floor(1e3/B):5},i.unstable_getCurrentPriorityLevel=function(){return T},i.unstable_next=function(B){switch(T){case 1:case 2:case 3:var V=3;break;default:V=T}var _=T;T=V;try{return B()}finally{T=_}},i.unstable_requestPaint=function(){J=!0},i.unstable_runWithPriority=function(B,V){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var _=T;T=B;try{return V()}finally{T=_}},i.unstable_scheduleCallback=function(B,V,_){var dt=i.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?dt+_:dt):_=dt,B){case 1:var pt=-1;break;case 2:pt=250;break;case 5:pt=1073741823;break;case 4:pt=1e4;break;default:pt=5e3}return pt=_+pt,B={id:y++,callback:V,priorityLevel:B,startTime:_,expirationTime:pt,sortIndex:-1},_>dt?(B.sortIndex=_,a(m,B),l(v)===null&&B===l(m)&&(Q?(P($),$=-1):Q=!0,ce(W,_-dt))):(B.sortIndex=pt,a(v,B),H||O||(H=!0,lt||(lt=!0,Wt()))),B},i.unstable_shouldYield=Vt,i.unstable_wrapCallback=function(B){var V=T;return function(){var _=T;T=V;try{return B.apply(this,arguments)}finally{T=_}}}})(Fc)),Fc}var Cp;function $1(){return Cp||(Cp=1,Pc.exports=W1()),Pc.exports}var Ic={exports:{}},ue={};var Ep;function tA(){if(Ep)return ue;Ep=1;var i=Lu();function a(v){var m="https://react.dev/errors/"+v;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)m+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+v+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var r={d:{f:l,r:function(){throw Error(a(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(v,m,y){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:b==null?null:""+b,children:v,containerInfo:m,implementation:y}}var f=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(v,m){if(v==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return ue.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,ue.createPortal=function(v,m){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(a(299));return h(v,m,null,y)},ue.flushSync=function(v){var m=f.T,y=r.p;try{if(f.T=null,r.p=2,v)return v()}finally{f.T=m,r.p=y,r.d.f()}},ue.preconnect=function(v,m){typeof v=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(v,m))},ue.prefetchDNS=function(v){typeof v=="string"&&r.d.D(v)},ue.preinit=function(v,m){if(typeof v=="string"&&m&&typeof m.as=="string"){var y=m.as,b=p(y,m.crossOrigin),T=typeof m.integrity=="string"?m.integrity:void 0,O=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;y==="style"?r.d.S(v,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:b,integrity:T,fetchPriority:O}):y==="script"&&r.d.X(v,{crossOrigin:b,integrity:T,fetchPriority:O,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},ue.preinitModule=function(v,m){if(typeof v=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var y=p(m.as,m.crossOrigin);r.d.M(v,{crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&r.d.M(v)},ue.preload=function(v,m){if(typeof v=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var y=m.as,b=p(y,m.crossOrigin);r.d.L(v,y,{crossOrigin:b,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},ue.preloadModule=function(v,m){if(typeof v=="string")if(m){var y=p(m.as,m.crossOrigin);r.d.m(v,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else r.d.m(v)},ue.requestFormReset=function(v){r.d.r(v)},ue.unstable_batchedUpdates=function(v,m){return v(m)},ue.useFormState=function(v,m,y){return f.H.useFormState(v,m,y)},ue.useFormStatus=function(){return f.H.useHostTransitionStatus()},ue.version="19.2.0",ue}var wp;function eA(){if(wp)return Ic.exports;wp=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(a){console.error(a)}}return i(),Ic.exports=tA(),Ic.exports}var Mp;function nA(){if(Mp)return Ts;Mp=1;var i=$1(),a=Lu(),l=eA();function r(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function h(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function f(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function p(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function v(t){if(h(t)!==t)throw Error(r(188))}function m(t){var e=t.alternate;if(!e){if(e=h(t),e===null)throw Error(r(188));return e!==t?null:t}for(var n=t,s=e;;){var o=n.return;if(o===null)break;var c=o.alternate;if(c===null){if(s=o.return,s!==null){n=s;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===n)return v(o),t;if(c===s)return v(o),e;c=c.sibling}throw Error(r(188))}if(n.return!==s.return)n=o,s=c;else{for(var d=!1,g=o.child;g;){if(g===n){d=!0,n=o,s=c;break}if(g===s){d=!0,s=o,n=c;break}g=g.sibling}if(!d){for(g=c.child;g;){if(g===n){d=!0,n=c,s=o;break}if(g===s){d=!0,s=c,n=o;break}g=g.sibling}if(!d)throw Error(r(189))}}if(n.alternate!==s)throw Error(r(190))}if(n.tag!==3)throw Error(r(188));return n.stateNode.current===n?t:e}function y(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=y(t),e!==null)return e;t=t.sibling}return null}var b=Object.assign,T=Symbol.for("react.element"),O=Symbol.for("react.transitional.element"),H=Symbol.for("react.portal"),Q=Symbol.for("react.fragment"),J=Symbol.for("react.strict_mode"),Y=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),q=Symbol.for("react.context"),it=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),lt=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),et=Symbol.for("react.lazy"),Ct=Symbol.for("react.activity"),Vt=Symbol.for("react.memo_cache_sentinel"),It=Symbol.iterator;function Wt(t){return t===null||typeof t!="object"?null:(t=It&&t[It]||t["@@iterator"],typeof t=="function"?t:null)}var Fe=Symbol.for("react.client.reference");function pe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Fe?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Q:return"Fragment";case Y:return"Profiler";case J:return"StrictMode";case W:return"Suspense";case lt:return"SuspenseList";case Ct:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case H:return"Portal";case q:return t.displayName||"Context";case P:return(t._context.displayName||"Context")+".Consumer";case it:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case $:return e=t.displayName||null,e!==null?e:pe(t.type)||"Memo";case et:e=t._payload,t=t._init;try{return pe(t(e))}catch{}}return null}var ce=Array.isArray,B=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,_={pending:!1,data:null,method:null,action:null},dt=[],pt=-1;function x(t){return{current:t}}function z(t){0>pt||(t.current=dt[pt],dt[pt]=null,pt--)}function G(t,e){pt++,dt[pt]=t.current,t.current=e}var F=x(null),ot=x(null),ft=x(null),Tt=x(null);function fe(t,e){switch(G(ft,e),G(ot,t),G(F,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Ym(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Ym(e),t=qm(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}z(F),G(F,t)}function Gt(){z(F),z(ot),z(ft)}function Ba(t){t.memoizedState!==null&&G(Tt,t);var e=F.current,n=qm(e,t.type);e!==n&&(G(ot,t),G(F,n))}function Js(t){ot.current===t&&(z(F),z(ot)),Tt.current===t&&(z(Tt),bs._currentValue=_)}var Do,pd;function oi(t){if(Do===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Do=e&&e[1]||"",pd=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Do+t+pd}var Ro=!1;function Bo(t,e){if(!t||Ro)return"";Ro=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(e){var k=function(){throw Error()};if(Object.defineProperty(k.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(k,[])}catch(D){var M=D}Reflect.construct(t,[],k)}else{try{k.call()}catch(D){M=D}t.call(k.prototype)}}else{try{throw Error()}catch(D){M=D}(k=t())&&typeof k.catch=="function"&&k.catch(function(){})}}catch(D){if(D&&M&&typeof D.stack=="string")return[D.stack,M.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),d=c[0],g=c[1];if(d&&g){var A=d.split(`
`),w=g.split(`
`);for(o=s=0;s<A.length&&!A[s].includes("DetermineComponentFrameRoot");)s++;for(;o<w.length&&!w[o].includes("DetermineComponentFrameRoot");)o++;if(s===A.length||o===w.length)for(s=A.length-1,o=w.length-1;1<=s&&0<=o&&A[s]!==w[o];)o--;for(;1<=s&&0<=o;s--,o--)if(A[s]!==w[o]){if(s!==1||o!==1)do if(s--,o--,0>o||A[s]!==w[o]){var R=`
`+A[s].replace(" at new "," at ");return t.displayName&&R.includes("<anonymous>")&&(R=R.replace("<anonymous>",t.displayName)),R}while(1<=s&&0<=o);break}}}finally{Ro=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?oi(n):""}function Py(t,e){switch(t.tag){case 26:case 27:case 5:return oi(t.type);case 16:return oi("Lazy");case 13:return t.child!==e&&e!==null?oi("Suspense Fallback"):oi("Suspense");case 19:return oi("SuspenseList");case 0:case 15:return Bo(t.type,!1);case 11:return Bo(t.type.render,!1);case 1:return Bo(t.type,!0);case 31:return oi("Activity");default:return""}}function vd(t){try{var e="",n=null;do e+=Py(t,n),n=t,t=t.return;while(t);return e}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var No=Object.prototype.hasOwnProperty,Uo=i.unstable_scheduleCallback,ko=i.unstable_cancelCallback,Fy=i.unstable_shouldYield,Iy=i.unstable_requestPaint,Ce=i.unstable_now,Wy=i.unstable_getCurrentPriorityLevel,gd=i.unstable_ImmediatePriority,yd=i.unstable_UserBlockingPriority,Ks=i.unstable_NormalPriority,$y=i.unstable_LowPriority,bd=i.unstable_IdlePriority,t0=i.log,e0=i.unstable_setDisableYieldValue,Na=null,Ee=null;function Bn(t){if(typeof t0=="function"&&e0(t),Ee&&typeof Ee.setStrictMode=="function")try{Ee.setStrictMode(Na,t)}catch{}}var we=Math.clz32?Math.clz32:a0,n0=Math.log,i0=Math.LN2;function a0(t){return t>>>=0,t===0?32:31-(n0(t)/i0|0)|0}var _s=256,Zs=262144,Ps=4194304;function ri(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Fs(t,e,n){var s=t.pendingLanes;if(s===0)return 0;var o=0,c=t.suspendedLanes,d=t.pingedLanes;t=t.warmLanes;var g=s&134217727;return g!==0?(s=g&~c,s!==0?o=ri(s):(d&=g,d!==0?o=ri(d):n||(n=g&~t,n!==0&&(o=ri(n))))):(g=s&~c,g!==0?o=ri(g):d!==0?o=ri(d):n||(n=s&~t,n!==0&&(o=ri(n)))),o===0?0:e!==0&&e!==o&&(e&c)===0&&(c=o&-o,n=e&-e,c>=n||c===32&&(n&4194048)!==0)?e:o}function Ua(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function s0(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ad(){var t=Ps;return Ps<<=1,(Ps&62914560)===0&&(Ps=4194304),t}function zo(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ka(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function l0(t,e,n,s,o,c){var d=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var g=t.entanglements,A=t.expirationTimes,w=t.hiddenUpdates;for(n=d&~n;0<n;){var R=31-we(n),k=1<<R;g[R]=0,A[R]=-1;var M=w[R];if(M!==null)for(w[R]=null,R=0;R<M.length;R++){var D=M[R];D!==null&&(D.lane&=-536870913)}n&=~k}s!==0&&Sd(t,s,0),c!==0&&o===0&&t.tag!==0&&(t.suspendedLanes|=c&~(d&~e))}function Sd(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var s=31-we(e);t.entangledLanes|=e,t.entanglements[s]=t.entanglements[s]|1073741824|n&261930}function xd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-we(n),o=1<<s;o&e|t[s]&e&&(t[s]|=e),n&=~o}}function Td(t,e){var n=e&-e;return n=(n&42)!==0?1:Oo(n),(n&(t.suspendedLanes|e))!==0?0:n}function Oo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Lo(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Cd(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:up(t.type))}function Ed(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var Nn=Math.random().toString(36).slice(2),ie="__reactFiber$"+Nn,ve="__reactProps$"+Nn,Oi="__reactContainer$"+Nn,Vo="__reactEvents$"+Nn,o0="__reactListeners$"+Nn,r0="__reactHandles$"+Nn,wd="__reactResources$"+Nn,za="__reactMarker$"+Nn;function Ho(t){delete t[ie],delete t[ve],delete t[Vo],delete t[o0],delete t[r0]}function Li(t){var e=t[ie];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Oi]||n[ie]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Zm(t);t!==null;){if(n=t[ie])return n;t=Zm(t)}return e}t=n,n=t.parentNode}return null}function Vi(t){if(t=t[ie]||t[Oi]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Oa(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(r(33))}function Hi(t){var e=t[wd];return e||(e=t[wd]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function te(t){t[za]=!0}var Md=new Set,Dd={};function ci(t,e){ji(t,e),ji(t+"Capture",e)}function ji(t,e){for(Dd[t]=e,t=0;t<e.length;t++)Md.add(e[t])}var c0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Rd={},Bd={};function u0(t){return No.call(Bd,t)?!0:No.call(Rd,t)?!1:c0.test(t)?Bd[t]=!0:(Rd[t]=!0,!1)}function Is(t,e,n){if(u0(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var s=e.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function Ws(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function cn(t,e,n,s){if(s===null)t.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+s)}}function Oe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Nd(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function d0(t,e,n){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var o=s.get,c=s.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return o.call(this)},set:function(d){n=""+d,c.call(this,d)}}),Object.defineProperty(t,e,{enumerable:s.enumerable}),{getValue:function(){return n},setValue:function(d){n=""+d},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function jo(t){if(!t._valueTracker){var e=Nd(t)?"checked":"value";t._valueTracker=d0(t,e,""+t[e])}}function Ud(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=Nd(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function $s(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var f0=/[\n"\\]/g;function Le(t){return t.replace(f0,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Yo(t,e,n,s,o,c,d,g){t.name="",d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?t.type=d:t.removeAttribute("type"),e!=null?d==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Oe(e)):t.value!==""+Oe(e)&&(t.value=""+Oe(e)):d!=="submit"&&d!=="reset"||t.removeAttribute("value"),e!=null?qo(t,d,Oe(e)):n!=null?qo(t,d,Oe(n)):s!=null&&t.removeAttribute("value"),o==null&&c!=null&&(t.defaultChecked=!!c),o!=null&&(t.checked=o&&typeof o!="function"&&typeof o!="symbol"),g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.name=""+Oe(g):t.removeAttribute("name")}function kd(t,e,n,s,o,c,d,g){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),e!=null||n!=null){if(!(c!=="submit"&&c!=="reset"||e!=null)){jo(t);return}n=n!=null?""+Oe(n):"",e=e!=null?""+Oe(e):n,g||e===t.value||(t.value=e),t.defaultValue=e}s=s??o,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=g?t.checked:!!s,t.defaultChecked=!!s,d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.name=d),jo(t)}function qo(t,e,n){e==="number"&&$s(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Yi(t,e,n,s){if(t=t.options,e){e={};for(var o=0;o<n.length;o++)e["$"+n[o]]=!0;for(n=0;n<t.length;n++)o=e.hasOwnProperty("$"+t[n].value),t[n].selected!==o&&(t[n].selected=o),o&&s&&(t[n].defaultSelected=!0)}else{for(n=""+Oe(n),e=null,o=0;o<t.length;o++){if(t[o].value===n){t[o].selected=!0,s&&(t[o].defaultSelected=!0);return}e!==null||t[o].disabled||(e=t[o])}e!==null&&(e.selected=!0)}}function zd(t,e,n){if(e!=null&&(e=""+Oe(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Oe(n):""}function Od(t,e,n,s){if(e==null){if(s!=null){if(n!=null)throw Error(r(92));if(ce(s)){if(1<s.length)throw Error(r(93));s=s[0]}n=s}n==null&&(n=""),e=n}n=Oe(e),t.defaultValue=n,s=t.textContent,s===n&&s!==""&&s!==null&&(t.value=s),jo(t)}function qi(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var h0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ld(t,e,n){var s=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?s?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":s?t.setProperty(e,n):typeof n!="number"||n===0||h0.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function Vd(t,e,n){if(e!=null&&typeof e!="object")throw Error(r(62));if(t=t.style,n!=null){for(var s in n)!n.hasOwnProperty(s)||e!=null&&e.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var o in e)s=e[o],e.hasOwnProperty(o)&&n[o]!==s&&Ld(t,o,s)}else for(var c in e)e.hasOwnProperty(c)&&Ld(t,c,e[c])}function Go(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var m0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),p0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function tl(t){return p0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function un(){}var Qo=null;function Xo(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Gi=null,Qi=null;function Hd(t){var e=Vi(t);if(e&&(t=e.stateNode)){var n=t[ve]||null;t:switch(t=e.stateNode,e.type){case"input":if(Yo(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Le(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var o=s[ve]||null;if(!o)throw Error(r(90));Yo(s,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(e=0;e<n.length;e++)s=n[e],s.form===t.form&&Ud(s)}break t;case"textarea":zd(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&Yi(t,!!n.multiple,e,!1)}}}var Jo=!1;function jd(t,e,n){if(Jo)return t(e,n);Jo=!0;try{var s=t(e);return s}finally{if(Jo=!1,(Gi!==null||Qi!==null)&&(ql(),Gi&&(e=Gi,t=Qi,Qi=Gi=null,Hd(e),t)))for(e=0;e<t.length;e++)Hd(t[e])}}function La(t,e){var n=t.stateNode;if(n===null)return null;var s=n[ve]||null;if(s===null)return null;n=s[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(r(231,e,typeof n));return n}var dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ko=!1;if(dn)try{var Va={};Object.defineProperty(Va,"passive",{get:function(){Ko=!0}}),window.addEventListener("test",Va,Va),window.removeEventListener("test",Va,Va)}catch{Ko=!1}var Un=null,_o=null,el=null;function Yd(){if(el)return el;var t,e=_o,n=e.length,s,o="value"in Un?Un.value:Un.textContent,c=o.length;for(t=0;t<n&&e[t]===o[t];t++);var d=n-t;for(s=1;s<=d&&e[n-s]===o[c-s];s++);return el=o.slice(t,1<s?1-s:void 0)}function nl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function il(){return!0}function qd(){return!1}function ge(t){function e(n,s,o,c,d){this._reactName=n,this._targetInst=o,this.type=s,this.nativeEvent=c,this.target=d,this.currentTarget=null;for(var g in t)t.hasOwnProperty(g)&&(n=t[g],this[g]=n?n(c):c[g]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?il:qd,this.isPropagationStopped=qd,this}return b(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=il)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=il)},persist:function(){},isPersistent:il}),e}var ui={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},al=ge(ui),Ha=b({},ui,{view:0,detail:0}),v0=ge(Ha),Zo,Po,ja,sl=b({},Ha,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Io,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ja&&(ja&&t.type==="mousemove"?(Zo=t.screenX-ja.screenX,Po=t.screenY-ja.screenY):Po=Zo=0,ja=t),Zo)},movementY:function(t){return"movementY"in t?t.movementY:Po}}),Gd=ge(sl),g0=b({},sl,{dataTransfer:0}),y0=ge(g0),b0=b({},Ha,{relatedTarget:0}),Fo=ge(b0),A0=b({},ui,{animationName:0,elapsedTime:0,pseudoElement:0}),S0=ge(A0),x0=b({},ui,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),T0=ge(x0),C0=b({},ui,{data:0}),Qd=ge(C0),E0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},w0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},M0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function D0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=M0[t])?!!e[t]:!1}function Io(){return D0}var R0=b({},Ha,{key:function(t){if(t.key){var e=E0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=nl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?w0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Io,charCode:function(t){return t.type==="keypress"?nl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?nl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),B0=ge(R0),N0=b({},sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xd=ge(N0),U0=b({},Ha,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Io}),k0=ge(U0),z0=b({},ui,{propertyName:0,elapsedTime:0,pseudoElement:0}),O0=ge(z0),L0=b({},sl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),V0=ge(L0),H0=b({},ui,{newState:0,oldState:0}),j0=ge(H0),Y0=[9,13,27,32],Wo=dn&&"CompositionEvent"in window,Ya=null;dn&&"documentMode"in document&&(Ya=document.documentMode);var q0=dn&&"TextEvent"in window&&!Ya,Jd=dn&&(!Wo||Ya&&8<Ya&&11>=Ya),Kd=" ",_d=!1;function Zd(t,e){switch(t){case"keyup":return Y0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pd(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Xi=!1;function G0(t,e){switch(t){case"compositionend":return Pd(e);case"keypress":return e.which!==32?null:(_d=!0,Kd);case"textInput":return t=e.data,t===Kd&&_d?null:t;default:return null}}function Q0(t,e){if(Xi)return t==="compositionend"||!Wo&&Zd(t,e)?(t=Yd(),el=_o=Un=null,Xi=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Jd&&e.locale!=="ko"?null:e.data;default:return null}}var X0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!X0[t.type]:e==="textarea"}function Id(t,e,n,s){Gi?Qi?Qi.push(s):Qi=[s]:Gi=s,e=Zl(e,"onChange"),0<e.length&&(n=new al("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var qa=null,Ga=null;function J0(t){zm(t,0)}function ll(t){var e=Oa(t);if(Ud(e))return t}function Wd(t,e){if(t==="change")return e}var $d=!1;if(dn){var $o;if(dn){var tr="oninput"in document;if(!tr){var tf=document.createElement("div");tf.setAttribute("oninput","return;"),tr=typeof tf.oninput=="function"}$o=tr}else $o=!1;$d=$o&&(!document.documentMode||9<document.documentMode)}function ef(){qa&&(qa.detachEvent("onpropertychange",nf),Ga=qa=null)}function nf(t){if(t.propertyName==="value"&&ll(Ga)){var e=[];Id(e,Ga,t,Xo(t)),jd(J0,e)}}function K0(t,e,n){t==="focusin"?(ef(),qa=e,Ga=n,qa.attachEvent("onpropertychange",nf)):t==="focusout"&&ef()}function _0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ll(Ga)}function Z0(t,e){if(t==="click")return ll(e)}function P0(t,e){if(t==="input"||t==="change")return ll(e)}function F0(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Me=typeof Object.is=="function"?Object.is:F0;function Qa(t,e){if(Me(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var o=n[s];if(!No.call(e,o)||!Me(t[o],e[o]))return!1}return!0}function af(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function sf(t,e){var n=af(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=af(n)}}function lf(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?lf(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function of(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=$s(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=$s(t.document)}return e}function er(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var I0=dn&&"documentMode"in document&&11>=document.documentMode,Ji=null,nr=null,Xa=null,ir=!1;function rf(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ir||Ji==null||Ji!==$s(s)||(s=Ji,"selectionStart"in s&&er(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Xa&&Qa(Xa,s)||(Xa=s,s=Zl(nr,"onSelect"),0<s.length&&(e=new al("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=Ji)))}function di(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ki={animationend:di("Animation","AnimationEnd"),animationiteration:di("Animation","AnimationIteration"),animationstart:di("Animation","AnimationStart"),transitionrun:di("Transition","TransitionRun"),transitionstart:di("Transition","TransitionStart"),transitioncancel:di("Transition","TransitionCancel"),transitionend:di("Transition","TransitionEnd")},ar={},cf={};dn&&(cf=document.createElement("div").style,"AnimationEvent"in window||(delete Ki.animationend.animation,delete Ki.animationiteration.animation,delete Ki.animationstart.animation),"TransitionEvent"in window||delete Ki.transitionend.transition);function fi(t){if(ar[t])return ar[t];if(!Ki[t])return t;var e=Ki[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in cf)return ar[t]=e[n];return t}var uf=fi("animationend"),df=fi("animationiteration"),ff=fi("animationstart"),W0=fi("transitionrun"),$0=fi("transitionstart"),tb=fi("transitioncancel"),hf=fi("transitionend"),mf=new Map,sr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");sr.push("scrollEnd");function Ie(t,e){mf.set(t,e),ci(e,[t])}var ol=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ve=[],_i=0,lr=0;function rl(){for(var t=_i,e=lr=_i=0;e<t;){var n=Ve[e];Ve[e++]=null;var s=Ve[e];Ve[e++]=null;var o=Ve[e];Ve[e++]=null;var c=Ve[e];if(Ve[e++]=null,s!==null&&o!==null){var d=s.pending;d===null?o.next=o:(o.next=d.next,d.next=o),s.pending=o}c!==0&&pf(n,o,c)}}function cl(t,e,n,s){Ve[_i++]=t,Ve[_i++]=e,Ve[_i++]=n,Ve[_i++]=s,lr|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function or(t,e,n,s){return cl(t,e,n,s),ul(t)}function hi(t,e){return cl(t,null,null,e),ul(t)}function pf(t,e,n){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n);for(var o=!1,c=t.return;c!==null;)c.childLanes|=n,s=c.alternate,s!==null&&(s.childLanes|=n),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(o=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,o&&e!==null&&(o=31-we(n),t=c.hiddenUpdates,s=t[o],s===null?t[o]=[e]:s.push(e),e.lane=n|536870912),c):null}function ul(t){if(50<fs)throw fs=0,vc=null,Error(r(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Zi={};function eb(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(t,e,n,s){return new eb(t,e,n,s)}function rr(t){return t=t.prototype,!(!t||!t.isReactComponent)}function fn(t,e){var n=t.alternate;return n===null?(n=De(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function vf(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function dl(t,e,n,s,o,c){var d=0;if(s=t,typeof t=="function")rr(t)&&(d=1);else if(typeof t=="string")d=l1(t,n,F.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Ct:return t=De(31,n,e,o),t.elementType=Ct,t.lanes=c,t;case Q:return mi(n.children,o,c,e);case J:d=8,o|=24;break;case Y:return t=De(12,n,e,o|2),t.elementType=Y,t.lanes=c,t;case W:return t=De(13,n,e,o),t.elementType=W,t.lanes=c,t;case lt:return t=De(19,n,e,o),t.elementType=lt,t.lanes=c,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case q:d=10;break t;case P:d=9;break t;case it:d=11;break t;case $:d=14;break t;case et:d=16,s=null;break t}d=29,n=Error(r(130,t===null?"null":typeof t,"")),s=null}return e=De(d,n,e,o),e.elementType=t,e.type=s,e.lanes=c,e}function mi(t,e,n,s){return t=De(7,t,s,e),t.lanes=n,t}function cr(t,e,n){return t=De(6,t,null,e),t.lanes=n,t}function gf(t){var e=De(18,null,null,0);return e.stateNode=t,e}function ur(t,e,n){return e=De(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var yf=new WeakMap;function He(t,e){if(typeof t=="object"&&t!==null){var n=yf.get(t);return n!==void 0?n:(e={value:t,source:e,stack:vd(e)},yf.set(t,e),e)}return{value:t,source:e,stack:vd(e)}}var Pi=[],Fi=0,fl=null,Ja=0,je=[],Ye=0,kn=null,nn=1,an="";function hn(t,e){Pi[Fi++]=Ja,Pi[Fi++]=fl,fl=t,Ja=e}function bf(t,e,n){je[Ye++]=nn,je[Ye++]=an,je[Ye++]=kn,kn=t;var s=nn;t=an;var o=32-we(s)-1;s&=~(1<<o),n+=1;var c=32-we(e)+o;if(30<c){var d=o-o%5;c=(s&(1<<d)-1).toString(32),s>>=d,o-=d,nn=1<<32-we(e)+o|n<<o|s,an=c+t}else nn=1<<c|n<<o|s,an=t}function dr(t){t.return!==null&&(hn(t,1),bf(t,1,0))}function fr(t){for(;t===fl;)fl=Pi[--Fi],Pi[Fi]=null,Ja=Pi[--Fi],Pi[Fi]=null;for(;t===kn;)kn=je[--Ye],je[Ye]=null,an=je[--Ye],je[Ye]=null,nn=je[--Ye],je[Ye]=null}function Af(t,e){je[Ye++]=nn,je[Ye++]=an,je[Ye++]=kn,nn=e.id,an=e.overflow,kn=t}var ae=null,Nt=null,yt=!1,zn=null,qe=!1,hr=Error(r(519));function On(t){var e=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ka(He(e,t)),hr}function Sf(t){var e=t.stateNode,n=t.type,s=t.memoizedProps;switch(e[ie]=t,e[ve]=s,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<ms.length;n++)mt(ms[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),kd(e,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),Od(e,s.value,s.defaultValue,s.children)}n=s.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||s.suppressHydrationWarning===!0||Hm(e.textContent,n)?(s.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),s.onScroll!=null&&mt("scroll",e),s.onScrollEnd!=null&&mt("scrollend",e),s.onClick!=null&&(e.onclick=un),e=!0):e=!1,e||On(t,!0)}function xf(t){for(ae=t.return;ae;)switch(ae.tag){case 5:case 31:case 13:qe=!1;return;case 27:case 3:qe=!0;return;default:ae=ae.return}}function Ii(t){if(t!==ae)return!1;if(!yt)return xf(t),yt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Nc(t.type,t.memoizedProps)),n=!n),n&&Nt&&On(t),xf(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Nt=_m(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Nt=_m(t)}else e===27?(e=Nt,Pn(t.type)?(t=Lc,Lc=null,Nt=t):Nt=e):Nt=ae?Qe(t.stateNode.nextSibling):null;return!0}function pi(){Nt=ae=null,yt=!1}function mr(){var t=zn;return t!==null&&(Se===null?Se=t:Se.push.apply(Se,t),zn=null),t}function Ka(t){zn===null?zn=[t]:zn.push(t)}var pr=x(null),vi=null,mn=null;function Ln(t,e,n){G(pr,e._currentValue),e._currentValue=n}function pn(t){t._currentValue=pr.current,z(pr)}function vr(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function gr(t,e,n,s){var o=t.child;for(o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){var d=o.child;c=c.firstContext;t:for(;c!==null;){var g=c;c=o;for(var A=0;A<e.length;A++)if(g.context===e[A]){c.lanes|=n,g=c.alternate,g!==null&&(g.lanes|=n),vr(c.return,n,t),s||(d=null);break t}c=g.next}}else if(o.tag===18){if(d=o.return,d===null)throw Error(r(341));d.lanes|=n,c=d.alternate,c!==null&&(c.lanes|=n),vr(d,n,t),d=null}else d=o.child;if(d!==null)d.return=o;else for(d=o;d!==null;){if(d===t){d=null;break}if(o=d.sibling,o!==null){o.return=d.return,d=o;break}d=d.return}o=d}}function Wi(t,e,n,s){t=null;for(var o=e,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var d=o.alternate;if(d===null)throw Error(r(387));if(d=d.memoizedProps,d!==null){var g=o.type;Me(o.pendingProps.value,d.value)||(t!==null?t.push(g):t=[g])}}else if(o===Tt.current){if(d=o.alternate,d===null)throw Error(r(387));d.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(t!==null?t.push(bs):t=[bs])}o=o.return}t!==null&&gr(e,t,n,s),e.flags|=262144}function hl(t){for(t=t.firstContext;t!==null;){if(!Me(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function gi(t){vi=t,mn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function se(t){return Tf(vi,t)}function ml(t,e){return vi===null&&gi(t),Tf(t,e)}function Tf(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},mn===null){if(t===null)throw Error(r(308));mn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else mn=mn.next=e;return n}var nb=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,s){t.push(s)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},ib=i.unstable_scheduleCallback,ab=i.unstable_NormalPriority,Kt={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function yr(){return{controller:new nb,data:new Map,refCount:0}}function _a(t){t.refCount--,t.refCount===0&&ib(ab,function(){t.controller.abort()})}var Za=null,br=0,$i=0,ta=null;function sb(t,e){if(Za===null){var n=Za=[];br=0,$i=xc(),ta={status:"pending",value:void 0,then:function(s){n.push(s)}}}return br++,e.then(Cf,Cf),e}function Cf(){if(--br===0&&Za!==null){ta!==null&&(ta.status="fulfilled");var t=Za;Za=null,$i=0,ta=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function lb(t,e){var n=[],s={status:"pending",value:null,reason:null,then:function(o){n.push(o)}};return t.then(function(){s.status="fulfilled",s.value=e;for(var o=0;o<n.length;o++)(0,n[o])(e)},function(o){for(s.status="rejected",s.reason=o,o=0;o<n.length;o++)(0,n[o])(void 0)}),s}var Ef=B.S;B.S=function(t,e){rm=Ce(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&sb(t,e),Ef!==null&&Ef(t,e)};var yi=x(null);function Ar(){var t=yi.current;return t!==null?t:Bt.pooledCache}function pl(t,e){e===null?G(yi,yi.current):G(yi,e.pool)}function wf(){var t=Ar();return t===null?null:{parent:Kt._currentValue,pool:t}}var ea=Error(r(460)),Sr=Error(r(474)),vl=Error(r(542)),gl={then:function(){}};function Mf(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Df(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(un,un),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Bf(t),t;default:if(typeof e.status=="string")e.then(un,un);else{if(t=Bt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=e,t.status="pending",t.then(function(s){if(e.status==="pending"){var o=e;o.status="fulfilled",o.value=s}},function(s){if(e.status==="pending"){var o=e;o.status="rejected",o.reason=s}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Bf(t),t}throw Ai=e,ea}}function bi(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ai=n,ea):n}}var Ai=null;function Rf(){if(Ai===null)throw Error(r(459));var t=Ai;return Ai=null,t}function Bf(t){if(t===ea||t===vl)throw Error(r(483))}var na=null,Pa=0;function yl(t){var e=Pa;return Pa+=1,na===null&&(na=[]),Df(na,t,e)}function Fa(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function bl(t,e){throw e.$$typeof===T?Error(r(525)):(t=Object.prototype.toString.call(e),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Nf(t){function e(C,S){if(t){var E=C.deletions;E===null?(C.deletions=[S],C.flags|=16):E.push(S)}}function n(C,S){if(!t)return null;for(;S!==null;)e(C,S),S=S.sibling;return null}function s(C){for(var S=new Map;C!==null;)C.key!==null?S.set(C.key,C):S.set(C.index,C),C=C.sibling;return S}function o(C,S){return C=fn(C,S),C.index=0,C.sibling=null,C}function c(C,S,E){return C.index=E,t?(E=C.alternate,E!==null?(E=E.index,E<S?(C.flags|=67108866,S):E):(C.flags|=67108866,S)):(C.flags|=1048576,S)}function d(C){return t&&C.alternate===null&&(C.flags|=67108866),C}function g(C,S,E,N){return S===null||S.tag!==6?(S=cr(E,C.mode,N),S.return=C,S):(S=o(S,E),S.return=C,S)}function A(C,S,E,N){var tt=E.type;return tt===Q?R(C,S,E.props.children,N,E.key):S!==null&&(S.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===et&&bi(tt)===S.type)?(S=o(S,E.props),Fa(S,E),S.return=C,S):(S=dl(E.type,E.key,E.props,null,C.mode,N),Fa(S,E),S.return=C,S)}function w(C,S,E,N){return S===null||S.tag!==4||S.stateNode.containerInfo!==E.containerInfo||S.stateNode.implementation!==E.implementation?(S=ur(E,C.mode,N),S.return=C,S):(S=o(S,E.children||[]),S.return=C,S)}function R(C,S,E,N,tt){return S===null||S.tag!==7?(S=mi(E,C.mode,N,tt),S.return=C,S):(S=o(S,E),S.return=C,S)}function k(C,S,E){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return S=cr(""+S,C.mode,E),S.return=C,S;if(typeof S=="object"&&S!==null){switch(S.$$typeof){case O:return E=dl(S.type,S.key,S.props,null,C.mode,E),Fa(E,S),E.return=C,E;case H:return S=ur(S,C.mode,E),S.return=C,S;case et:return S=bi(S),k(C,S,E)}if(ce(S)||Wt(S))return S=mi(S,C.mode,E,null),S.return=C,S;if(typeof S.then=="function")return k(C,yl(S),E);if(S.$$typeof===q)return k(C,ml(C,S),E);bl(C,S)}return null}function M(C,S,E,N){var tt=S!==null?S.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return tt!==null?null:g(C,S,""+E,N);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case O:return E.key===tt?A(C,S,E,N):null;case H:return E.key===tt?w(C,S,E,N):null;case et:return E=bi(E),M(C,S,E,N)}if(ce(E)||Wt(E))return tt!==null?null:R(C,S,E,N,null);if(typeof E.then=="function")return M(C,S,yl(E),N);if(E.$$typeof===q)return M(C,S,ml(C,E),N);bl(C,E)}return null}function D(C,S,E,N,tt){if(typeof N=="string"&&N!==""||typeof N=="number"||typeof N=="bigint")return C=C.get(E)||null,g(S,C,""+N,tt);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case O:return C=C.get(N.key===null?E:N.key)||null,A(S,C,N,tt);case H:return C=C.get(N.key===null?E:N.key)||null,w(S,C,N,tt);case et:return N=bi(N),D(C,S,E,N,tt)}if(ce(N)||Wt(N))return C=C.get(E)||null,R(S,C,N,tt,null);if(typeof N.then=="function")return D(C,S,E,yl(N),tt);if(N.$$typeof===q)return D(C,S,E,ml(S,N),tt);bl(S,N)}return null}function Z(C,S,E,N){for(var tt=null,At=null,I=S,ut=S=0,gt=null;I!==null&&ut<E.length;ut++){I.index>ut?(gt=I,I=null):gt=I.sibling;var St=M(C,I,E[ut],N);if(St===null){I===null&&(I=gt);break}t&&I&&St.alternate===null&&e(C,I),S=c(St,S,ut),At===null?tt=St:At.sibling=St,At=St,I=gt}if(ut===E.length)return n(C,I),yt&&hn(C,ut),tt;if(I===null){for(;ut<E.length;ut++)I=k(C,E[ut],N),I!==null&&(S=c(I,S,ut),At===null?tt=I:At.sibling=I,At=I);return yt&&hn(C,ut),tt}for(I=s(I);ut<E.length;ut++)gt=D(I,C,ut,E[ut],N),gt!==null&&(t&&gt.alternate!==null&&I.delete(gt.key===null?ut:gt.key),S=c(gt,S,ut),At===null?tt=gt:At.sibling=gt,At=gt);return t&&I.forEach(function(ti){return e(C,ti)}),yt&&hn(C,ut),tt}function nt(C,S,E,N){if(E==null)throw Error(r(151));for(var tt=null,At=null,I=S,ut=S=0,gt=null,St=E.next();I!==null&&!St.done;ut++,St=E.next()){I.index>ut?(gt=I,I=null):gt=I.sibling;var ti=M(C,I,St.value,N);if(ti===null){I===null&&(I=gt);break}t&&I&&ti.alternate===null&&e(C,I),S=c(ti,S,ut),At===null?tt=ti:At.sibling=ti,At=ti,I=gt}if(St.done)return n(C,I),yt&&hn(C,ut),tt;if(I===null){for(;!St.done;ut++,St=E.next())St=k(C,St.value,N),St!==null&&(S=c(St,S,ut),At===null?tt=St:At.sibling=St,At=St);return yt&&hn(C,ut),tt}for(I=s(I);!St.done;ut++,St=E.next())St=D(I,C,ut,St.value,N),St!==null&&(t&&St.alternate!==null&&I.delete(St.key===null?ut:St.key),S=c(St,S,ut),At===null?tt=St:At.sibling=St,At=St);return t&&I.forEach(function(g1){return e(C,g1)}),yt&&hn(C,ut),tt}function Rt(C,S,E,N){if(typeof E=="object"&&E!==null&&E.type===Q&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case O:t:{for(var tt=E.key;S!==null;){if(S.key===tt){if(tt=E.type,tt===Q){if(S.tag===7){n(C,S.sibling),N=o(S,E.props.children),N.return=C,C=N;break t}}else if(S.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===et&&bi(tt)===S.type){n(C,S.sibling),N=o(S,E.props),Fa(N,E),N.return=C,C=N;break t}n(C,S);break}else e(C,S);S=S.sibling}E.type===Q?(N=mi(E.props.children,C.mode,N,E.key),N.return=C,C=N):(N=dl(E.type,E.key,E.props,null,C.mode,N),Fa(N,E),N.return=C,C=N)}return d(C);case H:t:{for(tt=E.key;S!==null;){if(S.key===tt)if(S.tag===4&&S.stateNode.containerInfo===E.containerInfo&&S.stateNode.implementation===E.implementation){n(C,S.sibling),N=o(S,E.children||[]),N.return=C,C=N;break t}else{n(C,S);break}else e(C,S);S=S.sibling}N=ur(E,C.mode,N),N.return=C,C=N}return d(C);case et:return E=bi(E),Rt(C,S,E,N)}if(ce(E))return Z(C,S,E,N);if(Wt(E)){if(tt=Wt(E),typeof tt!="function")throw Error(r(150));return E=tt.call(E),nt(C,S,E,N)}if(typeof E.then=="function")return Rt(C,S,yl(E),N);if(E.$$typeof===q)return Rt(C,S,ml(C,E),N);bl(C,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,S!==null&&S.tag===6?(n(C,S.sibling),N=o(S,E),N.return=C,C=N):(n(C,S),N=cr(E,C.mode,N),N.return=C,C=N),d(C)):n(C,S)}return function(C,S,E,N){try{Pa=0;var tt=Rt(C,S,E,N);return na=null,tt}catch(I){if(I===ea||I===vl)throw I;var At=De(29,I,null,C.mode);return At.lanes=N,At.return=C,At}finally{}}}var Si=Nf(!0),Uf=Nf(!1),Vn=!1;function xr(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Tr(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Hn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function jn(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(xt&2)!==0){var o=s.pending;return o===null?e.next=e:(e.next=o.next,o.next=e),s.pending=e,e=ul(t),pf(t,null,n),e}return cl(t,s,e,n),ul(t)}function Ia(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,xd(t,n)}}function Cr(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var o=null,c=null;if(n=n.firstBaseUpdate,n!==null){do{var d={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};c===null?o=c=d:c=c.next=d,n=n.next}while(n!==null);c===null?o=c=e:c=c.next=e}else o=c=e;n={baseState:s.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Er=!1;function Wa(){if(Er){var t=ta;if(t!==null)throw t}}function $a(t,e,n,s){Er=!1;var o=t.updateQueue;Vn=!1;var c=o.firstBaseUpdate,d=o.lastBaseUpdate,g=o.shared.pending;if(g!==null){o.shared.pending=null;var A=g,w=A.next;A.next=null,d===null?c=w:d.next=w,d=A;var R=t.alternate;R!==null&&(R=R.updateQueue,g=R.lastBaseUpdate,g!==d&&(g===null?R.firstBaseUpdate=w:g.next=w,R.lastBaseUpdate=A))}if(c!==null){var k=o.baseState;d=0,R=w=A=null,g=c;do{var M=g.lane&-536870913,D=M!==g.lane;if(D?(vt&M)===M:(s&M)===M){M!==0&&M===$i&&(Er=!0),R!==null&&(R=R.next={lane:0,tag:g.tag,payload:g.payload,callback:null,next:null});t:{var Z=t,nt=g;M=e;var Rt=n;switch(nt.tag){case 1:if(Z=nt.payload,typeof Z=="function"){k=Z.call(Rt,k,M);break t}k=Z;break t;case 3:Z.flags=Z.flags&-65537|128;case 0:if(Z=nt.payload,M=typeof Z=="function"?Z.call(Rt,k,M):Z,M==null)break t;k=b({},k,M);break t;case 2:Vn=!0}}M=g.callback,M!==null&&(t.flags|=64,D&&(t.flags|=8192),D=o.callbacks,D===null?o.callbacks=[M]:D.push(M))}else D={lane:M,tag:g.tag,payload:g.payload,callback:g.callback,next:null},R===null?(w=R=D,A=k):R=R.next=D,d|=M;if(g=g.next,g===null){if(g=o.shared.pending,g===null)break;D=g,g=D.next,D.next=null,o.lastBaseUpdate=D,o.shared.pending=null}}while(!0);R===null&&(A=k),o.baseState=A,o.firstBaseUpdate=w,o.lastBaseUpdate=R,c===null&&(o.shared.lanes=0),Xn|=d,t.lanes=d,t.memoizedState=k}}function kf(t,e){if(typeof t!="function")throw Error(r(191,t));t.call(e)}function zf(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)kf(n[t],e)}var ia=x(null),Al=x(0);function Of(t,e){t=Cn,G(Al,t),G(ia,e),Cn=t|e.baseLanes}function wr(){G(Al,Cn),G(ia,ia.current)}function Mr(){Cn=Al.current,z(ia),z(Al)}var Re=x(null),Ge=null;function Yn(t){var e=t.alternate;G(Qt,Qt.current&1),G(Re,t),Ge===null&&(e===null||ia.current!==null||e.memoizedState!==null)&&(Ge=t)}function Dr(t){G(Qt,Qt.current),G(Re,t),Ge===null&&(Ge=t)}function Lf(t){t.tag===22?(G(Qt,Qt.current),G(Re,t),Ge===null&&(Ge=t)):qn()}function qn(){G(Qt,Qt.current),G(Re,Re.current)}function Be(t){z(Re),Ge===t&&(Ge=null),z(Qt)}var Qt=x(0);function Sl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||zc(n)||Oc(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var vn=0,rt=null,Mt=null,_t=null,xl=!1,aa=!1,xi=!1,Tl=0,ts=0,sa=null,ob=0;function jt(){throw Error(r(321))}function Rr(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Me(t[n],e[n]))return!1;return!0}function Br(t,e,n,s,o,c){return vn=c,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,B.H=t===null||t.memoizedState===null?bh:Jr,xi=!1,c=n(s,o),xi=!1,aa&&(c=Hf(e,n,s,o)),Vf(t),c}function Vf(t){B.H=is;var e=Mt!==null&&Mt.next!==null;if(vn=0,_t=Mt=rt=null,xl=!1,ts=0,sa=null,e)throw Error(r(300));t===null||Zt||(t=t.dependencies,t!==null&&hl(t)&&(Zt=!0))}function Hf(t,e,n,s){rt=t;var o=0;do{if(aa&&(sa=null),ts=0,aa=!1,25<=o)throw Error(r(301));if(o+=1,_t=Mt=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}B.H=Ah,c=e(n,s)}while(aa);return c}function rb(){var t=B.H,e=t.useState()[0];return e=typeof e.then=="function"?es(e):e,t=t.useState()[0],(Mt!==null?Mt.memoizedState:null)!==t&&(rt.flags|=1024),e}function Nr(){var t=Tl!==0;return Tl=0,t}function Ur(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function kr(t){if(xl){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}xl=!1}vn=0,_t=Mt=rt=null,aa=!1,ts=Tl=0,sa=null}function he(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _t===null?rt.memoizedState=_t=t:_t=_t.next=t,_t}function Xt(){if(Mt===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Mt.next;var e=_t===null?rt.memoizedState:_t.next;if(e!==null)_t=e,Mt=t;else{if(t===null)throw rt.alternate===null?Error(r(467)):Error(r(310));Mt=t,t={memoizedState:Mt.memoizedState,baseState:Mt.baseState,baseQueue:Mt.baseQueue,queue:Mt.queue,next:null},_t===null?rt.memoizedState=_t=t:_t=_t.next=t}return _t}function Cl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function es(t){var e=ts;return ts+=1,sa===null&&(sa=[]),t=Df(sa,t,e),e=rt,(_t===null?e.memoizedState:_t.next)===null&&(e=e.alternate,B.H=e===null||e.memoizedState===null?bh:Jr),t}function El(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return es(t);if(t.$$typeof===q)return se(t)}throw Error(r(438,String(t)))}function zr(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var s=rt.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(e={data:s.data.map(function(o){return o.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Cl(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),s=0;s<t;s++)n[s]=Vt;return e.index++,n}function gn(t,e){return typeof e=="function"?e(t):e}function wl(t){var e=Xt();return Or(e,Mt,t)}function Or(t,e,n){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=n;var o=t.baseQueue,c=s.pending;if(c!==null){if(o!==null){var d=o.next;o.next=c.next,c.next=d}e.baseQueue=o=c,s.pending=null}if(c=t.baseState,o===null)t.memoizedState=c;else{e=o.next;var g=d=null,A=null,w=e,R=!1;do{var k=w.lane&-536870913;if(k!==w.lane?(vt&k)===k:(vn&k)===k){var M=w.revertLane;if(M===0)A!==null&&(A=A.next={lane:0,revertLane:0,gesture:null,action:w.action,hasEagerState:w.hasEagerState,eagerState:w.eagerState,next:null}),k===$i&&(R=!0);else if((vn&M)===M){w=w.next,M===$i&&(R=!0);continue}else k={lane:0,revertLane:w.revertLane,gesture:null,action:w.action,hasEagerState:w.hasEagerState,eagerState:w.eagerState,next:null},A===null?(g=A=k,d=c):A=A.next=k,rt.lanes|=M,Xn|=M;k=w.action,xi&&n(c,k),c=w.hasEagerState?w.eagerState:n(c,k)}else M={lane:k,revertLane:w.revertLane,gesture:w.gesture,action:w.action,hasEagerState:w.hasEagerState,eagerState:w.eagerState,next:null},A===null?(g=A=M,d=c):A=A.next=M,rt.lanes|=k,Xn|=k;w=w.next}while(w!==null&&w!==e);if(A===null?d=c:A.next=g,!Me(c,t.memoizedState)&&(Zt=!0,R&&(n=ta,n!==null)))throw n;t.memoizedState=c,t.baseState=d,t.baseQueue=A,s.lastRenderedState=c}return o===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function Lr(t){var e=Xt(),n=e.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=t;var s=n.dispatch,o=n.pending,c=e.memoizedState;if(o!==null){n.pending=null;var d=o=o.next;do c=t(c,d.action),d=d.next;while(d!==o);Me(c,e.memoizedState)||(Zt=!0),e.memoizedState=c,e.baseQueue===null&&(e.baseState=c),n.lastRenderedState=c}return[c,s]}function jf(t,e,n){var s=rt,o=Xt(),c=yt;if(c){if(n===void 0)throw Error(r(407));n=n()}else n=e();var d=!Me((Mt||o).memoizedState,n);if(d&&(o.memoizedState=n,Zt=!0),o=o.queue,jr(Gf.bind(null,s,o,t),[t]),o.getSnapshot!==e||d||_t!==null&&_t.memoizedState.tag&1){if(s.flags|=2048,la(9,{destroy:void 0},qf.bind(null,s,o,n,e),null),Bt===null)throw Error(r(349));c||(vn&127)!==0||Yf(s,e,n)}return n}function Yf(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=Cl(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function qf(t,e,n,s){e.value=n,e.getSnapshot=s,Qf(e)&&Xf(t)}function Gf(t,e,n){return n(function(){Qf(e)&&Xf(t)})}function Qf(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Me(t,n)}catch{return!0}}function Xf(t){var e=hi(t,2);e!==null&&xe(e,t,2)}function Vr(t){var e=he();if(typeof t=="function"){var n=t;if(t=n(),xi){Bn(!0);try{n()}finally{Bn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:t},e}function Jf(t,e,n,s){return t.baseState=n,Or(t,Mt,typeof s=="function"?s:gn)}function cb(t,e,n,s,o){if(Rl(t))throw Error(r(485));if(t=e.action,t!==null){var c={payload:o,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(d){c.listeners.push(d)}};B.T!==null?n(!0):c.isTransition=!1,s(c),n=e.pending,n===null?(c.next=e.pending=c,Kf(e,c)):(c.next=n.next,e.pending=n.next=c)}}function Kf(t,e){var n=e.action,s=e.payload,o=t.state;if(e.isTransition){var c=B.T,d={};B.T=d;try{var g=n(o,s),A=B.S;A!==null&&A(d,g),_f(t,e,g)}catch(w){Hr(t,e,w)}finally{c!==null&&d.types!==null&&(c.types=d.types),B.T=c}}else try{c=n(o,s),_f(t,e,c)}catch(w){Hr(t,e,w)}}function _f(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(s){Zf(t,e,s)},function(s){return Hr(t,e,s)}):Zf(t,e,n)}function Zf(t,e,n){e.status="fulfilled",e.value=n,Pf(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Kf(t,n)))}function Hr(t,e,n){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do e.status="rejected",e.reason=n,Pf(e),e=e.next;while(e!==s)}t.action=null}function Pf(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ff(t,e){return e}function If(t,e){if(yt){var n=Bt.formState;if(n!==null){t:{var s=rt;if(yt){if(Nt){e:{for(var o=Nt,c=qe;o.nodeType!==8;){if(!c){o=null;break e}if(o=Qe(o.nextSibling),o===null){o=null;break e}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){Nt=Qe(o.nextSibling),s=o.data==="F!";break t}}On(s)}s=!1}s&&(e=n[0])}}return n=he(),n.memoizedState=n.baseState=e,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ff,lastRenderedState:e},n.queue=s,n=vh.bind(null,rt,s),s.dispatch=n,s=Vr(!1),c=Xr.bind(null,rt,!1,s.queue),s=he(),o={state:e,dispatch:null,action:t,pending:null},s.queue=o,n=cb.bind(null,rt,o,c,n),o.dispatch=n,s.memoizedState=t,[e,n,!1]}function Wf(t){var e=Xt();return $f(e,Mt,t)}function $f(t,e,n){if(e=Or(t,e,Ff)[0],t=wl(gn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var s=es(e)}catch(d){throw d===ea?vl:d}else s=e;e=Xt();var o=e.queue,c=o.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,la(9,{destroy:void 0},ub.bind(null,o,n),null)),[s,c,t]}function ub(t,e){t.action=e}function th(t){var e=Xt(),n=Mt;if(n!==null)return $f(e,n,t);Xt(),e=e.memoizedState,n=Xt();var s=n.queue.dispatch;return n.memoizedState=t,[e,s,!1]}function la(t,e,n,s){return t={tag:t,create:n,deps:s,inst:e,next:null},e=rt.updateQueue,e===null&&(e=Cl(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t),t}function eh(){return Xt().memoizedState}function Ml(t,e,n,s){var o=he();rt.flags|=t,o.memoizedState=la(1|e,{destroy:void 0},n,s===void 0?null:s)}function Dl(t,e,n,s){var o=Xt();s=s===void 0?null:s;var c=o.memoizedState.inst;Mt!==null&&s!==null&&Rr(s,Mt.memoizedState.deps)?o.memoizedState=la(e,c,n,s):(rt.flags|=t,o.memoizedState=la(1|e,c,n,s))}function nh(t,e){Ml(8390656,8,t,e)}function jr(t,e){Dl(2048,8,t,e)}function db(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=Cl(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function ih(t){var e=Xt().memoizedState;return db({ref:e,nextImpl:t}),function(){if((xt&2)!==0)throw Error(r(440));return e.impl.apply(void 0,arguments)}}function ah(t,e){return Dl(4,2,t,e)}function sh(t,e){return Dl(4,4,t,e)}function lh(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function oh(t,e,n){n=n!=null?n.concat([t]):null,Dl(4,4,lh.bind(null,e,t),n)}function Yr(){}function rh(t,e){var n=Xt();e=e===void 0?null:e;var s=n.memoizedState;return e!==null&&Rr(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function ch(t,e){var n=Xt();e=e===void 0?null:e;var s=n.memoizedState;if(e!==null&&Rr(e,s[1]))return s[0];if(s=t(),xi){Bn(!0);try{t()}finally{Bn(!1)}}return n.memoizedState=[s,e],s}function qr(t,e,n){return n===void 0||(vn&1073741824)!==0&&(vt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=um(),rt.lanes|=t,Xn|=t,n)}function uh(t,e,n,s){return Me(n,e)?n:ia.current!==null?(t=qr(t,n,s),Me(t,e)||(Zt=!0),t):(vn&42)===0||(vn&1073741824)!==0&&(vt&261930)===0?(Zt=!0,t.memoizedState=n):(t=um(),rt.lanes|=t,Xn|=t,e)}function dh(t,e,n,s,o){var c=V.p;V.p=c!==0&&8>c?c:8;var d=B.T,g={};B.T=g,Xr(t,!1,e,n);try{var A=o(),w=B.S;if(w!==null&&w(g,A),A!==null&&typeof A=="object"&&typeof A.then=="function"){var R=lb(A,s);ns(t,e,R,ke(t))}else ns(t,e,s,ke(t))}catch(k){ns(t,e,{then:function(){},status:"rejected",reason:k},ke())}finally{V.p=c,d!==null&&g.types!==null&&(d.types=g.types),B.T=d}}function fb(){}function Gr(t,e,n,s){if(t.tag!==5)throw Error(r(476));var o=fh(t).queue;dh(t,o,e,_,n===null?fb:function(){return hh(t),n(s)})}function fh(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:_,baseState:_,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:_},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function hh(t){var e=fh(t);e.next===null&&(e=t.alternate.memoizedState),ns(t,e.next.queue,{},ke())}function Qr(){return se(bs)}function mh(){return Xt().memoizedState}function ph(){return Xt().memoizedState}function hb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ke();t=Hn(n);var s=jn(e,t,n);s!==null&&(xe(s,e,n),Ia(s,e,n)),e={cache:yr()},t.payload=e;return}e=e.return}}function mb(t,e,n){var s=ke();n={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Rl(t)?gh(e,n):(n=or(t,e,n,s),n!==null&&(xe(n,t,s),yh(n,e,s)))}function vh(t,e,n){var s=ke();ns(t,e,n,s)}function ns(t,e,n,s){var o={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rl(t))gh(e,o);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=e.lastRenderedReducer,c!==null))try{var d=e.lastRenderedState,g=c(d,n);if(o.hasEagerState=!0,o.eagerState=g,Me(g,d))return cl(t,e,o,0),Bt===null&&rl(),!1}catch{}finally{}if(n=or(t,e,o,s),n!==null)return xe(n,t,s),yh(n,e,s),!0}return!1}function Xr(t,e,n,s){if(s={lane:2,revertLane:xc(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Rl(t)){if(e)throw Error(r(479))}else e=or(t,n,s,2),e!==null&&xe(e,t,2)}function Rl(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function gh(t,e){aa=xl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function yh(t,e,n){if((n&4194048)!==0){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,xd(t,n)}}var is={readContext:se,use:El,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useLayoutEffect:jt,useInsertionEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useSyncExternalStore:jt,useId:jt,useHostTransitionStatus:jt,useFormState:jt,useActionState:jt,useOptimistic:jt,useMemoCache:jt,useCacheRefresh:jt};is.useEffectEvent=jt;var bh={readContext:se,use:El,useCallback:function(t,e){return he().memoizedState=[t,e===void 0?null:e],t},useContext:se,useEffect:nh,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Ml(4194308,4,lh.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ml(4194308,4,t,e)},useInsertionEffect:function(t,e){Ml(4,2,t,e)},useMemo:function(t,e){var n=he();e=e===void 0?null:e;var s=t();if(xi){Bn(!0);try{t()}finally{Bn(!1)}}return n.memoizedState=[s,e],s},useReducer:function(t,e,n){var s=he();if(n!==void 0){var o=n(e);if(xi){Bn(!0);try{n(e)}finally{Bn(!1)}}}else o=e;return s.memoizedState=s.baseState=o,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:o},s.queue=t,t=t.dispatch=mb.bind(null,rt,t),[s.memoizedState,t]},useRef:function(t){var e=he();return t={current:t},e.memoizedState=t},useState:function(t){t=Vr(t);var e=t.queue,n=vh.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Yr,useDeferredValue:function(t,e){var n=he();return qr(n,t,e)},useTransition:function(){var t=Vr(!1);return t=dh.bind(null,rt,t.queue,!0,!1),he().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var s=rt,o=he();if(yt){if(n===void 0)throw Error(r(407));n=n()}else{if(n=e(),Bt===null)throw Error(r(349));(vt&127)!==0||Yf(s,e,n)}o.memoizedState=n;var c={value:n,getSnapshot:e};return o.queue=c,nh(Gf.bind(null,s,c,t),[t]),s.flags|=2048,la(9,{destroy:void 0},qf.bind(null,s,c,n,e),null),n},useId:function(){var t=he(),e=Bt.identifierPrefix;if(yt){var n=an,s=nn;n=(s&~(1<<32-we(s)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Tl++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=ob++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Qr,useFormState:If,useActionState:If,useOptimistic:function(t){var e=he();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Xr.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:zr,useCacheRefresh:function(){return he().memoizedState=hb.bind(null,rt)},useEffectEvent:function(t){var e=he(),n={impl:t};return e.memoizedState=n,function(){if((xt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}},Jr={readContext:se,use:El,useCallback:rh,useContext:se,useEffect:jr,useImperativeHandle:oh,useInsertionEffect:ah,useLayoutEffect:sh,useMemo:ch,useReducer:wl,useRef:eh,useState:function(){return wl(gn)},useDebugValue:Yr,useDeferredValue:function(t,e){var n=Xt();return uh(n,Mt.memoizedState,t,e)},useTransition:function(){var t=wl(gn)[0],e=Xt().memoizedState;return[typeof t=="boolean"?t:es(t),e]},useSyncExternalStore:jf,useId:mh,useHostTransitionStatus:Qr,useFormState:Wf,useActionState:Wf,useOptimistic:function(t,e){var n=Xt();return Jf(n,Mt,t,e)},useMemoCache:zr,useCacheRefresh:ph};Jr.useEffectEvent=ih;var Ah={readContext:se,use:El,useCallback:rh,useContext:se,useEffect:jr,useImperativeHandle:oh,useInsertionEffect:ah,useLayoutEffect:sh,useMemo:ch,useReducer:Lr,useRef:eh,useState:function(){return Lr(gn)},useDebugValue:Yr,useDeferredValue:function(t,e){var n=Xt();return Mt===null?qr(n,t,e):uh(n,Mt.memoizedState,t,e)},useTransition:function(){var t=Lr(gn)[0],e=Xt().memoizedState;return[typeof t=="boolean"?t:es(t),e]},useSyncExternalStore:jf,useId:mh,useHostTransitionStatus:Qr,useFormState:th,useActionState:th,useOptimistic:function(t,e){var n=Xt();return Mt!==null?Jf(n,Mt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:zr,useCacheRefresh:ph};Ah.useEffectEvent=ih;function Kr(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:b({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var _r={enqueueSetState:function(t,e,n){t=t._reactInternals;var s=ke(),o=Hn(s);o.payload=e,n!=null&&(o.callback=n),e=jn(t,o,s),e!==null&&(xe(e,t,s),Ia(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=ke(),o=Hn(s);o.tag=1,o.payload=e,n!=null&&(o.callback=n),e=jn(t,o,s),e!==null&&(xe(e,t,s),Ia(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ke(),s=Hn(n);s.tag=2,e!=null&&(s.callback=e),e=jn(t,s,n),e!==null&&(xe(e,t,n),Ia(e,t,n))}};function Sh(t,e,n,s,o,c,d){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,d):e.prototype&&e.prototype.isPureReactComponent?!Qa(n,s)||!Qa(o,c):!0}function xh(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&_r.enqueueReplaceState(e,e.state,null)}function Ti(t,e){var n=e;if("ref"in e){n={};for(var s in e)s!=="ref"&&(n[s]=e[s])}if(t=t.defaultProps){n===e&&(n=b({},n));for(var o in t)n[o]===void 0&&(n[o]=t[o])}return n}function Th(t){ol(t)}function Ch(t){console.error(t)}function Eh(t){ol(t)}function Bl(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(s){setTimeout(function(){throw s})}}function wh(t,e,n){try{var s=t.onCaughtError;s(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function Zr(t,e,n){return n=Hn(n),n.tag=3,n.payload={element:null},n.callback=function(){Bl(t,e)},n}function Mh(t){return t=Hn(t),t.tag=3,t}function Dh(t,e,n,s){var o=n.type.getDerivedStateFromError;if(typeof o=="function"){var c=s.value;t.payload=function(){return o(c)},t.callback=function(){wh(e,n,s)}}var d=n.stateNode;d!==null&&typeof d.componentDidCatch=="function"&&(t.callback=function(){wh(e,n,s),typeof o!="function"&&(Jn===null?Jn=new Set([this]):Jn.add(this));var g=s.stack;this.componentDidCatch(s.value,{componentStack:g!==null?g:""})})}function pb(t,e,n,s,o){if(n.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(e=n.alternate,e!==null&&Wi(e,n,o,!0),n=Re.current,n!==null){switch(n.tag){case 31:case 13:return Ge===null?Gl():n.alternate===null&&Yt===0&&(Yt=3),n.flags&=-257,n.flags|=65536,n.lanes=o,s===gl?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([s]):e.add(s),bc(t,s,o)),!1;case 22:return n.flags|=65536,s===gl?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([s])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([s]):n.add(s)),bc(t,s,o)),!1}throw Error(r(435,n.tag))}return bc(t,s,o),Gl(),!1}if(yt)return e=Re.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=o,s!==hr&&(t=Error(r(422),{cause:s}),Ka(He(t,n)))):(s!==hr&&(e=Error(r(423),{cause:s}),Ka(He(e,n))),t=t.current.alternate,t.flags|=65536,o&=-o,t.lanes|=o,s=He(s,n),o=Zr(t.stateNode,s,o),Cr(t,o),Yt!==4&&(Yt=2)),!1;var c=Error(r(520),{cause:s});if(c=He(c,n),ds===null?ds=[c]:ds.push(c),Yt!==4&&(Yt=2),e===null)return!0;s=He(s,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=o&-o,n.lanes|=t,t=Zr(n.stateNode,s,t),Cr(n,t),!1;case 1:if(e=n.type,c=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Jn===null||!Jn.has(c))))return n.flags|=65536,o&=-o,n.lanes|=o,o=Mh(o),Dh(o,t,n,s),Cr(n,o),!1}n=n.return}while(n!==null);return!1}var Pr=Error(r(461)),Zt=!1;function le(t,e,n,s){e.child=t===null?Uf(e,null,n,s):Si(e,t.child,n,s)}function Rh(t,e,n,s,o){n=n.render;var c=e.ref;if("ref"in s){var d={};for(var g in s)g!=="ref"&&(d[g]=s[g])}else d=s;return gi(e),s=Br(t,e,n,d,c,o),g=Nr(),t!==null&&!Zt?(Ur(t,e,o),yn(t,e,o)):(yt&&g&&dr(e),e.flags|=1,le(t,e,s,o),e.child)}function Bh(t,e,n,s,o){if(t===null){var c=n.type;return typeof c=="function"&&!rr(c)&&c.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=c,Nh(t,e,c,s,o)):(t=dl(n.type,null,s,e,e.mode,o),t.ref=e.ref,t.return=e,e.child=t)}if(c=t.child,!ic(t,o)){var d=c.memoizedProps;if(n=n.compare,n=n!==null?n:Qa,n(d,s)&&t.ref===e.ref)return yn(t,e,o)}return e.flags|=1,t=fn(c,s),t.ref=e.ref,t.return=e,e.child=t}function Nh(t,e,n,s,o){if(t!==null){var c=t.memoizedProps;if(Qa(c,s)&&t.ref===e.ref)if(Zt=!1,e.pendingProps=s=c,ic(t,o))(t.flags&131072)!==0&&(Zt=!0);else return e.lanes=t.lanes,yn(t,e,o)}return Fr(t,e,n,s,o)}function Uh(t,e,n,s){var o=s.children,c=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((e.flags&128)!==0){if(c=c!==null?c.baseLanes|n:n,t!==null){for(s=e.child=t.child,o=0;s!==null;)o=o|s.lanes|s.childLanes,s=s.sibling;s=o&~c}else s=0,e.child=null;return kh(t,e,c,n,s)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&pl(e,c!==null?c.cachePool:null),c!==null?Of(e,c):wr(),Lf(e);else return s=e.lanes=536870912,kh(t,e,c!==null?c.baseLanes|n:n,n,s)}else c!==null?(pl(e,c.cachePool),Of(e,c),qn(),e.memoizedState=null):(t!==null&&pl(e,null),wr(),qn());return le(t,e,o,n),e.child}function as(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function kh(t,e,n,s,o){var c=Ar();return c=c===null?null:{parent:Kt._currentValue,pool:c},e.memoizedState={baseLanes:n,cachePool:c},t!==null&&pl(e,null),wr(),Lf(e),t!==null&&Wi(t,e,s,!0),e.childLanes=o,null}function Nl(t,e){return e=kl({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function zh(t,e,n){return Si(e,t.child,null,n),t=Nl(e,e.pendingProps),t.flags|=2,Be(e),e.memoizedState=null,t}function vb(t,e,n){var s=e.pendingProps,o=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(yt){if(s.mode==="hidden")return t=Nl(e,s),e.lanes=536870912,as(null,t);if(Dr(e),(t=Nt)?(t=Km(t,qe),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:kn!==null?{id:nn,overflow:an}:null,retryLane:536870912,hydrationErrors:null},n=gf(t),n.return=e,e.child=n,ae=e,Nt=null)):t=null,t===null)throw On(e);return e.lanes=536870912,null}return Nl(e,s)}var c=t.memoizedState;if(c!==null){var d=c.dehydrated;if(Dr(e),o)if(e.flags&256)e.flags&=-257,e=zh(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(r(558));else if(Zt||Wi(t,e,n,!1),o=(n&t.childLanes)!==0,Zt||o){if(s=Bt,s!==null&&(d=Td(s,n),d!==0&&d!==c.retryLane))throw c.retryLane=d,hi(t,d),xe(s,t,d),Pr;Gl(),e=zh(t,e,n)}else t=c.treeContext,Nt=Qe(d.nextSibling),ae=e,yt=!0,zn=null,qe=!1,t!==null&&Af(e,t),e=Nl(e,s),e.flags|=4096;return e}return t=fn(t.child,{mode:s.mode,children:s.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ul(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(r(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Fr(t,e,n,s,o){return gi(e),n=Br(t,e,n,s,void 0,o),s=Nr(),t!==null&&!Zt?(Ur(t,e,o),yn(t,e,o)):(yt&&s&&dr(e),e.flags|=1,le(t,e,n,o),e.child)}function Oh(t,e,n,s,o,c){return gi(e),e.updateQueue=null,n=Hf(e,s,n,o),Vf(t),s=Nr(),t!==null&&!Zt?(Ur(t,e,c),yn(t,e,c)):(yt&&s&&dr(e),e.flags|=1,le(t,e,n,c),e.child)}function Lh(t,e,n,s,o){if(gi(e),e.stateNode===null){var c=Zi,d=n.contextType;typeof d=="object"&&d!==null&&(c=se(d)),c=new n(s,c),e.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=_r,e.stateNode=c,c._reactInternals=e,c=e.stateNode,c.props=s,c.state=e.memoizedState,c.refs={},xr(e),d=n.contextType,c.context=typeof d=="object"&&d!==null?se(d):Zi,c.state=e.memoizedState,d=n.getDerivedStateFromProps,typeof d=="function"&&(Kr(e,n,d,s),c.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(d=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),d!==c.state&&_r.enqueueReplaceState(c,c.state,null),$a(e,s,c,o),Wa(),c.state=e.memoizedState),typeof c.componentDidMount=="function"&&(e.flags|=4194308),s=!0}else if(t===null){c=e.stateNode;var g=e.memoizedProps,A=Ti(n,g);c.props=A;var w=c.context,R=n.contextType;d=Zi,typeof R=="object"&&R!==null&&(d=se(R));var k=n.getDerivedStateFromProps;R=typeof k=="function"||typeof c.getSnapshotBeforeUpdate=="function",g=e.pendingProps!==g,R||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(g||w!==d)&&xh(e,c,s,d),Vn=!1;var M=e.memoizedState;c.state=M,$a(e,s,c,o),Wa(),w=e.memoizedState,g||M!==w||Vn?(typeof k=="function"&&(Kr(e,n,k,s),w=e.memoizedState),(A=Vn||Sh(e,n,A,s,M,w,d))?(R||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(e.flags|=4194308)):(typeof c.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=w),c.props=s,c.state=w,c.context=d,s=A):(typeof c.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{c=e.stateNode,Tr(t,e),d=e.memoizedProps,R=Ti(n,d),c.props=R,k=e.pendingProps,M=c.context,w=n.contextType,A=Zi,typeof w=="object"&&w!==null&&(A=se(w)),g=n.getDerivedStateFromProps,(w=typeof g=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(d!==k||M!==A)&&xh(e,c,s,A),Vn=!1,M=e.memoizedState,c.state=M,$a(e,s,c,o),Wa();var D=e.memoizedState;d!==k||M!==D||Vn||t!==null&&t.dependencies!==null&&hl(t.dependencies)?(typeof g=="function"&&(Kr(e,n,g,s),D=e.memoizedState),(R=Vn||Sh(e,n,R,s,M,D,A)||t!==null&&t.dependencies!==null&&hl(t.dependencies))?(w||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,D,A),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,D,A)),typeof c.componentDidUpdate=="function"&&(e.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof c.componentDidUpdate!="function"||d===t.memoizedProps&&M===t.memoizedState||(e.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||d===t.memoizedProps&&M===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=D),c.props=s,c.state=D,c.context=A,s=R):(typeof c.componentDidUpdate!="function"||d===t.memoizedProps&&M===t.memoizedState||(e.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||d===t.memoizedProps&&M===t.memoizedState||(e.flags|=1024),s=!1)}return c=s,Ul(t,e),s=(e.flags&128)!==0,c||s?(c=e.stateNode,n=s&&typeof n.getDerivedStateFromError!="function"?null:c.render(),e.flags|=1,t!==null&&s?(e.child=Si(e,t.child,null,o),e.child=Si(e,null,n,o)):le(t,e,n,o),e.memoizedState=c.state,t=e.child):t=yn(t,e,o),t}function Vh(t,e,n,s){return pi(),e.flags|=256,le(t,e,n,s),e.child}var Ir={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Wr(t){return{baseLanes:t,cachePool:wf()}}function $r(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Ue),t}function Hh(t,e,n){var s=e.pendingProps,o=!1,c=(e.flags&128)!==0,d;if((d=c)||(d=t!==null&&t.memoizedState===null?!1:(Qt.current&2)!==0),d&&(o=!0,e.flags&=-129),d=(e.flags&32)!==0,e.flags&=-33,t===null){if(yt){if(o?Yn(e):qn(),(t=Nt)?(t=Km(t,qe),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:kn!==null?{id:nn,overflow:an}:null,retryLane:536870912,hydrationErrors:null},n=gf(t),n.return=e,e.child=n,ae=e,Nt=null)):t=null,t===null)throw On(e);return Oc(t)?e.lanes=32:e.lanes=536870912,null}var g=s.children;return s=s.fallback,o?(qn(),o=e.mode,g=kl({mode:"hidden",children:g},o),s=mi(s,o,n,null),g.return=e,s.return=e,g.sibling=s,e.child=g,s=e.child,s.memoizedState=Wr(n),s.childLanes=$r(t,d,n),e.memoizedState=Ir,as(null,s)):(Yn(e),tc(e,g))}var A=t.memoizedState;if(A!==null&&(g=A.dehydrated,g!==null)){if(c)e.flags&256?(Yn(e),e.flags&=-257,e=ec(t,e,n)):e.memoizedState!==null?(qn(),e.child=t.child,e.flags|=128,e=null):(qn(),g=s.fallback,o=e.mode,s=kl({mode:"visible",children:s.children},o),g=mi(g,o,n,null),g.flags|=2,s.return=e,g.return=e,s.sibling=g,e.child=s,Si(e,t.child,null,n),s=e.child,s.memoizedState=Wr(n),s.childLanes=$r(t,d,n),e.memoizedState=Ir,e=as(null,s));else if(Yn(e),Oc(g)){if(d=g.nextSibling&&g.nextSibling.dataset,d)var w=d.dgst;d=w,s=Error(r(419)),s.stack="",s.digest=d,Ka({value:s,source:null,stack:null}),e=ec(t,e,n)}else if(Zt||Wi(t,e,n,!1),d=(n&t.childLanes)!==0,Zt||d){if(d=Bt,d!==null&&(s=Td(d,n),s!==0&&s!==A.retryLane))throw A.retryLane=s,hi(t,s),xe(d,t,s),Pr;zc(g)||Gl(),e=ec(t,e,n)}else zc(g)?(e.flags|=192,e.child=t.child,e=null):(t=A.treeContext,Nt=Qe(g.nextSibling),ae=e,yt=!0,zn=null,qe=!1,t!==null&&Af(e,t),e=tc(e,s.children),e.flags|=4096);return e}return o?(qn(),g=s.fallback,o=e.mode,A=t.child,w=A.sibling,s=fn(A,{mode:"hidden",children:s.children}),s.subtreeFlags=A.subtreeFlags&65011712,w!==null?g=fn(w,g):(g=mi(g,o,n,null),g.flags|=2),g.return=e,s.return=e,s.sibling=g,e.child=s,as(null,s),s=e.child,g=t.child.memoizedState,g===null?g=Wr(n):(o=g.cachePool,o!==null?(A=Kt._currentValue,o=o.parent!==A?{parent:A,pool:A}:o):o=wf(),g={baseLanes:g.baseLanes|n,cachePool:o}),s.memoizedState=g,s.childLanes=$r(t,d,n),e.memoizedState=Ir,as(t.child,s)):(Yn(e),n=t.child,t=n.sibling,n=fn(n,{mode:"visible",children:s.children}),n.return=e,n.sibling=null,t!==null&&(d=e.deletions,d===null?(e.deletions=[t],e.flags|=16):d.push(t)),e.child=n,e.memoizedState=null,n)}function tc(t,e){return e=kl({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function kl(t,e){return t=De(22,t,null,e),t.lanes=0,t}function ec(t,e,n){return Si(e,t.child,null,n),t=tc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function jh(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),vr(t.return,e,n)}function nc(t,e,n,s,o,c){var d=t.memoizedState;d===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:o,treeForkCount:c}:(d.isBackwards=e,d.rendering=null,d.renderingStartTime=0,d.last=s,d.tail=n,d.tailMode=o,d.treeForkCount=c)}function Yh(t,e,n){var s=e.pendingProps,o=s.revealOrder,c=s.tail;s=s.children;var d=Qt.current,g=(d&2)!==0;if(g?(d=d&1|2,e.flags|=128):d&=1,G(Qt,d),le(t,e,s,n),s=yt?Ja:0,!g&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&jh(t,n,e);else if(t.tag===19)jh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(o){case"forwards":for(n=e.child,o=null;n!==null;)t=n.alternate,t!==null&&Sl(t)===null&&(o=n),n=n.sibling;n=o,n===null?(o=e.child,e.child=null):(o=n.sibling,n.sibling=null),nc(e,!1,o,n,c,s);break;case"backwards":case"unstable_legacy-backwards":for(n=null,o=e.child,e.child=null;o!==null;){if(t=o.alternate,t!==null&&Sl(t)===null){e.child=o;break}t=o.sibling,o.sibling=n,n=o,o=t}nc(e,!0,n,null,c,s);break;case"together":nc(e,!1,null,null,void 0,s);break;default:e.memoizedState=null}return e.child}function yn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Xn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(Wi(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(r(153));if(e.child!==null){for(t=e.child,n=fn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=fn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function ic(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&hl(t)))}function gb(t,e,n){switch(e.tag){case 3:fe(e,e.stateNode.containerInfo),Ln(e,Kt,t.memoizedState.cache),pi();break;case 27:case 5:Ba(e);break;case 4:fe(e,e.stateNode.containerInfo);break;case 10:Ln(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Dr(e),null;break;case 13:var s=e.memoizedState;if(s!==null)return s.dehydrated!==null?(Yn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?Hh(t,e,n):(Yn(e),t=yn(t,e,n),t!==null?t.sibling:null);Yn(e);break;case 19:var o=(t.flags&128)!==0;if(s=(n&e.childLanes)!==0,s||(Wi(t,e,n,!1),s=(n&e.childLanes)!==0),o){if(s)return Yh(t,e,n);e.flags|=128}if(o=e.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),G(Qt,Qt.current),s)break;return null;case 22:return e.lanes=0,Uh(t,e,n,e.pendingProps);case 24:Ln(e,Kt,t.memoizedState.cache)}return yn(t,e,n)}function qh(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Zt=!0;else{if(!ic(t,n)&&(e.flags&128)===0)return Zt=!1,gb(t,e,n);Zt=(t.flags&131072)!==0}else Zt=!1,yt&&(e.flags&1048576)!==0&&bf(e,Ja,e.index);switch(e.lanes=0,e.tag){case 16:t:{var s=e.pendingProps;if(t=bi(e.elementType),e.type=t,typeof t=="function")rr(t)?(s=Ti(t,s),e.tag=1,e=Lh(null,e,t,s,n)):(e.tag=0,e=Fr(null,e,t,s,n));else{if(t!=null){var o=t.$$typeof;if(o===it){e.tag=11,e=Rh(null,e,t,s,n);break t}else if(o===$){e.tag=14,e=Bh(null,e,t,s,n);break t}}throw e=pe(t)||t,Error(r(306,e,""))}}return e;case 0:return Fr(t,e,e.type,e.pendingProps,n);case 1:return s=e.type,o=Ti(s,e.pendingProps),Lh(t,e,s,o,n);case 3:t:{if(fe(e,e.stateNode.containerInfo),t===null)throw Error(r(387));s=e.pendingProps;var c=e.memoizedState;o=c.element,Tr(t,e),$a(e,s,null,n);var d=e.memoizedState;if(s=d.cache,Ln(e,Kt,s),s!==c.cache&&gr(e,[Kt],n,!0),Wa(),s=d.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:d.cache},e.updateQueue.baseState=c,e.memoizedState=c,e.flags&256){e=Vh(t,e,s,n);break t}else if(s!==o){o=He(Error(r(424)),e),Ka(o),e=Vh(t,e,s,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Nt=Qe(t.firstChild),ae=e,yt=!0,zn=null,qe=!0,n=Uf(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(pi(),s===o){e=yn(t,e,n);break t}le(t,e,s,n)}e=e.child}return e;case 26:return Ul(t,e),t===null?(n=Wm(e.type,null,e.pendingProps,null))?e.memoizedState=n:yt||(n=e.type,t=e.pendingProps,s=Pl(ft.current).createElement(n),s[ie]=e,s[ve]=t,oe(s,n,t),te(s),e.stateNode=s):e.memoizedState=Wm(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Ba(e),t===null&&yt&&(s=e.stateNode=Pm(e.type,e.pendingProps,ft.current),ae=e,qe=!0,o=Nt,Pn(e.type)?(Lc=o,Nt=Qe(s.firstChild)):Nt=o),le(t,e,e.pendingProps.children,n),Ul(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&yt&&((o=s=Nt)&&(s=_b(s,e.type,e.pendingProps,qe),s!==null?(e.stateNode=s,ae=e,Nt=Qe(s.firstChild),qe=!1,o=!0):o=!1),o||On(e)),Ba(e),o=e.type,c=e.pendingProps,d=t!==null?t.memoizedProps:null,s=c.children,Nc(o,c)?s=null:d!==null&&Nc(o,d)&&(e.flags|=32),e.memoizedState!==null&&(o=Br(t,e,rb,null,null,n),bs._currentValue=o),Ul(t,e),le(t,e,s,n),e.child;case 6:return t===null&&yt&&((t=n=Nt)&&(n=Zb(n,e.pendingProps,qe),n!==null?(e.stateNode=n,ae=e,Nt=null,t=!0):t=!1),t||On(e)),null;case 13:return Hh(t,e,n);case 4:return fe(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=Si(e,null,s,n):le(t,e,s,n),e.child;case 11:return Rh(t,e,e.type,e.pendingProps,n);case 7:return le(t,e,e.pendingProps,n),e.child;case 8:return le(t,e,e.pendingProps.children,n),e.child;case 12:return le(t,e,e.pendingProps.children,n),e.child;case 10:return s=e.pendingProps,Ln(e,e.type,s.value),le(t,e,s.children,n),e.child;case 9:return o=e.type._context,s=e.pendingProps.children,gi(e),o=se(o),s=s(o),e.flags|=1,le(t,e,s,n),e.child;case 14:return Bh(t,e,e.type,e.pendingProps,n);case 15:return Nh(t,e,e.type,e.pendingProps,n);case 19:return Yh(t,e,n);case 31:return vb(t,e,n);case 22:return Uh(t,e,n,e.pendingProps);case 24:return gi(e),s=se(Kt),t===null?(o=Ar(),o===null&&(o=Bt,c=yr(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=n),o=c),e.memoizedState={parent:s,cache:o},xr(e),Ln(e,Kt,o)):((t.lanes&n)!==0&&(Tr(t,e),$a(e,null,null,n),Wa()),o=t.memoizedState,c=e.memoizedState,o.parent!==s?(o={parent:s,cache:s},e.memoizedState=o,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=o),Ln(e,Kt,s)):(s=c.cache,Ln(e,Kt,s),s!==o.cache&&gr(e,[Kt],n,!0))),le(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(r(156,e.tag))}function bn(t){t.flags|=4}function ac(t,e,n,s,o){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(o&335544128)===o)if(t.stateNode.complete)t.flags|=8192;else if(mm())t.flags|=8192;else throw Ai=gl,Sr}else t.flags&=-16777217}function Gh(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!ip(e))if(mm())t.flags|=8192;else throw Ai=gl,Sr}function zl(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Ad():536870912,t.lanes|=e,ua|=e)}function ss(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function Ut(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var o=t.child;o!==null;)n|=o.lanes|o.childLanes,s|=o.subtreeFlags&65011712,s|=o.flags&65011712,o.return=t,o=o.sibling;else for(o=t.child;o!==null;)n|=o.lanes|o.childLanes,s|=o.subtreeFlags,s|=o.flags,o.return=t,o=o.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function yb(t,e,n){var s=e.pendingProps;switch(fr(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ut(e),null;case 1:return Ut(e),null;case 3:return n=e.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),e.memoizedState.cache!==s&&(e.flags|=2048),pn(Kt),Gt(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Ii(e)?bn(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,mr())),Ut(e),null;case 26:var o=e.type,c=e.memoizedState;return t===null?(bn(e),c!==null?(Ut(e),Gh(e,c)):(Ut(e),ac(e,o,null,s,n))):c?c!==t.memoizedState?(bn(e),Ut(e),Gh(e,c)):(Ut(e),e.flags&=-16777217):(t=t.memoizedProps,t!==s&&bn(e),Ut(e),ac(e,o,t,s,n)),null;case 27:if(Js(e),n=ft.current,o=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&bn(e);else{if(!s){if(e.stateNode===null)throw Error(r(166));return Ut(e),null}t=F.current,Ii(e)?Sf(e):(t=Pm(o,s,n),e.stateNode=t,bn(e))}return Ut(e),null;case 5:if(Js(e),o=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&bn(e);else{if(!s){if(e.stateNode===null)throw Error(r(166));return Ut(e),null}if(c=F.current,Ii(e))Sf(e);else{var d=Pl(ft.current);switch(c){case 1:c=d.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=d.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=d.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=d.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=d.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?d.createElement("select",{is:s.is}):d.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?d.createElement(o,{is:s.is}):d.createElement(o)}}c[ie]=e,c[ve]=s;t:for(d=e.child;d!==null;){if(d.tag===5||d.tag===6)c.appendChild(d.stateNode);else if(d.tag!==4&&d.tag!==27&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break t;for(;d.sibling===null;){if(d.return===null||d.return===e)break t;d=d.return}d.sibling.return=d.return,d=d.sibling}e.stateNode=c;t:switch(oe(c,o,s),o){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&bn(e)}}return Ut(e),ac(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==s&&bn(e);else{if(typeof s!="string"&&e.stateNode===null)throw Error(r(166));if(t=ft.current,Ii(e)){if(t=e.stateNode,n=e.memoizedProps,s=null,o=ae,o!==null)switch(o.tag){case 27:case 5:s=o.memoizedProps}t[ie]=e,t=!!(t.nodeValue===n||s!==null&&s.suppressHydrationWarning===!0||Hm(t.nodeValue,n)),t||On(e,!0)}else t=Pl(t).createTextNode(s),t[ie]=e,e.stateNode=t}return Ut(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(s=Ii(e),n!==null){if(t===null){if(!s)throw Error(r(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[ie]=e}else pi(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ut(e),t=!1}else n=mr(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Be(e),e):(Be(e),null);if((e.flags&128)!==0)throw Error(r(558))}return Ut(e),null;case 13:if(s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(o=Ii(e),s!==null&&s.dehydrated!==null){if(t===null){if(!o)throw Error(r(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(r(317));o[ie]=e}else pi(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ut(e),o=!1}else o=mr(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=o),o=!0;if(!o)return e.flags&256?(Be(e),e):(Be(e),null)}return Be(e),(e.flags&128)!==0?(e.lanes=n,e):(n=s!==null,t=t!==null&&t.memoizedState!==null,n&&(s=e.child,o=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(o=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==o&&(s.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),zl(e,e.updateQueue),Ut(e),null);case 4:return Gt(),t===null&&wc(e.stateNode.containerInfo),Ut(e),null;case 10:return pn(e.type),Ut(e),null;case 19:if(z(Qt),s=e.memoizedState,s===null)return Ut(e),null;if(o=(e.flags&128)!==0,c=s.rendering,c===null)if(o)ss(s,!1);else{if(Yt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(c=Sl(t),c!==null){for(e.flags|=128,ss(s,!1),t=c.updateQueue,e.updateQueue=t,zl(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)vf(n,t),n=n.sibling;return G(Qt,Qt.current&1|2),yt&&hn(e,s.treeForkCount),e.child}t=t.sibling}s.tail!==null&&Ce()>jl&&(e.flags|=128,o=!0,ss(s,!1),e.lanes=4194304)}else{if(!o)if(t=Sl(c),t!==null){if(e.flags|=128,o=!0,t=t.updateQueue,e.updateQueue=t,zl(e,t),ss(s,!0),s.tail===null&&s.tailMode==="hidden"&&!c.alternate&&!yt)return Ut(e),null}else 2*Ce()-s.renderingStartTime>jl&&n!==536870912&&(e.flags|=128,o=!0,ss(s,!1),e.lanes=4194304);s.isBackwards?(c.sibling=e.child,e.child=c):(t=s.last,t!==null?t.sibling=c:e.child=c,s.last=c)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ce(),t.sibling=null,n=Qt.current,G(Qt,o?n&1|2:n&1),yt&&hn(e,s.treeForkCount),t):(Ut(e),null);case 22:case 23:return Be(e),Mr(),s=e.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(e.flags|=8192):s&&(e.flags|=8192),s?(n&536870912)!==0&&(e.flags&128)===0&&(Ut(e),e.subtreeFlags&6&&(e.flags|=8192)):Ut(e),n=e.updateQueue,n!==null&&zl(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==n&&(e.flags|=2048),t!==null&&z(yi),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),pn(Kt),Ut(e),null;case 25:return null;case 30:return null}throw Error(r(156,e.tag))}function bb(t,e){switch(fr(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return pn(Kt),Gt(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Js(e),null;case 31:if(e.memoizedState!==null){if(Be(e),e.alternate===null)throw Error(r(340));pi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Be(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(r(340));pi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return z(Qt),null;case 4:return Gt(),null;case 10:return pn(e.type),null;case 22:case 23:return Be(e),Mr(),t!==null&&z(yi),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return pn(Kt),null;case 25:return null;default:return null}}function Qh(t,e){switch(fr(e),e.tag){case 3:pn(Kt),Gt();break;case 26:case 27:case 5:Js(e);break;case 4:Gt();break;case 31:e.memoizedState!==null&&Be(e);break;case 13:Be(e);break;case 19:z(Qt);break;case 10:pn(e.type);break;case 22:case 23:Be(e),Mr(),t!==null&&z(yi);break;case 24:pn(Kt)}}function ls(t,e){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var o=s.next;n=o;do{if((n.tag&t)===t){s=void 0;var c=n.create,d=n.inst;s=c(),d.destroy=s}n=n.next}while(n!==o)}}catch(g){wt(e,e.return,g)}}function Gn(t,e,n){try{var s=e.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var c=o.next;s=c;do{if((s.tag&t)===t){var d=s.inst,g=d.destroy;if(g!==void 0){d.destroy=void 0,o=e;var A=n,w=g;try{w()}catch(R){wt(o,A,R)}}}s=s.next}while(s!==c)}}catch(R){wt(e,e.return,R)}}function Xh(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{zf(e,n)}catch(s){wt(t,t.return,s)}}}function Jh(t,e,n){n.props=Ti(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(s){wt(t,e,s)}}function os(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof n=="function"?t.refCleanup=n(s):n.current=s}}catch(o){wt(t,e,o)}}function sn(t,e){var n=t.ref,s=t.refCleanup;if(n!==null)if(typeof s=="function")try{s()}catch(o){wt(t,e,o)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(o){wt(t,e,o)}else n.current=null}function Kh(t){var e=t.type,n=t.memoizedProps,s=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&s.focus();break t;case"img":n.src?s.src=n.src:n.srcSet&&(s.srcset=n.srcSet)}}catch(o){wt(t,t.return,o)}}function sc(t,e,n){try{var s=t.stateNode;qb(s,t.type,n,e),s[ve]=e}catch(o){wt(t,t.return,o)}}function _h(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Pn(t.type)||t.tag===4}function lc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||_h(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Pn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function oc(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=un));else if(s!==4&&(s===27&&Pn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(oc(t,e,n),t=t.sibling;t!==null;)oc(t,e,n),t=t.sibling}function Ol(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(s===27&&Pn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ol(t,e,n),t=t.sibling;t!==null;)Ol(t,e,n),t=t.sibling}function Zh(t){var e=t.stateNode,n=t.memoizedProps;try{for(var s=t.type,o=e.attributes;o.length;)e.removeAttributeNode(o[0]);oe(e,s,n),e[ie]=t,e[ve]=n}catch(c){wt(t,t.return,c)}}var An=!1,Pt=!1,rc=!1,Ph=typeof WeakSet=="function"?WeakSet:Set,ee=null;function Ab(t,e){if(t=t.containerInfo,Rc=no,t=of(t),er(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var o=s.anchorOffset,c=s.focusNode;s=s.focusOffset;try{n.nodeType,c.nodeType}catch{n=null;break t}var d=0,g=-1,A=-1,w=0,R=0,k=t,M=null;e:for(;;){for(var D;k!==n||o!==0&&k.nodeType!==3||(g=d+o),k!==c||s!==0&&k.nodeType!==3||(A=d+s),k.nodeType===3&&(d+=k.nodeValue.length),(D=k.firstChild)!==null;)M=k,k=D;for(;;){if(k===t)break e;if(M===n&&++w===o&&(g=d),M===c&&++R===s&&(A=d),(D=k.nextSibling)!==null)break;k=M,M=k.parentNode}k=D}n=g===-1||A===-1?null:{start:g,end:A}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bc={focusedElem:t,selectionRange:n},no=!1,ee=e;ee!==null;)if(e=ee,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ee=t;else for(;ee!==null;){switch(e=ee,c=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)o=t[n],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&c!==null){t=void 0,n=e,o=c.memoizedProps,c=c.memoizedState,s=n.stateNode;try{var Z=Ti(n.type,o);t=s.getSnapshotBeforeUpdate(Z,c),s.__reactInternalSnapshotBeforeUpdate=t}catch(nt){wt(n,n.return,nt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)kc(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":kc(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=e.sibling,t!==null){t.return=e.return,ee=t;break}ee=e.return}}function Fh(t,e,n){var s=n.flags;switch(n.tag){case 0:case 11:case 15:xn(t,n),s&4&&ls(5,n);break;case 1:if(xn(t,n),s&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(d){wt(n,n.return,d)}else{var o=Ti(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(o,e,t.__reactInternalSnapshotBeforeUpdate)}catch(d){wt(n,n.return,d)}}s&64&&Xh(n),s&512&&os(n,n.return);break;case 3:if(xn(t,n),s&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{zf(t,e)}catch(d){wt(n,n.return,d)}}break;case 27:e===null&&s&4&&Zh(n);case 26:case 5:xn(t,n),e===null&&s&4&&Kh(n),s&512&&os(n,n.return);break;case 12:xn(t,n);break;case 31:xn(t,n),s&4&&$h(t,n);break;case 13:xn(t,n),s&4&&tm(t,n),s&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Rb.bind(null,n),Pb(t,n))));break;case 22:if(s=n.memoizedState!==null||An,!s){e=e!==null&&e.memoizedState!==null||Pt,o=An;var c=Pt;An=s,(Pt=e)&&!c?Tn(t,n,(n.subtreeFlags&8772)!==0):xn(t,n),An=o,Pt=c}break;case 30:break;default:xn(t,n)}}function Ih(t){var e=t.alternate;e!==null&&(t.alternate=null,Ih(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Ho(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var zt=null,ye=!1;function Sn(t,e,n){for(n=n.child;n!==null;)Wh(t,e,n),n=n.sibling}function Wh(t,e,n){if(Ee&&typeof Ee.onCommitFiberUnmount=="function")try{Ee.onCommitFiberUnmount(Na,n)}catch{}switch(n.tag){case 26:Pt||sn(n,e),Sn(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Pt||sn(n,e);var s=zt,o=ye;Pn(n.type)&&(zt=n.stateNode,ye=!1),Sn(t,e,n),vs(n.stateNode),zt=s,ye=o;break;case 5:Pt||sn(n,e);case 6:if(s=zt,o=ye,zt=null,Sn(t,e,n),zt=s,ye=o,zt!==null)if(ye)try{(zt.nodeType===9?zt.body:zt.nodeName==="HTML"?zt.ownerDocument.body:zt).removeChild(n.stateNode)}catch(c){wt(n,e,c)}else try{zt.removeChild(n.stateNode)}catch(c){wt(n,e,c)}break;case 18:zt!==null&&(ye?(t=zt,Xm(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ya(t)):Xm(zt,n.stateNode));break;case 4:s=zt,o=ye,zt=n.stateNode.containerInfo,ye=!0,Sn(t,e,n),zt=s,ye=o;break;case 0:case 11:case 14:case 15:Gn(2,n,e),Pt||Gn(4,n,e),Sn(t,e,n);break;case 1:Pt||(sn(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"&&Jh(n,e,s)),Sn(t,e,n);break;case 21:Sn(t,e,n);break;case 22:Pt=(s=Pt)||n.memoizedState!==null,Sn(t,e,n),Pt=s;break;default:Sn(t,e,n)}}function $h(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ya(t)}catch(n){wt(e,e.return,n)}}}function tm(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ya(t)}catch(n){wt(e,e.return,n)}}function Sb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Ph),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Ph),e;default:throw Error(r(435,t.tag))}}function Ll(t,e){var n=Sb(t);e.forEach(function(s){if(!n.has(s)){n.add(s);var o=Bb.bind(null,t,s);s.then(o,o)}})}function be(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var o=n[s],c=t,d=e,g=d;t:for(;g!==null;){switch(g.tag){case 27:if(Pn(g.type)){zt=g.stateNode,ye=!1;break t}break;case 5:zt=g.stateNode,ye=!1;break t;case 3:case 4:zt=g.stateNode.containerInfo,ye=!0;break t}g=g.return}if(zt===null)throw Error(r(160));Wh(c,d,o),zt=null,ye=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)em(e,t),e=e.sibling}var We=null;function em(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:be(e,t),Ae(t),s&4&&(Gn(3,t,t.return),ls(3,t),Gn(5,t,t.return));break;case 1:be(e,t),Ae(t),s&512&&(Pt||n===null||sn(n,n.return)),s&64&&An&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?s:n.concat(s))));break;case 26:var o=We;if(be(e,t),Ae(t),s&512&&(Pt||n===null||sn(n,n.return)),s&4){var c=n!==null?n.memoizedState:null;if(s=t.memoizedState,n===null)if(s===null)if(t.stateNode===null){t:{s=t.type,n=t.memoizedProps,o=o.ownerDocument||o;e:switch(s){case"title":c=o.getElementsByTagName("title")[0],(!c||c[za]||c[ie]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(s),o.head.insertBefore(c,o.querySelector("head > title"))),oe(c,s,n),c[ie]=t,te(c),s=c;break t;case"link":var d=ep("link","href",o).get(s+(n.href||""));if(d){for(var g=0;g<d.length;g++)if(c=d[g],c.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&c.getAttribute("rel")===(n.rel==null?null:n.rel)&&c.getAttribute("title")===(n.title==null?null:n.title)&&c.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){d.splice(g,1);break e}}c=o.createElement(s),oe(c,s,n),o.head.appendChild(c);break;case"meta":if(d=ep("meta","content",o).get(s+(n.content||""))){for(g=0;g<d.length;g++)if(c=d[g],c.getAttribute("content")===(n.content==null?null:""+n.content)&&c.getAttribute("name")===(n.name==null?null:n.name)&&c.getAttribute("property")===(n.property==null?null:n.property)&&c.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&c.getAttribute("charset")===(n.charSet==null?null:n.charSet)){d.splice(g,1);break e}}c=o.createElement(s),oe(c,s,n),o.head.appendChild(c);break;default:throw Error(r(468,s))}c[ie]=t,te(c),s=c}t.stateNode=s}else np(o,t.type,t.stateNode);else t.stateNode=tp(o,s,t.memoizedProps);else c!==s?(c===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):c.count--,s===null?np(o,t.type,t.stateNode):tp(o,s,t.memoizedProps)):s===null&&t.stateNode!==null&&sc(t,t.memoizedProps,n.memoizedProps)}break;case 27:be(e,t),Ae(t),s&512&&(Pt||n===null||sn(n,n.return)),n!==null&&s&4&&sc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(be(e,t),Ae(t),s&512&&(Pt||n===null||sn(n,n.return)),t.flags&32){o=t.stateNode;try{qi(o,"")}catch(Z){wt(t,t.return,Z)}}s&4&&t.stateNode!=null&&(o=t.memoizedProps,sc(t,o,n!==null?n.memoizedProps:o)),s&1024&&(rc=!0);break;case 6:if(be(e,t),Ae(t),s&4){if(t.stateNode===null)throw Error(r(162));s=t.memoizedProps,n=t.stateNode;try{n.nodeValue=s}catch(Z){wt(t,t.return,Z)}}break;case 3:if(Wl=null,o=We,We=Fl(e.containerInfo),be(e,t),We=o,Ae(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{ya(e.containerInfo)}catch(Z){wt(t,t.return,Z)}rc&&(rc=!1,nm(t));break;case 4:s=We,We=Fl(t.stateNode.containerInfo),be(e,t),Ae(t),We=s;break;case 12:be(e,t),Ae(t);break;case 31:be(e,t),Ae(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Ll(t,s)));break;case 13:be(e,t),Ae(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Hl=Ce()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Ll(t,s)));break;case 22:o=t.memoizedState!==null;var A=n!==null&&n.memoizedState!==null,w=An,R=Pt;if(An=w||o,Pt=R||A,be(e,t),Pt=R,An=w,Ae(t),s&8192)t:for(e=t.stateNode,e._visibility=o?e._visibility&-2:e._visibility|1,o&&(n===null||A||An||Pt||Ci(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){A=n=e;try{if(c=A.stateNode,o)d=c.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none";else{g=A.stateNode;var k=A.memoizedProps.style,M=k!=null&&k.hasOwnProperty("display")?k.display:null;g.style.display=M==null||typeof M=="boolean"?"":(""+M).trim()}}catch(Z){wt(A,A.return,Z)}}}else if(e.tag===6){if(n===null){A=e;try{A.stateNode.nodeValue=o?"":A.memoizedProps}catch(Z){wt(A,A.return,Z)}}}else if(e.tag===18){if(n===null){A=e;try{var D=A.stateNode;o?Jm(D,!0):Jm(A.stateNode,!1)}catch(Z){wt(A,A.return,Z)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}s&4&&(s=t.updateQueue,s!==null&&(n=s.retryQueue,n!==null&&(s.retryQueue=null,Ll(t,n))));break;case 19:be(e,t),Ae(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Ll(t,s)));break;case 30:break;case 21:break;default:be(e,t),Ae(t)}}function Ae(t){var e=t.flags;if(e&2){try{for(var n,s=t.return;s!==null;){if(_h(s)){n=s;break}s=s.return}if(n==null)throw Error(r(160));switch(n.tag){case 27:var o=n.stateNode,c=lc(t);Ol(t,c,o);break;case 5:var d=n.stateNode;n.flags&32&&(qi(d,""),n.flags&=-33);var g=lc(t);Ol(t,g,d);break;case 3:case 4:var A=n.stateNode.containerInfo,w=lc(t);oc(t,w,A);break;default:throw Error(r(161))}}catch(R){wt(t,t.return,R)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function nm(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;nm(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function xn(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Fh(t,e.alternate,e),e=e.sibling}function Ci(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Gn(4,e,e.return),Ci(e);break;case 1:sn(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Jh(e,e.return,n),Ci(e);break;case 27:vs(e.stateNode);case 26:case 5:sn(e,e.return),Ci(e);break;case 22:e.memoizedState===null&&Ci(e);break;case 30:Ci(e);break;default:Ci(e)}t=t.sibling}}function Tn(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var s=e.alternate,o=t,c=e,d=c.flags;switch(c.tag){case 0:case 11:case 15:Tn(o,c,n),ls(4,c);break;case 1:if(Tn(o,c,n),s=c,o=s.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(w){wt(s,s.return,w)}if(s=c,o=s.updateQueue,o!==null){var g=s.stateNode;try{var A=o.shared.hiddenCallbacks;if(A!==null)for(o.shared.hiddenCallbacks=null,o=0;o<A.length;o++)kf(A[o],g)}catch(w){wt(s,s.return,w)}}n&&d&64&&Xh(c),os(c,c.return);break;case 27:Zh(c);case 26:case 5:Tn(o,c,n),n&&s===null&&d&4&&Kh(c),os(c,c.return);break;case 12:Tn(o,c,n);break;case 31:Tn(o,c,n),n&&d&4&&$h(o,c);break;case 13:Tn(o,c,n),n&&d&4&&tm(o,c);break;case 22:c.memoizedState===null&&Tn(o,c,n),os(c,c.return);break;case 30:break;default:Tn(o,c,n)}e=e.sibling}}function cc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&_a(n))}function uc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&_a(t))}function $e(t,e,n,s){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)im(t,e,n,s),e=e.sibling}function im(t,e,n,s){var o=e.flags;switch(e.tag){case 0:case 11:case 15:$e(t,e,n,s),o&2048&&ls(9,e);break;case 1:$e(t,e,n,s);break;case 3:$e(t,e,n,s),o&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&_a(t)));break;case 12:if(o&2048){$e(t,e,n,s),t=e.stateNode;try{var c=e.memoizedProps,d=c.id,g=c.onPostCommit;typeof g=="function"&&g(d,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(A){wt(e,e.return,A)}}else $e(t,e,n,s);break;case 31:$e(t,e,n,s);break;case 13:$e(t,e,n,s);break;case 23:break;case 22:c=e.stateNode,d=e.alternate,e.memoizedState!==null?c._visibility&2?$e(t,e,n,s):rs(t,e):c._visibility&2?$e(t,e,n,s):(c._visibility|=2,oa(t,e,n,s,(e.subtreeFlags&10256)!==0||!1)),o&2048&&cc(d,e);break;case 24:$e(t,e,n,s),o&2048&&uc(e.alternate,e);break;default:$e(t,e,n,s)}}function oa(t,e,n,s,o){for(o=o&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var c=t,d=e,g=n,A=s,w=d.flags;switch(d.tag){case 0:case 11:case 15:oa(c,d,g,A,o),ls(8,d);break;case 23:break;case 22:var R=d.stateNode;d.memoizedState!==null?R._visibility&2?oa(c,d,g,A,o):rs(c,d):(R._visibility|=2,oa(c,d,g,A,o)),o&&w&2048&&cc(d.alternate,d);break;case 24:oa(c,d,g,A,o),o&&w&2048&&uc(d.alternate,d);break;default:oa(c,d,g,A,o)}e=e.sibling}}function rs(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,s=e,o=s.flags;switch(s.tag){case 22:rs(n,s),o&2048&&cc(s.alternate,s);break;case 24:rs(n,s),o&2048&&uc(s.alternate,s);break;default:rs(n,s)}e=e.sibling}}var cs=8192;function ra(t,e,n){if(t.subtreeFlags&cs)for(t=t.child;t!==null;)am(t,e,n),t=t.sibling}function am(t,e,n){switch(t.tag){case 26:ra(t,e,n),t.flags&cs&&t.memoizedState!==null&&o1(n,We,t.memoizedState,t.memoizedProps);break;case 5:ra(t,e,n);break;case 3:case 4:var s=We;We=Fl(t.stateNode.containerInfo),ra(t,e,n),We=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=cs,cs=16777216,ra(t,e,n),cs=s):ra(t,e,n));break;default:ra(t,e,n)}}function sm(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function us(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];ee=s,om(s,t)}sm(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)lm(t),t=t.sibling}function lm(t){switch(t.tag){case 0:case 11:case 15:us(t),t.flags&2048&&Gn(9,t,t.return);break;case 3:us(t);break;case 12:us(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Vl(t)):us(t);break;default:us(t)}}function Vl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];ee=s,om(s,t)}sm(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Gn(8,e,e.return),Vl(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Vl(e));break;default:Vl(e)}t=t.sibling}}function om(t,e){for(;ee!==null;){var n=ee;switch(n.tag){case 0:case 11:case 15:Gn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var s=n.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:_a(n.memoizedState.cache)}if(s=n.child,s!==null)s.return=n,ee=s;else t:for(n=t;ee!==null;){s=ee;var o=s.sibling,c=s.return;if(Ih(s),s===n){ee=null;break t}if(o!==null){o.return=c,ee=o;break t}ee=c}}}var xb={getCacheForType:function(t){var e=se(Kt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return se(Kt).controller.signal}},Tb=typeof WeakMap=="function"?WeakMap:Map,xt=0,Bt=null,ht=null,vt=0,Et=0,Ne=null,Qn=!1,ca=!1,dc=!1,Cn=0,Yt=0,Xn=0,Ei=0,fc=0,Ue=0,ua=0,ds=null,Se=null,hc=!1,Hl=0,rm=0,jl=1/0,Yl=null,Jn=null,$t=0,Kn=null,da=null,En=0,mc=0,pc=null,cm=null,fs=0,vc=null;function ke(){return(xt&2)!==0&&vt!==0?vt&-vt:B.T!==null?xc():Cd()}function um(){if(Ue===0)if((vt&536870912)===0||yt){var t=Zs;Zs<<=1,(Zs&3932160)===0&&(Zs=262144),Ue=t}else Ue=536870912;return t=Re.current,t!==null&&(t.flags|=32),Ue}function xe(t,e,n){(t===Bt&&(Et===2||Et===9)||t.cancelPendingCommit!==null)&&(fa(t,0),_n(t,vt,Ue,!1)),ka(t,n),((xt&2)===0||t!==Bt)&&(t===Bt&&((xt&2)===0&&(Ei|=n),Yt===4&&_n(t,vt,Ue,!1)),ln(t))}function dm(t,e,n){if((xt&6)!==0)throw Error(r(327));var s=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Ua(t,e),o=s?wb(t,e):yc(t,e,!0),c=s;do{if(o===0){ca&&!s&&_n(t,e,0,!1);break}else{if(n=t.current.alternate,c&&!Cb(n)){o=yc(t,e,!1),c=!1;continue}if(o===2){if(c=e,t.errorRecoveryDisabledLanes&c)var d=0;else d=t.pendingLanes&-536870913,d=d!==0?d:d&536870912?536870912:0;if(d!==0){e=d;t:{var g=t;o=ds;var A=g.current.memoizedState.isDehydrated;if(A&&(fa(g,d).flags|=256),d=yc(g,d,!1),d!==2){if(dc&&!A){g.errorRecoveryDisabledLanes|=c,Ei|=c,o=4;break t}c=Se,Se=o,c!==null&&(Se===null?Se=c:Se.push.apply(Se,c))}o=d}if(c=!1,o!==2)continue}}if(o===1){fa(t,0),_n(t,e,0,!0);break}t:{switch(s=t,c=o,c){case 0:case 1:throw Error(r(345));case 4:if((e&4194048)!==e)break;case 6:_n(s,e,Ue,!Qn);break t;case 2:Se=null;break;case 3:case 5:break;default:throw Error(r(329))}if((e&62914560)===e&&(o=Hl+300-Ce(),10<o)){if(_n(s,e,Ue,!Qn),Fs(s,0,!0)!==0)break t;En=e,s.timeoutHandle=Gm(fm.bind(null,s,n,Se,Yl,hc,e,Ue,Ei,ua,Qn,c,"Throttled",-0,0),o);break t}fm(s,n,Se,Yl,hc,e,Ue,Ei,ua,Qn,c,null,-0,0)}}break}while(!0);ln(t)}function fm(t,e,n,s,o,c,d,g,A,w,R,k,M,D){if(t.timeoutHandle=-1,k=e.subtreeFlags,k&8192||(k&16785408)===16785408){k={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:un},am(e,c,k);var Z=(c&62914560)===c?Hl-Ce():(c&4194048)===c?rm-Ce():0;if(Z=r1(k,Z),Z!==null){En=c,t.cancelPendingCommit=Z(Am.bind(null,t,e,c,n,s,o,d,g,A,R,k,null,M,D)),_n(t,c,d,!w);return}}Am(t,e,c,n,s,o,d,g,A)}function Cb(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var s=0;s<n.length;s++){var o=n[s],c=o.getSnapshot;o=o.value;try{if(!Me(c(),o))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function _n(t,e,n,s){e&=~fc,e&=~Ei,t.suspendedLanes|=e,t.pingedLanes&=~e,s&&(t.warmLanes|=e),s=t.expirationTimes;for(var o=e;0<o;){var c=31-we(o),d=1<<c;s[c]=-1,o&=~d}n!==0&&Sd(t,n,e)}function ql(){return(xt&6)===0?(hs(0),!1):!0}function gc(){if(ht!==null){if(Et===0)var t=ht.return;else t=ht,mn=vi=null,kr(t),na=null,Pa=0,t=ht;for(;t!==null;)Qh(t.alternate,t),t=t.return;ht=null}}function fa(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,Xb(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),En=0,gc(),Bt=t,ht=n=fn(t.current,null),vt=e,Et=0,Ne=null,Qn=!1,ca=Ua(t,e),dc=!1,ua=Ue=fc=Ei=Xn=Yt=0,Se=ds=null,hc=!1,(e&8)!==0&&(e|=e&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=e;0<s;){var o=31-we(s),c=1<<o;e|=t[o],s&=~c}return Cn=e,rl(),n}function hm(t,e){rt=null,B.H=is,e===ea||e===vl?(e=Rf(),Et=3):e===Sr?(e=Rf(),Et=4):Et=e===Pr?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ne=e,ht===null&&(Yt=1,Bl(t,He(e,t.current)))}function mm(){var t=Re.current;return t===null?!0:(vt&4194048)===vt?Ge===null:(vt&62914560)===vt||(vt&536870912)!==0?t===Ge:!1}function pm(){var t=B.H;return B.H=is,t===null?is:t}function vm(){var t=B.A;return B.A=xb,t}function Gl(){Yt=4,Qn||(vt&4194048)!==vt&&Re.current!==null||(ca=!0),(Xn&134217727)===0&&(Ei&134217727)===0||Bt===null||_n(Bt,vt,Ue,!1)}function yc(t,e,n){var s=xt;xt|=2;var o=pm(),c=vm();(Bt!==t||vt!==e)&&(Yl=null,fa(t,e)),e=!1;var d=Yt;t:do try{if(Et!==0&&ht!==null){var g=ht,A=Ne;switch(Et){case 8:gc(),d=6;break t;case 3:case 2:case 9:case 6:Re.current===null&&(e=!0);var w=Et;if(Et=0,Ne=null,ha(t,g,A,w),n&&ca){d=0;break t}break;default:w=Et,Et=0,Ne=null,ha(t,g,A,w)}}Eb(),d=Yt;break}catch(R){hm(t,R)}while(!0);return e&&t.shellSuspendCounter++,mn=vi=null,xt=s,B.H=o,B.A=c,ht===null&&(Bt=null,vt=0,rl()),d}function Eb(){for(;ht!==null;)gm(ht)}function wb(t,e){var n=xt;xt|=2;var s=pm(),o=vm();Bt!==t||vt!==e?(Yl=null,jl=Ce()+500,fa(t,e)):ca=Ua(t,e);t:do try{if(Et!==0&&ht!==null){e=ht;var c=Ne;e:switch(Et){case 1:Et=0,Ne=null,ha(t,e,c,1);break;case 2:case 9:if(Mf(c)){Et=0,Ne=null,ym(e);break}e=function(){Et!==2&&Et!==9||Bt!==t||(Et=7),ln(t)},c.then(e,e);break t;case 3:Et=7;break t;case 4:Et=5;break t;case 7:Mf(c)?(Et=0,Ne=null,ym(e)):(Et=0,Ne=null,ha(t,e,c,7));break;case 5:var d=null;switch(ht.tag){case 26:d=ht.memoizedState;case 5:case 27:var g=ht;if(d?ip(d):g.stateNode.complete){Et=0,Ne=null;var A=g.sibling;if(A!==null)ht=A;else{var w=g.return;w!==null?(ht=w,Ql(w)):ht=null}break e}}Et=0,Ne=null,ha(t,e,c,5);break;case 6:Et=0,Ne=null,ha(t,e,c,6);break;case 8:gc(),Yt=6;break t;default:throw Error(r(462))}}Mb();break}catch(R){hm(t,R)}while(!0);return mn=vi=null,B.H=s,B.A=o,xt=n,ht!==null?0:(Bt=null,vt=0,rl(),Yt)}function Mb(){for(;ht!==null&&!Fy();)gm(ht)}function gm(t){var e=qh(t.alternate,t,Cn);t.memoizedProps=t.pendingProps,e===null?Ql(t):ht=e}function ym(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Oh(n,e,e.pendingProps,e.type,void 0,vt);break;case 11:e=Oh(n,e,e.pendingProps,e.type.render,e.ref,vt);break;case 5:kr(e);default:Qh(n,e),e=ht=vf(e,Cn),e=qh(n,e,Cn)}t.memoizedProps=t.pendingProps,e===null?Ql(t):ht=e}function ha(t,e,n,s){mn=vi=null,kr(e),na=null,Pa=0;var o=e.return;try{if(pb(t,o,e,n,vt)){Yt=1,Bl(t,He(n,t.current)),ht=null;return}}catch(c){if(o!==null)throw ht=o,c;Yt=1,Bl(t,He(n,t.current)),ht=null;return}e.flags&32768?(yt||s===1?t=!0:ca||(vt&536870912)!==0?t=!1:(Qn=t=!0,(s===2||s===9||s===3||s===6)&&(s=Re.current,s!==null&&s.tag===13&&(s.flags|=16384))),bm(e,t)):Ql(e)}function Ql(t){var e=t;do{if((e.flags&32768)!==0){bm(e,Qn);return}t=e.return;var n=yb(e.alternate,e,Cn);if(n!==null){ht=n;return}if(e=e.sibling,e!==null){ht=e;return}ht=e=t}while(e!==null);Yt===0&&(Yt=5)}function bm(t,e){do{var n=bb(t.alternate,t);if(n!==null){n.flags&=32767,ht=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){ht=t;return}ht=t=n}while(t!==null);Yt=6,ht=null}function Am(t,e,n,s,o,c,d,g,A){t.cancelPendingCommit=null;do Xl();while($t!==0);if((xt&6)!==0)throw Error(r(327));if(e!==null){if(e===t.current)throw Error(r(177));if(c=e.lanes|e.childLanes,c|=lr,l0(t,n,c,d,g,A),t===Bt&&(ht=Bt=null,vt=0),da=e,Kn=t,En=n,mc=c,pc=o,cm=s,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Nb(Ks,function(){return Em(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||s){s=B.T,B.T=null,o=V.p,V.p=2,d=xt,xt|=4;try{Ab(t,e,n)}finally{xt=d,V.p=o,B.T=s}}$t=1,Sm(),xm(),Tm()}}function Sm(){if($t===1){$t=0;var t=Kn,e=da,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=B.T,B.T=null;var s=V.p;V.p=2;var o=xt;xt|=4;try{em(e,t);var c=Bc,d=of(t.containerInfo),g=c.focusedElem,A=c.selectionRange;if(d!==g&&g&&g.ownerDocument&&lf(g.ownerDocument.documentElement,g)){if(A!==null&&er(g)){var w=A.start,R=A.end;if(R===void 0&&(R=w),"selectionStart"in g)g.selectionStart=w,g.selectionEnd=Math.min(R,g.value.length);else{var k=g.ownerDocument||document,M=k&&k.defaultView||window;if(M.getSelection){var D=M.getSelection(),Z=g.textContent.length,nt=Math.min(A.start,Z),Rt=A.end===void 0?nt:Math.min(A.end,Z);!D.extend&&nt>Rt&&(d=Rt,Rt=nt,nt=d);var C=sf(g,nt),S=sf(g,Rt);if(C&&S&&(D.rangeCount!==1||D.anchorNode!==C.node||D.anchorOffset!==C.offset||D.focusNode!==S.node||D.focusOffset!==S.offset)){var E=k.createRange();E.setStart(C.node,C.offset),D.removeAllRanges(),nt>Rt?(D.addRange(E),D.extend(S.node,S.offset)):(E.setEnd(S.node,S.offset),D.addRange(E))}}}}for(k=[],D=g;D=D.parentNode;)D.nodeType===1&&k.push({element:D,left:D.scrollLeft,top:D.scrollTop});for(typeof g.focus=="function"&&g.focus(),g=0;g<k.length;g++){var N=k[g];N.element.scrollLeft=N.left,N.element.scrollTop=N.top}}no=!!Rc,Bc=Rc=null}finally{xt=o,V.p=s,B.T=n}}t.current=e,$t=2}}function xm(){if($t===2){$t=0;var t=Kn,e=da,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=B.T,B.T=null;var s=V.p;V.p=2;var o=xt;xt|=4;try{Fh(t,e.alternate,e)}finally{xt=o,V.p=s,B.T=n}}$t=3}}function Tm(){if($t===4||$t===3){$t=0,Iy();var t=Kn,e=da,n=En,s=cm;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?$t=5:($t=0,da=Kn=null,Cm(t,t.pendingLanes));var o=t.pendingLanes;if(o===0&&(Jn=null),Lo(n),e=e.stateNode,Ee&&typeof Ee.onCommitFiberRoot=="function")try{Ee.onCommitFiberRoot(Na,e,void 0,(e.current.flags&128)===128)}catch{}if(s!==null){e=B.T,o=V.p,V.p=2,B.T=null;try{for(var c=t.onRecoverableError,d=0;d<s.length;d++){var g=s[d];c(g.value,{componentStack:g.stack})}}finally{B.T=e,V.p=o}}(En&3)!==0&&Xl(),ln(t),o=t.pendingLanes,(n&261930)!==0&&(o&42)!==0?t===vc?fs++:(fs=0,vc=t):fs=0,hs(0)}}function Cm(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,_a(e)))}function Xl(){return Sm(),xm(),Tm(),Em()}function Em(){if($t!==5)return!1;var t=Kn,e=mc;mc=0;var n=Lo(En),s=B.T,o=V.p;try{V.p=32>n?32:n,B.T=null,n=pc,pc=null;var c=Kn,d=En;if($t=0,da=Kn=null,En=0,(xt&6)!==0)throw Error(r(331));var g=xt;if(xt|=4,lm(c.current),im(c,c.current,d,n),xt=g,hs(0,!1),Ee&&typeof Ee.onPostCommitFiberRoot=="function")try{Ee.onPostCommitFiberRoot(Na,c)}catch{}return!0}finally{V.p=o,B.T=s,Cm(t,e)}}function wm(t,e,n){e=He(n,e),e=Zr(t.stateNode,e,2),t=jn(t,e,2),t!==null&&(ka(t,2),ln(t))}function wt(t,e,n){if(t.tag===3)wm(t,t,n);else for(;e!==null;){if(e.tag===3){wm(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Jn===null||!Jn.has(s))){t=He(n,t),n=Mh(2),s=jn(e,n,2),s!==null&&(Dh(n,s,e,t),ka(s,2),ln(s));break}}e=e.return}}function bc(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new Tb;var o=new Set;s.set(e,o)}else o=s.get(e),o===void 0&&(o=new Set,s.set(e,o));o.has(n)||(dc=!0,o.add(n),t=Db.bind(null,t,e,n),e.then(t,t))}function Db(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Bt===t&&(vt&n)===n&&(Yt===4||Yt===3&&(vt&62914560)===vt&&300>Ce()-Hl?(xt&2)===0&&fa(t,0):fc|=n,ua===vt&&(ua=0)),ln(t)}function Mm(t,e){e===0&&(e=Ad()),t=hi(t,e),t!==null&&(ka(t,e),ln(t))}function Rb(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Mm(t,n)}function Bb(t,e){var n=0;switch(t.tag){case 31:case 13:var s=t.stateNode,o=t.memoizedState;o!==null&&(n=o.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(e),Mm(t,n)}function Nb(t,e){return Uo(t,e)}var Jl=null,ma=null,Ac=!1,Kl=!1,Sc=!1,Zn=0;function ln(t){t!==ma&&t.next===null&&(ma===null?Jl=ma=t:ma=ma.next=t),Kl=!0,Ac||(Ac=!0,kb())}function hs(t,e){if(!Sc&&Kl){Sc=!0;do for(var n=!1,s=Jl;s!==null;){if(t!==0){var o=s.pendingLanes;if(o===0)var c=0;else{var d=s.suspendedLanes,g=s.pingedLanes;c=(1<<31-we(42|t)+1)-1,c&=o&~(d&~g),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(n=!0,Nm(s,c))}else c=vt,c=Fs(s,s===Bt?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||Ua(s,c)||(n=!0,Nm(s,c));s=s.next}while(n);Sc=!1}}function Ub(){Dm()}function Dm(){Kl=Ac=!1;var t=0;Zn!==0&&Qb()&&(t=Zn);for(var e=Ce(),n=null,s=Jl;s!==null;){var o=s.next,c=Rm(s,e);c===0?(s.next=null,n===null?Jl=o:n.next=o,o===null&&(ma=n)):(n=s,(t!==0||(c&3)!==0)&&(Kl=!0)),s=o}$t!==0&&$t!==5||hs(t),Zn!==0&&(Zn=0)}function Rm(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,o=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var d=31-we(c),g=1<<d,A=o[d];A===-1?((g&n)===0||(g&s)!==0)&&(o[d]=s0(g,e)):A<=e&&(t.expiredLanes|=g),c&=~g}if(e=Bt,n=vt,n=Fs(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,n===0||t===e&&(Et===2||Et===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&ko(s),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||Ua(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(s!==null&&ko(s),Lo(n)){case 2:case 8:n=yd;break;case 32:n=Ks;break;case 268435456:n=bd;break;default:n=Ks}return s=Bm.bind(null,t),n=Uo(n,s),t.callbackPriority=e,t.callbackNode=n,e}return s!==null&&s!==null&&ko(s),t.callbackPriority=2,t.callbackNode=null,2}function Bm(t,e){if($t!==0&&$t!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Xl()&&t.callbackNode!==n)return null;var s=vt;return s=Fs(t,t===Bt?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(dm(t,s,e),Rm(t,Ce()),t.callbackNode!=null&&t.callbackNode===n?Bm.bind(null,t):null)}function Nm(t,e){if(Xl())return null;dm(t,e,!0)}function kb(){Jb(function(){(xt&6)!==0?Uo(gd,Ub):Dm()})}function xc(){if(Zn===0){var t=$i;t===0&&(t=_s,_s<<=1,(_s&261888)===0&&(_s=256)),Zn=t}return Zn}function Um(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:tl(""+t)}function km(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function zb(t,e,n,s,o){if(e==="submit"&&n&&n.stateNode===o){var c=Um((o[ve]||null).action),d=s.submitter;d&&(e=(e=d[ve]||null)?Um(e.formAction):d.getAttribute("formAction"),e!==null&&(c=e,d=null));var g=new al("action","action",null,s,o);t.push({event:g,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(Zn!==0){var A=d?km(o,d):new FormData(o);Gr(n,{pending:!0,data:A,method:o.method,action:c},null,A)}}else typeof c=="function"&&(g.preventDefault(),A=d?km(o,d):new FormData(o),Gr(n,{pending:!0,data:A,method:o.method,action:c},c,A))},currentTarget:o}]})}}for(var Tc=0;Tc<sr.length;Tc++){var Cc=sr[Tc],Ob=Cc.toLowerCase(),Lb=Cc[0].toUpperCase()+Cc.slice(1);Ie(Ob,"on"+Lb)}Ie(uf,"onAnimationEnd"),Ie(df,"onAnimationIteration"),Ie(ff,"onAnimationStart"),Ie("dblclick","onDoubleClick"),Ie("focusin","onFocus"),Ie("focusout","onBlur"),Ie(W0,"onTransitionRun"),Ie($0,"onTransitionStart"),Ie(tb,"onTransitionCancel"),Ie(hf,"onTransitionEnd"),ji("onMouseEnter",["mouseout","mouseover"]),ji("onMouseLeave",["mouseout","mouseover"]),ji("onPointerEnter",["pointerout","pointerover"]),ji("onPointerLeave",["pointerout","pointerover"]),ci("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ci("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ci("onBeforeInput",["compositionend","keypress","textInput","paste"]),ci("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ci("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ci("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ms="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ms));function zm(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],o=s.event;s=s.listeners;t:{var c=void 0;if(e)for(var d=s.length-1;0<=d;d--){var g=s[d],A=g.instance,w=g.currentTarget;if(g=g.listener,A!==c&&o.isPropagationStopped())break t;c=g,o.currentTarget=w;try{c(o)}catch(R){ol(R)}o.currentTarget=null,c=A}else for(d=0;d<s.length;d++){if(g=s[d],A=g.instance,w=g.currentTarget,g=g.listener,A!==c&&o.isPropagationStopped())break t;c=g,o.currentTarget=w;try{c(o)}catch(R){ol(R)}o.currentTarget=null,c=A}}}}function mt(t,e){var n=e[Vo];n===void 0&&(n=e[Vo]=new Set);var s=t+"__bubble";n.has(s)||(Om(e,t,2,!1),n.add(s))}function Ec(t,e,n){var s=0;e&&(s|=4),Om(n,t,s,e)}var _l="_reactListening"+Math.random().toString(36).slice(2);function wc(t){if(!t[_l]){t[_l]=!0,Md.forEach(function(n){n!=="selectionchange"&&(Vb.has(n)||Ec(n,!1,t),Ec(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[_l]||(e[_l]=!0,Ec("selectionchange",!1,e))}}function Om(t,e,n,s){switch(up(e)){case 2:var o=d1;break;case 8:o=f1;break;default:o=qc}n=o.bind(null,e,n,t),o=void 0,!Ko||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(o=!0),s?o!==void 0?t.addEventListener(e,n,{capture:!0,passive:o}):t.addEventListener(e,n,!0):o!==void 0?t.addEventListener(e,n,{passive:o}):t.addEventListener(e,n,!1)}function Mc(t,e,n,s,o){var c=s;if((e&1)===0&&(e&2)===0&&s!==null)t:for(;;){if(s===null)return;var d=s.tag;if(d===3||d===4){var g=s.stateNode.containerInfo;if(g===o)break;if(d===4)for(d=s.return;d!==null;){var A=d.tag;if((A===3||A===4)&&d.stateNode.containerInfo===o)return;d=d.return}for(;g!==null;){if(d=Li(g),d===null)return;if(A=d.tag,A===5||A===6||A===26||A===27){s=c=d;continue t}g=g.parentNode}}s=s.return}jd(function(){var w=c,R=Xo(n),k=[];t:{var M=mf.get(t);if(M!==void 0){var D=al,Z=t;switch(t){case"keypress":if(nl(n)===0)break t;case"keydown":case"keyup":D=B0;break;case"focusin":Z="focus",D=Fo;break;case"focusout":Z="blur",D=Fo;break;case"beforeblur":case"afterblur":D=Fo;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":D=Gd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":D=y0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":D=k0;break;case uf:case df:case ff:D=S0;break;case hf:D=O0;break;case"scroll":case"scrollend":D=v0;break;case"wheel":D=V0;break;case"copy":case"cut":case"paste":D=T0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":D=Xd;break;case"toggle":case"beforetoggle":D=j0}var nt=(e&4)!==0,Rt=!nt&&(t==="scroll"||t==="scrollend"),C=nt?M!==null?M+"Capture":null:M;nt=[];for(var S=w,E;S!==null;){var N=S;if(E=N.stateNode,N=N.tag,N!==5&&N!==26&&N!==27||E===null||C===null||(N=La(S,C),N!=null&&nt.push(ps(S,N,E))),Rt)break;S=S.return}0<nt.length&&(M=new D(M,Z,null,n,R),k.push({event:M,listeners:nt}))}}if((e&7)===0){t:{if(M=t==="mouseover"||t==="pointerover",D=t==="mouseout"||t==="pointerout",M&&n!==Qo&&(Z=n.relatedTarget||n.fromElement)&&(Li(Z)||Z[Oi]))break t;if((D||M)&&(M=R.window===R?R:(M=R.ownerDocument)?M.defaultView||M.parentWindow:window,D?(Z=n.relatedTarget||n.toElement,D=w,Z=Z?Li(Z):null,Z!==null&&(Rt=h(Z),nt=Z.tag,Z!==Rt||nt!==5&&nt!==27&&nt!==6)&&(Z=null)):(D=null,Z=w),D!==Z)){if(nt=Gd,N="onMouseLeave",C="onMouseEnter",S="mouse",(t==="pointerout"||t==="pointerover")&&(nt=Xd,N="onPointerLeave",C="onPointerEnter",S="pointer"),Rt=D==null?M:Oa(D),E=Z==null?M:Oa(Z),M=new nt(N,S+"leave",D,n,R),M.target=Rt,M.relatedTarget=E,N=null,Li(R)===w&&(nt=new nt(C,S+"enter",Z,n,R),nt.target=E,nt.relatedTarget=Rt,N=nt),Rt=N,D&&Z)e:{for(nt=Hb,C=D,S=Z,E=0,N=C;N;N=nt(N))E++;N=0;for(var tt=S;tt;tt=nt(tt))N++;for(;0<E-N;)C=nt(C),E--;for(;0<N-E;)S=nt(S),N--;for(;E--;){if(C===S||S!==null&&C===S.alternate){nt=C;break e}C=nt(C),S=nt(S)}nt=null}else nt=null;D!==null&&Lm(k,M,D,nt,!1),Z!==null&&Rt!==null&&Lm(k,Rt,Z,nt,!0)}}t:{if(M=w?Oa(w):window,D=M.nodeName&&M.nodeName.toLowerCase(),D==="select"||D==="input"&&M.type==="file")var At=Wd;else if(Fd(M))if($d)At=P0;else{At=_0;var I=K0}else D=M.nodeName,!D||D.toLowerCase()!=="input"||M.type!=="checkbox"&&M.type!=="radio"?w&&Go(w.elementType)&&(At=Wd):At=Z0;if(At&&(At=At(t,w))){Id(k,At,n,R);break t}I&&I(t,M,w),t==="focusout"&&w&&M.type==="number"&&w.memoizedProps.value!=null&&qo(M,"number",M.value)}switch(I=w?Oa(w):window,t){case"focusin":(Fd(I)||I.contentEditable==="true")&&(Ji=I,nr=w,Xa=null);break;case"focusout":Xa=nr=Ji=null;break;case"mousedown":ir=!0;break;case"contextmenu":case"mouseup":case"dragend":ir=!1,rf(k,n,R);break;case"selectionchange":if(I0)break;case"keydown":case"keyup":rf(k,n,R)}var ut;if(Wo)t:{switch(t){case"compositionstart":var gt="onCompositionStart";break t;case"compositionend":gt="onCompositionEnd";break t;case"compositionupdate":gt="onCompositionUpdate";break t}gt=void 0}else Xi?Zd(t,n)&&(gt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(gt="onCompositionStart");gt&&(Jd&&n.locale!=="ko"&&(Xi||gt!=="onCompositionStart"?gt==="onCompositionEnd"&&Xi&&(ut=Yd()):(Un=R,_o="value"in Un?Un.value:Un.textContent,Xi=!0)),I=Zl(w,gt),0<I.length&&(gt=new Qd(gt,t,null,n,R),k.push({event:gt,listeners:I}),ut?gt.data=ut:(ut=Pd(n),ut!==null&&(gt.data=ut)))),(ut=q0?G0(t,n):Q0(t,n))&&(gt=Zl(w,"onBeforeInput"),0<gt.length&&(I=new Qd("onBeforeInput","beforeinput",null,n,R),k.push({event:I,listeners:gt}),I.data=ut)),zb(k,t,w,n,R)}zm(k,e)})}function ps(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Zl(t,e){for(var n=e+"Capture",s=[];t!==null;){var o=t,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=La(t,n),o!=null&&s.unshift(ps(t,o,c)),o=La(t,e),o!=null&&s.push(ps(t,o,c))),t.tag===3)return s;t=t.return}return[]}function Hb(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Lm(t,e,n,s,o){for(var c=e._reactName,d=[];n!==null&&n!==s;){var g=n,A=g.alternate,w=g.stateNode;if(g=g.tag,A!==null&&A===s)break;g!==5&&g!==26&&g!==27||w===null||(A=w,o?(w=La(n,c),w!=null&&d.unshift(ps(n,w,A))):o||(w=La(n,c),w!=null&&d.push(ps(n,w,A)))),n=n.return}d.length!==0&&t.push({event:e,listeners:d})}var jb=/\r\n?/g,Yb=/\u0000|\uFFFD/g;function Vm(t){return(typeof t=="string"?t:""+t).replace(jb,`
`).replace(Yb,"")}function Hm(t,e){return e=Vm(e),Vm(t)===e}function Dt(t,e,n,s,o,c){switch(n){case"children":typeof s=="string"?e==="body"||e==="textarea"&&s===""||qi(t,s):(typeof s=="number"||typeof s=="bigint")&&e!=="body"&&qi(t,""+s);break;case"className":Ws(t,"class",s);break;case"tabIndex":Ws(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":Ws(t,n,s);break;case"style":Vd(t,s,c);break;case"data":if(e!=="object"){Ws(t,"data",s);break}case"src":case"href":if(s===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=tl(""+s),t.setAttribute(n,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(n==="formAction"?(e!=="input"&&Dt(t,e,"name",o.name,o,null),Dt(t,e,"formEncType",o.formEncType,o,null),Dt(t,e,"formMethod",o.formMethod,o,null),Dt(t,e,"formTarget",o.formTarget,o,null)):(Dt(t,e,"encType",o.encType,o,null),Dt(t,e,"method",o.method,o,null),Dt(t,e,"target",o.target,o,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=tl(""+s),t.setAttribute(n,s);break;case"onClick":s!=null&&(t.onclick=un);break;case"onScroll":s!=null&&mt("scroll",t);break;case"onScrollEnd":s!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(n=s.__html,n!=null){if(o.children!=null)throw Error(r(60));t.innerHTML=n}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}n=tl(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""+s):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":s===!0?t.setAttribute(n,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,s):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(n,s):t.removeAttribute(n);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(n):t.setAttribute(n,s);break;case"popover":mt("beforetoggle",t),mt("toggle",t),Is(t,"popover",s);break;case"xlinkActuate":cn(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":cn(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":cn(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":cn(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":cn(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":cn(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":cn(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":cn(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":cn(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":Is(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=m0.get(n)||n,Is(t,n,s))}}function Dc(t,e,n,s,o,c){switch(n){case"style":Vd(t,s,c);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(n=s.__html,n!=null){if(o.children!=null)throw Error(r(60));t.innerHTML=n}}break;case"children":typeof s=="string"?qi(t,s):(typeof s=="number"||typeof s=="bigint")&&qi(t,""+s);break;case"onScroll":s!=null&&mt("scroll",t);break;case"onScrollEnd":s!=null&&mt("scrollend",t);break;case"onClick":s!=null&&(t.onclick=un);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Dd.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(o=n.endsWith("Capture"),e=n.slice(2,o?n.length-7:void 0),c=t[ve]||null,c=c!=null?c[n]:null,typeof c=="function"&&t.removeEventListener(e,c,o),typeof s=="function")){typeof c!="function"&&c!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,s,o);break t}n in t?t[n]=s:s===!0?t.setAttribute(n,""):Is(t,n,s)}}}function oe(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var s=!1,o=!1,c;for(c in n)if(n.hasOwnProperty(c)){var d=n[c];if(d!=null)switch(c){case"src":s=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,e));default:Dt(t,e,c,d,n,null)}}o&&Dt(t,e,"srcSet",n.srcSet,n,null),s&&Dt(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var g=c=d=o=null,A=null,w=null;for(s in n)if(n.hasOwnProperty(s)){var R=n[s];if(R!=null)switch(s){case"name":o=R;break;case"type":d=R;break;case"checked":A=R;break;case"defaultChecked":w=R;break;case"value":c=R;break;case"defaultValue":g=R;break;case"children":case"dangerouslySetInnerHTML":if(R!=null)throw Error(r(137,e));break;default:Dt(t,e,s,R,n,null)}}kd(t,c,g,A,w,d,o,!1);return;case"select":mt("invalid",t),s=d=c=null;for(o in n)if(n.hasOwnProperty(o)&&(g=n[o],g!=null))switch(o){case"value":c=g;break;case"defaultValue":d=g;break;case"multiple":s=g;default:Dt(t,e,o,g,n,null)}e=c,n=d,t.multiple=!!s,e!=null?Yi(t,!!s,e,!1):n!=null&&Yi(t,!!s,n,!0);return;case"textarea":mt("invalid",t),c=o=s=null;for(d in n)if(n.hasOwnProperty(d)&&(g=n[d],g!=null))switch(d){case"value":s=g;break;case"defaultValue":o=g;break;case"children":c=g;break;case"dangerouslySetInnerHTML":if(g!=null)throw Error(r(91));break;default:Dt(t,e,d,g,n,null)}Od(t,s,o,c);return;case"option":for(A in n)if(n.hasOwnProperty(A)&&(s=n[A],s!=null))switch(A){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Dt(t,e,A,s,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(s=0;s<ms.length;s++)mt(ms[s],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(w in n)if(n.hasOwnProperty(w)&&(s=n[w],s!=null))switch(w){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,e));default:Dt(t,e,w,s,n,null)}return;default:if(Go(e)){for(R in n)n.hasOwnProperty(R)&&(s=n[R],s!==void 0&&Dc(t,e,R,s,n,void 0));return}}for(g in n)n.hasOwnProperty(g)&&(s=n[g],s!=null&&Dt(t,e,g,s,n,null))}function qb(t,e,n,s){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,d=null,g=null,A=null,w=null,R=null;for(D in n){var k=n[D];if(n.hasOwnProperty(D)&&k!=null)switch(D){case"checked":break;case"value":break;case"defaultValue":A=k;default:s.hasOwnProperty(D)||Dt(t,e,D,null,s,k)}}for(var M in s){var D=s[M];if(k=n[M],s.hasOwnProperty(M)&&(D!=null||k!=null))switch(M){case"type":c=D;break;case"name":o=D;break;case"checked":w=D;break;case"defaultChecked":R=D;break;case"value":d=D;break;case"defaultValue":g=D;break;case"children":case"dangerouslySetInnerHTML":if(D!=null)throw Error(r(137,e));break;default:D!==k&&Dt(t,e,M,D,s,k)}}Yo(t,d,g,A,w,R,c,o);return;case"select":D=d=g=M=null;for(c in n)if(A=n[c],n.hasOwnProperty(c)&&A!=null)switch(c){case"value":break;case"multiple":D=A;default:s.hasOwnProperty(c)||Dt(t,e,c,null,s,A)}for(o in s)if(c=s[o],A=n[o],s.hasOwnProperty(o)&&(c!=null||A!=null))switch(o){case"value":M=c;break;case"defaultValue":g=c;break;case"multiple":d=c;default:c!==A&&Dt(t,e,o,c,s,A)}e=g,n=d,s=D,M!=null?Yi(t,!!n,M,!1):!!s!=!!n&&(e!=null?Yi(t,!!n,e,!0):Yi(t,!!n,n?[]:"",!1));return;case"textarea":D=M=null;for(g in n)if(o=n[g],n.hasOwnProperty(g)&&o!=null&&!s.hasOwnProperty(g))switch(g){case"value":break;case"children":break;default:Dt(t,e,g,null,s,o)}for(d in s)if(o=s[d],c=n[d],s.hasOwnProperty(d)&&(o!=null||c!=null))switch(d){case"value":M=o;break;case"defaultValue":D=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(r(91));break;default:o!==c&&Dt(t,e,d,o,s,c)}zd(t,M,D);return;case"option":for(var Z in n)if(M=n[Z],n.hasOwnProperty(Z)&&M!=null&&!s.hasOwnProperty(Z))switch(Z){case"selected":t.selected=!1;break;default:Dt(t,e,Z,null,s,M)}for(A in s)if(M=s[A],D=n[A],s.hasOwnProperty(A)&&M!==D&&(M!=null||D!=null))switch(A){case"selected":t.selected=M&&typeof M!="function"&&typeof M!="symbol";break;default:Dt(t,e,A,M,s,D)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var nt in n)M=n[nt],n.hasOwnProperty(nt)&&M!=null&&!s.hasOwnProperty(nt)&&Dt(t,e,nt,null,s,M);for(w in s)if(M=s[w],D=n[w],s.hasOwnProperty(w)&&M!==D&&(M!=null||D!=null))switch(w){case"children":case"dangerouslySetInnerHTML":if(M!=null)throw Error(r(137,e));break;default:Dt(t,e,w,M,s,D)}return;default:if(Go(e)){for(var Rt in n)M=n[Rt],n.hasOwnProperty(Rt)&&M!==void 0&&!s.hasOwnProperty(Rt)&&Dc(t,e,Rt,void 0,s,M);for(R in s)M=s[R],D=n[R],!s.hasOwnProperty(R)||M===D||M===void 0&&D===void 0||Dc(t,e,R,M,s,D);return}}for(var C in n)M=n[C],n.hasOwnProperty(C)&&M!=null&&!s.hasOwnProperty(C)&&Dt(t,e,C,null,s,M);for(k in s)M=s[k],D=n[k],!s.hasOwnProperty(k)||M===D||M==null&&D==null||Dt(t,e,k,M,s,D)}function jm(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Gb(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),s=0;s<n.length;s++){var o=n[s],c=o.transferSize,d=o.initiatorType,g=o.duration;if(c&&g&&jm(d)){for(d=0,g=o.responseEnd,s+=1;s<n.length;s++){var A=n[s],w=A.startTime;if(w>g)break;var R=A.transferSize,k=A.initiatorType;R&&jm(k)&&(A=A.responseEnd,d+=R*(A<g?1:(g-w)/(A-w)))}if(--s,e+=8*(c+d)/(o.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Rc=null,Bc=null;function Pl(t){return t.nodeType===9?t:t.ownerDocument}function Ym(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function qm(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Nc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Uc=null;function Qb(){var t=window.event;return t&&t.type==="popstate"?t===Uc?!1:(Uc=t,!0):(Uc=null,!1)}var Gm=typeof setTimeout=="function"?setTimeout:void 0,Xb=typeof clearTimeout=="function"?clearTimeout:void 0,Qm=typeof Promise=="function"?Promise:void 0,Jb=typeof queueMicrotask=="function"?queueMicrotask:typeof Qm<"u"?function(t){return Qm.resolve(null).then(t).catch(Kb)}:Gm;function Kb(t){setTimeout(function(){throw t})}function Pn(t){return t==="head"}function Xm(t,e){var n=e,s=0;do{var o=n.nextSibling;if(t.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"||n==="/&"){if(s===0){t.removeChild(o),ya(e);return}s--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")s++;else if(n==="html")vs(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,vs(n);for(var c=n.firstChild;c;){var d=c.nextSibling,g=c.nodeName;c[za]||g==="SCRIPT"||g==="STYLE"||g==="LINK"&&c.rel.toLowerCase()==="stylesheet"||n.removeChild(c),c=d}}else n==="body"&&vs(t.ownerDocument.body);n=o}while(n);ya(e)}function Jm(t,e){var n=t;t=0;do{var s=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=s}while(n)}function kc(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":kc(n),Ho(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function _b(t,e,n,s){for(;t.nodeType===1;){var o=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[za])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==o.rel||t.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||t.getAttribute("title")!==(o.title==null?null:o.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(o.src==null?null:o.src)||t.getAttribute("type")!==(o.type==null?null:o.type)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=Qe(t.nextSibling),t===null)break}return null}function Zb(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Qe(t.nextSibling),t===null))return null;return t}function Km(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Qe(t.nextSibling),t===null))return null;return t}function zc(t){return t.data==="$?"||t.data==="$~"}function Oc(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Pb(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var s=function(){e(),n.removeEventListener("DOMContentLoaded",s)};n.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function Qe(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Lc=null;function _m(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Qe(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Zm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Pm(t,e,n){switch(e=Pl(n),t){case"html":if(t=e.documentElement,!t)throw Error(r(452));return t;case"head":if(t=e.head,!t)throw Error(r(453));return t;case"body":if(t=e.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function vs(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Ho(t)}var Xe=new Map,Fm=new Set;function Fl(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var wn=V.d;V.d={f:Fb,r:Ib,D:Wb,C:$b,L:t1,m:e1,X:i1,S:n1,M:a1};function Fb(){var t=wn.f(),e=ql();return t||e}function Ib(t){var e=Vi(t);e!==null&&e.tag===5&&e.type==="form"?hh(e):wn.r(t)}var pa=typeof document>"u"?null:document;function Im(t,e,n){var s=pa;if(s&&typeof e=="string"&&e){var o=Le(e);o='link[rel="'+t+'"][href="'+o+'"]',typeof n=="string"&&(o+='[crossorigin="'+n+'"]'),Fm.has(o)||(Fm.add(o),t={rel:t,crossOrigin:n,href:e},s.querySelector(o)===null&&(e=s.createElement("link"),oe(e,"link",t),te(e),s.head.appendChild(e)))}}function Wb(t){wn.D(t),Im("dns-prefetch",t,null)}function $b(t,e){wn.C(t,e),Im("preconnect",t,e)}function t1(t,e,n){wn.L(t,e,n);var s=pa;if(s&&t&&e){var o='link[rel="preload"][as="'+Le(e)+'"]';e==="image"&&n&&n.imageSrcSet?(o+='[imagesrcset="'+Le(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(o+='[imagesizes="'+Le(n.imageSizes)+'"]')):o+='[href="'+Le(t)+'"]';var c=o;switch(e){case"style":c=va(t);break;case"script":c=ga(t)}Xe.has(c)||(t=b({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Xe.set(c,t),s.querySelector(o)!==null||e==="style"&&s.querySelector(gs(c))||e==="script"&&s.querySelector(ys(c))||(e=s.createElement("link"),oe(e,"link",t),te(e),s.head.appendChild(e)))}}function e1(t,e){wn.m(t,e);var n=pa;if(n&&t){var s=e&&typeof e.as=="string"?e.as:"script",o='link[rel="modulepreload"][as="'+Le(s)+'"][href="'+Le(t)+'"]',c=o;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=ga(t)}if(!Xe.has(c)&&(t=b({rel:"modulepreload",href:t},e),Xe.set(c,t),n.querySelector(o)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ys(c)))return}s=n.createElement("link"),oe(s,"link",t),te(s),n.head.appendChild(s)}}}function n1(t,e,n){wn.S(t,e,n);var s=pa;if(s&&t){var o=Hi(s).hoistableStyles,c=va(t);e=e||"default";var d=o.get(c);if(!d){var g={loading:0,preload:null};if(d=s.querySelector(gs(c)))g.loading=5;else{t=b({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Xe.get(c))&&Vc(t,n);var A=d=s.createElement("link");te(A),oe(A,"link",t),A._p=new Promise(function(w,R){A.onload=w,A.onerror=R}),A.addEventListener("load",function(){g.loading|=1}),A.addEventListener("error",function(){g.loading|=2}),g.loading|=4,Il(d,e,s)}d={type:"stylesheet",instance:d,count:1,state:g},o.set(c,d)}}}function i1(t,e){wn.X(t,e);var n=pa;if(n&&t){var s=Hi(n).hoistableScripts,o=ga(t),c=s.get(o);c||(c=n.querySelector(ys(o)),c||(t=b({src:t,async:!0},e),(e=Xe.get(o))&&Hc(t,e),c=n.createElement("script"),te(c),oe(c,"link",t),n.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(o,c))}}function a1(t,e){wn.M(t,e);var n=pa;if(n&&t){var s=Hi(n).hoistableScripts,o=ga(t),c=s.get(o);c||(c=n.querySelector(ys(o)),c||(t=b({src:t,async:!0,type:"module"},e),(e=Xe.get(o))&&Hc(t,e),c=n.createElement("script"),te(c),oe(c,"link",t),n.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(o,c))}}function Wm(t,e,n,s){var o=(o=ft.current)?Fl(o):null;if(!o)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=va(n.href),n=Hi(o).hoistableStyles,s=n.get(e),s||(s={type:"style",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=va(n.href);var c=Hi(o).hoistableStyles,d=c.get(t);if(d||(o=o.ownerDocument||o,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,d),(c=o.querySelector(gs(t)))&&!c._p&&(d.instance=c,d.state.loading=5),Xe.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Xe.set(t,n),c||s1(o,t,n,d.state))),e&&s===null)throw Error(r(528,""));return d}if(e&&s!==null)throw Error(r(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=ga(n),n=Hi(o).hoistableScripts,s=n.get(e),s||(s={type:"script",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function va(t){return'href="'+Le(t)+'"'}function gs(t){return'link[rel="stylesheet"]['+t+"]"}function $m(t){return b({},t,{"data-precedence":t.precedence,precedence:null})}function s1(t,e,n,s){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?s.loading=1:(e=t.createElement("link"),s.preload=e,e.addEventListener("load",function(){return s.loading|=1}),e.addEventListener("error",function(){return s.loading|=2}),oe(e,"link",n),te(e),t.head.appendChild(e))}function ga(t){return'[src="'+Le(t)+'"]'}function ys(t){return"script[async]"+t}function tp(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var s=t.querySelector('style[data-href~="'+Le(n.href)+'"]');if(s)return e.instance=s,te(s),s;var o=b({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),te(s),oe(s,"style",o),Il(s,n.precedence,t),e.instance=s;case"stylesheet":o=va(n.href);var c=t.querySelector(gs(o));if(c)return e.state.loading|=4,e.instance=c,te(c),c;s=$m(n),(o=Xe.get(o))&&Vc(s,o),c=(t.ownerDocument||t).createElement("link"),te(c);var d=c;return d._p=new Promise(function(g,A){d.onload=g,d.onerror=A}),oe(c,"link",s),e.state.loading|=4,Il(c,n.precedence,t),e.instance=c;case"script":return c=ga(n.src),(o=t.querySelector(ys(c)))?(e.instance=o,te(o),o):(s=n,(o=Xe.get(c))&&(s=b({},n),Hc(s,o)),t=t.ownerDocument||t,o=t.createElement("script"),te(o),oe(o,"link",s),t.head.appendChild(o),e.instance=o);case"void":return null;default:throw Error(r(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(s=e.instance,e.state.loading|=4,Il(s,n.precedence,t));return e.instance}function Il(t,e,n){for(var s=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=s.length?s[s.length-1]:null,c=o,d=0;d<s.length;d++){var g=s[d];if(g.dataset.precedence===e)c=g;else if(c!==o)break}c?c.parentNode.insertBefore(t,c.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Vc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Hc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Wl=null;function ep(t,e,n){if(Wl===null){var s=new Map,o=Wl=new Map;o.set(n,s)}else o=Wl,s=o.get(n),s||(s=new Map,o.set(n,s));if(s.has(t))return s;for(s.set(t,null),n=n.getElementsByTagName(t),o=0;o<n.length;o++){var c=n[o];if(!(c[za]||c[ie]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var d=c.getAttribute(e)||"";d=t+d;var g=s.get(d);g?g.push(c):s.set(d,[c])}}return s}function np(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function l1(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function ip(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function o1(t,e,n,s){if(n.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var o=va(s.href),c=e.querySelector(gs(o));if(c){e=c._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=$l.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=c,te(c);return}c=e.ownerDocument||e,s=$m(s),(o=Xe.get(o))&&Vc(s,o),c=c.createElement("link"),te(c);var d=c;d._p=new Promise(function(g,A){d.onload=g,d.onerror=A}),oe(c,"link",s),n.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=$l.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var jc=0;function r1(t,e){return t.stylesheets&&t.count===0&&eo(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var s=setTimeout(function(){if(t.stylesheets&&eo(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+e);0<t.imgBytes&&jc===0&&(jc=62500*Gb());var o=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&eo(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>jc?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(o)}}:null}function $l(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)eo(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var to=null;function eo(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,to=new Map,e.forEach(c1,t),to=null,$l.call(t))}function c1(t,e){if(!(e.state.loading&4)){var n=to.get(t);if(n)var s=n.get(null);else{n=new Map,to.set(t,n);for(var o=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var d=o[c];(d.nodeName==="LINK"||d.getAttribute("media")!=="not all")&&(n.set(d.dataset.precedence,d),s=d)}s&&n.set(null,s)}o=e.instance,d=o.getAttribute("data-precedence"),c=n.get(d)||s,c===s&&n.set(null,o),n.set(d,o),this.count++,s=$l.bind(this),o.addEventListener("load",s),o.addEventListener("error",s),c?c.parentNode.insertBefore(o,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(o,t.firstChild)),e.state.loading|=4}}var bs={$$typeof:q,Provider:null,Consumer:null,_currentValue:_,_currentValue2:_,_threadCount:0};function u1(t,e,n,s,o,c,d,g,A){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=zo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zo(0),this.hiddenUpdates=zo(null),this.identifierPrefix=s,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=d,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=A,this.incompleteTransitions=new Map}function ap(t,e,n,s,o,c,d,g,A,w,R,k){return t=new u1(t,e,n,d,A,w,R,k,g),e=1,c===!0&&(e|=24),c=De(3,null,null,e),t.current=c,c.stateNode=t,e=yr(),e.refCount++,t.pooledCache=e,e.refCount++,c.memoizedState={element:s,isDehydrated:n,cache:e},xr(c),t}function sp(t){return t?(t=Zi,t):Zi}function lp(t,e,n,s,o,c){o=sp(o),s.context===null?s.context=o:s.pendingContext=o,s=Hn(e),s.payload={element:n},c=c===void 0?null:c,c!==null&&(s.callback=c),n=jn(t,s,e),n!==null&&(xe(n,t,e),Ia(n,t,e))}function op(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Yc(t,e){op(t,e),(t=t.alternate)&&op(t,e)}function rp(t){if(t.tag===13||t.tag===31){var e=hi(t,67108864);e!==null&&xe(e,t,67108864),Yc(t,67108864)}}function cp(t){if(t.tag===13||t.tag===31){var e=ke();e=Oo(e);var n=hi(t,e);n!==null&&xe(n,t,e),Yc(t,e)}}var no=!0;function d1(t,e,n,s){var o=B.T;B.T=null;var c=V.p;try{V.p=2,qc(t,e,n,s)}finally{V.p=c,B.T=o}}function f1(t,e,n,s){var o=B.T;B.T=null;var c=V.p;try{V.p=8,qc(t,e,n,s)}finally{V.p=c,B.T=o}}function qc(t,e,n,s){if(no){var o=Gc(s);if(o===null)Mc(t,e,s,io,n),dp(t,s);else if(m1(o,t,e,n,s))s.stopPropagation();else if(dp(t,s),e&4&&-1<h1.indexOf(t)){for(;o!==null;){var c=Vi(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var d=ri(c.pendingLanes);if(d!==0){var g=c;for(g.pendingLanes|=2,g.entangledLanes|=2;d;){var A=1<<31-we(d);g.entanglements[1]|=A,d&=~A}ln(c),(xt&6)===0&&(jl=Ce()+500,hs(0))}}break;case 31:case 13:g=hi(c,2),g!==null&&xe(g,c,2),ql(),Yc(c,2)}if(c=Gc(s),c===null&&Mc(t,e,s,io,n),c===o)break;o=c}o!==null&&s.stopPropagation()}else Mc(t,e,s,null,n)}}function Gc(t){return t=Xo(t),Qc(t)}var io=null;function Qc(t){if(io=null,t=Li(t),t!==null){var e=h(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=f(e),t!==null)return t;t=null}else if(n===31){if(t=p(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return io=t,null}function up(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Wy()){case gd:return 2;case yd:return 8;case Ks:case $y:return 32;case bd:return 268435456;default:return 32}default:return 32}}var Xc=!1,Fn=null,In=null,Wn=null,As=new Map,Ss=new Map,$n=[],h1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function dp(t,e){switch(t){case"focusin":case"focusout":Fn=null;break;case"dragenter":case"dragleave":In=null;break;case"mouseover":case"mouseout":Wn=null;break;case"pointerover":case"pointerout":As.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ss.delete(e.pointerId)}}function xs(t,e,n,s,o,c){return t===null||t.nativeEvent!==c?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:c,targetContainers:[o]},e!==null&&(e=Vi(e),e!==null&&rp(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,o!==null&&e.indexOf(o)===-1&&e.push(o),t)}function m1(t,e,n,s,o){switch(e){case"focusin":return Fn=xs(Fn,t,e,n,s,o),!0;case"dragenter":return In=xs(In,t,e,n,s,o),!0;case"mouseover":return Wn=xs(Wn,t,e,n,s,o),!0;case"pointerover":var c=o.pointerId;return As.set(c,xs(As.get(c)||null,t,e,n,s,o)),!0;case"gotpointercapture":return c=o.pointerId,Ss.set(c,xs(Ss.get(c)||null,t,e,n,s,o)),!0}return!1}function fp(t){var e=Li(t.target);if(e!==null){var n=h(e);if(n!==null){if(e=n.tag,e===13){if(e=f(n),e!==null){t.blockedOn=e,Ed(t.priority,function(){cp(n)});return}}else if(e===31){if(e=p(n),e!==null){t.blockedOn=e,Ed(t.priority,function(){cp(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ao(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Gc(t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);Qo=s,n.target.dispatchEvent(s),Qo=null}else return e=Vi(n),e!==null&&rp(e),t.blockedOn=n,!1;e.shift()}return!0}function hp(t,e,n){ao(t)&&n.delete(e)}function p1(){Xc=!1,Fn!==null&&ao(Fn)&&(Fn=null),In!==null&&ao(In)&&(In=null),Wn!==null&&ao(Wn)&&(Wn=null),As.forEach(hp),Ss.forEach(hp)}function so(t,e){t.blockedOn===e&&(t.blockedOn=null,Xc||(Xc=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,p1)))}var lo=null;function mp(t){lo!==t&&(lo=t,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){lo===t&&(lo=null);for(var e=0;e<t.length;e+=3){var n=t[e],s=t[e+1],o=t[e+2];if(typeof s!="function"){if(Qc(s||n)===null)continue;break}var c=Vi(n);c!==null&&(t.splice(e,3),e-=3,Gr(c,{pending:!0,data:o,method:n.method,action:s},s,o))}}))}function ya(t){function e(A){return so(A,t)}Fn!==null&&so(Fn,t),In!==null&&so(In,t),Wn!==null&&so(Wn,t),As.forEach(e),Ss.forEach(e);for(var n=0;n<$n.length;n++){var s=$n[n];s.blockedOn===t&&(s.blockedOn=null)}for(;0<$n.length&&(n=$n[0],n.blockedOn===null);)fp(n),n.blockedOn===null&&$n.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(s=0;s<n.length;s+=3){var o=n[s],c=n[s+1],d=o[ve]||null;if(typeof c=="function")d||mp(n);else if(d){var g=null;if(c&&c.hasAttribute("formAction")){if(o=c,d=c[ve]||null)g=d.formAction;else if(Qc(o)!==null)continue}else g=d.action;typeof g=="function"?n[s+1]=g:(n.splice(s,3),s-=3),mp(n)}}}function pp(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(d){return o=d})},focusReset:"manual",scroll:"manual"})}function e(){o!==null&&(o(),o=null),s||setTimeout(n,20)}function n(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,o=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),o!==null&&(o(),o=null)}}}function Jc(t){this._internalRoot=t}oo.prototype.render=Jc.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(r(409));var n=e.current,s=ke();lp(n,s,t,e,null,null)},oo.prototype.unmount=Jc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;lp(t.current,2,null,t,null,null),ql(),e[Oi]=null}};function oo(t){this._internalRoot=t}oo.prototype.unstable_scheduleHydration=function(t){if(t){var e=Cd();t={blockedOn:null,target:t,priority:e};for(var n=0;n<$n.length&&e!==0&&e<$n[n].priority;n++);$n.splice(n,0,t),n===0&&fp(t)}};var vp=a.version;if(vp!=="19.2.0")throw Error(r(527,vp,"19.2.0"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=m(e),t=t!==null?y(t):null,t=t===null?null:t.stateNode,t};var v1={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ro.isDisabled&&ro.supportsFiber)try{Na=ro.inject(v1),Ee=ro}catch{}}return Ts.createRoot=function(t,e){if(!u(t))throw Error(r(299));var n=!1,s="",o=Th,c=Ch,d=Eh;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(o=e.onUncaughtError),e.onCaughtError!==void 0&&(c=e.onCaughtError),e.onRecoverableError!==void 0&&(d=e.onRecoverableError)),e=ap(t,1,!1,null,null,n,s,null,o,c,d,pp),t[Oi]=e.current,wc(t),new Jc(e)},Ts.hydrateRoot=function(t,e,n){if(!u(t))throw Error(r(299));var s=!1,o="",c=Th,d=Ch,g=Eh,A=null;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError),n.formState!==void 0&&(A=n.formState)),e=ap(t,1,!0,e,n??null,s,o,A,c,d,g,pp),e.context=sp(null),n=e.current,s=ke(),s=Oo(s),o=Hn(s),o.callback=null,jn(n,o,s),n=s,e.current.lanes=n,ka(e,n),ln(e),t[Oi]=e.current,wc(t),new oo(e)},Ts.version="19.2.0",Ts}var Dp;function iA(){if(Dp)return Zc.exports;Dp=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(a){console.error(a)}}return i(),Zc.exports=nA(),Zc.exports}var aA=iA(),Wc={exports:{}},Cs={};var Rp;function sA(){if(Rp)return Cs;Rp=1;var i=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function l(r,u,h){var f=null;if(h!==void 0&&(f=""+h),u.key!==void 0&&(f=""+u.key),"key"in u){h={};for(var p in u)p!=="key"&&(h[p]=u[p])}else h=u;return u=h.ref,{$$typeof:i,type:r,key:f,ref:u!==void 0?u:null,props:h}}return Cs.Fragment=a,Cs.jsx=l,Cs.jsxs=l,Cs}var Bp;function lA(){return Bp||(Bp=1,Wc.exports=sA()),Wc.exports}var Ot=lA();const oA="/assets/logo-DGPRgII2.png",lg=ct.createContext({});function rA(i){const a=ct.useRef(null);return a.current===null&&(a.current=i()),a.current}const Vu=typeof window<"u",cA=Vu?ct.useLayoutEffect:ct.useEffect,Hu=ct.createContext(null);function ju(i,a){i.indexOf(a)===-1&&i.push(a)}function Yu(i,a){const l=i.indexOf(a);l>-1&&i.splice(l,1)}const Dn=(i,a,l)=>l>a?a:l<i?i:l;let qu=()=>{};const Rn={},og=i=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(i);function rg(i){return typeof i=="object"&&i!==null}const cg=i=>/^0[^.\s]+$/u.test(i);function Gu(i){let a;return()=>(a===void 0&&(a=i()),a)}const Ze=i=>i,uA=(i,a)=>l=>a(i(l)),qs=(...i)=>i.reduce(uA),ks=(i,a,l)=>{const r=a-i;return r===0?1:(l-i)/r};class Qu{constructor(){this.subscriptions=[]}add(a){return ju(this.subscriptions,a),()=>Yu(this.subscriptions,a)}notify(a,l,r){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,l,r);else for(let h=0;h<u;h++){const f=this.subscriptions[h];f&&f(a,l,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const on=i=>i*1e3,_e=i=>i/1e3;function ug(i,a){return a?i*(1e3/a):0}const dg=(i,a,l)=>(((1-3*l+3*a)*i+(3*l-6*a))*i+3*a)*i,dA=1e-7,fA=12;function hA(i,a,l,r,u){let h,f,p=0;do f=a+(l-a)/2,h=dg(f,r,u)-i,h>0?l=f:a=f;while(Math.abs(h)>dA&&++p<fA);return f}function Gs(i,a,l,r){if(i===a&&l===r)return Ze;const u=h=>hA(h,0,1,i,l);return h=>h===0||h===1?h:dg(u(h),a,r)}const fg=i=>a=>a<=.5?i(2*a)/2:(2-i(2*(1-a)))/2,hg=i=>a=>1-i(1-a),mg=Gs(.33,1.53,.69,.99),Xu=hg(mg),pg=fg(Xu),vg=i=>(i*=2)<1?.5*Xu(i):.5*(2-Math.pow(2,-10*(i-1))),Ju=i=>1-Math.sin(Math.acos(i)),gg=hg(Ju),yg=fg(Ju),mA=Gs(.42,0,1,1),pA=Gs(0,0,.58,1),bg=Gs(.42,0,.58,1),vA=i=>Array.isArray(i)&&typeof i[0]!="number",Ag=i=>Array.isArray(i)&&typeof i[0]=="number",gA={linear:Ze,easeIn:mA,easeInOut:bg,easeOut:pA,circIn:Ju,circInOut:yg,circOut:gg,backIn:Xu,backInOut:pg,backOut:mg,anticipate:vg},yA=i=>typeof i=="string",Np=i=>{if(Ag(i)){qu(i.length===4);const[a,l,r,u]=i;return Gs(a,l,r,u)}else if(yA(i))return gA[i];return i},co=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function bA(i,a){let l=new Set,r=new Set,u=!1,h=!1;const f=new WeakSet;let p={delta:0,timestamp:0,isProcessing:!1};function v(y){f.has(y)&&(m.schedule(y),i()),y(p)}const m={schedule:(y,b=!1,T=!1)=>{const H=T&&u?l:r;return b&&f.add(y),H.has(y)||H.add(y),y},cancel:y=>{r.delete(y),f.delete(y)},process:y=>{if(p=y,u){h=!0;return}u=!0,[l,r]=[r,l],l.forEach(v),l.clear(),u=!1,h&&(h=!1,m.process(y))}};return m}const AA=40;function Sg(i,a){let l=!1,r=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>l=!0,f=co.reduce((q,it)=>(q[it]=bA(h),q),{}),{setup:p,read:v,resolveKeyframes:m,preUpdate:y,update:b,preRender:T,render:O,postRender:H}=f,Q=()=>{const q=Rn.useManualTiming?u.timestamp:performance.now();l=!1,Rn.useManualTiming||(u.delta=r?1e3/60:Math.max(Math.min(q-u.timestamp,AA),1)),u.timestamp=q,u.isProcessing=!0,p.process(u),v.process(u),m.process(u),y.process(u),b.process(u),T.process(u),O.process(u),H.process(u),u.isProcessing=!1,l&&a&&(r=!1,i(Q))},J=()=>{l=!0,r=!0,u.isProcessing||i(Q)};return{schedule:co.reduce((q,it)=>{const W=f[it];return q[it]=(lt,$=!1,et=!1)=>(l||J(),W.schedule(lt,$,et)),q},{}),cancel:q=>{for(let it=0;it<co.length;it++)f[co[it]].cancel(q)},state:u,steps:f}}const{schedule:Lt,cancel:ai,state:re,steps:$c}=Sg(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ze,!0);let ho;function SA(){ho=void 0}const Te={now:()=>(ho===void 0&&Te.set(re.isProcessing||Rn.useManualTiming?re.timestamp:performance.now()),ho),set:i=>{ho=i,queueMicrotask(SA)}},xg=i=>a=>typeof a=="string"&&a.startsWith(i),Ku=xg("--"),xA=xg("var(--"),_u=i=>xA(i)?TA.test(i.split("/*")[0].trim()):!1,TA=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,Ma={test:i=>typeof i=="number",parse:parseFloat,transform:i=>i},zs={...Ma,transform:i=>Dn(0,1,i)},uo={...Ma,default:1},Ms=i=>Math.round(i*1e5)/1e5,Zu=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function CA(i){return i==null}const EA=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Pu=(i,a)=>l=>!!(typeof l=="string"&&EA.test(l)&&l.startsWith(i)||a&&!CA(l)&&Object.prototype.hasOwnProperty.call(l,a)),Tg=(i,a,l)=>r=>{if(typeof r!="string")return r;const[u,h,f,p]=r.match(Zu);return{[i]:parseFloat(u),[a]:parseFloat(h),[l]:parseFloat(f),alpha:p!==void 0?parseFloat(p):1}},wA=i=>Dn(0,255,i),tu={...Ma,transform:i=>Math.round(wA(i))},Ri={test:Pu("rgb","red"),parse:Tg("red","green","blue"),transform:({red:i,green:a,blue:l,alpha:r=1})=>"rgba("+tu.transform(i)+", "+tu.transform(a)+", "+tu.transform(l)+", "+Ms(zs.transform(r))+")"};function MA(i){let a="",l="",r="",u="";return i.length>5?(a=i.substring(1,3),l=i.substring(3,5),r=i.substring(5,7),u=i.substring(7,9)):(a=i.substring(1,2),l=i.substring(2,3),r=i.substring(3,4),u=i.substring(4,5),a+=a,l+=l,r+=r,u+=u),{red:parseInt(a,16),green:parseInt(l,16),blue:parseInt(r,16),alpha:u?parseInt(u,16)/255:1}}const mu={test:Pu("#"),parse:MA,transform:Ri.transform},Qs=i=>({test:a=>typeof a=="string"&&a.endsWith(i)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${i}`}),ni=Qs("deg"),rn=Qs("%"),at=Qs("px"),DA=Qs("vh"),RA=Qs("vw"),Up={...rn,parse:i=>rn.parse(i)/100,transform:i=>rn.transform(i*100)},ba={test:Pu("hsl","hue"),parse:Tg("hue","saturation","lightness"),transform:({hue:i,saturation:a,lightness:l,alpha:r=1})=>"hsla("+Math.round(i)+", "+rn.transform(Ms(a))+", "+rn.transform(Ms(l))+", "+Ms(zs.transform(r))+")"},Ft={test:i=>Ri.test(i)||mu.test(i)||ba.test(i),parse:i=>Ri.test(i)?Ri.parse(i):ba.test(i)?ba.parse(i):mu.parse(i),transform:i=>typeof i=="string"?i:i.hasOwnProperty("red")?Ri.transform(i):ba.transform(i),getAnimatableNone:i=>{const a=Ft.parse(i);return a.alpha=0,Ft.transform(a)}},BA=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function NA(i){return isNaN(i)&&typeof i=="string"&&(i.match(Zu)?.length||0)+(i.match(BA)?.length||0)>0}const Cg="number",Eg="color",UA="var",kA="var(",kp="${}",zA=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Os(i){const a=i.toString(),l=[],r={color:[],number:[],var:[]},u=[];let h=0;const p=a.replace(zA,v=>(Ft.test(v)?(r.color.push(h),u.push(Eg),l.push(Ft.parse(v))):v.startsWith(kA)?(r.var.push(h),u.push(UA),l.push(v)):(r.number.push(h),u.push(Cg),l.push(parseFloat(v))),++h,kp)).split(kp);return{values:l,split:p,indexes:r,types:u}}function wg(i){return Os(i).values}function Mg(i){const{split:a,types:l}=Os(i),r=a.length;return u=>{let h="";for(let f=0;f<r;f++)if(h+=a[f],u[f]!==void 0){const p=l[f];p===Cg?h+=Ms(u[f]):p===Eg?h+=Ft.transform(u[f]):h+=u[f]}return h}}const OA=i=>typeof i=="number"?0:Ft.test(i)?Ft.getAnimatableNone(i):i;function LA(i){const a=wg(i);return Mg(i)(a.map(OA))}const si={test:NA,parse:wg,createTransformer:Mg,getAnimatableNone:LA};function eu(i,a,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?i+(a-i)*6*l:l<1/2?a:l<2/3?i+(a-i)*(2/3-l)*6:i}function VA({hue:i,saturation:a,lightness:l,alpha:r}){i/=360,a/=100,l/=100;let u=0,h=0,f=0;if(!a)u=h=f=l;else{const p=l<.5?l*(1+a):l+a-l*a,v=2*l-p;u=eu(v,p,i+1/3),h=eu(v,p,i),f=eu(v,p,i-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:r}}function bo(i,a){return l=>l>0?a:i}const Ht=(i,a,l)=>i+(a-i)*l,nu=(i,a,l)=>{const r=i*i,u=l*(a*a-r)+r;return u<0?0:Math.sqrt(u)},HA=[mu,Ri,ba],jA=i=>HA.find(a=>a.test(i));function zp(i){const a=jA(i);if(!a)return!1;let l=a.parse(i);return a===ba&&(l=VA(l)),l}const Op=(i,a)=>{const l=zp(i),r=zp(a);if(!l||!r)return bo(i,a);const u={...l};return h=>(u.red=nu(l.red,r.red,h),u.green=nu(l.green,r.green,h),u.blue=nu(l.blue,r.blue,h),u.alpha=Ht(l.alpha,r.alpha,h),Ri.transform(u))},pu=new Set(["none","hidden"]);function YA(i,a){return pu.has(i)?l=>l<=0?i:a:l=>l>=1?a:i}function qA(i,a){return l=>Ht(i,a,l)}function Fu(i){return typeof i=="number"?qA:typeof i=="string"?_u(i)?bo:Ft.test(i)?Op:XA:Array.isArray(i)?Dg:typeof i=="object"?Ft.test(i)?Op:GA:bo}function Dg(i,a){const l=[...i],r=l.length,u=i.map((h,f)=>Fu(h)(h,a[f]));return h=>{for(let f=0;f<r;f++)l[f]=u[f](h);return l}}function GA(i,a){const l={...i,...a},r={};for(const u in l)i[u]!==void 0&&a[u]!==void 0&&(r[u]=Fu(i[u])(i[u],a[u]));return u=>{for(const h in r)l[h]=r[h](u);return l}}function QA(i,a){const l=[],r={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],f=i.indexes[h][r[h]],p=i.values[f]??0;l[u]=p,r[h]++}return l}const XA=(i,a)=>{const l=si.createTransformer(a),r=Os(i),u=Os(a);return r.indexes.var.length===u.indexes.var.length&&r.indexes.color.length===u.indexes.color.length&&r.indexes.number.length>=u.indexes.number.length?pu.has(i)&&!u.values.length||pu.has(a)&&!r.values.length?YA(i,a):qs(Dg(QA(r,u),u.values),l):bo(i,a)};function Rg(i,a,l){return typeof i=="number"&&typeof a=="number"&&typeof l=="number"?Ht(i,a,l):Fu(i)(i,a)}const JA=i=>{const a=({timestamp:l})=>i(l);return{start:(l=!0)=>Lt.update(a,l),stop:()=>ai(a),now:()=>re.isProcessing?re.timestamp:Te.now()}},Bg=(i,a,l=10)=>{let r="";const u=Math.max(Math.round(a/l),2);for(let h=0;h<u;h++)r+=Math.round(i(h/(u-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},Ao=2e4;function Iu(i){let a=0;const l=50;let r=i.next(a);for(;!r.done&&a<Ao;)a+=l,r=i.next(a);return a>=Ao?1/0:a}function KA(i,a=100,l){const r=l({...i,keyframes:[0,a]}),u=Math.min(Iu(r),Ao);return{type:"keyframes",ease:h=>r.next(u*h).value/a,duration:_e(u)}}const _A=5;function Ng(i,a,l){const r=Math.max(a-_A,0);return ug(l-i(r),a-r)}const qt={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},iu=.001;function ZA({duration:i=qt.duration,bounce:a=qt.bounce,velocity:l=qt.velocity,mass:r=qt.mass}){let u,h,f=1-a;f=Dn(qt.minDamping,qt.maxDamping,f),i=Dn(qt.minDuration,qt.maxDuration,_e(i)),f<1?(u=m=>{const y=m*f,b=y*i,T=y-l,O=vu(m,f),H=Math.exp(-b);return iu-T/O*H},h=m=>{const b=m*f*i,T=b*l+l,O=Math.pow(f,2)*Math.pow(m,2)*i,H=Math.exp(-b),Q=vu(Math.pow(m,2),f);return(-u(m)+iu>0?-1:1)*((T-O)*H)/Q}):(u=m=>{const y=Math.exp(-m*i),b=(m-l)*i+1;return-iu+y*b},h=m=>{const y=Math.exp(-m*i),b=(l-m)*(i*i);return y*b});const p=5/i,v=FA(u,h,p);if(i=on(i),isNaN(v))return{stiffness:qt.stiffness,damping:qt.damping,duration:i};{const m=Math.pow(v,2)*r;return{stiffness:m,damping:f*2*Math.sqrt(r*m),duration:i}}}const PA=12;function FA(i,a,l){let r=l;for(let u=1;u<PA;u++)r=r-i(r)/a(r);return r}function vu(i,a){return i*Math.sqrt(1-a*a)}const IA=["duration","bounce"],WA=["stiffness","damping","mass"];function Lp(i,a){return a.some(l=>i[l]!==void 0)}function $A(i){let a={velocity:qt.velocity,stiffness:qt.stiffness,damping:qt.damping,mass:qt.mass,isResolvedFromDuration:!1,...i};if(!Lp(i,WA)&&Lp(i,IA))if(i.visualDuration){const l=i.visualDuration,r=2*Math.PI/(l*1.2),u=r*r,h=2*Dn(.05,1,1-(i.bounce||0))*Math.sqrt(u);a={...a,mass:qt.mass,stiffness:u,damping:h}}else{const l=ZA(i);a={...a,...l,mass:qt.mass},a.isResolvedFromDuration=!0}return a}function So(i=qt.visualDuration,a=qt.bounce){const l=typeof i!="object"?{visualDuration:i,keyframes:[0,1],bounce:a}:i;let{restSpeed:r,restDelta:u}=l;const h=l.keyframes[0],f=l.keyframes[l.keyframes.length-1],p={done:!1,value:h},{stiffness:v,damping:m,mass:y,duration:b,velocity:T,isResolvedFromDuration:O}=$A({...l,velocity:-_e(l.velocity||0)}),H=T||0,Q=m/(2*Math.sqrt(v*y)),J=f-h,Y=_e(Math.sqrt(v/y)),P=Math.abs(J)<5;r||(r=P?qt.restSpeed.granular:qt.restSpeed.default),u||(u=P?qt.restDelta.granular:qt.restDelta.default);let q;if(Q<1){const W=vu(Y,Q);q=lt=>{const $=Math.exp(-Q*Y*lt);return f-$*((H+Q*Y*J)/W*Math.sin(W*lt)+J*Math.cos(W*lt))}}else if(Q===1)q=W=>f-Math.exp(-Y*W)*(J+(H+Y*J)*W);else{const W=Y*Math.sqrt(Q*Q-1);q=lt=>{const $=Math.exp(-Q*Y*lt),et=Math.min(W*lt,300);return f-$*((H+Q*Y*J)*Math.sinh(et)+W*J*Math.cosh(et))/W}}const it={calculatedDuration:O&&b||null,next:W=>{const lt=q(W);if(O)p.done=W>=b;else{let $=W===0?H:0;Q<1&&($=W===0?on(H):Ng(q,W,lt));const et=Math.abs($)<=r,Ct=Math.abs(f-lt)<=u;p.done=et&&Ct}return p.value=p.done?f:lt,p},toString:()=>{const W=Math.min(Iu(it),Ao),lt=Bg($=>it.next(W*$).value,W,30);return W+"ms "+lt},toTransition:()=>{}};return it}So.applyToOptions=i=>{const a=KA(i,100,So);return i.ease=a.ease,i.duration=on(a.duration),i.type="keyframes",i};function gu({keyframes:i,velocity:a=0,power:l=.8,timeConstant:r=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:f,min:p,max:v,restDelta:m=.5,restSpeed:y}){const b=i[0],T={done:!1,value:b},O=et=>p!==void 0&&et<p||v!==void 0&&et>v,H=et=>p===void 0?v:v===void 0||Math.abs(p-et)<Math.abs(v-et)?p:v;let Q=l*a;const J=b+Q,Y=f===void 0?J:f(J);Y!==J&&(Q=Y-b);const P=et=>-Q*Math.exp(-et/r),q=et=>Y+P(et),it=et=>{const Ct=P(et),Vt=q(et);T.done=Math.abs(Ct)<=m,T.value=T.done?Y:Vt};let W,lt;const $=et=>{O(T.value)&&(W=et,lt=So({keyframes:[T.value,H(T.value)],velocity:Ng(q,et,T.value),damping:u,stiffness:h,restDelta:m,restSpeed:y}))};return $(0),{calculatedDuration:null,next:et=>{let Ct=!1;return!lt&&W===void 0&&(Ct=!0,it(et),$(et)),W!==void 0&&et>=W?lt.next(et-W):(!Ct&&it(et),T)}}}function t2(i,a,l){const r=[],u=l||Rn.mix||Rg,h=i.length-1;for(let f=0;f<h;f++){let p=u(i[f],i[f+1]);if(a){const v=Array.isArray(a)?a[f]||Ze:a;p=qs(v,p)}r.push(p)}return r}function e2(i,a,{clamp:l=!0,ease:r,mixer:u}={}){const h=i.length;if(qu(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=i[0]===i[1];i[0]>i[h-1]&&(i=[...i].reverse(),a=[...a].reverse());const p=t2(a,r,u),v=p.length,m=y=>{if(f&&y<i[0])return a[0];let b=0;if(v>1)for(;b<i.length-2&&!(y<i[b+1]);b++);const T=ks(i[b],i[b+1],y);return p[b](T)};return l?y=>m(Dn(i[0],i[h-1],y)):m}function n2(i,a){const l=i[i.length-1];for(let r=1;r<=a;r++){const u=ks(0,a,r);i.push(Ht(l,1,u))}}function i2(i){const a=[0];return n2(a,i.length-1),a}function a2(i,a){return i.map(l=>l*a)}function s2(i,a){return i.map(()=>a||bg).splice(0,i.length-1)}function Ds({duration:i=300,keyframes:a,times:l,ease:r="easeInOut"}){const u=vA(r)?r.map(Np):Np(r),h={done:!1,value:a[0]},f=a2(l&&l.length===a.length?l:i2(a),i),p=e2(f,a,{ease:Array.isArray(u)?u:s2(a,u)});return{calculatedDuration:i,next:v=>(h.value=p(v),h.done=v>=i,h)}}const l2=i=>i!==null;function Wu(i,{repeat:a,repeatType:l="loop"},r,u=1){const h=i.filter(l2),p=u<0||a&&l!=="loop"&&a%2===1?0:h.length-1;return!p||r===void 0?h[p]:r}const o2={decay:gu,inertia:gu,tween:Ds,keyframes:Ds,spring:So};function Ug(i){typeof i.type=="string"&&(i.type=o2[i.type])}class $u{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,l){return this.finished.then(a,l)}}const r2=i=>i/100;class td extends $u{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=()=>{const{motionValue:l}=this.options;l&&l.updatedAt!==Te.now()&&this.tick(Te.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Ug(a);const{type:l=Ds,repeat:r=0,repeatDelay:u=0,repeatType:h,velocity:f=0}=a;let{keyframes:p}=a;const v=l||Ds;v!==Ds&&typeof p[0]!="number"&&(this.mixKeyframes=qs(r2,Rg(p[0],p[1])),p=[0,100]);const m=v({...a,keyframes:p});h==="mirror"&&(this.mirroredGenerator=v({...a,keyframes:[...p].reverse(),velocity:-f})),m.calculatedDuration===null&&(m.calculatedDuration=Iu(m));const{calculatedDuration:y}=m;this.calculatedDuration=y,this.resolvedDuration=y+u,this.totalDuration=this.resolvedDuration*(r+1)-u,this.generator=m}updateTime(a){const l=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=l}tick(a,l=!1){const{generator:r,totalDuration:u,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:p,calculatedDuration:v}=this;if(this.startTime===null)return r.next(0);const{delay:m=0,keyframes:y,repeat:b,repeatType:T,repeatDelay:O,type:H,onUpdate:Q,finalKeyframe:J}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),l?this.currentTime=a:this.updateTime(a);const Y=this.currentTime-m*(this.playbackSpeed>=0?1:-1),P=this.playbackSpeed>=0?Y<0:Y>u;this.currentTime=Math.max(Y,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let q=this.currentTime,it=r;if(b){const et=Math.min(this.currentTime,u)/p;let Ct=Math.floor(et),Vt=et%1;!Vt&&et>=1&&(Vt=1),Vt===1&&Ct--,Ct=Math.min(Ct,b+1),!!(Ct%2)&&(T==="reverse"?(Vt=1-Vt,O&&(Vt-=O/p)):T==="mirror"&&(it=f)),q=Dn(0,1,Vt)*p}const W=P?{done:!1,value:y[0]}:it.next(q);h&&(W.value=h(W.value));let{done:lt}=W;!P&&v!==null&&(lt=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const $=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&lt);return $&&H!==gu&&(W.value=Wu(y,this.options,J,this.speed)),Q&&Q(W.value),$&&this.finish(),W}then(a,l){return this.finished.then(a,l)}get duration(){return _e(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+_e(a)}get time(){return _e(this.currentTime)}set time(a){a=on(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?.start(!1)}get speed(){return this.playbackSpeed}set speed(a){this.updateTime(Te.now());const l=this.playbackSpeed!==a;this.playbackSpeed=a,l&&(this.time=_e(this.currentTime))}play(){if(this.isStopped)return;const{driver:a=JA,startTime:l}=this.options;this.driver||(this.driver=a(u=>this.tick(u))),this.options.onPlay?.();const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=l??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(Te.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),a.observe(this)}}function c2(i){for(let a=1;a<i.length;a++)i[a]??(i[a]=i[a-1])}const Bi=i=>i*180/Math.PI,yu=i=>{const a=Bi(Math.atan2(i[1],i[0]));return bu(a)},u2={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:i=>(Math.abs(i[0])+Math.abs(i[3]))/2,rotate:yu,rotateZ:yu,skewX:i=>Bi(Math.atan(i[1])),skewY:i=>Bi(Math.atan(i[2])),skew:i=>(Math.abs(i[1])+Math.abs(i[2]))/2},bu=i=>(i=i%360,i<0&&(i+=360),i),Vp=yu,Hp=i=>Math.sqrt(i[0]*i[0]+i[1]*i[1]),jp=i=>Math.sqrt(i[4]*i[4]+i[5]*i[5]),d2={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Hp,scaleY:jp,scale:i=>(Hp(i)+jp(i))/2,rotateX:i=>bu(Bi(Math.atan2(i[6],i[5]))),rotateY:i=>bu(Bi(Math.atan2(-i[2],i[0]))),rotateZ:Vp,rotate:Vp,skewX:i=>Bi(Math.atan(i[4])),skewY:i=>Bi(Math.atan(i[1])),skew:i=>(Math.abs(i[1])+Math.abs(i[4]))/2};function Au(i){return i.includes("scale")?1:0}function Su(i,a){if(!i||i==="none")return Au(a);const l=i.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,u;if(l)r=d2,u=l;else{const p=i.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=u2,u=p}if(!u)return Au(a);const h=r[a],f=u[1].split(",").map(h2);return typeof h=="function"?h(f):f[h]}const f2=(i,a)=>{const{transform:l="none"}=getComputedStyle(i);return Su(l,a)};function h2(i){return parseFloat(i.trim())}const Da=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Ra=new Set(Da),Yp=i=>i===Ma||i===at,m2=new Set(["x","y","z"]),p2=Da.filter(i=>!m2.has(i));function v2(i){const a=[];return p2.forEach(l=>{const r=i.getValue(l);r!==void 0&&(a.push([l,r.get()]),r.set(l.startsWith("scale")?1:0))}),a}const Ui={width:({x:i},{paddingLeft:a="0",paddingRight:l="0"})=>i.max-i.min-parseFloat(a)-parseFloat(l),height:({y:i},{paddingTop:a="0",paddingBottom:l="0"})=>i.max-i.min-parseFloat(a)-parseFloat(l),top:(i,{top:a})=>parseFloat(a),left:(i,{left:a})=>parseFloat(a),bottom:({y:i},{top:a})=>parseFloat(a)+(i.max-i.min),right:({x:i},{left:a})=>parseFloat(a)+(i.max-i.min),x:(i,{transform:a})=>Su(a,"x"),y:(i,{transform:a})=>Su(a,"y")};Ui.translateX=Ui.x;Ui.translateY=Ui.y;const ki=new Set;let xu=!1,Tu=!1,Cu=!1;function kg(){if(Tu){const i=Array.from(ki).filter(r=>r.needsMeasurement),a=new Set(i.map(r=>r.element)),l=new Map;a.forEach(r=>{const u=v2(r);u.length&&(l.set(r,u),r.render())}),i.forEach(r=>r.measureInitialState()),a.forEach(r=>{r.render();const u=l.get(r);u&&u.forEach(([h,f])=>{r.getValue(h)?.set(f)})}),i.forEach(r=>r.measureEndState()),i.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Tu=!1,xu=!1,ki.forEach(i=>i.complete(Cu)),ki.clear()}function zg(){ki.forEach(i=>{i.readKeyframes(),i.needsMeasurement&&(Tu=!0)})}function g2(){Cu=!0,zg(),kg(),Cu=!1}class ed{constructor(a,l,r,u,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=l,this.name=r,this.motionValue=u,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(ki.add(this),xu||(xu=!0,Lt.read(zg),Lt.resolveKeyframes(kg))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:l,element:r,motionValue:u}=this;if(a[0]===null){const h=u?.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(r&&l){const p=r.readValue(l,f);p!=null&&(a[0]=p)}a[0]===void 0&&(a[0]=f),u&&h===void 0&&u.set(a[0])}c2(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),ki.delete(this)}cancel(){this.state==="scheduled"&&(ki.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const y2=i=>i.startsWith("--");function b2(i,a,l){y2(a)?i.style.setProperty(a,l):i.style[a]=l}const A2=Gu(()=>window.ScrollTimeline!==void 0),S2={};function x2(i,a){const l=Gu(i);return()=>S2[a]??l()}const Og=x2(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),ws=([i,a,l,r])=>`cubic-bezier(${i}, ${a}, ${l}, ${r})`,qp={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:ws([0,.65,.55,1]),circOut:ws([.55,0,1,.45]),backIn:ws([.31,.01,.66,-.59]),backOut:ws([.33,1.53,.69,.99])};function Lg(i,a){if(i)return typeof i=="function"?Og()?Bg(i,a):"ease-out":Ag(i)?ws(i):Array.isArray(i)?i.map(l=>Lg(l,a)||qp.easeOut):qp[i]}function T2(i,a,l,{delay:r=0,duration:u=300,repeat:h=0,repeatType:f="loop",ease:p="easeOut",times:v}={},m=void 0){const y={[a]:l};v&&(y.offset=v);const b=Lg(p,u);Array.isArray(b)&&(y.easing=b);const T={delay:r,duration:u,easing:Array.isArray(b)?"linear":b,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return m&&(T.pseudoElement=m),i.animate(y,T)}function Vg(i){return typeof i=="function"&&"applyToOptions"in i}function C2({type:i,...a}){return Vg(i)&&Og()?i.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class E2 extends $u{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,!a)return;const{element:l,name:r,keyframes:u,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:p,onComplete:v}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,qu(typeof a.type!="string");const m=C2(a);this.animation=T2(l,r,u,m,h),m.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const y=Wu(u,this.options,p,this.speed);this.updateMotionValue?this.updateMotionValue(y):b2(l,r,y),this.animation.cancel()}v?.(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){this.isPseudoElement||this.animation.commitStyles?.()}get duration(){const a=this.animation.effect?.getComputedTiming?.().duration||0;return _e(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+_e(a)}get time(){return _e(Number(this.animation.currentTime)||0)}set time(a){this.finishedTime=null,this.animation.currentTime=on(a)}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(a){this.animation.startTime=a}attachTimeline({timeline:a,observe:l}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,a&&A2()?(this.animation.timeline=a,Ze):l(this)}}const Hg={anticipate:vg,backInOut:pg,circInOut:yg};function w2(i){return i in Hg}function M2(i){typeof i.ease=="string"&&w2(i.ease)&&(i.ease=Hg[i.ease])}const Gp=10;class D2 extends E2{constructor(a){M2(a),Ug(a),super(a),a.startTime&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:l,onUpdate:r,onComplete:u,element:h,...f}=this.options;if(!l)return;if(a!==void 0){l.set(a);return}const p=new td({...f,autoplay:!1}),v=on(this.finishedTime??this.time);l.setWithVelocity(p.sample(v-Gp).value,p.sample(v).value,Gp),p.stop()}}const Qp=(i,a)=>a==="zIndex"?!1:!!(typeof i=="number"||Array.isArray(i)||typeof i=="string"&&(si.test(i)||i==="0")&&!i.startsWith("url("));function R2(i){const a=i[0];if(i.length===1)return!0;for(let l=0;l<i.length;l++)if(i[l]!==a)return!0}function B2(i,a,l,r){const u=i[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=i[i.length-1],f=Qp(u,a),p=Qp(h,a);return!f||!p?!1:R2(i)||(l==="spring"||Vg(l))&&r}function Eu(i){i.duration=0,i.type="keyframes"}const N2=new Set(["opacity","clipPath","filter","transform"]),U2=Gu(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function k2(i){const{motionValue:a,name:l,repeatDelay:r,repeatType:u,damping:h,type:f}=i;if(!(a?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:v,transformTemplate:m}=a.owner.getProps();return U2()&&l&&N2.has(l)&&(l!=="transform"||!m)&&!v&&!r&&u!=="mirror"&&h!==0&&f!=="inertia"}const z2=40;class O2 extends $u{constructor({autoplay:a=!0,delay:l=0,type:r="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:f="loop",keyframes:p,name:v,motionValue:m,element:y,...b}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=Te.now();const T={autoplay:a,delay:l,type:r,repeat:u,repeatDelay:h,repeatType:f,name:v,motionValue:m,element:y,...b},O=y?.KeyframeResolver||ed;this.keyframeResolver=new O(p,(H,Q,J)=>this.onKeyframesResolved(H,Q,T,!J),v,m,y),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(a,l,r,u){this.keyframeResolver=void 0;const{name:h,type:f,velocity:p,delay:v,isHandoff:m,onUpdate:y}=r;this.resolvedAt=Te.now(),B2(a,h,f,p)||((Rn.instantAnimations||!v)&&y?.(Wu(a,r,l)),a[0]=a[a.length-1],Eu(r),r.repeat=0);const T={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>z2?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:l,...r,keyframes:a},O=!m&&k2(T)?new D2({...T,element:T.motionValue.owner.current}):new td(T);O.finished.then(()=>this.notifyFinished()).catch(Ze),this.pendingTimeline&&(this.stopTimeline=O.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=O}get finished(){return this._animation?this.animation.finished:this._finished}then(a,l){return this.finished.finally(a).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),g2()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}const L2=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function V2(i){const a=L2.exec(i);if(!a)return[,];const[,l,r,u]=a;return[`--${l??r}`,u]}function jg(i,a,l=1){const[r,u]=V2(i);if(!r)return;const h=window.getComputedStyle(a).getPropertyValue(r);if(h){const f=h.trim();return og(f)?parseFloat(f):f}return _u(u)?jg(u,a,l+1):u}function nd(i,a){return i?.[a]??i?.default??i}const Yg=new Set(["width","height","top","left","right","bottom",...Da]),H2={test:i=>i==="auto",parse:i=>i},qg=i=>a=>a.test(i),Gg=[Ma,at,rn,ni,RA,DA,H2],Xp=i=>Gg.find(qg(i));function j2(i){return typeof i=="number"?i===0:i!==null?i==="none"||i==="0"||cg(i):!0}const Y2=new Set(["brightness","contrast","saturate","opacity"]);function q2(i){const[a,l]=i.slice(0,-1).split("(");if(a==="drop-shadow")return i;const[r]=l.match(Zu)||[];if(!r)return i;const u=l.replace(r,"");let h=Y2.has(a)?1:0;return r!==l&&(h*=100),a+"("+h+u+")"}const G2=/\b([a-z-]*)\(.*?\)/gu,wu={...si,getAnimatableNone:i=>{const a=i.match(G2);return a?a.map(q2).join(" "):i}},Jp={...Ma,transform:Math.round},Q2={rotate:ni,rotateX:ni,rotateY:ni,rotateZ:ni,scale:uo,scaleX:uo,scaleY:uo,scaleZ:uo,skew:ni,skewX:ni,skewY:ni,distance:at,translateX:at,translateY:at,translateZ:at,x:at,y:at,z:at,perspective:at,transformPerspective:at,opacity:zs,originX:Up,originY:Up,originZ:at},id={borderWidth:at,borderTopWidth:at,borderRightWidth:at,borderBottomWidth:at,borderLeftWidth:at,borderRadius:at,radius:at,borderTopLeftRadius:at,borderTopRightRadius:at,borderBottomRightRadius:at,borderBottomLeftRadius:at,width:at,maxWidth:at,height:at,maxHeight:at,top:at,right:at,bottom:at,left:at,padding:at,paddingTop:at,paddingRight:at,paddingBottom:at,paddingLeft:at,margin:at,marginTop:at,marginRight:at,marginBottom:at,marginLeft:at,backgroundPositionX:at,backgroundPositionY:at,...Q2,zIndex:Jp,fillOpacity:zs,strokeOpacity:zs,numOctaves:Jp},X2={...id,color:Ft,backgroundColor:Ft,outlineColor:Ft,fill:Ft,stroke:Ft,borderColor:Ft,borderTopColor:Ft,borderRightColor:Ft,borderBottomColor:Ft,borderLeftColor:Ft,filter:wu,WebkitFilter:wu},Qg=i=>X2[i];function Xg(i,a){let l=Qg(i);return l!==wu&&(l=si),l.getAnimatableNone?l.getAnimatableNone(a):void 0}const J2=new Set(["auto","none","0"]);function K2(i,a,l){let r=0,u;for(;r<i.length&&!u;){const h=i[r];typeof h=="string"&&!J2.has(h)&&Os(h).values.length&&(u=i[r]),r++}if(u&&l)for(const h of a)i[h]=Xg(l,u)}class _2 extends ed{constructor(a,l,r,u,h){super(a,l,r,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:l,name:r}=this;if(!l||!l.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let m=a[v];if(typeof m=="string"&&(m=m.trim(),_u(m))){const y=jg(m,l.current);y!==void 0&&(a[v]=y),v===a.length-1&&(this.finalKeyframe=m)}}if(this.resolveNoneKeyframes(),!Yg.has(r)||a.length!==2)return;const[u,h]=a,f=Xp(u),p=Xp(h);if(f!==p)if(Yp(f)&&Yp(p))for(let v=0;v<a.length;v++){const m=a[v];typeof m=="string"&&(a[v]=parseFloat(m))}else Ui[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:l}=this,r=[];for(let u=0;u<a.length;u++)(a[u]===null||j2(a[u]))&&r.push(u);r.length&&K2(a,r,l)}measureInitialState(){const{element:a,unresolvedKeyframes:l,name:r}=this;if(!a||!a.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Ui[r](a.measureViewportBox(),window.getComputedStyle(a.current)),l[0]=this.measuredOrigin;const u=l[l.length-1];u!==void 0&&a.getValue(r,u).jump(u,!1)}measureEndState(){const{element:a,name:l,unresolvedKeyframes:r}=this;if(!a||!a.current)return;const u=a.getValue(l);u&&u.jump(this.measuredOrigin,!1);const h=r.length-1,f=r[h];r[h]=Ui[l](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),this.removedTransforms?.length&&this.removedTransforms.forEach(([p,v])=>{a.getValue(p).set(v)}),this.resolveNoneKeyframes()}}function Z2(i,a,l){if(i instanceof EventTarget)return[i];if(typeof i=="string"){let r=document;const u=l?.[i]??r.querySelectorAll(i);return u?Array.from(u):[]}return Array.from(i)}const Jg=(i,a)=>a&&typeof i=="number"?a.transform(i):i;function P2(i){return rg(i)&&"offsetHeight"in i}const Kp=30,F2=i=>!isNaN(parseFloat(i));class I2{constructor(a,l={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{const u=Te.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const h of this.dependents)h.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=l.owner}setCurrent(a){this.current=a,this.updatedAt=Te.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=F2(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,l){this.events[a]||(this.events[a]=new Qu);const r=this.events[a].add(l);return a==="change"?()=>{r(),Lt.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,l){this.passiveEffect=a,this.stopPassiveEffect=l}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,l,r){this.set(l),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-r}jump(a,l=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,l&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=Te.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>Kp)return 0;const l=Math.min(this.updatedAt-this.prevUpdatedAt,Kp);return ug(parseFloat(this.current)-parseFloat(this.prevFrameValue),l)}start(a){return this.stop(),new Promise(l=>{this.hasAnimated=!0,this.animation=a(l),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ea(i,a){return new I2(i,a)}const{schedule:ad}=Sg(queueMicrotask,!1),tn={x:!1,y:!1};function Kg(){return tn.x||tn.y}function W2(i){return i==="x"||i==="y"?tn[i]?null:(tn[i]=!0,()=>{tn[i]=!1}):tn.x||tn.y?null:(tn.x=tn.y=!0,()=>{tn.x=tn.y=!1})}function _g(i,a){const l=Z2(i),r=new AbortController,u={passive:!0,...a,signal:r.signal};return[l,u,()=>r.abort()]}function _p(i){return!(i.pointerType==="touch"||Kg())}function $2(i,a,l={}){const[r,u,h]=_g(i,l),f=p=>{if(!_p(p))return;const{target:v}=p,m=a(v,p);if(typeof m!="function"||!v)return;const y=b=>{_p(b)&&(m(b),v.removeEventListener("pointerleave",y))};v.addEventListener("pointerleave",y,u)};return r.forEach(p=>{p.addEventListener("pointerenter",f,u)}),h}const Zg=(i,a)=>a?i===a?!0:Zg(i,a.parentElement):!1,sd=i=>i.pointerType==="mouse"?typeof i.button!="number"||i.button<=0:i.isPrimary!==!1,tS=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function eS(i){return tS.has(i.tagName)||i.tabIndex!==-1}const mo=new WeakSet;function Zp(i){return a=>{a.key==="Enter"&&i(a)}}function au(i,a){i.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const nS=(i,a)=>{const l=i.currentTarget;if(!l)return;const r=Zp(()=>{if(mo.has(l))return;au(l,"down");const u=Zp(()=>{au(l,"up")}),h=()=>au(l,"cancel");l.addEventListener("keyup",u,a),l.addEventListener("blur",h,a)});l.addEventListener("keydown",r,a),l.addEventListener("blur",()=>l.removeEventListener("keydown",r),a)};function Pp(i){return sd(i)&&!Kg()}function iS(i,a,l={}){const[r,u,h]=_g(i,l),f=p=>{const v=p.currentTarget;if(!Pp(p))return;mo.add(v);const m=a(v,p),y=(O,H)=>{window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",T),mo.has(v)&&mo.delete(v),Pp(O)&&typeof m=="function"&&m(O,{success:H})},b=O=>{y(O,v===window||v===document||l.useGlobalTarget||Zg(v,O.target))},T=O=>{y(O,!1)};window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",T,u)};return r.forEach(p=>{(l.useGlobalTarget?window:p).addEventListener("pointerdown",f,u),P2(p)&&(p.addEventListener("focus",m=>nS(m,u)),!eS(p)&&!p.hasAttribute("tabindex")&&(p.tabIndex=0))}),h}function Pg(i){return rg(i)&&"ownerSVGElement"in i}function aS(i){return Pg(i)&&i.tagName==="svg"}const de=i=>!!(i&&i.getVelocity),sS=[...Gg,Ft,si],lS=i=>sS.find(qg(i)),Fg=ct.createContext({transformPagePoint:i=>i,isStatic:!1,reducedMotion:"never"});function oS(i=!0){const a=ct.useContext(Hu);if(a===null)return[!0,null];const{isPresent:l,onExitComplete:r,register:u}=a,h=ct.useId();ct.useEffect(()=>{if(i)return u(h)},[i]);const f=ct.useCallback(()=>i&&r&&r(h),[h,r,i]);return!l&&r?[!1,f]:[!0]}const Ig=ct.createContext({strict:!1}),Fp={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},wa={};for(const i in Fp)wa[i]={isEnabled:a=>Fp[i].some(l=>!!a[l])};function rS(i){for(const a in i)wa[a]={...wa[a],...i[a]}}const cS=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function xo(i){return i.startsWith("while")||i.startsWith("drag")&&i!=="draggable"||i.startsWith("layout")||i.startsWith("onTap")||i.startsWith("onPan")||i.startsWith("onLayout")||cS.has(i)}let Wg=i=>!xo(i);function uS(i){typeof i=="function"&&(Wg=a=>a.startsWith("on")?!xo(a):i(a))}try{uS(require("@emotion/is-prop-valid").default)}catch{}function dS(i,a,l){const r={};for(const u in i)u==="values"&&typeof i.values=="object"||(Wg(u)||l===!0&&xo(u)||!a&&!xo(u)||i.draggable&&u.startsWith("onDrag"))&&(r[u]=i[u]);return r}const Eo=ct.createContext({});function wo(i){return i!==null&&typeof i=="object"&&typeof i.start=="function"}function Ls(i){return typeof i=="string"||Array.isArray(i)}const ld=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],od=["initial",...ld];function Mo(i){return wo(i.animate)||od.some(a=>Ls(i[a]))}function $g(i){return!!(Mo(i)||i.variants)}function fS(i,a){if(Mo(i)){const{initial:l,animate:r}=i;return{initial:l===!1||Ls(l)?l:void 0,animate:Ls(r)?r:void 0}}return i.inherit!==!1?a:{}}function hS(i){const{initial:a,animate:l}=fS(i,ct.useContext(Eo));return ct.useMemo(()=>({initial:a,animate:l}),[Ip(a),Ip(l)])}function Ip(i){return Array.isArray(i)?i.join(" "):i}const Vs={};function mS(i){for(const a in i)Vs[a]=i[a],Ku(a)&&(Vs[a].isCSSVariable=!0)}function ty(i,{layout:a,layoutId:l}){return Ra.has(i)||i.startsWith("origin")||(a||l!==void 0)&&(!!Vs[i]||i==="opacity")}const pS={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},vS=Da.length;function gS(i,a,l){let r="",u=!0;for(let h=0;h<vS;h++){const f=Da[h],p=i[f];if(p===void 0)continue;let v=!0;if(typeof p=="number"?v=p===(f.startsWith("scale")?1:0):v=parseFloat(p)===0,!v||l){const m=Jg(p,id[f]);if(!v){u=!1;const y=pS[f]||f;r+=`${y}(${m}) `}l&&(a[f]=m)}}return r=r.trim(),l?r=l(a,u?"":r):u&&(r="none"),r}function rd(i,a,l){const{style:r,vars:u,transformOrigin:h}=i;let f=!1,p=!1;for(const v in a){const m=a[v];if(Ra.has(v)){f=!0;continue}else if(Ku(v)){u[v]=m;continue}else{const y=Jg(m,id[v]);v.startsWith("origin")?(p=!0,h[v]=y):r[v]=y}}if(a.transform||(f||l?r.transform=gS(a,i.transform,l):r.transform&&(r.transform="none")),p){const{originX:v="50%",originY:m="50%",originZ:y=0}=h;r.transformOrigin=`${v} ${m} ${y}`}}const cd=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function ey(i,a,l){for(const r in a)!de(a[r])&&!ty(r,l)&&(i[r]=a[r])}function yS({transformTemplate:i},a){return ct.useMemo(()=>{const l=cd();return rd(l,a,i),Object.assign({},l.vars,l.style)},[a])}function bS(i,a){const l=i.style||{},r={};return ey(r,l,i),Object.assign(r,yS(i,a)),r}function AS(i,a){const l={},r=bS(i,a);return i.drag&&i.dragListener!==!1&&(l.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=i.drag===!0?"none":`pan-${i.drag==="x"?"y":"x"}`),i.tabIndex===void 0&&(i.onTap||i.onTapStart||i.whileTap)&&(l.tabIndex=0),l.style=r,l}const SS={offset:"stroke-dashoffset",array:"stroke-dasharray"},xS={offset:"strokeDashoffset",array:"strokeDasharray"};function TS(i,a,l=1,r=0,u=!0){i.pathLength=1;const h=u?SS:xS;i[h.offset]=at.transform(-r);const f=at.transform(a),p=at.transform(l);i[h.array]=`${f} ${p}`}function ny(i,{attrX:a,attrY:l,attrScale:r,pathLength:u,pathSpacing:h=1,pathOffset:f=0,...p},v,m,y){if(rd(i,p,m),v){i.style.viewBox&&(i.attrs.viewBox=i.style.viewBox);return}i.attrs=i.style,i.style={};const{attrs:b,style:T}=i;b.transform&&(T.transform=b.transform,delete b.transform),(T.transform||b.transformOrigin)&&(T.transformOrigin=b.transformOrigin??"50% 50%",delete b.transformOrigin),T.transform&&(T.transformBox=y?.transformBox??"fill-box",delete b.transformBox),a!==void 0&&(b.x=a),l!==void 0&&(b.y=l),r!==void 0&&(b.scale=r),u!==void 0&&TS(b,u,h,f,!1)}const iy=()=>({...cd(),attrs:{}}),ay=i=>typeof i=="string"&&i.toLowerCase()==="svg";function CS(i,a,l,r){const u=ct.useMemo(()=>{const h=iy();return ny(h,a,ay(r),i.transformTemplate,i.style),{...h.attrs,style:{...h.style}}},[a]);if(i.style){const h={};ey(h,i.style,i),u.style={...h,...u.style}}return u}const ES=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function ud(i){return typeof i!="string"||i.includes("-")?!1:!!(ES.indexOf(i)>-1||/[A-Z]/u.test(i))}function wS(i,a,l,{latestValues:r},u,h=!1){const p=(ud(i)?CS:AS)(a,r,u,i),v=dS(a,typeof i=="string",h),m=i!==ct.Fragment?{...v,...p,ref:l}:{},{children:y}=a,b=ct.useMemo(()=>de(y)?y.get():y,[y]);return ct.createElement(i,{...m,children:b})}function Wp(i){const a=[{},{}];return i?.values.forEach((l,r)=>{a[0][r]=l.get(),a[1][r]=l.getVelocity()}),a}function dd(i,a,l,r){if(typeof a=="function"){const[u,h]=Wp(r);a=a(l!==void 0?l:i.custom,u,h)}if(typeof a=="string"&&(a=i.variants&&i.variants[a]),typeof a=="function"){const[u,h]=Wp(r);a=a(l!==void 0?l:i.custom,u,h)}return a}function po(i){return de(i)?i.get():i}function MS({scrapeMotionValuesFromProps:i,createRenderState:a},l,r,u){return{latestValues:DS(l,r,u,i),renderState:a()}}function DS(i,a,l,r){const u={},h=r(i,{});for(const T in h)u[T]=po(h[T]);let{initial:f,animate:p}=i;const v=Mo(i),m=$g(i);a&&m&&!v&&i.inherit!==!1&&(f===void 0&&(f=a.initial),p===void 0&&(p=a.animate));let y=l?l.initial===!1:!1;y=y||f===!1;const b=y?p:f;if(b&&typeof b!="boolean"&&!wo(b)){const T=Array.isArray(b)?b:[b];for(let O=0;O<T.length;O++){const H=dd(i,T[O]);if(H){const{transitionEnd:Q,transition:J,...Y}=H;for(const P in Y){let q=Y[P];if(Array.isArray(q)){const it=y?q.length-1:0;q=q[it]}q!==null&&(u[P]=q)}for(const P in Q)u[P]=Q[P]}}}return u}const sy=i=>(a,l)=>{const r=ct.useContext(Eo),u=ct.useContext(Hu),h=()=>MS(i,a,r,u);return l?h():rA(h)};function fd(i,a,l){const{style:r}=i,u={};for(const h in r)(de(r[h])||a.style&&de(a.style[h])||ty(h,i)||l?.getValue(h)?.liveStyle!==void 0)&&(u[h]=r[h]);return u}const RS=sy({scrapeMotionValuesFromProps:fd,createRenderState:cd});function ly(i,a,l){const r=fd(i,a,l);for(const u in i)if(de(i[u])||de(a[u])){const h=Da.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;r[h]=i[u]}return r}const BS=sy({scrapeMotionValuesFromProps:ly,createRenderState:iy}),NS=Symbol.for("motionComponentSymbol");function Aa(i){return i&&typeof i=="object"&&Object.prototype.hasOwnProperty.call(i,"current")}function US(i,a,l){return ct.useCallback(r=>{r&&i.onMount&&i.onMount(r),a&&(r?a.mount(r):a.unmount()),l&&(typeof l=="function"?l(r):Aa(l)&&(l.current=r))},[a])}const hd=i=>i.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),kS="framerAppearId",oy="data-"+hd(kS),ry=ct.createContext({});function zS(i,a,l,r,u){const{visualElement:h}=ct.useContext(Eo),f=ct.useContext(Ig),p=ct.useContext(Hu),v=ct.useContext(Fg).reducedMotion,m=ct.useRef(null);r=r||f.renderer,!m.current&&r&&(m.current=r(i,{visualState:a,parent:h,props:l,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v}));const y=m.current,b=ct.useContext(ry);y&&!y.projection&&u&&(y.type==="html"||y.type==="svg")&&OS(m.current,l,u,b);const T=ct.useRef(!1);ct.useInsertionEffect(()=>{y&&T.current&&y.update(l,p)});const O=l[oy],H=ct.useRef(!!O&&!window.MotionHandoffIsComplete?.(O)&&window.MotionHasOptimisedAnimation?.(O));return cA(()=>{y&&(T.current=!0,window.MotionIsMounted=!0,y.updateFeatures(),y.scheduleRenderMicrotask(),H.current&&y.animationState&&y.animationState.animateChanges())}),ct.useEffect(()=>{y&&(!H.current&&y.animationState&&y.animationState.animateChanges(),H.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(O)}),H.current=!1),y.enteringChildren=void 0)}),y}function OS(i,a,l,r){const{layoutId:u,layout:h,drag:f,dragConstraints:p,layoutScroll:v,layoutRoot:m,layoutCrossfade:y}=a;i.projection=new l(i.latestValues,a["data-framer-portal-id"]?void 0:cy(i.parent)),i.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!f||p&&Aa(p),visualElement:i,animationType:typeof h=="string"?h:"both",initialPromotionConfig:r,crossfade:y,layoutScroll:v,layoutRoot:m})}function cy(i){if(i)return i.options.allowProjection!==!1?i.projection:cy(i.parent)}function su(i,{forwardMotionProps:a=!1}={},l,r){l&&rS(l);const u=ud(i)?BS:RS;function h(p,v){let m;const y={...ct.useContext(Fg),...p,layoutId:LS(p)},{isStatic:b}=y,T=hS(p),O=u(p,b);if(!b&&Vu){VS();const H=HS(y);m=H.MeasureLayout,T.visualElement=zS(i,O,y,r,H.ProjectionNode)}return Ot.jsxs(Eo.Provider,{value:T,children:[m&&T.visualElement?Ot.jsx(m,{visualElement:T.visualElement,...y}):null,wS(i,p,US(O,T.visualElement,v),O,b,a)]})}h.displayName=`motion.${typeof i=="string"?i:`create(${i.displayName??i.name??""})`}`;const f=ct.forwardRef(h);return f[NS]=i,f}function LS({layoutId:i}){const a=ct.useContext(lg).id;return a&&i!==void 0?a+"-"+i:i}function VS(i,a){ct.useContext(Ig).strict}function HS(i){const{drag:a,layout:l}=wa;if(!a&&!l)return{};const r={...a,...l};return{MeasureLayout:a?.isEnabled(i)||l?.isEnabled(i)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function jS(i,a){if(typeof Proxy>"u")return su;const l=new Map,r=(h,f)=>su(h,f,i,a),u=(h,f)=>r(h,f);return new Proxy(u,{get:(h,f)=>f==="create"?r:(l.has(f)||l.set(f,su(f,void 0,i,a)),l.get(f))})}function uy({top:i,left:a,right:l,bottom:r}){return{x:{min:a,max:l},y:{min:i,max:r}}}function YS({x:i,y:a}){return{top:a.min,right:i.max,bottom:a.max,left:i.min}}function qS(i,a){if(!a)return i;const l=a({x:i.left,y:i.top}),r=a({x:i.right,y:i.bottom});return{top:l.y,left:l.x,bottom:r.y,right:r.x}}function lu(i){return i===void 0||i===1}function Mu({scale:i,scaleX:a,scaleY:l}){return!lu(i)||!lu(a)||!lu(l)}function Mi(i){return Mu(i)||dy(i)||i.z||i.rotate||i.rotateX||i.rotateY||i.skewX||i.skewY}function dy(i){return $p(i.x)||$p(i.y)}function $p(i){return i&&i!=="0%"}function To(i,a,l){const r=i-l,u=a*r;return l+u}function tv(i,a,l,r,u){return u!==void 0&&(i=To(i,u,r)),To(i,l,r)+a}function Du(i,a=0,l=1,r,u){i.min=tv(i.min,a,l,r,u),i.max=tv(i.max,a,l,r,u)}function fy(i,{x:a,y:l}){Du(i.x,a.translate,a.scale,a.originPoint),Du(i.y,l.translate,l.scale,l.originPoint)}const ev=.999999999999,nv=1.0000000000001;function GS(i,a,l,r=!1){const u=l.length;if(!u)return;a.x=a.y=1;let h,f;for(let p=0;p<u;p++){h=l[p],f=h.projectionDelta;const{visualElement:v}=h.options;v&&v.props.style&&v.props.style.display==="contents"||(r&&h.options.layoutScroll&&h.scroll&&h!==h.root&&xa(i,{x:-h.scroll.offset.x,y:-h.scroll.offset.y}),f&&(a.x*=f.x.scale,a.y*=f.y.scale,fy(i,f)),r&&Mi(h.latestValues)&&xa(i,h.latestValues))}a.x<nv&&a.x>ev&&(a.x=1),a.y<nv&&a.y>ev&&(a.y=1)}function Sa(i,a){i.min=i.min+a,i.max=i.max+a}function iv(i,a,l,r,u=.5){const h=Ht(i.min,i.max,u);Du(i,a,l,h,r)}function xa(i,a){iv(i.x,a.x,a.scaleX,a.scale,a.originX),iv(i.y,a.y,a.scaleY,a.scale,a.originY)}function hy(i,a){return uy(qS(i.getBoundingClientRect(),a))}function QS(i,a,l){const r=hy(i,l),{scroll:u}=a;return u&&(Sa(r.x,u.offset.x),Sa(r.y,u.offset.y)),r}const av=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ta=()=>({x:av(),y:av()}),sv=()=>({min:0,max:0}),Jt=()=>({x:sv(),y:sv()}),Ru={current:null},my={current:!1};function XS(){if(my.current=!0,!!Vu)if(window.matchMedia){const i=window.matchMedia("(prefers-reduced-motion)"),a=()=>Ru.current=i.matches;i.addEventListener("change",a),a()}else Ru.current=!1}const JS=new WeakMap;function KS(i,a,l){for(const r in a){const u=a[r],h=l[r];if(de(u))i.addValue(r,u);else if(de(h))i.addValue(r,Ea(u,{owner:i}));else if(h!==u)if(i.hasValue(r)){const f=i.getValue(r);f.liveStyle===!0?f.jump(u):f.hasAnimated||f.set(u)}else{const f=i.getStaticValue(r);i.addValue(r,Ea(f!==void 0?f:u,{owner:i}))}}for(const r in l)a[r]===void 0&&i.removeValue(r);return a}const lv=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class _S{scrapeMotionValuesFromProps(a,l,r){return{}}constructor({parent:a,props:l,presenceContext:r,reducedMotionConfig:u,blockInitialAnimation:h,visualState:f},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=ed,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const T=Te.now();this.renderScheduledAt<T&&(this.renderScheduledAt=T,Lt.render(this.render,!1,!0))};const{latestValues:v,renderState:m}=f;this.latestValues=v,this.baseTarget={...v},this.initialValues=l.initial?{...v}:{},this.renderState=m,this.parent=a,this.props=l,this.presenceContext=r,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.options=p,this.blockInitialAnimation=!!h,this.isControllingVariants=Mo(l),this.isVariantNode=$g(l),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:y,...b}=this.scrapeMotionValuesFromProps(l,{},this);for(const T in b){const O=b[T];v[T]!==void 0&&de(O)&&O.set(v[T])}}mount(a){this.current=a,JS.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((l,r)=>this.bindToMotionValue(r,l)),my.current||XS(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Ru.current,this.parent?.addChild(this),this.update(this.props,this.presenceContext)}unmount(){this.projection&&this.projection.unmount(),ai(this.notifyUpdate),ai(this.render),this.valueSubscriptions.forEach(a=>a()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const a in this.events)this.events[a].clear();for(const a in this.features){const l=this.features[a];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,l){this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)();const r=Ra.has(a);r&&this.onBindTransform&&this.onBindTransform();const u=l.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&Lt.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,l)),this.valueSubscriptions.set(a,()=>{u(),h&&h(),l.owner&&l.stop()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in wa){const l=wa[a];if(!l)continue;const{isEnabled:r,Feature:u}=l;if(!this.features[a]&&u&&r(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Jt()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,l){this.latestValues[a]=l}update(a,l){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=l;for(let r=0;r<lv.length;r++){const u=lv[r];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,f=a[h];f&&(this.propEventSubscriptions[u]=this.on(u,f))}this.prevMotionValues=KS(this,this.scrapeMotionValuesFromProps(a,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const l=this.getClosestVariantNode();if(l)return l.variantChildren&&l.variantChildren.add(a),()=>l.variantChildren.delete(a)}addValue(a,l){const r=this.values.get(a);l!==r&&(r&&this.removeValue(a),this.bindToMotionValue(a,l),this.values.set(a,l),this.latestValues[a]=l.get())}removeValue(a){this.values.delete(a);const l=this.valueSubscriptions.get(a);l&&(l(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,l){if(this.props.values&&this.props.values[a])return this.props.values[a];let r=this.values.get(a);return r===void 0&&l!==void 0&&(r=Ea(l===null?void 0:l,{owner:this}),this.addValue(a,r)),r}readValue(a,l){let r=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return r!=null&&(typeof r=="string"&&(og(r)||cg(r))?r=parseFloat(r):!lS(r)&&si.test(l)&&(r=Xg(a,l)),this.setBaseTarget(a,de(r)?r.get():r)),de(r)?r.get():r}setBaseTarget(a,l){this.baseTarget[a]=l}getBaseTarget(a){const{initial:l}=this.props;let r;if(typeof l=="string"||typeof l=="object"){const h=dd(this.props,l,this.presenceContext?.custom);h&&(r=h[a])}if(l&&r!==void 0)return r;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!de(u)?u:this.initialValues[a]!==void 0&&r===void 0?void 0:this.baseTarget[a]}on(a,l){return this.events[a]||(this.events[a]=new Qu),this.events[a].add(l)}notify(a,...l){this.events[a]&&this.events[a].notify(...l)}scheduleRenderMicrotask(){ad.render(this.render)}}class py extends _S{constructor(){super(...arguments),this.KeyframeResolver=_2}sortInstanceNodePosition(a,l){return a.compareDocumentPosition(l)&2?1:-1}getBaseTargetFromProps(a,l){return a.style?a.style[l]:void 0}removeValueFromRenderState(a,{vars:l,style:r}){delete l[a],delete r[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;de(a)&&(this.childSubscription=a.on("change",l=>{this.current&&(this.current.textContent=`${l}`)}))}}function vy(i,{style:a,vars:l},r,u){const h=i.style;let f;for(f in a)h[f]=a[f];u?.applyProjectionStyles(h,r);for(f in l)h.setProperty(f,l[f])}function ZS(i){return window.getComputedStyle(i)}class PS extends py{constructor(){super(...arguments),this.type="html",this.renderInstance=vy}readValueFromInstance(a,l){if(Ra.has(l))return this.projection?.isProjecting?Au(l):f2(a,l);{const r=ZS(a),u=(Ku(l)?r.getPropertyValue(l):r[l])||0;return typeof u=="string"?u.trim():u}}measureInstanceViewportBox(a,{transformPagePoint:l}){return hy(a,l)}build(a,l,r){rd(a,l,r.transformTemplate)}scrapeMotionValuesFromProps(a,l,r){return fd(a,l,r)}}const gy=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function FS(i,a,l,r){vy(i,a,void 0,r);for(const u in a.attrs)i.setAttribute(gy.has(u)?u:hd(u),a.attrs[u])}class IS extends py{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Jt}getBaseTargetFromProps(a,l){return a[l]}readValueFromInstance(a,l){if(Ra.has(l)){const r=Qg(l);return r&&r.default||0}return l=gy.has(l)?l:hd(l),a.getAttribute(l)}scrapeMotionValuesFromProps(a,l,r){return ly(a,l,r)}build(a,l,r){ny(a,l,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(a,l,r,u){FS(a,l,r,u)}mount(a){this.isSVGTag=ay(a.tagName),super.mount(a)}}const WS=(i,a)=>ud(i)?new IS(a):new PS(a,{allowProjection:i!==ct.Fragment});function Ca(i,a,l){const r=i.getProps();return dd(r,a,l!==void 0?l:r.custom,i)}const Bu=i=>Array.isArray(i);function $S(i,a,l){i.hasValue(a)?i.getValue(a).set(l):i.addValue(a,Ea(l))}function tx(i){return Bu(i)?i[i.length-1]||0:i}function ex(i,a){const l=Ca(i,a);let{transitionEnd:r={},transition:u={},...h}=l||{};h={...h,...r};for(const f in h){const p=tx(h[f]);$S(i,f,p)}}function nx(i){return!!(de(i)&&i.add)}function Nu(i,a){const l=i.getValue("willChange");if(nx(l))return l.add(a);if(!l&&Rn.WillChange){const r=new Rn.WillChange("auto");i.addValue("willChange",r),r.add(a)}}function yy(i){return i.props[oy]}const ix=i=>i!==null;function ax(i,{repeat:a,repeatType:l="loop"},r){const u=i.filter(ix),h=a&&l!=="loop"&&a%2===1?0:u.length-1;return u[h]}const sx={type:"spring",stiffness:500,damping:25,restSpeed:10},lx=i=>({type:"spring",stiffness:550,damping:i===0?2*Math.sqrt(550):30,restSpeed:10}),ox={type:"keyframes",duration:.8},rx={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},cx=(i,{keyframes:a})=>a.length>2?ox:Ra.has(i)?i.startsWith("scale")?lx(a[1]):sx:rx;function ux({when:i,delay:a,delayChildren:l,staggerChildren:r,staggerDirection:u,repeat:h,repeatType:f,repeatDelay:p,from:v,elapsed:m,...y}){return!!Object.keys(y).length}const md=(i,a,l,r={},u,h)=>f=>{const p=nd(r,i)||{},v=p.delay||r.delay||0;let{elapsed:m=0}=r;m=m-on(v);const y={keyframes:Array.isArray(l)?l:[null,l],ease:"easeOut",velocity:a.getVelocity(),...p,delay:-m,onUpdate:T=>{a.set(T),p.onUpdate&&p.onUpdate(T)},onComplete:()=>{f(),p.onComplete&&p.onComplete()},name:i,motionValue:a,element:h?void 0:u};ux(p)||Object.assign(y,cx(i,y)),y.duration&&(y.duration=on(y.duration)),y.repeatDelay&&(y.repeatDelay=on(y.repeatDelay)),y.from!==void 0&&(y.keyframes[0]=y.from);let b=!1;if((y.type===!1||y.duration===0&&!y.repeatDelay)&&(Eu(y),y.delay===0&&(b=!0)),(Rn.instantAnimations||Rn.skipAnimations)&&(b=!0,Eu(y),y.delay=0),y.allowFlatten=!p.type&&!p.ease,b&&!h&&a.get()!==void 0){const T=ax(y.keyframes,p);if(T!==void 0){Lt.update(()=>{y.onUpdate(T),y.onComplete()});return}}return p.isSync?new td(y):new O2(y)};function dx({protectedKeys:i,needsAnimating:a},l){const r=i.hasOwnProperty(l)&&a[l]!==!0;return a[l]=!1,r}function by(i,a,{delay:l=0,transitionOverride:r,type:u}={}){let{transition:h=i.getDefaultTransition(),transitionEnd:f,...p}=a;r&&(h=r);const v=[],m=u&&i.animationState&&i.animationState.getState()[u];for(const y in p){const b=i.getValue(y,i.latestValues[y]??null),T=p[y];if(T===void 0||m&&dx(m,y))continue;const O={delay:l,...nd(h||{},y)},H=b.get();if(H!==void 0&&!b.isAnimating&&!Array.isArray(T)&&T===H&&!O.velocity)continue;let Q=!1;if(window.MotionHandoffAnimation){const Y=yy(i);if(Y){const P=window.MotionHandoffAnimation(Y,y,Lt);P!==null&&(O.startTime=P,Q=!0)}}Nu(i,y),b.start(md(y,b,T,i.shouldReduceMotion&&Yg.has(y)?{type:!1}:O,i,Q));const J=b.animation;J&&v.push(J)}return f&&Promise.all(v).then(()=>{Lt.update(()=>{f&&ex(i,f)})}),v}function Ay(i,a,l,r=0,u=1){const h=Array.from(i).sort((m,y)=>m.sortNodePosition(y)).indexOf(a),f=i.size,p=(f-1)*r;return typeof l=="function"?l(h,f):u===1?h*r:p-h*r}function Uu(i,a,l={}){const r=Ca(i,a,l.type==="exit"?i.presenceContext?.custom:void 0);let{transition:u=i.getDefaultTransition()||{}}=r||{};l.transitionOverride&&(u=l.transitionOverride);const h=r?()=>Promise.all(by(i,r,l)):()=>Promise.resolve(),f=i.variantChildren&&i.variantChildren.size?(v=0)=>{const{delayChildren:m=0,staggerChildren:y,staggerDirection:b}=u;return fx(i,a,v,m,y,b,l)}:()=>Promise.resolve(),{when:p}=u;if(p){const[v,m]=p==="beforeChildren"?[h,f]:[f,h];return v().then(()=>m())}else return Promise.all([h(),f(l.delay)])}function fx(i,a,l=0,r=0,u=0,h=1,f){const p=[];for(const v of i.variantChildren)v.notify("AnimationStart",a),p.push(Uu(v,a,{...f,delay:l+(typeof r=="function"?0:r)+Ay(i.variantChildren,v,r,u,h)}).then(()=>v.notify("AnimationComplete",a)));return Promise.all(p)}function hx(i,a,l={}){i.notify("AnimationStart",a);let r;if(Array.isArray(a)){const u=a.map(h=>Uu(i,h,l));r=Promise.all(u)}else if(typeof a=="string")r=Uu(i,a,l);else{const u=typeof a=="function"?Ca(i,a,l.custom):a;r=Promise.all(by(i,u,l))}return r.then(()=>{i.notify("AnimationComplete",a)})}function Sy(i,a){if(!Array.isArray(a))return!1;const l=a.length;if(l!==i.length)return!1;for(let r=0;r<l;r++)if(a[r]!==i[r])return!1;return!0}const mx=od.length;function xy(i){if(!i)return;if(!i.isControllingVariants){const l=i.parent?xy(i.parent)||{}:{};return i.props.initial!==void 0&&(l.initial=i.props.initial),l}const a={};for(let l=0;l<mx;l++){const r=od[l],u=i.props[r];(Ls(u)||u===!1)&&(a[r]=u)}return a}const px=[...ld].reverse(),vx=ld.length;function gx(i){return a=>Promise.all(a.map(({animation:l,options:r})=>hx(i,l,r)))}function yx(i){let a=gx(i),l=ov(),r=!0;const u=v=>(m,y)=>{const b=Ca(i,y,v==="exit"?i.presenceContext?.custom:void 0);if(b){const{transition:T,transitionEnd:O,...H}=b;m={...m,...H,...O}}return m};function h(v){a=v(i)}function f(v){const{props:m}=i,y=xy(i.parent)||{},b=[],T=new Set;let O={},H=1/0;for(let J=0;J<vx;J++){const Y=px[J],P=l[Y],q=m[Y]!==void 0?m[Y]:y[Y],it=Ls(q),W=Y===v?P.isActive:null;W===!1&&(H=J);let lt=q===y[Y]&&q!==m[Y]&&it;if(lt&&r&&i.manuallyAnimateOnMount&&(lt=!1),P.protectedKeys={...O},!P.isActive&&W===null||!q&&!P.prevProp||wo(q)||typeof q=="boolean")continue;const $=bx(P.prevProp,q);let et=$||Y===v&&P.isActive&&!lt&&it||J>H&&it,Ct=!1;const Vt=Array.isArray(q)?q:[q];let It=Vt.reduce(u(Y),{});W===!1&&(It={});const{prevResolvedValues:Wt={}}=P,Fe={...Wt,...It},pe=V=>{et=!0,T.has(V)&&(Ct=!0,T.delete(V)),P.needsAnimating[V]=!0;const _=i.getValue(V);_&&(_.liveStyle=!1)};for(const V in Fe){const _=It[V],dt=Wt[V];if(O.hasOwnProperty(V))continue;let pt=!1;Bu(_)&&Bu(dt)?pt=!Sy(_,dt):pt=_!==dt,pt?_!=null?pe(V):T.add(V):_!==void 0&&T.has(V)?pe(V):P.protectedKeys[V]=!0}P.prevProp=q,P.prevResolvedValues=It,P.isActive&&(O={...O,...It}),r&&i.blockInitialAnimation&&(et=!1);const ce=lt&&$;et&&(!ce||Ct)&&b.push(...Vt.map(V=>{const _={type:Y};if(typeof V=="string"&&r&&!ce&&i.manuallyAnimateOnMount&&i.parent){const{parent:dt}=i,pt=Ca(dt,V);if(dt.enteringChildren&&pt){const{delayChildren:x}=pt.transition||{};_.delay=Ay(dt.enteringChildren,i,x)}}return{animation:V,options:_}}))}if(T.size){const J={};if(typeof m.initial!="boolean"){const Y=Ca(i,Array.isArray(m.initial)?m.initial[0]:m.initial);Y&&Y.transition&&(J.transition=Y.transition)}T.forEach(Y=>{const P=i.getBaseTarget(Y),q=i.getValue(Y);q&&(q.liveStyle=!0),J[Y]=P??null}),b.push({animation:J})}let Q=!!b.length;return r&&(m.initial===!1||m.initial===m.animate)&&!i.manuallyAnimateOnMount&&(Q=!1),r=!1,Q?a(b):Promise.resolve()}function p(v,m){if(l[v].isActive===m)return Promise.resolve();i.variantChildren?.forEach(b=>b.animationState?.setActive(v,m)),l[v].isActive=m;const y=f(v);for(const b in l)l[b].protectedKeys={};return y}return{animateChanges:f,setActive:p,setAnimateFunction:h,getState:()=>l,reset:()=>{l=ov()}}}function bx(i,a){return typeof a=="string"?a!==i:Array.isArray(a)?!Sy(a,i):!1}function wi(i=!1){return{isActive:i,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function ov(){return{animate:wi(!0),whileInView:wi(),whileHover:wi(),whileTap:wi(),whileDrag:wi(),whileFocus:wi(),exit:wi()}}class li{constructor(a){this.isMounted=!1,this.node=a}update(){}}class Ax extends li{constructor(a){super(a),a.animationState||(a.animationState=yx(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();wo(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:l}=this.node.prevProps||{};a!==l&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}let Sx=0;class xx extends li{constructor(){super(...arguments),this.id=Sx++}update(){if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:l}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===r)return;const u=this.node.animationState.setActive("exit",!a);l&&!a&&u.then(()=>{l(this.id)})}mount(){const{register:a,onExitComplete:l}=this.node.presenceContext||{};l&&l(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const Tx={animation:{Feature:Ax},exit:{Feature:xx}};function Hs(i,a,l,r={passive:!0}){return i.addEventListener(a,l,r),()=>i.removeEventListener(a,l)}function Xs(i){return{point:{x:i.pageX,y:i.pageY}}}const Cx=i=>a=>sd(a)&&i(a,Xs(a));function Rs(i,a,l,r){return Hs(i,a,Cx(l),r)}const Ty=1e-4,Ex=1-Ty,wx=1+Ty,Cy=.01,Mx=0-Cy,Dx=0+Cy;function me(i){return i.max-i.min}function Rx(i,a,l){return Math.abs(i-a)<=l}function rv(i,a,l,r=.5){i.origin=r,i.originPoint=Ht(a.min,a.max,i.origin),i.scale=me(l)/me(a),i.translate=Ht(l.min,l.max,i.origin)-i.originPoint,(i.scale>=Ex&&i.scale<=wx||isNaN(i.scale))&&(i.scale=1),(i.translate>=Mx&&i.translate<=Dx||isNaN(i.translate))&&(i.translate=0)}function Bs(i,a,l,r){rv(i.x,a.x,l.x,r?r.originX:void 0),rv(i.y,a.y,l.y,r?r.originY:void 0)}function cv(i,a,l){i.min=l.min+a.min,i.max=i.min+me(a)}function Bx(i,a,l){cv(i.x,a.x,l.x),cv(i.y,a.y,l.y)}function uv(i,a,l){i.min=a.min-l.min,i.max=i.min+me(a)}function Ns(i,a,l){uv(i.x,a.x,l.x),uv(i.y,a.y,l.y)}function Ke(i){return[i("x"),i("y")]}const Ey=({current:i})=>i?i.ownerDocument.defaultView:null,dv=(i,a)=>Math.abs(i-a);function Nx(i,a){const l=dv(i.x,a.x),r=dv(i.y,a.y);return Math.sqrt(l**2+r**2)}class wy{constructor(a,l,{transformPagePoint:r,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const T=ru(this.lastMoveEventInfo,this.history),O=this.startEvent!==null,H=Nx(T.offset,{x:0,y:0})>=this.distanceThreshold;if(!O&&!H)return;const{point:Q}=T,{timestamp:J}=re;this.history.push({...Q,timestamp:J});const{onStart:Y,onMove:P}=this.handlers;O||(Y&&Y(this.lastMoveEvent,T),this.startEvent=this.lastMoveEvent),P&&P(this.lastMoveEvent,T)},this.handlePointerMove=(T,O)=>{this.lastMoveEvent=T,this.lastMoveEventInfo=ou(O,this.transformPagePoint),Lt.update(this.updatePoint,!0)},this.handlePointerUp=(T,O)=>{this.end();const{onEnd:H,onSessionEnd:Q,resumeAnimation:J}=this.handlers;if(this.dragSnapToOrigin&&J&&J(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const Y=ru(T.type==="pointercancel"?this.lastMoveEventInfo:ou(O,this.transformPagePoint),this.history);this.startEvent&&H&&H(T,Y),Q&&Q(T,Y)},!sd(a))return;this.dragSnapToOrigin=h,this.handlers=l,this.transformPagePoint=r,this.distanceThreshold=f,this.contextWindow=u||window;const p=Xs(a),v=ou(p,this.transformPagePoint),{point:m}=v,{timestamp:y}=re;this.history=[{...m,timestamp:y}];const{onSessionStart:b}=l;b&&b(a,ru(v,this.history)),this.removeListeners=qs(Rs(this.contextWindow,"pointermove",this.handlePointerMove),Rs(this.contextWindow,"pointerup",this.handlePointerUp),Rs(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),ai(this.updatePoint)}}function ou(i,a){return a?{point:a(i.point)}:i}function fv(i,a){return{x:i.x-a.x,y:i.y-a.y}}function ru({point:i},a){return{point:i,delta:fv(i,My(a)),offset:fv(i,Ux(a)),velocity:kx(a,.1)}}function Ux(i){return i[0]}function My(i){return i[i.length-1]}function kx(i,a){if(i.length<2)return{x:0,y:0};let l=i.length-1,r=null;const u=My(i);for(;l>=0&&(r=i[l],!(u.timestamp-r.timestamp>on(a)));)l--;if(!r)return{x:0,y:0};const h=_e(u.timestamp-r.timestamp);if(h===0)return{x:0,y:0};const f={x:(u.x-r.x)/h,y:(u.y-r.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function zx(i,{min:a,max:l},r){return a!==void 0&&i<a?i=r?Ht(a,i,r.min):Math.max(i,a):l!==void 0&&i>l&&(i=r?Ht(l,i,r.max):Math.min(i,l)),i}function hv(i,a,l){return{min:a!==void 0?i.min+a:void 0,max:l!==void 0?i.max+l-(i.max-i.min):void 0}}function Ox(i,{top:a,left:l,bottom:r,right:u}){return{x:hv(i.x,l,u),y:hv(i.y,a,r)}}function mv(i,a){let l=a.min-i.min,r=a.max-i.max;return a.max-a.min<i.max-i.min&&([l,r]=[r,l]),{min:l,max:r}}function Lx(i,a){return{x:mv(i.x,a.x),y:mv(i.y,a.y)}}function Vx(i,a){let l=.5;const r=me(i),u=me(a);return u>r?l=ks(a.min,a.max-r,i.min):r>u&&(l=ks(i.min,i.max-u,a.min)),Dn(0,1,l)}function Hx(i,a){const l={};return a.min!==void 0&&(l.min=a.min-i.min),a.max!==void 0&&(l.max=a.max-i.min),l}const ku=.35;function jx(i=ku){return i===!1?i=0:i===!0&&(i=ku),{x:pv(i,"left","right"),y:pv(i,"top","bottom")}}function pv(i,a,l){return{min:vv(i,a),max:vv(i,l)}}function vv(i,a){return typeof i=="number"?i:i[a]||0}const Yx=new WeakMap;class qx{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Jt(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:l=!1,distanceThreshold:r}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=b=>{const{dragSnapToOrigin:T}=this.getProps();T?this.pauseAnimation():this.stopAnimation(),l&&this.snapToCursor(Xs(b).point)},f=(b,T)=>{const{drag:O,dragPropagation:H,onDragStart:Q}=this.getProps();if(O&&!H&&(this.openDragLock&&this.openDragLock(),this.openDragLock=W2(O),!this.openDragLock))return;this.latestPointerEvent=b,this.latestPanInfo=T,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Ke(Y=>{let P=this.getAxisMotionValue(Y).get()||0;if(rn.test(P)){const{projection:q}=this.visualElement;if(q&&q.layout){const it=q.layout.layoutBox[Y];it&&(P=me(it)*(parseFloat(P)/100))}}this.originPoint[Y]=P}),Q&&Lt.postRender(()=>Q(b,T)),Nu(this.visualElement,"transform");const{animationState:J}=this.visualElement;J&&J.setActive("whileDrag",!0)},p=(b,T)=>{this.latestPointerEvent=b,this.latestPanInfo=T;const{dragPropagation:O,dragDirectionLock:H,onDirectionLock:Q,onDrag:J}=this.getProps();if(!O&&!this.openDragLock)return;const{offset:Y}=T;if(H&&this.currentDirection===null){this.currentDirection=Gx(Y),this.currentDirection!==null&&Q&&Q(this.currentDirection);return}this.updateAxis("x",T.point,Y),this.updateAxis("y",T.point,Y),this.visualElement.render(),J&&J(b,T)},v=(b,T)=>{this.latestPointerEvent=b,this.latestPanInfo=T,this.stop(b,T),this.latestPointerEvent=null,this.latestPanInfo=null},m=()=>Ke(b=>this.getAnimationState(b)==="paused"&&this.getAxisMotionValue(b).animation?.play()),{dragSnapToOrigin:y}=this.getProps();this.panSession=new wy(a,{onSessionStart:h,onStart:f,onMove:p,onSessionEnd:v,resumeAnimation:m},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:y,distanceThreshold:r,contextWindow:Ey(this.visualElement)})}stop(a,l){const r=a||this.latestPointerEvent,u=l||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!r)return;const{velocity:f}=u;this.startAnimation(f);const{onDragEnd:p}=this.getProps();p&&Lt.postRender(()=>p(r,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:l}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),l&&l.setActive("whileDrag",!1)}updateAxis(a,l,r){const{drag:u}=this.getProps();if(!r||!fo(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+r[a];this.constraints&&this.constraints[a]&&(f=zx(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){const{dragConstraints:a,dragElastic:l}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,u=this.constraints;a&&Aa(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&r?this.constraints=Ox(r.layoutBox,a):this.constraints=!1,this.elastic=jx(l),u!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&Ke(h=>{this.constraints!==!1&&this.getAxisMotionValue(h)&&(this.constraints[h]=Hx(r.layoutBox[h],this.constraints[h]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:l}=this.getProps();if(!a||!Aa(a))return!1;const r=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;const h=QS(r,u.root,this.visualElement.getTransformPagePoint());let f=Lx(u.layout.layoutBox,h);if(l){const p=l(YS(f));this.hasMutatedConstraints=!!p,p&&(f=uy(p))}return f}startAnimation(a){const{drag:l,dragMomentum:r,dragElastic:u,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:p}=this.getProps(),v=this.constraints||{},m=Ke(y=>{if(!fo(y,l,this.currentDirection))return;let b=v&&v[y]||{};f&&(b={min:0,max:0});const T=u?200:1e6,O=u?40:1e7,H={type:"inertia",velocity:r?a[y]:0,bounceStiffness:T,bounceDamping:O,timeConstant:750,restDelta:1,restSpeed:10,...h,...b};return this.startAxisValueAnimation(y,H)});return Promise.all(m).then(p)}startAxisValueAnimation(a,l){const r=this.getAxisMotionValue(a);return Nu(this.visualElement,a),r.start(md(a,r,0,l,this.visualElement,!1))}stopAnimation(){Ke(a=>this.getAxisMotionValue(a).stop())}pauseAnimation(){Ke(a=>this.getAxisMotionValue(a).animation?.pause())}getAnimationState(a){return this.getAxisMotionValue(a).animation?.state}getAxisMotionValue(a){const l=`_drag${a.toUpperCase()}`,r=this.visualElement.getProps(),u=r[l];return u||this.visualElement.getValue(a,(r.initial?r.initial[a]:void 0)||0)}snapToCursor(a){Ke(l=>{const{drag:r}=this.getProps();if(!fo(l,r,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(l);if(u&&u.layout){const{min:f,max:p}=u.layout.layoutBox[l];h.set(a[l]-Ht(f,p,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:l}=this.getProps(),{projection:r}=this.visualElement;if(!Aa(l)||!r||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};Ke(f=>{const p=this.getAxisMotionValue(f);if(p&&this.constraints!==!1){const v=p.get();u[f]=Vx({min:v,max:v},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),Ke(f=>{if(!fo(f,a,null))return;const p=this.getAxisMotionValue(f),{min:v,max:m}=this.constraints[f];p.set(Ht(v,m,u[f]))})}addListeners(){if(!this.visualElement.current)return;Yx.set(this.visualElement,this);const a=this.visualElement.current,l=Rs(a,"pointerdown",v=>{const{drag:m,dragListener:y=!0}=this.getProps();m&&y&&this.start(v)}),r=()=>{const{dragConstraints:v}=this.getProps();Aa(v)&&v.current&&(this.constraints=this.resolveRefConstraints())},{projection:u}=this.visualElement,h=u.addEventListener("measure",r);u&&!u.layout&&(u.root&&u.root.updateScroll(),u.updateLayout()),Lt.read(r);const f=Hs(window,"resize",()=>this.scalePositionWithinConstraints()),p=u.addEventListener("didUpdate",(({delta:v,hasLayoutChanged:m})=>{this.isDragging&&m&&(Ke(y=>{const b=this.getAxisMotionValue(y);b&&(this.originPoint[y]+=v[y].translate,b.set(b.get()+v[y].translate))}),this.visualElement.render())}));return()=>{f(),l(),h(),p&&p()}}getProps(){const a=this.visualElement.getProps(),{drag:l=!1,dragDirectionLock:r=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:f=ku,dragMomentum:p=!0}=a;return{...a,drag:l,dragDirectionLock:r,dragPropagation:u,dragConstraints:h,dragElastic:f,dragMomentum:p}}}function fo(i,a,l){return(a===!0||a===i)&&(l===null||l===i)}function Gx(i,a=10){let l=null;return Math.abs(i.y)>a?l="y":Math.abs(i.x)>a&&(l="x"),l}class Qx extends li{constructor(a){super(a),this.removeGroupControls=Ze,this.removeListeners=Ze,this.controls=new qx(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Ze}unmount(){this.removeGroupControls(),this.removeListeners()}}const gv=i=>(a,l)=>{i&&Lt.postRender(()=>i(a,l))};class Xx extends li{constructor(){super(...arguments),this.removePointerDownListener=Ze}onPointerDown(a){this.session=new wy(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Ey(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:l,onPan:r,onPanEnd:u}=this.node.getProps();return{onSessionStart:gv(a),onStart:gv(l),onMove:r,onEnd:(h,f)=>{delete this.session,u&&Lt.postRender(()=>u(h,f))}}}mount(){this.removePointerDownListener=Rs(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const vo={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function yv(i,a){return a.max===a.min?0:i/(a.max-a.min)*100}const Es={correct:(i,a)=>{if(!a.target)return i;if(typeof i=="string")if(at.test(i))i=parseFloat(i);else return i;const l=yv(i,a.target.x),r=yv(i,a.target.y);return`${l}% ${r}%`}},Jx={correct:(i,{treeScale:a,projectionDelta:l})=>{const r=i,u=si.parse(i);if(u.length>5)return r;const h=si.createTransformer(i),f=typeof u[0]!="number"?1:0,p=l.x.scale*a.x,v=l.y.scale*a.y;u[0+f]/=p,u[1+f]/=v;const m=Ht(p,v,.5);return typeof u[2+f]=="number"&&(u[2+f]/=m),typeof u[3+f]=="number"&&(u[3+f]/=m),h(u)}};let cu=!1;class Kx extends ct.Component{componentDidMount(){const{visualElement:a,layoutGroup:l,switchLayoutGroup:r,layoutId:u}=this.props,{projection:h}=a;mS(_x),h&&(l.group&&l.group.add(h),r&&r.register&&u&&r.register(h),cu&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,onExitComplete:()=>this.safeToRemove()})),vo.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:l,visualElement:r,drag:u,isPresent:h}=this.props,{projection:f}=r;return f&&(f.isPresent=h,cu=!0,u||a.layoutDependency!==l||l===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||Lt.postRender(()=>{const p=f.getStack();(!p||!p.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:a}=this.props.visualElement;a&&(a.root.didUpdate(),ad.postRender(()=>{!a.currentAnimation&&a.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:l,switchLayoutGroup:r}=this.props,{projection:u}=a;cu=!0,u&&(u.scheduleCheckAfterUnmount(),l&&l.group&&l.group.remove(u),r&&r.deregister&&r.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Dy(i){const[a,l]=oS(),r=ct.useContext(lg);return Ot.jsx(Kx,{...i,layoutGroup:r,switchLayoutGroup:ct.useContext(ry),isPresent:a,safeToRemove:l})}const _x={borderRadius:{...Es,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Es,borderTopRightRadius:Es,borderBottomLeftRadius:Es,borderBottomRightRadius:Es,boxShadow:Jx};function Zx(i,a,l){const r=de(i)?i:Ea(i);return r.start(md("",r,a,l)),r.animation}const Px=(i,a)=>i.depth-a.depth;class Fx{constructor(){this.children=[],this.isDirty=!1}add(a){ju(this.children,a),this.isDirty=!0}remove(a){Yu(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(Px),this.isDirty=!1,this.children.forEach(a)}}function Ix(i,a){const l=Te.now(),r=({timestamp:u})=>{const h=u-l;h>=a&&(ai(r),i(h-a))};return Lt.setup(r,!0),()=>ai(r)}const Ry=["TopLeft","TopRight","BottomLeft","BottomRight"],Wx=Ry.length,bv=i=>typeof i=="string"?parseFloat(i):i,Av=i=>typeof i=="number"||at.test(i);function $x(i,a,l,r,u,h){u?(i.opacity=Ht(0,l.opacity??1,tT(r)),i.opacityExit=Ht(a.opacity??1,0,eT(r))):h&&(i.opacity=Ht(a.opacity??1,l.opacity??1,r));for(let f=0;f<Wx;f++){const p=`border${Ry[f]}Radius`;let v=Sv(a,p),m=Sv(l,p);if(v===void 0&&m===void 0)continue;v||(v=0),m||(m=0),v===0||m===0||Av(v)===Av(m)?(i[p]=Math.max(Ht(bv(v),bv(m),r),0),(rn.test(m)||rn.test(v))&&(i[p]+="%")):i[p]=m}(a.rotate||l.rotate)&&(i.rotate=Ht(a.rotate||0,l.rotate||0,r))}function Sv(i,a){return i[a]!==void 0?i[a]:i.borderRadius}const tT=By(0,.5,gg),eT=By(.5,.95,Ze);function By(i,a,l){return r=>r<i?0:r>a?1:l(ks(i,a,r))}function xv(i,a){i.min=a.min,i.max=a.max}function Je(i,a){xv(i.x,a.x),xv(i.y,a.y)}function Tv(i,a){i.translate=a.translate,i.scale=a.scale,i.originPoint=a.originPoint,i.origin=a.origin}function Cv(i,a,l,r,u){return i-=a,i=To(i,1/l,r),u!==void 0&&(i=To(i,1/u,r)),i}function nT(i,a=0,l=1,r=.5,u,h=i,f=i){if(rn.test(a)&&(a=parseFloat(a),a=Ht(f.min,f.max,a/100)-f.min),typeof a!="number")return;let p=Ht(h.min,h.max,r);i===h&&(p-=a),i.min=Cv(i.min,a,l,p,u),i.max=Cv(i.max,a,l,p,u)}function Ev(i,a,[l,r,u],h,f){nT(i,a[l],a[r],a[u],a.scale,h,f)}const iT=["x","scaleX","originX"],aT=["y","scaleY","originY"];function wv(i,a,l,r){Ev(i.x,a,iT,l?l.x:void 0,r?r.x:void 0),Ev(i.y,a,aT,l?l.y:void 0,r?r.y:void 0)}function Mv(i){return i.translate===0&&i.scale===1}function Ny(i){return Mv(i.x)&&Mv(i.y)}function Dv(i,a){return i.min===a.min&&i.max===a.max}function sT(i,a){return Dv(i.x,a.x)&&Dv(i.y,a.y)}function Rv(i,a){return Math.round(i.min)===Math.round(a.min)&&Math.round(i.max)===Math.round(a.max)}function Uy(i,a){return Rv(i.x,a.x)&&Rv(i.y,a.y)}function Bv(i){return me(i.x)/me(i.y)}function Nv(i,a){return i.translate===a.translate&&i.scale===a.scale&&i.originPoint===a.originPoint}class lT{constructor(){this.members=[]}add(a){ju(this.members,a),a.scheduleRender()}remove(a){if(Yu(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const l=this.members[this.members.length-1];l&&this.promote(l)}}relegate(a){const l=this.members.findIndex(u=>a===u);if(l===0)return!1;let r;for(let u=l;u>=0;u--){const h=this.members[u];if(h.isPresent!==!1){r=h;break}}return r?(this.promote(r),!0):!1}promote(a,l){const r=this.lead;if(a!==r&&(this.prevLead=r,this.lead=a,a.show(),r)){r.instance&&r.scheduleRender(),a.scheduleRender(),a.resumeFrom=r,l&&(a.resumeFrom.preserveOpacity=!0),r.snapshot&&(a.snapshot=r.snapshot,a.snapshot.latestValues=r.animationValues||r.latestValues),a.root&&a.root.isUpdating&&(a.isLayoutDirty=!0);const{crossfade:u}=a.options;u===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(a=>{const{options:l,resumingFrom:r}=a;l.onExitComplete&&l.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(a=>{a.instance&&a.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function oT(i,a,l){let r="";const u=i.x.translate/a.x,h=i.y.translate/a.y,f=l?.z||0;if((u||h||f)&&(r=`translate3d(${u}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(r+=`scale(${1/a.x}, ${1/a.y}) `),l){const{transformPerspective:m,rotate:y,rotateX:b,rotateY:T,skewX:O,skewY:H}=l;m&&(r=`perspective(${m}px) ${r}`),y&&(r+=`rotate(${y}deg) `),b&&(r+=`rotateX(${b}deg) `),T&&(r+=`rotateY(${T}deg) `),O&&(r+=`skewX(${O}deg) `),H&&(r+=`skewY(${H}deg) `)}const p=i.x.scale*a.x,v=i.y.scale*a.y;return(p!==1||v!==1)&&(r+=`scale(${p}, ${v})`),r||"none"}const uu=["","X","Y","Z"],rT=1e3;let cT=0;function du(i,a,l,r){const{latestValues:u}=a;u[i]&&(l[i]=u[i],a.setStaticValue(i,0),r&&(r[i]=0))}function ky(i){if(i.hasCheckedOptimisedAppear=!0,i.root===i)return;const{visualElement:a}=i.options;if(!a)return;const l=yy(a);if(window.MotionHasOptimisedAnimation(l,"transform")){const{layout:u,layoutId:h}=i.options;window.MotionCancelOptimisedAnimation(l,"transform",Lt,!(u||h))}const{parent:r}=i;r&&!r.hasCheckedOptimisedAppear&&ky(r)}function zy({attachResizeListener:i,defaultParent:a,measureScroll:l,checkIsScrollRoot:r,resetTransform:u}){return class{constructor(f={},p=a?.()){this.id=cT++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(fT),this.nodes.forEach(vT),this.nodes.forEach(gT),this.nodes.forEach(hT)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=p?p.root||p:this,this.path=p?[...p.path,p]:[],this.parent=p,this.depth=p?p.depth+1:0;for(let v=0;v<this.path.length;v++)this.path[v].shouldResetTransform=!0;this.root===this&&(this.nodes=new Fx)}addEventListener(f,p){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new Qu),this.eventHandlers.get(f).add(p)}notifyListeners(f,...p){const v=this.eventHandlers.get(f);v&&v.notify(...p)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Pg(f)&&!aS(f),this.instance=f;const{layoutId:p,layout:v,visualElement:m}=this.options;if(m&&!m.current&&m.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(v||p)&&(this.isLayoutDirty=!0),i){let y,b=0;const T=()=>this.root.updateBlockedByResize=!1;Lt.read(()=>{b=window.innerWidth}),i(f,()=>{const O=window.innerWidth;O!==b&&(b=O,this.root.updateBlockedByResize=!0,y&&y(),y=Ix(T,250),vo.hasAnimatedSinceResize&&(vo.hasAnimatedSinceResize=!1,this.nodes.forEach(zv)))})}p&&this.root.registerSharedNode(p,this),this.options.animate!==!1&&m&&(p||v)&&this.addEventListener("didUpdate",({delta:y,hasLayoutChanged:b,hasRelativeLayoutChanged:T,layout:O})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const H=this.options.transition||m.getDefaultTransition()||xT,{onLayoutAnimationStart:Q,onLayoutAnimationComplete:J}=m.getProps(),Y=!this.targetLayout||!Uy(this.targetLayout,O),P=!b&&T;if(this.options.layoutRoot||this.resumeFrom||P||b&&(Y||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const q={...nd(H,"layout"),onPlay:Q,onComplete:J};(m.shouldReduceMotion||this.options.layoutRoot)&&(q.delay=0,q.type=!1),this.startAnimation(q),this.setAnimationOrigin(y,P)}else b||zv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=O})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),ai(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(yT),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&ky(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let y=0;y<this.path.length;y++){const b=this.path[y];b.shouldResetTransform=!0,b.updateScroll("snapshot"),b.options.layoutRoot&&b.willUpdate(!1)}const{layoutId:p,layout:v}=this.options;if(p===void 0&&!v)return;const m=this.getTransformTemplate();this.prevTransformTemplateValue=m?m(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Uv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(kv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(pT),this.nodes.forEach(uT),this.nodes.forEach(dT)):this.nodes.forEach(kv),this.clearAllSnapshots();const p=Te.now();re.delta=Dn(0,1e3/60,p-re.timestamp),re.timestamp=p,re.isProcessing=!0,$c.update.process(re),$c.preRender.process(re),$c.render.process(re),re.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,ad.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(mT),this.sharedNodes.forEach(bT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Lt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Lt.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!me(this.snapshot.measuredBox.x)&&!me(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let v=0;v<this.path.length;v++)this.path[v].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Jt(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:p}=this.options;p&&p.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let p=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(p=!1),p&&this.instance){const v=r(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:v,offset:l(this.instance),wasRoot:this.scroll?this.scroll.isRoot:v}}}resetTransform(){if(!u)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,p=this.projectionDelta&&!Ny(this.projectionDelta),v=this.getTransformTemplate(),m=v?v(this.latestValues,""):void 0,y=m!==this.prevTransformTemplateValue;f&&this.instance&&(p||Mi(this.latestValues)||y)&&(u(this.instance,m),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const p=this.measurePageBox();let v=this.removeElementScroll(p);return f&&(v=this.removeTransform(v)),TT(v),{animationId:this.root.animationId,measuredBox:p,layoutBox:v,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:f}=this.options;if(!f)return Jt();const p=f.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(CT))){const{scroll:m}=this.root;m&&(Sa(p.x,m.offset.x),Sa(p.y,m.offset.y))}return p}removeElementScroll(f){const p=Jt();if(Je(p,f),this.scroll?.wasRoot)return p;for(let v=0;v<this.path.length;v++){const m=this.path[v],{scroll:y,options:b}=m;m!==this.root&&y&&b.layoutScroll&&(y.wasRoot&&Je(p,f),Sa(p.x,y.offset.x),Sa(p.y,y.offset.y))}return p}applyTransform(f,p=!1){const v=Jt();Je(v,f);for(let m=0;m<this.path.length;m++){const y=this.path[m];!p&&y.options.layoutScroll&&y.scroll&&y!==y.root&&xa(v,{x:-y.scroll.offset.x,y:-y.scroll.offset.y}),Mi(y.latestValues)&&xa(v,y.latestValues)}return Mi(this.latestValues)&&xa(v,this.latestValues),v}removeTransform(f){const p=Jt();Je(p,f);for(let v=0;v<this.path.length;v++){const m=this.path[v];if(!m.instance||!Mi(m.latestValues))continue;Mu(m.latestValues)&&m.updateSnapshot();const y=Jt(),b=m.measurePageBox();Je(y,b),wv(p,m.latestValues,m.snapshot?m.snapshot.layoutBox:void 0,y)}return Mi(this.latestValues)&&wv(p,this.latestValues),p}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==re.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){const p=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=p.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=p.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=p.isSharedProjectionDirty);const v=!!this.resumingFrom||this!==p;if(!(f||v&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:y,layoutId:b}=this.options;if(!(!this.layout||!(y||b))){if(this.resolvedRelativeTargetAt=re.timestamp,!this.targetDelta&&!this.relativeTarget){const T=this.getClosestProjectingParent();T&&T.layout&&this.animationProgress!==1?(this.relativeParent=T,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Jt(),this.relativeTargetOrigin=Jt(),Ns(this.relativeTargetOrigin,this.layout.layoutBox,T.layout.layoutBox),Je(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Jt(),this.targetWithTransforms=Jt()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),Bx(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Je(this.target,this.layout.layoutBox),fy(this.target,this.targetDelta)):Je(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const T=this.getClosestProjectingParent();T&&!!T.resumingFrom==!!this.resumingFrom&&!T.options.layoutScroll&&T.target&&this.animationProgress!==1?(this.relativeParent=T,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Jt(),this.relativeTargetOrigin=Jt(),Ns(this.relativeTargetOrigin,this.target,T.target),Je(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||Mu(this.parent.latestValues)||dy(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){const f=this.getLead(),p=!!this.resumingFrom||this!==f;let v=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(v=!1),p&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(v=!1),this.resolvedRelativeTargetAt===re.timestamp&&(v=!1),v)return;const{layout:m,layoutId:y}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(m||y))return;Je(this.layoutCorrected,this.layout.layoutBox);const b=this.treeScale.x,T=this.treeScale.y;GS(this.layoutCorrected,this.treeScale,this.path,p),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=Jt());const{target:O}=f;if(!O){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Tv(this.prevProjectionDelta.x,this.projectionDelta.x),Tv(this.prevProjectionDelta.y,this.projectionDelta.y)),Bs(this.projectionDelta,this.layoutCorrected,O,this.latestValues),(this.treeScale.x!==b||this.treeScale.y!==T||!Nv(this.projectionDelta.x,this.prevProjectionDelta.x)||!Nv(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",O))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){if(this.options.visualElement?.scheduleRender(),f){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ta(),this.projectionDelta=Ta(),this.projectionDeltaWithTransform=Ta()}setAnimationOrigin(f,p=!1){const v=this.snapshot,m=v?v.latestValues:{},y={...this.latestValues},b=Ta();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!p;const T=Jt(),O=v?v.source:void 0,H=this.layout?this.layout.source:void 0,Q=O!==H,J=this.getStack(),Y=!J||J.members.length<=1,P=!!(Q&&!Y&&this.options.crossfade===!0&&!this.path.some(ST));this.animationProgress=0;let q;this.mixTargetDelta=it=>{const W=it/1e3;Ov(b.x,f.x,W),Ov(b.y,f.y,W),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Ns(T,this.layout.layoutBox,this.relativeParent.layout.layoutBox),AT(this.relativeTarget,this.relativeTargetOrigin,T,W),q&&sT(this.relativeTarget,q)&&(this.isProjectionDirty=!1),q||(q=Jt()),Je(q,this.relativeTarget)),Q&&(this.animationValues=y,$x(y,m,this.latestValues,W,P,Y)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=W},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(ai(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Lt.update(()=>{vo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ea(0)),this.currentAnimation=Zx(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:p=>{this.mixTargetDelta(p),f.onUpdate&&f.onUpdate(p)},onStop:()=>{},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(rT),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:p,target:v,layout:m,latestValues:y}=f;if(!(!p||!v||!m)){if(this!==f&&this.layout&&m&&Oy(this.options.animationType,this.layout.layoutBox,m.layoutBox)){v=this.target||Jt();const b=me(this.layout.layoutBox.x);v.x.min=f.target.x.min,v.x.max=v.x.min+b;const T=me(this.layout.layoutBox.y);v.y.min=f.target.y.min,v.y.max=v.y.min+T}Je(p,v),xa(p,y),Bs(this.projectionDeltaWithTransform,this.layoutCorrected,p,y)}}registerSharedNode(f,p){this.sharedNodes.has(f)||this.sharedNodes.set(f,new lT),this.sharedNodes.get(f).add(p);const m=p.options.initialPromotionConfig;p.promote({transition:m?m.transition:void 0,preserveFollowOpacity:m&&m.shouldPreserveFollowOpacity?m.shouldPreserveFollowOpacity(p):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){const{layoutId:f}=this.options;return f?this.getStack()?.lead||this:this}getPrevLead(){const{layoutId:f}=this.options;return f?this.getStack()?.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:p,preserveFollowOpacity:v}={}){const m=this.getStack();m&&m.promote(this,v),f&&(this.projectionDelta=void 0,this.needsReset=!0),p&&this.setOptions({transition:p})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let p=!1;const{latestValues:v}=f;if((v.z||v.rotate||v.rotateX||v.rotateY||v.rotateZ||v.skewX||v.skewY)&&(p=!0),!p)return;const m={};v.z&&du("z",f,m,this.animationValues);for(let y=0;y<uu.length;y++)du(`rotate${uu[y]}`,f,m,this.animationValues),du(`skew${uu[y]}`,f,m,this.animationValues);f.render();for(const y in m)f.setStaticValue(y,m[y]),this.animationValues&&(this.animationValues[y]=m[y]);f.scheduleRender()}applyProjectionStyles(f,p){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const v=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=po(p?.pointerEvents)||"",f.transform=v?v(this.latestValues,""):"none";return}const m=this.getLead();if(!this.projectionDelta||!this.layout||!m.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=po(p?.pointerEvents)||""),this.hasProjected&&!Mi(this.latestValues)&&(f.transform=v?v({},""):"none",this.hasProjected=!1);return}f.visibility="";const y=m.animationValues||m.latestValues;this.applyTransformsToTarget();let b=oT(this.projectionDeltaWithTransform,this.treeScale,y);v&&(b=v(y,b)),f.transform=b;const{x:T,y:O}=this.projectionDelta;f.transformOrigin=`${T.origin*100}% ${O.origin*100}% 0`,m.animationValues?f.opacity=m===this?y.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:y.opacityExit:f.opacity=m===this?y.opacity!==void 0?y.opacity:"":y.opacityExit!==void 0?y.opacityExit:0;for(const H in Vs){if(y[H]===void 0)continue;const{correct:Q,applyTo:J,isCSSVariable:Y}=Vs[H],P=b==="none"?y[H]:Q(y[H],m);if(J){const q=J.length;for(let it=0;it<q;it++)f[J[it]]=P}else Y?this.options.visualElement.renderState.vars[H]=P:f[H]=P}this.options.layoutId&&(f.pointerEvents=m===this?po(p?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>f.currentAnimation?.stop()),this.root.nodes.forEach(Uv),this.root.sharedNodes.clear()}}}function uT(i){i.updateLayout()}function dT(i){const a=i.resumeFrom?.snapshot||i.snapshot;if(i.isLead()&&i.layout&&a&&i.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:r}=i.layout,{animationType:u}=i.options,h=a.source!==i.layout.source;u==="size"?Ke(y=>{const b=h?a.measuredBox[y]:a.layoutBox[y],T=me(b);b.min=l[y].min,b.max=b.min+T}):Oy(u,a.layoutBox,l)&&Ke(y=>{const b=h?a.measuredBox[y]:a.layoutBox[y],T=me(l[y]);b.max=b.min+T,i.relativeTarget&&!i.currentAnimation&&(i.isProjectionDirty=!0,i.relativeTarget[y].max=i.relativeTarget[y].min+T)});const f=Ta();Bs(f,l,a.layoutBox);const p=Ta();h?Bs(p,i.applyTransform(r,!0),a.measuredBox):Bs(p,l,a.layoutBox);const v=!Ny(f);let m=!1;if(!i.resumeFrom){const y=i.getClosestProjectingParent();if(y&&!y.resumeFrom){const{snapshot:b,layout:T}=y;if(b&&T){const O=Jt();Ns(O,a.layoutBox,b.layoutBox);const H=Jt();Ns(H,l,T.layoutBox),Uy(O,H)||(m=!0),y.options.layoutRoot&&(i.relativeTarget=H,i.relativeTargetOrigin=O,i.relativeParent=y)}}}i.notifyListeners("didUpdate",{layout:l,snapshot:a,delta:p,layoutDelta:f,hasLayoutChanged:v,hasRelativeLayoutChanged:m})}else if(i.isLead()){const{onExitComplete:l}=i.options;l&&l()}i.options.transition=void 0}function fT(i){i.parent&&(i.isProjecting()||(i.isProjectionDirty=i.parent.isProjectionDirty),i.isSharedProjectionDirty||(i.isSharedProjectionDirty=!!(i.isProjectionDirty||i.parent.isProjectionDirty||i.parent.isSharedProjectionDirty)),i.isTransformDirty||(i.isTransformDirty=i.parent.isTransformDirty))}function hT(i){i.isProjectionDirty=i.isSharedProjectionDirty=i.isTransformDirty=!1}function mT(i){i.clearSnapshot()}function Uv(i){i.clearMeasurements()}function kv(i){i.isLayoutDirty=!1}function pT(i){const{visualElement:a}=i.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),i.resetTransform()}function zv(i){i.finishAnimation(),i.targetDelta=i.relativeTarget=i.target=void 0,i.isProjectionDirty=!0}function vT(i){i.resolveTargetDelta()}function gT(i){i.calcProjection()}function yT(i){i.resetSkewAndRotation()}function bT(i){i.removeLeadSnapshot()}function Ov(i,a,l){i.translate=Ht(a.translate,0,l),i.scale=Ht(a.scale,1,l),i.origin=a.origin,i.originPoint=a.originPoint}function Lv(i,a,l,r){i.min=Ht(a.min,l.min,r),i.max=Ht(a.max,l.max,r)}function AT(i,a,l,r){Lv(i.x,a.x,l.x,r),Lv(i.y,a.y,l.y,r)}function ST(i){return i.animationValues&&i.animationValues.opacityExit!==void 0}const xT={duration:.45,ease:[.4,0,.1,1]},Vv=i=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(i),Hv=Vv("applewebkit/")&&!Vv("chrome/")?Math.round:Ze;function jv(i){i.min=Hv(i.min),i.max=Hv(i.max)}function TT(i){jv(i.x),jv(i.y)}function Oy(i,a,l){return i==="position"||i==="preserve-aspect"&&!Rx(Bv(a),Bv(l),.2)}function CT(i){return i!==i.root&&i.scroll?.wasRoot}const ET=zy({attachResizeListener:(i,a)=>Hs(i,"resize",a),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),fu={current:void 0},Ly=zy({measureScroll:i=>({x:i.scrollLeft,y:i.scrollTop}),defaultParent:()=>{if(!fu.current){const i=new ET({});i.mount(window),i.setOptions({layoutScroll:!0}),fu.current=i}return fu.current},resetTransform:(i,a)=>{i.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:i=>window.getComputedStyle(i).position==="fixed"}),wT={pan:{Feature:Xx},drag:{Feature:Qx,ProjectionNode:Ly,MeasureLayout:Dy}};function Yv(i,a,l){const{props:r}=i;i.animationState&&r.whileHover&&i.animationState.setActive("whileHover",l==="Start");const u="onHover"+l,h=r[u];h&&Lt.postRender(()=>h(a,Xs(a)))}class MT extends li{mount(){const{current:a}=this.node;a&&(this.unmount=$2(a,(l,r)=>(Yv(this.node,r,"Start"),u=>Yv(this.node,u,"End"))))}unmount(){}}class DT extends li{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=qs(Hs(this.node.current,"focus",()=>this.onFocus()),Hs(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function qv(i,a,l){const{props:r}=i;if(i.current instanceof HTMLButtonElement&&i.current.disabled)return;i.animationState&&r.whileTap&&i.animationState.setActive("whileTap",l==="Start");const u="onTap"+(l==="End"?"":l),h=r[u];h&&Lt.postRender(()=>h(a,Xs(a)))}class RT extends li{mount(){const{current:a}=this.node;a&&(this.unmount=iS(a,(l,r)=>(qv(this.node,r,"Start"),(u,{success:h})=>qv(this.node,u,h?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const zu=new WeakMap,hu=new WeakMap,BT=i=>{const a=zu.get(i.target);a&&a(i)},NT=i=>{i.forEach(BT)};function UT({root:i,...a}){const l=i||document;hu.has(l)||hu.set(l,{});const r=hu.get(l),u=JSON.stringify(a);return r[u]||(r[u]=new IntersectionObserver(NT,{root:i,...a})),r[u]}function kT(i,a,l){const r=UT(a);return zu.set(i,l),r.observe(i),()=>{zu.delete(i),r.unobserve(i)}}const zT={some:0,all:1};class OT extends li{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:a={}}=this.node.getProps(),{root:l,margin:r,amount:u="some",once:h}=a,f={root:l?l.current:void 0,rootMargin:r,threshold:typeof u=="number"?u:zT[u]},p=v=>{const{isIntersecting:m}=v;if(this.isInView===m||(this.isInView=m,h&&!m&&this.hasEnteredView))return;m&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",m);const{onViewportEnter:y,onViewportLeave:b}=this.node.getProps(),T=m?y:b;T&&T(v)};return kT(this.node.current,f,p)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:l}=this.node;["amount","margin","root"].some(LT(a,l))&&this.startObserver()}unmount(){}}function LT({viewport:i={}},{viewport:a={}}={}){return l=>i[l]!==a[l]}const VT={inView:{Feature:OT},tap:{Feature:RT},focus:{Feature:DT},hover:{Feature:MT}},HT={layout:{ProjectionNode:Ly,MeasureLayout:Dy}},jT={...Tx,...VT,...wT,...HT},Gv=jS(jT,WS),ze={primary:"#543AF8",secondaryBg:"#EFF6FF",textDark:"#141414",textMuted:"#1A1C1E",homeIndicator:"#141414"};function YT(){return Ot.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,height:44,padding:"12px 18px 0",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:12,color:ze.textDark},children:[Ot.jsx("div",{children:"9:41"}),Ot.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[Ot.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:1.5},children:[4,6,8,10].map(i=>Ot.jsx("div",{style:{width:2,height:i,borderRadius:1,backgroundColor:ze.textDark}},i))}),Ot.jsx("div",{style:{width:12,height:12,borderRadius:"50%",border:`2px solid ${ze.textDark}`,borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",boxSizing:"border-box"}}),Ot.jsxs("div",{style:{display:"flex",alignItems:"center",gap:2},children:[Ot.jsx("div",{style:{width:18,height:10,borderRadius:3,border:`1.5px solid ${ze.textDark}`,padding:1.5,boxSizing:"border-box"},children:Ot.jsx("div",{style:{width:"100%",height:"100%",borderRadius:2,backgroundColor:ze.textDark}})}),Ot.jsx("div",{style:{width:2,height:6,borderRadius:1,backgroundColor:ze.textDark}})]})]})]})}function qT({onSignIn:i,onRegister:a}){return Ot.jsxs("div",{style:{width:375,height:812,margin:"0 auto",backgroundColor:"#FFFFFF",position:"relative",fontFamily:"'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",color:ze.textDark,overflow:"hidden"},children:[Ot.jsx(YT,{}),Ot.jsxs(Gv.div,{initial:{opacity:0,y:-40},animate:{opacity:1,y:0},transition:{duration:1.5,ease:"easeOut"},style:{position:"absolute",top:140,left:0,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:16},children:[Ot.jsx("div",{style:{fontSize:22,fontWeight:600},children:"NovaPay"}),Ot.jsx("img",{src:oA,alt:"NovaPay logo",style:{width:190,height:190,objectFit:"contain"}})]}),Ot.jsxs(Gv.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:1.2,delay:.35,ease:"easeOut"},style:{position:"absolute",left:0,right:0,bottom:64,display:"flex",flexDirection:"column",alignItems:"center",gap:16},children:[Ot.jsxs("div",{style:{display:"flex",width:280,height:52,borderRadius:14,backgroundColor:ze.secondaryBg,padding:4,boxSizing:"border-box"},children:[Ot.jsx("button",{type:"button","data-testid":"btnCreateAccount",onClick:a,style:{flex:1,border:"none",borderRadius:14,backgroundColor:ze.primary,color:"#FFFFFF",fontSize:14,fontWeight:600,cursor:"pointer"},children:"Register"}),Ot.jsx("button",{type:"button","data-testid":"btnSignIn",onClick:i,style:{flex:1,border:"none",borderRadius:14,backgroundColor:ze.secondaryBg,color:ze.primary,fontSize:14,fontWeight:500,cursor:"pointer"},children:"Sign In"})]}),Ot.jsx("div",{style:{fontSize:12,color:ze.textMuted},children:"Powered by Nium"})]}),Ot.jsx("div",{style:{position:"absolute",left:"50%",bottom:8,transform:"translateX(-50%)",width:134,height:5,borderRadius:999,backgroundColor:ze.homeIndicator}})]})}function GT(){const i=U("#app");if(!i)return;i.querySelector("#landing-react-root")||(i.innerHTML='<div id="landing-react-root"></div>');const a=i.querySelector("#landing-react-root");if(!a)return;const l=()=>K("/login"),r=()=>K("/register");aA.createRoot(a).render(I1.createElement(qT,{onSignIn:l,onRegister:r}))}function Vy(){window.history.length>1?window.history.back():window.location.href="/"}function Pe(i,a="JMD"){const l=Math.abs(i);return a==="JMD"?`J$${l.toLocaleString("en-JM",{minimumFractionDigits:0,maximumFractionDigits:0})}`:a==="USD"?`$${l.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:`${a} ${l.toLocaleString()}`}function Co(i){if(!i)return 0;const a=i.replace(/[,$\s]/g,""),l=parseFloat(a);return isNaN(l)?0:l}let kt={step:1,recipient:null,amount:0,note:""};function go(){const i=U("#app");i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Send Money</h1>
        <div></div>
      </div>
      
      <!-- Step Indicator -->
      <div class="steps">
        <div class="step ${kt.step>=1?"active":""}">1</div>
        <div class="step ${kt.step>=2?"active":""}">2</div>
        <div class="step ${kt.step>=3?"active":""}">3</div>
      </div>
      
      <div id="stepContent">
        ${QT()}
      </div>
    </div>
  `,KT()}function QT(){switch(kt.step){case 1:return Qv();case 2:return XT();case 3:return JT();default:return Qv()}}function Qv(){return`
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
        ${[{id:"c1",name:"John Smith",phone:"876-555-0101",avatar:"👨"},{id:"c2",name:"Sarah Johnson",phone:"876-555-0102",avatar:"👩"},{id:"c3",name:"Mike Brown",phone:"876-555-0103",avatar:"👨‍💼"},{id:"c4",name:"Lisa Davis",phone:"876-555-0104",avatar:"👩‍💻"}].map(a=>`
          <div class="contact-item" data-contact='${JSON.stringify(a)}'>
            <div class="flex items-center gap-4">
              <div class="text-2xl">${a.avatar}</div>
              <div>
                <h4 class="font-semibold">${a.name}</h4>
                <p class="text-muted text-sm">${a.phone}</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function XT(){return`
    <div class="card">
      <h3 class="text-lg mb-4">Send to ${kt.recipient.name}</h3>
      
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
          Available: ${Pe(j.balances.JMD,"JMD")}
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
  `}function JT(){return`
    <div class="card">
      <h3 class="text-lg mb-6 text-center">Confirm Transfer</h3>
      
      <div class="text-center mb-6">
        <div class="text-3xl mb-2">${kt.recipient.avatar}</div>
        <h4 class="text-lg font-semibold">${kt.recipient.name}</h4>
        <p class="text-muted">${kt.recipient.phone}</p>
      </div>
      
      <div class="space-y-4 mb-6">
        <div class="flex justify-between">
          <span class="text-muted">Amount:</span>
          <span class="font-semibold">${Pe(kt.amount,"JMD")}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-muted">Fee:</span>
          <span class="font-semibold">J$0.00</span>
        </div>
        
        ${kt.note?`
          <div class="flex justify-between">
            <span class="text-muted">Note:</span>
            <span class="font-semibold">${kt.note}</span>
          </div>
        `:""}
        
        <hr style="border-color: var(--border);">
        
        <div class="flex justify-between">
          <span class="text-muted">Total:</span>
          <span class="font-semibold text-lg">${Pe(kt.amount,"JMD")}</span>
        </div>
      </div>
      
      <button class="btn btn-primary btn-full" data-testid="btnConfirmSend">
        Send Money
      </button>
      
      <button class="btn btn-ghost btn-full mt-4" data-action="edit-amount">
        Edit Amount
      </button>
    </div>
  `}function KT(){const i=U("#app");L(i,'[data-action="nav-back"]',"click",()=>Vy()),L(i,'[data-action="scan-qr"]',"click",()=>{K("/scan-qr")}),L(i,".contact-item","click",function(){const a=this.dataset.contact;kt.recipient=JSON.parse(a),kt.step=2,go()}),L(i,"#amountInput","input",a=>{const l=a.target.value.replace(/[^\d.]/g,"");a.target.value=l;const r=Co(l),u=U("#continueBtn");r>0&&Ni(r)?(u.disabled=!1,u.classList.remove("opacity-50")):(u.disabled=!0,u.classList.add("opacity-50"))}),L(i,"[data-quick-amount]","click",function(){const a=this.dataset.quickAmount;U("#amountInput").value=a,U("#amountInput").dispatchEvent(new Event("input"))}),L(i,"#continueBtn","click",()=>{const a=Co(U("#amountInput").value),l=U("#noteInput").value.trim();if(!Ni(a)){X("Insufficient balance");return}kt.amount=a,kt.note=l,kt.step=3,go()}),L(i,'[data-testid="btnConfirmSend"]',"click",()=>{if(!Ni(kt.amount)){X("Insufficient balance. Would you like to add money?"),setTimeout(()=>K("/add-money"),2e3);return}const a=U('[data-testid="btnConfirmSend"]');a.textContent="Sending...",a.disabled=!0,setTimeout(()=>{Ys("JMD",-kt.amount),js({title:`To ${kt.recipient.name}`,amount:-kt.amount,currency:"JMD",type:"P2P_SEND"}),X(`Sent ${Pe(kt.amount,"JMD")} to ${kt.recipient.name}`),kt={step:1,recipient:null,amount:0,note:""},K("/dashboard")},2e3)}),L(i,'[data-action="edit-amount"]',"click",()=>{kt.step=2,go()})}const Hy=document.createElement("style");Hy.textContent=`
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
`;document.head.appendChild(Hy);function _T(){const i=U("#app");i.innerHTML=`
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
            <span id="walletId">NP${j.session.user.phone.replace(/\D/g,"").slice(-6)}</span>
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
  `;const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a),L(i,".add-money-option","click",function(){const l=this.dataset.method;l==="bank"?U("#bankDetails").classList.toggle("hidden"):X(`${l} option coming soon!`)}),L(i,'[data-action="copy-account"]',"click",()=>{navigator.clipboard.writeText("123-456-789"),X("Account number copied!")}),L(i,'[data-action="copy-reference"]',"click",()=>{const l=U("#walletId").textContent;navigator.clipboard.writeText(l),X("Wallet ID copied!")}),L(i,'[data-action="share-details"]',"click",async()=>{const r=`NovaPay Bank Transfer Details:
Bank: National Commercial Bank
Account: NovaPay Limited
Account Number: 123-456-789
Reference: ${U("#walletId").textContent}`;if(navigator.share)try{await navigator.share({title:"NovaPay Bank Details",text:r})}catch{console.log("Share cancelled")}else navigator.clipboard.writeText(r),X("Bank details copied to clipboard!")}),L(i,"[data-amount]","click",function(){const l=parseInt(this.dataset.amount);this.textContent="Adding...",this.disabled=!0,setTimeout(()=>{Ys("JMD",l),js({title:"Bank Transfer",amount:l,currency:"JMD",type:"TOP_UP"}),X(`Added ${Pe(l,"JMD")} to your account!`),K("/dashboard")},1500)})}const jy=document.createElement("style");jy.textContent=`
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
`;document.head.appendChild(jy);let ii={method:null,bankAccount:null};function Ou(){const i=U("#app");i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Cash Out</h1>
        <div></div>
      </div>
      
      ${ii.method?PT():ZT()}
    </div>
  `,WT()}function ZT(){return`
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
          ${Pe(j.balances.JMD,"JMD")}
        </div>
        <p class="text-muted">Ready to withdraw</p>
      </div>
    </div>
  `}function PT(){if(ii.method==="bank")return FT();if(ii.method==="agent")return IT()}function FT(){return`
    <div class="card">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-3xl">🏦</div>
        <div>
          <h3 class="text-lg font-semibold">Bank Transfer</h3>
          <p class="text-muted">Transfer to your bank account</p>
        </div>
      </div>
      
      <form id="bankWithdrawForm">
        <div class="form-group">
          <label class="form-label">Select Bank Account</label>
          
          ${[{id:"acc1",bank:"NCB",account:"****1234",name:"John Doe"},{id:"acc2",bank:"Scotiabank",account:"****5678",name:"John Doe"}].map(a=>`
            <div class="bank-account-item" data-account='${JSON.stringify(a)}'>
              <div class="flex items-center gap-4">
                <div class="text-xl">🏦</div>
                <div>
                  <h4 class="font-semibold">${a.bank}</h4>
                  <p class="text-muted text-sm">${a.account} • ${a.name}</p>
                </div>
              </div>
              <input type="radio" name="bankAccount" value="${a.id}">
            </div>
          `).join("")}
          
          <div class="bank-account-item" data-action="add-account">
            <div class="flex items-center gap-4">
              <div class="text-xl">➕</div>
              <div>
                <h4 class="font-semibold">Add New Account</h4>
                <p class="text-muted text-sm">Link a new bank account</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="withdrawAmount">Amount (JMD)</label>
          <div class="flex items-center">
            <span class="currency-symbol text-xl mr-2">J$</span>
            <input 
              type="text" 
              id="withdrawAmount" 
              class="form-input" 
              placeholder="0.00"
              inputmode="numeric"
              required
            >
          </div>
          <p class="text-xs text-muted mt-1">
            Available: ${Pe(j.balances.JMD,"JMD")}
          </p>
        </div>
        
        <div class="grid grid-2 gap-4 mb-6">
          <button type="button" class="btn btn-secondary" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="25000">J$25,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="50000">J$50,000</button>
        </div>
        
        <div class="flex gap-4">
          <button type="button" class="btn btn-secondary flex-1" data-action="withdraw-back">
            Back
          </button>
          <button type="submit" class="btn btn-primary flex-1" data-testid="btnConfirmWithdraw">
            Withdraw
          </button>
        </div>
      </form>
    </div>
  `}function IT(){return`
    <div class="card">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-3xl">🏪</div>
        <div>
          <h3 class="text-lg font-semibold">Cash Agent</h3>
          <p class="text-muted">Pick up cash at any agent location</p>
        </div>
      </div>
      
      <form id="agentWithdrawForm">
        <div class="form-group">
          <label class="form-label" for="agentAmount">Amount (JMD)</label>
          <div class="flex items-center">
            <span class="currency-symbol text-xl mr-2">J$</span>
            <input 
              type="text" 
              id="agentAmount" 
              class="form-input" 
              placeholder="0.00"
              inputmode="numeric"
              required
            >
          </div>
          <p class="text-xs text-muted mt-1">
            Available: ${Pe(j.balances.JMD,"JMD")} • Fee: J$50
          </p>
        </div>
        
        <div class="grid grid-2 gap-4 mb-6">
          <button type="button" class="btn btn-secondary" data-quick-amount="2000">J$2,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="20000">J$20,000</button>
        </div>
        
        <div class="p-4 bg-yellow-50 rounded-lg mb-6">
          <h4 class="font-semibold text-yellow-800 mb-2">How it works:</h4>
          <ol class="text-sm text-yellow-700 space-y-1">
            <li>1. Confirm your withdrawal</li>
            <li>2. Get your one-time pickup code</li>
            <li>3. Visit any NovaPay agent</li>
            <li>4. Show your ID and pickup code</li>
          </ol>
        </div>
        
        <div class="flex gap-4">
          <button type="button" class="btn btn-secondary flex-1" data-action="withdraw-back">
            Back
          </button>
          <button type="submit" class="btn btn-primary flex-1">
            Generate Code
          </button>
        </div>
      </form>
    </div>
  `}function WT(){const i=U("#app");L(i,'[data-action="nav-back"]',"click",()=>{history.length>1?history.back():K("/dashboard")}),L(i,".method-item","click",a=>{const l=a.currentTarget.dataset.method;ii.method=l,Ou()}),L(i,".bank-account-item","click",a=>{if(a.currentTarget.dataset.action==="add-account"){X("Add bank account feature coming soon!");return}const l=a.currentTarget.querySelector('input[type="radio"]');l&&(l.checked=!0,ii.bankAccount=JSON.parse(a.currentTarget.dataset.account))}),L(i,"[data-quick-amount]","click",a=>{const l=a.currentTarget.dataset.quickAmount,r=U("#withdrawAmount")||U("#agentAmount");r&&(r.value=l,r.dispatchEvent(new Event("input")))}),L(i,"#withdrawAmount, #agentAmount","input",a=>{const l=a.target.value.replace(/[^\d.]/g,"");a.target.value=l}),L(i,"#bankWithdrawForm","submit",a=>{a.preventDefault();const l=Co(U("#withdrawAmount").value);if(!U('input[name="bankAccount"]:checked')){X("Please select a bank account");return}if(l<=0){X("Please enter a valid amount");return}if(!Ni(l)){X("Insufficient balance");return}$T(l)}),L(i,"#agentWithdrawForm","submit",a=>{a.preventDefault();const l=Co(U("#agentAmount").value),u=l+50;if(l<=0){X("Please enter a valid amount");return}if(!Ni(u)){X("Insufficient balance (including J$50 fee)");return}t4(l)}),L(i,'[data-action="withdraw-back"]',"click",()=>{ii.method=null,Ou()}),L(i,'[data-action="agent-complete"]',"click",a=>{const l=parseFloat(a.currentTarget.getAttribute("data-total"));isNaN(l)||(Ys("JMD",-l),js({title:"Agent Withdrawal",amount:-l,currency:"JMD",type:"WITHDRAW"}),X("Withdrawal completed successfully!"),ii={method:null,amount:0,bankAccount:null},K("/dashboard"))})}function $T(i,a){const l=U('[data-testid="btnConfirmWithdraw"]');l.textContent="Processing...",l.disabled=!0,setTimeout(()=>{Ys("JMD",-i),js({title:"Bank Withdrawal",amount:-i,currency:"JMD",type:"WITHDRAW"}),X(`Withdrawal of ${Pe(i,"JMD")} initiated`),ii={method:null,amount:0,bankAccount:null},K("/dashboard")},2e3)}function t4(i){const l=i+50,r=Math.random().toString(36).substr(2,8).toUpperCase(),u=U("#app");u.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <div></div>
        <h1 class="page-title">Pickup Code</h1>
        <div></div>
      </div>
      
      <div class="card text-center">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-lg font-semibold mb-2">Withdrawal Approved</h3>
        <p class="text-muted mb-6">Your cash is ready for pickup</p>
        
        <div class="p-6 bg-accent-light rounded-lg mb-6">
          <h4 class="font-semibold mb-2">Pickup Code</h4>
          <div class="text-3xl font-mono font-bold text-accent">${r}</div>
        </div>
        
        <div class="space-y-2 mb-6 text-left">
          <div class="flex justify-between">
            <span class="text-muted">Amount:</span>
            <span>${Pe(i,"JMD")}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">Fee:</span>
            <span>${Pe(50,"JMD")}</span>
          </div>
          <hr>
          <div class="flex justify-between font-semibold">
            <span>Total Deducted:</span>
            <span>${Pe(l,"JMD")}</span>
          </div>
        </div>
        
        <div class="p-4 bg-blue-50 rounded-lg mb-6 text-left">
          <h4 class="font-semibold text-blue-800 mb-2">Instructions:</h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• Visit any NovaPay agent within 24 hours</li>
            <li>• Bring a valid ID</li>
            <li>• Provide this pickup code</li>
            <li>• Code expires in 24 hours</li>
          </ul>
        </div>
        
        <button class="btn btn-primary btn-full" data-action="agent-complete" data-total="${l}">
          Done
        </button>
      </div>
    </div>
  `}const Yy=document.createElement("style");Yy.textContent=`
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
`;document.head.appendChild(Yy);const e4="/assets/Teddy_Lrg-C3LzF-C-.png";function qy(){U("#app"),j.card.hasCard?i4():n4()}function n4(){const i=U("#app");i.innerHTML=`
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" data-action="nav-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Virtual Card</h1>
        <div class="icon-btn-placeholder"></div>
      </div>
      
      <div class="settings-content">
        <div class="settings-group">
          <div class="settings-list">
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
              
              <button class="btn-primary-modern btn-full" data-testid="btnActivateCard">
                Get Virtual Card
              </button>
              
              <p class="text-xs text-muted mt-4">
                Free to activate • No monthly fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,L(i,'[data-testid="btnActivateCard"]',"click",()=>{const a=U('[data-testid="btnActivateCard"]');a.textContent="Activating...",a.disabled=!0,setTimeout(()=>{j.card.hasCard=!0,j.card.masked="•••• •••• •••• 1234",j.card.expiry="12/28",j.card.frozen=!1,en(),X("Virtual card activated successfully!"),qy()},2e3)}),Gy()}function i4(){const i=U("#app");j.txs.filter(a=>a.type==="CARD").slice(0,5),i.innerHTML=`
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" data-action="nav-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Virtual Card</h1>
        <div class="icon-btn-placeholder"></div>
      </div>
      
      <div class="settings-content">
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
            ${j.card.masked}
          </div>
          
          <div class="card-details">
            <div>
              <div class="text-xs opacity-80">VALID THRU</div>
              <div class="font-semibold">${j.card.expiry}</div>
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
            ${j.card.frozen?"🔓 Unfreeze":"🔒 Freeze"} Card
          </button>
        </div>
        
        <!-- Additional Actions -->
        <div class="card mb-6">
          <h3 class="text-lg mb-4">Account Management</h3>
          
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

            <button class="card-action" id="addBankCard">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🏦</div>
                <div>
                  <h4 class="font-semibold">Add Bank/Card</h4>
                  <p class="text-muted text-sm">Link a new bank account or debit card</p>
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
        
        <!-- Linked Accounts & Cards -->
        <div class="card">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg">Linked accounts & cards</h3>
          </div>
          
          <div class="linked-list">
            ${j.card.linkedAccounts&&j.card.linkedAccounts.length?j.card.linkedAccounts.map(a=>`
              <div class="linked-item">
                <div class="linked-main">
                  <div class="linked-label">${a.label}</div>
                  <div class="linked-meta">${a.type==="BANK"?"Bank account":"Card"} · ${a.masked||""}</div>
                </div>
                <div class="linked-status">${a.status||"Active"}</div>
              </div>
            `).join(""):`
              <div class="linked-empty">
                <img src="${e4}" alt="" class="linked-empty-img" />
                <div class="linked-empty-text">
                  <p class="text-muted">No bank accounts or cards linked yet</p>
                  <p class="text-muted text-sm">Use "Add Bank/Card" above to link one.</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `,Gy()}function Gy(){const i=U("#app");L(i,'[data-action="nav-back"]',"click",()=>K("/dashboard")),L(i,"#toggleCvv","click",()=>{const a=U("#cvvDisplay"),l=U("#toggleCvv");a.textContent==="•••"?(a.textContent="123",l.textContent="🙈 Hide CVV"):(a.textContent="•••",l.textContent="👁️ Reveal CVV")}),L(i,"#toggleFreeze","click",()=>{const a=U("#toggleFreeze");j.card.frozen=!j.card.frozen,en(),j.card.frozen?(a.textContent="🔓 Unfreeze Card",X("Card frozen successfully")):(a.textContent="🔒 Freeze Card",X("Card unfrozen successfully"))}),L(i,"#addToWallet","click",()=>{X("Add to Wallet feature coming soon!")}),L(i,"#addBankCard","click",()=>{X("Add Bank/Card linking is coming soon!")}),L(i,"#setLimits","click",()=>{X("Set Limits feature coming soon!")}),L(i,"#cardSettings","click",()=>{X("Card Settings feature coming soon!")})}const Qy=document.createElement("style");Qy.textContent=`
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

  .linked-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .linked-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
  }

  .linked-item:last-child {
    border-bottom: none;
  }

  .linked-label {
    font-weight: 600;
  }

  .linked-meta,
  .linked-status {
    font-size: 0.85rem;
    color: var(--text);
    opacity: 0.7;
  }

  .linked-empty {
    position: relative;
    padding: 2.5rem 1rem 1.75rem;
    text-align: center;
    overflow: hidden;
  }

  .linked-empty-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 180px;
    width: 80%;
    opacity: 1;
    pointer-events: none;
  }

  .linked-empty-text {
    position: relative;
    z-index: 1;
    margin-top: 1.25rem;
  }
`;document.head.appendChild(Qy);function a4(){const i=U("#app");i.innerHTML=`
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
            <h3 class="text-lg font-semibold">${j.session.user.name}</h3>
            <p class="text-muted">${j.session.user.email}</p>
            <p class="text-muted text-sm">${j.session.user.phone}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${j.session.kycTier==="TIER_2"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}">
            ${j.session.kycTier==="TIER_2"?"Verified":"Basic Account"}
          </span>
        </div>
      </div>
      
      <!-- KYC Section -->
      ${j.session.kycTier!=="TIER_2"?`
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
  `,s4()}function s4(){const i=document.querySelector("#app");L(i,'[data-action="nav-back"]',"click",()=>Vy());const a={"#completeKyc":"KYC verification process coming soon!","#enableBiometric":"Biometric authentication coming soon!","#changePin":"Change PIN feature coming soon!","#notifications":"Notification settings coming soon!","#privacy":"Privacy settings coming soon!","#helpCenter":"Help Center coming soon!","#contactSupport":"Support chat coming soon!","#feedback":"Feedback form coming soon!","#terms":"Terms of Service coming soon!","#privacy-policy":"Privacy Policy coming soon!"};for(const[l,r]of Object.entries(a))L(i,l,"click",()=>X(r));L(i,'[data-testid="btnLogout"]',"click",()=>{confirm("Are you sure you want to sign out?")&&(x1(),X("Signed out successfully"),K("/landing"))})}const Xy=document.createElement("style");Xy.textContent=`
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
`;document.head.appendChild(Xy);const Xv="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGQSURBVHgBzZeNbYMwFISPTMAI3iDdoCOEEbJB2QA2SDZIN0gyAeoEYQNgArqB6wObuq349VOVT3rkTzqO94xzANPEpjJThanKlBaq1mqmphQ2oKyA/qe6YIXRN3uFwSeO41gfj0d9vV51VVXa8Xg8uu/4G352NZ0zl0kYYyVJotu21XPQ+C+jGSY6J2LudDrptWRZ5mv86aSC0Fh5oq3wwvA9buUbvEiY46hC4dKweoXfPZHR+jfCVrhueXNZzXhnDgkEMN2DUgqhGHMwXXQfUxo8QIDDQUSmwzP4SoMvEECie479fj/IRuhnHYxZPpAkiqLudYcnhwZrCFDXNaQoy9K9/RQz6IkG0zTNIEuDHxDgfr9DitvtNsjywMwXvElzc10SDubgZu/pKue0kDDJv6lQvGRz8btKpyJh4Xw+663keT4aFkgqYZDFE62FF+ZpjAbXXMokR7UkPHDdeglGWw+TpBAatzPKeM+Y76BxF/m95LIo8juUqXcpkwuqQMDTXWoFxLqK/hGWmjn6bW6ULyka/cC57vi0AAAAAElFTkSuQmCC",Jv="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKCSURBVHgBzZf9bRpBEMXf7i3mbLAMfyAHlEjQQVJB0kHSQZQK7FQAdEAHSQl2B3YFcQcgJQpWHMs4fB33NZlZ+yxbGJRwK8s/6cTOabV6Nzu781BYQ7/fr/h++YCAdwTVBKgJFyg1UkRnKeE4UvFRq14frJz62MvhcNgkmC8iDE+C+hoi6j4mdEng+fnlQQLqgKiitUaxuIVtfwvGGBhP2zlRnCBJEgRBiNk8gBuNGKk06TYaL3oPX99jOLxsp0g7Mvb9Iqp7Zd4NtXZdETqezJ0J5RR06vVad0mgzRylVv3ebgml0jb+h/FkZh8XKEo+Z5m0AqXmUlX4Jtu6W96BPJswmc7xZzxFbni7Q4rfSE3aokp1oS3idrb9jcUJZc66lEZuCJUiH1Kr1WYPpi/Bfq0Kz/OQh5Tvjl+/r/g3RV7CwFR1QuaDBJK9vOIErRV8PvkuMFvhoaz3XgLfL8AVvu9GoKf1W00KryUwDrKXUTBu1pLupaUgJZCL2BWes4+lpsYzhwWqgQySJP+py5BW6AS+D/mM0OBm0QiukPbnAiKcaU7cqQRB4E6gmAgnUHKs49D0bhZdsGJCXqRUXBmHSNGRbrWqI27IJymLu7oeIy+uDIN4xLterBB/koKUrZlyw88jzkn2xCywgZWhFVhnpZTCvrhmN7JJFqazwFn2REvmrh+40e/Diw4rbss4czaet/6qJFsaE1vDLmDD3H1V3+9k8ZJd/vHz4lBpFnnbYUSoNH9j9F23kYMQRTHmixCLxcI6mNzwtkrmXjZqqy1/hliwBF5HQX3EE8CfdxLxOfinP033sULFjrHjUWIqbrOaHzUgbhAs7DQOJr1WqzVaNfMvKPAmQnPv/FoAAAAASUVORK5CYII=",l4="/assets/NoNotifications-D5ZjIhfU.png";function Jy(){const i=U("#app"),a=!!j?.preferences?.notificationsEnabled,l=Array.isArray(j.notifications)&&j.notifications.length>0,r=l?"":`
        <div class="notifications-empty-state">
          <img src="${l4}" alt="No notifications" class="notifications-empty-img" />
        </div>
      `,u=l?`
        <div class="notifications-list">
          ${j.notifications.map(f=>{const p=f.title||"NovaPay",v=o4(f.createdAt),m=f.message||"",b=!f.isRead?"notification-status-dot notification-status-dot-unread":"notification-status-dot";return`
                <div class="notification-card">
                  <div class="notification-main">
                    <div class="notification-icon">
                      <span class="notification-icon-letter">N</span>
                    </div>
                    <div class="notification-content">
                      <div class="notification-header-row">
                        <div class="notification-title">${Kv(p)}</div>
                        <div class="notification-time">${v}</div>
                      </div>
                      <div class="notification-text">${Kv(m)}</div>
                    </div>
                  </div>
                  <span class="${b}"></span>
                </div>
              `}).join("")}
        </div>
      `:"";i.innerHTML=`
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Notifications</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="settings-group">
          <h3 class="settings-group-title">Preferences</h3>
          <div class="settings-list">
            <button class="settings-item" id="btnToggleNotifications">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Turn on notifications?</div>
                <div class="settings-item-desc">Receive alerts about your account activity</div>
              </div>
              <img src="${a?Xv:Jv}" alt="Notifications toggle" class="np-toggle-img" id="notificationsToggleImg" />
            </button>
          </div>
        </div>
      </div>
      ${u||r}

      <div class="notifications-footer">
        <button class="btn-primary-modern" id="btnMarkAllRead" type="button">
          Mark all as read
        </button>
      </div>
    </div>
  `;const h=document.querySelector("#app");L(h,"#btnBack","click",()=>Mn()),L(h,"#btnToggleNotifications","click",()=>{const p=!!!j?.preferences?.notificationsEnabled;j.preferences||(j.preferences={}),j.preferences.notificationsEnabled=p,en();const v=document.getElementById("notificationsToggleImg");v&&(v.src=p?Xv:Jv),X(`Notifications ${p?"enabled":"disabled"}`)}),L(h,"#btnMarkAllRead","click",()=>{if(!(Array.isArray(j.notifications)&&j.notifications.length>0)){X("No notifications to mark as read");return}j.notifications=[],en(),X("All notifications marked as read"),Jy()})}function o4(i){try{return(i?new Date(i):new Date).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}).toLowerCase()}catch{return""}}function Kv(i){return i==null?"":String(i).replace(/[&<>"']/g,a=>{switch(a){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return a}})}function r4(){const i=U("#app");i.innerHTML=`
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
  `,L("click","#btnBack",()=>Mn()),L("click","#btnFilter",()=>X("Filter options coming soon")),document.querySelectorAll(".filter-tab").forEach(a=>{a.addEventListener("click",l=>{document.querySelectorAll(".filter-tab").forEach(u=>u.classList.remove("active")),l.target.classList.add("active");const r=l.target.dataset.filter;_v(r)})}),_v("all")}async function _v(i="all"){const a=U("#txContent");try{const l=await zi("/wallet/transactions");if(!l||l.length===0){a.innerHTML=m4();return}let r=l;i==="income"?r=l.filter(h=>h.kind==="DEPOSIT"||h.kind==="RECEIVE"):i==="expense"&&(r=l.filter(h=>h.kind==="WITHDRAW"||h.kind==="TRANSFER"||h.kind==="BILL"));const u=c4(r);a.innerHTML=d4(u)}catch(l){console.error("[TRANSACTIONS]",l),a.innerHTML=h4()}}function c4(i){const a={};return i.forEach(l=>{const r=new Date(l.createdAt),u=u4(r);a[u]||(a[u]=[]),a[u].push(l)}),a}function u4(i){const a=new Date,l=new Date(a);return l.setDate(l.getDate()-1),i.toDateString()===a.toDateString()?"Today":i.toDateString()===l.toDateString()?"Yesterday":i.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function d4(i){return Object.entries(i).map(([a,l])=>`
    <div class="tx-group">
      <div class="tx-date-header">${a}</div>
      ${l.map(r=>f4(r)).join("")}
    </div>
  `).join("")}function f4(i){const a=i.kind==="DEPOSIT"||i.kind==="RECEIVE",l=a?"tx-icon-green":i.kind==="TRANSFER"?"tx-icon-blue":i.kind==="BILL"?"tx-icon-orange":"tx-icon-red",r=a?"tx-amount-positive":"tx-amount-negative",u=a?"+":"-",h=p4(i.kind),f=v4(i.kind),p=g4(i.createdAt),v=(Number(i.amount||0)/100).toFixed(2);return`
    <div class="tx-card">
      <div class="tx-icon-wrapper ${l}">${h}</div>
      <div class="tx-details">
        <div class="tx-label">${f}</div>
        <div class="tx-time">${p}</div>
        ${i.reference?`<div class="tx-ref">Ref: ${i.reference}</div>`:""}
      </div>
      <div class="tx-amount-wrapper">
        <div class="tx-amount ${r}">${u}$${v}</div>
        <div class="tx-currency">${i.currency}</div>
      </div>
    </div>
  `}function h4(){return`
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
  `}function m4(){return`
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
  `}function p4(i){const a={DEPOSIT:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',WITHDRAW:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',TRANSFER:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',BILL:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',RECEIVE:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'};return a[i]||a.TRANSFER}function v4(i){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[i]||i}function g4(i){try{return new Date(i).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}catch{return"Recently"}}function y4(){const i=U("#app");i.innerHTML=`
    <div class="page-container">
      <header class="page-header-modern">
        <button class="back-button-modern" type="button" id="btnBackFinances">
          <span class="back-icon">←</span>
        </button>
        <div class="page-header-title">
          <h1>Finances</h1>
          <p>Coming Soon</p>
        </div>
      </header>

      <main class="page-body-modern">
        <div class="empty-state-centered">
          <h2>Finances</h2>
          <p>This feature is coming soon.</p>
        </div>
      </main>
    </div>
  `,L("click","#btnBackFinances",()=>{Mn()})}function b4(){const i=U("#app"),a=j?.session?.kycTier||"TIER_1";i.innerHTML=`
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
        <div class="kyc-status-badge ${A4(a)}">
          ${S4(a)}
          <span>${x4(a)}</span>
        </div>
        <h2 class="kyc-status-title">Your Verification Status</h2>
        <p class="kyc-status-desc">${T4(a)}</p>
      </div>

      <!-- Verification Tiers -->
      <div class="kyc-tiers">
        <h3 class="section-title-sm">Verification Levels</h3>
        
        <!-- Tier 1 -->
        <div class="kyc-tier-card ${a==="TIER_1"?"active":a==="TIER_2"||a==="TIER_3"?"completed":""}">
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
            ${a==="TIER_1"||a==="TIER_2"||a==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="1">Start</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Email verification</li>
            <li>Phone number</li>
            <li>Basic profile information</li>
          </ul>
        </div>

        <!-- Tier 2 -->
        <div class="kyc-tier-card ${a==="TIER_2"?"active":a==="TIER_3"?"completed":""}">
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
            ${a==="TIER_2"||a==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="2">Upgrade</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Government-issued ID</li>
            <li>Proof of address</li>
            <li>Selfie verification</li>
          </ul>
        </div>

        <!-- Tier 3 -->
        <div class="kyc-tier-card ${a==="TIER_3"?"active":""}">
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
            ${a==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="3">Upgrade</button>'}
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
  `,L("click","#btnBack",()=>Mn()),document.querySelectorAll("[data-tier]").forEach(l=>{l.addEventListener("click",r=>{const u=r.target.dataset.tier;C4(u)})})}function A4(i){return{TIER_1:"tier-basic",TIER_2:"tier-standard",TIER_3:"tier-premium"}[i]||"tier-basic"}function S4(i){const a={TIER_1:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',TIER_2:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',TIER_3:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>'};return a[i]||a.TIER_1}function x4(i){return{TIER_1:"Basic",TIER_2:"Standard",TIER_3:"Premium"}[i]||"Basic"}function T4(i){return{TIER_1:"You have basic verification. Upgrade to unlock higher limits and premium features.",TIER_2:"You have standard verification. Upgrade to premium for unlimited transactions.",TIER_3:"You have premium verification. Enjoy unlimited transactions and all features."}[i]||"Complete verification to unlock all features."}function C4(i){X(`Starting Tier ${i} verification process...`),setTimeout(()=>{X("Verification process will be available soon")},1e3)}function E4(){const i=U("#app"),a=j?.session?.user||{},l=a.name||a.email?.split("@")[0]||"User",r=a.email||"",u=l.substring(0,2).toUpperCase(),f=`Hi, ${l.split(" ")[0]||l}!`,p=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),v=p?'<img src="'+p+'" alt="'+l+'" class="settings-avatar-img" />':u;i.innerHTML=`
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
        <div class="settings-avatar">${v}</div>
        <h2 class="settings-name">${Zv(f)}</h2>
        <p class="settings-email">${Zv(r)}</p>
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
  `;const m=document.querySelector("#app");L(m,"#btnBack","click",()=>Mn()),L(m,"#btnProfile","click",()=>K("/personal-info")),L(m,"#btnKYC","click",()=>K("/kyc")),L(m,"#btnSecurity","click",()=>X("Security settings coming soon")),L(m,"#btnLanguage","click",()=>X("Language settings coming soon")),L(m,"#btnHelp","click",()=>X("Help center coming soon")),L(m,"#btnTerms","click",()=>X("Terms & Privacy coming soon")),L(m,"#btnAbout","click",()=>X("NovaPay v1.0.0 - Modern Digital Wallet")),L(m,"#btnLogout","click",()=>{confirm("Are you sure you want to log out?")&&(C1(),X("Logged out successfully"),K("/login"))}),L(m,"#toggleNotifications","change",y=>{const b=y.target.checked;X(`Notifications ${b?"enabled":"disabled"}`)})}function Zv(i){return String(i).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}const w4="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJQSURBVHgB5ZRNaBNBGIbfzSZpGtM0NWlqSGpiMawVitY/9CQo4qla9CSK0YMFsQc9phcjaHOR1oInD0KKHjwlF2sFfyoB8QcPPYhJtZIfQyBNdDdNmybpGmcGW9zY2NaT4AvDDjsfz7zzzXwf8K+LSz7UVO2tFYzMWHHlSzvWKxO/iLvOOHqbRaRmNOAn4y7fNmcJJ50ijpskjOeNkGT1mmAubQkvhSj2b5hDKGxE/y0HeK3e6guFm8FxwLGuPHpNIkKSaVWox5xDsGMamzSL8N+3YuhBK8oVDrzFYvHRgDcf9Jid59HTncc5EhxZ0CFa0q0Iu2pLY9ieRKXIoe+mA2OvjMtry0CqyelGPH1nwJEdBVxwZEFtvyg0KfL1aOsneDaSDeM6eAbbEUkoN1UAqbKSmkEP7y6gp02CSS3j9ZwBgm4Bz91T2NlYxOjjFnjv2FhsrThBEKpYQU367/D3pRk4VtYSdzIbNF+j4y2op7rAJQUGktjXOc/mA8RVMGz8UzhU9Raow9uXUwxGHVINEsdnj37DuoH0oQdvxNhxAzkzdkW2o+N9FwN7z2TYWDNwL3EUvB6D3VLBtbQN5xMuiDLPYIc+Cpggt05dPhn+zDauleKWaeDQpTSKKhUuJjeTcmxTBFNw4KuZzekLoCeIJBqQymp+B3pPZ9B/IsecHJjqVLy/WtG1WLmBQU8dFMkfDm8jerbG7el2V5eSPzFrIEfcgvjPS1hNLm0Zz9xR9g2S8vXfs5JuM0a6DcnXSIZ0m9TfdBuZlSGt7V+P/h/pB40e48T9pTDvAAAAAElFTkSuQmCC",M4="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEMSURBVHgB5ZO9qsIwFMf/rYXeD2y5cLfW4a6976EvoC8g7oK4io8grqKuguLooKuDvoA6OrRuTlVU/Gg99RutJIKD4C9DDiH55SQnAV4dwQzp7vXg79AED+O/0M2YiCfz+kKJNcG1bczLJbgTG9+ZLGs6WzjL50hY3MUb04RSKD4uXHU72IwsOJZFKZ4fgWQYWFC2UBUENJ1f6B1zmk7tYlE/L1zUa/tNCLVS9RX6FsUh4Sk+CC5jUVGw7vfALfyIxvDT7iCg3x5LMv6hNpr4jCd8hXeL4sm+kimsB30IwSAcqrJATdQ0342YQg+ZMpWpX7aa8EojhyNgwXw2x2xd8MEnpHvj5elf7w3ZAnBaTOTFmblEAAAAAElFTkSuQmCC",D4="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFhSURBVHgB5ZJPKARhGMafqVFqYuNAirI2cVl/L3LZclBal3XawyYpadxWXJSyTuKwx01u5OBEUcqmKNZcbCFbyFxM1vqfta12VmO+tyZJzcxhDspTM9/X0zu/3qdngL8urqVnVbM7PKcswpuXTWd49gqLnci+F7CfUDAudmB2QUJwoPmXJwzPwFVfCssNGz0V8HXXokwoQTan0nkpv6KmWqD7bSaHtfULRLue0VZZsN6QyPrDYMmTDPy9DYD27V1dvxD4M3UOlX+yBvYTQKN48xEfxibiOtTzwwuENiBMR+BqrYJlZHYJBpoILE7uYiXWh2jsmCIzLyRu07CdUgjISmGRtnZkjAx6sbR8RrFZZMNjpUz5y9FuUQpFZh8xYPL0HnuHCp1GOYaX1osppm6g3pmXwg2F47b/w9GHTbg/0ubAfFGzDbQj/tFdByfFvR0knN1QlY7gpHSgBCfleCn/UF/rXJ4Rji0dqQAAAABJRU5ErkJggg==",R4="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIHSURBVHgB5VPNTxNxEH39WaNGjPVmuLh4V1b9B1r04sly0JiYGD/RG+LZKBy56GKMcMD4ETFepGpMMNGwBEi4EAgfh5YUukAaCCTAAfq1pcPONF2akrYXDiS85JfdnZm8fTO/N8CBx5YHlKjTaHt8nBidnyfpYkOPnBftI5SLxYhr+OSsmMQK+a8/wmQbhptPBvykjtwIgiwLqcuXYLe14endC/jw+hpqz54sK+JUzVF0v7yCm0NdyLQ8k5i3uRnH+03g/adJyrS+cv+SCgZFVXxpkzqdXKlCji2OTFNS1924bbzJd+fkwNIftPyjhe9/KKlpVBgBEzFKCXk0xXX8HV/eFA7mUix3dGIFTb+zsLp7oep1GUHyfB2yHR172uVYbt6SOm5xDLV4+Py/cAioCkoVVoM3FQhUdAFtbLjv6Xv3UQ0e/jP2EV7l91ctyg0MyFPpOuDzVS7e7xmq+qvfcP3OL0Si6zIvnmlCeeRkDWOvAKcm3djo1vB7PBwXDuYC+4dNzEoK/uLDZmd/lSoMR9dESfEysB/Z7MwlLds/Q5Q448snnacdClH7u9Gyu8zbJaTOhhSTZk2TFO9vxpHNrXg0DWt9w3gyWIOe3kjZuXd9mcKtpj6s3n6ME3MxqHOaLEO6IQCHsDV/g85tT3/8i0dvo7uur4DI7LpsyMz2aRwzTSE9pNgBbgwluEY7oJgAAAAASUVORK5CYII=",B4="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIASURBVHgBnZJdSFNhGMd/55wd2RkznBUG4kXWgiLSiyAKwj5A8KpdxIpgJMyLukgpMISGSBdeBF0E9kVGliy0IFoZdhFBEV6IMkgKpUWQszwJNTbPCrd2OuesDabC9Pzh5eX9Pe/78H+e5xU0AV3o7iF2qp3Onrc8HTxGThZQ44v4AhHOt2zEH+7C1P7qTspJfHRlFP3+ANt7L3AztLckeCOwCf/1MwgNDXy+/YS1SNhzJKy3HawkGOmGRAIx9sVyKC78IufdinCug+HdJ+kfnCKlZcon/J3V9eXQSphZgdnX/JByEs3Hy1ch6Wq8bEKz+VpiySrRLLfgzNyt839m3luLHP0Ppug4IJE77YeqKsSJaMmF3NHDFh/xXS4y7zYPrYFdKIKOJDtIZiTm4klu3ZlEDNXM4PY1IzQ1ce341eKj76rGxXtfUcMj1rCCA+3FWKVbJrm5Fm+9Qn2djLtGwb3Fk69MD7Yy728jUHGCodfzJe7ejMU52xdDffEOGhtLYrLhbGi8j8iH54xP38XlyHPr27BO7TBKDvW28E2DdDbPXAs/6Lr0Cgc2ZLaj2mm4sSzlWTT609pFbCi1uMT7x8MoMjglY7LqJ14+m7BithzWKgkqpieJjypIToU/M2Mc8mT5OLfTXg8LqtuQNobxl9mUi7TxdWw7LGg26VrB/gF/R7sO7T1rtgAAAABJRU5ErkJggg==";function N4(){const i=U("#app"),a=j?.session?.user||{},r=(a.name||"").split(" ").filter(Boolean),u=r[0]||"",h=r.slice(1).join(" "),f=a.firstName||u,p=a.lastName||h,v=a.addressStreet||"",m=a.addressCity||"",y=a.addressStateParish||"",b=a.addressCountry||"",T=a.phone||"",O=a.email||"";i.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackPersonal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Personal Information</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <form id="personalInfoForm" class="auth-form">
          <div class="form-field">
            <label class="form-label" for="firstName">First Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="firstName"
                class="form-input-modern"
                placeholder="First name"
                value="${ei(f)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="lastName">Last Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="lastName"
                class="form-input-modern"
                placeholder="Last name"
                value="${ei(p)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="addressStreet">Address</label>
            <div class="input-wrapper" style="margin-bottom: 8px;">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="addressStreet"
                class="form-input-modern"
                placeholder="Street"
                value="${ei(v)}"
              />
            </div>
          </div>

          <div class="form-field">
            <div class="input-wrapper" style="margin-bottom: 8px;">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="addressCity"
                class="form-input-modern"
                placeholder="City"
                value="${ei(m)}"
              />
            </div>
          </div>

          <div class="form-field">
            <div class="input-wrapper" style="margin-bottom: 8px;">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="addressStateParish"
                class="form-input-modern"
                placeholder="State / Parish"
                value="${ei(y)}"
              />
            </div>
          </div>

          <div class="form-field">
            <div class="input-wrapper">
              <img
                id="countryFlagIcon"
                class="input-icon country-flag-icon"
                alt="Country flag"
              />
              <input
                type="text"
                id="addressCountry"
                class="form-input-modern"
                placeholder="Country"
                value="${ei(b)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="phone">Telephone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.27l4.52 1.13a1 1 0 0 1 .75 1z"></path>
              </svg>
              <input
                type="tel"
                id="phone"
                class="form-input-modern"
                placeholder="Phone number"
                value="${ei(T)}"
              />
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
                placeholder="you@example.com"
                value="${ei(O)}"
              />
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSavePersonal">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  `;const H=document.querySelector("#app");L(H,"#btnBackPersonal","click",()=>Mn());const Q=()=>{const J=U("#addressCountry"),Y=U("#countryFlagIcon");if(!J||!Y)return;const P=U4(J.value);P?(Y.src=P,Y.style.display=""):(Y.removeAttribute("src"),Y.style.display="none")};Q(),L(H,"#addressCountry","input",()=>Q()),L(H,"#personalInfoForm","submit",J=>{if(J.preventDefault(),!j.session){X("Please sign in again to update your information."),Mn();return}const Y=U("#firstName"),P=U("#lastName"),q=U("#addressStreet"),it=U("#addressCity"),W=U("#addressStateParish"),lt=U("#addressCountry"),$=U("#phone"),et=U("#email"),Ct=(Y?.value||"").trim(),Vt=(P?.value||"").trim(),It=(q?.value||"").trim(),Wt=(it?.value||"").trim(),Fe=(W?.value||"").trim(),pe=(lt?.value||"").trim(),ce=($?.value||"").trim(),B=(et?.value||"").trim(),V=j.session.user||{},_=[];Ct&&_.push(Ct),Vt&&_.push(Vt);const dt=_.join(" ")||V.name||"",pt={...V,firstName:Ct,lastName:Vt,addressStreet:It,addressCity:Wt,addressStateParish:Fe,addressCountry:pe,phone:ce,email:B||V.email,name:dt};j.session={...j.session,user:pt},en(),X("Personal information updated."),Mn()})}function U4(i){if(!i)return"";const a=String(i).trim().toLowerCase();return a==="jamaica"?w4:a==="canada"?M4:a==="united states"||a==="usa"||a==="us"?D4:a==="united kingdom"||a==="uk"||a==="great britain"?R4:a==="cayman islands"||a==="cayman island"?B4:""}function ei(i){return String(i).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function k4(i,{onClick:a}={}){const l=document.createElement("div");return l.className="biller-card",l.dataset.billerId=i.id,l.innerHTML=`
    <div class="biller-card-main">
      <div class="biller-card-icon">${i.icon||""}</div>
      <div class="biller-card-info">
        <div class="biller-card-name">${i.name}</div>
        ${i.category?`<div class="biller-card-category">${i.category}</div>`:""}
      </div>
    </div>
    <div class="biller-card-chevron">→</div>
  `,typeof a=="function"&&l.addEventListener("click",()=>a(i)),l}if(!document.getElementById("biller-card-styles")){const i=document.createElement("style");i.id="biller-card-styles",i.textContent=`
    .biller-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.9rem 1rem;
      border-radius: var(--radius, 0.75rem);
      border: 1px solid var(--border, #262626);
      background: rgba(15, 23, 42, 0.85);
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 0.5rem;
      gap: 0.75rem;
    }

    .biller-card:hover {
      border-color: var(--primary, #7c3aed);
      background: rgba(124, 58, 237, 0.08);
      transform: translateY(-1px);
    }

    .biller-card-main {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .biller-card-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      background: rgba(15, 23, 42, 0.9);
    }

    .biller-card-info {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .biller-card-name {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .biller-card-category {
      font-size: 0.8rem;
      color: #9ca3af;
    }

    .biller-card-chevron {
      color: #6b7280;
      font-size: 1.1rem;
    }
  `,document.head.appendChild(i)}function Pv(i,a,{onSelect:l}={}){i&&(i.innerHTML="",a.forEach(r=>{const u=k4(r,{onClick:l});i.appendChild(u)}))}const Fv=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];function z4(){const i=U("#app");if(!i)return;i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Billers</h1>
        <div></div>
      </div>

      <div class="mb-4">
        <input
          type="text"
          id="billerSearch"
          class="form-input"
          placeholder="Search billers..."
        />
      </div>

      <div class="card">
        <h3 class="text-lg mb-4">All Billers</h3>
        <div id="billerList" class="biller-grid"></div>
      </div>
    </div>
  `;const a=U("#billerList");Pv(a,Fv,{onSelect:l=>{K(`/more/billers/${l.id}`)}}),L("click",'[data-action="nav-back"]',()=>K("/dashboard")),L("input","#billerSearch",l=>{const r=(l.target.value||"").toLowerCase(),u=Fv.filter(h=>h.name.toLowerCase().includes(r)||(h.category||"").toLowerCase().includes(r));Pv(a,u,{onSelect:h=>{K(`/more/billers/${h.id}`)}})})}const O4=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];function L4(i){return O4.find(a=>a.id===i)}function V4(i){return{jps:"Account Number",nwc:"Account Number",flow:"Phone Number",digicel:"Phone Number",lime:"Account Number",ncb:"Credit Card Number",sagicor:"Policy Number",guardian:"Policy Number"}[i]||"Account Number"}function H4(i){return{jps:"123456789",nwc:"987654321",flow:"876-555-0123",digicel:"876-555-0123",lime:"123456789",ncb:"4111-1111-1111-1111",sagicor:"POL123456",guardian:"GL789012"}[i]||"Enter account number"}function j4(i){if(!i)return 0;const a=String(i).replace(/[^0-9.]/g,""),l=Number(a||"0");return Math.round(l*100)}function Y4(i){const{id:a}=i||{},l=L4(a),r=U("#app");if(!r)return;if(!l){r.innerHTML=`
      <div class="container page">
        <div class="page-header">
          <button class="back-btn" data-action="nav-back">←</button>
          <h1 class="page-title">Bill Payment</h1>
          <div></div>
        </div>
        <div class="card">
          <p>Biller not found.</p>
        </div>
      </div>
    `,L("click",'[data-action="nav-back"]',()=>K("/more/billers"));return}const h=j.savedBillers.find(f=>f.name===l.name)?.account||"";r.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Bill Payment</h1>
        <div></div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-3xl">${l.icon}</div>
          <div>
            <h3 class="text-lg font-semibold">${l.name}</h3>
            <p class="text-muted">${l.category}</p>
          </div>
        </div>

        <form id="billerPaymentForm">
          <div class="form-group">
            <label class="form-label" for="accountNumber">
              ${V4(l.id)}
            </label>
            <input
              type="text"
              id="accountNumber"
              class="form-input"
              placeholder="${H4(l.id)}"
              value="${h}"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="billAmount">Amount (JMD)</label>
            <div class="flex items-center">
              <span class="currency-symbol text-xl mr-2">J$</span>
              <input
                type="text"
                id="billAmount"
                class="form-input"
                placeholder="0.00"
                inputmode="numeric"
                required
              />
            </div>
          </div>

          <div class="flex gap-4 mt-4">
            <button type="button" class="btn btn-secondary flex-1" data-action="bill-back">
              Back
            </button>
            <button type="submit" class="btn btn-primary flex-1" data-testid="btnContinueBill">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  `,L("click",'[data-action="nav-back"]',()=>K("/more/billers")),L("click",'[data-action="bill-back"]',()=>K("/more/billers")),L("input","#billAmount",f=>{const p=f.target.value.replace(/[^0-9.]/g,"");f.target.value=p}),L("submit","#billerPaymentForm",f=>{f.preventDefault();const p=U("#accountNumber").value.trim(),v=j4(U("#billAmount").value);if(!p||v<=0){X("Please fill in all required fields");return}if(!Ni(v)){X("Insufficient balance. Please add money first.");return}const m={billerId:l.id,billerName:l.name,icon:l.icon,category:l.category,account:p,amount:v};sessionStorage.setItem("novapay_biller_draft",JSON.stringify(m)),K(`/more/billers/${l.id}/confirm`)})}function q4(i,a="JMD"){const l=(Number(i||0)/100).toFixed(2);return`${a} $${l}`}function G4(){const i=U("#app");if(!i)return;const a=sessionStorage.getItem("novapay_biller_draft");if(!a){i.innerHTML=`
      <div class="container page">
        <div class="page-header">
          <button class="back-btn" data-action="nav-back">←</button>
          <h1 class="page-title">Confirm Payment</h1>
          <div></div>
        </div>
        <div class="card">
          <p>No bill payment in progress.</p>
        </div>
      </div>
    `,L("click",'[data-action="nav-back"]',()=>K("/more/billers"));return}const l=JSON.parse(a);i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Confirm Payment</h1>
        <div></div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-3xl">${l.icon}</div>
          <div>
            <h3 class="text-lg font-semibold">${l.billerName}</h3>
            <p class="text-muted">${l.category}</p>
          </div>
        </div>

        <div class="mb-4">
          <div class="flex justify-between mb-2">
            <span class="text-muted">Account</span>
            <span>${l.account}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-muted">Amount</span>
            <span>${q4(l.amount)}</span>
          </div>
        </div>

        <div class="alert alert-info mb-4">
          <p class="text-sm">Please confirm the details before submitting your payment.</p>
        </div>

        <div class="flex gap-4 mt-4">
          <button class="btn btn-secondary flex-1" data-action="edit-bill">
            Back
          </button>
          <button class="btn btn-primary flex-1" data-action="confirm-bill" data-testid="btnConfirmBill">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  `,L("click",'[data-action="nav-back"]',()=>K(`/more/billers/${l.billerId}`)),L("click",'[data-action="edit-bill"]',()=>K(`/more/billers/${l.billerId}`)),L("click",'[data-action="confirm-bill"]',()=>{if(!Ni(l.amount)){X("Insufficient balance. Please add money first.");return}const r=U('[data-testid="btnConfirmBill"]');r&&(r.disabled=!0,r.textContent="Processing..."),setTimeout(()=>{Ys("JMD",-l.amount),js({title:`${l.billerName} Bill`,amount:-l.amount,currency:"JMD",type:"BILL"}),T1({name:l.billerName,icon:l.icon,category:l.category,account:l.account}),sessionStorage.setItem("novapay_last_biller_tx",JSON.stringify(l)),sessionStorage.removeItem("novapay_biller_draft"),K(`/more/billers/${l.billerId}/success`)},1200)})}function Q4(i,a="JMD"){const l=(Number(i||0)/100).toFixed(2);return`${a} $${l}`}function X4(){const i=U("#app");if(!i)return;const a=sessionStorage.getItem("novapay_last_biller_tx"),l=a?JSON.parse(a):null;i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Payment Success</h1>
        <div></div>
      </div>

      <div class="card text-center">
        <div class="success-icon mb-4">✅</div>
        <h2 class="text-xl font-semibold mb-2">Bill Paid Successfully</h2>
        <p class="text-muted mb-4">
          ${l?`Your payment to ${l.billerName} was completed.`:"Your bill payment was completed."}
        </p>

        ${l?`
          <div class="mb-4 text-left">
            <div class="flex justify-between mb-1">
              <span class="text-muted">Biller</span>
              <span>${l.billerName}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-muted">Account</span>
              <span>${l.account}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-muted">Amount</span>
              <span>${Q4(l.amount)}</span>
            </div>
          </div>
        `:""}

        <div class="flex flex-col gap-3 mt-4">
          <button class="btn btn-primary" data-action="go-dashboard">Back to Dashboard</button>
          <button class="btn btn-secondary" data-action="pay-another">Pay Another Bill</button>
        </div>
      </div>
    </div>
  `,L("click",'[data-action="nav-back"]',()=>K("/dashboard")),L("click",'[data-action="go-dashboard"]',()=>K("/dashboard")),L("click",'[data-action="pay-another"]',()=>K("/more/billers"))}function J4(){const i=U("#app");if(!i)return;i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Remittance</h1>
        <div></div>
      </div>

      <div class="card mb-4">
        <h3 class="text-lg mb-2">Receive Money from Abroad</h3>
        <p class="text-muted text-sm">
          Choose a remittance partner to receive funds directly into your NovaPay wallet.
        </p>
      </div>

      <div class="card mb-3 remittance-option" data-provider="western-union">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="remit-logo remit-logo-wu">WU</div>
            <div>
              <h4 class="font-semibold">Western Union</h4>
              <p class="text-muted text-sm">Global money transfers</p>
            </div>
          </div>
          <div class="text-muted">→</div>
        </div>
      </div>

      <div class="card remittance-option" data-provider="moneygram">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="remit-logo remit-logo-mg">MG</div>
            <div>
              <h4 class="font-semibold">MoneyGram</h4>
              <p class="text-muted text-sm">Fast global payouts</p>
            </div>
          </div>
          <div class="text-muted">→</div>
        </div>
      </div>
    </div>
  `,L("click",'[data-action="nav-back"]',()=>K("/dashboard",{animate:"slide-left-fade"})),i.querySelectorAll(".remittance-option").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.provider;r==="western-union"?K("/remittance/western-union",{animate:"slide-right-fade"}):r==="moneygram"&&K("/remittance/moneygram",{animate:"slide-right-fade"})})})}const Ky=document.createElement("style");Ky.textContent=`
  .remittance-option {
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .remittance-option:hover {
    border-color: var(--primary);
    background-color: rgba(84, 58, 248, 0.04);
  }
  .remit-logo {
    width: 48px;
    height: 32px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
  }
  .remit-logo-wu {
    background: #111827;
    color: #facc15;
  }
  .remit-logo-mg {
    background: linear-gradient(135deg, #e11d48, #fb7185);
    color: #ffffff;
  }
`;typeof document<"u"&&document.head.appendChild(Ky);function K4(){const i=U("#app");if(!i)return;i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Western Union</h1>
        <div></div>
      </div>

      <div class="card mb-6">
        <h3 class="text-lg mb-4">Recipient Details</h3>

        <div class="form-group">
          <label class="form-label" for="recipientName">Recipient Name</label>
          <input
            id="recipientName"
            type="text"
            class="form-input"
            placeholder="Full legal name"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="wuAddressLine1">Address Line 1</label>
          <input
            id="wuAddressLine1"
            type="text"
            class="form-input"
            placeholder="Street address, P.O. box"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="wuAddressLine2">Address Line 2</label>
          <input
            id="wuAddressLine2"
            type="text"
            class="form-input"
            placeholder="Apartment, suite, building (optional)"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="wuLocality" id="wuLocalityLabel">City / Parish</label>
          <input
            id="wuLocality"
            type="text"
            class="form-input"
            placeholder="City or parish"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="recipientCountry">Country</label>
          <select id="recipientCountry" class="form-input">
            <option value="">Select country</option>
            <option value="Jamaica">Jamaica</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="amount">Amount</label>
          <div class="flex items-center gap-2">
            <select id="wuCurrency" class="form-input" style="max-width: 120px;">
              <option value="JMD">JMD</option>
              <option value="USD">USD</option>
            </select>
            <input
              id="amount"
              type="text"
              class="form-input"
              placeholder="0.00"
              inputmode="numeric"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="purpose">Purpose</label>
          <select id="purpose" class="form-input">
            <option value="">Select purpose</option>
            <option value="Family Support">Family Support</option>
            <option value="Personal">Personal</option>
            <option value="Gift">Gift</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="remit-bottom-bar">
        <button class="btn btn-primary btn-full" id="btnRemitWUContinue">Continue</button>
      </div>
    </div>
  `,L("click",'[data-action="nav-back"]',()=>K("/remittance",{animate:"slide-left-fade"})),L("click","#btnRemitWUContinue",_4);const a=U("#recipientCountry"),l=()=>{const r=U("#wuLocalityLabel"),u=U("#wuLocality");if(!r||!u)return;a?.value==="Jamaica"?(r.textContent="Parish",u.placeholder="Clarendon, St. Andrew..."):(r.textContent="City",u.placeholder="Fort Lauderdale, Kingston...")};a&&a.addEventListener("change",l),l()}async function _4(){const i=U("#recipientName")?.value.trim(),a=U("#wuAddressLine1")?.value.trim(),l=U("#wuAddressLine2")?.value.trim(),r=U("#wuLocality")?.value.trim(),u=U("#recipientCountry")?.value,h=U("#amount")?.value.replace(/[^\d.]/g,""),f=U("#wuCurrency")?.value,p=U("#purpose")?.value;if(!i||!a||!r||!u||!f||!h||!p){X("Please complete all required fields");return}const v=Number(h);if(!v||v<=0){X("Enter a valid amount");return}const m=U("#btnRemitWUContinue");if(m){m.disabled=!0,m.textContent="Submitting...";try{const b=await zi("/api/remittance/western-union/create",{method:"POST",body:JSON.stringify({recipientName:i,recipientAddressLine1:a,recipientAddressLine2:l||"",recipientCityOrParish:r,recipientCountry:u,amount:v,currency:f,purpose:p})});sessionStorage.setItem("novapay_last_remittance_result",JSON.stringify({provider:"western-union",referenceId:b?.referenceId||null})),K("/remittance/success",{animate:"slide-right-fade"})}catch(y){const b=y?.message||y?.status?.message||"Unable to submit remittance.";sessionStorage.setItem("novapay_last_remittance_error",JSON.stringify({provider:"western-union",message:b})),K("/remittance/error",{animate:"slide-right-fade"})}finally{m.disabled=!1,m.textContent="Continue"}}}const _y=document.createElement("style");_y.textContent=`
  .remit-bottom-bar {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: 1.5rem;
    padding: 1rem 0;
    background: linear-gradient(to top, #ffffff, rgba(255,255,255,0.85));
  }
`;typeof document<"u"&&document.head.appendChild(_y);function Z4(){const i=U("#app");if(!i)return;i.innerHTML=`
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">MoneyGram</h1>
        <div></div>
      </div>

      <div class="card mb-6">
        <h3 class="text-lg mb-4">Receiver Details</h3>

        <div class="form-group">
          <label class="form-label" for="receiverName">Receiver Name</label>
          <input
            id="receiverName"
            type="text"
            class="form-input"
            placeholder="Full legal name"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="receiverPhone">Receiver Phone</label>
          <input
            id="receiverPhone"
            type="tel"
            class="form-input"
            placeholder="Phone number"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="mgAddressLine1">Address Line 1</label>
          <input
            id="mgAddressLine1"
            type="text"
            class="form-input"
            placeholder="Street address, P.O. box"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="mgAddressLine2">Address Line 2</label>
          <input
            id="mgAddressLine2"
            type="text"
            class="form-input"
            placeholder="Apartment, suite, building (optional)"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="mgLocality" id="mgLocalityLabel">City / Parish</label>
          <input
            id="mgLocality"
            type="text"
            class="form-input"
            placeholder="City or parish"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="country">Country</label>
          <select id="country" class="form-input">
            <option value="">Select country</option>
            <option value="Jamaica">Jamaica</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="deliveryMethod">Delivery Method</label>
          <select id="deliveryMethod" class="form-input">
            <option value="">Select method</option>
            <option value="Cash Pickup">Cash Pickup</option>
            <option value="Bank Deposit">Bank Deposit</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="mgAmount">Amount</label>
          <div class="flex items-center gap-2">
            <select id="mgCurrency" class="form-input" style="max-width: 120px;">
              <option value="JMD">JMD</option>
              <option value="USD">USD</option>
            </select>
            <input
              id="mgAmount"
              type="text"
              class="form-input"
              placeholder="0.00"
              inputmode="numeric"
            />
          </div>
        </div>
      </div>

      <div class="remit-bottom-bar">
        <button class="btn btn-primary btn-full" id="btnRemitMGContinue">Continue</button>
      </div>
    </div>
  `,L("click",'[data-action="nav-back"]',()=>K("/remittance",{animate:"slide-left-fade"})),L("click","#btnRemitMGContinue",P4);const a=U("#country"),l=()=>{const r=U("#mgLocalityLabel"),u=U("#mgLocality");if(!r||!u)return;a?.value==="Jamaica"?(r.textContent="Parish",u.placeholder="Clarendon, St. Andrew..."):(r.textContent="City",u.placeholder="Fort Lauderdale, Kingston...")};a&&a.addEventListener("change",l),l()}async function P4(){const i=U("#receiverName")?.value.trim(),a=U("#receiverPhone")?.value.trim(),l=U("#mgAddressLine1")?.value.trim(),r=U("#mgAddressLine2")?.value.trim(),u=U("#mgLocality")?.value.trim(),h=U("#country")?.value,f=U("#deliveryMethod")?.value,p=U("#mgAmount")?.value.replace(/[^\d.]/g,""),v=U("#mgCurrency")?.value;if(!i||!a||!l||!u||!h||!f||!v||!p){X("Please complete all required fields");return}const m=Number(p);if(!m||m<=0){X("Enter a valid amount");return}const y=U("#btnRemitMGContinue");if(y){y.disabled=!0,y.textContent="Submitting...";try{const T=await zi("/api/remittance/moneygram/create",{method:"POST",body:JSON.stringify({receiverName:i,receiverPhone:a,receiverAddressLine1:l,receiverAddressLine2:r||"",receiverCityOrParish:u,country:h,deliveryMethod:f,amount:m,currency:v})});sessionStorage.setItem("novapay_last_remittance_result",JSON.stringify({provider:"moneygram",referenceId:T?.referenceId||null})),K("/remittance/success",{animate:"slide-right-fade"})}catch(b){const T=b?.message||b?.status?.message||"Unable to submit remittance.";sessionStorage.setItem("novapay_last_remittance_error",JSON.stringify({provider:"moneygram",message:T})),K("/remittance/error",{animate:"slide-right-fade"})}finally{y.disabled=!1,y.textContent="Continue"}}}const Zy=document.createElement("style");Zy.textContent=`
  .remit-bottom-bar {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: 1.5rem;
    padding: 1rem 0;
    background: linear-gradient(to top, #ffffff, rgba(255,255,255,0.85));
  }
`;typeof document<"u"&&document.head.appendChild(Zy);function F4(){const i=U("#app");if(!i)return;const a=sessionStorage.getItem("novapay_last_remittance_result"),l=a?JSON.parse(a):null,r=l?.referenceId?String(l.referenceId):null;i.innerHTML=`
    <div class="container page page-center">
      <div class="card text-center">
        <div class="text-6xl mb-4">✅</div>
        <h2 class="text-xl font-semibold mb-2">Transfer Submitted</h2>
        <p class="text-muted mb-4">Your remittance request has been successfully submitted.</p>
        ${r?`
          <div class="p-4 bg-accent-light rounded-lg mb-4">
            <p class="text-sm text-blue-800 mb-1">Reference ID</p>
            <p class="font-mono text-base">${r}</p>
          </div>
        `:""}
        <button class="btn btn-primary btn-full" id="btnRemitSuccessBack">Back to Remittance</button>
      </div>
    </div>
  `,L("click","#btnRemitSuccessBack",()=>{K("/remittance",{animate:"slide-left-fade"})})}function I4(){const i=U("#app");if(!i)return;const a=sessionStorage.getItem("novapay_last_remittance_error"),l=a?JSON.parse(a):null,r=l?.message||"Something went wrong while submitting your remittance.";i.innerHTML=`
    <div class="container page page-center">
      <div class="card text-center">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-xl font-semibold mb-2">Transfer Failed</h2>
        <p class="text-error mb-4">${r}</p>
        <button class="btn btn-primary btn-full" id="btnRemitErrorRetry">Try Again</button>
      </div>
    </div>
  `,L("click","#btnRemitErrorRetry",()=>{const u=l?.provider;u==="western-union"?K("/remittance/western-union",{animate:"slide-left-fade"}):u==="moneygram"?K("/remittance/moneygram",{animate:"slide-left-fade"}):K("/remittance",{animate:"slide-left-fade"})})}function W4(){const i=U("#app"),a=j?.session?.user?.name||"User",l=a.substring(0,2).toUpperCase();j?.session?.user?.email;const r=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),u=r?'<img src="'+r+'" alt="'+a+'" class="settings-avatar-img" />':l;let h=r||null;i.innerHTML=`
    <div class="page-container">
      <header class="page-header-modern">
        <button type="button" class="icon-btn" id="btnBackProfilePhoto" aria-label="Back to dashboard">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 class="page-title-modern">Change Profile Picture</h1>
        <div class="icon-btn-placeholder"></div>
      </header>

      <main class="settings-content">
        <section class="settings-profile" style="padding-top: 16px;">
          <div class="settings-avatar">
            ${u}
          </div>
          <p class="settings-email">Hi ${a.split(" ")[0]}!</p>
        </section>

        <section class="settings-group">
          <div class="settings-group-title">Profile photo</div>
          <div class="settings-list">
            <div class="settings-item">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 7h4l2-3h4l2 3h4v13H4z"></path>
                  <circle cx="12" cy="13" r="3.5"></circle>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Upload new photo</div>
                <div class="settings-item-desc">Choose an image from your device</div>
              </div>
              <input id="profilePhotoInput" type="file" accept="image/*" style="display:none;" />
              <button type="button" class="btn-outline-sm" id="btnPickPhoto">Browse</button>
            </div>
          </div>
        </section>

        <section class="settings-group">
          <button type="button" class="btn-primary-modern" id="btnSavePhoto" disabled>
            Save profile picture
          </button>
        </section>
      </main>
    </div>
  `,L("click","#btnBackProfilePhoto",()=>{K("/dashboard",{animate:"slide-left-fade"})}),L("click","#btnPickPhoto",()=>{const f=U("#profilePhotoInput");f&&f.click()}),L("change","#profilePhotoInput",f=>{const p=f.target.files&&f.target.files[0],v=U("#btnSavePhoto");if(!p){h=r||null,v&&(v.disabled=!h);return}const m=new FileReader;m.onload=()=>{h=m.result;const y=U(".settings-avatar");y&&h&&(y.innerHTML='<img src="'+h+'" alt="'+a+'" class="settings-avatar-img" />'),v&&(v.disabled=!1),X&&X("Preview updated. Tap Save profile picture to apply.")},m.onerror=()=>{X&&X("Could not read that image. Please try another file."),h=r||null,v&&(v.disabled=!h)},m.readAsDataURL(p)}),L("click","#btnSavePhoto",()=>{if(!h){X&&X("Please choose a photo first.");return}try{localStorage.setItem("novapay_profile_picture",h),X&&X("Profile picture updated.","success")}catch(f){console.error("[ChangeProfilePicture] Failed to save image",f),X&&X("Could not save image on this device.");return}K("/dashboard",{animate:"slide-left-fade"})})}let yo=null;function $4(){const i=U("#app");i.innerHTML=`
    <div class="page-container">
      <header class="page-header-modern">
        <button class="back-button-modern" type="button" id="btnBackScanQR">
          <span class="back-icon">←</span>
        </button>
        <div class="page-header-title">
          <h1>Scan QR Code</h1>
          <p>Point your camera at a NovaPay QR code</p>
        </div>
      </header>

      <main class="page-body-modern">
        <div class="qr-scan-wrapper">
          <video id="qrVideo" class="qr-video" autoplay playsinline></video>
          <div class="qr-scan-frame"></div>
        </div>
        <p class="qr-scan-hint">We need access to your camera to scan QR codes.</p>
      </main>
    </div>
  `,L("click","#btnBackScanQR",()=>{eC(),Mn()}),tC()}async function tC(){const i=document.getElementById("qrVideo");if(!i||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){X("Camera not supported on this device.");return}try{const a=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:!1});yo=a,i.srcObject=a}catch(a){console.error("[ScanQR] Failed to access camera",a),X("Unable to access camera. Please check permissions.")}}function eC(){yo&&(yo.getTracks().forEach(i=>i.stop()),yo=null)}class nC{constructor(){this.routes=new Map,this.currentRoute=null,this.defaultRoute="/login",this.authRoute="/dashboard",this.pendingAnimation=null,window.addEventListener("hashchange",()=>this.handleRoute()),window.addEventListener("load",()=>this.handleRoute()),console.log("[Router] Initialized hash-based routing system ✅")}addRoute(a,l,r=!1){this.routes.set(a,{handler:l,requiresAuth:r})}setDefaults(a,l){this.defaultRoute=a,this.authRoute=l}matchRoute(a){const l=this.routes.get(a);if(l)return{path:a,params:{},...l};for(const[r,u]of this.routes.entries()){if(!r.includes(":"))continue;const h=[],f=r.split("/").map(m=>m.startsWith(":")?(h.push(m.slice(1)),"([^/]+)"):m).join("/"),p=new RegExp(`^${f}$`),v=a.match(p);if(v){const m={};return h.forEach((y,b)=>{m[y]=v[b+1]}),{path:r,params:m,...u}}}return null}navigate(a,l={}){this.pendingAnimation=l&&l.animate?l.animate:null,window.location.hash!==`#${a}`?window.location.hash=a:this.handleRoute()}redirect(a){window.location.replace(`#${a}`)}goBack(){window.history.back()}getCurrentHash(){return window.location.hash.slice(1)||""}handleRoute(){const a=this.getCurrentHash();console.log(`[Router] Handling route: ${a||"(none)"}`);const l=this.matchRoute(a);if(!l){const r=Kc()?this.authRoute:this.defaultRoute;console.warn(`[Router] Unknown route "${a}". Redirecting to: ${r}`),this.redirect(r);return}if(l.requiresAuth&&!Kc()){console.warn(`[Router] Protected route "${a}" blocked — user not logged in`),this.redirect(this.defaultRoute);return}if(!l.requiresAuth&&Kc()&&(a==="/login"||a==="/register"||a==="/landing"||a==="/forgot-password"||a==="/check-email")){console.log(`[Router] User logged in, redirecting from public route "${a}" to dashboard`),this.redirect(this.authRoute);return}try{console.log(`[Router] Rendering route: ${a}`);const r=document.getElementById("app");r&&(r.innerHTML=""),l.handler(l.params||{}),this.applyAnimation(),this.currentRoute=a}catch(r){console.error(`[Router] Error rendering route "${a}":`,r);const u=document.getElementById("app");u&&(u.innerHTML=`
          <div style="padding:20px;color:#fff;background:#111;text-align:center;">
            <h3>🚨 Rendering Error</h3>
            <p>${r.message}</p>
          </div>`)}}applyAnimation(){if(!this.pendingAnimation)return;const a=document.getElementById("app");if(!a){this.pendingAnimation=null;return}const r={"slide-right-fade":"np-anim-slide-right-fade","slide-left-fade":"np-anim-slide-left-fade"}[this.pendingAnimation];this.pendingAnimation=null,r&&(a.classList.remove("np-anim-slide-right-fade","np-anim-slide-left-fade"),a.offsetWidth,a.classList.add(r),a.addEventListener("animationend",()=>{a.classList.remove(r)},{once:!0}))}}const bt=new nC;function K(i,a){bt.navigate(i,a||{})}function Mn(){bt.goBack()}bt.addRoute("/login",E1);bt.addRoute("/register",w1);bt.addRoute("/forgot-password",M1);bt.addRoute("/check-email",D1);bt.addRoute("/landing",GT);bt.addRoute("/dashboard",X1,!0);bt.addRoute("/transfers",go,!0);bt.addRoute("/add-money",_T,!0);bt.addRoute("/bills",()=>K("/more/billers"),!0);bt.addRoute("/withdraw",Ou,!0);bt.addRoute("/card",qy,!0);bt.addRoute("/profile",a4,!0);bt.addRoute("/notifications",Jy,!0);bt.addRoute("/change-profile-picture",W4,!0);bt.addRoute("/transactions",r4,!0);bt.addRoute("/finances",y4,!0);bt.addRoute("/scan-qr",$4,!0);bt.addRoute("/kyc",b4,!0);bt.addRoute("/settings",E4,!0);bt.addRoute("/personal-info",N4,!0);bt.addRoute("/more/billers",z4,!0);bt.addRoute("/more/billers/:id",Y4,!0);bt.addRoute("/more/billers/:id/confirm",G4,!0);bt.addRoute("/more/billers/:id/success",X4,!0);bt.addRoute("/remittance",J4,!0);bt.addRoute("/remittance/western-union",K4,!0);bt.addRoute("/remittance/moneygram",Z4,!0);bt.addRoute("/remittance/success",F4,!0);bt.addRoute("/remittance/error",I4,!0);bt.setDefaults("/login","/dashboard");console.log("[Router] Routes registered:",Array.from(bt.routes.keys()));console.log("[NovaPay] Vite frontend initializing...");try{y1()}catch(i){console.error("[NovaPay] Failed to load auth token:",i)}function Iv(){!location.hash||location.hash==="#/"||location.hash===""?(console.log("[NovaPay] No hash detected, redirecting to /login"),K("/login")):(console.log(`[NovaPay] Hash detected: ${location.hash}`),window.dispatchEvent(new Event("hashchange")))}function Wv(){const i=document.getElementById("app");i&&!i.innerHTML.trim()&&(i.innerHTML=`
      <div style="padding:16px;color:#fff;background:#111;text-align:center;">
        <h2>🚀 NovaPay Loaded</h2>
        <p>Frontend running. Check router or console for issues.</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `,console.warn("[NovaPay] Failsafe rendered: router did not paint any view."))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{console.log("[NovaPay] DOMContentLoaded → initializing..."),Iv(),setTimeout(Wv,500)}):(console.log("[NovaPay] DOM ready → initializing immediately..."),Iv(),setTimeout(Wv,500));
