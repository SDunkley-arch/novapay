(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const m of u)if(m.type==="childList")for(const d of m.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function l(u){const m={};return u.integrity&&(m.integrity=u.integrity),u.referrerPolicy&&(m.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?m.credentials="include":u.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function r(u){if(u.ep)return;u.ep=!0;const m=l(u);fetch(u.href,m)}})();const _c=/Android/i.test(navigator.userAgent),Up=location.hostname==="localhost"||location.hostname==="127.0.0.1",Wc=typeof window<"u"&&!!window.Capacitor;let nn;const Z1="http://localhost:4000",$c=location.hostname;if(!_c&&!Wc)nn=Z1;else if(Wc&&_c)if(navigator.userAgent.includes("Android SDK"))nn="http://10.0.2.2:4000",console.log("[NovaPay] Android emulator detected, using 10.0.2.2:4000");else{const l=window.location.href.match(/http:\/\/(\d+\.\d+\.\d+\.\d+)/);l&&l[1]?(nn=`http://${l[1]}:4000`,console.log("[NovaPay] Using extracted IP from current URL:",nn)):(nn="http://192.168.0.5:4000",console.log("[NovaPay] Using hardcoded development IP:",nn))}else Wc?nn=`http://${$c}:4000`:_c&&($c==="10.0.2.2"||Up)?nn="http://10.0.2.2:4000":Up?nn="http://localhost:4000":nn=`http://${$c}:4000`;const Ns=nn;try{console.log("[NovaPay] API_BASE_URL =",Ns)}catch{}let Ys=null;function bg(a,i){Ys=a;try{const l=i||{},r=l.persist!==void 0?l.persist:!0,u=typeof l.ttlMs=="number"&&l.ttlMs>0;if(!r){localStorage.removeItem("nv_token"),localStorage.removeItem("nv_token_exp");return}if(localStorage.setItem("nv_token",a),u){const m=Date.now()+l.ttlMs;localStorage.setItem("nv_token_exp",String(m))}else localStorage.removeItem("nv_token_exp")}catch{}}function _1(){try{const a=localStorage.getItem("nv_token");if(!a)return;const i=localStorage.getItem("nv_token_exp");if(i){const l=Number(i);if(!Number.isNaN(l)&&Date.now()>l){Ju();return}}Ys=a}catch{}}function Ju(){Ys=null,localStorage.removeItem("nv_token"),localStorage.removeItem("nv_token_exp")}function W1(a={}){const i={"Content-Type":"application/json",...a};return Ys?{...i,Authorization:`Bearer ${Ys}`}:i}async function ja(a,i={}){const l=`${Ns}${a}`;try{console.log("[NovaPay] Fetch",i.method||"GET",l,"Body:",i.body?JSON.parse(i.body):"none"),console.log("[NovaPay] Network status:",navigator.onLine?"Online":"Offline"),console.log("[NovaPay] User agent:",navigator.userAgent)}catch(r){console.error("[NovaPay] Error logging request details:",r)}try{const r=await fetch(l,{...i,headers:W1(i.headers||{})});let u=null;try{u=await r.clone().json()}catch(m){console.error("[NovaPay] JSON parse error:",m),u=null}if(r.status===401)throw Ju(),window.location.hash="#/login",new Error("Unauthorized");if(!r.ok)throw console.error(`[NovaPay] API Error: HTTP ${r.status}`,u),u||new Error(`HTTP ${r.status}`);return u}catch(r){throw console.error("[NovaPay] Network Error:",r),!navigator.onLine||r.name==="TypeError"?{error:{code:"NETWORK_ERROR",message:"Network connection issue. Please check your internet connection."}}:r.code==="ConnectException"||r.message&&r.message.includes("Failed to connect")?(console.error("[NovaPay] Server connection error:",r),{error:{code:"ConnectException",message:"Failed to connect to server. Please check server address and ensure it is running."}}):r}}const j={session:null,balances:{JMD:125e3,USD:180},txs:[{id:"t1",title:"From John",amount:7500,currency:"JMD",type:"P2P_RECV",ts:"2025-09-01"},{id:"t2",title:"JPS Bill",amount:-8500,currency:"JMD",type:"BILL",ts:"2025-09-02"}],notifications:[],savedBillers:[],card:{hasCard:!1,masked:"•••• 1234",expiry:"12/28",frozen:!1,linkedAccounts:[]}},ie={SESSION:"novapay_session",BALANCES:"novapay_balances",TRANSACTIONS:"novapay_transactions",NOTIFICATIONS:"novapay_notifications",BILLERS:"novapay_billers",CARD:"novapay_card"};function $1(){try{const a=localStorage.getItem(ie.SESSION);if(a)try{const d=JSON.parse(a),p=d.rememberMe,h=d.rememberMeExpiresAt;p===!0&&h&&Date.now()>h?localStorage.removeItem(ie.SESSION):j.session=d}catch(d){console.error("Error parsing stored session:",d)}const i=localStorage.getItem(ie.BALANCES);i&&(j.balances=JSON.parse(i));const l=localStorage.getItem(ie.TRANSACTIONS);l&&(j.txs=JSON.parse(l));const r=localStorage.getItem(ie.NOTIFICATIONS);r&&(j.notifications=JSON.parse(r));const u=localStorage.getItem(ie.BILLERS);u&&(j.savedBillers=JSON.parse(u));const m=localStorage.getItem(ie.CARD);m&&(j.card=JSON.parse(m))}catch(a){console.error("Error loading state:",a)}}function sn(){try{if(j.session){const{rememberMe:a,rememberMeExpiresAt:i}=j.session,l=Date.now();a===!0?!i||l<i?localStorage.setItem(ie.SESSION,JSON.stringify(j.session)):localStorage.removeItem(ie.SESSION):a===!1?localStorage.removeItem(ie.SESSION):localStorage.setItem(ie.SESSION,JSON.stringify(j.session))}else localStorage.removeItem(ie.SESSION);localStorage.setItem(ie.BALANCES,JSON.stringify(j.balances)),localStorage.setItem(ie.TRANSACTIONS,JSON.stringify(j.txs)),localStorage.setItem(ie.NOTIFICATIONS,JSON.stringify(j.notifications||[])),localStorage.setItem(ie.BILLERS,JSON.stringify(j.savedBillers)),localStorage.setItem(ie.CARD,JSON.stringify(j.card))}catch(a){console.error("Error saving state:",a)}}function t2(){Object.values(ie).forEach(a=>{localStorage.removeItem(a)})}function tu(){return j.session!==null}function e2(){j.session=null,sn()}function oa(a){const i={id:"t"+Date.now(),ts:new Date().toISOString().split("T")[0],...a};return j.txs.unshift(i),sn(),i}function ra(a,i){j.balances[a]!==void 0&&(j.balances[a]+=i,sn())}function Bn(a,i="JMD"){return j.balances[i]>=a}function n2(a){j.savedBillers.find(l=>l.name===a.name&&l.account===a.account)||(j.savedBillers.push({id:"b"+Date.now(),...a}),sn())}function Ag(){try{j.session=null,j.balances={JMD:0,USD:0},j.txs=[],j.notifications=[],j.savedBillers=[],j.card={hasCard:!1,masked:"",expiry:"",frozen:!1,linkedAccounts:[]},t2(),console.log("[NovaPay] Session cleared successfully")}catch(a){console.error("[NovaPay] Failed to clear session:",a)}}$1();const Xu=120*1e3;let eu=null,xg=Date.now(),zp=!1;function Sg(){try{return zp=!localStorage.getItem("novapay_has_launched"),zp?(localStorage.setItem("novapay_has_launched","true"),console.log("[NovaPay] First launch detected, redirecting to login"),q("/login"),!0):!1}catch(a){return console.error("[NovaPay] Error checking first launch:",a),!1}}function a2(){if(Sg())return;wg(),["mousedown","mousemove","keypress","scroll","touchstart","click","touchmove"].forEach(i=>{document.addEventListener(i,Lp,{passive:!0})}),window.addEventListener("hashchange",Lp),console.log("[NovaPay] Session manager initialized with timeout of",Xu,"ms")}function Lp(){xg=Date.now(),wg()}function wg(){eu&&clearTimeout(eu),eu=setTimeout(Tg,Xu)}function Tg(){console.log("[NovaPay] Session timed out due to inactivity"),Ju(),Ag(),q("/login",{replace:!0,state:{timeout:!0,message:"Your session has expired due to inactivity. Please log in again."}})}function i2(){const a=window.location.hash;return a.includes("/login")||a.includes("/register")||a.includes("/landing")||a.includes("/forgot-password")?!0:Date.now()-xg>=Xu?(Tg(),!1):!0}function M(a){return document.querySelector(a)}function D(a,i,l,r){try{let u=document,m,d,p;const h=g=>typeof g=="string"&&(g[0]==="#"||g[0]==="."||g[0]==="["||g.includes(" "));if(typeof a=="string"&&typeof i=="string"&&typeof l=="function"&&r===void 0){u=document;const g=a,b=i;h(g)&&!h(b)?(m=g,d=b):(h(b)&&h(g),m=b,d=g),p=l}else u=a instanceof Element?a:document,m=i,d=l,p=r;if(typeof p!="function"||typeof d!="string"||typeof m!="string"){console.warn(`[NovaPay] Invalid listener for ${m??i} (${d??l})`);return}if(!u.querySelector(m)){u.addEventListener(d,g=>{g.target.closest(m)&&p(g)});return}const v=u.querySelector(m);v?v.addEventListener(d,p):console.warn(`[NovaPay] Invalid listener for ${m} (${d})`)}catch(u){console.error("[NovaPay] Event binding failed:",u)}}function V(a){alert(a)}const Op=300*1e3;function s2(a={}){const i=M("#app"),l=window.location.hash.includes("timeout=true")?"Your session has expired due to inactivity. Please log in again.":"";localStorage.getItem("novapay_first_launch")===null&&localStorage.setItem("novapay_first_launch","false"),i.innerHTML=`
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
  `,D("click",'[data-testid="btnBack"]',()=>{q("/landing")}),D("click","#forgotPassword",u=>{u.preventDefault(),q("/forgot-password",{animate:"slide-right-fade"})}),console.log("[NovaPay] Login page loaded, API URL:",Ns),D("submit","#loginForm",async u=>{u.preventDefault();const m=M("#email").value.trim(),d=M("#password").value,p=M("#rememberMe"),h=!!p&&p.checked;if(!m){V("Please enter your email address");return}if(!d){V("Please enter your password");return}if(!navigator.onLine){V("No internet connection. Please check your network settings.");return}console.log("[NovaPay] Attempting login for:",m,"to URL:",`${Ns}/auth/login`);const v=M('[data-testid="btnLogin"]');v.textContent="Signing In...",v.disabled=!0;try{const g=await ja("/auth/login",{method:"POST",body:JSON.stringify({email:m,password:d})});bg(g.token,{persist:h,ttlMs:h?Op:0});const b=Date.now();j.session={user:{email:g.user.email,id:g.user.id},kycTier:"TIER_1",rememberMe:h,rememberMeExpiresAt:h?b+Op:null},Array.isArray(j.notifications)||(j.notifications=[]),j.notifications.unshift({id:"n"+Date.now(),message:"Welcome to NovaPay!",createdAt:new Date().toISOString()}),sn(),V("Welcome back!","success"),q("/dashboard")}catch(g){const b=g?.error?.code||g?.message||"LOGIN_FAILED";let x="Unable to sign in";b==="BAD_CRED"?x="Invalid email or password":b==="NO_USER"?x="Account not found":b==="NO_AUTH"?x="Session expired, please log in again":b==="NETWORK_ERROR"||b==="TypeError"||g.name==="TypeError"?x="Network connection issue. Please check your internet connection.":b.includes("CORS")||b.includes("cors")?x="Server connection issue. Please try again later.":(b==="ConnectException"||g.message&&g.message.includes("Failed to connect"))&&(x="Cannot connect to server. Please ensure the server is running and accessible."),console.error("Login Error:",{code:b,message:g.message,stack:g.stack,error:g}),V(x),console.log("[NovaPay] API Base URL:",Ns),console.log("[NovaPay] Network Status:",navigator.onLine?"Online":"Offline"),console.log("[NovaPay] User Agent:",navigator.userAgent)}finally{v.textContent="Sign In",v.disabled=!1}})}function l2(){const a=M("#app");a.innerHTML=`
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
  `,D("click",'[data-testid="btnBack"]',()=>{q("/landing")}),D("submit","#registerForm",async i=>{i.preventDefault();const l=M("#firstName").value.trim(),r=M("#lastName").value.trim(),u=`${l} ${r}`.trim(),m=M("#email").value.trim(),d=M("#phone").value.trim(),p=M("#password").value,h=!!M("#agreeTerms")&&M("#agreeTerms").checked;if(!l||!r||!m||!d||!p||!h){V("Please fill in all fields and agree to the Terms & Conditions");return}if(p.length<6){V("Password must be at least 6 characters");return}const v=M('[data-testid="btnRegister"]');if(v.textContent="Creating Account...",v.disabled=!0,!navigator.onLine){V("No internet connection. Please check your network settings."),v.textContent="Create Account",v.disabled=!1;return}try{const g=await ja("/auth/register",{method:"POST",body:JSON.stringify({name:u,email:m,phone:d,password:p})});bg(g.token),j.session={user:{email:g.user.email,id:g.user.id,name:g.user.name||u,phone:g.user.phone||d},kycTier:"TIER_1"},sn(),V("Account created successfully!","success"),q("/dashboard")}catch(g){const b=g?.error?.code||g?.message||"REGISTER_FAILED";let x="Unable to create account. Please try again.";b==="EXISTS"?x="An account with this email already exists":b==="BAD_INPUT"?x="Please check your information and try again":b==="INVALID_EMAIL"?x="Please enter a valid email address":b==="WEAK_PASSWORD"?x="Password is too weak":(b==="NETWORK_ERROR"||b==="TypeError"||g.name==="TypeError")&&(x="Network connection issue. Please check your internet connection."),console.error("Registration Error:",{code:b,message:g.message,stack:g.stack,error:g}),V(x)}finally{v.textContent="Create Account",v.disabled=!1}}),D("input","#phone",i=>{let l=i.target.value.replace(/\D/g,"");l.length>=3&&(l=l.replace(/(\d{3})(\d{0,3})(\d{0,4})/,(r,u,m,d)=>{let p=u;return m&&(p+="-"+m),d&&(p+="-"+d),p})),i.target.value=l})}const Cg="/assets/Popup-VzOhX8gb.png";function o2(){const a=M("#app");a&&(a.innerHTML=`
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
            <img src="${Cg}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnForgotPopupDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `,D("click",'[data-testid="btnBack"]',()=>{q("/login",{animate:"slide-left-fade"})}),D("submit","#forgotPasswordForm",async i=>{i.preventDefault();const l=M("#forgotEmail"),r=l?l.value.trim():"";if(!r){V("Please enter your email address");return}sessionStorage.setItem("novapay_password_recovery_email",r);const u=M('[data-testid="btnForgotPasswordContinue"]');u&&(u.textContent="Sending...",u.disabled=!0);try{V("If an account exists for this email, we will send reset instructions.","info")}finally{u&&(u.textContent="Continue",u.disabled=!1)}const m=M("#forgotRecoveryBase"),d=M("#forgotRecoverySheet");m&&m.classList.add("password-recovery-base"),d&&(d.style.display="flex")}),D("click","#btnForgotPopupDone",()=>{const i=M("#forgotRecoveryBase"),l=M("#forgotRecoverySheet");i&&i.classList.remove("password-recovery-base"),l&&(l.style.display="none"),sessionStorage.removeItem("novapay_password_recovery_email"),q("/login",{animate:"slide-left-fade"})}))}function r2(){const a=M("#app");if(!a)return;const l=sessionStorage.getItem("novapay_password_recovery_email")||""||"your email",r=c2(l);a.innerHTML=`
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
            <img src="${Cg}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnCheckEmailDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `,D("click",'[data-testid="btnBack"]',()=>{q("/forgot-password",{animate:"slide-left-fade"})}),D("click","#btnCheckEmailDone",()=>{sessionStorage.removeItem("novapay_password_recovery_email"),q("/login",{animate:"slide-left-fade"})})}function c2(a){return String(a).replace(/[&<>"']/g,i=>i==="&"?"&amp;":i==="<"?"&lt;":i===">"?"&gt;":i==='"'?"&quot;":"&#39;")}const u2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABQCAYAAACzg5PLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAjYSURBVHhe7ZxNTFvZFcf/59omJngkWBDBaoxUNuNKsUdirKRqMKuqsCApgW1hZtdkymwymyxipIlaqZuhgu6SMMsCScOCdImZSJMykcZEKrNhMZ4VESzGVZzYiZ/v6eL5mefr5+cP3jMfzk+KCPe+gO8/55x77rn3PsIxMD7M3d5cLkwkwyDPRTB3s6AwABAQLHuYOc2gFAFpJtomqf3MLLY1v397bZPSZc+2AFIb3GIimo3BI8aJOQxCTO1vBmZsgyiBglx7uNWZUPvdwFXBxqPZoM9DfwTzFyDqVvsdJgVGIi95bm2rM6V2OoUrgk1EszESdMcpS2oYyY+ZMe+G1Tkq2LELpaJb3IyTFueIYOPD3O3N5+4Q6Au170TAWHLKVY8s2B8u5a4K8IMWxKijkpLguUffdS6pHY3QtGAn3qqqwMxfax3+uWZTkqYEG49mg14PbVTkTKeHVL7AI824qFAbajE5lAmfcrEAIOjz0MbkUCasdtSiIQubHMqE2evZOAXxqj4YadK0kZXngW21qxp1C3bmxDJoULS6BDuzYhk0IFpNwc5AgK+XuiYCW8H01OFtsg3EMkjlfecidimH7Syp51ltIxYABL3vcnfURjNVLWwymp1mDz1Q29sBybj26Jn/sdqOaoK1UdyyhpHOd5wbsHJNS5f0Cmo3VyyH0F3NNSssrFj0+0ltb0e4wCNqTa3CwnyiPeOWFSSowsrKBJuIZmMnpvh3EiDEJqLZMj3KXPL65bf/Aviqua2VnA8QAh8AvX2E/T3GwUtWHykRHCR0BSoiSs1/1zCMxOoz/4jxbek3HlfsCkUIQ1c8CEUEgoOHArzOANO/e1v2rEFsVODGbZ/aXOLWdB6pXak2N02+wAPGCqDkkl4Lf3WTUIQQX/AhvtCBsSlPmVj7e2w74DevgNQuY39P//MmU25RXYGyb4+MV2Da+HvpU05czv3UilTifIAw9ZkHY1OeUttOUiKxLvHjtsT+XmPu1NtHmFvwobf/UPD4zTx2ktUFbxhGevWZvweGYBPRbIw8tKE+5zTq4BJPCli+X8BBgyIZmH/ewUtGV0D/D3FcMFOKobukx/1Arw4ufjOPxbuaY2LduZlH5pX6lIN4cBWlGEY0rPY7yflA5eCOYgFWYjUrfL0Q00UAEOPDv3QT6wdB3GJm1uPY4I5DLEDPycaHuVt4c35XxQpFBGKjeoBf/Ko+FwxFCKFIxSIEAGzF+mZew9K8diTrtcOby4UFkXRVsMlPvUAxwNczkK4AEF/oQHzBOs/a34OlWADw/VOJ9eVCWZuTEFGYJi6/+ZogZtVOJwgOCvxtSR/4n66/qxigmVCEMD3rK8vHUEw5Fr/SnM3em4WxJIjFRbXdKWK/193q+6fSVqzePkJ8oaNCLBRdem7Bh/MWy6CWw7JHsGDXdoJ+/bEu2PNv7V3RSGJTu3q6YXBr+h0OXjJ6+wmxUeuY1lKEuChIupfdf1i0mNRudesCgK4P9K87SYl9k+uldhkb63pMumDK5I8T4dZeY3Dw0CLs1oUwCTo25cHMnw+XTACQ+LfE8j3N1WDeAEHX7NxYANvFLoP15QIST3RBhq4cCnbjthcX+ggrdS6fvvyLD/9Y7XA13rkmWKMs3tUQv5kvCQcAsVFPsaJhnWKofDhI6O0nDFhMHk7hmmBGLDJXEarR20eYnvVif4+xfP9QMEO8UERg1FTdqIYR515n1B7nEAzYbo03y5tXhy5UK2CPTenlHnUmXLyrYf2fumi1rKaRmNk0jLRrFvY6A/xcDOYfhe0HaySlI6MeDPzq8NkL/YRQMTWpZTXBQf2ra2IBYHBKEKjmiZVm+e8P+oePjdm7U+JJoZRv3frrYbxaXD1MZmvNkp/8Vv8dO8nak0OzECgtJMv/qR1O8fypLlgoItDbV93KXmegl3x+qByskczazZK9fYShK7olJp64aGHEL4Rg6ZqF7SRlSYSpz+yt7GCPEf/8XdnGx+Rv3uLW9Luai3bjZ+8kpasuSZJSglm4JhgArNzXgGKKUK1kY8awNvMSyY5QhErlo5V79m57VJh5W2j+nKuC7SQlnhRnuhu3vbauafBjUta0KhRd0dhuq7d8dBQ0v39brG32pMFw/E6OmeX7enmmt79YLa1DtFqoldcHf3ffutY2SU8rmOQL9QEnMdzMLFo97lmNUKSyTG3O+1yBsIlSpl8gy8NjTnKwV6ySFkWLL/jqdlED3QW9iC90VC1Tu0YBj2HeyL1+KfuLW5ULM10BYHrWWwrUKBYYn3+rz3BqKehCP+GjMCE2Vj5prC/re5quW5ZOavU7/wDKdr4vZeNErTsuEIoITH7qRejjSgszdr+tllQ7SYmVe+4H+DIYS6vP/DM4CYdRgoN6WqAeRjGT2mXsJHUrbKlQRcyHUco+4fVLuY3jPh9mPsZ08JKRyZQv5FuOlGur/zlfOhlQJlirzlicJtRjm2Vz+8OtzoTbOdmpgpGoecaVJc+pbe1KXvKM2lYh2MOtzgRDzqvtbQdjyereUYVgAKD53sbBXHGov41I5at4mqVga5s9aQlZYY7tgkT1NxBYCgYAj551PW5H12TwvN2bB6oKhqJrurVJckJJaT5/XG00YyvY2mZPWivwSJuIpl8wtbiQZcZWMABY2+pMibx27UxPAsxpymvXqsUtM9aLNwvO7L1v5jRphbrue6MRwXAWRWtQLNTjkmZWnge2SSuclZiWalQsNGphBmfgxm5dbxCwoiELM1jb6kxpvmzkNOZpDJ7P+85FmhELzVqYmclodlp6TsGVZ+a0BM1Uu/xeL01ZmJmVrc4lrcAjkvkbte+kwOD5fId/4KhiwQkLMzMezQZ9gh4cd9W2BCPBkufUmtZRcFQwg4loNkaEWQhy/dKXJS4IZeCKYAbj0WzQIxAnomHXYxxzmoF5TVrXsZzCVcHM6C++xVUwhokcugzGSDDxCxTw2A1rsqJlgpkxv1qZhQgS00UGdxMQVFcRRpJMkrdBlAYXXhznq5Xf8573vOc083/1eD/nOqRuRwAAAABJRU5ErkJggg==",d2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABQCAYAAACzg5PLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAjGSURBVHhe7ZxNTFtXFsf/5z6bmI9KsADBqkYaNvVIwZUYKx1NMKvRwIJkCGwH2t0kHbpJNVIWMVKjjtRNGcHskjDLARLBgswS02iaoZFqIg3dZFF3RRQWdTWmJvj5ni6en3m+fn7+4D3z4fw2hHsfju9f55x77rn3PsIpMD7Mnb7Dw0EiOQjSLoO5kwUNAgABwaKHmVMMShKQYqIdkvoPzGJHDwR21rcoVfRsAyC1wSsmIpkoNDFOzIMgRNX+emDGDojiyMn1R9utcbXfCzwVbDySCfo1+hOYPwFRp9rvMkkw4lnJc+vbrUm10y08EWwikomSoLtuWVLNSF5jxrwXVueqYKculIphcTNuWpwrgo0Pc6cve3iXQJ+ofWcCxpJbrnpiwf545fCaAD9sQIw6KUkJnnv8deuS2lELdQt25q2qDMz8pd4SmKs3JalLsPFIJujTaLMkZzo/JLM5HqnHRYXaUInJofTgORcLAIJ+jTYnh9KDakclarKwyaH0IPu0zXMQr6qDkSJdH1l53rGjdpWjasEunFgmNYpWlWAXViyTGkSrKNgFCPDVUtVE4CiYkTq8STSBWCbJrP9S2CnlcJwljTyracQCgKDv6PCu2milrIVNRjLTrNFDtb0ZkIzrj58F1tR2lBOsieKWPYxUtuVSv51r2rqkT1CzuWIxhM5yrlliYfmi3/dqezPCOR5Ra2olFuYXzRm37CBBJVZWJNhEJBM9M8W/swAhOhHJFOlRJBhpYtb6e6Np6yD09BFCYYHu3pJoUZG2Dqrr75xQrazw6acVu0JhwtBVDaGwQHDgeLAHaWD692+KnnWiu5cwt+BHdx/h9nQWyZdSfaRusjnuN1cABQvz2firl4TChNiCH7GFFoxNaUVivd7jsgMem9Jw+2/+ojarWPuvGAdpLuo/KT6BafPfhW858cHh941IJdo6CFMfaRib0gptuwmJ+IbEdzsSr/ecB7vyn0sAgJs3jvB6j0vEunsri/0Kn1EzjNTqs0AXTMEmIpkoabSpPuc21sEBQPxJDssPcjUN0CoYM7wXK4+ZYhguqfE19QG3US0hdiuLxXt63QNUP89LsQAAGq6hEMOIhtV+N2nrKB3cbsI+RlXLp5/7GicWAGK6DABifPjHTmLjIIhXzMxqrg+u7R3CQRpYvKeDAPTk3dwzCNHxYe4kr+NXKCwQWzBmtViVlhUKEwCyfdaMYXZ881Tii79m1WbX4ByPCCLpqXVNfugD8gHeTgCV9g4gttBSEFll99vy1umG5TpBRIM08cHPXxK8yfCDAwJfLBkD//ONI8cBhcKE6Vl/UT6GfMqx+JmO/Vfl/7ZhMJYEsbistrtF9A/GnPLNU+koVncvIbbQUiIW8i49t+BHW0dpX8Nh2SVYsGc7Qb9+3xDs+VfOrmgmscmXRrphcnv6CPuvGN19hOhoSWGl8QhxWZD0Lrt/N28xyZflrQsA2t8xfu4mJF5bXC/5krG5kQMaMQtWifBqrzE4cGwR5daFJqagY1MaZv5yvGQCgPi/JZbv69hYNoQ7ZYKe2Xl7h/HTKXaZbCznCrPf0NVjwW7e8aGnl7BS5fLp08/9+Mdqi6fxzjPBaiX28RFit7KIPzm2pOiolq9o2KcYKu8OELr7CP02k4dbeCaYGYvMhbYT3b2E6VkfXu8xlh8cC2aKFwoLjFqqG+Uw49xBWu1xD8GA49Z4vfz8/2MXqhSwx6aMco86Ey7e07HxL0O0SlZTS8ysG0bKMws7SAM/5IP5e4POgzWT0pFRDf2/On62p48QyqcmlawmOGD89EwsAAxOCgJVPLFSL//71vjy0TFnd4o/yRXyLWs1dXH1OJmtNEv+5nfG/7GbqDw51AuBUkKy/EntcIvnTw3BKm1qHKRhlHxs1olmMus0S3b3EoauGpYYf+KhhRG/EIKlZxa2m5AFEaY+cray/T1G7OOjoo2Pyd++we3po4qLdvOzdxPSU5ckSUnBLDwTDABWHuhAPkUIhSuHTNParEskJ0JhQnTUEGzlvrPbnhRm3hF64NBTwXYTEk/yM93NOz5H1zT5LiErWhXyrnjzjhHzqi0fnQQ9ENgR61tdKTBcv5NjZfmBUZ7p7suXqqsQrRJqTf/h3723rvUtMtIKJvlCfcBNTDezilaNe5YjFC7dI7DmfZ5A2EIh08+R7eExN9nfy9fz86LFFvxVu6iJ4YI+xBZaXN8jqEgOa7Bu5N64kvnRq8qFlfYOYHrWVwjUyBcYn39lzHBqKainj/DeICE6VjxpbCwbe5qeW5ZBcvXrQD+Kdr6vZGJEjTsuEAoLTH7oQ+j9Ugszd7/tllS7CYmV+94H+CIYS6vPAjM4C4dRggNGWqAeRrGSfMnYTRhW2FCh8lgPoxR9wxtXDjdP+3xYcIDQnq9n7b9ipNPFC/mGI+X66n/bCicDigTzeo/yPKIe2yya2x9tt8a9zsnOFYx4xTOuLHlObWtWspJn1LYSwR5tt8YZcl5tbzoYS3b3jkoEAwDd/yYG5pJD/U1EMlvG02wFW9/qSknIEnNsFiTKv4HAVjAAePysfa0ZXZPB805vHigrGPKu6dUmyRklqfsDMbXRiqNg61tdKT3HI00imnHB1OZClhVHwQBgfbs1KbL69Qs9CTCnKKtfLxe3rNgv3my4sPe+mVOk56q6741aBMNFFK1GsVCNS1pZed6xQ3ruosS0ZK1ioVYLM7kAN3areoOAHTVZmMn6dmtS92fC5zFPY/B81n8pXI9YqNfCrExGMtNSOwdXnplTEjRT7vJ7tdRlYVZWtluX9ByPSOZ/qn1nBQbPZ1sC/ScVC25YmJXxSCboF/TwtKu2BRhxljyn1rROgquCmUxEMlEizEKQ55e+bPFAKBNPBDMZj2SCmkCMiIY9j3HMKQbmdWlfx3ILTwWzYrz4FtfAGCZy6TIYI87EL5DDmhfWZEfDBLNifbUyCxEkpssM7iQgqK4izCSZJO+AKAXOvTjNVyu/5S1vect55hdr3ia21UN5zQAAAABJRU5ErkJggg==",f2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgB7VbRbYMwFHyOGIARvEHTDRghI7QbZIMqE7QbQCZoM0HoBtmgdIKmE7h3immMZSyIzV9OOhmM7cPn9x6I3JEZKtRpjCnRPIGlTEcHtkqpTuYCgrW5DT/gOrb2aqT/V24DHXmNDRhYSithydlaWsk8S6+LKtVMGgihLbiRBVF499zRO0Q7ScMZPIE7P4iKkQla0sHgqfDyjzymvnMly0KDgyNaWrAX/UcheUDLPsDvwLM2tyCFnt1ziiFVsKMYLxAcL3LJXR97Ny9TBQ+2UNRWjOKMTrfafLoTUoOmt1HzGuIs3m+xCamCD7Y9gGtb9I+xCamWbiCguSu0rCxaLhbunTGnnILEEWK7qQU7R+JrsLbfwq8At+7gXIlPlBL+nA36/B22kh9t9CksaEw+NP76Yz9RlYSrxqydMS/ljqXxB/k6ALvfpL2mAAAAAElFTkSuQmCC",m2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEzSURBVHgB7ZWBjcIwDEUddAN0hIxwI5QNboTcCEyAboITE8AIMAFsABvQDWCD8K02UhTqBNOCBOJJVqo4yU+c2CV6d0za4b2v0Vgah8YYsxO9ENv78dlLYrV/HHXQmUSalh6HDR9fwoAzbEbD+IdVaacoiMte0QAQxrlGMEz6oXanGmbY7FpyZgWp3aElHVXOOaEnc6/grjM1pZCmNLAp7ohbvmOLhhO7Ksw7h4/4hOvYIbAJYkz3vaAyhytBTGaxX8qH69DT1whjuZ8PMY03mQUhc0mJ2vaMWSZjXG5N7aPhejuHffP9wThHHY1FzwlvweXWfJk8/KPhxf0aIaTHyH/UhlSb+Aw/liW1OWt7/KVclsHCFezkdVgagte9VFdaz9woatHwv1GqmRzGVVetPjyXCx7A5lXFoOlHAAAAAElFTkSuQmCC",h2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGDSURBVHgB7VXtUcMwDFV6/U/YIBuQDUg36AhlArJBzATABC0TFCZImYAwQbpB2cA8XWVwffmQc5QfHO/unRNH0ossyyb6C7DW5uCKfgsQq0Hb9W3e41BgyMGUdHhIkuSDpgBilY1HFsSo+zIMxTIbj4Pn34JrJ+j9fNEnWNp4+IKbju+t9VZgFmhqa/YI3jkflwHquMLw5NntwQXm951R4GgUGdVgKmxlbh3E2YSZTRU0Az4VxWJEsBYb3lhrYSZztcsUzL146WCWI4JGbLYdP7ENbA/CLz+HGelxJeMr6Jq8ENFlYJtSzwaMEVzycmHH8alyifcFHXdrHhEjSpBRQ/QeLCC6A0sRPptgA5YizDUqIcpzz9oAMYIvCM7Z7OSda1TI8zspMSc9LmS8AV3PudPmmqbAjjd+1eFTjfgY3z62hvxDb/b7aOOWMDEBYpbUgdvglk5rOFlQe2sb0uMkZrikDf08hlvG6q4oLUwYP+kRzeh4Pmov5BC8jA2fRvSPc+MTgqzMtqJz5AQAAAAASUVORK5CYII=",p2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAA4CAYAAABXJB78AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA8LSURBVHgBxVtbjJ1VFf7WPmcqM4Uw0vok0oMvxkRoqzGEmMg0VYNcbNUXVALVp0aDFIJGhKSt8dIgiTPGh5JYmEogBjFcvJGovZCI+GCYoTHRBsNMgvrCdIYXpp0551/uy1pr7/8M0HNmzpSdmTn/+S/73/v71/rWt9b+h/Autd1jPHrJJe2tFTrbnXNbibENxKMgavlPfwYxUdjiGXI0A8cLRHwSncbU5JNDJ/AuNcIFbAGki4eXxuDoTn/nrf53NIDiD3HEx39JYPkPJ8MLP+GMAkR//TyhOukPPPPw4xsmcQHbBQEsADUysnSnv1kA6r1+ohx+4gDChgvjYAGH/BZHkNI24vEEmnUp18R93gLdCW95B448TrNY57augCWg2h4o3udxGWVOE40gUADBb8oIyCULi2A5MbtwmEhGmbejpwbAzfrE8oADPNScPHJk/YBbN8C+9Nlzu71XPZwsSm5GJK4Xv6TdAT4Srwyf0RUZejBi4bSD+FesS6xULI/y+bMVuQNHHmkexTq0gQMWrGrj8PJ+Du6XXKuwhHhLm6jtMysrgCMbIQu3kYIi1sW1vuOhZLHReh3Gl9rNg5OTtIABtoECdsv1iy1Hjaf85tYwH52AupRzoGxtQJd1ZGJXzoKew4oMB9e1/VCAghVqv5SvITdDy8s7Dk8Oz2BAbWCARbBAx4MskMkm8yqtSe5o2ykSMolVZPfUKAmWbXpr65RzA/Ula8vnp3sFs5wl50E7PBjQHAbQDCx4sJCesrqLPhI2a0D6k8g7fSogxmXpkuRaYi5Adl8jv3AOp46yHCFYlI37W8xDx/buXWxhAG3NgCWw3HFSy3KIkS6YVgp22YKIyEAp+EbOh8kK5SdGUhXJveo8CBf3kwWCOu+ZJceTHF8JahwfBGhrAiwQfLIstFh6S/NJxOyBKCIZq1Ek2SBWoUB2cZa6XddnwsU5vY1Ys9NtCwawSJv1Xss1mk/t2+eziTW0NQG28T3L+/1ot1DBS6xSIE6ESK1GCIo1EgIyseJa7ScBGJAhzjpLCYqgFpeCQLqUJbqSWnUpRRLHhRtuXeZqP9bQVk36X7l+6XY/yEcKgkUO9SokuSYsk2AVgaqiFNnVVsiM7v2l9oJEzFofuc+47fIxFcuRKhr4ws/Gm09jFW1VgCnJ+wG1ylQGSiOBxzwiLk3IwGPhNVXzKFIcBRbQa7q0GmoBo4iGXdmAqz+EckzpmvhtZoga28fH+9doq3JJ55q3+/C1JX3jt7IEpKef+CeStyskRnYXk2B17loJVuJFUh4kA0gjrvRrfFgGkUK+pAiDLW2092EVrW8LC9bVcO5Vu5qUsxIz5WiWRicEb8dWulyRiLvkOi5m5KJ5nVpwVvGpYwsGqeuw15X9xs13yAb4jSY3r+zXyvq2MA9WIk0qIlPwwBWAiHSAUHwpHdK5nK2kPhLjNwEQJvW1n6jsJY4IaAaIbpOCZcElRnEnCoRotO36t7LVuORYjooa+cQzxCU0Sqk16DHjkzQBiaSaHKb9uZTDMMqSIJlclYpgQYVFZ7FaPLjCwtTSFcho/Xf2KzP6AuzLNyzu8bdqMXKOqGWZUvuU+R5154+mmZJn5cgnUt0EmyKQXBWi+kXZm+BlQBPNnEnU0i2sCBxMlk5c2t7QGUMfrdnPyb6UvEvmRDZRQDkmz1fGn12JS4Diz4c+DOz6YtN/pgvffBN07z1t/2mRNYKxcSPTDw81MTKS+j99mnHsWIWpKZYnBUHReI5U+Ktr1sZAoIIywvP7pv/Ss8Qg9NFuvfncvP8YxYpaFOkACjlANUuwyOiv/djHCd+4q0FzrwMv/b0KIOHNReDYHxldaVPs5tpPON60KU302msd/DYeeqiD6WkuOJNYM4fSqvKDNOKPaRUZmWLenWt8sFfy7xmwW29aHgOq42ROrKVloYWu/bmqapFOhTo9MDEUzzx4f5u9ZSkH1QqFVBYWnZSq/c/IRsd33+1o0ybC3fd0oncld5V7dxcVhStMMEdLc/5PRfpQfUlq7Cc/opM9wNC7SzJ1trkUgrgrGpIxefGEHWXuKguJm99H2LQZ+OVjHSwusk1048WEyz+QrTJbAPHcHNOZMxEWLJ5lOnaMcdtthM2bQXNzRQCinJrBnhlgI9F+zcKSK3doeZs/OljAnGtc543kLetRzmVGTZagw0vuxTZmqy54sGCgf26Xo5t3v238iVf86okKx45X0hUXR7UCK7xqawNyLLacQkF0G8Sqw0GHxjb0igN6bmHNkEmFqN07AaIaYEUxUNyStMRsTAYJ9f5z52fOP4ybbnalokh9UPevLNXpUEL3wS0caaRFLnVDSifhT9UzYD1bmAenpTGxnLm6Wv6uT5N0ZajINQmvz3F0x3/9E3ERKRwfGTn//YeHoS5EL59iPPnrCnNnWMQc7OYwUBU460KTb51QqqZE3FzPWqwPDkPLRfUoUQ9FziYgpkKgU7clK/XYZNLT/fOfKsCuZ/zm2ao+uS4rsn1CB4tngeMnK70/W1eF5hPXS11ICahLk5GQRPhpYdCAqTxIPEHFIoUJTqjw1zDvUkYoJKylLbNOO++3z3bEd4Girm+pTTrGhTumPrnQggqURUHkKFimbawflEqcNu7BA6Ydc+GP4oJpDjU+MThygOBDDzYpRMjurt/ulu9w3I7NnQH2f7+TKryUBbJfDdf4U1umy5kBtOyU5UwPrXelT0COPlz8UV2T1XV6orIooZbgB/bsMx1ccQVh56cdpl5ivPZaOicQei/t93+oYv+Xv59w9VWE489X+O//MldCybz2EKmIqhqUWModjMz/vbU+UiOe8d23hCzSg7IXRlakItAHm0s+xH/9S0WnTyfApqcYL7xQxT56Buy5yH18zTVMV1/VwMnnGWfmmai+eh79FAqiPKxCRiDpxDLflXJVD61nWeFvvgCYvDH+qUkF45oMYCEzNHMW00ukFkJlyA/P1177T+ovJe9lVJB6D5CqJQ7IgQblEp5Jn3B+zKOc/HI1ix5bPxY27Qe6LQwwT68rl0NOS0qpIY7LqfqTY0ToK+z7xdEObrypEZT7yubP8yofv3uu4pIXiz5q+KXjVBtTKkxq0Ci9wVrPRcTeAWvwS/4ut5PReVc93sizCJpyMI8fSm4UV+CEhANxP/poh0rpYX0Y+GT3uugiORwWDXxOyIU2zKtHIho0Pumn1vyd3cNbGU6gx9a70ieehk0aXXwlEChalAuCsJpV2jU3V1FIuHd+ymF4pIiolF3dMgeUNTLEouTIMGjHJ53nLm9581V+YPoQqZ7r5qoJIWtGG3O8pNOpptErDL2euGc3j9LwsidHujSSqHEJm+UouZoEqQ0UUIva/lGivXsbCInziy8m0RrF6AmpaFOxcuS/7LiOKIA7Muyj40cIl10G/PxohVP/QHd0LlbZ0fVgC1eMAtEWZOYfvL9xWa849OySk0/TwldvWZrykxhDUauXdCMn5TI+lG4FWdqXryFCHj7cxs6dDdx4YzLykIy/+LcOh2pEOVmfNtEN17uUGvn2yr8Zjz3BeOXVLHCzhaIQx4wcmDjmk1YRFlqRCu5J9NH6qrj6ssS4V9Bj2QKgPEPI0S8nt04SKcppnArHl08BL5/qqBVapTS7UtJvZ8+Cvn1/x2rzpVvZvtTYxmHlHZhFJalqeo2V8YgbfS3o9gUYb2icdO0qRJRRmEWJ5oGVVZgNROPqbAVpp6nwNCXVRCqOAMFXSbwLLJLIqzIHxQ2lYiGJj9GBiC/dlBvMPHAfHUUfra9FkPA2nx/uOEtsNl0o9XEWYjbqUv4qXpBL/FJYkpZdBK+cQBccaLEEoILMiVKhUlKcmEWnB8YmmJ1I+zr3s6r/E+iz9b3MVjWbE/6mb6SnW4jBuGwlz056VRKGWoLVpOK34u1oYq28gnI52Vxf61moWawgCLlGKEnG4GRZz1cHUzCC3lst1Dvj8tJB9Nn6BixYGTV4wgp0ZVSq5XHyWhIJMFn3pHk6syOV5SzWJQ6ea5LQYl/h7mLdZnZp3dNWyznamERDs3TKY/Dq/nuHDvT/VuKq3q1oY8N48P+UXRjTMGwSDNNTggcbAhk0cRWqETrLsmEyBbXiBKOzGly0WGevU3FOsNNjUJpLYtqB84OKl8w0XXsSq2irAixYWQV3F2w5LMsKZ0LIwEnnuLJEXUQwW1M0d44aD8Zn9nKxWW+OjvUqhEbDrOptyCSgJTnEfPDQvat753XVL9QdmWw+7Qc0oSq+ePrmL0L8hbtCeYSg1GOAcJZV6mJxqgx1f+mPM4DByriUFtKXqlTLdbXGFFxx4sf3NSexyramNxDDe/B+XNMqZGtPPlBSdBmW6AnjtjiZaEXZ0iyFkTVIuQWnWlu2Gmg1BKrriPOrVWqp4qJi6Touf8vZ5eXmAayhrQmw4Jqu3f68B2a2lgI5mLWIpZGSm0kDZE5LE9K0yCbI0k+iwO780kmB2cpGgCo3spCJbGGecx2WdowfWNs/Oqz5Ler4TwO0vMNvzoTvBW+w1dwLjlOgct1MI5jjvERmFkfpxeJQmEAtZSKzHjGuJFnYoieQokc6fXZoyI2tlrfKNpD39OM/DQTQiGfCd5UN+p8flmc6pvpbiLKmWRgPFTxXupPOXKqrrPzEElYTcDFntApK4j2KlvWDewbzD1sDASy0CBp3PGg0YwSEEoDMU6binWo5kncdZLsowdh7ZYX7lqvv5cJylhRyDdOUw7kdg7AsbQMDLLQA2nuGGtv9eCcyjxU1M4h1qN4iEr6jvL88x6Km9KMj1tfR4+4UU9iJNlHAgfGlJRooWOl269S+fsfSHkqvd27JCXGZ9oSzVKmzmFvWY0VAWGGZAVB92UUWYgkWOjHvHf1rD3x3da+Vn6+tG2Ch7d232GqiucffZb8BozlkvHuuaZXl7iwtOEdMywasrCSklXjLf1lg7vy0vdwcX2skfKe2roBpi8A1Ggf8zK7zILXK3I70P9HQ9cZzJm5dE8saz+mqbBUU/AIqnmh31hcobRcEsLLd8a12sLhd3ojG/OdoXZTWea/7f8EL5b7gv055STux1GmcuBBAIQ/x3Wv7vrM8Vjm31fN1BM+bUMvT9xbnxHmTC874jwVP6lNAZ9pVNNVGc+pCglS2/wNn6OJqhyu4ZQAAAABJRU5ErkJggg==",v2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFoSURBVHgBrZXbbYNAEEWHtWxA4oN0sCWkBFxB0kGcDtIBJSSpwC4hrgCng5RAB9kfxEtA7lhgYV6xYY+0WljgMtyZHQwaIY5jb7VaPVVV9YxTWS8rjFNZlkfbtg9jzxrdBYi4eZ77mN9omhDiW4iHk6K1YID5kW5D4f6t4zg/7UXRPsmy7P0OQcZdr9cBrJKDouwhph3djwvv/UFRIcQLzYSTydb1RA3DkDQfN4oi2RNFJiUtABb0I9WJrs9n5JUoMr+jheDzL4kWXGPIvE8LQfa9JEnOu9BI03RP8+pzkM1m88Civzh2SROoolehU7BBwIuQ9BJypJ+kjxCt8CQsy/pAtDqEz/2VDy79lGuVaw0vkNQq5H9QtdiRg8MGUleiXbjroO6aJMqiKBReqprrQx2/YVS0jt6jTtTYKMo0zS+aAwuihquhgT/EfurZ0S4Fj/i/Ew5dgxXfNBfuCxgH3nV1hEFtySR/WBXHjIkhXncAAAAASUVORK5CYII=",g2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADTSURBVHgB7ZTBEYIwEEU/2gB2ELvwaAmUYCmUoBU4VoIdaAfYAXjzhsuQjMm4rmGDnvgz77LZ/D8kG4BZShVERXSRXIjdGPNOSfHN3BB1QkBD5FLAMcHcUUoBzQQBjW+4wPTKpYArs+Fkia2fIcjgNZ79p5be2t7WpHplPf6nJVMzRIvhLDcYJmtL3ImbUIdde/hmGRPQIU2B5y+mCNqAfmJWxBr89ETr0wMyXk8u9AUacweZpo87ohZ6ve3lAg7QK/pu3Ot051ozPTXCH1yJWRo9AWswf6s6QjKFAAAAAElFTkSuQmCC",y2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABQSURBVHgB7ZNRCgAgCENX94foxNZH/QSKmBGUDwRBxsApEDhSetGoohUl6CGLNuMwYTBhD8ArZHb2XgamZ5JYMzDtGV9lEAb3DSrT78wCmQZLVxLaXDTBfgAAAABJRU5ErkJggg==",b2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB9SURBVHgB7ZVLDoAgDEQHLw6cAD2CJ9QbIH5DGrES60LTl0wgs5ih6QJAqcAmDUnxoeaMQMODQDCVywskXn42CcxWEPEOpoHC8P0d/LfAY92PZzyW0pJNdo8XHptfmsCSs+TxDah7US3HBCPkWTL3gg7y9NRoIffhOCh3mQDL5l2owbHtIgAAAABJRU5ErkJggg==",A2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEDSURBVHgB5ZWxEYJAEEW/mhhiZiYlWAKhIR1wHaChEdgBHWgrdqAVQGoEHegynA6Du7geJI5v5s8w3L/b29vbOeCfiEglKbffo1MvfLcqtZNmwv+EZEgT0pIUkzat8TnJJ11Ja+tfkC5QYFo7/VZpd7EpEyCAOyuNKYB7BmF3MS6DAu5UmgAJeA5oCllrJ3hC9PC851zqW8afCt4cQp/kkM/WY/xej//VJ9POhLGouJ8GchYp448h796ghwxyHTyrRPAcoSCAex/43cW4azqkFr4mQO9d/kCkCVDAnbPWaNAULECT9gnv553Z8dB6Uwyk3eW5dtIMem5oHpeaPZSPy+/zAFjEgUDFn9v8AAAAAElFTkSuQmCC",x2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM6SURBVHgB7ZRpTFRXFMd/bxiwKNs0VKBpp40oaUtL05KorbYdatPGhRabmKZpNTSmIRo1rjEuHzRGonGJQeMaiXuC+zaIiIoaISGKxuCIiNsYAWFgZpBlZnDmen2QkWUAv+in9/ty3zn33HP+97yTCxoaGhoaGhoa7wqlD5+um1/XS1z3tTtBAc4ETPj6QMbWkeywFLPdUsa222Ucs1YyPPVTjlstmEydz+kxpUWQbbnImdYmTjocbCjNVHe+mxRPscvDn/OMHYUVhg4d0FFXx5hpn1DocZFZsFLagn4Z838CF5sFh58L8lpbOeN2caLyOqvyF3PAJsjI+tt/sanrvuGyR3C6RXDMVsVZn2D3Uxd7K8yMmmzE7BbM2bVRjd5fuY0ir2Dx0SmqfarWSkGb8Ivul2V5m8lpEMzfNb6L/1DVY3Kl4M9/i/P7ioTgnBQzfpqh3WHSkyeLX5AF45IHYpaiZ2xfw/cTB5Pf/Eq0YNPN83wxLhZzo7QrzgUSFfhXDkv8GY+8aeJPWeyzPqDAaVP9UbFGgkPhztlq1Z6TPYMnDsjd8xfmLc72w4Veah5dw+0DQ3h7fn3IM6Zm7qRedlURL3A115GxfCWK1LN69uQ3F/ZBbAJCdiImOpLwKAMheIlJGoQcBxqfPfTHxSePZUAwFOeV0D4jirrGffw174XIWLdXjauztvDhsAlYri6V+RQaquoxJk7BZbdgya2REb7+hRlHGxA+hUh9LePCo/kjwsCPkTFMSE+lyQO3SnP8sY7qcpwOH/8t29IhTLDzbg42ezBlpWuJ8kWoFX6fmYVealyRlsmg0CCSUjKgTc/+Df/21hx9D09K6rfY5SzUPL7RxT/ky9G4mnx89cNCDtVOxxgWxoiBQZSIuZRX/0L+C4/slw57YxDhbSX8k7yABFM0OtnElka501CkdvSV7WqF6FAnR9bfoBd6qk0aOZEwpZ7sJel0foeW/DoL7/MSFM8T2RgHjuYKdWd4SjAt9is0Oe3UPb3HpYNpjI0ZoeauKLThqy3no/edTIofpcbX3b/AkMFuFqV/Rtd3rE+UPkQHarmenoOrdNvv/K3rJ5+GhoaGhoaGxlviJcCiMFEyZLgHAAAAAElFTkSuQmCC",S2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU7SURBVHgB7VhNaFxVFP7em0zGMWk6SWw7JqZOiIm1VjQuJNiCFUFEu+hC3Qg22YgLsUbcCIqpLlyJfwtxI1ZEsODGgKALm1JF0IWJYMmPmokmlJrYtE3SziQzc/3OnDfTmcy900abQEsPvHnv3fe9c7577jnfnRngul0j5lV7aIyJ8XQP1seGPc87g7UaSR3gMW/Wz8T3/v9CaqPswOWS2m823irIeatIJXj6mUcM/9sMLlHCpcZaS3V7XjQJK7HM9CSMn6gIEGog8gZe1wDZU8DyL7xvgJNQqAkId6r73Gkg/RMvY268Vw9EdkkzdFcQM2N4jZgB67u5MHDHMi+yen8iQo5ZTYrNVnjcucQPTsbzgVEG9pfceHG9kxP2mg55ofCADPl5UiefTfDUC8a3Hxlg7iAvQjqX9mMkK+OeHR/l+MwjSgp8t2NE5+TC1xE3vYdsag4alSglhvgHe+FvTsAL2Wfk0+HseyTDUjBkFN3NYxecNSTDC8eZiRN6E+4AGh6G2+gzNQGc/5akci8UXLDos5NIjyTwx71caxmy5NxwDmGS2T4ixcj3zwITNwG1DrxMMsc4HXN8vKLHeB3xvhKx4VdYIl1LSdZau8/UUdm9BCKsu/r74M4Cg59n0ad+0CUKNQNNfdYYOhGuXfYf4NxHxLNp/Ciw7XWubM6N9y4ApwcS5LTX44ek7u38A7MIjHGWkSqzytwIdJ4jlhXr1RLPIglLxrJ2fJp+bl9Rfx6x42yEcEqJVBjxKY7vONsvDB4oOvE3A1v6GcO4Z2UWgPk3NYgsYcsnXIKsGy+wv/sCPMm1fUWygretDP1FKTN+Qz5jIqjBRp1V1uNMe80y7OsUUsc7RA7CGvD3LTzPw5o16S/JWtcsL2O6rFM7CR1b5Z9E0yTWOcXYbUnJWKIsqLBu/YIdlYN9Vlkt4Jl9QRbYCG3fV8kC/UTod/p+JSWNc8txJVuKN7yOPUZS22U8JsQqJbnuUTq7FQU1qTBphMWjJD+qzmu7KAcPwm0kfUHkYOhi4zQ/XZIw6UjexAd1ouQkS2msjjJU4olWt3zk5aCRcjCrWTBpNkK9ZsfVCCoHivV4/Ru3NX9BuWx9i3ReLMIlJZYva3RS0wI0Pu7eRvJyQI1a+DhoHHbrtlcZpEoj+JSDmT3QevqR5yWlIHtlnlTx3TOSsUmU1VmJI2ElclBbJQtFOciqfIiIhtMOOSCJHH1mjJZXLX2n+W7iO26rPZoQtWHJ2DBsJkHlaPmwehak/k89paRkIm1fVm8EnxiBhoP3o3eR1G6squcpuTsGp9FJwzN8pxHOfdQjgfnPSf6k1lr0IQa6DZf+LhbISOvXSrgcP+TOWOHlvCgeVUV2ygFxf/WofEgWbHJgeQ2NT7CWb4al+4d8bphDvEi6PdB55G7uoz1wB5LZ/xnsd9I4cQZ90t04UkuyZ8aPIJCHUpNNfLhA9TCqEZOArd8EWQhVPl8WkR3UZRUTfPwzyoOx4KE1G38fyrxm9dNDwVTz9g6sslGILXKwic7eCPbFUsWmiwi3mLp9F8fz9cjx1k9JOovypRJfWykPz8Gy5SV5DBWJBT8830VVY4DGV9gM1LaUUZ+iEobfydp/hS5J6VITs4nd2vy8ZrqAl28nHTMo7svldphckhWhZUOv/itrWU+pEWNmXzJmcTAYX3Hgg/H0qDFzLxuzcCQYz9jAk6VcrsDPN0mFf/lwO15WrLs0W2WI4EE/1mRrIeXE91mXcLUxc71m46wXazGjfxWs958qva74V9/fUNftarN/AeLLTGIP9RljAAAAAElFTkSuQmCC",w2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALtSURBVHgB7ZRdSFNhGMff93xtxzXXps1N86hDLZ2muZEMQpSs0LwoL4I+b4q8KIUIxC6KBCEM66aomxIJkq5CCtJuzCwro5VW6DDTNdfmN9vcV9vZeTvzI2QbRjdKcX43z+F5n4//eZ7zHgAEBAQEBAQE/muIZYuBdeKPjdqz0y+X8nZwl7aTNxxYJ/A1zrCewuxbc8A30KRLfZtAY5mUDz0plysOdztd/WADoc6oxcx4SdY9/hmGHfbyXDPYaI4oFFquqgA1aRL1YGnl8GeFlnuv3z4INgAY6UDVRShsXxdrGrt16ReXY9btEvxma8Fpizrv5FhK/qkb9Yxy77J7cWLtuRnHY+Uka08MMLraYGLWwWbwd0B5WkkliPGiRKQDIai0f7lPq3KOtt0OMHwzQ41/wTrinjT2nHMy39Q5xc/swy8Obck2NGM4MeadHx9FAMosxpskn04pNVXXgyHfB5KiU0KItWGQ2jbz9XFjoubAJcAhO8DYQrft81VcLN1MximLJHJtKylSNE6PdFxZrSNKKQJsKDGj4gIhlhXS8anHfLY3HRIZ0wCANEEkTyuzDz/cr87b1zIz8qjW67S8g2TQBHECMkVnkVRt0JBSVR1i3TaSVjYHfE4HFZfUEK8o2EPSCef9LnOvWJpRI5KnbpGl7h4IOOa6MBwHrmlTG4j4jKKEYQDHZsc7W6wf7xRiEDAez/QUQJCVpe3csWDuu7tYgAsa4lX6SpwNJbms1knbp9b02YlXRVJFZhcf63L8sPQDjPAQXtNLxAYcSCTScqzH6J4fGsIIEb8VBFHQ0+f1DtvDHf0OkzlSWNQqIUmLV4YHcdHSOU6Rzu+93Yy+lpUs2J7ahzpL1fnVRn4yE3JKPBqv0g3yzYBrylgmSzY8XyxMSkQcJ8VwSkJzLu8DSpXUwujqQnxZFqc2UZCMo8NxoaDfkl5cj8z916IuXqwJwhjiiRi+1TlhyAi7ErfWjzxWHQEBAQEBAYF/lV/A+QWwS3rEYgAAAABJRU5ErkJggg==",T2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEySURBVHgB5VXtTcNADH1BHSAbNBuUEcoGbNAyATBBuwFsEHUC2CDtBC0TJExAmeB4VnzCigjn9ONH1Sc93dm5+OVsXw64dGRxEkJYcJiSK3Ks84gd+UHOZJ5l2TOGCDB4waFWX0M+dNbl5AtZqF1Q5BMOjP7wFWSFE+EGZ8ZowNo9+Y62Ft/el7w7kCLfoa3PI1mxbqXWLg1ZGPpRk7c6Rrs2z2fHCsw7AcuO74vM+2J7UtTgtz3XaM+J2Dv1SfA5DhRoTHB0hKx/ggMFchWxtj3xEb1dlWrTXLk3YisdS7Pu9d8oiSJXWlTbVW/GXiKFhIBgQd6TW+OT7nmCBw6B+OWyk2nwHrCBAhZjb2xb5DX8cP+LooB0yQbnQk+Kas339pgU2StTennieGfD22yJq8EPmee6JKvHi0kAAAAASUVORK5CYII=";function C2(){const a=M("#app"),i=j?.session?.user?.name||(j?.session?.user?.email?j.session.user.email.split("@")[0]:"User");j?.session?.user?.email;const l=i.substring(0,2).toUpperCase(),r=Array.isArray(j.notifications)?j.notifications.length:0,u=r>0,m=r>9?"9+":String(r),d=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),p=d?'<img src="'+d+'" alt="'+i+'" class="np-avatar-img" />':l;a.innerHTML=`
    <div class="dashboard-container">
      <!-- Header Section -->
      <header class="np-top-nav">
        <div class="np-avatar-wrapper">
          <div class="np-avatar-circle">${p}</div>
        </div>
        <button class="np-bell-btn${u?" np-bell-nudge":""}" type="button" aria-label="Notifications">
          <img src="${v2}" alt="Notifications" class="np-bell-img" />
          ${u?`<span class="np-bell-badge">${m}</span>`:""}
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
            <img src="${u2}" alt="Send" class="np-main-action-img" />
          </div>
          <span class="np-main-action-label">Send</span>
        </button>
        <button class="np-main-action np-main-action-receive" type="button">
          <div class="np-main-action-circle">
            <img src="${d2}" alt="Receive" class="np-main-action-img" />
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
          <div id="weekly-cashflow-amount" class="np-insight-balance">$0.00</div>
          <div id="weekly-cashflow-percent" class="np-insight-trend">0% change</div>
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
        <button class="np-mid-action np-mid-action-animate" data-action="remittance" type="button">
          <div class="np-mid-action-icon">
            <img src="${f2}" alt="Remittance" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Remittance</span>
        </button>
        <button class="np-mid-action np-mid-action-animate" data-action="transfer" type="button">
          <div class="np-mid-action-icon">
            <img src="${h2}" alt="Transfer" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Transfer</span>
        </button>
        <button class="np-mid-action np-mid-action-animate" data-action="withdraw" type="button">
          <div class="np-mid-action-icon">
            <img src="${m2}" alt="Withdraw" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Withdraw</span>
        </button>
        <button class="np-mid-action np-mid-action-animate" data-action="topup" type="button">
          <div class="np-mid-action-icon">
            <img src="${T2}" alt="Top-up" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Top-up</span>
        </button>
      </section>

      <!-- Recent Transactions Container -->
      <section class="recentTransactionsContainer">
        <div class="recentTransactionsHeader">
          <h2 class="recentTransactionsTitle">Recent Transactions</h2>
          <a href="#/transactions" class="recentTransactionsSeeAll">See all</a>
        </div>
        <div class="recentTransactionsList" id="txList"></div>
      </section>

      <!-- Floating Action Button -->
      <button class="fab" id="fabAdd" title="Scan QR">
        <div class="fab-icon-wrapper">
          <img src="${p2}" alt="Scan QR" class="fab-icon" />
        </div>
      </button>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item nav-item-home nav-item-active" type="button">
          <div class="nav-item-icon">
            <img src="${g2}" alt="Home" class="nav-item-icon-img" />
          </div>
          <span>Home</span>
        </button>

        <button class="nav-item nav-item-statistics" type="button">
          <div class="nav-item-icon">
            <img src="${y2}" alt="Finances" class="nav-item-icon-img" />
          </div>
          <span>Finances</span>
        </button>

        <div class="nav-item nav-item-spacer" aria-hidden="true"></div>

        <button class="nav-item nav-item-cards" type="button">
          <div class="nav-item-icon">
            <img src="${b2}" alt="Cards" class="nav-item-icon-img" />
          </div>
          <span>Cards</span>
        </button>

        <button class="nav-item nav-item-settings" type="button">
          <div class="nav-item-icon">
            <img src="${A2}" alt="Settings" class="nav-item-icon-img" />
          </div>
          <span>Settings</span>
        </button>
      </nav>
      <div class="home-indicator" aria-hidden="true"></div>
    </div>
  `,D("click","#fabAdd",()=>{q("/scan-qr")}),D("click",".np-bell-btn",()=>{q("/notifications",{animate:"slide-right-fade"})}),D("click",".np-main-action-send",()=>{q("/transfers")}),D("click",".np-main-action-receive",()=>{q("/add-money")}),D("click",".np-avatar-circle",()=>{q("/change-profile-picture")}),D("click",".np-insight-close",()=>{const h=M(".np-insight-card");h&&(h.style.display="none")}),D("click",'[data-action="remittance"]',()=>q("/remittance",{animate:"slide-right-fade"})),D("click",'[data-action="transfer"]',()=>q("/transfers")),D("click",'[data-action="withdraw"]',()=>q("/withdraw")),D("click",'[data-action="topup"]',()=>q("/network-selection",{animate:"slide-right-fade"})),D("click",".nav-item-home",()=>{q("/dashboard")}),D("click",".nav-item-statistics",()=>{q("/finances")}),D("click",".nav-item-cards",()=>{q("/card")}),D("click",".nav-item-settings",()=>{q("/settings")}),k2()}D("click",".np-main-action-send",()=>{q("/transfers")});D("click",".np-main-action-receive",()=>{q("/add-money")});D("click",".np-avatar-circle",()=>{q("/change-profile-picture")});D("click",".np-insight-close",()=>{const a=M(".np-insight-card");a&&(a.style.display="none")});D("click",'[data-action="remittance"]',()=>q("/remittance",{animate:"slide-right-fade"}));D("click",'[data-action="transfer"]',()=>q("/transfers"));D("click",'[data-action="withdraw"]',()=>q("/withdraw"));D("click",'[data-action="topup"]',()=>q("/network-selection",{animate:"slide-right-fade"}));D("click",".nav-item-home",()=>{q("/dashboard")});D("click",".nav-item-statistics",()=>{q("/finances")});D("click",".nav-item-cards",()=>{q("/card")});D("click",".nav-item-settings",()=>{q("/settings")});function E2(a){return(Number(a||0)/100).toFixed(2)}function Vp(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}async function k2(){const a=M("#wallet-balance"),i=M("#txList");M("#weekly-cashflow-amount"),M("#weekly-cashflow-percent");try{const[l,r]=await Promise.all([ja("/wallet/balances"),ja("/wallet/transactions").catch(()=>[])]),u=Number(l.JMD||0)/15500+Number(l.USD||0)/100;if(a&&(a.textContent=`$ ${u.toFixed(2)}`),!r||!r.length)i.innerHTML=jp(),nu(Hp());else{const m=[...r].sort((d,p)=>new Date(p.createdAt)-new Date(d.createdAt));i.innerHTML=m.slice(0,5).map(d=>Eg(d)).join(""),nu(calculateWeeklyCashflow(r))}}catch(l){console.error("[DASHBOARD]",l),a&&(a.textContent="$ 0.00"),i&&(i.innerHTML=jp()),nu(Hp())}}function nu(a){const{difference:i,percentChange:l,isPositive:r}=a,u=M("#weekly-cashflow-amount"),m=M("#weekly-cashflow-percent");if(u){const d=r?"+":"",p=Math.abs(i).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});u.textContent=`${d}$${p}`,u.style.color=r?"#00C853":"#D32F2F"}if(m){const d=r?"+":"";m.textContent=`${d}${l.toFixed(1)}% vs last week`,m.style.color=r?"#00C853":"#D32F2F"}}function Hp(){return{difference:11e3,percentChange:110,isPositive:!0}}function Eg(a){const i=a.kind==="DEPOSIT"||a.kind==="RECEIVE",l=i?"np-tx-amount-positive":"np-tx-amount-negative",r=i?"+ ":"- ",u=E2(a.amount),m=a.merchant||a.counterparty||M2(a.kind),d=a.description||a.reference||"Pro Subscription",p=D2(a.createdAt),h=Vp(m||""),v=Vp(d);let g=null;/flow/i.test(m||"")?g=x2:/western/i.test(m||"")?g=S2:/pricemart/i.test(m||"")&&(g=w2);const b=i?"np-tx-status-positive":"np-tx-status-negative";return`
    <div class="np-tx-row">
      <div class="np-tx-icon">
        ${g?`<img src="${g}" alt="${h}" class="np-tx-icon-img" />`:""}
      </div>
      <div class="np-tx-main">
        <div class="np-tx-company">${h}</div>
        <div class="np-tx-desc-row">
          <div class="np-tx-desc">${v}</div>
          <span class="np-tx-status ${b}"></span>
        </div>
      </div>
      <div class="np-tx-meta">
        <div class="np-tx-amount ${l}">${r}$${u}</div>
        <div class="np-tx-time">${p}</div>
      </div>
    </div>
  `}function jp(){const a=new Date().toISOString(),i=new Date;i.setDate(i.getDate()-1);const l=new Date;return l.setDate(l.getDate()-2),[...[{kind:"BILL",merchant:"Flow Ltd",description:"Pro Subscription",createdAt:a,amount:12e4},{kind:"RECEIVE",merchant:"Western Union",description:"Money Transfer",createdAt:a,amount:78e4},{kind:"BILL",merchant:"Pricemart",description:"Grocery Shopping",createdAt:i.toISOString(),amount:54e4},{kind:"TRANSFER",merchant:"John Smith",description:"Payment",createdAt:i.toISOString(),amount:25e4},{kind:"BILL",merchant:"Amazon",description:"Online Purchase",createdAt:l.toISOString(),amount:189500}]].sort((m,d)=>new Date(d.createdAt)-new Date(m.createdAt)).map(m=>Eg(m)).join("")}function M2(a){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[a]||a}function D2(a){try{const i=new Date(a),r=new Date-i,u=Math.floor(r/6e4);return u<60?`${u} mins ago`:u<1440?`${Math.floor(u/60)} hours ago`:i.toLocaleDateString("en-US",{month:"short",day:"numeric"})}catch{return"Recently"}}function B2(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var au={exports:{}},st={};var Yp;function R2(){if(Yp)return st;Yp=1;var a=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),x=Symbol.iterator;function z(w){return w===null||typeof w!="object"?null:(w=x&&w[x]||w["@@iterator"],typeof w=="function"?w:null)}var Y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},J=Object.assign,X={};function G(w,O,F){this.props=w,this.context=O,this.refs=X,this.updater=F||Y}G.prototype.isReactComponent={},G.prototype.setState=function(w,O){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,O,"setState")},G.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function I(){}I.prototype=G.prototype;function Q(w,O,F){this.props=w,this.context=O,this.refs=X,this.updater=F||Y}var at=Q.prototype=new I;at.constructor=Q,J(at,G.prototype),at.isPureReactComponent=!0;var W=Array.isArray;function lt(){}var $={H:null,A:null,T:null,S:null},et=Object.prototype.hasOwnProperty;function Et(w,O,F){var Z=F.ref;return{$$typeof:a,type:w,key:O,ref:Z!==void 0?Z:null,props:F}}function Ht(w,O){return Et(w.type,O,w.props)}function $t(w){return typeof w=="object"&&w!==null&&w.$$typeof===a}function te(w){var O={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(F){return O[F]})}var We=/\/+/g;function ge(w,O){return typeof w=="object"&&w!==null&&w.key!=null?te(""+w.key):O.toString(36)}function de(w){switch(w.status){case"fulfilled":return w.value;case"rejected":throw w.reason;default:switch(typeof w.status=="string"?w.then(lt,lt):(w.status="pending",w.then(function(O){w.status==="pending"&&(w.status="fulfilled",w.value=O)},function(O){w.status==="pending"&&(w.status="rejected",w.reason=O)})),w.status){case"fulfilled":return w.value;case"rejected":throw w.reason}}throw w}function N(w,O,F,Z,ot){var ft=typeof w;(ft==="undefined"||ft==="boolean")&&(w=null);var Ct=!1;if(w===null)Ct=!0;else switch(ft){case"bigint":case"string":case"number":Ct=!0;break;case"object":switch(w.$$typeof){case a:case i:Ct=!0;break;case g:return Ct=w._init,N(Ct(w._payload),O,F,Z,ot)}}if(Ct)return ot=ot(w),Ct=Z===""?"."+ge(w,0):Z,W(ot)?(F="",Ct!=null&&(F=Ct.replace(We,"$&/")+"/"),N(ot,O,F,"",function(Li){return Li})):ot!=null&&($t(ot)&&(ot=Ht(ot,F+(ot.key==null||w&&w.key===ot.key?"":(""+ot.key).replace(We,"$&/")+"/")+Ct)),O.push(ot)),1;Ct=0;var he=Z===""?".":Z+":";if(W(w))for(var Ft=0;Ft<w.length;Ft++)Z=w[Ft],ft=he+ge(Z,Ft),Ct+=N(Z,O,F,ft,ot);else if(Ft=z(w),typeof Ft=="function")for(w=Ft.call(w),Ft=0;!(Z=w.next()).done;)Z=Z.value,ft=he+ge(Z,Ft++),Ct+=N(Z,O,F,ft,ot);else if(ft==="object"){if(typeof w.then=="function")return N(de(w),O,F,Z,ot);throw O=String(w),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.")}return Ct}function H(w,O,F){if(w==null)return w;var Z=[],ot=0;return N(w,Z,"","",function(ft){return O.call(F,ft,ot++)}),Z}function P(w){if(w._status===-1){var O=w._result;O=O(),O.then(function(F){(w._status===0||w._status===-1)&&(w._status=1,w._result=F)},function(F){(w._status===0||w._status===-1)&&(w._status=2,w._result=F)}),w._status===-1&&(w._status=0,w._result=O)}if(w._status===1)return w._result.default;throw w._result}var dt=typeof reportError=="function"?reportError:function(w){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var O=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof w=="object"&&w!==null&&typeof w.message=="string"?String(w.message):String(w),error:w});if(!window.dispatchEvent(O))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",w);return}console.error(w)},vt={map:H,forEach:function(w,O,F){H(w,function(){O.apply(this,arguments)},F)},count:function(w){var O=0;return H(w,function(){O++}),O},toArray:function(w){return H(w,function(O){return O})||[]},only:function(w){if(!$t(w))throw Error("React.Children.only expected to receive a single React element child.");return w}};return st.Activity=b,st.Children=vt,st.Component=G,st.Fragment=l,st.Profiler=u,st.PureComponent=Q,st.StrictMode=r,st.Suspense=h,st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=$,st.__COMPILER_RUNTIME={__proto__:null,c:function(w){return $.H.useMemoCache(w)}},st.cache=function(w){return function(){return w.apply(null,arguments)}},st.cacheSignal=function(){return null},st.cloneElement=function(w,O,F){if(w==null)throw Error("The argument must be a React element, but you passed "+w+".");var Z=J({},w.props),ot=w.key;if(O!=null)for(ft in O.key!==void 0&&(ot=""+O.key),O)!et.call(O,ft)||ft==="key"||ft==="__self"||ft==="__source"||ft==="ref"&&O.ref===void 0||(Z[ft]=O[ft]);var ft=arguments.length-2;if(ft===1)Z.children=F;else if(1<ft){for(var Ct=Array(ft),he=0;he<ft;he++)Ct[he]=arguments[he+2];Z.children=Ct}return Et(w.type,ot,Z)},st.createContext=function(w){return w={$$typeof:d,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider=w,w.Consumer={$$typeof:m,_context:w},w},st.createElement=function(w,O,F){var Z,ot={},ft=null;if(O!=null)for(Z in O.key!==void 0&&(ft=""+O.key),O)et.call(O,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ot[Z]=O[Z]);var Ct=arguments.length-2;if(Ct===1)ot.children=F;else if(1<Ct){for(var he=Array(Ct),Ft=0;Ft<Ct;Ft++)he[Ft]=arguments[Ft+2];ot.children=he}if(w&&w.defaultProps)for(Z in Ct=w.defaultProps,Ct)ot[Z]===void 0&&(ot[Z]=Ct[Z]);return Et(w,ft,ot)},st.createRef=function(){return{current:null}},st.forwardRef=function(w){return{$$typeof:p,render:w}},st.isValidElement=$t,st.lazy=function(w){return{$$typeof:g,_payload:{_status:-1,_result:w},_init:P}},st.memo=function(w,O){return{$$typeof:v,type:w,compare:O===void 0?null:O}},st.startTransition=function(w){var O=$.T,F={};$.T=F;try{var Z=w(),ot=$.S;ot!==null&&ot(F,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(lt,dt)}catch(ft){dt(ft)}finally{O!==null&&F.types!==null&&(O.types=F.types),$.T=O}},st.unstable_useCacheRefresh=function(){return $.H.useCacheRefresh()},st.use=function(w){return $.H.use(w)},st.useActionState=function(w,O,F){return $.H.useActionState(w,O,F)},st.useCallback=function(w,O){return $.H.useCallback(w,O)},st.useContext=function(w){return $.H.useContext(w)},st.useDebugValue=function(){},st.useDeferredValue=function(w,O){return $.H.useDeferredValue(w,O)},st.useEffect=function(w,O){return $.H.useEffect(w,O)},st.useEffectEvent=function(w){return $.H.useEffectEvent(w)},st.useId=function(){return $.H.useId()},st.useImperativeHandle=function(w,O,F){return $.H.useImperativeHandle(w,O,F)},st.useInsertionEffect=function(w,O){return $.H.useInsertionEffect(w,O)},st.useLayoutEffect=function(w,O){return $.H.useLayoutEffect(w,O)},st.useMemo=function(w,O){return $.H.useMemo(w,O)},st.useOptimistic=function(w,O){return $.H.useOptimistic(w,O)},st.useReducer=function(w,O,F){return $.H.useReducer(w,O,F)},st.useRef=function(w){return $.H.useRef(w)},st.useState=function(w){return $.H.useState(w)},st.useSyncExternalStore=function(w,O,F){return $.H.useSyncExternalStore(w,O,F)},st.useTransition=function(){return $.H.useTransition()},st.version="19.2.0",st}var qp;function Pu(){return qp||(qp=1,au.exports=R2()),au.exports}var ct=Pu();const N2=B2(ct);var iu={exports:{}},Ms={},su={exports:{}},lu={};var Gp;function U2(){return Gp||(Gp=1,(function(a){function i(N,H){var P=N.length;N.push(H);t:for(;0<P;){var dt=P-1>>>1,vt=N[dt];if(0<u(vt,H))N[dt]=H,N[P]=vt,P=dt;else break t}}function l(N){return N.length===0?null:N[0]}function r(N){if(N.length===0)return null;var H=N[0],P=N.pop();if(P!==H){N[0]=P;t:for(var dt=0,vt=N.length,w=vt>>>1;dt<w;){var O=2*(dt+1)-1,F=N[O],Z=O+1,ot=N[Z];if(0>u(F,P))Z<vt&&0>u(ot,F)?(N[dt]=ot,N[Z]=P,dt=Z):(N[dt]=F,N[O]=P,dt=O);else if(Z<vt&&0>u(ot,P))N[dt]=ot,N[Z]=P,dt=Z;else break t}}return H}function u(N,H){var P=N.sortIndex-H.sortIndex;return P!==0?P:N.id-H.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var m=performance;a.unstable_now=function(){return m.now()}}else{var d=Date,p=d.now();a.unstable_now=function(){return d.now()-p}}var h=[],v=[],g=1,b=null,x=3,z=!1,Y=!1,J=!1,X=!1,G=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,Q=typeof setImmediate<"u"?setImmediate:null;function at(N){for(var H=l(v);H!==null;){if(H.callback===null)r(v);else if(H.startTime<=N)r(v),H.sortIndex=H.expirationTime,i(h,H);else break;H=l(v)}}function W(N){if(J=!1,at(N),!Y)if(l(h)!==null)Y=!0,lt||(lt=!0,te());else{var H=l(v);H!==null&&de(W,H.startTime-N)}}var lt=!1,$=-1,et=5,Et=-1;function Ht(){return X?!0:!(a.unstable_now()-Et<et)}function $t(){if(X=!1,lt){var N=a.unstable_now();Et=N;var H=!0;try{t:{Y=!1,J&&(J=!1,I($),$=-1),z=!0;var P=x;try{e:{for(at(N),b=l(h);b!==null&&!(b.expirationTime>N&&Ht());){var dt=b.callback;if(typeof dt=="function"){b.callback=null,x=b.priorityLevel;var vt=dt(b.expirationTime<=N);if(N=a.unstable_now(),typeof vt=="function"){b.callback=vt,at(N),H=!0;break e}b===l(h)&&r(h),at(N)}else r(h);b=l(h)}if(b!==null)H=!0;else{var w=l(v);w!==null&&de(W,w.startTime-N),H=!1}}break t}finally{b=null,x=P,z=!1}H=void 0}}finally{H?te():lt=!1}}}var te;if(typeof Q=="function")te=function(){Q($t)};else if(typeof MessageChannel<"u"){var We=new MessageChannel,ge=We.port2;We.port1.onmessage=$t,te=function(){ge.postMessage(null)}}else te=function(){G($t,0)};function de(N,H){$=G(function(){N(a.unstable_now())},H)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(N){N.callback=null},a.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):et=0<N?Math.floor(1e3/N):5},a.unstable_getCurrentPriorityLevel=function(){return x},a.unstable_next=function(N){switch(x){case 1:case 2:case 3:var H=3;break;default:H=x}var P=x;x=H;try{return N()}finally{x=P}},a.unstable_requestPaint=function(){X=!0},a.unstable_runWithPriority=function(N,H){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var P=x;x=N;try{return H()}finally{x=P}},a.unstable_scheduleCallback=function(N,H,P){var dt=a.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?dt+P:dt):P=dt,N){case 1:var vt=-1;break;case 2:vt=250;break;case 5:vt=1073741823;break;case 4:vt=1e4;break;default:vt=5e3}return vt=P+vt,N={id:g++,callback:H,priorityLevel:N,startTime:P,expirationTime:vt,sortIndex:-1},P>dt?(N.sortIndex=P,i(v,N),l(h)===null&&N===l(v)&&(J?(I($),$=-1):J=!0,de(W,P-dt))):(N.sortIndex=vt,i(h,N),Y||z||(Y=!0,lt||(lt=!0,te()))),N},a.unstable_shouldYield=Ht,a.unstable_wrapCallback=function(N){var H=x;return function(){var P=x;x=H;try{return N.apply(this,arguments)}finally{x=P}}}})(lu)),lu}var Qp;function z2(){return Qp||(Qp=1,su.exports=U2()),su.exports}var ou={exports:{}},fe={};var Fp;function L2(){if(Fp)return fe;Fp=1;var a=Pu();function i(h){var v="https://react.dev/errors/"+h;if(1<arguments.length){v+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)v+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+h+"; visit "+v+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var r={d:{f:l,r:function(){throw Error(i(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function m(h,v,g){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:b==null?null:""+b,children:h,containerInfo:v,implementation:g}}var d=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(h,v){if(h==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}return fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,fe.createPortal=function(h,v){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error(i(299));return m(h,v,null,g)},fe.flushSync=function(h){var v=d.T,g=r.p;try{if(d.T=null,r.p=2,h)return h()}finally{d.T=v,r.p=g,r.d.f()}},fe.preconnect=function(h,v){typeof h=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,r.d.C(h,v))},fe.prefetchDNS=function(h){typeof h=="string"&&r.d.D(h)},fe.preinit=function(h,v){if(typeof h=="string"&&v&&typeof v.as=="string"){var g=v.as,b=p(g,v.crossOrigin),x=typeof v.integrity=="string"?v.integrity:void 0,z=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;g==="style"?r.d.S(h,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:b,integrity:x,fetchPriority:z}):g==="script"&&r.d.X(h,{crossOrigin:b,integrity:x,fetchPriority:z,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},fe.preinitModule=function(h,v){if(typeof h=="string")if(typeof v=="object"&&v!==null){if(v.as==null||v.as==="script"){var g=p(v.as,v.crossOrigin);r.d.M(h,{crossOrigin:g,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})}}else v==null&&r.d.M(h)},fe.preload=function(h,v){if(typeof h=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){var g=v.as,b=p(g,v.crossOrigin);r.d.L(h,g,{crossOrigin:b,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},fe.preloadModule=function(h,v){if(typeof h=="string")if(v){var g=p(v.as,v.crossOrigin);r.d.m(h,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:g,integrity:typeof v.integrity=="string"?v.integrity:void 0})}else r.d.m(h)},fe.requestFormReset=function(h){r.d.r(h)},fe.unstable_batchedUpdates=function(h,v){return h(v)},fe.useFormState=function(h,v,g){return d.H.useFormState(h,v,g)},fe.useFormStatus=function(){return d.H.useHostTransitionStatus()},fe.version="19.2.0",fe}var Jp;function O2(){if(Jp)return ou.exports;Jp=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(i){console.error(i)}}return a(),ou.exports=L2(),ou.exports}var Xp;function V2(){if(Xp)return Ms;Xp=1;var a=z2(),i=Pu(),l=O2();function r(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function m(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function d(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function p(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function h(t){if(m(t)!==t)throw Error(r(188))}function v(t){var e=t.alternate;if(!e){if(e=m(t),e===null)throw Error(r(188));return e!==t?null:t}for(var n=t,s=e;;){var o=n.return;if(o===null)break;var c=o.alternate;if(c===null){if(s=o.return,s!==null){n=s;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===n)return h(o),t;if(c===s)return h(o),e;c=c.sibling}throw Error(r(188))}if(n.return!==s.return)n=o,s=c;else{for(var f=!1,y=o.child;y;){if(y===n){f=!0,n=o,s=c;break}if(y===s){f=!0,s=o,n=c;break}y=y.sibling}if(!f){for(y=c.child;y;){if(y===n){f=!0,n=c,s=o;break}if(y===s){f=!0,s=c,n=o;break}y=y.sibling}if(!f)throw Error(r(189))}}if(n.alternate!==s)throw Error(r(190))}if(n.tag!==3)throw Error(r(188));return n.stateNode.current===n?t:e}function g(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=g(t),e!==null)return e;t=t.sibling}return null}var b=Object.assign,x=Symbol.for("react.element"),z=Symbol.for("react.transitional.element"),Y=Symbol.for("react.portal"),J=Symbol.for("react.fragment"),X=Symbol.for("react.strict_mode"),G=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),Q=Symbol.for("react.context"),at=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),lt=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),et=Symbol.for("react.lazy"),Et=Symbol.for("react.activity"),Ht=Symbol.for("react.memo_cache_sentinel"),$t=Symbol.iterator;function te(t){return t===null||typeof t!="object"?null:(t=$t&&t[$t]||t["@@iterator"],typeof t=="function"?t:null)}var We=Symbol.for("react.client.reference");function ge(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===We?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case J:return"Fragment";case G:return"Profiler";case X:return"StrictMode";case W:return"Suspense";case lt:return"SuspenseList";case Et:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Y:return"Portal";case Q:return t.displayName||"Context";case I:return(t._context.displayName||"Context")+".Consumer";case at:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case $:return e=t.displayName||null,e!==null?e:ge(t.type)||"Memo";case et:e=t._payload,t=t._init;try{return ge(t(e))}catch{}}return null}var de=Array.isArray,N=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},dt=[],vt=-1;function w(t){return{current:t}}function O(t){0>vt||(t.current=dt[vt],dt[vt]=null,vt--)}function F(t,e){vt++,dt[vt]=t.current,t.current=e}var Z=w(null),ot=w(null),ft=w(null),Ct=w(null);function he(t,e){switch(F(ft,e),F(ot,t),F(Z,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?np(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=np(e),t=ap(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}O(Z),F(Z,t)}function Ft(){O(Z),O(ot),O(ft)}function Li(t){t.memoizedState!==null&&F(Ct,t);var e=Z.current,n=ap(e,t.type);e!==n&&(F(ot,t),F(Z,n))}function _s(t){ot.current===t&&(O(Z),O(ot)),Ct.current===t&&(O(Ct),Ts._currentValue=P)}var Uo,Rd;function ma(t){if(Uo===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Uo=e&&e[1]||"",Rd=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Uo+t+Rd}var zo=!1;function Lo(t,e){if(!t||zo)return"";zo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var s={DetermineComponentFrameRoot:function(){try{if(e){var L=function(){throw Error()};if(Object.defineProperty(L.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(L,[])}catch(B){var k=B}Reflect.construct(t,[],L)}else{try{L.call()}catch(B){k=B}t.call(L.prototype)}}else{try{throw Error()}catch(B){k=B}(L=t())&&typeof L.catch=="function"&&L.catch(function(){})}}catch(B){if(B&&k&&typeof B.stack=="string")return[B.stack,k.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=s.DetermineComponentFrameRoot(),f=c[0],y=c[1];if(f&&y){var A=f.split(`
`),E=y.split(`
`);for(o=s=0;s<A.length&&!A[s].includes("DetermineComponentFrameRoot");)s++;for(;o<E.length&&!E[o].includes("DetermineComponentFrameRoot");)o++;if(s===A.length||o===E.length)for(s=A.length-1,o=E.length-1;1<=s&&0<=o&&A[s]!==E[o];)o--;for(;1<=s&&0<=o;s--,o--)if(A[s]!==E[o]){if(s!==1||o!==1)do if(s--,o--,0>o||A[s]!==E[o]){var R=`
`+A[s].replace(" at new "," at ");return t.displayName&&R.includes("<anonymous>")&&(R=R.replace("<anonymous>",t.displayName)),R}while(1<=s&&0<=o);break}}}finally{zo=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?ma(n):""}function ky(t,e){switch(t.tag){case 26:case 27:case 5:return ma(t.type);case 16:return ma("Lazy");case 13:return t.child!==e&&e!==null?ma("Suspense Fallback"):ma("Suspense");case 19:return ma("SuspenseList");case 0:case 15:return Lo(t.type,!1);case 11:return Lo(t.type.render,!1);case 1:return Lo(t.type,!0);case 31:return ma("Activity");default:return""}}function Nd(t){try{var e="",n=null;do e+=ky(t,n),n=t,t=t.return;while(t);return e}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}var Oo=Object.prototype.hasOwnProperty,Vo=a.unstable_scheduleCallback,Ho=a.unstable_cancelCallback,My=a.unstable_shouldYield,Dy=a.unstable_requestPaint,Ee=a.unstable_now,By=a.unstable_getCurrentPriorityLevel,Ud=a.unstable_ImmediatePriority,zd=a.unstable_UserBlockingPriority,Ws=a.unstable_NormalPriority,Ry=a.unstable_LowPriority,Ld=a.unstable_IdlePriority,Ny=a.log,Uy=a.unstable_setDisableYieldValue,Oi=null,ke=null;function Un(t){if(typeof Ny=="function"&&Uy(t),ke&&typeof ke.setStrictMode=="function")try{ke.setStrictMode(Oi,t)}catch{}}var Me=Math.clz32?Math.clz32:Oy,zy=Math.log,Ly=Math.LN2;function Oy(t){return t>>>=0,t===0?32:31-(zy(t)/Ly|0)|0}var $s=256,tl=262144,el=4194304;function ha(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function nl(t,e,n){var s=t.pendingLanes;if(s===0)return 0;var o=0,c=t.suspendedLanes,f=t.pingedLanes;t=t.warmLanes;var y=s&134217727;return y!==0?(s=y&~c,s!==0?o=ha(s):(f&=y,f!==0?o=ha(f):n||(n=y&~t,n!==0&&(o=ha(n))))):(y=s&~c,y!==0?o=ha(y):f!==0?o=ha(f):n||(n=s&~t,n!==0&&(o=ha(n)))),o===0?0:e!==0&&e!==o&&(e&c)===0&&(c=o&-o,n=e&-e,c>=n||c===32&&(n&4194048)!==0)?e:o}function Vi(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Vy(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Od(){var t=el;return el<<=1,(el&62914560)===0&&(el=4194304),t}function jo(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Hi(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Hy(t,e,n,s,o,c){var f=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var y=t.entanglements,A=t.expirationTimes,E=t.hiddenUpdates;for(n=f&~n;0<n;){var R=31-Me(n),L=1<<R;y[R]=0,A[R]=-1;var k=E[R];if(k!==null)for(E[R]=null,R=0;R<k.length;R++){var B=k[R];B!==null&&(B.lane&=-536870913)}n&=~L}s!==0&&Vd(t,s,0),c!==0&&o===0&&t.tag!==0&&(t.suspendedLanes|=c&~(f&~e))}function Vd(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var s=31-Me(e);t.entangledLanes|=e,t.entanglements[s]=t.entanglements[s]|1073741824|n&261930}function Hd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-Me(n),o=1<<s;o&e|t[s]&e&&(t[s]|=e),n&=~o}}function jd(t,e){var n=e&-e;return n=(n&42)!==0?1:Yo(n),(n&(t.suspendedLanes|e))!==0?0:n}function Yo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function qo(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Yd(){var t=H.p;return t!==0?t:(t=window.event,t===void 0?32:Ep(t.type))}function qd(t,e){var n=H.p;try{return H.p=t,e()}finally{H.p=n}}var zn=Math.random().toString(36).slice(2),se="__reactFiber$"+zn,ye="__reactProps$"+zn,Ya="__reactContainer$"+zn,Go="__reactEvents$"+zn,jy="__reactListeners$"+zn,Yy="__reactHandles$"+zn,Gd="__reactResources$"+zn,ji="__reactMarker$"+zn;function Qo(t){delete t[se],delete t[ye],delete t[Go],delete t[jy],delete t[Yy]}function qa(t){var e=t[se];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ya]||n[se]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=up(t);t!==null;){if(n=t[se])return n;t=up(t)}return e}t=n,n=t.parentNode}return null}function Ga(t){if(t=t[se]||t[Ya]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Yi(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(r(33))}function Qa(t){var e=t[Gd];return e||(e=t[Gd]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function ne(t){t[ji]=!0}var Qd=new Set,Fd={};function pa(t,e){Fa(t,e),Fa(t+"Capture",e)}function Fa(t,e){for(Fd[t]=e,t=0;t<e.length;t++)Qd.add(e[t])}var qy=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jd={},Xd={};function Gy(t){return Oo.call(Xd,t)?!0:Oo.call(Jd,t)?!1:qy.test(t)?Xd[t]=!0:(Jd[t]=!0,!1)}function al(t,e,n){if(Gy(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var s=e.toLowerCase().slice(0,5);if(s!=="data-"&&s!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function il(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function fn(t,e,n,s){if(s===null)t.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+s)}}function He(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Pd(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Qy(t,e,n){var s=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var o=s.get,c=s.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return o.call(this)},set:function(f){n=""+f,c.call(this,f)}}),Object.defineProperty(t,e,{enumerable:s.enumerable}),{getValue:function(){return n},setValue:function(f){n=""+f},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Fo(t){if(!t._valueTracker){var e=Pd(t)?"checked":"value";t._valueTracker=Qy(t,e,""+t[e])}}function Kd(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=Pd(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function sl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Fy=/[\n"\\]/g;function je(t){return t.replace(Fy,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Jo(t,e,n,s,o,c,f,y){t.name="",f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"?t.type=f:t.removeAttribute("type"),e!=null?f==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+He(e)):t.value!==""+He(e)&&(t.value=""+He(e)):f!=="submit"&&f!=="reset"||t.removeAttribute("value"),e!=null?Xo(t,f,He(e)):n!=null?Xo(t,f,He(n)):s!=null&&t.removeAttribute("value"),o==null&&c!=null&&(t.defaultChecked=!!c),o!=null&&(t.checked=o&&typeof o!="function"&&typeof o!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.name=""+He(y):t.removeAttribute("name")}function Id(t,e,n,s,o,c,f,y){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(t.type=c),e!=null||n!=null){if(!(c!=="submit"&&c!=="reset"||e!=null)){Fo(t);return}n=n!=null?""+He(n):"",e=e!=null?""+He(e):n,y||e===t.value||(t.value=e),t.defaultValue=e}s=s??o,s=typeof s!="function"&&typeof s!="symbol"&&!!s,t.checked=y?t.checked:!!s,t.defaultChecked=!!s,f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.name=f),Fo(t)}function Xo(t,e,n){e==="number"&&sl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Ja(t,e,n,s){if(t=t.options,e){e={};for(var o=0;o<n.length;o++)e["$"+n[o]]=!0;for(n=0;n<t.length;n++)o=e.hasOwnProperty("$"+t[n].value),t[n].selected!==o&&(t[n].selected=o),o&&s&&(t[n].defaultSelected=!0)}else{for(n=""+He(n),e=null,o=0;o<t.length;o++){if(t[o].value===n){t[o].selected=!0,s&&(t[o].defaultSelected=!0);return}e!==null||t[o].disabled||(e=t[o])}e!==null&&(e.selected=!0)}}function Zd(t,e,n){if(e!=null&&(e=""+He(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+He(n):""}function _d(t,e,n,s){if(e==null){if(s!=null){if(n!=null)throw Error(r(92));if(de(s)){if(1<s.length)throw Error(r(93));s=s[0]}n=s}n==null&&(n=""),e=n}n=He(e),t.defaultValue=n,s=t.textContent,s===n&&s!==""&&s!==null&&(t.value=s),Fo(t)}function Xa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Jy=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Wd(t,e,n){var s=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?s?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":s?t.setProperty(e,n):typeof n!="number"||n===0||Jy.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function $d(t,e,n){if(e!=null&&typeof e!="object")throw Error(r(62));if(t=t.style,n!=null){for(var s in n)!n.hasOwnProperty(s)||e!=null&&e.hasOwnProperty(s)||(s.indexOf("--")===0?t.setProperty(s,""):s==="float"?t.cssFloat="":t[s]="");for(var o in e)s=e[o],e.hasOwnProperty(o)&&n[o]!==s&&Wd(t,o,s)}else for(var c in e)e.hasOwnProperty(c)&&Wd(t,c,e[c])}function Po(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Py=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ll(t){return Py.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function mn(){}var Ko=null;function Io(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Pa=null,Ka=null;function tf(t){var e=Ga(t);if(e&&(t=e.stateNode)){var n=t[ye]||null;t:switch(t=e.stateNode,e.type){case"input":if(Jo(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+je(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var o=s[ye]||null;if(!o)throw Error(r(90));Jo(s,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(e=0;e<n.length;e++)s=n[e],s.form===t.form&&Kd(s)}break t;case"textarea":Zd(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&Ja(t,!!n.multiple,e,!1)}}}var Zo=!1;function ef(t,e,n){if(Zo)return t(e,n);Zo=!0;try{var s=t(e);return s}finally{if(Zo=!1,(Pa!==null||Ka!==null)&&(Pl(),Pa&&(e=Pa,t=Ka,Ka=Pa=null,tf(e),t)))for(e=0;e<t.length;e++)tf(t[e])}}function qi(t,e){var n=t.stateNode;if(n===null)return null;var s=n[ye]||null;if(s===null)return null;n=s[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(r(231,e,typeof n));return n}var hn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_o=!1;if(hn)try{var Gi={};Object.defineProperty(Gi,"passive",{get:function(){_o=!0}}),window.addEventListener("test",Gi,Gi),window.removeEventListener("test",Gi,Gi)}catch{_o=!1}var Ln=null,Wo=null,ol=null;function nf(){if(ol)return ol;var t,e=Wo,n=e.length,s,o="value"in Ln?Ln.value:Ln.textContent,c=o.length;for(t=0;t<n&&e[t]===o[t];t++);var f=n-t;for(s=1;s<=f&&e[n-s]===o[c-s];s++);return ol=o.slice(t,1<s?1-s:void 0)}function rl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function cl(){return!0}function af(){return!1}function be(t){function e(n,s,o,c,f){this._reactName=n,this._targetInst=o,this.type=s,this.nativeEvent=c,this.target=f,this.currentTarget=null;for(var y in t)t.hasOwnProperty(y)&&(n=t[y],this[y]=n?n(c):c[y]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?cl:af,this.isPropagationStopped=af,this}return b(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=cl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=cl)},persist:function(){},isPersistent:cl}),e}var va={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ul=be(va),Qi=b({},va,{view:0,detail:0}),Ky=be(Qi),$o,tr,Fi,dl=b({},Qi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nr,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Fi&&(Fi&&t.type==="mousemove"?($o=t.screenX-Fi.screenX,tr=t.screenY-Fi.screenY):tr=$o=0,Fi=t),$o)},movementY:function(t){return"movementY"in t?t.movementY:tr}}),sf=be(dl),Iy=b({},dl,{dataTransfer:0}),Zy=be(Iy),_y=b({},Qi,{relatedTarget:0}),er=be(_y),Wy=b({},va,{animationName:0,elapsedTime:0,pseudoElement:0}),$y=be(Wy),tb=b({},va,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),eb=be(tb),nb=b({},va,{data:0}),lf=be(nb),ab={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ib={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lb(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=sb[t])?!!e[t]:!1}function nr(){return lb}var ob=b({},Qi,{key:function(t){if(t.key){var e=ab[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=rl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ib[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nr,charCode:function(t){return t.type==="keypress"?rl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?rl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),rb=be(ob),cb=b({},dl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),of=be(cb),ub=b({},Qi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nr}),db=be(ub),fb=b({},va,{propertyName:0,elapsedTime:0,pseudoElement:0}),mb=be(fb),hb=b({},dl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),pb=be(hb),vb=b({},va,{newState:0,oldState:0}),gb=be(vb),yb=[9,13,27,32],ar=hn&&"CompositionEvent"in window,Ji=null;hn&&"documentMode"in document&&(Ji=document.documentMode);var bb=hn&&"TextEvent"in window&&!Ji,rf=hn&&(!ar||Ji&&8<Ji&&11>=Ji),cf=" ",uf=!1;function df(t,e){switch(t){case"keyup":return yb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ff(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ia=!1;function Ab(t,e){switch(t){case"compositionend":return ff(e);case"keypress":return e.which!==32?null:(uf=!0,cf);case"textInput":return t=e.data,t===cf&&uf?null:t;default:return null}}function xb(t,e){if(Ia)return t==="compositionend"||!ar&&df(t,e)?(t=nf(),ol=Wo=Ln=null,Ia=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return rf&&e.locale!=="ko"?null:e.data;default:return null}}var Sb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Sb[t.type]:e==="textarea"}function hf(t,e,n,s){Pa?Ka?Ka.push(s):Ka=[s]:Pa=s,e=to(e,"onChange"),0<e.length&&(n=new ul("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var Xi=null,Pi=null;function wb(t){Zh(t,0)}function fl(t){var e=Yi(t);if(Kd(e))return t}function pf(t,e){if(t==="change")return e}var vf=!1;if(hn){var ir;if(hn){var sr="oninput"in document;if(!sr){var gf=document.createElement("div");gf.setAttribute("oninput","return;"),sr=typeof gf.oninput=="function"}ir=sr}else ir=!1;vf=ir&&(!document.documentMode||9<document.documentMode)}function yf(){Xi&&(Xi.detachEvent("onpropertychange",bf),Pi=Xi=null)}function bf(t){if(t.propertyName==="value"&&fl(Pi)){var e=[];hf(e,Pi,t,Io(t)),ef(wb,e)}}function Tb(t,e,n){t==="focusin"?(yf(),Xi=e,Pi=n,Xi.attachEvent("onpropertychange",bf)):t==="focusout"&&yf()}function Cb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return fl(Pi)}function Eb(t,e){if(t==="click")return fl(e)}function kb(t,e){if(t==="input"||t==="change")return fl(e)}function Mb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var De=typeof Object.is=="function"?Object.is:Mb;function Ki(t,e){if(De(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var o=n[s];if(!Oo.call(e,o)||!De(t[o],e[o]))return!1}return!0}function Af(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function xf(t,e){var n=Af(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Af(n)}}function Sf(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Sf(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function wf(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=sl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=sl(t.document)}return e}function lr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Db=hn&&"documentMode"in document&&11>=document.documentMode,Za=null,or=null,Ii=null,rr=!1;function Tf(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;rr||Za==null||Za!==sl(s)||(s=Za,"selectionStart"in s&&lr(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Ii&&Ki(Ii,s)||(Ii=s,s=to(or,"onSelect"),0<s.length&&(e=new ul("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=Za)))}function ga(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var _a={animationend:ga("Animation","AnimationEnd"),animationiteration:ga("Animation","AnimationIteration"),animationstart:ga("Animation","AnimationStart"),transitionrun:ga("Transition","TransitionRun"),transitionstart:ga("Transition","TransitionStart"),transitioncancel:ga("Transition","TransitionCancel"),transitionend:ga("Transition","TransitionEnd")},cr={},Cf={};hn&&(Cf=document.createElement("div").style,"AnimationEvent"in window||(delete _a.animationend.animation,delete _a.animationiteration.animation,delete _a.animationstart.animation),"TransitionEvent"in window||delete _a.transitionend.transition);function ya(t){if(cr[t])return cr[t];if(!_a[t])return t;var e=_a[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Cf)return cr[t]=e[n];return t}var Ef=ya("animationend"),kf=ya("animationiteration"),Mf=ya("animationstart"),Bb=ya("transitionrun"),Rb=ya("transitionstart"),Nb=ya("transitioncancel"),Df=ya("transitionend"),Bf=new Map,ur="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ur.push("scrollEnd");function $e(t,e){Bf.set(t,e),pa(e,[t])}var ml=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ye=[],Wa=0,dr=0;function hl(){for(var t=Wa,e=dr=Wa=0;e<t;){var n=Ye[e];Ye[e++]=null;var s=Ye[e];Ye[e++]=null;var o=Ye[e];Ye[e++]=null;var c=Ye[e];if(Ye[e++]=null,s!==null&&o!==null){var f=s.pending;f===null?o.next=o:(o.next=f.next,f.next=o),s.pending=o}c!==0&&Rf(n,o,c)}}function pl(t,e,n,s){Ye[Wa++]=t,Ye[Wa++]=e,Ye[Wa++]=n,Ye[Wa++]=s,dr|=s,t.lanes|=s,t=t.alternate,t!==null&&(t.lanes|=s)}function fr(t,e,n,s){return pl(t,e,n,s),vl(t)}function ba(t,e){return pl(t,null,null,e),vl(t)}function Rf(t,e,n){t.lanes|=n;var s=t.alternate;s!==null&&(s.lanes|=n);for(var o=!1,c=t.return;c!==null;)c.childLanes|=n,s=c.alternate,s!==null&&(s.childLanes|=n),c.tag===22&&(t=c.stateNode,t===null||t._visibility&1||(o=!0)),t=c,c=c.return;return t.tag===3?(c=t.stateNode,o&&e!==null&&(o=31-Me(n),t=c.hiddenUpdates,s=t[o],s===null?t[o]=[e]:s.push(e),e.lane=n|536870912),c):null}function vl(t){if(50<gs)throw gs=0,xc=null,Error(r(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var $a={};function Ub(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Be(t,e,n,s){return new Ub(t,e,n,s)}function mr(t){return t=t.prototype,!(!t||!t.isReactComponent)}function pn(t,e){var n=t.alternate;return n===null?(n=Be(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function Nf(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function gl(t,e,n,s,o,c){var f=0;if(s=t,typeof t=="function")mr(t)&&(f=1);else if(typeof t=="string")f=H1(t,n,Z.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case Et:return t=Be(31,n,e,o),t.elementType=Et,t.lanes=c,t;case J:return Aa(n.children,o,c,e);case X:f=8,o|=24;break;case G:return t=Be(12,n,e,o|2),t.elementType=G,t.lanes=c,t;case W:return t=Be(13,n,e,o),t.elementType=W,t.lanes=c,t;case lt:return t=Be(19,n,e,o),t.elementType=lt,t.lanes=c,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Q:f=10;break t;case I:f=9;break t;case at:f=11;break t;case $:f=14;break t;case et:f=16,s=null;break t}f=29,n=Error(r(130,t===null?"null":typeof t,"")),s=null}return e=Be(f,n,e,o),e.elementType=t,e.type=s,e.lanes=c,e}function Aa(t,e,n,s){return t=Be(7,t,s,e),t.lanes=n,t}function hr(t,e,n){return t=Be(6,t,null,e),t.lanes=n,t}function Uf(t){var e=Be(18,null,null,0);return e.stateNode=t,e}function pr(t,e,n){return e=Be(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var zf=new WeakMap;function qe(t,e){if(typeof t=="object"&&t!==null){var n=zf.get(t);return n!==void 0?n:(e={value:t,source:e,stack:Nd(e)},zf.set(t,e),e)}return{value:t,source:e,stack:Nd(e)}}var ti=[],ei=0,yl=null,Zi=0,Ge=[],Qe=0,On=null,ln=1,on="";function vn(t,e){ti[ei++]=Zi,ti[ei++]=yl,yl=t,Zi=e}function Lf(t,e,n){Ge[Qe++]=ln,Ge[Qe++]=on,Ge[Qe++]=On,On=t;var s=ln;t=on;var o=32-Me(s)-1;s&=~(1<<o),n+=1;var c=32-Me(e)+o;if(30<c){var f=o-o%5;c=(s&(1<<f)-1).toString(32),s>>=f,o-=f,ln=1<<32-Me(e)+o|n<<o|s,on=c+t}else ln=1<<c|n<<o|s,on=t}function vr(t){t.return!==null&&(vn(t,1),Lf(t,1,0))}function gr(t){for(;t===yl;)yl=ti[--ei],ti[ei]=null,Zi=ti[--ei],ti[ei]=null;for(;t===On;)On=Ge[--Qe],Ge[Qe]=null,on=Ge[--Qe],Ge[Qe]=null,ln=Ge[--Qe],Ge[Qe]=null}function Of(t,e){Ge[Qe++]=ln,Ge[Qe++]=on,Ge[Qe++]=On,ln=e.id,on=e.overflow,On=t}var le=null,Ut=null,bt=!1,Vn=null,Fe=!1,yr=Error(r(519));function Hn(t){var e=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _i(qe(e,t)),yr}function Vf(t){var e=t.stateNode,n=t.type,s=t.memoizedProps;switch(e[se]=t,e[ye]=s,n){case"dialog":ht("cancel",e),ht("close",e);break;case"iframe":case"object":case"embed":ht("load",e);break;case"video":case"audio":for(n=0;n<bs.length;n++)ht(bs[n],e);break;case"source":ht("error",e);break;case"img":case"image":case"link":ht("error",e),ht("load",e);break;case"details":ht("toggle",e);break;case"input":ht("invalid",e),Id(e,s.value,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name,!0);break;case"select":ht("invalid",e);break;case"textarea":ht("invalid",e),_d(e,s.value,s.defaultValue,s.children)}n=s.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||s.suppressHydrationWarning===!0||tp(e.textContent,n)?(s.popover!=null&&(ht("beforetoggle",e),ht("toggle",e)),s.onScroll!=null&&ht("scroll",e),s.onScrollEnd!=null&&ht("scrollend",e),s.onClick!=null&&(e.onclick=mn),e=!0):e=!1,e||Hn(t,!0)}function Hf(t){for(le=t.return;le;)switch(le.tag){case 5:case 31:case 13:Fe=!1;return;case 27:case 3:Fe=!0;return;default:le=le.return}}function ni(t){if(t!==le)return!1;if(!bt)return Hf(t),bt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Oc(t.type,t.memoizedProps)),n=!n),n&&Ut&&Hn(t),Hf(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ut=cp(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Ut=cp(t)}else e===27?(e=Ut,Wn(t.type)?(t=qc,qc=null,Ut=t):Ut=e):Ut=le?Xe(t.stateNode.nextSibling):null;return!0}function xa(){Ut=le=null,bt=!1}function br(){var t=Vn;return t!==null&&(we===null?we=t:we.push.apply(we,t),Vn=null),t}function _i(t){Vn===null?Vn=[t]:Vn.push(t)}var Ar=w(null),Sa=null,gn=null;function jn(t,e,n){F(Ar,e._currentValue),e._currentValue=n}function yn(t){t._currentValue=Ar.current,O(Ar)}function xr(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function Sr(t,e,n,s){var o=t.child;for(o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){var f=o.child;c=c.firstContext;t:for(;c!==null;){var y=c;c=o;for(var A=0;A<e.length;A++)if(y.context===e[A]){c.lanes|=n,y=c.alternate,y!==null&&(y.lanes|=n),xr(c.return,n,t),s||(f=null);break t}c=y.next}}else if(o.tag===18){if(f=o.return,f===null)throw Error(r(341));f.lanes|=n,c=f.alternate,c!==null&&(c.lanes|=n),xr(f,n,t),f=null}else f=o.child;if(f!==null)f.return=o;else for(f=o;f!==null;){if(f===t){f=null;break}if(o=f.sibling,o!==null){o.return=f.return,f=o;break}f=f.return}o=f}}function ai(t,e,n,s){t=null;for(var o=e,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var f=o.alternate;if(f===null)throw Error(r(387));if(f=f.memoizedProps,f!==null){var y=o.type;De(o.pendingProps.value,f.value)||(t!==null?t.push(y):t=[y])}}else if(o===Ct.current){if(f=o.alternate,f===null)throw Error(r(387));f.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(t!==null?t.push(Ts):t=[Ts])}o=o.return}t!==null&&Sr(e,t,n,s),e.flags|=262144}function bl(t){for(t=t.firstContext;t!==null;){if(!De(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function wa(t){Sa=t,gn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function oe(t){return jf(Sa,t)}function Al(t,e){return Sa===null&&wa(t),jf(t,e)}function jf(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},gn===null){if(t===null)throw Error(r(308));gn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else gn=gn.next=e;return n}var zb=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,s){t.push(s)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Lb=a.unstable_scheduleCallback,Ob=a.unstable_NormalPriority,Kt={$$typeof:Q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function wr(){return{controller:new zb,data:new Map,refCount:0}}function Wi(t){t.refCount--,t.refCount===0&&Lb(Ob,function(){t.controller.abort()})}var $i=null,Tr=0,ii=0,si=null;function Vb(t,e){if($i===null){var n=$i=[];Tr=0,ii=kc(),si={status:"pending",value:void 0,then:function(s){n.push(s)}}}return Tr++,e.then(Yf,Yf),e}function Yf(){if(--Tr===0&&$i!==null){si!==null&&(si.status="fulfilled");var t=$i;$i=null,ii=0,si=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Hb(t,e){var n=[],s={status:"pending",value:null,reason:null,then:function(o){n.push(o)}};return t.then(function(){s.status="fulfilled",s.value=e;for(var o=0;o<n.length;o++)(0,n[o])(e)},function(o){for(s.status="rejected",s.reason=o,o=0;o<n.length;o++)(0,n[o])(void 0)}),s}var qf=N.S;N.S=function(t,e){Th=Ee(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Vb(t,e),qf!==null&&qf(t,e)};var Ta=w(null);function Cr(){var t=Ta.current;return t!==null?t:Nt.pooledCache}function xl(t,e){e===null?F(Ta,Ta.current):F(Ta,e.pool)}function Gf(){var t=Cr();return t===null?null:{parent:Kt._currentValue,pool:t}}var li=Error(r(460)),Er=Error(r(474)),Sl=Error(r(542)),wl={then:function(){}};function Qf(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ff(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(mn,mn),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Xf(t),t;default:if(typeof e.status=="string")e.then(mn,mn);else{if(t=Nt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=e,t.status="pending",t.then(function(s){if(e.status==="pending"){var o=e;o.status="fulfilled",o.value=s}},function(s){if(e.status==="pending"){var o=e;o.status="rejected",o.reason=s}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Xf(t),t}throw Ea=e,li}}function Ca(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ea=n,li):n}}var Ea=null;function Jf(){if(Ea===null)throw Error(r(459));var t=Ea;return Ea=null,t}function Xf(t){if(t===li||t===Sl)throw Error(r(483))}var oi=null,ts=0;function Tl(t){var e=ts;return ts+=1,oi===null&&(oi=[]),Ff(oi,t,e)}function es(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Cl(t,e){throw e.$$typeof===x?Error(r(525)):(t=Object.prototype.toString.call(e),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Pf(t){function e(T,S){if(t){var C=T.deletions;C===null?(T.deletions=[S],T.flags|=16):C.push(S)}}function n(T,S){if(!t)return null;for(;S!==null;)e(T,S),S=S.sibling;return null}function s(T){for(var S=new Map;T!==null;)T.key!==null?S.set(T.key,T):S.set(T.index,T),T=T.sibling;return S}function o(T,S){return T=pn(T,S),T.index=0,T.sibling=null,T}function c(T,S,C){return T.index=C,t?(C=T.alternate,C!==null?(C=C.index,C<S?(T.flags|=67108866,S):C):(T.flags|=67108866,S)):(T.flags|=1048576,S)}function f(T){return t&&T.alternate===null&&(T.flags|=67108866),T}function y(T,S,C,U){return S===null||S.tag!==6?(S=hr(C,T.mode,U),S.return=T,S):(S=o(S,C),S.return=T,S)}function A(T,S,C,U){var tt=C.type;return tt===J?R(T,S,C.props.children,U,C.key):S!==null&&(S.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===et&&Ca(tt)===S.type)?(S=o(S,C.props),es(S,C),S.return=T,S):(S=gl(C.type,C.key,C.props,null,T.mode,U),es(S,C),S.return=T,S)}function E(T,S,C,U){return S===null||S.tag!==4||S.stateNode.containerInfo!==C.containerInfo||S.stateNode.implementation!==C.implementation?(S=pr(C,T.mode,U),S.return=T,S):(S=o(S,C.children||[]),S.return=T,S)}function R(T,S,C,U,tt){return S===null||S.tag!==7?(S=Aa(C,T.mode,U,tt),S.return=T,S):(S=o(S,C),S.return=T,S)}function L(T,S,C){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return S=hr(""+S,T.mode,C),S.return=T,S;if(typeof S=="object"&&S!==null){switch(S.$$typeof){case z:return C=gl(S.type,S.key,S.props,null,T.mode,C),es(C,S),C.return=T,C;case Y:return S=pr(S,T.mode,C),S.return=T,S;case et:return S=Ca(S),L(T,S,C)}if(de(S)||te(S))return S=Aa(S,T.mode,C,null),S.return=T,S;if(typeof S.then=="function")return L(T,Tl(S),C);if(S.$$typeof===Q)return L(T,Al(T,S),C);Cl(T,S)}return null}function k(T,S,C,U){var tt=S!==null?S.key:null;if(typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint")return tt!==null?null:y(T,S,""+C,U);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case z:return C.key===tt?A(T,S,C,U):null;case Y:return C.key===tt?E(T,S,C,U):null;case et:return C=Ca(C),k(T,S,C,U)}if(de(C)||te(C))return tt!==null?null:R(T,S,C,U,null);if(typeof C.then=="function")return k(T,S,Tl(C),U);if(C.$$typeof===Q)return k(T,S,Al(T,C),U);Cl(T,C)}return null}function B(T,S,C,U,tt){if(typeof U=="string"&&U!==""||typeof U=="number"||typeof U=="bigint")return T=T.get(C)||null,y(S,T,""+U,tt);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case z:return T=T.get(U.key===null?C:U.key)||null,A(S,T,U,tt);case Y:return T=T.get(U.key===null?C:U.key)||null,E(S,T,U,tt);case et:return U=Ca(U),B(T,S,C,U,tt)}if(de(U)||te(U))return T=T.get(C)||null,R(S,T,U,tt,null);if(typeof U.then=="function")return B(T,S,C,Tl(U),tt);if(U.$$typeof===Q)return B(T,S,C,Al(S,U),tt);Cl(S,U)}return null}function K(T,S,C,U){for(var tt=null,At=null,_=S,ut=S=0,yt=null;_!==null&&ut<C.length;ut++){_.index>ut?(yt=_,_=null):yt=_.sibling;var xt=k(T,_,C[ut],U);if(xt===null){_===null&&(_=yt);break}t&&_&&xt.alternate===null&&e(T,_),S=c(xt,S,ut),At===null?tt=xt:At.sibling=xt,At=xt,_=yt}if(ut===C.length)return n(T,_),bt&&vn(T,ut),tt;if(_===null){for(;ut<C.length;ut++)_=L(T,C[ut],U),_!==null&&(S=c(_,S,ut),At===null?tt=_:At.sibling=_,At=_);return bt&&vn(T,ut),tt}for(_=s(_);ut<C.length;ut++)yt=B(_,T,ut,C[ut],U),yt!==null&&(t&&yt.alternate!==null&&_.delete(yt.key===null?ut:yt.key),S=c(yt,S,ut),At===null?tt=yt:At.sibling=yt,At=yt);return t&&_.forEach(function(aa){return e(T,aa)}),bt&&vn(T,ut),tt}function nt(T,S,C,U){if(C==null)throw Error(r(151));for(var tt=null,At=null,_=S,ut=S=0,yt=null,xt=C.next();_!==null&&!xt.done;ut++,xt=C.next()){_.index>ut?(yt=_,_=null):yt=_.sibling;var aa=k(T,_,xt.value,U);if(aa===null){_===null&&(_=yt);break}t&&_&&aa.alternate===null&&e(T,_),S=c(aa,S,ut),At===null?tt=aa:At.sibling=aa,At=aa,_=yt}if(xt.done)return n(T,_),bt&&vn(T,ut),tt;if(_===null){for(;!xt.done;ut++,xt=C.next())xt=L(T,xt.value,U),xt!==null&&(S=c(xt,S,ut),At===null?tt=xt:At.sibling=xt,At=xt);return bt&&vn(T,ut),tt}for(_=s(_);!xt.done;ut++,xt=C.next())xt=B(_,T,ut,xt.value,U),xt!==null&&(t&&xt.alternate!==null&&_.delete(xt.key===null?ut:xt.key),S=c(xt,S,ut),At===null?tt=xt:At.sibling=xt,At=xt);return t&&_.forEach(function(I1){return e(T,I1)}),bt&&vn(T,ut),tt}function Rt(T,S,C,U){if(typeof C=="object"&&C!==null&&C.type===J&&C.key===null&&(C=C.props.children),typeof C=="object"&&C!==null){switch(C.$$typeof){case z:t:{for(var tt=C.key;S!==null;){if(S.key===tt){if(tt=C.type,tt===J){if(S.tag===7){n(T,S.sibling),U=o(S,C.props.children),U.return=T,T=U;break t}}else if(S.elementType===tt||typeof tt=="object"&&tt!==null&&tt.$$typeof===et&&Ca(tt)===S.type){n(T,S.sibling),U=o(S,C.props),es(U,C),U.return=T,T=U;break t}n(T,S);break}else e(T,S);S=S.sibling}C.type===J?(U=Aa(C.props.children,T.mode,U,C.key),U.return=T,T=U):(U=gl(C.type,C.key,C.props,null,T.mode,U),es(U,C),U.return=T,T=U)}return f(T);case Y:t:{for(tt=C.key;S!==null;){if(S.key===tt)if(S.tag===4&&S.stateNode.containerInfo===C.containerInfo&&S.stateNode.implementation===C.implementation){n(T,S.sibling),U=o(S,C.children||[]),U.return=T,T=U;break t}else{n(T,S);break}else e(T,S);S=S.sibling}U=pr(C,T.mode,U),U.return=T,T=U}return f(T);case et:return C=Ca(C),Rt(T,S,C,U)}if(de(C))return K(T,S,C,U);if(te(C)){if(tt=te(C),typeof tt!="function")throw Error(r(150));return C=tt.call(C),nt(T,S,C,U)}if(typeof C.then=="function")return Rt(T,S,Tl(C),U);if(C.$$typeof===Q)return Rt(T,S,Al(T,C),U);Cl(T,C)}return typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint"?(C=""+C,S!==null&&S.tag===6?(n(T,S.sibling),U=o(S,C),U.return=T,T=U):(n(T,S),U=hr(C,T.mode,U),U.return=T,T=U),f(T)):n(T,S)}return function(T,S,C,U){try{ts=0;var tt=Rt(T,S,C,U);return oi=null,tt}catch(_){if(_===li||_===Sl)throw _;var At=Be(29,_,null,T.mode);return At.lanes=U,At.return=T,At}finally{}}}var ka=Pf(!0),Kf=Pf(!1),Yn=!1;function kr(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Mr(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function qn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Gn(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,(wt&2)!==0){var o=s.pending;return o===null?e.next=e:(e.next=o.next,o.next=e),s.pending=e,e=vl(t),Rf(t,null,n),e}return pl(t,s,e,n),vl(t)}function ns(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,Hd(t,n)}}function Dr(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var o=null,c=null;if(n=n.firstBaseUpdate,n!==null){do{var f={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};c===null?o=c=f:c=c.next=f,n=n.next}while(n!==null);c===null?o=c=e:c=c.next=e}else o=c=e;n={baseState:s.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:s.shared,callbacks:s.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Br=!1;function as(){if(Br){var t=si;if(t!==null)throw t}}function is(t,e,n,s){Br=!1;var o=t.updateQueue;Yn=!1;var c=o.firstBaseUpdate,f=o.lastBaseUpdate,y=o.shared.pending;if(y!==null){o.shared.pending=null;var A=y,E=A.next;A.next=null,f===null?c=E:f.next=E,f=A;var R=t.alternate;R!==null&&(R=R.updateQueue,y=R.lastBaseUpdate,y!==f&&(y===null?R.firstBaseUpdate=E:y.next=E,R.lastBaseUpdate=A))}if(c!==null){var L=o.baseState;f=0,R=E=A=null,y=c;do{var k=y.lane&-536870913,B=k!==y.lane;if(B?(gt&k)===k:(s&k)===k){k!==0&&k===ii&&(Br=!0),R!==null&&(R=R.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});t:{var K=t,nt=y;k=e;var Rt=n;switch(nt.tag){case 1:if(K=nt.payload,typeof K=="function"){L=K.call(Rt,L,k);break t}L=K;break t;case 3:K.flags=K.flags&-65537|128;case 0:if(K=nt.payload,k=typeof K=="function"?K.call(Rt,L,k):K,k==null)break t;L=b({},L,k);break t;case 2:Yn=!0}}k=y.callback,k!==null&&(t.flags|=64,B&&(t.flags|=8192),B=o.callbacks,B===null?o.callbacks=[k]:B.push(k))}else B={lane:k,tag:y.tag,payload:y.payload,callback:y.callback,next:null},R===null?(E=R=B,A=L):R=R.next=B,f|=k;if(y=y.next,y===null){if(y=o.shared.pending,y===null)break;B=y,y=B.next,B.next=null,o.lastBaseUpdate=B,o.shared.pending=null}}while(!0);R===null&&(A=L),o.baseState=A,o.firstBaseUpdate=E,o.lastBaseUpdate=R,c===null&&(o.shared.lanes=0),Pn|=f,t.lanes=f,t.memoizedState=L}}function If(t,e){if(typeof t!="function")throw Error(r(191,t));t.call(e)}function Zf(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)If(n[t],e)}var ri=w(null),El=w(0);function _f(t,e){t=kn,F(El,t),F(ri,e),kn=t|e.baseLanes}function Rr(){F(El,kn),F(ri,ri.current)}function Nr(){kn=El.current,O(ri),O(El)}var Re=w(null),Je=null;function Qn(t){var e=t.alternate;F(Jt,Jt.current&1),F(Re,t),Je===null&&(e===null||ri.current!==null||e.memoizedState!==null)&&(Je=t)}function Ur(t){F(Jt,Jt.current),F(Re,t),Je===null&&(Je=t)}function Wf(t){t.tag===22?(F(Jt,Jt.current),F(Re,t),Je===null&&(Je=t)):Fn()}function Fn(){F(Jt,Jt.current),F(Re,Re.current)}function Ne(t){O(Re),Je===t&&(Je=null),O(Jt)}var Jt=w(0);function kl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||jc(n)||Yc(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var bn=0,rt=null,Dt=null,It=null,Ml=!1,ci=!1,Ma=!1,Dl=0,ss=0,ui=null,jb=0;function Yt(){throw Error(r(321))}function zr(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!De(t[n],e[n]))return!1;return!0}function Lr(t,e,n,s,o,c){return bn=c,rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,N.H=t===null||t.memoizedState===null?Lm:Zr,Ma=!1,c=n(s,o),Ma=!1,ci&&(c=tm(e,n,s,o)),$f(t),c}function $f(t){N.H=rs;var e=Dt!==null&&Dt.next!==null;if(bn=0,It=Dt=rt=null,Ml=!1,ss=0,ui=null,e)throw Error(r(300));t===null||Zt||(t=t.dependencies,t!==null&&bl(t)&&(Zt=!0))}function tm(t,e,n,s){rt=t;var o=0;do{if(ci&&(ui=null),ss=0,ci=!1,25<=o)throw Error(r(301));if(o+=1,It=Dt=null,t.updateQueue!=null){var c=t.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}N.H=Om,c=e(n,s)}while(ci);return c}function Yb(){var t=N.H,e=t.useState()[0];return e=typeof e.then=="function"?ls(e):e,t=t.useState()[0],(Dt!==null?Dt.memoizedState:null)!==t&&(rt.flags|=1024),e}function Or(){var t=Dl!==0;return Dl=0,t}function Vr(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function Hr(t){if(Ml){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Ml=!1}bn=0,It=Dt=rt=null,ci=!1,ss=Dl=0,ui=null}function pe(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return It===null?rt.memoizedState=It=t:It=It.next=t,It}function Xt(){if(Dt===null){var t=rt.alternate;t=t!==null?t.memoizedState:null}else t=Dt.next;var e=It===null?rt.memoizedState:It.next;if(e!==null)It=e,Dt=t;else{if(t===null)throw rt.alternate===null?Error(r(467)):Error(r(310));Dt=t,t={memoizedState:Dt.memoizedState,baseState:Dt.baseState,baseQueue:Dt.baseQueue,queue:Dt.queue,next:null},It===null?rt.memoizedState=It=t:It=It.next=t}return It}function Bl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ls(t){var e=ss;return ss+=1,ui===null&&(ui=[]),t=Ff(ui,t,e),e=rt,(It===null?e.memoizedState:It.next)===null&&(e=e.alternate,N.H=e===null||e.memoizedState===null?Lm:Zr),t}function Rl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ls(t);if(t.$$typeof===Q)return oe(t)}throw Error(r(438,String(t)))}function jr(t){var e=null,n=rt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var s=rt.alternate;s!==null&&(s=s.updateQueue,s!==null&&(s=s.memoCache,s!=null&&(e={data:s.data.map(function(o){return o.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Bl(),rt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),s=0;s<t;s++)n[s]=Ht;return e.index++,n}function An(t,e){return typeof e=="function"?e(t):e}function Nl(t){var e=Xt();return Yr(e,Dt,t)}function Yr(t,e,n){var s=t.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=n;var o=t.baseQueue,c=s.pending;if(c!==null){if(o!==null){var f=o.next;o.next=c.next,c.next=f}e.baseQueue=o=c,s.pending=null}if(c=t.baseState,o===null)t.memoizedState=c;else{e=o.next;var y=f=null,A=null,E=e,R=!1;do{var L=E.lane&-536870913;if(L!==E.lane?(gt&L)===L:(bn&L)===L){var k=E.revertLane;if(k===0)A!==null&&(A=A.next={lane:0,revertLane:0,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null}),L===ii&&(R=!0);else if((bn&k)===k){E=E.next,k===ii&&(R=!0);continue}else L={lane:0,revertLane:E.revertLane,gesture:null,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},A===null?(y=A=L,f=c):A=A.next=L,rt.lanes|=k,Pn|=k;L=E.action,Ma&&n(c,L),c=E.hasEagerState?E.eagerState:n(c,L)}else k={lane:L,revertLane:E.revertLane,gesture:E.gesture,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null},A===null?(y=A=k,f=c):A=A.next=k,rt.lanes|=L,Pn|=L;E=E.next}while(E!==null&&E!==e);if(A===null?f=c:A.next=y,!De(c,t.memoizedState)&&(Zt=!0,R&&(n=si,n!==null)))throw n;t.memoizedState=c,t.baseState=f,t.baseQueue=A,s.lastRenderedState=c}return o===null&&(s.lanes=0),[t.memoizedState,s.dispatch]}function qr(t){var e=Xt(),n=e.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=t;var s=n.dispatch,o=n.pending,c=e.memoizedState;if(o!==null){n.pending=null;var f=o=o.next;do c=t(c,f.action),f=f.next;while(f!==o);De(c,e.memoizedState)||(Zt=!0),e.memoizedState=c,e.baseQueue===null&&(e.baseState=c),n.lastRenderedState=c}return[c,s]}function em(t,e,n){var s=rt,o=Xt(),c=bt;if(c){if(n===void 0)throw Error(r(407));n=n()}else n=e();var f=!De((Dt||o).memoizedState,n);if(f&&(o.memoizedState=n,Zt=!0),o=o.queue,Fr(im.bind(null,s,o,t),[t]),o.getSnapshot!==e||f||It!==null&&It.memoizedState.tag&1){if(s.flags|=2048,di(9,{destroy:void 0},am.bind(null,s,o,n,e),null),Nt===null)throw Error(r(349));c||(bn&127)!==0||nm(s,e,n)}return n}function nm(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=rt.updateQueue,e===null?(e=Bl(),rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function am(t,e,n,s){e.value=n,e.getSnapshot=s,sm(e)&&lm(t)}function im(t,e,n){return n(function(){sm(e)&&lm(t)})}function sm(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!De(t,n)}catch{return!0}}function lm(t){var e=ba(t,2);e!==null&&Te(e,t,2)}function Gr(t){var e=pe();if(typeof t=="function"){var n=t;if(t=n(),Ma){Un(!0);try{n()}finally{Un(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:t},e}function om(t,e,n,s){return t.baseState=n,Yr(t,Dt,typeof s=="function"?s:An)}function qb(t,e,n,s,o){if(Ll(t))throw Error(r(485));if(t=e.action,t!==null){var c={payload:o,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(f){c.listeners.push(f)}};N.T!==null?n(!0):c.isTransition=!1,s(c),n=e.pending,n===null?(c.next=e.pending=c,rm(e,c)):(c.next=n.next,e.pending=n.next=c)}}function rm(t,e){var n=e.action,s=e.payload,o=t.state;if(e.isTransition){var c=N.T,f={};N.T=f;try{var y=n(o,s),A=N.S;A!==null&&A(f,y),cm(t,e,y)}catch(E){Qr(t,e,E)}finally{c!==null&&f.types!==null&&(c.types=f.types),N.T=c}}else try{c=n(o,s),cm(t,e,c)}catch(E){Qr(t,e,E)}}function cm(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(s){um(t,e,s)},function(s){return Qr(t,e,s)}):um(t,e,n)}function um(t,e,n){e.status="fulfilled",e.value=n,dm(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,rm(t,n)))}function Qr(t,e,n){var s=t.pending;if(t.pending=null,s!==null){s=s.next;do e.status="rejected",e.reason=n,dm(e),e=e.next;while(e!==s)}t.action=null}function dm(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function fm(t,e){return e}function mm(t,e){if(bt){var n=Nt.formState;if(n!==null){t:{var s=rt;if(bt){if(Ut){e:{for(var o=Ut,c=Fe;o.nodeType!==8;){if(!c){o=null;break e}if(o=Xe(o.nextSibling),o===null){o=null;break e}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){Ut=Xe(o.nextSibling),s=o.data==="F!";break t}}Hn(s)}s=!1}s&&(e=n[0])}}return n=pe(),n.memoizedState=n.baseState=e,s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fm,lastRenderedState:e},n.queue=s,n=Nm.bind(null,rt,s),s.dispatch=n,s=Gr(!1),c=Ir.bind(null,rt,!1,s.queue),s=pe(),o={state:e,dispatch:null,action:t,pending:null},s.queue=o,n=qb.bind(null,rt,o,c,n),o.dispatch=n,s.memoizedState=t,[e,n,!1]}function hm(t){var e=Xt();return pm(e,Dt,t)}function pm(t,e,n){if(e=Yr(t,e,fm)[0],t=Nl(An)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var s=ls(e)}catch(f){throw f===li?Sl:f}else s=e;e=Xt();var o=e.queue,c=o.dispatch;return n!==e.memoizedState&&(rt.flags|=2048,di(9,{destroy:void 0},Gb.bind(null,o,n),null)),[s,c,t]}function Gb(t,e){t.action=e}function vm(t){var e=Xt(),n=Dt;if(n!==null)return pm(e,n,t);Xt(),e=e.memoizedState,n=Xt();var s=n.queue.dispatch;return n.memoizedState=t,[e,s,!1]}function di(t,e,n,s){return t={tag:t,create:n,deps:s,inst:e,next:null},e=rt.updateQueue,e===null&&(e=Bl(),rt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t),t}function gm(){return Xt().memoizedState}function Ul(t,e,n,s){var o=pe();rt.flags|=t,o.memoizedState=di(1|e,{destroy:void 0},n,s===void 0?null:s)}function zl(t,e,n,s){var o=Xt();s=s===void 0?null:s;var c=o.memoizedState.inst;Dt!==null&&s!==null&&zr(s,Dt.memoizedState.deps)?o.memoizedState=di(e,c,n,s):(rt.flags|=t,o.memoizedState=di(1|e,c,n,s))}function ym(t,e){Ul(8390656,8,t,e)}function Fr(t,e){zl(2048,8,t,e)}function Qb(t){rt.flags|=4;var e=rt.updateQueue;if(e===null)e=Bl(),rt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function bm(t){var e=Xt().memoizedState;return Qb({ref:e,nextImpl:t}),function(){if((wt&2)!==0)throw Error(r(440));return e.impl.apply(void 0,arguments)}}function Am(t,e){return zl(4,2,t,e)}function xm(t,e){return zl(4,4,t,e)}function Sm(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function wm(t,e,n){n=n!=null?n.concat([t]):null,zl(4,4,Sm.bind(null,e,t),n)}function Jr(){}function Tm(t,e){var n=Xt();e=e===void 0?null:e;var s=n.memoizedState;return e!==null&&zr(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function Cm(t,e){var n=Xt();e=e===void 0?null:e;var s=n.memoizedState;if(e!==null&&zr(e,s[1]))return s[0];if(s=t(),Ma){Un(!0);try{t()}finally{Un(!1)}}return n.memoizedState=[s,e],s}function Xr(t,e,n){return n===void 0||(bn&1073741824)!==0&&(gt&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=Eh(),rt.lanes|=t,Pn|=t,n)}function Em(t,e,n,s){return De(n,e)?n:ri.current!==null?(t=Xr(t,n,s),De(t,e)||(Zt=!0),t):(bn&42)===0||(bn&1073741824)!==0&&(gt&261930)===0?(Zt=!0,t.memoizedState=n):(t=Eh(),rt.lanes|=t,Pn|=t,e)}function km(t,e,n,s,o){var c=H.p;H.p=c!==0&&8>c?c:8;var f=N.T,y={};N.T=y,Ir(t,!1,e,n);try{var A=o(),E=N.S;if(E!==null&&E(y,A),A!==null&&typeof A=="object"&&typeof A.then=="function"){var R=Hb(A,s);os(t,e,R,Le(t))}else os(t,e,s,Le(t))}catch(L){os(t,e,{then:function(){},status:"rejected",reason:L},Le())}finally{H.p=c,f!==null&&y.types!==null&&(f.types=y.types),N.T=f}}function Fb(){}function Pr(t,e,n,s){if(t.tag!==5)throw Error(r(476));var o=Mm(t).queue;km(t,o,e,P,n===null?Fb:function(){return Dm(t),n(s)})}function Mm(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:P},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Dm(t){var e=Mm(t);e.next===null&&(e=t.alternate.memoizedState),os(t,e.next.queue,{},Le())}function Kr(){return oe(Ts)}function Bm(){return Xt().memoizedState}function Rm(){return Xt().memoizedState}function Jb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=Le();t=qn(n);var s=Gn(e,t,n);s!==null&&(Te(s,e,n),ns(s,e,n)),e={cache:wr()},t.payload=e;return}e=e.return}}function Xb(t,e,n){var s=Le();n={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ll(t)?Um(e,n):(n=fr(t,e,n,s),n!==null&&(Te(n,t,s),zm(n,e,s)))}function Nm(t,e,n){var s=Le();os(t,e,n,s)}function os(t,e,n,s){var o={lane:s,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ll(t))Um(e,o);else{var c=t.alternate;if(t.lanes===0&&(c===null||c.lanes===0)&&(c=e.lastRenderedReducer,c!==null))try{var f=e.lastRenderedState,y=c(f,n);if(o.hasEagerState=!0,o.eagerState=y,De(y,f))return pl(t,e,o,0),Nt===null&&hl(),!1}catch{}finally{}if(n=fr(t,e,o,s),n!==null)return Te(n,t,s),zm(n,e,s),!0}return!1}function Ir(t,e,n,s){if(s={lane:2,revertLane:kc(),gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Ll(t)){if(e)throw Error(r(479))}else e=fr(t,n,s,2),e!==null&&Te(e,t,2)}function Ll(t){var e=t.alternate;return t===rt||e!==null&&e===rt}function Um(t,e){ci=Ml=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function zm(t,e,n){if((n&4194048)!==0){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,Hd(t,n)}}var rs={readContext:oe,use:Rl,useCallback:Yt,useContext:Yt,useEffect:Yt,useImperativeHandle:Yt,useLayoutEffect:Yt,useInsertionEffect:Yt,useMemo:Yt,useReducer:Yt,useRef:Yt,useState:Yt,useDebugValue:Yt,useDeferredValue:Yt,useTransition:Yt,useSyncExternalStore:Yt,useId:Yt,useHostTransitionStatus:Yt,useFormState:Yt,useActionState:Yt,useOptimistic:Yt,useMemoCache:Yt,useCacheRefresh:Yt};rs.useEffectEvent=Yt;var Lm={readContext:oe,use:Rl,useCallback:function(t,e){return pe().memoizedState=[t,e===void 0?null:e],t},useContext:oe,useEffect:ym,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Ul(4194308,4,Sm.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ul(4194308,4,t,e)},useInsertionEffect:function(t,e){Ul(4,2,t,e)},useMemo:function(t,e){var n=pe();e=e===void 0?null:e;var s=t();if(Ma){Un(!0);try{t()}finally{Un(!1)}}return n.memoizedState=[s,e],s},useReducer:function(t,e,n){var s=pe();if(n!==void 0){var o=n(e);if(Ma){Un(!0);try{n(e)}finally{Un(!1)}}}else o=e;return s.memoizedState=s.baseState=o,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:o},s.queue=t,t=t.dispatch=Xb.bind(null,rt,t),[s.memoizedState,t]},useRef:function(t){var e=pe();return t={current:t},e.memoizedState=t},useState:function(t){t=Gr(t);var e=t.queue,n=Nm.bind(null,rt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Jr,useDeferredValue:function(t,e){var n=pe();return Xr(n,t,e)},useTransition:function(){var t=Gr(!1);return t=km.bind(null,rt,t.queue,!0,!1),pe().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var s=rt,o=pe();if(bt){if(n===void 0)throw Error(r(407));n=n()}else{if(n=e(),Nt===null)throw Error(r(349));(gt&127)!==0||nm(s,e,n)}o.memoizedState=n;var c={value:n,getSnapshot:e};return o.queue=c,ym(im.bind(null,s,c,t),[t]),s.flags|=2048,di(9,{destroy:void 0},am.bind(null,s,c,n,e),null),n},useId:function(){var t=pe(),e=Nt.identifierPrefix;if(bt){var n=on,s=ln;n=(s&~(1<<32-Me(s)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Dl++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=jb++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Kr,useFormState:mm,useActionState:mm,useOptimistic:function(t){var e=pe();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Ir.bind(null,rt,!0,n),n.dispatch=e,[t,e]},useMemoCache:jr,useCacheRefresh:function(){return pe().memoizedState=Jb.bind(null,rt)},useEffectEvent:function(t){var e=pe(),n={impl:t};return e.memoizedState=n,function(){if((wt&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}},Zr={readContext:oe,use:Rl,useCallback:Tm,useContext:oe,useEffect:Fr,useImperativeHandle:wm,useInsertionEffect:Am,useLayoutEffect:xm,useMemo:Cm,useReducer:Nl,useRef:gm,useState:function(){return Nl(An)},useDebugValue:Jr,useDeferredValue:function(t,e){var n=Xt();return Em(n,Dt.memoizedState,t,e)},useTransition:function(){var t=Nl(An)[0],e=Xt().memoizedState;return[typeof t=="boolean"?t:ls(t),e]},useSyncExternalStore:em,useId:Bm,useHostTransitionStatus:Kr,useFormState:hm,useActionState:hm,useOptimistic:function(t,e){var n=Xt();return om(n,Dt,t,e)},useMemoCache:jr,useCacheRefresh:Rm};Zr.useEffectEvent=bm;var Om={readContext:oe,use:Rl,useCallback:Tm,useContext:oe,useEffect:Fr,useImperativeHandle:wm,useInsertionEffect:Am,useLayoutEffect:xm,useMemo:Cm,useReducer:qr,useRef:gm,useState:function(){return qr(An)},useDebugValue:Jr,useDeferredValue:function(t,e){var n=Xt();return Dt===null?Xr(n,t,e):Em(n,Dt.memoizedState,t,e)},useTransition:function(){var t=qr(An)[0],e=Xt().memoizedState;return[typeof t=="boolean"?t:ls(t),e]},useSyncExternalStore:em,useId:Bm,useHostTransitionStatus:Kr,useFormState:vm,useActionState:vm,useOptimistic:function(t,e){var n=Xt();return Dt!==null?om(n,Dt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:jr,useCacheRefresh:Rm};Om.useEffectEvent=bm;function _r(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:b({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Wr={enqueueSetState:function(t,e,n){t=t._reactInternals;var s=Le(),o=qn(s);o.payload=e,n!=null&&(o.callback=n),e=Gn(t,o,s),e!==null&&(Te(e,t,s),ns(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=Le(),o=qn(s);o.tag=1,o.payload=e,n!=null&&(o.callback=n),e=Gn(t,o,s),e!==null&&(Te(e,t,s),ns(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Le(),s=qn(n);s.tag=2,e!=null&&(s.callback=e),e=Gn(t,s,n),e!==null&&(Te(e,t,n),ns(e,t,n))}};function Vm(t,e,n,s,o,c,f){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,c,f):e.prototype&&e.prototype.isPureReactComponent?!Ki(n,s)||!Ki(o,c):!0}function Hm(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&Wr.enqueueReplaceState(e,e.state,null)}function Da(t,e){var n=e;if("ref"in e){n={};for(var s in e)s!=="ref"&&(n[s]=e[s])}if(t=t.defaultProps){n===e&&(n=b({},n));for(var o in t)n[o]===void 0&&(n[o]=t[o])}return n}function jm(t){ml(t)}function Ym(t){console.error(t)}function qm(t){ml(t)}function Ol(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(s){setTimeout(function(){throw s})}}function Gm(t,e,n){try{var s=t.onCaughtError;s(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function $r(t,e,n){return n=qn(n),n.tag=3,n.payload={element:null},n.callback=function(){Ol(t,e)},n}function Qm(t){return t=qn(t),t.tag=3,t}function Fm(t,e,n,s){var o=n.type.getDerivedStateFromError;if(typeof o=="function"){var c=s.value;t.payload=function(){return o(c)},t.callback=function(){Gm(e,n,s)}}var f=n.stateNode;f!==null&&typeof f.componentDidCatch=="function"&&(t.callback=function(){Gm(e,n,s),typeof o!="function"&&(Kn===null?Kn=new Set([this]):Kn.add(this));var y=s.stack;this.componentDidCatch(s.value,{componentStack:y!==null?y:""})})}function Pb(t,e,n,s,o){if(n.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){if(e=n.alternate,e!==null&&ai(e,n,o,!0),n=Re.current,n!==null){switch(n.tag){case 31:case 13:return Je===null?Kl():n.alternate===null&&qt===0&&(qt=3),n.flags&=-257,n.flags|=65536,n.lanes=o,s===wl?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([s]):e.add(s),Tc(t,s,o)),!1;case 22:return n.flags|=65536,s===wl?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([s])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([s]):n.add(s)),Tc(t,s,o)),!1}throw Error(r(435,n.tag))}return Tc(t,s,o),Kl(),!1}if(bt)return e=Re.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=o,s!==yr&&(t=Error(r(422),{cause:s}),_i(qe(t,n)))):(s!==yr&&(e=Error(r(423),{cause:s}),_i(qe(e,n))),t=t.current.alternate,t.flags|=65536,o&=-o,t.lanes|=o,s=qe(s,n),o=$r(t.stateNode,s,o),Dr(t,o),qt!==4&&(qt=2)),!1;var c=Error(r(520),{cause:s});if(c=qe(c,n),vs===null?vs=[c]:vs.push(c),qt!==4&&(qt=2),e===null)return!0;s=qe(s,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=o&-o,n.lanes|=t,t=$r(n.stateNode,s,t),Dr(n,t),!1;case 1:if(e=n.type,c=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Kn===null||!Kn.has(c))))return n.flags|=65536,o&=-o,n.lanes|=o,o=Qm(o),Fm(o,t,n,s),Dr(n,o),!1}n=n.return}while(n!==null);return!1}var tc=Error(r(461)),Zt=!1;function re(t,e,n,s){e.child=t===null?Kf(e,null,n,s):ka(e,t.child,n,s)}function Jm(t,e,n,s,o){n=n.render;var c=e.ref;if("ref"in s){var f={};for(var y in s)y!=="ref"&&(f[y]=s[y])}else f=s;return wa(e),s=Lr(t,e,n,f,c,o),y=Or(),t!==null&&!Zt?(Vr(t,e,o),xn(t,e,o)):(bt&&y&&vr(e),e.flags|=1,re(t,e,s,o),e.child)}function Xm(t,e,n,s,o){if(t===null){var c=n.type;return typeof c=="function"&&!mr(c)&&c.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=c,Pm(t,e,c,s,o)):(t=gl(n.type,null,s,e,e.mode,o),t.ref=e.ref,t.return=e,e.child=t)}if(c=t.child,!rc(t,o)){var f=c.memoizedProps;if(n=n.compare,n=n!==null?n:Ki,n(f,s)&&t.ref===e.ref)return xn(t,e,o)}return e.flags|=1,t=pn(c,s),t.ref=e.ref,t.return=e,e.child=t}function Pm(t,e,n,s,o){if(t!==null){var c=t.memoizedProps;if(Ki(c,s)&&t.ref===e.ref)if(Zt=!1,e.pendingProps=s=c,rc(t,o))(t.flags&131072)!==0&&(Zt=!0);else return e.lanes=t.lanes,xn(t,e,o)}return ec(t,e,n,s,o)}function Km(t,e,n,s){var o=s.children,c=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),s.mode==="hidden"){if((e.flags&128)!==0){if(c=c!==null?c.baseLanes|n:n,t!==null){for(s=e.child=t.child,o=0;s!==null;)o=o|s.lanes|s.childLanes,s=s.sibling;s=o&~c}else s=0,e.child=null;return Im(t,e,c,n,s)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&xl(e,c!==null?c.cachePool:null),c!==null?_f(e,c):Rr(),Wf(e);else return s=e.lanes=536870912,Im(t,e,c!==null?c.baseLanes|n:n,n,s)}else c!==null?(xl(e,c.cachePool),_f(e,c),Fn(),e.memoizedState=null):(t!==null&&xl(e,null),Rr(),Fn());return re(t,e,o,n),e.child}function cs(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Im(t,e,n,s,o){var c=Cr();return c=c===null?null:{parent:Kt._currentValue,pool:c},e.memoizedState={baseLanes:n,cachePool:c},t!==null&&xl(e,null),Rr(),Wf(e),t!==null&&ai(t,e,s,!0),e.childLanes=o,null}function Vl(t,e){return e=jl({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Zm(t,e,n){return ka(e,t.child,null,n),t=Vl(e,e.pendingProps),t.flags|=2,Ne(e),e.memoizedState=null,t}function Kb(t,e,n){var s=e.pendingProps,o=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(bt){if(s.mode==="hidden")return t=Vl(e,s),e.lanes=536870912,cs(null,t);if(Ur(e),(t=Ut)?(t=rp(t,Fe),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:On!==null?{id:ln,overflow:on}:null,retryLane:536870912,hydrationErrors:null},n=Uf(t),n.return=e,e.child=n,le=e,Ut=null)):t=null,t===null)throw Hn(e);return e.lanes=536870912,null}return Vl(e,s)}var c=t.memoizedState;if(c!==null){var f=c.dehydrated;if(Ur(e),o)if(e.flags&256)e.flags&=-257,e=Zm(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(r(558));else if(Zt||ai(t,e,n,!1),o=(n&t.childLanes)!==0,Zt||o){if(s=Nt,s!==null&&(f=jd(s,n),f!==0&&f!==c.retryLane))throw c.retryLane=f,ba(t,f),Te(s,t,f),tc;Kl(),e=Zm(t,e,n)}else t=c.treeContext,Ut=Xe(f.nextSibling),le=e,bt=!0,Vn=null,Fe=!1,t!==null&&Of(e,t),e=Vl(e,s),e.flags|=4096;return e}return t=pn(t.child,{mode:s.mode,children:s.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Hl(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(r(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function ec(t,e,n,s,o){return wa(e),n=Lr(t,e,n,s,void 0,o),s=Or(),t!==null&&!Zt?(Vr(t,e,o),xn(t,e,o)):(bt&&s&&vr(e),e.flags|=1,re(t,e,n,o),e.child)}function _m(t,e,n,s,o,c){return wa(e),e.updateQueue=null,n=tm(e,s,n,o),$f(t),s=Or(),t!==null&&!Zt?(Vr(t,e,c),xn(t,e,c)):(bt&&s&&vr(e),e.flags|=1,re(t,e,n,c),e.child)}function Wm(t,e,n,s,o){if(wa(e),e.stateNode===null){var c=$a,f=n.contextType;typeof f=="object"&&f!==null&&(c=oe(f)),c=new n(s,c),e.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=Wr,e.stateNode=c,c._reactInternals=e,c=e.stateNode,c.props=s,c.state=e.memoizedState,c.refs={},kr(e),f=n.contextType,c.context=typeof f=="object"&&f!==null?oe(f):$a,c.state=e.memoizedState,f=n.getDerivedStateFromProps,typeof f=="function"&&(_r(e,n,f,s),c.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(f=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),f!==c.state&&Wr.enqueueReplaceState(c,c.state,null),is(e,s,c,o),as(),c.state=e.memoizedState),typeof c.componentDidMount=="function"&&(e.flags|=4194308),s=!0}else if(t===null){c=e.stateNode;var y=e.memoizedProps,A=Da(n,y);c.props=A;var E=c.context,R=n.contextType;f=$a,typeof R=="object"&&R!==null&&(f=oe(R));var L=n.getDerivedStateFromProps;R=typeof L=="function"||typeof c.getSnapshotBeforeUpdate=="function",y=e.pendingProps!==y,R||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(y||E!==f)&&Hm(e,c,s,f),Yn=!1;var k=e.memoizedState;c.state=k,is(e,s,c,o),as(),E=e.memoizedState,y||k!==E||Yn?(typeof L=="function"&&(_r(e,n,L,s),E=e.memoizedState),(A=Yn||Vm(e,n,A,s,k,E,f))?(R||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(e.flags|=4194308)):(typeof c.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=E),c.props=s,c.state=E,c.context=f,s=A):(typeof c.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{c=e.stateNode,Mr(t,e),f=e.memoizedProps,R=Da(n,f),c.props=R,L=e.pendingProps,k=c.context,E=n.contextType,A=$a,typeof E=="object"&&E!==null&&(A=oe(E)),y=n.getDerivedStateFromProps,(E=typeof y=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(f!==L||k!==A)&&Hm(e,c,s,A),Yn=!1,k=e.memoizedState,c.state=k,is(e,s,c,o),as();var B=e.memoizedState;f!==L||k!==B||Yn||t!==null&&t.dependencies!==null&&bl(t.dependencies)?(typeof y=="function"&&(_r(e,n,y,s),B=e.memoizedState),(R=Yn||Vm(e,n,R,s,k,B,A)||t!==null&&t.dependencies!==null&&bl(t.dependencies))?(E||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(s,B,A),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(s,B,A)),typeof c.componentDidUpdate=="function"&&(e.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof c.componentDidUpdate!="function"||f===t.memoizedProps&&k===t.memoizedState||(e.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||f===t.memoizedProps&&k===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=B),c.props=s,c.state=B,c.context=A,s=R):(typeof c.componentDidUpdate!="function"||f===t.memoizedProps&&k===t.memoizedState||(e.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||f===t.memoizedProps&&k===t.memoizedState||(e.flags|=1024),s=!1)}return c=s,Hl(t,e),s=(e.flags&128)!==0,c||s?(c=e.stateNode,n=s&&typeof n.getDerivedStateFromError!="function"?null:c.render(),e.flags|=1,t!==null&&s?(e.child=ka(e,t.child,null,o),e.child=ka(e,null,n,o)):re(t,e,n,o),e.memoizedState=c.state,t=e.child):t=xn(t,e,o),t}function $m(t,e,n,s){return xa(),e.flags|=256,re(t,e,n,s),e.child}var nc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ac(t){return{baseLanes:t,cachePool:Gf()}}function ic(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ze),t}function th(t,e,n){var s=e.pendingProps,o=!1,c=(e.flags&128)!==0,f;if((f=c)||(f=t!==null&&t.memoizedState===null?!1:(Jt.current&2)!==0),f&&(o=!0,e.flags&=-129),f=(e.flags&32)!==0,e.flags&=-33,t===null){if(bt){if(o?Qn(e):Fn(),(t=Ut)?(t=rp(t,Fe),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:On!==null?{id:ln,overflow:on}:null,retryLane:536870912,hydrationErrors:null},n=Uf(t),n.return=e,e.child=n,le=e,Ut=null)):t=null,t===null)throw Hn(e);return Yc(t)?e.lanes=32:e.lanes=536870912,null}var y=s.children;return s=s.fallback,o?(Fn(),o=e.mode,y=jl({mode:"hidden",children:y},o),s=Aa(s,o,n,null),y.return=e,s.return=e,y.sibling=s,e.child=y,s=e.child,s.memoizedState=ac(n),s.childLanes=ic(t,f,n),e.memoizedState=nc,cs(null,s)):(Qn(e),sc(e,y))}var A=t.memoizedState;if(A!==null&&(y=A.dehydrated,y!==null)){if(c)e.flags&256?(Qn(e),e.flags&=-257,e=lc(t,e,n)):e.memoizedState!==null?(Fn(),e.child=t.child,e.flags|=128,e=null):(Fn(),y=s.fallback,o=e.mode,s=jl({mode:"visible",children:s.children},o),y=Aa(y,o,n,null),y.flags|=2,s.return=e,y.return=e,s.sibling=y,e.child=s,ka(e,t.child,null,n),s=e.child,s.memoizedState=ac(n),s.childLanes=ic(t,f,n),e.memoizedState=nc,e=cs(null,s));else if(Qn(e),Yc(y)){if(f=y.nextSibling&&y.nextSibling.dataset,f)var E=f.dgst;f=E,s=Error(r(419)),s.stack="",s.digest=f,_i({value:s,source:null,stack:null}),e=lc(t,e,n)}else if(Zt||ai(t,e,n,!1),f=(n&t.childLanes)!==0,Zt||f){if(f=Nt,f!==null&&(s=jd(f,n),s!==0&&s!==A.retryLane))throw A.retryLane=s,ba(t,s),Te(f,t,s),tc;jc(y)||Kl(),e=lc(t,e,n)}else jc(y)?(e.flags|=192,e.child=t.child,e=null):(t=A.treeContext,Ut=Xe(y.nextSibling),le=e,bt=!0,Vn=null,Fe=!1,t!==null&&Of(e,t),e=sc(e,s.children),e.flags|=4096);return e}return o?(Fn(),y=s.fallback,o=e.mode,A=t.child,E=A.sibling,s=pn(A,{mode:"hidden",children:s.children}),s.subtreeFlags=A.subtreeFlags&65011712,E!==null?y=pn(E,y):(y=Aa(y,o,n,null),y.flags|=2),y.return=e,s.return=e,s.sibling=y,e.child=s,cs(null,s),s=e.child,y=t.child.memoizedState,y===null?y=ac(n):(o=y.cachePool,o!==null?(A=Kt._currentValue,o=o.parent!==A?{parent:A,pool:A}:o):o=Gf(),y={baseLanes:y.baseLanes|n,cachePool:o}),s.memoizedState=y,s.childLanes=ic(t,f,n),e.memoizedState=nc,cs(t.child,s)):(Qn(e),n=t.child,t=n.sibling,n=pn(n,{mode:"visible",children:s.children}),n.return=e,n.sibling=null,t!==null&&(f=e.deletions,f===null?(e.deletions=[t],e.flags|=16):f.push(t)),e.child=n,e.memoizedState=null,n)}function sc(t,e){return e=jl({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function jl(t,e){return t=Be(22,t,null,e),t.lanes=0,t}function lc(t,e,n){return ka(e,t.child,null,n),t=sc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function eh(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),xr(t.return,e,n)}function oc(t,e,n,s,o,c){var f=t.memoizedState;f===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:o,treeForkCount:c}:(f.isBackwards=e,f.rendering=null,f.renderingStartTime=0,f.last=s,f.tail=n,f.tailMode=o,f.treeForkCount=c)}function nh(t,e,n){var s=e.pendingProps,o=s.revealOrder,c=s.tail;s=s.children;var f=Jt.current,y=(f&2)!==0;if(y?(f=f&1|2,e.flags|=128):f&=1,F(Jt,f),re(t,e,s,n),s=bt?Zi:0,!y&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&eh(t,n,e);else if(t.tag===19)eh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(o){case"forwards":for(n=e.child,o=null;n!==null;)t=n.alternate,t!==null&&kl(t)===null&&(o=n),n=n.sibling;n=o,n===null?(o=e.child,e.child=null):(o=n.sibling,n.sibling=null),oc(e,!1,o,n,c,s);break;case"backwards":case"unstable_legacy-backwards":for(n=null,o=e.child,e.child=null;o!==null;){if(t=o.alternate,t!==null&&kl(t)===null){e.child=o;break}t=o.sibling,o.sibling=n,n=o,o=t}oc(e,!0,n,null,c,s);break;case"together":oc(e,!1,null,null,void 0,s);break;default:e.memoizedState=null}return e.child}function xn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Pn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(ai(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(r(153));if(e.child!==null){for(t=e.child,n=pn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=pn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function rc(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&bl(t)))}function Ib(t,e,n){switch(e.tag){case 3:he(e,e.stateNode.containerInfo),jn(e,Kt,t.memoizedState.cache),xa();break;case 27:case 5:Li(e);break;case 4:he(e,e.stateNode.containerInfo);break;case 10:jn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Ur(e),null;break;case 13:var s=e.memoizedState;if(s!==null)return s.dehydrated!==null?(Qn(e),e.flags|=128,null):(n&e.child.childLanes)!==0?th(t,e,n):(Qn(e),t=xn(t,e,n),t!==null?t.sibling:null);Qn(e);break;case 19:var o=(t.flags&128)!==0;if(s=(n&e.childLanes)!==0,s||(ai(t,e,n,!1),s=(n&e.childLanes)!==0),o){if(s)return nh(t,e,n);e.flags|=128}if(o=e.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),F(Jt,Jt.current),s)break;return null;case 22:return e.lanes=0,Km(t,e,n,e.pendingProps);case 24:jn(e,Kt,t.memoizedState.cache)}return xn(t,e,n)}function ah(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)Zt=!0;else{if(!rc(t,n)&&(e.flags&128)===0)return Zt=!1,Ib(t,e,n);Zt=(t.flags&131072)!==0}else Zt=!1,bt&&(e.flags&1048576)!==0&&Lf(e,Zi,e.index);switch(e.lanes=0,e.tag){case 16:t:{var s=e.pendingProps;if(t=Ca(e.elementType),e.type=t,typeof t=="function")mr(t)?(s=Da(t,s),e.tag=1,e=Wm(null,e,t,s,n)):(e.tag=0,e=ec(null,e,t,s,n));else{if(t!=null){var o=t.$$typeof;if(o===at){e.tag=11,e=Jm(null,e,t,s,n);break t}else if(o===$){e.tag=14,e=Xm(null,e,t,s,n);break t}}throw e=ge(t)||t,Error(r(306,e,""))}}return e;case 0:return ec(t,e,e.type,e.pendingProps,n);case 1:return s=e.type,o=Da(s,e.pendingProps),Wm(t,e,s,o,n);case 3:t:{if(he(e,e.stateNode.containerInfo),t===null)throw Error(r(387));s=e.pendingProps;var c=e.memoizedState;o=c.element,Mr(t,e),is(e,s,null,n);var f=e.memoizedState;if(s=f.cache,jn(e,Kt,s),s!==c.cache&&Sr(e,[Kt],n,!0),as(),s=f.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:f.cache},e.updateQueue.baseState=c,e.memoizedState=c,e.flags&256){e=$m(t,e,s,n);break t}else if(s!==o){o=qe(Error(r(424)),e),_i(o),e=$m(t,e,s,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Ut=Xe(t.firstChild),le=e,bt=!0,Vn=null,Fe=!0,n=Kf(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(xa(),s===o){e=xn(t,e,n);break t}re(t,e,s,n)}e=e.child}return e;case 26:return Hl(t,e),t===null?(n=hp(e.type,null,e.pendingProps,null))?e.memoizedState=n:bt||(n=e.type,t=e.pendingProps,s=eo(ft.current).createElement(n),s[se]=e,s[ye]=t,ce(s,n,t),ne(s),e.stateNode=s):e.memoizedState=hp(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Li(e),t===null&&bt&&(s=e.stateNode=dp(e.type,e.pendingProps,ft.current),le=e,Fe=!0,o=Ut,Wn(e.type)?(qc=o,Ut=Xe(s.firstChild)):Ut=o),re(t,e,e.pendingProps.children,n),Hl(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&bt&&((o=s=Ut)&&(s=C1(s,e.type,e.pendingProps,Fe),s!==null?(e.stateNode=s,le=e,Ut=Xe(s.firstChild),Fe=!1,o=!0):o=!1),o||Hn(e)),Li(e),o=e.type,c=e.pendingProps,f=t!==null?t.memoizedProps:null,s=c.children,Oc(o,c)?s=null:f!==null&&Oc(o,f)&&(e.flags|=32),e.memoizedState!==null&&(o=Lr(t,e,Yb,null,null,n),Ts._currentValue=o),Hl(t,e),re(t,e,s,n),e.child;case 6:return t===null&&bt&&((t=n=Ut)&&(n=E1(n,e.pendingProps,Fe),n!==null?(e.stateNode=n,le=e,Ut=null,t=!0):t=!1),t||Hn(e)),null;case 13:return th(t,e,n);case 4:return he(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=ka(e,null,s,n):re(t,e,s,n),e.child;case 11:return Jm(t,e,e.type,e.pendingProps,n);case 7:return re(t,e,e.pendingProps,n),e.child;case 8:return re(t,e,e.pendingProps.children,n),e.child;case 12:return re(t,e,e.pendingProps.children,n),e.child;case 10:return s=e.pendingProps,jn(e,e.type,s.value),re(t,e,s.children,n),e.child;case 9:return o=e.type._context,s=e.pendingProps.children,wa(e),o=oe(o),s=s(o),e.flags|=1,re(t,e,s,n),e.child;case 14:return Xm(t,e,e.type,e.pendingProps,n);case 15:return Pm(t,e,e.type,e.pendingProps,n);case 19:return nh(t,e,n);case 31:return Kb(t,e,n);case 22:return Km(t,e,n,e.pendingProps);case 24:return wa(e),s=oe(Kt),t===null?(o=Cr(),o===null&&(o=Nt,c=wr(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=n),o=c),e.memoizedState={parent:s,cache:o},kr(e),jn(e,Kt,o)):((t.lanes&n)!==0&&(Mr(t,e),is(e,null,null,n),as()),o=t.memoizedState,c=e.memoizedState,o.parent!==s?(o={parent:s,cache:s},e.memoizedState=o,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=o),jn(e,Kt,s)):(s=c.cache,jn(e,Kt,s),s!==o.cache&&Sr(e,[Kt],n,!0))),re(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(r(156,e.tag))}function Sn(t){t.flags|=4}function cc(t,e,n,s,o){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(o&335544128)===o)if(t.stateNode.complete)t.flags|=8192;else if(Bh())t.flags|=8192;else throw Ea=wl,Er}else t.flags&=-16777217}function ih(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!bp(e))if(Bh())t.flags|=8192;else throw Ea=wl,Er}function Yl(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Od():536870912,t.lanes|=e,pi|=e)}function us(t,e){if(!bt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var o=t.child;o!==null;)n|=o.lanes|o.childLanes,s|=o.subtreeFlags&65011712,s|=o.flags&65011712,o.return=t,o=o.sibling;else for(o=t.child;o!==null;)n|=o.lanes|o.childLanes,s|=o.subtreeFlags,s|=o.flags,o.return=t,o=o.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function Zb(t,e,n){var s=e.pendingProps;switch(gr(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zt(e),null;case 1:return zt(e),null;case 3:return n=e.stateNode,s=null,t!==null&&(s=t.memoizedState.cache),e.memoizedState.cache!==s&&(e.flags|=2048),yn(Kt),Ft(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ni(e)?Sn(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,br())),zt(e),null;case 26:var o=e.type,c=e.memoizedState;return t===null?(Sn(e),c!==null?(zt(e),ih(e,c)):(zt(e),cc(e,o,null,s,n))):c?c!==t.memoizedState?(Sn(e),zt(e),ih(e,c)):(zt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==s&&Sn(e),zt(e),cc(e,o,t,s,n)),null;case 27:if(_s(e),n=ft.current,o=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Sn(e);else{if(!s){if(e.stateNode===null)throw Error(r(166));return zt(e),null}t=Z.current,ni(e)?Vf(e):(t=dp(o,s,n),e.stateNode=t,Sn(e))}return zt(e),null;case 5:if(_s(e),o=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==s&&Sn(e);else{if(!s){if(e.stateNode===null)throw Error(r(166));return zt(e),null}if(c=Z.current,ni(e))Vf(e);else{var f=eo(ft.current);switch(c){case 1:c=f.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=f.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=f.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=f.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=f.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof s.is=="string"?f.createElement("select",{is:s.is}):f.createElement("select"),s.multiple?c.multiple=!0:s.size&&(c.size=s.size);break;default:c=typeof s.is=="string"?f.createElement(o,{is:s.is}):f.createElement(o)}}c[se]=e,c[ye]=s;t:for(f=e.child;f!==null;){if(f.tag===5||f.tag===6)c.appendChild(f.stateNode);else if(f.tag!==4&&f.tag!==27&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break t;for(;f.sibling===null;){if(f.return===null||f.return===e)break t;f=f.return}f.sibling.return=f.return,f=f.sibling}e.stateNode=c;t:switch(ce(c,o,s),o){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break t;case"img":s=!0;break t;default:s=!1}s&&Sn(e)}}return zt(e),cc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==s&&Sn(e);else{if(typeof s!="string"&&e.stateNode===null)throw Error(r(166));if(t=ft.current,ni(e)){if(t=e.stateNode,n=e.memoizedProps,s=null,o=le,o!==null)switch(o.tag){case 27:case 5:s=o.memoizedProps}t[se]=e,t=!!(t.nodeValue===n||s!==null&&s.suppressHydrationWarning===!0||tp(t.nodeValue,n)),t||Hn(e,!0)}else t=eo(t).createTextNode(s),t[se]=e,e.stateNode=t}return zt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(s=ni(e),n!==null){if(t===null){if(!s)throw Error(r(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[se]=e}else xa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),t=!1}else n=br(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(Ne(e),e):(Ne(e),null);if((e.flags&128)!==0)throw Error(r(558))}return zt(e),null;case 13:if(s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(o=ni(e),s!==null&&s.dehydrated!==null){if(t===null){if(!o)throw Error(r(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(r(317));o[se]=e}else xa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;zt(e),o=!1}else o=br(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=o),o=!0;if(!o)return e.flags&256?(Ne(e),e):(Ne(e),null)}return Ne(e),(e.flags&128)!==0?(e.lanes=n,e):(n=s!==null,t=t!==null&&t.memoizedState!==null,n&&(s=e.child,o=null,s.alternate!==null&&s.alternate.memoizedState!==null&&s.alternate.memoizedState.cachePool!==null&&(o=s.alternate.memoizedState.cachePool.pool),c=null,s.memoizedState!==null&&s.memoizedState.cachePool!==null&&(c=s.memoizedState.cachePool.pool),c!==o&&(s.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),Yl(e,e.updateQueue),zt(e),null);case 4:return Ft(),t===null&&Rc(e.stateNode.containerInfo),zt(e),null;case 10:return yn(e.type),zt(e),null;case 19:if(O(Jt),s=e.memoizedState,s===null)return zt(e),null;if(o=(e.flags&128)!==0,c=s.rendering,c===null)if(o)us(s,!1);else{if(qt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(c=kl(t),c!==null){for(e.flags|=128,us(s,!1),t=c.updateQueue,e.updateQueue=t,Yl(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)Nf(n,t),n=n.sibling;return F(Jt,Jt.current&1|2),bt&&vn(e,s.treeForkCount),e.child}t=t.sibling}s.tail!==null&&Ee()>Jl&&(e.flags|=128,o=!0,us(s,!1),e.lanes=4194304)}else{if(!o)if(t=kl(c),t!==null){if(e.flags|=128,o=!0,t=t.updateQueue,e.updateQueue=t,Yl(e,t),us(s,!0),s.tail===null&&s.tailMode==="hidden"&&!c.alternate&&!bt)return zt(e),null}else 2*Ee()-s.renderingStartTime>Jl&&n!==536870912&&(e.flags|=128,o=!0,us(s,!1),e.lanes=4194304);s.isBackwards?(c.sibling=e.child,e.child=c):(t=s.last,t!==null?t.sibling=c:e.child=c,s.last=c)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ee(),t.sibling=null,n=Jt.current,F(Jt,o?n&1|2:n&1),bt&&vn(e,s.treeForkCount),t):(zt(e),null);case 22:case 23:return Ne(e),Nr(),s=e.memoizedState!==null,t!==null?t.memoizedState!==null!==s&&(e.flags|=8192):s&&(e.flags|=8192),s?(n&536870912)!==0&&(e.flags&128)===0&&(zt(e),e.subtreeFlags&6&&(e.flags|=8192)):zt(e),n=e.updateQueue,n!==null&&Yl(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),s=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),s!==n&&(e.flags|=2048),t!==null&&O(Ta),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),yn(Kt),zt(e),null;case 25:return null;case 30:return null}throw Error(r(156,e.tag))}function _b(t,e){switch(gr(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return yn(Kt),Ft(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return _s(e),null;case 31:if(e.memoizedState!==null){if(Ne(e),e.alternate===null)throw Error(r(340));xa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Ne(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(r(340));xa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return O(Jt),null;case 4:return Ft(),null;case 10:return yn(e.type),null;case 22:case 23:return Ne(e),Nr(),t!==null&&O(Ta),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return yn(Kt),null;case 25:return null;default:return null}}function sh(t,e){switch(gr(e),e.tag){case 3:yn(Kt),Ft();break;case 26:case 27:case 5:_s(e);break;case 4:Ft();break;case 31:e.memoizedState!==null&&Ne(e);break;case 13:Ne(e);break;case 19:O(Jt);break;case 10:yn(e.type);break;case 22:case 23:Ne(e),Nr(),t!==null&&O(Ta);break;case 24:yn(Kt)}}function ds(t,e){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var o=s.next;n=o;do{if((n.tag&t)===t){s=void 0;var c=n.create,f=n.inst;s=c(),f.destroy=s}n=n.next}while(n!==o)}}catch(y){Mt(e,e.return,y)}}function Jn(t,e,n){try{var s=e.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var c=o.next;s=c;do{if((s.tag&t)===t){var f=s.inst,y=f.destroy;if(y!==void 0){f.destroy=void 0,o=e;var A=n,E=y;try{E()}catch(R){Mt(o,A,R)}}}s=s.next}while(s!==c)}}catch(R){Mt(e,e.return,R)}}function lh(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Zf(e,n)}catch(s){Mt(t,t.return,s)}}}function oh(t,e,n){n.props=Da(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(s){Mt(t,e,s)}}function fs(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var s=t.stateNode;break;case 30:s=t.stateNode;break;default:s=t.stateNode}typeof n=="function"?t.refCleanup=n(s):n.current=s}}catch(o){Mt(t,e,o)}}function rn(t,e){var n=t.ref,s=t.refCleanup;if(n!==null)if(typeof s=="function")try{s()}catch(o){Mt(t,e,o)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(o){Mt(t,e,o)}else n.current=null}function rh(t){var e=t.type,n=t.memoizedProps,s=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&s.focus();break t;case"img":n.src?s.src=n.src:n.srcSet&&(s.srcset=n.srcSet)}}catch(o){Mt(t,t.return,o)}}function uc(t,e,n){try{var s=t.stateNode;b1(s,t.type,n,e),s[ye]=e}catch(o){Mt(t,t.return,o)}}function ch(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Wn(t.type)||t.tag===4}function dc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||ch(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function fc(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=mn));else if(s!==4&&(s===27&&Wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(fc(t,e,n),t=t.sibling;t!==null;)fc(t,e,n),t=t.sibling}function ql(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(s===27&&Wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(ql(t,e,n),t=t.sibling;t!==null;)ql(t,e,n),t=t.sibling}function uh(t){var e=t.stateNode,n=t.memoizedProps;try{for(var s=t.type,o=e.attributes;o.length;)e.removeAttributeNode(o[0]);ce(e,s,n),e[se]=t,e[ye]=n}catch(c){Mt(t,t.return,c)}}var wn=!1,_t=!1,mc=!1,dh=typeof WeakSet=="function"?WeakSet:Set,ae=null;function Wb(t,e){if(t=t.containerInfo,zc=ro,t=wf(t),lr(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var o=s.anchorOffset,c=s.focusNode;s=s.focusOffset;try{n.nodeType,c.nodeType}catch{n=null;break t}var f=0,y=-1,A=-1,E=0,R=0,L=t,k=null;e:for(;;){for(var B;L!==n||o!==0&&L.nodeType!==3||(y=f+o),L!==c||s!==0&&L.nodeType!==3||(A=f+s),L.nodeType===3&&(f+=L.nodeValue.length),(B=L.firstChild)!==null;)k=L,L=B;for(;;){if(L===t)break e;if(k===n&&++E===o&&(y=f),k===c&&++R===s&&(A=f),(B=L.nextSibling)!==null)break;L=k,k=L.parentNode}L=B}n=y===-1||A===-1?null:{start:y,end:A}}else n=null}n=n||{start:0,end:0}}else n=null;for(Lc={focusedElem:t,selectionRange:n},ro=!1,ae=e;ae!==null;)if(e=ae,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ae=t;else for(;ae!==null;){switch(e=ae,c=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)o=t[n],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&c!==null){t=void 0,n=e,o=c.memoizedProps,c=c.memoizedState,s=n.stateNode;try{var K=Da(n.type,o);t=s.getSnapshotBeforeUpdate(K,c),s.__reactInternalSnapshotBeforeUpdate=t}catch(nt){Mt(n,n.return,nt)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Hc(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Hc(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=e.sibling,t!==null){t.return=e.return,ae=t;break}ae=e.return}}function fh(t,e,n){var s=n.flags;switch(n.tag){case 0:case 11:case 15:Cn(t,n),s&4&&ds(5,n);break;case 1:if(Cn(t,n),s&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(f){Mt(n,n.return,f)}else{var o=Da(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(o,e,t.__reactInternalSnapshotBeforeUpdate)}catch(f){Mt(n,n.return,f)}}s&64&&lh(n),s&512&&fs(n,n.return);break;case 3:if(Cn(t,n),s&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Zf(t,e)}catch(f){Mt(n,n.return,f)}}break;case 27:e===null&&s&4&&uh(n);case 26:case 5:Cn(t,n),e===null&&s&4&&rh(n),s&512&&fs(n,n.return);break;case 12:Cn(t,n);break;case 31:Cn(t,n),s&4&&ph(t,n);break;case 13:Cn(t,n),s&4&&vh(t,n),s&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=o1.bind(null,n),k1(t,n))));break;case 22:if(s=n.memoizedState!==null||wn,!s){e=e!==null&&e.memoizedState!==null||_t,o=wn;var c=_t;wn=s,(_t=e)&&!c?En(t,n,(n.subtreeFlags&8772)!==0):Cn(t,n),wn=o,_t=c}break;case 30:break;default:Cn(t,n)}}function mh(t){var e=t.alternate;e!==null&&(t.alternate=null,mh(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Qo(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Ot=null,Ae=!1;function Tn(t,e,n){for(n=n.child;n!==null;)hh(t,e,n),n=n.sibling}function hh(t,e,n){if(ke&&typeof ke.onCommitFiberUnmount=="function")try{ke.onCommitFiberUnmount(Oi,n)}catch{}switch(n.tag){case 26:_t||rn(n,e),Tn(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:_t||rn(n,e);var s=Ot,o=Ae;Wn(n.type)&&(Ot=n.stateNode,Ae=!1),Tn(t,e,n),xs(n.stateNode),Ot=s,Ae=o;break;case 5:_t||rn(n,e);case 6:if(s=Ot,o=Ae,Ot=null,Tn(t,e,n),Ot=s,Ae=o,Ot!==null)if(Ae)try{(Ot.nodeType===9?Ot.body:Ot.nodeName==="HTML"?Ot.ownerDocument.body:Ot).removeChild(n.stateNode)}catch(c){Mt(n,e,c)}else try{Ot.removeChild(n.stateNode)}catch(c){Mt(n,e,c)}break;case 18:Ot!==null&&(Ae?(t=Ot,lp(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),wi(t)):lp(Ot,n.stateNode));break;case 4:s=Ot,o=Ae,Ot=n.stateNode.containerInfo,Ae=!0,Tn(t,e,n),Ot=s,Ae=o;break;case 0:case 11:case 14:case 15:Jn(2,n,e),_t||Jn(4,n,e),Tn(t,e,n);break;case 1:_t||(rn(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"&&oh(n,e,s)),Tn(t,e,n);break;case 21:Tn(t,e,n);break;case 22:_t=(s=_t)||n.memoizedState!==null,Tn(t,e,n),_t=s;break;default:Tn(t,e,n)}}function ph(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{wi(t)}catch(n){Mt(e,e.return,n)}}}function vh(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{wi(t)}catch(n){Mt(e,e.return,n)}}function $b(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new dh),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new dh),e;default:throw Error(r(435,t.tag))}}function Gl(t,e){var n=$b(t);e.forEach(function(s){if(!n.has(s)){n.add(s);var o=r1.bind(null,t,s);s.then(o,o)}})}function xe(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var o=n[s],c=t,f=e,y=f;t:for(;y!==null;){switch(y.tag){case 27:if(Wn(y.type)){Ot=y.stateNode,Ae=!1;break t}break;case 5:Ot=y.stateNode,Ae=!1;break t;case 3:case 4:Ot=y.stateNode.containerInfo,Ae=!0;break t}y=y.return}if(Ot===null)throw Error(r(160));hh(c,f,o),Ot=null,Ae=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)gh(e,t),e=e.sibling}var tn=null;function gh(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:xe(e,t),Se(t),s&4&&(Jn(3,t,t.return),ds(3,t),Jn(5,t,t.return));break;case 1:xe(e,t),Se(t),s&512&&(_t||n===null||rn(n,n.return)),s&64&&wn&&(t=t.updateQueue,t!==null&&(s=t.callbacks,s!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?s:n.concat(s))));break;case 26:var o=tn;if(xe(e,t),Se(t),s&512&&(_t||n===null||rn(n,n.return)),s&4){var c=n!==null?n.memoizedState:null;if(s=t.memoizedState,n===null)if(s===null)if(t.stateNode===null){t:{s=t.type,n=t.memoizedProps,o=o.ownerDocument||o;e:switch(s){case"title":c=o.getElementsByTagName("title")[0],(!c||c[ji]||c[se]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(s),o.head.insertBefore(c,o.querySelector("head > title"))),ce(c,s,n),c[se]=t,ne(c),s=c;break t;case"link":var f=gp("link","href",o).get(s+(n.href||""));if(f){for(var y=0;y<f.length;y++)if(c=f[y],c.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&c.getAttribute("rel")===(n.rel==null?null:n.rel)&&c.getAttribute("title")===(n.title==null?null:n.title)&&c.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){f.splice(y,1);break e}}c=o.createElement(s),ce(c,s,n),o.head.appendChild(c);break;case"meta":if(f=gp("meta","content",o).get(s+(n.content||""))){for(y=0;y<f.length;y++)if(c=f[y],c.getAttribute("content")===(n.content==null?null:""+n.content)&&c.getAttribute("name")===(n.name==null?null:n.name)&&c.getAttribute("property")===(n.property==null?null:n.property)&&c.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&c.getAttribute("charset")===(n.charSet==null?null:n.charSet)){f.splice(y,1);break e}}c=o.createElement(s),ce(c,s,n),o.head.appendChild(c);break;default:throw Error(r(468,s))}c[se]=t,ne(c),s=c}t.stateNode=s}else yp(o,t.type,t.stateNode);else t.stateNode=vp(o,s,t.memoizedProps);else c!==s?(c===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):c.count--,s===null?yp(o,t.type,t.stateNode):vp(o,s,t.memoizedProps)):s===null&&t.stateNode!==null&&uc(t,t.memoizedProps,n.memoizedProps)}break;case 27:xe(e,t),Se(t),s&512&&(_t||n===null||rn(n,n.return)),n!==null&&s&4&&uc(t,t.memoizedProps,n.memoizedProps);break;case 5:if(xe(e,t),Se(t),s&512&&(_t||n===null||rn(n,n.return)),t.flags&32){o=t.stateNode;try{Xa(o,"")}catch(K){Mt(t,t.return,K)}}s&4&&t.stateNode!=null&&(o=t.memoizedProps,uc(t,o,n!==null?n.memoizedProps:o)),s&1024&&(mc=!0);break;case 6:if(xe(e,t),Se(t),s&4){if(t.stateNode===null)throw Error(r(162));s=t.memoizedProps,n=t.stateNode;try{n.nodeValue=s}catch(K){Mt(t,t.return,K)}}break;case 3:if(io=null,o=tn,tn=no(e.containerInfo),xe(e,t),tn=o,Se(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{wi(e.containerInfo)}catch(K){Mt(t,t.return,K)}mc&&(mc=!1,yh(t));break;case 4:s=tn,tn=no(t.stateNode.containerInfo),xe(e,t),Se(t),tn=s;break;case 12:xe(e,t),Se(t);break;case 31:xe(e,t),Se(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Gl(t,s)));break;case 13:xe(e,t),Se(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Fl=Ee()),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Gl(t,s)));break;case 22:o=t.memoizedState!==null;var A=n!==null&&n.memoizedState!==null,E=wn,R=_t;if(wn=E||o,_t=R||A,xe(e,t),_t=R,wn=E,Se(t),s&8192)t:for(e=t.stateNode,e._visibility=o?e._visibility&-2:e._visibility|1,o&&(n===null||A||wn||_t||Ba(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){A=n=e;try{if(c=A.stateNode,o)f=c.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none";else{y=A.stateNode;var L=A.memoizedProps.style,k=L!=null&&L.hasOwnProperty("display")?L.display:null;y.style.display=k==null||typeof k=="boolean"?"":(""+k).trim()}}catch(K){Mt(A,A.return,K)}}}else if(e.tag===6){if(n===null){A=e;try{A.stateNode.nodeValue=o?"":A.memoizedProps}catch(K){Mt(A,A.return,K)}}}else if(e.tag===18){if(n===null){A=e;try{var B=A.stateNode;o?op(B,!0):op(A.stateNode,!1)}catch(K){Mt(A,A.return,K)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}s&4&&(s=t.updateQueue,s!==null&&(n=s.retryQueue,n!==null&&(s.retryQueue=null,Gl(t,n))));break;case 19:xe(e,t),Se(t),s&4&&(s=t.updateQueue,s!==null&&(t.updateQueue=null,Gl(t,s)));break;case 30:break;case 21:break;default:xe(e,t),Se(t)}}function Se(t){var e=t.flags;if(e&2){try{for(var n,s=t.return;s!==null;){if(ch(s)){n=s;break}s=s.return}if(n==null)throw Error(r(160));switch(n.tag){case 27:var o=n.stateNode,c=dc(t);ql(t,c,o);break;case 5:var f=n.stateNode;n.flags&32&&(Xa(f,""),n.flags&=-33);var y=dc(t);ql(t,y,f);break;case 3:case 4:var A=n.stateNode.containerInfo,E=dc(t);fc(t,E,A);break;default:throw Error(r(161))}}catch(R){Mt(t,t.return,R)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function yh(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;yh(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Cn(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)fh(t,e.alternate,e),e=e.sibling}function Ba(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Jn(4,e,e.return),Ba(e);break;case 1:rn(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&oh(e,e.return,n),Ba(e);break;case 27:xs(e.stateNode);case 26:case 5:rn(e,e.return),Ba(e);break;case 22:e.memoizedState===null&&Ba(e);break;case 30:Ba(e);break;default:Ba(e)}t=t.sibling}}function En(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var s=e.alternate,o=t,c=e,f=c.flags;switch(c.tag){case 0:case 11:case 15:En(o,c,n),ds(4,c);break;case 1:if(En(o,c,n),s=c,o=s.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(E){Mt(s,s.return,E)}if(s=c,o=s.updateQueue,o!==null){var y=s.stateNode;try{var A=o.shared.hiddenCallbacks;if(A!==null)for(o.shared.hiddenCallbacks=null,o=0;o<A.length;o++)If(A[o],y)}catch(E){Mt(s,s.return,E)}}n&&f&64&&lh(c),fs(c,c.return);break;case 27:uh(c);case 26:case 5:En(o,c,n),n&&s===null&&f&4&&rh(c),fs(c,c.return);break;case 12:En(o,c,n);break;case 31:En(o,c,n),n&&f&4&&ph(o,c);break;case 13:En(o,c,n),n&&f&4&&vh(o,c);break;case 22:c.memoizedState===null&&En(o,c,n),fs(c,c.return);break;case 30:break;default:En(o,c,n)}e=e.sibling}}function hc(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Wi(n))}function pc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Wi(t))}function en(t,e,n,s){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)bh(t,e,n,s),e=e.sibling}function bh(t,e,n,s){var o=e.flags;switch(e.tag){case 0:case 11:case 15:en(t,e,n,s),o&2048&&ds(9,e);break;case 1:en(t,e,n,s);break;case 3:en(t,e,n,s),o&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Wi(t)));break;case 12:if(o&2048){en(t,e,n,s),t=e.stateNode;try{var c=e.memoizedProps,f=c.id,y=c.onPostCommit;typeof y=="function"&&y(f,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(A){Mt(e,e.return,A)}}else en(t,e,n,s);break;case 31:en(t,e,n,s);break;case 13:en(t,e,n,s);break;case 23:break;case 22:c=e.stateNode,f=e.alternate,e.memoizedState!==null?c._visibility&2?en(t,e,n,s):ms(t,e):c._visibility&2?en(t,e,n,s):(c._visibility|=2,fi(t,e,n,s,(e.subtreeFlags&10256)!==0||!1)),o&2048&&hc(f,e);break;case 24:en(t,e,n,s),o&2048&&pc(e.alternate,e);break;default:en(t,e,n,s)}}function fi(t,e,n,s,o){for(o=o&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var c=t,f=e,y=n,A=s,E=f.flags;switch(f.tag){case 0:case 11:case 15:fi(c,f,y,A,o),ds(8,f);break;case 23:break;case 22:var R=f.stateNode;f.memoizedState!==null?R._visibility&2?fi(c,f,y,A,o):ms(c,f):(R._visibility|=2,fi(c,f,y,A,o)),o&&E&2048&&hc(f.alternate,f);break;case 24:fi(c,f,y,A,o),o&&E&2048&&pc(f.alternate,f);break;default:fi(c,f,y,A,o)}e=e.sibling}}function ms(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,s=e,o=s.flags;switch(s.tag){case 22:ms(n,s),o&2048&&hc(s.alternate,s);break;case 24:ms(n,s),o&2048&&pc(s.alternate,s);break;default:ms(n,s)}e=e.sibling}}var hs=8192;function mi(t,e,n){if(t.subtreeFlags&hs)for(t=t.child;t!==null;)Ah(t,e,n),t=t.sibling}function Ah(t,e,n){switch(t.tag){case 26:mi(t,e,n),t.flags&hs&&t.memoizedState!==null&&j1(n,tn,t.memoizedState,t.memoizedProps);break;case 5:mi(t,e,n);break;case 3:case 4:var s=tn;tn=no(t.stateNode.containerInfo),mi(t,e,n),tn=s;break;case 22:t.memoizedState===null&&(s=t.alternate,s!==null&&s.memoizedState!==null?(s=hs,hs=16777216,mi(t,e,n),hs=s):mi(t,e,n));break;default:mi(t,e,n)}}function xh(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function ps(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];ae=s,wh(s,t)}xh(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Sh(t),t=t.sibling}function Sh(t){switch(t.tag){case 0:case 11:case 15:ps(t),t.flags&2048&&Jn(9,t,t.return);break;case 3:ps(t);break;case 12:ps(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ql(t)):ps(t);break;default:ps(t)}}function Ql(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var s=e[n];ae=s,wh(s,t)}xh(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Jn(8,e,e.return),Ql(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ql(e));break;default:Ql(e)}t=t.sibling}}function wh(t,e){for(;ae!==null;){var n=ae;switch(n.tag){case 0:case 11:case 15:Jn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var s=n.memoizedState.cachePool.pool;s!=null&&s.refCount++}break;case 24:Wi(n.memoizedState.cache)}if(s=n.child,s!==null)s.return=n,ae=s;else t:for(n=t;ae!==null;){s=ae;var o=s.sibling,c=s.return;if(mh(s),s===n){ae=null;break t}if(o!==null){o.return=c,ae=o;break t}ae=c}}}var t1={getCacheForType:function(t){var e=oe(Kt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return oe(Kt).controller.signal}},e1=typeof WeakMap=="function"?WeakMap:Map,wt=0,Nt=null,mt=null,gt=0,kt=0,Ue=null,Xn=!1,hi=!1,vc=!1,kn=0,qt=0,Pn=0,Ra=0,gc=0,ze=0,pi=0,vs=null,we=null,yc=!1,Fl=0,Th=0,Jl=1/0,Xl=null,Kn=null,ee=0,In=null,vi=null,Mn=0,bc=0,Ac=null,Ch=null,gs=0,xc=null;function Le(){return(wt&2)!==0&&gt!==0?gt&-gt:N.T!==null?kc():Yd()}function Eh(){if(ze===0)if((gt&536870912)===0||bt){var t=tl;tl<<=1,(tl&3932160)===0&&(tl=262144),ze=t}else ze=536870912;return t=Re.current,t!==null&&(t.flags|=32),ze}function Te(t,e,n){(t===Nt&&(kt===2||kt===9)||t.cancelPendingCommit!==null)&&(gi(t,0),Zn(t,gt,ze,!1)),Hi(t,n),((wt&2)===0||t!==Nt)&&(t===Nt&&((wt&2)===0&&(Ra|=n),qt===4&&Zn(t,gt,ze,!1)),cn(t))}function kh(t,e,n){if((wt&6)!==0)throw Error(r(327));var s=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Vi(t,e),o=s?i1(t,e):wc(t,e,!0),c=s;do{if(o===0){hi&&!s&&Zn(t,e,0,!1);break}else{if(n=t.current.alternate,c&&!n1(n)){o=wc(t,e,!1),c=!1;continue}if(o===2){if(c=e,t.errorRecoveryDisabledLanes&c)var f=0;else f=t.pendingLanes&-536870913,f=f!==0?f:f&536870912?536870912:0;if(f!==0){e=f;t:{var y=t;o=vs;var A=y.current.memoizedState.isDehydrated;if(A&&(gi(y,f).flags|=256),f=wc(y,f,!1),f!==2){if(vc&&!A){y.errorRecoveryDisabledLanes|=c,Ra|=c,o=4;break t}c=we,we=o,c!==null&&(we===null?we=c:we.push.apply(we,c))}o=f}if(c=!1,o!==2)continue}}if(o===1){gi(t,0),Zn(t,e,0,!0);break}t:{switch(s=t,c=o,c){case 0:case 1:throw Error(r(345));case 4:if((e&4194048)!==e)break;case 6:Zn(s,e,ze,!Xn);break t;case 2:we=null;break;case 3:case 5:break;default:throw Error(r(329))}if((e&62914560)===e&&(o=Fl+300-Ee(),10<o)){if(Zn(s,e,ze,!Xn),nl(s,0,!0)!==0)break t;Mn=e,s.timeoutHandle=ip(Mh.bind(null,s,n,we,Xl,yc,e,ze,Ra,pi,Xn,c,"Throttled",-0,0),o);break t}Mh(s,n,we,Xl,yc,e,ze,Ra,pi,Xn,c,null,-0,0)}}break}while(!0);cn(t)}function Mh(t,e,n,s,o,c,f,y,A,E,R,L,k,B){if(t.timeoutHandle=-1,L=e.subtreeFlags,L&8192||(L&16785408)===16785408){L={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:mn},Ah(e,c,L);var K=(c&62914560)===c?Fl-Ee():(c&4194048)===c?Th-Ee():0;if(K=Y1(L,K),K!==null){Mn=c,t.cancelPendingCommit=K(Oh.bind(null,t,e,c,n,s,o,f,y,A,R,L,null,k,B)),Zn(t,c,f,!E);return}}Oh(t,e,c,n,s,o,f,y,A)}function n1(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var s=0;s<n.length;s++){var o=n[s],c=o.getSnapshot;o=o.value;try{if(!De(c(),o))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Zn(t,e,n,s){e&=~gc,e&=~Ra,t.suspendedLanes|=e,t.pingedLanes&=~e,s&&(t.warmLanes|=e),s=t.expirationTimes;for(var o=e;0<o;){var c=31-Me(o),f=1<<c;s[c]=-1,o&=~f}n!==0&&Vd(t,n,e)}function Pl(){return(wt&6)===0?(ys(0),!1):!0}function Sc(){if(mt!==null){if(kt===0)var t=mt.return;else t=mt,gn=Sa=null,Hr(t),oi=null,ts=0,t=mt;for(;t!==null;)sh(t.alternate,t),t=t.return;mt=null}}function gi(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,S1(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Mn=0,Sc(),Nt=t,mt=n=pn(t.current,null),gt=e,kt=0,Ue=null,Xn=!1,hi=Vi(t,e),vc=!1,pi=ze=gc=Ra=Pn=qt=0,we=vs=null,yc=!1,(e&8)!==0&&(e|=e&32);var s=t.entangledLanes;if(s!==0)for(t=t.entanglements,s&=e;0<s;){var o=31-Me(s),c=1<<o;e|=t[o],s&=~c}return kn=e,hl(),n}function Dh(t,e){rt=null,N.H=rs,e===li||e===Sl?(e=Jf(),kt=3):e===Er?(e=Jf(),kt=4):kt=e===tc?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ue=e,mt===null&&(qt=1,Ol(t,qe(e,t.current)))}function Bh(){var t=Re.current;return t===null?!0:(gt&4194048)===gt?Je===null:(gt&62914560)===gt||(gt&536870912)!==0?t===Je:!1}function Rh(){var t=N.H;return N.H=rs,t===null?rs:t}function Nh(){var t=N.A;return N.A=t1,t}function Kl(){qt=4,Xn||(gt&4194048)!==gt&&Re.current!==null||(hi=!0),(Pn&134217727)===0&&(Ra&134217727)===0||Nt===null||Zn(Nt,gt,ze,!1)}function wc(t,e,n){var s=wt;wt|=2;var o=Rh(),c=Nh();(Nt!==t||gt!==e)&&(Xl=null,gi(t,e)),e=!1;var f=qt;t:do try{if(kt!==0&&mt!==null){var y=mt,A=Ue;switch(kt){case 8:Sc(),f=6;break t;case 3:case 2:case 9:case 6:Re.current===null&&(e=!0);var E=kt;if(kt=0,Ue=null,yi(t,y,A,E),n&&hi){f=0;break t}break;default:E=kt,kt=0,Ue=null,yi(t,y,A,E)}}a1(),f=qt;break}catch(R){Dh(t,R)}while(!0);return e&&t.shellSuspendCounter++,gn=Sa=null,wt=s,N.H=o,N.A=c,mt===null&&(Nt=null,gt=0,hl()),f}function a1(){for(;mt!==null;)Uh(mt)}function i1(t,e){var n=wt;wt|=2;var s=Rh(),o=Nh();Nt!==t||gt!==e?(Xl=null,Jl=Ee()+500,gi(t,e)):hi=Vi(t,e);t:do try{if(kt!==0&&mt!==null){e=mt;var c=Ue;e:switch(kt){case 1:kt=0,Ue=null,yi(t,e,c,1);break;case 2:case 9:if(Qf(c)){kt=0,Ue=null,zh(e);break}e=function(){kt!==2&&kt!==9||Nt!==t||(kt=7),cn(t)},c.then(e,e);break t;case 3:kt=7;break t;case 4:kt=5;break t;case 7:Qf(c)?(kt=0,Ue=null,zh(e)):(kt=0,Ue=null,yi(t,e,c,7));break;case 5:var f=null;switch(mt.tag){case 26:f=mt.memoizedState;case 5:case 27:var y=mt;if(f?bp(f):y.stateNode.complete){kt=0,Ue=null;var A=y.sibling;if(A!==null)mt=A;else{var E=y.return;E!==null?(mt=E,Il(E)):mt=null}break e}}kt=0,Ue=null,yi(t,e,c,5);break;case 6:kt=0,Ue=null,yi(t,e,c,6);break;case 8:Sc(),qt=6;break t;default:throw Error(r(462))}}s1();break}catch(R){Dh(t,R)}while(!0);return gn=Sa=null,N.H=s,N.A=o,wt=n,mt!==null?0:(Nt=null,gt=0,hl(),qt)}function s1(){for(;mt!==null&&!My();)Uh(mt)}function Uh(t){var e=ah(t.alternate,t,kn);t.memoizedProps=t.pendingProps,e===null?Il(t):mt=e}function zh(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=_m(n,e,e.pendingProps,e.type,void 0,gt);break;case 11:e=_m(n,e,e.pendingProps,e.type.render,e.ref,gt);break;case 5:Hr(e);default:sh(n,e),e=mt=Nf(e,kn),e=ah(n,e,kn)}t.memoizedProps=t.pendingProps,e===null?Il(t):mt=e}function yi(t,e,n,s){gn=Sa=null,Hr(e),oi=null,ts=0;var o=e.return;try{if(Pb(t,o,e,n,gt)){qt=1,Ol(t,qe(n,t.current)),mt=null;return}}catch(c){if(o!==null)throw mt=o,c;qt=1,Ol(t,qe(n,t.current)),mt=null;return}e.flags&32768?(bt||s===1?t=!0:hi||(gt&536870912)!==0?t=!1:(Xn=t=!0,(s===2||s===9||s===3||s===6)&&(s=Re.current,s!==null&&s.tag===13&&(s.flags|=16384))),Lh(e,t)):Il(e)}function Il(t){var e=t;do{if((e.flags&32768)!==0){Lh(e,Xn);return}t=e.return;var n=Zb(e.alternate,e,kn);if(n!==null){mt=n;return}if(e=e.sibling,e!==null){mt=e;return}mt=e=t}while(e!==null);qt===0&&(qt=5)}function Lh(t,e){do{var n=_b(t.alternate,t);if(n!==null){n.flags&=32767,mt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){mt=t;return}mt=t=n}while(t!==null);qt=6,mt=null}function Oh(t,e,n,s,o,c,f,y,A){t.cancelPendingCommit=null;do Zl();while(ee!==0);if((wt&6)!==0)throw Error(r(327));if(e!==null){if(e===t.current)throw Error(r(177));if(c=e.lanes|e.childLanes,c|=dr,Hy(t,n,c,f,y,A),t===Nt&&(mt=Nt=null,gt=0),vi=e,In=t,Mn=n,bc=c,Ac=o,Ch=s,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,c1(Ws,function(){return qh(),null})):(t.callbackNode=null,t.callbackPriority=0),s=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||s){s=N.T,N.T=null,o=H.p,H.p=2,f=wt,wt|=4;try{Wb(t,e,n)}finally{wt=f,H.p=o,N.T=s}}ee=1,Vh(),Hh(),jh()}}function Vh(){if(ee===1){ee=0;var t=In,e=vi,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=N.T,N.T=null;var s=H.p;H.p=2;var o=wt;wt|=4;try{gh(e,t);var c=Lc,f=wf(t.containerInfo),y=c.focusedElem,A=c.selectionRange;if(f!==y&&y&&y.ownerDocument&&Sf(y.ownerDocument.documentElement,y)){if(A!==null&&lr(y)){var E=A.start,R=A.end;if(R===void 0&&(R=E),"selectionStart"in y)y.selectionStart=E,y.selectionEnd=Math.min(R,y.value.length);else{var L=y.ownerDocument||document,k=L&&L.defaultView||window;if(k.getSelection){var B=k.getSelection(),K=y.textContent.length,nt=Math.min(A.start,K),Rt=A.end===void 0?nt:Math.min(A.end,K);!B.extend&&nt>Rt&&(f=Rt,Rt=nt,nt=f);var T=xf(y,nt),S=xf(y,Rt);if(T&&S&&(B.rangeCount!==1||B.anchorNode!==T.node||B.anchorOffset!==T.offset||B.focusNode!==S.node||B.focusOffset!==S.offset)){var C=L.createRange();C.setStart(T.node,T.offset),B.removeAllRanges(),nt>Rt?(B.addRange(C),B.extend(S.node,S.offset)):(C.setEnd(S.node,S.offset),B.addRange(C))}}}}for(L=[],B=y;B=B.parentNode;)B.nodeType===1&&L.push({element:B,left:B.scrollLeft,top:B.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<L.length;y++){var U=L[y];U.element.scrollLeft=U.left,U.element.scrollTop=U.top}}ro=!!zc,Lc=zc=null}finally{wt=o,H.p=s,N.T=n}}t.current=e,ee=2}}function Hh(){if(ee===2){ee=0;var t=In,e=vi,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=N.T,N.T=null;var s=H.p;H.p=2;var o=wt;wt|=4;try{fh(t,e.alternate,e)}finally{wt=o,H.p=s,N.T=n}}ee=3}}function jh(){if(ee===4||ee===3){ee=0,Dy();var t=In,e=vi,n=Mn,s=Ch;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?ee=5:(ee=0,vi=In=null,Yh(t,t.pendingLanes));var o=t.pendingLanes;if(o===0&&(Kn=null),qo(n),e=e.stateNode,ke&&typeof ke.onCommitFiberRoot=="function")try{ke.onCommitFiberRoot(Oi,e,void 0,(e.current.flags&128)===128)}catch{}if(s!==null){e=N.T,o=H.p,H.p=2,N.T=null;try{for(var c=t.onRecoverableError,f=0;f<s.length;f++){var y=s[f];c(y.value,{componentStack:y.stack})}}finally{N.T=e,H.p=o}}(Mn&3)!==0&&Zl(),cn(t),o=t.pendingLanes,(n&261930)!==0&&(o&42)!==0?t===xc?gs++:(gs=0,xc=t):gs=0,ys(0)}}function Yh(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Wi(e)))}function Zl(){return Vh(),Hh(),jh(),qh()}function qh(){if(ee!==5)return!1;var t=In,e=bc;bc=0;var n=qo(Mn),s=N.T,o=H.p;try{H.p=32>n?32:n,N.T=null,n=Ac,Ac=null;var c=In,f=Mn;if(ee=0,vi=In=null,Mn=0,(wt&6)!==0)throw Error(r(331));var y=wt;if(wt|=4,Sh(c.current),bh(c,c.current,f,n),wt=y,ys(0,!1),ke&&typeof ke.onPostCommitFiberRoot=="function")try{ke.onPostCommitFiberRoot(Oi,c)}catch{}return!0}finally{H.p=o,N.T=s,Yh(t,e)}}function Gh(t,e,n){e=qe(n,e),e=$r(t.stateNode,e,2),t=Gn(t,e,2),t!==null&&(Hi(t,2),cn(t))}function Mt(t,e,n){if(t.tag===3)Gh(t,t,n);else for(;e!==null;){if(e.tag===3){Gh(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Kn===null||!Kn.has(s))){t=qe(n,t),n=Qm(2),s=Gn(e,n,2),s!==null&&(Fm(n,s,e,t),Hi(s,2),cn(s));break}}e=e.return}}function Tc(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new e1;var o=new Set;s.set(e,o)}else o=s.get(e),o===void 0&&(o=new Set,s.set(e,o));o.has(n)||(vc=!0,o.add(n),t=l1.bind(null,t,e,n),e.then(t,t))}function l1(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Nt===t&&(gt&n)===n&&(qt===4||qt===3&&(gt&62914560)===gt&&300>Ee()-Fl?(wt&2)===0&&gi(t,0):gc|=n,pi===gt&&(pi=0)),cn(t)}function Qh(t,e){e===0&&(e=Od()),t=ba(t,e),t!==null&&(Hi(t,e),cn(t))}function o1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Qh(t,n)}function r1(t,e){var n=0;switch(t.tag){case 31:case 13:var s=t.stateNode,o=t.memoizedState;o!==null&&(n=o.retryLane);break;case 19:s=t.stateNode;break;case 22:s=t.stateNode._retryCache;break;default:throw Error(r(314))}s!==null&&s.delete(e),Qh(t,n)}function c1(t,e){return Vo(t,e)}var _l=null,bi=null,Cc=!1,Wl=!1,Ec=!1,_n=0;function cn(t){t!==bi&&t.next===null&&(bi===null?_l=bi=t:bi=bi.next=t),Wl=!0,Cc||(Cc=!0,d1())}function ys(t,e){if(!Ec&&Wl){Ec=!0;do for(var n=!1,s=_l;s!==null;){if(t!==0){var o=s.pendingLanes;if(o===0)var c=0;else{var f=s.suspendedLanes,y=s.pingedLanes;c=(1<<31-Me(42|t)+1)-1,c&=o&~(f&~y),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(n=!0,Ph(s,c))}else c=gt,c=nl(s,s===Nt?c:0,s.cancelPendingCommit!==null||s.timeoutHandle!==-1),(c&3)===0||Vi(s,c)||(n=!0,Ph(s,c));s=s.next}while(n);Ec=!1}}function u1(){Fh()}function Fh(){Wl=Cc=!1;var t=0;_n!==0&&x1()&&(t=_n);for(var e=Ee(),n=null,s=_l;s!==null;){var o=s.next,c=Jh(s,e);c===0?(s.next=null,n===null?_l=o:n.next=o,o===null&&(bi=n)):(n=s,(t!==0||(c&3)!==0)&&(Wl=!0)),s=o}ee!==0&&ee!==5||ys(t),_n!==0&&(_n=0)}function Jh(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,o=t.expirationTimes,c=t.pendingLanes&-62914561;0<c;){var f=31-Me(c),y=1<<f,A=o[f];A===-1?((y&n)===0||(y&s)!==0)&&(o[f]=Vy(y,e)):A<=e&&(t.expiredLanes|=y),c&=~y}if(e=Nt,n=gt,n=nl(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s=t.callbackNode,n===0||t===e&&(kt===2||kt===9)||t.cancelPendingCommit!==null)return s!==null&&s!==null&&Ho(s),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||Vi(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(s!==null&&Ho(s),qo(n)){case 2:case 8:n=zd;break;case 32:n=Ws;break;case 268435456:n=Ld;break;default:n=Ws}return s=Xh.bind(null,t),n=Vo(n,s),t.callbackPriority=e,t.callbackNode=n,e}return s!==null&&s!==null&&Ho(s),t.callbackPriority=2,t.callbackNode=null,2}function Xh(t,e){if(ee!==0&&ee!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Zl()&&t.callbackNode!==n)return null;var s=gt;return s=nl(t,t===Nt?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),s===0?null:(kh(t,s,e),Jh(t,Ee()),t.callbackNode!=null&&t.callbackNode===n?Xh.bind(null,t):null)}function Ph(t,e){if(Zl())return null;kh(t,e,!0)}function d1(){w1(function(){(wt&6)!==0?Vo(Ud,u1):Fh()})}function kc(){if(_n===0){var t=ii;t===0&&(t=$s,$s<<=1,($s&261888)===0&&($s=256)),_n=t}return _n}function Kh(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:ll(""+t)}function Ih(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function f1(t,e,n,s,o){if(e==="submit"&&n&&n.stateNode===o){var c=Kh((o[ye]||null).action),f=s.submitter;f&&(e=(e=f[ye]||null)?Kh(e.formAction):f.getAttribute("formAction"),e!==null&&(c=e,f=null));var y=new ul("action","action",null,s,o);t.push({event:y,listeners:[{instance:null,listener:function(){if(s.defaultPrevented){if(_n!==0){var A=f?Ih(o,f):new FormData(o);Pr(n,{pending:!0,data:A,method:o.method,action:c},null,A)}}else typeof c=="function"&&(y.preventDefault(),A=f?Ih(o,f):new FormData(o),Pr(n,{pending:!0,data:A,method:o.method,action:c},c,A))},currentTarget:o}]})}}for(var Mc=0;Mc<ur.length;Mc++){var Dc=ur[Mc],m1=Dc.toLowerCase(),h1=Dc[0].toUpperCase()+Dc.slice(1);$e(m1,"on"+h1)}$e(Ef,"onAnimationEnd"),$e(kf,"onAnimationIteration"),$e(Mf,"onAnimationStart"),$e("dblclick","onDoubleClick"),$e("focusin","onFocus"),$e("focusout","onBlur"),$e(Bb,"onTransitionRun"),$e(Rb,"onTransitionStart"),$e(Nb,"onTransitionCancel"),$e(Df,"onTransitionEnd"),Fa("onMouseEnter",["mouseout","mouseover"]),Fa("onMouseLeave",["mouseout","mouseover"]),Fa("onPointerEnter",["pointerout","pointerover"]),Fa("onPointerLeave",["pointerout","pointerover"]),pa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),pa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),pa("onBeforeInput",["compositionend","keypress","textInput","paste"]),pa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),pa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),pa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bs));function Zh(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],o=s.event;s=s.listeners;t:{var c=void 0;if(e)for(var f=s.length-1;0<=f;f--){var y=s[f],A=y.instance,E=y.currentTarget;if(y=y.listener,A!==c&&o.isPropagationStopped())break t;c=y,o.currentTarget=E;try{c(o)}catch(R){ml(R)}o.currentTarget=null,c=A}else for(f=0;f<s.length;f++){if(y=s[f],A=y.instance,E=y.currentTarget,y=y.listener,A!==c&&o.isPropagationStopped())break t;c=y,o.currentTarget=E;try{c(o)}catch(R){ml(R)}o.currentTarget=null,c=A}}}}function ht(t,e){var n=e[Go];n===void 0&&(n=e[Go]=new Set);var s=t+"__bubble";n.has(s)||(_h(e,t,2,!1),n.add(s))}function Bc(t,e,n){var s=0;e&&(s|=4),_h(n,t,s,e)}var $l="_reactListening"+Math.random().toString(36).slice(2);function Rc(t){if(!t[$l]){t[$l]=!0,Qd.forEach(function(n){n!=="selectionchange"&&(p1.has(n)||Bc(n,!1,t),Bc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[$l]||(e[$l]=!0,Bc("selectionchange",!1,e))}}function _h(t,e,n,s){switch(Ep(e)){case 2:var o=Q1;break;case 8:o=F1;break;default:o=Xc}n=o.bind(null,e,n,t),o=void 0,!_o||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(o=!0),s?o!==void 0?t.addEventListener(e,n,{capture:!0,passive:o}):t.addEventListener(e,n,!0):o!==void 0?t.addEventListener(e,n,{passive:o}):t.addEventListener(e,n,!1)}function Nc(t,e,n,s,o){var c=s;if((e&1)===0&&(e&2)===0&&s!==null)t:for(;;){if(s===null)return;var f=s.tag;if(f===3||f===4){var y=s.stateNode.containerInfo;if(y===o)break;if(f===4)for(f=s.return;f!==null;){var A=f.tag;if((A===3||A===4)&&f.stateNode.containerInfo===o)return;f=f.return}for(;y!==null;){if(f=qa(y),f===null)return;if(A=f.tag,A===5||A===6||A===26||A===27){s=c=f;continue t}y=y.parentNode}}s=s.return}ef(function(){var E=c,R=Io(n),L=[];t:{var k=Bf.get(t);if(k!==void 0){var B=ul,K=t;switch(t){case"keypress":if(rl(n)===0)break t;case"keydown":case"keyup":B=rb;break;case"focusin":K="focus",B=er;break;case"focusout":K="blur",B=er;break;case"beforeblur":case"afterblur":B=er;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=sf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=Zy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=db;break;case Ef:case kf:case Mf:B=$y;break;case Df:B=mb;break;case"scroll":case"scrollend":B=Ky;break;case"wheel":B=pb;break;case"copy":case"cut":case"paste":B=eb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=of;break;case"toggle":case"beforetoggle":B=gb}var nt=(e&4)!==0,Rt=!nt&&(t==="scroll"||t==="scrollend"),T=nt?k!==null?k+"Capture":null:k;nt=[];for(var S=E,C;S!==null;){var U=S;if(C=U.stateNode,U=U.tag,U!==5&&U!==26&&U!==27||C===null||T===null||(U=qi(S,T),U!=null&&nt.push(As(S,U,C))),Rt)break;S=S.return}0<nt.length&&(k=new B(k,K,null,n,R),L.push({event:k,listeners:nt}))}}if((e&7)===0){t:{if(k=t==="mouseover"||t==="pointerover",B=t==="mouseout"||t==="pointerout",k&&n!==Ko&&(K=n.relatedTarget||n.fromElement)&&(qa(K)||K[Ya]))break t;if((B||k)&&(k=R.window===R?R:(k=R.ownerDocument)?k.defaultView||k.parentWindow:window,B?(K=n.relatedTarget||n.toElement,B=E,K=K?qa(K):null,K!==null&&(Rt=m(K),nt=K.tag,K!==Rt||nt!==5&&nt!==27&&nt!==6)&&(K=null)):(B=null,K=E),B!==K)){if(nt=sf,U="onMouseLeave",T="onMouseEnter",S="mouse",(t==="pointerout"||t==="pointerover")&&(nt=of,U="onPointerLeave",T="onPointerEnter",S="pointer"),Rt=B==null?k:Yi(B),C=K==null?k:Yi(K),k=new nt(U,S+"leave",B,n,R),k.target=Rt,k.relatedTarget=C,U=null,qa(R)===E&&(nt=new nt(T,S+"enter",K,n,R),nt.target=C,nt.relatedTarget=Rt,U=nt),Rt=U,B&&K)e:{for(nt=v1,T=B,S=K,C=0,U=T;U;U=nt(U))C++;U=0;for(var tt=S;tt;tt=nt(tt))U++;for(;0<C-U;)T=nt(T),C--;for(;0<U-C;)S=nt(S),U--;for(;C--;){if(T===S||S!==null&&T===S.alternate){nt=T;break e}T=nt(T),S=nt(S)}nt=null}else nt=null;B!==null&&Wh(L,k,B,nt,!1),K!==null&&Rt!==null&&Wh(L,Rt,K,nt,!0)}}t:{if(k=E?Yi(E):window,B=k.nodeName&&k.nodeName.toLowerCase(),B==="select"||B==="input"&&k.type==="file")var At=pf;else if(mf(k))if(vf)At=kb;else{At=Cb;var _=Tb}else B=k.nodeName,!B||B.toLowerCase()!=="input"||k.type!=="checkbox"&&k.type!=="radio"?E&&Po(E.elementType)&&(At=pf):At=Eb;if(At&&(At=At(t,E))){hf(L,At,n,R);break t}_&&_(t,k,E),t==="focusout"&&E&&k.type==="number"&&E.memoizedProps.value!=null&&Xo(k,"number",k.value)}switch(_=E?Yi(E):window,t){case"focusin":(mf(_)||_.contentEditable==="true")&&(Za=_,or=E,Ii=null);break;case"focusout":Ii=or=Za=null;break;case"mousedown":rr=!0;break;case"contextmenu":case"mouseup":case"dragend":rr=!1,Tf(L,n,R);break;case"selectionchange":if(Db)break;case"keydown":case"keyup":Tf(L,n,R)}var ut;if(ar)t:{switch(t){case"compositionstart":var yt="onCompositionStart";break t;case"compositionend":yt="onCompositionEnd";break t;case"compositionupdate":yt="onCompositionUpdate";break t}yt=void 0}else Ia?df(t,n)&&(yt="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(yt="onCompositionStart");yt&&(rf&&n.locale!=="ko"&&(Ia||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&Ia&&(ut=nf()):(Ln=R,Wo="value"in Ln?Ln.value:Ln.textContent,Ia=!0)),_=to(E,yt),0<_.length&&(yt=new lf(yt,t,null,n,R),L.push({event:yt,listeners:_}),ut?yt.data=ut:(ut=ff(n),ut!==null&&(yt.data=ut)))),(ut=bb?Ab(t,n):xb(t,n))&&(yt=to(E,"onBeforeInput"),0<yt.length&&(_=new lf("onBeforeInput","beforeinput",null,n,R),L.push({event:_,listeners:yt}),_.data=ut)),f1(L,t,E,n,R)}Zh(L,e)})}function As(t,e,n){return{instance:t,listener:e,currentTarget:n}}function to(t,e){for(var n=e+"Capture",s=[];t!==null;){var o=t,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=qi(t,n),o!=null&&s.unshift(As(t,o,c)),o=qi(t,e),o!=null&&s.push(As(t,o,c))),t.tag===3)return s;t=t.return}return[]}function v1(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Wh(t,e,n,s,o){for(var c=e._reactName,f=[];n!==null&&n!==s;){var y=n,A=y.alternate,E=y.stateNode;if(y=y.tag,A!==null&&A===s)break;y!==5&&y!==26&&y!==27||E===null||(A=E,o?(E=qi(n,c),E!=null&&f.unshift(As(n,E,A))):o||(E=qi(n,c),E!=null&&f.push(As(n,E,A)))),n=n.return}f.length!==0&&t.push({event:e,listeners:f})}var g1=/\r\n?/g,y1=/\u0000|\uFFFD/g;function $h(t){return(typeof t=="string"?t:""+t).replace(g1,`
`).replace(y1,"")}function tp(t,e){return e=$h(e),$h(t)===e}function Bt(t,e,n,s,o,c){switch(n){case"children":typeof s=="string"?e==="body"||e==="textarea"&&s===""||Xa(t,s):(typeof s=="number"||typeof s=="bigint")&&e!=="body"&&Xa(t,""+s);break;case"className":il(t,"class",s);break;case"tabIndex":il(t,"tabindex",s);break;case"dir":case"role":case"viewBox":case"width":case"height":il(t,n,s);break;case"style":$d(t,s,c);break;case"data":if(e!=="object"){il(t,"data",s);break}case"src":case"href":if(s===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(s==null||typeof s=="function"||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=ll(""+s),t.setAttribute(n,s);break;case"action":case"formAction":if(typeof s=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(n==="formAction"?(e!=="input"&&Bt(t,e,"name",o.name,o,null),Bt(t,e,"formEncType",o.formEncType,o,null),Bt(t,e,"formMethod",o.formMethod,o,null),Bt(t,e,"formTarget",o.formTarget,o,null)):(Bt(t,e,"encType",o.encType,o,null),Bt(t,e,"method",o.method,o,null),Bt(t,e,"target",o.target,o,null)));if(s==null||typeof s=="symbol"||typeof s=="boolean"){t.removeAttribute(n);break}s=ll(""+s),t.setAttribute(n,s);break;case"onClick":s!=null&&(t.onclick=mn);break;case"onScroll":s!=null&&ht("scroll",t);break;case"onScrollEnd":s!=null&&ht("scrollend",t);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(n=s.__html,n!=null){if(o.children!=null)throw Error(r(60));t.innerHTML=n}}break;case"multiple":t.multiple=s&&typeof s!="function"&&typeof s!="symbol";break;case"muted":t.muted=s&&typeof s!="function"&&typeof s!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(s==null||typeof s=="function"||typeof s=="boolean"||typeof s=="symbol"){t.removeAttribute("xlink:href");break}n=ll(""+s),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""+s):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":s&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":s===!0?t.setAttribute(n,""):s!==!1&&s!=null&&typeof s!="function"&&typeof s!="symbol"?t.setAttribute(n,s):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":s!=null&&typeof s!="function"&&typeof s!="symbol"&&!isNaN(s)&&1<=s?t.setAttribute(n,s):t.removeAttribute(n);break;case"rowSpan":case"start":s==null||typeof s=="function"||typeof s=="symbol"||isNaN(s)?t.removeAttribute(n):t.setAttribute(n,s);break;case"popover":ht("beforetoggle",t),ht("toggle",t),al(t,"popover",s);break;case"xlinkActuate":fn(t,"http://www.w3.org/1999/xlink","xlink:actuate",s);break;case"xlinkArcrole":fn(t,"http://www.w3.org/1999/xlink","xlink:arcrole",s);break;case"xlinkRole":fn(t,"http://www.w3.org/1999/xlink","xlink:role",s);break;case"xlinkShow":fn(t,"http://www.w3.org/1999/xlink","xlink:show",s);break;case"xlinkTitle":fn(t,"http://www.w3.org/1999/xlink","xlink:title",s);break;case"xlinkType":fn(t,"http://www.w3.org/1999/xlink","xlink:type",s);break;case"xmlBase":fn(t,"http://www.w3.org/XML/1998/namespace","xml:base",s);break;case"xmlLang":fn(t,"http://www.w3.org/XML/1998/namespace","xml:lang",s);break;case"xmlSpace":fn(t,"http://www.w3.org/XML/1998/namespace","xml:space",s);break;case"is":al(t,"is",s);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Xy.get(n)||n,al(t,n,s))}}function Uc(t,e,n,s,o,c){switch(n){case"style":$d(t,s,c);break;case"dangerouslySetInnerHTML":if(s!=null){if(typeof s!="object"||!("__html"in s))throw Error(r(61));if(n=s.__html,n!=null){if(o.children!=null)throw Error(r(60));t.innerHTML=n}}break;case"children":typeof s=="string"?Xa(t,s):(typeof s=="number"||typeof s=="bigint")&&Xa(t,""+s);break;case"onScroll":s!=null&&ht("scroll",t);break;case"onScrollEnd":s!=null&&ht("scrollend",t);break;case"onClick":s!=null&&(t.onclick=mn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Fd.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(o=n.endsWith("Capture"),e=n.slice(2,o?n.length-7:void 0),c=t[ye]||null,c=c!=null?c[n]:null,typeof c=="function"&&t.removeEventListener(e,c,o),typeof s=="function")){typeof c!="function"&&c!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,s,o);break t}n in t?t[n]=s:s===!0?t.setAttribute(n,""):al(t,n,s)}}}function ce(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ht("error",t),ht("load",t);var s=!1,o=!1,c;for(c in n)if(n.hasOwnProperty(c)){var f=n[c];if(f!=null)switch(c){case"src":s=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,e));default:Bt(t,e,c,f,n,null)}}o&&Bt(t,e,"srcSet",n.srcSet,n,null),s&&Bt(t,e,"src",n.src,n,null);return;case"input":ht("invalid",t);var y=c=f=o=null,A=null,E=null;for(s in n)if(n.hasOwnProperty(s)){var R=n[s];if(R!=null)switch(s){case"name":o=R;break;case"type":f=R;break;case"checked":A=R;break;case"defaultChecked":E=R;break;case"value":c=R;break;case"defaultValue":y=R;break;case"children":case"dangerouslySetInnerHTML":if(R!=null)throw Error(r(137,e));break;default:Bt(t,e,s,R,n,null)}}Id(t,c,y,A,E,f,o,!1);return;case"select":ht("invalid",t),s=f=c=null;for(o in n)if(n.hasOwnProperty(o)&&(y=n[o],y!=null))switch(o){case"value":c=y;break;case"defaultValue":f=y;break;case"multiple":s=y;default:Bt(t,e,o,y,n,null)}e=c,n=f,t.multiple=!!s,e!=null?Ja(t,!!s,e,!1):n!=null&&Ja(t,!!s,n,!0);return;case"textarea":ht("invalid",t),c=o=s=null;for(f in n)if(n.hasOwnProperty(f)&&(y=n[f],y!=null))switch(f){case"value":s=y;break;case"defaultValue":o=y;break;case"children":c=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(r(91));break;default:Bt(t,e,f,y,n,null)}_d(t,s,o,c);return;case"option":for(A in n)if(n.hasOwnProperty(A)&&(s=n[A],s!=null))switch(A){case"selected":t.selected=s&&typeof s!="function"&&typeof s!="symbol";break;default:Bt(t,e,A,s,n,null)}return;case"dialog":ht("beforetoggle",t),ht("toggle",t),ht("cancel",t),ht("close",t);break;case"iframe":case"object":ht("load",t);break;case"video":case"audio":for(s=0;s<bs.length;s++)ht(bs[s],t);break;case"image":ht("error",t),ht("load",t);break;case"details":ht("toggle",t);break;case"embed":case"source":case"link":ht("error",t),ht("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(E in n)if(n.hasOwnProperty(E)&&(s=n[E],s!=null))switch(E){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,e));default:Bt(t,e,E,s,n,null)}return;default:if(Po(e)){for(R in n)n.hasOwnProperty(R)&&(s=n[R],s!==void 0&&Uc(t,e,R,s,n,void 0));return}}for(y in n)n.hasOwnProperty(y)&&(s=n[y],s!=null&&Bt(t,e,y,s,n,null))}function b1(t,e,n,s){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,f=null,y=null,A=null,E=null,R=null;for(B in n){var L=n[B];if(n.hasOwnProperty(B)&&L!=null)switch(B){case"checked":break;case"value":break;case"defaultValue":A=L;default:s.hasOwnProperty(B)||Bt(t,e,B,null,s,L)}}for(var k in s){var B=s[k];if(L=n[k],s.hasOwnProperty(k)&&(B!=null||L!=null))switch(k){case"type":c=B;break;case"name":o=B;break;case"checked":E=B;break;case"defaultChecked":R=B;break;case"value":f=B;break;case"defaultValue":y=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(r(137,e));break;default:B!==L&&Bt(t,e,k,B,s,L)}}Jo(t,f,y,A,E,R,c,o);return;case"select":B=f=y=k=null;for(c in n)if(A=n[c],n.hasOwnProperty(c)&&A!=null)switch(c){case"value":break;case"multiple":B=A;default:s.hasOwnProperty(c)||Bt(t,e,c,null,s,A)}for(o in s)if(c=s[o],A=n[o],s.hasOwnProperty(o)&&(c!=null||A!=null))switch(o){case"value":k=c;break;case"defaultValue":y=c;break;case"multiple":f=c;default:c!==A&&Bt(t,e,o,c,s,A)}e=y,n=f,s=B,k!=null?Ja(t,!!n,k,!1):!!s!=!!n&&(e!=null?Ja(t,!!n,e,!0):Ja(t,!!n,n?[]:"",!1));return;case"textarea":B=k=null;for(y in n)if(o=n[y],n.hasOwnProperty(y)&&o!=null&&!s.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:Bt(t,e,y,null,s,o)}for(f in s)if(o=s[f],c=n[f],s.hasOwnProperty(f)&&(o!=null||c!=null))switch(f){case"value":k=o;break;case"defaultValue":B=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(r(91));break;default:o!==c&&Bt(t,e,f,o,s,c)}Zd(t,k,B);return;case"option":for(var K in n)if(k=n[K],n.hasOwnProperty(K)&&k!=null&&!s.hasOwnProperty(K))switch(K){case"selected":t.selected=!1;break;default:Bt(t,e,K,null,s,k)}for(A in s)if(k=s[A],B=n[A],s.hasOwnProperty(A)&&k!==B&&(k!=null||B!=null))switch(A){case"selected":t.selected=k&&typeof k!="function"&&typeof k!="symbol";break;default:Bt(t,e,A,k,s,B)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var nt in n)k=n[nt],n.hasOwnProperty(nt)&&k!=null&&!s.hasOwnProperty(nt)&&Bt(t,e,nt,null,s,k);for(E in s)if(k=s[E],B=n[E],s.hasOwnProperty(E)&&k!==B&&(k!=null||B!=null))switch(E){case"children":case"dangerouslySetInnerHTML":if(k!=null)throw Error(r(137,e));break;default:Bt(t,e,E,k,s,B)}return;default:if(Po(e)){for(var Rt in n)k=n[Rt],n.hasOwnProperty(Rt)&&k!==void 0&&!s.hasOwnProperty(Rt)&&Uc(t,e,Rt,void 0,s,k);for(R in s)k=s[R],B=n[R],!s.hasOwnProperty(R)||k===B||k===void 0&&B===void 0||Uc(t,e,R,k,s,B);return}}for(var T in n)k=n[T],n.hasOwnProperty(T)&&k!=null&&!s.hasOwnProperty(T)&&Bt(t,e,T,null,s,k);for(L in s)k=s[L],B=n[L],!s.hasOwnProperty(L)||k===B||k==null&&B==null||Bt(t,e,L,k,s,B)}function ep(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function A1(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),s=0;s<n.length;s++){var o=n[s],c=o.transferSize,f=o.initiatorType,y=o.duration;if(c&&y&&ep(f)){for(f=0,y=o.responseEnd,s+=1;s<n.length;s++){var A=n[s],E=A.startTime;if(E>y)break;var R=A.transferSize,L=A.initiatorType;R&&ep(L)&&(A=A.responseEnd,f+=R*(A<y?1:(y-E)/(A-E)))}if(--s,e+=8*(c+f)/(o.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var zc=null,Lc=null;function eo(t){return t.nodeType===9?t:t.ownerDocument}function np(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ap(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Oc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Vc=null;function x1(){var t=window.event;return t&&t.type==="popstate"?t===Vc?!1:(Vc=t,!0):(Vc=null,!1)}var ip=typeof setTimeout=="function"?setTimeout:void 0,S1=typeof clearTimeout=="function"?clearTimeout:void 0,sp=typeof Promise=="function"?Promise:void 0,w1=typeof queueMicrotask=="function"?queueMicrotask:typeof sp<"u"?function(t){return sp.resolve(null).then(t).catch(T1)}:ip;function T1(t){setTimeout(function(){throw t})}function Wn(t){return t==="head"}function lp(t,e){var n=e,s=0;do{var o=n.nextSibling;if(t.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"||n==="/&"){if(s===0){t.removeChild(o),wi(e);return}s--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")s++;else if(n==="html")xs(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,xs(n);for(var c=n.firstChild;c;){var f=c.nextSibling,y=c.nodeName;c[ji]||y==="SCRIPT"||y==="STYLE"||y==="LINK"&&c.rel.toLowerCase()==="stylesheet"||n.removeChild(c),c=f}}else n==="body"&&xs(t.ownerDocument.body);n=o}while(n);wi(e)}function op(t,e){var n=t;t=0;do{var s=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=s}while(n)}function Hc(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Hc(n),Qo(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function C1(t,e,n,s){for(;t.nodeType===1;){var o=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!s&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(s){if(!t[ji])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(c=t.getAttribute("rel"),c==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(c!==o.rel||t.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||t.getAttribute("title")!==(o.title==null?null:o.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(c=t.getAttribute("src"),(c!==(o.src==null?null:o.src)||t.getAttribute("type")!==(o.type==null?null:o.type)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&t.getAttribute("name")===c)return t}else return t;if(t=Xe(t.nextSibling),t===null)break}return null}function E1(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Xe(t.nextSibling),t===null))return null;return t}function rp(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Xe(t.nextSibling),t===null))return null;return t}function jc(t){return t.data==="$?"||t.data==="$~"}function Yc(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function k1(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var s=function(){e(),n.removeEventListener("DOMContentLoaded",s)};n.addEventListener("DOMContentLoaded",s),t._reactRetry=s}}function Xe(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var qc=null;function cp(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Xe(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function up(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function dp(t,e,n){switch(e=eo(n),t){case"html":if(t=e.documentElement,!t)throw Error(r(452));return t;case"head":if(t=e.head,!t)throw Error(r(453));return t;case"body":if(t=e.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function xs(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Qo(t)}var Pe=new Map,fp=new Set;function no(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Dn=H.d;H.d={f:M1,r:D1,D:B1,C:R1,L:N1,m:U1,X:L1,S:z1,M:O1};function M1(){var t=Dn.f(),e=Pl();return t||e}function D1(t){var e=Ga(t);e!==null&&e.tag===5&&e.type==="form"?Dm(e):Dn.r(t)}var Ai=typeof document>"u"?null:document;function mp(t,e,n){var s=Ai;if(s&&typeof e=="string"&&e){var o=je(e);o='link[rel="'+t+'"][href="'+o+'"]',typeof n=="string"&&(o+='[crossorigin="'+n+'"]'),fp.has(o)||(fp.add(o),t={rel:t,crossOrigin:n,href:e},s.querySelector(o)===null&&(e=s.createElement("link"),ce(e,"link",t),ne(e),s.head.appendChild(e)))}}function B1(t){Dn.D(t),mp("dns-prefetch",t,null)}function R1(t,e){Dn.C(t,e),mp("preconnect",t,e)}function N1(t,e,n){Dn.L(t,e,n);var s=Ai;if(s&&t&&e){var o='link[rel="preload"][as="'+je(e)+'"]';e==="image"&&n&&n.imageSrcSet?(o+='[imagesrcset="'+je(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(o+='[imagesizes="'+je(n.imageSizes)+'"]')):o+='[href="'+je(t)+'"]';var c=o;switch(e){case"style":c=xi(t);break;case"script":c=Si(t)}Pe.has(c)||(t=b({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Pe.set(c,t),s.querySelector(o)!==null||e==="style"&&s.querySelector(Ss(c))||e==="script"&&s.querySelector(ws(c))||(e=s.createElement("link"),ce(e,"link",t),ne(e),s.head.appendChild(e)))}}function U1(t,e){Dn.m(t,e);var n=Ai;if(n&&t){var s=e&&typeof e.as=="string"?e.as:"script",o='link[rel="modulepreload"][as="'+je(s)+'"][href="'+je(t)+'"]',c=o;switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=Si(t)}if(!Pe.has(c)&&(t=b({rel:"modulepreload",href:t},e),Pe.set(c,t),n.querySelector(o)===null)){switch(s){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ws(c)))return}s=n.createElement("link"),ce(s,"link",t),ne(s),n.head.appendChild(s)}}}function z1(t,e,n){Dn.S(t,e,n);var s=Ai;if(s&&t){var o=Qa(s).hoistableStyles,c=xi(t);e=e||"default";var f=o.get(c);if(!f){var y={loading:0,preload:null};if(f=s.querySelector(Ss(c)))y.loading=5;else{t=b({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Pe.get(c))&&Gc(t,n);var A=f=s.createElement("link");ne(A),ce(A,"link",t),A._p=new Promise(function(E,R){A.onload=E,A.onerror=R}),A.addEventListener("load",function(){y.loading|=1}),A.addEventListener("error",function(){y.loading|=2}),y.loading|=4,ao(f,e,s)}f={type:"stylesheet",instance:f,count:1,state:y},o.set(c,f)}}}function L1(t,e){Dn.X(t,e);var n=Ai;if(n&&t){var s=Qa(n).hoistableScripts,o=Si(t),c=s.get(o);c||(c=n.querySelector(ws(o)),c||(t=b({src:t,async:!0},e),(e=Pe.get(o))&&Qc(t,e),c=n.createElement("script"),ne(c),ce(c,"link",t),n.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(o,c))}}function O1(t,e){Dn.M(t,e);var n=Ai;if(n&&t){var s=Qa(n).hoistableScripts,o=Si(t),c=s.get(o);c||(c=n.querySelector(ws(o)),c||(t=b({src:t,async:!0,type:"module"},e),(e=Pe.get(o))&&Qc(t,e),c=n.createElement("script"),ne(c),ce(c,"link",t),n.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},s.set(o,c))}}function hp(t,e,n,s){var o=(o=ft.current)?no(o):null;if(!o)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=xi(n.href),n=Qa(o).hoistableStyles,s=n.get(e),s||(s={type:"style",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=xi(n.href);var c=Qa(o).hoistableStyles,f=c.get(t);if(f||(o=o.ownerDocument||o,f={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(t,f),(c=o.querySelector(Ss(t)))&&!c._p&&(f.instance=c,f.state.loading=5),Pe.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Pe.set(t,n),c||V1(o,t,n,f.state))),e&&s===null)throw Error(r(528,""));return f}if(e&&s!==null)throw Error(r(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Si(n),n=Qa(o).hoistableScripts,s=n.get(e),s||(s={type:"script",instance:null,count:0,state:null},n.set(e,s)),s):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function xi(t){return'href="'+je(t)+'"'}function Ss(t){return'link[rel="stylesheet"]['+t+"]"}function pp(t){return b({},t,{"data-precedence":t.precedence,precedence:null})}function V1(t,e,n,s){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?s.loading=1:(e=t.createElement("link"),s.preload=e,e.addEventListener("load",function(){return s.loading|=1}),e.addEventListener("error",function(){return s.loading|=2}),ce(e,"link",n),ne(e),t.head.appendChild(e))}function Si(t){return'[src="'+je(t)+'"]'}function ws(t){return"script[async]"+t}function vp(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var s=t.querySelector('style[data-href~="'+je(n.href)+'"]');if(s)return e.instance=s,ne(s),s;var o=b({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return s=(t.ownerDocument||t).createElement("style"),ne(s),ce(s,"style",o),ao(s,n.precedence,t),e.instance=s;case"stylesheet":o=xi(n.href);var c=t.querySelector(Ss(o));if(c)return e.state.loading|=4,e.instance=c,ne(c),c;s=pp(n),(o=Pe.get(o))&&Gc(s,o),c=(t.ownerDocument||t).createElement("link"),ne(c);var f=c;return f._p=new Promise(function(y,A){f.onload=y,f.onerror=A}),ce(c,"link",s),e.state.loading|=4,ao(c,n.precedence,t),e.instance=c;case"script":return c=Si(n.src),(o=t.querySelector(ws(c)))?(e.instance=o,ne(o),o):(s=n,(o=Pe.get(c))&&(s=b({},n),Qc(s,o)),t=t.ownerDocument||t,o=t.createElement("script"),ne(o),ce(o,"link",s),t.head.appendChild(o),e.instance=o);case"void":return null;default:throw Error(r(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(s=e.instance,e.state.loading|=4,ao(s,n.precedence,t));return e.instance}function ao(t,e,n){for(var s=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=s.length?s[s.length-1]:null,c=o,f=0;f<s.length;f++){var y=s[f];if(y.dataset.precedence===e)c=y;else if(c!==o)break}c?c.parentNode.insertBefore(t,c.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Gc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Qc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var io=null;function gp(t,e,n){if(io===null){var s=new Map,o=io=new Map;o.set(n,s)}else o=io,s=o.get(n),s||(s=new Map,o.set(n,s));if(s.has(t))return s;for(s.set(t,null),n=n.getElementsByTagName(t),o=0;o<n.length;o++){var c=n[o];if(!(c[ji]||c[se]||t==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var f=c.getAttribute(e)||"";f=t+f;var y=s.get(f);y?y.push(c):s.set(f,[c])}}return s}function yp(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function H1(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function bp(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function j1(t,e,n,s){if(n.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var o=xi(s.href),c=e.querySelector(Ss(o));if(c){e=c._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=so.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=c,ne(c);return}c=e.ownerDocument||e,s=pp(s),(o=Pe.get(o))&&Gc(s,o),c=c.createElement("link"),ne(c);var f=c;f._p=new Promise(function(y,A){f.onload=y,f.onerror=A}),ce(c,"link",s),n.instance=c}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=so.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var Fc=0;function Y1(t,e){return t.stylesheets&&t.count===0&&oo(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var s=setTimeout(function(){if(t.stylesheets&&oo(t,t.stylesheets),t.unsuspend){var c=t.unsuspend;t.unsuspend=null,c()}},6e4+e);0<t.imgBytes&&Fc===0&&(Fc=62500*A1());var o=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&oo(t,t.stylesheets),t.unsuspend)){var c=t.unsuspend;t.unsuspend=null,c()}},(t.imgBytes>Fc?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(s),clearTimeout(o)}}:null}function so(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)oo(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var lo=null;function oo(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,lo=new Map,e.forEach(q1,t),lo=null,so.call(t))}function q1(t,e){if(!(e.state.loading&4)){var n=lo.get(t);if(n)var s=n.get(null);else{n=new Map,lo.set(t,n);for(var o=t.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var f=o[c];(f.nodeName==="LINK"||f.getAttribute("media")!=="not all")&&(n.set(f.dataset.precedence,f),s=f)}s&&n.set(null,s)}o=e.instance,f=o.getAttribute("data-precedence"),c=n.get(f)||s,c===s&&n.set(null,o),n.set(f,o),this.count++,s=so.bind(this),o.addEventListener("load",s),o.addEventListener("error",s),c?c.parentNode.insertBefore(o,c.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(o,t.firstChild)),e.state.loading|=4}}var Ts={$$typeof:Q,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function G1(t,e,n,s,o,c,f,y,A){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=jo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=jo(0),this.hiddenUpdates=jo(null),this.identifierPrefix=s,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=f,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=A,this.incompleteTransitions=new Map}function Ap(t,e,n,s,o,c,f,y,A,E,R,L){return t=new G1(t,e,n,f,A,E,R,L,y),e=1,c===!0&&(e|=24),c=Be(3,null,null,e),t.current=c,c.stateNode=t,e=wr(),e.refCount++,t.pooledCache=e,e.refCount++,c.memoizedState={element:s,isDehydrated:n,cache:e},kr(c),t}function xp(t){return t?(t=$a,t):$a}function Sp(t,e,n,s,o,c){o=xp(o),s.context===null?s.context=o:s.pendingContext=o,s=qn(e),s.payload={element:n},c=c===void 0?null:c,c!==null&&(s.callback=c),n=Gn(t,s,e),n!==null&&(Te(n,t,e),ns(n,t,e))}function wp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Jc(t,e){wp(t,e),(t=t.alternate)&&wp(t,e)}function Tp(t){if(t.tag===13||t.tag===31){var e=ba(t,67108864);e!==null&&Te(e,t,67108864),Jc(t,67108864)}}function Cp(t){if(t.tag===13||t.tag===31){var e=Le();e=Yo(e);var n=ba(t,e);n!==null&&Te(n,t,e),Jc(t,e)}}var ro=!0;function Q1(t,e,n,s){var o=N.T;N.T=null;var c=H.p;try{H.p=2,Xc(t,e,n,s)}finally{H.p=c,N.T=o}}function F1(t,e,n,s){var o=N.T;N.T=null;var c=H.p;try{H.p=8,Xc(t,e,n,s)}finally{H.p=c,N.T=o}}function Xc(t,e,n,s){if(ro){var o=Pc(s);if(o===null)Nc(t,e,s,co,n),kp(t,s);else if(X1(o,t,e,n,s))s.stopPropagation();else if(kp(t,s),e&4&&-1<J1.indexOf(t)){for(;o!==null;){var c=Ga(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var f=ha(c.pendingLanes);if(f!==0){var y=c;for(y.pendingLanes|=2,y.entangledLanes|=2;f;){var A=1<<31-Me(f);y.entanglements[1]|=A,f&=~A}cn(c),(wt&6)===0&&(Jl=Ee()+500,ys(0))}}break;case 31:case 13:y=ba(c,2),y!==null&&Te(y,c,2),Pl(),Jc(c,2)}if(c=Pc(s),c===null&&Nc(t,e,s,co,n),c===o)break;o=c}o!==null&&s.stopPropagation()}else Nc(t,e,s,null,n)}}function Pc(t){return t=Io(t),Kc(t)}var co=null;function Kc(t){if(co=null,t=qa(t),t!==null){var e=m(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=d(e),t!==null)return t;t=null}else if(n===31){if(t=p(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return co=t,null}function Ep(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(By()){case Ud:return 2;case zd:return 8;case Ws:case Ry:return 32;case Ld:return 268435456;default:return 32}default:return 32}}var Ic=!1,$n=null,ta=null,ea=null,Cs=new Map,Es=new Map,na=[],J1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function kp(t,e){switch(t){case"focusin":case"focusout":$n=null;break;case"dragenter":case"dragleave":ta=null;break;case"mouseover":case"mouseout":ea=null;break;case"pointerover":case"pointerout":Cs.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Es.delete(e.pointerId)}}function ks(t,e,n,s,o,c){return t===null||t.nativeEvent!==c?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:c,targetContainers:[o]},e!==null&&(e=Ga(e),e!==null&&Tp(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,o!==null&&e.indexOf(o)===-1&&e.push(o),t)}function X1(t,e,n,s,o){switch(e){case"focusin":return $n=ks($n,t,e,n,s,o),!0;case"dragenter":return ta=ks(ta,t,e,n,s,o),!0;case"mouseover":return ea=ks(ea,t,e,n,s,o),!0;case"pointerover":var c=o.pointerId;return Cs.set(c,ks(Cs.get(c)||null,t,e,n,s,o)),!0;case"gotpointercapture":return c=o.pointerId,Es.set(c,ks(Es.get(c)||null,t,e,n,s,o)),!0}return!1}function Mp(t){var e=qa(t.target);if(e!==null){var n=m(e);if(n!==null){if(e=n.tag,e===13){if(e=d(n),e!==null){t.blockedOn=e,qd(t.priority,function(){Cp(n)});return}}else if(e===31){if(e=p(n),e!==null){t.blockedOn=e,qd(t.priority,function(){Cp(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function uo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Pc(t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);Ko=s,n.target.dispatchEvent(s),Ko=null}else return e=Ga(n),e!==null&&Tp(e),t.blockedOn=n,!1;e.shift()}return!0}function Dp(t,e,n){uo(t)&&n.delete(e)}function P1(){Ic=!1,$n!==null&&uo($n)&&($n=null),ta!==null&&uo(ta)&&(ta=null),ea!==null&&uo(ea)&&(ea=null),Cs.forEach(Dp),Es.forEach(Dp)}function fo(t,e){t.blockedOn===e&&(t.blockedOn=null,Ic||(Ic=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,P1)))}var mo=null;function Bp(t){mo!==t&&(mo=t,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){mo===t&&(mo=null);for(var e=0;e<t.length;e+=3){var n=t[e],s=t[e+1],o=t[e+2];if(typeof s!="function"){if(Kc(s||n)===null)continue;break}var c=Ga(n);c!==null&&(t.splice(e,3),e-=3,Pr(c,{pending:!0,data:o,method:n.method,action:s},s,o))}}))}function wi(t){function e(A){return fo(A,t)}$n!==null&&fo($n,t),ta!==null&&fo(ta,t),ea!==null&&fo(ea,t),Cs.forEach(e),Es.forEach(e);for(var n=0;n<na.length;n++){var s=na[n];s.blockedOn===t&&(s.blockedOn=null)}for(;0<na.length&&(n=na[0],n.blockedOn===null);)Mp(n),n.blockedOn===null&&na.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(s=0;s<n.length;s+=3){var o=n[s],c=n[s+1],f=o[ye]||null;if(typeof c=="function")f||Bp(n);else if(f){var y=null;if(c&&c.hasAttribute("formAction")){if(o=c,f=c[ye]||null)y=f.formAction;else if(Kc(o)!==null)continue}else y=f.action;typeof y=="function"?n[s+1]=y:(n.splice(s,3),s-=3),Bp(n)}}}function Rp(){function t(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(f){return o=f})},focusReset:"manual",scroll:"manual"})}function e(){o!==null&&(o(),o=null),s||setTimeout(n,20)}function n(){if(!s&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var s=!1,o=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){s=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),o!==null&&(o(),o=null)}}}function Zc(t){this._internalRoot=t}ho.prototype.render=Zc.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(r(409));var n=e.current,s=Le();Sp(n,s,t,e,null,null)},ho.prototype.unmount=Zc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Sp(t.current,2,null,t,null,null),Pl(),e[Ya]=null}};function ho(t){this._internalRoot=t}ho.prototype.unstable_scheduleHydration=function(t){if(t){var e=Yd();t={blockedOn:null,target:t,priority:e};for(var n=0;n<na.length&&e!==0&&e<na[n].priority;n++);na.splice(n,0,t),n===0&&Mp(t)}};var Np=i.version;if(Np!=="19.2.0")throw Error(r(527,Np,"19.2.0"));H.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=v(e),t=t!==null?g(t):null,t=t===null?null:t.stateNode,t};var K1={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:N,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var po=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!po.isDisabled&&po.supportsFiber)try{Oi=po.inject(K1),ke=po}catch{}}return Ms.createRoot=function(t,e){if(!u(t))throw Error(r(299));var n=!1,s="",o=jm,c=Ym,f=qm;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(o=e.onUncaughtError),e.onCaughtError!==void 0&&(c=e.onCaughtError),e.onRecoverableError!==void 0&&(f=e.onRecoverableError)),e=Ap(t,1,!1,null,null,n,s,null,o,c,f,Rp),t[Ya]=e.current,Rc(t),new Zc(e)},Ms.hydrateRoot=function(t,e,n){if(!u(t))throw Error(r(299));var s=!1,o="",c=jm,f=Ym,y=qm,A=null;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError),n.formState!==void 0&&(A=n.formState)),e=Ap(t,1,!0,e,n??null,s,o,A,c,f,y,Rp),e.context=xp(null),n=e.current,s=Le(),s=Yo(s),o=qn(s),o.callback=null,Gn(n,o,s),n=s,e.current.lanes=n,Hi(e,n),cn(e),t[Ya]=e.current,Rc(t),new ho(e)},Ms.version="19.2.0",Ms}var Pp;function H2(){if(Pp)return iu.exports;Pp=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(i){console.error(i)}}return a(),iu.exports=V2(),iu.exports}var j2=H2(),ru={exports:{}},Ds={};var Kp;function Y2(){if(Kp)return Ds;Kp=1;var a=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function l(r,u,m){var d=null;if(m!==void 0&&(d=""+m),u.key!==void 0&&(d=""+u.key),"key"in u){m={};for(var p in u)p!=="key"&&(m[p]=u[p])}else m=u;return u=m.ref,{$$typeof:a,type:r,key:d,ref:u!==void 0?u:null,props:m}}return Ds.Fragment=i,Ds.jsx=l,Ds.jsxs=l,Ds}var Ip;function q2(){return Ip||(Ip=1,ru.exports=Y2()),ru.exports}var Oe=q2();const G2="/assets/NP_Logo2-CBvvdBwg.png",Q2="/assets/NP_WOrds-C6-da3Fb.png",kg=ct.createContext({});function F2(a){const i=ct.useRef(null);return i.current===null&&(i.current=a()),i.current}const Ku=typeof window<"u",J2=Ku?ct.useLayoutEffect:ct.useEffect,Iu=ct.createContext(null);function Zu(a,i){a.indexOf(i)===-1&&a.push(i)}function _u(a,i){const l=a.indexOf(i);l>-1&&a.splice(l,1)}const Rn=(a,i,l)=>l>i?i:l<a?a:l;let Wu=()=>{};const Nn={},Mg=a=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a);function Dg(a){return typeof a=="object"&&a!==null}const Bg=a=>/^0[^.\s]+$/u.test(a);function $u(a){let i;return()=>(i===void 0&&(i=a()),i)}const _e=a=>a,X2=(a,i)=>l=>i(a(l)),Ps=(...a)=>a.reduce(X2),qs=(a,i,l)=>{const r=i-a;return r===0?1:(l-a)/r};class td{constructor(){this.subscriptions=[]}add(i){return Zu(this.subscriptions,i),()=>_u(this.subscriptions,i)}notify(i,l,r){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](i,l,r);else for(let m=0;m<u;m++){const d=this.subscriptions[m];d&&d(i,l,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const un=a=>a*1e3,Ze=a=>a/1e3;function Rg(a,i){return i?a*(1e3/i):0}const Ng=(a,i,l)=>(((1-3*l+3*i)*a+(3*l-6*i))*a+3*i)*a,P2=1e-7,K2=12;function I2(a,i,l,r,u){let m,d,p=0;do d=i+(l-i)/2,m=Ng(d,r,u)-a,m>0?l=d:i=d;while(Math.abs(m)>P2&&++p<K2);return d}function Ks(a,i,l,r){if(a===i&&l===r)return _e;const u=m=>I2(m,0,1,a,l);return m=>m===0||m===1?m:Ng(u(m),i,r)}const Ug=a=>i=>i<=.5?a(2*i)/2:(2-a(2*(1-i)))/2,zg=a=>i=>1-a(1-i),Lg=Ks(.33,1.53,.69,.99),ed=zg(Lg),Og=Ug(ed),Vg=a=>(a*=2)<1?.5*ed(a):.5*(2-Math.pow(2,-10*(a-1))),nd=a=>1-Math.sin(Math.acos(a)),Hg=zg(nd),jg=Ug(nd),Z2=Ks(.42,0,1,1),_2=Ks(0,0,.58,1),Yg=Ks(.42,0,.58,1),W2=a=>Array.isArray(a)&&typeof a[0]!="number",qg=a=>Array.isArray(a)&&typeof a[0]=="number",$2={linear:_e,easeIn:Z2,easeInOut:Yg,easeOut:_2,circIn:nd,circInOut:jg,circOut:Hg,backIn:ed,backInOut:Og,backOut:Lg,anticipate:Vg},tA=a=>typeof a=="string",Zp=a=>{if(qg(a)){Wu(a.length===4);const[i,l,r,u]=a;return Ks(i,l,r,u)}else if(tA(a))return $2[a];return a},vo=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function eA(a,i){let l=new Set,r=new Set,u=!1,m=!1;const d=new WeakSet;let p={delta:0,timestamp:0,isProcessing:!1};function h(g){d.has(g)&&(v.schedule(g),a()),g(p)}const v={schedule:(g,b=!1,x=!1)=>{const Y=x&&u?l:r;return b&&d.add(g),Y.has(g)||Y.add(g),g},cancel:g=>{r.delete(g),d.delete(g)},process:g=>{if(p=g,u){m=!0;return}u=!0,[l,r]=[r,l],l.forEach(h),l.clear(),u=!1,m&&(m=!1,v.process(g))}};return v}const nA=40;function Gg(a,i){let l=!1,r=!0;const u={delta:0,timestamp:0,isProcessing:!1},m=()=>l=!0,d=vo.reduce((Q,at)=>(Q[at]=eA(m),Q),{}),{setup:p,read:h,resolveKeyframes:v,preUpdate:g,update:b,preRender:x,render:z,postRender:Y}=d,J=()=>{const Q=Nn.useManualTiming?u.timestamp:performance.now();l=!1,Nn.useManualTiming||(u.delta=r?1e3/60:Math.max(Math.min(Q-u.timestamp,nA),1)),u.timestamp=Q,u.isProcessing=!0,p.process(u),h.process(u),v.process(u),g.process(u),b.process(u),x.process(u),z.process(u),Y.process(u),u.isProcessing=!1,l&&i&&(r=!1,a(J))},X=()=>{l=!0,r=!0,u.isProcessing||a(J)};return{schedule:vo.reduce((Q,at)=>{const W=d[at];return Q[at]=(lt,$=!1,et=!1)=>(l||X(),W.schedule(lt,$,et)),Q},{}),cancel:Q=>{for(let at=0;at<vo.length;at++)d[vo[at]].cancel(Q)},state:u,steps:d}}const{schedule:Vt,cancel:ca,state:ue,steps:cu}=Gg(typeof requestAnimationFrame<"u"?requestAnimationFrame:_e,!0);let Ao;function aA(){Ao=void 0}const Ce={now:()=>(Ao===void 0&&Ce.set(ue.isProcessing||Nn.useManualTiming?ue.timestamp:performance.now()),Ao),set:a=>{Ao=a,queueMicrotask(aA)}},Qg=a=>i=>typeof i=="string"&&i.startsWith(a),ad=Qg("--"),iA=Qg("var(--"),id=a=>iA(a)?sA.test(a.split("/*")[0].trim()):!1,sA=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,Ni={test:a=>typeof a=="number",parse:parseFloat,transform:a=>a},Gs={...Ni,transform:a=>Rn(0,1,a)},go={...Ni,default:1},Us=a=>Math.round(a*1e5)/1e5,sd=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function lA(a){return a==null}const oA=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,ld=(a,i)=>l=>!!(typeof l=="string"&&oA.test(l)&&l.startsWith(a)||i&&!lA(l)&&Object.prototype.hasOwnProperty.call(l,i)),Fg=(a,i,l)=>r=>{if(typeof r!="string")return r;const[u,m,d,p]=r.match(sd);return{[a]:parseFloat(u),[i]:parseFloat(m),[l]:parseFloat(d),alpha:p!==void 0?parseFloat(p):1}},rA=a=>Rn(0,255,a),uu={...Ni,transform:a=>Math.round(rA(a))},La={test:ld("rgb","red"),parse:Fg("red","green","blue"),transform:({red:a,green:i,blue:l,alpha:r=1})=>"rgba("+uu.transform(a)+", "+uu.transform(i)+", "+uu.transform(l)+", "+Us(Gs.transform(r))+")"};function cA(a){let i="",l="",r="",u="";return a.length>5?(i=a.substring(1,3),l=a.substring(3,5),r=a.substring(5,7),u=a.substring(7,9)):(i=a.substring(1,2),l=a.substring(2,3),r=a.substring(3,4),u=a.substring(4,5),i+=i,l+=l,r+=r,u+=u),{red:parseInt(i,16),green:parseInt(l,16),blue:parseInt(r,16),alpha:u?parseInt(u,16)/255:1}}const Tu={test:ld("#"),parse:cA,transform:La.transform},Is=a=>({test:i=>typeof i=="string"&&i.endsWith(a)&&i.split(" ").length===1,parse:parseFloat,transform:i=>`${i}${a}`}),sa=Is("deg"),dn=Is("%"),it=Is("px"),uA=Is("vh"),dA=Is("vw"),_p={...dn,parse:a=>dn.parse(a)/100,transform:a=>dn.transform(a*100)},Ti={test:ld("hsl","hue"),parse:Fg("hue","saturation","lightness"),transform:({hue:a,saturation:i,lightness:l,alpha:r=1})=>"hsla("+Math.round(a)+", "+dn.transform(Us(i))+", "+dn.transform(Us(l))+", "+Us(Gs.transform(r))+")"},Wt={test:a=>La.test(a)||Tu.test(a)||Ti.test(a),parse:a=>La.test(a)?La.parse(a):Ti.test(a)?Ti.parse(a):Tu.parse(a),transform:a=>typeof a=="string"?a:a.hasOwnProperty("red")?La.transform(a):Ti.transform(a),getAnimatableNone:a=>{const i=Wt.parse(a);return i.alpha=0,Wt.transform(i)}},fA=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function mA(a){return isNaN(a)&&typeof a=="string"&&(a.match(sd)?.length||0)+(a.match(fA)?.length||0)>0}const Jg="number",Xg="color",hA="var",pA="var(",Wp="${}",vA=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Qs(a){const i=a.toString(),l=[],r={color:[],number:[],var:[]},u=[];let m=0;const p=i.replace(vA,h=>(Wt.test(h)?(r.color.push(m),u.push(Xg),l.push(Wt.parse(h))):h.startsWith(pA)?(r.var.push(m),u.push(hA),l.push(h)):(r.number.push(m),u.push(Jg),l.push(parseFloat(h))),++m,Wp)).split(Wp);return{values:l,split:p,indexes:r,types:u}}function Pg(a){return Qs(a).values}function Kg(a){const{split:i,types:l}=Qs(a),r=i.length;return u=>{let m="";for(let d=0;d<r;d++)if(m+=i[d],u[d]!==void 0){const p=l[d];p===Jg?m+=Us(u[d]):p===Xg?m+=Wt.transform(u[d]):m+=u[d]}return m}}const gA=a=>typeof a=="number"?0:Wt.test(a)?Wt.getAnimatableNone(a):a;function yA(a){const i=Pg(a);return Kg(a)(i.map(gA))}const ua={test:mA,parse:Pg,createTransformer:Kg,getAnimatableNone:yA};function du(a,i,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?a+(i-a)*6*l:l<1/2?i:l<2/3?a+(i-a)*(2/3-l)*6:a}function bA({hue:a,saturation:i,lightness:l,alpha:r}){a/=360,i/=100,l/=100;let u=0,m=0,d=0;if(!i)u=m=d=l;else{const p=l<.5?l*(1+i):l+i-l*i,h=2*l-p;u=du(h,p,a+1/3),m=du(h,p,a),d=du(h,p,a-1/3)}return{red:Math.round(u*255),green:Math.round(m*255),blue:Math.round(d*255),alpha:r}}function Co(a,i){return l=>l>0?i:a}const jt=(a,i,l)=>a+(i-a)*l,fu=(a,i,l)=>{const r=a*a,u=l*(i*i-r)+r;return u<0?0:Math.sqrt(u)},AA=[Tu,La,Ti],xA=a=>AA.find(i=>i.test(a));function $p(a){const i=xA(a);if(!i)return!1;let l=i.parse(a);return i===Ti&&(l=bA(l)),l}const tv=(a,i)=>{const l=$p(a),r=$p(i);if(!l||!r)return Co(a,i);const u={...l};return m=>(u.red=fu(l.red,r.red,m),u.green=fu(l.green,r.green,m),u.blue=fu(l.blue,r.blue,m),u.alpha=jt(l.alpha,r.alpha,m),La.transform(u))},Cu=new Set(["none","hidden"]);function SA(a,i){return Cu.has(a)?l=>l<=0?a:i:l=>l>=1?i:a}function wA(a,i){return l=>jt(a,i,l)}function od(a){return typeof a=="number"?wA:typeof a=="string"?id(a)?Co:Wt.test(a)?tv:EA:Array.isArray(a)?Ig:typeof a=="object"?Wt.test(a)?tv:TA:Co}function Ig(a,i){const l=[...a],r=l.length,u=a.map((m,d)=>od(m)(m,i[d]));return m=>{for(let d=0;d<r;d++)l[d]=u[d](m);return l}}function TA(a,i){const l={...a,...i},r={};for(const u in l)a[u]!==void 0&&i[u]!==void 0&&(r[u]=od(a[u])(a[u],i[u]));return u=>{for(const m in r)l[m]=r[m](u);return l}}function CA(a,i){const l=[],r={color:0,var:0,number:0};for(let u=0;u<i.values.length;u++){const m=i.types[u],d=a.indexes[m][r[m]],p=a.values[d]??0;l[u]=p,r[m]++}return l}const EA=(a,i)=>{const l=ua.createTransformer(i),r=Qs(a),u=Qs(i);return r.indexes.var.length===u.indexes.var.length&&r.indexes.color.length===u.indexes.color.length&&r.indexes.number.length>=u.indexes.number.length?Cu.has(a)&&!u.values.length||Cu.has(i)&&!r.values.length?SA(a,i):Ps(Ig(CA(r,u),u.values),l):Co(a,i)};function Zg(a,i,l){return typeof a=="number"&&typeof i=="number"&&typeof l=="number"?jt(a,i,l):od(a)(a,i)}const kA=a=>{const i=({timestamp:l})=>a(l);return{start:(l=!0)=>Vt.update(i,l),stop:()=>ca(i),now:()=>ue.isProcessing?ue.timestamp:Ce.now()}},_g=(a,i,l=10)=>{let r="";const u=Math.max(Math.round(i/l),2);for(let m=0;m<u;m++)r+=Math.round(a(m/(u-1))*1e4)/1e4+", ";return`linear(${r.substring(0,r.length-2)})`},Eo=2e4;function rd(a){let i=0;const l=50;let r=a.next(i);for(;!r.done&&i<Eo;)i+=l,r=a.next(i);return i>=Eo?1/0:i}function MA(a,i=100,l){const r=l({...a,keyframes:[0,i]}),u=Math.min(rd(r),Eo);return{type:"keyframes",ease:m=>r.next(u*m).value/i,duration:Ze(u)}}const DA=5;function Wg(a,i,l){const r=Math.max(i-DA,0);return Rg(l-a(r),i-r)}const Gt={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},mu=.001;function BA({duration:a=Gt.duration,bounce:i=Gt.bounce,velocity:l=Gt.velocity,mass:r=Gt.mass}){let u,m,d=1-i;d=Rn(Gt.minDamping,Gt.maxDamping,d),a=Rn(Gt.minDuration,Gt.maxDuration,Ze(a)),d<1?(u=v=>{const g=v*d,b=g*a,x=g-l,z=Eu(v,d),Y=Math.exp(-b);return mu-x/z*Y},m=v=>{const b=v*d*a,x=b*l+l,z=Math.pow(d,2)*Math.pow(v,2)*a,Y=Math.exp(-b),J=Eu(Math.pow(v,2),d);return(-u(v)+mu>0?-1:1)*((x-z)*Y)/J}):(u=v=>{const g=Math.exp(-v*a),b=(v-l)*a+1;return-mu+g*b},m=v=>{const g=Math.exp(-v*a),b=(l-v)*(a*a);return g*b});const p=5/a,h=NA(u,m,p);if(a=un(a),isNaN(h))return{stiffness:Gt.stiffness,damping:Gt.damping,duration:a};{const v=Math.pow(h,2)*r;return{stiffness:v,damping:d*2*Math.sqrt(r*v),duration:a}}}const RA=12;function NA(a,i,l){let r=l;for(let u=1;u<RA;u++)r=r-a(r)/i(r);return r}function Eu(a,i){return a*Math.sqrt(1-i*i)}const UA=["duration","bounce"],zA=["stiffness","damping","mass"];function ev(a,i){return i.some(l=>a[l]!==void 0)}function LA(a){let i={velocity:Gt.velocity,stiffness:Gt.stiffness,damping:Gt.damping,mass:Gt.mass,isResolvedFromDuration:!1,...a};if(!ev(a,zA)&&ev(a,UA))if(a.visualDuration){const l=a.visualDuration,r=2*Math.PI/(l*1.2),u=r*r,m=2*Rn(.05,1,1-(a.bounce||0))*Math.sqrt(u);i={...i,mass:Gt.mass,stiffness:u,damping:m}}else{const l=BA(a);i={...i,...l,mass:Gt.mass},i.isResolvedFromDuration=!0}return i}function ko(a=Gt.visualDuration,i=Gt.bounce){const l=typeof a!="object"?{visualDuration:a,keyframes:[0,1],bounce:i}:a;let{restSpeed:r,restDelta:u}=l;const m=l.keyframes[0],d=l.keyframes[l.keyframes.length-1],p={done:!1,value:m},{stiffness:h,damping:v,mass:g,duration:b,velocity:x,isResolvedFromDuration:z}=LA({...l,velocity:-Ze(l.velocity||0)}),Y=x||0,J=v/(2*Math.sqrt(h*g)),X=d-m,G=Ze(Math.sqrt(h/g)),I=Math.abs(X)<5;r||(r=I?Gt.restSpeed.granular:Gt.restSpeed.default),u||(u=I?Gt.restDelta.granular:Gt.restDelta.default);let Q;if(J<1){const W=Eu(G,J);Q=lt=>{const $=Math.exp(-J*G*lt);return d-$*((Y+J*G*X)/W*Math.sin(W*lt)+X*Math.cos(W*lt))}}else if(J===1)Q=W=>d-Math.exp(-G*W)*(X+(Y+G*X)*W);else{const W=G*Math.sqrt(J*J-1);Q=lt=>{const $=Math.exp(-J*G*lt),et=Math.min(W*lt,300);return d-$*((Y+J*G*X)*Math.sinh(et)+W*X*Math.cosh(et))/W}}const at={calculatedDuration:z&&b||null,next:W=>{const lt=Q(W);if(z)p.done=W>=b;else{let $=W===0?Y:0;J<1&&($=W===0?un(Y):Wg(Q,W,lt));const et=Math.abs($)<=r,Et=Math.abs(d-lt)<=u;p.done=et&&Et}return p.value=p.done?d:lt,p},toString:()=>{const W=Math.min(rd(at),Eo),lt=_g($=>at.next(W*$).value,W,30);return W+"ms "+lt},toTransition:()=>{}};return at}ko.applyToOptions=a=>{const i=MA(a,100,ko);return a.ease=i.ease,a.duration=un(i.duration),a.type="keyframes",a};function ku({keyframes:a,velocity:i=0,power:l=.8,timeConstant:r=325,bounceDamping:u=10,bounceStiffness:m=500,modifyTarget:d,min:p,max:h,restDelta:v=.5,restSpeed:g}){const b=a[0],x={done:!1,value:b},z=et=>p!==void 0&&et<p||h!==void 0&&et>h,Y=et=>p===void 0?h:h===void 0||Math.abs(p-et)<Math.abs(h-et)?p:h;let J=l*i;const X=b+J,G=d===void 0?X:d(X);G!==X&&(J=G-b);const I=et=>-J*Math.exp(-et/r),Q=et=>G+I(et),at=et=>{const Et=I(et),Ht=Q(et);x.done=Math.abs(Et)<=v,x.value=x.done?G:Ht};let W,lt;const $=et=>{z(x.value)&&(W=et,lt=ko({keyframes:[x.value,Y(x.value)],velocity:Wg(Q,et,x.value),damping:u,stiffness:m,restDelta:v,restSpeed:g}))};return $(0),{calculatedDuration:null,next:et=>{let Et=!1;return!lt&&W===void 0&&(Et=!0,at(et),$(et)),W!==void 0&&et>=W?lt.next(et-W):(!Et&&at(et),x)}}}function OA(a,i,l){const r=[],u=l||Nn.mix||Zg,m=a.length-1;for(let d=0;d<m;d++){let p=u(a[d],a[d+1]);if(i){const h=Array.isArray(i)?i[d]||_e:i;p=Ps(h,p)}r.push(p)}return r}function VA(a,i,{clamp:l=!0,ease:r,mixer:u}={}){const m=a.length;if(Wu(m===i.length),m===1)return()=>i[0];if(m===2&&i[0]===i[1])return()=>i[1];const d=a[0]===a[1];a[0]>a[m-1]&&(a=[...a].reverse(),i=[...i].reverse());const p=OA(i,r,u),h=p.length,v=g=>{if(d&&g<a[0])return i[0];let b=0;if(h>1)for(;b<a.length-2&&!(g<a[b+1]);b++);const x=qs(a[b],a[b+1],g);return p[b](x)};return l?g=>v(Rn(a[0],a[m-1],g)):v}function HA(a,i){const l=a[a.length-1];for(let r=1;r<=i;r++){const u=qs(0,i,r);a.push(jt(l,1,u))}}function jA(a){const i=[0];return HA(i,a.length-1),i}function YA(a,i){return a.map(l=>l*i)}function qA(a,i){return a.map(()=>i||Yg).splice(0,a.length-1)}function zs({duration:a=300,keyframes:i,times:l,ease:r="easeInOut"}){const u=W2(r)?r.map(Zp):Zp(r),m={done:!1,value:i[0]},d=YA(l&&l.length===i.length?l:jA(i),a),p=VA(d,i,{ease:Array.isArray(u)?u:qA(i,u)});return{calculatedDuration:a,next:h=>(m.value=p(h),m.done=h>=a,m)}}const GA=a=>a!==null;function cd(a,{repeat:i,repeatType:l="loop"},r,u=1){const m=a.filter(GA),p=u<0||i&&l!=="loop"&&i%2===1?0:m.length-1;return!p||r===void 0?m[p]:r}const QA={decay:ku,inertia:ku,tween:zs,keyframes:zs,spring:ko};function $g(a){typeof a.type=="string"&&(a.type=QA[a.type])}class ud{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(i=>{this.resolve=i})}notifyFinished(){this.resolve()}then(i,l){return this.finished.then(i,l)}}const FA=a=>a/100;class dd extends ud{constructor(i){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=()=>{const{motionValue:l}=this.options;l&&l.updatedAt!==Ce.now()&&this.tick(Ce.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=i,this.initAnimation(),this.play(),i.autoplay===!1&&this.pause()}initAnimation(){const{options:i}=this;$g(i);const{type:l=zs,repeat:r=0,repeatDelay:u=0,repeatType:m,velocity:d=0}=i;let{keyframes:p}=i;const h=l||zs;h!==zs&&typeof p[0]!="number"&&(this.mixKeyframes=Ps(FA,Zg(p[0],p[1])),p=[0,100]);const v=h({...i,keyframes:p});m==="mirror"&&(this.mirroredGenerator=h({...i,keyframes:[...p].reverse(),velocity:-d})),v.calculatedDuration===null&&(v.calculatedDuration=rd(v));const{calculatedDuration:g}=v;this.calculatedDuration=g,this.resolvedDuration=g+u,this.totalDuration=this.resolvedDuration*(r+1)-u,this.generator=v}updateTime(i){const l=Math.round(i-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=l}tick(i,l=!1){const{generator:r,totalDuration:u,mixKeyframes:m,mirroredGenerator:d,resolvedDuration:p,calculatedDuration:h}=this;if(this.startTime===null)return r.next(0);const{delay:v=0,keyframes:g,repeat:b,repeatType:x,repeatDelay:z,type:Y,onUpdate:J,finalKeyframe:X}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,i):this.speed<0&&(this.startTime=Math.min(i-u/this.speed,this.startTime)),l?this.currentTime=i:this.updateTime(i);const G=this.currentTime-v*(this.playbackSpeed>=0?1:-1),I=this.playbackSpeed>=0?G<0:G>u;this.currentTime=Math.max(G,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let Q=this.currentTime,at=r;if(b){const et=Math.min(this.currentTime,u)/p;let Et=Math.floor(et),Ht=et%1;!Ht&&et>=1&&(Ht=1),Ht===1&&Et--,Et=Math.min(Et,b+1),!!(Et%2)&&(x==="reverse"?(Ht=1-Ht,z&&(Ht-=z/p)):x==="mirror"&&(at=d)),Q=Rn(0,1,Ht)*p}const W=I?{done:!1,value:g[0]}:at.next(Q);m&&(W.value=m(W.value));let{done:lt}=W;!I&&h!==null&&(lt=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const $=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&lt);return $&&Y!==ku&&(W.value=cd(g,this.options,X,this.speed)),J&&J(W.value),$&&this.finish(),W}then(i,l){return this.finished.then(i,l)}get duration(){return Ze(this.calculatedDuration)}get iterationDuration(){const{delay:i=0}=this.options||{};return this.duration+Ze(i)}get time(){return Ze(this.currentTime)}set time(i){i=un(i),this.currentTime=i,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=i:this.driver&&(this.startTime=this.driver.now()-i/this.playbackSpeed),this.driver?.start(!1)}get speed(){return this.playbackSpeed}set speed(i){this.updateTime(Ce.now());const l=this.playbackSpeed!==i;this.playbackSpeed=i,l&&(this.time=Ze(this.currentTime))}play(){if(this.isStopped)return;const{driver:i=kA,startTime:l}=this.options;this.driver||(this.driver=i(u=>this.tick(u))),this.options.onPlay?.();const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=l??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(Ce.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(i){return this.startTime=0,this.tick(i,!0)}attachTimeline(i){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),i.observe(this)}}function JA(a){for(let i=1;i<a.length;i++)a[i]??(a[i]=a[i-1])}const Oa=a=>a*180/Math.PI,Mu=a=>{const i=Oa(Math.atan2(a[1],a[0]));return Du(i)},XA={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:a=>(Math.abs(a[0])+Math.abs(a[3]))/2,rotate:Mu,rotateZ:Mu,skewX:a=>Oa(Math.atan(a[1])),skewY:a=>Oa(Math.atan(a[2])),skew:a=>(Math.abs(a[1])+Math.abs(a[2]))/2},Du=a=>(a=a%360,a<0&&(a+=360),a),nv=Mu,av=a=>Math.sqrt(a[0]*a[0]+a[1]*a[1]),iv=a=>Math.sqrt(a[4]*a[4]+a[5]*a[5]),PA={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:av,scaleY:iv,scale:a=>(av(a)+iv(a))/2,rotateX:a=>Du(Oa(Math.atan2(a[6],a[5]))),rotateY:a=>Du(Oa(Math.atan2(-a[2],a[0]))),rotateZ:nv,rotate:nv,skewX:a=>Oa(Math.atan(a[4])),skewY:a=>Oa(Math.atan(a[1])),skew:a=>(Math.abs(a[1])+Math.abs(a[4]))/2};function Bu(a){return a.includes("scale")?1:0}function Ru(a,i){if(!a||a==="none")return Bu(i);const l=a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let r,u;if(l)r=PA,u=l;else{const p=a.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=XA,u=p}if(!u)return Bu(i);const m=r[i],d=u[1].split(",").map(IA);return typeof m=="function"?m(d):d[m]}const KA=(a,i)=>{const{transform:l="none"}=getComputedStyle(a);return Ru(l,i)};function IA(a){return parseFloat(a.trim())}const Ui=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],zi=new Set(Ui),sv=a=>a===Ni||a===it,ZA=new Set(["x","y","z"]),_A=Ui.filter(a=>!ZA.has(a));function WA(a){const i=[];return _A.forEach(l=>{const r=a.getValue(l);r!==void 0&&(i.push([l,r.get()]),r.set(l.startsWith("scale")?1:0))}),i}const Va={width:({x:a},{paddingLeft:i="0",paddingRight:l="0"})=>a.max-a.min-parseFloat(i)-parseFloat(l),height:({y:a},{paddingTop:i="0",paddingBottom:l="0"})=>a.max-a.min-parseFloat(i)-parseFloat(l),top:(a,{top:i})=>parseFloat(i),left:(a,{left:i})=>parseFloat(i),bottom:({y:a},{top:i})=>parseFloat(i)+(a.max-a.min),right:({x:a},{left:i})=>parseFloat(i)+(a.max-a.min),x:(a,{transform:i})=>Ru(i,"x"),y:(a,{transform:i})=>Ru(i,"y")};Va.translateX=Va.x;Va.translateY=Va.y;const Ha=new Set;let Nu=!1,Uu=!1,zu=!1;function t0(){if(Uu){const a=Array.from(Ha).filter(r=>r.needsMeasurement),i=new Set(a.map(r=>r.element)),l=new Map;i.forEach(r=>{const u=WA(r);u.length&&(l.set(r,u),r.render())}),a.forEach(r=>r.measureInitialState()),i.forEach(r=>{r.render();const u=l.get(r);u&&u.forEach(([m,d])=>{r.getValue(m)?.set(d)})}),a.forEach(r=>r.measureEndState()),a.forEach(r=>{r.suspendedScrollY!==void 0&&window.scrollTo(0,r.suspendedScrollY)})}Uu=!1,Nu=!1,Ha.forEach(a=>a.complete(zu)),Ha.clear()}function e0(){Ha.forEach(a=>{a.readKeyframes(),a.needsMeasurement&&(Uu=!0)})}function $A(){zu=!0,e0(),t0(),zu=!1}class fd{constructor(i,l,r,u,m,d=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...i],this.onComplete=l,this.name=r,this.motionValue=u,this.element=m,this.isAsync=d}scheduleResolve(){this.state="scheduled",this.isAsync?(Ha.add(this),Nu||(Nu=!0,Vt.read(e0),Vt.resolveKeyframes(t0))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:i,name:l,element:r,motionValue:u}=this;if(i[0]===null){const m=u?.get(),d=i[i.length-1];if(m!==void 0)i[0]=m;else if(r&&l){const p=r.readValue(l,d);p!=null&&(i[0]=p)}i[0]===void 0&&(i[0]=d),u&&m===void 0&&u.set(i[0])}JA(i)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(i=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,i),Ha.delete(this)}cancel(){this.state==="scheduled"&&(Ha.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const tx=a=>a.startsWith("--");function ex(a,i,l){tx(i)?a.style.setProperty(i,l):a.style[i]=l}const nx=$u(()=>window.ScrollTimeline!==void 0),ax={};function ix(a,i){const l=$u(a);return()=>ax[i]??l()}const n0=ix(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Rs=([a,i,l,r])=>`cubic-bezier(${a}, ${i}, ${l}, ${r})`,lv={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Rs([0,.65,.55,1]),circOut:Rs([.55,0,1,.45]),backIn:Rs([.31,.01,.66,-.59]),backOut:Rs([.33,1.53,.69,.99])};function a0(a,i){if(a)return typeof a=="function"?n0()?_g(a,i):"ease-out":qg(a)?Rs(a):Array.isArray(a)?a.map(l=>a0(l,i)||lv.easeOut):lv[a]}function sx(a,i,l,{delay:r=0,duration:u=300,repeat:m=0,repeatType:d="loop",ease:p="easeOut",times:h}={},v=void 0){const g={[i]:l};h&&(g.offset=h);const b=a0(p,u);Array.isArray(b)&&(g.easing=b);const x={delay:r,duration:u,easing:Array.isArray(b)?"linear":b,fill:"both",iterations:m+1,direction:d==="reverse"?"alternate":"normal"};return v&&(x.pseudoElement=v),a.animate(g,x)}function i0(a){return typeof a=="function"&&"applyToOptions"in a}function lx({type:a,...i}){return i0(a)&&n0()?a.applyToOptions(i):(i.duration??(i.duration=300),i.ease??(i.ease="easeOut"),i)}class ox extends ud{constructor(i){if(super(),this.finishedTime=null,this.isStopped=!1,!i)return;const{element:l,name:r,keyframes:u,pseudoElement:m,allowFlatten:d=!1,finalKeyframe:p,onComplete:h}=i;this.isPseudoElement=!!m,this.allowFlatten=d,this.options=i,Wu(typeof i.type!="string");const v=lx(i);this.animation=sx(l,r,u,v,m),v.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!m){const g=cd(u,this.options,p,this.speed);this.updateMotionValue?this.updateMotionValue(g):ex(l,r,g),this.animation.cancel()}h?.(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:i}=this;i==="idle"||i==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){this.isPseudoElement||this.animation.commitStyles?.()}get duration(){const i=this.animation.effect?.getComputedTiming?.().duration||0;return Ze(Number(i))}get iterationDuration(){const{delay:i=0}=this.options||{};return this.duration+Ze(i)}get time(){return Ze(Number(this.animation.currentTime)||0)}set time(i){this.finishedTime=null,this.animation.currentTime=un(i)}get speed(){return this.animation.playbackRate}set speed(i){i<0&&(this.finishedTime=null),this.animation.playbackRate=i}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(i){this.animation.startTime=i}attachTimeline({timeline:i,observe:l}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,i&&nx()?(this.animation.timeline=i,_e):l(this)}}const s0={anticipate:Vg,backInOut:Og,circInOut:jg};function rx(a){return a in s0}function cx(a){typeof a.ease=="string"&&rx(a.ease)&&(a.ease=s0[a.ease])}const ov=10;class ux extends ox{constructor(i){cx(i),$g(i),super(i),i.startTime&&(this.startTime=i.startTime),this.options=i}updateMotionValue(i){const{motionValue:l,onUpdate:r,onComplete:u,element:m,...d}=this.options;if(!l)return;if(i!==void 0){l.set(i);return}const p=new dd({...d,autoplay:!1}),h=un(this.finishedTime??this.time);l.setWithVelocity(p.sample(h-ov).value,p.sample(h).value,ov),p.stop()}}const rv=(a,i)=>i==="zIndex"?!1:!!(typeof a=="number"||Array.isArray(a)||typeof a=="string"&&(ua.test(a)||a==="0")&&!a.startsWith("url("));function dx(a){const i=a[0];if(a.length===1)return!0;for(let l=0;l<a.length;l++)if(a[l]!==i)return!0}function fx(a,i,l,r){const u=a[0];if(u===null)return!1;if(i==="display"||i==="visibility")return!0;const m=a[a.length-1],d=rv(u,i),p=rv(m,i);return!d||!p?!1:dx(a)||(l==="spring"||i0(l))&&r}function Lu(a){a.duration=0,a.type="keyframes"}const mx=new Set(["opacity","clipPath","filter","transform"]),hx=$u(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function px(a){const{motionValue:i,name:l,repeatDelay:r,repeatType:u,damping:m,type:d}=a;if(!(i?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:h,transformTemplate:v}=i.owner.getProps();return hx()&&l&&mx.has(l)&&(l!=="transform"||!v)&&!h&&!r&&u!=="mirror"&&m!==0&&d!=="inertia"}const vx=40;class gx extends ud{constructor({autoplay:i=!0,delay:l=0,type:r="keyframes",repeat:u=0,repeatDelay:m=0,repeatType:d="loop",keyframes:p,name:h,motionValue:v,element:g,...b}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=Ce.now();const x={autoplay:i,delay:l,type:r,repeat:u,repeatDelay:m,repeatType:d,name:h,motionValue:v,element:g,...b},z=g?.KeyframeResolver||fd;this.keyframeResolver=new z(p,(Y,J,X)=>this.onKeyframesResolved(Y,J,x,!X),h,v,g),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(i,l,r,u){this.keyframeResolver=void 0;const{name:m,type:d,velocity:p,delay:h,isHandoff:v,onUpdate:g}=r;this.resolvedAt=Ce.now(),fx(i,m,d,p)||((Nn.instantAnimations||!h)&&g?.(cd(i,r,l)),i[0]=i[i.length-1],Lu(r),r.repeat=0);const x={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>vx?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:l,...r,keyframes:i},z=!v&&px(x)?new ux({...x,element:x.motionValue.owner.current}):new dd(x);z.finished.then(()=>this.notifyFinished()).catch(_e),this.pendingTimeline&&(this.stopTimeline=z.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=z}get finished(){return this._animation?this.animation.finished:this._finished}then(i,l){return this.finished.finally(i).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),$A()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(i){this.animation.time=i}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(i){this.animation.speed=i}get startTime(){return this.animation.startTime}attachTimeline(i){return this._animation?this.stopTimeline=this.animation.attachTimeline(i):this.pendingTimeline=i,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}const yx=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function bx(a){const i=yx.exec(a);if(!i)return[,];const[,l,r,u]=i;return[`--${l??r}`,u]}function l0(a,i,l=1){const[r,u]=bx(a);if(!r)return;const m=window.getComputedStyle(i).getPropertyValue(r);if(m){const d=m.trim();return Mg(d)?parseFloat(d):d}return id(u)?l0(u,i,l+1):u}function md(a,i){return a?.[i]??a?.default??a}const o0=new Set(["width","height","top","left","right","bottom",...Ui]),Ax={test:a=>a==="auto",parse:a=>a},r0=a=>i=>i.test(a),c0=[Ni,it,dn,sa,dA,uA,Ax],cv=a=>c0.find(r0(a));function xx(a){return typeof a=="number"?a===0:a!==null?a==="none"||a==="0"||Bg(a):!0}const Sx=new Set(["brightness","contrast","saturate","opacity"]);function wx(a){const[i,l]=a.slice(0,-1).split("(");if(i==="drop-shadow")return a;const[r]=l.match(sd)||[];if(!r)return a;const u=l.replace(r,"");let m=Sx.has(i)?1:0;return r!==l&&(m*=100),i+"("+m+u+")"}const Tx=/\b([a-z-]*)\(.*?\)/gu,Ou={...ua,getAnimatableNone:a=>{const i=a.match(Tx);return i?i.map(wx).join(" "):a}},uv={...Ni,transform:Math.round},Cx={rotate:sa,rotateX:sa,rotateY:sa,rotateZ:sa,scale:go,scaleX:go,scaleY:go,scaleZ:go,skew:sa,skewX:sa,skewY:sa,distance:it,translateX:it,translateY:it,translateZ:it,x:it,y:it,z:it,perspective:it,transformPerspective:it,opacity:Gs,originX:_p,originY:_p,originZ:it},hd={borderWidth:it,borderTopWidth:it,borderRightWidth:it,borderBottomWidth:it,borderLeftWidth:it,borderRadius:it,radius:it,borderTopLeftRadius:it,borderTopRightRadius:it,borderBottomRightRadius:it,borderBottomLeftRadius:it,width:it,maxWidth:it,height:it,maxHeight:it,top:it,right:it,bottom:it,left:it,padding:it,paddingTop:it,paddingRight:it,paddingBottom:it,paddingLeft:it,margin:it,marginTop:it,marginRight:it,marginBottom:it,marginLeft:it,backgroundPositionX:it,backgroundPositionY:it,...Cx,zIndex:uv,fillOpacity:Gs,strokeOpacity:Gs,numOctaves:uv},Ex={...hd,color:Wt,backgroundColor:Wt,outlineColor:Wt,fill:Wt,stroke:Wt,borderColor:Wt,borderTopColor:Wt,borderRightColor:Wt,borderBottomColor:Wt,borderLeftColor:Wt,filter:Ou,WebkitFilter:Ou},u0=a=>Ex[a];function d0(a,i){let l=u0(a);return l!==Ou&&(l=ua),l.getAnimatableNone?l.getAnimatableNone(i):void 0}const kx=new Set(["auto","none","0"]);function Mx(a,i,l){let r=0,u;for(;r<a.length&&!u;){const m=a[r];typeof m=="string"&&!kx.has(m)&&Qs(m).values.length&&(u=a[r]),r++}if(u&&l)for(const m of i)a[m]=d0(l,u)}class Dx extends fd{constructor(i,l,r,u,m){super(i,l,r,u,m,!0)}readKeyframes(){const{unresolvedKeyframes:i,element:l,name:r}=this;if(!l||!l.current)return;super.readKeyframes();for(let h=0;h<i.length;h++){let v=i[h];if(typeof v=="string"&&(v=v.trim(),id(v))){const g=l0(v,l.current);g!==void 0&&(i[h]=g),h===i.length-1&&(this.finalKeyframe=v)}}if(this.resolveNoneKeyframes(),!o0.has(r)||i.length!==2)return;const[u,m]=i,d=cv(u),p=cv(m);if(d!==p)if(sv(d)&&sv(p))for(let h=0;h<i.length;h++){const v=i[h];typeof v=="string"&&(i[h]=parseFloat(v))}else Va[r]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:i,name:l}=this,r=[];for(let u=0;u<i.length;u++)(i[u]===null||xx(i[u]))&&r.push(u);r.length&&Mx(i,r,l)}measureInitialState(){const{element:i,unresolvedKeyframes:l,name:r}=this;if(!i||!i.current)return;r==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Va[r](i.measureViewportBox(),window.getComputedStyle(i.current)),l[0]=this.measuredOrigin;const u=l[l.length-1];u!==void 0&&i.getValue(r,u).jump(u,!1)}measureEndState(){const{element:i,name:l,unresolvedKeyframes:r}=this;if(!i||!i.current)return;const u=i.getValue(l);u&&u.jump(this.measuredOrigin,!1);const m=r.length-1,d=r[m];r[m]=Va[l](i.measureViewportBox(),window.getComputedStyle(i.current)),d!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=d),this.removedTransforms?.length&&this.removedTransforms.forEach(([p,h])=>{i.getValue(p).set(h)}),this.resolveNoneKeyframes()}}function Bx(a,i,l){if(a instanceof EventTarget)return[a];if(typeof a=="string"){let r=document;const u=l?.[a]??r.querySelectorAll(a);return u?Array.from(u):[]}return Array.from(a)}const f0=(a,i)=>i&&typeof a=="number"?i.transform(a):a;function Rx(a){return Dg(a)&&"offsetHeight"in a}const dv=30,Nx=a=>!isNaN(parseFloat(a));class Ux{constructor(i,l={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=r=>{const u=Ce.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const m of this.dependents)m.dirty()},this.hasAnimated=!1,this.setCurrent(i),this.owner=l.owner}setCurrent(i){this.current=i,this.updatedAt=Ce.now(),this.canTrackVelocity===null&&i!==void 0&&(this.canTrackVelocity=Nx(this.current))}setPrevFrameValue(i=this.current){this.prevFrameValue=i,this.prevUpdatedAt=this.updatedAt}onChange(i){return this.on("change",i)}on(i,l){this.events[i]||(this.events[i]=new td);const r=this.events[i].add(l);return i==="change"?()=>{r(),Vt.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const i in this.events)this.events[i].clear()}attach(i,l){this.passiveEffect=i,this.stopPassiveEffect=l}set(i){this.passiveEffect?this.passiveEffect(i,this.updateAndNotify):this.updateAndNotify(i)}setWithVelocity(i,l,r){this.set(l),this.prev=void 0,this.prevFrameValue=i,this.prevUpdatedAt=this.updatedAt-r}jump(i,l=!0){this.updateAndNotify(i),this.prev=i,this.prevUpdatedAt=this.prevFrameValue=void 0,l&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(i){this.dependents||(this.dependents=new Set),this.dependents.add(i)}removeDependent(i){this.dependents&&this.dependents.delete(i)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const i=Ce.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||i-this.updatedAt>dv)return 0;const l=Math.min(this.updatedAt-this.prevUpdatedAt,dv);return Rg(parseFloat(this.current)-parseFloat(this.prevFrameValue),l)}start(i){return this.stop(),new Promise(l=>{this.hasAnimated=!0,this.animation=i(l),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Bi(a,i){return new Ux(a,i)}const{schedule:pd}=Gg(queueMicrotask,!1),an={x:!1,y:!1};function m0(){return an.x||an.y}function zx(a){return a==="x"||a==="y"?an[a]?null:(an[a]=!0,()=>{an[a]=!1}):an.x||an.y?null:(an.x=an.y=!0,()=>{an.x=an.y=!1})}function h0(a,i){const l=Bx(a),r=new AbortController,u={passive:!0,...i,signal:r.signal};return[l,u,()=>r.abort()]}function fv(a){return!(a.pointerType==="touch"||m0())}function Lx(a,i,l={}){const[r,u,m]=h0(a,l),d=p=>{if(!fv(p))return;const{target:h}=p,v=i(h,p);if(typeof v!="function"||!h)return;const g=b=>{fv(b)&&(v(b),h.removeEventListener("pointerleave",g))};h.addEventListener("pointerleave",g,u)};return r.forEach(p=>{p.addEventListener("pointerenter",d,u)}),m}const p0=(a,i)=>i?a===i?!0:p0(a,i.parentElement):!1,vd=a=>a.pointerType==="mouse"?typeof a.button!="number"||a.button<=0:a.isPrimary!==!1,Ox=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Vx(a){return Ox.has(a.tagName)||a.tabIndex!==-1}const xo=new WeakSet;function mv(a){return i=>{i.key==="Enter"&&a(i)}}function hu(a,i){a.dispatchEvent(new PointerEvent("pointer"+i,{isPrimary:!0,bubbles:!0}))}const Hx=(a,i)=>{const l=a.currentTarget;if(!l)return;const r=mv(()=>{if(xo.has(l))return;hu(l,"down");const u=mv(()=>{hu(l,"up")}),m=()=>hu(l,"cancel");l.addEventListener("keyup",u,i),l.addEventListener("blur",m,i)});l.addEventListener("keydown",r,i),l.addEventListener("blur",()=>l.removeEventListener("keydown",r),i)};function hv(a){return vd(a)&&!m0()}function jx(a,i,l={}){const[r,u,m]=h0(a,l),d=p=>{const h=p.currentTarget;if(!hv(p))return;xo.add(h);const v=i(h,p),g=(z,Y)=>{window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",x),xo.has(h)&&xo.delete(h),hv(z)&&typeof v=="function"&&v(z,{success:Y})},b=z=>{g(z,h===window||h===document||l.useGlobalTarget||p0(h,z.target))},x=z=>{g(z,!1)};window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",x,u)};return r.forEach(p=>{(l.useGlobalTarget?window:p).addEventListener("pointerdown",d,u),Rx(p)&&(p.addEventListener("focus",v=>Hx(v,u)),!Vx(p)&&!p.hasAttribute("tabindex")&&(p.tabIndex=0))}),m}function v0(a){return Dg(a)&&"ownerSVGElement"in a}function Yx(a){return v0(a)&&a.tagName==="svg"}const me=a=>!!(a&&a.getVelocity),qx=[...c0,Wt,ua],Gx=a=>qx.find(r0(a)),g0=ct.createContext({transformPagePoint:a=>a,isStatic:!1,reducedMotion:"never"});function Qx(a=!0){const i=ct.useContext(Iu);if(i===null)return[!0,null];const{isPresent:l,onExitComplete:r,register:u}=i,m=ct.useId();ct.useEffect(()=>{if(a)return u(m)},[a]);const d=ct.useCallback(()=>a&&r&&r(m),[m,r,a]);return!l&&r?[!1,d]:[!0]}const y0=ct.createContext({strict:!1}),pv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Ri={};for(const a in pv)Ri[a]={isEnabled:i=>pv[a].some(l=>!!i[l])};function Fx(a){for(const i in a)Ri[i]={...Ri[i],...a[i]}}const Jx=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function Mo(a){return a.startsWith("while")||a.startsWith("drag")&&a!=="draggable"||a.startsWith("layout")||a.startsWith("onTap")||a.startsWith("onPan")||a.startsWith("onLayout")||Jx.has(a)}let b0=a=>!Mo(a);function Xx(a){typeof a=="function"&&(b0=i=>i.startsWith("on")?!Mo(i):a(i))}try{Xx(require("@emotion/is-prop-valid").default)}catch{}function Px(a,i,l){const r={};for(const u in a)u==="values"&&typeof a.values=="object"||(b0(u)||l===!0&&Mo(u)||!i&&!Mo(u)||a.draggable&&u.startsWith("onDrag"))&&(r[u]=a[u]);return r}const Bo=ct.createContext({});function Ro(a){return a!==null&&typeof a=="object"&&typeof a.start=="function"}function Fs(a){return typeof a=="string"||Array.isArray(a)}const gd=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],yd=["initial",...gd];function No(a){return Ro(a.animate)||yd.some(i=>Fs(a[i]))}function A0(a){return!!(No(a)||a.variants)}function Kx(a,i){if(No(a)){const{initial:l,animate:r}=a;return{initial:l===!1||Fs(l)?l:void 0,animate:Fs(r)?r:void 0}}return a.inherit!==!1?i:{}}function Ix(a){const{initial:i,animate:l}=Kx(a,ct.useContext(Bo));return ct.useMemo(()=>({initial:i,animate:l}),[vv(i),vv(l)])}function vv(a){return Array.isArray(a)?a.join(" "):a}const Js={};function Zx(a){for(const i in a)Js[i]=a[i],ad(i)&&(Js[i].isCSSVariable=!0)}function x0(a,{layout:i,layoutId:l}){return zi.has(a)||a.startsWith("origin")||(i||l!==void 0)&&(!!Js[a]||a==="opacity")}const _x={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},Wx=Ui.length;function $x(a,i,l){let r="",u=!0;for(let m=0;m<Wx;m++){const d=Ui[m],p=a[d];if(p===void 0)continue;let h=!0;if(typeof p=="number"?h=p===(d.startsWith("scale")?1:0):h=parseFloat(p)===0,!h||l){const v=f0(p,hd[d]);if(!h){u=!1;const g=_x[d]||d;r+=`${g}(${v}) `}l&&(i[d]=v)}}return r=r.trim(),l?r=l(i,u?"":r):u&&(r="none"),r}function bd(a,i,l){const{style:r,vars:u,transformOrigin:m}=a;let d=!1,p=!1;for(const h in i){const v=i[h];if(zi.has(h)){d=!0;continue}else if(ad(h)){u[h]=v;continue}else{const g=f0(v,hd[h]);h.startsWith("origin")?(p=!0,m[h]=g):r[h]=g}}if(i.transform||(d||l?r.transform=$x(i,a.transform,l):r.transform&&(r.transform="none")),p){const{originX:h="50%",originY:v="50%",originZ:g=0}=m;r.transformOrigin=`${h} ${v} ${g}`}}const Ad=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function S0(a,i,l){for(const r in i)!me(i[r])&&!x0(r,l)&&(a[r]=i[r])}function tS({transformTemplate:a},i){return ct.useMemo(()=>{const l=Ad();return bd(l,i,a),Object.assign({},l.vars,l.style)},[i])}function eS(a,i){const l=a.style||{},r={};return S0(r,l,a),Object.assign(r,tS(a,i)),r}function nS(a,i){const l={},r=eS(a,i);return a.drag&&a.dragListener!==!1&&(l.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout="none",r.touchAction=a.drag===!0?"none":`pan-${a.drag==="x"?"y":"x"}`),a.tabIndex===void 0&&(a.onTap||a.onTapStart||a.whileTap)&&(l.tabIndex=0),l.style=r,l}const aS={offset:"stroke-dashoffset",array:"stroke-dasharray"},iS={offset:"strokeDashoffset",array:"strokeDasharray"};function sS(a,i,l=1,r=0,u=!0){a.pathLength=1;const m=u?aS:iS;a[m.offset]=it.transform(-r);const d=it.transform(i),p=it.transform(l);a[m.array]=`${d} ${p}`}function w0(a,{attrX:i,attrY:l,attrScale:r,pathLength:u,pathSpacing:m=1,pathOffset:d=0,...p},h,v,g){if(bd(a,p,v),h){a.style.viewBox&&(a.attrs.viewBox=a.style.viewBox);return}a.attrs=a.style,a.style={};const{attrs:b,style:x}=a;b.transform&&(x.transform=b.transform,delete b.transform),(x.transform||b.transformOrigin)&&(x.transformOrigin=b.transformOrigin??"50% 50%",delete b.transformOrigin),x.transform&&(x.transformBox=g?.transformBox??"fill-box",delete b.transformBox),i!==void 0&&(b.x=i),l!==void 0&&(b.y=l),r!==void 0&&(b.scale=r),u!==void 0&&sS(b,u,m,d,!1)}const T0=()=>({...Ad(),attrs:{}}),C0=a=>typeof a=="string"&&a.toLowerCase()==="svg";function lS(a,i,l,r){const u=ct.useMemo(()=>{const m=T0();return w0(m,i,C0(r),a.transformTemplate,a.style),{...m.attrs,style:{...m.style}}},[i]);if(a.style){const m={};S0(m,a.style,a),u.style={...m,...u.style}}return u}const oS=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function xd(a){return typeof a!="string"||a.includes("-")?!1:!!(oS.indexOf(a)>-1||/[A-Z]/u.test(a))}function rS(a,i,l,{latestValues:r},u,m=!1){const p=(xd(a)?lS:nS)(i,r,u,a),h=Px(i,typeof a=="string",m),v=a!==ct.Fragment?{...h,...p,ref:l}:{},{children:g}=i,b=ct.useMemo(()=>me(g)?g.get():g,[g]);return ct.createElement(a,{...v,children:b})}function gv(a){const i=[{},{}];return a?.values.forEach((l,r)=>{i[0][r]=l.get(),i[1][r]=l.getVelocity()}),i}function Sd(a,i,l,r){if(typeof i=="function"){const[u,m]=gv(r);i=i(l!==void 0?l:a.custom,u,m)}if(typeof i=="string"&&(i=a.variants&&a.variants[i]),typeof i=="function"){const[u,m]=gv(r);i=i(l!==void 0?l:a.custom,u,m)}return i}function So(a){return me(a)?a.get():a}function cS({scrapeMotionValuesFromProps:a,createRenderState:i},l,r,u){return{latestValues:uS(l,r,u,a),renderState:i()}}function uS(a,i,l,r){const u={},m=r(a,{});for(const x in m)u[x]=So(m[x]);let{initial:d,animate:p}=a;const h=No(a),v=A0(a);i&&v&&!h&&a.inherit!==!1&&(d===void 0&&(d=i.initial),p===void 0&&(p=i.animate));let g=l?l.initial===!1:!1;g=g||d===!1;const b=g?p:d;if(b&&typeof b!="boolean"&&!Ro(b)){const x=Array.isArray(b)?b:[b];for(let z=0;z<x.length;z++){const Y=Sd(a,x[z]);if(Y){const{transitionEnd:J,transition:X,...G}=Y;for(const I in G){let Q=G[I];if(Array.isArray(Q)){const at=g?Q.length-1:0;Q=Q[at]}Q!==null&&(u[I]=Q)}for(const I in J)u[I]=J[I]}}}return u}const E0=a=>(i,l)=>{const r=ct.useContext(Bo),u=ct.useContext(Iu),m=()=>cS(a,i,r,u);return l?m():F2(m)};function wd(a,i,l){const{style:r}=a,u={};for(const m in r)(me(r[m])||i.style&&me(i.style[m])||x0(m,a)||l?.getValue(m)?.liveStyle!==void 0)&&(u[m]=r[m]);return u}const dS=E0({scrapeMotionValuesFromProps:wd,createRenderState:Ad});function k0(a,i,l){const r=wd(a,i,l);for(const u in a)if(me(a[u])||me(i[u])){const m=Ui.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;r[m]=a[u]}return r}const fS=E0({scrapeMotionValuesFromProps:k0,createRenderState:T0}),mS=Symbol.for("motionComponentSymbol");function Ci(a){return a&&typeof a=="object"&&Object.prototype.hasOwnProperty.call(a,"current")}function hS(a,i,l){return ct.useCallback(r=>{r&&a.onMount&&a.onMount(r),i&&(r?i.mount(r):i.unmount()),l&&(typeof l=="function"?l(r):Ci(l)&&(l.current=r))},[i])}const Td=a=>a.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),pS="framerAppearId",M0="data-"+Td(pS),D0=ct.createContext({});function vS(a,i,l,r,u){const{visualElement:m}=ct.useContext(Bo),d=ct.useContext(y0),p=ct.useContext(Iu),h=ct.useContext(g0).reducedMotion,v=ct.useRef(null);r=r||d.renderer,!v.current&&r&&(v.current=r(a,{visualState:i,parent:m,props:l,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:h}));const g=v.current,b=ct.useContext(D0);g&&!g.projection&&u&&(g.type==="html"||g.type==="svg")&&gS(v.current,l,u,b);const x=ct.useRef(!1);ct.useInsertionEffect(()=>{g&&x.current&&g.update(l,p)});const z=l[M0],Y=ct.useRef(!!z&&!window.MotionHandoffIsComplete?.(z)&&window.MotionHasOptimisedAnimation?.(z));return J2(()=>{g&&(x.current=!0,window.MotionIsMounted=!0,g.updateFeatures(),g.scheduleRenderMicrotask(),Y.current&&g.animationState&&g.animationState.animateChanges())}),ct.useEffect(()=>{g&&(!Y.current&&g.animationState&&g.animationState.animateChanges(),Y.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(z)}),Y.current=!1),g.enteringChildren=void 0)}),g}function gS(a,i,l,r){const{layoutId:u,layout:m,drag:d,dragConstraints:p,layoutScroll:h,layoutRoot:v,layoutCrossfade:g}=i;a.projection=new l(a.latestValues,i["data-framer-portal-id"]?void 0:B0(a.parent)),a.projection.setOptions({layoutId:u,layout:m,alwaysMeasureLayout:!!d||p&&Ci(p),visualElement:a,animationType:typeof m=="string"?m:"both",initialPromotionConfig:r,crossfade:g,layoutScroll:h,layoutRoot:v})}function B0(a){if(a)return a.options.allowProjection!==!1?a.projection:B0(a.parent)}function pu(a,{forwardMotionProps:i=!1}={},l,r){l&&Fx(l);const u=xd(a)?fS:dS;function m(p,h){let v;const g={...ct.useContext(g0),...p,layoutId:yS(p)},{isStatic:b}=g,x=Ix(p),z=u(p,b);if(!b&&Ku){bS();const Y=AS(g);v=Y.MeasureLayout,x.visualElement=vS(a,z,g,r,Y.ProjectionNode)}return Oe.jsxs(Bo.Provider,{value:x,children:[v&&x.visualElement?Oe.jsx(v,{visualElement:x.visualElement,...g}):null,rS(a,p,hS(z,x.visualElement,h),z,b,i)]})}m.displayName=`motion.${typeof a=="string"?a:`create(${a.displayName??a.name??""})`}`;const d=ct.forwardRef(m);return d[mS]=a,d}function yS({layoutId:a}){const i=ct.useContext(kg).id;return i&&a!==void 0?i+"-"+a:a}function bS(a,i){ct.useContext(y0).strict}function AS(a){const{drag:i,layout:l}=Ri;if(!i&&!l)return{};const r={...i,...l};return{MeasureLayout:i?.isEnabled(a)||l?.isEnabled(a)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function xS(a,i){if(typeof Proxy>"u")return pu;const l=new Map,r=(m,d)=>pu(m,d,a,i),u=(m,d)=>r(m,d);return new Proxy(u,{get:(m,d)=>d==="create"?r:(l.has(d)||l.set(d,pu(d,void 0,a,i)),l.get(d))})}function R0({top:a,left:i,right:l,bottom:r}){return{x:{min:i,max:l},y:{min:a,max:r}}}function SS({x:a,y:i}){return{top:i.min,right:a.max,bottom:i.max,left:a.min}}function wS(a,i){if(!i)return a;const l=i({x:a.left,y:a.top}),r=i({x:a.right,y:a.bottom});return{top:l.y,left:l.x,bottom:r.y,right:r.x}}function vu(a){return a===void 0||a===1}function Vu({scale:a,scaleX:i,scaleY:l}){return!vu(a)||!vu(i)||!vu(l)}function za(a){return Vu(a)||N0(a)||a.z||a.rotate||a.rotateX||a.rotateY||a.skewX||a.skewY}function N0(a){return yv(a.x)||yv(a.y)}function yv(a){return a&&a!=="0%"}function Do(a,i,l){const r=a-l,u=i*r;return l+u}function bv(a,i,l,r,u){return u!==void 0&&(a=Do(a,u,r)),Do(a,l,r)+i}function Hu(a,i=0,l=1,r,u){a.min=bv(a.min,i,l,r,u),a.max=bv(a.max,i,l,r,u)}function U0(a,{x:i,y:l}){Hu(a.x,i.translate,i.scale,i.originPoint),Hu(a.y,l.translate,l.scale,l.originPoint)}const Av=.999999999999,xv=1.0000000000001;function TS(a,i,l,r=!1){const u=l.length;if(!u)return;i.x=i.y=1;let m,d;for(let p=0;p<u;p++){m=l[p],d=m.projectionDelta;const{visualElement:h}=m.options;h&&h.props.style&&h.props.style.display==="contents"||(r&&m.options.layoutScroll&&m.scroll&&m!==m.root&&ki(a,{x:-m.scroll.offset.x,y:-m.scroll.offset.y}),d&&(i.x*=d.x.scale,i.y*=d.y.scale,U0(a,d)),r&&za(m.latestValues)&&ki(a,m.latestValues))}i.x<xv&&i.x>Av&&(i.x=1),i.y<xv&&i.y>Av&&(i.y=1)}function Ei(a,i){a.min=a.min+i,a.max=a.max+i}function Sv(a,i,l,r,u=.5){const m=jt(a.min,a.max,u);Hu(a,i,l,m,r)}function ki(a,i){Sv(a.x,i.x,i.scaleX,i.scale,i.originX),Sv(a.y,i.y,i.scaleY,i.scale,i.originY)}function z0(a,i){return R0(wS(a.getBoundingClientRect(),i))}function CS(a,i,l){const r=z0(a,l),{scroll:u}=i;return u&&(Ei(r.x,u.offset.x),Ei(r.y,u.offset.y)),r}const wv=()=>({translate:0,scale:1,origin:0,originPoint:0}),Mi=()=>({x:wv(),y:wv()}),Tv=()=>({min:0,max:0}),Pt=()=>({x:Tv(),y:Tv()}),ju={current:null},L0={current:!1};function ES(){if(L0.current=!0,!!Ku)if(window.matchMedia){const a=window.matchMedia("(prefers-reduced-motion)"),i=()=>ju.current=a.matches;a.addEventListener("change",i),i()}else ju.current=!1}const kS=new WeakMap;function MS(a,i,l){for(const r in i){const u=i[r],m=l[r];if(me(u))a.addValue(r,u);else if(me(m))a.addValue(r,Bi(u,{owner:a}));else if(m!==u)if(a.hasValue(r)){const d=a.getValue(r);d.liveStyle===!0?d.jump(u):d.hasAnimated||d.set(u)}else{const d=a.getStaticValue(r);a.addValue(r,Bi(d!==void 0?d:u,{owner:a}))}}for(const r in l)i[r]===void 0&&a.removeValue(r);return i}const Cv=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class DS{scrapeMotionValuesFromProps(i,l,r){return{}}constructor({parent:i,props:l,presenceContext:r,reducedMotionConfig:u,blockInitialAnimation:m,visualState:d},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=fd,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const x=Ce.now();this.renderScheduledAt<x&&(this.renderScheduledAt=x,Vt.render(this.render,!1,!0))};const{latestValues:h,renderState:v}=d;this.latestValues=h,this.baseTarget={...h},this.initialValues=l.initial?{...h}:{},this.renderState=v,this.parent=i,this.props=l,this.presenceContext=r,this.depth=i?i.depth+1:0,this.reducedMotionConfig=u,this.options=p,this.blockInitialAnimation=!!m,this.isControllingVariants=No(l),this.isVariantNode=A0(l),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(i&&i.current);const{willChange:g,...b}=this.scrapeMotionValuesFromProps(l,{},this);for(const x in b){const z=b[x];h[x]!==void 0&&me(z)&&z.set(h[x])}}mount(i){this.current=i,kS.set(i,this),this.projection&&!this.projection.instance&&this.projection.mount(i),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((l,r)=>this.bindToMotionValue(r,l)),L0.current||ES(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:ju.current,this.parent?.addChild(this),this.update(this.props,this.presenceContext)}unmount(){this.projection&&this.projection.unmount(),ca(this.notifyUpdate),ca(this.render),this.valueSubscriptions.forEach(i=>i()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const i in this.events)this.events[i].clear();for(const i in this.features){const l=this.features[i];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(i){this.children.add(i),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(i)}removeChild(i){this.children.delete(i),this.enteringChildren&&this.enteringChildren.delete(i)}bindToMotionValue(i,l){this.valueSubscriptions.has(i)&&this.valueSubscriptions.get(i)();const r=zi.has(i);r&&this.onBindTransform&&this.onBindTransform();const u=l.on("change",d=>{this.latestValues[i]=d,this.props.onUpdate&&Vt.preRender(this.notifyUpdate),r&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let m;window.MotionCheckAppearSync&&(m=window.MotionCheckAppearSync(this,i,l)),this.valueSubscriptions.set(i,()=>{u(),m&&m(),l.owner&&l.stop()})}sortNodePosition(i){return!this.current||!this.sortInstanceNodePosition||this.type!==i.type?0:this.sortInstanceNodePosition(this.current,i.current)}updateFeatures(){let i="animation";for(i in Ri){const l=Ri[i];if(!l)continue;const{isEnabled:r,Feature:u}=l;if(!this.features[i]&&u&&r(this.props)&&(this.features[i]=new u(this)),this.features[i]){const m=this.features[i];m.isMounted?m.update():(m.mount(),m.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Pt()}getStaticValue(i){return this.latestValues[i]}setStaticValue(i,l){this.latestValues[i]=l}update(i,l){(i.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=i,this.prevPresenceContext=this.presenceContext,this.presenceContext=l;for(let r=0;r<Cv.length;r++){const u=Cv[r];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const m="on"+u,d=i[m];d&&(this.propEventSubscriptions[u]=this.on(u,d))}this.prevMotionValues=MS(this,this.scrapeMotionValuesFromProps(i,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(i){return this.props.variants?this.props.variants[i]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(i){const l=this.getClosestVariantNode();if(l)return l.variantChildren&&l.variantChildren.add(i),()=>l.variantChildren.delete(i)}addValue(i,l){const r=this.values.get(i);l!==r&&(r&&this.removeValue(i),this.bindToMotionValue(i,l),this.values.set(i,l),this.latestValues[i]=l.get())}removeValue(i){this.values.delete(i);const l=this.valueSubscriptions.get(i);l&&(l(),this.valueSubscriptions.delete(i)),delete this.latestValues[i],this.removeValueFromRenderState(i,this.renderState)}hasValue(i){return this.values.has(i)}getValue(i,l){if(this.props.values&&this.props.values[i])return this.props.values[i];let r=this.values.get(i);return r===void 0&&l!==void 0&&(r=Bi(l===null?void 0:l,{owner:this}),this.addValue(i,r)),r}readValue(i,l){let r=this.latestValues[i]!==void 0||!this.current?this.latestValues[i]:this.getBaseTargetFromProps(this.props,i)??this.readValueFromInstance(this.current,i,this.options);return r!=null&&(typeof r=="string"&&(Mg(r)||Bg(r))?r=parseFloat(r):!Gx(r)&&ua.test(l)&&(r=d0(i,l)),this.setBaseTarget(i,me(r)?r.get():r)),me(r)?r.get():r}setBaseTarget(i,l){this.baseTarget[i]=l}getBaseTarget(i){const{initial:l}=this.props;let r;if(typeof l=="string"||typeof l=="object"){const m=Sd(this.props,l,this.presenceContext?.custom);m&&(r=m[i])}if(l&&r!==void 0)return r;const u=this.getBaseTargetFromProps(this.props,i);return u!==void 0&&!me(u)?u:this.initialValues[i]!==void 0&&r===void 0?void 0:this.baseTarget[i]}on(i,l){return this.events[i]||(this.events[i]=new td),this.events[i].add(l)}notify(i,...l){this.events[i]&&this.events[i].notify(...l)}scheduleRenderMicrotask(){pd.render(this.render)}}class O0 extends DS{constructor(){super(...arguments),this.KeyframeResolver=Dx}sortInstanceNodePosition(i,l){return i.compareDocumentPosition(l)&2?1:-1}getBaseTargetFromProps(i,l){return i.style?i.style[l]:void 0}removeValueFromRenderState(i,{vars:l,style:r}){delete l[i],delete r[i]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:i}=this.props;me(i)&&(this.childSubscription=i.on("change",l=>{this.current&&(this.current.textContent=`${l}`)}))}}function V0(a,{style:i,vars:l},r,u){const m=a.style;let d;for(d in i)m[d]=i[d];u?.applyProjectionStyles(m,r);for(d in l)m.setProperty(d,l[d])}function BS(a){return window.getComputedStyle(a)}class RS extends O0{constructor(){super(...arguments),this.type="html",this.renderInstance=V0}readValueFromInstance(i,l){if(zi.has(l))return this.projection?.isProjecting?Bu(l):KA(i,l);{const r=BS(i),u=(ad(l)?r.getPropertyValue(l):r[l])||0;return typeof u=="string"?u.trim():u}}measureInstanceViewportBox(i,{transformPagePoint:l}){return z0(i,l)}build(i,l,r){bd(i,l,r.transformTemplate)}scrapeMotionValuesFromProps(i,l,r){return wd(i,l,r)}}const H0=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function NS(a,i,l,r){V0(a,i,void 0,r);for(const u in i.attrs)a.setAttribute(H0.has(u)?u:Td(u),i.attrs[u])}class US extends O0{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Pt}getBaseTargetFromProps(i,l){return i[l]}readValueFromInstance(i,l){if(zi.has(l)){const r=u0(l);return r&&r.default||0}return l=H0.has(l)?l:Td(l),i.getAttribute(l)}scrapeMotionValuesFromProps(i,l,r){return k0(i,l,r)}build(i,l,r){w0(i,l,this.isSVGTag,r.transformTemplate,r.style)}renderInstance(i,l,r,u){NS(i,l,r,u)}mount(i){this.isSVGTag=C0(i.tagName),super.mount(i)}}const zS=(a,i)=>xd(a)?new US(i):new RS(i,{allowProjection:a!==ct.Fragment});function Di(a,i,l){const r=a.getProps();return Sd(r,i,l!==void 0?l:r.custom,a)}const Yu=a=>Array.isArray(a);function LS(a,i,l){a.hasValue(i)?a.getValue(i).set(l):a.addValue(i,Bi(l))}function OS(a){return Yu(a)?a[a.length-1]||0:a}function VS(a,i){const l=Di(a,i);let{transitionEnd:r={},transition:u={},...m}=l||{};m={...m,...r};for(const d in m){const p=OS(m[d]);LS(a,d,p)}}function HS(a){return!!(me(a)&&a.add)}function qu(a,i){const l=a.getValue("willChange");if(HS(l))return l.add(i);if(!l&&Nn.WillChange){const r=new Nn.WillChange("auto");a.addValue("willChange",r),r.add(i)}}function j0(a){return a.props[M0]}const jS=a=>a!==null;function YS(a,{repeat:i,repeatType:l="loop"},r){const u=a.filter(jS),m=i&&l!=="loop"&&i%2===1?0:u.length-1;return u[m]}const qS={type:"spring",stiffness:500,damping:25,restSpeed:10},GS=a=>({type:"spring",stiffness:550,damping:a===0?2*Math.sqrt(550):30,restSpeed:10}),QS={type:"keyframes",duration:.8},FS={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},JS=(a,{keyframes:i})=>i.length>2?QS:zi.has(a)?a.startsWith("scale")?GS(i[1]):qS:FS;function XS({when:a,delay:i,delayChildren:l,staggerChildren:r,staggerDirection:u,repeat:m,repeatType:d,repeatDelay:p,from:h,elapsed:v,...g}){return!!Object.keys(g).length}const Cd=(a,i,l,r={},u,m)=>d=>{const p=md(r,a)||{},h=p.delay||r.delay||0;let{elapsed:v=0}=r;v=v-un(h);const g={keyframes:Array.isArray(l)?l:[null,l],ease:"easeOut",velocity:i.getVelocity(),...p,delay:-v,onUpdate:x=>{i.set(x),p.onUpdate&&p.onUpdate(x)},onComplete:()=>{d(),p.onComplete&&p.onComplete()},name:a,motionValue:i,element:m?void 0:u};XS(p)||Object.assign(g,JS(a,g)),g.duration&&(g.duration=un(g.duration)),g.repeatDelay&&(g.repeatDelay=un(g.repeatDelay)),g.from!==void 0&&(g.keyframes[0]=g.from);let b=!1;if((g.type===!1||g.duration===0&&!g.repeatDelay)&&(Lu(g),g.delay===0&&(b=!0)),(Nn.instantAnimations||Nn.skipAnimations)&&(b=!0,Lu(g),g.delay=0),g.allowFlatten=!p.type&&!p.ease,b&&!m&&i.get()!==void 0){const x=YS(g.keyframes,p);if(x!==void 0){Vt.update(()=>{g.onUpdate(x),g.onComplete()});return}}return p.isSync?new dd(g):new gx(g)};function PS({protectedKeys:a,needsAnimating:i},l){const r=a.hasOwnProperty(l)&&i[l]!==!0;return i[l]=!1,r}function Y0(a,i,{delay:l=0,transitionOverride:r,type:u}={}){let{transition:m=a.getDefaultTransition(),transitionEnd:d,...p}=i;r&&(m=r);const h=[],v=u&&a.animationState&&a.animationState.getState()[u];for(const g in p){const b=a.getValue(g,a.latestValues[g]??null),x=p[g];if(x===void 0||v&&PS(v,g))continue;const z={delay:l,...md(m||{},g)},Y=b.get();if(Y!==void 0&&!b.isAnimating&&!Array.isArray(x)&&x===Y&&!z.velocity)continue;let J=!1;if(window.MotionHandoffAnimation){const G=j0(a);if(G){const I=window.MotionHandoffAnimation(G,g,Vt);I!==null&&(z.startTime=I,J=!0)}}qu(a,g),b.start(Cd(g,b,x,a.shouldReduceMotion&&o0.has(g)?{type:!1}:z,a,J));const X=b.animation;X&&h.push(X)}return d&&Promise.all(h).then(()=>{Vt.update(()=>{d&&VS(a,d)})}),h}function q0(a,i,l,r=0,u=1){const m=Array.from(a).sort((v,g)=>v.sortNodePosition(g)).indexOf(i),d=a.size,p=(d-1)*r;return typeof l=="function"?l(m,d):u===1?m*r:p-m*r}function Gu(a,i,l={}){const r=Di(a,i,l.type==="exit"?a.presenceContext?.custom:void 0);let{transition:u=a.getDefaultTransition()||{}}=r||{};l.transitionOverride&&(u=l.transitionOverride);const m=r?()=>Promise.all(Y0(a,r,l)):()=>Promise.resolve(),d=a.variantChildren&&a.variantChildren.size?(h=0)=>{const{delayChildren:v=0,staggerChildren:g,staggerDirection:b}=u;return KS(a,i,h,v,g,b,l)}:()=>Promise.resolve(),{when:p}=u;if(p){const[h,v]=p==="beforeChildren"?[m,d]:[d,m];return h().then(()=>v())}else return Promise.all([m(),d(l.delay)])}function KS(a,i,l=0,r=0,u=0,m=1,d){const p=[];for(const h of a.variantChildren)h.notify("AnimationStart",i),p.push(Gu(h,i,{...d,delay:l+(typeof r=="function"?0:r)+q0(a.variantChildren,h,r,u,m)}).then(()=>h.notify("AnimationComplete",i)));return Promise.all(p)}function IS(a,i,l={}){a.notify("AnimationStart",i);let r;if(Array.isArray(i)){const u=i.map(m=>Gu(a,m,l));r=Promise.all(u)}else if(typeof i=="string")r=Gu(a,i,l);else{const u=typeof i=="function"?Di(a,i,l.custom):i;r=Promise.all(Y0(a,u,l))}return r.then(()=>{a.notify("AnimationComplete",i)})}function G0(a,i){if(!Array.isArray(i))return!1;const l=i.length;if(l!==a.length)return!1;for(let r=0;r<l;r++)if(i[r]!==a[r])return!1;return!0}const ZS=yd.length;function Q0(a){if(!a)return;if(!a.isControllingVariants){const l=a.parent?Q0(a.parent)||{}:{};return a.props.initial!==void 0&&(l.initial=a.props.initial),l}const i={};for(let l=0;l<ZS;l++){const r=yd[l],u=a.props[r];(Fs(u)||u===!1)&&(i[r]=u)}return i}const _S=[...gd].reverse(),WS=gd.length;function $S(a){return i=>Promise.all(i.map(({animation:l,options:r})=>IS(a,l,r)))}function tw(a){let i=$S(a),l=Ev(),r=!0;const u=h=>(v,g)=>{const b=Di(a,g,h==="exit"?a.presenceContext?.custom:void 0);if(b){const{transition:x,transitionEnd:z,...Y}=b;v={...v,...Y,...z}}return v};function m(h){i=h(a)}function d(h){const{props:v}=a,g=Q0(a.parent)||{},b=[],x=new Set;let z={},Y=1/0;for(let X=0;X<WS;X++){const G=_S[X],I=l[G],Q=v[G]!==void 0?v[G]:g[G],at=Fs(Q),W=G===h?I.isActive:null;W===!1&&(Y=X);let lt=Q===g[G]&&Q!==v[G]&&at;if(lt&&r&&a.manuallyAnimateOnMount&&(lt=!1),I.protectedKeys={...z},!I.isActive&&W===null||!Q&&!I.prevProp||Ro(Q)||typeof Q=="boolean")continue;const $=ew(I.prevProp,Q);let et=$||G===h&&I.isActive&&!lt&&at||X>Y&&at,Et=!1;const Ht=Array.isArray(Q)?Q:[Q];let $t=Ht.reduce(u(G),{});W===!1&&($t={});const{prevResolvedValues:te={}}=I,We={...te,...$t},ge=H=>{et=!0,x.has(H)&&(Et=!0,x.delete(H)),I.needsAnimating[H]=!0;const P=a.getValue(H);P&&(P.liveStyle=!1)};for(const H in We){const P=$t[H],dt=te[H];if(z.hasOwnProperty(H))continue;let vt=!1;Yu(P)&&Yu(dt)?vt=!G0(P,dt):vt=P!==dt,vt?P!=null?ge(H):x.add(H):P!==void 0&&x.has(H)?ge(H):I.protectedKeys[H]=!0}I.prevProp=Q,I.prevResolvedValues=$t,I.isActive&&(z={...z,...$t}),r&&a.blockInitialAnimation&&(et=!1);const de=lt&&$;et&&(!de||Et)&&b.push(...Ht.map(H=>{const P={type:G};if(typeof H=="string"&&r&&!de&&a.manuallyAnimateOnMount&&a.parent){const{parent:dt}=a,vt=Di(dt,H);if(dt.enteringChildren&&vt){const{delayChildren:w}=vt.transition||{};P.delay=q0(dt.enteringChildren,a,w)}}return{animation:H,options:P}}))}if(x.size){const X={};if(typeof v.initial!="boolean"){const G=Di(a,Array.isArray(v.initial)?v.initial[0]:v.initial);G&&G.transition&&(X.transition=G.transition)}x.forEach(G=>{const I=a.getBaseTarget(G),Q=a.getValue(G);Q&&(Q.liveStyle=!0),X[G]=I??null}),b.push({animation:X})}let J=!!b.length;return r&&(v.initial===!1||v.initial===v.animate)&&!a.manuallyAnimateOnMount&&(J=!1),r=!1,J?i(b):Promise.resolve()}function p(h,v){if(l[h].isActive===v)return Promise.resolve();a.variantChildren?.forEach(b=>b.animationState?.setActive(h,v)),l[h].isActive=v;const g=d(h);for(const b in l)l[b].protectedKeys={};return g}return{animateChanges:d,setActive:p,setAnimateFunction:m,getState:()=>l,reset:()=>{l=Ev()}}}function ew(a,i){return typeof i=="string"?i!==a:Array.isArray(i)?!G0(i,a):!1}function Na(a=!1){return{isActive:a,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Ev(){return{animate:Na(!0),whileInView:Na(),whileHover:Na(),whileTap:Na(),whileDrag:Na(),whileFocus:Na(),exit:Na()}}class fa{constructor(i){this.isMounted=!1,this.node=i}update(){}}class nw extends fa{constructor(i){super(i),i.animationState||(i.animationState=tw(i))}updateAnimationControlsSubscription(){const{animate:i}=this.node.getProps();Ro(i)&&(this.unmountControls=i.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:i}=this.node.getProps(),{animate:l}=this.node.prevProps||{};i!==l&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}let aw=0;class iw extends fa{constructor(){super(...arguments),this.id=aw++}update(){if(!this.node.presenceContext)return;const{isPresent:i,onExitComplete:l}=this.node.presenceContext,{isPresent:r}=this.node.prevPresenceContext||{};if(!this.node.animationState||i===r)return;const u=this.node.animationState.setActive("exit",!i);l&&!i&&u.then(()=>{l(this.id)})}mount(){const{register:i,onExitComplete:l}=this.node.presenceContext||{};l&&l(this.id),i&&(this.unmount=i(this.id))}unmount(){}}const sw={animation:{Feature:nw},exit:{Feature:iw}};function Xs(a,i,l,r={passive:!0}){return a.addEventListener(i,l,r),()=>a.removeEventListener(i,l)}function Zs(a){return{point:{x:a.pageX,y:a.pageY}}}const lw=a=>i=>vd(i)&&a(i,Zs(i));function Ls(a,i,l,r){return Xs(a,i,lw(l),r)}const F0=1e-4,ow=1-F0,rw=1+F0,J0=.01,cw=0-J0,uw=0+J0;function ve(a){return a.max-a.min}function dw(a,i,l){return Math.abs(a-i)<=l}function kv(a,i,l,r=.5){a.origin=r,a.originPoint=jt(i.min,i.max,a.origin),a.scale=ve(l)/ve(i),a.translate=jt(l.min,l.max,a.origin)-a.originPoint,(a.scale>=ow&&a.scale<=rw||isNaN(a.scale))&&(a.scale=1),(a.translate>=cw&&a.translate<=uw||isNaN(a.translate))&&(a.translate=0)}function Os(a,i,l,r){kv(a.x,i.x,l.x,r?r.originX:void 0),kv(a.y,i.y,l.y,r?r.originY:void 0)}function Mv(a,i,l){a.min=l.min+i.min,a.max=a.min+ve(i)}function fw(a,i,l){Mv(a.x,i.x,l.x),Mv(a.y,i.y,l.y)}function Dv(a,i,l){a.min=i.min-l.min,a.max=a.min+ve(i)}function Vs(a,i,l){Dv(a.x,i.x,l.x),Dv(a.y,i.y,l.y)}function Ie(a){return[a("x"),a("y")]}const X0=({current:a})=>a?a.ownerDocument.defaultView:null,Bv=(a,i)=>Math.abs(a-i);function mw(a,i){const l=Bv(a.x,i.x),r=Bv(a.y,i.y);return Math.sqrt(l**2+r**2)}class P0{constructor(i,l,{transformPagePoint:r,contextWindow:u=window,dragSnapToOrigin:m=!1,distanceThreshold:d=3}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const x=yu(this.lastMoveEventInfo,this.history),z=this.startEvent!==null,Y=mw(x.offset,{x:0,y:0})>=this.distanceThreshold;if(!z&&!Y)return;const{point:J}=x,{timestamp:X}=ue;this.history.push({...J,timestamp:X});const{onStart:G,onMove:I}=this.handlers;z||(G&&G(this.lastMoveEvent,x),this.startEvent=this.lastMoveEvent),I&&I(this.lastMoveEvent,x)},this.handlePointerMove=(x,z)=>{this.lastMoveEvent=x,this.lastMoveEventInfo=gu(z,this.transformPagePoint),Vt.update(this.updatePoint,!0)},this.handlePointerUp=(x,z)=>{this.end();const{onEnd:Y,onSessionEnd:J,resumeAnimation:X}=this.handlers;if(this.dragSnapToOrigin&&X&&X(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const G=yu(x.type==="pointercancel"?this.lastMoveEventInfo:gu(z,this.transformPagePoint),this.history);this.startEvent&&Y&&Y(x,G),J&&J(x,G)},!vd(i))return;this.dragSnapToOrigin=m,this.handlers=l,this.transformPagePoint=r,this.distanceThreshold=d,this.contextWindow=u||window;const p=Zs(i),h=gu(p,this.transformPagePoint),{point:v}=h,{timestamp:g}=ue;this.history=[{...v,timestamp:g}];const{onSessionStart:b}=l;b&&b(i,yu(h,this.history)),this.removeListeners=Ps(Ls(this.contextWindow,"pointermove",this.handlePointerMove),Ls(this.contextWindow,"pointerup",this.handlePointerUp),Ls(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(i){this.handlers=i}end(){this.removeListeners&&this.removeListeners(),ca(this.updatePoint)}}function gu(a,i){return i?{point:i(a.point)}:a}function Rv(a,i){return{x:a.x-i.x,y:a.y-i.y}}function yu({point:a},i){return{point:a,delta:Rv(a,K0(i)),offset:Rv(a,hw(i)),velocity:pw(i,.1)}}function hw(a){return a[0]}function K0(a){return a[a.length-1]}function pw(a,i){if(a.length<2)return{x:0,y:0};let l=a.length-1,r=null;const u=K0(a);for(;l>=0&&(r=a[l],!(u.timestamp-r.timestamp>un(i)));)l--;if(!r)return{x:0,y:0};const m=Ze(u.timestamp-r.timestamp);if(m===0)return{x:0,y:0};const d={x:(u.x-r.x)/m,y:(u.y-r.y)/m};return d.x===1/0&&(d.x=0),d.y===1/0&&(d.y=0),d}function vw(a,{min:i,max:l},r){return i!==void 0&&a<i?a=r?jt(i,a,r.min):Math.max(a,i):l!==void 0&&a>l&&(a=r?jt(l,a,r.max):Math.min(a,l)),a}function Nv(a,i,l){return{min:i!==void 0?a.min+i:void 0,max:l!==void 0?a.max+l-(a.max-a.min):void 0}}function gw(a,{top:i,left:l,bottom:r,right:u}){return{x:Nv(a.x,l,u),y:Nv(a.y,i,r)}}function Uv(a,i){let l=i.min-a.min,r=i.max-a.max;return i.max-i.min<a.max-a.min&&([l,r]=[r,l]),{min:l,max:r}}function yw(a,i){return{x:Uv(a.x,i.x),y:Uv(a.y,i.y)}}function bw(a,i){let l=.5;const r=ve(a),u=ve(i);return u>r?l=qs(i.min,i.max-r,a.min):r>u&&(l=qs(a.min,a.max-u,i.min)),Rn(0,1,l)}function Aw(a,i){const l={};return i.min!==void 0&&(l.min=i.min-a.min),i.max!==void 0&&(l.max=i.max-a.min),l}const Qu=.35;function xw(a=Qu){return a===!1?a=0:a===!0&&(a=Qu),{x:zv(a,"left","right"),y:zv(a,"top","bottom")}}function zv(a,i,l){return{min:Lv(a,i),max:Lv(a,l)}}function Lv(a,i){return typeof a=="number"?a:a[i]||0}const Sw=new WeakMap;class ww{constructor(i){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Pt(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=i}start(i,{snapToCursor:l=!1,distanceThreshold:r}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const m=b=>{const{dragSnapToOrigin:x}=this.getProps();x?this.pauseAnimation():this.stopAnimation(),l&&this.snapToCursor(Zs(b).point)},d=(b,x)=>{const{drag:z,dragPropagation:Y,onDragStart:J}=this.getProps();if(z&&!Y&&(this.openDragLock&&this.openDragLock(),this.openDragLock=zx(z),!this.openDragLock))return;this.latestPointerEvent=b,this.latestPanInfo=x,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Ie(G=>{let I=this.getAxisMotionValue(G).get()||0;if(dn.test(I)){const{projection:Q}=this.visualElement;if(Q&&Q.layout){const at=Q.layout.layoutBox[G];at&&(I=ve(at)*(parseFloat(I)/100))}}this.originPoint[G]=I}),J&&Vt.postRender(()=>J(b,x)),qu(this.visualElement,"transform");const{animationState:X}=this.visualElement;X&&X.setActive("whileDrag",!0)},p=(b,x)=>{this.latestPointerEvent=b,this.latestPanInfo=x;const{dragPropagation:z,dragDirectionLock:Y,onDirectionLock:J,onDrag:X}=this.getProps();if(!z&&!this.openDragLock)return;const{offset:G}=x;if(Y&&this.currentDirection===null){this.currentDirection=Tw(G),this.currentDirection!==null&&J&&J(this.currentDirection);return}this.updateAxis("x",x.point,G),this.updateAxis("y",x.point,G),this.visualElement.render(),X&&X(b,x)},h=(b,x)=>{this.latestPointerEvent=b,this.latestPanInfo=x,this.stop(b,x),this.latestPointerEvent=null,this.latestPanInfo=null},v=()=>Ie(b=>this.getAnimationState(b)==="paused"&&this.getAxisMotionValue(b).animation?.play()),{dragSnapToOrigin:g}=this.getProps();this.panSession=new P0(i,{onSessionStart:m,onStart:d,onMove:p,onSessionEnd:h,resumeAnimation:v},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:g,distanceThreshold:r,contextWindow:X0(this.visualElement)})}stop(i,l){const r=i||this.latestPointerEvent,u=l||this.latestPanInfo,m=this.isDragging;if(this.cancel(),!m||!u||!r)return;const{velocity:d}=u;this.startAnimation(d);const{onDragEnd:p}=this.getProps();p&&Vt.postRender(()=>p(r,u))}cancel(){this.isDragging=!1;const{projection:i,animationState:l}=this.visualElement;i&&(i.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),l&&l.setActive("whileDrag",!1)}updateAxis(i,l,r){const{drag:u}=this.getProps();if(!r||!yo(i,u,this.currentDirection))return;const m=this.getAxisMotionValue(i);let d=this.originPoint[i]+r[i];this.constraints&&this.constraints[i]&&(d=vw(d,this.constraints[i],this.elastic[i])),m.set(d)}resolveConstraints(){const{dragConstraints:i,dragElastic:l}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,u=this.constraints;i&&Ci(i)?this.constraints||(this.constraints=this.resolveRefConstraints()):i&&r?this.constraints=gw(r.layoutBox,i):this.constraints=!1,this.elastic=xw(l),u!==this.constraints&&r&&this.constraints&&!this.hasMutatedConstraints&&Ie(m=>{this.constraints!==!1&&this.getAxisMotionValue(m)&&(this.constraints[m]=Aw(r.layoutBox[m],this.constraints[m]))})}resolveRefConstraints(){const{dragConstraints:i,onMeasureDragConstraints:l}=this.getProps();if(!i||!Ci(i))return!1;const r=i.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;const m=CS(r,u.root,this.visualElement.getTransformPagePoint());let d=yw(u.layout.layoutBox,m);if(l){const p=l(SS(d));this.hasMutatedConstraints=!!p,p&&(d=R0(p))}return d}startAnimation(i){const{drag:l,dragMomentum:r,dragElastic:u,dragTransition:m,dragSnapToOrigin:d,onDragTransitionEnd:p}=this.getProps(),h=this.constraints||{},v=Ie(g=>{if(!yo(g,l,this.currentDirection))return;let b=h&&h[g]||{};d&&(b={min:0,max:0});const x=u?200:1e6,z=u?40:1e7,Y={type:"inertia",velocity:r?i[g]:0,bounceStiffness:x,bounceDamping:z,timeConstant:750,restDelta:1,restSpeed:10,...m,...b};return this.startAxisValueAnimation(g,Y)});return Promise.all(v).then(p)}startAxisValueAnimation(i,l){const r=this.getAxisMotionValue(i);return qu(this.visualElement,i),r.start(Cd(i,r,0,l,this.visualElement,!1))}stopAnimation(){Ie(i=>this.getAxisMotionValue(i).stop())}pauseAnimation(){Ie(i=>this.getAxisMotionValue(i).animation?.pause())}getAnimationState(i){return this.getAxisMotionValue(i).animation?.state}getAxisMotionValue(i){const l=`_drag${i.toUpperCase()}`,r=this.visualElement.getProps(),u=r[l];return u||this.visualElement.getValue(i,(r.initial?r.initial[i]:void 0)||0)}snapToCursor(i){Ie(l=>{const{drag:r}=this.getProps();if(!yo(l,r,this.currentDirection))return;const{projection:u}=this.visualElement,m=this.getAxisMotionValue(l);if(u&&u.layout){const{min:d,max:p}=u.layout.layoutBox[l];m.set(i[l]-jt(d,p,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:i,dragConstraints:l}=this.getProps(),{projection:r}=this.visualElement;if(!Ci(l)||!r||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};Ie(d=>{const p=this.getAxisMotionValue(d);if(p&&this.constraints!==!1){const h=p.get();u[d]=bw({min:h,max:h},this.constraints[d])}});const{transformTemplate:m}=this.visualElement.getProps();this.visualElement.current.style.transform=m?m({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),Ie(d=>{if(!yo(d,i,null))return;const p=this.getAxisMotionValue(d),{min:h,max:v}=this.constraints[d];p.set(jt(h,v,u[d]))})}addListeners(){if(!this.visualElement.current)return;Sw.set(this.visualElement,this);const i=this.visualElement.current,l=Ls(i,"pointerdown",h=>{const{drag:v,dragListener:g=!0}=this.getProps();v&&g&&this.start(h)}),r=()=>{const{dragConstraints:h}=this.getProps();Ci(h)&&h.current&&(this.constraints=this.resolveRefConstraints())},{projection:u}=this.visualElement,m=u.addEventListener("measure",r);u&&!u.layout&&(u.root&&u.root.updateScroll(),u.updateLayout()),Vt.read(r);const d=Xs(window,"resize",()=>this.scalePositionWithinConstraints()),p=u.addEventListener("didUpdate",(({delta:h,hasLayoutChanged:v})=>{this.isDragging&&v&&(Ie(g=>{const b=this.getAxisMotionValue(g);b&&(this.originPoint[g]+=h[g].translate,b.set(b.get()+h[g].translate))}),this.visualElement.render())}));return()=>{d(),l(),m(),p&&p()}}getProps(){const i=this.visualElement.getProps(),{drag:l=!1,dragDirectionLock:r=!1,dragPropagation:u=!1,dragConstraints:m=!1,dragElastic:d=Qu,dragMomentum:p=!0}=i;return{...i,drag:l,dragDirectionLock:r,dragPropagation:u,dragConstraints:m,dragElastic:d,dragMomentum:p}}}function yo(a,i,l){return(i===!0||i===a)&&(l===null||l===a)}function Tw(a,i=10){let l=null;return Math.abs(a.y)>i?l="y":Math.abs(a.x)>i&&(l="x"),l}class Cw extends fa{constructor(i){super(i),this.removeGroupControls=_e,this.removeListeners=_e,this.controls=new ww(i)}mount(){const{dragControls:i}=this.node.getProps();i&&(this.removeGroupControls=i.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||_e}unmount(){this.removeGroupControls(),this.removeListeners()}}const Ov=a=>(i,l)=>{a&&Vt.postRender(()=>a(i,l))};class Ew extends fa{constructor(){super(...arguments),this.removePointerDownListener=_e}onPointerDown(i){this.session=new P0(i,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:X0(this.node)})}createPanHandlers(){const{onPanSessionStart:i,onPanStart:l,onPan:r,onPanEnd:u}=this.node.getProps();return{onSessionStart:Ov(i),onStart:Ov(l),onMove:r,onEnd:(m,d)=>{delete this.session,u&&Vt.postRender(()=>u(m,d))}}}mount(){this.removePointerDownListener=Ls(this.node.current,"pointerdown",i=>this.onPointerDown(i))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const wo={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function Vv(a,i){return i.max===i.min?0:a/(i.max-i.min)*100}const Bs={correct:(a,i)=>{if(!i.target)return a;if(typeof a=="string")if(it.test(a))a=parseFloat(a);else return a;const l=Vv(a,i.target.x),r=Vv(a,i.target.y);return`${l}% ${r}%`}},kw={correct:(a,{treeScale:i,projectionDelta:l})=>{const r=a,u=ua.parse(a);if(u.length>5)return r;const m=ua.createTransformer(a),d=typeof u[0]!="number"?1:0,p=l.x.scale*i.x,h=l.y.scale*i.y;u[0+d]/=p,u[1+d]/=h;const v=jt(p,h,.5);return typeof u[2+d]=="number"&&(u[2+d]/=v),typeof u[3+d]=="number"&&(u[3+d]/=v),m(u)}};let bu=!1;class Mw extends ct.Component{componentDidMount(){const{visualElement:i,layoutGroup:l,switchLayoutGroup:r,layoutId:u}=this.props,{projection:m}=i;Zx(Dw),m&&(l.group&&l.group.add(m),r&&r.register&&u&&r.register(m),bu&&m.root.didUpdate(),m.addEventListener("animationComplete",()=>{this.safeToRemove()}),m.setOptions({...m.options,onExitComplete:()=>this.safeToRemove()})),wo.hasEverUpdated=!0}getSnapshotBeforeUpdate(i){const{layoutDependency:l,visualElement:r,drag:u,isPresent:m}=this.props,{projection:d}=r;return d&&(d.isPresent=m,bu=!0,u||i.layoutDependency!==l||l===void 0||i.isPresent!==m?d.willUpdate():this.safeToRemove(),i.isPresent!==m&&(m?d.promote():d.relegate()||Vt.postRender(()=>{const p=d.getStack();(!p||!p.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:i}=this.props.visualElement;i&&(i.root.didUpdate(),pd.postRender(()=>{!i.currentAnimation&&i.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:i,layoutGroup:l,switchLayoutGroup:r}=this.props,{projection:u}=i;bu=!0,u&&(u.scheduleCheckAfterUnmount(),l&&l.group&&l.group.remove(u),r&&r.deregister&&r.deregister(u))}safeToRemove(){const{safeToRemove:i}=this.props;i&&i()}render(){return null}}function I0(a){const[i,l]=Qx(),r=ct.useContext(kg);return Oe.jsx(Mw,{...a,layoutGroup:r,switchLayoutGroup:ct.useContext(D0),isPresent:i,safeToRemove:l})}const Dw={borderRadius:{...Bs,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Bs,borderTopRightRadius:Bs,borderBottomLeftRadius:Bs,borderBottomRightRadius:Bs,boxShadow:kw};function Bw(a,i,l){const r=me(a)?a:Bi(a);return r.start(Cd("",r,i,l)),r.animation}const Rw=(a,i)=>a.depth-i.depth;class Nw{constructor(){this.children=[],this.isDirty=!1}add(i){Zu(this.children,i),this.isDirty=!0}remove(i){_u(this.children,i),this.isDirty=!0}forEach(i){this.isDirty&&this.children.sort(Rw),this.isDirty=!1,this.children.forEach(i)}}function Uw(a,i){const l=Ce.now(),r=({timestamp:u})=>{const m=u-l;m>=i&&(ca(r),a(m-i))};return Vt.setup(r,!0),()=>ca(r)}const Z0=["TopLeft","TopRight","BottomLeft","BottomRight"],zw=Z0.length,Hv=a=>typeof a=="string"?parseFloat(a):a,jv=a=>typeof a=="number"||it.test(a);function Lw(a,i,l,r,u,m){u?(a.opacity=jt(0,l.opacity??1,Ow(r)),a.opacityExit=jt(i.opacity??1,0,Vw(r))):m&&(a.opacity=jt(i.opacity??1,l.opacity??1,r));for(let d=0;d<zw;d++){const p=`border${Z0[d]}Radius`;let h=Yv(i,p),v=Yv(l,p);if(h===void 0&&v===void 0)continue;h||(h=0),v||(v=0),h===0||v===0||jv(h)===jv(v)?(a[p]=Math.max(jt(Hv(h),Hv(v),r),0),(dn.test(v)||dn.test(h))&&(a[p]+="%")):a[p]=v}(i.rotate||l.rotate)&&(a.rotate=jt(i.rotate||0,l.rotate||0,r))}function Yv(a,i){return a[i]!==void 0?a[i]:a.borderRadius}const Ow=_0(0,.5,Hg),Vw=_0(.5,.95,_e);function _0(a,i,l){return r=>r<a?0:r>i?1:l(qs(a,i,r))}function qv(a,i){a.min=i.min,a.max=i.max}function Ke(a,i){qv(a.x,i.x),qv(a.y,i.y)}function Gv(a,i){a.translate=i.translate,a.scale=i.scale,a.originPoint=i.originPoint,a.origin=i.origin}function Qv(a,i,l,r,u){return a-=i,a=Do(a,1/l,r),u!==void 0&&(a=Do(a,1/u,r)),a}function Hw(a,i=0,l=1,r=.5,u,m=a,d=a){if(dn.test(i)&&(i=parseFloat(i),i=jt(d.min,d.max,i/100)-d.min),typeof i!="number")return;let p=jt(m.min,m.max,r);a===m&&(p-=i),a.min=Qv(a.min,i,l,p,u),a.max=Qv(a.max,i,l,p,u)}function Fv(a,i,[l,r,u],m,d){Hw(a,i[l],i[r],i[u],i.scale,m,d)}const jw=["x","scaleX","originX"],Yw=["y","scaleY","originY"];function Jv(a,i,l,r){Fv(a.x,i,jw,l?l.x:void 0,r?r.x:void 0),Fv(a.y,i,Yw,l?l.y:void 0,r?r.y:void 0)}function Xv(a){return a.translate===0&&a.scale===1}function W0(a){return Xv(a.x)&&Xv(a.y)}function Pv(a,i){return a.min===i.min&&a.max===i.max}function qw(a,i){return Pv(a.x,i.x)&&Pv(a.y,i.y)}function Kv(a,i){return Math.round(a.min)===Math.round(i.min)&&Math.round(a.max)===Math.round(i.max)}function $0(a,i){return Kv(a.x,i.x)&&Kv(a.y,i.y)}function Iv(a){return ve(a.x)/ve(a.y)}function Zv(a,i){return a.translate===i.translate&&a.scale===i.scale&&a.originPoint===i.originPoint}class Gw{constructor(){this.members=[]}add(i){Zu(this.members,i),i.scheduleRender()}remove(i){if(_u(this.members,i),i===this.prevLead&&(this.prevLead=void 0),i===this.lead){const l=this.members[this.members.length-1];l&&this.promote(l)}}relegate(i){const l=this.members.findIndex(u=>i===u);if(l===0)return!1;let r;for(let u=l;u>=0;u--){const m=this.members[u];if(m.isPresent!==!1){r=m;break}}return r?(this.promote(r),!0):!1}promote(i,l){const r=this.lead;if(i!==r&&(this.prevLead=r,this.lead=i,i.show(),r)){r.instance&&r.scheduleRender(),i.scheduleRender(),i.resumeFrom=r,l&&(i.resumeFrom.preserveOpacity=!0),r.snapshot&&(i.snapshot=r.snapshot,i.snapshot.latestValues=r.animationValues||r.latestValues),i.root&&i.root.isUpdating&&(i.isLayoutDirty=!0);const{crossfade:u}=i.options;u===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(i=>{const{options:l,resumingFrom:r}=i;l.onExitComplete&&l.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(i=>{i.instance&&i.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function Qw(a,i,l){let r="";const u=a.x.translate/i.x,m=a.y.translate/i.y,d=l?.z||0;if((u||m||d)&&(r=`translate3d(${u}px, ${m}px, ${d}px) `),(i.x!==1||i.y!==1)&&(r+=`scale(${1/i.x}, ${1/i.y}) `),l){const{transformPerspective:v,rotate:g,rotateX:b,rotateY:x,skewX:z,skewY:Y}=l;v&&(r=`perspective(${v}px) ${r}`),g&&(r+=`rotate(${g}deg) `),b&&(r+=`rotateX(${b}deg) `),x&&(r+=`rotateY(${x}deg) `),z&&(r+=`skewX(${z}deg) `),Y&&(r+=`skewY(${Y}deg) `)}const p=a.x.scale*i.x,h=a.y.scale*i.y;return(p!==1||h!==1)&&(r+=`scale(${p}, ${h})`),r||"none"}const Au=["","X","Y","Z"],Fw=1e3;let Jw=0;function xu(a,i,l,r){const{latestValues:u}=i;u[a]&&(l[a]=u[a],i.setStaticValue(a,0),r&&(r[a]=0))}function ty(a){if(a.hasCheckedOptimisedAppear=!0,a.root===a)return;const{visualElement:i}=a.options;if(!i)return;const l=j0(i);if(window.MotionHasOptimisedAnimation(l,"transform")){const{layout:u,layoutId:m}=a.options;window.MotionCancelOptimisedAnimation(l,"transform",Vt,!(u||m))}const{parent:r}=a;r&&!r.hasCheckedOptimisedAppear&&ty(r)}function ey({attachResizeListener:a,defaultParent:i,measureScroll:l,checkIsScrollRoot:r,resetTransform:u}){return class{constructor(d={},p=i?.()){this.id=Jw++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(Kw),this.nodes.forEach(Ww),this.nodes.forEach($w),this.nodes.forEach(Iw)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=d,this.root=p?p.root||p:this,this.path=p?[...p.path,p]:[],this.parent=p,this.depth=p?p.depth+1:0;for(let h=0;h<this.path.length;h++)this.path[h].shouldResetTransform=!0;this.root===this&&(this.nodes=new Nw)}addEventListener(d,p){return this.eventHandlers.has(d)||this.eventHandlers.set(d,new td),this.eventHandlers.get(d).add(p)}notifyListeners(d,...p){const h=this.eventHandlers.get(d);h&&h.notify(...p)}hasListeners(d){return this.eventHandlers.has(d)}mount(d){if(this.instance)return;this.isSVG=v0(d)&&!Yx(d),this.instance=d;const{layoutId:p,layout:h,visualElement:v}=this.options;if(v&&!v.current&&v.mount(d),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(h||p)&&(this.isLayoutDirty=!0),a){let g,b=0;const x=()=>this.root.updateBlockedByResize=!1;Vt.read(()=>{b=window.innerWidth}),a(d,()=>{const z=window.innerWidth;z!==b&&(b=z,this.root.updateBlockedByResize=!0,g&&g(),g=Uw(x,250),wo.hasAnimatedSinceResize&&(wo.hasAnimatedSinceResize=!1,this.nodes.forEach($v)))})}p&&this.root.registerSharedNode(p,this),this.options.animate!==!1&&v&&(p||h)&&this.addEventListener("didUpdate",({delta:g,hasLayoutChanged:b,hasRelativeLayoutChanged:x,layout:z})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const Y=this.options.transition||v.getDefaultTransition()||i4,{onLayoutAnimationStart:J,onLayoutAnimationComplete:X}=v.getProps(),G=!this.targetLayout||!$0(this.targetLayout,z),I=!b&&x;if(this.options.layoutRoot||this.resumeFrom||I||b&&(G||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const Q={...md(Y,"layout"),onPlay:J,onComplete:X};(v.shouldReduceMotion||this.options.layoutRoot)&&(Q.delay=0,Q.type=!1),this.startAnimation(Q),this.setAnimationOrigin(g,I)}else b||$v(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=z})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const d=this.getStack();d&&d.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),ca(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(t4),this.animationId++)}getTransformTemplate(){const{visualElement:d}=this.options;return d&&d.getProps().transformTemplate}willUpdate(d=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&ty(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let g=0;g<this.path.length;g++){const b=this.path[g];b.shouldResetTransform=!0,b.updateScroll("snapshot"),b.options.layoutRoot&&b.willUpdate(!1)}const{layoutId:p,layout:h}=this.options;if(p===void 0&&!h)return;const v=this.getTransformTemplate();this.prevTransformTemplateValue=v?v(this.latestValues,""):void 0,this.updateSnapshot(),d&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(_v);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Wv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(_w),this.nodes.forEach(Xw),this.nodes.forEach(Pw)):this.nodes.forEach(Wv),this.clearAllSnapshots();const p=Ce.now();ue.delta=Rn(0,1e3/60,p-ue.timestamp),ue.timestamp=p,ue.isProcessing=!0,cu.update.process(ue),cu.preRender.process(ue),cu.render.process(ue),ue.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,pd.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Zw),this.sharedNodes.forEach(e4)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Vt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Vt.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!ve(this.snapshot.measuredBox.x)&&!ve(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let h=0;h<this.path.length;h++)this.path[h].updateScroll();const d=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Pt(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:p}=this.options;p&&p.notify("LayoutMeasure",this.layout.layoutBox,d?d.layoutBox:void 0)}updateScroll(d="measure"){let p=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===d&&(p=!1),p&&this.instance){const h=r(this.instance);this.scroll={animationId:this.root.animationId,phase:d,isRoot:h,offset:l(this.instance),wasRoot:this.scroll?this.scroll.isRoot:h}}}resetTransform(){if(!u)return;const d=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,p=this.projectionDelta&&!W0(this.projectionDelta),h=this.getTransformTemplate(),v=h?h(this.latestValues,""):void 0,g=v!==this.prevTransformTemplateValue;d&&this.instance&&(p||za(this.latestValues)||g)&&(u(this.instance,v),this.shouldResetTransform=!1,this.scheduleRender())}measure(d=!0){const p=this.measurePageBox();let h=this.removeElementScroll(p);return d&&(h=this.removeTransform(h)),s4(h),{animationId:this.root.animationId,measuredBox:p,layoutBox:h,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:d}=this.options;if(!d)return Pt();const p=d.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(l4))){const{scroll:v}=this.root;v&&(Ei(p.x,v.offset.x),Ei(p.y,v.offset.y))}return p}removeElementScroll(d){const p=Pt();if(Ke(p,d),this.scroll?.wasRoot)return p;for(let h=0;h<this.path.length;h++){const v=this.path[h],{scroll:g,options:b}=v;v!==this.root&&g&&b.layoutScroll&&(g.wasRoot&&Ke(p,d),Ei(p.x,g.offset.x),Ei(p.y,g.offset.y))}return p}applyTransform(d,p=!1){const h=Pt();Ke(h,d);for(let v=0;v<this.path.length;v++){const g=this.path[v];!p&&g.options.layoutScroll&&g.scroll&&g!==g.root&&ki(h,{x:-g.scroll.offset.x,y:-g.scroll.offset.y}),za(g.latestValues)&&ki(h,g.latestValues)}return za(this.latestValues)&&ki(h,this.latestValues),h}removeTransform(d){const p=Pt();Ke(p,d);for(let h=0;h<this.path.length;h++){const v=this.path[h];if(!v.instance||!za(v.latestValues))continue;Vu(v.latestValues)&&v.updateSnapshot();const g=Pt(),b=v.measurePageBox();Ke(g,b),Jv(p,v.latestValues,v.snapshot?v.snapshot.layoutBox:void 0,g)}return za(this.latestValues)&&Jv(p,this.latestValues),p}setTargetDelta(d){this.targetDelta=d,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(d){this.options={...this.options,...d,crossfade:d.crossfade!==void 0?d.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==ue.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(d=!1){const p=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=p.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=p.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=p.isSharedProjectionDirty);const h=!!this.resumingFrom||this!==p;if(!(d||h&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:g,layoutId:b}=this.options;if(!(!this.layout||!(g||b))){if(this.resolvedRelativeTargetAt=ue.timestamp,!this.targetDelta&&!this.relativeTarget){const x=this.getClosestProjectingParent();x&&x.layout&&this.animationProgress!==1?(this.relativeParent=x,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Pt(),this.relativeTargetOrigin=Pt(),Vs(this.relativeTargetOrigin,this.layout.layoutBox,x.layout.layoutBox),Ke(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Pt(),this.targetWithTransforms=Pt()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),fw(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Ke(this.target,this.layout.layoutBox),U0(this.target,this.targetDelta)):Ke(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const x=this.getClosestProjectingParent();x&&!!x.resumingFrom==!!this.resumingFrom&&!x.options.layoutScroll&&x.target&&this.animationProgress!==1?(this.relativeParent=x,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Pt(),this.relativeTargetOrigin=Pt(),Vs(this.relativeTargetOrigin,this.target,x.target),Ke(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||Vu(this.parent.latestValues)||N0(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){const d=this.getLead(),p=!!this.resumingFrom||this!==d;let h=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(h=!1),p&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(h=!1),this.resolvedRelativeTargetAt===ue.timestamp&&(h=!1),h)return;const{layout:v,layoutId:g}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(v||g))return;Ke(this.layoutCorrected,this.layout.layoutBox);const b=this.treeScale.x,x=this.treeScale.y;TS(this.layoutCorrected,this.treeScale,this.path,p),d.layout&&!d.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(d.target=d.layout.layoutBox,d.targetWithTransforms=Pt());const{target:z}=d;if(!z){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Gv(this.prevProjectionDelta.x,this.projectionDelta.x),Gv(this.prevProjectionDelta.y,this.projectionDelta.y)),Os(this.projectionDelta,this.layoutCorrected,z,this.latestValues),(this.treeScale.x!==b||this.treeScale.y!==x||!Zv(this.projectionDelta.x,this.prevProjectionDelta.x)||!Zv(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",z))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(d=!0){if(this.options.visualElement?.scheduleRender(),d){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Mi(),this.projectionDelta=Mi(),this.projectionDeltaWithTransform=Mi()}setAnimationOrigin(d,p=!1){const h=this.snapshot,v=h?h.latestValues:{},g={...this.latestValues},b=Mi();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!p;const x=Pt(),z=h?h.source:void 0,Y=this.layout?this.layout.source:void 0,J=z!==Y,X=this.getStack(),G=!X||X.members.length<=1,I=!!(J&&!G&&this.options.crossfade===!0&&!this.path.some(a4));this.animationProgress=0;let Q;this.mixTargetDelta=at=>{const W=at/1e3;tg(b.x,d.x,W),tg(b.y,d.y,W),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Vs(x,this.layout.layoutBox,this.relativeParent.layout.layoutBox),n4(this.relativeTarget,this.relativeTargetOrigin,x,W),Q&&qw(this.relativeTarget,Q)&&(this.isProjectionDirty=!1),Q||(Q=Pt()),Ke(Q,this.relativeTarget)),J&&(this.animationValues=g,Lw(g,v,this.latestValues,W,I,G)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=W},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(d){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(ca(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Vt.update(()=>{wo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Bi(0)),this.currentAnimation=Bw(this.motionValue,[0,1e3],{...d,velocity:0,isSync:!0,onUpdate:p=>{this.mixTargetDelta(p),d.onUpdate&&d.onUpdate(p)},onStop:()=>{},onComplete:()=>{d.onComplete&&d.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const d=this.getStack();d&&d.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Fw),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const d=this.getLead();let{targetWithTransforms:p,target:h,layout:v,latestValues:g}=d;if(!(!p||!h||!v)){if(this!==d&&this.layout&&v&&ny(this.options.animationType,this.layout.layoutBox,v.layoutBox)){h=this.target||Pt();const b=ve(this.layout.layoutBox.x);h.x.min=d.target.x.min,h.x.max=h.x.min+b;const x=ve(this.layout.layoutBox.y);h.y.min=d.target.y.min,h.y.max=h.y.min+x}Ke(p,h),ki(p,g),Os(this.projectionDeltaWithTransform,this.layoutCorrected,p,g)}}registerSharedNode(d,p){this.sharedNodes.has(d)||this.sharedNodes.set(d,new Gw),this.sharedNodes.get(d).add(p);const v=p.options.initialPromotionConfig;p.promote({transition:v?v.transition:void 0,preserveFollowOpacity:v&&v.shouldPreserveFollowOpacity?v.shouldPreserveFollowOpacity(p):void 0})}isLead(){const d=this.getStack();return d?d.lead===this:!0}getLead(){const{layoutId:d}=this.options;return d?this.getStack()?.lead||this:this}getPrevLead(){const{layoutId:d}=this.options;return d?this.getStack()?.prevLead:void 0}getStack(){const{layoutId:d}=this.options;if(d)return this.root.sharedNodes.get(d)}promote({needsReset:d,transition:p,preserveFollowOpacity:h}={}){const v=this.getStack();v&&v.promote(this,h),d&&(this.projectionDelta=void 0,this.needsReset=!0),p&&this.setOptions({transition:p})}relegate(){const d=this.getStack();return d?d.relegate(this):!1}resetSkewAndRotation(){const{visualElement:d}=this.options;if(!d)return;let p=!1;const{latestValues:h}=d;if((h.z||h.rotate||h.rotateX||h.rotateY||h.rotateZ||h.skewX||h.skewY)&&(p=!0),!p)return;const v={};h.z&&xu("z",d,v,this.animationValues);for(let g=0;g<Au.length;g++)xu(`rotate${Au[g]}`,d,v,this.animationValues),xu(`skew${Au[g]}`,d,v,this.animationValues);d.render();for(const g in v)d.setStaticValue(g,v[g]),this.animationValues&&(this.animationValues[g]=v[g]);d.scheduleRender()}applyProjectionStyles(d,p){if(!this.instance||this.isSVG)return;if(!this.isVisible){d.visibility="hidden";return}const h=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,d.visibility="",d.opacity="",d.pointerEvents=So(p?.pointerEvents)||"",d.transform=h?h(this.latestValues,""):"none";return}const v=this.getLead();if(!this.projectionDelta||!this.layout||!v.target){this.options.layoutId&&(d.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,d.pointerEvents=So(p?.pointerEvents)||""),this.hasProjected&&!za(this.latestValues)&&(d.transform=h?h({},""):"none",this.hasProjected=!1);return}d.visibility="";const g=v.animationValues||v.latestValues;this.applyTransformsToTarget();let b=Qw(this.projectionDeltaWithTransform,this.treeScale,g);h&&(b=h(g,b)),d.transform=b;const{x,y:z}=this.projectionDelta;d.transformOrigin=`${x.origin*100}% ${z.origin*100}% 0`,v.animationValues?d.opacity=v===this?g.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:g.opacityExit:d.opacity=v===this?g.opacity!==void 0?g.opacity:"":g.opacityExit!==void 0?g.opacityExit:0;for(const Y in Js){if(g[Y]===void 0)continue;const{correct:J,applyTo:X,isCSSVariable:G}=Js[Y],I=b==="none"?g[Y]:J(g[Y],v);if(X){const Q=X.length;for(let at=0;at<Q;at++)d[X[at]]=I}else G?this.options.visualElement.renderState.vars[Y]=I:d[Y]=I}this.options.layoutId&&(d.pointerEvents=v===this?So(p?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(d=>d.currentAnimation?.stop()),this.root.nodes.forEach(_v),this.root.sharedNodes.clear()}}}function Xw(a){a.updateLayout()}function Pw(a){const i=a.resumeFrom?.snapshot||a.snapshot;if(a.isLead()&&a.layout&&i&&a.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:r}=a.layout,{animationType:u}=a.options,m=i.source!==a.layout.source;u==="size"?Ie(g=>{const b=m?i.measuredBox[g]:i.layoutBox[g],x=ve(b);b.min=l[g].min,b.max=b.min+x}):ny(u,i.layoutBox,l)&&Ie(g=>{const b=m?i.measuredBox[g]:i.layoutBox[g],x=ve(l[g]);b.max=b.min+x,a.relativeTarget&&!a.currentAnimation&&(a.isProjectionDirty=!0,a.relativeTarget[g].max=a.relativeTarget[g].min+x)});const d=Mi();Os(d,l,i.layoutBox);const p=Mi();m?Os(p,a.applyTransform(r,!0),i.measuredBox):Os(p,l,i.layoutBox);const h=!W0(d);let v=!1;if(!a.resumeFrom){const g=a.getClosestProjectingParent();if(g&&!g.resumeFrom){const{snapshot:b,layout:x}=g;if(b&&x){const z=Pt();Vs(z,i.layoutBox,b.layoutBox);const Y=Pt();Vs(Y,l,x.layoutBox),$0(z,Y)||(v=!0),g.options.layoutRoot&&(a.relativeTarget=Y,a.relativeTargetOrigin=z,a.relativeParent=g)}}}a.notifyListeners("didUpdate",{layout:l,snapshot:i,delta:p,layoutDelta:d,hasLayoutChanged:h,hasRelativeLayoutChanged:v})}else if(a.isLead()){const{onExitComplete:l}=a.options;l&&l()}a.options.transition=void 0}function Kw(a){a.parent&&(a.isProjecting()||(a.isProjectionDirty=a.parent.isProjectionDirty),a.isSharedProjectionDirty||(a.isSharedProjectionDirty=!!(a.isProjectionDirty||a.parent.isProjectionDirty||a.parent.isSharedProjectionDirty)),a.isTransformDirty||(a.isTransformDirty=a.parent.isTransformDirty))}function Iw(a){a.isProjectionDirty=a.isSharedProjectionDirty=a.isTransformDirty=!1}function Zw(a){a.clearSnapshot()}function _v(a){a.clearMeasurements()}function Wv(a){a.isLayoutDirty=!1}function _w(a){const{visualElement:i}=a.options;i&&i.getProps().onBeforeLayoutMeasure&&i.notify("BeforeLayoutMeasure"),a.resetTransform()}function $v(a){a.finishAnimation(),a.targetDelta=a.relativeTarget=a.target=void 0,a.isProjectionDirty=!0}function Ww(a){a.resolveTargetDelta()}function $w(a){a.calcProjection()}function t4(a){a.resetSkewAndRotation()}function e4(a){a.removeLeadSnapshot()}function tg(a,i,l){a.translate=jt(i.translate,0,l),a.scale=jt(i.scale,1,l),a.origin=i.origin,a.originPoint=i.originPoint}function eg(a,i,l,r){a.min=jt(i.min,l.min,r),a.max=jt(i.max,l.max,r)}function n4(a,i,l,r){eg(a.x,i.x,l.x,r),eg(a.y,i.y,l.y,r)}function a4(a){return a.animationValues&&a.animationValues.opacityExit!==void 0}const i4={duration:.45,ease:[.4,0,.1,1]},ng=a=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(a),ag=ng("applewebkit/")&&!ng("chrome/")?Math.round:_e;function ig(a){a.min=ag(a.min),a.max=ag(a.max)}function s4(a){ig(a.x),ig(a.y)}function ny(a,i,l){return a==="position"||a==="preserve-aspect"&&!dw(Iv(i),Iv(l),.2)}function l4(a){return a!==a.root&&a.scroll?.wasRoot}const o4=ey({attachResizeListener:(a,i)=>Xs(a,"resize",i),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Su={current:void 0},ay=ey({measureScroll:a=>({x:a.scrollLeft,y:a.scrollTop}),defaultParent:()=>{if(!Su.current){const a=new o4({});a.mount(window),a.setOptions({layoutScroll:!0}),Su.current=a}return Su.current},resetTransform:(a,i)=>{a.style.transform=i!==void 0?i:"none"},checkIsScrollRoot:a=>window.getComputedStyle(a).position==="fixed"}),r4={pan:{Feature:Ew},drag:{Feature:Cw,ProjectionNode:ay,MeasureLayout:I0}};function sg(a,i,l){const{props:r}=a;a.animationState&&r.whileHover&&a.animationState.setActive("whileHover",l==="Start");const u="onHover"+l,m=r[u];m&&Vt.postRender(()=>m(i,Zs(i)))}class c4 extends fa{mount(){const{current:i}=this.node;i&&(this.unmount=Lx(i,(l,r)=>(sg(this.node,r,"Start"),u=>sg(this.node,u,"End"))))}unmount(){}}class u4 extends fa{constructor(){super(...arguments),this.isActive=!1}onFocus(){let i=!1;try{i=this.node.current.matches(":focus-visible")}catch{i=!0}!i||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Ps(Xs(this.node.current,"focus",()=>this.onFocus()),Xs(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function lg(a,i,l){const{props:r}=a;if(a.current instanceof HTMLButtonElement&&a.current.disabled)return;a.animationState&&r.whileTap&&a.animationState.setActive("whileTap",l==="Start");const u="onTap"+(l==="End"?"":l),m=r[u];m&&Vt.postRender(()=>m(i,Zs(i)))}class d4 extends fa{mount(){const{current:i}=this.node;i&&(this.unmount=jx(i,(l,r)=>(lg(this.node,r,"Start"),(u,{success:m})=>lg(this.node,u,m?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const Fu=new WeakMap,wu=new WeakMap,f4=a=>{const i=Fu.get(a.target);i&&i(a)},m4=a=>{a.forEach(f4)};function h4({root:a,...i}){const l=a||document;wu.has(l)||wu.set(l,{});const r=wu.get(l),u=JSON.stringify(i);return r[u]||(r[u]=new IntersectionObserver(m4,{root:a,...i})),r[u]}function p4(a,i,l){const r=h4(i);return Fu.set(a,l),r.observe(a),()=>{Fu.delete(a),r.unobserve(a)}}const v4={some:0,all:1};class g4 extends fa{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:i={}}=this.node.getProps(),{root:l,margin:r,amount:u="some",once:m}=i,d={root:l?l.current:void 0,rootMargin:r,threshold:typeof u=="number"?u:v4[u]},p=h=>{const{isIntersecting:v}=h;if(this.isInView===v||(this.isInView=v,m&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:g,onViewportLeave:b}=this.node.getProps(),x=v?g:b;x&&x(h)};return p4(this.node.current,d,p)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:i,prevProps:l}=this.node;["amount","margin","root"].some(y4(i,l))&&this.startObserver()}unmount(){}}function y4({viewport:a={}},{viewport:i={}}={}){return l=>a[l]!==i[l]}const b4={inView:{Feature:g4},tap:{Feature:d4},focus:{Feature:u4},hover:{Feature:c4}},A4={layout:{ProjectionNode:ay,MeasureLayout:I0}},x4={...sw,...b4,...r4,...A4},bo=xS(x4,zS),Ua={primary:"#543AF8",secondaryBg:"#EFF6FF",textDark:"#141414",textMuted:"#1A1C1E",homeIndicator:"#141414"};function S4({onSignIn:a,onRegister:i}){return Oe.jsxs("div",{style:{width:"100%",height:"100%",margin:0,padding:0,backgroundColor:"#FFFFFF",position:"relative",fontFamily:"'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",color:Ua.textDark,overflow:"hidden",flex:1},children:[Oe.jsxs(bo.div,{initial:{opacity:0,y:-40},animate:{opacity:1,y:0},transition:{duration:1.5,ease:"easeOut"},style:{position:"absolute",top:120,left:0,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:16},children:[Oe.jsx(bo.img,{src:G2,alt:"NovaPay logo",initial:{opacity:.6},animate:{opacity:1},transition:{duration:1.5,ease:"easeOut"},style:{width:230,height:200,objectFit:"contain"}}),Oe.jsx(bo.img,{src:Q2,alt:"NovaPay text",initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.5},style:{width:240,marginTop:0,objectFit:"contain"}})]}),Oe.jsxs(bo.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:1.2,delay:.35,ease:"easeOut"},style:{position:"absolute",left:0,right:0,bottom:64,display:"flex",flexDirection:"column",alignItems:"center",gap:16},children:[Oe.jsxs("div",{style:{display:"flex",width:280,height:52,borderRadius:14,backgroundColor:Ua.secondaryBg,padding:4,boxSizing:"border-box"},children:[Oe.jsx("button",{type:"button","data-testid":"btnCreateAccount",onClick:i,style:{flex:1,border:"none",borderRadius:14,backgroundColor:Ua.primary,color:"#FFFFFF",fontSize:14,fontWeight:600,cursor:"pointer"},children:"Register"}),Oe.jsx("button",{type:"button","data-testid":"btnSignIn",onClick:a,style:{flex:1,border:"none",borderRadius:14,backgroundColor:Ua.secondaryBg,color:Ua.primary,fontSize:14,fontWeight:500,cursor:"pointer"},children:"Sign In"})]}),Oe.jsx("div",{style:{fontSize:12,color:Ua.textMuted},children:"Powered by Nium"})]}),Oe.jsx("div",{style:{position:"absolute",left:"50%",bottom:"calc(8px + env(safe-area-inset-bottom))",transform:"translateX(-50%)",width:134,height:5,borderRadius:999,backgroundColor:Ua.homeIndicator}})]})}function w4(){const a=M("#app");if(!a)return;a.querySelector("#landing-react-root")||(a.innerHTML='<div id="landing-react-root" style="width:100%;height:100%;margin:0;padding:0;overflow:hidden;position:absolute;top:0;left:0;right:0;bottom:0;"></div>');const i=a.querySelector("#landing-react-root");if(!i)return;const l=()=>q("/login"),r=()=>q("/register");j2.createRoot(i).render(N2.createElement(S4,{onSignIn:l,onRegister:r}))}function Qt(a,i="JMD"){const l=Math.abs(a);return i==="JMD"?`J$${l.toLocaleString("en-JM",{minimumFractionDigits:0,maximumFractionDigits:0})}`:i==="USD"?`$${l.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:`${i} ${l.toLocaleString()}`}function da(a){if(!a)return 0;const i=a.replace(/[,$\s]/g,""),l=parseFloat(i);return isNaN(l)?0:l}let St={step:1,recipient:null,amount:0,note:"",currency:"JMD"};function Hs(){const a=M("#app");a&&(a.innerHTML=`
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
          ${T4()}
        </div>
      </div>
    </div>
  `,D("click","#btnBackTransfer",()=>{St.step>1?(St.step-=1,Hs()):q("/dashboard",{animate:"slide-left-fade"})}),k4())}function T4(){switch(St.step){case 1:return og();case 2:return C4();case 3:return E4();default:return og()}}function og(){return`
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
  `}function C4(){return`
    <div class="form-field">
      <h3 class="section-title-sm">Send to ${St.recipient.name}</h3>
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
      <p class="form-hint">Available: ${Qt(j.balances.JMD||0,"JMD")}</p>
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
  `}function E4(){const a=St.currency==="USD"?"$":"J$";return`
    <div class="form-field">
      <h3 class="section-title-sm">Confirm Transfer</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Please review the details before sending money.
      </p>
    </div>

    <div class="confirm-recipient-card">
      <div class="confirm-recipient-avatar">${St.recipient.avatar}</div>
      <div class="confirm-recipient-info">
        <h4 class="confirm-recipient-name">${St.recipient.name}</h4>
        <p class="confirm-recipient-phone">${St.recipient.phone}</p>
      </div>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Transaction Details</h3>
    </div>

    <div class="transaction-details">
      <div class="transaction-detail-row">
        <span class="transaction-detail-label">Amount</span>
        <span class="transaction-detail-value">${Qt(St.amount,St.currency)}</span>
      </div>

      <div class="transaction-detail-row">
        <span class="transaction-detail-label">Fee</span>
        <span class="transaction-detail-value">${a}0.00</span>
      </div>

      ${St.note?`
        <div class="transaction-detail-row">
          <span class="transaction-detail-label">Note</span>
          <span class="transaction-detail-value note-text">${St.note}</span>
        </div>
      `:""}

      <div class="transaction-detail-divider"></div>

      <div class="transaction-detail-row total-row">
        <span class="transaction-detail-label">Total</span>
        <span class="transaction-detail-value total-value">${Qt(St.amount,St.currency)}</span>
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
  `}function k4(){const a=M("#app");D(a,'[data-action="scan-qr"]',"click",()=>{q("/scan-qr",{animate:"slide-right-fade"})}),D(a,".contact-card","click",function(){const i=this.dataset.contact;St.recipient=JSON.parse(i),St.step=2,Hs()}),D(a,"#amountInput","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l;const r=da(l),u=M("#continueBtn");r>0&&Bn(r)?u.disabled=!1:u.disabled=!0}),D(a,"#currency","change",i=>{St.currency=i.target.value}),D(a,".quick-amount-btn","click",function(){const i=this.dataset.quickAmount;M("#amountInput").value=i,M("#amountInput").dispatchEvent(new Event("input"))}),D(a,"#continueBtn","click",()=>{const i=da(M("#amountInput").value),l=M("#noteInput").value.trim(),r=M("#currency").value;if(!Bn(i)){V("Insufficient balance");return}St.amount=i,St.note=l,St.currency=r,St.step=3,Hs()}),D(a,'[data-testid="btnConfirmSend"]',"click",()=>{if(!Bn(St.amount)){V("Insufficient balance. Would you like to add money?"),setTimeout(()=>q("/add-money",{animate:"slide-right-fade"}),2e3);return}const i=M('[data-testid="btnConfirmSend"]');i.textContent="Processing...",i.disabled=!0,setTimeout(()=>{ra(St.currency,-St.amount),oa({title:`To ${St.recipient.name}`,amount:-St.amount,currency:St.currency,type:"P2P_SEND"}),V(`Sent ${Qt(St.amount,St.currency)} to ${St.recipient.name}`),St={step:1,recipient:null,amount:0,note:"",currency:"JMD"},q("/dashboard",{animate:"slide-left-fade"})},2e3)}),D(a,'[data-action="edit-amount"]',"click",()=>{St.step=2,Hs()})}const iy=document.createElement("style");iy.textContent=`
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
`;document.head.appendChild(iy);function M4(){const a=M("#app");a.innerHTML=`
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
  `,document.head.appendChild(i),D(a,".add-money-option","click",function(){const l=this.dataset.method;l==="bank"?M("#bankDetails").classList.toggle("hidden"):V(`${l} option coming soon!`)}),D(a,'[data-action="copy-account"]',"click",()=>{navigator.clipboard.writeText("123-456-789"),V("Account number copied!")}),D(a,'[data-action="copy-reference"]',"click",()=>{const l=M("#walletId").textContent;navigator.clipboard.writeText(l),V("Wallet ID copied!")}),D(a,'[data-action="share-details"]',"click",async()=>{const r=`NovaPay Bank Transfer Details:
Bank: National Commercial Bank
Account: NovaPay Limited
Account Number: 123-456-789
Reference: ${M("#walletId").textContent}`;if(navigator.share)try{await navigator.share({title:"NovaPay Bank Details",text:r})}catch{console.log("Share cancelled")}else navigator.clipboard.writeText(r),V("Bank details copied to clipboard!")}),D(a,"[data-amount]","click",function(){const l=parseInt(this.dataset.amount);this.textContent="Adding...",this.disabled=!0,setTimeout(()=>{ra("JMD",l),oa({title:"Bank Transfer",amount:l,currency:"JMD",type:"TOP_UP"}),V(`Added ${Qt(l,"JMD")} to your account!`),q("/dashboard")},1500)})}function D4(){window.history.length>1?window.history.back():window.location.href="/"}const sy=document.createElement("style");sy.textContent=`
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
`;document.head.appendChild(sy);function B4(a){return`$ ${(Number(a)/15500).toFixed(2)}`}let Ve={method:null,bankAccount:null,currency:"JMD"};function Ed(){const a=M("#app");a&&(a.innerHTML=`
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
        ${Ve.method?N4():R4()}
      </div>
    </div>
  `,D("click","#btnBackWithdraw",()=>{Ve.method?(Ve.method=null,Ed()):q("/dashboard",{animate:"slide-left-fade"})}),z4())}function R4(){return`
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
      <p class="np-balance-amount">${B4(j.balances.JMD||0)}</p>
    </section>
  `}function N4(){return U4()}function U4(){return`
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
        <p class="form-hint">Available: ${Qt(j.balances.JMD||0,"JMD")}</p>
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
  `}function z4(){const a=M("#app");D(a,".withdraw-method-card","click",i=>{const l=i.currentTarget.dataset.method;if(Ve.method=l,l==="bank"){q("/bank-selection",{animate:"slide-right-fade"});return}Ed()}),D(a,".bank-account-card","click",i=>{if(i.currentTarget.dataset.action==="add-account"){V("Add bank account feature coming soon!");return}const l=i.currentTarget.querySelector('input[type="radio"]');l&&(l.checked=!0,Ve.bankAccount=JSON.parse(i.currentTarget.dataset.account))}),D(a,"#withdrawCurrency, #agentCurrency","change",i=>{Ve.currency=i.target.value}),D(a,".quick-amount-btn","click",i=>{const l=i.currentTarget.dataset.quickAmount,r=M("#withdrawAmount")||M("#agentAmount");r&&(r.value=l,r.dispatchEvent(new Event("input")))}),D(a,"#withdrawAmount, #agentAmount","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l}),D(a,"#bankWithdrawForm","submit",i=>{i.preventDefault();const l=da(M("#withdrawAmount").value),r=M("#withdrawCurrency").value;if(!M('input[name="bankAccount"]:checked')){V("Please select a bank account");return}if(l<=0){V("Please enter a valid amount");return}if(!Bn(l)){V("Insufficient balance");return}Ve.currency=r,L4(l)}),D(a,"#agentWithdrawForm","submit",i=>{i.preventDefault();const l=da(M("#agentAmount").value),r=M("#agentCurrency").value,m=l+50;if(l<=0){V("Please enter a valid amount");return}if(!Bn(m)){V("Insufficient balance (including J$50 fee)");return}Ve.currency=r,O4(l)}),D(a,'[data-action="agent-complete"]',"click",i=>{const l=parseFloat(i.currentTarget.getAttribute("data-total"));isNaN(l)||(ra("JMD",-l),oa({title:"Agent Withdrawal",amount:-l,currency:"JMD",type:"WITHDRAW"}),V("Withdrawal completed successfully!"),Ve={method:null,amount:0,bankAccount:null,currency:"JMD"},q("/dashboard",{animate:"slide-left-fade"}))})}function L4(a,i){const l=M('[data-testid="btnConfirmWithdraw"]');l.textContent="Processing...",l.disabled=!0,setTimeout(()=>{ra(Ve.currency,-a),oa({title:"Bank Withdrawal",amount:-a,currency:Ve.currency,type:"WITHDRAW"}),V(`Withdrawal of ${Qt(a,Ve.currency)} initiated`),Ve={method:null,amount:0,bankAccount:null,currency:"JMD"},q("/dashboard",{animate:"slide-left-fade"})},2e3)}function O4(a){const l=a+50,r=Math.random().toString(36).substr(2,8).toUpperCase(),u=M("#app");u.innerHTML=`
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
  `}const ly=document.createElement("style");ly.textContent=`
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
`;document.head.appendChild(ly);const V4="/assets/Teddy_Lrg-C3LzF-C-.png";function oy(){M("#app"),j.card.hasCard?j4():H4()}function H4(){const a=M("#app");a.innerHTML=`
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
  `,D(a,'[data-testid="btnActivateCard"]',"click",()=>{const i=M('[data-testid="btnActivateCard"]');i.textContent="Activating...",i.disabled=!0,setTimeout(()=>{j.card.hasCard=!0,j.card.masked="•••• •••• •••• 1234",j.card.expiry="12/28",j.card.frozen=!1,sn(),V("Virtual card activated successfully!"),oy()},2e3)}),ry()}function j4(){const a=M("#app");j.txs.filter(i=>i.type==="CARD").slice(0,5),a.innerHTML=`
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
            ${j.card.linkedAccounts&&j.card.linkedAccounts.length?j.card.linkedAccounts.map(i=>`
              <div class="linked-item">
                <div class="linked-main">
                  <div class="linked-label">${i.label}</div>
                  <div class="linked-meta">${i.type==="BANK"?"Bank account":"Card"} · ${i.masked||""}</div>
                </div>
                <div class="linked-status">${i.status||"Active"}</div>
              </div>
            `).join(""):`
              <div class="linked-empty">
                <img src="${V4}" alt="" class="linked-empty-img" />
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
  `,ry()}function ry(){const a=M("#app");D(a,'[data-action="nav-back"]',"click",()=>q("/dashboard")),D(a,"#toggleCvv","click",()=>{const i=M("#cvvDisplay"),l=M("#toggleCvv");i.textContent==="•••"?(i.textContent="123",l.textContent="🙈 Hide CVV"):(i.textContent="•••",l.textContent="👁️ Reveal CVV")}),D(a,"#toggleFreeze","click",()=>{const i=M("#toggleFreeze");j.card.frozen=!j.card.frozen,sn(),j.card.frozen?(i.textContent="🔓 Unfreeze Card",V("Card frozen successfully")):(i.textContent="🔒 Freeze Card",V("Card unfrozen successfully"))}),D(a,"#addToWallet","click",()=>{V("Add to Wallet feature coming soon!")}),D(a,"#addBankCard","click",()=>{V("Add Bank/Card linking is coming soon!")}),D(a,"#setLimits","click",()=>{V("Set Limits feature coming soon!")}),D(a,"#cardSettings","click",()=>{V("Card Settings feature coming soon!")})}const cy=document.createElement("style");cy.textContent=`
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
`;document.head.appendChild(cy);function Y4(){const a=M("#app");a.innerHTML=`
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
  `,q4()}function q4(){const a=document.querySelector("#app");D(a,'[data-action="nav-back"]',"click",()=>D4());const i={"#completeKyc":"KYC verification process coming soon!","#enableBiometric":"Biometric authentication coming soon!","#changePin":"Change PIN feature coming soon!","#notifications":"Notification settings coming soon!","#privacy":"Privacy settings coming soon!","#helpCenter":"Help Center coming soon!","#contactSupport":"Support chat coming soon!","#feedback":"Feedback form coming soon!","#terms":"Terms of Service coming soon!","#privacy-policy":"Privacy Policy coming soon!"};for(const[l,r]of Object.entries(i))D(a,l,"click",()=>V(r));D(a,'[data-testid="btnLogout"]',"click",()=>{confirm("Are you sure you want to sign out?")&&(e2(),V("Signed out successfully"),q("/landing"))})}const uy=document.createElement("style");uy.textContent=`
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
`;document.head.appendChild(uy);const rg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGQSURBVHgBzZeNbYMwFISPTMAI3iDdoCOEEbJB2QA2SDZIN0gyAeoEYQNgArqB6wObuq349VOVT3rkTzqO94xzANPEpjJThanKlBaq1mqmphQ2oKyA/qe6YIXRN3uFwSeO41gfj0d9vV51VVXa8Xg8uu/4G352NZ0zl0kYYyVJotu21XPQ+C+jGSY6J2LudDrptWRZ5mv86aSC0Fh5oq3wwvA9buUbvEiY46hC4dKweoXfPZHR+jfCVrhueXNZzXhnDgkEMN2DUgqhGHMwXXQfUxo8QIDDQUSmwzP4SoMvEECie479fj/IRuhnHYxZPpAkiqLudYcnhwZrCFDXNaQoy9K9/RQz6IkG0zTNIEuDHxDgfr9DitvtNsjywMwXvElzc10SDubgZu/pKue0kDDJv6lQvGRz8btKpyJh4Xw+663keT4aFkgqYZDFE62FF+ZpjAbXXMokR7UkPHDdeglGWw+TpBAatzPKeM+Y76BxF/m95LIo8juUqXcpkwuqQMDTXWoFxLqK/hGWmjn6bW6ULyka/cC57vi0AAAAAElFTkSuQmCC",cg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKCSURBVHgBzZf9bRpBEMXf7i3mbLAMfyAHlEjQQVJB0kHSQZQK7FQAdEAHSQl2B3YFcQcgJQpWHMs4fB33NZlZ+yxbGJRwK8s/6cTOabV6Nzu781BYQ7/fr/h++YCAdwTVBKgJFyg1UkRnKeE4UvFRq14frJz62MvhcNgkmC8iDE+C+hoi6j4mdEng+fnlQQLqgKiitUaxuIVtfwvGGBhP2zlRnCBJEgRBiNk8gBuNGKk06TYaL3oPX99jOLxsp0g7Mvb9Iqp7Zd4NtXZdETqezJ0J5RR06vVad0mgzRylVv3ebgml0jb+h/FkZh8XKEo+Z5m0AqXmUlX4Jtu6W96BPJswmc7xZzxFbni7Q4rfSE3aokp1oS3idrb9jcUJZc66lEZuCJUiH1Kr1WYPpi/Bfq0Kz/OQh5Tvjl+/r/g3RV7CwFR1QuaDBJK9vOIErRV8PvkuMFvhoaz3XgLfL8AVvu9GoKf1W00KryUwDrKXUTBu1pLupaUgJZCL2BWes4+lpsYzhwWqgQySJP+py5BW6AS+D/mM0OBm0QiukPbnAiKcaU7cqQRB4E6gmAgnUHKs49D0bhZdsGJCXqRUXBmHSNGRbrWqI27IJymLu7oeIy+uDIN4xLterBB/koKUrZlyw88jzkn2xCywgZWhFVhnpZTCvrhmN7JJFqazwFn2REvmrh+40e/Diw4rbss4czaet/6qJFsaE1vDLmDD3H1V3+9k8ZJd/vHz4lBpFnnbYUSoNH9j9F23kYMQRTHmixCLxcI6mNzwtkrmXjZqqy1/hliwBF5HQX3EE8CfdxLxOfinP033sULFjrHjUWIqbrOaHzUgbhAs7DQOJr1WqzVaNfMvKPAmQnPv/FoAAAAASUVORK5CYII=",G4="/assets/NoNotifications-D5ZjIhfU.png";function dy(){const a=M("#app"),i=!!j?.preferences?.notificationsEnabled,l=Array.isArray(j.notifications)&&j.notifications.length>0,r=l?"":`
        <div class="notifications-empty-state">
          <img src="${G4}" alt="No notifications" class="notifications-empty-img" />
        </div>
      `,u=l?`
        <div class="notifications-list">
          ${j.notifications.map(d=>{const p=d.title||"NovaPay",h=Q4(d.createdAt),v=d.message||"",b=!d.isRead?"notification-status-dot notification-status-dot-unread":"notification-status-dot";return`
                <div class="notification-card">
                  <div class="notification-main">
                    <div class="notification-icon">
                      <span class="notification-icon-letter">N</span>
                    </div>
                    <div class="notification-content">
                      <div class="notification-header-row">
                        <div class="notification-title">${ug(p)}</div>
                        <div class="notification-time">${h}</div>
                      </div>
                      <div class="notification-text">${ug(v)}</div>
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
              <img src="${i?rg:cg}" alt="Notifications toggle" class="np-toggle-img" id="notificationsToggleImg" />
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
  `;const m=document.querySelector("#app");D(m,"#btnBack","click",()=>la()),D(m,"#btnToggleNotifications","click",()=>{const p=!!!j?.preferences?.notificationsEnabled;j.preferences||(j.preferences={}),j.preferences.notificationsEnabled=p,sn();const h=document.getElementById("notificationsToggleImg");h&&(h.src=p?rg:cg),V(`Notifications ${p?"enabled":"disabled"}`)}),D(m,"#btnMarkAllRead","click",()=>{if(!(Array.isArray(j.notifications)&&j.notifications.length>0)){V("No notifications to mark as read");return}j.notifications=[],sn(),V("All notifications marked as read"),dy()})}function Q4(a){try{return(a?new Date(a):new Date).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"}).toLowerCase()}catch{return""}}function ug(a){return a==null?"":String(a).replace(/[&<>"']/g,i=>{switch(i){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return i}})}function F4(){const a=M("#app");a.innerHTML=`
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
  `,D("click","#btnBack",()=>la()),D("click","#btnFilter",()=>V("Filter options coming soon")),document.querySelectorAll(".filter-tab").forEach(i=>{i.addEventListener("click",l=>{document.querySelectorAll(".filter-tab").forEach(u=>u.classList.remove("active")),l.target.classList.add("active");const r=l.target.dataset.filter;dg(r)})}),dg("all")}async function dg(a="all"){const i=M("#txContent");try{const l=await ja("/wallet/transactions");if(!l||l.length===0){i.innerHTML=Z4();return}let r=l;a==="income"?r=l.filter(m=>m.kind==="DEPOSIT"||m.kind==="RECEIVE"):a==="expense"&&(r=l.filter(m=>m.kind==="WITHDRAW"||m.kind==="TRANSFER"||m.kind==="BILL"));const u=J4(r);i.innerHTML=P4(u)}catch(l){console.error("[TRANSACTIONS]",l),i.innerHTML=I4()}}function J4(a){const i={};return a.forEach(l=>{const r=new Date(l.createdAt),u=X4(r);i[u]||(i[u]=[]),i[u].push(l)}),i}function X4(a){const i=new Date,l=new Date(i);return l.setDate(l.getDate()-1),a.toDateString()===i.toDateString()?"Today":a.toDateString()===l.toDateString()?"Yesterday":a.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function P4(a){return Object.entries(a).map(([i,l])=>`
    <div class="tx-group">
      <div class="tx-date-header">${i}</div>
      ${l.map(r=>K4(r)).join("")}
    </div>
  `).join("")}function K4(a){const i=a.kind==="DEPOSIT"||a.kind==="RECEIVE",l=i?"tx-icon-green":a.kind==="TRANSFER"?"tx-icon-blue":a.kind==="BILL"?"tx-icon-orange":"tx-icon-red",r=i?"tx-amount-positive":"tx-amount-negative",u=i?"+":"-",m=_4(a.kind),d=W4(a.kind),p=$4(a.createdAt),h=(Number(a.amount||0)/100).toFixed(2);return`
    <div class="tx-card">
      <div class="tx-icon-wrapper ${l}">${m}</div>
      <div class="tx-details">
        <div class="tx-label">${d}</div>
        <div class="tx-time">${p}</div>
        ${a.reference?`<div class="tx-ref">Ref: ${a.reference}</div>`:""}
      </div>
      <div class="tx-amount-wrapper">
        <div class="tx-amount ${r}">${u}$${h}</div>
        <div class="tx-currency">${a.currency}</div>
      </div>
    </div>
  `}function I4(){return`
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
  `}function Z4(){return`
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
  `}function _4(a){const i={DEPOSIT:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',WITHDRAW:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',TRANSFER:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',BILL:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',RECEIVE:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'};return i[a]||i.TRANSFER}function W4(a){return{DEPOSIT:"Deposit",WITHDRAW:"Withdrawal",TRANSFER:"Transfer",BILL:"Bill Payment",RECEIVE:"Received"}[a]||a}function $4(a){try{return new Date(a).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}catch{return"Recently"}}function tT(){const a=M("#app"),i=2e4,l=1e5,r=Math.round(i/l*100),u=`${r}%`,m=2;a.innerHTML=`
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
            <div class="savings-stat-value">${m}</div>
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
  `,D("click","#btnBackFinances",()=>{q("/dashboard")}),D("click","#btnNewGoal",()=>{V("New goal creation coming soon")}),D("click","#btnSelectGoals",()=>{V("Goal selection coming soon")}),D("click",".nav-item-savings",()=>{window.scrollTo({top:0,behavior:"smooth"})}),D("click",".nav-item-budget",()=>{V("Budget section coming soon")}),D("click",".nav-item-bills",()=>{V("Bills section coming soon")}),D("click",".nav-item-learn",()=>{V("Financial education section coming soon")})}function eT(){const a=M("#app"),i=j?.session?.kycTier||"TIER_1";a.innerHTML=`
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
        <div class="kyc-status-badge ${nT(i)}">
          ${aT(i)}
          <span>${iT(i)}</span>
        </div>
        <h2 class="kyc-status-title">Your Verification Status</h2>
        <p class="kyc-status-desc">${sT(i)}</p>
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
  `,D("click","#btnBack",()=>la()),document.querySelectorAll("[data-tier]").forEach(l=>{l.addEventListener("click",r=>{const u=r.target.dataset.tier;lT(u)})})}function nT(a){return{TIER_1:"tier-basic",TIER_2:"tier-standard",TIER_3:"tier-premium"}[a]||"tier-basic"}function aT(a){const i={TIER_1:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',TIER_2:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',TIER_3:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>'};return i[a]||i.TIER_1}function iT(a){return{TIER_1:"Basic",TIER_2:"Standard",TIER_3:"Premium"}[a]||"Basic"}function sT(a){return{TIER_1:"You have basic verification. Upgrade to unlock higher limits and premium features.",TIER_2:"You have standard verification. Upgrade to premium for unlimited transactions.",TIER_3:"You have premium verification. Enjoy unlimited transactions and all features."}[a]||"Complete verification to unlock all features."}function lT(a){V(`Starting Tier ${a} verification process...`),setTimeout(()=>{V("Verification process will be available soon")},1e3)}function oT(){const a=M("#app"),i=j?.session?.user||{},l=i.name||i.email?.split("@")[0]||"User",r=i.email||"",u=l.substring(0,2).toUpperCase(),d=`Hi, ${l.split(" ")[0]||l}!`,p=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),h=p?'<img src="'+p+'" alt="'+l+'" class="settings-avatar-img" />':u;a.innerHTML=`
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
        <div class="settings-avatar">${h}</div>
        <h2 class="settings-name">${fg(d)}</h2>
        <p class="settings-email">${fg(r)}</p>
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
  `;const v=document.querySelector("#app");D(v,"#btnBack","click",()=>la()),D(v,"#btnProfile","click",()=>q("/personal-info")),D(v,"#btnKYC","click",()=>q("/kyc")),D(v,"#btnSecurity","click",()=>V("Security settings coming soon")),D(v,"#btnLanguage","click",()=>V("Language settings coming soon")),D(v,"#btnHelp","click",()=>V("Help center coming soon")),D(v,"#btnTerms","click",()=>V("Terms & Privacy coming soon")),D(v,"#btnAbout","click",()=>V("NovaPay v1.0.0 - Modern Digital Wallet")),D(v,"#btnLogout","click",()=>{confirm("Are you sure you want to log out?")&&(Ag(),V("Logged out successfully"),q("/login"))}),D(v,"#toggleNotifications","change",g=>{const b=g.target.checked;V(`Notifications ${b?"enabled":"disabled"}`)})}function fg(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}const kd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJQSURBVHgB5ZRNaBNBGIbfzSZpGtM0NWlqSGpiMawVitY/9CQo4qla9CSK0YMFsQc9phcjaHOR1oInD0KKHjwlF2sFfyoB8QcPPYhJtZIfQyBNdDdNmybpGmcGW9zY2NaT4AvDDjsfz7zzzXwf8K+LSz7UVO2tFYzMWHHlSzvWKxO/iLvOOHqbRaRmNOAn4y7fNmcJJ50ijpskjOeNkGT1mmAubQkvhSj2b5hDKGxE/y0HeK3e6guFm8FxwLGuPHpNIkKSaVWox5xDsGMamzSL8N+3YuhBK8oVDrzFYvHRgDcf9Jid59HTncc5EhxZ0CFa0q0Iu2pLY9ieRKXIoe+mA2OvjMtry0CqyelGPH1nwJEdBVxwZEFtvyg0KfL1aOsneDaSDeM6eAbbEUkoN1UAqbKSmkEP7y6gp02CSS3j9ZwBgm4Bz91T2NlYxOjjFnjv2FhsrThBEKpYQU367/D3pRk4VtYSdzIbNF+j4y2op7rAJQUGktjXOc/mA8RVMGz8UzhU9Raow9uXUwxGHVINEsdnj37DuoH0oQdvxNhxAzkzdkW2o+N9FwN7z2TYWDNwL3EUvB6D3VLBtbQN5xMuiDLPYIc+Cpggt05dPhn+zDauleKWaeDQpTSKKhUuJjeTcmxTBFNw4KuZzekLoCeIJBqQymp+B3pPZ9B/IsecHJjqVLy/WtG1WLmBQU8dFMkfDm8jerbG7el2V5eSPzFrIEfcgvjPS1hNLm0Zz9xR9g2S8vXfs5JuM0a6DcnXSIZ0m9TfdBuZlSGt7V+P/h/pB40e48T9pTDvAAAAAElFTkSuQmCC",Md="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEMSURBVHgB5ZO9qsIwFMf/rYXeD2y5cLfW4a6976EvoC8g7oK4io8grqKuguLooKuDvoA6OrRuTlVU/Gg99RutJIKD4C9DDiH55SQnAV4dwQzp7vXg79AED+O/0M2YiCfz+kKJNcG1bczLJbgTG9+ZLGs6WzjL50hY3MUb04RSKD4uXHU72IwsOJZFKZ4fgWQYWFC2UBUENJ1f6B1zmk7tYlE/L1zUa/tNCLVS9RX6FsUh4Sk+CC5jUVGw7vfALfyIxvDT7iCg3x5LMv6hNpr4jCd8hXeL4sm+kimsB30IwSAcqrJATdQ0342YQg+ZMpWpX7aa8EojhyNgwXw2x2xd8MEnpHvj5elf7w3ZAnBaTOTFmblEAAAAAElFTkSuQmCC",Dd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFhSURBVHgB5ZJPKARhGMafqVFqYuNAirI2cVl/L3LZclBal3XawyYpadxWXJSyTuKwx01u5OBEUcqmKNZcbCFbyFxM1vqfta12VmO+tyZJzcxhDspTM9/X0zu/3qdngL8urqVnVbM7PKcswpuXTWd49gqLnci+F7CfUDAudmB2QUJwoPmXJwzPwFVfCssNGz0V8HXXokwoQTan0nkpv6KmWqD7bSaHtfULRLue0VZZsN6QyPrDYMmTDPy9DYD27V1dvxD4M3UOlX+yBvYTQKN48xEfxibiOtTzwwuENiBMR+BqrYJlZHYJBpoILE7uYiXWh2jsmCIzLyRu07CdUgjISmGRtnZkjAx6sbR8RrFZZMNjpUz5y9FuUQpFZh8xYPL0HnuHCp1GOYaX1osppm6g3pmXwg2F47b/w9GHTbg/0ubAfFGzDbQj/tFdByfFvR0knN1QlY7gpHSgBCfleCn/UF/rXJ4Rji0dqQAAAABJRU5ErkJggg==",Bd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIHSURBVHgB5VPNTxNxEH39WaNGjPVmuLh4V1b9B1r04sly0JiYGD/RG+LZKBy56GKMcMD4ETFepGpMMNGwBEi4EAgfh5YUukAaCCTAAfq1pcPONF2akrYXDiS85JfdnZm8fTO/N8CBx5YHlKjTaHt8nBidnyfpYkOPnBftI5SLxYhr+OSsmMQK+a8/wmQbhptPBvykjtwIgiwLqcuXYLe14endC/jw+hpqz54sK+JUzVF0v7yCm0NdyLQ8k5i3uRnH+03g/adJyrS+cv+SCgZFVXxpkzqdXKlCji2OTFNS1924bbzJd+fkwNIftPyjhe9/KKlpVBgBEzFKCXk0xXX8HV/eFA7mUix3dGIFTb+zsLp7oep1GUHyfB2yHR172uVYbt6SOm5xDLV4+Py/cAioCkoVVoM3FQhUdAFtbLjv6Xv3UQ0e/jP2EV7l91ctyg0MyFPpOuDzVS7e7xmq+qvfcP3OL0Si6zIvnmlCeeRkDWOvAKcm3djo1vB7PBwXDuYC+4dNzEoK/uLDZmd/lSoMR9dESfEysB/Z7MwlLds/Q5Q448snnacdClH7u9Gyu8zbJaTOhhSTZk2TFO9vxpHNrXg0DWt9w3gyWIOe3kjZuXd9mcKtpj6s3n6ME3MxqHOaLEO6IQCHsDV/g85tT3/8i0dvo7uur4DI7LpsyMz2aRwzTSE9pNgBbgwluEY7oJgAAAAASUVORK5CYII=",rT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIASURBVHgBnZJdSFNhGMd/55wd2RkznBUG4kXWgiLSiyAKwj5A8KpdxIpgJMyLukgpMISGSBdeBF0E9kVGliy0IFoZdhFBEV6IMkgKpUWQszwJNTbPCrd2OuesDabC9Pzh5eX9Pe/78H+e5xU0AV3o7iF2qp3Onrc8HTxGThZQ44v4AhHOt2zEH+7C1P7qTspJfHRlFP3+ANt7L3AztLckeCOwCf/1MwgNDXy+/YS1SNhzJKy3HawkGOmGRAIx9sVyKC78IufdinCug+HdJ+kfnCKlZcon/J3V9eXQSphZgdnX/JByEs3Hy1ch6Wq8bEKz+VpiySrRLLfgzNyt839m3luLHP0Ppug4IJE77YeqKsSJaMmF3NHDFh/xXS4y7zYPrYFdKIKOJDtIZiTm4klu3ZlEDNXM4PY1IzQ1ce341eKj76rGxXtfUcMj1rCCA+3FWKVbJrm5Fm+9Qn2djLtGwb3Fk69MD7Yy728jUHGCodfzJe7ejMU52xdDffEOGhtLYrLhbGi8j8iH54xP38XlyHPr27BO7TBKDvW28E2DdDbPXAs/6Lr0Cgc2ZLaj2mm4sSzlWTT609pFbCi1uMT7x8MoMjglY7LqJ14+m7BithzWKgkqpieJjypIToU/M2Mc8mT5OLfTXg8LqtuQNobxl9mUi7TxdWw7LGg26VrB/gF/R7sO7T1rtgAAAABJRU5ErkJggg==";function cT(){const a=M("#app"),i=j?.session?.user||{},r=(i.name||"").split(" ").filter(Boolean),u=r[0]||"",m=r.slice(1).join(" "),d=i.firstName||u,p=i.lastName||m,h=i.addressStreet||"",v=i.addressCity||"",g=i.addressStateParish||"",b=i.addressCountry||"",x=i.phone||"",z=i.email||"";a.innerHTML=`
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
                value="${ia(d)}"
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
                value="${ia(p)}"
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
                value="${ia(h)}"
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
                value="${ia(v)}"
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
                value="${ia(g)}"
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
                value="${ia(b)}"
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
                value="${ia(x)}"
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
                value="${ia(z)}"
              />
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSavePersonal">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  `;const Y=document.querySelector("#app");D(Y,"#btnBackPersonal","click",()=>la());const J=()=>{const X=M("#addressCountry"),G=M("#countryFlagIcon");if(!X||!G)return;const I=uT(X.value);I?(G.src=I,G.style.display=""):(G.removeAttribute("src"),G.style.display="none")};J(),D(Y,"#addressCountry","input",()=>J()),D(Y,"#personalInfoForm","submit",X=>{if(X.preventDefault(),!j.session){V("Please sign in again to update your information."),la();return}const G=M("#firstName"),I=M("#lastName"),Q=M("#addressStreet"),at=M("#addressCity"),W=M("#addressStateParish"),lt=M("#addressCountry"),$=M("#phone"),et=M("#email"),Et=(G?.value||"").trim(),Ht=(I?.value||"").trim(),$t=(Q?.value||"").trim(),te=(at?.value||"").trim(),We=(W?.value||"").trim(),ge=(lt?.value||"").trim(),de=($?.value||"").trim(),N=(et?.value||"").trim(),H=j.session.user||{},P=[];Et&&P.push(Et),Ht&&P.push(Ht);const dt=P.join(" ")||H.name||"",vt={...H,firstName:Et,lastName:Ht,addressStreet:$t,addressCity:te,addressStateParish:We,addressCountry:ge,phone:de,email:N||H.email,name:dt};j.session={...j.session,user:vt},sn(),V("Personal information updated."),la()})}function uT(a){if(!a)return"";const i=String(a).trim().toLowerCase();return i==="jamaica"?kd:i==="canada"?Md:i==="united states"||i==="usa"||i==="us"?Dd:i==="united kingdom"||i==="uk"||i==="great britain"?Bd:i==="cayman islands"||i==="cayman island"?rT:""}function ia(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}function dT(a,{onClick:i}={}){const l=document.createElement("div");return l.className="biller-card",l.dataset.billerId=a.id,l.innerHTML=`
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
  `,document.head.appendChild(a)}function mg(a,i,{onSelect:l}={}){a&&(a.innerHTML="",i.forEach(r=>{const u=dT(r,{onClick:l});a.appendChild(u)}))}const hg=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];function fT(){const a=M("#app");if(!a)return;a.innerHTML=`
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
  `;const i=M("#billerList");mg(i,hg,{onSelect:l=>{q(`/more/billers/${l.id}`)}}),D("click",'[data-action="nav-back"]',()=>q("/dashboard")),D("input","#billerSearch",l=>{const r=(l.target.value||"").toLowerCase(),u=hg.filter(m=>m.name.toLowerCase().includes(r)||(m.category||"").toLowerCase().includes(r));mg(i,u,{onSelect:m=>{q(`/more/billers/${m.id}`)}})})}const mT=[{id:"jps",name:"JPS",icon:"⚡",category:"Electricity"},{id:"nwc",name:"NWC",icon:"💧",category:"Water"},{id:"flow",name:"Flow",icon:"📱",category:"Mobile"},{id:"digicel",name:"Digicel",icon:"📱",category:"Mobile"},{id:"lime",name:"LIME",icon:"☎️",category:"Internet"},{id:"ncb",name:"NCB",icon:"🏦",category:"Credit Card"},{id:"sagicor",name:"Sagicor",icon:"🛡️",category:"Insurance"},{id:"guardian",name:"Guardian Life",icon:"🛡️",category:"Insurance"}];function hT(a){return mT.find(i=>i.id===a)}function pT(a){return{jps:"Account Number",nwc:"Account Number",flow:"Phone Number",digicel:"Phone Number",lime:"Account Number",ncb:"Credit Card Number",sagicor:"Policy Number",guardian:"Policy Number"}[a]||"Account Number"}function vT(a){return{jps:"123456789",nwc:"987654321",flow:"876-555-0123",digicel:"876-555-0123",lime:"123456789",ncb:"4111-1111-1111-1111",sagicor:"POL123456",guardian:"GL789012"}[a]||"Enter account number"}function gT(a){if(!a)return 0;const i=String(a).replace(/[^0-9.]/g,""),l=Number(i||"0");return Math.round(l*100)}function yT(a){const{id:i}=a||{},l=hT(i),r=M("#app");if(!r)return;if(!l){r.innerHTML=`
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
    `,D("click",'[data-action="nav-back"]',()=>q("/more/billers"));return}const m=j.savedBillers.find(d=>d.name===l.name)?.account||"";r.innerHTML=`
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
              ${pT(l.id)}
            </label>
            <input
              type="text"
              id="accountNumber"
              class="form-input"
              placeholder="${vT(l.id)}"
              value="${m}"
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
  `,D("click",'[data-action="nav-back"]',()=>q("/more/billers")),D("click",'[data-action="bill-back"]',()=>q("/more/billers")),D("input","#billAmount",d=>{const p=d.target.value.replace(/[^0-9.]/g,"");d.target.value=p}),D("submit","#billerPaymentForm",d=>{d.preventDefault();const p=M("#accountNumber").value.trim(),h=gT(M("#billAmount").value);if(!p||h<=0){V("Please fill in all required fields");return}if(!Bn(h)){V("Insufficient balance. Please add money first.");return}const v={billerId:l.id,billerName:l.name,icon:l.icon,category:l.category,account:p,amount:h};sessionStorage.setItem("novapay_biller_draft",JSON.stringify(v)),q(`/more/billers/${l.id}/confirm`)})}function bT(a,i="JMD"){const l=(Number(a||0)/100).toFixed(2);return`${i} $${l}`}function AT(){const a=M("#app");if(!a)return;const i=sessionStorage.getItem("novapay_biller_draft");if(!i){a.innerHTML=`
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
    `,D("click",'[data-action="nav-back"]',()=>q("/more/billers"));return}const l=JSON.parse(i);a.innerHTML=`
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
            <span>${bT(l.amount)}</span>
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
  `,D("click",'[data-action="nav-back"]',()=>q(`/more/billers/${l.billerId}`)),D("click",'[data-action="edit-bill"]',()=>q(`/more/billers/${l.billerId}`)),D("click",'[data-action="confirm-bill"]',()=>{if(!Bn(l.amount)){V("Insufficient balance. Please add money first.");return}const r=M('[data-testid="btnConfirmBill"]');r&&(r.disabled=!0,r.textContent="Processing..."),setTimeout(()=>{ra("JMD",-l.amount),oa({title:`${l.billerName} Bill`,amount:-l.amount,currency:"JMD",type:"BILL"}),n2({name:l.billerName,icon:l.icon,category:l.category,account:l.account}),sessionStorage.setItem("novapay_last_biller_tx",JSON.stringify(l)),sessionStorage.removeItem("novapay_biller_draft"),q(`/more/billers/${l.billerId}/success`)},1200)})}function xT(a,i="JMD"){const l=(Number(a||0)/100).toFixed(2);return`${i} $${l}`}function ST(){const a=M("#app");if(!a)return;const i=sessionStorage.getItem("novapay_last_biller_tx"),l=i?JSON.parse(i):null;a.innerHTML=`
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
              <span>${xT(l.amount)}</span>
            </div>
          </div>
        `:""}

        <div class="flex flex-col gap-3 mt-4">
          <button class="btn btn-primary" data-action="go-dashboard">Back to Dashboard</button>
          <button class="btn btn-secondary" data-action="pay-another">Pay Another Bill</button>
        </div>
      </div>
    </div>
  `,D("click",'[data-action="nav-back"]',()=>q("/dashboard")),D("click",'[data-action="go-dashboard"]',()=>q("/dashboard")),D("click",'[data-action="pay-another"]',()=>q("/more/billers"))}const wT="/assets/MG-C7VpGrLC.png",TT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAB3CAYAAAAJtc6rAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAq4SURBVHhe7ZxBaFzXFYa/c2ckK8KoqWsckwTbchRZKUNQTRAhmFAbk2g0JZTSTZPSRaFQKFl03UUxJevQRaGlpQ1pSyGBJI0kjyRSY0QwxggjhEgUWZYdxRHGGGFSR5pIo3u6mOdUvu9Jmpl3n2TI/Zb6x5bmnfvOvf855z0IBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCDwjUDcH7jYOQ6I8LQKj7paKiyrkmNSOplxJVXyepVeDN91tbTIGlNyjEn35wD2Kt1YesnR5mqpEG5RYco8xaIrNUO9Qfu5wisoe109Basi/A3DH6WTOxsFVfI6zw+BV1EObdRSI7wn8Lo8wYIr2at0A79G6Xe1VAiLWH5vnuQtV2qGbYMGoFc5oXBG4JSrpUFhHOWM6eJcTLvGEbX8FviZgHH1ZlGYB16To7wpQtXV7Sw/JccZgaOu1iwKVeAfUuV3cox5V2+U+i5GG5dRBhVuulJKehGKeo2DriCdXAeGgY9cLQ1RMEp6lR5XizgPjCmsukKzCOSB05pnQCdod/VGqSto8hjLkmMEZdzV0iDQgTKgVZ53NYDo951VuOtKqVCeAwbsLB2uZLq5ES2WaVdLg8DjQFG/TcHVGqWuoFFb+TMIgwpzrpaSbgxFe4UuVzBd3BIYBC65WhpEOAgUydPragCscAHLWdX791oP9KH022n2uUIj1B00ANY5j3pOHVJLHRj69fOE1JFVahaOo5R0Op6aTYEl8gx7XyywHyixhz5Xa4SGgma6uYEyiCQfmZslSh0lrcRTR8apuV9bOaEavw4Ck8Cwqp9j+gYKCCX7GY+7Qr3E/tjtkDwXsQwqLLlaSvqAks6w3xU4wizKsPfULPRgKDLLkZjUSQVhJDqYeEOEdoR+Vvi+q9VL40GreaoR4KKrpUFgHzCg+XjqEMGinPOemqE1OtUlpmbzBLPgf7EIdJGjFPnChmk4aABSYQplUDVuUFOhFKLjeMxQZ5aahUNASVc2qb5YxhG/iwUA5Xm0OQvQXNAKrMo6Y4j31NGG0K9wWpV8TM8uNT8Dyac6080NLMPAlKulQYRHEYr6rU1OsFvQVNAA5BjzrDOoWZhfoZhkfqWTOwhjGaTmA0CJdp5xNQBauZiZBTAUE/fxLWg6aAAYxoEh7+bXcmIz8yuGqehU5zc1QwGlaD+OF8bNIZZQyoj3xfIwMKAtPOtqW5EqaKaLW2Ipo1x2tTSIcBChKMLxmNZJRaqMZJCa96L0k+e0TtMa01sytABQsrP1W4BUQQOgg4noUOLX/CrHVZLNrxxjHmHYd2oGuoGi7o1XZ6STCjYDCwCtKF3UDkR1kTpo8gh3MYwhXHC1NIjQgdCvD3HC1QCwnPedmkUwGE6wRn9SajZPMufbAiisIszRQLpPHTQAWWHG95eJ6EEp6qfxNonp4hbKKOrZAsDjGEqS42lXA6CF8ygjqlRcqUmmgeGoUF0XfoJWYJV1xjIwv3mEF7RKv15L6CZbJjAZpGboVaGYlJrNYRaBsg8LoModLGdlrbEDjpegcc/PCOWMWholXY/XJU03X6AZVWeUfvbwbFJdklYuRndbWr94iTzD0sNtV9iK+B+UgmjFDHn4Mi59wIBdiJtfWWEGZVg1fUfYoUc3qUuaQyxhGEaa7wKosohhWFobv2P9Bq2H21hGESZcLQ1ftzTWE+qSBVZRRjJIze0oL2iefp2Oz8Zs8IsNWwAFC5xDGZHHWHb17fAaNADpYCpa+XWfhuqkgCb7mWgTL6N+LYAYjqAUtS2xOtO8BVDmgHJUkG4Y/0F7hLsIIxlYgHYsA+Q5lbTPyDoXUM+pWQGhD0N/UqmpGQugyjLKCLb5/mDsy/tAFphHKKs2t5I2Q4SjKCU+ibc0os28DJ6rM3AApUjLJoXdxi3AFLnGjvgu2QTtJFVyfIBhSNWf+YVaS0NzDCTtM2jN8yjNX5BNKKhSTOo2m8MsovV1AdSyhKFMPt2en0nQ+L+fGfVuAYSDGEo8FF/5ppsvJMcIeE7N1KozVDiV6Bf3cKlOC3ARy1lzaNvPbUlmQQNgmQkkE/P7jColO8cBV+BL5kUpN7LP1IXShaGo6/G6ZD0WQOEGhrJ8ln4RZxo0U2CJ2spPlQ5cBDqAAanNL96vFVjVFsYiv+gtNYvQivI88BP9OO7dWMdsdj0VVlHGsIzIybr3vk1J/CU+kRZmUEa9WwChR4VS0gU0h1mM/GLqVb0RqT2E8rK28Ct7jX69Rq+9wnF7hZfI8ws07iMjZoHh6LSZmrpm+dNiF+hijd+gvCwS71U1iyoLAq9R4Q0p3G+sdYb9mueXCK9GnWlvKNxGmUe4iWKoBfNINJx0/2eVOwh/Ic/r0T6fmszvNAC5ynWEMuLdAhxSoURLfChHergdjSZ4Tc3UVvp+EfoEXhLhBwLHkwIGgDAllmFfAWPHgnaSqgjjKEMZDOU8p4YBvcbDriArfJRJaq4TVW4KlLnrt320I0EDkE5uijJaj59pBIH9CCVsfChHCl9XZ877rEvWgyoW+FDhrHzP70DQjgUNQL9iSmDUuwUQehVK9tP4UI4sMI9Sjg4DO4fUqkJRg9grOxo0U2CJ2lDOpn6mGQTaEQZYiz8yJSep0sJ4ZH69rvjNUGp3uMAH7gHJBzsaNAD2MkvN/F53pTSI0g2U7EKC+T3MInn/DdpNscxgKSc9IuyDHQ+aPMaytNSMpmrjvaRtOMXqJqPWd5lEKXtPzQ6q3I6edfB+ar3HjgcNgL9ynRxlxG++j8xvSb8TH8oxBZaysgAOk0DZdHHLFXyxK0GTM1iRqMjq3wL0YZMfmZJKRtWZCIUbKOWo25AZuxI07lmA2iCQVw8jwsMofbonvrdJgbvACIYx36k56qedk3XOmm6+cHWf7FrQADBMRyvfW7VAoYrhFjb5DpYurmP9V2eigdMyx/zUF7diV4MWPQUzgvBh9K6N9AgfYXl3s/kLEaqS44LP1KzKHZQR1hhPejeJb3Y1aABimAVGkfQjcFEh9z3gQ1fbiHRyU3KMetx7poCyr9cobcfuB62TihjORS9cSdf/Ui5j6ju56ZdMiU1vAVSjvbnV7968FbseNADeYIHaI1NNj8BFJ8Jh1ur7P0yBJTUMpalLKiwDY7rO+2lHCBrhgQianMFKlUso/25m5Ucd6iFZZ6iRk5tUmEV5u+k0qUyI8Hf5PHn/zIoHImgQ9b8MQ42mSVUshklyDNLdWGlMCqxS4TzKP1Ub+7eqXEd5m71clJPZHz428sAEjehQIsKfUd6q546LusJjVPmTfMWECNb9zHaYAktS5R2UP9T7kGIUsDelypA8Uv8C88WOjBs0giqGT+jWHK9g+BHQFb3v4/7P1aoP74vwL9q43MxM/Eai8YQfA68ABZF4UzXqEkyjvCtV3pGnGrs7ffHABe0e9lMeZZ3TWF4EuhA6qI2DLyMsAv/B8r50Md/MHZaEXWAfq/SivBiNg+/D0gZUqBWCJxBGaWVyJw8eLg9s0AD0Gm0qHKXKEQx7sRgMy1gW5b/M+e4I30OnOajtdGPZT45WqVLBcJsV5qSwfdoOBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCHxT+R+ouzqckfEd0AAAAABJRU5ErkJggg==";function CT(){const a=M("#app");if(!a)return;a.innerHTML=`
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
              <img src="${TT}" alt="Western Union" class="wu-logo-img" />
            </div>
            <div class="remittance-provider-info">
              <h4 class="remittance-provider-name">Western Union</h4>
              <p class="remittance-provider-desc">Global money transfers</p>
            </div>
          </div>

          <div class="remittance-provider-card" data-provider="moneygram">
            <div class="remittance-provider-logo remit-logo-mg">
              <img src="${wT}" alt="MoneyGram" class="mg-logo-img" />
            </div>
            <div class="remittance-provider-info">
              <h4 class="remittance-provider-name">MoneyGram</h4>
              <p class="remittance-provider-desc">Fast global payouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackRemittance",()=>q("/dashboard",{animate:"slide-left-fade"})),a.querySelectorAll(".remittance-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.provider;r==="western-union"?q("/remittance/western-union",{animate:"slide-right-fade"}):r==="moneygram"&&q("/remittance/moneygram",{animate:"slide-right-fade"})})})}const fy=document.createElement("style");fy.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(fy);function ET(){const a=M("#app");if(!a)return;const i=j?.session?.user||{},l=i.name||"",r=i.addressStreet||"";i.addressCity,i.addressStateParish,i.addressCountry,a.innerHTML=`
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
                value="${pg(l)}"
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
                value="${pg(r)}"
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
  `,D("click","#btnBackWU",()=>q("/remittance",{animate:"slide-left-fade"})),D("submit","#wuRemittanceForm",kT);const u=M("#mtcn");u&&u.addEventListener("input",p=>{let h=p.target.value.replace(/[^0-9]/g,"");h.length>10&&(h=h.slice(0,10)),h.length>3&&h.length<=6?h=h.slice(0,3)+"-"+h.slice(3):h.length>6&&h.length<=10&&(h=h.slice(0,3)+"-"+h.slice(3,6)+"-"+h.slice(6)),p.target.value=h});const m=M("#senderCountry");m&&m.addEventListener("change",d);function d(){const p=M("#senderCountry"),h=M("#senderCountryFlagIcon");if(!p||!h)return;const v=p.value,g=MT(v);g?(h.src=g,h.style.display=""):(h.removeAttribute("src"),h.style.display="none")}}async function kT(a){a.preventDefault();const i=M("#mtcn")?.value.trim().replace(/-/g,""),l=M("#senderName")?.value.trim(),r=M("#senderCountry")?.value,u=M("#senderPhone")?.value.trim(),m=M("#receiverName")?.value.trim(),d=M("#receiverAddress")?.value.trim(),p=M("#expectedAmount")?.value.replace(/[^\d.]/g,""),h=M("#currency")?.value,v=M("#idType")?.value,g=M("#purpose")?.value;if(i.length!==10){V("Please enter a valid 10-digit MTCN");return}if(!l||!r||!u){V("Please complete all sender information fields");return}if(!m||!d){V("Please complete all receiver information fields");return}if(!p||!h){V("Please enter the expected amount");return}if(!v){V("Please select a government issued ID type");return}if(!g){V("Please select the purpose of transaction");return}const b=Number(p);if(!b||b<=0){V("Enter a valid amount");return}const x=M("#btnSubmitWU");if(x){x.disabled=!0,x.textContent="Processing...";try{const Y=await ja("/api/remittance/western-union/receive",{method:"POST",body:JSON.stringify({mtcn:i,senderName:l,senderCountry:r,senderPhone:u,receiverName:m,receiverAddress:d,expectedAmount:b,currency:h,idType:v,purpose:g})});sessionStorage.setItem("novapay_last_remittance_result",JSON.stringify({provider:"western-union",referenceId:i,amount:`${h} ${b.toFixed(2)}`})),q("/remittance/success",{animate:"slide-right-fade"})}catch(z){const Y=z?.message||z?.status?.message||"Unable to process Western Union remittance.";sessionStorage.setItem("novapay_last_remittance_error",JSON.stringify({provider:"western-union",message:Y})),q("/remittance/error",{animate:"slide-right-fade"})}finally{x.disabled=!1,x.textContent="Continue"}}}function MT(a){if(!a)return"";const i=String(a).trim().toLowerCase();return i==="jamaica"?kd:i==="canada"?Md:i==="united states"||i==="usa"||i==="us"?Dd:i==="united kingdom"||i==="uk"||i==="great britain"?Bd:""}function pg(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}const my=document.createElement("style");my.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(my);function DT(){const a=M("#app");if(!a)return;const i=j?.session?.user||{},l=i.name||"",r=i.addressStreet||"";i.addressCity,i.addressStateParish,i.addressCountry,a.innerHTML=`
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
                value="${vg(l)}"
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
                value="${vg(r)}"
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
  `,D("click","#btnBackMG",()=>q("/remittance",{animate:"slide-left-fade"})),D("submit","#mgRemittanceForm",BT);const u=M("#mgReferenceNumber");u&&u.addEventListener("input",p=>{let h=p.target.value.replace(/[^0-9]/g,"");h.length>8&&(h=h.slice(0,8)),h.length>2&&h.length<=4?h=h.slice(0,2)+"-"+h.slice(2):h.length>4&&h.length<=6?h=h.slice(0,2)+"-"+h.slice(2,4)+"-"+h.slice(4):h.length>6&&h.length<=8&&(h=h.slice(0,2)+"-"+h.slice(2,4)+"-"+h.slice(4,6)+"-"+h.slice(6)),p.target.value=h});const m=M("#mgSenderCountry");m&&m.addEventListener("change",d);function d(){const p=M("#mgSenderCountry"),h=M("#mgSenderCountryFlagIcon");if(!p||!h)return;const v=p.value,g=RT(v);g?(h.src=g,h.style.display=""):(h.removeAttribute("src"),h.style.display="none")}}async function BT(a){a.preventDefault();const i=M("#mgReferenceNumber")?.value.trim().replace(/-/g,""),l=M("#mgSenderName")?.value.trim(),r=M("#mgSenderCountry")?.value,u=M("#mgSenderPhone")?.value.trim(),m=M("#mgReceiverName")?.value.trim(),d=M("#mgReceiverAddress")?.value.trim(),p=M("#mgExpectedAmount")?.value.replace(/[^\d.]/g,""),h=M("#mgCurrency")?.value,v=M("#mgIdType")?.value,g=M("#mgPurpose")?.value;if(i.length!==8){V("Please enter a valid 8-digit reference number");return}if(!l||!r||!u){V("Please complete all sender information fields");return}if(!m||!d){V("Please complete all receiver information fields");return}if(!p||!h){V("Please enter the expected amount");return}if(!v){V("Please select a government issued ID type");return}if(!g){V("Please select the purpose of transaction");return}const b=Number(p);if(!b||b<=0){V("Enter a valid amount");return}const x=M("#btnSubmitMG");if(x){x.disabled=!0,x.textContent="Processing...";try{const Y=await ja("/api/remittance/moneygram/receive",{method:"POST",body:JSON.stringify({referenceNumber:i,senderName:l,senderCountry:r,senderPhone:u,receiverName:m,receiverAddress:d,expectedAmount:b,currency:h,idType:v,purpose:g})});sessionStorage.setItem("novapay_last_remittance_result",JSON.stringify({provider:"moneygram",referenceId:i,amount:`${h} ${b.toFixed(2)}`})),q("/remittance/success",{animate:"slide-right-fade"})}catch(z){const Y=z?.message||z?.status?.message||"Unable to process MoneyGram remittance.";sessionStorage.setItem("novapay_last_remittance_error",JSON.stringify({provider:"moneygram",message:Y})),q("/remittance/error",{animate:"slide-right-fade"})}finally{x.disabled=!1,x.textContent="Continue"}}}function RT(a){if(!a)return"";const i=String(a).trim().toLowerCase();return i==="jamaica"?kd:i==="canada"?Md:i==="united states"||i==="usa"||i==="us"?Dd:i==="united kingdom"||i==="uk"||i==="great britain"?Bd:""}function vg(a){return String(a).replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}const hy=document.createElement("style");hy.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(hy);function NT(){const a=M("#app");if(!a)return;const i=sessionStorage.getItem("novapay_last_remittance_result"),l=i?JSON.parse(i):null,r=l?.referenceId?String(l.referenceId):null;a.innerHTML=`
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
  `,D("click","#btnRemitSuccessBack",()=>{q("/remittance",{animate:"slide-left-fade"})})}function UT(){const a=M("#app");if(!a)return;const i=sessionStorage.getItem("novapay_last_remittance_error"),l=i?JSON.parse(i):null,r=l?.message||"Something went wrong while submitting your remittance.";a.innerHTML=`
    <div class="container page page-center">
      <div class="card text-center">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-xl font-semibold mb-2">Transfer Failed</h2>
        <p class="text-error mb-4">${r}</p>
        <button class="btn btn-primary btn-full" id="btnRemitErrorRetry">Try Again</button>
      </div>
    </div>
  `,D("click","#btnRemitErrorRetry",()=>{const u=l?.provider;u==="western-union"?q("/remittance/western-union",{animate:"slide-left-fade"}):u==="moneygram"?q("/remittance/moneygram",{animate:"slide-left-fade"}):q("/remittance",{animate:"slide-left-fade"})})}function zT(){const a=M("#app"),i=j?.session?.user?.name||"User",l=i.substring(0,2).toUpperCase();j?.session?.user?.email;const r=(()=>{try{return localStorage.getItem("novapay_profile_picture")}catch{return null}})(),u=r?'<img src="'+r+'" alt="'+i+'" class="settings-avatar-img" />':l;let m=r||null;a.innerHTML=`
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
  `,D("click","#btnBackProfilePhoto",()=>{q("/dashboard",{animate:"slide-left-fade"})}),D("click","#btnPickPhoto",()=>{const d=M("#profilePhotoInput");d&&d.click()}),D("change","#profilePhotoInput",d=>{const p=d.target.files&&d.target.files[0],h=M("#btnSavePhoto");if(!p){m=r||null,h&&(h.disabled=!m);return}const v=new FileReader;v.onload=()=>{m=v.result;const g=M(".settings-avatar");g&&m&&(g.innerHTML='<img src="'+m+'" alt="'+i+'" class="settings-avatar-img" />'),h&&(h.disabled=!1),V&&V("Preview updated. Tap Save profile picture to apply.")},v.onerror=()=>{V&&V("Could not read that image. Please try another file."),m=r||null,h&&(h.disabled=!m)},v.readAsDataURL(p)}),D("click","#btnSavePhoto",()=>{if(!m){V&&V("Please choose a photo first.");return}try{localStorage.setItem("novapay_profile_picture",m),V&&V("Profile picture updated.","success")}catch(d){console.error("[ChangeProfilePicture] Failed to save image",d),V&&V("Could not save image on this device.");return}q("/dashboard",{animate:"slide-left-fade"})})}let To=null;function LT(){const a=M("#app");a.innerHTML=`
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
  `,D("click","#btnBackScanQR",()=>{VT(),la()}),OT()}async function OT(){const a=document.getElementById("qrVideo");if(!a||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){V("Camera not supported on this device.");return}try{const i=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:!1});To=i,a.srcObject=i}catch(i){console.error("[ScanQR] Failed to access camera",i),V("Unable to access camera. Please check permissions.")}}function VT(){To&&(To.getTracks().forEach(a=>a.stop()),To=null)}const py="/assets/CIBC-DTpbt-Xf.png",vy="/assets/JMMB_Bank-BeP4W1hI.png",gy="/assets/JN-DqPVTXec.png",yy="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX/////3QAAL4f/5AD/3wAAKYkAGoAAHYG0vdSlrssAGowAD37m5+9mam1cY3DavzXexSgALIYAHYvIskIAK4gAAHwAJIoAIIsPOIwAFY3/5wAAJoQAIYIAJooAIooAEo3c4OsABnyun0wAFH8tSpQ9VJguRH5zgrCAjbcZOYH19/p8eWWWocOOmb7u0RfIsztzc2g6S3tmd6pQWnRRZKDM0eHZwSzRujWckVa8qkKkl1LmyiG0pEigqciGgWBwcWoXOIKMhl5BUHlJVXeUi1tUZ6LDydxeYXULM4QAAI8lP380TZROWHVqbGywoUpGU3mVS2ttAAAM5UlEQVR4nO2d7V/avBrH6ZUUtCjaGlra0gKibIri00TFh425KbfT7f//b05SdFJI2/QBz7nPJ983e4Npfk1yPSRXulJJIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpH8n9BeEaIt0pZYU5l5OF/bTy/wtl4WoivQ9mlHrK2sdLvVbuN0Vehlv3eqC0C0REwgjcS2disAoC4TAqC7lWrjcE1U31qjSQWeXQ8T2Bxr0PyS0Ba4TODj+vJ4PNE1zSegN+u750ICH7qEdarm4CScdR/Kn+PaOi+ztkAbOmiZDC4u7zWLAKnutpMFHnZ0CBQiJQmMT1TorES3tTJtC7QLnNhYHjCmKkd7BgG3HvvGGV+6QZ+EFCp4QAh0Il/bYWfa1tIVBn1B6GpiAVR2Yq3fGjQhhUIFb9p0/kc0efr6sj5GIesN+mHTqVqOfOXvs0pYoYKuWuDucBsLjOiHKqTdGU5U0DuRBudz52+fRBUqzg9qUH9yZkPDhTQKMbMY+d8DVr6boFf5o7i/W4b0ChWn5kP3cL6xdoVAGoV40IP10QZGOKdKjO/NiIXTJjMvPYVCjHuLBnWlrr83Rbx/EhWiO0tXfc2qbQ+cfEMZGHh3d1Hg6myf0ijkGdSD+ns7lr13PBokjuGo5QVu2Gr1Lq9zjSRWgEB3dWHZdAAyKlTwkBpUMjsvqm+NGP76zUBogaGb4yfb8OhrJn7rZFvJMZB4wwZYiJjXqtkVTg3qr5nWApdDLG19SxEeDua0r/oTm8Zf9E+N400ns0Y09qE57/lzKVScsQGV0/fGqELP7m2Ly5vCQpPNyyfb1Nnf3x9l1Ygx6FDdL1IhNagmdA+mTe1/ruum/TJ0Mi0mjJzrMWgq7YHdy6oR3dA3flCowsCg1h9YS7eVim/dDfKsI4S2zmyPTlb7zzBbO2ii61CoQmpQVTox1korjbKpjfPYiWlz6PrYNmkvWl+VVP14BY18qJ4XqpAa1BboO7td2qc84/feHhr02Tia/k2GqYoHLWgeFquQzn0qkRi9YXYbONdLNHhpUcOqnQ3SDyO6J+RXwQqZQSX2ZRHj9wZ2hj2DmlXzKLVEdOlDp2iFCqqpwyyLJgaMRtSs6q1x2heHLwzototWiJXE4Cw96PqEprVGLaXrwQMbyitFK1Ty5gX8RtFdC8A/UVIGD+acRyxE4ZJwrjQC3lM6idQjhgO3/2WFCtpUCajpJFKF7um/RiFdVTQh8k7SrAKm8NO/R+FUol9zUvyF/m+apcprVKj9EM9ZFe1fZGkCWJoNrQ3ReYqvl+ItRJ6M8dtWfErfgm5sIBPhfPqIevzzD1dI1eGN7buXs+fnWv9yK+Wek/PVBP9OsFcsuejsf7BCjJTfj4ZmmcGRmOcb9t5dmjA9yNxb12J/QCNIPXzyt3SFNOPra5YaegYx7d6N+DjiLZsdiQn9FPsQdhZLV4iVINtbgGhP4lsVzpkK9qbIr/GRBt2Hj1SItlSToy/Q2HoRDVaYPfW+ivQLffWgWvo4hSx41rnyAszJtegJwrMKmsD7wIoN4ZhtuQoxejSi9QVT9ULsYXjLAGtbYHt5TC3p+ccpRGdWrEAA3R4KmkgV1OfEjuGBAWT+5GKJCp3jJIFUoiWWPKO+B3biNHVevIUhXKJC9NtOFEgf1xN6HJumxlGCQkS9irtwpLk0hXighQaLwZNoCUXVWGmBn/BLPPBhYU9/iQpR7a8bdCvVLmk0GkD/DR2gBthC8xQ9EXU9tmdY2SO8ApFlKWQbxVMq3dPV9uub3T8/2O244Qd6x8kFPKyERyWxExrjE49b5LMshehlOoRu92D+LOjT3JmstSXA0Tr1iDGBG1Z63uwxWC6FQtGTMh3CyhfOwXpbD09VQwQa2cYYUzQEFbo8gRkU4m2RkqKrwNdzXyqdrBAT6UQTuWIxumwRPaIqKr1C9PwjOcxn/gsWvW/kU/MoxM5Gj3p690HwWckKa/9cJY4iOmETsRpZFvm5yZOQSSEe1mwCetTLzKRQbSWGk4hlFAtH6jPztM6TkEUh3jjeY/mZuxNREJVJoW4lZNxYYcswokIpYHfBLwoo5FoajJzNvuaBXv/EfVImhUAm8RY1CGjmj5tDHM5OUyJQEExtkx3VM4wGx3SmVr7xVkU2hTScjN38CsZwPlELsTJTaUZOasns6fok2sJRa/PNBFLhzJqMCsF8jP0Z8mKXYan0MKPQukquJHb+EHIfH9PUDG7pXlaFYPXjfAazpbEKz6u6/haNawJJIjVdXj8+LnXGNujlhYmaWSFolzE/ZP7Q5a/8V4WNHcbuDpXYSt7uZQef/iihZ86lDeRbcQqhFeMWWT5HEsr5GW32xOTkPWgvuZTTuTOgMv9ecygEeyPypxhTY1pOFHjLapPFNmBMgRxfQY8e1NvFKYzbgmDTNM4fBpwGDxfZRHN6hJwIDLWi6nPFJrkUxrlFfN2KNzU0rvkVFISbAkcSbBmaIpsBbCOjmndHeEYhqNHHs+jYXKz1nKXtTlNhS2QfdNsCsW055151w+s/n0LwI3/NJkwzxpr+vXSSZCGDfn8n+kRsy+rChnrIY+RUCEakW8RHLahG3qt5ux7gnYlkm9d0ko7F9h5Qj1Rui1QIduQYoB/afJ3gO53ElTzbUp9aUtHjtZEfnqa5Fca4RaevQWehsjzgfBq0EVVko41FueqzYLVCcMxdrMIYE+DcUcv2kxPw306H0JuI7SSOfdCStoPffz0JR6cFKNTNyH462zZxq5/aYX0rO9MRNO7FdrVoKha/kxju36NaPi9WYdxiQtc9Q3erjc8r0y3TtfPV03J5eg2wJVix6Xz1wBYeQhZrVFYLVkjdYmRfMdomFtGb5W6nXq93qt3K1At6dk2wPhZftEC9F68ZQj/MUKhRiMIYt0h/j0dPthnatFAt7UX0WgXG34iwIZ0q9ENZTTEKwbiLyb8RGo57tmb5pueZvmGrtd/iJe/OsQ+WoC+c9m9shg6gClIY4xYZVKRy8fvyrt8fj66u0xQNBfVCT6lK9469pSiE1lbC2ddbUVSqkqhpzZdQGcZM/0I7RIUpFIyM04EHpg62yDHCTP9OyDLWIcS6xawEtZfxG0Kc/pHwjYviFAL5lq5eORE8mKhgioTmoT+yoXh/+Ir3vchLF9MaaDNVgbDCKU7MqJB/sBLnFtOCnStbTy+QOfxw5p3t3GJnlX88FucW0zG9i2A9p77ogP6Q8KFeNoWN0qcyV2K8WxQGo82eRVv7mnraszA9fLUrq8LST/5ETXKLQiB8x76R0BqlvyzGdnTCe3yZFZZ+uVyJYlWScX1EaFv16aKeZLlM5ZyQ3BW0bwr3G9wjQN3L5RYxUkYTQ6cD2M9y14hd5w5v0+RQWFprcusN1L2sbpHFdcM709JB13obmTwPq7WdK4vKobDUnr/LPyWLWwyiVnwx3mNXZIkBv7N5VraXOL8PnUdh6YF/Gu+vi/uM13BcGV6N7w2NpZGq9m0bZzNXQS6Z/7b6bDX8Kn8UtbGoRHz15/ns+55Bs0dz+vEIu3aU+VsnTt+HyvzHSPIpLB12eQrF0wG8rakqma5nYhra83aO69Ks3lN3S8UqLJ1WFvVRWoI3eJn7AjXI/I0/dym+NcHr2BHNJRd32fMqLH3he35Bt8gUktrxeLR1jVPfFwrjbFGBiwW0+RWWdrien4i5RabQd9JfhlpsyLmkcSzvCzz5Fe7za3/Frn4yhVYB31BCgzNWklznHJPkV1ha63IlevcCNqMQhRjhy+DeUed2UWARCkvnfLdovST7jPwKaaigXOrBrYAq98yZozChKNlZUFha4UukbjGpuBn9pgqRQBV0xJ8jNLip2X4wieoHPIGLCsnz5kYsm2fz0XupdMtPiO1RfFMbG0OakXubGdm4Gh0/td7uxdUjTmMXa1kTv+5JYEFh6TPf8/sCHwqlY50Vw/fe8hu9GlFAm61ad1FhlOf/KPToLwpmUkgWQqNSaZefEH8Mrhv9kdYsCl3Ce2H8hPhDcBsxZS0ZFHZ5Nwyo53czFeAXQDOyxjuTQr2+8K3EVyIS4qVT5nyfModCtxL9yd4Iz79k+PdIMiss78YVcq38F0aRH8hkVah3Epo7zHRTJA/cUDSzQtKN8qp/idgKXxpRgUw2hZUdgS+DRyTEy4F0El95GoWduLLtd/gJ8TzNIuKDMvd+RVaFJLrMMMw+JHt+0jk4zRsf6JUuP5fIqLDZEP92fSXJ85d32qXTXIOou93moeB/jLBWrwjQSfA5IdoJTQZ53M+qyHO5lLsd+CSwAF/Zv10VQHCGvnIe2+Ztm/1mReSxEZ15EJ5PEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikXwY/wEIEpkHW0zmpgAAAABJRU5ErkJggg==",by="/assets/Scotia-Drs9SX0a.jpg";function HT(){const a=M("#app");if(!a)return;a.innerHTML=`
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
              <img src="${py}" alt="First Caribbean Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">First Caribbean Bank</h4>
              <p class="bank-provider-desc">CIBC First Caribbean</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jmmb">
            <div class="bank-provider-logo">
              <img src="${vy}" alt="JMMB" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">JMMB</h4>
              <p class="bank-provider-desc">Jamaica Money Market Brokers</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jamaica-national">
            <div class="bank-provider-logo">
              <img src="${gy}" alt="Jamaica National Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Jamaica National Bank</h4>
              <p class="bank-provider-desc">JN Bank</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="ncb">
            <div class="bank-provider-logo">
              <img src="${yy}" alt="National Commercial Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">National Commercial Bank</h4>
              <p class="bank-provider-desc">NCB Jamaica</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="scotia">
            <div class="bank-provider-logo">
              <img src="${by}" alt="Scotia Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Scotia Bank</h4>
              <p class="bank-provider-desc">Scotiabank Jamaica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackBankSelection",()=>q("/withdraw",{animate:"slide-left-fade"})),a.querySelectorAll(".bank-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.bank;q(`/bank-details/${r}`,{animate:"slide-right-fade"})})})}const Ay=document.createElement("style");Ay.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(Ay);let Lt={bank:null,accountType:null,branch:"",accountName:"",accountNumber:"",amount:0,currency:"JMD"};const xy={"first-caribbean":{name:"First Caribbean Bank",logo:py,branches:["New Kingston","Montego Bay","Ocho Rios","Mandeville"]},jmmb:{name:"JMMB",logo:vy,branches:["Haughton Terrace","Portmore","Montego Bay","Ocho Rios"]},"jamaica-national":{name:"Jamaica National Bank",logo:gy,branches:["Half Way Tree","Duke Street","Constant Spring","May Pen"]},ncb:{name:"National Commercial Bank",logo:yy,branches:["Oxford Road","Knutsford Boulevard","Constant Spring","Spanish Town"]},scotia:{name:"Scotia Bank",logo:by,branches:["King Street","Constant Spring","Half Way Tree","Portmore"]}};function jT(a){const i=M("#app");if(!i)return;Lt.bank=a;const l=xy[a]||{name:"Unknown Bank",logo:null,branches:[]};i.innerHTML=`
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
            <p class="form-hint">Available: <strong>${Qt(j.balances.JMD||0,"JMD")}</strong> / ${Qt(j.balances.USD||0,"USD")}</p>
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
  `,YT()}function YT(){const a=M("#app");D("click","#btnBackBankDetails",()=>q("/bank-selection",{animate:"slide-left-fade"})),D(a,".account-type-option","click",i=>{const l=i.currentTarget.querySelector('input[type="radio"]');l&&(l.checked=!0,Lt.accountType=l.value)}),D(a,"#branchSelect","change",i=>{Lt.branch=i.target.value}),D(a,"#accountName","input",i=>{Lt.accountName=i.target.value}),D(a,"#accountNumber","input",i=>{Lt.accountNumber=i.target.value.replace(/[^0-9]/g,""),i.target.value=Lt.accountNumber}),D(a,"#withdrawCurrency","change",i=>{Lt.currency=i.target.value;const l=M("#jmd-quick-amounts"),r=M("#usd-quick-amounts");Lt.currency==="JMD"?(l.style.display="grid",r.style.display="none"):(l.style.display="none",r.style.display="grid");const u=M(".form-hint");if(u){const m=Qt(j.balances.JMD||0,"JMD"),d=Qt(j.balances.USD||0,"USD");Lt.currency==="JMD"?u.innerHTML=`Available: <strong>${m}</strong> / ${d}`:u.innerHTML=`Available: ${m} / <strong>${d}</strong>`}}),D(a,".quick-amount-btn","click",i=>{const l=i.currentTarget.dataset.quickAmount,r=M("#withdrawAmount");r&&(r.value=l,Lt.amount=da(l))}),D(a,"#withdrawAmount","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l,Lt.amount=da(l)}),D(a,"#bankDetailsForm","submit",i=>{if(i.preventDefault(),!Lt.accountType){V("Please select an account type");return}if(!Lt.branch){V("Please select a branch");return}if(!Lt.accountName){V("Please enter the account name");return}if(!Lt.accountNumber){V("Please enter the account number");return}if(Lt.amount<=0){V("Please enter a valid amount");return}if(!Bn(Lt.amount)){V("Insufficient balance");return}qT()})}function qT(){const a=M("#btnSubmitBankDetails");a.textContent="Processing...",a.disabled=!0,setTimeout(()=>{ra(Lt.currency,-Lt.amount),oa({title:`${xy[Lt.bank].name} Withdrawal`,amount:-Lt.amount,currency:Lt.currency,type:"WITHDRAW"}),V(`Withdrawal of ${Qt(Lt.amount,Lt.currency)} initiated`),Lt={bank:null,accountType:null,branch:"",accountName:"",accountNumber:"",amount:0,currency:"JMD"},q("/dashboard",{animate:"slide-left-fade"})},2e3)}const Sy=document.createElement("style");Sy.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(Sy);const wy="/assets/FlowLtd-C2DlFDh0.png",Ty="/assets/Digicel-DUQuXrTO.png";function GT(){const a=M("#app");if(!a)return;a.innerHTML=`
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
              <img src="${wy}" alt="Flow Ltd" class="network-logo-img" />
            </div>
            <div class="network-provider-info">
              <h4 class="network-provider-name">Flow Ltd</h4>
              <p class="network-provider-desc">Mobile and data services</p>
            </div>
          </div>

          <div class="network-provider-card" data-network="digicel">
            <div class="network-provider-logo">
              <img src="${Ty}" alt="Digicel" class="network-logo-img" />
            </div>
            <div class="network-provider-info">
              <h4 class="network-provider-name">Digicel</h4>
              <p class="network-provider-desc">Mobile and data services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,D("click","#btnBackNetworkSelection",()=>q("/dashboard",{animate:"slide-left-fade"})),a.querySelectorAll(".network-provider-card").forEach(l=>{l.addEventListener("click",()=>{const r=l.dataset.network;q(`/network-details/${r}`,{animate:"slide-right-fade"})})})}const Cy=document.createElement("style");Cy.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(Cy);let Tt={network:null,name:"",mobileNumber:"",areaCode:"876",product:"topup",amount:0,currency:"JMD"};const js={flow:{name:"Flow Ltd",logo:wy,dataPlans:[{name:"1-Day Plan",price:150,data:"500MB"},{name:"3-Day Plan",price:350,data:"1GB"},{name:"7-Day Plan",price:750,data:"2GB"},{name:"30-Day Plan",price:1500,data:"4GB"}]},digicel:{name:"Digicel",logo:Ty,dataPlans:[{name:"1-Day Plan",price:150,data:"500MB"},{name:"3-Day Plan",price:350,data:"1GB"},{name:"7-Day Plan",price:750,data:"2GB"},{name:"30-Day Plan",price:1500,data:"4GB"}]}};function QT(a){const i=M("#app");if(!i)return;Tt.network=a;const l=js[a]||{name:"Unknown Network",logo:null,dataPlans:[]};i.innerHTML=`
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
              <p class="form-hint">Available: <strong>${Qt(j.balances.JMD||0,"JMD")}</strong> / ${Qt(j.balances.USD||0,"USD")}</p>
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
  `,FT()}function FT(){const a=M("#app");D("click","#btnBackNetworkDetails",()=>q("/network-selection",{animate:"slide-left-fade"})),D(a,"#recipientName","input",i=>{Tt.name=i.target.value}),D(a,"#areaCode","change",i=>{Tt.areaCode=i.target.value}),D(a,"#mobileNumber","input",i=>{const l=i.target.value.replace(/[^0-9]/g,"");i.target.value=l,Tt.mobileNumber=l}),D(a,".product-type-option","click",i=>{const l=i.currentTarget.querySelector('input[type="radio"]');if(l){l.checked=!0,Tt.product=l.value;const r=M("#topUpSection"),u=M("#dataPlanSection");Tt.product==="topup"?(r.style.display="block",u.style.display="none"):(r.style.display="none",u.style.display="block")}}),D(a,"#topUpCurrency","change",i=>{Tt.currency=i.target.value;const l=M("#jmd-quick-amounts"),r=M("#usd-quick-amounts");Tt.currency==="JMD"?(l.style.display="grid",r.style.display="none"):(l.style.display="none",r.style.display="grid");const u=M(".form-hint");if(u){const m=Qt(j.balances.JMD||0,"JMD"),d=Qt(j.balances.USD||0,"USD");Tt.currency==="JMD"?u.innerHTML=`Available: <strong>${m}</strong> / ${d}`:u.innerHTML=`Available: ${m} / <strong>${d}</strong>`}}),D(a,".quick-amount-btn","click",i=>{const l=i.currentTarget.dataset.quickAmount,r=M("#topUpAmount");r&&(r.value=l,Tt.amount=da(l))}),D(a,"#topUpAmount","input",i=>{const l=i.target.value.replace(/[^\d.]/g,"");i.target.value=l,Tt.amount=da(l)}),D(a,".data-plan-card","click",i=>{const l=i.currentTarget.querySelector('input[type="radio"]');if(l){l.checked=!0;const r=parseInt(i.currentTarget.dataset.planIndex),u=js[Tt.network];u&&u.dataPlans&&u.dataPlans[r]&&(Tt.amount=u.dataPlans[r].price)}}),D(a,"#networkDetailsForm","submit",i=>{if(i.preventDefault(),!Tt.mobileNumber||Tt.mobileNumber.length!==7){V("Please enter a valid 7-digit mobile number");return}if(Tt.product==="topup"&&Tt.amount<=0){V("Please enter a valid amount");return}if(Tt.product==="dataplan"&&!document.querySelector('input[name="dataPlan"]:checked')){V("Please select a data plan");return}if(Tt.product==="topup"&&!Bn(Tt.amount)){V("Insufficient balance");return}JT()})}function JT(){const a=M("#btnSubmitNetworkDetails");a.textContent="Processing...",a.disabled=!0,setTimeout(()=>{if(Tt.product==="topup")ra(Tt.currency,-Tt.amount),oa({title:`${js[Tt.network].name} Top Up`,amount:-Tt.amount,currency:Tt.currency,type:"BILL"}),V(`Top-up of ${Qt(Tt.amount,Tt.currency)} successful`);else{const i=parseInt(document.querySelector('input[name="dataPlan"]:checked').value),l=js[Tt.network].dataPlans[i];ra("JMD",-l.price),oa({title:`${js[Tt.network].name} ${l.name}`,amount:-l.price,currency:"JMD",type:"BILL"}),V(`Data plan purchase of ${Qt(l.price,"JMD")} successful`)}Tt={network:null,name:"",mobileNumber:"",areaCode:"876",product:"topup",amount:0,currency:"JMD"},q("/dashboard",{animate:"slide-left-fade"})},2e3)}const Ey=document.createElement("style");Ey.textContent=`
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
`;typeof document<"u"&&document.head.appendChild(Ey);class XT{constructor(){this.routes=new Map,this.currentRoute=null,this.defaultRoute="/login",this.authRoute="/dashboard",this.pendingAnimation=null,window.addEventListener("hashchange",()=>this.handleRoute()),window.addEventListener("load",()=>this.handleRoute()),console.log("[Router] Initialized hash-based routing system ✅")}addRoute(i,l,r=!1){this.routes.set(i,{handler:l,requiresAuth:r})}setDefaults(i,l){this.defaultRoute=i,this.authRoute=l}matchRoute(i){const l=this.routes.get(i);if(l)return{path:i,params:{},...l};for(const[r,u]of this.routes.entries()){if(!r.includes(":"))continue;const m=[],d=r.split("/").map(v=>v.startsWith(":")?(m.push(v.slice(1)),"([^/]+)"):v).join("/"),p=new RegExp(`^${d}$`),h=i.match(p);if(h){const v={};return m.forEach((g,b)=>{v[g]=h[b+1]}),{path:r,params:v,...u}}}return null}navigate(i,l={}){this.pendingAnimation=l&&l.animate?l.animate:null,window.location.hash!==`#${i}`?window.location.hash=i:this.handleRoute()}redirect(i){window.location.replace(`#${i}`)}goBack(){window.history.back()}getCurrentHash(){return window.location.hash.slice(1)||""}handleRoute(){const i=this.getCurrentHash();console.log(`[Router] Handling route: ${i||"(none)"}`);const l=this.matchRoute(i);if(!l){const r=tu()?this.authRoute:this.defaultRoute;console.warn(`[Router] Unknown route "${i}". Redirecting to: ${r}`),this.redirect(r);return}if(l.requiresAuth){if(!tu()){console.warn(`[Router] Protected route "${i}" blocked — user not logged in`),this.redirect(this.defaultRoute);return}if(!i2()){console.warn(`[Router] Protected route "${i}" blocked — session timed out`);return}}if(!l.requiresAuth&&tu()&&(i==="/login"||i==="/register"||i==="/landing"||i==="/forgot-password"||i==="/check-email")){console.log(`[Router] User logged in, redirecting from public route "${i}" to dashboard`),this.redirect(this.authRoute);return}try{console.log(`[Router] Rendering route: ${i}`);const r=document.getElementById("app");r&&(r.innerHTML=""),l.handler(l.params||{}),this.applyAnimation(),this.currentRoute=i}catch(r){console.error(`[Router] Error rendering route "${i}":`,r);const u=document.getElementById("app");u&&(u.innerHTML=`
          <div style="padding:20px;color:#fff;background:#111;text-align:center;">
            <h3>🚨 Rendering Error</h3>
            <p>${r.message}</p>
          </div>`)}}applyAnimation(){if(!this.pendingAnimation)return;const i=document.getElementById("app");if(!i){this.pendingAnimation=null;return}const r={"slide-right-fade":"np-anim-slide-right-fade","slide-left-fade":"np-anim-slide-left-fade"}[this.pendingAnimation];this.pendingAnimation=null,r&&(i.classList.remove("np-anim-slide-right-fade","np-anim-slide-left-fade"),i.offsetWidth,i.classList.add(r),i.addEventListener("animationend",()=>{i.classList.remove(r)},{once:!0}))}}const pt=new XT;function q(a,i){pt.navigate(a,i||{})}function la(){pt.goBack()}pt.addRoute("/login",s2);pt.addRoute("/register",l2);pt.addRoute("/forgot-password",o2);pt.addRoute("/check-email",r2);pt.addRoute("/landing",w4);pt.addRoute("/dashboard",C2,!0);pt.addRoute("/transfers",Hs,!0);pt.addRoute("/add-money",M4,!0);pt.addRoute("/bills",()=>q("/more/billers"),!0);pt.addRoute("/withdraw",Ed,!0);pt.addRoute("/card",oy,!0);pt.addRoute("/profile",Y4,!0);pt.addRoute("/notifications",dy,!0);pt.addRoute("/change-profile-picture",zT,!0);pt.addRoute("/transactions",F4,!0);pt.addRoute("/finances",tT,!0);pt.addRoute("/scan-qr",LT,!0);pt.addRoute("/kyc",eT,!0);pt.addRoute("/settings",oT,!0);pt.addRoute("/personal-info",cT,!0);pt.addRoute("/more/billers",fT,!0);pt.addRoute("/more/billers/:id",yT,!0);pt.addRoute("/more/billers/:id/confirm",AT,!0);pt.addRoute("/more/billers/:id/success",ST,!0);pt.addRoute("/remittance",CT,!0);pt.addRoute("/remittance/western-union",ET,!0);pt.addRoute("/remittance/moneygram",DT,!0);pt.addRoute("/remittance/success",NT,!0);pt.addRoute("/remittance/error",UT,!0);pt.addRoute("/bank-selection",HT,!0);pt.addRoute("/bank-details/:bank",a=>jT(a.bank),!0);pt.addRoute("/network-selection",GT,!0);pt.addRoute("/network-details/:network",a=>QT(a.network),!0);pt.setDefaults("/login","/dashboard");console.log("[Router] Routes registered:",Array.from(pt.routes.keys()));function PT(){const a=()=>{document.documentElement.style.setProperty("--app-height",`${window.innerHeight}px`)};a(),window.addEventListener("resize",a),window.addEventListener("orientationchange",a),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(window.addEventListener("orientationchange",()=>{setTimeout(a,100)}),/iPhone|iPad|iPod/i.test(navigator.userAgent)&&window.addEventListener("scroll",()=>{document.activeElement.tagName==="INPUT"&&document.activeElement.scrollIntoView()}))}console.log("[NovaPay] Vite frontend initializing...");try{_1()}catch(a){console.error("[NovaPay] Failed to load auth token:",a)}function gg(){PT(),Sg()||a2(),!location.hash||location.hash==="#/"||location.hash===""?(console.log("[NovaPay] No hash detected, redirecting to /login"),q("/login")):(console.log(`[NovaPay] Hash detected: ${location.hash}`),window.dispatchEvent(new Event("hashchange")))}function yg(){const a=document.getElementById("app");a&&!a.innerHTML.trim()&&(a.innerHTML=`
      <div style="padding:16px;color:#fff;background:#111;text-align:center;">
        <h2>🚀 NovaPay Loaded</h2>
        <p>Frontend running. Check router or console for issues.</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `,console.warn("[NovaPay] Failsafe rendered: router did not paint any view."))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{console.log("[NovaPay] DOMContentLoaded → initializing..."),gg(),setTimeout(yg,500)}):(console.log("[NovaPay] DOM ready → initializing immediately..."),gg(),setTimeout(yg,500));
