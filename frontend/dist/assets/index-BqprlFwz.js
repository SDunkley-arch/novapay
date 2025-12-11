(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const d of f.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function l(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function r(u){if(u.ep)return;u.ep=!0;const f=l(u);fetch(u.href,f)}})();const To=/Android/i.test(navigator.userAgent),r2=location.hostname==="localhost"||location.hostname==="127.0.0.1",ko=typeof window<"u"&&!!window.Capacitor;let Va;const c2="http://localhost:4000",_m=location.hostname;!To&&!ko?Va=c2:ko&&To?(Va="http://10.0.2.2:3000",console.log("[NovaPay] Android Capacitor detected, using 10.0.2.2:3000")):To?(Va="http://10.0.2.2:3000",console.log("[NovaPay] Android browser detected, using 10.0.2.2:3000")):ko?Va=`http://${_m}:3000`:r2?Va="http://localhost:3000":Va=`http://${_m}:3000`;const Os=Va;try{console.log("[NovaPay] API_BASE_URL =",Os),console.log("[NovaPay] isAndroid =",To),console.log("[NovaPay] isCapacitor =",ko),console.log("[NovaPay] userAgent =",navigator.userAgent)}catch{}let _s=null;function Mg(a,i){_s=a;try{const l=i||{},r=l.persist!==void 0?l.persist:!0,u=typeof l.ttlMs=="number"&&l.ttlMs>0;if(!r){localStorage.removeItem("nv_token"),localStorage.removeItem("nv_token_exp");return}if(localStorage.setItem("nv_token",a),u){const f=Date.now()+l.ttlMs;localStorage.setItem("nv_token_exp",String(f))}else localStorage.removeItem("nv_token_exp")}catch{}}function u2(){try{const a=localStorage.getItem("nv_token");if(!a)return;const i=localStorage.getItem("nv_token_exp");if(i){const l=Number(i);if(!Number.isNaN(l)&&Date.now()>l){sd();return}}_s=a}catch{}}function sd(){_s=null,localStorage.removeItem("nv_token"),localStorage.removeItem("nv_token_exp")}function d2(a={}){const i={"Content-Type":"application/json",...a};return _s?{...i,Authorization:`Bearer ${_s}`}:i}async function Ya(a,i={}){const l=`${Os}${a}`;try{console.log("[NovaPay] Fetch",i.method||"GET",l)}catch{}try{const r=await fetch(l,{...i,headers:d2(i.headers||{})});let u=null;try{u=await r.clone().json()}catch(f){console.error("[NovaPay] JSON parse error:",f),u=null}if(r.status===401)throw sd(),window.location.hash="#/login",new Error("Unauthorized");if(!r.ok)throw console.error(`[NovaPay] API Error: HTTP ${r.status}`,u),u||new Error(`HTTP ${r.status}`);return u}catch(r){throw console.error("[NovaPay] Network Error:",r),!navigator.onLine||r.name==="TypeError"?{error:{code:"NETWORK_ERROR",message:"Cannot connect to server. Please check your connection."}}:r}}const V={session:null,balances:{JMD:125e3,USD:180},txs:[{id:"t1",title:"From John",amount:7500,currency:"JMD",type:"P2P_RECV",ts:"2025-09-01"},{id:"t2",title:"JPS Bill",amount:-8500,currency:"JMD",type:"BILL",ts:"2025-09-02"}],notifications:[],savedBillers:[],card:{hasCard:!1,masked:"•••• 1234",expiry:"12/28",frozen:!1,linkedAccounts:[],savedCards:[]}},le={SESSION:"novapay_session",BALANCES:"novapay_balances",TRANSACTIONS:"novapay_transactions",NOTIFICATIONS:"novapay_notifications",BILLERS:"novapay_billers",CARD:"novapay_card"};function f2(){try{const a=localStorage.getItem(le.SESSION);if(a)try{const d=JSON.parse(a),v=d.rememberMe,p=d.rememberMeExpiresAt;v===!0&&p&&Date.now()>p?localStorage.removeItem(le.SESSION):V.session=d}catch(d){console.error("Error parsing stored session:",d)}const i=localStorage.getItem(le.BALANCES);i&&(V.balances=JSON.parse(i));const l=localStorage.getItem(le.TRANSACTIONS);l&&(V.txs=JSON.parse(l));const r=localStorage.getItem(le.NOTIFICATIONS);r&&(V.notifications=JSON.parse(r));const u=localStorage.getItem(le.BILLERS);u&&(V.savedBillers=JSON.parse(u));const f=localStorage.getItem(le.CARD);f&&(V.card=JSON.parse(f),Array.isArray(V.card.savedCards)||(V.card.savedCards=[]))}catch(a){console.error("Error loading state:",a)}}function tn(){try{if(V.session){const{rememberMe:a,rememberMeExpiresAt:i}=V.session,l=Date.now();a===!0?!i||l<i?localStorage.setItem(le.SESSION,JSON.stringify(V.session)):localStorage.removeItem(le.SESSION):a===!1?localStorage.removeItem(le.SESSION):localStorage.setItem(le.SESSION,JSON.stringify(V.session))}else localStorage.removeItem(le.SESSION);localStorage.setItem(le.BALANCES,JSON.stringify(V.balances)),localStorage.setItem(le.TRANSACTIONS,JSON.stringify(V.txs)),localStorage.setItem(le.NOTIFICATIONS,JSON.stringify(V.notifications||[])),localStorage.setItem(le.BILLERS,JSON.stringify(V.savedBillers)),localStorage.setItem(le.CARD,JSON.stringify(V.card))}catch(a){console.error("Error saving state:",a)}}function h2(){Object.values(le).forEach(a=>{localStorage.removeItem(a)})}function fu(){return V.session!==null}function p2(){V.session=null,tn()}function ua(a){const i={id:"t"+Date.now(),ts:new Date().toISOString().split("T")[0],...a};return V.txs.unshift(i),tn(),i}function da(a,i){V.balances[a]!==void 0&&(V.balances[a]+=i,tn())}function zn(a,i="JMD"){return V.balances[i]>=a}function m2(a){V.savedBillers.find(l=>l.name===a.name&&l.account===a.account)||(V.savedBillers.push({id:"b"+Date.now(),...a}),tn())}function Eg(){try{V.session=null,V.balances={JMD:0,USD:0},V.txs=[],V.notifications=[],V.savedBillers=[],V.card={hasCard:!1,masked:"",expiry:"",frozen:!1,linkedAccounts:[],savedCards:[]},h2(),console.log("[NovaPay] Session cleared successfully")}catch(a){console.error("[NovaPay] Failed to clear session:",a)}}f2();const ld=120*1e3;let hu=null,Dg=Date.now(),Qm=!1;function Bg(){try{return Qm=!localStorage.getItem("novapay_has_launched"),Qm?(localStorage.setItem("novapay_has_launched","true"),console.log("[NovaPay] First launch detected, redirecting to login"),Y("/login"),!0):!1}catch(a){return console.error("[NovaPay] Error checking first launch:",a),!1}}function v2(){if(Bg())return;Ng(),["mousedown","mousemove","keypress","scroll","touchstart","click","touchmove"].forEach(i=>{document.addEventListener(i,Jm,{passive:!0})}),window.addEventListener("hashchange",Jm),console.log("[NovaPay] Session manager initialized with timeout of",ld,"ms")}function Jm(){Dg=Date.now(),Ng()}function Ng(){hu&&clearTimeout(hu),hu=setTimeout(Rg,ld)}function Rg(){console.log("[NovaPay] Session timed out due to inactivity"),sd(),Eg(),Y("/login",{replace:!0,state:{timeout:!0,message:"Your session has expired due to inactivity. Please log in again."}})}function g2(){const a=window.location.hash;return a.includes("/login")||a.includes("/register")||a.includes("/landing")||a.includes("/forgot-password")?!0:Date.now()-Dg>=ld?(Rg(),!1):!0}function k(a){return document.querySelector(a)}function D(a,i,l,r){try{let u=document,f,d,v;const p=g=>typeof g=="string"&&(g[0]==="#"||g[0]==="."||g[0]==="["||g.includes(" "));if(typeof a=="string"&&typeof i=="string"&&typeof l=="function"&&r===void 0){u=document;const g=a,b=i;p(g)&&!p(b)?(f=g,d=b):(p(b)&&p(g),f=b,d=g),v=l}else u=a instanceof Element?a:document,f=i,d=l,v=r;if(typeof v!="function"||typeof d!="string"||typeof f!="string"){console.warn(`[NovaPay] Invalid listener for ${f??i} (${d??l})`);return}if(!u.querySelector(f)){u.addEventListener(d,g=>{g.target.closest(f)&&v(g)});return}const m=u.querySelector(f);m?m.addEventListener(d,v):console.warn(`[NovaPay] Invalid listener for ${f} (${d})`)}catch(u){console.error("[NovaPay] Event binding failed:",u)}}function q(a){alert(a)}const Xm=300*1e3;function y2(a={}){const i=k("#app"),l=window.location.hash.includes("timeout=true")?"Your session has expired due to inactivity. Please log in again.":"";localStorage.getItem("novapay_first_launch")===null&&localStorage.setItem("novapay_first_launch","false"),i.innerHTML=`
    ${l?`<div class="timeout-message">${l}</div>`:""}
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
            <img src="/assets/np-logo.png" alt="NovaPay Logo" width="100" height="100" style="object-fit: contain; border-radius: 12px;">
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
  `,D("click",'[data-testid="btnBack"]',()=>{Y("/landing")}),D("click","#forgotPassword",u=>{u.preventDefault(),Y("/forgot-password",{animate:"slide-right-fade"})}),console.log("[NovaPay] Login page loaded, API URL:",Os),D("submit","#loginForm",async u=>{u.preventDefault();const f=k("#email").value.trim(),d=k("#password").value,v=k("#rememberMe"),p=!!v&&v.checked;if(!f){q("Please enter your email address");return}if(!d){q("Please enter your password");return}if(!navigator.onLine){q("No internet connection. Please check your network settings.");return}console.log("[NovaPay] Attempting login for:",f,"to URL:",`${Os}/auth/login`);const m=k('[data-testid="btnLogin"]');m.textContent="Signing In...",m.disabled=!0;try{const g=await Ya("/auth/login",{method:"POST",body:JSON.stringify({email:f,password:d})});Mg(g.token,{persist:p,ttlMs:p?Xm:0});const b=Date.now();V.session={user:{email:g.user.email,id:g.user.id},kycTier:"TIER_1",rememberMe:p,rememberMeExpiresAt:p?b+Xm:null},Array.isArray(V.notifications)||(V.notifications=[]),V.notifications.unshift({id:"n"+Date.now(),message:"Welcome to NovaPay!",createdAt:new Date().toISOString()}),tn(),q("Welcome back!","success"),Y("/dashboard")}catch(g){const b=g?.error?.code||g?.message||"LOGIN_FAILED";let S="Unable to sign in";b==="BAD_CRED"?S="Invalid email or password":b==="NO_USER"?S="Account not found":b==="NO_AUTH"?S="Session expired, please log in again":b==="NETWORK_ERROR"||b==="TypeError"||g.name==="TypeError"?S="Network connection issue. Please check your internet connection.":b.includes("CORS")||b.includes("cors")?S="Server connection issue. Please try again later.":(b==="ConnectException"||g.message&&g.message.includes("Failed to connect"))&&(S="Cannot connect to server. Please ensure the server is running and accessible."),console.error("Login Error:",{code:b,message:g.message,stack:g.stack,error:g}),q(S),console.log("[NovaPay] API Base URL:",Os),console.log("[NovaPay] Network Status:",navigator.onLine?"Online":"Offline"),console.log("[NovaPay] User Agent:",navigator.userAgent)}finally{m.textContent="Sign In",m.disabled=!1}})}function b2(){const a=k("#app");a.innerHTML=`
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
  `,D("click",'[data-testid="btnBack"]',()=>{Y("/landing")}),D("submit","#registerForm",async i=>{i.preventDefault();const l=k("#firstName").value.trim(),r=k("#lastName").value.trim(),u=`${l} ${r}`.trim(),f=k("#email").value.trim(),d=k("#phone").value.trim(),v=k("#password").value,p=!!k("#agreeTerms")&&k("#agreeTerms").checked;if(!l||!r||!f||!d||!v||!p){q("Please fill in all fields and agree to the Terms & Conditions");return}if(v.length<6){q("Password must be at least 6 characters");return}const m=k('[data-testid="btnRegister"]');if(m.textContent="Creating Account...",m.disabled=!0,!navigator.onLine){q("No internet connection. Please check your network settings."),m.textContent="Create Account",m.disabled=!1;return}try{const g=await Ya("/auth/register",{method:"POST",body:JSON.stringify({name:u,email:f,phone:d,password:v})});Mg(g.token),V.session={user:{email:g.user.email,id:g.user.id,name:g.user.name||u,phone:g.user.phone||d},kycTier:"TIER_1"},tn(),q("Account created successfully!","success"),Y("/dashboard")}catch(g){const b=g?.error?.code||g?.message||"REGISTER_FAILED";let S="Unable to create account. Please try again.";b==="EXISTS"?S="An account with this email already exists":b==="BAD_INPUT"?S="Please check your information and try again":b==="INVALID_EMAIL"?S="Please enter a valid email address":b==="WEAK_PASSWORD"?S="Password is too weak":(b==="NETWORK_ERROR"||b==="TypeError"||g.name==="TypeError")&&(S="Network connection issue. Please check your internet connection."),console.error("Registration Error:",{code:b,message:g.message,stack:g.stack,error:g}),q(S)}finally{m.textContent="Create Account",m.disabled=!1}}),D("input","#phone",i=>{let l=i.target.value.replace(/\D/g,"");l.length>=3&&(l=l.replace(/(\d{3})(\d{0,3})(\d{0,4})/,(r,u,f,d)=>{let v=u;return f&&(v+="-"+f),d&&(v+="-"+d),v})),i.target.value=l})}const zg="/assets/Popup-VzOhX8gb.png";function x2(){const a=k("#app");a&&(a.innerHTML=`
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
            <img src="${zg}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnForgotPopupDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `,D("click",'[data-testid="btnBack"]',()=>{Y("/login",{animate:"slide-left-fade"})}),D("submit","#forgotPasswordForm",async i=>{i.preventDefault();const l=k("#forgotEmail"),r=l?l.value.trim():"";if(!r){q("Please enter your email address");return}sessionStorage.setItem("novapay_password_recovery_email",r);const u=k('[data-testid="btnForgotPasswordContinue"]');u&&(u.textContent="Sending...",u.disabled=!0);try{q("If an account exists for this email, we will send reset instructions.","info")}finally{u&&(u.textContent="Continue",u.disabled=!1)}const f=k("#forgotRecoveryBase"),d=k("#forgotRecoverySheet");f&&f.classList.add("password-recovery-base"),d&&(d.style.display="flex")}),D("click","#btnForgotPopupDone",()=>{const i=k("#forgotRecoveryBase"),l=k("#forgotRecoverySheet");i&&i.classList.remove("password-recovery-base"),l&&(l.style.display="none"),sessionStorage.removeItem("novapay_password_recovery_email"),Y("/login",{animate:"slide-left-fade"})}))}function S2(){const a=k("#app");if(!a)return;const l=sessionStorage.getItem("novapay_password_recovery_email")||""||"your email",r=A2(l);a.innerHTML=`
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
            <img src="${zg}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnCheckEmailDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `,D("click",'[data-testid="btnBack"]',()=>{Y("/forgot-password",{animate:"slide-left-fade"})}),D("click","#btnCheckEmailDone",()=>{sessionStorage.removeItem("novapay_password_recovery_email"),Y("/login",{animate:"slide-left-fade"})})}function A2(a){return String(a).replace(/[&<>"']/g,i=>i==="&"?"&amp;":i==="<"?"&lt;":i===">"?"&gt;":i==='"'?"&quot;":"&#39;")}function w2(){const a=k("#app"),l=(V?.session?.user?.name||(V?.session?.user?.email?V.session.user.email.split("@")[0]:"User")).split(" ")[0],r=l.substring(0,2).toUpperCase(),u=Array.isArray(V.notifications)?V.notifications.length:0,f=u>0,d=u>9?"9+":String(u),v=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),p=v?`<img src="${v}" alt="${l}" class="wallet-avatar-img" />`:`<span class="wallet-avatar-initials">${r}</span>`;a.innerHTML=`
    <div class="wallet-dashboard">
      <!-- Background with frosted overlay -->
      <div class="wallet-bg">
        <div class="wallet-bg-image"></div>
        <div class="wallet-bg-frost"></div>
      </div>

      <!-- Main Content -->
      <div class="wallet-content">
        <!-- Top Header: Avatar, Greeting, Bell -->
        <header class="wallet-header">
          <div class="wallet-user">
            <div class="wallet-avatar" id="walletAvatar">
              ${p}
            </div>
            <span class="wallet-greeting">Hello, ${l}</span>
          </div>
          <button class="wallet-bell${f?" wallet-bell-active":""}" id="walletBell" type="button" aria-label="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            ${f?`<span class="wallet-bell-badge">${d}</span>`:""}
          </button>
        </header>

        <!-- Balance Section -->
        <section class="wallet-balance-section">
          <p class="wallet-balance-label">Wallet balance</p>
          <h1 class="wallet-balance-amount" id="walletBalance">$155,832<span class="wallet-balance-cents">.00</span></h1>
          
          <!-- Change Indicators -->
          <div class="wallet-indicators">
            <div class="wallet-indicator wallet-indicator-positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              <span id="positiveChange">+2,340</span>
            </div>
            <div class="wallet-indicator wallet-indicator-negative">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
              <span id="negativeChange">-1,645</span>
            </div>
          </div>
        </section>

        <!-- Action Bar - matching reference design -->
        <div class="wallet-action-bar">
          <div class="wallet-action-bar-inner">
            <button class="wallet-action" id="actionTransfer" type="button">
              <div class="wallet-action-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
              <span class="wallet-action-label">Transfer</span>
            </button>
            
            <button class="wallet-action" id="actionWithdraw" type="button">
              <div class="wallet-action-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="17" y1="7" x2="7" y2="17"/>
                  <polyline points="17 17 7 17 7 7"/>
                </svg>
              </div>
              <span class="wallet-action-label">Withdraw</span>
            </button>
            
            <button class="wallet-action-grid" id="actionMenu" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="6" height="6" rx="1"/>
                <rect x="14" y="4" width="6" height="6" rx="1"/>
                <rect x="4" y="14" width="6" height="6" rx="1"/>
                <rect x="14" y="14" width="6" height="6" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Send Scroller Card -->
      <section class="quick-send-card">
        <div class="quick-send-header">
          <div class="quick-send-title-row">
            <span class="quick-send-title">Quick send</span>
            <span class="quick-send-count">8</span>
          </div>
          <button class="quick-send-menu" type="button" aria-label="More options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
              <circle cx="12" cy="5" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="12" cy="19" r="2"/>
            </svg>
          </button>
        </div>
        <div class="quick-send-avatars">
          <div class="quick-send-avatar" data-user="nina">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Nina" />
            </div>
            <span class="quick-send-name">Nina</span>
          </div>
          <div class="quick-send-avatar quick-send-avatar-selected" data-user="kim">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Kim" />
            </div>
            <span class="quick-send-name">Kim</span>
          </div>
          <div class="quick-send-avatar" data-user="john">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="John" />
            </div>
            <span class="quick-send-name">John</span>
          </div>
          <div class="quick-send-avatar" data-user="nomaa">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Nomaa" />
            </div>
            <span class="quick-send-name">Nomaa</span>
          </div>
        </div>
      </section>

      <!-- Transactions Card -->
      <section class="transactions-card">
        <div class="transactions-header">
          <h2 class="transactions-title">Transactions</h2>
          <button class="transactions-filter-icon" type="button" aria-label="Filter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            <span class="filter-label">Filter</span>
          </button>
        </div>
        
        <!-- Filter Pills Row -->
        <div class="transactions-pills">
          <button class="transactions-pill transactions-pill-active" data-filter="all">All</button>
          <button class="transactions-pill" data-filter="spendings">Spendings</button>
          <button class="transactions-pill" data-filter="earnings">Earnings</button>
        </div>
        
        <!-- Transaction List -->
        <div class="transactions-list" id="transactionsList">
          <div class="transaction-item">
            <div class="transaction-icon transaction-icon-shopping">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div class="transaction-details">
              <span class="transaction-name">Shopping</span>
              <span class="transaction-time">Today, 3:14 pm</span>
            </div>
            <span class="transaction-amount transaction-amount-negative">-$125</span>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-icon transaction-icon-person">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" alt="Helen T." />
            </div>
            <div class="transaction-details">
              <span class="transaction-name">Helen T.</span>
              <span class="transaction-time">Today, 8:09 am</span>
            </div>
            <span class="transaction-amount transaction-amount-positive">+$38.6</span>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-icon transaction-icon-person">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Marcus J." />
            </div>
            <div class="transaction-details">
              <span class="transaction-name">Marcus J.</span>
              <span class="transaction-time">Yesterday, 3:21 pm</span>
            </div>
            <span class="transaction-amount transaction-amount-negative">-$72</span>
          </div>
        </div>
      </section>
    </div>
  `,D("click","#walletBell",()=>Y("/notifications",{animate:"slide-right-fade"})),D("click","#walletAvatar",()=>Y("/change-profile-picture")),D("click","#actionTransfer",()=>Y("/transfers")),D("click","#actionWithdraw",()=>Y("/withdraw")),D("click","#actionMenu",()=>Y("/remittance",{animate:"slide-right-fade"})),D("click",".quick-send-avatar",m=>{const g=m.target.closest(".quick-send-avatar");if(g){const b=g.dataset.user;Y(`/transfers?to=${b}`)}}),D("click",".transactions-pill",m=>{document.querySelectorAll(".transactions-pill").forEach(b=>b.classList.remove("transactions-pill-active")),m.target.classList.add("transactions-pill-active")}),T2()}async function T2(){const a=k("#walletBalance"),i=k("#positiveChange"),l=k("#negativeChange");try{const[r,u]=await Promise.all([Ya("/wallet/balances"),Ya("/wallet/transactions").catch(()=>[])]),f=Number(r.JMD||0)/100/155,d=Number(r.USD||0)/100,v=f+d;if(a){const p=v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),[m,g]=p.split(".");a.innerHTML=`$${m}<span class="wallet-balance-cents">.${g}</span>`}if(u&&u.length>0){const p=new Date,m=new Date(p.getTime()-10080*60*1e3);let g=0,b=0;u.forEach(S=>{if(new Date(S.createdAt)>=m){const H=Number(S.amount||0)/100;S.kind==="DEPOSIT"||S.kind==="RECEIVE"||S.kind==="P2P_RECV"?g+=H:b+=H}}),i&&(i.textContent=`+${g.toLocaleString("en-US",{maximumFractionDigits:0})}`),l&&(l.textContent=`-${b.toLocaleString("en-US",{maximumFractionDigits:0})}`)}}catch(r){console.error("[WALLET DASHBOARD]",r)}}function k2(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var pu={exports:{}},st={};var Pm;function C2(){if(Pm)return st;Pm=1;var a=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),f=Symbol.for("react.consumer"),d=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),S=Symbol.iterator;function L(w){return w===null||typeof w!="object"?null:(w=S&&w[S]||w["@@iterator"],typeof w=="function"?w:null)}var H={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Q=Object.assign,J={};function F(w,O,_){this.props=w,this.context=O,this.refs=J,this.updater=_||H}F.prototype.isReactComponent={},F.prototype.setState=function(w,O){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,O,"setState")},F.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function K(){}K.prototype=F.prototype;function G(w,O,_){this.props=w,this.context=O,this.refs=J,this.updater=_||H}var at=G.prototype=new K;at.constructor=G,Q(at,F.prototype),at.isPureReactComponent=!0;var W=Array.isArray;function lt(){}var $={H:null,A:null,T:null,S:null},et=Object.prototype.hasOwnProperty;function Mt(w,O,_){var Z=_.ref;return{$$typeof:a,type:w,key:O,ref:Z!==void 0?Z:null,props:_}}function jt(w,O){return Mt(w.type,O,w.props)}function ee(w){return typeof w=="object"&&w!==null&&w.$$typeof===a}function ne(w){var O={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(_){return O[_]})}var en=/\/+/g;function xe(w,O){return typeof w=="object"&&w!==null&&w.key!=null?ne(""+w.key):O.toString(36)}function he(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(lt,lt):(w.status="pending",w.then(function(O){w.status==="pending"&&(w.status="fulfilled",w.value=O)},function(O){w.status==="pending"&&(w.status="rejected",w.reason=O)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function R(w,O,_,Z,ot){var ht=typeof w;(ht==="undefined"||ht==="boolean")&&(w=null);var Ct=!1;if(w===null)Ct=!0;else switch(ht){case"bigint":case"string":case"number":Ct=!0;break;case"object":switch(w.$$typeof){case a:case i:Ct=!0;break;case g:return Ct=w._init,R(Ct(w._payload),O,_,Z,ot)}}if(Ct)return ot=ot(w),Ct=Z===""?"."+xe(w,0):Z,W(ot)?(_="",Ct!=null&&(_=Ct.replace(en,"$&/")+"/"),R(ot,O,_,"",function(qi){return qi})):ot!=null&&(ee(ot)&&(ot=jt(ot,_+(ot.key==null||w&&w.key===ot.key?"":(""+ot.key).replace(en,"$&/")+"/")+Ct)),O.push(ot)),1;Ct=0;var ge=Z===""?".":Z+":";if(W(w))for(var Jt=0;Jt<w.length;Jt++)Z=w[Jt],ht=ge+xe(Z,Jt),Ct+=R(Z,O,_,ht,ot);else if(Jt=L(w),typeof Jt=="function")for(w=Jt.call(w),Jt=0;!(Z=w.next()).done;)Z=Z.value,ht=ge+xe(Z,Jt++),Ct+=R(Z,O,_,ht,ot);else if(ht==="object"){if(typeof w.then=="function")return R(he(w),O,_,Z,ot);throw O=String(w),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.")}return Ct}function j(w,O,_){if(w==null)return w;var Z=[],ot=0;return R(w,Z,"","",function(ht){return O.call(_,ht,ot++)}),Z}function X(w){if(w._status===-1){var O=w._result;O=O(),O.then(function(_){(w._status===0||w._status===-1)&&(w._status=1,w._result=_)},function(_){(w._status===0||w._status===-1)&&(w._status=2,w._result=_)}),w._status===-1&&(w._status=0,w._result=O)}if(w._status===1)return w._result.default;throw w._result}var ft=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var O=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(O))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},vt={map:j,forEach:function(w,O,_){j(w,function(){O.apply(this,arguments)},_)},count:function(w){var O=0;return j(w,function(){O++}),O},toArray:function(w){return j(w,function(O){return O})||[]},only:function(w){if(!ee(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return st.Activity=b,st.Children=vt,st.Component=F,st.Fragment=l,st.Profiler=u,st.PureComponent=G,st.StrictMode=r,st.Suspense=p,st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=$,st.__COMPILER_RUNTIME={__proto__:null,c:function(w){return $.H.useMemoCache(w)}},st.cache=function(w){return function(){return w.apply(null,arguments)}},st.cacheSignal=function(){return null},st.cloneElement=function(w,O,_){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var Z=Q({},w.props),ot=w.key;if(O!=null)for(ht in O.key!==void 0&&(ot=""+O.key),O)!et.call(O,ht)||ht==="key"||ht==="__self"||ht==="__source"||ht==="ref"&&O.ref===void 0||(Z[ht]=O[ht]);var ht=arguments.length-2;if(ht===1)Z.children=_;else if(1<ht){for(var Ct=Array(ht),ge=0;ge<ht;ge++)Ct[ge]=arguments[ge+2];Z.children=Ct}return Mt(w.type,ot,Z)},st.createContext=function(w){return w={$$typeof:d,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:f,_context:w},w},st.createElement=function(w,O,_){var Z,ot={},ht=null;if(O!=null)for(Z in O.key!==void 0&&(ht=""+O.key),O)et.call(O,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ot[Z]=O[Z]);var Ct=arguments.length-2;if(Ct===1)ot.children=_;else if(1<Ct){for(var ge=Array(Ct),Jt=0;Jt<Ct;Jt++)ge[Jt]=arguments[Jt+2];ot.children=ge}if(w&&w.defaultProps)for(Z in Ct=w.defaultProps,Ct)ot[Z]===void 0&&(ot[Z]=Ct[Z]);return Mt(w,ht,ot)},st.createRef=function(){return{current:null}},st.forwardRef=function(w){return{$$typeof:v,render:w}},st.isValidElement=ee,st.lazy=function(w){return{$$typeof:g,_payload:{_status:-1,_result:w},_init:X}},st.memo=function(w,O){return{$$typeof:m,type:w,compare:O===void 0?null:O}},st.startTransition=function(w){var O=$.T,_={};$.T=_;try{var Z=w(),ot=$.S;ot!==null&&ot(_,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(lt,ft)}catch(ht){ft(ht)}finally{O!==null&&_.types!==null&&(O.types=_.types),$.T=O}},st.unstable_useCacheRefresh=function(){return $.H.useCacheRefresh()},st.use=function(w){return $.H.use(w)},st.useActionState=function(w,O,_){return $.H.useActionState(w,O,_)},st.useCallback=function(w,O){return $.H.useCallback(w,O)},st.useContext=function(w){return $.H.useContext(w)},st.useDebugValue=function(){},st.useDeferredValue=function(w,O){return $.H.useDeferredValue(w,O)},st.useEffect=function(w,O){return $.H.useEffect(w,O)},st.useEffectEvent=function(w){return $.H.useEffectEvent(w)},st.useId=function(){return $.H.useId()},st.useImperativeHandle=function(w,O,_){return $.H.useImperativeHandle(w,O,_)},st.useInsertionEffect=function(w,O){return $.H.useInsertionEffect(w,O)},st.useLayoutEffect=function(w,O){return $.H.useLayoutEffect(w,O)},st.useMemo=function(w,O){return $.H.useMemo(w,O)},st.useOptimistic=function(w,O){return $.H.useOptimistic(w,O)},st.useReducer=function(w,O,_){return $.H.useReducer(w,O,_)},st.useRef=function(w){return $.H.useRef(w)},st.useState=function(w){return $.H.useState(w)},st.useSyncExternalStore=function(w,O,_){return $.H.useSyncExternalStore(w,O,_)},st.useTransition=function(){return $.H.useTransition()},st.version="19.2.0",st}var Km;function od(){return Km||(Km=1,pu.exports=C2()),pu.exports}var ct=od();const M2=k2(ct);var mu={exports:{}},Rs={},vu={exports:{}},gu={};var Zm;function E2(){return Zm||(Zm=1,(function(a){function i(R,j){var X=R.length;R.push(j);t:for(;0<X;){var ft=X-1>>>1,vt=R[ft];if(0<u(vt,j))R[ft]=j,R[X]=vt,X=ft;else break t}}function l(R){return R.length===0?null:R[0]}function r(R){if(R.length===0)return null;var j=R[0],X=R.pop();if(X!==j){R[0]=X;t:for(var ft=0,vt=R.length,w=vt>>>1;ft<w;){var O=2*(ft+1)-1,_=R[O],Z=O+1,ot=R[Z];if(0>u(_,X))Z<vt&&0>u(ot,_)?(R[ft]=ot,R[Z]=X,ft=Z):(R[ft]=_,R[O]=X,ft=O);else if(Z<vt&&0>u(ot,X))R[ft]=ot,R[Z]=X,ft=Z;else break t}}return j}function u(R,j){var X=R.sortIndex-j.sortIndex;return X!==0?X:R.id-j.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;a.unstable_now=function(){return f.now()}}else{var d=Date,v=d.now();a.unstable_now=function(){return d.now()-v}}var p=[],m=[],g=1,b=null,S=3,L=!1,H=!1,Q=!1,J=!1,F=typeof setTimeout=="function"?setTimeout:null,K=typeof clearTimeout=="function"?clearTimeout:null,G=typeof setImmediate<"u"?setImmediate:null;function at(R){for(var j=l(m);j!==null;){if(j.callback===null)r(m);else if(j.startTime<=R)r(m),j.sortIndex=j.expirationTime,i(p,j);else break;j=l(m)}}function W(R){if(Q=!1,at(R),!H)if(l(p)!==null)H=!0,lt||(lt=!0,ne());else{var j=l(m);j!==null&&he(W,j.startTime-R)}}var lt=!1,$=-1,et=5,Mt=-1;function jt(){return J?!0:!(a.unstable_now()-Mt<et)}function ee(){if(J=!1,lt){var R=a.unstable_now();Mt=R;var j=!0;try{t:{H=!1,Q&&(Q=!1,K($),$=-1),L=!0;var X=S;try{e:{for(at(R),b=l(p);b!==null&&!(b.expirationTime>R&&jt());){var ft=b.callback;if(typeof ft=="function"){b.callback=null,S=b.priorityLevel;var vt=ft(b.expirationTime<=R);if(R=a.unstable_now(),typeof vt=="function"){b.callback=vt,at(R),j=!0;break e}b===l(p)&&r(p),at(R)}else r(p);b=l(p)}if(b!==null)j=!0;else{var w=l(m);w!==null&&he(W,w.startTime-R),j=!1}}break t}finally{b=null,S=X,L=!1}j=void 0}}finally{j?ne():lt=!1}}}var ne;if(typeof G=="function")ne=function(){G(ee)};else if(typeof MessageChannel<"u"){var en=new MessageChannel,xe=en.port2;en.port1.onmessage=ee,ne=function(){xe.postMessage(null)}}else ne=function(){F(ee,0)};function he(R,j){$=F(function(){R(a.unstable_now())},j)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(R){R.callback=null},a.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):et=0<R?Math.floor(1e3/R):5},a.unstable_getCurrentPriorityLevel=function(){return S},a.unstable_next=function(R){switch(S){case 1:case 2:case 3:var j=3;break;default:j=S}var X=S;S=j;try{return R()}finally{S=X}},a.unstable_requestPaint=function(){J=!0},a.unstable_runWithPriority=function(R,j){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var X=S;S=R;try{return j()}finally{S=X}},a.unstable_scheduleCallback=function(R,j,X){var ft=a.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?ft+X:ft):X=ft,R){case 1:var vt=-1;break;case 2:vt=250;break;case 5:vt=1073741823;break;case 4:vt=1e4;break;default:vt=5e3}return vt=X+vt,R={id:g++,callback:j,priorityLevel:R,startTime:X,expirationTime:vt,sortIndex:-1},X>ft?(R.sortIndex=X,i(m,R),l(p)===null&&R===l(m)&&(Q?(K($),$=-1):Q=!0,he(W,X-ft))):(R.sortIndex=vt,i(p,R),H||L||(H=!0,lt||(lt=!0,ne()))),R},a.unstable_shouldYield=jt,a.unstable_wrapCallback=function(R){var j=S;return function(){var X=S;S=j;try{return R.apply(this,arguments)}finally{S=X}}}})(gu)),gu}var Im;function D2(){return Im||(Im=1,vu.exports=E2()),vu.exports}var yu={exports:{}},pe={};var Wm;function B2(){if(Wm)return pe;Wm=1;var a=od();function i(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var r={d:{f:l,r:function(){throw Error(i(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function f(p,m,g){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:b==null?null:""+b,children:p,containerInfo:m,implementation:g}}var d=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function v(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,pe.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(i(299));return f(p,m,null,g)},pe.flushSync=function(p){var m=d.T,g=r.p;try{if(d.T=null,r.p=2,p)return p()}finally{d.T=m,r.p=g,r.d.f()}},pe.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(p,m))},pe.prefetchDNS=function(p){typeof p=="string"&&r.d.D(p)},pe.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,b=v(g,m.crossOrigin),S=typeof m.integrity=="string"?m.integrity:void 0,L=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?r.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:b,integrity:S,fetchPriority:L}):g==="script"&&r.d.X(p,{crossOrigin:b,integrity:S,fetchPriority:L,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},pe.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=v(m.as,m.crossOrigin);r.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&r.d.M(p)},pe.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,b=v(g,m.crossOrigin);r.d.L(p,g,{crossOrigin:b,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},pe.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=v(m.as,m.crossOrigin);r.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else r.d.m(p)},pe.requestFormReset=function(p){r.d.r(p)},pe.unstable_batchedUpdates=function(p,m){return p(m)},pe.useFormState=function(p,m,g){return d.H.useFormState(p,m,g)},pe.useFormStatus=function(){return d.H.useHostTransitionStatus()},pe.version="19.2.0",pe}var $m;function N2(){if($m)return yu.exports;$m=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(i){console.error(i)}}return a(),yu.exports=B2(),yu.exports}var tv;function R2(){if(tv)return Rs;tv=1;var a=D2(),i=od(),l=N2();function r(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function d(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function v(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(r(188))}function m(t){var e=t.alternate;if(!e){if(e=f(t),e===null)throw Error(r(188));return e!==t?null:t}for(var n=t,s=e;;){var o=n.return;if(o===null)break;var c=o.alternate;if(c===null){if(s=o.return,s!==null){n=s;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===n)return p(o),t;if(c===s)return p(o),e;c=c.sibling}throw Error(r(188))}if(n.return!==s.return)n=o,s=c;else{for(var h=!1,y=o.child;y;){if(y===n){h=!0,n=o,s=c;break}if(y===s){h=!0,s=o,n=c;break}y=y.sibling}if(!h){for(y=c.child;y;){if(y===n){h=!0,n=c,s=o;break}if(y===s){h=!0,s=c,n=o;break}y=y.sibling}if(!h)throw Error(r(189))}}if(n.alternate!==s)throw Error(r(190))}if(n.tag!==3)throw Error(r(188));return n.stateNode.current===n?t:e}function g(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=g(t),e!==null)return e;t=t.sibling}return null}var b=Object.assign,S=Symbol.for("react.element"),L=Symbol.for("react.transitional.element"),H=Symbol.for("react.portal"),Q=Symbol.for("react.fragment"),J=Symbol.for("react.strict_mode"),F=Symbol.for("react.profiler"),K=Symbol.for("react.consumer"),G=Symbol.for("react.context"),at=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),lt=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),et=Symbol.for("react.lazy"),Mt=Symbol.for("react.activity"),jt=Symbol.for("react.memo_cache_sentinel"),ee=Symbol.iterator;function ne(t){return t===null||typeof t!="object"?null:(t=ee&&t[ee]||t["@@iterator"],typeof t=="function"?t:null)}var en=Symbol.for("react.client.reference");function xe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===en?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Q:return"Fragment";case F:return"Profiler";case J:return"StrictMode";case W:return"Suspense";case lt:return"SuspenseList";case Mt:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case H:return"Portal";case G:return t.displayName||"Context";case K:return(t._context.displayName||"Context")+".Consumer";case at:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case $:return e=t.displayName||null,e!==null?e:xe(t.type)||"Memo";case et:e=t._payload,t=t._init;try{return xe(t(e))}catch{}}return null}var he=Array.isArray,R=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X={pending:!1,data:null,method:null,action:null},ft=[],vt=-1;function w(t){return{current:t}}function O(t){0>vt||(t.current=ft[vt],ft[vt]=null,vt--)}function _(t,e){vt++,ft[vt]=t.current,t.current=e}var Z=w(null),ot=w(null),ht=w(null),Ct=w(null);function ge(t,e){switch(_(ht,e),_(ot,t),_(Z,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?hm(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=hm(e),t=pm(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}O(Z),_(Z,t)}function Jt(){O(Z),O(ot),O(ht)}function qi(t){t.memoizedState!==null&&_(Ct,t);var e=Z.current,n=pm(e,t.type);e!==n&&(_(ot,t),_(Z,n))}function el(t){ot.current===t&&(O(Z),O(ot)),Ct.current===t&&(O(Ct),Es._currentValue=X)}var Po,Gd;function va(t){if(Po===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Po=e&&e[1]||"",Gd=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Po+t+Gd}var Ko=!1;function Zo(t,e){if(!t||Ko)return"";Ko=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(e){var U=function(){throw Error()};if(Object.defineProperty(U.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(U,[])}catch(B){var E=B}Reflect.construct(t,[],U)}else{try{U.call()}catch(B){E=B}t.call(U.prototype)}}else{try{throw Error()}catch(B){E=B}(U=t())&&typeof U.catch=="function"&&U.catch(function(){})}}catch(B){if(B&&E&&typeof B.stack=="string")return[B.stack,E.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),h=c[0],y=c[1];if(h&&y){var x=h.split(`
`),M=y.split(`
`);for(o=s=0;s<x.length&&!x[s].includes("DetermineComponentFrameRoot");)s++;for(;o<M.length&&!M[o].includes("DetermineComponentFrameRoot");)o++;if(s===x.length||o===M.length)for(s=x.length-1,o=M.length-1;1<=s&&0<=o&&x[s]!==M[o];)o--;for(;1<=s&&0<=o;s--,o--)if(x[s]!==M[o]){if(s!==1||o!==1)do if(s--,o--,0>o||x[s]!==M[o]){var N=`
`+x[s].replace(" at new "," at ");return t.displayName&&N.includes("<anonymous>")&&(N=N.replace("<anonymous>",t.displayName)),N}while(1<=s&&0<=o);break}}}finally{Ko=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?va(n):""}function qy(t,e){switch(t.tag){case 26:case 27:case 5:return va(t.type);case 16:return va("Lazy");case 13:return t.child!==e&&e!==null?va("Suspense Fallback"):va("Suspense");case 19:return va("SuspenseList");case 0:case 15:return Zo(t.type,!1);case 11:return Zo(t.type.render,!1);case 1:return Zo(t.type,!0);case 31:return va("Activity");default:return""}}function Yd(t){try{var e="",n=null;do e+=qy(t,n),n=t,t=t.return;while(t);return e}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var Io=Object.prototype.hasOwnProperty,Wo=a.unstable_scheduleCallback,$o=a.unstable_cancelCallback,jy=a.unstable_shouldYield,Fy=a.unstable_requestPaint,De=a.unstable_now,Gy=a.unstable_getCurrentPriorityLevel,_d=a.unstable_ImmediatePriority,Qd=a.unstable_UserBlockingPriority,nl=a.unstable_NormalPriority,Yy=a.unstable_LowPriority,Jd=a.unstable_IdlePriority,_y=a.log,Qy=a.unstable_setDisableYieldValue,ji=null,Be=null;function On(t){if(typeof _y=="function"&&Qy(t),Be&&typeof Be.setStrictMode=="function")try{Be.setStrictMode(ji,t)}catch{}}var Ne=Math.clz32?Math.clz32:Py,Jy=Math.log,Xy=Math.LN2;function Py(t){return t>>>=0,t===0?32:31-(Jy(t)/Xy|0)|0}var al=256,il=262144,sl=4194304;function ga(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ll(t,e,n){var s=t.pendingLanes;if(s===0)return 0;var o=0,c=t.suspendedLanes,h=t.pingedLanes;t=t.warmLanes;var y=s&134217727;return y!==0?(s=y&~c,s!==0?o=ga(s):(h&=y,h!==0?o=ga(h):n||(n=y&~t,n!==0&&(o=ga(n))))):(y=s&~c,y!==0?o=ga(y):h!==0?o=ga(h):n||(n=s&~t,n!==0&&(o=ga(n)))),o===0?0:e!==0&&e!==o&&(e&c)===0&&(c=o&-o,n=e&-e,c>=n||c===32&&(n&4194048)!==0)?e:o}function Fi(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Ky(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xd(){var t=sl;return sl<<=1,(sl&62914560)===0&&(sl=4194304),t}function tr(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Gi(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Zy(t,e,n,s,o,c){var h=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var y=t.entanglements,x=t.expirationTimes,M=t.hiddenUpdates;for(n=h&~n;0<n;){var N=31-Ne(n),U=1<<N;y[N]=0,x[N]=-1;var E=M[N];if(E!==null)for(M[N]=null,N=0;N<E.length;N++){var B=E[N];B!==null&&(B.lane&=-536870913)}n&=~U}s!==0&&Pd(t,s,0),c!==0&&o===0&&t.tag!==0&&(t.suspendedLanes|=c&~(h&~e))}function Pd(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var s=31-Ne(e);t.entangledLanes|=e,t.entanglements[s]=t.entanglements[s]|1073741824|n&261930}function Kd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-Ne(n),o=1<<s;o&e|t[s]&e&&(t[s]|=e),n&=~o}}function Zd(t,e){var n=e&-e;return n=(n&42)!==0?1:er(n),(n&(t.suspendedLanes|e))!==0?0:n}function er(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function nr(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Id(){var t=j.p;return t!==0?t:(t=window.event,t===void 0?32:Vm(t.type))}function Wd(t,e){var n=j.p;try{return j.p=t,e()}finally{j.p=n}}var Vn=Math.random().toString(36).slice(2),oe="__reactFiber$"+Vn,Se="__reactProps$"+Vn,_a="__reactContainer$"+Vn,ar="__reactEvents$"+Vn,Iy="__reactListeners$"+Vn,Wy="__reactHandles$"+Vn,$d="__reactResources$"+Vn,Yi="__reactMarker$"+Vn;function ir(t){delete t[oe],delete t[Se],delete t[ar],delete t[Iy],delete t[Wy]}function Qa(t){var e=t[oe];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_a]||n[oe]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Sm(t);t!==null;){if(n=t[oe])return n;t=Sm(t)}return e}t=n,n=t.parentNode}return null}function Ja(t){if(t=t[oe]||t[_a]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function _i(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(r(33))}function Xa(t){var e=t[$d];return e||(e=t[$d]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function ie(t){t[Yi]=!0}var tf=new Set,ef={};function ya(t,e){Pa(t,e),Pa(t+"Capture",e)}function Pa(t,e){for(ef[t]=e,t=0;t<e.length;t++)tf.add(e[t])}var $y=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nf={},af={};function tb(t){return Io.call(af,t)?!0:Io.call(nf,t)?!1:$y.test(t)?af[t]=!0:(nf[t]=!0,!1)}function ol(t,e,n){if(tb(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var s=e.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function rl(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function hn(t,e,n,s){if(s===null)t.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+s)}}function je(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function sf(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function eb(t,e,n){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var o=s.get,c=s.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return o.call(this)},set:function(h){n=""+h,c.call(this,h)}}),Object.defineProperty(t,e,{enumerable:s.enumerable}),{getValue:function(){return n},setValue:function(h){n=""+h},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function sr(t){if(!t._valueTracker){var e=sf(t)?"checked":"value";t._valueTracker=eb(t,e,""+t[e])}}function lf(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=sf(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function cl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var nb=/[\n"\\]/g;function Fe(t){return t.replace(nb,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function lr(t,e,n,s,o,c,h,y){t.name="",h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"?t.type=h:t.removeAttribute("type"),e!=null?h==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+je(e)):t.value!==""+je(e)&&(t.value=""+je(e)):h!=="submit"&&h!=="reset"||t.removeAttribute("value"),e!=null?or(t,h,je(e)):n!=null?or(t,h,je(n)):s!=null&&t.removeAttribute("value"),o==null&&c!=null&&(t.defaultChecked=!!c),o!=null&&(t.checked=o&&typeof o!="function"&&typeof o!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.name=""+je(y):t.removeAttribute("name")}function of(t,e,n,s,o,c,h,y){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),e!=null||n!=null){if(!(c!=="submit"&&c!=="reset"||e!=null)){sr(t);return}n=n!=null?""+je(n):"",e=e!=null?""+je(e):n,y||e===t.value||(t.value=e),t.defaultValue=e}s=s??o,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=y?t.checked:!!s,t.defaultChecked=!!s,h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(t.name=h),sr(t)}function or(t,e,n){e==="number"&&cl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Ka(t,e,n,s){if(t=t.options,e){e={};for(var o=0;o<n.length;o++)e["$"+n[o]]=!0;for(n=0;n<t.length;n++)o=e.hasOwnProperty("$"+t[n].value),t[n].selected!==o&&(t[n].selected=o),o&&s&&(t[n].defaultSelected=!0)}else{for(n=""+je(n),e=null,o=0;o<t.length;o++){if(t[o].value===n){t[o].selected=!0,s&&(t[o].defaultSelected=!0);return}e!==null||t[o].disabled||(e=t[o])}e!==null&&(e.selected=!0)}}function rf(t,e,n){if(e!=null&&(e=""+je(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+je(n):""}function cf(t,e,n,s){if(e==null){if(s!=null){if(n!=null)throw Error(r(92));if(he(s)){if(1<s.length)throw Error(r(93));s=s[0]}n=s}n==null&&(n=""),e=n}n=je(e),t.defaultValue=n,s=t.textContent,s===n&&s!==""&&s!==null&&(t.value=s),sr(t)}function Za(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ab=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function uf(t,e,n){var s=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?s?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":s?t.setProperty(e,n):typeof n!="number"||n===0||ab.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function df(t,e,n){if(e!=null&&typeof e!="object")throw Error(r(62));if(t=t.style,n!=null){for(var s in n)!n.hasOwnProperty(s)||e!=null&&e.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var o in e)s=e[o],e.hasOwnProperty(o)&&n[o]!==s&&uf(t,o,s)}else for(var c in e)e.hasOwnProperty(c)&&uf(t,c,e[c])}function rr(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ib=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),sb=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ul(t){return sb.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function pn(){}var cr=null;function ur(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ia=null,Wa=null;function ff(t){var e=Ja(t);if(e&&(t=e.stateNode)){var n=t[Se]||null;t:switch(t=e.stateNode,e.type){case"input":if(lr(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Fe(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var o=s[Se]||null;if(!o)throw Error(r(90));lr(s,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(e=0;e<n.length;e++)s=n[e],s.form===t.form&&lf(s)}break t;case"textarea":rf(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&Ka(t,!!n.multiple,e,!1)}}}var dr=!1;function hf(t,e,n){if(dr)return t(e,n);dr=!0;try{var s=t(e);return s}finally{if(dr=!1,(Ia!==null||Wa!==null)&&(Il(),Ia&&(e=Ia,t=Wa,Wa=Ia=null,ff(e),t)))for(e=0;e<t.length;e++)ff(t[e])}}function Qi(t,e){var n=t.stateNode;if(n===null)return null;var s=n[Se]||null;if(s===null)return null;n=s[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(r(231,e,typeof n));return n}var mn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fr=!1;if(mn)try{var Ji={};Object.defineProperty(Ji,"passive",{get:function(){fr=!0}}),window.addEventListener("test",Ji,Ji),window.removeEventListener("test",Ji,Ji)}catch{fr=!1}var Hn=null,hr=null,dl=null;function pf(){if(dl)return dl;var t,e=hr,n=e.length,s,o="value"in Hn?Hn.value:Hn.textContent,c=o.length;for(t=0;t<n&&e[t]===o[t];t++);var h=n-t;for(s=1;s<=h&&e[n-s]===o[c-s];s++);return dl=o.slice(t,1<s?1-s:void 0)}function fl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function hl(){return!0}function mf(){return!1}function Ae(t){function e(n,s,o,c,h){this._reactName=n,this._targetInst=o,this.type=s,this.nativeEvent=c,this.target=h,this.currentTarget=null;for(var y in t)t.hasOwnProperty(y)&&(n=t[y],this[y]=n?n(c):c[y]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?hl:mf,this.isPropagationStopped=mf,this}return b(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=hl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=hl)},persist:function(){},isPersistent:hl}),e}var ba={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pl=Ae(ba),Xi=b({},ba,{view:0,detail:0}),lb=Ae(Xi),pr,mr,Pi,ml=b({},Xi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gr,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Pi&&(Pi&&t.type==="mousemove"?(pr=t.screenX-Pi.screenX,mr=t.screenY-Pi.screenY):mr=pr=0,Pi=t),pr)},movementY:function(t){return"movementY"in t?t.movementY:mr}}),vf=Ae(ml),ob=b({},ml,{dataTransfer:0}),rb=Ae(ob),cb=b({},Xi,{relatedTarget:0}),vr=Ae(cb),ub=b({},ba,{animationName:0,elapsedTime:0,pseudoElement:0}),db=Ae(ub),fb=b({},ba,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),hb=Ae(fb),pb=b({},ba,{data:0}),gf=Ae(pb),mb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function yb(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=gb[t])?!!e[t]:!1}function gr(){return yb}var bb=b({},Xi,{key:function(t){if(t.key){var e=mb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=fl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?vb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gr,charCode:function(t){return t.type==="keypress"?fl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?fl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),xb=Ae(bb),Sb=b({},ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yf=Ae(Sb),Ab=b({},Xi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gr}),wb=Ae(Ab),Tb=b({},ba,{propertyName:0,elapsedTime:0,pseudoElement:0}),kb=Ae(Tb),Cb=b({},ml,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Mb=Ae(Cb),Eb=b({},ba,{newState:0,oldState:0}),Db=Ae(Eb),Bb=[9,13,27,32],yr=mn&&"CompositionEvent"in window,Ki=null;mn&&"documentMode"in document&&(Ki=document.documentMode);var Nb=mn&&"TextEvent"in window&&!Ki,bf=mn&&(!yr||Ki&&8<Ki&&11>=Ki),xf=" ",Sf=!1;function Af(t,e){switch(t){case"keyup":return Bb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wf(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var $a=!1;function Rb(t,e){switch(t){case"compositionend":return wf(e);case"keypress":return e.which!==32?null:(Sf=!0,xf);case"textInput":return t=e.data,t===xf&&Sf?null:t;default:return null}}function zb(t,e){if($a)return t==="compositionend"||!yr&&Af(t,e)?(t=pf(),dl=hr=Hn=null,$a=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return bf&&e.locale!=="ko"?null:e.data;default:return null}}var Lb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Lb[t.type]:e==="textarea"}function kf(t,e,n,s){Ia?Wa?Wa.push(s):Wa=[s]:Ia=s,e=io(e,"onChange"),0<e.length&&(n=new pl("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var Zi=null,Ii=null;function Ub(t){om(t,0)}function vl(t){var e=_i(t);if(lf(e))return t}function Cf(t,e){if(t==="change")return e}var Mf=!1;if(mn){var br;if(mn){var xr="oninput"in document;if(!xr){var Ef=document.createElement("div");Ef.setAttribute("oninput","return;"),xr=typeof Ef.oninput=="function"}br=xr}else br=!1;Mf=br&&(!document.documentMode||9<document.documentMode)}function Df(){Zi&&(Zi.detachEvent("onpropertychange",Bf),Ii=Zi=null)}function Bf(t){if(t.propertyName==="value"&&vl(Ii)){var e=[];kf(e,Ii,t,ur(t)),hf(Ub,e)}}function Ob(t,e,n){t==="focusin"?(Df(),Zi=e,Ii=n,Zi.attachEvent("onpropertychange",Bf)):t==="focusout"&&Df()}function Vb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return vl(Ii)}function Hb(t,e){if(t==="click")return vl(e)}function qb(t,e){if(t==="input"||t==="change")return vl(e)}function jb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Re=typeof Object.is=="function"?Object.is:jb;function Wi(t,e){if(Re(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var o=n[s];if(!Io.call(e,o)||!Re(t[o],e[o]))return!1}return!0}function Nf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Rf(t,e){var n=Nf(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Nf(n)}}function zf(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?zf(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Lf(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=cl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=cl(t.document)}return e}function Sr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Fb=mn&&"documentMode"in document&&11>=document.documentMode,ti=null,Ar=null,$i=null,wr=!1;function Uf(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wr||ti==null||ti!==cl(s)||(s=ti,"selectionStart"in s&&Sr(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),$i&&Wi($i,s)||($i=s,s=io(Ar,"onSelect"),0<s.length&&(e=new pl("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=ti)))}function xa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ei={animationend:xa("Animation","AnimationEnd"),animationiteration:xa("Animation","AnimationIteration"),animationstart:xa("Animation","AnimationStart"),transitionrun:xa("Transition","TransitionRun"),transitionstart:xa("Transition","TransitionStart"),transitioncancel:xa("Transition","TransitionCancel"),transitionend:xa("Transition","TransitionEnd")},Tr={},Of={};mn&&(Of=document.createElement("div").style,"AnimationEvent"in window||(delete ei.animationend.animation,delete ei.animationiteration.animation,delete ei.animationstart.animation),"TransitionEvent"in window||delete ei.transitionend.transition);function Sa(t){if(Tr[t])return Tr[t];if(!ei[t])return t;var e=ei[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Of)return Tr[t]=e[n];return t}var Vf=Sa("animationend"),Hf=Sa("animationiteration"),qf=Sa("animationstart"),Gb=Sa("transitionrun"),Yb=Sa("transitionstart"),_b=Sa("transitioncancel"),jf=Sa("transitionend"),Ff=new Map,kr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");kr.push("scrollEnd");function nn(t,e){Ff.set(t,e),ya(e,[t])}var gl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ge=[],ni=0,Cr=0;function yl(){for(var t=ni,e=Cr=ni=0;e<t;){var n=Ge[e];Ge[e++]=null;var s=Ge[e];Ge[e++]=null;var o=Ge[e];Ge[e++]=null;var c=Ge[e];if(Ge[e++]=null,s!==null&&o!==null){var h=s.pending;h===null?o.next=o:(o.next=h.next,h.next=o),s.pending=o}c!==0&&Gf(n,o,c)}}function bl(t,e,n,s){Ge[ni++]=t,Ge[ni++]=e,Ge[ni++]=n,Ge[ni++]=s,Cr|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function Mr(t,e,n,s){return bl(t,e,n,s),xl(t)}function Aa(t,e){return bl(t,null,null,e),xl(t)}function Gf(t,e,n){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n);for(var o=!1,c=t.return;c!==null;)c.childLanes|=n,s=c.alternate,s!==null&&(s.childLanes|=n),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(o=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,o&&e!==null&&(o=31-Ne(n),t=c.hiddenUpdates,s=t[o],s===null?t[o]=[e]:s.push(e),e.lane=n|536870912),c):null}function xl(t){if(50<Ss)throw Ss=0,Oc=null,Error(r(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var ai={};function Qb(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ze(t,e,n,s){return new Qb(t,e,n,s)}function Er(t){return t=t.prototype,!(!t||!t.isReactComponent)}function vn(t,e){var n=t.alternate;return n===null?(n=ze(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function Yf(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Sl(t,e,n,s,o,c){var h=0;if(s=t,typeof t=="function")Er(t)&&(h=1);else if(typeof t=="string")h=Z1(t,n,Z.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Mt:return t=ze(31,n,e,o),t.elementType=Mt,t.lanes=c,t;case Q:return wa(n.children,o,c,e);case J:h=8,o|=24;break;case F:return t=ze(12,n,e,o|2),t.elementType=F,t.lanes=c,t;case W:return t=ze(13,n,e,o),t.elementType=W,t.lanes=c,t;case lt:return t=ze(19,n,e,o),t.elementType=lt,t.lanes=c,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case G:h=10;break t;case K:h=9;break t;case at:h=11;break t;case $:h=14;break t;case et:h=16,s=null;break t}h=29,n=Error(r(130,t===null?"null":typeof t,"")),s=null}return e=ze(h,n,e,o),e.elementType=t,e.type=s,e.lanes=c,e}function wa(t,e,n,s){return t=ze(7,t,s,e),t.lanes=n,t}function Dr(t,e,n){return t=ze(6,t,null,e),t.lanes=n,t}function _f(t){var e=ze(18,null,null,0);return e.stateNode=t,e}function Br(t,e,n){return e=ze(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Qf=new WeakMap;function Ye(t,e){if(typeof t=="object"&&t!==null){var n=Qf.get(t);return n!==void 0?n:(e={value:t,source:e,stack:Yd(e)},Qf.set(t,e),e)}return{value:t,source:e,stack:Yd(e)}}var ii=[],si=0,Al=null,ts=0,_e=[],Qe=0,qn=null,on=1,rn="";function gn(t,e){ii[si++]=ts,ii[si++]=Al,Al=t,ts=e}function Jf(t,e,n){_e[Qe++]=on,_e[Qe++]=rn,_e[Qe++]=qn,qn=t;var s=on;t=rn;var o=32-Ne(s)-1;s&=~(1<<o),n+=1;var c=32-Ne(e)+o;if(30<c){var h=o-o%5;c=(s&(1<<h)-1).toString(32),s>>=h,o-=h,on=1<<32-Ne(e)+o|n<<o|s,rn=c+t}else on=1<<c|n<<o|s,rn=t}function Nr(t){t.return!==null&&(gn(t,1),Jf(t,1,0))}function Rr(t){for(;t===Al;)Al=ii[--si],ii[si]=null,ts=ii[--si],ii[si]=null;for(;t===qn;)qn=_e[--Qe],_e[Qe]=null,rn=_e[--Qe],_e[Qe]=null,on=_e[--Qe],_e[Qe]=null}function Xf(t,e){_e[Qe++]=on,_e[Qe++]=rn,_e[Qe++]=qn,on=e.id,rn=e.overflow,qn=t}var re=null,Ut=null,bt=!1,jn=null,Je=!1,zr=Error(r(519));function Fn(t){var e=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw es(Ye(e,t)),zr}function Pf(t){var e=t.stateNode,n=t.type,s=t.memoizedProps;switch(e[oe]=t,e[Se]=s,n){case"dialog":mt("cancel",e),mt("close",e);break;case"iframe":case"object":case"embed":mt("load",e);break;case"video":case"audio":for(n=0;n<ws.length;n++)mt(ws[n],e);break;case"source":mt("error",e);break;case"img":case"image":case"link":mt("error",e),mt("load",e);break;case"details":mt("toggle",e);break;case"input":mt("invalid",e),of(e,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":mt("invalid",e);break;case"textarea":mt("invalid",e),cf(e,s.value,s.defaultValue,s.children)}n=s.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||s.suppressHydrationWarning===!0||dm(e.textContent,n)?(s.popover!=null&&(mt("beforetoggle",e),mt("toggle",e)),s.onScroll!=null&&mt("scroll",e),s.onScrollEnd!=null&&mt("scrollend",e),s.onClick!=null&&(e.onclick=pn),e=!0):e=!1,e||Fn(t,!0)}function Kf(t){for(re=t.return;re;)switch(re.tag){case 5:case 31:case 13:Je=!1;return;case 27:case 3:Je=!0;return;default:re=re.return}}function li(t){if(t!==re)return!1;if(!bt)return Kf(t),bt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Ic(t.type,t.memoizedProps)),n=!n),n&&Ut&&Fn(t),Kf(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ut=xm(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ut=xm(t)}else e===27?(e=Ut,ea(t.type)?(t=nu,nu=null,Ut=t):Ut=e):Ut=re?Pe(t.stateNode.nextSibling):null;return!0}function Ta(){Ut=re=null,bt=!1}function Lr(){var t=jn;return t!==null&&(Ce===null?Ce=t:Ce.push.apply(Ce,t),jn=null),t}function es(t){jn===null?jn=[t]:jn.push(t)}var Ur=w(null),ka=null,yn=null;function Gn(t,e,n){_(Ur,e._currentValue),e._currentValue=n}function bn(t){t._currentValue=Ur.current,O(Ur)}function Or(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function Vr(t,e,n,s){var o=t.child;for(o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){var h=o.child;c=c.firstContext;t:for(;c!==null;){var y=c;c=o;for(var x=0;x<e.length;x++)if(y.context===e[x]){c.lanes|=n,y=c.alternate,y!==null&&(y.lanes|=n),Or(c.return,n,t),s||(h=null);break t}c=y.next}}else if(o.tag===18){if(h=o.return,h===null)throw Error(r(341));h.lanes|=n,c=h.alternate,c!==null&&(c.lanes|=n),Or(h,n,t),h=null}else h=o.child;if(h!==null)h.return=o;else for(h=o;h!==null;){if(h===t){h=null;break}if(o=h.sibling,o!==null){o.return=h.return,h=o;break}h=h.return}o=h}}function oi(t,e,n,s){t=null;for(var o=e,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var h=o.alternate;if(h===null)throw Error(r(387));if(h=h.memoizedProps,h!==null){var y=o.type;Re(o.pendingProps.value,h.value)||(t!==null?t.push(y):t=[y])}}else if(o===Ct.current){if(h=o.alternate,h===null)throw Error(r(387));h.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(t!==null?t.push(Es):t=[Es])}o=o.return}t!==null&&Vr(e,t,n,s),e.flags|=262144}function wl(t){for(t=t.firstContext;t!==null;){if(!Re(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ca(t){ka=t,yn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function ce(t){return Zf(ka,t)}function Tl(t,e){return ka===null&&Ca(t),Zf(t,e)}function Zf(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},yn===null){if(t===null)throw Error(r(308));yn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else yn=yn.next=e;return n}var Jb=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,s){t.push(s)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Xb=a.unstable_scheduleCallback,Pb=a.unstable_NormalPriority,Zt={$$typeof:G,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Hr(){return{controller:new Jb,data:new Map,refCount:0}}function ns(t){t.refCount--,t.refCount===0&&Xb(Pb,function(){t.controller.abort()})}var as=null,qr=0,ri=0,ci=null;function Kb(t,e){if(as===null){var n=as=[];qr=0,ri=Gc(),ci={status:"pending",value:void 0,then:function(s){n.push(s)}}}return qr++,e.then(If,If),e}function If(){if(--qr===0&&as!==null){ci!==null&&(ci.status="fulfilled");var t=as;as=null,ri=0,ci=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Zb(t,e){var n=[],s={status:"pending",value:null,reason:null,then:function(o){n.push(o)}};return t.then(function(){s.status="fulfilled",s.value=e;for(var o=0;o<n.length;o++)(0,n[o])(e)},function(o){for(s.status="rejected",s.reason=o,o=0;o<n.length;o++)(0,n[o])(void 0)}),s}var Wf=R.S;R.S=function(t,e){Up=De(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Kb(t,e),Wf!==null&&Wf(t,e)};var Ma=w(null);function jr(){var t=Ma.current;return t!==null?t:Lt.pooledCache}function kl(t,e){e===null?_(Ma,Ma.current):_(Ma,e.pool)}function $f(){var t=jr();return t===null?null:{parent:Zt._currentValue,pool:t}}var ui=Error(r(460)),Fr=Error(r(474)),Cl=Error(r(542)),Ml={then:function(){}};function th(t){return t=t.status,t==="fulfilled"||t==="rejected"}function eh(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(pn,pn),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,ah(t),t;default:if(typeof e.status=="string")e.then(pn,pn);else{if(t=Lt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=e,t.status="pending",t.then(function(s){if(e.status==="pending"){var o=e;o.status="fulfilled",o.value=s}},function(s){if(e.status==="pending"){var o=e;o.status="rejected",o.reason=s}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,ah(t),t}throw Da=e,ui}}function Ea(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Da=n,ui):n}}var Da=null;function nh(){if(Da===null)throw Error(r(459));var t=Da;return Da=null,t}function ah(t){if(t===ui||t===Cl)throw Error(r(483))}var di=null,is=0;function El(t){var e=is;return is+=1,di===null&&(di=[]),eh(di,t,e)}function ss(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Dl(t,e){throw e.$$typeof===S?Error(r(525)):(t=Object.prototype.toString.call(e),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function ih(t){function e(T,A){if(t){var C=T.deletions;C===null?(T.deletions=[A],T.flags|=16):C.push(A)}}function n(T,A){if(!t)return null;for(;A!==null;)e(T,A),A=A.sibling;return null}function s(T){for(var A=new Map;T!==null;)T.key!==null?A.set(T.key,T):A.set(T.index,T),T=T.sibling;return A}function o(T,A){return T=vn(T,A),T.index=0,T.sibling=null,T}function c(T,A,C){return T.index=C,t?(C=T.alternate,C!==null?(C=C.index,C<A?(T.flags|=67108866,A):C):(T.flags|=67108866,A)):(T.flags|=1048576,A)}function h(T){return t&&T.alternate===null&&(T.flags|=67108866),T}function y(T,A,C,z){return A===null||A.tag!==6?(A=Dr(C,T.mode,z),A.return=T,A):(A=o(A,C),A.return=T,A)}function x(T,A,C,z){var tt=C.type;return tt===Q?N(T,A,C.props.children,z,C.key):A!==null&&(A.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===et&&Ea(tt)===A.type)?(A=o(A,C.props),ss(A,C),A.return=T,A):(A=Sl(C.type,C.key,C.props,null,T.mode,z),ss(A,C),A.return=T,A)}function M(T,A,C,z){return A===null||A.tag!==4||A.stateNode.containerInfo!==C.containerInfo||A.stateNode.implementation!==C.implementation?(A=Br(C,T.mode,z),A.return=T,A):(A=o(A,C.children||[]),A.return=T,A)}function N(T,A,C,z,tt){return A===null||A.tag!==7?(A=wa(C,T.mode,z,tt),A.return=T,A):(A=o(A,C),A.return=T,A)}function U(T,A,C){if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return A=Dr(""+A,T.mode,C),A.return=T,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case L:return C=Sl(A.type,A.key,A.props,null,T.mode,C),ss(C,A),C.return=T,C;case H:return A=Br(A,T.mode,C),A.return=T,A;case et:return A=Ea(A),U(T,A,C)}if(he(A)||ne(A))return A=wa(A,T.mode,C,null),A.return=T,A;if(typeof A.then=="function")return U(T,El(A),C);if(A.$$typeof===G)return U(T,Tl(T,A),C);Dl(T,A)}return null}function E(T,A,C,z){var tt=A!==null?A.key:null;if(typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint")return tt!==null?null:y(T,A,""+C,z);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case L:return C.key===tt?x(T,A,C,z):null;case H:return C.key===tt?M(T,A,C,z):null;case et:return C=Ea(C),E(T,A,C,z)}if(he(C)||ne(C))return tt!==null?null:N(T,A,C,z,null);if(typeof C.then=="function")return E(T,A,El(C),z);if(C.$$typeof===G)return E(T,A,Tl(T,C),z);Dl(T,C)}return null}function B(T,A,C,z,tt){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return T=T.get(C)||null,y(A,T,""+z,tt);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case L:return T=T.get(z.key===null?C:z.key)||null,x(A,T,z,tt);case H:return T=T.get(z.key===null?C:z.key)||null,M(A,T,z,tt);case et:return z=Ea(z),B(T,A,C,z,tt)}if(he(z)||ne(z))return T=T.get(C)||null,N(A,T,z,tt,null);if(typeof z.then=="function")return B(T,A,C,El(z),tt);if(z.$$typeof===G)return B(T,A,C,Tl(A,z),tt);Dl(A,z)}return null}function P(T,A,C,z){for(var tt=null,St=null,I=A,ut=A=0,yt=null;I!==null&&ut<C.length;ut++){I.index>ut?(yt=I,I=null):yt=I.sibling;var At=E(T,I,C[ut],z);if(At===null){I===null&&(I=yt);break}t&&I&&At.alternate===null&&e(T,I),A=c(At,A,ut),St===null?tt=At:St.sibling=At,St=At,I=yt}if(ut===C.length)return n(T,I),bt&&gn(T,ut),tt;if(I===null){for(;ut<C.length;ut++)I=U(T,C[ut],z),I!==null&&(A=c(I,A,ut),St===null?tt=I:St.sibling=I,St=I);return bt&&gn(T,ut),tt}for(I=s(I);ut<C.length;ut++)yt=B(I,T,ut,C[ut],z),yt!==null&&(t&&yt.alternate!==null&&I.delete(yt.key===null?ut:yt.key),A=c(yt,A,ut),St===null?tt=yt:St.sibling=yt,St=yt);return t&&I.forEach(function(la){return e(T,la)}),bt&&gn(T,ut),tt}function nt(T,A,C,z){if(C==null)throw Error(r(151));for(var tt=null,St=null,I=A,ut=A=0,yt=null,At=C.next();I!==null&&!At.done;ut++,At=C.next()){I.index>ut?(yt=I,I=null):yt=I.sibling;var la=E(T,I,At.value,z);if(la===null){I===null&&(I=yt);break}t&&I&&la.alternate===null&&e(T,I),A=c(la,A,ut),St===null?tt=la:St.sibling=la,St=la,I=yt}if(At.done)return n(T,I),bt&&gn(T,ut),tt;if(I===null){for(;!At.done;ut++,At=C.next())At=U(T,At.value,z),At!==null&&(A=c(At,A,ut),St===null?tt=At:St.sibling=At,St=At);return bt&&gn(T,ut),tt}for(I=s(I);!At.done;ut++,At=C.next())At=B(I,T,ut,At.value,z),At!==null&&(t&&At.alternate!==null&&I.delete(At.key===null?ut:At.key),A=c(At,A,ut),St===null?tt=At:St.sibling=At,St=At);return t&&I.forEach(function(o2){return e(T,o2)}),bt&&gn(T,ut),tt}function zt(T,A,C,z){if(typeof C=="object"&&C!==null&&C.type===Q&&C.key===null&&(C=C.props.children),typeof C=="object"&&C!==null){switch(C.$$typeof){case L:t:{for(var tt=C.key;A!==null;){if(A.key===tt){if(tt=C.type,tt===Q){if(A.tag===7){n(T,A.sibling),z=o(A,C.props.children),z.return=T,T=z;break t}}else if(A.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===et&&Ea(tt)===A.type){n(T,A.sibling),z=o(A,C.props),ss(z,C),z.return=T,T=z;break t}n(T,A);break}else e(T,A);A=A.sibling}C.type===Q?(z=wa(C.props.children,T.mode,z,C.key),z.return=T,T=z):(z=Sl(C.type,C.key,C.props,null,T.mode,z),ss(z,C),z.return=T,T=z)}return h(T);case H:t:{for(tt=C.key;A!==null;){if(A.key===tt)if(A.tag===4&&A.stateNode.containerInfo===C.containerInfo&&A.stateNode.implementation===C.implementation){n(T,A.sibling),z=o(A,C.children||[]),z.return=T,T=z;break t}else{n(T,A);break}else e(T,A);A=A.sibling}z=Br(C,T.mode,z),z.return=T,T=z}return h(T);case et:return C=Ea(C),zt(T,A,C,z)}if(he(C))return P(T,A,C,z);if(ne(C)){if(tt=ne(C),typeof tt!="function")throw Error(r(150));return C=tt.call(C),nt(T,A,C,z)}if(typeof C.then=="function")return zt(T,A,El(C),z);if(C.$$typeof===G)return zt(T,A,Tl(T,C),z);Dl(T,C)}return typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint"?(C=""+C,A!==null&&A.tag===6?(n(T,A.sibling),z=o(A,C),z.return=T,T=z):(n(T,A),z=Dr(C,T.mode,z),z.return=T,T=z),h(T)):n(T,A)}return function(T,A,C,z){try{is=0;var tt=zt(T,A,C,z);return di=null,tt}catch(I){if(I===ui||I===Cl)throw I;var St=ze(29,I,null,T.mode);return St.lanes=z,St.return=T,St}finally{}}}var Ba=ih(!0),sh=ih(!1),Yn=!1;function Gr(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Yr(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function _n(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Qn(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(Tt&2)!==0){var o=s.pending;return o===null?e.next=e:(e.next=o.next,o.next=e),s.pending=e,e=xl(t),Gf(t,null,n),e}return bl(t,s,e,n),xl(t)}function ls(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,Kd(t,n)}}function _r(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var o=null,c=null;if(n=n.firstBaseUpdate,n!==null){do{var h={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};c===null?o=c=h:c=c.next=h,n=n.next}while(n!==null);c===null?o=c=e:c=c.next=e}else o=c=e;n={baseState:s.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Qr=!1;function os(){if(Qr){var t=ci;if(t!==null)throw t}}function rs(t,e,n,s){Qr=!1;var o=t.updateQueue;Yn=!1;var c=o.firstBaseUpdate,h=o.lastBaseUpdate,y=o.shared.pending;if(y!==null){o.shared.pending=null;var x=y,M=x.next;x.next=null,h===null?c=M:h.next=M,h=x;var N=t.alternate;N!==null&&(N=N.updateQueue,y=N.lastBaseUpdate,y!==h&&(y===null?N.firstBaseUpdate=M:y.next=M,N.lastBaseUpdate=x))}if(c!==null){var U=o.baseState;h=0,N=M=x=null,y=c;do{var E=y.lane&-536870913,B=E!==y.lane;if(B?(gt&E)===E:(s&E)===E){E!==0&&E===ri&&(Qr=!0),N!==null&&(N=N.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});t:{var P=t,nt=y;E=e;var zt=n;switch(nt.tag){case 1:if(P=nt.payload,typeof P=="function"){U=P.call(zt,U,E);break t}U=P;break t;case 3:P.flags=P.flags&-65537|128;case 0:if(P=nt.payload,E=typeof P=="function"?P.call(zt,U,E):P,E==null)break t;U=b({},U,E);break t;case 2:Yn=!0}}E=y.callback,E!==null&&(t.flags|=64,B&&(t.flags|=8192),B=o.callbacks,B===null?o.callbacks=[E]:B.push(E))}else B={lane:E,tag:y.tag,payload:y.payload,callback:y.callback,next:null},N===null?(M=N=B,x=U):N=N.next=B,h|=E;if(y=y.next,y===null){if(y=o.shared.pending,y===null)break;B=y,y=B.next,B.next=null,o.lastBaseUpdate=B,o.shared.pending=null}}while(!0);N===null&&(x=U),o.baseState=x,o.firstBaseUpdate=M,o.lastBaseUpdate=N,c===null&&(o.shared.lanes=0),Zn|=h,t.lanes=h,t.memoizedState=U}}function lh(t,e){if(typeof t!="function")throw Error(r(191,t));t.call(e)}function oh(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)lh(n[t],e)}var fi=w(null),Bl=w(0);function rh(t,e){t=En,_(Bl,t),_(fi,e),En=t|e.baseLanes}function Jr(){_(Bl,En),_(fi,fi.current)}function Xr(){En=Bl.current,O(fi),O(Bl)}var Le=w(null),Xe=null;function Jn(t){var e=t.alternate;_(Xt,Xt.current&1),_(Le,t),Xe===null&&(e===null||fi.current!==null||e.memoizedState!==null)&&(Xe=t)}function Pr(t){_(Xt,Xt.current),_(Le,t),Xe===null&&(Xe=t)}function ch(t){t.tag===22?(_(Xt,Xt.current),_(Le,t),Xe===null&&(Xe=t)):Xn()}function Xn(){_(Xt,Xt.current),_(Le,Le.current)}function Ue(t){O(Le),Xe===t&&(Xe=null),O(Xt)}var Xt=w(0);function Nl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||tu(n)||eu(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var xn=0,rt=null,Nt=null,It=null,Rl=!1,hi=!1,Na=!1,zl=0,cs=0,pi=null,Ib=0;function Gt(){throw Error(r(321))}function Kr(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Re(t[n],e[n]))return!1;return!0}function Zr(t,e,n,s,o,c){return xn=c,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,R.H=t===null||t.memoizedState===null?Jh:dc,Na=!1,c=n(s,o),Na=!1,hi&&(c=dh(e,n,s,o)),uh(t),c}function uh(t){R.H=fs;var e=Nt!==null&&Nt.next!==null;if(xn=0,It=Nt=rt=null,Rl=!1,cs=0,pi=null,e)throw Error(r(300));t===null||Wt||(t=t.dependencies,t!==null&&wl(t)&&(Wt=!0))}function dh(t,e,n,s){rt=t;var o=0;do{if(hi&&(pi=null),cs=0,hi=!1,25<=o)throw Error(r(301));if(o+=1,It=Nt=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}R.H=Xh,c=e(n,s)}while(hi);return c}function Wb(){var t=R.H,e=t.useState()[0];return e=typeof e.then=="function"?us(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(rt.flags|=1024),e}function Ir(){var t=zl!==0;return zl=0,t}function Wr(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function $r(t){if(Rl){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Rl=!1}xn=0,It=Nt=rt=null,hi=!1,cs=zl=0,pi=null}function ye(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return It===null?rt.memoizedState=It=t:It=It.next=t,It}function Pt(){if(Nt===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=It===null?rt.memoizedState:It.next;if(e!==null)It=e,Nt=t;else{if(t===null)throw rt.alternate===null?Error(r(467)):Error(r(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},It===null?rt.memoizedState=It=t:It=It.next=t}return It}function Ll(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function us(t){var e=cs;return cs+=1,pi===null&&(pi=[]),t=eh(pi,t,e),e=rt,(It===null?e.memoizedState:It.next)===null&&(e=e.alternate,R.H=e===null||e.memoizedState===null?Jh:dc),t}function Ul(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return us(t);if(t.$$typeof===G)return ce(t)}throw Error(r(438,String(t)))}function tc(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var s=rt.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(e={data:s.data.map(function(o){return o.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Ll(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),s=0;s<t;s++)n[s]=jt;return e.index++,n}function Sn(t,e){return typeof e=="function"?e(t):e}function Ol(t){var e=Pt();return ec(e,Nt,t)}function ec(t,e,n){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=n;var o=t.baseQueue,c=s.pending;if(c!==null){if(o!==null){var h=o.next;o.next=c.next,c.next=h}e.baseQueue=o=c,s.pending=null}if(c=t.baseState,o===null)t.memoizedState=c;else{e=o.next;var y=h=null,x=null,M=e,N=!1;do{var U=M.lane&-536870913;if(U!==M.lane?(gt&U)===U:(xn&U)===U){var E=M.revertLane;if(E===0)x!==null&&(x=x.next={lane:0,revertLane:0,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null}),U===ri&&(N=!0);else if((xn&E)===E){M=M.next,E===ri&&(N=!0);continue}else U={lane:0,revertLane:M.revertLane,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},x===null?(y=x=U,h=c):x=x.next=U,rt.lanes|=E,Zn|=E;U=M.action,Na&&n(c,U),c=M.hasEagerState?M.eagerState:n(c,U)}else E={lane:U,revertLane:M.revertLane,gesture:M.gesture,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},x===null?(y=x=E,h=c):x=x.next=E,rt.lanes|=U,Zn|=U;M=M.next}while(M!==null&&M!==e);if(x===null?h=c:x.next=y,!Re(c,t.memoizedState)&&(Wt=!0,N&&(n=ci,n!==null)))throw n;t.memoizedState=c,t.baseState=h,t.baseQueue=x,s.lastRenderedState=c}return o===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function nc(t){var e=Pt(),n=e.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=t;var s=n.dispatch,o=n.pending,c=e.memoizedState;if(o!==null){n.pending=null;var h=o=o.next;do c=t(c,h.action),h=h.next;while(h!==o);Re(c,e.memoizedState)||(Wt=!0),e.memoizedState=c,e.baseQueue===null&&(e.baseState=c),n.lastRenderedState=c}return[c,s]}function fh(t,e,n){var s=rt,o=Pt(),c=bt;if(c){if(n===void 0)throw Error(r(407));n=n()}else n=e();var h=!Re((Nt||o).memoizedState,n);if(h&&(o.memoizedState=n,Wt=!0),o=o.queue,sc(mh.bind(null,s,o,t),[t]),o.getSnapshot!==e||h||It!==null&&It.memoizedState.tag&1){if(s.flags|=2048,mi(9,{destroy:void 0},ph.bind(null,s,o,n,e),null),Lt===null)throw Error(r(349));c||(xn&127)!==0||hh(s,e,n)}return n}function hh(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=Ll(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function ph(t,e,n,s){e.value=n,e.getSnapshot=s,vh(e)&&gh(t)}function mh(t,e,n){return n(function(){vh(e)&&gh(t)})}function vh(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Re(t,n)}catch{return!0}}function gh(t){var e=Aa(t,2);e!==null&&Me(e,t,2)}function ac(t){var e=ye();if(typeof t=="function"){var n=t;if(t=n(),Na){On(!0);try{n()}finally{On(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Sn,lastRenderedState:t},e}function yh(t,e,n,s){return t.baseState=n,ec(t,Nt,typeof s=="function"?s:Sn)}function $b(t,e,n,s,o){if(ql(t))throw Error(r(485));if(t=e.action,t!==null){var c={payload:o,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(h){c.listeners.push(h)}};R.T!==null?n(!0):c.isTransition=!1,s(c),n=e.pending,n===null?(c.next=e.pending=c,bh(e,c)):(c.next=n.next,e.pending=n.next=c)}}function bh(t,e){var n=e.action,s=e.payload,o=t.state;if(e.isTransition){var c=R.T,h={};R.T=h;try{var y=n(o,s),x=R.S;x!==null&&x(h,y),xh(t,e,y)}catch(M){ic(t,e,M)}finally{c!==null&&h.types!==null&&(c.types=h.types),R.T=c}}else try{c=n(o,s),xh(t,e,c)}catch(M){ic(t,e,M)}}function xh(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(s){Sh(t,e,s)},function(s){return ic(t,e,s)}):Sh(t,e,n)}function Sh(t,e,n){e.status="fulfilled",e.value=n,Ah(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,bh(t,n)))}function ic(t,e,n){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do e.status="rejected",e.reason=n,Ah(e),e=e.next;while(e!==s)}t.action=null}function Ah(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function wh(t,e){return e}function Th(t,e){if(bt){var n=Lt.formState;if(n!==null){t:{var s=rt;if(bt){if(Ut){e:{for(var o=Ut,c=Je;o.nodeType!==8;){if(!c){o=null;break e}if(o=Pe(o.nextSibling),o===null){o=null;break e}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){Ut=Pe(o.nextSibling),s=o.data==="F!";break t}}Fn(s)}s=!1}s&&(e=n[0])}}return n=ye(),n.memoizedState=n.baseState=e,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:wh,lastRenderedState:e},n.queue=s,n=Yh.bind(null,rt,s),s.dispatch=n,s=ac(!1),c=uc.bind(null,rt,!1,s.queue),s=ye(),o={state:e,dispatch:null,action:t,pending:null},s.queue=o,n=$b.bind(null,rt,o,c,n),o.dispatch=n,s.memoizedState=t,[e,n,!1]}function kh(t){var e=Pt();return Ch(e,Nt,t)}function Ch(t,e,n){if(e=ec(t,e,wh)[0],t=Ol(Sn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var s=us(e)}catch(h){throw h===ui?Cl:h}else s=e;e=Pt();var o=e.queue,c=o.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,mi(9,{destroy:void 0},t1.bind(null,o,n),null)),[s,c,t]}function t1(t,e){t.action=e}function Mh(t){var e=Pt(),n=Nt;if(n!==null)return Ch(e,n,t);Pt(),e=e.memoizedState,n=Pt();var s=n.queue.dispatch;return n.memoizedState=t,[e,s,!1]}function mi(t,e,n,s){return t={tag:t,create:n,deps:s,inst:e,next:null},e=rt.updateQueue,e===null&&(e=Ll(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t),t}function Eh(){return Pt().memoizedState}function Vl(t,e,n,s){var o=ye();rt.flags|=t,o.memoizedState=mi(1|e,{destroy:void 0},n,s===void 0?null:s)}function Hl(t,e,n,s){var o=Pt();s=s===void 0?null:s;var c=o.memoizedState.inst;Nt!==null&&s!==null&&Kr(s,Nt.memoizedState.deps)?o.memoizedState=mi(e,c,n,s):(rt.flags|=t,o.memoizedState=mi(1|e,c,n,s))}function Dh(t,e){Vl(8390656,8,t,e)}function sc(t,e){Hl(2048,8,t,e)}function e1(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=Ll(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Bh(t){var e=Pt().memoizedState;return e1({ref:e,nextImpl:t}),function(){if((Tt&2)!==0)throw Error(r(440));return e.impl.apply(void 0,arguments)}}function Nh(t,e){return Hl(4,2,t,e)}function Rh(t,e){return Hl(4,4,t,e)}function zh(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Lh(t,e,n){n=n!=null?n.concat([t]):null,Hl(4,4,zh.bind(null,e,t),n)}function lc(){}function Uh(t,e){var n=Pt();e=e===void 0?null:e;var s=n.memoizedState;return e!==null&&Kr(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function Oh(t,e){var n=Pt();e=e===void 0?null:e;var s=n.memoizedState;if(e!==null&&Kr(e,s[1]))return s[0];if(s=t(),Na){On(!0);try{t()}finally{On(!1)}}return n.memoizedState=[s,e],s}function oc(t,e,n){return n===void 0||(xn&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=Vp(),rt.lanes|=t,Zn|=t,n)}function Vh(t,e,n,s){return Re(n,e)?n:fi.current!==null?(t=oc(t,n,s),Re(t,e)||(Wt=!0),t):(xn&42)===0||(xn&1073741824)!==0&&(gt&261930)===0?(Wt=!0,t.memoizedState=n):(t=Vp(),rt.lanes|=t,Zn|=t,e)}function Hh(t,e,n,s,o){var c=j.p;j.p=c!==0&&8>c?c:8;var h=R.T,y={};R.T=y,uc(t,!1,e,n);try{var x=o(),M=R.S;if(M!==null&&M(y,x),x!==null&&typeof x=="object"&&typeof x.then=="function"){var N=Zb(x,s);ds(t,e,N,He(t))}else ds(t,e,s,He(t))}catch(U){ds(t,e,{then:function(){},status:"rejected",reason:U},He())}finally{j.p=c,h!==null&&y.types!==null&&(h.types=y.types),R.T=h}}function n1(){}function rc(t,e,n,s){if(t.tag!==5)throw Error(r(476));var o=qh(t).queue;Hh(t,o,e,X,n===null?n1:function(){return jh(t),n(s)})}function qh(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:X,baseState:X,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Sn,lastRenderedState:X},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Sn,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function jh(t){var e=qh(t);e.next===null&&(e=t.alternate.memoizedState),ds(t,e.next.queue,{},He())}function cc(){return ce(Es)}function Fh(){return Pt().memoizedState}function Gh(){return Pt().memoizedState}function a1(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=He();t=_n(n);var s=Qn(e,t,n);s!==null&&(Me(s,e,n),ls(s,e,n)),e={cache:Hr()},t.payload=e;return}e=e.return}}function i1(t,e,n){var s=He();n={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ql(t)?_h(e,n):(n=Mr(t,e,n,s),n!==null&&(Me(n,t,s),Qh(n,e,s)))}function Yh(t,e,n){var s=He();ds(t,e,n,s)}function ds(t,e,n,s){var o={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ql(t))_h(e,o);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=e.lastRenderedReducer,c!==null))try{var h=e.lastRenderedState,y=c(h,n);if(o.hasEagerState=!0,o.eagerState=y,Re(y,h))return bl(t,e,o,0),Lt===null&&yl(),!1}catch{}finally{}if(n=Mr(t,e,o,s),n!==null)return Me(n,t,s),Qh(n,e,s),!0}return!1}function uc(t,e,n,s){if(s={lane:2,revertLane:Gc(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},ql(t)){if(e)throw Error(r(479))}else e=Mr(t,n,s,2),e!==null&&Me(e,t,2)}function ql(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function _h(t,e){hi=Rl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Qh(t,e,n){if((n&4194048)!==0){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,Kd(t,n)}}var fs={readContext:ce,use:Ul,useCallback:Gt,useContext:Gt,useEffect:Gt,useImperativeHandle:Gt,useLayoutEffect:Gt,useInsertionEffect:Gt,useMemo:Gt,useReducer:Gt,useRef:Gt,useState:Gt,useDebugValue:Gt,useDeferredValue:Gt,useTransition:Gt,useSyncExternalStore:Gt,useId:Gt,useHostTransitionStatus:Gt,useFormState:Gt,useActionState:Gt,useOptimistic:Gt,useMemoCache:Gt,useCacheRefresh:Gt};fs.useEffectEvent=Gt;var Jh={readContext:ce,use:Ul,useCallback:function(t,e){return ye().memoizedState=[t,e===void 0?null:e],t},useContext:ce,useEffect:Dh,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Vl(4194308,4,zh.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Vl(4194308,4,t,e)},useInsertionEffect:function(t,e){Vl(4,2,t,e)},useMemo:function(t,e){var n=ye();e=e===void 0?null:e;var s=t();if(Na){On(!0);try{t()}finally{On(!1)}}return n.memoizedState=[s,e],s},useReducer:function(t,e,n){var s=ye();if(n!==void 0){var o=n(e);if(Na){On(!0);try{n(e)}finally{On(!1)}}}else o=e;return s.memoizedState=s.baseState=o,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:o},s.queue=t,t=t.dispatch=i1.bind(null,rt,t),[s.memoizedState,t]},useRef:function(t){var e=ye();return t={current:t},e.memoizedState=t},useState:function(t){t=ac(t);var e=t.queue,n=Yh.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:lc,useDeferredValue:function(t,e){var n=ye();return oc(n,t,e)},useTransition:function(){var t=ac(!1);return t=Hh.bind(null,rt,t.queue,!0,!1),ye().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var s=rt,o=ye();if(bt){if(n===void 0)throw Error(r(407));n=n()}else{if(n=e(),Lt===null)throw Error(r(349));(gt&127)!==0||hh(s,e,n)}o.memoizedState=n;var c={value:n,getSnapshot:e};return o.queue=c,Dh(mh.bind(null,s,c,t),[t]),s.flags|=2048,mi(9,{destroy:void 0},ph.bind(null,s,c,n,e),null),n},useId:function(){var t=ye(),e=Lt.identifierPrefix;if(bt){var n=rn,s=on;n=(s&~(1<<32-Ne(s)-1)).toString(32)+n,e="_"+e+"R_"+n,n=zl++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Ib++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:cc,useFormState:Th,useActionState:Th,useOptimistic:function(t){var e=ye();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=uc.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:tc,useCacheRefresh:function(){return ye().memoizedState=a1.bind(null,rt)},useEffectEvent:function(t){var e=ye(),n={impl:t};return e.memoizedState=n,function(){if((Tt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}},dc={readContext:ce,use:Ul,useCallback:Uh,useContext:ce,useEffect:sc,useImperativeHandle:Lh,useInsertionEffect:Nh,useLayoutEffect:Rh,useMemo:Oh,useReducer:Ol,useRef:Eh,useState:function(){return Ol(Sn)},useDebugValue:lc,useDeferredValue:function(t,e){var n=Pt();return Vh(n,Nt.memoizedState,t,e)},useTransition:function(){var t=Ol(Sn)[0],e=Pt().memoizedState;return[typeof t=="boolean"?t:us(t),e]},useSyncExternalStore:fh,useId:Fh,useHostTransitionStatus:cc,useFormState:kh,useActionState:kh,useOptimistic:function(t,e){var n=Pt();return yh(n,Nt,t,e)},useMemoCache:tc,useCacheRefresh:Gh};dc.useEffectEvent=Bh;var Xh={readContext:ce,use:Ul,useCallback:Uh,useContext:ce,useEffect:sc,useImperativeHandle:Lh,useInsertionEffect:Nh,useLayoutEffect:Rh,useMemo:Oh,useReducer:nc,useRef:Eh,useState:function(){return nc(Sn)},useDebugValue:lc,useDeferredValue:function(t,e){var n=Pt();return Nt===null?oc(n,t,e):Vh(n,Nt.memoizedState,t,e)},useTransition:function(){var t=nc(Sn)[0],e=Pt().memoizedState;return[typeof t=="boolean"?t:us(t),e]},useSyncExternalStore:fh,useId:Fh,useHostTransitionStatus:cc,useFormState:Mh,useActionState:Mh,useOptimistic:function(t,e){var n=Pt();return Nt!==null?yh(n,Nt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:tc,useCacheRefresh:Gh};Xh.useEffectEvent=Bh;function fc(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:b({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hc={enqueueSetState:function(t,e,n){t=t._reactInternals;var s=He(),o=_n(s);o.payload=e,n!=null&&(o.callback=n),e=Qn(t,o,s),e!==null&&(Me(e,t,s),ls(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=He(),o=_n(s);o.tag=1,o.payload=e,n!=null&&(o.callback=n),e=Qn(t,o,s),e!==null&&(Me(e,t,s),ls(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=He(),s=_n(n);s.tag=2,e!=null&&(s.callback=e),e=Qn(t,s,n),e!==null&&(Me(e,t,n),ls(e,t,n))}};function Ph(t,e,n,s,o,c,h){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,h):e.prototype&&e.prototype.isPureReactComponent?!Wi(n,s)||!Wi(o,c):!0}function Kh(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&hc.enqueueReplaceState(e,e.state,null)}function Ra(t,e){var n=e;if("ref"in e){n={};for(var s in e)s!=="ref"&&(n[s]=e[s])}if(t=t.defaultProps){n===e&&(n=b({},n));for(var o in t)n[o]===void 0&&(n[o]=t[o])}return n}function Zh(t){gl(t)}function Ih(t){console.error(t)}function Wh(t){gl(t)}function jl(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(s){setTimeout(function(){throw s})}}function $h(t,e,n){try{var s=t.onCaughtError;s(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function pc(t,e,n){return n=_n(n),n.tag=3,n.payload={element:null},n.callback=function(){jl(t,e)},n}function tp(t){return t=_n(t),t.tag=3,t}function ep(t,e,n,s){var o=n.type.getDerivedStateFromError;if(typeof o=="function"){var c=s.value;t.payload=function(){return o(c)},t.callback=function(){$h(e,n,s)}}var h=n.stateNode;h!==null&&typeof h.componentDidCatch=="function"&&(t.callback=function(){$h(e,n,s),typeof o!="function"&&(In===null?In=new Set([this]):In.add(this));var y=s.stack;this.componentDidCatch(s.value,{componentStack:y!==null?y:""})})}function s1(t,e,n,s,o){if(n.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(e=n.alternate,e!==null&&oi(e,n,o,!0),n=Le.current,n!==null){switch(n.tag){case 31:case 13:return Xe===null?Wl():n.alternate===null&&Yt===0&&(Yt=3),n.flags&=-257,n.flags|=65536,n.lanes=o,s===Ml?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([s]):e.add(s),qc(t,s,o)),!1;case 22:return n.flags|=65536,s===Ml?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([s])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([s]):n.add(s)),qc(t,s,o)),!1}throw Error(r(435,n.tag))}return qc(t,s,o),Wl(),!1}if(bt)return e=Le.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=o,s!==zr&&(t=Error(r(422),{cause:s}),es(Ye(t,n)))):(s!==zr&&(e=Error(r(423),{cause:s}),es(Ye(e,n))),t=t.current.alternate,t.flags|=65536,o&=-o,t.lanes|=o,s=Ye(s,n),o=pc(t.stateNode,s,o),_r(t,o),Yt!==4&&(Yt=2)),!1;var c=Error(r(520),{cause:s});if(c=Ye(c,n),xs===null?xs=[c]:xs.push(c),Yt!==4&&(Yt=2),e===null)return!0;s=Ye(s,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=o&-o,n.lanes|=t,t=pc(n.stateNode,s,t),_r(n,t),!1;case 1:if(e=n.type,c=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(In===null||!In.has(c))))return n.flags|=65536,o&=-o,n.lanes|=o,o=tp(o),ep(o,t,n,s),_r(n,o),!1}n=n.return}while(n!==null);return!1}var mc=Error(r(461)),Wt=!1;function ue(t,e,n,s){e.child=t===null?sh(e,null,n,s):Ba(e,t.child,n,s)}function np(t,e,n,s,o){n=n.render;var c=e.ref;if("ref"in s){var h={};for(var y in s)y!=="ref"&&(h[y]=s[y])}else h=s;return Ca(e),s=Zr(t,e,n,h,c,o),y=Ir(),t!==null&&!Wt?(Wr(t,e,o),An(t,e,o)):(bt&&y&&Nr(e),e.flags|=1,ue(t,e,s,o),e.child)}function ap(t,e,n,s,o){if(t===null){var c=n.type;return typeof c=="function"&&!Er(c)&&c.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=c,ip(t,e,c,s,o)):(t=Sl(n.type,null,s,e,e.mode,o),t.ref=e.ref,t.return=e,e.child=t)}if(c=t.child,!wc(t,o)){var h=c.memoizedProps;if(n=n.compare,n=n!==null?n:Wi,n(h,s)&&t.ref===e.ref)return An(t,e,o)}return e.flags|=1,t=vn(c,s),t.ref=e.ref,t.return=e,e.child=t}function ip(t,e,n,s,o){if(t!==null){var c=t.memoizedProps;if(Wi(c,s)&&t.ref===e.ref)if(Wt=!1,e.pendingProps=s=c,wc(t,o))(t.flags&131072)!==0&&(Wt=!0);else return e.lanes=t.lanes,An(t,e,o)}return vc(t,e,n,s,o)}function sp(t,e,n,s){var o=s.children,c=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((e.flags&128)!==0){if(c=c!==null?c.baseLanes|n:n,t!==null){for(s=e.child=t.child,o=0;s!==null;)o=o|s.lanes|s.childLanes,s=s.sibling;s=o&~c}else s=0,e.child=null;return lp(t,e,c,n,s)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&kl(e,c!==null?c.cachePool:null),c!==null?rh(e,c):Jr(),ch(e);else return s=e.lanes=536870912,lp(t,e,c!==null?c.baseLanes|n:n,n,s)}else c!==null?(kl(e,c.cachePool),rh(e,c),Xn(),e.memoizedState=null):(t!==null&&kl(e,null),Jr(),Xn());return ue(t,e,o,n),e.child}function hs(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function lp(t,e,n,s,o){var c=jr();return c=c===null?null:{parent:Zt._currentValue,pool:c},e.memoizedState={baseLanes:n,cachePool:c},t!==null&&kl(e,null),Jr(),ch(e),t!==null&&oi(t,e,s,!0),e.childLanes=o,null}function Fl(t,e){return e=Yl({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function op(t,e,n){return Ba(e,t.child,null,n),t=Fl(e,e.pendingProps),t.flags|=2,Ue(e),e.memoizedState=null,t}function l1(t,e,n){var s=e.pendingProps,o=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(bt){if(s.mode==="hidden")return t=Fl(e,s),e.lanes=536870912,hs(null,t);if(Pr(e),(t=Ut)?(t=bm(t,Je),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:qn!==null?{id:on,overflow:rn}:null,retryLane:536870912,hydrationErrors:null},n=_f(t),n.return=e,e.child=n,re=e,Ut=null)):t=null,t===null)throw Fn(e);return e.lanes=536870912,null}return Fl(e,s)}var c=t.memoizedState;if(c!==null){var h=c.dehydrated;if(Pr(e),o)if(e.flags&256)e.flags&=-257,e=op(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(r(558));else if(Wt||oi(t,e,n,!1),o=(n&t.childLanes)!==0,Wt||o){if(s=Lt,s!==null&&(h=Zd(s,n),h!==0&&h!==c.retryLane))throw c.retryLane=h,Aa(t,h),Me(s,t,h),mc;Wl(),e=op(t,e,n)}else t=c.treeContext,Ut=Pe(h.nextSibling),re=e,bt=!0,jn=null,Je=!1,t!==null&&Xf(e,t),e=Fl(e,s),e.flags|=4096;return e}return t=vn(t.child,{mode:s.mode,children:s.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Gl(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(r(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function vc(t,e,n,s,o){return Ca(e),n=Zr(t,e,n,s,void 0,o),s=Ir(),t!==null&&!Wt?(Wr(t,e,o),An(t,e,o)):(bt&&s&&Nr(e),e.flags|=1,ue(t,e,n,o),e.child)}function rp(t,e,n,s,o,c){return Ca(e),e.updateQueue=null,n=dh(e,s,n,o),uh(t),s=Ir(),t!==null&&!Wt?(Wr(t,e,c),An(t,e,c)):(bt&&s&&Nr(e),e.flags|=1,ue(t,e,n,c),e.child)}function cp(t,e,n,s,o){if(Ca(e),e.stateNode===null){var c=ai,h=n.contextType;typeof h=="object"&&h!==null&&(c=ce(h)),c=new n(s,c),e.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=hc,e.stateNode=c,c._reactInternals=e,c=e.stateNode,c.props=s,c.state=e.memoizedState,c.refs={},Gr(e),h=n.contextType,c.context=typeof h=="object"&&h!==null?ce(h):ai,c.state=e.memoizedState,h=n.getDerivedStateFromProps,typeof h=="function"&&(fc(e,n,h,s),c.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(h=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),h!==c.state&&hc.enqueueReplaceState(c,c.state,null),rs(e,s,c,o),os(),c.state=e.memoizedState),typeof c.componentDidMount=="function"&&(e.flags|=4194308),s=!0}else if(t===null){c=e.stateNode;var y=e.memoizedProps,x=Ra(n,y);c.props=x;var M=c.context,N=n.contextType;h=ai,typeof N=="object"&&N!==null&&(h=ce(N));var U=n.getDerivedStateFromProps;N=typeof U=="function"||typeof c.getSnapshotBeforeUpdate=="function",y=e.pendingProps!==y,N||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(y||M!==h)&&Kh(e,c,s,h),Yn=!1;var E=e.memoizedState;c.state=E,rs(e,s,c,o),os(),M=e.memoizedState,y||E!==M||Yn?(typeof U=="function"&&(fc(e,n,U,s),M=e.memoizedState),(x=Yn||Ph(e,n,x,s,E,M,h))?(N||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(e.flags|=4194308)):(typeof c.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=M),c.props=s,c.state=M,c.context=h,s=x):(typeof c.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{c=e.stateNode,Yr(t,e),h=e.memoizedProps,N=Ra(n,h),c.props=N,U=e.pendingProps,E=c.context,M=n.contextType,x=ai,typeof M=="object"&&M!==null&&(x=ce(M)),y=n.getDerivedStateFromProps,(M=typeof y=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(h!==U||E!==x)&&Kh(e,c,s,x),Yn=!1,E=e.memoizedState,c.state=E,rs(e,s,c,o),os();var B=e.memoizedState;h!==U||E!==B||Yn||t!==null&&t.dependencies!==null&&wl(t.dependencies)?(typeof y=="function"&&(fc(e,n,y,s),B=e.memoizedState),(N=Yn||Ph(e,n,N,s,E,B,x)||t!==null&&t.dependencies!==null&&wl(t.dependencies))?(M||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,B,x),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,B,x)),typeof c.componentDidUpdate=="function"&&(e.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof c.componentDidUpdate!="function"||h===t.memoizedProps&&E===t.memoizedState||(e.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||h===t.memoizedProps&&E===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=B),c.props=s,c.state=B,c.context=x,s=N):(typeof c.componentDidUpdate!="function"||h===t.memoizedProps&&E===t.memoizedState||(e.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||h===t.memoizedProps&&E===t.memoizedState||(e.flags|=1024),s=!1)}return c=s,Gl(t,e),s=(e.flags&128)!==0,c||s?(c=e.stateNode,n=s&&typeof n.getDerivedStateFromError!="function"?null:c.render(),e.flags|=1,t!==null&&s?(e.child=Ba(e,t.child,null,o),e.child=Ba(e,null,n,o)):ue(t,e,n,o),e.memoizedState=c.state,t=e.child):t=An(t,e,o),t}function up(t,e,n,s){return Ta(),e.flags|=256,ue(t,e,n,s),e.child}var gc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function yc(t){return{baseLanes:t,cachePool:$f()}}function bc(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=Ve),t}function dp(t,e,n){var s=e.pendingProps,o=!1,c=(e.flags&128)!==0,h;if((h=c)||(h=t!==null&&t.memoizedState===null?!1:(Xt.current&2)!==0),h&&(o=!0,e.flags&=-129),h=(e.flags&32)!==0,e.flags&=-33,t===null){if(bt){if(o?Jn(e):Xn(),(t=Ut)?(t=bm(t,Je),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:qn!==null?{id:on,overflow:rn}:null,retryLane:536870912,hydrationErrors:null},n=_f(t),n.return=e,e.child=n,re=e,Ut=null)):t=null,t===null)throw Fn(e);return eu(t)?e.lanes=32:e.lanes=536870912,null}var y=s.children;return s=s.fallback,o?(Xn(),o=e.mode,y=Yl({mode:"hidden",children:y},o),s=wa(s,o,n,null),y.return=e,s.return=e,y.sibling=s,e.child=y,s=e.child,s.memoizedState=yc(n),s.childLanes=bc(t,h,n),e.memoizedState=gc,hs(null,s)):(Jn(e),xc(e,y))}var x=t.memoizedState;if(x!==null&&(y=x.dehydrated,y!==null)){if(c)e.flags&256?(Jn(e),e.flags&=-257,e=Sc(t,e,n)):e.memoizedState!==null?(Xn(),e.child=t.child,e.flags|=128,e=null):(Xn(),y=s.fallback,o=e.mode,s=Yl({mode:"visible",children:s.children},o),y=wa(y,o,n,null),y.flags|=2,s.return=e,y.return=e,s.sibling=y,e.child=s,Ba(e,t.child,null,n),s=e.child,s.memoizedState=yc(n),s.childLanes=bc(t,h,n),e.memoizedState=gc,e=hs(null,s));else if(Jn(e),eu(y)){if(h=y.nextSibling&&y.nextSibling.dataset,h)var M=h.dgst;h=M,s=Error(r(419)),s.stack="",s.digest=h,es({value:s,source:null,stack:null}),e=Sc(t,e,n)}else if(Wt||oi(t,e,n,!1),h=(n&t.childLanes)!==0,Wt||h){if(h=Lt,h!==null&&(s=Zd(h,n),s!==0&&s!==x.retryLane))throw x.retryLane=s,Aa(t,s),Me(h,t,s),mc;tu(y)||Wl(),e=Sc(t,e,n)}else tu(y)?(e.flags|=192,e.child=t.child,e=null):(t=x.treeContext,Ut=Pe(y.nextSibling),re=e,bt=!0,jn=null,Je=!1,t!==null&&Xf(e,t),e=xc(e,s.children),e.flags|=4096);return e}return o?(Xn(),y=s.fallback,o=e.mode,x=t.child,M=x.sibling,s=vn(x,{mode:"hidden",children:s.children}),s.subtreeFlags=x.subtreeFlags&65011712,M!==null?y=vn(M,y):(y=wa(y,o,n,null),y.flags|=2),y.return=e,s.return=e,s.sibling=y,e.child=s,hs(null,s),s=e.child,y=t.child.memoizedState,y===null?y=yc(n):(o=y.cachePool,o!==null?(x=Zt._currentValue,o=o.parent!==x?{parent:x,pool:x}:o):o=$f(),y={baseLanes:y.baseLanes|n,cachePool:o}),s.memoizedState=y,s.childLanes=bc(t,h,n),e.memoizedState=gc,hs(t.child,s)):(Jn(e),n=t.child,t=n.sibling,n=vn(n,{mode:"visible",children:s.children}),n.return=e,n.sibling=null,t!==null&&(h=e.deletions,h===null?(e.deletions=[t],e.flags|=16):h.push(t)),e.child=n,e.memoizedState=null,n)}function xc(t,e){return e=Yl({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Yl(t,e){return t=ze(22,t,null,e),t.lanes=0,t}function Sc(t,e,n){return Ba(e,t.child,null,n),t=xc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function fp(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),Or(t.return,e,n)}function Ac(t,e,n,s,o,c){var h=t.memoizedState;h===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:o,treeForkCount:c}:(h.isBackwards=e,h.rendering=null,h.renderingStartTime=0,h.last=s,h.tail=n,h.tailMode=o,h.treeForkCount=c)}function hp(t,e,n){var s=e.pendingProps,o=s.revealOrder,c=s.tail;s=s.children;var h=Xt.current,y=(h&2)!==0;if(y?(h=h&1|2,e.flags|=128):h&=1,_(Xt,h),ue(t,e,s,n),s=bt?ts:0,!y&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&fp(t,n,e);else if(t.tag===19)fp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(o){case"forwards":for(n=e.child,o=null;n!==null;)t=n.alternate,t!==null&&Nl(t)===null&&(o=n),n=n.sibling;n=o,n===null?(o=e.child,e.child=null):(o=n.sibling,n.sibling=null),Ac(e,!1,o,n,c,s);break;case"backwards":case"unstable_legacy-backwards":for(n=null,o=e.child,e.child=null;o!==null;){if(t=o.alternate,t!==null&&Nl(t)===null){e.child=o;break}t=o.sibling,o.sibling=n,n=o,o=t}Ac(e,!0,n,null,c,s);break;case"together":Ac(e,!1,null,null,void 0,s);break;default:e.memoizedState=null}return e.child}function An(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Zn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(oi(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(r(153));if(e.child!==null){for(t=e.child,n=vn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=vn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function wc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&wl(t)))}function o1(t,e,n){switch(e.tag){case 3:ge(e,e.stateNode.containerInfo),Gn(e,Zt,t.memoizedState.cache),Ta();break;case 27:case 5:qi(e);break;case 4:ge(e,e.stateNode.containerInfo);break;case 10:Gn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Pr(e),null;break;case 13:var s=e.memoizedState;if(s!==null)return s.dehydrated!==null?(Jn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?dp(t,e,n):(Jn(e),t=An(t,e,n),t!==null?t.sibling:null);Jn(e);break;case 19:var o=(t.flags&128)!==0;if(s=(n&e.childLanes)!==0,s||(oi(t,e,n,!1),s=(n&e.childLanes)!==0),o){if(s)return hp(t,e,n);e.flags|=128}if(o=e.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),_(Xt,Xt.current),s)break;return null;case 22:return e.lanes=0,sp(t,e,n,e.pendingProps);case 24:Gn(e,Zt,t.memoizedState.cache)}return An(t,e,n)}function pp(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Wt=!0;else{if(!wc(t,n)&&(e.flags&128)===0)return Wt=!1,o1(t,e,n);Wt=(t.flags&131072)!==0}else Wt=!1,bt&&(e.flags&1048576)!==0&&Jf(e,ts,e.index);switch(e.lanes=0,e.tag){case 16:t:{var s=e.pendingProps;if(t=Ea(e.elementType),e.type=t,typeof t=="function")Er(t)?(s=Ra(t,s),e.tag=1,e=cp(null,e,t,s,n)):(e.tag=0,e=vc(null,e,t,s,n));else{if(t!=null){var o=t.$$typeof;if(o===at){e.tag=11,e=np(null,e,t,s,n);break t}else if(o===$){e.tag=14,e=ap(null,e,t,s,n);break t}}throw e=xe(t)||t,Error(r(306,e,""))}}return e;case 0:return vc(t,e,e.type,e.pendingProps,n);case 1:return s=e.type,o=Ra(s,e.pendingProps),cp(t,e,s,o,n);case 3:t:{if(ge(e,e.stateNode.containerInfo),t===null)throw Error(r(387));s=e.pendingProps;var c=e.memoizedState;o=c.element,Yr(t,e),rs(e,s,null,n);var h=e.memoizedState;if(s=h.cache,Gn(e,Zt,s),s!==c.cache&&Vr(e,[Zt],n,!0),os(),s=h.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:h.cache},e.updateQueue.baseState=c,e.memoizedState=c,e.flags&256){e=up(t,e,s,n);break t}else if(s!==o){o=Ye(Error(r(424)),e),es(o),e=up(t,e,s,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Ut=Pe(t.firstChild),re=e,bt=!0,jn=null,Je=!0,n=sh(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ta(),s===o){e=An(t,e,n);break t}ue(t,e,s,n)}e=e.child}return e;case 26:return Gl(t,e),t===null?(n=km(e.type,null,e.pendingProps,null))?e.memoizedState=n:bt||(n=e.type,t=e.pendingProps,s=so(ht.current).createElement(n),s[oe]=e,s[Se]=t,de(s,n,t),ie(s),e.stateNode=s):e.memoizedState=km(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return qi(e),t===null&&bt&&(s=e.stateNode=Am(e.type,e.pendingProps,ht.current),re=e,Je=!0,o=Ut,ea(e.type)?(nu=o,Ut=Pe(s.firstChild)):Ut=o),ue(t,e,e.pendingProps.children,n),Gl(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&bt&&((o=s=Ut)&&(s=V1(s,e.type,e.pendingProps,Je),s!==null?(e.stateNode=s,re=e,Ut=Pe(s.firstChild),Je=!1,o=!0):o=!1),o||Fn(e)),qi(e),o=e.type,c=e.pendingProps,h=t!==null?t.memoizedProps:null,s=c.children,Ic(o,c)?s=null:h!==null&&Ic(o,h)&&(e.flags|=32),e.memoizedState!==null&&(o=Zr(t,e,Wb,null,null,n),Es._currentValue=o),Gl(t,e),ue(t,e,s,n),e.child;case 6:return t===null&&bt&&((t=n=Ut)&&(n=H1(n,e.pendingProps,Je),n!==null?(e.stateNode=n,re=e,Ut=null,t=!0):t=!1),t||Fn(e)),null;case 13:return dp(t,e,n);case 4:return ge(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=Ba(e,null,s,n):ue(t,e,s,n),e.child;case 11:return np(t,e,e.type,e.pendingProps,n);case 7:return ue(t,e,e.pendingProps,n),e.child;case 8:return ue(t,e,e.pendingProps.children,n),e.child;case 12:return ue(t,e,e.pendingProps.children,n),e.child;case 10:return s=e.pendingProps,Gn(e,e.type,s.value),ue(t,e,s.children,n),e.child;case 9:return o=e.type._context,s=e.pendingProps.children,Ca(e),o=ce(o),s=s(o),e.flags|=1,ue(t,e,s,n),e.child;case 14:return ap(t,e,e.type,e.pendingProps,n);case 15:return ip(t,e,e.type,e.pendingProps,n);case 19:return hp(t,e,n);case 31:return l1(t,e,n);case 22:return sp(t,e,n,e.pendingProps);case 24:return Ca(e),s=ce(Zt),t===null?(o=jr(),o===null&&(o=Lt,c=Hr(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=n),o=c),e.memoizedState={parent:s,cache:o},Gr(e),Gn(e,Zt,o)):((t.lanes&n)!==0&&(Yr(t,e),rs(e,null,null,n),os()),o=t.memoizedState,c=e.memoizedState,o.parent!==s?(o={parent:s,cache:s},e.memoizedState=o,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=o),Gn(e,Zt,s)):(s=c.cache,Gn(e,Zt,s),s!==o.cache&&Vr(e,[Zt],n,!0))),ue(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(r(156,e.tag))}function wn(t){t.flags|=4}function Tc(t,e,n,s,o){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(o&335544128)===o)if(t.stateNode.complete)t.flags|=8192;else if(Fp())t.flags|=8192;else throw Da=Ml,Fr}else t.flags&=-16777217}function mp(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Bm(e))if(Fp())t.flags|=8192;else throw Da=Ml,Fr}function _l(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Xd():536870912,t.lanes|=e,bi|=e)}function ps(t,e){if(!bt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var o=t.child;o!==null;)n|=o.lanes|o.childLanes,s|=o.subtreeFlags&65011712,s|=o.flags&65011712,o.return=t,o=o.sibling;else for(o=t.child;o!==null;)n|=o.lanes|o.childLanes,s|=o.subtreeFlags,s|=o.flags,o.return=t,o=o.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function r1(t,e,n){var s=e.pendingProps;switch(Rr(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return Ot(e),null;case 3:return n=e.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),e.memoizedState.cache!==s&&(e.flags|=2048),bn(Zt),Jt(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(li(e)?wn(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Lr())),Ot(e),null;case 26:var o=e.type,c=e.memoizedState;return t===null?(wn(e),c!==null?(Ot(e),mp(e,c)):(Ot(e),Tc(e,o,null,s,n))):c?c!==t.memoizedState?(wn(e),Ot(e),mp(e,c)):(Ot(e),e.flags&=-16777217):(t=t.memoizedProps,t!==s&&wn(e),Ot(e),Tc(e,o,t,s,n)),null;case 27:if(el(e),n=ht.current,o=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&wn(e);else{if(!s){if(e.stateNode===null)throw Error(r(166));return Ot(e),null}t=Z.current,li(e)?Pf(e):(t=Am(o,s,n),e.stateNode=t,wn(e))}return Ot(e),null;case 5:if(el(e),o=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&wn(e);else{if(!s){if(e.stateNode===null)throw Error(r(166));return Ot(e),null}if(c=Z.current,li(e))Pf(e);else{var h=so(ht.current);switch(c){case 1:c=h.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=h.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=h.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=h.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=h.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?h.createElement("select",{is:s.is}):h.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?h.createElement(o,{is:s.is}):h.createElement(o)}}c[oe]=e,c[Se]=s;t:for(h=e.child;h!==null;){if(h.tag===5||h.tag===6)c.appendChild(h.stateNode);else if(h.tag!==4&&h.tag!==27&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break t;for(;h.sibling===null;){if(h.return===null||h.return===e)break t;h=h.return}h.sibling.return=h.return,h=h.sibling}e.stateNode=c;t:switch(de(c,o,s),o){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&wn(e)}}return Ot(e),Tc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==s&&wn(e);else{if(typeof s!="string"&&e.stateNode===null)throw Error(r(166));if(t=ht.current,li(e)){if(t=e.stateNode,n=e.memoizedProps,s=null,o=re,o!==null)switch(o.tag){case 27:case 5:s=o.memoizedProps}t[oe]=e,t=!!(t.nodeValue===n||s!==null&&s.suppressHydrationWarning===!0||dm(t.nodeValue,n)),t||Fn(e,!0)}else t=so(t).createTextNode(s),t[oe]=e,e.stateNode=t}return Ot(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(s=li(e),n!==null){if(t===null){if(!s)throw Error(r(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[oe]=e}else Ta(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),t=!1}else n=Lr(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Ue(e),e):(Ue(e),null);if((e.flags&128)!==0)throw Error(r(558))}return Ot(e),null;case 13:if(s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(o=li(e),s!==null&&s.dehydrated!==null){if(t===null){if(!o)throw Error(r(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(r(317));o[oe]=e}else Ta(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ot(e),o=!1}else o=Lr(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=o),o=!0;if(!o)return e.flags&256?(Ue(e),e):(Ue(e),null)}return Ue(e),(e.flags&128)!==0?(e.lanes=n,e):(n=s!==null,t=t!==null&&t.memoizedState!==null,n&&(s=e.child,o=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(o=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==o&&(s.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),_l(e,e.updateQueue),Ot(e),null);case 4:return Jt(),t===null&&Jc(e.stateNode.containerInfo),Ot(e),null;case 10:return bn(e.type),Ot(e),null;case 19:if(O(Xt),s=e.memoizedState,s===null)return Ot(e),null;if(o=(e.flags&128)!==0,c=s.rendering,c===null)if(o)ps(s,!1);else{if(Yt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(c=Nl(t),c!==null){for(e.flags|=128,ps(s,!1),t=c.updateQueue,e.updateQueue=t,_l(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)Yf(n,t),n=n.sibling;return _(Xt,Xt.current&1|2),bt&&gn(e,s.treeForkCount),e.child}t=t.sibling}s.tail!==null&&De()>Kl&&(e.flags|=128,o=!0,ps(s,!1),e.lanes=4194304)}else{if(!o)if(t=Nl(c),t!==null){if(e.flags|=128,o=!0,t=t.updateQueue,e.updateQueue=t,_l(e,t),ps(s,!0),s.tail===null&&s.tailMode==="hidden"&&!c.alternate&&!bt)return Ot(e),null}else 2*De()-s.renderingStartTime>Kl&&n!==536870912&&(e.flags|=128,o=!0,ps(s,!1),e.lanes=4194304);s.isBackwards?(c.sibling=e.child,e.child=c):(t=s.last,t!==null?t.sibling=c:e.child=c,s.last=c)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=De(),t.sibling=null,n=Xt.current,_(Xt,o?n&1|2:n&1),bt&&gn(e,s.treeForkCount),t):(Ot(e),null);case 22:case 23:return Ue(e),Xr(),s=e.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(e.flags|=8192):s&&(e.flags|=8192),s?(n&536870912)!==0&&(e.flags&128)===0&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),n=e.updateQueue,n!==null&&_l(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==n&&(e.flags|=2048),t!==null&&O(Ma),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),bn(Zt),Ot(e),null;case 25:return null;case 30:return null}throw Error(r(156,e.tag))}function c1(t,e){switch(Rr(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return bn(Zt),Jt(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return el(e),null;case 31:if(e.memoizedState!==null){if(Ue(e),e.alternate===null)throw Error(r(340));Ta()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Ue(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(r(340));Ta()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return O(Xt),null;case 4:return Jt(),null;case 10:return bn(e.type),null;case 22:case 23:return Ue(e),Xr(),t!==null&&O(Ma),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return bn(Zt),null;case 25:return null;default:return null}}function vp(t,e){switch(Rr(e),e.tag){case 3:bn(Zt),Jt();break;case 26:case 27:case 5:el(e);break;case 4:Jt();break;case 31:e.memoizedState!==null&&Ue(e);break;case 13:Ue(e);break;case 19:O(Xt);break;case 10:bn(e.type);break;case 22:case 23:Ue(e),Xr(),t!==null&&O(Ma);break;case 24:bn(Zt)}}function ms(t,e){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var o=s.next;n=o;do{if((n.tag&t)===t){s=void 0;var c=n.create,h=n.inst;s=c(),h.destroy=s}n=n.next}while(n!==o)}}catch(y){Dt(e,e.return,y)}}function Pn(t,e,n){try{var s=e.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var c=o.next;s=c;do{if((s.tag&t)===t){var h=s.inst,y=h.destroy;if(y!==void 0){h.destroy=void 0,o=e;var x=n,M=y;try{M()}catch(N){Dt(o,x,N)}}}s=s.next}while(s!==c)}}catch(N){Dt(e,e.return,N)}}function gp(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{oh(e,n)}catch(s){Dt(t,t.return,s)}}}function yp(t,e,n){n.props=Ra(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(s){Dt(t,e,s)}}function vs(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof n=="function"?t.refCleanup=n(s):n.current=s}}catch(o){Dt(t,e,o)}}function cn(t,e){var n=t.ref,s=t.refCleanup;if(n!==null)if(typeof s=="function")try{s()}catch(o){Dt(t,e,o)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(o){Dt(t,e,o)}else n.current=null}function bp(t){var e=t.type,n=t.memoizedProps,s=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&s.focus();break t;case"img":n.src?s.src=n.src:n.srcSet&&(s.srcset=n.srcSet)}}catch(o){Dt(t,t.return,o)}}function kc(t,e,n){try{var s=t.stateNode;N1(s,t.type,n,e),s[Se]=e}catch(o){Dt(t,t.return,o)}}function xp(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ea(t.type)||t.tag===4}function Cc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||xp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ea(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Mc(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=pn));else if(s!==4&&(s===27&&ea(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Mc(t,e,n),t=t.sibling;t!==null;)Mc(t,e,n),t=t.sibling}function Ql(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(s===27&&ea(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ql(t,e,n),t=t.sibling;t!==null;)Ql(t,e,n),t=t.sibling}function Sp(t){var e=t.stateNode,n=t.memoizedProps;try{for(var s=t.type,o=e.attributes;o.length;)e.removeAttributeNode(o[0]);de(e,s,n),e[oe]=t,e[Se]=n}catch(c){Dt(t,t.return,c)}}var Tn=!1,$t=!1,Ec=!1,Ap=typeof WeakSet=="function"?WeakSet:Set,se=null;function u1(t,e){if(t=t.containerInfo,Kc=ho,t=Lf(t),Sr(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var o=s.anchorOffset,c=s.focusNode;s=s.focusOffset;try{n.nodeType,c.nodeType}catch{n=null;break t}var h=0,y=-1,x=-1,M=0,N=0,U=t,E=null;e:for(;;){for(var B;U!==n||o!==0&&U.nodeType!==3||(y=h+o),U!==c||s!==0&&U.nodeType!==3||(x=h+s),U.nodeType===3&&(h+=U.nodeValue.length),(B=U.firstChild)!==null;)E=U,U=B;for(;;){if(U===t)break e;if(E===n&&++M===o&&(y=h),E===c&&++N===s&&(x=h),(B=U.nextSibling)!==null)break;U=E,E=U.parentNode}U=B}n=y===-1||x===-1?null:{start:y,end:x}}else n=null}n=n||{start:0,end:0}}else n=null;for(Zc={focusedElem:t,selectionRange:n},ho=!1,se=e;se!==null;)if(e=se,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,se=t;else for(;se!==null;){switch(e=se,c=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)o=t[n],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&c!==null){t=void 0,n=e,o=c.memoizedProps,c=c.memoizedState,s=n.stateNode;try{var P=Ra(n.type,o);t=s.getSnapshotBeforeUpdate(P,c),s.__reactInternalSnapshotBeforeUpdate=t}catch(nt){Dt(n,n.return,nt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)$c(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":$c(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=e.sibling,t!==null){t.return=e.return,se=t;break}se=e.return}}function wp(t,e,n){var s=n.flags;switch(n.tag){case 0:case 11:case 15:Cn(t,n),s&4&&ms(5,n);break;case 1:if(Cn(t,n),s&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(h){Dt(n,n.return,h)}else{var o=Ra(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(o,e,t.__reactInternalSnapshotBeforeUpdate)}catch(h){Dt(n,n.return,h)}}s&64&&gp(n),s&512&&vs(n,n.return);break;case 3:if(Cn(t,n),s&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{oh(t,e)}catch(h){Dt(n,n.return,h)}}break;case 27:e===null&&s&4&&Sp(n);case 26:case 5:Cn(t,n),e===null&&s&4&&bp(n),s&512&&vs(n,n.return);break;case 12:Cn(t,n);break;case 31:Cn(t,n),s&4&&Cp(t,n);break;case 13:Cn(t,n),s&4&&Mp(t,n),s&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=b1.bind(null,n),q1(t,n))));break;case 22:if(s=n.memoizedState!==null||Tn,!s){e=e!==null&&e.memoizedState!==null||$t,o=Tn;var c=$t;Tn=s,($t=e)&&!c?Mn(t,n,(n.subtreeFlags&8772)!==0):Cn(t,n),Tn=o,$t=c}break;case 30:break;default:Cn(t,n)}}function Tp(t){var e=t.alternate;e!==null&&(t.alternate=null,Tp(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ir(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ht=null,we=!1;function kn(t,e,n){for(n=n.child;n!==null;)kp(t,e,n),n=n.sibling}function kp(t,e,n){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(ji,n)}catch{}switch(n.tag){case 26:$t||cn(n,e),kn(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:$t||cn(n,e);var s=Ht,o=we;ea(n.type)&&(Ht=n.stateNode,we=!1),kn(t,e,n),ks(n.stateNode),Ht=s,we=o;break;case 5:$t||cn(n,e);case 6:if(s=Ht,o=we,Ht=null,kn(t,e,n),Ht=s,we=o,Ht!==null)if(we)try{(Ht.nodeType===9?Ht.body:Ht.nodeName==="HTML"?Ht.ownerDocument.body:Ht).removeChild(n.stateNode)}catch(c){Dt(n,e,c)}else try{Ht.removeChild(n.stateNode)}catch(c){Dt(n,e,c)}break;case 18:Ht!==null&&(we?(t=Ht,gm(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Mi(t)):gm(Ht,n.stateNode));break;case 4:s=Ht,o=we,Ht=n.stateNode.containerInfo,we=!0,kn(t,e,n),Ht=s,we=o;break;case 0:case 11:case 14:case 15:Pn(2,n,e),$t||Pn(4,n,e),kn(t,e,n);break;case 1:$t||(cn(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"&&yp(n,e,s)),kn(t,e,n);break;case 21:kn(t,e,n);break;case 22:$t=(s=$t)||n.memoizedState!==null,kn(t,e,n),$t=s;break;default:kn(t,e,n)}}function Cp(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Mi(t)}catch(n){Dt(e,e.return,n)}}}function Mp(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Mi(t)}catch(n){Dt(e,e.return,n)}}function d1(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Ap),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Ap),e;default:throw Error(r(435,t.tag))}}function Jl(t,e){var n=d1(t);e.forEach(function(s){if(!n.has(s)){n.add(s);var o=x1.bind(null,t,s);s.then(o,o)}})}function Te(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var o=n[s],c=t,h=e,y=h;t:for(;y!==null;){switch(y.tag){case 27:if(ea(y.type)){Ht=y.stateNode,we=!1;break t}break;case 5:Ht=y.stateNode,we=!1;break t;case 3:case 4:Ht=y.stateNode.containerInfo,we=!0;break t}y=y.return}if(Ht===null)throw Error(r(160));kp(c,h,o),Ht=null,we=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Ep(e,t),e=e.sibling}var an=null;function Ep(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Te(e,t),ke(t),s&4&&(Pn(3,t,t.return),ms(3,t),Pn(5,t,t.return));break;case 1:Te(e,t),ke(t),s&512&&($t||n===null||cn(n,n.return)),s&64&&Tn&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?s:n.concat(s))));break;case 26:var o=an;if(Te(e,t),ke(t),s&512&&($t||n===null||cn(n,n.return)),s&4){var c=n!==null?n.memoizedState:null;if(s=t.memoizedState,n===null)if(s===null)if(t.stateNode===null){t:{s=t.type,n=t.memoizedProps,o=o.ownerDocument||o;e:switch(s){case"title":c=o.getElementsByTagName("title")[0],(!c||c[Yi]||c[oe]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(s),o.head.insertBefore(c,o.querySelector("head > title"))),de(c,s,n),c[oe]=t,ie(c),s=c;break t;case"link":var h=Em("link","href",o).get(s+(n.href||""));if(h){for(var y=0;y<h.length;y++)if(c=h[y],c.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&c.getAttribute("rel")===(n.rel==null?null:n.rel)&&c.getAttribute("title")===(n.title==null?null:n.title)&&c.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){h.splice(y,1);break e}}c=o.createElement(s),de(c,s,n),o.head.appendChild(c);break;case"meta":if(h=Em("meta","content",o).get(s+(n.content||""))){for(y=0;y<h.length;y++)if(c=h[y],c.getAttribute("content")===(n.content==null?null:""+n.content)&&c.getAttribute("name")===(n.name==null?null:n.name)&&c.getAttribute("property")===(n.property==null?null:n.property)&&c.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&c.getAttribute("charset")===(n.charSet==null?null:n.charSet)){h.splice(y,1);break e}}c=o.createElement(s),de(c,s,n),o.head.appendChild(c);break;default:throw Error(r(468,s))}c[oe]=t,ie(c),s=c}t.stateNode=s}else Dm(o,t.type,t.stateNode);else t.stateNode=Mm(o,s,t.memoizedProps);else c!==s?(c===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):c.count--,s===null?Dm(o,t.type,t.stateNode):Mm(o,s,t.memoizedProps)):s===null&&t.stateNode!==null&&kc(t,t.memoizedProps,n.memoizedProps)}break;case 27:Te(e,t),ke(t),s&512&&($t||n===null||cn(n,n.return)),n!==null&&s&4&&kc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Te(e,t),ke(t),s&512&&($t||n===null||cn(n,n.return)),t.flags&32){o=t.stateNode;try{Za(o,"")}catch(P){Dt(t,t.return,P)}}s&4&&t.stateNode!=null&&(o=t.memoizedProps,kc(t,o,n!==null?n.memoizedProps:o)),s&1024&&(Ec=!0);break;case 6:if(Te(e,t),ke(t),s&4){if(t.stateNode===null)throw Error(r(162));s=t.memoizedProps,n=t.stateNode;try{n.nodeValue=s}catch(P){Dt(t,t.return,P)}}break;case 3:if(ro=null,o=an,an=lo(e.containerInfo),Te(e,t),an=o,ke(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{Mi(e.containerInfo)}catch(P){Dt(t,t.return,P)}Ec&&(Ec=!1,Dp(t));break;case 4:s=an,an=lo(t.stateNode.containerInfo),Te(e,t),ke(t),an=s;break;case 12:Te(e,t),ke(t);break;case 31:Te(e,t),ke(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Jl(t,s)));break;case 13:Te(e,t),ke(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Pl=De()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Jl(t,s)));break;case 22:o=t.memoizedState!==null;var x=n!==null&&n.memoizedState!==null,M=Tn,N=$t;if(Tn=M||o,$t=N||x,Te(e,t),$t=N,Tn=M,ke(t),s&8192)t:for(e=t.stateNode,e._visibility=o?e._visibility&-2:e._visibility|1,o&&(n===null||x||Tn||$t||za(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){x=n=e;try{if(c=x.stateNode,o)h=c.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none";else{y=x.stateNode;var U=x.memoizedProps.style,E=U!=null&&U.hasOwnProperty("display")?U.display:null;y.style.display=E==null||typeof E=="boolean"?"":(""+E).trim()}}catch(P){Dt(x,x.return,P)}}}else if(e.tag===6){if(n===null){x=e;try{x.stateNode.nodeValue=o?"":x.memoizedProps}catch(P){Dt(x,x.return,P)}}}else if(e.tag===18){if(n===null){x=e;try{var B=x.stateNode;o?ym(B,!0):ym(x.stateNode,!1)}catch(P){Dt(x,x.return,P)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}s&4&&(s=t.updateQueue,s!==null&&(n=s.retryQueue,n!==null&&(s.retryQueue=null,Jl(t,n))));break;case 19:Te(e,t),ke(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Jl(t,s)));break;case 30:break;case 21:break;default:Te(e,t),ke(t)}}function ke(t){var e=t.flags;if(e&2){try{for(var n,s=t.return;s!==null;){if(xp(s)){n=s;break}s=s.return}if(n==null)throw Error(r(160));switch(n.tag){case 27:var o=n.stateNode,c=Cc(t);Ql(t,c,o);break;case 5:var h=n.stateNode;n.flags&32&&(Za(h,""),n.flags&=-33);var y=Cc(t);Ql(t,y,h);break;case 3:case 4:var x=n.stateNode.containerInfo,M=Cc(t);Mc(t,M,x);break;default:throw Error(r(161))}}catch(N){Dt(t,t.return,N)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Dp(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Dp(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Cn(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)wp(t,e.alternate,e),e=e.sibling}function za(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Pn(4,e,e.return),za(e);break;case 1:cn(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&yp(e,e.return,n),za(e);break;case 27:ks(e.stateNode);case 26:case 5:cn(e,e.return),za(e);break;case 22:e.memoizedState===null&&za(e);break;case 30:za(e);break;default:za(e)}t=t.sibling}}function Mn(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var s=e.alternate,o=t,c=e,h=c.flags;switch(c.tag){case 0:case 11:case 15:Mn(o,c,n),ms(4,c);break;case 1:if(Mn(o,c,n),s=c,o=s.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(M){Dt(s,s.return,M)}if(s=c,o=s.updateQueue,o!==null){var y=s.stateNode;try{var x=o.shared.hiddenCallbacks;if(x!==null)for(o.shared.hiddenCallbacks=null,o=0;o<x.length;o++)lh(x[o],y)}catch(M){Dt(s,s.return,M)}}n&&h&64&&gp(c),vs(c,c.return);break;case 27:Sp(c);case 26:case 5:Mn(o,c,n),n&&s===null&&h&4&&bp(c),vs(c,c.return);break;case 12:Mn(o,c,n);break;case 31:Mn(o,c,n),n&&h&4&&Cp(o,c);break;case 13:Mn(o,c,n),n&&h&4&&Mp(o,c);break;case 22:c.memoizedState===null&&Mn(o,c,n),vs(c,c.return);break;case 30:break;default:Mn(o,c,n)}e=e.sibling}}function Dc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&ns(n))}function Bc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ns(t))}function sn(t,e,n,s){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Bp(t,e,n,s),e=e.sibling}function Bp(t,e,n,s){var o=e.flags;switch(e.tag){case 0:case 11:case 15:sn(t,e,n,s),o&2048&&ms(9,e);break;case 1:sn(t,e,n,s);break;case 3:sn(t,e,n,s),o&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ns(t)));break;case 12:if(o&2048){sn(t,e,n,s),t=e.stateNode;try{var c=e.memoizedProps,h=c.id,y=c.onPostCommit;typeof y=="function"&&y(h,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(x){Dt(e,e.return,x)}}else sn(t,e,n,s);break;case 31:sn(t,e,n,s);break;case 13:sn(t,e,n,s);break;case 23:break;case 22:c=e.stateNode,h=e.alternate,e.memoizedState!==null?c._visibility&2?sn(t,e,n,s):gs(t,e):c._visibility&2?sn(t,e,n,s):(c._visibility|=2,vi(t,e,n,s,(e.subtreeFlags&10256)!==0||!1)),o&2048&&Dc(h,e);break;case 24:sn(t,e,n,s),o&2048&&Bc(e.alternate,e);break;default:sn(t,e,n,s)}}function vi(t,e,n,s,o){for(o=o&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var c=t,h=e,y=n,x=s,M=h.flags;switch(h.tag){case 0:case 11:case 15:vi(c,h,y,x,o),ms(8,h);break;case 23:break;case 22:var N=h.stateNode;h.memoizedState!==null?N._visibility&2?vi(c,h,y,x,o):gs(c,h):(N._visibility|=2,vi(c,h,y,x,o)),o&&M&2048&&Dc(h.alternate,h);break;case 24:vi(c,h,y,x,o),o&&M&2048&&Bc(h.alternate,h);break;default:vi(c,h,y,x,o)}e=e.sibling}}function gs(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,s=e,o=s.flags;switch(s.tag){case 22:gs(n,s),o&2048&&Dc(s.alternate,s);break;case 24:gs(n,s),o&2048&&Bc(s.alternate,s);break;default:gs(n,s)}e=e.sibling}}var ys=8192;function gi(t,e,n){if(t.subtreeFlags&ys)for(t=t.child;t!==null;)Np(t,e,n),t=t.sibling}function Np(t,e,n){switch(t.tag){case 26:gi(t,e,n),t.flags&ys&&t.memoizedState!==null&&I1(n,an,t.memoizedState,t.memoizedProps);break;case 5:gi(t,e,n);break;case 3:case 4:var s=an;an=lo(t.stateNode.containerInfo),gi(t,e,n),an=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=ys,ys=16777216,gi(t,e,n),ys=s):gi(t,e,n));break;default:gi(t,e,n)}}function Rp(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function bs(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];se=s,Lp(s,t)}Rp(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)zp(t),t=t.sibling}function zp(t){switch(t.tag){case 0:case 11:case 15:bs(t),t.flags&2048&&Pn(9,t,t.return);break;case 3:bs(t);break;case 12:bs(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Xl(t)):bs(t);break;default:bs(t)}}function Xl(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];se=s,Lp(s,t)}Rp(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Pn(8,e,e.return),Xl(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Xl(e));break;default:Xl(e)}t=t.sibling}}function Lp(t,e){for(;se!==null;){var n=se;switch(n.tag){case 0:case 11:case 15:Pn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var s=n.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:ns(n.memoizedState.cache)}if(s=n.child,s!==null)s.return=n,se=s;else t:for(n=t;se!==null;){s=se;var o=s.sibling,c=s.return;if(Tp(s),s===n){se=null;break t}if(o!==null){o.return=c,se=o;break t}se=c}}}var f1={getCacheForType:function(t){var e=ce(Zt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return ce(Zt).controller.signal}},h1=typeof WeakMap=="function"?WeakMap:Map,Tt=0,Lt=null,pt=null,gt=0,Et=0,Oe=null,Kn=!1,yi=!1,Nc=!1,En=0,Yt=0,Zn=0,La=0,Rc=0,Ve=0,bi=0,xs=null,Ce=null,zc=!1,Pl=0,Up=0,Kl=1/0,Zl=null,In=null,ae=0,Wn=null,xi=null,Dn=0,Lc=0,Uc=null,Op=null,Ss=0,Oc=null;function He(){return(Tt&2)!==0&&gt!==0?gt&-gt:R.T!==null?Gc():Id()}function Vp(){if(Ve===0)if((gt&536870912)===0||bt){var t=il;il<<=1,(il&3932160)===0&&(il=262144),Ve=t}else Ve=536870912;return t=Le.current,t!==null&&(t.flags|=32),Ve}function Me(t,e,n){(t===Lt&&(Et===2||Et===9)||t.cancelPendingCommit!==null)&&(Si(t,0),$n(t,gt,Ve,!1)),Gi(t,n),((Tt&2)===0||t!==Lt)&&(t===Lt&&((Tt&2)===0&&(La|=n),Yt===4&&$n(t,gt,Ve,!1)),un(t))}function Hp(t,e,n){if((Tt&6)!==0)throw Error(r(327));var s=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Fi(t,e),o=s?v1(t,e):Hc(t,e,!0),c=s;do{if(o===0){yi&&!s&&$n(t,e,0,!1);break}else{if(n=t.current.alternate,c&&!p1(n)){o=Hc(t,e,!1),c=!1;continue}if(o===2){if(c=e,t.errorRecoveryDisabledLanes&c)var h=0;else h=t.pendingLanes&-536870913,h=h!==0?h:h&536870912?536870912:0;if(h!==0){e=h;t:{var y=t;o=xs;var x=y.current.memoizedState.isDehydrated;if(x&&(Si(y,h).flags|=256),h=Hc(y,h,!1),h!==2){if(Nc&&!x){y.errorRecoveryDisabledLanes|=c,La|=c,o=4;break t}c=Ce,Ce=o,c!==null&&(Ce===null?Ce=c:Ce.push.apply(Ce,c))}o=h}if(c=!1,o!==2)continue}}if(o===1){Si(t,0),$n(t,e,0,!0);break}t:{switch(s=t,c=o,c){case 0:case 1:throw Error(r(345));case 4:if((e&4194048)!==e)break;case 6:$n(s,e,Ve,!Kn);break t;case 2:Ce=null;break;case 3:case 5:break;default:throw Error(r(329))}if((e&62914560)===e&&(o=Pl+300-De(),10<o)){if($n(s,e,Ve,!Kn),ll(s,0,!0)!==0)break t;Dn=e,s.timeoutHandle=mm(qp.bind(null,s,n,Ce,Zl,zc,e,Ve,La,bi,Kn,c,"Throttled",-0,0),o);break t}qp(s,n,Ce,Zl,zc,e,Ve,La,bi,Kn,c,null,-0,0)}}break}while(!0);un(t)}function qp(t,e,n,s,o,c,h,y,x,M,N,U,E,B){if(t.timeoutHandle=-1,U=e.subtreeFlags,U&8192||(U&16785408)===16785408){U={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:pn},Np(e,c,U);var P=(c&62914560)===c?Pl-De():(c&4194048)===c?Up-De():0;if(P=W1(U,P),P!==null){Dn=c,t.cancelPendingCommit=P(Xp.bind(null,t,e,c,n,s,o,h,y,x,N,U,null,E,B)),$n(t,c,h,!M);return}}Xp(t,e,c,n,s,o,h,y,x)}function p1(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var s=0;s<n.length;s++){var o=n[s],c=o.getSnapshot;o=o.value;try{if(!Re(c(),o))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $n(t,e,n,s){e&=~Rc,e&=~La,t.suspendedLanes|=e,t.pingedLanes&=~e,s&&(t.warmLanes|=e),s=t.expirationTimes;for(var o=e;0<o;){var c=31-Ne(o),h=1<<c;s[c]=-1,o&=~h}n!==0&&Pd(t,n,e)}function Il(){return(Tt&6)===0?(As(0),!1):!0}function Vc(){if(pt!==null){if(Et===0)var t=pt.return;else t=pt,yn=ka=null,$r(t),di=null,is=0,t=pt;for(;t!==null;)vp(t.alternate,t),t=t.return;pt=null}}function Si(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,L1(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Dn=0,Vc(),Lt=t,pt=n=vn(t.current,null),gt=e,Et=0,Oe=null,Kn=!1,yi=Fi(t,e),Nc=!1,bi=Ve=Rc=La=Zn=Yt=0,Ce=xs=null,zc=!1,(e&8)!==0&&(e|=e&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=e;0<s;){var o=31-Ne(s),c=1<<o;e|=t[o],s&=~c}return En=e,yl(),n}function jp(t,e){rt=null,R.H=fs,e===ui||e===Cl?(e=nh(),Et=3):e===Fr?(e=nh(),Et=4):Et=e===mc?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Oe=e,pt===null&&(Yt=1,jl(t,Ye(e,t.current)))}function Fp(){var t=Le.current;return t===null?!0:(gt&4194048)===gt?Xe===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Xe:!1}function Gp(){var t=R.H;return R.H=fs,t===null?fs:t}function Yp(){var t=R.A;return R.A=f1,t}function Wl(){Yt=4,Kn||(gt&4194048)!==gt&&Le.current!==null||(yi=!0),(Zn&134217727)===0&&(La&134217727)===0||Lt===null||$n(Lt,gt,Ve,!1)}function Hc(t,e,n){var s=Tt;Tt|=2;var o=Gp(),c=Yp();(Lt!==t||gt!==e)&&(Zl=null,Si(t,e)),e=!1;var h=Yt;t:do try{if(Et!==0&&pt!==null){var y=pt,x=Oe;switch(Et){case 8:Vc(),h=6;break t;case 3:case 2:case 9:case 6:Le.current===null&&(e=!0);var M=Et;if(Et=0,Oe=null,Ai(t,y,x,M),n&&yi){h=0;break t}break;default:M=Et,Et=0,Oe=null,Ai(t,y,x,M)}}m1(),h=Yt;break}catch(N){jp(t,N)}while(!0);return e&&t.shellSuspendCounter++,yn=ka=null,Tt=s,R.H=o,R.A=c,pt===null&&(Lt=null,gt=0,yl()),h}function m1(){for(;pt!==null;)_p(pt)}function v1(t,e){var n=Tt;Tt|=2;var s=Gp(),o=Yp();Lt!==t||gt!==e?(Zl=null,Kl=De()+500,Si(t,e)):yi=Fi(t,e);t:do try{if(Et!==0&&pt!==null){e=pt;var c=Oe;e:switch(Et){case 1:Et=0,Oe=null,Ai(t,e,c,1);break;case 2:case 9:if(th(c)){Et=0,Oe=null,Qp(e);break}e=function(){Et!==2&&Et!==9||Lt!==t||(Et=7),un(t)},c.then(e,e);break t;case 3:Et=7;break t;case 4:Et=5;break t;case 7:th(c)?(Et=0,Oe=null,Qp(e)):(Et=0,Oe=null,Ai(t,e,c,7));break;case 5:var h=null;switch(pt.tag){case 26:h=pt.memoizedState;case 5:case 27:var y=pt;if(h?Bm(h):y.stateNode.complete){Et=0,Oe=null;var x=y.sibling;if(x!==null)pt=x;else{var M=y.return;M!==null?(pt=M,$l(M)):pt=null}break e}}Et=0,Oe=null,Ai(t,e,c,5);break;case 6:Et=0,Oe=null,Ai(t,e,c,6);break;case 8:Vc(),Yt=6;break t;default:throw Error(r(462))}}g1();break}catch(N){jp(t,N)}while(!0);return yn=ka=null,R.H=s,R.A=o,Tt=n,pt!==null?0:(Lt=null,gt=0,yl(),Yt)}function g1(){for(;pt!==null&&!jy();)_p(pt)}function _p(t){var e=pp(t.alternate,t,En);t.memoizedProps=t.pendingProps,e===null?$l(t):pt=e}function Qp(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=rp(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=rp(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:$r(e);default:vp(n,e),e=pt=Yf(e,En),e=pp(n,e,En)}t.memoizedProps=t.pendingProps,e===null?$l(t):pt=e}function Ai(t,e,n,s){yn=ka=null,$r(e),di=null,is=0;var o=e.return;try{if(s1(t,o,e,n,gt)){Yt=1,jl(t,Ye(n,t.current)),pt=null;return}}catch(c){if(o!==null)throw pt=o,c;Yt=1,jl(t,Ye(n,t.current)),pt=null;return}e.flags&32768?(bt||s===1?t=!0:yi||(gt&536870912)!==0?t=!1:(Kn=t=!0,(s===2||s===9||s===3||s===6)&&(s=Le.current,s!==null&&s.tag===13&&(s.flags|=16384))),Jp(e,t)):$l(e)}function $l(t){var e=t;do{if((e.flags&32768)!==0){Jp(e,Kn);return}t=e.return;var n=r1(e.alternate,e,En);if(n!==null){pt=n;return}if(e=e.sibling,e!==null){pt=e;return}pt=e=t}while(e!==null);Yt===0&&(Yt=5)}function Jp(t,e){do{var n=c1(t.alternate,t);if(n!==null){n.flags&=32767,pt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){pt=t;return}pt=t=n}while(t!==null);Yt=6,pt=null}function Xp(t,e,n,s,o,c,h,y,x){t.cancelPendingCommit=null;do to();while(ae!==0);if((Tt&6)!==0)throw Error(r(327));if(e!==null){if(e===t.current)throw Error(r(177));if(c=e.lanes|e.childLanes,c|=Cr,Zy(t,n,c,h,y,x),t===Lt&&(pt=Lt=null,gt=0),xi=e,Wn=t,Dn=n,Lc=c,Uc=o,Op=s,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,S1(nl,function(){return Wp(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||s){s=R.T,R.T=null,o=j.p,j.p=2,h=Tt,Tt|=4;try{u1(t,e,n)}finally{Tt=h,j.p=o,R.T=s}}ae=1,Pp(),Kp(),Zp()}}function Pp(){if(ae===1){ae=0;var t=Wn,e=xi,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=R.T,R.T=null;var s=j.p;j.p=2;var o=Tt;Tt|=4;try{Ep(e,t);var c=Zc,h=Lf(t.containerInfo),y=c.focusedElem,x=c.selectionRange;if(h!==y&&y&&y.ownerDocument&&zf(y.ownerDocument.documentElement,y)){if(x!==null&&Sr(y)){var M=x.start,N=x.end;if(N===void 0&&(N=M),"selectionStart"in y)y.selectionStart=M,y.selectionEnd=Math.min(N,y.value.length);else{var U=y.ownerDocument||document,E=U&&U.defaultView||window;if(E.getSelection){var B=E.getSelection(),P=y.textContent.length,nt=Math.min(x.start,P),zt=x.end===void 0?nt:Math.min(x.end,P);!B.extend&&nt>zt&&(h=zt,zt=nt,nt=h);var T=Rf(y,nt),A=Rf(y,zt);if(T&&A&&(B.rangeCount!==1||B.anchorNode!==T.node||B.anchorOffset!==T.offset||B.focusNode!==A.node||B.focusOffset!==A.offset)){var C=U.createRange();C.setStart(T.node,T.offset),B.removeAllRanges(),nt>zt?(B.addRange(C),B.extend(A.node,A.offset)):(C.setEnd(A.node,A.offset),B.addRange(C))}}}}for(U=[],B=y;B=B.parentNode;)B.nodeType===1&&U.push({element:B,left:B.scrollLeft,top:B.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<U.length;y++){var z=U[y];z.element.scrollLeft=z.left,z.element.scrollTop=z.top}}ho=!!Kc,Zc=Kc=null}finally{Tt=o,j.p=s,R.T=n}}t.current=e,ae=2}}function Kp(){if(ae===2){ae=0;var t=Wn,e=xi,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=R.T,R.T=null;var s=j.p;j.p=2;var o=Tt;Tt|=4;try{wp(t,e.alternate,e)}finally{Tt=o,j.p=s,R.T=n}}ae=3}}function Zp(){if(ae===4||ae===3){ae=0,Fy();var t=Wn,e=xi,n=Dn,s=Op;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?ae=5:(ae=0,xi=Wn=null,Ip(t,t.pendingLanes));var o=t.pendingLanes;if(o===0&&(In=null),nr(n),e=e.stateNode,Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(ji,e,void 0,(e.current.flags&128)===128)}catch{}if(s!==null){e=R.T,o=j.p,j.p=2,R.T=null;try{for(var c=t.onRecoverableError,h=0;h<s.length;h++){var y=s[h];c(y.value,{componentStack:y.stack})}}finally{R.T=e,j.p=o}}(Dn&3)!==0&&to(),un(t),o=t.pendingLanes,(n&261930)!==0&&(o&42)!==0?t===Oc?Ss++:(Ss=0,Oc=t):Ss=0,As(0)}}function Ip(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,ns(e)))}function to(){return Pp(),Kp(),Zp(),Wp()}function Wp(){if(ae!==5)return!1;var t=Wn,e=Lc;Lc=0;var n=nr(Dn),s=R.T,o=j.p;try{j.p=32>n?32:n,R.T=null,n=Uc,Uc=null;var c=Wn,h=Dn;if(ae=0,xi=Wn=null,Dn=0,(Tt&6)!==0)throw Error(r(331));var y=Tt;if(Tt|=4,zp(c.current),Bp(c,c.current,h,n),Tt=y,As(0,!1),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(ji,c)}catch{}return!0}finally{j.p=o,R.T=s,Ip(t,e)}}function $p(t,e,n){e=Ye(n,e),e=pc(t.stateNode,e,2),t=Qn(t,e,2),t!==null&&(Gi(t,2),un(t))}function Dt(t,e,n){if(t.tag===3)$p(t,t,n);else for(;e!==null;){if(e.tag===3){$p(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(In===null||!In.has(s))){t=Ye(n,t),n=tp(2),s=Qn(e,n,2),s!==null&&(ep(n,s,e,t),Gi(s,2),un(s));break}}e=e.return}}function qc(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new h1;var o=new Set;s.set(e,o)}else o=s.get(e),o===void 0&&(o=new Set,s.set(e,o));o.has(n)||(Nc=!0,o.add(n),t=y1.bind(null,t,e,n),e.then(t,t))}function y1(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Lt===t&&(gt&n)===n&&(Yt===4||Yt===3&&(gt&62914560)===gt&&300>De()-Pl?(Tt&2)===0&&Si(t,0):Rc|=n,bi===gt&&(bi=0)),un(t)}function tm(t,e){e===0&&(e=Xd()),t=Aa(t,e),t!==null&&(Gi(t,e),un(t))}function b1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),tm(t,n)}function x1(t,e){var n=0;switch(t.tag){case 31:case 13:var s=t.stateNode,o=t.memoizedState;o!==null&&(n=o.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(e),tm(t,n)}function S1(t,e){return Wo(t,e)}var eo=null,wi=null,jc=!1,no=!1,Fc=!1,ta=0;function un(t){t!==wi&&t.next===null&&(wi===null?eo=wi=t:wi=wi.next=t),no=!0,jc||(jc=!0,w1())}function As(t,e){if(!Fc&&no){Fc=!0;do for(var n=!1,s=eo;s!==null;){if(t!==0){var o=s.pendingLanes;if(o===0)var c=0;else{var h=s.suspendedLanes,y=s.pingedLanes;c=(1<<31-Ne(42|t)+1)-1,c&=o&~(h&~y),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(n=!0,im(s,c))}else c=gt,c=ll(s,s===Lt?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||Fi(s,c)||(n=!0,im(s,c));s=s.next}while(n);Fc=!1}}function A1(){em()}function em(){no=jc=!1;var t=0;ta!==0&&z1()&&(t=ta);for(var e=De(),n=null,s=eo;s!==null;){var o=s.next,c=nm(s,e);c===0?(s.next=null,n===null?eo=o:n.next=o,o===null&&(wi=n)):(n=s,(t!==0||(c&3)!==0)&&(no=!0)),s=o}ae!==0&&ae!==5||As(t),ta!==0&&(ta=0)}function nm(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,o=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var h=31-Ne(c),y=1<<h,x=o[h];x===-1?((y&n)===0||(y&s)!==0)&&(o[h]=Ky(y,e)):x<=e&&(t.expiredLanes|=y),c&=~y}if(e=Lt,n=gt,n=ll(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,n===0||t===e&&(Et===2||Et===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&$o(s),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||Fi(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(s!==null&&$o(s),nr(n)){case 2:case 8:n=Qd;break;case 32:n=nl;break;case 268435456:n=Jd;break;default:n=nl}return s=am.bind(null,t),n=Wo(n,s),t.callbackPriority=e,t.callbackNode=n,e}return s!==null&&s!==null&&$o(s),t.callbackPriority=2,t.callbackNode=null,2}function am(t,e){if(ae!==0&&ae!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(to()&&t.callbackNode!==n)return null;var s=gt;return s=ll(t,t===Lt?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(Hp(t,s,e),nm(t,De()),t.callbackNode!=null&&t.callbackNode===n?am.bind(null,t):null)}function im(t,e){if(to())return null;Hp(t,e,!0)}function w1(){U1(function(){(Tt&6)!==0?Wo(_d,A1):em()})}function Gc(){if(ta===0){var t=ri;t===0&&(t=al,al<<=1,(al&261888)===0&&(al=256)),ta=t}return ta}function sm(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:ul(""+t)}function lm(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function T1(t,e,n,s,o){if(e==="submit"&&n&&n.stateNode===o){var c=sm((o[Se]||null).action),h=s.submitter;h&&(e=(e=h[Se]||null)?sm(e.formAction):h.getAttribute("formAction"),e!==null&&(c=e,h=null));var y=new pl("action","action",null,s,o);t.push({event:y,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(ta!==0){var x=h?lm(o,h):new FormData(o);rc(n,{pending:!0,data:x,method:o.method,action:c},null,x)}}else typeof c=="function"&&(y.preventDefault(),x=h?lm(o,h):new FormData(o),rc(n,{pending:!0,data:x,method:o.method,action:c},c,x))},currentTarget:o}]})}}for(var Yc=0;Yc<kr.length;Yc++){var _c=kr[Yc],k1=_c.toLowerCase(),C1=_c[0].toUpperCase()+_c.slice(1);nn(k1,"on"+C1)}nn(Vf,"onAnimationEnd"),nn(Hf,"onAnimationIteration"),nn(qf,"onAnimationStart"),nn("dblclick","onDoubleClick"),nn("focusin","onFocus"),nn("focusout","onBlur"),nn(Gb,"onTransitionRun"),nn(Yb,"onTransitionStart"),nn(_b,"onTransitionCancel"),nn(jf,"onTransitionEnd"),Pa("onMouseEnter",["mouseout","mouseover"]),Pa("onMouseLeave",["mouseout","mouseover"]),Pa("onPointerEnter",["pointerout","pointerover"]),Pa("onPointerLeave",["pointerout","pointerover"]),ya("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ya("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ya("onBeforeInput",["compositionend","keypress","textInput","paste"]),ya("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ya("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ya("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ws="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),M1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ws));function om(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],o=s.event;s=s.listeners;t:{var c=void 0;if(e)for(var h=s.length-1;0<=h;h--){var y=s[h],x=y.instance,M=y.currentTarget;if(y=y.listener,x!==c&&o.isPropagationStopped())break t;c=y,o.currentTarget=M;try{c(o)}catch(N){gl(N)}o.currentTarget=null,c=x}else for(h=0;h<s.length;h++){if(y=s[h],x=y.instance,M=y.currentTarget,y=y.listener,x!==c&&o.isPropagationStopped())break t;c=y,o.currentTarget=M;try{c(o)}catch(N){gl(N)}o.currentTarget=null,c=x}}}}function mt(t,e){var n=e[ar];n===void 0&&(n=e[ar]=new Set);var s=t+"__bubble";n.has(s)||(rm(e,t,2,!1),n.add(s))}function Qc(t,e,n){var s=0;e&&(s|=4),rm(n,t,s,e)}var ao="_reactListening"+Math.random().toString(36).slice(2);function Jc(t){if(!t[ao]){t[ao]=!0,tf.forEach(function(n){n!=="selectionchange"&&(M1.has(n)||Qc(n,!1,t),Qc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ao]||(e[ao]=!0,Qc("selectionchange",!1,e))}}function rm(t,e,n,s){switch(Vm(e)){case 2:var o=e2;break;case 8:o=n2;break;default:o=ou}n=o.bind(null,e,n,t),o=void 0,!fr||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(o=!0),s?o!==void 0?t.addEventListener(e,n,{capture:!0,passive:o}):t.addEventListener(e,n,!0):o!==void 0?t.addEventListener(e,n,{passive:o}):t.addEventListener(e,n,!1)}function Xc(t,e,n,s,o){var c=s;if((e&1)===0&&(e&2)===0&&s!==null)t:for(;;){if(s===null)return;var h=s.tag;if(h===3||h===4){var y=s.stateNode.containerInfo;if(y===o)break;if(h===4)for(h=s.return;h!==null;){var x=h.tag;if((x===3||x===4)&&h.stateNode.containerInfo===o)return;h=h.return}for(;y!==null;){if(h=Qa(y),h===null)return;if(x=h.tag,x===5||x===6||x===26||x===27){s=c=h;continue t}y=y.parentNode}}s=s.return}hf(function(){var M=c,N=ur(n),U=[];t:{var E=Ff.get(t);if(E!==void 0){var B=pl,P=t;switch(t){case"keypress":if(fl(n)===0)break t;case"keydown":case"keyup":B=xb;break;case"focusin":P="focus",B=vr;break;case"focusout":P="blur",B=vr;break;case"beforeblur":case"afterblur":B=vr;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=vf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=rb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=wb;break;case Vf:case Hf:case qf:B=db;break;case jf:B=kb;break;case"scroll":case"scrollend":B=lb;break;case"wheel":B=Mb;break;case"copy":case"cut":case"paste":B=hb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=yf;break;case"toggle":case"beforetoggle":B=Db}var nt=(e&4)!==0,zt=!nt&&(t==="scroll"||t==="scrollend"),T=nt?E!==null?E+"Capture":null:E;nt=[];for(var A=M,C;A!==null;){var z=A;if(C=z.stateNode,z=z.tag,z!==5&&z!==26&&z!==27||C===null||T===null||(z=Qi(A,T),z!=null&&nt.push(Ts(A,z,C))),zt)break;A=A.return}0<nt.length&&(E=new B(E,P,null,n,N),U.push({event:E,listeners:nt}))}}if((e&7)===0){t:{if(E=t==="mouseover"||t==="pointerover",B=t==="mouseout"||t==="pointerout",E&&n!==cr&&(P=n.relatedTarget||n.fromElement)&&(Qa(P)||P[_a]))break t;if((B||E)&&(E=N.window===N?N:(E=N.ownerDocument)?E.defaultView||E.parentWindow:window,B?(P=n.relatedTarget||n.toElement,B=M,P=P?Qa(P):null,P!==null&&(zt=f(P),nt=P.tag,P!==zt||nt!==5&&nt!==27&&nt!==6)&&(P=null)):(B=null,P=M),B!==P)){if(nt=vf,z="onMouseLeave",T="onMouseEnter",A="mouse",(t==="pointerout"||t==="pointerover")&&(nt=yf,z="onPointerLeave",T="onPointerEnter",A="pointer"),zt=B==null?E:_i(B),C=P==null?E:_i(P),E=new nt(z,A+"leave",B,n,N),E.target=zt,E.relatedTarget=C,z=null,Qa(N)===M&&(nt=new nt(T,A+"enter",P,n,N),nt.target=C,nt.relatedTarget=zt,z=nt),zt=z,B&&P)e:{for(nt=E1,T=B,A=P,C=0,z=T;z;z=nt(z))C++;z=0;for(var tt=A;tt;tt=nt(tt))z++;for(;0<C-z;)T=nt(T),C--;for(;0<z-C;)A=nt(A),z--;for(;C--;){if(T===A||A!==null&&T===A.alternate){nt=T;break e}T=nt(T),A=nt(A)}nt=null}else nt=null;B!==null&&cm(U,E,B,nt,!1),P!==null&&zt!==null&&cm(U,zt,P,nt,!0)}}t:{if(E=M?_i(M):window,B=E.nodeName&&E.nodeName.toLowerCase(),B==="select"||B==="input"&&E.type==="file")var St=Cf;else if(Tf(E))if(Mf)St=qb;else{St=Vb;var I=Ob}else B=E.nodeName,!B||B.toLowerCase()!=="input"||E.type!=="checkbox"&&E.type!=="radio"?M&&rr(M.elementType)&&(St=Cf):St=Hb;if(St&&(St=St(t,M))){kf(U,St,n,N);break t}I&&I(t,E,M),t==="focusout"&&M&&E.type==="number"&&M.memoizedProps.value!=null&&or(E,"number",E.value)}switch(I=M?_i(M):window,t){case"focusin":(Tf(I)||I.contentEditable==="true")&&(ti=I,Ar=M,$i=null);break;case"focusout":$i=Ar=ti=null;break;case"mousedown":wr=!0;break;case"contextmenu":case"mouseup":case"dragend":wr=!1,Uf(U,n,N);break;case"selectionchange":if(Fb)break;case"keydown":case"keyup":Uf(U,n,N)}var ut;if(yr)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else $a?Af(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(bf&&n.locale!=="ko"&&($a||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&$a&&(ut=pf()):(Hn=N,hr="value"in Hn?Hn.value:Hn.textContent,$a=!0)),I=io(M,yt),0<I.length&&(yt=new gf(yt,t,null,n,N),U.push({event:yt,listeners:I}),ut?yt.data=ut:(ut=wf(n),ut!==null&&(yt.data=ut)))),(ut=Nb?Rb(t,n):zb(t,n))&&(yt=io(M,"onBeforeInput"),0<yt.length&&(I=new gf("onBeforeInput","beforeinput",null,n,N),U.push({event:I,listeners:yt}),I.data=ut)),T1(U,t,M,n,N)}om(U,e)})}function Ts(t,e,n){return{instance:t,listener:e,currentTarget:n}}function io(t,e){for(var n=e+"Capture",s=[];t!==null;){var o=t,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=Qi(t,n),o!=null&&s.unshift(Ts(t,o,c)),o=Qi(t,e),o!=null&&s.push(Ts(t,o,c))),t.tag===3)return s;t=t.return}return[]}function E1(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function cm(t,e,n,s,o){for(var c=e._reactName,h=[];n!==null&&n!==s;){var y=n,x=y.alternate,M=y.stateNode;if(y=y.tag,x!==null&&x===s)break;y!==5&&y!==26&&y!==27||M===null||(x=M,o?(M=Qi(n,c),M!=null&&h.unshift(Ts(n,M,x))):o||(M=Qi(n,c),M!=null&&h.push(Ts(n,M,x)))),n=n.return}h.length!==0&&t.push({event:e,listeners:h})}var D1=/\r\n?/g,B1=/\u0000|\uFFFD/g;function um(t){return(typeof t=="string"?t:""+t).replace(D1,`
`).replace(B1,"")}function dm(t,e){return e=um(e),um(t)===e}function Rt(t,e,n,s,o,c){switch(n){case"children":typeof s=="string"?e==="body"||e==="textarea"&&s===""||Za(t,s):(typeof s=="number"||typeof s=="bigint")&&e!=="body"&&Za(t,""+s);break;case"className":rl(t,"class",s);break;case"tabIndex":rl(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":rl(t,n,s);break;case"style":df(t,s,c);break;case"data":if(e!=="object"){rl(t,"data",s);break}case"src":case"href":if(s===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=ul(""+s),t.setAttribute(n,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(n==="formAction"?(e!=="input"&&Rt(t,e,"name",o.name,o,null),Rt(t,e,"formEncType",o.formEncType,o,null),Rt(t,e,"formMethod",o.formMethod,o,null),Rt(t,e,"formTarget",o.formTarget,o,null)):(Rt(t,e,"encType",o.encType,o,null),Rt(t,e,"method",o.method,o,null),Rt(t,e,"target",o.target,o,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=ul(""+s),t.setAttribute(n,s);break;case"onClick":s!=null&&(t.onclick=pn);break;case"onScroll":s!=null&&mt("scroll",t);break;case"onScrollEnd":s!=null&&mt("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(n=s.__html,n!=null){if(o.children!=null)throw Error(r(60));t.innerHTML=n}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}n=ul(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""+s):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":s===!0?t.setAttribute(n,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,s):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(n,s):t.removeAttribute(n);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(n):t.setAttribute(n,s);break;case"popover":mt("beforetoggle",t),mt("toggle",t),ol(t,"popover",s);break;case"xlinkActuate":hn(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":hn(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":hn(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":hn(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":hn(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":hn(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":hn(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":hn(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":hn(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":ol(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=ib.get(n)||n,ol(t,n,s))}}function Pc(t,e,n,s,o,c){switch(n){case"style":df(t,s,c);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(n=s.__html,n!=null){if(o.children!=null)throw Error(r(60));t.innerHTML=n}}break;case"children":typeof s=="string"?Za(t,s):(typeof s=="number"||typeof s=="bigint")&&Za(t,""+s);break;case"onScroll":s!=null&&mt("scroll",t);break;case"onScrollEnd":s!=null&&mt("scrollend",t);break;case"onClick":s!=null&&(t.onclick=pn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ef.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(o=n.endsWith("Capture"),e=n.slice(2,o?n.length-7:void 0),c=t[Se]||null,c=c!=null?c[n]:null,typeof c=="function"&&t.removeEventListener(e,c,o),typeof s=="function")){typeof c!="function"&&c!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,s,o);break t}n in t?t[n]=s:s===!0?t.setAttribute(n,""):ol(t,n,s)}}}function de(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":mt("error",t),mt("load",t);var s=!1,o=!1,c;for(c in n)if(n.hasOwnProperty(c)){var h=n[c];if(h!=null)switch(c){case"src":s=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,e));default:Rt(t,e,c,h,n,null)}}o&&Rt(t,e,"srcSet",n.srcSet,n,null),s&&Rt(t,e,"src",n.src,n,null);return;case"input":mt("invalid",t);var y=c=h=o=null,x=null,M=null;for(s in n)if(n.hasOwnProperty(s)){var N=n[s];if(N!=null)switch(s){case"name":o=N;break;case"type":h=N;break;case"checked":x=N;break;case"defaultChecked":M=N;break;case"value":c=N;break;case"defaultValue":y=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(r(137,e));break;default:Rt(t,e,s,N,n,null)}}of(t,c,y,x,M,h,o,!1);return;case"select":mt("invalid",t),s=h=c=null;for(o in n)if(n.hasOwnProperty(o)&&(y=n[o],y!=null))switch(o){case"value":c=y;break;case"defaultValue":h=y;break;case"multiple":s=y;default:Rt(t,e,o,y,n,null)}e=c,n=h,t.multiple=!!s,e!=null?Ka(t,!!s,e,!1):n!=null&&Ka(t,!!s,n,!0);return;case"textarea":mt("invalid",t),c=o=s=null;for(h in n)if(n.hasOwnProperty(h)&&(y=n[h],y!=null))switch(h){case"value":s=y;break;case"defaultValue":o=y;break;case"children":c=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(r(91));break;default:Rt(t,e,h,y,n,null)}cf(t,s,o,c);return;case"option":for(x in n)if(n.hasOwnProperty(x)&&(s=n[x],s!=null))switch(x){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Rt(t,e,x,s,n,null)}return;case"dialog":mt("beforetoggle",t),mt("toggle",t),mt("cancel",t),mt("close",t);break;case"iframe":case"object":mt("load",t);break;case"video":case"audio":for(s=0;s<ws.length;s++)mt(ws[s],t);break;case"image":mt("error",t),mt("load",t);break;case"details":mt("toggle",t);break;case"embed":case"source":case"link":mt("error",t),mt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(M in n)if(n.hasOwnProperty(M)&&(s=n[M],s!=null))switch(M){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,e));default:Rt(t,e,M,s,n,null)}return;default:if(rr(e)){for(N in n)n.hasOwnProperty(N)&&(s=n[N],s!==void 0&&Pc(t,e,N,s,n,void 0));return}}for(y in n)n.hasOwnProperty(y)&&(s=n[y],s!=null&&Rt(t,e,y,s,n,null))}function N1(t,e,n,s){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,h=null,y=null,x=null,M=null,N=null;for(B in n){var U=n[B];if(n.hasOwnProperty(B)&&U!=null)switch(B){case"checked":break;case"value":break;case"defaultValue":x=U;default:s.hasOwnProperty(B)||Rt(t,e,B,null,s,U)}}for(var E in s){var B=s[E];if(U=n[E],s.hasOwnProperty(E)&&(B!=null||U!=null))switch(E){case"type":c=B;break;case"name":o=B;break;case"checked":M=B;break;case"defaultChecked":N=B;break;case"value":h=B;break;case"defaultValue":y=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(r(137,e));break;default:B!==U&&Rt(t,e,E,B,s,U)}}lr(t,h,y,x,M,N,c,o);return;case"select":B=h=y=E=null;for(c in n)if(x=n[c],n.hasOwnProperty(c)&&x!=null)switch(c){case"value":break;case"multiple":B=x;default:s.hasOwnProperty(c)||Rt(t,e,c,null,s,x)}for(o in s)if(c=s[o],x=n[o],s.hasOwnProperty(o)&&(c!=null||x!=null))switch(o){case"value":E=c;break;case"defaultValue":y=c;break;case"multiple":h=c;default:c!==x&&Rt(t,e,o,c,s,x)}e=y,n=h,s=B,E!=null?Ka(t,!!n,E,!1):!!s!=!!n&&(e!=null?Ka(t,!!n,e,!0):Ka(t,!!n,n?[]:"",!1));return;case"textarea":B=E=null;for(y in n)if(o=n[y],n.hasOwnProperty(y)&&o!=null&&!s.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:Rt(t,e,y,null,s,o)}for(h in s)if(o=s[h],c=n[h],s.hasOwnProperty(h)&&(o!=null||c!=null))switch(h){case"value":E=o;break;case"defaultValue":B=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(r(91));break;default:o!==c&&Rt(t,e,h,o,s,c)}rf(t,E,B);return;case"option":for(var P in n)if(E=n[P],n.hasOwnProperty(P)&&E!=null&&!s.hasOwnProperty(P))switch(P){case"selected":t.selected=!1;break;default:Rt(t,e,P,null,s,E)}for(x in s)if(E=s[x],B=n[x],s.hasOwnProperty(x)&&E!==B&&(E!=null||B!=null))switch(x){case"selected":t.selected=E&&typeof E!="function"&&typeof E!="symbol";break;default:Rt(t,e,x,E,s,B)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var nt in n)E=n[nt],n.hasOwnProperty(nt)&&E!=null&&!s.hasOwnProperty(nt)&&Rt(t,e,nt,null,s,E);for(M in s)if(E=s[M],B=n[M],s.hasOwnProperty(M)&&E!==B&&(E!=null||B!=null))switch(M){case"children":case"dangerouslySetInnerHTML":if(E!=null)throw Error(r(137,e));break;default:Rt(t,e,M,E,s,B)}return;default:if(rr(e)){for(var zt in n)E=n[zt],n.hasOwnProperty(zt)&&E!==void 0&&!s.hasOwnProperty(zt)&&Pc(t,e,zt,void 0,s,E);for(N in s)E=s[N],B=n[N],!s.hasOwnProperty(N)||E===B||E===void 0&&B===void 0||Pc(t,e,N,E,s,B);return}}for(var T in n)E=n[T],n.hasOwnProperty(T)&&E!=null&&!s.hasOwnProperty(T)&&Rt(t,e,T,null,s,E);for(U in s)E=s[U],B=n[U],!s.hasOwnProperty(U)||E===B||E==null&&B==null||Rt(t,e,U,E,s,B)}function fm(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function R1(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),s=0;s<n.length;s++){var o=n[s],c=o.transferSize,h=o.initiatorType,y=o.duration;if(c&&y&&fm(h)){for(h=0,y=o.responseEnd,s+=1;s<n.length;s++){var x=n[s],M=x.startTime;if(M>y)break;var N=x.transferSize,U=x.initiatorType;N&&fm(U)&&(x=x.responseEnd,h+=N*(x<y?1:(y-M)/(x-M)))}if(--s,e+=8*(c+h)/(o.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Kc=null,Zc=null;function so(t){return t.nodeType===9?t:t.ownerDocument}function hm(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function pm(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Ic(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Wc=null;function z1(){var t=window.event;return t&&t.type==="popstate"?t===Wc?!1:(Wc=t,!0):(Wc=null,!1)}var mm=typeof setTimeout=="function"?setTimeout:void 0,L1=typeof clearTimeout=="function"?clearTimeout:void 0,vm=typeof Promise=="function"?Promise:void 0,U1=typeof queueMicrotask=="function"?queueMicrotask:typeof vm<"u"?function(t){return vm.resolve(null).then(t).catch(O1)}:mm;function O1(t){setTimeout(function(){throw t})}function ea(t){return t==="head"}function gm(t,e){var n=e,s=0;do{var o=n.nextSibling;if(t.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"||n==="/&"){if(s===0){t.removeChild(o),Mi(e);return}s--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")s++;else if(n==="html")ks(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,ks(n);for(var c=n.firstChild;c;){var h=c.nextSibling,y=c.nodeName;c[Yi]||y==="SCRIPT"||y==="STYLE"||y==="LINK"&&c.rel.toLowerCase()==="stylesheet"||n.removeChild(c),c=h}}else n==="body"&&ks(t.ownerDocument.body);n=o}while(n);Mi(e)}function ym(t,e){var n=t;t=0;do{var s=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=s}while(n)}function $c(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":$c(n),ir(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function V1(t,e,n,s){for(;t.nodeType===1;){var o=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[Yi])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==o.rel||t.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||t.getAttribute("title")!==(o.title==null?null:o.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(o.src==null?null:o.src)||t.getAttribute("type")!==(o.type==null?null:o.type)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=Pe(t.nextSibling),t===null)break}return null}function H1(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Pe(t.nextSibling),t===null))return null;return t}function bm(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Pe(t.nextSibling),t===null))return null;return t}function tu(t){return t.data==="$?"||t.data==="$~"}function eu(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function q1(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var s=function(){e(),n.removeEventListener("DOMContentLoaded",s)};n.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function Pe(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var nu=null;function xm(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Pe(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function Sm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Am(t,e,n){switch(e=so(n),t){case"html":if(t=e.documentElement,!t)throw Error(r(452));return t;case"head":if(t=e.head,!t)throw Error(r(453));return t;case"body":if(t=e.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function ks(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ir(t)}var Ke=new Map,wm=new Set;function lo(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Bn=j.d;j.d={f:j1,r:F1,D:G1,C:Y1,L:_1,m:Q1,X:X1,S:J1,M:P1};function j1(){var t=Bn.f(),e=Il();return t||e}function F1(t){var e=Ja(t);e!==null&&e.tag===5&&e.type==="form"?jh(e):Bn.r(t)}var Ti=typeof document>"u"?null:document;function Tm(t,e,n){var s=Ti;if(s&&typeof e=="string"&&e){var o=Fe(e);o='link[rel="'+t+'"][href="'+o+'"]',typeof n=="string"&&(o+='[crossorigin="'+n+'"]'),wm.has(o)||(wm.add(o),t={rel:t,crossOrigin:n,href:e},s.querySelector(o)===null&&(e=s.createElement("link"),de(e,"link",t),ie(e),s.head.appendChild(e)))}}function G1(t){Bn.D(t),Tm("dns-prefetch",t,null)}function Y1(t,e){Bn.C(t,e),Tm("preconnect",t,e)}function _1(t,e,n){Bn.L(t,e,n);var s=Ti;if(s&&t&&e){var o='link[rel="preload"][as="'+Fe(e)+'"]';e==="image"&&n&&n.imageSrcSet?(o+='[imagesrcset="'+Fe(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(o+='[imagesizes="'+Fe(n.imageSizes)+'"]')):o+='[href="'+Fe(t)+'"]';var c=o;switch(e){case"style":c=ki(t);break;case"script":c=Ci(t)}Ke.has(c)||(t=b({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ke.set(c,t),s.querySelector(o)!==null||e==="style"&&s.querySelector(Cs(c))||e==="script"&&s.querySelector(Ms(c))||(e=s.createElement("link"),de(e,"link",t),ie(e),s.head.appendChild(e)))}}function Q1(t,e){Bn.m(t,e);var n=Ti;if(n&&t){var s=e&&typeof e.as=="string"?e.as:"script",o='link[rel="modulepreload"][as="'+Fe(s)+'"][href="'+Fe(t)+'"]',c=o;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=Ci(t)}if(!Ke.has(c)&&(t=b({rel:"modulepreload",href:t},e),Ke.set(c,t),n.querySelector(o)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ms(c)))return}s=n.createElement("link"),de(s,"link",t),ie(s),n.head.appendChild(s)}}}function J1(t,e,n){Bn.S(t,e,n);var s=Ti;if(s&&t){var o=Xa(s).hoistableStyles,c=ki(t);e=e||"default";var h=o.get(c);if(!h){var y={loading:0,preload:null};if(h=s.querySelector(Cs(c)))y.loading=5;else{t=b({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ke.get(c))&&au(t,n);var x=h=s.createElement("link");ie(x),de(x,"link",t),x._p=new Promise(function(M,N){x.onload=M,x.onerror=N}),x.addEventListener("load",function(){y.loading|=1}),x.addEventListener("error",function(){y.loading|=2}),y.loading|=4,oo(h,e,s)}h={type:"stylesheet",instance:h,count:1,state:y},o.set(c,h)}}}function X1(t,e){Bn.X(t,e);var n=Ti;if(n&&t){var s=Xa(n).hoistableScripts,o=Ci(t),c=s.get(o);c||(c=n.querySelector(Ms(o)),c||(t=b({src:t,async:!0},e),(e=Ke.get(o))&&iu(t,e),c=n.createElement("script"),ie(c),de(c,"link",t),n.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(o,c))}}function P1(t,e){Bn.M(t,e);var n=Ti;if(n&&t){var s=Xa(n).hoistableScripts,o=Ci(t),c=s.get(o);c||(c=n.querySelector(Ms(o)),c||(t=b({src:t,async:!0,type:"module"},e),(e=Ke.get(o))&&iu(t,e),c=n.createElement("script"),ie(c),de(c,"link",t),n.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(o,c))}}function km(t,e,n,s){var o=(o=ht.current)?lo(o):null;if(!o)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=ki(n.href),n=Xa(o).hoistableStyles,s=n.get(e),s||(s={type:"style",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=ki(n.href);var c=Xa(o).hoistableStyles,h=c.get(t);if(h||(o=o.ownerDocument||o,h={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,h),(c=o.querySelector(Cs(t)))&&!c._p&&(h.instance=c,h.state.loading=5),Ke.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ke.set(t,n),c||K1(o,t,n,h.state))),e&&s===null)throw Error(r(528,""));return h}if(e&&s!==null)throw Error(r(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ci(n),n=Xa(o).hoistableScripts,s=n.get(e),s||(s={type:"script",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function ki(t){return'href="'+Fe(t)+'"'}function Cs(t){return'link[rel="stylesheet"]['+t+"]"}function Cm(t){return b({},t,{"data-precedence":t.precedence,precedence:null})}function K1(t,e,n,s){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?s.loading=1:(e=t.createElement("link"),s.preload=e,e.addEventListener("load",function(){return s.loading|=1}),e.addEventListener("error",function(){return s.loading|=2}),de(e,"link",n),ie(e),t.head.appendChild(e))}function Ci(t){return'[src="'+Fe(t)+'"]'}function Ms(t){return"script[async]"+t}function Mm(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var s=t.querySelector('style[data-href~="'+Fe(n.href)+'"]');if(s)return e.instance=s,ie(s),s;var o=b({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),ie(s),de(s,"style",o),oo(s,n.precedence,t),e.instance=s;case"stylesheet":o=ki(n.href);var c=t.querySelector(Cs(o));if(c)return e.state.loading|=4,e.instance=c,ie(c),c;s=Cm(n),(o=Ke.get(o))&&au(s,o),c=(t.ownerDocument||t).createElement("link"),ie(c);var h=c;return h._p=new Promise(function(y,x){h.onload=y,h.onerror=x}),de(c,"link",s),e.state.loading|=4,oo(c,n.precedence,t),e.instance=c;case"script":return c=Ci(n.src),(o=t.querySelector(Ms(c)))?(e.instance=o,ie(o),o):(s=n,(o=Ke.get(c))&&(s=b({},n),iu(s,o)),t=t.ownerDocument||t,o=t.createElement("script"),ie(o),de(o,"link",s),t.head.appendChild(o),e.instance=o);case"void":return null;default:throw Error(r(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(s=e.instance,e.state.loading|=4,oo(s,n.precedence,t));return e.instance}function oo(t,e,n){for(var s=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=s.length?s[s.length-1]:null,c=o,h=0;h<s.length;h++){var y=s[h];if(y.dataset.precedence===e)c=y;else if(c!==o)break}c?c.parentNode.insertBefore(t,c.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function au(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function iu(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var ro=null;function Em(t,e,n){if(ro===null){var s=new Map,o=ro=new Map;o.set(n,s)}else o=ro,s=o.get(n),s||(s=new Map,o.set(n,s));if(s.has(t))return s;for(s.set(t,null),n=n.getElementsByTagName(t),o=0;o<n.length;o++){var c=n[o];if(!(c[Yi]||c[oe]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var h=c.getAttribute(e)||"";h=t+h;var y=s.get(h);y?y.push(c):s.set(h,[c])}}return s}function Dm(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Z1(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Bm(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function I1(t,e,n,s){if(n.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var o=ki(s.href),c=e.querySelector(Cs(o));if(c){e=c._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=co.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=c,ie(c);return}c=e.ownerDocument||e,s=Cm(s),(o=Ke.get(o))&&au(s,o),c=c.createElement("link"),ie(c);var h=c;h._p=new Promise(function(y,x){h.onload=y,h.onerror=x}),de(c,"link",s),n.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=co.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var su=0;function W1(t,e){return t.stylesheets&&t.count===0&&fo(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var s=setTimeout(function(){if(t.stylesheets&&fo(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+e);0<t.imgBytes&&su===0&&(su=62500*R1());var o=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&fo(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>su?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(o)}}:null}function co(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)fo(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var uo=null;function fo(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,uo=new Map,e.forEach($1,t),uo=null,co.call(t))}function $1(t,e){if(!(e.state.loading&4)){var n=uo.get(t);if(n)var s=n.get(null);else{n=new Map,uo.set(t,n);for(var o=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var h=o[c];(h.nodeName==="LINK"||h.getAttribute("media")!=="not all")&&(n.set(h.dataset.precedence,h),s=h)}s&&n.set(null,s)}o=e.instance,h=o.getAttribute("data-precedence"),c=n.get(h)||s,c===s&&n.set(null,o),n.set(h,o),this.count++,s=co.bind(this),o.addEventListener("load",s),o.addEventListener("error",s),c?c.parentNode.insertBefore(o,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(o,t.firstChild)),e.state.loading|=4}}var Es={$$typeof:G,Provider:null,Consumer:null,_currentValue:X,_currentValue2:X,_threadCount:0};function t2(t,e,n,s,o,c,h,y,x){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tr(0),this.hiddenUpdates=tr(null),this.identifierPrefix=s,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=h,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=x,this.incompleteTransitions=new Map}function Nm(t,e,n,s,o,c,h,y,x,M,N,U){return t=new t2(t,e,n,h,x,M,N,U,y),e=1,c===!0&&(e|=24),c=ze(3,null,null,e),t.current=c,c.stateNode=t,e=Hr(),e.refCount++,t.pooledCache=e,e.refCount++,c.memoizedState={element:s,isDehydrated:n,cache:e},Gr(c),t}function Rm(t){return t?(t=ai,t):ai}function zm(t,e,n,s,o,c){o=Rm(o),s.context===null?s.context=o:s.pendingContext=o,s=_n(e),s.payload={element:n},c=c===void 0?null:c,c!==null&&(s.callback=c),n=Qn(t,s,e),n!==null&&(Me(n,t,e),ls(n,t,e))}function Lm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function lu(t,e){Lm(t,e),(t=t.alternate)&&Lm(t,e)}function Um(t){if(t.tag===13||t.tag===31){var e=Aa(t,67108864);e!==null&&Me(e,t,67108864),lu(t,67108864)}}function Om(t){if(t.tag===13||t.tag===31){var e=He();e=er(e);var n=Aa(t,e);n!==null&&Me(n,t,e),lu(t,e)}}var ho=!0;function e2(t,e,n,s){var o=R.T;R.T=null;var c=j.p;try{j.p=2,ou(t,e,n,s)}finally{j.p=c,R.T=o}}function n2(t,e,n,s){var o=R.T;R.T=null;var c=j.p;try{j.p=8,ou(t,e,n,s)}finally{j.p=c,R.T=o}}function ou(t,e,n,s){if(ho){var o=ru(s);if(o===null)Xc(t,e,s,po,n),Hm(t,s);else if(i2(o,t,e,n,s))s.stopPropagation();else if(Hm(t,s),e&4&&-1<a2.indexOf(t)){for(;o!==null;){var c=Ja(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var h=ga(c.pendingLanes);if(h!==0){var y=c;for(y.pendingLanes|=2,y.entangledLanes|=2;h;){var x=1<<31-Ne(h);y.entanglements[1]|=x,h&=~x}un(c),(Tt&6)===0&&(Kl=De()+500,As(0))}}break;case 31:case 13:y=Aa(c,2),y!==null&&Me(y,c,2),Il(),lu(c,2)}if(c=ru(s),c===null&&Xc(t,e,s,po,n),c===o)break;o=c}o!==null&&s.stopPropagation()}else Xc(t,e,s,null,n)}}function ru(t){return t=ur(t),cu(t)}var po=null;function cu(t){if(po=null,t=Qa(t),t!==null){var e=f(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=d(e),t!==null)return t;t=null}else if(n===31){if(t=v(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return po=t,null}function Vm(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Gy()){case _d:return 2;case Qd:return 8;case nl:case Yy:return 32;case Jd:return 268435456;default:return 32}default:return 32}}var uu=!1,na=null,aa=null,ia=null,Ds=new Map,Bs=new Map,sa=[],a2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Hm(t,e){switch(t){case"focusin":case"focusout":na=null;break;case"dragenter":case"dragleave":aa=null;break;case"mouseover":case"mouseout":ia=null;break;case"pointerover":case"pointerout":Ds.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bs.delete(e.pointerId)}}function Ns(t,e,n,s,o,c){return t===null||t.nativeEvent!==c?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:c,targetContainers:[o]},e!==null&&(e=Ja(e),e!==null&&Um(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,o!==null&&e.indexOf(o)===-1&&e.push(o),t)}function i2(t,e,n,s,o){switch(e){case"focusin":return na=Ns(na,t,e,n,s,o),!0;case"dragenter":return aa=Ns(aa,t,e,n,s,o),!0;case"mouseover":return ia=Ns(ia,t,e,n,s,o),!0;case"pointerover":var c=o.pointerId;return Ds.set(c,Ns(Ds.get(c)||null,t,e,n,s,o)),!0;case"gotpointercapture":return c=o.pointerId,Bs.set(c,Ns(Bs.get(c)||null,t,e,n,s,o)),!0}return!1}function qm(t){var e=Qa(t.target);if(e!==null){var n=f(e);if(n!==null){if(e=n.tag,e===13){if(e=d(n),e!==null){t.blockedOn=e,Wd(t.priority,function(){Om(n)});return}}else if(e===31){if(e=v(n),e!==null){t.blockedOn=e,Wd(t.priority,function(){Om(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function mo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ru(t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);cr=s,n.target.dispatchEvent(s),cr=null}else return e=Ja(n),e!==null&&Um(e),t.blockedOn=n,!1;e.shift()}return!0}function jm(t,e,n){mo(t)&&n.delete(e)}function s2(){uu=!1,na!==null&&mo(na)&&(na=null),aa!==null&&mo(aa)&&(aa=null),ia!==null&&mo(ia)&&(ia=null),Ds.forEach(jm),Bs.forEach(jm)}function vo(t,e){t.blockedOn===e&&(t.blockedOn=null,uu||(uu=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,s2)))}var go=null;function Fm(t){go!==t&&(go=t,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){go===t&&(go=null);for(var e=0;e<t.length;e+=3){var n=t[e],s=t[e+1],o=t[e+2];if(typeof s!="function"){if(cu(s||n)===null)continue;break}var c=Ja(n);c!==null&&(t.splice(e,3),e-=3,rc(c,{pending:!0,data:o,method:n.method,action:s},s,o))}}))}function Mi(t){function e(x){return vo(x,t)}na!==null&&vo(na,t),aa!==null&&vo(aa,t),ia!==null&&vo(ia,t),Ds.forEach(e),Bs.forEach(e);for(var n=0;n<sa.length;n++){var s=sa[n];s.blockedOn===t&&(s.blockedOn=null)}for(;0<sa.length&&(n=sa[0],n.blockedOn===null);)qm(n),n.blockedOn===null&&sa.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(s=0;s<n.length;s+=3){var o=n[s],c=n[s+1],h=o[Se]||null;if(typeof c=="function")h||Fm(n);else if(h){var y=null;if(c&&c.hasAttribute("formAction")){if(o=c,h=c[Se]||null)y=h.formAction;else if(cu(o)!==null)continue}else y=h.action;typeof y=="function"?n[s+1]=y:(n.splice(s,3),s-=3),Fm(n)}}}function Gm(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(h){return o=h})},focusReset:"manual",scroll:"manual"})}function e(){o!==null&&(o(),o=null),s||setTimeout(n,20)}function n(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,o=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),o!==null&&(o(),o=null)}}}function du(t){this._internalRoot=t}yo.prototype.render=du.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(r(409));var n=e.current,s=He();zm(n,s,t,e,null,null)},yo.prototype.unmount=du.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;zm(t.current,2,null,t,null,null),Il(),e[_a]=null}};function yo(t){this._internalRoot=t}yo.prototype.unstable_scheduleHydration=function(t){if(t){var e=Id();t={blockedOn:null,target:t,priority:e};for(var n=0;n<sa.length&&e!==0&&e<sa[n].priority;n++);sa.splice(n,0,t),n===0&&qm(t)}};var Ym=i.version;if(Ym!=="19.2.0")throw Error(r(527,Ym,"19.2.0"));j.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=m(e),t=t!==null?g(t):null,t=t===null?null:t.stateNode,t};var l2={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bo.isDisabled&&bo.supportsFiber)try{ji=bo.inject(l2),Be=bo}catch{}}return Rs.createRoot=function(t,e){if(!u(t))throw Error(r(299));var n=!1,s="",o=Zh,c=Ih,h=Wh;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(o=e.onUncaughtError),e.onCaughtError!==void 0&&(c=e.onCaughtError),e.onRecoverableError!==void 0&&(h=e.onRecoverableError)),e=Nm(t,1,!1,null,null,n,s,null,o,c,h,Gm),t[_a]=e.current,Jc(t),new du(e)},Rs.hydrateRoot=function(t,e,n){if(!u(t))throw Error(r(299));var s=!1,o="",c=Zh,h=Ih,y=Wh,x=null;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError),n.formState!==void 0&&(x=n.formState)),e=Nm(t,1,!0,e,n??null,s,o,x,c,h,y,Gm),e.context=Rm(null),n=e.current,s=He(),s=er(s),o=_n(s),o.callback=null,Qn(n,o,s),n=s,e.current.lanes=n,Gi(e,n),un(e),t[_a]=e.current,Jc(t),new yo(e)},Rs.version="19.2.0",Rs}var ev;function z2(){if(ev)return mu.exports;ev=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(i){console.error(i)}}return a(),mu.exports=R2(),mu.exports}var L2=z2(),bu={exports:{}},zs={};var nv;function U2(){if(nv)return zs;nv=1;var a=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function l(r,u,f){var d=null;if(f!==void 0&&(d=""+f),u.key!==void 0&&(d=""+u.key),"key"in u){f={};for(var v in u)v!=="key"&&(f[v]=u[v])}else f=u;return u=f.ref,{$$typeof:a,type:r,key:d,ref:u!==void 0?u:null,props:f}}return zs.Fragment=i,zs.jsx=l,zs.jsxs=l,zs}var av;function O2(){return av||(av=1,bu.exports=U2()),bu.exports}var Bt=O2();const Lg=ct.createContext({});function V2(a){const i=ct.useRef(null);return i.current===null&&(i.current=a()),i.current}const rd=typeof window<"u",H2=rd?ct.useLayoutEffect:ct.useEffect,cd=ct.createContext(null);function ud(a,i){a.indexOf(i)===-1&&a.push(i)}function dd(a,i){const l=a.indexOf(i);l>-1&&a.splice(l,1)}const Ln=(a,i,l)=>l>i?i:l<a?a:l;let fd=()=>{};const Un={},Ug=a=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a);function Og(a){return typeof a=="object"&&a!==null}const Vg=a=>/^0[^.\s]+$/u.test(a);function hd(a){let i;return()=>(i===void 0&&(i=a()),i)}const $e=a=>a,q2=(a,i)=>l=>i(a(l)),Is=(...a)=>a.reduce(q2),Qs=(a,i,l)=>{const r=i-a;return r===0?1:(l-a)/r};class pd{constructor(){this.subscriptions=[]}add(i){return ud(this.subscriptions,i),()=>dd(this.subscriptions,i)}notify(i,l,r){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](i,l,r);else for(let f=0;f<u;f++){const d=this.subscriptions[f];d&&d(i,l,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const dn=a=>a*1e3,We=a=>a/1e3;function Hg(a,i){return i?a*(1e3/i):0}const qg=(a,i,l)=>(((1-3*l+3*i)*a+(3*l-6*i))*a+3*i)*a,j2=1e-7,F2=12;function G2(a,i,l,r,u){let f,d,v=0;do d=i+(l-i)/2,f=qg(d,r,u)-a,f>0?l=d:i=d;while(Math.abs(f)>j2&&++v<F2);return d}function Ws(a,i,l,r){if(a===i&&l===r)return $e;const u=f=>G2(f,0,1,a,l);return f=>f===0||f===1?f:qg(u(f),i,r)}const jg=a=>i=>i<=.5?a(2*i)/2:(2-a(2*(1-i)))/2,Fg=a=>i=>1-a(1-i),Gg=Ws(.33,1.53,.69,.99),md=Fg(Gg),Yg=jg(md),_g=a=>(a*=2)<1?.5*md(a):.5*(2-Math.pow(2,-10*(a-1))),vd=a=>1-Math.sin(Math.acos(a)),Qg=Fg(vd),Jg=jg(vd),Y2=Ws(.42,0,1,1),_2=Ws(0,0,.58,1),Xg=Ws(.42,0,.58,1),Q2=a=>Array.isArray(a)&&typeof a[0]!="number",Pg=a=>Array.isArray(a)&&typeof a[0]=="number",J2={linear:$e,easeIn:Y2,easeInOut:Xg,easeOut:_2,circIn:vd,circInOut:Jg,circOut:Qg,backIn:md,backInOut:Yg,backOut:Gg,anticipate:_g},X2=a=>typeof a=="string",iv=a=>{if(Pg(a)){fd(a.length===4);const[i,l,r,u]=a;return Ws(i,l,r,u)}else if(X2(a))return J2[a];return a},xo=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function P2(a,i){let l=new Set,r=new Set,u=!1,f=!1;const d=new WeakSet;let v={delta:0,timestamp:0,isProcessing:!1};function p(g){d.has(g)&&(m.schedule(g),a()),g(v)}const m={schedule:(g,b=!1,S=!1)=>{const H=S&&u?l:r;return b&&d.add(g),H.has(g)||H.add(g),g},cancel:g=>{r.delete(g),d.delete(g)},process:g=>{if(v=g,u){f=!0;return}u=!0,[l,r]=[r,l],l.forEach(p),l.clear(),u=!1,f&&(f=!1,m.process(g))}};return m}const K2=40;function Kg(a,i){let l=!1,r=!0;const u={delta:0,timestamp:0,isProcessing:!1},f=()=>l=!0,d=xo.reduce((G,at)=>(G[at]=P2(f),G),{}),{setup:v,read:p,resolveKeyframes:m,preUpdate:g,update:b,preRender:S,render:L,postRender:H}=d,Q=()=>{const G=Un.useManualTiming?u.timestamp:performance.now();l=!1,Un.useManualTiming||(u.delta=r?1e3/60:Math.max(Math.min(G-u.timestamp,K2),1)),u.timestamp=G,u.isProcessing=!0,v.process(u),p.process(u),m.process(u),g.process(u),b.process(u),S.process(u),L.process(u),H.process(u),u.isProcessing=!1,l&&i&&(r=!1,a(Q))},J=()=>{l=!0,r=!0,u.isProcessing||a(Q)};return{schedule:xo.reduce((G,at)=>{const W=d[at];return G[at]=(lt,$=!1,et=!1)=>(l||J(),W.schedule(lt,$,et)),G},{}),cancel:G=>{for(let at=0;at<xo.length;at++)d[xo[at]].cancel(G)},state:u,steps:d}}const{schedule:qt,cancel:fa,state:fe,steps:xu}=Kg(typeof requestAnimationFrame<"u"?requestAnimationFrame:$e,!0);let Co;function Z2(){Co=void 0}const Ee={now:()=>(Co===void 0&&Ee.set(fe.isProcessing||Un.useManualTiming?fe.timestamp:performance.now()),Co),set:a=>{Co=a,queueMicrotask(Z2)}},Zg=a=>i=>typeof i=="string"&&i.startsWith(a),gd=Zg("--"),I2=Zg("var(--"),yd=a=>I2(a)?W2.test(a.split("/*")[0].trim()):!1,W2=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,Oi={test:a=>typeof a=="number",parse:parseFloat,transform:a=>a},Js={...Oi,transform:a=>Ln(0,1,a)},So={...Oi,default:1},Vs=a=>Math.round(a*1e5)/1e5,bd=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function $2(a){return a==null}const tx=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,xd=(a,i)=>l=>!!(typeof l=="string"&&tx.test(l)&&l.startsWith(a)||i&&!$2(l)&&Object.prototype.hasOwnProperty.call(l,i)),Ig=(a,i,l)=>r=>{if(typeof r!="string")return r;const[u,f,d,v]=r.match(bd);return{[a]:parseFloat(u),[i]:parseFloat(f),[l]:parseFloat(d),alpha:v!==void 0?parseFloat(v):1}},ex=a=>Ln(0,255,a),Su={...Oi,transform:a=>Math.round(ex(a))},qa={test:xd("rgb","red"),parse:Ig("red","green","blue"),transform:({red:a,green:i,blue:l,alpha:r=1})=>"rgba("+Su.transform(a)+", "+Su.transform(i)+", "+Su.transform(l)+", "+Vs(Js.transform(r))+")"};function nx(a){let i="",l="",r="",u="";return a.length>5?(i=a.substring(1,3),l=a.substring(3,5),r=a.substring(5,7),u=a.substring(7,9)):(i=a.substring(1,2),l=a.substring(2,3),r=a.substring(3,4),u=a.substring(4,5),i+=i,l+=l,r+=r,u+=u),{red:parseInt(i,16),green:parseInt(l,16),blue:parseInt(r,16),alpha:u?parseInt(u,16)/255:1}}const Vu={test:xd("#"),parse:nx,transform:qa.transform},$s=a=>({test:i=>typeof i=="string"&&i.endsWith(a)&&i.split(" ").length===1,parse:parseFloat,transform:i=>`${i}${a}`}),ra=$s("deg"),fn=$s("%"),it=$s("px"),ax=$s("vh"),ix=$s("vw"),sv={...fn,parse:a=>fn.parse(a)/100,transform:a=>fn.transform(a*100)},Ei={test:xd("hsl","hue"),parse:Ig("hue","saturation","lightness"),transform:({hue:a,saturation:i,lightness:l,alpha:r=1})=>"hsla("+Math.round(a)+", "+fn.transform(Vs(i))+", "+fn.transform(Vs(l))+", "+Vs(Js.transform(r))+")"},te={test:a=>qa.test(a)||Vu.test(a)||Ei.test(a),parse:a=>qa.test(a)?qa.parse(a):Ei.test(a)?Ei.parse(a):Vu.parse(a),transform:a=>typeof a=="string"?a:a.hasOwnProperty("red")?qa.transform(a):Ei.transform(a),getAnimatableNone:a=>{const i=te.parse(a);return i.alpha=0,te.transform(i)}},sx=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function lx(a){return isNaN(a)&&typeof a=="string"&&(a.match(bd)?.length||0)+(a.match(sx)?.length||0)>0}const Wg="number",$g="color",ox="var",rx="var(",lv="${}",cx=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Xs(a){const i=a.toString(),l=[],r={color:[],number:[],var:[]},u=[];let f=0;const v=i.replace(cx,p=>(te.test(p)?(r.color.push(f),u.push($g),l.push(te.parse(p))):p.startsWith(rx)?(r.var.push(f),u.push(ox),l.push(p)):(r.number.push(f),u.push(Wg),l.push(parseFloat(p))),++f,lv)).split(lv);return{values:l,split:v,indexes:r,types:u}}function t0(a){return Xs(a).values}function e0(a){const{split:i,types:l}=Xs(a),r=i.length;return u=>{let f="";for(let d=0;d<r;d++)if(f+=i[d],u[d]!==void 0){const v=l[d];v===Wg?f+=Vs(u[d]):v===$g?f+=te.transform(u[d]):f+=u[d]}return f}}const ux=a=>typeof a=="number"?0:te.test(a)?te.getAnimatableNone(a):a;function dx(a){const i=t0(a);return e0(a)(i.map(ux))}const ha={test:lx,parse:t0,createTransformer:e0,getAnimatableNone:dx};function Au(a,i,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?a+(i-a)*6*l:l<1/2?i:l<2/3?a+(i-a)*(2/3-l)*6:a}function fx({hue:a,saturation:i,lightness:l,alpha:r}){a/=360,i/=100,l/=100;let u=0,f=0,d=0;if(!i)u=f=d=l;else{const v=l<.5?l*(1+i):l+i-l*i,p=2*l-v;u=Au(p,v,a+1/3),f=Au(p,v,a),d=Au(p,v,a-1/3)}return{red:Math.round(u*255),green:Math.round(f*255),blue:Math.round(d*255),alpha:r}}function No(a,i){return l=>l>0?i:a}const Ft=(a,i,l)=>a+(i-a)*l,wu=(a,i,l)=>{const r=a*a,u=l*(i*i-r)+r;return u<0?0:Math.sqrt(u)},hx=[Vu,qa,Ei],px=a=>hx.find(i=>i.test(a));function ov(a){const i=px(a);if(!i)return!1;let l=i.parse(a);return i===Ei&&(l=fx(l)),l}const rv=(a,i)=>{const l=ov(a),r=ov(i);if(!l||!r)return No(a,i);const u={...l};return f=>(u.red=wu(l.red,r.red,f),u.green=wu(l.green,r.green,f),u.blue=wu(l.blue,r.blue,f),u.alpha=Ft(l.alpha,r.alpha,f),qa.transform(u))},Hu=new Set(["none","hidden"]);function mx(a,i){return Hu.has(a)?l=>l<=0?a:i:l=>l>=1?i:a}function vx(a,i){return l=>Ft(a,i,l)}function Sd(a){return typeof a=="number"?vx:typeof a=="string"?yd(a)?No:te.test(a)?rv:bx:Array.isArray(a)?n0:typeof a=="object"?te.test(a)?rv:gx:No}function n0(a,i){const l=[...a],r=l.length,u=a.map((f,d)=>Sd(f)(f,i[d]));return f=>{for(let d=0;d<r;d++)l[d]=u[d](f);return l}}function gx(a,i){const l={...a,...i},r={};for(const u in l)a[u]!==void 0&&i[u]!==void 0&&(r[u]=Sd(a[u])(a[u],i[u]));return u=>{for(const f in r)l[f]=r[f](u);return l}}function yx(a,i){const l=[],r={color:0,var:0,number:0};for(let u=0;u<i.values.length;u++){const f=i.types[u],d=a.indexes[f][r[f]],v=a.values[d]??0;l[u]=v,r[f]++}return l}const bx=(a,i)=>{const l=ha.createTransformer(i),r=Xs(a),u=Xs(i);return r.indexes.var.length===u.indexes.var.length&&r.indexes.color.length===u.indexes.color.length&&r.indexes.number.length>=u.indexes.number.length?Hu.has(a)&&!u.values.length||Hu.has(i)&&!r.values.length?mx(a,i):Is(n0(yx(r,u),u.values),l):No(a,i)};function a0(a,i,l){return typeof a=="number"&&typeof i=="number"&&typeof l=="number"?Ft(a,i,l):Sd(a)(a,i)}const xx=a=>{const i=({timestamp:l})=>a(l);return{start:(l=!0)=>qt.update(i,l),stop:()=>fa(i),now:()=>fe.isProcessing?fe.timestamp:Ee.now()}},i0=(a,i,l=10)=>{let r="";const u=Math.max(Math.round(i/l),2);for(let f=0;f<u;f++)r+=Math.round(a(f/(u-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},Ro=2e4;function Ad(a){let i=0;const l=50;let r=a.next(i);for(;!r.done&&i<Ro;)i+=l,r=a.next(i);return i>=Ro?1/0:i}function Sx(a,i=100,l){const r=l({...a,keyframes:[0,i]}),u=Math.min(Ad(r),Ro);return{type:"keyframes",ease:f=>r.next(u*f).value/i,duration:We(u)}}const Ax=5;function s0(a,i,l){const r=Math.max(i-Ax,0);return Hg(l-a(r),i-r)}const _t={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},Tu=.001;function wx({duration:a=_t.duration,bounce:i=_t.bounce,velocity:l=_t.velocity,mass:r=_t.mass}){let u,f,d=1-i;d=Ln(_t.minDamping,_t.maxDamping,d),a=Ln(_t.minDuration,_t.maxDuration,We(a)),d<1?(u=m=>{const g=m*d,b=g*a,S=g-l,L=qu(m,d),H=Math.exp(-b);return Tu-S/L*H},f=m=>{const b=m*d*a,S=b*l+l,L=Math.pow(d,2)*Math.pow(m,2)*a,H=Math.exp(-b),Q=qu(Math.pow(m,2),d);return(-u(m)+Tu>0?-1:1)*((S-L)*H)/Q}):(u=m=>{const g=Math.exp(-m*a),b=(m-l)*a+1;return-Tu+g*b},f=m=>{const g=Math.exp(-m*a),b=(l-m)*(a*a);return g*b});const v=5/a,p=kx(u,f,v);if(a=dn(a),isNaN(p))return{stiffness:_t.stiffness,damping:_t.damping,duration:a};{const m=Math.pow(p,2)*r;return{stiffness:m,damping:d*2*Math.sqrt(r*m),duration:a}}}const Tx=12;function kx(a,i,l){let r=l;for(let u=1;u<Tx;u++)r=r-a(r)/i(r);return r}function qu(a,i){return a*Math.sqrt(1-i*i)}const Cx=["duration","bounce"],Mx=["stiffness","damping","mass"];function cv(a,i){return i.some(l=>a[l]!==void 0)}function Ex(a){let i={velocity:_t.velocity,stiffness:_t.stiffness,damping:_t.damping,mass:_t.mass,isResolvedFromDuration:!1,...a};if(!cv(a,Mx)&&cv(a,Cx))if(a.visualDuration){const l=a.visualDuration,r=2*Math.PI/(l*1.2),u=r*r,f=2*Ln(.05,1,1-(a.bounce||0))*Math.sqrt(u);i={...i,mass:_t.mass,stiffness:u,damping:f}}else{const l=wx(a);i={...i,...l,mass:_t.mass},i.isResolvedFromDuration=!0}return i}function zo(a=_t.visualDuration,i=_t.bounce){const l=typeof a!="object"?{visualDuration:a,keyframes:[0,1],bounce:i}:a;let{restSpeed:r,restDelta:u}=l;const f=l.keyframes[0],d=l.keyframes[l.keyframes.length-1],v={done:!1,value:f},{stiffness:p,damping:m,mass:g,duration:b,velocity:S,isResolvedFromDuration:L}=Ex({...l,velocity:-We(l.velocity||0)}),H=S||0,Q=m/(2*Math.sqrt(p*g)),J=d-f,F=We(Math.sqrt(p/g)),K=Math.abs(J)<5;r||(r=K?_t.restSpeed.granular:_t.restSpeed.default),u||(u=K?_t.restDelta.granular:_t.restDelta.default);let G;if(Q<1){const W=qu(F,Q);G=lt=>{const $=Math.exp(-Q*F*lt);return d-$*((H+Q*F*J)/W*Math.sin(W*lt)+J*Math.cos(W*lt))}}else if(Q===1)G=W=>d-Math.exp(-F*W)*(J+(H+F*J)*W);else{const W=F*Math.sqrt(Q*Q-1);G=lt=>{const $=Math.exp(-Q*F*lt),et=Math.min(W*lt,300);return d-$*((H+Q*F*J)*Math.sinh(et)+W*J*Math.cosh(et))/W}}const at={calculatedDuration:L&&b||null,next:W=>{const lt=G(W);if(L)v.done=W>=b;else{let $=W===0?H:0;Q<1&&($=W===0?dn(H):s0(G,W,lt));const et=Math.abs($)<=r,Mt=Math.abs(d-lt)<=u;v.done=et&&Mt}return v.value=v.done?d:lt,v},toString:()=>{const W=Math.min(Ad(at),Ro),lt=i0($=>at.next(W*$).value,W,30);return W+"ms "+lt},toTransition:()=>{}};return at}zo.applyToOptions=a=>{const i=Sx(a,100,zo);return a.ease=i.ease,a.duration=dn(i.duration),a.type="keyframes",a};function ju({keyframes:a,velocity:i=0,power:l=.8,timeConstant:r=325,bounceDamping:u=10,bounceStiffness:f=500,modifyTarget:d,min:v,max:p,restDelta:m=.5,restSpeed:g}){const b=a[0],S={done:!1,value:b},L=et=>v!==void 0&&et<v||p!==void 0&&et>p,H=et=>v===void 0?p:p===void 0||Math.abs(v-et)<Math.abs(p-et)?v:p;let Q=l*i;const J=b+Q,F=d===void 0?J:d(J);F!==J&&(Q=F-b);const K=et=>-Q*Math.exp(-et/r),G=et=>F+K(et),at=et=>{const Mt=K(et),jt=G(et);S.done=Math.abs(Mt)<=m,S.value=S.done?F:jt};let W,lt;const $=et=>{L(S.value)&&(W=et,lt=zo({keyframes:[S.value,H(S.value)],velocity:s0(G,et,S.value),damping:u,stiffness:f,restDelta:m,restSpeed:g}))};return $(0),{calculatedDuration:null,next:et=>{let Mt=!1;return!lt&&W===void 0&&(Mt=!0,at(et),$(et)),W!==void 0&&et>=W?lt.next(et-W):(!Mt&&at(et),S)}}}function Dx(a,i,l){const r=[],u=l||Un.mix||a0,f=a.length-1;for(let d=0;d<f;d++){let v=u(a[d],a[d+1]);if(i){const p=Array.isArray(i)?i[d]||$e:i;v=Is(p,v)}r.push(v)}return r}function Bx(a,i,{clamp:l=!0,ease:r,mixer:u}={}){const f=a.length;if(fd(f===i.length),f===1)return()=>i[0];if(f===2&&i[0]===i[1])return()=>i[1];const d=a[0]===a[1];a[0]>a[f-1]&&(a=[...a].reverse(),i=[...i].reverse());const v=Dx(i,r,u),p=v.length,m=g=>{if(d&&g<a[0])return i[0];let b=0;if(p>1)for(;b<a.length-2&&!(g<a[b+1]);b++);const S=Qs(a[b],a[b+1],g);return v[b](S)};return l?g=>m(Ln(a[0],a[f-1],g)):m}function Nx(a,i){const l=a[a.length-1];for(let r=1;r<=i;r++){const u=Qs(0,i,r);a.push(Ft(l,1,u))}}function Rx(a){const i=[0];return Nx(i,a.length-1),i}function zx(a,i){return a.map(l=>l*i)}function Lx(a,i){return a.map(()=>i||Xg).splice(0,a.length-1)}function Hs({duration:a=300,keyframes:i,times:l,ease:r="easeInOut"}){const u=Q2(r)?r.map(iv):iv(r),f={done:!1,value:i[0]},d=zx(l&&l.length===i.length?l:Rx(i),a),v=Bx(d,i,{ease:Array.isArray(u)?u:Lx(i,u)});return{calculatedDuration:a,next:p=>(f.value=v(p),f.done=p>=a,f)}}const Ux=a=>a!==null;function wd(a,{repeat:i,repeatType:l="loop"},r,u=1){const f=a.filter(Ux),v=u<0||i&&l!=="loop"&&i%2===1?0:f.length-1;return!v||r===void 0?f[v]:r}const Ox={decay:ju,inertia:ju,tween:Hs,keyframes:Hs,spring:zo};function l0(a){typeof a.type=="string"&&(a.type=Ox[a.type])}class Td{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(i=>{this.resolve=i})}notifyFinished(){this.resolve()}then(i,l){return this.finished.then(i,l)}}const Vx=a=>a/100;class kd extends Td{constructor(i){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=()=>{const{motionValue:l}=this.options;l&&l.updatedAt!==Ee.now()&&this.tick(Ee.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=i,this.initAnimation(),this.play(),i.autoplay===!1&&this.pause()}initAnimation(){const{options:i}=this;l0(i);const{type:l=Hs,repeat:r=0,repeatDelay:u=0,repeatType:f,velocity:d=0}=i;let{keyframes:v}=i;const p=l||Hs;p!==Hs&&typeof v[0]!="number"&&(this.mixKeyframes=Is(Vx,a0(v[0],v[1])),v=[0,100]);const m=p({...i,keyframes:v});f==="mirror"&&(this.mirroredGenerator=p({...i,keyframes:[...v].reverse(),velocity:-d})),m.calculatedDuration===null&&(m.calculatedDuration=Ad(m));const{calculatedDuration:g}=m;this.calculatedDuration=g,this.resolvedDuration=g+u,this.totalDuration=this.resolvedDuration*(r+1)-u,this.generator=m}updateTime(i){const l=Math.round(i-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=l}tick(i,l=!1){const{generator:r,totalDuration:u,mixKeyframes:f,mirroredGenerator:d,resolvedDuration:v,calculatedDuration:p}=this;if(this.startTime===null)return r.next(0);const{delay:m=0,keyframes:g,repeat:b,repeatType:S,repeatDelay:L,type:H,onUpdate:Q,finalKeyframe:J}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,i):this.speed<0&&(this.startTime=Math.min(i-u/this.speed,this.startTime)),l?this.currentTime=i:this.updateTime(i);const F=this.currentTime-m*(this.playbackSpeed>=0?1:-1),K=this.playbackSpeed>=0?F<0:F>u;this.currentTime=Math.max(F,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let G=this.currentTime,at=r;if(b){const et=Math.min(this.currentTime,u)/v;let Mt=Math.floor(et),jt=et%1;!jt&&et>=1&&(jt=1),jt===1&&Mt--,Mt=Math.min(Mt,b+1),!!(Mt%2)&&(S==="reverse"?(jt=1-jt,L&&(jt-=L/v)):S==="mirror"&&(at=d)),G=Ln(0,1,jt)*v}const W=K?{done:!1,value:g[0]}:at.next(G);f&&(W.value=f(W.value));let{done:lt}=W;!K&&p!==null&&(lt=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const $=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&lt);return $&&H!==ju&&(W.value=wd(g,this.options,J,this.speed)),Q&&Q(W.value),$&&this.finish(),W}then(i,l){return this.finished.then(i,l)}get duration(){return We(this.calculatedDuration)}get iterationDuration(){const{delay:i=0}=this.options||{};return this.duration+We(i)}get time(){return We(this.currentTime)}set time(i){i=dn(i),this.currentTime=i,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=i:this.driver&&(this.startTime=this.driver.now()-i/this.playbackSpeed),this.driver?.start(!1)}get speed(){return this.playbackSpeed}set speed(i){this.updateTime(Ee.now());const l=this.playbackSpeed!==i;this.playbackSpeed=i,l&&(this.time=We(this.currentTime))}play(){if(this.isStopped)return;const{driver:i=xx,startTime:l}=this.options;this.driver||(this.driver=i(u=>this.tick(u))),this.options.onPlay?.();const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=l??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(Ee.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(i){return this.startTime=0,this.tick(i,!0)}attachTimeline(i){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),i.observe(this)}}function Hx(a){for(let i=1;i<a.length;i++)a[i]??(a[i]=a[i-1])}const ja=a=>a*180/Math.PI,Fu=a=>{const i=ja(Math.atan2(a[1],a[0]));return Gu(i)},qx={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:a=>(Math.abs(a[0])+Math.abs(a[3]))/2,rotate:Fu,rotateZ:Fu,skewX:a=>ja(Math.atan(a[1])),skewY:a=>ja(Math.atan(a[2])),skew:a=>(Math.abs(a[1])+Math.abs(a[2]))/2},Gu=a=>(a=a%360,a<0&&(a+=360),a),uv=Fu,dv=a=>Math.sqrt(a[0]*a[0]+a[1]*a[1]),fv=a=>Math.sqrt(a[4]*a[4]+a[5]*a[5]),jx={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:dv,scaleY:fv,scale:a=>(dv(a)+fv(a))/2,rotateX:a=>Gu(ja(Math.atan2(a[6],a[5]))),rotateY:a=>Gu(ja(Math.atan2(-a[2],a[0]))),rotateZ:uv,rotate:uv,skewX:a=>ja(Math.atan(a[4])),skewY:a=>ja(Math.atan(a[1])),skew:a=>(Math.abs(a[1])+Math.abs(a[4]))/2};function Yu(a){return a.includes("scale")?1:0}function _u(a,i){if(!a||a==="none")return Yu(i);const l=a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,u;if(l)r=jx,u=l;else{const v=a.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=qx,u=v}if(!u)return Yu(i);const f=r[i],d=u[1].split(",").map(Gx);return typeof f=="function"?f(d):d[f]}const Fx=(a,i)=>{const{transform:l="none"}=getComputedStyle(a);return _u(l,i)};function Gx(a){return parseFloat(a.trim())}const Vi=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Hi=new Set(Vi),hv=a=>a===Oi||a===it,Yx=new Set(["x","y","z"]),_x=Vi.filter(a=>!Yx.has(a));function Qx(a){const i=[];return _x.forEach(l=>{const r=a.getValue(l);r!==void 0&&(i.push([l,r.get()]),r.set(l.startsWith("scale")?1:0))}),i}const Fa={width:({x:a},{paddingLeft:i="0",paddingRight:l="0"})=>a.max-a.min-parseFloat(i)-parseFloat(l),height:({y:a},{paddingTop:i="0",paddingBottom:l="0"})=>a.max-a.min-parseFloat(i)-parseFloat(l),top:(a,{top:i})=>parseFloat(i),left:(a,{left:i})=>parseFloat(i),bottom:({y:a},{top:i})=>parseFloat(i)+(a.max-a.min),right:({x:a},{left:i})=>parseFloat(i)+(a.max-a.min),x:(a,{transform:i})=>_u(i,"x"),y:(a,{transform:i})=>_u(i,"y")};Fa.translateX=Fa.x;Fa.translateY=Fa.y;const Ga=new Set;let Qu=!1,Ju=!1,Xu=!1;function o0(){if(Ju){const a=Array.from(Ga).filter(r=>r.needsMeasurement),i=new Set(a.map(r=>r.element)),l=new Map;i.forEach(r=>{const u=Qx(r);u.length&&(l.set(r,u),r.render())}),a.forEach(r=>r.measureInitialState()),i.forEach(r=>{r.render();const u=l.get(r);u&&u.forEach(([f,d])=>{r.getValue(f)?.set(d)})}),a.forEach(r=>r.measureEndState()),a.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Ju=!1,Qu=!1,Ga.forEach(a=>a.complete(Xu)),Ga.clear()}function r0(){Ga.forEach(a=>{a.readKeyframes(),a.needsMeasurement&&(Ju=!0)})}function Jx(){Xu=!0,r0(),o0(),Xu=!1}class Cd{constructor(i,l,r,u,f,d=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...i],this.onComplete=l,this.name=r,this.motionValue=u,this.element=f,this.isAsync=d}scheduleResolve(){this.state="scheduled",this.isAsync?(Ga.add(this),Qu||(Qu=!0,qt.read(r0),qt.resolveKeyframes(o0))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:i,name:l,element:r,motionValue:u}=this;if(i[0]===null){const f=u?.get(),d=i[i.length-1];if(f!==void 0)i[0]=f;else if(r&&l){const v=r.readValue(l,d);v!=null&&(i[0]=v)}i[0]===void 0&&(i[0]=d),u&&f===void 0&&u.set(i[0])}Hx(i)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(i=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,i),Ga.delete(this)}cancel(){this.state==="scheduled"&&(Ga.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Xx=a=>a.startsWith("--");function Px(a,i,l){Xx(i)?a.style.setProperty(i,l):a.style[i]=l}const Kx=hd(()=>window.ScrollTimeline!==void 0),Zx={};function Ix(a,i){const l=hd(a);return()=>Zx[i]??l()}const c0=Ix(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Us=([a,i,l,r])=>`cubic-bezier(${a}, ${i}, ${l}, ${r})`,pv={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Us([0,.65,.55,1]),circOut:Us([.55,0,1,.45]),backIn:Us([.31,.01,.66,-.59]),backOut:Us([.33,1.53,.69,.99])};function u0(a,i){if(a)return typeof a=="function"?c0()?i0(a,i):"ease-out":Pg(a)?Us(a):Array.isArray(a)?a.map(l=>u0(l,i)||pv.easeOut):pv[a]}function Wx(a,i,l,{delay:r=0,duration:u=300,repeat:f=0,repeatType:d="loop",ease:v="easeOut",times:p}={},m=void 0){const g={[i]:l};p&&(g.offset=p);const b=u0(v,u);Array.isArray(b)&&(g.easing=b);const S={delay:r,duration:u,easing:Array.isArray(b)?"linear":b,fill:"both",iterations:f+1,direction:d==="reverse"?"alternate":"normal"};return m&&(S.pseudoElement=m),a.animate(g,S)}function d0(a){return typeof a=="function"&&"applyToOptions"in a}function $x({type:a,...i}){return d0(a)&&c0()?a.applyToOptions(i):(i.duration??(i.duration=300),i.ease??(i.ease="easeOut"),i)}class tS extends Td{constructor(i){if(super(),this.finishedTime=null,this.isStopped=!1,!i)return;const{element:l,name:r,keyframes:u,pseudoElement:f,allowFlatten:d=!1,finalKeyframe:v,onComplete:p}=i;this.isPseudoElement=!!f,this.allowFlatten=d,this.options=i,fd(typeof i.type!="string");const m=$x(i);this.animation=Wx(l,r,u,m,f),m.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!f){const g=wd(u,this.options,v,this.speed);this.updateMotionValue?this.updateMotionValue(g):Px(l,r,g),this.animation.cancel()}p?.(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:i}=this;i==="idle"||i==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){this.isPseudoElement||this.animation.commitStyles?.()}get duration(){const i=this.animation.effect?.getComputedTiming?.().duration||0;return We(Number(i))}get iterationDuration(){const{delay:i=0}=this.options||{};return this.duration+We(i)}get time(){return We(Number(this.animation.currentTime)||0)}set time(i){this.finishedTime=null,this.animation.currentTime=dn(i)}get speed(){return this.animation.playbackRate}set speed(i){i<0&&(this.finishedTime=null),this.animation.playbackRate=i}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(i){this.animation.startTime=i}attachTimeline({timeline:i,observe:l}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,i&&Kx()?(this.animation.timeline=i,$e):l(this)}}const f0={anticipate:_g,backInOut:Yg,circInOut:Jg};function eS(a){return a in f0}function nS(a){typeof a.ease=="string"&&eS(a.ease)&&(a.ease=f0[a.ease])}const mv=10;class aS extends tS{constructor(i){nS(i),l0(i),super(i),i.startTime&&(this.startTime=i.startTime),this.options=i}updateMotionValue(i){const{motionValue:l,onUpdate:r,onComplete:u,element:f,...d}=this.options;if(!l)return;if(i!==void 0){l.set(i);return}const v=new kd({...d,autoplay:!1}),p=dn(this.finishedTime??this.time);l.setWithVelocity(v.sample(p-mv).value,v.sample(p).value,mv),v.stop()}}const vv=(a,i)=>i==="zIndex"?!1:!!(typeof a=="number"||Array.isArray(a)||typeof a=="string"&&(ha.test(a)||a==="0")&&!a.startsWith("url("));function iS(a){const i=a[0];if(a.length===1)return!0;for(let l=0;l<a.length;l++)if(a[l]!==i)return!0}function sS(a,i,l,r){const u=a[0];if(u===null)return!1;if(i==="display"||i==="visibility")return!0;const f=a[a.length-1],d=vv(u,i),v=vv(f,i);return!d||!v?!1:iS(a)||(l==="spring"||d0(l))&&r}function Pu(a){a.duration=0,a.type="keyframes"}const lS=new Set(["opacity","clipPath","filter","transform"]),oS=hd(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function rS(a){const{motionValue:i,name:l,repeatDelay:r,repeatType:u,damping:f,type:d}=a;if(!(i?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:p,transformTemplate:m}=i.owner.getProps();return oS()&&l&&lS.has(l)&&(l!=="transform"||!m)&&!p&&!r&&u!=="mirror"&&f!==0&&d!=="inertia"}const cS=40;class uS extends Td{constructor({autoplay:i=!0,delay:l=0,type:r="keyframes",repeat:u=0,repeatDelay:f=0,repeatType:d="loop",keyframes:v,name:p,motionValue:m,element:g,...b}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=Ee.now();const S={autoplay:i,delay:l,type:r,repeat:u,repeatDelay:f,repeatType:d,name:p,motionValue:m,element:g,...b},L=g?.KeyframeResolver||Cd;this.keyframeResolver=new L(v,(H,Q,J)=>this.onKeyframesResolved(H,Q,S,!J),p,m,g),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(i,l,r,u){this.keyframeResolver=void 0;const{name:f,type:d,velocity:v,delay:p,isHandoff:m,onUpdate:g}=r;this.resolvedAt=Ee.now(),sS(i,f,d,v)||((Un.instantAnimations||!p)&&g?.(wd(i,r,l)),i[0]=i[i.length-1],Pu(r),r.repeat=0);const S={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>cS?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:l,...r,keyframes:i},L=!m&&rS(S)?new aS({...S,element:S.motionValue.owner.current}):new kd(S);L.finished.then(()=>this.notifyFinished()).catch($e),this.pendingTimeline&&(this.stopTimeline=L.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=L}get finished(){return this._animation?this.animation.finished:this._finished}then(i,l){return this.finished.finally(i).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),Jx()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(i){this.animation.time=i}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(i){this.animation.speed=i}get startTime(){return this.animation.startTime}attachTimeline(i){return this._animation?this.stopTimeline=this.animation.attachTimeline(i):this.pendingTimeline=i,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}const dS=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function fS(a){const i=dS.exec(a);if(!i)return[,];const[,l,r,u]=i;return[`--${l??r}`,u]}function h0(a,i,l=1){const[r,u]=fS(a);if(!r)return;const f=window.getComputedStyle(i).getPropertyValue(r);if(f){const d=f.trim();return Ug(d)?parseFloat(d):d}return yd(u)?h0(u,i,l+1):u}function Md(a,i){return a?.[i]??a?.default??a}const p0=new Set(["width","height","top","left","right","bottom",...Vi]),hS={test:a=>a==="auto",parse:a=>a},m0=a=>i=>i.test(a),v0=[Oi,it,fn,ra,ix,ax,hS],gv=a=>v0.find(m0(a));function pS(a){return typeof a=="number"?a===0:a!==null?a==="none"||a==="0"||Vg(a):!0}const mS=new Set(["brightness","contrast","saturate","opacity"]);function vS(a){const[i,l]=a.slice(0,-1).split("(");if(i==="drop-shadow")return a;const[r]=l.match(bd)||[];if(!r)return a;const u=l.replace(r,"");let f=mS.has(i)?1:0;return r!==l&&(f*=100),i+"("+f+u+")"}const gS=/\b([a-z-]*)\(.*?\)/gu,Ku={...ha,getAnimatableNone:a=>{const i=a.match(gS);return i?i.map(vS).join(" "):a}},yv={...Oi,transform:Math.round},yS={rotate:ra,rotateX:ra,rotateY:ra,rotateZ:ra,scale:So,scaleX:So,scaleY:So,scaleZ:So,skew:ra,skewX:ra,skewY:ra,distance:it,translateX:it,translateY:it,translateZ:it,x:it,y:it,z:it,perspective:it,transformPerspective:it,opacity:Js,originX:sv,originY:sv,originZ:it},Ed={borderWidth:it,borderTopWidth:it,borderRightWidth:it,borderBottomWidth:it,borderLeftWidth:it,borderRadius:it,radius:it,borderTopLeftRadius:it,borderTopRightRadius:it,borderBottomRightRadius:it,borderBottomLeftRadius:it,width:it,maxWidth:it,height:it,maxHeight:it,top:it,right:it,bottom:it,left:it,padding:it,paddingTop:it,paddingRight:it,paddingBottom:it,paddingLeft:it,margin:it,marginTop:it,marginRight:it,marginBottom:it,marginLeft:it,backgroundPositionX:it,backgroundPositionY:it,...yS,zIndex:yv,fillOpacity:Js,strokeOpacity:Js,numOctaves:yv},bS={...Ed,color:te,backgroundColor:te,outlineColor:te,fill:te,stroke:te,borderColor:te,borderTopColor:te,borderRightColor:te,borderBottomColor:te,borderLeftColor:te,filter:Ku,WebkitFilter:Ku},g0=a=>bS[a];function y0(a,i){let l=g0(a);return l!==Ku&&(l=ha),l.getAnimatableNone?l.getAnimatableNone(i):void 0}const xS=new Set(["auto","none","0"]);function SS(a,i,l){let r=0,u;for(;r<a.length&&!u;){const f=a[r];typeof f=="string"&&!xS.has(f)&&Xs(f).values.length&&(u=a[r]),r++}if(u&&l)for(const f of i)a[f]=y0(l,u)}class AS extends Cd{constructor(i,l,r,u,f){super(i,l,r,u,f,!0)}readKeyframes(){const{unresolvedKeyframes:i,element:l,name:r}=this;if(!l||!l.current)return;super.readKeyframes();for(let p=0;p<i.length;p++){let m=i[p];if(typeof m=="string"&&(m=m.trim(),yd(m))){const g=h0(m,l.current);g!==void 0&&(i[p]=g),p===i.length-1&&(this.finalKeyframe=m)}}if(this.resolveNoneKeyframes(),!p0.has(r)||i.length!==2)return;const[u,f]=i,d=gv(u),v=gv(f);if(d!==v)if(hv(d)&&hv(v))for(let p=0;p<i.length;p++){const m=i[p];typeof m=="string"&&(i[p]=parseFloat(m))}else Fa[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:i,name:l}=this,r=[];for(let u=0;u<i.length;u++)(i[u]===null||pS(i[u]))&&r.push(u);r.length&&SS(i,r,l)}measureInitialState(){const{element:i,unresolvedKeyframes:l,name:r}=this;if(!i||!i.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Fa[r](i.measureViewportBox(),window.getComputedStyle(i.current)),l[0]=this.measuredOrigin;const u=l[l.length-1];u!==void 0&&i.getValue(r,u).jump(u,!1)}measureEndState(){const{element:i,name:l,unresolvedKeyframes:r}=this;if(!i||!i.current)return;const u=i.getValue(l);u&&u.jump(this.measuredOrigin,!1);const f=r.length-1,d=r[f];r[f]=Fa[l](i.measureViewportBox(),window.getComputedStyle(i.current)),d!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=d),this.removedTransforms?.length&&this.removedTransforms.forEach(([v,p])=>{i.getValue(v).set(p)}),this.resolveNoneKeyframes()}}function wS(a,i,l){if(a instanceof EventTarget)return[a];if(typeof a=="string"){let r=document;const u=l?.[a]??r.querySelectorAll(a);return u?Array.from(u):[]}return Array.from(a)}const b0=(a,i)=>i&&typeof a=="number"?i.transform(a):a;function TS(a){return Og(a)&&"offsetHeight"in a}const bv=30,kS=a=>!isNaN(parseFloat(a));class CS{constructor(i,l={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{const u=Ee.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(i),this.owner=l.owner}setCurrent(i){this.current=i,this.updatedAt=Ee.now(),this.canTrackVelocity===null&&i!==void 0&&(this.canTrackVelocity=kS(this.current))}setPrevFrameValue(i=this.current){this.prevFrameValue=i,this.prevUpdatedAt=this.updatedAt}onChange(i){return this.on("change",i)}on(i,l){this.events[i]||(this.events[i]=new pd);const r=this.events[i].add(l);return i==="change"?()=>{r(),qt.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const i in this.events)this.events[i].clear()}attach(i,l){this.passiveEffect=i,this.stopPassiveEffect=l}set(i){this.passiveEffect?this.passiveEffect(i,this.updateAndNotify):this.updateAndNotify(i)}setWithVelocity(i,l,r){this.set(l),this.prev=void 0,this.prevFrameValue=i,this.prevUpdatedAt=this.updatedAt-r}jump(i,l=!0){this.updateAndNotify(i),this.prev=i,this.prevUpdatedAt=this.prevFrameValue=void 0,l&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(i){this.dependents||(this.dependents=new Set),this.dependents.add(i)}removeDependent(i){this.dependents&&this.dependents.delete(i)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const i=Ee.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||i-this.updatedAt>bv)return 0;const l=Math.min(this.updatedAt-this.prevUpdatedAt,bv);return Hg(parseFloat(this.current)-parseFloat(this.prevFrameValue),l)}start(i){return this.stop(),new Promise(l=>{this.hasAnimated=!0,this.animation=i(l),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Li(a,i){return new CS(a,i)}const{schedule:Dd}=Kg(queueMicrotask,!1),ln={x:!1,y:!1};function x0(){return ln.x||ln.y}function MS(a){return a==="x"||a==="y"?ln[a]?null:(ln[a]=!0,()=>{ln[a]=!1}):ln.x||ln.y?null:(ln.x=ln.y=!0,()=>{ln.x=ln.y=!1})}function S0(a,i){const l=wS(a),r=new AbortController,u={passive:!0,...i,signal:r.signal};return[l,u,()=>r.abort()]}function xv(a){return!(a.pointerType==="touch"||x0())}function ES(a,i,l={}){const[r,u,f]=S0(a,l),d=v=>{if(!xv(v))return;const{target:p}=v,m=i(p,v);if(typeof m!="function"||!p)return;const g=b=>{xv(b)&&(m(b),p.removeEventListener("pointerleave",g))};p.addEventListener("pointerleave",g,u)};return r.forEach(v=>{v.addEventListener("pointerenter",d,u)}),f}const A0=(a,i)=>i?a===i?!0:A0(a,i.parentElement):!1,Bd=a=>a.pointerType==="mouse"?typeof a.button!="number"||a.button<=0:a.isPrimary!==!1,DS=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function BS(a){return DS.has(a.tagName)||a.tabIndex!==-1}const Mo=new WeakSet;function Sv(a){return i=>{i.key==="Enter"&&a(i)}}function ku(a,i){a.dispatchEvent(new PointerEvent("pointer"+i,{isPrimary:!0,bubbles:!0}))}const NS=(a,i)=>{const l=a.currentTarget;if(!l)return;const r=Sv(()=>{if(Mo.has(l))return;ku(l,"down");const u=Sv(()=>{ku(l,"up")}),f=()=>ku(l,"cancel");l.addEventListener("keyup",u,i),l.addEventListener("blur",f,i)});l.addEventListener("keydown",r,i),l.addEventListener("blur",()=>l.removeEventListener("keydown",r),i)};function Av(a){return Bd(a)&&!x0()}function RS(a,i,l={}){const[r,u,f]=S0(a,l),d=v=>{const p=v.currentTarget;if(!Av(v))return;Mo.add(p);const m=i(p,v),g=(L,H)=>{window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",S),Mo.has(p)&&Mo.delete(p),Av(L)&&typeof m=="function"&&m(L,{success:H})},b=L=>{g(L,p===window||p===document||l.useGlobalTarget||A0(p,L.target))},S=L=>{g(L,!1)};window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",S,u)};return r.forEach(v=>{(l.useGlobalTarget?window:v).addEventListener("pointerdown",d,u),TS(v)&&(v.addEventListener("focus",m=>NS(m,u)),!BS(v)&&!v.hasAttribute("tabindex")&&(v.tabIndex=0))}),f}function w0(a){return Og(a)&&"ownerSVGElement"in a}function zS(a){return w0(a)&&a.tagName==="svg"}const ve=a=>!!(a&&a.getVelocity),LS=[...v0,te,ha],US=a=>LS.find(m0(a)),T0=ct.createContext({transformPagePoint:a=>a,isStatic:!1,reducedMotion:"never"});function OS(a=!0){const i=ct.useContext(cd);if(i===null)return[!0,null];const{isPresent:l,onExitComplete:r,register:u}=i,f=ct.useId();ct.useEffect(()=>{if(a)return u(f)},[a]);const d=ct.useCallback(()=>a&&r&&r(f),[f,r,a]);return!l&&r?[!1,d]:[!0]}const k0=ct.createContext({strict:!1}),wv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Ui={};for(const a in wv)Ui[a]={isEnabled:i=>wv[a].some(l=>!!i[l])};function VS(a){for(const i in a)Ui[i]={...Ui[i],...a[i]}}const HS=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function Lo(a){return a.startsWith("while")||a.startsWith("drag")&&a!=="draggable"||a.startsWith("layout")||a.startsWith("onTap")||a.startsWith("onPan")||a.startsWith("onLayout")||HS.has(a)}let C0=a=>!Lo(a);function qS(a){typeof a=="function"&&(C0=i=>i.startsWith("on")?!Lo(i):a(i))}try{qS(require("@emotion/is-prop-valid").default)}catch{}function jS(a,i,l){const r={};for(const u in a)u==="values"&&typeof a.values=="object"||(C0(u)||l===!0&&Lo(u)||!i&&!Lo(u)||a.draggable&&u.startsWith("onDrag"))&&(r[u]=a[u]);return r}const Oo=ct.createContext({});function Vo(a){return a!==null&&typeof a=="object"&&typeof a.start=="function"}function Ps(a){return typeof a=="string"||Array.isArray(a)}const Nd=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Rd=["initial",...Nd];function Ho(a){return Vo(a.animate)||Rd.some(i=>Ps(a[i]))}function M0(a){return!!(Ho(a)||a.variants)}function FS(a,i){if(Ho(a)){const{initial:l,animate:r}=a;return{initial:l===!1||Ps(l)?l:void 0,animate:Ps(r)?r:void 0}}return a.inherit!==!1?i:{}}function GS(a){const{initial:i,animate:l}=FS(a,ct.useContext(Oo));return ct.useMemo(()=>({initial:i,animate:l}),[Tv(i),Tv(l)])}function Tv(a){return Array.isArray(a)?a.join(" "):a}const Ks={};function YS(a){for(const i in a)Ks[i]=a[i],gd(i)&&(Ks[i].isCSSVariable=!0)}function E0(a,{layout:i,layoutId:l}){return Hi.has(a)||a.startsWith("origin")||(i||l!==void 0)&&(!!Ks[a]||a==="opacity")}const _S={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},QS=Vi.length;function JS(a,i,l){let r="",u=!0;for(let f=0;f<QS;f++){const d=Vi[f],v=a[d];if(v===void 0)continue;let p=!0;if(typeof v=="number"?p=v===(d.startsWith("scale")?1:0):p=parseFloat(v)===0,!p||l){const m=b0(v,Ed[d]);if(!p){u=!1;const g=_S[d]||d;r+=`${g}(${m}) `}l&&(i[d]=m)}}return r=r.trim(),l?r=l(i,u?"":r):u&&(r="none"),r}function zd(a,i,l){const{style:r,vars:u,transformOrigin:f}=a;let d=!1,v=!1;for(const p in i){const m=i[p];if(Hi.has(p)){d=!0;continue}else if(gd(p)){u[p]=m;continue}else{const g=b0(m,Ed[p]);p.startsWith("origin")?(v=!0,f[p]=g):r[p]=g}}if(i.transform||(d||l?r.transform=JS(i,a.transform,l):r.transform&&(r.transform="none")),v){const{originX:p="50%",originY:m="50%",originZ:g=0}=f;r.transformOrigin=`${p} ${m} ${g}`}}const Ld=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function D0(a,i,l){for(const r in i)!ve(i[r])&&!E0(r,l)&&(a[r]=i[r])}function XS({transformTemplate:a},i){return ct.useMemo(()=>{const l=Ld();return zd(l,i,a),Object.assign({},l.vars,l.style)},[i])}function PS(a,i){const l=a.style||{},r={};return D0(r,l,a),Object.assign(r,XS(a,i)),r}function KS(a,i){const l={},r=PS(a,i);return a.drag&&a.dragListener!==!1&&(l.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=a.drag===!0?"none":`pan-${a.drag==="x"?"y":"x"}`),a.tabIndex===void 0&&(a.onTap||a.onTapStart||a.whileTap)&&(l.tabIndex=0),l.style=r,l}const ZS={offset:"stroke-dashoffset",array:"stroke-dasharray"},IS={offset:"strokeDashoffset",array:"strokeDasharray"};function WS(a,i,l=1,r=0,u=!0){a.pathLength=1;const f=u?ZS:IS;a[f.offset]=it.transform(-r);const d=it.transform(i),v=it.transform(l);a[f.array]=`${d} ${v}`}function B0(a,{attrX:i,attrY:l,attrScale:r,pathLength:u,pathSpacing:f=1,pathOffset:d=0,...v},p,m,g){if(zd(a,v,m),p){a.style.viewBox&&(a.attrs.viewBox=a.style.viewBox);return}a.attrs=a.style,a.style={};const{attrs:b,style:S}=a;b.transform&&(S.transform=b.transform,delete b.transform),(S.transform||b.transformOrigin)&&(S.transformOrigin=b.transformOrigin??"50% 50%",delete b.transformOrigin),S.transform&&(S.transformBox=g?.transformBox??"fill-box",delete b.transformBox),i!==void 0&&(b.x=i),l!==void 0&&(b.y=l),r!==void 0&&(b.scale=r),u!==void 0&&WS(b,u,f,d,!1)}const N0=()=>({...Ld(),attrs:{}}),R0=a=>typeof a=="string"&&a.toLowerCase()==="svg";function $S(a,i,l,r){const u=ct.useMemo(()=>{const f=N0();return B0(f,i,R0(r),a.transformTemplate,a.style),{...f.attrs,style:{...f.style}}},[i]);if(a.style){const f={};D0(f,a.style,a),u.style={...f,...u.style}}return u}const tA=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Ud(a){return typeof a!="string"||a.includes("-")?!1:!!(tA.indexOf(a)>-1||/[A-Z]/u.test(a))}function eA(a,i,l,{latestValues:r},u,f=!1){const v=(Ud(a)?$S:KS)(i,r,u,a),p=jS(i,typeof a=="string",f),m=a!==ct.Fragment?{...p,...v,ref:l}:{},{children:g}=i,b=ct.useMemo(()=>ve(g)?g.get():g,[g]);return ct.createElement(a,{...m,children:b})}function kv(a){const i=[{},{}];return a?.values.forEach((l,r)=>{i[0][r]=l.get(),i[1][r]=l.getVelocity()}),i}function Od(a,i,l,r){if(typeof i=="function"){const[u,f]=kv(r);i=i(l!==void 0?l:a.custom,u,f)}if(typeof i=="string"&&(i=a.variants&&a.variants[i]),typeof i=="function"){const[u,f]=kv(r);i=i(l!==void 0?l:a.custom,u,f)}return i}function Eo(a){return ve(a)?a.get():a}function nA({scrapeMotionValuesFromProps:a,createRenderState:i},l,r,u){return{latestValues:aA(l,r,u,a),renderState:i()}}function aA(a,i,l,r){const u={},f=r(a,{});for(const S in f)u[S]=Eo(f[S]);let{initial:d,animate:v}=a;const p=Ho(a),m=M0(a);i&&m&&!p&&a.inherit!==!1&&(d===void 0&&(d=i.initial),v===void 0&&(v=i.animate));let g=l?l.initial===!1:!1;g=g||d===!1;const b=g?v:d;if(b&&typeof b!="boolean"&&!Vo(b)){const S=Array.isArray(b)?b:[b];for(let L=0;L<S.length;L++){const H=Od(a,S[L]);if(H){const{transitionEnd:Q,transition:J,...F}=H;for(const K in F){let G=F[K];if(Array.isArray(G)){const at=g?G.length-1:0;G=G[at]}G!==null&&(u[K]=G)}for(const K in Q)u[K]=Q[K]}}}return u}const z0=a=>(i,l)=>{const r=ct.useContext(Oo),u=ct.useContext(cd),f=()=>nA(a,i,r,u);return l?f():V2(f)};function Vd(a,i,l){const{style:r}=a,u={};for(const f in r)(ve(r[f])||i.style&&ve(i.style[f])||E0(f,a)||l?.getValue(f)?.liveStyle!==void 0)&&(u[f]=r[f]);return u}const iA=z0({scrapeMotionValuesFromProps:Vd,createRenderState:Ld});function L0(a,i,l){const r=Vd(a,i,l);for(const u in a)if(ve(a[u])||ve(i[u])){const f=Vi.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;r[f]=a[u]}return r}const sA=z0({scrapeMotionValuesFromProps:L0,createRenderState:N0}),lA=Symbol.for("motionComponentSymbol");function Di(a){return a&&typeof a=="object"&&Object.prototype.hasOwnProperty.call(a,"current")}function oA(a,i,l){return ct.useCallback(r=>{r&&a.onMount&&a.onMount(r),i&&(r?i.mount(r):i.unmount()),l&&(typeof l=="function"?l(r):Di(l)&&(l.current=r))},[i])}const Hd=a=>a.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),rA="framerAppearId",U0="data-"+Hd(rA),O0=ct.createContext({});function cA(a,i,l,r,u){const{visualElement:f}=ct.useContext(Oo),d=ct.useContext(k0),v=ct.useContext(cd),p=ct.useContext(T0).reducedMotion,m=ct.useRef(null);r=r||d.renderer,!m.current&&r&&(m.current=r(a,{visualState:i,parent:f,props:l,presenceContext:v,blockInitialAnimation:v?v.initial===!1:!1,reducedMotionConfig:p}));const g=m.current,b=ct.useContext(O0);g&&!g.projection&&u&&(g.type==="html"||g.type==="svg")&&uA(m.current,l,u,b);const S=ct.useRef(!1);ct.useInsertionEffect(()=>{g&&S.current&&g.update(l,v)});const L=l[U0],H=ct.useRef(!!L&&!window.MotionHandoffIsComplete?.(L)&&window.MotionHasOptimisedAnimation?.(L));return H2(()=>{g&&(S.current=!0,window.MotionIsMounted=!0,g.updateFeatures(),g.scheduleRenderMicrotask(),H.current&&g.animationState&&g.animationState.animateChanges())}),ct.useEffect(()=>{g&&(!H.current&&g.animationState&&g.animationState.animateChanges(),H.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(L)}),H.current=!1),g.enteringChildren=void 0)}),g}function uA(a,i,l,r){const{layoutId:u,layout:f,drag:d,dragConstraints:v,layoutScroll:p,layoutRoot:m,layoutCrossfade:g}=i;a.projection=new l(a.latestValues,i["data-framer-portal-id"]?void 0:V0(a.parent)),a.projection.setOptions({layoutId:u,layout:f,alwaysMeasureLayout:!!d||v&&Di(v),visualElement:a,animationType:typeof f=="string"?f:"both",initialPromotionConfig:r,crossfade:g,layoutScroll:p,layoutRoot:m})}function V0(a){if(a)return a.options.allowProjection!==!1?a.projection:V0(a.parent)}function Cu(a,{forwardMotionProps:i=!1}={},l,r){l&&VS(l);const u=Ud(a)?sA:iA;function f(v,p){let m;const g={...ct.useContext(T0),...v,layoutId:dA(v)},{isStatic:b}=g,S=GS(v),L=u(v,b);if(!b&&rd){fA();const H=hA(g);m=H.MeasureLayout,S.visualElement=cA(a,L,g,r,H.ProjectionNode)}return Bt.jsxs(Oo.Provider,{value:S,children:[m&&S.visualElement?Bt.jsx(m,{visualElement:S.visualElement,...g}):null,eA(a,v,oA(L,S.visualElement,p),L,b,i)]})}f.displayName=`motion.${typeof a=="string"?a:`create(${a.displayName??a.name??""})`}`;const d=ct.forwardRef(f);return d[lA]=a,d}function dA({layoutId:a}){const i=ct.useContext(Lg).id;return i&&a!==void 0?i+"-"+a:a}function fA(a,i){ct.useContext(k0).strict}function hA(a){const{drag:i,layout:l}=Ui;if(!i&&!l)return{};const r={...i,...l};return{MeasureLayout:i?.isEnabled(a)||l?.isEnabled(a)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function pA(a,i){if(typeof Proxy>"u")return Cu;const l=new Map,r=(f,d)=>Cu(f,d,a,i),u=(f,d)=>r(f,d);return new Proxy(u,{get:(f,d)=>d==="create"?r:(l.has(d)||l.set(d,Cu(d,void 0,a,i)),l.get(d))})}function H0({top:a,left:i,right:l,bottom:r}){return{x:{min:i,max:l},y:{min:a,max:r}}}function mA({x:a,y:i}){return{top:i.min,right:a.max,bottom:i.max,left:a.min}}function vA(a,i){if(!i)return a;const l=i({x:a.left,y:a.top}),r=i({x:a.right,y:a.bottom});return{top:l.y,left:l.x,bottom:r.y,right:r.x}}function Mu(a){return a===void 0||a===1}function Zu({scale:a,scaleX:i,scaleY:l}){return!Mu(a)||!Mu(i)||!Mu(l)}function Ha(a){return Zu(a)||q0(a)||a.z||a.rotate||a.rotateX||a.rotateY||a.skewX||a.skewY}function q0(a){return Cv(a.x)||Cv(a.y)}function Cv(a){return a&&a!=="0%"}function Uo(a,i,l){const r=a-l,u=i*r;return l+u}function Mv(a,i,l,r,u){return u!==void 0&&(a=Uo(a,u,r)),Uo(a,l,r)+i}function Iu(a,i=0,l=1,r,u){a.min=Mv(a.min,i,l,r,u),a.max=Mv(a.max,i,l,r,u)}function j0(a,{x:i,y:l}){Iu(a.x,i.translate,i.scale,i.originPoint),Iu(a.y,l.translate,l.scale,l.originPoint)}const Ev=.999999999999,Dv=1.0000000000001;function gA(a,i,l,r=!1){const u=l.length;if(!u)return;i.x=i.y=1;let f,d;for(let v=0;v<u;v++){f=l[v],d=f.projectionDelta;const{visualElement:p}=f.options;p&&p.props.style&&p.props.style.display==="contents"||(r&&f.options.layoutScroll&&f.scroll&&f!==f.root&&Ni(a,{x:-f.scroll.offset.x,y:-f.scroll.offset.y}),d&&(i.x*=d.x.scale,i.y*=d.y.scale,j0(a,d)),r&&Ha(f.latestValues)&&Ni(a,f.latestValues))}i.x<Dv&&i.x>Ev&&(i.x=1),i.y<Dv&&i.y>Ev&&(i.y=1)}function Bi(a,i){a.min=a.min+i,a.max=a.max+i}function Bv(a,i,l,r,u=.5){const f=Ft(a.min,a.max,u);Iu(a,i,l,f,r)}function Ni(a,i){Bv(a.x,i.x,i.scaleX,i.scale,i.originX),Bv(a.y,i.y,i.scaleY,i.scale,i.originY)}function F0(a,i){return H0(vA(a.getBoundingClientRect(),i))}function yA(a,i,l){const r=F0(a,l),{scroll:u}=i;return u&&(Bi(r.x,u.offset.x),Bi(r.y,u.offset.y)),r}const Nv=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ri=()=>({x:Nv(),y:Nv()}),Rv=()=>({min:0,max:0}),Kt=()=>({x:Rv(),y:Rv()}),Wu={current:null},G0={current:!1};function bA(){if(G0.current=!0,!!rd)if(window.matchMedia){const a=window.matchMedia("(prefers-reduced-motion)"),i=()=>Wu.current=a.matches;a.addEventListener("change",i),i()}else Wu.current=!1}const xA=new WeakMap;function SA(a,i,l){for(const r in i){const u=i[r],f=l[r];if(ve(u))a.addValue(r,u);else if(ve(f))a.addValue(r,Li(u,{owner:a}));else if(f!==u)if(a.hasValue(r)){const d=a.getValue(r);d.liveStyle===!0?d.jump(u):d.hasAnimated||d.set(u)}else{const d=a.getStaticValue(r);a.addValue(r,Li(d!==void 0?d:u,{owner:a}))}}for(const r in l)i[r]===void 0&&a.removeValue(r);return i}const zv=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class AA{scrapeMotionValuesFromProps(i,l,r){return{}}constructor({parent:i,props:l,presenceContext:r,reducedMotionConfig:u,blockInitialAnimation:f,visualState:d},v={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Cd,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const S=Ee.now();this.renderScheduledAt<S&&(this.renderScheduledAt=S,qt.render(this.render,!1,!0))};const{latestValues:p,renderState:m}=d;this.latestValues=p,this.baseTarget={...p},this.initialValues=l.initial?{...p}:{},this.renderState=m,this.parent=i,this.props=l,this.presenceContext=r,this.depth=i?i.depth+1:0,this.reducedMotionConfig=u,this.options=v,this.blockInitialAnimation=!!f,this.isControllingVariants=Ho(l),this.isVariantNode=M0(l),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(i&&i.current);const{willChange:g,...b}=this.scrapeMotionValuesFromProps(l,{},this);for(const S in b){const L=b[S];p[S]!==void 0&&ve(L)&&L.set(p[S])}}mount(i){this.current=i,xA.set(i,this),this.projection&&!this.projection.instance&&this.projection.mount(i),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((l,r)=>this.bindToMotionValue(r,l)),G0.current||bA(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Wu.current,this.parent?.addChild(this),this.update(this.props,this.presenceContext)}unmount(){this.projection&&this.projection.unmount(),fa(this.notifyUpdate),fa(this.render),this.valueSubscriptions.forEach(i=>i()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const i in this.events)this.events[i].clear();for(const i in this.features){const l=this.features[i];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(i){this.children.add(i),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(i)}removeChild(i){this.children.delete(i),this.enteringChildren&&this.enteringChildren.delete(i)}bindToMotionValue(i,l){this.valueSubscriptions.has(i)&&this.valueSubscriptions.get(i)();const r=Hi.has(i);r&&this.onBindTransform&&this.onBindTransform();const u=l.on("change",d=>{this.latestValues[i]=d,this.props.onUpdate&&qt.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let f;window.MotionCheckAppearSync&&(f=window.MotionCheckAppearSync(this,i,l)),this.valueSubscriptions.set(i,()=>{u(),f&&f(),l.owner&&l.stop()})}sortNodePosition(i){return!this.current||!this.sortInstanceNodePosition||this.type!==i.type?0:this.sortInstanceNodePosition(this.current,i.current)}updateFeatures(){let i="animation";for(i in Ui){const l=Ui[i];if(!l)continue;const{isEnabled:r,Feature:u}=l;if(!this.features[i]&&u&&r(this.props)&&(this.features[i]=new u(this)),this.features[i]){const f=this.features[i];f.isMounted?f.update():(f.mount(),f.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Kt()}getStaticValue(i){return this.latestValues[i]}setStaticValue(i,l){this.latestValues[i]=l}update(i,l){(i.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=i,this.prevPresenceContext=this.presenceContext,this.presenceContext=l;for(let r=0;r<zv.length;r++){const u=zv[r];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const f="on"+u,d=i[f];d&&(this.propEventSubscriptions[u]=this.on(u,d))}this.prevMotionValues=SA(this,this.scrapeMotionValuesFromProps(i,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(i){return this.props.variants?this.props.variants[i]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(i){const l=this.getClosestVariantNode();if(l)return l.variantChildren&&l.variantChildren.add(i),()=>l.variantChildren.delete(i)}addValue(i,l){const r=this.values.get(i);l!==r&&(r&&this.removeValue(i),this.bindToMotionValue(i,l),this.values.set(i,l),this.latestValues[i]=l.get())}removeValue(i){this.values.delete(i);const l=this.valueSubscriptions.get(i);l&&(l(),this.valueSubscriptions.delete(i)),delete this.latestValues[i],this.removeValueFromRenderState(i,this.renderState)}hasValue(i){return this.values.has(i)}getValue(i,l){if(this.props.values&&this.props.values[i])return this.props.values[i];let r=this.values.get(i);return r===void 0&&l!==void 0&&(r=Li(l===null?void 0:l,{owner:this}),this.addValue(i,r)),r}readValue(i,l){let r=this.latestValues[i]!==void 0||!this.current?this.latestValues[i]:this.getBaseTargetFromProps(this.props,i)??this.readValueFromInstance(this.current,i,this.options);return r!=null&&(typeof r=="string"&&(Ug(r)||Vg(r))?r=parseFloat(r):!US(r)&&ha.test(l)&&(r=y0(i,l)),this.setBaseTarget(i,ve(r)?r.get():r)),ve(r)?r.get():r}setBaseTarget(i,l){this.baseTarget[i]=l}getBaseTarget(i){const{initial:l}=this.props;let r;if(typeof l=="string"||typeof l=="object"){const f=Od(this.props,l,this.presenceContext?.custom);f&&(r=f[i])}if(l&&r!==void 0)return r;const u=this.getBaseTargetFromProps(this.props,i);return u!==void 0&&!ve(u)?u:this.initialValues[i]!==void 0&&r===void 0?void 0:this.baseTarget[i]}on(i,l){return this.events[i]||(this.events[i]=new pd),this.events[i].add(l)}notify(i,...l){this.events[i]&&this.events[i].notify(...l)}scheduleRenderMicrotask(){Dd.render(this.render)}}class Y0 extends AA{constructor(){super(...arguments),this.KeyframeResolver=AS}sortInstanceNodePosition(i,l){return i.compareDocumentPosition(l)&2?1:-1}getBaseTargetFromProps(i,l){return i.style?i.style[l]:void 0}removeValueFromRenderState(i,{vars:l,style:r}){delete l[i],delete r[i]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:i}=this.props;ve(i)&&(this.childSubscription=i.on("change",l=>{this.current&&(this.current.textContent=`${l}`)}))}}function _0(a,{style:i,vars:l},r,u){const f=a.style;let d;for(d in i)f[d]=i[d];u?.applyProjectionStyles(f,r);for(d in l)f.setProperty(d,l[d])}function wA(a){return window.getComputedStyle(a)}class TA extends Y0{constructor(){super(...arguments),this.type="html",this.renderInstance=_0}readValueFromInstance(i,l){if(Hi.has(l))return this.projection?.isProjecting?Yu(l):Fx(i,l);{const r=wA(i),u=(gd(l)?r.getPropertyValue(l):r[l])||0;return typeof u=="string"?u.trim():u}}measureInstanceViewportBox(i,{transformPagePoint:l}){return F0(i,l)}build(i,l,r){zd(i,l,r.transformTemplate)}scrapeMotionValuesFromProps(i,l,r){return Vd(i,l,r)}}const Q0=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function kA(a,i,l,r){_0(a,i,void 0,r);for(const u in i.attrs)a.setAttribute(Q0.has(u)?u:Hd(u),i.attrs[u])}class CA extends Y0{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Kt}getBaseTargetFromProps(i,l){return i[l]}readValueFromInstance(i,l){if(Hi.has(l)){const r=g0(l);return r&&r.default||0}return l=Q0.has(l)?l:Hd(l),i.getAttribute(l)}scrapeMotionValuesFromProps(i,l,r){return L0(i,l,r)}build(i,l,r){B0(i,l,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(i,l,r,u){kA(i,l,r,u)}mount(i){this.isSVGTag=R0(i.tagName),super.mount(i)}}const MA=(a,i)=>Ud(a)?new CA(i):new TA(i,{allowProjection:a!==ct.Fragment});function zi(a,i,l){const r=a.getProps();return Od(r,i,l!==void 0?l:r.custom,a)}const $u=a=>Array.isArray(a);function EA(a,i,l){a.hasValue(i)?a.getValue(i).set(l):a.addValue(i,Li(l))}function DA(a){return $u(a)?a[a.length-1]||0:a}function BA(a,i){const l=zi(a,i);let{transitionEnd:r={},transition:u={},...f}=l||{};f={...f,...r};for(const d in f){const v=DA(f[d]);EA(a,d,v)}}function NA(a){return!!(ve(a)&&a.add)}function td(a,i){const l=a.getValue("willChange");if(NA(l))return l.add(i);if(!l&&Un.WillChange){const r=new Un.WillChange("auto");a.addValue("willChange",r),r.add(i)}}function J0(a){return a.props[U0]}const RA=a=>a!==null;function zA(a,{repeat:i,repeatType:l="loop"},r){const u=a.filter(RA),f=i&&l!=="loop"&&i%2===1?0:u.length-1;return u[f]}const LA={type:"spring",stiffness:500,damping:25,restSpeed:10},UA=a=>({type:"spring",stiffness:550,damping:a===0?2*Math.sqrt(550):30,restSpeed:10}),OA={type:"keyframes",duration:.8},VA={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},HA=(a,{keyframes:i})=>i.length>2?OA:Hi.has(a)?a.startsWith("scale")?UA(i[1]):LA:VA;function qA({when:a,delay:i,delayChildren:l,staggerChildren:r,staggerDirection:u,repeat:f,repeatType:d,repeatDelay:v,from:p,elapsed:m,...g}){return!!Object.keys(g).length}const qd=(a,i,l,r={},u,f)=>d=>{const v=Md(r,a)||{},p=v.delay||r.delay||0;let{elapsed:m=0}=r;m=m-dn(p);const g={keyframes:Array.isArray(l)?l:[null,l],ease:"easeOut",velocity:i.getVelocity(),...v,delay:-m,onUpdate:S=>{i.set(S),v.onUpdate&&v.onUpdate(S)},onComplete:()=>{d(),v.onComplete&&v.onComplete()},name:a,motionValue:i,element:f?void 0:u};qA(v)||Object.assign(g,HA(a,g)),g.duration&&(g.duration=dn(g.duration)),g.repeatDelay&&(g.repeatDelay=dn(g.repeatDelay)),g.from!==void 0&&(g.keyframes[0]=g.from);let b=!1;if((g.type===!1||g.duration===0&&!g.repeatDelay)&&(Pu(g),g.delay===0&&(b=!0)),(Un.instantAnimations||Un.skipAnimations)&&(b=!0,Pu(g),g.delay=0),g.allowFlatten=!v.type&&!v.ease,b&&!f&&i.get()!==void 0){const S=zA(g.keyframes,v);if(S!==void 0){qt.update(()=>{g.onUpdate(S),g.onComplete()});return}}return v.isSync?new kd(g):new uS(g)};function jA({protectedKeys:a,needsAnimating:i},l){const r=a.hasOwnProperty(l)&&i[l]!==!0;return i[l]=!1,r}function X0(a,i,{delay:l=0,transitionOverride:r,type:u}={}){let{transition:f=a.getDefaultTransition(),transitionEnd:d,...v}=i;r&&(f=r);const p=[],m=u&&a.animationState&&a.animationState.getState()[u];for(const g in v){const b=a.getValue(g,a.latestValues[g]??null),S=v[g];if(S===void 0||m&&jA(m,g))continue;const L={delay:l,...Md(f||{},g)},H=b.get();if(H!==void 0&&!b.isAnimating&&!Array.isArray(S)&&S===H&&!L.velocity)continue;let Q=!1;if(window.MotionHandoffAnimation){const F=J0(a);if(F){const K=window.MotionHandoffAnimation(F,g,qt);K!==null&&(L.startTime=K,Q=!0)}}td(a,g),b.start(qd(g,b,S,a.shouldReduceMotion&&p0.has(g)?{type:!1}:L,a,Q));const J=b.animation;J&&p.push(J)}return d&&Promise.all(p).then(()=>{qt.update(()=>{d&&BA(a,d)})}),p}function P0(a,i,l,r=0,u=1){const f=Array.from(a).sort((m,g)=>m.sortNodePosition(g)).indexOf(i),d=a.size,v=(d-1)*r;return typeof l=="function"?l(f,d):u===1?f*r:v-f*r}function ed(a,i,l={}){const r=zi(a,i,l.type==="exit"?a.presenceContext?.custom:void 0);let{transition:u=a.getDefaultTransition()||{}}=r||{};l.transitionOverride&&(u=l.transitionOverride);const f=r?()=>Promise.all(X0(a,r,l)):()=>Promise.resolve(),d=a.variantChildren&&a.variantChildren.size?(p=0)=>{const{delayChildren:m=0,staggerChildren:g,staggerDirection:b}=u;return FA(a,i,p,m,g,b,l)}:()=>Promise.resolve(),{when:v}=u;if(v){const[p,m]=v==="beforeChildren"?[f,d]:[d,f];return p().then(()=>m())}else return Promise.all([f(),d(l.delay)])}function FA(a,i,l=0,r=0,u=0,f=1,d){const v=[];for(const p of a.variantChildren)p.notify("AnimationStart",i),v.push(ed(p,i,{...d,delay:l+(typeof r=="function"?0:r)+P0(a.variantChildren,p,r,u,f)}).then(()=>p.notify("AnimationComplete",i)));return Promise.all(v)}function GA(a,i,l={}){a.notify("AnimationStart",i);let r;if(Array.isArray(i)){const u=i.map(f=>ed(a,f,l));r=Promise.all(u)}else if(typeof i=="string")r=ed(a,i,l);else{const u=typeof i=="function"?zi(a,i,l.custom):i;r=Promise.all(X0(a,u,l))}return r.then(()=>{a.notify("AnimationComplete",i)})}function K0(a,i){if(!Array.isArray(i))return!1;const l=i.length;if(l!==a.length)return!1;for(let r=0;r<l;r++)if(i[r]!==a[r])return!1;return!0}const YA=Rd.length;function Z0(a){if(!a)return;if(!a.isControllingVariants){const l=a.parent?Z0(a.parent)||{}:{};return a.props.initial!==void 0&&(l.initial=a.props.initial),l}const i={};for(let l=0;l<YA;l++){const r=Rd[l],u=a.props[r];(Ps(u)||u===!1)&&(i[r]=u)}return i}const _A=[...Nd].reverse(),QA=Nd.length;function JA(a){return i=>Promise.all(i.map(({animation:l,options:r})=>GA(a,l,r)))}function XA(a){let i=JA(a),l=Lv(),r=!0;const u=p=>(m,g)=>{const b=zi(a,g,p==="exit"?a.presenceContext?.custom:void 0);if(b){const{transition:S,transitionEnd:L,...H}=b;m={...m,...H,...L}}return m};function f(p){i=p(a)}function d(p){const{props:m}=a,g=Z0(a.parent)||{},b=[],S=new Set;let L={},H=1/0;for(let J=0;J<QA;J++){const F=_A[J],K=l[F],G=m[F]!==void 0?m[F]:g[F],at=Ps(G),W=F===p?K.isActive:null;W===!1&&(H=J);let lt=G===g[F]&&G!==m[F]&&at;if(lt&&r&&a.manuallyAnimateOnMount&&(lt=!1),K.protectedKeys={...L},!K.isActive&&W===null||!G&&!K.prevProp||Vo(G)||typeof G=="boolean")continue;const $=PA(K.prevProp,G);let et=$||F===p&&K.isActive&&!lt&&at||J>H&&at,Mt=!1;const jt=Array.isArray(G)?G:[G];let ee=jt.reduce(u(F),{});W===!1&&(ee={});const{prevResolvedValues:ne={}}=K,en={...ne,...ee},xe=j=>{et=!0,S.has(j)&&(Mt=!0,S.delete(j)),K.needsAnimating[j]=!0;const X=a.getValue(j);X&&(X.liveStyle=!1)};for(const j in en){const X=ee[j],ft=ne[j];if(L.hasOwnProperty(j))continue;let vt=!1;$u(X)&&$u(ft)?vt=!K0(X,ft):vt=X!==ft,vt?X!=null?xe(j):S.add(j):X!==void 0&&S.has(j)?xe(j):K.protectedKeys[j]=!0}K.prevProp=G,K.prevResolvedValues=ee,K.isActive&&(L={...L,...ee}),r&&a.blockInitialAnimation&&(et=!1);const he=lt&&$;et&&(!he||Mt)&&b.push(...jt.map(j=>{const X={type:F};if(typeof j=="string"&&r&&!he&&a.manuallyAnimateOnMount&&a.parent){const{parent:ft}=a,vt=zi(ft,j);if(ft.enteringChildren&&vt){const{delayChildren:w}=vt.transition||{};X.delay=P0(ft.enteringChildren,a,w)}}return{animation:j,options:X}}))}if(S.size){const J={};if(typeof m.initial!="boolean"){const F=zi(a,Array.isArray(m.initial)?m.initial[0]:m.initial);F&&F.transition&&(J.transition=F.transition)}S.forEach(F=>{const K=a.getBaseTarget(F),G=a.getValue(F);G&&(G.liveStyle=!0),J[F]=K??null}),b.push({animation:J})}let Q=!!b.length;return r&&(m.initial===!1||m.initial===m.animate)&&!a.manuallyAnimateOnMount&&(Q=!1),r=!1,Q?i(b):Promise.resolve()}function v(p,m){if(l[p].isActive===m)return Promise.resolve();a.variantChildren?.forEach(b=>b.animationState?.setActive(p,m)),l[p].isActive=m;const g=d(p);for(const b in l)l[b].protectedKeys={};return g}return{animateChanges:d,setActive:v,setAnimateFunction:f,getState:()=>l,reset:()=>{l=Lv()}}}function PA(a,i){return typeof i=="string"?i!==a:Array.isArray(i)?!K0(i,a):!1}function Ua(a=!1){return{isActive:a,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Lv(){return{animate:Ua(!0),whileInView:Ua(),whileHover:Ua(),whileTap:Ua(),whileDrag:Ua(),whileFocus:Ua(),exit:Ua()}}class ma{constructor(i){this.isMounted=!1,this.node=i}update(){}}class KA extends ma{constructor(i){super(i),i.animationState||(i.animationState=XA(i))}updateAnimationControlsSubscription(){const{animate:i}=this.node.getProps();Vo(i)&&(this.unmountControls=i.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:i}=this.node.getProps(),{animate:l}=this.node.prevProps||{};i!==l&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}let ZA=0;class IA extends ma{constructor(){super(...arguments),this.id=ZA++}update(){if(!this.node.presenceContext)return;const{isPresent:i,onExitComplete:l}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||i===r)return;const u=this.node.animationState.setActive("exit",!i);l&&!i&&u.then(()=>{l(this.id)})}mount(){const{register:i,onExitComplete:l}=this.node.presenceContext||{};l&&l(this.id),i&&(this.unmount=i(this.id))}unmount(){}}const WA={animation:{Feature:KA},exit:{Feature:IA}};function Zs(a,i,l,r={passive:!0}){return a.addEventListener(i,l,r),()=>a.removeEventListener(i,l)}function tl(a){return{point:{x:a.pageX,y:a.pageY}}}const $A=a=>i=>Bd(i)&&a(i,tl(i));function qs(a,i,l,r){return Zs(a,i,$A(l),r)}const I0=1e-4,t4=1-I0,e4=1+I0,W0=.01,n4=0-W0,a4=0+W0;function be(a){return a.max-a.min}function i4(a,i,l){return Math.abs(a-i)<=l}function Uv(a,i,l,r=.5){a.origin=r,a.originPoint=Ft(i.min,i.max,a.origin),a.scale=be(l)/be(i),a.translate=Ft(l.min,l.max,a.origin)-a.originPoint,(a.scale>=t4&&a.scale<=e4||isNaN(a.scale))&&(a.scale=1),(a.translate>=n4&&a.translate<=a4||isNaN(a.translate))&&(a.translate=0)}function js(a,i,l,r){Uv(a.x,i.x,l.x,r?r.originX:void 0),Uv(a.y,i.y,l.y,r?r.originY:void 0)}function Ov(a,i,l){a.min=l.min+i.min,a.max=a.min+be(i)}function s4(a,i,l){Ov(a.x,i.x,l.x),Ov(a.y,i.y,l.y)}function Vv(a,i,l){a.min=i.min-l.min,a.max=a.min+be(i)}function Fs(a,i,l){Vv(a.x,i.x,l.x),Vv(a.y,i.y,l.y)}function Ie(a){return[a("x"),a("y")]}const $0=({current:a})=>a?a.ownerDocument.defaultView:null,Hv=(a,i)=>Math.abs(a-i);function l4(a,i){const l=Hv(a.x,i.x),r=Hv(a.y,i.y);return Math.sqrt(l**2+r**2)}class ty{constructor(i,l,{transformPagePoint:r,contextWindow:u=window,dragSnapToOrigin:f=!1,distanceThreshold:d=3}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const S=Du(this.lastMoveEventInfo,this.history),L=this.startEvent!==null,H=l4(S.offset,{x:0,y:0})>=this.distanceThreshold;if(!L&&!H)return;const{point:Q}=S,{timestamp:J}=fe;this.history.push({...Q,timestamp:J});const{onStart:F,onMove:K}=this.handlers;L||(F&&F(this.lastMoveEvent,S),this.startEvent=this.lastMoveEvent),K&&K(this.lastMoveEvent,S)},this.handlePointerMove=(S,L)=>{this.lastMoveEvent=S,this.lastMoveEventInfo=Eu(L,this.transformPagePoint),qt.update(this.updatePoint,!0)},this.handlePointerUp=(S,L)=>{this.end();const{onEnd:H,onSessionEnd:Q,resumeAnimation:J}=this.handlers;if(this.dragSnapToOrigin&&J&&J(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const F=Du(S.type==="pointercancel"?this.lastMoveEventInfo:Eu(L,this.transformPagePoint),this.history);this.startEvent&&H&&H(S,F),Q&&Q(S,F)},!Bd(i))return;this.dragSnapToOrigin=f,this.handlers=l,this.transformPagePoint=r,this.distanceThreshold=d,this.contextWindow=u||window;const v=tl(i),p=Eu(v,this.transformPagePoint),{point:m}=p,{timestamp:g}=fe;this.history=[{...m,timestamp:g}];const{onSessionStart:b}=l;b&&b(i,Du(p,this.history)),this.removeListeners=Is(qs(this.contextWindow,"pointermove",this.handlePointerMove),qs(this.contextWindow,"pointerup",this.handlePointerUp),qs(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(i){this.handlers=i}end(){this.removeListeners&&this.removeListeners(),fa(this.updatePoint)}}function Eu(a,i){return i?{point:i(a.point)}:a}function qv(a,i){return{x:a.x-i.x,y:a.y-i.y}}function Du({point:a},i){return{point:a,delta:qv(a,ey(i)),offset:qv(a,o4(i)),velocity:r4(i,.1)}}function o4(a){return a[0]}function ey(a){return a[a.length-1]}function r4(a,i){if(a.length<2)return{x:0,y:0};let l=a.length-1,r=null;const u=ey(a);for(;l>=0&&(r=a[l],!(u.timestamp-r.timestamp>dn(i)));)l--;if(!r)return{x:0,y:0};const f=We(u.timestamp-r.timestamp);if(f===0)return{x:0,y:0};const d={x:(u.x-r.x)/f,y:(u.y-r.y)/f};return d.x===1/0&&(d.x=0),d.y===1/0&&(d.y=0),d}function c4(a,{min:i,max:l},r){return i!==void 0&&a<i?a=r?Ft(i,a,r.min):Math.max(a,i):l!==void 0&&a>l&&(a=r?Ft(l,a,r.max):Math.min(a,l)),a}function jv(a,i,l){return{min:i!==void 0?a.min+i:void 0,max:l!==void 0?a.max+l-(a.max-a.min):void 0}}function u4(a,{top:i,left:l,bottom:r,right:u}){return{x:jv(a.x,l,u),y:jv(a.y,i,r)}}function Fv(a,i){let l=i.min-a.min,r=i.max-a.max;return i.max-i.min<a.max-a.min&&([l,r]=[r,l]),{min:l,max:r}}function d4(a,i){return{x:Fv(a.x,i.x),y:Fv(a.y,i.y)}}function f4(a,i){let l=.5;const r=be(a),u=be(i);return u>r?l=Qs(i.min,i.max-r,a.min):r>u&&(l=Qs(a.min,a.max-u,i.min)),Ln(0,1,l)}function h4(a,i){const l={};return i.min!==void 0&&(l.min=i.min-a.min),i.max!==void 0&&(l.max=i.max-a.min),l}const nd=.35;function p4(a=nd){return a===!1?a=0:a===!0&&(a=nd),{x:Gv(a,"left","right"),y:Gv(a,"top","bottom")}}function Gv(a,i,l){return{min:Yv(a,i),max:Yv(a,l)}}function Yv(a,i){return typeof a=="number"?a:a[i]||0}const m4=new WeakMap;class v4{constructor(i){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Kt(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=i}start(i,{snapToCursor:l=!1,distanceThreshold:r}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const f=b=>{const{dragSnapToOrigin:S}=this.getProps();S?this.pauseAnimation():this.stopAnimation(),l&&this.snapToCursor(tl(b).point)},d=(b,S)=>{const{drag:L,dragPropagation:H,onDragStart:Q}=this.getProps();if(L&&!H&&(this.openDragLock&&this.openDragLock(),this.openDragLock=MS(L),!this.openDragLock))return;this.latestPointerEvent=b,this.latestPanInfo=S,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Ie(F=>{let K=this.getAxisMotionValue(F).get()||0;if(fn.test(K)){const{projection:G}=this.visualElement;if(G&&G.layout){const at=G.layout.layoutBox[F];at&&(K=be(at)*(parseFloat(K)/100))}}this.originPoint[F]=K}),Q&&qt.postRender(()=>Q(b,S)),td(this.visualElement,"transform");const{animationState:J}=this.visualElement;J&&J.setActive("whileDrag",!0)},v=(b,S)=>{this.latestPointerEvent=b,this.latestPanInfo=S;const{dragPropagation:L,dragDirectionLock:H,onDirectionLock:Q,onDrag:J}=this.getProps();if(!L&&!this.openDragLock)return;const{offset:F}=S;if(H&&this.currentDirection===null){this.currentDirection=g4(F),this.currentDirection!==null&&Q&&Q(this.currentDirection);return}this.updateAxis("x",S.point,F),this.updateAxis("y",S.point,F),this.visualElement.render(),J&&J(b,S)},p=(b,S)=>{this.latestPointerEvent=b,this.latestPanInfo=S,this.stop(b,S),this.latestPointerEvent=null,this.latestPanInfo=null},m=()=>Ie(b=>this.getAnimationState(b)==="paused"&&this.getAxisMotionValue(b).animation?.play()),{dragSnapToOrigin:g}=this.getProps();this.panSession=new ty(i,{onSessionStart:f,onStart:d,onMove:v,onSessionEnd:p,resumeAnimation:m},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:g,distanceThreshold:r,contextWindow:$0(this.visualElement)})}stop(i,l){const r=i||this.latestPointerEvent,u=l||this.latestPanInfo,f=this.isDragging;if(this.cancel(),!f||!u||!r)return;const{velocity:d}=u;this.startAnimation(d);const{onDragEnd:v}=this.getProps();v&&qt.postRender(()=>v(r,u))}cancel(){this.isDragging=!1;const{projection:i,animationState:l}=this.visualElement;i&&(i.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),l&&l.setActive("whileDrag",!1)}updateAxis(i,l,r){const{drag:u}=this.getProps();if(!r||!Ao(i,u,this.currentDirection))return;const f=this.getAxisMotionValue(i);let d=this.originPoint[i]+r[i];this.constraints&&this.constraints[i]&&(d=c4(d,this.constraints[i],this.elastic[i])),f.set(d)}resolveConstraints(){const{dragConstraints:i,dragElastic:l}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,u=this.constraints;i&&Di(i)?this.constraints||(this.constraints=this.resolveRefConstraints()):i&&r?this.constraints=u4(r.layoutBox,i):this.constraints=!1,this.elastic=p4(l),u!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&Ie(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=h4(r.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:i,onMeasureDragConstraints:l}=this.getProps();if(!i||!Di(i))return!1;const r=i.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;const f=yA(r,u.root,this.visualElement.getTransformPagePoint());let d=d4(u.layout.layoutBox,f);if(l){const v=l(mA(d));this.hasMutatedConstraints=!!v,v&&(d=H0(v))}return d}startAnimation(i){const{drag:l,dragMomentum:r,dragElastic:u,dragTransition:f,dragSnapToOrigin:d,onDragTransitionEnd:v}=this.getProps(),p=this.constraints||{},m=Ie(g=>{if(!Ao(g,l,this.currentDirection))return;let b=p&&p[g]||{};d&&(b={min:0,max:0});const S=u?200:1e6,L=u?40:1e7,H={type:"inertia",velocity:r?i[g]:0,bounceStiffness:S,bounceDamping:L,timeConstant:750,restDelta:1,restSpeed:10,...f,...b};return this.startAxisValueAnimation(g,H)});return Promise.all(m).then(v)}startAxisValueAnimation(i,l){const r=this.getAxisMotionValue(i);return td(this.visualElement,i),r.start(qd(i,r,0,l,this.visualElement,!1))}stopAnimation(){Ie(i=>this.getAxisMotionValue(i).stop())}pauseAnimation(){Ie(i=>this.getAxisMotionValue(i).animation?.pause())}getAnimationState(i){return this.getAxisMotionValue(i).animation?.state}getAxisMotionValue(i){const l=`_drag${i.toUpperCase()}`,r=this.visualElement.getProps(),u=r[l];return u||this.visualElement.getValue(i,(r.initial?r.initial[i]:void 0)||0)}snapToCursor(i){Ie(l=>{const{drag:r}=this.getProps();if(!Ao(l,r,this.currentDirection))return;const{projection:u}=this.visualElement,f=this.getAxisMotionValue(l);if(u&&u.layout){const{min:d,max:v}=u.layout.layoutBox[l];f.set(i[l]-Ft(d,v,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:i,dragConstraints:l}=this.getProps(),{projection:r}=this.visualElement;if(!Di(l)||!r||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};Ie(d=>{const v=this.getAxisMotionValue(d);if(v&&this.constraints!==!1){const p=v.get();u[d]=f4({min:p,max:p},this.constraints[d])}});const{transformTemplate:f}=this.visualElement.getProps();this.visualElement.current.style.transform=f?f({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),Ie(d=>{if(!Ao(d,i,null))return;const v=this.getAxisMotionValue(d),{min:p,max:m}=this.constraints[d];v.set(Ft(p,m,u[d]))})}addListeners(){if(!this.visualElement.current)return;m4.set(this.visualElement,this);const i=this.visualElement.current,l=qs(i,"pointerdown",p=>{const{drag:m,dragListener:g=!0}=this.getProps();m&&g&&this.start(p)}),r=()=>{const{dragConstraints:p}=this.getProps();Di(p)&&p.current&&(this.constraints=this.resolveRefConstraints())},{projection:u}=this.visualElement,f=u.addEventListener("measure",r);u&&!u.layout&&(u.root&&u.root.updateScroll(),u.updateLayout()),qt.read(r);const d=Zs(window,"resize",()=>this.scalePositionWithinConstraints()),v=u.addEventListener("didUpdate",(({delta:p,hasLayoutChanged:m})=>{this.isDragging&&m&&(Ie(g=>{const b=this.getAxisMotionValue(g);b&&(this.originPoint[g]+=p[g].translate,b.set(b.get()+p[g].translate))}),this.visualElement.render())}));return()=>{d(),l(),f(),v&&v()}}getProps(){const i=this.visualElement.getProps(),{drag:l=!1,dragDirectionLock:r=!1,dragPropagation:u=!1,dragConstraints:f=!1,dragElastic:d=nd,dragMomentum:v=!0}=i;return{...i,drag:l,dragDirectionLock:r,dragPropagation:u,dragConstraints:f,dragElastic:d,dragMomentum:v}}}function Ao(a,i,l){return(i===!0||i===a)&&(l===null||l===a)}function g4(a,i=10){let l=null;return Math.abs(a.y)>i?l="y":Math.abs(a.x)>i&&(l="x"),l}class y4 extends ma{constructor(i){super(i),this.removeGroupControls=$e,this.removeListeners=$e,this.controls=new v4(i)}mount(){const{dragControls:i}=this.node.getProps();i&&(this.removeGroupControls=i.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||$e}unmount(){this.removeGroupControls(),this.removeListeners()}}const _v=a=>(i,l)=>{a&&qt.postRender(()=>a(i,l))};class b4 extends ma{constructor(){super(...arguments),this.removePointerDownListener=$e}onPointerDown(i){this.session=new ty(i,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:$0(this.node)})}createPanHandlers(){const{onPanSessionStart:i,onPanStart:l,onPan:r,onPanEnd:u}=this.node.getProps();return{onSessionStart:_v(i),onStart:_v(l),onMove:r,onEnd:(f,d)=>{delete this.session,u&&qt.postRender(()=>u(f,d))}}}mount(){this.removePointerDownListener=qs(this.node.current,"pointerdown",i=>this.onPointerDown(i))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const Do={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function Qv(a,i){return i.max===i.min?0:a/(i.max-i.min)*100}const Ls={correct:(a,i)=>{if(!i.target)return a;if(typeof a=="string")if(it.test(a))a=parseFloat(a);else return a;const l=Qv(a,i.target.x),r=Qv(a,i.target.y);return`${l}% ${r}%`}},x4={correct:(a,{treeScale:i,projectionDelta:l})=>{const r=a,u=ha.parse(a);if(u.length>5)return r;const f=ha.createTransformer(a),d=typeof u[0]!="number"?1:0,v=l.x.scale*i.x,p=l.y.scale*i.y;u[0+d]/=v,u[1+d]/=p;const m=Ft(v,p,.5);return typeof u[2+d]=="number"&&(u[2+d]/=m),typeof u[3+d]=="number"&&(u[3+d]/=m),f(u)}};let Bu=!1;class S4 extends ct.Component{componentDidMount(){const{visualElement:i,layoutGroup:l,switchLayoutGroup:r,layoutId:u}=this.props,{projection:f}=i;YS(A4),f&&(l.group&&l.group.add(f),r&&r.register&&u&&r.register(f),Bu&&f.root.didUpdate(),f.addEventListener("animationComplete",()=>{this.safeToRemove()}),f.setOptions({...f.options,onExitComplete:()=>this.safeToRemove()})),Do.hasEverUpdated=!0}getSnapshotBeforeUpdate(i){const{layoutDependency:l,visualElement:r,drag:u,isPresent:f}=this.props,{projection:d}=r;return d&&(d.isPresent=f,Bu=!0,u||i.layoutDependency!==l||l===void 0||i.isPresent!==f?d.willUpdate():this.safeToRemove(),i.isPresent!==f&&(f?d.promote():d.relegate()||qt.postRender(()=>{const v=d.getStack();(!v||!v.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:i}=this.props.visualElement;i&&(i.root.didUpdate(),Dd.postRender(()=>{!i.currentAnimation&&i.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:i,layoutGroup:l,switchLayoutGroup:r}=this.props,{projection:u}=i;Bu=!0,u&&(u.scheduleCheckAfterUnmount(),l&&l.group&&l.group.remove(u),r&&r.deregister&&r.deregister(u))}safeToRemove(){const{safeToRemove:i}=this.props;i&&i()}render(){return null}}function ny(a){const[i,l]=OS(),r=ct.useContext(Lg);return Bt.jsx(S4,{...a,layoutGroup:r,switchLayoutGroup:ct.useContext(O0),isPresent:i,safeToRemove:l})}const A4={borderRadius:{...Ls,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Ls,borderTopRightRadius:Ls,borderBottomLeftRadius:Ls,borderBottomRightRadius:Ls,boxShadow:x4};function w4(a,i,l){const r=ve(a)?a:Li(a);return r.start(qd("",r,i,l)),r.animation}const T4=(a,i)=>a.depth-i.depth;class k4{constructor(){this.children=[],this.isDirty=!1}add(i){ud(this.children,i),this.isDirty=!0}remove(i){dd(this.children,i),this.isDirty=!0}forEach(i){this.isDirty&&this.children.sort(T4),this.isDirty=!1,this.children.forEach(i)}}function C4(a,i){const l=Ee.now(),r=({timestamp:u})=>{const f=u-l;f>=i&&(fa(r),a(f-i))};return qt.setup(r,!0),()=>fa(r)}const ay=["TopLeft","TopRight","BottomLeft","BottomRight"],M4=ay.length,Jv=a=>typeof a=="string"?parseFloat(a):a,Xv=a=>typeof a=="number"||it.test(a);function E4(a,i,l,r,u,f){u?(a.opacity=Ft(0,l.opacity??1,D4(r)),a.opacityExit=Ft(i.opacity??1,0,B4(r))):f&&(a.opacity=Ft(i.opacity??1,l.opacity??1,r));for(let d=0;d<M4;d++){const v=`border${ay[d]}Radius`;let p=Pv(i,v),m=Pv(l,v);if(p===void 0&&m===void 0)continue;p||(p=0),m||(m=0),p===0||m===0||Xv(p)===Xv(m)?(a[v]=Math.max(Ft(Jv(p),Jv(m),r),0),(fn.test(m)||fn.test(p))&&(a[v]+="%")):a[v]=m}(i.rotate||l.rotate)&&(a.rotate=Ft(i.rotate||0,l.rotate||0,r))}function Pv(a,i){return a[i]!==void 0?a[i]:a.borderRadius}const D4=iy(0,.5,Qg),B4=iy(.5,.95,$e);function iy(a,i,l){return r=>r<a?0:r>i?1:l(Qs(a,i,r))}function Kv(a,i){a.min=i.min,a.max=i.max}function Ze(a,i){Kv(a.x,i.x),Kv(a.y,i.y)}function Zv(a,i){a.translate=i.translate,a.scale=i.scale,a.originPoint=i.originPoint,a.origin=i.origin}function Iv(a,i,l,r,u){return a-=i,a=Uo(a,1/l,r),u!==void 0&&(a=Uo(a,1/u,r)),a}function N4(a,i=0,l=1,r=.5,u,f=a,d=a){if(fn.test(i)&&(i=parseFloat(i),i=Ft(d.min,d.max,i/100)-d.min),typeof i!="number")return;let v=Ft(f.min,f.max,r);a===f&&(v-=i),a.min=Iv(a.min,i,l,v,u),a.max=Iv(a.max,i,l,v,u)}function Wv(a,i,[l,r,u],f,d){N4(a,i[l],i[r],i[u],i.scale,f,d)}const R4=["x","scaleX","originX"],z4=["y","scaleY","originY"];function $v(a,i,l,r){Wv(a.x,i,R4,l?l.x:void 0,r?r.x:void 0),Wv(a.y,i,z4,l?l.y:void 0,r?r.y:void 0)}function tg(a){return a.translate===0&&a.scale===1}function sy(a){return tg(a.x)&&tg(a.y)}function eg(a,i){return a.min===i.min&&a.max===i.max}function L4(a,i){return eg(a.x,i.x)&&eg(a.y,i.y)}function ng(a,i){return Math.round(a.min)===Math.round(i.min)&&Math.round(a.max)===Math.round(i.max)}function ly(a,i){return ng(a.x,i.x)&&ng(a.y,i.y)}function ag(a){return be(a.x)/be(a.y)}function ig(a,i){return a.translate===i.translate&&a.scale===i.scale&&a.originPoint===i.originPoint}class U4{constructor(){this.members=[]}add(i){ud(this.members,i),i.scheduleRender()}remove(i){if(dd(this.members,i),i===this.prevLead&&(this.prevLead=void 0),i===this.lead){const l=this.members[this.members.length-1];l&&this.promote(l)}}relegate(i){const l=this.members.findIndex(u=>i===u);if(l===0)return!1;let r;for(let u=l;u>=0;u--){const f=this.members[u];if(f.isPresent!==!1){r=f;break}}return r?(this.promote(r),!0):!1}promote(i,l){const r=this.lead;if(i!==r&&(this.prevLead=r,this.lead=i,i.show(),r)){r.instance&&r.scheduleRender(),i.scheduleRender(),i.resumeFrom=r,l&&(i.resumeFrom.preserveOpacity=!0),r.snapshot&&(i.snapshot=r.snapshot,i.snapshot.latestValues=r.animationValues||r.latestValues),i.root&&i.root.isUpdating&&(i.isLayoutDirty=!0);const{crossfade:u}=i.options;u===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(i=>{const{options:l,resumingFrom:r}=i;l.onExitComplete&&l.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(i=>{i.instance&&i.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function O4(a,i,l){let r="";const u=a.x.translate/i.x,f=a.y.translate/i.y,d=l?.z||0;if((u||f||d)&&(r=`translate3d(${u}px, ${f}px, ${d}px) `),(i.x!==1||i.y!==1)&&(r+=`scale(${1/i.x}, ${1/i.y}) `),l){const{transformPerspective:m,rotate:g,rotateX:b,rotateY:S,skewX:L,skewY:H}=l;m&&(r=`perspective(${m}px) ${r}`),g&&(r+=`rotate(${g}deg) `),b&&(r+=`rotateX(${b}deg) `),S&&(r+=`rotateY(${S}deg) `),L&&(r+=`skewX(${L}deg) `),H&&(r+=`skewY(${H}deg) `)}const v=a.x.scale*i.x,p=a.y.scale*i.y;return(v!==1||p!==1)&&(r+=`scale(${v}, ${p})`),r||"none"}const Nu=["","X","Y","Z"],V4=1e3;let H4=0;function Ru(a,i,l,r){const{latestValues:u}=i;u[a]&&(l[a]=u[a],i.setStaticValue(a,0),r&&(r[a]=0))}function oy(a){if(a.hasCheckedOptimisedAppear=!0,a.root===a)return;const{visualElement:i}=a.options;if(!i)return;const l=J0(i);if(window.MotionHasOptimisedAnimation(l,"transform")){const{layout:u,layoutId:f}=a.options;window.MotionCancelOptimisedAnimation(l,"transform",qt,!(u||f))}const{parent:r}=a;r&&!r.hasCheckedOptimisedAppear&&oy(r)}function ry({attachResizeListener:a,defaultParent:i,measureScroll:l,checkIsScrollRoot:r,resetTransform:u}){return class{constructor(d={},v=i?.()){this.id=H4++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(F4),this.nodes.forEach(Q4),this.nodes.forEach(J4),this.nodes.forEach(G4)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=d,this.root=v?v.root||v:this,this.path=v?[...v.path,v]:[],this.parent=v,this.depth=v?v.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new k4)}addEventListener(d,v){return this.eventHandlers.has(d)||this.eventHandlers.set(d,new pd),this.eventHandlers.get(d).add(v)}notifyListeners(d,...v){const p=this.eventHandlers.get(d);p&&p.notify(...v)}hasListeners(d){return this.eventHandlers.has(d)}mount(d){if(this.instance)return;this.isSVG=w0(d)&&!zS(d),this.instance=d;const{layoutId:v,layout:p,visualElement:m}=this.options;if(m&&!m.current&&m.mount(d),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||v)&&(this.isLayoutDirty=!0),a){let g,b=0;const S=()=>this.root.updateBlockedByResize=!1;qt.read(()=>{b=window.innerWidth}),a(d,()=>{const L=window.innerWidth;L!==b&&(b=L,this.root.updateBlockedByResize=!0,g&&g(),g=C4(S,250),Do.hasAnimatedSinceResize&&(Do.hasAnimatedSinceResize=!1,this.nodes.forEach(og)))})}v&&this.root.registerSharedNode(v,this),this.options.animate!==!1&&m&&(v||p)&&this.addEventListener("didUpdate",({delta:g,hasLayoutChanged:b,hasRelativeLayoutChanged:S,layout:L})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const H=this.options.transition||m.getDefaultTransition()||I4,{onLayoutAnimationStart:Q,onLayoutAnimationComplete:J}=m.getProps(),F=!this.targetLayout||!ly(this.targetLayout,L),K=!b&&S;if(this.options.layoutRoot||this.resumeFrom||K||b&&(F||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const G={...Md(H,"layout"),onPlay:Q,onComplete:J};(m.shouldReduceMotion||this.options.layoutRoot)&&(G.delay=0,G.type=!1),this.startAnimation(G),this.setAnimationOrigin(g,K)}else b||og(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=L})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const d=this.getStack();d&&d.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),fa(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(X4),this.animationId++)}getTransformTemplate(){const{visualElement:d}=this.options;return d&&d.getProps().transformTemplate}willUpdate(d=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&oy(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let g=0;g<this.path.length;g++){const b=this.path[g];b.shouldResetTransform=!0,b.updateScroll("snapshot"),b.options.layoutRoot&&b.willUpdate(!1)}const{layoutId:v,layout:p}=this.options;if(v===void 0&&!p)return;const m=this.getTransformTemplate();this.prevTransformTemplateValue=m?m(this.latestValues,""):void 0,this.updateSnapshot(),d&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(sg);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(lg);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(_4),this.nodes.forEach(q4),this.nodes.forEach(j4)):this.nodes.forEach(lg),this.clearAllSnapshots();const v=Ee.now();fe.delta=Ln(0,1e3/60,v-fe.timestamp),fe.timestamp=v,fe.isProcessing=!0,xu.update.process(fe),xu.preRender.process(fe),xu.render.process(fe),fe.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Dd.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Y4),this.sharedNodes.forEach(P4)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,qt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){qt.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!be(this.snapshot.measuredBox.x)&&!be(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const d=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Kt(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:v}=this.options;v&&v.notify("LayoutMeasure",this.layout.layoutBox,d?d.layoutBox:void 0)}updateScroll(d="measure"){let v=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===d&&(v=!1),v&&this.instance){const p=r(this.instance);this.scroll={animationId:this.root.animationId,phase:d,isRoot:p,offset:l(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!u)return;const d=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,v=this.projectionDelta&&!sy(this.projectionDelta),p=this.getTransformTemplate(),m=p?p(this.latestValues,""):void 0,g=m!==this.prevTransformTemplateValue;d&&this.instance&&(v||Ha(this.latestValues)||g)&&(u(this.instance,m),this.shouldResetTransform=!1,this.scheduleRender())}measure(d=!0){const v=this.measurePageBox();let p=this.removeElementScroll(v);return d&&(p=this.removeTransform(p)),W4(p),{animationId:this.root.animationId,measuredBox:v,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:d}=this.options;if(!d)return Kt();const v=d.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some($4))){const{scroll:m}=this.root;m&&(Bi(v.x,m.offset.x),Bi(v.y,m.offset.y))}return v}removeElementScroll(d){const v=Kt();if(Ze(v,d),this.scroll?.wasRoot)return v;for(let p=0;p<this.path.length;p++){const m=this.path[p],{scroll:g,options:b}=m;m!==this.root&&g&&b.layoutScroll&&(g.wasRoot&&Ze(v,d),Bi(v.x,g.offset.x),Bi(v.y,g.offset.y))}return v}applyTransform(d,v=!1){const p=Kt();Ze(p,d);for(let m=0;m<this.path.length;m++){const g=this.path[m];!v&&g.options.layoutScroll&&g.scroll&&g!==g.root&&Ni(p,{x:-g.scroll.offset.x,y:-g.scroll.offset.y}),Ha(g.latestValues)&&Ni(p,g.latestValues)}return Ha(this.latestValues)&&Ni(p,this.latestValues),p}removeTransform(d){const v=Kt();Ze(v,d);for(let p=0;p<this.path.length;p++){const m=this.path[p];if(!m.instance||!Ha(m.latestValues))continue;Zu(m.latestValues)&&m.updateSnapshot();const g=Kt(),b=m.measurePageBox();Ze(g,b),$v(v,m.latestValues,m.snapshot?m.snapshot.layoutBox:void 0,g)}return Ha(this.latestValues)&&$v(v,this.latestValues),v}setTargetDelta(d){this.targetDelta=d,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(d){this.options={...this.options,...d,crossfade:d.crossfade!==void 0?d.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==fe.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(d=!1){const v=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=v.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=v.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=v.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==v;if(!(d||p&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:g,layoutId:b}=this.options;if(!(!this.layout||!(g||b))){if(this.resolvedRelativeTargetAt=fe.timestamp,!this.targetDelta&&!this.relativeTarget){const S=this.getClosestProjectingParent();S&&S.layout&&this.animationProgress!==1?(this.relativeParent=S,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Kt(),this.relativeTargetOrigin=Kt(),Fs(this.relativeTargetOrigin,this.layout.layoutBox,S.layout.layoutBox),Ze(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Kt(),this.targetWithTransforms=Kt()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),s4(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Ze(this.target,this.layout.layoutBox),j0(this.target,this.targetDelta)):Ze(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const S=this.getClosestProjectingParent();S&&!!S.resumingFrom==!!this.resumingFrom&&!S.options.layoutScroll&&S.target&&this.animationProgress!==1?(this.relativeParent=S,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Kt(),this.relativeTargetOrigin=Kt(),Fs(this.relativeTargetOrigin,this.target,S.target),Ze(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||Zu(this.parent.latestValues)||q0(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){const d=this.getLead(),v=!!this.resumingFrom||this!==d;let p=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(p=!1),v&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===fe.timestamp&&(p=!1),p)return;const{layout:m,layoutId:g}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(m||g))return;Ze(this.layoutCorrected,this.layout.layoutBox);const b=this.treeScale.x,S=this.treeScale.y;gA(this.layoutCorrected,this.treeScale,this.path,v),d.layout&&!d.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(d.target=d.layout.layoutBox,d.targetWithTransforms=Kt());const{target:L}=d;if(!L){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Zv(this.prevProjectionDelta.x,this.projectionDelta.x),Zv(this.prevProjectionDelta.y,this.projectionDelta.y)),js(this.projectionDelta,this.layoutCorrected,L,this.latestValues),(this.treeScale.x!==b||this.treeScale.y!==S||!ig(this.projectionDelta.x,this.prevProjectionDelta.x)||!ig(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",L))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(d=!0){if(this.options.visualElement?.scheduleRender(),d){const v=this.getStack();v&&v.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ri(),this.projectionDelta=Ri(),this.projectionDeltaWithTransform=Ri()}setAnimationOrigin(d,v=!1){const p=this.snapshot,m=p?p.latestValues:{},g={...this.latestValues},b=Ri();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!v;const S=Kt(),L=p?p.source:void 0,H=this.layout?this.layout.source:void 0,Q=L!==H,J=this.getStack(),F=!J||J.members.length<=1,K=!!(Q&&!F&&this.options.crossfade===!0&&!this.path.some(Z4));this.animationProgress=0;let G;this.mixTargetDelta=at=>{const W=at/1e3;rg(b.x,d.x,W),rg(b.y,d.y,W),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Fs(S,this.layout.layoutBox,this.relativeParent.layout.layoutBox),K4(this.relativeTarget,this.relativeTargetOrigin,S,W),G&&L4(this.relativeTarget,G)&&(this.isProjectionDirty=!1),G||(G=Kt()),Ze(G,this.relativeTarget)),Q&&(this.animationValues=g,E4(g,m,this.latestValues,W,K,F)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=W},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(d){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(fa(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=qt.update(()=>{Do.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Li(0)),this.currentAnimation=w4(this.motionValue,[0,1e3],{...d,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),d.onUpdate&&d.onUpdate(v)},onStop:()=>{},onComplete:()=>{d.onComplete&&d.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const d=this.getStack();d&&d.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(V4),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const d=this.getLead();let{targetWithTransforms:v,target:p,layout:m,latestValues:g}=d;if(!(!v||!p||!m)){if(this!==d&&this.layout&&m&&cy(this.options.animationType,this.layout.layoutBox,m.layoutBox)){p=this.target||Kt();const b=be(this.layout.layoutBox.x);p.x.min=d.target.x.min,p.x.max=p.x.min+b;const S=be(this.layout.layoutBox.y);p.y.min=d.target.y.min,p.y.max=p.y.min+S}Ze(v,p),Ni(v,g),js(this.projectionDeltaWithTransform,this.layoutCorrected,v,g)}}registerSharedNode(d,v){this.sharedNodes.has(d)||this.sharedNodes.set(d,new U4),this.sharedNodes.get(d).add(v);const m=v.options.initialPromotionConfig;v.promote({transition:m?m.transition:void 0,preserveFollowOpacity:m&&m.shouldPreserveFollowOpacity?m.shouldPreserveFollowOpacity(v):void 0})}isLead(){const d=this.getStack();return d?d.lead===this:!0}getLead(){const{layoutId:d}=this.options;return d?this.getStack()?.lead||this:this}getPrevLead(){const{layoutId:d}=this.options;return d?this.getStack()?.prevLead:void 0}getStack(){const{layoutId:d}=this.options;if(d)return this.root.sharedNodes.get(d)}promote({needsReset:d,transition:v,preserveFollowOpacity:p}={}){const m=this.getStack();m&&m.promote(this,p),d&&(this.projectionDelta=void 0,this.needsReset=!0),v&&this.setOptions({transition:v})}relegate(){const d=this.getStack();return d?d.relegate(this):!1}resetSkewAndRotation(){const{visualElement:d}=this.options;if(!d)return;let v=!1;const{latestValues:p}=d;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(v=!0),!v)return;const m={};p.z&&Ru("z",d,m,this.animationValues);for(let g=0;g<Nu.length;g++)Ru(`rotate${Nu[g]}`,d,m,this.animationValues),Ru(`skew${Nu[g]}`,d,m,this.animationValues);d.render();for(const g in m)d.setStaticValue(g,m[g]),this.animationValues&&(this.animationValues[g]=m[g]);d.scheduleRender()}applyProjectionStyles(d,v){if(!this.instance||this.isSVG)return;if(!this.isVisible){d.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,d.visibility="",d.opacity="",d.pointerEvents=Eo(v?.pointerEvents)||"",d.transform=p?p(this.latestValues,""):"none";return}const m=this.getLead();if(!this.projectionDelta||!this.layout||!m.target){this.options.layoutId&&(d.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,d.pointerEvents=Eo(v?.pointerEvents)||""),this.hasProjected&&!Ha(this.latestValues)&&(d.transform=p?p({},""):"none",this.hasProjected=!1);return}d.visibility="";const g=m.animationValues||m.latestValues;this.applyTransformsToTarget();let b=O4(this.projectionDeltaWithTransform,this.treeScale,g);p&&(b=p(g,b)),d.transform=b;const{x:S,y:L}=this.projectionDelta;d.transformOrigin=`${S.origin*100}% ${L.origin*100}% 0`,m.animationValues?d.opacity=m===this?g.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:g.opacityExit:d.opacity=m===this?g.opacity!==void 0?g.opacity:"":g.opacityExit!==void 0?g.opacityExit:0;for(const H in Ks){if(g[H]===void 0)continue;const{correct:Q,applyTo:J,isCSSVariable:F}=Ks[H],K=b==="none"?g[H]:Q(g[H],m);if(J){const G=J.length;for(let at=0;at<G;at++)d[J[at]]=K}else F?this.options.visualElement.renderState.vars[H]=K:d[H]=K}this.options.layoutId&&(d.pointerEvents=m===this?Eo(v?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(d=>d.currentAnimation?.stop()),this.root.nodes.forEach(sg),this.root.sharedNodes.clear()}}}function q4(a){a.updateLayout()}function j4(a){const i=a.resumeFrom?.snapshot||a.snapshot;if(a.isLead()&&a.layout&&i&&a.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:r}=a.layout,{animationType:u}=a.options,f=i.source!==a.layout.source;u==="size"?Ie(g=>{const b=f?i.measuredBox[g]:i.layoutBox[g],S=be(b);b.min=l[g].min,b.max=b.min+S}):cy(u,i.layoutBox,l)&&Ie(g=>{const b=f?i.measuredBox[g]:i.layoutBox[g],S=be(l[g]);b.max=b.min+S,a.relativeTarget&&!a.currentAnimation&&(a.isProjectionDirty=!0,a.relativeTarget[g].max=a.relativeTarget[g].min+S)});const d=Ri();js(d,l,i.layoutBox);const v=Ri();f?js(v,a.applyTransform(r,!0),i.measuredBox):js(v,l,i.layoutBox);const p=!sy(d);let m=!1;if(!a.resumeFrom){const g=a.getClosestProjectingParent();if(g&&!g.resumeFrom){const{snapshot:b,layout:S}=g;if(b&&S){const L=Kt();Fs(L,i.layoutBox,b.layoutBox);const H=Kt();Fs(H,l,S.layoutBox),ly(L,H)||(m=!0),g.options.layoutRoot&&(a.relativeTarget=H,a.relativeTargetOrigin=L,a.relativeParent=g)}}}a.notifyListeners("didUpdate",{layout:l,snapshot:i,delta:v,layoutDelta:d,hasLayoutChanged:p,hasRelativeLayoutChanged:m})}else if(a.isLead()){const{onExitComplete:l}=a.options;l&&l()}a.options.transition=void 0}function F4(a){a.parent&&(a.isProjecting()||(a.isProjectionDirty=a.parent.isProjectionDirty),a.isSharedProjectionDirty||(a.isSharedProjectionDirty=!!(a.isProjectionDirty||a.parent.isProjectionDirty||a.parent.isSharedProjectionDirty)),a.isTransformDirty||(a.isTransformDirty=a.parent.isTransformDirty))}function G4(a){a.isProjectionDirty=a.isSharedProjectionDirty=a.isTransformDirty=!1}function Y4(a){a.clearSnapshot()}function sg(a){a.clearMeasurements()}function lg(a){a.isLayoutDirty=!1}function _4(a){const{visualElement:i}=a.options;i&&i.getProps().onBeforeLayoutMeasure&&i.notify("BeforeLayoutMeasure"),a.resetTransform()}function og(a){a.finishAnimation(),a.targetDelta=a.relativeTarget=a.target=void 0,a.isProjectionDirty=!0}function Q4(a){a.resolveTargetDelta()}function J4(a){a.calcProjection()}function X4(a){a.resetSkewAndRotation()}function P4(a){a.removeLeadSnapshot()}function rg(a,i,l){a.translate=Ft(i.translate,0,l),a.scale=Ft(i.scale,1,l),a.origin=i.origin,a.originPoint=i.originPoint}function cg(a,i,l,r){a.min=Ft(i.min,l.min,r),a.max=Ft(i.max,l.max,r)}function K4(a,i,l,r){cg(a.x,i.x,l.x,r),cg(a.y,i.y,l.y,r)}function Z4(a){return a.animationValues&&a.animationValues.opacityExit!==void 0}const I4={duration:.45,ease:[.4,0,.1,1]},ug=a=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(a),dg=ug("applewebkit/")&&!ug("chrome/")?Math.round:$e;function fg(a){a.min=dg(a.min),a.max=dg(a.max)}function W4(a){fg(a.x),fg(a.y)}function cy(a,i,l){return a==="position"||a==="preserve-aspect"&&!i4(ag(i),ag(l),.2)}function $4(a){return a!==a.root&&a.scroll?.wasRoot}const tw=ry({attachResizeListener:(a,i)=>Zs(a,"resize",i),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),zu={current:void 0},uy=ry({measureScroll:a=>({x:a.scrollLeft,y:a.scrollTop}),defaultParent:()=>{if(!zu.current){const a=new tw({});a.mount(window),a.setOptions({layoutScroll:!0}),zu.current=a}return zu.current},resetTransform:(a,i)=>{a.style.transform=i!==void 0?i:"none"},checkIsScrollRoot:a=>window.getComputedStyle(a).position==="fixed"}),ew={pan:{Feature:b4},drag:{Feature:y4,ProjectionNode:uy,MeasureLayout:ny}};function hg(a,i,l){const{props:r}=a;a.animationState&&r.whileHover&&a.animationState.setActive("whileHover",l==="Start");const u="onHover"+l,f=r[u];f&&qt.postRender(()=>f(i,tl(i)))}class nw extends ma{mount(){const{current:i}=this.node;i&&(this.unmount=ES(i,(l,r)=>(hg(this.node,r,"Start"),u=>hg(this.node,u,"End"))))}unmount(){}}class aw extends ma{constructor(){super(...arguments),this.isActive=!1}onFocus(){let i=!1;try{i=this.node.current.matches(":focus-visible")}catch{i=!0}!i||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Is(Zs(this.node.current,"focus",()=>this.onFocus()),Zs(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function pg(a,i,l){const{props:r}=a;if(a.current instanceof HTMLButtonElement&&a.current.disabled)return;a.animationState&&r.whileTap&&a.animationState.setActive("whileTap",l==="Start");const u="onTap"+(l==="End"?"":l),f=r[u];f&&qt.postRender(()=>f(i,tl(i)))}class iw extends ma{mount(){const{current:i}=this.node;i&&(this.unmount=RS(i,(l,r)=>(pg(this.node,r,"Start"),(u,{success:f})=>pg(this.node,u,f?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const ad=new WeakMap,Lu=new WeakMap,sw=a=>{const i=ad.get(a.target);i&&i(a)},lw=a=>{a.forEach(sw)};function ow({root:a,...i}){const l=a||document;Lu.has(l)||Lu.set(l,{});const r=Lu.get(l),u=JSON.stringify(i);return r[u]||(r[u]=new IntersectionObserver(lw,{root:a,...i})),r[u]}function rw(a,i,l){const r=ow(i);return ad.set(a,l),r.observe(a),()=>{ad.delete(a),r.unobserve(a)}}const cw={some:0,all:1};class uw extends ma{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:i={}}=this.node.getProps(),{root:l,margin:r,amount:u="some",once:f}=i,d={root:l?l.current:void 0,rootMargin:r,threshold:typeof u=="number"?u:cw[u]},v=p=>{const{isIntersecting:m}=p;if(this.isInView===m||(this.isInView=m,f&&!m&&this.hasEnteredView))return;m&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",m);const{onViewportEnter:g,onViewportLeave:b}=this.node.getProps(),S=m?g:b;S&&S(p)};return rw(this.node.current,d,v)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:i,prevProps:l}=this.node;["amount","margin","root"].some(dw(i,l))&&this.startObserver()}unmount(){}}function dw({viewport:a={}},{viewport:i={}}={}){return l=>a[l]!==i[l]}const fw={inView:{Feature:uw},tap:{Feature:iw},focus:{Feature:aw},hover:{Feature:nw}},hw={layout:{ProjectionNode:uy,MeasureLayout:ny}},pw={...WA,...fw,...ew,...hw},wo=pA(pw,MA),mw="/assets/landing-bg-C2h4fgoP.png",vw="/assets/hero-illustration-CMaDBHrb.png",me={accent:"#A45CFF",textDark:"#111111",textMuted:"#7A7A7A",white:"#FFFFFF",lavenderGlow:"#E7D9FF"};function gw({onSignIn:a,onRegister:i}){return Bt.jsxs("div",{style:{width:"100%",height:"100%",margin:0,padding:0,backgroundColor:me.white,position:"relative",fontFamily:"'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",color:me.textDark,overflow:"hidden",display:"flex",flexDirection:"column"},children:[Bt.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:`url(${mw})`,backgroundSize:"cover",backgroundPosition:"center",pointerEvents:"none",zIndex:0}}),Bt.jsx(wo.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.8,ease:"easeOut"},style:{position:"relative",marginTop:"max(24px, env(safe-area-inset-top, 24px))",marginLeft:28,zIndex:1},children:Bt.jsxs("div",{style:{display:"flex",alignItems:"flex-start"},children:[Bt.jsxs("span",{style:{fontSize:26,letterSpacing:"-0.5px",color:me.textDark},children:[Bt.jsx("span",{style:{fontWeight:300},children:"Nova"}),Bt.jsx("span",{style:{fontWeight:600},children:"pay"})]}),Bt.jsx("div",{style:{width:6,height:6,marginLeft:2,marginTop:2,borderTop:`2px solid ${me.accent}`,borderRight:`2px solid ${me.accent}`}})]})}),Bt.jsx(wo.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.15,ease:"easeOut"},style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"16px 20px",zIndex:1},children:Bt.jsx("img",{src:vw,alt:"Financial wellness illustration",style:{width:"85%",maxWidth:320,height:"auto",objectFit:"contain"}})}),Bt.jsxs(wo.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.9,delay:.2,ease:"easeOut"},style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:28,paddingRight:28,zIndex:1},children:[Bt.jsx("div",{style:{fontSize:13,fontWeight:500,color:me.accent,marginBottom:16,textTransform:"lowercase"},children:"control your budget"}),Bt.jsxs("h1",{style:{margin:0,fontSize:48,fontWeight:700,lineHeight:1.05,letterSpacing:"-1px"},children:[Bt.jsx("span",{style:{color:me.textDark},children:"Your"}),Bt.jsx("br",{}),Bt.jsx("span",{style:{color:me.textDark},children:"Money"}),Bt.jsx("br",{}),Bt.jsx("span",{style:{color:me.accent},children:"Instantly."})]}),Bt.jsx("p",{style:{marginTop:20,marginBottom:0,fontSize:15,fontWeight:400,color:me.textMuted,lineHeight:1.5,maxWidth:280},children:"Track the money you spend with friends & brands"})]}),Bt.jsxs(wo.div,{initial:{opacity:0,y:60},animate:{opacity:1,y:0},transition:{duration:.8,delay:.4,ease:"easeOut"},style:{position:"relative",margin:"0 16px",marginBottom:"max(24px, env(safe-area-inset-bottom, 24px))",zIndex:2},children:[Bt.jsx("div",{style:{position:"absolute",bottom:20,left:"20%",width:100,height:100,background:`radial-gradient(circle, ${me.accent}30 0%, transparent 70%)`,filter:"blur(30px)",pointerEvents:"none"}}),Bt.jsx("div",{style:{position:"absolute",bottom:40,right:"15%",width:80,height:80,background:`radial-gradient(circle, ${me.lavenderGlow}50 0%, transparent 70%)`,filter:"blur(25px)",pointerEvents:"none"}}),Bt.jsxs("div",{style:{position:"relative",backgroundColor:"rgba(255, 255, 255, 0.80)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderRadius:30,padding:"28px 24px 24px",boxShadow:"0 18px 40px rgba(0, 0, 0, 0.12)",border:"1px solid rgba(255, 255, 255, 0.6)"},children:[Bt.jsx("button",{type:"button","data-testid":"btnSignIn",onClick:a,style:{width:"100%",height:56,border:"none",borderRadius:28,backgroundColor:me.textDark,color:me.white,fontSize:16,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",transition:"transform 0.15s ease, opacity 0.15s ease"},onMouseDown:l=>{l.currentTarget.style.transform="scale(0.98)",l.currentTarget.style.opacity="0.9"},onMouseUp:l=>{l.currentTarget.style.transform="scale(1)",l.currentTarget.style.opacity="1"},onMouseLeave:l=>{l.currentTarget.style.transform="scale(1)",l.currentTarget.style.opacity="1"},children:"Sign In"}),Bt.jsxs("div",{style:{marginTop:20,textAlign:"center",fontSize:14,color:me.textMuted},children:["Don't have an account?"," ",Bt.jsx("button",{type:"button","data-testid":"btnCreateAccount",onClick:i,style:{background:"none",border:"none",color:me.accent,fontSize:14,fontWeight:500,cursor:"pointer",padding:0,fontFamily:"inherit"},children:"Create one"})]})]})]})]})}function yw(){const a=k("#app");if(!a)return;a.querySelector("#landing-react-root")||(a.innerHTML='<div id="landing-react-root" style="width:100%;height:100%;margin:0;padding:0;overflow:hidden;position:absolute;top:0;left:0;right:0;bottom:0;"></div>');const i=a.querySelector("#landing-react-root");if(!i)return;const l=()=>Y("/login"),r=()=>Y("/register");L2.createRoot(i).render(M2.createElement(gw,{onSignIn:l,onRegister:r}))}function Qt(a,i="JMD"){const l=Math.abs(a);return i==="JMD"?`J$${l.toLocaleString("en-JM",{minimumFractionDigits:0,maximumFractionDigits:0})}`:i==="USD"?`$${l.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:`${i} ${l.toLocaleString()}`}function pa(a){if(!a)return 0;const i=a.replace(/[,$\s]/g,""),l=parseFloat(i);return isNaN(l)?0:l}let wt={step:1,recipient:null,amount:0,note:"",currency:"JMD"};function Gs(){const a=k("#app");a&&(a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackTransfer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Transfer</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div id="stepContent">
          ${bw()}
        </div>
      </div>
    </div>
  `,D("click","#btnBackTransfer",()=>{wt.step>1?(wt.step-=1,Gs()):Y("/dashboard",{animate:"slide-left-fade"})}),Aw())}function bw(){switch(wt.step){case 1:return mg();case 2:return xw();case 3:return Sw();default:return mg()}}function mg(){return`
    <div class="form-field">
      <h3 class="section-title-sm">Send Money to a Contact</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Select a recipient from your contacts or search by phone number.
      </p>
    </div>

    <div class="form-field">
      <label class="form-label" for="recipientSearch">Search Contacts</label>
      <div class="input-wrapper">
        <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="recipientSearch"
          class="form-input-modern"
          placeholder="Name or phone number"
        />
      </div>
    </div>

    <div class="form-field">
      <button class="btn-primary-modern" data-action="scan-qr">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="8" y1="3" x2="8" y2="21"></line>
          <line x1="16" y1="3" x2="16" y2="21"></line>
          <line x1="3" y1="8" x2="21" y2="8"></line>
          <line x1="3" y1="16" x2="21" y2="16"></line>
        </svg>
        Scan QR Code
      </button>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Recent Contacts</h3>
    </div>

    <div class="contact-cards">
      ${[{id:"c1",name:"John Smith",phone:"876-555-0101",avatar:"👨"},{id:"c2",name:"Sarah Johnson",phone:"876-555-0102",avatar:"👩"},{id:"c3",name:"Mike Brown",phone:"876-555-0103",avatar:"👨‍💼"},{id:"c4",name:"Lisa Davis",phone:"876-555-0104",avatar:"👩‍💻"}].map(i=>`
        <div class="contact-card" data-contact='${JSON.stringify(i)}'>
          <div class="contact-avatar">${i.avatar}</div>
          <div class="contact-info">
            <h4 class="contact-name">${i.name}</h4>
            <p class="contact-phone">${i.phone}</p>
          </div>
          <div class="contact-arrow">→</div>
        </div>
      `).join("")}
    </div>
  `}function xw(){return`
    <div class="form-field">
      <h3 class="section-title-sm">Send to ${wt.recipient.name}</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Enter the amount you want to send and add an optional note.
      </p>
    </div>

    <div class="form-field">
      <label class="form-label" for="amountInput">Amount</label>
      <div class="input-group">
        <select id="currency" class="form-input-modern currency-select">
          <option value="JMD">JMD</option>
          <option value="USD">USD</option>
        </select>
        <input
          type="text"
          id="amountInput"
          class="form-input-modern amount-input"
          placeholder="0.00"
          inputmode="decimal"
        />
      </div>
      <p class="form-hint">Available: ${Qt(V.balances.JMD||0,"JMD")}</p>
    </div>

    <div class="form-field">
      <label class="form-label" for="noteInput">Note (Optional)</label>
      <div class="input-wrapper">
        <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <input
          type="text"
          id="noteInput"
          class="form-input-modern"
          placeholder="What's this for?"
          maxlength="50"
        />
      </div>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Quick Amounts</h3>
      <div class="quick-amount-grid">
        <button class="quick-amount-btn" data-quick-amount="1000">J$1,000</button>
        <button class="quick-amount-btn" data-quick-amount="2500">J$2,500</button>
        <button class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
        <button class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
      </div>
    </div>

    <button class="btn-primary-modern" id="continueBtn" disabled>
      Continue
    </button>
  `}function Sw(){const a=wt.currency==="USD"?"$":"J$";return`
    <div class="form-field">
      <h3 class="section-title-sm">Confirm Transfer</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Please review the details before sending money.
      </p>
    </div>

    <div class="confirm-recipient-card">
      <div class="confirm-recipient-avatar">${wt.recipient.avatar}</div>
      <div class="confirm-recipient-info">
        <h4 class="confirm-recipient-name">${wt.recipient.name}</h4>
        <p class="confirm-recipient-phone">${wt.recipient.phone}</p>
      </div>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Transaction Details</h3>
    </div>

    <div class="transaction-details">
      <div class="transaction-detail-row">
        <span class="transaction-detail-label">Amount</span>
        <span class="transaction-detail-value">${Qt(wt.amount,wt.currency)}</span>
      </div>

      <div class="transaction-detail-row">
        <span class="transaction-detail-label">Fee</span>
        <span class="transaction-detail-value">${a}0.00</span>
      </div>

      ${wt.note?`
        <div class="transaction-detail-row">
          <span class="transaction-detail-label">Note</span>
          <span class="transaction-detail-value note-text">${wt.note}</span>
        </div>
      `:""}

      <div class="transaction-detail-divider"></div>

      <div class="transaction-detail-row total-row">
        <span class="transaction-detail-label">Total</span>
        <span class="transaction-detail-value total-value">${Qt(wt.amount,wt.currency)}</span>
      </div>
    </div>

    <div class="form-field">
      <button class="btn-primary-modern" data-testid="btnConfirmSend">
        Send Transfer
      </button>
    </div>

    <div class="form-field">
      <button class="btn-outline-modern" data-action="edit-amount">
        Edit Details
      </button>
    </div>
  `}function Aw(){const a=k("#app");D(a,'[data-action="scan-qr"]',"click",()=>{Y("/scan-qr",{animate:"slide-right-fade"})}),D(a,".contact-card","click",function(){const i=this.dataset.contact;wt.recipient=JSON.parse(i),wt.step=2,Gs()}),D(a,"#amountInput","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l;const r=pa(l),u=k("#continueBtn");r>0&&zn(r)?u.disabled=!1:u.disabled=!0}),D(a,"#currency","change",i=>{wt.currency=i.target.value}),D(a,".quick-amount-btn","click",function(){const i=this.dataset.quickAmount;k("#amountInput").value=i,k("#amountInput").dispatchEvent(new Event("input"))}),D(a,"#continueBtn","click",()=>{const i=pa(k("#amountInput").value),l=k("#noteInput").value.trim(),r=k("#currency").value;if(!zn(i)){q("Insufficient balance");return}wt.amount=i,wt.note=l,wt.currency=r,wt.step=3,Gs()}),D(a,'[data-testid="btnConfirmSend"]',"click",()=>{if(!zn(wt.amount)){q("Insufficient balance. Would you like to add money?"),setTimeout(()=>Y("/add-money",{animate:"slide-right-fade"}),2e3);return}const i=k('[data-testid="btnConfirmSend"]');i.textContent="Processing...",i.disabled=!0,setTimeout(()=>{da(wt.currency,-wt.amount),ua({title:`To ${wt.recipient.name}`,amount:-wt.amount,currency:wt.currency,type:"P2P_SEND"}),q(`Sent ${Qt(wt.amount,wt.currency)} to ${wt.recipient.name}`),wt={step:1,recipient:null,amount:0,note:"",currency:"JMD"},Y("/dashboard",{animate:"slide-left-fade"})},2e3)}),D(a,'[data-action="edit-amount"]',"click",()=>{wt.step=2,Gs()})}const dy=document.createElement("style");dy.textContent=`
  /* Contact cards styling */
  .contact-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .contact-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .contact-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .contact-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .contact-card:active {
    transform: translateY(0);
  }
  
  .contact-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  
  .contact-info {
    flex: 1;
  }
  
  .contact-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .contact-phone {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  
  /* Quick amount buttons */
  .quick-amount-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .quick-amount-btn {
    padding: 12px;
    background: #FFFFFF;
    border: 2px solid var(--colorscharade-20);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--colorscharade-80);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .quick-amount-btn:hover {
    border-color: var(--colorssecondary-100);
    color: var(--colorssecondary-100);
  }
  
  /* Confirm step styling */
  .confirm-recipient-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
  }
  
  .confirm-recipient-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }
  
  .confirm-recipient-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .confirm-recipient-phone {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  .transaction-details {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  
  .transaction-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
  }
  
  .transaction-detail-label {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  .transaction-detail-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--colorscharade-100);
  }
  
  .note-text {
    max-width: 200px;
    text-align: right;
    word-break: break-word;
  }
  
  .transaction-detail-divider {
    height: 1px;
    background: var(--colorscharade-10);
    margin: 8px 0;
  }
  
  .total-row {
    margin-top: 8px;
  }
  
  .total-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--colorssecondary-100);
  }
  
  /* Button styles */
  .btn-outline-modern {
    width: 100%;
    padding: 14px 24px;
    font-size: 15px;
    font-weight: 600;
    color: var(--colorssecondary-100);
    background: transparent;
    border: 2px solid var(--colorssecondary-100);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }
  
  .btn-outline-modern:hover {
    background: rgba(84, 58, 248, 0.1);
  }
`;document.head.appendChild(dy);function ww(){const a=k("#app");a.innerHTML=`
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
            <span id="walletId">NP${V.session.user.phone.replace(/\D/g,"").slice(-6)}</span>
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
  `;const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),D(a,".add-money-option","click",function(){const l=this.dataset.method;l==="bank"?k("#bankDetails").classList.toggle("hidden"):q(`${l} option coming soon!`)}),D(a,'[data-action="copy-account"]',"click",()=>{navigator.clipboard.writeText("123-456-789"),q("Account number copied!")}),D(a,'[data-action="copy-reference"]',"click",()=>{const l=k("#walletId").textContent;navigator.clipboard.writeText(l),q("Wallet ID copied!")}),D(a,'[data-action="share-details"]',"click",async()=>{const r=`NovaPay Bank Transfer Details:
Bank: National Commercial Bank
Account: NovaPay Limited
Account Number: 123-456-789
Reference: ${k("#walletId").textContent}`;if(navigator.share)try{await navigator.share({title:"NovaPay Bank Details",text:r})}catch{console.log("Share cancelled")}else navigator.clipboard.writeText(r),q("Bank details copied to clipboard!")}),D(a,"[data-amount]","click",function(){const l=parseInt(this.dataset.amount);this.textContent="Adding...",this.disabled=!0,setTimeout(()=>{da("JMD",l),ua({title:"Bank Transfer",amount:l,currency:"JMD",type:"TOP_UP"}),q(`Added ${Qt(l,"JMD")} to your account!`),Y("/dashboard")},1500)})}function Tw(){window.history.length>1?window.history.back():window.location.href="/"}const fy=document.createElement("style");fy.textContent=`
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
`;document.head.appendChild(fy);function kw(a){return`$ ${(Number(a)/15500).toFixed(2)}`}let qe={method:null,bankAccount:null,currency:"JMD"};function jd(){const a=k("#app");a&&(a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackWithdraw">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Cash Out</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        ${qe.method?Mw():Cw()}
      </div>
    </div>
  `,D("click","#btnBackWithdraw",()=>{qe.method?(qe.method=null,jd()):Y("/dashboard",{animate:"slide-left-fade"})}),Dw())}function Cw(){return`
    <div class="form-field">
      <h3 class="section-title-sm">Choose Withdrawal Method</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Select how you would like to withdraw your funds.
      </p>
    </div>

    <div class="withdraw-methods">
      <div class="withdraw-method-card" data-method="bank">
        <div class="withdraw-method-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="withdraw-method-info">
          <h4 class="withdraw-method-name">Bank Transfer</h4>
          <p class="withdraw-method-desc">Transfer to your bank account</p>
          <p class="withdraw-method-meta">Free • 1-2 business days</p>
        </div>
      </div>
    </div>

    <section class="np-balance-section withdraw-balance-section">
      <p class="np-balance-title">Available Balance</p>
      <p class="np-balance-amount">${kw(V.balances.JMD||0)}</p>
    </section>
  `}function Mw(){return Ew()}function Ew(){return`
    <div class="form-field">
      <h3 class="section-title-sm">Bank Transfer</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Transfer funds directly to your linked bank account.
      </p>
    </div>
    
    <form id="bankWithdrawForm">
      <div class="form-field">
        <label class="form-label">Select Bank Account</label>
        
        <div class="bank-accounts-list">
          ${[{id:"acc1",bank:"NCB",account:"****1234",name:"John Doe"},{id:"acc2",bank:"Scotiabank",account:"****5678",name:"John Doe"}].map(i=>`
            <div class="bank-account-card" data-account='${JSON.stringify(i)}'>
              <div class="bank-account-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div class="bank-account-info">
                <h4 class="bank-account-name">${i.bank}</h4>
                <p class="bank-account-number">${i.account} • ${i.name}</p>
              </div>
              <input type="radio" name="bankAccount" value="${i.id}" class="bank-account-radio">
            </div>
          `).join("")}
          
          <div class="bank-account-card add-account" data-action="add-account">
            <div class="bank-account-icon add-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div class="bank-account-info">
              <h4 class="bank-account-name">Add New Account</h4>
              <p class="bank-account-number">Link a new bank account</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-field">
        <label class="form-label" for="withdrawAmount">Amount</label>
        <div class="input-group">
          <select id="withdrawCurrency" class="form-input-modern currency-select">
            <option value="JMD">JMD</option>
            <option value="USD">USD</option>
          </select>
          <input
            type="text"
            id="withdrawAmount"
            class="form-input-modern amount-input"
            placeholder="0.00"
            inputmode="decimal"
            required
          />
        </div>
        <p class="form-hint">Available: ${Qt(V.balances.JMD||0,"JMD")}</p>
      </div>
      
      <div class="form-field">
        <h3 class="section-title-sm">Quick Amounts</h3>
        <div class="quick-amount-grid">
          <button type="button" class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="25000">J$25,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="50000">J$50,000</button>
        </div>
      </div>
      
      <div class="form-field">
        <button type="submit" class="btn-primary-modern" data-testid="btnConfirmWithdraw">
          Withdraw Funds
        </button>
      </div>
    </form>
  `}function Dw(){const a=k("#app");D(a,".withdraw-method-card","click",i=>{const l=i.currentTarget.dataset.method;if(qe.method=l,l==="bank"){Y("/bank-selection",{animate:"slide-right-fade"});return}jd()}),D(a,".bank-account-card","click",i=>{if(i.currentTarget.dataset.action==="add-account"){q("Add bank account feature coming soon!");return}const l=i.currentTarget.querySelector('input[type="radio"]');l&&(l.checked=!0,qe.bankAccount=JSON.parse(i.currentTarget.dataset.account))}),D(a,"#withdrawCurrency, #agentCurrency","change",i=>{qe.currency=i.target.value}),D(a,".quick-amount-btn","click",i=>{const l=i.currentTarget.dataset.quickAmount,r=k("#withdrawAmount")||k("#agentAmount");r&&(r.value=l,r.dispatchEvent(new Event("input")))}),D(a,"#withdrawAmount, #agentAmount","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l}),D(a,"#bankWithdrawForm","submit",i=>{i.preventDefault();const l=pa(k("#withdrawAmount").value),r=k("#withdrawCurrency").value;if(!k('input[name="bankAccount"]:checked')){q("Please select a bank account");return}if(l<=0){q("Please enter a valid amount");return}if(!zn(l)){q("Insufficient balance");return}qe.currency=r,Bw(l)}),D(a,"#agentWithdrawForm","submit",i=>{i.preventDefault();const l=pa(k("#agentAmount").value),r=k("#agentCurrency").value,f=l+50;if(l<=0){q("Please enter a valid amount");return}if(!zn(f)){q("Insufficient balance (including J$50 fee)");return}qe.currency=r,Nw(l)}),D(a,'[data-action="agent-complete"]',"click",i=>{const l=parseFloat(i.currentTarget.getAttribute("data-total"));isNaN(l)||(da("JMD",-l),ua({title:"Agent Withdrawal",amount:-l,currency:"JMD",type:"WITHDRAW"}),q("Withdrawal completed successfully!"),qe={method:null,amount:0,bankAccount:null,currency:"JMD"},Y("/dashboard",{animate:"slide-left-fade"}))})}function Bw(a,i){const l=k('[data-testid="btnConfirmWithdraw"]');l.textContent="Processing...",l.disabled=!0,setTimeout(()=>{da(qe.currency,-a),ua({title:"Bank Withdrawal",amount:-a,currency:qe.currency,type:"WITHDRAW"}),q(`Withdrawal of ${Qt(a,qe.currency)} initiated`),qe={method:null,amount:0,bankAccount:null,currency:"JMD"},Y("/dashboard",{animate:"slide-left-fade"})},2e3)}function Nw(a){const l=a+50,r=Math.random().toString(36).substr(2,8).toUpperCase(),u=k("#app");u.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <div class="icon-btn-placeholder"></div>
        <h1 class="page-title-modern">Pickup Code</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field text-center">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="section-title-sm text-center">Withdrawal Approved</h3>
          <p class="form-hint text-center" style="margin-bottom: 24px;">
            Your cash is ready for pickup
          </p>
        </div>
        
        <div class="pickup-code-card">
          <h4 class="pickup-code-label">Pickup Code</h4>
          <div class="pickup-code">${r}</div>
        </div>
        
        <div class="form-field">
          <h3 class="section-title-sm">Transaction Details</h3>
        </div>

        <div class="transaction-details">
          <div class="transaction-detail-row">
            <span class="transaction-detail-label">Amount</span>
            <span class="transaction-detail-value">${Qt(a,"JMD")}</span>
          </div>

          <div class="transaction-detail-row">
            <span class="transaction-detail-label">Fee</span>
            <span class="transaction-detail-value">${Qt(50,"JMD")}</span>
          </div>

          <div class="transaction-detail-divider"></div>

          <div class="transaction-detail-row total-row">
            <span class="transaction-detail-label">Total Deducted</span>
            <span class="transaction-detail-value total-value">${Qt(l,"JMD")}</span>
          </div>
        </div>
        
        <div class="form-field">
          <div class="info-card info-card-blue">
            <h4 class="info-card-title">Instructions:</h4>
            <ul class="info-card-list">
              <li>• Visit any NovaPay agent within 24 hours</li>
              <li>• Bring a valid ID</li>
              <li>• Provide this pickup code</li>
              <li>• Code expires in 24 hours</li>
            </ul>
          </div>
        </div>
        
        <div class="form-field">
          <button class="btn-primary-modern" data-action="agent-complete" data-total="${l}">
            Done
          </button>
        </div>
      </div>
    </div>
  `}const hy=document.createElement("style");hy.textContent=`
  /* Withdraw method cards styling */
  .withdraw-methods {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .withdraw-method-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .withdraw-method-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .withdraw-method-card:active {
    transform: translateY(0);
  }
  
  .withdraw-method-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(84, 58, 248, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorssecondary-100);
    flex-shrink: 0;
  }
  
  .withdraw-method-info {
    flex: 1;
  }
  
  .withdraw-method-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .withdraw-method-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
    margin-bottom: 4px;
  }
  
  .withdraw-method-meta {
    font-size: 12px;
    color: var(--colorsalertssuccess);
  }
  
  /* Balance card styling */
  .balance-card {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
  }
  
  .balance-amount {
    font-size: 28px;
    font-weight: 700;
    color: var(--colorssecondary-100);
    margin-bottom: 8px;
  }
  
  .balance-label {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  /* Bank account cards styling */
  .bank-accounts-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .bank-account-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .bank-account-card:hover {
    border-color: var(--colorssecondary-100);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.1);
  }
  
  .bank-account-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(84, 58, 248, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorssecondary-100);
    flex-shrink: 0;
  }
  
  .add-icon {
    background: rgba(0, 197, 102, 0.1);
    color: var(--colorsalertssuccess);
  }
  
  .bank-account-info {
    flex: 1;
  }
  
  .bank-account-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .bank-account-number {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  
  .bank-account-radio {
    width: 20px;
    height: 20px;
    accent-color: var(--colorssecondary-100);
    margin-right: 8px;
  }
  
  /* Pickup code styling */
  .pickup-code-card {
    background: rgba(84, 58, 248, 0.1);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .pickup-code-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--colorscharade-80);
    margin-bottom: 8px;
  }
  
  .pickup-code {
    font-family: monospace;
    font-size: 28px;
    font-weight: 700;
    color: var(--colorssecondary-100);
    letter-spacing: 2px;
  }
  
  /* Info card styling */
  .info-card {
    background: #F8F9FF;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }
  
  .info-card-blue {
    background: #EBF3FF;
  }
  
  .info-card-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-90);
    margin-bottom: 12px;
  }
  
  .info-card-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .info-card-list li {
    font-size: 14px;
    color: var(--colorscharade-80);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  
  .success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(0, 197, 102, 0.1);
    color: var(--colorsalertssuccess);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  
  .text-center {
    text-align: center;
  }
  
  /* Match dashboard balance section */
  .withdraw-balance-section {
    padding: 0;
    margin-bottom: 24px;
  }
  
  .np-balance-section {
    padding: 0 24px;
    margin-bottom: 24px;
  }
  
  .np-balance-title {
    font-size: 14px;
    color: var(--colorscharade-60);
    margin-bottom: 8px;
  }
  
  .np-balance-amount {
    font-size: 28px;
    font-weight: 700;
    color: var(--colorscharade-100);
    margin: 0;
  }
`;document.head.appendChild(hy);const Rw="/assets/Teddy_Lrg-C3LzF-C-.png";function py(){k("#app"),V.card.hasCard?Lw():zw()}function my(){const a=Array.isArray(V.card.savedCards)?V.card.savedCards:[];return`
    <section class="current-cards-section">
      <h3 class="section-title-sm current-cards-title">Current Cards</h3>
      <div class="current-cards-list">
        ${a.length>0?a.map((r,u)=>{const f=r.label||"Saved Card",d=r.last4||(r.masked?String(r.masked).slice(-4):""),v=r.verified?"Verified":"Awaiting confirmation",p=r.verified?"card-status-pill-success":"card-status-pill-pending";return`
            <button
              type="button"
              class="current-card-row"
              data-card-id="${r.id||""}"
              data-card-index="${u}"
            >
              <div class="current-card-main">
                <div class="current-card-title">${f}</div>
                <div class="current-card-subtitle">•••• ${d}</div>
              </div>
              <span class="card-status-pill ${p}">${v}</span>
            </button>
          `}).join(""):`
        <div class="current-card-empty">
          <p class="current-card-empty-title">No cards added yet</p>
          <p class="current-card-empty-subtitle">Add a card or get your virtual card to start using NovaPay.</p>
        </div>
      `}
      </div>
    </section>
    <div class="current-cards-divider"></div>
    <div class="current-card-modal-backdrop" id="currentCardModal" aria-hidden="true">
      <div class="current-card-modal" role="dialog" aria-modal="true">
        <h3 class="current-card-modal-title" id="currentCardModalTitle">Card details</h3>
        <p class="current-card-modal-masked" id="currentCardModalMasked">&bull;&bull;&bull;&bull; 0000</p>
        <div class="current-card-modal-status-row">
          <span class="card-status-pill card-status-pill-pending" id="currentCardModalStatusPill">Awaiting confirmation</span>
        </div>
        <button class="btn-primary-modern btn-full current-card-modal-primary" id="currentCardUseBtn">
          Use this card (coming soon)
        </button>
        <button class="btn btn-secondary btn-full current-card-modal-close" id="currentCardCloseBtn">
          Close
        </button>
      </div>
    </div>
  `}function zw(){const a=k("#app");a.innerHTML=`
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
        ${my()}
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
  `,D(a,'[data-testid="btnActivateCard"]',"click",()=>{const i=k('[data-testid="btnActivateCard"]');i.textContent="Activating...",i.disabled=!0,setTimeout(()=>{V.card.hasCard=!0,V.card.masked="•••• •••• •••• 1234",V.card.expiry="12/28",V.card.frozen=!1,tn(),q("Virtual card activated successfully!"),py()},2e3)}),vy()}function Lw(){const a=k("#app");V.txs.filter(i=>i.type==="CARD").slice(0,5),a.innerHTML=`
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
        ${my()}
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
            ${V.card.masked}
          </div>
          
          <div class="card-details">
            <div>
              <div class="text-xs opacity-80">VALID THRU</div>
              <div class="font-semibold">${V.card.expiry}</div>
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
            ${V.card.frozen?"🔓 Unfreeze":"🔒 Freeze"} Card
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
            ${V.card.linkedAccounts&&V.card.linkedAccounts.length?V.card.linkedAccounts.map(i=>`
              <div class="linked-item">
                <div class="linked-main">
                  <div class="linked-label">${i.label}</div>
                  <div class="linked-meta">${i.type==="BANK"?"Bank account":"Card"} · ${i.masked||""}</div>
                </div>
                <div class="linked-status">${i.status||"Active"}</div>
              </div>
            `).join(""):`
              <div class="linked-empty">
                <img src="${Rw}" alt="" class="linked-empty-img" />
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
  `,vy()}function vy(){const a=k("#app");D(a,'[data-action="nav-back"]',"click",()=>Y("/dashboard")),D(a,"#toggleCvv","click",()=>{const i=k("#cvvDisplay"),l=k("#toggleCvv");i.textContent==="•••"?(i.textContent="123",l.textContent="🙈 Hide CVV"):(i.textContent="•••",l.textContent="👁️ Reveal CVV")}),D(a,"#toggleFreeze","click",()=>{const i=k("#toggleFreeze");V.card.frozen=!V.card.frozen,tn(),V.card.frozen?(i.textContent="🔓 Unfreeze Card",q("Card frozen successfully")):(i.textContent="🔒 Freeze Card",q("Card unfrozen successfully"))}),D(a,"#addToWallet","click",()=>{q("Add to Wallet feature coming soon!")}),D(a,"#addBankCard","click",()=>{q("Add Bank/Card linking is coming soon!")}),D(a,"#setLimits","click",()=>{q("Set Limits feature coming soon!")}),D(a,"#cardSettings","click",()=>{q("Card Settings feature coming soon!")}),D(a,".current-card-row","click",i=>{const l=i.target.closest(".current-card-row");if(!l)return;const r=Array.isArray(V.card.savedCards)?V.card.savedCards:[],u=l.dataset.cardId,f=l.dataset.cardIndex;let d=null;if(u&&(d=r.find(H=>H&&H.id===u)||null),!d&&f!=null){const H=Number(f);!Number.isNaN(H)&&r[H]&&(d=r[H])}if(!d)return;const v=k("#currentCardModal"),p=k("#currentCardModalTitle"),m=k("#currentCardModalMasked"),g=k("#currentCardModalStatusPill");if(!v||!p||!m||!g)return;const b=d.label||"Saved Card",S=d.last4||(d.masked?String(d.masked).slice(-4):""),L=d.verified?"Verified":"Awaiting confirmation";p.textContent=b,m.textContent=`•••• ${S}`,g.textContent=L,g.classList.remove("card-status-pill-success","card-status-pill-pending"),g.classList.add(d.verified?"card-status-pill-success":"card-status-pill-pending"),v.classList.add("is-visible"),v.setAttribute("aria-hidden","false")}),D(a,"#currentCardCloseBtn","click",()=>{const i=k("#currentCardModal");i&&(i.classList.remove("is-visible"),i.setAttribute("aria-hidden","true"))}),D(a,"#currentCardModal","click",i=>{if(i.target.id!=="currentCardModal")return;const l=k("#currentCardModal");l&&(l.classList.remove("is-visible"),l.setAttribute("aria-hidden","true"))}),D(a,"#currentCardUseBtn","click",()=>{q("Using this card for payments is coming soon!")})}const gy=document.createElement("style");gy.textContent=`
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
  
  .current-cards-section {
    margin-bottom: 16px;
  }
  .current-cards-title {
    margin-bottom: 8px;
  }
  .current-cards-list {
    border-radius: 16px;
    background: #FFFFFF;
    padding: 4px 0;
  }
  .current-card-row {
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }
  .current-card-row + .current-card-row {
    border-top: 1px solid var(--border);
  }
  .current-card-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .current-card-title {
    font-size: 15px;
    font-weight: 600;
  }
  .current-card-subtitle {
    font-size: 13px;
    color: var(--text);
    opacity: 0.7;
  }
  .card-status-pill {
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }
  .card-status-pill-success {
    background: var(--colorsalertssuccess);
    color: #FFFFFF;
  }
  .card-status-pill-pending {
    background: #FFF4E5;
    color: #8A6116;
  }
  .current-card-empty {
    padding: 16px 0;
    text-align: left;
  }
  .current-card-empty-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .current-card-empty-subtitle {
    font-size: 13px;
    color: var(--text);
    opacity: 0.7;
  }
  .current-cards-divider {
    height: 1px;
    background: var(--border);
    margin: 12px 0 24px;
  }
  .current-card-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 16px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 60;
  }
  .current-card-modal-backdrop.is-visible {
    opacity: 1;
    pointer-events: auto;
  }
  .current-card-modal {
    width: 100%;
    max-width: 480px;
    background: #FFFFFF;
    border-radius: 20px 20px 12px 12px;
    padding: 16px 16px 20px;
    box-shadow: 0 -8px 30px rgba(15, 23, 42, 0.35);
  }
  .current-card-modal-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .current-card-modal-masked {
    font-size: 14px;
    color: var(--text);
    opacity: 0.8;
    margin-bottom: 8px;
  }
  .current-card-modal-status-row {
    margin-bottom: 16px;
  }
  .current-card-modal-primary {
    margin-bottom: 8px;
  }
  .current-card-modal-close {
    display: block;
    width: 30%;
    max-width: 220px;
    margin: 0 auto;
    text-align: center;
  }
`;document.head.appendChild(gy);function Uw(){const a=k("#app");a.innerHTML=`
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
            <h3 class="text-lg font-semibold">${V.session.user.name}</h3>
            <p class="text-muted">${V.session.user.email}</p>
            <p class="text-muted text-sm">${V.session.user.phone}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${V.session.kycTier==="TIER_2"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}">
            ${V.session.kycTier==="TIER_2"?"Verified":"Basic Account"}
          </span>
        </div>
      </div>
      
      <!-- KYC Section -->
      ${V.session.kycTier!=="TIER_2"?`
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
  `,Ow()}function Ow(){const a=document.querySelector("#app");D(a,'[data-action="nav-back"]',"click",()=>Tw());const i={"#completeKyc":"KYC verification process coming soon!","#enableBiometric":"Biometric authentication coming soon!","#changePin":"Change PIN feature coming soon!","#notifications":"Notification settings coming soon!","#privacy":"Privacy settings coming soon!","#helpCenter":"Help Center coming soon!","#contactSupport":"Support chat coming soon!","#feedback":"Feedback form coming soon!","#terms":"Terms of Service coming soon!","#privacy-policy":"Privacy Policy coming soon!"};for(const[l,r]of Object.entries(i))D(a,l,"click",()=>q(r));D(a,'[data-testid="btnLogout"]',"click",()=>{confirm("Are you sure you want to sign out?")&&(p2(),q("Signed out successfully"),Y("/landing"))})}const yy=document.createElement("style");yy.textContent=`
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
`;document.head.appendChild(yy);const vg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGQSURBVHgBzZeNbYMwFISPTMAI3iDdoCOEEbJB2QA2SDZIN0gyAeoEYQNgArqB6wObuq349VOVT3rkTzqO94xzANPEpjJThanKlBaq1mqmphQ2oKyA/qe6YIXRN3uFwSeO41gfj0d9vV51VVXa8Xg8uu/4G352NZ0zl0kYYyVJotu21XPQ+C+jGSY6J2LudDrptWRZ5mv86aSC0Fh5oq3wwvA9buUbvEiY46hC4dKweoXfPZHR+jfCVrhueXNZzXhnDgkEMN2DUgqhGHMwXXQfUxo8QIDDQUSmwzP4SoMvEECie479fj/IRuhnHYxZPpAkiqLudYcnhwZrCFDXNaQoy9K9/RQz6IkG0zTNIEuDHxDgfr9DitvtNsjywMwXvElzc10SDubgZu/pKue0kDDJv6lQvGRz8btKpyJh4Xw+663keT4aFkgqYZDFE62FF+ZpjAbXXMokR7UkPHDdeglGWw+TpBAatzPKeM+Y76BxF/m95LIo8juUqXcpkwuqQMDTXWoFxLqK/hGWmjn6bW6ULyka/cC57vi0AAAAAElFTkSuQmCC",gg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKCSURBVHgBzZf9bRpBEMXf7i3mbLAMfyAHlEjQQVJB0kHSQZQK7FQAdEAHSQl2B3YFcQcgJQpWHMs4fB33NZlZ+yxbGJRwK8s/6cTOabV6Nzu781BYQ7/fr/h++YCAdwTVBKgJFyg1UkRnKeE4UvFRq14frJz62MvhcNgkmC8iDE+C+hoi6j4mdEng+fnlQQLqgKiitUaxuIVtfwvGGBhP2zlRnCBJEgRBiNk8gBuNGKk06TYaL3oPX99jOLxsp0g7Mvb9Iqp7Zd4NtXZdETqezJ0J5RR06vVad0mgzRylVv3ebgml0jb+h/FkZh8XKEo+Z5m0AqXmUlX4Jtu6W96BPJswmc7xZzxFbni7Q4rfSE3aokp1oS3idrb9jcUJZc66lEZuCJUiH1Kr1WYPpi/Bfq0Kz/OQh5Tvjl+/r/g3RV7CwFR1QuaDBJK9vOIErRV8PvkuMFvhoaz3XgLfL8AVvu9GoKf1W00KryUwDrKXUTBu1pLupaUgJZCL2BWes4+lpsYzhwWqgQySJP+py5BW6AS+D/mM0OBm0QiukPbnAiKcaU7cqQRB4E6gmAgnUHKs49D0bhZdsGJCXqRUXBmHSNGRbrWqI27IJymLu7oeIy+uDIN4xLterBB/koKUrZlyw88jzkn2xCywgZWhFVhnpZTCvrhmN7JJFqazwFn2REvmrh+40e/Diw4rbss4czaet/6qJFsaE1vDLmDD3H1V3+9k8ZJd/vHz4lBpFnnbYUSoNH9j9F23kYMQRTHmixCLxcI6mNzwtkrmXjZqqy1/hliwBF5HQX3EE8CfdxLxOfinP033sULFjrHjUWIqbrOaHzUgbhAs7DQOJr1WqzVaNfMvKPAmQnPv/FoAAAAASUVORK5CYII=",Vw="/assets/NoNotifications-D5ZjIhfU.png";function by(){const a=k("#app"),i=!!V?.preferences?.notificationsEnabled,l=Array.isArray(V.notifications)&&V.notifications.length>0,r=l?"":`
        <div class="notifications-empty-state">
          <img src="${Vw}" alt="No notifications" class="notifications-empty-img" />
        </div>
      `,u=l?`
        <div class="notifications-list">
          ${V.notifications.map(d=>{const v=d.title||"NovaPay",p=Hw(d.createdAt),m=d.message||"",b=!d.isRead?"notification-status-dot notification-status-dot-unread":"notification-status-dot";return`
                <div class="notification-card">
                  <div class="notification-main">
                    <div class="notification-icon">
                      <span class="notification-icon-letter">N</span>
                    </div>
                    <div class="notification-content">
                      <div class="notification-header-row">
                        <div class="notification-title">${yg(v)}</div>
                        <div class="notification-time">${p}</div>
                      </div>
                      <div class="notification-text">${yg(m)}</div>
                    </div>
                  </div>
                  <span class="${b}"></span>
                </div>
              `}).join("")}
        </div>
      `:"";a.innerHTML=`
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
              <img src="${i?vg:gg}" alt="Notifications toggle" class="np-toggle-img" id="notificationsToggleImg" />
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
  `;const f=document.querySelector("#app");D(f,"#btnBack","click",()=>ca()),D(f,"#btnToggleNotifications","click",()=>{const v=!!!V?.preferences?.notificationsEnabled;V.preferences||(V.preferences={}),V.preferences.notificationsEnabled=v,tn();const p=document.getElementById("notificationsToggleImg");p&&(p.src=v?vg:gg),q(`Notifications ${v?"enabled":"disabled"}`)}),D(f,"#btnMarkAllRead","click",()=>{if(!(Array.isArray(V.notifications)&&V.notifications.length>0)){q("No notifications to mark as read");return}V.notifications=[],tn(),q("All notifications marked as read"),by()})}function Hw(a){try{return(a?new Date(a):new Date).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}).toLowerCase()}catch{return""}}function yg(a){return a==null?"":String(a).replace(/[&<>"']/g,i=>{switch(i){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return i}})}function qw(){const a=k("#app");a.innerHTML=`
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
  `,D("click","#btnBack",()=>ca()),D("click","#btnFilter",()=>q("Filter options coming soon")),document.querySelectorAll(".filter-tab").forEach(i=>{i.addEventListener("click",l=>{document.querySelectorAll(".filter-tab").forEach(u=>u.classList.remove("active")),l.target.classList.add("active");const r=l.target.dataset.filter;bg(r)})}),bg("all")}async function bg(a="all"){const i=k("#txContent");try{const l=await Ya("/wallet/transactions");if(!l||l.length===0){i.innerHTML=Qw();return}let r=l;a==="income"?r=l.filter(f=>f.kind==="DEPOSIT"||f.kind==="RECEIVE"):a==="expense"&&(r=l.filter(f=>f.kind==="WITHDRAW"||f.kind==="TRANSFER"||f.kind==="BILL"));const u=jw(r);i.innerHTML=Gw(u)}catch(l){console.error("[TRANSACTIONS]",l),i.innerHTML=_w()}}function jw(a){const i={};return a.forEach(l=>{const r=new Date(l.createdAt),u=Fw(r);i[u]||(i[u]=[]),i[u].push(l)}),i}function Fw(a){const i=new Date,l=new Date(i);return l.setDate(l.getDate()-1),a.toDateString()===i.toDateString()?"Today":a.toDateString()===l.toDateString()?"Yesterday":a.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Gw(a){return Object.entries(a).map(([i,l])=>`
    <div class="tx-group">
      <div class="tx-date-header">${i}</div>
      ${l.map(r=>Yw(r)).join("")}
    </div>
  `).join("")}function Yw(a){const i=a.kind==="DEPOSIT"||a.kind==="RECEIVE",l=i?"tx-icon-green":a.kind==="TRANSFER"?"tx-icon-blue":a.kind==="BILL"?"tx-icon-orange":"tx-icon-red",r=i?"tx-amount-positive":"tx-amount-negative",u=i?"+":"-",f=Jw(a.kind),d=Xw(a.kind),v=Pw(a.createdAt),p=(Number(a.amount||0)/100).toFixed(2);return`
    <div class="tx-card">
      <div class="tx-icon-wrapper ${l}">${f}</div>
      <div class="tx-details">
        <div class="tx-label">${d}</div>
        <div class="tx-time">${v}</div>
        ${a.reference?`<div class="tx-ref">Ref: ${a.reference}</div>`:""}
      </div>
      <div class="tx-amount-wrapper">
        <div class="tx-amount ${r}">${u}$${p}</div>
        <div class="tx-currency">${a.currency}</div>
      </div>
    </div>
  `}function _w(){return`
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
  `}function Qw(){return`
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
  `}function Jw(a){const i={DEPOSIT:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',WITHDRAW:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',TRANSFER:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',BILL:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',RECEIVE:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'};return i[a]||i.TRANSFER}function Xw(a){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[a]||a}function Pw(a){try{return new Date(a).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}catch{return"Recently"}}function Kw(){const a=k("#app"),i=2e4,l=1e5,r=Math.round(i/l*100),u=`${r}%`,f=2;a.innerHTML=`
    <div class="finances-container">
      <header class="finances-header">
        <button class="btn-back" id="btnBackFinances" type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 class="finances-title">Finances</h1>
      </header>

      <div class="finances-content">
        <!-- My Savings Header Section -->
        <div class="savings-header">
          <h2 class="my-savings-title">My Savings</h2>
          <button class="new-goal-btn" id="btnNewGoal">New Goal</button>
        </div>

        <!-- Savings Goal Bar -->
        <div class="savings-goal-bar">
          <div class="savings-goal-info">
            <div class="savings-amount-container">
              <div class="savings-label">Total Savings</div>
              <div class="savings-amount">$${i.toLocaleString()}</div>
            </div>
            <div class="savings-amount-container text-right">
              <div class="savings-label">Target Savings</div>
              <div class="savings-amount">$${l.toLocaleString()}</div>
            </div>
          </div>
          <div class="savings-progress-container">
            <div class="savings-progress-bar" style="width: ${u}"></div>
            <div class="savings-progress-marker"></div>
          </div>
        </div>

        <!-- Savings Stats -->
        <div class="savings-stats">
          <div class="savings-stat-item">
            <div class="savings-stat-icon savings-rate-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div class="savings-stat-value">${r}%</div>
            <div class="savings-stat-label">Saving Rate</div>
          </div>
          <div class="savings-stat-item">
            <div class="savings-stat-icon goals-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="savings-stat-value">${f}</div>
            <div class="savings-stat-label">Goals</div>
          </div>
        </div>

        <!-- My Goals Section -->
        <div class="my-goals-section">
          <div class="my-goals-header">
            <h3 class="my-goals-title">My Goals</h3>
            <button class="select-btn" id="btnSelectGoals">
              Select
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <!-- Goal Cards -->
          <div class="goal-cards">
            <div class="goal-card">
              <div class="goal-progress-bar"></div>
              <!-- Goal content will be added dynamically -->
            </div>
            <div class="goal-card">
              <!-- Goal content will be added dynamically -->
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item nav-item-savings nav-item-active" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span>Savings</span>
        </button>

        <button class="nav-item nav-item-budget" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
          </div>
          <span>Budget</span>
        </button>

        <div class="nav-item nav-item-spacer" aria-hidden="true"></div>

        <button class="nav-item nav-item-bills" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <span>Bills</span>
        </button>

        <button class="nav-item nav-item-learn" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span>Learn</span>
        </button>
      </nav>
      <div class="home-indicator" aria-hidden="true"></div>
    </div>
  `,D("click","#btnBackFinances",()=>{Y("/dashboard")}),D("click","#btnNewGoal",()=>{q("New goal creation coming soon")}),D("click","#btnSelectGoals",()=>{q("Goal selection coming soon")}),D("click",".nav-item-savings",()=>{window.scrollTo({top:0,behavior:"smooth"})}),D("click",".nav-item-budget",()=>{q("Budget section coming soon")}),D("click",".nav-item-bills",()=>{q("Bills section coming soon")}),D("click",".nav-item-learn",()=>{q("Financial education section coming soon")})}function Zw(){const a=k("#app"),i=V?.session?.kycTier||"TIER_1";a.innerHTML=`
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
        <div class="kyc-status-badge ${Iw(i)}">
          ${Ww(i)}
          <span>${$w(i)}</span>
        </div>
        <h2 class="kyc-status-title">Your Verification Status</h2>
        <p class="kyc-status-desc">${tT(i)}</p>
      </div>

      <!-- Verification Tiers -->
      <div class="kyc-tiers">
        <h3 class="section-title-sm">Verification Levels</h3>
        
        <!-- Tier 1 -->
        <div class="kyc-tier-card ${i==="TIER_1"?"active":i==="TIER_2"||i==="TIER_3"?"completed":""}">
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
            ${i==="TIER_1"||i==="TIER_2"||i==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="1">Start</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Email verification</li>
            <li>Phone number</li>
            <li>Basic profile information</li>
          </ul>
        </div>

        <!-- Tier 2 -->
        <div class="kyc-tier-card ${i==="TIER_2"?"active":i==="TIER_3"?"completed":""}">
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
            ${i==="TIER_2"||i==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="2">Upgrade</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Government-issued ID</li>
            <li>Proof of address</li>
            <li>Selfie verification</li>
          </ul>
        </div>

        <!-- Tier 3 -->
        <div class="kyc-tier-card ${i==="TIER_3"?"active":""}">
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
            ${i==="TIER_3"?'<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>':'<button class="kyc-tier-btn" data-tier="3">Upgrade</button>'}
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
  `,D("click","#btnBack",()=>ca()),document.querySelectorAll("[data-tier]").forEach(l=>{l.addEventListener("click",r=>{const u=r.target.dataset.tier;eT(u)})})}function Iw(a){return{TIER_1:"tier-basic",TIER_2:"tier-standard",TIER_3:"tier-premium"}[a]||"tier-basic"}function Ww(a){const i={TIER_1:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',TIER_2:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',TIER_3:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>'};return i[a]||i.TIER_1}function $w(a){return{TIER_1:"Basic",TIER_2:"Standard",TIER_3:"Premium"}[a]||"Basic"}function tT(a){return{TIER_1:"You have basic verification. Upgrade to unlock higher limits and premium features.",TIER_2:"You have standard verification. Upgrade to premium for unlimited transactions.",TIER_3:"You have premium verification. Enjoy unlimited transactions and all features."}[a]||"Complete verification to unlock all features."}function eT(a){q(`Starting Tier ${a} verification process...`),setTimeout(()=>{q("Verification process will be available soon")},1e3)}function nT(){const a=k("#app"),i=V?.session?.user||{},l=i.name||i.email?.split("@")[0]||"User",r=i.email||"",u=l.substring(0,2).toUpperCase(),d=`Hi, ${l.split(" ")[0]||l}!`,v=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),p=v?'<img src="'+v+'" alt="'+l+'" class="settings-avatar-img" />':u;a.innerHTML=`
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
        <div class="settings-avatar">${p}</div>
        <h2 class="settings-name">${xg(d)}</h2>
        <p class="settings-email">${xg(r)}</p>
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
  `;const m=document.querySelector("#app");D(m,"#btnBack","click",()=>ca()),D(m,"#btnProfile","click",()=>Y("/personal-info")),D(m,"#btnKYC","click",()=>Y("/kyc")),D(m,"#btnSecurity","click",()=>q("Security settings coming soon")),D(m,"#btnLanguage","click",()=>q("Language settings coming soon")),D(m,"#btnHelp","click",()=>q("Help center coming soon")),D(m,"#btnTerms","click",()=>q("Terms & Privacy coming soon")),D(m,"#btnAbout","click",()=>q("NovaPay v1.0.0 - Modern Digital Wallet")),D(m,"#btnLogout","click",()=>{confirm("Are you sure you want to log out?")&&(Eg(),q("Logged out successfully"),Y("/login"))}),D(m,"#toggleNotifications","change",g=>{const b=g.target.checked;q(`Notifications ${b?"enabled":"disabled"}`)})}function xg(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}const qo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJQSURBVHgB5ZRNaBNBGIbfzSZpGtM0NWlqSGpiMawVitY/9CQo4qla9CSK0YMFsQc9phcjaHOR1oInD0KKHjwlF2sFfyoB8QcPPYhJtZIfQyBNdDdNmybpGmcGW9zY2NaT4AvDDjsfz7zzzXwf8K+LSz7UVO2tFYzMWHHlSzvWKxO/iLvOOHqbRaRmNOAn4y7fNmcJJ50ijpskjOeNkGT1mmAubQkvhSj2b5hDKGxE/y0HeK3e6guFm8FxwLGuPHpNIkKSaVWox5xDsGMamzSL8N+3YuhBK8oVDrzFYvHRgDcf9Jid59HTncc5EhxZ0CFa0q0Iu2pLY9ieRKXIoe+mA2OvjMtry0CqyelGPH1nwJEdBVxwZEFtvyg0KfL1aOsneDaSDeM6eAbbEUkoN1UAqbKSmkEP7y6gp02CSS3j9ZwBgm4Bz91T2NlYxOjjFnjv2FhsrThBEKpYQU367/D3pRk4VtYSdzIbNF+j4y2op7rAJQUGktjXOc/mA8RVMGz8UzhU9Raow9uXUwxGHVINEsdnj37DuoH0oQdvxNhxAzkzdkW2o+N9FwN7z2TYWDNwL3EUvB6D3VLBtbQN5xMuiDLPYIc+Cpggt05dPhn+zDauleKWaeDQpTSKKhUuJjeTcmxTBFNw4KuZzekLoCeIJBqQymp+B3pPZ9B/IsecHJjqVLy/WtG1WLmBQU8dFMkfDm8jerbG7el2V5eSPzFrIEfcgvjPS1hNLm0Zz9xR9g2S8vXfs5JuM0a6DcnXSIZ0m9TfdBuZlSGt7V+P/h/pB40e48T9pTDvAAAAAElFTkSuQmCC",jo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEMSURBVHgB5ZO9qsIwFMf/rYXeD2y5cLfW4a6976EvoC8g7oK4io8grqKuguLooKuDvoA6OrRuTlVU/Gg99RutJIKD4C9DDiH55SQnAV4dwQzp7vXg79AED+O/0M2YiCfz+kKJNcG1bczLJbgTG9+ZLGs6WzjL50hY3MUb04RSKD4uXHU72IwsOJZFKZ4fgWQYWFC2UBUENJ1f6B1zmk7tYlE/L1zUa/tNCLVS9RX6FsUh4Sk+CC5jUVGw7vfALfyIxvDT7iCg3x5LMv6hNpr4jCd8hXeL4sm+kimsB30IwSAcqrJATdQ0342YQg+ZMpWpX7aa8EojhyNgwXw2x2xd8MEnpHvj5elf7w3ZAnBaTOTFmblEAAAAAElFTkSuQmCC",Fo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFhSURBVHgB5ZJPKARhGMafqVFqYuNAirI2cVl/L3LZclBal3XawyYpadxWXJSyTuKwx01u5OBEUcqmKNZcbCFbyFxM1vqfta12VmO+tyZJzcxhDspTM9/X0zu/3qdngL8urqVnVbM7PKcswpuXTWd49gqLnci+F7CfUDAudmB2QUJwoPmXJwzPwFVfCssNGz0V8HXXokwoQTan0nkpv6KmWqD7bSaHtfULRLue0VZZsN6QyPrDYMmTDPy9DYD27V1dvxD4M3UOlX+yBvYTQKN48xEfxibiOtTzwwuENiBMR+BqrYJlZHYJBpoILE7uYiXWh2jsmCIzLyRu07CdUgjISmGRtnZkjAx6sbR8RrFZZMNjpUz5y9FuUQpFZh8xYPL0HnuHCp1GOYaX1osppm6g3pmXwg2F47b/w9GHTbg/0ubAfFGzDbQj/tFdByfFvR0knN1QlY7gpHSgBCfleCn/UF/rXJ4Rji0dqQAAAABJRU5ErkJggg==",Go="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIHSURBVHgB5VPNTxNxEH39WaNGjPVmuLh4V1b9B1r04sly0JiYGD/RG+LZKBy56GKMcMD4ETFepGpMMNGwBEi4EAgfh5YUukAaCCTAAfq1pcPONF2akrYXDiS85JfdnZm8fTO/N8CBx5YHlKjTaHt8nBidnyfpYkOPnBftI5SLxYhr+OSsmMQK+a8/wmQbhptPBvykjtwIgiwLqcuXYLe14endC/jw+hpqz54sK+JUzVF0v7yCm0NdyLQ8k5i3uRnH+03g/adJyrS+cv+SCgZFVXxpkzqdXKlCji2OTFNS1924bbzJd+fkwNIftPyjhe9/KKlpVBgBEzFKCXk0xXX8HV/eFA7mUix3dGIFTb+zsLp7oep1GUHyfB2yHR172uVYbt6SOm5xDLV4+Py/cAioCkoVVoM3FQhUdAFtbLjv6Xv3UQ0e/jP2EV7l91ctyg0MyFPpOuDzVS7e7xmq+qvfcP3OL0Si6zIvnmlCeeRkDWOvAKcm3djo1vB7PBwXDuYC+4dNzEoK/uLDZmd/lSoMR9dESfEysB/Z7MwlLds/Q5Q448snnacdClH7u9Gyu8zbJaTOhhSTZk2TFO9vxpHNrXg0DWt9w3gyWIOe3kjZuXd9mcKtpj6s3n6ME3MxqHOaLEO6IQCHsDV/g85tT3/8i0dvo7uur4DI7LpsyMz2aRwzTSE9pNgBbgwluEY7oJgAAAAASUVORK5CYII=",xy="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIASURBVHgBnZJdSFNhGMd/55wd2RkznBUG4kXWgiLSiyAKwj5A8KpdxIpgJMyLukgpMISGSBdeBF0E9kVGliy0IFoZdhFBEV6IMkgKpUWQszwJNTbPCrd2OuesDabC9Pzh5eX9Pe/78H+e5xU0AV3o7iF2qp3Onrc8HTxGThZQ44v4AhHOt2zEH+7C1P7qTspJfHRlFP3+ANt7L3AztLckeCOwCf/1MwgNDXy+/YS1SNhzJKy3HawkGOmGRAIx9sVyKC78IufdinCug+HdJ+kfnCKlZcon/J3V9eXQSphZgdnX/JByEs3Hy1ch6Wq8bEKz+VpiySrRLLfgzNyt839m3luLHP0Ppug4IJE77YeqKsSJaMmF3NHDFh/xXS4y7zYPrYFdKIKOJDtIZiTm4klu3ZlEDNXM4PY1IzQ1ce341eKj76rGxXtfUcMj1rCCA+3FWKVbJrm5Fm+9Qn2djLtGwb3Fk69MD7Yy728jUHGCodfzJe7ejMU52xdDffEOGhtLYrLhbGi8j8iH54xP38XlyHPr27BO7TBKDvW28E2DdDbPXAs/6Lr0Cgc2ZLaj2mm4sSzlWTT609pFbCi1uMT7x8MoMjglY7LqJ14+m7BithzWKgkqpieJjypIToU/M2Mc8mT5OLfTXg8LqtuQNobxl9mUi7TxdWw7LGg26VrB/gF/R7sO7T1rtgAAAABJRU5ErkJggg==";function aT(){const a=k("#app"),i=V?.session?.user||{},r=(i.name||"").split(" ").filter(Boolean),u=r[0]||"",f=r.slice(1).join(" "),d=i.firstName||u,v=i.lastName||f,p=i.addressStreet||"",m=i.addressCity||"",g=i.addressStateParish||"",b=i.addressCountry||"",S=i.phone||"",L=i.email||"";a.innerHTML=`
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
                value="${oa(d)}"
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
                value="${oa(v)}"
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
                value="${oa(p)}"
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
                value="${oa(m)}"
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
                value="${oa(g)}"
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
                value="${oa(b)}"
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
                value="${oa(S)}"
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
                value="${oa(L)}"
              />
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSavePersonal">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  `;const H=document.querySelector("#app");D(H,"#btnBackPersonal","click",()=>ca());const Q=()=>{const J=k("#addressCountry"),F=k("#countryFlagIcon");if(!J||!F)return;const K=iT(J.value);K?(F.src=K,F.style.display=""):(F.removeAttribute("src"),F.style.display="none")};Q(),D(H,"#addressCountry","input",()=>Q()),D(H,"#personalInfoForm","submit",J=>{if(J.preventDefault(),!V.session){q("Please sign in again to update your information."),ca();return}const F=k("#firstName"),K=k("#lastName"),G=k("#addressStreet"),at=k("#addressCity"),W=k("#addressStateParish"),lt=k("#addressCountry"),$=k("#phone"),et=k("#email"),Mt=(F?.value||"").trim(),jt=(K?.value||"").trim(),ee=(G?.value||"").trim(),ne=(at?.value||"").trim(),en=(W?.value||"").trim(),xe=(lt?.value||"").trim(),he=($?.value||"").trim(),R=(et?.value||"").trim(),j=V.session.user||{},X=[];Mt&&X.push(Mt),jt&&X.push(jt);const ft=X.join(" ")||j.name||"",vt={...j,firstName:Mt,lastName:jt,addressStreet:ee,addressCity:ne,addressStateParish:en,addressCountry:xe,phone:he,email:R||j.email,name:ft};V.session={...V.session,user:vt},tn(),q("Personal information updated."),ca()})}function iT(a){if(!a)return"";const i=String(a).trim().toLowerCase();return i==="jamaica"?qo:i==="canada"?jo:i==="united states"||i==="usa"||i==="us"?Fo:i==="united kingdom"||i==="uk"||i==="great britain"?Go:i==="cayman islands"||i==="cayman island"?xy:""}function oa(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function sT(a,{onClick:i}={}){const l=document.createElement("div");return l.className="biller-card",l.dataset.billerId=a.id,l.innerHTML=`
    <div class="biller-card-main">
      <div class="biller-card-icon">${a.icon||""}</div>
      <div class="biller-card-info">
        <div class="biller-card-name">${a.name}</div>
        ${a.category?`<div class="biller-card-category">${a.category}</div>`:""}
      </div>
    </div>
    <div class="biller-card-chevron">→</div>
  `,typeof i=="function"&&l.addEventListener("click",()=>i(a)),l}if(!document.getElementById("biller-card-styles")){const a=document.createElement("style");a.id="biller-card-styles",a.textContent=`
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
  `,document.head.appendChild(a)}function Sg(a,i,{onSelect:l}={}){a&&(a.innerHTML="",i.forEach(r=>{const u=sT(r,{onClick:l});a.appendChild(u)}))}const Ag=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];function lT(){const a=k("#app");if(!a)return;a.innerHTML=`
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
  `;const i=k("#billerList");Sg(i,Ag,{onSelect:l=>{Y(`/more/billers/${l.id}`)}}),D("click",'[data-action="nav-back"]',()=>Y("/dashboard")),D("input","#billerSearch",l=>{const r=(l.target.value||"").toLowerCase(),u=Ag.filter(f=>f.name.toLowerCase().includes(r)||(f.category||"").toLowerCase().includes(r));Sg(i,u,{onSelect:f=>{Y(`/more/billers/${f.id}`)}})})}const oT=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];function rT(a){return oT.find(i=>i.id===a)}function cT(a){return{jps:"Account Number",nwc:"Account Number",flow:"Phone Number",digicel:"Phone Number",lime:"Account Number",ncb:"Credit Card Number",sagicor:"Policy Number",guardian:"Policy Number"}[a]||"Account Number"}function uT(a){return{jps:"123456789",nwc:"987654321",flow:"876-555-0123",digicel:"876-555-0123",lime:"123456789",ncb:"4111-1111-1111-1111",sagicor:"POL123456",guardian:"GL789012"}[a]||"Enter account number"}function dT(a){if(!a)return 0;const i=String(a).replace(/[^0-9.]/g,""),l=Number(i||"0");return Math.round(l*100)}function fT(a){const{id:i}=a||{},l=rT(i),r=k("#app");if(!r)return;if(!l){r.innerHTML=`
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
    `,D("click",'[data-action="nav-back"]',()=>Y("/more/billers"));return}const f=V.savedBillers.find(d=>d.name===l.name)?.account||"";r.innerHTML=`
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
              ${cT(l.id)}
            </label>
            <input
              type="text"
              id="accountNumber"
              class="form-input"
              placeholder="${uT(l.id)}"
              value="${f}"
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
  `,D("click",'[data-action="nav-back"]',()=>Y("/more/billers")),D("click",'[data-action="bill-back"]',()=>Y("/more/billers")),D("input","#billAmount",d=>{const v=d.target.value.replace(/[^0-9.]/g,"");d.target.value=v}),D("submit","#billerPaymentForm",d=>{d.preventDefault();const v=k("#accountNumber").value.trim(),p=dT(k("#billAmount").value);if(!v||p<=0){q("Please fill in all required fields");return}if(!zn(p)){q("Insufficient balance. Please add money first.");return}const m={billerId:l.id,billerName:l.name,icon:l.icon,category:l.category,account:v,amount:p};sessionStorage.setItem("novapay_biller_draft",JSON.stringify(m)),Y(`/more/billers/${l.id}/confirm`)})}function hT(a,i="JMD"){const l=(Number(a||0)/100).toFixed(2);return`${i} $${l}`}function pT(){const a=k("#app");if(!a)return;const i=sessionStorage.getItem("novapay_biller_draft");if(!i){a.innerHTML=`
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
    `,D("click",'[data-action="nav-back"]',()=>Y("/more/billers"));return}const l=JSON.parse(i);a.innerHTML=`
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
            <span>${hT(l.amount)}</span>
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
  `,D("click",'[data-action="nav-back"]',()=>Y(`/more/billers/${l.billerId}`)),D("click",'[data-action="edit-bill"]',()=>Y(`/more/billers/${l.billerId}`)),D("click",'[data-action="confirm-bill"]',()=>{if(!zn(l.amount)){q("Insufficient balance. Please add money first.");return}const r=k('[data-testid="btnConfirmBill"]');r&&(r.disabled=!0,r.textContent="Processing..."),setTimeout(()=>{da("JMD",-l.amount),ua({title:`${l.billerName} Bill`,amount:-l.amount,currency:"JMD",type:"BILL"}),m2({name:l.billerName,icon:l.icon,category:l.category,account:l.account}),sessionStorage.setItem("novapay_last_biller_tx",JSON.stringify(l)),sessionStorage.removeItem("novapay_biller_draft"),Y(`/more/billers/${l.billerId}/success`)},1200)})}function mT(a,i="JMD"){const l=(Number(a||0)/100).toFixed(2);return`${i} $${l}`}function vT(){const a=k("#app");if(!a)return;const i=sessionStorage.getItem("novapay_last_biller_tx"),l=i?JSON.parse(i):null;a.innerHTML=`
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
              <span>${mT(l.amount)}</span>
            </div>
          </div>
        `:""}

        <div class="flex flex-col gap-3 mt-4">
          <button class="btn btn-primary" data-action="go-dashboard">Back to Dashboard</button>
          <button class="btn btn-secondary" data-action="pay-another">Pay Another Bill</button>
        </div>
      </div>
    </div>
  `,D("click",'[data-action="nav-back"]',()=>Y("/dashboard")),D("click",'[data-action="go-dashboard"]',()=>Y("/dashboard")),D("click",'[data-action="pay-another"]',()=>Y("/more/billers"))}const gT="/assets/MG-C7VpGrLC.png",yT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAB3CAYAAAAJtc6rAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAq4SURBVHhe7ZxBaFzXFYa/c2ckK8KoqWsckwTbchRZKUNQTRAhmFAbk2g0JZTSTZPSRaFQKFl03UUxJevQRaGlpQ1pSyGBJI0kjyRSY0QwxggjhEgUWZYdxRHGGGFSR5pIo3u6mOdUvu9Jmpl3n2TI/Zb6x5bmnfvOvf855z0IBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCDwjUDcH7jYOQ6I8LQKj7paKiyrkmNSOplxJVXyepVeDN91tbTIGlNyjEn35wD2Kt1YesnR5mqpEG5RYco8xaIrNUO9Qfu5wisoe109Basi/A3DH6WTOxsFVfI6zw+BV1EObdRSI7wn8Lo8wYIr2at0A79G6Xe1VAiLWH5vnuQtV2qGbYMGoFc5oXBG4JSrpUFhHOWM6eJcTLvGEbX8FviZgHH1ZlGYB16To7wpQtXV7Sw/JccZgaOu1iwKVeAfUuV3cox5V2+U+i5GG5dRBhVuulJKehGKeo2DriCdXAeGgY9cLQ1RMEp6lR5XizgPjCmsukKzCOSB05pnQCdod/VGqSto8hjLkmMEZdzV0iDQgTKgVZ53NYDo951VuOtKqVCeAwbsLB2uZLq5ES2WaVdLg8DjQFG/TcHVGqWuoFFb+TMIgwpzrpaSbgxFe4UuVzBd3BIYBC65WhpEOAgUydPragCscAHLWdX791oP9KH022n2uUIj1B00ANY5j3pOHVJLHRj69fOE1JFVahaOo5R0Op6aTYEl8gx7XyywHyixhz5Xa4SGgma6uYEyiCQfmZslSh0lrcRTR8apuV9bOaEavw4Ck8Cwqp9j+gYKCCX7GY+7Qr3E/tjtkDwXsQwqLLlaSvqAks6w3xU4wizKsPfULPRgKDLLkZjUSQVhJDqYeEOEdoR+Vvi+q9VL40GreaoR4KKrpUFgHzCg+XjqEMGinPOemqE1OtUlpmbzBLPgf7EIdJGjFPnChmk4aABSYQplUDVuUFOhFKLjeMxQZ5aahUNASVc2qb5YxhG/iwUA5Xm0OQvQXNAKrMo6Y4j31NGG0K9wWpV8TM8uNT8Dyac6080NLMPAlKulQYRHEYr6rU1OsFvQVNAA5BjzrDOoWZhfoZhkfqWTOwhjGaTmA0CJdp5xNQBauZiZBTAUE/fxLWg6aAAYxoEh7+bXcmIz8yuGqehU5zc1QwGlaD+OF8bNIZZQyoj3xfIwMKAtPOtqW5EqaKaLW2Ipo1x2tTSIcBChKMLxmNZJRaqMZJCa96L0k+e0TtMa01sytABQsrP1W4BUQQOgg4noUOLX/CrHVZLNrxxjHmHYd2oGuoGi7o1XZ6STCjYDCwCtKF3UDkR1kTpo8gh3MYwhXHC1NIjQgdCvD3HC1QCwnPedmkUwGE6wRn9SajZPMufbAiisIszRQLpPHTQAWWHG95eJ6EEp6qfxNonp4hbKKOrZAsDjGEqS42lXA6CF8ygjqlRcqUmmgeGoUF0XfoJWYJV1xjIwv3mEF7RKv15L6CZbJjAZpGboVaGYlJrNYRaBsg8LoModLGdlrbEDjpegcc/PCOWMWholXY/XJU03X6AZVWeUfvbwbFJdklYuRndbWr94iTzD0sNtV9iK+B+UgmjFDHn4Mi59wIBdiJtfWWEGZVg1fUfYoUc3qUuaQyxhGEaa7wKosohhWFobv2P9Bq2H21hGESZcLQ1ftzTWE+qSBVZRRjJIze0oL2iefp2Oz8Zs8IsNWwAFC5xDGZHHWHb17fAaNADpYCpa+XWfhuqkgCb7mWgTL6N+LYAYjqAUtS2xOtO8BVDmgHJUkG4Y/0F7hLsIIxlYgHYsA+Q5lbTPyDoXUM+pWQGhD0N/UqmpGQugyjLKCLb5/mDsy/tAFphHKKs2t5I2Q4SjKCU+ibc0os28DJ6rM3AApUjLJoXdxi3AFLnGjvgu2QTtJFVyfIBhSNWf+YVaS0NzDCTtM2jN8yjNX5BNKKhSTOo2m8MsovV1AdSyhKFMPt2en0nQ+L+fGfVuAYSDGEo8FF/5ppsvJMcIeE7N1KozVDiV6Bf3cKlOC3ARy1lzaNvPbUlmQQNgmQkkE/P7jColO8cBV+BL5kUpN7LP1IXShaGo6/G6ZD0WQOEGhrJ8ln4RZxo0U2CJ2spPlQ5cBDqAAanNL96vFVjVFsYiv+gtNYvQivI88BP9OO7dWMdsdj0VVlHGsIzIybr3vk1J/CU+kRZmUEa9WwChR4VS0gU0h1mM/GLqVb0RqT2E8rK28Ct7jX69Rq+9wnF7hZfI8ws07iMjZoHh6LSZmrpm+dNiF+hijd+gvCwS71U1iyoLAq9R4Q0p3G+sdYb9mueXCK9GnWlvKNxGmUe4iWKoBfNINJx0/2eVOwh/Ic/r0T6fmszvNAC5ynWEMuLdAhxSoURLfChHergdjSZ4Tc3UVvp+EfoEXhLhBwLHkwIGgDAllmFfAWPHgnaSqgjjKEMZDOU8p4YBvcbDriArfJRJaq4TVW4KlLnrt320I0EDkE5uijJaj59pBIH9CCVsfChHCl9XZ877rEvWgyoW+FDhrHzP70DQjgUNQL9iSmDUuwUQehVK9tP4UI4sMI9Sjg4DO4fUqkJRg9grOxo0U2CJ2lDOpn6mGQTaEQZYiz8yJSep0sJ4ZH69rvjNUGp3uMAH7gHJBzsaNAD2MkvN/F53pTSI0g2U7EKC+T3MInn/DdpNscxgKSc9IuyDHQ+aPMaytNSMpmrjvaRtOMXqJqPWd5lEKXtPzQ6q3I6edfB+ar3HjgcNgL9ynRxlxG++j8xvSb8TH8oxBZaysgAOk0DZdHHLFXyxK0GTM1iRqMjq3wL0YZMfmZJKRtWZCIUbKOWo25AZuxI07lmA2iCQVw8jwsMofbonvrdJgbvACIYx36k56qedk3XOmm6+cHWf7FrQADBMRyvfW7VAoYrhFjb5DpYurmP9V2eigdMyx/zUF7diV4MWPQUzgvBh9K6N9AgfYXl3s/kLEaqS44LP1KzKHZQR1hhPejeJb3Y1aABimAVGkfQjcFEh9z3gQ1fbiHRyU3KMetx7poCyr9cobcfuB62TihjORS9cSdf/Ui5j6ju56ZdMiU1vAVSjvbnV7968FbseNADeYIHaI1NNj8BFJ8Jh1ur7P0yBJTUMpalLKiwDY7rO+2lHCBrhgQianMFKlUso/25m5Ucd6iFZZ6iRk5tUmEV5u+k0qUyI8Hf5PHn/zIoHImgQ9b8MQ42mSVUshklyDNLdWGlMCqxS4TzKP1Ub+7eqXEd5m71clJPZHz428sAEjehQIsKfUd6q546LusJjVPmTfMWECNb9zHaYAktS5R2UP9T7kGIUsDelypA8Uv8C88WOjBs0giqGT+jWHK9g+BHQFb3v4/7P1aoP74vwL9q43MxM/Eai8YQfA68ABZF4UzXqEkyjvCtV3pGnGrs7ffHABe0e9lMeZZ3TWF4EuhA6qI2DLyMsAv/B8r50Md/MHZaEXWAfq/SivBiNg+/D0gZUqBWCJxBGaWVyJw8eLg9s0AD0Gm0qHKXKEQx7sRgMy1gW5b/M+e4I30OnOajtdGPZT45WqVLBcJsV5qSwfdoOBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCHxT+R+ouzqckfEd0AAAAABJRU5ErkJggg==";function bT(){const a=k("#app");if(!a)return;a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackRemittance">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Remittance</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Receive Money from Abroad</h3>
          <p class="form-hint" style="margin-bottom: 20px;">
            Choose a remittance partner to receive funds directly into your NovaPay wallet.
          </p>
        </div>

        <div class="remittance-providers">
          <div class="remittance-provider-card" data-provider="western-union">
            <div class="remittance-provider-logo remit-logo-wu">
              <img src="${yT}" alt="Western Union" class="wu-logo-img" />
            </div>
            <div class="remittance-provider-info">
              <h4 class="remittance-provider-name">Western Union</h4>
              <p class="remittance-provider-desc">Global money transfers</p>
            </div>
          </div>

          <div class="remittance-provider-card" data-provider="moneygram">
            <div class="remittance-provider-logo remit-logo-mg">
              <img src="${gT}" alt="MoneyGram" class="mg-logo-img" />
            </div>
            <div class="remittance-provider-info">
              <h4 class="remittance-provider-name">MoneyGram</h4>
              <p class="remittance-provider-desc">Fast global payouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackRemittance",()=>Y("/dashboard",{animate:"slide-left-fade"})),a.querySelectorAll(".remittance-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.provider;r==="western-union"?Y("/remittance/western-union",{animate:"slide-right-fade"}):r==="moneygram"&&Y("/remittance/moneygram",{animate:"slide-right-fade"})})})}const Sy=document.createElement("style");Sy.textContent=`
  .remittance-providers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .remittance-provider-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .remittance-provider-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .remittance-provider-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .remittance-provider-card:active {
    transform: translateY(0);
  }
  
  .remittance-provider-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .remit-logo-wu {
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .wu-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .remit-logo-mg {
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .mg-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .remittance-provider-info {
    flex: 1;
  }
  
  .remittance-provider-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .remittance-provider-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
`;typeof document<"u"&&document.head.appendChild(Sy);function xT(){const a=k("#app");if(!a)return;const i=V?.session?.user||{},l=i.name||"",r=i.addressStreet||"";i.addressCity,i.addressStateParish,i.addressCountry,a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackWU">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Western Union</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <form id="wuRemittanceForm" class="auth-form">
          <!-- MTCN Field -->
          <div class="form-field">
            <label class="form-label" for="mtcn">MTCN (Money Transfer Control Number)</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <input
                type="text"
                id="mtcn"
                class="form-input-modern"
                placeholder="XXX-XXX-XXXX"
                maxlength="12"
              />
            </div>
            <p class="form-hint">Enter the 10-digit MTCN provided by the sender</p>
          </div>

          <!-- Sender Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Sender Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="senderName">Sender's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="senderName"
                class="form-input-modern"
                placeholder="Full legal name"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="senderCountry">Sender's Country</label>
            <div class="input-wrapper">
              <img
                id="senderCountryFlagIcon"
                class="input-icon country-flag-icon"
                alt="Country flag"
              />
              <select id="senderCountry" class="form-input-modern">
                <option value="">Select country</option>
                <option value="Jamaica">Jamaica</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="senderPhone">Sender's Phone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.27l4.52 1.13a1 1 0 0 1 .75 1z"></path>
              </svg>
              <input
                type="tel"
                id="senderPhone"
                class="form-input-modern"
                placeholder="Phone number"
              />
            </div>
          </div>

          <!-- Receiver Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Receiver Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="receiverName">Receiver's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="receiverName"
                class="form-input-modern"
                placeholder="Full legal name"
                value="${wg(l)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="receiverAddress">Receiver's Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="receiverAddress"
                class="form-input-modern"
                placeholder="Street address"
                value="${wg(r)}"
                readonly
              />
            </div>
            <p class="form-hint">Address auto-filled from your profile</p>
          </div>

          <!-- Expected Amount Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Transaction Details</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="expectedAmount">Expected Amount</label>
            <div class="input-group">
              <select id="currency" class="form-input-modern currency-select">
                <option value="USD">USD</option>
                <option value="JMD">JMD</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
              <input
                type="text"
                id="expectedAmount"
                class="form-input-modern amount-input"
                placeholder="0.00"
                inputmode="decimal"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="idType">Government Issued ID</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <circle cx="9" cy="10" r="2"></circle>
                <path d="M15 8h2"></path>
                <path d="M15 12h2"></path>
                <path d="M7 16h10"></path>
              </svg>
              <select id="idType" class="form-input-modern">
                <option value="">Select ID type</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Residence Permit">Residence Permit</option>
              </select>
            </div>
            <p class="form-hint">ID must be verified in your account</p>
          </div>

          <div class="form-field">
            <label class="form-label" for="purpose">Purpose of Transaction</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <select id="purpose" class="form-input-modern">
                <option value="">Select purpose</option>
                <option value="Family Support">Family Support</option>
                <option value="Living Expenses">Living Expenses</option>
                <option value="Salary">Salary</option>
                <option value="Medical Expenses">Medical Expenses</option>
                <option value="Gift">Gift</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSubmitWU">
            Continue
          </button>
        </form>
      </div>
    </div>
  `,D("click","#btnBackWU",()=>Y("/remittance",{animate:"slide-left-fade"})),D("submit","#wuRemittanceForm",ST);const u=k("#mtcn");u&&u.addEventListener("input",v=>{let p=v.target.value.replace(/[^0-9]/g,"");p.length>10&&(p=p.slice(0,10)),p.length>3&&p.length<=6?p=p.slice(0,3)+"-"+p.slice(3):p.length>6&&p.length<=10&&(p=p.slice(0,3)+"-"+p.slice(3,6)+"-"+p.slice(6)),v.target.value=p});const f=k("#senderCountry");f&&f.addEventListener("change",d);function d(){const v=k("#senderCountry"),p=k("#senderCountryFlagIcon");if(!v||!p)return;const m=v.value,g=AT(m);g?(p.src=g,p.style.display=""):(p.removeAttribute("src"),p.style.display="none")}}async function ST(a){a.preventDefault();const i=k("#mtcn")?.value.trim().replace(/-/g,""),l=k("#senderName")?.value.trim(),r=k("#senderCountry")?.value,u=k("#senderPhone")?.value.trim(),f=k("#receiverName")?.value.trim(),d=k("#receiverAddress")?.value.trim(),v=k("#expectedAmount")?.value.replace(/[^\d.]/g,""),p=k("#currency")?.value,m=k("#idType")?.value,g=k("#purpose")?.value;if(i.length!==10){q("Please enter a valid 10-digit MTCN");return}if(!l||!r||!u){q("Please complete all sender information fields");return}if(!f||!d){q("Please complete all receiver information fields");return}if(!v||!p){q("Please enter the expected amount");return}if(!m){q("Please select a government issued ID type");return}if(!g){q("Please select the purpose of transaction");return}const b=Number(v);if(!b||b<=0){q("Enter a valid amount");return}const S=k("#btnSubmitWU");if(S){S.disabled=!0,S.textContent="Processing...";try{const H=await Ya("/api/remittance/western-union/receive",{method:"POST",body:JSON.stringify({mtcn:i,senderName:l,senderCountry:r,senderPhone:u,receiverName:f,receiverAddress:d,expectedAmount:b,currency:p,idType:m,purpose:g})});sessionStorage.setItem("novapay_last_remittance_result",JSON.stringify({provider:"western-union",referenceId:i,amount:`${p} ${b.toFixed(2)}`})),Y("/remittance/success",{animate:"slide-right-fade"})}catch(L){const H=L?.message||L?.status?.message||"Unable to process Western Union remittance.";sessionStorage.setItem("novapay_last_remittance_error",JSON.stringify({provider:"western-union",message:H})),Y("/remittance/error",{animate:"slide-right-fade"})}finally{S.disabled=!1,S.textContent="Continue"}}}function AT(a){if(!a)return"";const i=String(a).trim().toLowerCase();return i==="jamaica"?qo:i==="canada"?jo:i==="united states"||i==="usa"||i==="us"?Fo:i==="united kingdom"||i==="uk"||i==="great britain"?Go:""}function wg(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}const Ay=document.createElement("style");Ay.textContent=`
  .input-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .currency-select {
    width: 80px;
    flex-shrink: 0;
  }
  
  .amount-input {
    flex: 1;
  }
  
  .section-title-sm {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--colorscharade-10);
  }
  
  .form-hint {
    font-size: 12px;
    color: var(--colorscharade-60);
    margin-top: 4px;
  }
`;typeof document<"u"&&document.head.appendChild(Ay);function wT(){const a=k("#app");if(!a)return;const i=V?.session?.user||{},l=i.name||"",r=i.addressStreet||"";i.addressCity,i.addressStateParish,i.addressCountry,a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackMG">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">MoneyGram</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <form id="mgRemittanceForm" class="auth-form">
          <!-- MTCN Field -->
          <div class="form-field">
            <label class="form-label" for="mgReferenceNumber">Reference Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <input
                type="text"
                id="mgReferenceNumber"
                class="form-input-modern"
                placeholder="XX-XX-XX-XX"
                maxlength="11"
              />
            </div>
            <p class="form-hint">Enter the 8-digit reference number provided by the sender</p>
          </div>

          <!-- Sender Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Sender Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgSenderName">Sender's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="mgSenderName"
                class="form-input-modern"
                placeholder="Full legal name"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgSenderCountry">Sender's Country</label>
            <div class="input-wrapper">
              <img
                id="mgSenderCountryFlagIcon"
                class="input-icon country-flag-icon"
                alt="Country flag"
              />
              <select id="mgSenderCountry" class="form-input-modern">
                <option value="">Select country</option>
                <option value="Jamaica">Jamaica</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgSenderPhone">Sender's Phone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.27l4.52 1.13a1 1 0 0 1 .75 1z"></path>
              </svg>
              <input
                type="tel"
                id="mgSenderPhone"
                class="form-input-modern"
                placeholder="Phone number"
              />
            </div>
          </div>

          <!-- Receiver Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Receiver Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgReceiverName">Receiver's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="mgReceiverName"
                class="form-input-modern"
                placeholder="Full legal name"
                value="${Tg(l)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgReceiverAddress">Receiver's Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="mgReceiverAddress"
                class="form-input-modern"
                placeholder="Street address"
                value="${Tg(r)}"
                readonly
              />
            </div>
            <p class="form-hint">Address auto-filled from your profile</p>
          </div>

          <!-- Expected Amount Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Transaction Details</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgExpectedAmount">Expected Amount</label>
            <div class="input-group">
              <select id="mgCurrency" class="form-input-modern currency-select">
                <option value="USD">USD</option>
                <option value="JMD">JMD</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
              <input
                type="text"
                id="mgExpectedAmount"
                class="form-input-modern amount-input"
                placeholder="0.00"
                inputmode="decimal"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgIdType">Government Issued ID</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <circle cx="9" cy="10" r="2"></circle>
                <path d="M15 8h2"></path>
                <path d="M15 12h2"></path>
                <path d="M7 16h10"></path>
              </svg>
              <select id="mgIdType" class="form-input-modern">
                <option value="">Select ID type</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Residence Permit">Residence Permit</option>
              </select>
            </div>
            <p class="form-hint">ID must be verified in your account</p>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgPurpose">Purpose of Transaction</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <select id="mgPurpose" class="form-input-modern">
                <option value="">Select purpose</option>
                <option value="Family Support">Family Support</option>
                <option value="Living Expenses">Living Expenses</option>
                <option value="Salary">Salary</option>
                <option value="Medical Expenses">Medical Expenses</option>
                <option value="Gift">Gift</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSubmitMG">
            Continue
          </button>
        </form>
      </div>
    </div>
  `,D("click","#btnBackMG",()=>Y("/remittance",{animate:"slide-left-fade"})),D("submit","#mgRemittanceForm",TT);const u=k("#mgReferenceNumber");u&&u.addEventListener("input",v=>{let p=v.target.value.replace(/[^0-9]/g,"");p.length>8&&(p=p.slice(0,8)),p.length>2&&p.length<=4?p=p.slice(0,2)+"-"+p.slice(2):p.length>4&&p.length<=6?p=p.slice(0,2)+"-"+p.slice(2,4)+"-"+p.slice(4):p.length>6&&p.length<=8&&(p=p.slice(0,2)+"-"+p.slice(2,4)+"-"+p.slice(4,6)+"-"+p.slice(6)),v.target.value=p});const f=k("#mgSenderCountry");f&&f.addEventListener("change",d);function d(){const v=k("#mgSenderCountry"),p=k("#mgSenderCountryFlagIcon");if(!v||!p)return;const m=v.value,g=kT(m);g?(p.src=g,p.style.display=""):(p.removeAttribute("src"),p.style.display="none")}}async function TT(a){a.preventDefault();const i=k("#mgReferenceNumber")?.value.trim().replace(/-/g,""),l=k("#mgSenderName")?.value.trim(),r=k("#mgSenderCountry")?.value,u=k("#mgSenderPhone")?.value.trim(),f=k("#mgReceiverName")?.value.trim(),d=k("#mgReceiverAddress")?.value.trim(),v=k("#mgExpectedAmount")?.value.replace(/[^\d.]/g,""),p=k("#mgCurrency")?.value,m=k("#mgIdType")?.value,g=k("#mgPurpose")?.value;if(i.length!==8){q("Please enter a valid 8-digit reference number");return}if(!l||!r||!u){q("Please complete all sender information fields");return}if(!f||!d){q("Please complete all receiver information fields");return}if(!v||!p){q("Please enter the expected amount");return}if(!m){q("Please select a government issued ID type");return}if(!g){q("Please select the purpose of transaction");return}const b=Number(v);if(!b||b<=0){q("Enter a valid amount");return}const S=k("#btnSubmitMG");if(S){S.disabled=!0,S.textContent="Processing...";try{const H=await Ya("/api/remittance/moneygram/receive",{method:"POST",body:JSON.stringify({referenceNumber:i,senderName:l,senderCountry:r,senderPhone:u,receiverName:f,receiverAddress:d,expectedAmount:b,currency:p,idType:m,purpose:g})});sessionStorage.setItem("novapay_last_remittance_result",JSON.stringify({provider:"moneygram",referenceId:i,amount:`${p} ${b.toFixed(2)}`})),Y("/remittance/success",{animate:"slide-right-fade"})}catch(L){const H=L?.message||L?.status?.message||"Unable to process MoneyGram remittance.";sessionStorage.setItem("novapay_last_remittance_error",JSON.stringify({provider:"moneygram",message:H})),Y("/remittance/error",{animate:"slide-right-fade"})}finally{S.disabled=!1,S.textContent="Continue"}}}function kT(a){if(!a)return"";const i=String(a).trim().toLowerCase();return i==="jamaica"?qo:i==="canada"?jo:i==="united states"||i==="usa"||i==="us"?Fo:i==="united kingdom"||i==="uk"||i==="great britain"?Go:""}function Tg(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}const wy=document.createElement("style");wy.textContent=`
  .input-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .currency-select {
    width: 80px;
    flex-shrink: 0;
  }
  
  .amount-input {
    flex: 1;
  }
  
  .section-title-sm {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--colorscharade-10);
  }
  
  .form-hint {
    font-size: 12px;
    color: var(--colorscharade-60);
    margin-top: 4px;
  }
`;typeof document<"u"&&document.head.appendChild(wy);function CT(){const a=k("#app");if(!a)return;const i=sessionStorage.getItem("novapay_last_remittance_result"),l=i?JSON.parse(i):null,r=l?.referenceId?String(l.referenceId):null;a.innerHTML=`
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
  `,D("click","#btnRemitSuccessBack",()=>{Y("/remittance",{animate:"slide-left-fade"})})}function MT(){const a=k("#app");if(!a)return;const i=sessionStorage.getItem("novapay_last_remittance_error"),l=i?JSON.parse(i):null,r=l?.message||"Something went wrong while submitting your remittance.";a.innerHTML=`
    <div class="container page page-center">
      <div class="card text-center">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-xl font-semibold mb-2">Transfer Failed</h2>
        <p class="text-error mb-4">${r}</p>
        <button class="btn btn-primary btn-full" id="btnRemitErrorRetry">Try Again</button>
      </div>
    </div>
  `,D("click","#btnRemitErrorRetry",()=>{const u=l?.provider;u==="western-union"?Y("/remittance/western-union",{animate:"slide-left-fade"}):u==="moneygram"?Y("/remittance/moneygram",{animate:"slide-left-fade"}):Y("/remittance",{animate:"slide-left-fade"})})}function ET(){const a=k("#app"),i=V?.session?.user?.name||"User",l=i.substring(0,2).toUpperCase();V?.session?.user?.email;const r=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),u=r?'<img src="'+r+'" alt="'+i+'" class="settings-avatar-img" />':l;let f=r||null;a.innerHTML=`
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
          <p class="settings-email">Hi ${i.split(" ")[0]}!</p>
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
  `,D("click","#btnBackProfilePhoto",()=>{Y("/dashboard",{animate:"slide-left-fade"})}),D("click","#btnPickPhoto",()=>{const d=k("#profilePhotoInput");d&&d.click()}),D("change","#profilePhotoInput",d=>{const v=d.target.files&&d.target.files[0],p=k("#btnSavePhoto");if(!v){f=r||null,p&&(p.disabled=!f);return}const m=new FileReader;m.onload=()=>{f=m.result;const g=k(".settings-avatar");g&&f&&(g.innerHTML='<img src="'+f+'" alt="'+i+'" class="settings-avatar-img" />'),p&&(p.disabled=!1),q&&q("Preview updated. Tap Save profile picture to apply.")},m.onerror=()=>{q&&q("Could not read that image. Please try another file."),f=r||null,p&&(p.disabled=!f)},m.readAsDataURL(v)}),D("click","#btnSavePhoto",()=>{if(!f){q&&q("Please choose a photo first.");return}try{localStorage.setItem("novapay_profile_picture",f),q&&q("Profile picture updated.","success")}catch(d){console.error("[ChangeProfilePicture] Failed to save image",d),q&&q("Could not save image on this device.");return}Y("/dashboard",{animate:"slide-left-fade"})})}const DT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAA4CAYAAABXJB78AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA8LSURBVHgBxVtbjJ1VFf7WPmcqM4Uw0vok0oMvxkRoqzGEmMg0VYNcbNUXVALVp0aDFIJGhKSt8dIgiTPGh5JYmEogBjFcvJGovZCI+GCYoTHRBsNMgvrCdIYXpp0551/uy1pr7/8M0HNmzpSdmTn/+S/73/v71/rWt9b+h/Autd1jPHrJJe2tFTrbnXNbibENxKMgavlPfwYxUdjiGXI0A8cLRHwSncbU5JNDJ/AuNcIFbAGki4eXxuDoTn/nrf53NIDiD3HEx39JYPkPJ8MLP+GMAkR//TyhOukPPPPw4xsmcQHbBQEsADUysnSnv1kA6r1+ohx+4gDChgvjYAGH/BZHkNI24vEEmnUp18R93gLdCW95B448TrNY57augCWg2h4o3udxGWVOE40gUADBb8oIyCULi2A5MbtwmEhGmbejpwbAzfrE8oADPNScPHJk/YBbN8C+9Nlzu71XPZwsSm5GJK4Xv6TdAT4Srwyf0RUZejBi4bSD+FesS6xULI/y+bMVuQNHHmkexTq0gQMWrGrj8PJ+Du6XXKuwhHhLm6jtMysrgCMbIQu3kYIi1sW1vuOhZLHReh3Gl9rNg5OTtIABtoECdsv1iy1Hjaf85tYwH52AupRzoGxtQJd1ZGJXzoKew4oMB9e1/VCAghVqv5SvITdDy8s7Dk8Oz2BAbWCARbBAx4MskMkm8yqtSe5o2ykSMolVZPfUKAmWbXpr65RzA/Ula8vnp3sFs5wl50E7PBjQHAbQDCx4sJCesrqLPhI2a0D6k8g7fSogxmXpkuRaYi5Adl8jv3AOp46yHCFYlI37W8xDx/buXWxhAG3NgCWw3HFSy3KIkS6YVgp22YKIyEAp+EbOh8kK5SdGUhXJveo8CBf3kwWCOu+ZJceTHF8JahwfBGhrAiwQfLIstFh6S/NJxOyBKCIZq1Ek2SBWoUB2cZa6XddnwsU5vY1Ys9NtCwawSJv1Xss1mk/t2+eziTW0NQG28T3L+/1ot1DBS6xSIE6ESK1GCIo1EgIyseJa7ScBGJAhzjpLCYqgFpeCQLqUJbqSWnUpRRLHhRtuXeZqP9bQVk36X7l+6XY/yEcKgkUO9SokuSYsk2AVgaqiFNnVVsiM7v2l9oJEzFofuc+47fIxFcuRKhr4ws/Gm09jFW1VgCnJ+wG1ylQGSiOBxzwiLk3IwGPhNVXzKFIcBRbQa7q0GmoBo4iGXdmAqz+EckzpmvhtZoga28fH+9doq3JJ55q3+/C1JX3jt7IEpKef+CeStyskRnYXk2B17loJVuJFUh4kA0gjrvRrfFgGkUK+pAiDLW2092EVrW8LC9bVcO5Vu5qUsxIz5WiWRicEb8dWulyRiLvkOi5m5KJ5nVpwVvGpYwsGqeuw15X9xs13yAb4jSY3r+zXyvq2MA9WIk0qIlPwwBWAiHSAUHwpHdK5nK2kPhLjNwEQJvW1n6jsJY4IaAaIbpOCZcElRnEnCoRotO36t7LVuORYjooa+cQzxCU0Sqk16DHjkzQBiaSaHKb9uZTDMMqSIJlclYpgQYVFZ7FaPLjCwtTSFcho/Xf2KzP6AuzLNyzu8bdqMXKOqGWZUvuU+R5154+mmZJn5cgnUt0EmyKQXBWi+kXZm+BlQBPNnEnU0i2sCBxMlk5c2t7QGUMfrdnPyb6UvEvmRDZRQDkmz1fGn12JS4Diz4c+DOz6YtN/pgvffBN07z1t/2mRNYKxcSPTDw81MTKS+j99mnHsWIWpKZYnBUHReI5U+Ktr1sZAoIIywvP7pv/Ss8Qg9NFuvfncvP8YxYpaFOkACjlANUuwyOiv/djHCd+4q0FzrwMv/b0KIOHNReDYHxldaVPs5tpPON60KU302msd/DYeeqiD6WkuOJNYM4fSqvKDNOKPaRUZmWLenWt8sFfy7xmwW29aHgOq42ROrKVloYWu/bmqapFOhTo9MDEUzzx4f5u9ZSkH1QqFVBYWnZSq/c/IRsd33+1o0ybC3fd0oncld5V7dxcVhStMMEdLc/5PRfpQfUlq7Cc/opM9wNC7SzJ1trkUgrgrGpIxefGEHWXuKguJm99H2LQZ+OVjHSwusk1048WEyz+QrTJbAPHcHNOZMxEWLJ5lOnaMcdtthM2bQXNzRQCinJrBnhlgI9F+zcKSK3doeZs/OljAnGtc543kLetRzmVGTZagw0vuxTZmqy54sGCgf26Xo5t3v238iVf86okKx45X0hUXR7UCK7xqawNyLLacQkF0G8Sqw0GHxjb0igN6bmHNkEmFqN07AaIaYEUxUNyStMRsTAYJ9f5z52fOP4ybbnalokh9UPevLNXpUEL3wS0caaRFLnVDSifhT9UzYD1bmAenpTGxnLm6Wv6uT5N0ZajINQmvz3F0x3/9E3ERKRwfGTn//YeHoS5EL59iPPnrCnNnWMQc7OYwUBU460KTb51QqqZE3FzPWqwPDkPLRfUoUQ9FziYgpkKgU7clK/XYZNLT/fOfKsCuZ/zm2ao+uS4rsn1CB4tngeMnK70/W1eF5hPXS11ICahLk5GQRPhpYdCAqTxIPEHFIoUJTqjw1zDvUkYoJKylLbNOO++3z3bEd4Girm+pTTrGhTumPrnQggqURUHkKFimbawflEqcNu7BA6Ydc+GP4oJpDjU+MThygOBDDzYpRMjurt/ulu9w3I7NnQH2f7+TKryUBbJfDdf4U1umy5kBtOyU5UwPrXelT0COPlz8UV2T1XV6orIooZbgB/bsMx1ccQVh56cdpl5ivPZaOicQei/t93+oYv+Xv59w9VWE489X+O//MldCybz2EKmIqhqUWModjMz/vbU+UiOe8d23hCzSg7IXRlakItAHm0s+xH/9S0WnTyfApqcYL7xQxT56Buy5yH18zTVMV1/VwMnnGWfmmai+eh79FAqiPKxCRiDpxDLflXJVD61nWeFvvgCYvDH+qUkF45oMYCEzNHMW00ukFkJlyA/P1177T+ovJe9lVJB6D5CqJQ7IgQblEp5Jn3B+zKOc/HI1ix5bPxY27Qe6LQwwT68rl0NOS0qpIY7LqfqTY0ToK+z7xdEObrypEZT7yubP8yofv3uu4pIXiz5q+KXjVBtTKkxq0Ci9wVrPRcTeAWvwS/4ut5PReVc93sizCJpyMI8fSm4UV+CEhANxP/poh0rpYX0Y+GT3uugiORwWDXxOyIU2zKtHIho0Pumn1vyd3cNbGU6gx9a70ieehk0aXXwlEChalAuCsJpV2jU3V1FIuHd+ymF4pIiolF3dMgeUNTLEouTIMGjHJ53nLm9581V+YPoQqZ7r5qoJIWtGG3O8pNOpptErDL2euGc3j9LwsidHujSSqHEJm+UouZoEqQ0UUIva/lGivXsbCInziy8m0RrF6AmpaFOxcuS/7LiOKIA7Muyj40cIl10G/PxohVP/QHd0LlbZ0fVgC1eMAtEWZOYfvL9xWa849OySk0/TwldvWZrykxhDUauXdCMn5TI+lG4FWdqXryFCHj7cxs6dDdx4YzLykIy/+LcOh2pEOVmfNtEN17uUGvn2yr8Zjz3BeOXVLHCzhaIQx4wcmDjmk1YRFlqRCu5J9NH6qrj6ssS4V9Bj2QKgPEPI0S8nt04SKcppnArHl08BL5/qqBVapTS7UtJvZ8+Cvn1/x2rzpVvZvtTYxmHlHZhFJalqeo2V8YgbfS3o9gUYb2icdO0qRJRRmEWJ5oGVVZgNROPqbAVpp6nwNCXVRCqOAMFXSbwLLJLIqzIHxQ2lYiGJj9GBiC/dlBvMPHAfHUUfra9FkPA2nx/uOEtsNl0o9XEWYjbqUv4qXpBL/FJYkpZdBK+cQBccaLEEoILMiVKhUlKcmEWnB8YmmJ1I+zr3s6r/E+iz9b3MVjWbE/6mb6SnW4jBuGwlz056VRKGWoLVpOK34u1oYq28gnI52Vxf61moWawgCLlGKEnG4GRZz1cHUzCC3lst1Dvj8tJB9Nn6BixYGTV4wgp0ZVSq5XHyWhIJMFn3pHk6syOV5SzWJQ6ea5LQYl/h7mLdZnZp3dNWyznamERDs3TKY/Dq/nuHDvT/VuKq3q1oY8N48P+UXRjTMGwSDNNTggcbAhk0cRWqETrLsmEyBbXiBKOzGly0WGevU3FOsNNjUJpLYtqB84OKl8w0XXsSq2irAixYWQV3F2w5LMsKZ0LIwEnnuLJEXUQwW1M0d44aD8Zn9nKxWW+OjvUqhEbDrOptyCSgJTnEfPDQvat753XVL9QdmWw+7Qc0oSq+ePrmL0L8hbtCeYSg1GOAcJZV6mJxqgx1f+mPM4DByriUFtKXqlTLdbXGFFxx4sf3NSexyramNxDDe/B+XNMqZGtPPlBSdBmW6AnjtjiZaEXZ0iyFkTVIuQWnWlu2Gmg1BKrriPOrVWqp4qJi6Touf8vZ5eXmAayhrQmw4Jqu3f68B2a2lgI5mLWIpZGSm0kDZE5LE9K0yCbI0k+iwO780kmB2cpGgCo3spCJbGGecx2WdowfWNs/Oqz5Ler4TwO0vMNvzoTvBW+w1dwLjlOgct1MI5jjvERmFkfpxeJQmEAtZSKzHjGuJFnYoieQokc6fXZoyI2tlrfKNpD39OM/DQTQiGfCd5UN+p8flmc6pvpbiLKmWRgPFTxXupPOXKqrrPzEElYTcDFntApK4j2KlvWDewbzD1sDASy0CBp3PGg0YwSEEoDMU6binWo5kncdZLsowdh7ZYX7lqvv5cJylhRyDdOUw7kdg7AsbQMDLLQA2nuGGtv9eCcyjxU1M4h1qN4iEr6jvL88x6Km9KMj1tfR4+4UU9iJNlHAgfGlJRooWOl269S+fsfSHkqvd27JCXGZ9oSzVKmzmFvWY0VAWGGZAVB92UUWYgkWOjHvHf1rD3x3da+Vn6+tG2Ch7d232GqiucffZb8BozlkvHuuaZXl7iwtOEdMywasrCSklXjLf1lg7vy0vdwcX2skfKe2roBpi8A1Ggf8zK7zILXK3I70P9HQ9cZzJm5dE8saz+mqbBUU/AIqnmh31hcobRcEsLLd8a12sLhd3ojG/OdoXZTWea/7f8EL5b7gv055STux1GmcuBBAIQ/x3Wv7vrM8Vjm31fN1BM+bUMvT9xbnxHmTC874jwVP6lNAZ9pVNNVGc+pCglS2/wNn6OJqhyu4ZQAAAABJRU5ErkJggg==";let Nn="scan",Bo=null;function id(){const a=k("#app");if(!a)return;V?.session?.user?.name;const i=V?.session?.user?.username||"@user";a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackQR">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Scan QR</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <!-- Tab Switcher -->
      <div class="qr-tab-switcher">
        <button class="qr-tab-btn ${Nn==="scan"?"active":""}" data-tab="scan">
          Scan QR
        </button>
        <button class="qr-tab-btn ${Nn==="show"?"active":""}" data-tab="show">
          Show my QR
        </button>
      </div>

      <!-- Tab Content -->
      <div class="qr-tab-content">
        ${Nn==="scan"?BT():NT(i)}
      </div>
    </div>
  `,D("click","#btnBackQR",()=>{Uu(),ca()}),D("click",'.qr-tab-btn[data-tab="scan"]',()=>{Nn!=="scan"&&(Nn="scan",Uu(),id())}),D("click",'.qr-tab-btn[data-tab="show"]',()=>{Nn!=="show"&&(Nn="show",Uu(),id())}),Nn==="show"&&(D("click","#btnDownloadQR",()=>{q("QR code downloaded to your device")}),D("click","#btnShareWhatsApp",()=>{q("Opening WhatsApp to share your QR code")}),D("click","#btnShareOther",()=>{q("Opening share options")})),Nn==="scan"&&RT()}function BT(){return`
    <div class="qr-scan-content">
      <div class="qr-camera-container">
        <video id="qrVideo" class="qr-video" autoplay playsinline></video>
        <div class="qr-scan-frame">
          <div class="qr-scan-corner qr-scan-corner-tl"></div>
          <div class="qr-scan-corner qr-scan-corner-tr"></div>
          <div class="qr-scan-corner qr-scan-corner-bl"></div>
          <div class="qr-scan-corner qr-scan-corner-br"></div>
          <div class="qr-scan-line"></div>
        </div>
      </div>
      <div class="qr-scan-instructions">
        <h3 class="qr-scan-title">Center QR Code</h3>
        <p class="qr-scan-subtitle">ensure the QR code is centered and can be seen clearly</p>
      </div>
    </div>
  `}function NT(a){return`
    <div class="qr-show-content">
      <div class="qr-user-info">
        <h3 class="qr-username">${a}</h3>
        <p class="qr-subtitle">Show to receive</p>
      </div>
      
      <div class="qr-code-container">
        <div class="qr-code-card">
          <img src="${DT}" alt="Your QR Code" class="qr-code-image">
        </div>
      </div>
      
      <div class="qr-actions">
        <button id="btnDownloadQR" class="qr-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          <span>Download</span>
        </button>
        
        <button id="btnShareWhatsApp" class="qr-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
          <span>WhatsApp</span>
        </button>
        
        <button id="btnShareOther" class="qr-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  `}async function RT(){const a=document.getElementById("qrVideo");if(!a||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){q("Camera not supported on this device.");return}try{const i=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:!1});Bo=i,a.srcObject=i}catch(i){console.error("[QRScreen] Failed to access camera",i),q("Unable to access camera. Please check permissions.")}}function Uu(){Bo&&(Bo.getTracks().forEach(a=>a.stop()),Bo=null)}const Ty=document.createElement("style");Ty.textContent=`
  /* QR Screen Styles */
  .qr-tab-switcher {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 0 20px;
    margin-bottom: 24px;
  }
  
  .qr-tab-btn {
    flex: 1;
    padding: 12px 16px;
    background: transparent;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-60);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    text-align: center;
  }
  
  .qr-tab-btn.active {
    color: var(--colorssecondary-100);
  }
  
  .qr-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 25%;
    width: 50%;
    height: 3px;
    background: var(--colorssecondary-100);
    border-radius: 3px;
  }
  
  .qr-tab-content {
    padding: 0 20px;
  }
  
  /* Scan QR Tab */
  .qr-camera-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 24px;
    background: #000;
  }
  
  .qr-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .qr-scan-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 16px;
    box-shadow: 0 0 0 5000px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  
  .qr-scan-corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border-color: #000;
    border-style: solid;
    border-width: 4px;
  }
  
  .qr-scan-corner-tl {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
    border-top-left-radius: 16px;
  }
  
  .qr-scan-corner-tr {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
    border-top-right-radius: 16px;
  }
  
  .qr-scan-corner-bl {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
    border-bottom-left-radius: 16px;
  }
  
  .qr-scan-corner-br {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
    border-bottom-right-radius: 16px;
  }
  
  .qr-scan-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #543AF8, transparent);
    animation: scan-line 2s linear infinite;
  }
  
  @keyframes scan-line {
    0% {
      transform: translateY(-50px);
    }
    50% {
      transform: translateY(50px);
    }
    100% {
      transform: translateY(-50px);
    }
  }
  
  .qr-scan-instructions {
    text-align: center;
    padding: 0 20px;
  }
  
  .qr-scan-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--colorscharade-100);
    margin-bottom: 8px;
  }
  
  .qr-scan-subtitle {
    font-size: 14px;
    color: var(--colorscharade-60);
    line-height: 1.5;
  }
  
  /* Show My QR Tab */
  .qr-show-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
  
  .qr-user-info {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .qr-username {
    font-size: 20px;
    font-weight: 700;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .qr-subtitle {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  .qr-code-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }
  
  .qr-code-card {
    width: 240px;
    height: 240px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .qr-code-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .qr-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }
  
  .qr-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #FFFFFF;
    border: 1px solid var(--colorscharade-20);
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--colorscharade-80);
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
    max-width: 100px;
  }
  
  .qr-action-btn:hover {
    background: var(--colorscharade-5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .qr-action-btn:active {
    transform: translateY(0);
  }
`;typeof document<"u"&&document.head.appendChild(Ty);const Yo="/assets/CIBC-DTpbt-Xf.png",_o="/assets/JMMB_Bank-BeP4W1hI.png",Qo="/assets/JN-DqPVTXec.png",Jo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX/////3QAAL4f/5AD/3wAAKYkAGoAAHYG0vdSlrssAGowAD37m5+9mam1cY3DavzXexSgALIYAHYvIskIAK4gAAHwAJIoAIIsPOIwAFY3/5wAAJoQAIYIAJooAIooAEo3c4OsABnyun0wAFH8tSpQ9VJguRH5zgrCAjbcZOYH19/p8eWWWocOOmb7u0RfIsztzc2g6S3tmd6pQWnRRZKDM0eHZwSzRujWckVa8qkKkl1LmyiG0pEigqciGgWBwcWoXOIKMhl5BUHlJVXeUi1tUZ6LDydxeYXULM4QAAI8lP380TZROWHVqbGywoUpGU3mVS2ttAAAM5UlEQVR4nO2d7V/avBrH6ZUUtCjaGlra0gKibIri00TFh425KbfT7f//b05SdFJI2/QBz7nPJ983e4Npfk1yPSRXulJJIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpH8n9BeEaIt0pZYU5l5OF/bTy/wtl4WoivQ9mlHrK2sdLvVbuN0Vehlv3eqC0C0REwgjcS2disAoC4TAqC7lWrjcE1U31qjSQWeXQ8T2Bxr0PyS0Ba4TODj+vJ4PNE1zSegN+u750ICH7qEdarm4CScdR/Kn+PaOi+ztkAbOmiZDC4u7zWLAKnutpMFHnZ0CBQiJQmMT1TorES3tTJtC7QLnNhYHjCmKkd7BgG3HvvGGV+6QZ+EFCp4QAh0Il/bYWfa1tIVBn1B6GpiAVR2Yq3fGjQhhUIFb9p0/kc0efr6sj5GIesN+mHTqVqOfOXvs0pYoYKuWuDucBsLjOiHKqTdGU5U0DuRBudz52+fRBUqzg9qUH9yZkPDhTQKMbMY+d8DVr6boFf5o7i/W4b0ChWn5kP3cL6xdoVAGoV40IP10QZGOKdKjO/NiIXTJjMvPYVCjHuLBnWlrr83Rbx/EhWiO0tXfc2qbQ+cfEMZGHh3d1Hg6myf0ijkGdSD+ns7lr13PBokjuGo5QVu2Gr1Lq9zjSRWgEB3dWHZdAAyKlTwkBpUMjsvqm+NGP76zUBogaGb4yfb8OhrJn7rZFvJMZB4wwZYiJjXqtkVTg3qr5nWApdDLG19SxEeDua0r/oTm8Zf9E+N400ns0Y09qE57/lzKVScsQGV0/fGqELP7m2Ly5vCQpPNyyfb1Nnf3x9l1Ygx6FDdL1IhNagmdA+mTe1/ruum/TJ0Mi0mjJzrMWgq7YHdy6oR3dA3flCowsCg1h9YS7eVim/dDfKsI4S2zmyPTlb7zzBbO2ii61CoQmpQVTox1korjbKpjfPYiWlz6PrYNmkvWl+VVP14BY18qJ4XqpAa1BboO7td2qc84/feHhr02Tia/k2GqYoHLWgeFquQzn0qkRi9YXYbONdLNHhpUcOqnQ3SDyO6J+RXwQqZQSX2ZRHj9wZ2hj2DmlXzKLVEdOlDp2iFCqqpwyyLJgaMRtSs6q1x2heHLwzototWiJXE4Cw96PqEprVGLaXrwQMbyitFK1Ty5gX8RtFdC8A/UVIGD+acRyxE4ZJwrjQC3lM6idQjhgO3/2WFCtpUCajpJFKF7um/RiFdVTQh8k7SrAKm8NO/R+FUol9zUvyF/m+apcprVKj9EM9ZFe1fZGkCWJoNrQ3ReYqvl+ItRJ6M8dtWfErfgm5sIBPhfPqIevzzD1dI1eGN7buXs+fnWv9yK+Wek/PVBP9OsFcsuejsf7BCjJTfj4ZmmcGRmOcb9t5dmjA9yNxb12J/QCNIPXzyt3SFNOPra5YaegYx7d6N+DjiLZsdiQn9FPsQdhZLV4iVINtbgGhP4lsVzpkK9qbIr/GRBt2Hj1SItlSToy/Q2HoRDVaYPfW+ivQLffWgWvo4hSx41rnyAszJtegJwrMKmsD7wIoN4ZhtuQoxejSi9QVT9ULsYXjLAGtbYHt5TC3p+ccpRGdWrEAA3R4KmkgV1OfEjuGBAWT+5GKJCp3jJIFUoiWWPKO+B3biNHVevIUhXKJC9NtOFEgf1xN6HJumxlGCQkS9irtwpLk0hXighQaLwZNoCUXVWGmBn/BLPPBhYU9/iQpR7a8bdCvVLmk0GkD/DR2gBthC8xQ9EXU9tmdY2SO8ApFlKWQbxVMq3dPV9uub3T8/2O244Qd6x8kFPKyERyWxExrjE49b5LMshehlOoRu92D+LOjT3JmstSXA0Tr1iDGBG1Z63uwxWC6FQtGTMh3CyhfOwXpbD09VQwQa2cYYUzQEFbo8gRkU4m2RkqKrwNdzXyqdrBAT6UQTuWIxumwRPaIqKr1C9PwjOcxn/gsWvW/kU/MoxM5Gj3p690HwWckKa/9cJY4iOmETsRpZFvm5yZOQSSEe1mwCetTLzKRQbSWGk4hlFAtH6jPztM6TkEUh3jjeY/mZuxNREJVJoW4lZNxYYcswokIpYHfBLwoo5FoajJzNvuaBXv/EfVImhUAm8RY1CGjmj5tDHM5OUyJQEExtkx3VM4wGx3SmVr7xVkU2hTScjN38CsZwPlELsTJTaUZOasns6fok2sJRa/PNBFLhzJqMCsF8jP0Z8mKXYan0MKPQukquJHb+EHIfH9PUDG7pXlaFYPXjfAazpbEKz6u6/haNawJJIjVdXj8+LnXGNujlhYmaWSFolzE/ZP7Q5a/8V4WNHcbuDpXYSt7uZQef/iihZ86lDeRbcQqhFeMWWT5HEsr5GW32xOTkPWgvuZTTuTOgMv9ecygEeyPypxhTY1pOFHjLapPFNmBMgRxfQY8e1NvFKYzbgmDTNM4fBpwGDxfZRHN6hJwIDLWi6nPFJrkUxrlFfN2KNzU0rvkVFISbAkcSbBmaIpsBbCOjmndHeEYhqNHHs+jYXKz1nKXtTlNhS2QfdNsCsW055151w+s/n0LwI3/NJkwzxpr+vXSSZCGDfn8n+kRsy+rChnrIY+RUCEakW8RHLahG3qt5ux7gnYlkm9d0ko7F9h5Qj1Rui1QIduQYoB/afJ3gO53ElTzbUp9aUtHjtZEfnqa5Fca4RaevQWehsjzgfBq0EVVko41FueqzYLVCcMxdrMIYE+DcUcv2kxPw306H0JuI7SSOfdCStoPffz0JR6cFKNTNyH462zZxq5/aYX0rO9MRNO7FdrVoKha/kxju36NaPi9WYdxiQtc9Q3erjc8r0y3TtfPV03J5eg2wJVix6Xz1wBYeQhZrVFYLVkjdYmRfMdomFtGb5W6nXq93qt3K1At6dk2wPhZftEC9F68ZQj/MUKhRiMIYt0h/j0dPthnatFAt7UX0WgXG34iwIZ0q9ENZTTEKwbiLyb8RGo57tmb5pueZvmGrtd/iJe/OsQ+WoC+c9m9shg6gClIY4xYZVKRy8fvyrt8fj66u0xQNBfVCT6lK9469pSiE1lbC2ddbUVSqkqhpzZdQGcZM/0I7RIUpFIyM04EHpg62yDHCTP9OyDLWIcS6xawEtZfxG0Kc/pHwjYviFAL5lq5eORE8mKhgioTmoT+yoXh/+Ir3vchLF9MaaDNVgbDCKU7MqJB/sBLnFtOCnStbTy+QOfxw5p3t3GJnlX88FucW0zG9i2A9p77ogP6Q8KFeNoWN0qcyV2K8WxQGo82eRVv7mnraszA9fLUrq8LST/5ETXKLQiB8x76R0BqlvyzGdnTCe3yZFZZ+uVyJYlWScX1EaFv16aKeZLlM5ZyQ3BW0bwr3G9wjQN3L5RYxUkYTQ6cD2M9y14hd5w5v0+RQWFprcusN1L2sbpHFdcM709JB13obmTwPq7WdK4vKobDUnr/LPyWLWwyiVnwx3mNXZIkBv7N5VraXOL8PnUdh6YF/Gu+vi/uM13BcGV6N7w2NpZGq9m0bZzNXQS6Z/7b6bDX8Kn8UtbGoRHz15/ns+55Bs0dz+vEIu3aU+VsnTt+HyvzHSPIpLB12eQrF0wG8rakqma5nYhra83aO69Ks3lN3S8UqLJ1WFvVRWoI3eJn7AjXI/I0/dym+NcHr2BHNJRd32fMqLH3he35Bt8gUktrxeLR1jVPfFwrjbFGBiwW0+RWWdrien4i5RabQd9JfhlpsyLmkcSzvCzz5Fe7za3/Frn4yhVYB31BCgzNWklznHJPkV1ha63IlevcCNqMQhRjhy+DeUed2UWARCkvnfLdovST7jPwKaaigXOrBrYAq98yZozChKNlZUFha4UukbjGpuBn9pgqRQBV0xJ8jNLip2X4wieoHPIGLCsnz5kYsm2fz0XupdMtPiO1RfFMbG0OakXubGdm4Gh0/td7uxdUjTmMXa1kTv+5JYEFh6TPf8/sCHwqlY50Vw/fe8hu9GlFAm61ad1FhlOf/KPToLwpmUkgWQqNSaZefEH8Mrhv9kdYsCl3Ce2H8hPhDcBsxZS0ZFHZ5Nwyo53czFeAXQDOyxjuTQr2+8K3EVyIS4qVT5nyfModCtxL9yd4Iz79k+PdIMiss78YVcq38F0aRH8hkVah3Epo7zHRTJA/cUDSzQtKN8qp/idgKXxpRgUw2hZUdgS+DRyTEy4F0El95GoWduLLtd/gJ8TzNIuKDMvd+RVaFJLrMMMw+JHt+0jk4zRsf6JUuP5fIqLDZEP92fSXJ85d32qXTXIOou93moeB/jLBWrwjQSfA5IdoJTQZ53M+qyHO5lLsd+CSwAF/Zv10VQHCGvnIe2+Ztm/1mReSxEZ15EJ5PEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikXwY/wEIEpkHW0zmpgAAAABJRU5ErkJggg==",Xo="/assets/Scotia-Drs9SX0a.jpg";function zT(){const a=k("#app");if(!a)return;a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackBankSelection">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Select Bank</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Choose Your Bank</h3>
          <p class="form-hint" style="margin-bottom: 20px;">
            Select the bank you would like to transfer funds to.
          </p>
        </div>

        <div class="bank-providers">
          <div class="bank-provider-card" data-bank="first-caribbean">
            <div class="bank-provider-logo">
              <img src="${Yo}" alt="First Caribbean Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">First Caribbean Bank</h4>
              <p class="bank-provider-desc">CIBC First Caribbean</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jmmb">
            <div class="bank-provider-logo">
              <img src="${_o}" alt="JMMB" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">JMMB</h4>
              <p class="bank-provider-desc">Jamaica Money Market Brokers</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jamaica-national">
            <div class="bank-provider-logo">
              <img src="${Qo}" alt="Jamaica National Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Jamaica National Bank</h4>
              <p class="bank-provider-desc">JN Bank</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="ncb">
            <div class="bank-provider-logo">
              <img src="${Jo}" alt="National Commercial Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">National Commercial Bank</h4>
              <p class="bank-provider-desc">NCB Jamaica</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="scotia">
            <div class="bank-provider-logo">
              <img src="${Xo}" alt="Scotia Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Scotia Bank</h4>
              <p class="bank-provider-desc">Scotiabank Jamaica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackBankSelection",()=>Y("/withdraw",{animate:"slide-left-fade"})),a.querySelectorAll(".bank-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.bank;Y(`/bank-details/${r}`,{animate:"slide-right-fade"})})})}const ky=document.createElement("style");ky.textContent=`
  .bank-providers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .bank-provider-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .bank-provider-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .bank-provider-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .bank-provider-card:active {
    transform: translateY(0);
  }
  
  .bank-provider-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #FFFFFF;
    overflow: hidden;
  }
  
  .bank-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .bank-provider-info {
    flex: 1;
  }
  
  .bank-provider-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .bank-provider-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
`;typeof document<"u"&&document.head.appendChild(ky);let Vt={bank:null,accountType:null,branch:"",accountName:"",accountNumber:"",amount:0,currency:"JMD"};const Cy={"first-caribbean":{name:"First Caribbean Bank",logo:Yo,branches:["New Kingston","Montego Bay","Ocho Rios","Mandeville"]},jmmb:{name:"JMMB",logo:_o,branches:["Haughton Terrace","Portmore","Montego Bay","Ocho Rios"]},"jamaica-national":{name:"Jamaica National Bank",logo:Qo,branches:["Half Way Tree","Duke Street","Constant Spring","May Pen"]},ncb:{name:"National Commercial Bank",logo:Jo,branches:["Oxford Road","Knutsford Boulevard","Constant Spring","Spanish Town"]},scotia:{name:"Scotia Bank",logo:Xo,branches:["King Street","Constant Spring","Half Way Tree","Portmore"]}};function LT(a){const i=k("#app");if(!i)return;Vt.bank=a;const l=Cy[a]||{name:"Unknown Bank",logo:null,branches:[]};i.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackBankDetails">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Bank Details</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <!-- Bank Logo and Name -->
        <div class="bank-header">
          <div class="bank-logo-container">
            <img src="${l.logo}" alt="${l.name}" class="bank-details-logo" />
          </div>
          <h2 class="bank-details-name">${l.name}</h2>
        </div>

        <form id="bankDetailsForm">
          <!-- Account Type -->
          <div class="form-field">
            <label class="form-label">Account Type</label>
            <div class="account-type-selector">
              <div class="account-type-option" data-type="savings">
                <input type="radio" name="accountType" id="typeSavings" value="savings" class="account-type-radio">
                <label for="typeSavings" class="account-type-label">Savings</label>
              </div>
              <div class="account-type-option" data-type="chequing">
                <input type="radio" name="accountType" id="typeChequing" value="chequing" class="account-type-radio">
                <label for="typeChequing" class="account-type-label">Chequing</label>
              </div>
            </div>
          </div>

          <!-- Branch -->
          <div class="form-field">
            <label class="form-label" for="branchSelect">Branch</label>
            <select id="branchSelect" class="form-input-modern" required>
              <option value="" disabled selected>Select branch</option>
              ${l.branches.map(r=>`<option value="${r}">${r}</option>`).join("")}
            </select>
          </div>

          <!-- Account Name -->
          <div class="form-field">
            <label class="form-label" for="accountName">Name on Account</label>
            <input
              type="text"
              id="accountName"
              class="form-input-modern"
              placeholder="Enter full name on account"
              required
            />
          </div>

          <!-- Account Number -->
          <div class="form-field">
            <label class="form-label" for="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              class="form-input-modern"
              placeholder="Enter account number"
              inputmode="numeric"
              required
            />
          </div>

          <!-- Amount -->
          <div class="form-field">
            <label class="form-label" for="withdrawAmount">Amount</label>
            <div class="input-group">
              <select id="withdrawCurrency" class="form-input-modern currency-select">
                <option value="JMD">JMD</option>
                <option value="USD">USD</option>
              </select>
              <input
                type="text"
                id="withdrawAmount"
                class="form-input-modern amount-input"
                placeholder="0.00"
                inputmode="decimal"
                required
              />
            </div>
            <p class="form-hint">Available: <strong>${Qt(V.balances.JMD||0,"JMD")}</strong> / ${Qt(V.balances.USD||0,"USD")}</p>
          </div>
          
          <!-- Quick Amounts -->
          <div class="form-field">
            <h3 class="section-title-sm">Quick Amounts</h3>
            <div class="quick-amount-grid" id="jmd-quick-amounts">
              <button type="button" class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="25000">J$25,000</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="50000">J$50,000</button>
            </div>
            <div class="quick-amount-grid" id="usd-quick-amounts" style="display: none;">
              <button type="button" class="quick-amount-btn" data-quick-amount="50">$50</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="100">$100</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="250">$250</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="500">$500</button>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="form-field">
            <button type="submit" class="btn-primary-modern" id="btnSubmitBankDetails">
              Withdraw Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  `,UT()}function UT(){const a=k("#app");D("click","#btnBackBankDetails",()=>Y("/bank-selection",{animate:"slide-left-fade"})),D(a,".account-type-option","click",i=>{const l=i.currentTarget.querySelector('input[type="radio"]');l&&(l.checked=!0,Vt.accountType=l.value)}),D(a,"#branchSelect","change",i=>{Vt.branch=i.target.value}),D(a,"#accountName","input",i=>{Vt.accountName=i.target.value}),D(a,"#accountNumber","input",i=>{Vt.accountNumber=i.target.value.replace(/[^0-9]/g,""),i.target.value=Vt.accountNumber}),D(a,"#withdrawCurrency","change",i=>{Vt.currency=i.target.value;const l=k("#jmd-quick-amounts"),r=k("#usd-quick-amounts");Vt.currency==="JMD"?(l.style.display="grid",r.style.display="none"):(l.style.display="none",r.style.display="grid");const u=k(".form-hint");if(u){const f=Qt(V.balances.JMD||0,"JMD"),d=Qt(V.balances.USD||0,"USD");Vt.currency==="JMD"?u.innerHTML=`Available: <strong>${f}</strong> / ${d}`:u.innerHTML=`Available: ${f} / <strong>${d}</strong>`}}),D(a,".quick-amount-btn","click",i=>{const l=i.currentTarget.dataset.quickAmount,r=k("#withdrawAmount");r&&(r.value=l,Vt.amount=pa(l))}),D(a,"#withdrawAmount","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l,Vt.amount=pa(l)}),D(a,"#bankDetailsForm","submit",i=>{if(i.preventDefault(),!Vt.accountType){q("Please select an account type");return}if(!Vt.branch){q("Please select a branch");return}if(!Vt.accountName){q("Please enter the account name");return}if(!Vt.accountNumber){q("Please enter the account number");return}if(Vt.amount<=0){q("Please enter a valid amount");return}if(!zn(Vt.amount)){q("Insufficient balance");return}OT()})}function OT(){const a=k("#btnSubmitBankDetails");a.textContent="Processing...",a.disabled=!0,setTimeout(()=>{da(Vt.currency,-Vt.amount),ua({title:`${Cy[Vt.bank].name} Withdrawal`,amount:-Vt.amount,currency:Vt.currency,type:"WITHDRAW"}),q(`Withdrawal of ${Qt(Vt.amount,Vt.currency)} initiated`),Vt={bank:null,accountType:null,branch:"",accountName:"",accountNumber:"",amount:0,currency:"JMD"},Y("/dashboard",{animate:"slide-left-fade"})},2e3)}const My=document.createElement("style");My.textContent=`
  .bank-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .bank-logo-container {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  
  .bank-details-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }
  
  .bank-details-name {
    font-size: 20px;
    font-weight: 600;
    color: var(--colorscharade-100);
    text-align: center;
  }
  
  .account-type-selector {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .account-type-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .account-type-option:hover {
    border-color: var(--colorssecondary-100);
  }
  
  .account-type-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .account-type-radio:checked + .account-type-label {
    color: var(--colorssecondary-100);
    font-weight: 600;
  }
  
  .account-type-radio:checked ~ .account-type-option {
    border-color: var(--colorssecondary-100);
    background-color: rgba(84, 58, 248, 0.05);
  }
  
  .account-type-label {
    font-size: 15px;
    cursor: pointer;
  }
`;typeof document<"u"&&document.head.appendChild(My);const Ey="/assets/FlowLtd-C2DlFDh0.png",Dy="/assets/Digicel-DUQuXrTO.png";function VT(){const a=k("#app");if(!a)return;a.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackNetworkSelection">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Select a Network</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Choose Your Network Provider</h3>
          <p class="form-hint" style="margin-bottom: 20px;">
            Select the network provider you would like to top up.
          </p>
        </div>

        <div class="network-providers">
          <div class="network-provider-card" data-network="flow">
            <div class="network-provider-logo">
              <img src="${Ey}" alt="Flow Ltd" class="network-logo-img" />
            </div>
            <div class="network-provider-info">
              <h4 class="network-provider-name">Flow Ltd</h4>
              <p class="network-provider-desc">Mobile and data services</p>
            </div>
          </div>

          <div class="network-provider-card" data-network="digicel">
            <div class="network-provider-logo">
              <img src="${Dy}" alt="Digicel" class="network-logo-img" />
            </div>
            <div class="network-provider-info">
              <h4 class="network-provider-name">Digicel</h4>
              <p class="network-provider-desc">Mobile and data services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackNetworkSelection",()=>Y("/dashboard",{animate:"slide-left-fade"})),a.querySelectorAll(".network-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.network;Y(`/network-details/${r}`,{animate:"slide-right-fade"})})})}const By=document.createElement("style");By.textContent=`
  .network-providers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .network-provider-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .network-provider-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .network-provider-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .network-provider-card:active {
    transform: translateY(0);
  }
  
  .network-provider-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #FFFFFF;
    overflow: hidden;
  }
  
  .network-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .network-provider-info {
    flex: 1;
  }
  
  .network-provider-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .network-provider-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
`;typeof document<"u"&&document.head.appendChild(By);let kt={network:null,name:"",mobileNumber:"",areaCode:"876",product:"topup",amount:0,currency:"JMD"};const Ys={flow:{name:"Flow Ltd",logo:Ey,dataPlans:[{name:"1-Day Plan",price:150,data:"500MB"},{name:"3-Day Plan",price:350,data:"1GB"},{name:"7-Day Plan",price:750,data:"2GB"},{name:"30-Day Plan",price:1500,data:"4GB"}]},digicel:{name:"Digicel",logo:Dy,dataPlans:[{name:"1-Day Plan",price:150,data:"500MB"},{name:"3-Day Plan",price:350,data:"1GB"},{name:"7-Day Plan",price:750,data:"2GB"},{name:"30-Day Plan",price:1500,data:"4GB"}]}};function HT(a){const i=k("#app");if(!i)return;kt.network=a;const l=Ys[a]||{name:"Unknown Network",logo:null,dataPlans:[]};i.innerHTML=`
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackNetworkDetails">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Top Up</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <!-- Network Logo and Name -->
        <div class="network-header">
          <div class="network-logo-container">
            <img src="${l.logo}" alt="${l.name}" class="network-details-logo" />
          </div>
          <h2 class="network-details-name">${l.name}</h2>
        </div>

        <form id="networkDetailsForm">
          <!-- Name (Optional) -->
          <div class="form-field">
            <label class="form-label" for="recipientName">Name (Optional)</label>
            <input
              type="text"
              id="recipientName"
              class="form-input-modern"
              placeholder="Enter recipient name"
            />
          </div>

          <!-- Mobile Number -->
          <div class="form-field">
            <label class="form-label" for="mobileNumber">Mobile Number</label>
            <div class="input-group">
              <select id="areaCode" class="form-input-modern area-code-select">
                <option value="876">876</option>
                <option value="658">658</option>
              </select>
              <input
                type="text"
                id="mobileNumber"
                class="form-input-modern mobile-input"
                placeholder="Enter mobile number"
                inputmode="numeric"
                maxlength="7"
                required
              />
            </div>
            <p class="form-hint">Enter a valid 10-digit Jamaican mobile number</p>
          </div>

          <!-- Product Type -->
          <div class="form-field">
            <label class="form-label">Product</label>
            <div class="product-type-selector">
              <div class="product-type-option" data-product="topup">
                <input type="radio" name="productType" id="typeTopUp" value="topup" class="product-type-radio" checked>
                <label for="typeTopUp" class="product-type-label">Top Up</label>
              </div>
              <div class="product-type-option" data-product="dataplan">
                <input type="radio" name="productType" id="typeDataPlan" value="dataplan" class="product-type-radio">
                <label for="typeDataPlan" class="product-type-label">Data Plan</label>
              </div>
            </div>
          </div>

          <!-- Top Up Amount (shown when Top Up is selected) -->
          <div id="topUpSection">
            <div class="form-field">
              <label class="form-label" for="topUpAmount">Amount</label>
              <div class="input-group">
                <select id="topUpCurrency" class="form-input-modern currency-select">
                  <option value="JMD">JMD</option>
                  <option value="USD">USD</option>
                </select>
                <input
                  type="text"
                  id="topUpAmount"
                  class="form-input-modern amount-input"
                  placeholder="0.00"
                  inputmode="decimal"
                  required
                />
              </div>
              <p class="form-hint">Available: <strong>${Qt(V.balances.JMD||0,"JMD")}</strong> / ${Qt(V.balances.USD||0,"USD")}</p>
            </div>
            
            <!-- Quick Amounts -->
            <div class="form-field">
              <h3 class="section-title-sm">Quick Amounts</h3>
              <div class="quick-amount-grid" id="jmd-quick-amounts">
                <button type="button" class="quick-amount-btn" data-quick-amount="100">J$100</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="200">J$200</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="500">J$500</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="1000">J$1,000</button>
              </div>
              <div class="quick-amount-grid" id="usd-quick-amounts" style="display: none;">
                <button type="button" class="quick-amount-btn" data-quick-amount="5">$5</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="10">$10</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="20">$20</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="50">$50</button>
              </div>
            </div>
          </div>

          <!-- Data Plan Selection (hidden by default) -->
          <div id="dataPlanSection" style="display: none;">
            <div class="form-field">
              <label class="form-label">Select Data Plan</label>
              <div class="data-plans-list">
                ${l.dataPlans.map((r,u)=>`
                  <div class="data-plan-card" data-plan-index="${u}">
                    <div class="data-plan-info">
                      <h4 class="data-plan-name">${r.name}</h4>
                      <p class="data-plan-data">${r.data}</p>
                      <p class="data-plan-price">${Qt(r.price,"JMD")}</p>
                    </div>
                    <input type="radio" name="dataPlan" value="${u}" class="data-plan-radio">
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="form-field">
            <button type="submit" class="btn-primary-modern" id="btnSubmitNetworkDetails">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  `,qT()}function qT(){const a=k("#app");D("click","#btnBackNetworkDetails",()=>Y("/network-selection",{animate:"slide-left-fade"})),D(a,"#recipientName","input",i=>{kt.name=i.target.value}),D(a,"#areaCode","change",i=>{kt.areaCode=i.target.value}),D(a,"#mobileNumber","input",i=>{const l=i.target.value.replace(/[^0-9]/g,"");i.target.value=l,kt.mobileNumber=l}),D(a,".product-type-option","click",i=>{const l=i.currentTarget.querySelector('input[type="radio"]');if(l){l.checked=!0,kt.product=l.value;const r=k("#topUpSection"),u=k("#dataPlanSection");kt.product==="topup"?(r.style.display="block",u.style.display="none"):(r.style.display="none",u.style.display="block")}}),D(a,"#topUpCurrency","change",i=>{kt.currency=i.target.value;const l=k("#jmd-quick-amounts"),r=k("#usd-quick-amounts");kt.currency==="JMD"?(l.style.display="grid",r.style.display="none"):(l.style.display="none",r.style.display="grid");const u=k(".form-hint");if(u){const f=Qt(V.balances.JMD||0,"JMD"),d=Qt(V.balances.USD||0,"USD");kt.currency==="JMD"?u.innerHTML=`Available: <strong>${f}</strong> / ${d}`:u.innerHTML=`Available: ${f} / <strong>${d}</strong>`}}),D(a,".quick-amount-btn","click",i=>{const l=i.currentTarget.dataset.quickAmount,r=k("#topUpAmount");r&&(r.value=l,kt.amount=pa(l))}),D(a,"#topUpAmount","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l,kt.amount=pa(l)}),D(a,".data-plan-card","click",i=>{const l=i.currentTarget.querySelector('input[type="radio"]');if(l){l.checked=!0;const r=parseInt(i.currentTarget.dataset.planIndex),u=Ys[kt.network];u&&u.dataPlans&&u.dataPlans[r]&&(kt.amount=u.dataPlans[r].price)}}),D(a,"#networkDetailsForm","submit",i=>{if(i.preventDefault(),!kt.mobileNumber||kt.mobileNumber.length!==7){q("Please enter a valid 7-digit mobile number");return}if(kt.product==="topup"&&kt.amount<=0){q("Please enter a valid amount");return}if(kt.product==="dataplan"&&!document.querySelector('input[name="dataPlan"]:checked')){q("Please select a data plan");return}if(kt.product==="topup"&&!zn(kt.amount)){q("Insufficient balance");return}jT()})}function jT(){const a=k("#btnSubmitNetworkDetails");a.textContent="Processing...",a.disabled=!0,setTimeout(()=>{if(kt.product==="topup")da(kt.currency,-kt.amount),ua({title:`${Ys[kt.network].name} Top Up`,amount:-kt.amount,currency:kt.currency,type:"BILL"}),q(`Top-up of ${Qt(kt.amount,kt.currency)} successful`);else{const i=parseInt(document.querySelector('input[name="dataPlan"]:checked').value),l=Ys[kt.network].dataPlans[i];da("JMD",-l.price),ua({title:`${Ys[kt.network].name} ${l.name}`,amount:-l.price,currency:"JMD",type:"BILL"}),q(`Data plan purchase of ${Qt(l.price,"JMD")} successful`)}kt={network:null,name:"",mobileNumber:"",areaCode:"876",product:"topup",amount:0,currency:"JMD"},Y("/dashboard",{animate:"slide-left-fade"})},2e3)}const Ny=document.createElement("style");Ny.textContent=`
  .network-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .network-logo-container {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  
  .network-details-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }
  
  .network-details-name {
    font-size: 20px;
    font-weight: 600;
    color: var(--colorscharade-100);
    text-align: center;
  }
  
  .product-type-selector {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .product-type-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .product-type-option:hover {
    border-color: var(--colorssecondary-100);
  }
  
  .product-type-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .product-type-radio:checked + .product-type-label {
    color: var(--colorssecondary-100);
    font-weight: 600;
  }
  
  .product-type-radio:checked ~ .product-type-option {
    border-color: var(--colorssecondary-100);
    background-color: rgba(84, 58, 248, 0.05);
  }
  
  .product-type-label {
    font-size: 15px;
    cursor: pointer;
  }
  
  .area-code-select {
    width: 80px;
    flex-shrink: 0;
  }
  
  .mobile-input {
    flex: 1;
  }
  
  .data-plans-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .data-plan-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .data-plan-card:hover {
    border-color: var(--colorssecondary-100);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.1);
  }
  
  .data-plan-info {
    flex: 1;
  }
  
  .data-plan-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .data-plan-data {
    font-size: 14px;
    color: var(--colorssecondary-100);
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .data-plan-price {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  
  .data-plan-radio {
    width: 20px;
    height: 20px;
    accent-color: var(--colorssecondary-100);
  }
`;typeof document<"u"&&document.head.appendChild(Ny);const Ry="/assets/Visa-CsMzp_Ry.png",FT="/assets/Mastercard-vPVMYqzt.png",zy={"first-caribbean":"First Caribbean Bank",jmmb:"JMMB","jamaica-national":"Jamaica National Bank",ncb:"National Commercial Bank",scotia:"Scotia Bank"},Ly=[{code:"JMD",label:"Jamaican Dollar (JMD)",flag:qo},{code:"USD",label:"US Dollar (USD)",flag:Fo},{code:"CAD",label:"Canadian Dollar (CAD)",flag:jo},{code:"GBP",label:"Pound Sterling (GBP)",flag:Go},{code:"KYD",label:"Cayman Islands Dollar (KYD)",flag:xy}];let xt={bankId:null,cardType:"",currency:"",cardNumber:"",expiry:"",name:"",cvv:"",brand:"visa",popupShown:!1,popupAcknowledged:!1};function GT(){const a=k("#app");a&&(a.innerHTML=`
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackReceive">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Receive</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Cash in to NovaPay</h3>
          <p class="form-hint" style="margin-bottom: 20px;">Choose how you'd like to add money.</p>
        </div>

        <div class="receive-methods">
          <button class="receive-method-card" data-method="card" type="button">
            <div class="receive-method-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div class="receive-method-info">
              <h4 class="receive-method-name">Debit / Credit Card</h4>
              <p class="receive-method-desc">Add money using your card</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,D("click","#btnBackReceive",()=>{Y("/dashboard",{animate:"slide-left-fade"})}),D(a,".receive-method-card","click",i=>{i.currentTarget.dataset.method==="card"&&(Fd(null),Y("/receive/add-card/none",{animate:"slide-right-fade"}))}))}function YT(){const a=k("#app");if(!a)return;a.innerHTML=`
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackReceiveBank">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Select Bank</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Choose Your Bank</h3>
          <p class="form-hint" style="margin-bottom: 20px;">Select the bank that issued your card.</p>
        </div>

        <div class="bank-providers">
          <div class="bank-provider-card" data-bank="first-caribbean">
            <div class="bank-provider-logo">
              <img src="${Yo}" alt="First Caribbean Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">First Caribbean Bank</h4>
              <p class="bank-provider-desc">CIBC First Caribbean</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jmmb">
            <div class="bank-provider-logo">
              <img src="${_o}" alt="JMMB" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">JMMB</h4>
              <p class="bank-provider-desc">Jamaica Money Market Brokers</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jamaica-national">
            <div class="bank-provider-logo">
              <img src="${Qo}" alt="Jamaica National Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Jamaica National Bank</h4>
              <p class="bank-provider-desc">JN Bank</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="ncb">
            <div class="bank-provider-logo">
              <img src="${Jo}" alt="National Commercial Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">National Commercial Bank</h4>
              <p class="bank-provider-desc">NCB Jamaica</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="scotia">
            <div class="bank-provider-logo">
              <img src="${Xo}" alt="Scotia Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Scotia Bank</h4>
              <p class="bank-provider-desc">Scotiabank Jamaica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackReceiveBank",()=>{Y("/receive",{animate:"slide-left-fade"})}),a.querySelectorAll(".bank-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.bank;Fd(r),Y(`/receive/add-card/${r}`,{animate:"slide-right-fade"})})})}function _T(a){const i=k("#app");if(!i)return;Fd(a&&a!=="none"?a:null);const l=xt.bankId?zy[xt.bankId]||"Selected Bank":"";i.innerHTML=`
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackReceiveAddCard">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Add a Card</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="receive-card-preview">
          <div class="receive-card-visual">
            <img src="${Ry}" alt="Card network" class="receive-card-network" id="receiveCardNetwork" />
          </div>
        </div>

        <form id="receiveCardForm">
          <div class="form-field" id="receiveBankField">
            <label class="form-label">Bank Issuer</label>
            <button type="button" class="receive-select-trigger" id="receiveBankTrigger">
              <span class="receive-select-value" id="receiveBankSelectedLabel">${l||"Select bank"}</span>
              <span class="receive-select-chevron">▾</span>
            </button>
            <div class="receive-select-menu np-hidden" id="receiveBankMenu">
              <button type="button" class="receive-select-option" data-bank="first-caribbean">
                <img src="${Yo}" alt="First Caribbean Bank" class="receive-bank-logo" />
                <span>First Caribbean Bank</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="jmmb">
                <img src="${_o}" alt="JMMB" class="receive-bank-logo" />
                <span>JMMB</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="jamaica-national">
                <img src="${Qo}" alt="Jamaica National Bank" class="receive-bank-logo" />
                <span>Jamaica National Bank</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="ncb">
                <img src="${Jo}" alt="National Commercial Bank" class="receive-bank-logo" />
                <span>National Commercial Bank</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="scotia">
                <img src="${Xo}" alt="Scotia Bank" class="receive-bank-logo" />
                <span>Scotia Bank</span>
              </button>
            </div>
          </div>

          <div class="form-field np-hidden" id="receiveCardTypeField">
            <label class="form-label" for="receiveCardType">Select card type</label>
            <select id="receiveCardType" class="form-input-modern">
              <option value="">Select card type</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>

          <div class="form-field np-hidden" id="receiveCurrencyField">
            <label class="form-label">Select Currency</label>
            <button type="button" class="receive-select-trigger" id="receiveCurrencyTrigger">
              <span class="receive-select-value" id="receiveCurrencySelectedLabel">Select currency</span>
              <span class="receive-select-chevron">▾</span>
            </button>
            <div class="receive-select-menu np-hidden" id="receiveCurrencyMenu">
              ${Ly.map(r=>`
                <button type="button" class="receive-select-option" data-code="${r.code}">
                  <img src="${r.flag}" alt="${r.label}" class="receive-currency-flag" />
                  <span>${r.label}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="form-field np-hidden" id="receiveNumberField">
            <label class="form-label" for="receiveCardNumber">Enter your card number</label>
            <input
              type="text"
              id="receiveCardNumber"
              class="form-input-modern"
              placeholder="1234-5678-9012-3456"
              inputmode="numeric"
              maxlength="19"
            />
          </div>

          <div class="form-field np-hidden" id="receiveExpiryField">
            <label class="form-label" for="receiveExpiry">Enter expiration date</label>
            <input
              type="text"
              id="receiveExpiry"
              class="form-input-modern"
              placeholder="MM/YY"
              inputmode="numeric"
              maxlength="5"
            />
          </div>

          <div class="form-field np-hidden" id="receiveNameField">
            <label class="form-label" for="receiveName">Enter cardholders name</label>
            <input
              type="text"
              id="receiveName"
              class="form-input-modern"
              placeholder="Cardholder name"
            />
          </div>

          <div class="form-field np-hidden" id="receiveCVVField">
            <label class="form-label" for="receiveCVV">Enter CVV</label>
            <input
              type="password"
              id="receiveCVV"
              class="form-input-modern"
              placeholder="CVV"
              inputmode="numeric"
              maxlength="3"
            />
          </div>

          <div class="form-field">
            <button type="submit" class="btn-primary-modern" id="btnReceiveComplete" disabled>
              Complete
            </button>
          </div>
        </form>
      </div>

      <div class="receive-modal np-hidden" id="receiveModal">
        <div class="receive-modal-backdrop"></div>
        <div class="receive-modal-dialog">
          <h2 class="receive-modal-title">Stay Informed</h2>
          <p class="receive-modal-body">We'll charge a refundable amount to validate your card.</p>
          <div class="receive-modal-footer">
            <button type="button" class="btn-primary-modern" id="receiveModalOk">OK</button>
          </div>
        </div>
      </div>
    </div>
  `,QT()}function Fd(a){xt={bankId:a||null,cardType:"",currency:"",cardNumber:"",expiry:"",name:"",cvv:"",brand:"visa",popupShown:!1,popupAcknowledged:!1}}function QT(){const a=k("#app");if(!a)return;const i=k("#receiveBankTrigger"),l=k("#receiveBankMenu");i&&l&&(i.addEventListener("click",()=>{l.classList.toggle("np-hidden")}),l.querySelectorAll(".receive-select-option").forEach(d=>{d.addEventListener("click",()=>{const v=d.dataset.bank;xt.bankId=v;const p=k("#receiveBankSelectedLabel");p&&(p.textContent=zy[v]||"Selected Bank"),l.classList.add("np-hidden"),Oa(),Ou(),Rn()})}));const r=k("#receiveCurrencyTrigger"),u=k("#receiveCurrencyMenu");r&&u&&(r.addEventListener("click",()=>{u.classList.toggle("np-hidden")}),u.querySelectorAll(".receive-select-option").forEach(d=>{d.addEventListener("click",()=>{const v=d.dataset.code;xt.currency=v;const p=Ly.find(g=>g.code===v),m=k("#receiveCurrencySelectedLabel");m&&p&&(m.textContent=p.label),u.classList.add("np-hidden"),Oa(),Rn()})})),D("click","#btnBackReceiveAddCard",()=>{Y("/receive",{animate:"slide-left-fade"})}),D(a,"#receiveCardType","change",f=>{xt.cardType=f.target.value,Oa(),Rn()}),D(a,"#receiveCardNumber","input",f=>{const d=f.target.value.replace(/[^0-9]/g,"").slice(0,16);xt.cardNumber=d,d.length>=6?xt.brand=JT(d):xt.brand="visa",f.target.value=XT(d),Ou(),Oa(),Rn()}),D(a,"#receiveExpiry","input",f=>{let d=f.target.value.replace(/[^0-9]/g,"").slice(0,4);d.length>2&&(d=d.slice(0,2)+"/"+d.slice(2)),f.target.value=d,xt.expiry=d,Oa(),Rn()}),D(a,"#receiveName","input",f=>{const d=f.target.value.replace(/[^A-Za-z\s]/g,"");f.target.value=d,xt.name=d.trim(),Oa(),Rn()}),D(a,"#receiveCVV","input",f=>{const d=f.target.value.replace(/[^0-9]/g,"").slice(0,3);f.target.value=d,xt.cvv=d,Rn()}),D("click","#receiveModalOk",()=>{const f=k("#receiveModal");xt.popupAcknowledged=!0,f&&f.classList.add("np-hidden"),Rn()}),D(a,"#receiveCardForm","submit",f=>{f.preventDefault();const d=k("#btnReceiveComplete");if(!(!d||d.disabled)){if(!Vy()){q("Please complete all required fields.");return}try{const v=xt.brand==="mastercard"?"Mastercard":"Visa",p=xt.cardType==="debit"?"Debit Card":"Credit Card",m=`${v} ${p}`,g=xt.cardNumber.slice(-4),b={id:"card-"+Date.now(),brand:xt.brand,cardType:xt.cardType,label:m,last4:g,verified:!1};Array.isArray(V.card.savedCards)||(V.card.savedCards=[]),V.card.savedCards.push(b),tn()}catch(v){console.error("[Receive] Failed to save card locally",v)}q("Card saved successfully. Cash-in flow coming soon."),Y("/dashboard",{animate:"slide-left-fade"})}}),Ou(),Oa(),Rn()}function JT(a){if(a[0]==="4")return"visa";if(a.length>=2){const i=parseInt(a.slice(0,2),10);if(i>=51&&i<=55)return"mastercard"}if(a.length>=4){const i=parseInt(a.slice(0,4),10);if(i>=2221&&i<=2720)return"mastercard"}return"visa"}function XT(a){const i=[];for(let l=0;l<a.length;l+=4)i.push(a.slice(l,l+4));return i.join("-")}function Ou(){const a=k("#receiveCardNetwork");a&&(a.src=xt.brand==="mastercard"?FT:Ry)}function Uy(a){const i=/^([0-9]{2})\/([0-9]{2})$/.exec(a||"");if(!i)return!1;const l=parseInt(i[1],10),r=parseInt(i[2],10);if(l<1||l>12)return!1;const u=new Date,f=u.getFullYear()%100,d=u.getMonth()+1;return!(r<f||r===f&&l<d)}function Oy(a){return!!a&&a.trim().length>=2}function Vy(){return!!xt.bankId&&!!xt.cardType&&!!xt.currency&&xt.cardNumber.length===16&&Uy(xt.expiry)&&Oy(xt.name)&&xt.cvv.length===3}function Oa(){const a=k("#receiveCardTypeField"),i=k("#receiveCurrencyField"),l=k("#receiveNumberField"),r=k("#receiveExpiryField"),u=k("#receiveNameField"),f=k("#receiveCVVField");a&&a.classList.toggle("np-hidden",!xt.bankId),i&&i.classList.toggle("np-hidden",!xt.cardType),l&&l.classList.toggle("np-hidden",!xt.currency),r&&r.classList.toggle("np-hidden",xt.cardNumber.length!==16),u&&u.classList.toggle("np-hidden",!Uy(xt.expiry)),f&&f.classList.toggle("np-hidden",!Oy(xt.name))}function Rn(){const a=k("#btnReceiveComplete");if(!a)return;const i=Vy();if(i&&!xt.popupShown){xt.popupShown=!0;const l=k("#receiveModal");l&&l.classList.remove("np-hidden")}a.disabled=!(i&&xt.popupAcknowledged)}const Hy=document.createElement("style");Hy.textContent=`
  .receive-methods {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  .receive-method-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    width: 100%;
    text-align: left;
  }
  .receive-method-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  .receive-method-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(84, 58, 248, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorssecondary-100);
    flex-shrink: 0;
  }
  .receive-method-info { flex: 1; }
  .receive-method-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  .receive-method-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  .receive-card-preview { margin-bottom: 24px; }
  .receive-card-visual {
    width: 100%;
    max-width: 320px;
    margin: 0 auto 8px;
    padding: 24px 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    box-shadow: none;
  }
  .receive-card-bank { display: none; }
  .receive-card-network {
    position: static;
    width: 120px;
    height: auto;
  }
  .receive-currency-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .receive-currency-flag {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 4px;
  }
  .receive-select-trigger {
    width: 100%;
    margin-top: 4px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid #E0E0E0;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: var(--colorscharade-100);
  }
  .receive-select-value {
    flex: 1;
    text-align: left;
  }
  .receive-select-chevron {
    margin-left: 8px;
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  .receive-select-menu {
    margin-top: 12px;
  }
  .receive-select-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;
    text-align: left;
    cursor: pointer;
    position: relative;
    margin-bottom: 12px;
  }
  .receive-select-option::after {
    content: '→';
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  .receive-select-option:last-child {
    margin-bottom: 0;
  }
  .receive-bank-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: contain;
    flex-shrink: 0;
  }
  .receive-modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1600;
  }
  .receive-modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
  }
  .receive-modal-dialog {
    position: relative;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 20px 20px 16px;
    max-width: 320px;
    width: 90%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .receive-modal-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--colorscharade-100);
  }
  .receive-modal-body {
    font-size: 14px;
    color: var(--colorscharade-70);
    margin-bottom: 16px;
  }
  .receive-modal-footer { text-align: right; }
  .np-hidden { display: none !important; }
`;typeof document<"u"&&document.head.appendChild(Hy);class PT{constructor(){this.routes=new Map,this.currentRoute=null,this.defaultRoute="/login",this.authRoute="/dashboard",this.pendingAnimation=null,window.addEventListener("hashchange",()=>this.handleRoute()),window.addEventListener("load",()=>this.handleRoute()),console.log("[Router] Initialized hash-based routing system ✅")}addRoute(i,l,r=!1){this.routes.set(i,{handler:l,requiresAuth:r})}setDefaults(i,l){this.defaultRoute=i,this.authRoute=l}matchRoute(i){const l=this.routes.get(i);if(l)return{path:i,params:{},...l};for(const[r,u]of this.routes.entries()){if(!r.includes(":"))continue;const f=[],d=r.split("/").map(m=>m.startsWith(":")?(f.push(m.slice(1)),"([^/]+)"):m).join("/"),v=new RegExp(`^${d}$`),p=i.match(v);if(p){const m={};return f.forEach((g,b)=>{m[g]=p[b+1]}),{path:r,params:m,...u}}}return null}navigate(i,l={}){this.pendingAnimation=l&&l.animate?l.animate:null,window.location.hash!==`#${i}`?window.location.hash=i:this.handleRoute()}redirect(i){window.location.replace(`#${i}`)}goBack(){window.history.back()}getCurrentHash(){return window.location.hash.slice(1)||""}handleRoute(){const i=this.getCurrentHash();console.log(`[Router] Handling route: ${i||"(none)"}`);const l=this.matchRoute(i);if(!l){const r=fu()?this.authRoute:this.defaultRoute;console.warn(`[Router] Unknown route "${i}". Redirecting to: ${r}`),this.redirect(r);return}if(l.requiresAuth){if(!fu()){console.warn(`[Router] Protected route "${i}" blocked — user not logged in`),this.redirect(this.defaultRoute);return}if(!g2()){console.warn(`[Router] Protected route "${i}" blocked — session timed out`);return}}if(!l.requiresAuth&&fu()&&(i==="/login"||i==="/register"||i==="/landing"||i==="/forgot-password"||i==="/check-email")){console.log(`[Router] User logged in, redirecting from public route "${i}" to dashboard`),this.redirect(this.authRoute);return}try{console.log(`[Router] Rendering route: ${i}`);const r=document.getElementById("app");r&&(r.innerHTML=""),l.handler(l.params||{}),this.applyAnimation(),this.currentRoute=i}catch(r){console.error(`[Router] Error rendering route "${i}":`,r);const u=document.getElementById("app");u&&(u.innerHTML=`
          <div style="padding:20px;color:#fff;background:#111;text-align:center;">
            <h3>🚨 Rendering Error</h3>
            <p>${r.message}</p>
          </div>`)}}applyAnimation(){if(!this.pendingAnimation)return;const i=document.getElementById("app");if(!i){this.pendingAnimation=null;return}const r={"slide-right-fade":"np-anim-slide-right-fade","slide-left-fade":"np-anim-slide-left-fade"}[this.pendingAnimation];this.pendingAnimation=null,r&&(i.classList.remove("np-anim-slide-right-fade","np-anim-slide-left-fade"),i.offsetWidth,i.classList.add(r),i.addEventListener("animationend",()=>{i.classList.remove(r)},{once:!0}))}}const dt=new PT;function Y(a,i){dt.navigate(a,i||{})}function ca(){dt.goBack()}dt.addRoute("/login",y2);dt.addRoute("/register",b2);dt.addRoute("/forgot-password",x2);dt.addRoute("/check-email",S2);dt.addRoute("/landing",yw);dt.addRoute("/dashboard",w2,!0);dt.addRoute("/transfers",Gs,!0);dt.addRoute("/add-money",ww,!0);dt.addRoute("/receive",GT,!0);dt.addRoute("/receive/select-bank",YT,!0);dt.addRoute("/receive/add-card/:bank",a=>_T(a.bank),!0);dt.addRoute("/bills",()=>Y("/more/billers"),!0);dt.addRoute("/withdraw",jd,!0);dt.addRoute("/card",py,!0);dt.addRoute("/profile",Uw,!0);dt.addRoute("/notifications",by,!0);dt.addRoute("/change-profile-picture",ET,!0);dt.addRoute("/transactions",qw,!0);dt.addRoute("/finances",Kw,!0);dt.addRoute("/scan-qr",id,!0);dt.addRoute("/kyc",Zw,!0);dt.addRoute("/settings",nT,!0);dt.addRoute("/personal-info",aT,!0);dt.addRoute("/more/billers",lT,!0);dt.addRoute("/more/billers/:id",fT,!0);dt.addRoute("/more/billers/:id/confirm",pT,!0);dt.addRoute("/more/billers/:id/success",vT,!0);dt.addRoute("/remittance",bT,!0);dt.addRoute("/remittance/western-union",xT,!0);dt.addRoute("/remittance/moneygram",wT,!0);dt.addRoute("/remittance/success",CT,!0);dt.addRoute("/remittance/error",MT,!0);dt.addRoute("/bank-selection",zT,!0);dt.addRoute("/bank-details/:bank",a=>LT(a.bank),!0);dt.addRoute("/network-selection",VT,!0);dt.addRoute("/network-details/:network",a=>HT(a.network),!0);dt.setDefaults("/landing","/dashboard");console.log("[Router] Routes registered:",Array.from(dt.routes.keys()));function KT(){const a=()=>{document.documentElement.style.setProperty("--app-height",`${window.innerHeight}px`)};a(),window.addEventListener("resize",a),window.addEventListener("orientationchange",a),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(window.addEventListener("orientationchange",()=>{setTimeout(a,100)}),/iPhone|iPad|iPod/i.test(navigator.userAgent)&&window.addEventListener("scroll",()=>{document.activeElement.tagName==="INPUT"&&document.activeElement.scrollIntoView()}))}console.log("[NovaPay] Vite frontend initializing...");try{u2()}catch(a){console.error("[NovaPay] Failed to load auth token:",a)}function kg(){KT(),Bg()||v2(),!location.hash||location.hash==="#/"||location.hash===""?(console.log("[NovaPay] No hash detected, redirecting to /login"),Y("/login")):(console.log(`[NovaPay] Hash detected: ${location.hash}`),window.dispatchEvent(new Event("hashchange")))}function Cg(){const a=document.getElementById("app");a&&!a.innerHTML.trim()&&(a.innerHTML=`
      <div style="padding:16px;color:#fff;background:#111;text-align:center;">
        <h2>🚀 NovaPay Loaded</h2>
        <p>Frontend running. Check router or console for issues.</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `,console.warn("[NovaPay] Failsafe rendered: router did not paint any view."))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{console.log("[NovaPay] DOMContentLoaded → initializing..."),kg(),setTimeout(Cg,500)}):(console.log("[NovaPay] DOM ready → initializing immediately..."),kg(),setTimeout(Cg,500));
