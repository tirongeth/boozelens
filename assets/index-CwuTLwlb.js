import{getApps as ht,initializeApp as co}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getAuth as lo,signInWithEmailAndPassword as uo,createUserWithEmailAndPassword as mo,onAuthStateChanged as po,signOut as yo}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";import{getDatabase as go,push as Le,ref as y,set as T,get as H,update as fo,remove as M,onValue as W,serverTimestamp as j,off as Nt}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";import{getStorage as ho,ref as Rt,deleteObject as vo,uploadBytes as bo,getDownloadURL as wo}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";import{getFunctions as ko,httpsCallable as Me}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const xo={apiKey:"AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg",authDomain:"hsg-party-tracker.firebaseapp.com",databaseURL:"https://hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app",projectId:"hsg-party-tracker",storageBucket:"hsg-party-tracker.firebasestorage.app",messagingSenderId:"1047483086606",appId:"1:1047483086606:web:a02d77baacd21166fb095f",measurementId:"G-VFS4W30Z7P"};let oe=null,B=null,I=null,je=null,Oe=null,vt=!1;function Eo(){if(vt)return console.log("Firebase already initialized"),!0;try{return ht().length?oe=ht()[0]:oe=co(xo),B=lo(oe),I=go(oe),je=ho(oe),Oe=ko(oe),vt=!0,console.log("✅ Firebase initialized successfully"),!0}catch(e){return console.error("❌ Firebase initialization error:",e),typeof window<"u"&&window.showNotification&&window.showNotification("Failed to connect to Firebase","error"),!1}}function Ke(){return B||(console.error("Firebase Auth not initialized. Call initializeFirebase() first."),null)}function k(){return I||(console.error("Firebase Database not initialized. Call initializeFirebase() first."),null)}function Ft(){return je||(console.error("Firebase Storage not initialized. Call initializeFirebase() first."),null)}function $e(){return Oe||(console.error("Firebase Functions not initialized. Call initializeFirebase() first."),null)}const C=(e,t)=>{const n=k();return n?typeof e=="string"?y(n,e):t!==void 0?y(e,t):y(n,e):null},bt=(e,t)=>{if(e)return W(e,t)},he=(e,t)=>e?T(e,t):Promise.reject("No ref provided"),F=e=>e?H(e):Promise.reject("No ref provided"),Je=(e,t)=>e?Le(e,t):null,re=(e,t)=>e?fo(e,t):Promise.reject("No ref provided"),De=e=>e?M(e):Promise.reject("No ref provided"),ve={currentUser:null,userData:{},partyData:{},partyStartTime:Date.now(),deviceData:{},friendsData:{},friendRequests:[],currentGame:null,gameScores:{team1:0,team2:0},achievements:{firstTimer:!0,responsible:!1,gameMaster:!1,partyAnimal:!1,guardianAngel:!1,hydroHomie:!1,danceMachine:!1,sunriseWarrior:!1},userAchievements:{},locationHistory:[],drinkHistory:[],chartVisible:!0,isSignUp:!1,isInitialized:!1};function b(){return ve}function R(e){return ve[e]}function D(e,t){ve[e]=t}function wt(e){ve.currentUser=e}function x(){return ve.currentUser}const ae={NETWORK:"network",AUTH:"auth",DATABASE:"database",VALIDATION:"validation",UNKNOWN:"unknown"},xe={"network/offline":"You appear to be offline. Please check your internet connection.","network/timeout":"The request took too long. Please try again.","network/server-error":"Server is having issues. Please try again later.","auth/invalid-email":"Please enter a valid email address.","auth/user-disabled":"This account has been disabled.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/email-already-in-use":"An account already exists with this email.","auth/weak-password":"Password should be at least 6 characters.","auth/invalid-credential":"Invalid login credentials. Please try again.","auth/too-many-requests":"Too many failed attempts. Please try again later.","auth/network-request-failed":"Network error. Please check your connection.","database/permission-denied":"You don't have permission to perform this action.","database/disconnected":"Lost connection to database. Reconnecting...","database/write-failed":"Failed to save data. Please try again.",unknown:"Something went wrong. Please try again."};function O(e,t=""){console.error(`Error in ${t}:`,e);const n=Co(e),o=Io(e),a=Bo(o,e);return Do(a),{type:n,code:o,message:a,originalError:e}}function Co(e){return e?e.code==="network-request-failed"||e.message?.includes("network")||e.message?.includes("fetch")?ae.NETWORK:e.code?.startsWith("auth/")?ae.AUTH:e.code?.startsWith("database/")||e.code==="permission-denied"?ae.DATABASE:e.name==="ValidationError"?ae.VALIDATION:ae.UNKNOWN:ae.UNKNOWN}function Io(e){return e?.code?e.code:e?.message?.includes("network")?"network/offline":e?.message?.includes("permission")?"database/permission-denied":"unknown"}function Bo(e,t){if(xe[e])return xe[e];if(t?.message&&typeof t.message=="string"){const n=t.message.replace(/Firebase: /g,"").replace(/Error \(auth\/[^)]+\): /g,"").replace(/\.$/,"");return n.includes("(")||n.includes(")")||n.length>100?xe.unknown:n}return xe.unknown}function Do(e,t){window.showNotification?window.showNotification(e,"error"):alert(`Error: ${e}`)}window.addEventListener("online",()=>{window.showNotification&&window.showNotification("Back online!","success")});window.addEventListener("offline",()=>{window.showNotification&&window.showNotification("You are offline. Some features may not work.","warning")});function Po(e,t,n){const o=[];switch(t){case"email":e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||o.push("Please enter a valid email address"):o.push(`${n} is required`);break;case"password":e?e.length<6&&o.push("Password must be at least 6 characters"):o.push(`${n} is required`);break;case"username":e?e.length<3?o.push("Username must be at least 3 characters"):/^[a-zA-Z0-9_]+$/.test(e)||o.push("Username can only contain letters, numbers, and underscores"):o.push(`${n} is required`);break;case"deviceId":e?e.match(/^HSG_[a-zA-Z0-9]+$/)||o.push("Device ID must start with HSG_ followed by letters/numbers"):o.push(`${n} is required`);break}return o}let Be=!1;function So(){document.getElementById("authContainer").style.display="flex",document.getElementById("userProfile").style.display="none",document.querySelector(".container").style.display="none"}function To(){document.getElementById("authContainer").style.display="none",document.getElementById("userProfile").style.display="block",document.querySelector(".container").style.display="block"}function de(e){const t=document.getElementById("authError");t.textContent=e,t.classList.add("show"),ue(),setTimeout(()=>{t.classList.remove("show")},5e3)}function Lo(){document.getElementById("authLoading").classList.add("show"),document.getElementById("authSubmitBtn").disabled=!0}function ue(){document.getElementById("authLoading").classList.remove("show"),document.getElementById("authSubmitBtn").disabled=!1}function Mo(){Be=!Be,Be?(document.getElementById("authTitle").textContent="Create Your Account",document.getElementById("authButton").textContent="Sign Up",document.getElementById("usernameGroup").style.display="block",document.getElementById("authToggleText").textContent="Already have an account?",document.getElementById("authToggleLink").textContent="Login"):(document.getElementById("authTitle").textContent="Welcome Back",document.getElementById("authButton").textContent="Login",document.getElementById("usernameGroup").style.display="none",document.getElementById("authToggleText").textContent="Don't have an account?",document.getElementById("authToggleLink").textContent="Sign up")}async function $o(e){e.preventDefault();const t=document.getElementById("authEmail").value.trim(),n=document.getElementById("authPassword").value,o=document.getElementById("authUsername").value.trim();if(!t||!n){de("Please fill in all fields");return}if(n.length<6){de("Password must be at least 6 characters");return}Lo();try{const a=Ke(),r=k();if(!Be)await uo(a,t,n),Pe("✅ Welcome back!","success");else{if(!o||o.length<3){de("Username must be at least 3 characters"),ue();return}if((await F(C(r,"usernames/"+o.toLowerCase()))).exists()){de("Username already taken"),ue();return}const l=(await mo(a,t,n)).user;await he(C(r,"users/"+l.uid),{username:o,email:t,createdAt:new Date().toISOString(),devices:{},friends:{},achievements:{},settings:{notifications:!0,shareLocation:!1,publicProfile:!0}}),await he(C(r,"usernames/"+o.toLowerCase()),l.uid),Pe("✅ Account created successfully!","success")}ue()}catch(a){ue();const r=O(a,"Authentication");de(r.message)}}async function Ao(){try{const e=Ke();await yo(e),Pe("👋 Signed out successfully"),location.reload()}catch(e){const t=O(e,"Sign Out");Pe(t.message,"error")}}function No(e){const t=Ke();po(t,n=>{n?(wt(n),e(n)):(wt(null),So())})}async function Ro(e){try{const t=k(),o=(await F(C(t,"users/"+e.uid))).val()||{},a=o.username||e.email.split("@")[0];document.getElementById("profileName").textContent=a,document.getElementById("profileEmail").textContent=e.email,document.querySelectorAll(".settings-username-display").forEach(i=>i.textContent=a),document.querySelectorAll(".settings-email-display").forEach(i=>i.textContent=e.email),document.getElementById("username").value=o.username||"",document.getElementById("emailDisplay").value=e.email,document.getElementById("linkedEmail").textContent=e.email;const r=a.charAt(0).toUpperCase();return document.getElementById("profileInitial").textContent=r,D("userData",o),o}catch(t){throw console.error("Error loading user data:",t),t}}function Pe(e,t="success"){const n=document.createElement("div");n.className=`notification ${t}`,n.textContent=e,n.onclick=()=>n.remove(),document.body.appendChild(n),setTimeout(()=>{n.parentNode&&n.remove()},4e3)}function s(e,t="success"){const n=document.createElement("div");n.className=`notification ${t}`,n.textContent=e,n.onclick=()=>n.remove(),document.body.appendChild(n),setTimeout(()=>{n.parentNode&&n.remove()},4e3)}window.showNotification=s;const pe={};let A=[];function Fo(){const e=x();if(!e)return;const t=k();W(y(t,"users/"+e.uid+"/devices"),n=>{const o=n.val()||{};D("deviceData",o),zo();const a=document.getElementById("deviceCount");a&&(a.textContent=Object.keys(o).length),Object.keys(o).forEach(r=>{qo(r)})}),Ht()}async function qt(){const e=document.getElementById("deviceIdInput").value.trim().toUpperCase(),t=Po(e,"deviceId","Device ID");if(t.length>0){s(t[0],"error");return}try{const n=k(),o=x();if(!(await H(y(n,"readings/"+e))).exists()){s("❌ Device not found. Make sure it's connected.","error");return}if(R("deviceData")[e]){s("ℹ️ Device already paired");return}await T(y(n,"users/"+o.uid+"/devices/"+e),{pairedAt:j(),name:"My Breathalyzer"}),document.getElementById("deviceIdInput").value="",s("✅ Device paired successfully!","success")}catch(n){const o=O(n,"Device Pairing");s(o.message,"error")}}function qo(e){if(pe[e])return;const t=k(),n=W(y(t,"readings/"+e),o=>{const a=o.val();a&&Wo(e,a)});pe[e]=n}function Wo(e,t){let n=R("partyData")||{};n[e]||(n[e]={name:R("userData").username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const o=n[e].bac;n[e].bac=t.bac||0,n[e].lastUpdate=Date.now(),n[e].trend=t.bac>o?"up":t.bac<o?"down":"steady",n[e].history.push({time:Date.now(),value:t.bac}),n[e].history.length>50&&n[e].history.shift(),D("partyData",n),window.updateUI&&window.updateUI(),Date.now()-t.timestamp<300*1e3&&t.bac>=.08&&s(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}function zo(){const e=document.getElementById("deviceList");if(!e)return;const t=R("deviceData")||{};if(e.innerHTML="",Object.keys(t).length===0){e.innerHTML='<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';return}const n=R("partyData")||{};Object.entries(t).forEach(([o,a])=>{const r=n[o],i=document.createElement("div");i.className="device-item",i.innerHTML=`
            <div class="device-info">
                <h4>${a.name||"Breathalyzer"}</h4>
                <p>ID: ${o}</p>
                <p>Last Reading: ${r?r.bac.toFixed(3)+"‰":"No data"}</p>
            </div>
            <div>
                <button class="btn" onclick="renameDevice('${o}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="unpairDevice('${o}')">
                    <i class="fas fa-unlink"></i>
                </button>
            </div>
        `,e.appendChild(i)})}async function Wt(e){if(confirm("Unpair this device?")){const t=k(),n=x();if(await M(y(t,"users/"+n.uid+"/devices/"+e)),pe[e]){const o=k();Nt(y(o,"readings/"+e),"value",pe[e]),delete pe[e]}s("🔓 Device unpaired")}}async function zt(e){const t=R("deviceData"),n=prompt("Enter new name for device:",t[e]?.name||"My Breathalyzer");if(n){const o=k(),a=x();await T(y(o,"users/"+a.uid+"/devices/"+e+"/name"),n),s("✏️ Device renamed")}}async function Ht(){try{console.log("🔧 Initializing BoozeLens devices..."),await new Promise(e=>setTimeout(e,1e3)),await be(),Uo(),console.log("✅ BoozeLens devices initialized")}catch(e){console.error("Failed to initialize BoozeLens devices:",e)}}const Ae=()=>window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Ho="http://localhost:5001";async function Ne(e,t={}){const n=`${Ho}/hsg-party-tracker/us-central1/manageBoozeLensDevice`;try{const a=await(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e,...t})})).json();return console.log("🧪 Local test server response:",a),{data:a}}catch(o){throw console.error("❌ Local test server error:",o),o}}async function be(){try{if(Ae()){console.log("🧪 Development mode: Using local test server");try{const e=await Ne("list");if(e.data.success){A=e.data.devices||[],D("boozeLensDevices",A),Ee(),Ce();return}}catch{console.warn("🧪 Local test server not available, using fallback")}}else{const e=$e();if(e){const n=await Me(e,"manageBoozeLensDevice")({action:"list"});if(n.data.success){A=n.data.devices||[],D("boozeLensDevices",A),Ee(),Ce();return}}}console.warn("No device management available - showing empty list"),A=[],D("boozeLensDevices",A),Ee(),Ce()}catch(e){console.warn("Error loading BoozeLens devices:",e.message),A=[],D("boozeLensDevices",A),Ee(),Ce()}}async function Se(e){try{if(!e||e.trim().length===0)throw new Error("Please enter a valid Device ID");const t=e.toUpperCase().trim();if(!t.startsWith("BOOZE"))throw new Error("Device ID should start with BOOZE (e.g., BOOZE12AB34)");s("📱 Pairing BoozeLens device...","info");let n;if(Ae())console.log("🧪 Development mode: Using local test server for pairing"),n=await Ne("pair",{deviceId:t});else{const o=$e();n=await Me(o,"manageBoozeLensDevice")({action:"pair",deviceId:t})}if(n.data.success)return s("✅ BoozeLens device paired successfully!","success"),await be(),jo(),!0;throw new Error(n.data.message||"Pairing failed")}catch(t){const n=O(t,"BoozeLens Device Pairing");return s(n.message,"error"),!1}}async function Qe(e){if(!confirm("Are you sure you want to unpair this BoozeLens device? This cannot be undone."))return!1;try{let t;if(Ae())console.log("🧪 Development mode: Using local test server for unpair"),t=await Ne("unpair",{deviceId:e});else{const n=$e();t=await Me(n,"manageBoozeLensDevice")({action:"unpair",deviceId:e})}if(t.data.success)return s("📱 BoozeLens device unpaired","info"),await be(),!0;throw new Error(t.data.message||"Unpair failed")}catch(t){const n=O(t,"BoozeLens Device Unpair");return s(n.message,"error"),!1}}async function Ze(e,t){try{if(!t||t.trim().length===0)throw new Error("Please enter a valid nickname");let n;if(Ae())console.log("🧪 Development mode: Using local test server for rename"),n=await Ne("rename",{deviceId:e,nickname:t.trim()});else{const o=$e();n=await Me(o,"manageBoozeLensDevice")({action:"rename",deviceId:e,nickname:t.trim()})}if(n.data.success)return s("📝 BoozeLens device renamed","success"),await be(),!0;throw new Error(n.data.message||"Rename failed")}catch(n){const o=O(n,"BoozeLens Device Rename");return s(o.message,"error"),!1}}function Uo(){document.addEventListener("click",async t=>{const n=t.target;if(n.id==="pairBoozeLensDeviceBtn"){t.preventDefault();const o=document.getElementById("boozeLensDeviceIdInput");o&&await Se(o.value)}if(n.classList.contains("unpair-boozelens-device-btn")){t.preventDefault();const o=n.dataset.deviceId;o&&await Qe(o)}if(n.classList.contains("rename-boozelens-device-btn")){t.preventDefault();const o=n.dataset.deviceId,a=n.dataset.currentNickname,r=prompt("Enter new nickname:",a);r&&r!==a&&await Ze(o,r)}});const e=document.getElementById("boozeLensDevicePairForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("boozeLensDeviceIdInput");n&&await Se(n.value)})}function Ee(){const e=document.getElementById("boozeLensDeviceList");if(console.log("📱 Updating BoozeLens device list, container found:",!!e),!e){console.warn("⚠️ boozeLensDeviceList container not found!");return}if(A.length===0){e.innerHTML=`
            <div class="device-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 3em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No BoozeLens devices paired yet.</p>
                <p style="opacity: 0.5;">Pair your first device below!</p>
            </div>
        `;return}e.innerHTML=A.map(t=>{const n=t.lastSeen?Oo(t.lastSeen):"Never",o=_o(t.lastSeen),a=Re(t.lastSeen);return`
            <div class="boozelens-device-card" data-device-id="${t.deviceId}">
                <div class="device-header">
                    <div class="device-info">
                        <div class="device-icon">
                            <i class="fas fa-camera-retro"></i>
                        </div>
                        <div class="device-details">
                            <h4>${t.nickname}</h4>
                            <p class="device-id">${t.deviceId}</p>
                            <p class="device-status" style="color: ${o}">
                                <i class="fas fa-circle" style="font-size: 0.6em;"></i>
                                ${a?"Online":"Offline"} • Last seen ${n}
                            </p>
                        </div>
                    </div>
                    <div class="device-actions">
                        <button class="btn-icon rename-boozelens-device-btn" 
                                data-device-id="${t.deviceId}" 
                                data-current-nickname="${t.nickname}"
                                title="Rename device">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon unpair-boozelens-device-btn" 
                                data-device-id="${t.deviceId}"
                                title="Unpair device">
                            <i class="fas fa-unlink"></i>
                        </button>
                    </div>
                </div>
                
                <div class="device-stats">
                    <div class="stat">
                        <span class="stat-value">${t.totalPhotos||0}</span>
                        <span class="stat-label">Photos</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${Go(t.pairedAt)}</span>
                        <span class="stat-label">Days paired</span>
                    </div>
                </div>
            </div>
        `}).join("")}function Ce(){const e=document.getElementById("boozeLensDeviceStats");if(!e)return;const t=A.length,n=A.filter(a=>Re(a.lastSeen)).length,o=A.reduce((a,r)=>a+(r.totalPhotos||0),0);e.innerHTML=`
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-camera-retro"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${t}</div>
                    <div class="stat-label">BoozeLens Devices</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-wifi" style="color: #00ff88;"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${n}</div>
                    <div class="stat-label">Online</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-images"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${o}</div>
                    <div class="stat-label">Photos</div>
                </div>
            </div>
        </div>
    `}function jo(){const e=document.getElementById("boozeLensDeviceIdInput");e&&(e.value="")}function Oo(e){if(!e)return"never";const n=Date.now()-e,o=Math.floor(n/1e3);return o<60?"just now":o<3600?`${Math.floor(o/60)}m ago`:o<86400?`${Math.floor(o/3600)}h ago`:`${Math.floor(o/86400)}d ago`}function Go(e){if(!e)return"0";const n=Date.now()-e;return Math.floor(n/(1e3*60*60*24)).toString()}function Re(e){return e?(Date.now()-e)/(1e3*60)<5:!1}function _o(e){return Re(e)?"#00ff88":"#ff6b6b"}async function Vo(){await be(),s("📱 BoozeLens devices refreshed","success")}function Ut(){return A}function Yo(){return A.filter(e=>Re(e.lastSeen)).length}window.pairDeviceById=qt;window.unpairDevice=Wt;window.renameDevice=zt;window.pairBoozeLensDevice=Se;window.unpairBoozeLensDevice=Qe;window.renameBoozeLensDevice=Ze;const te={beer:{amount:330,alcohol:5,emoji:"🍺"},wine:{amount:150,alcohol:12,emoji:"🍷"},shot:{amount:40,alcohol:40,emoji:"🥃"},cocktail:{amount:200,alcohol:15,emoji:"🍸"},mixed:{amount:250,alcohol:10,emoji:"🥤"},champagne:{amount:150,alcohol:12,emoji:"🥂"},water:{amount:250,alcohol:0,emoji:"💧"},other:{amount:200,alcohol:5,emoji:"🍹"}},K={SOBER:{max:.02,class:"bac-safe",text:"Sober",emoji:"😊"},BUZZED:{max:.05,class:"bac-caution",text:"Buzzed",emoji:"😎"},IMPAIRED:{max:.08,class:"bac-danger",text:"No Driving!",emoji:"🚫"},DRUNK:{max:1/0,class:"bac-critical",text:"Too Much!",emoji:"🤢"}};function jt(e){return e<K.SOBER.max?K.SOBER:e<K.BUZZED.max?K.BUZZED:e<K.IMPAIRED.max?K.IMPAIRED:K.DRUNK}const Ot=["k1OvkYapqbZUAf9RbvfmnhgWcY23","kHNxyiqgsSfUHZArxbApGzxTlhO2"];function q(e){return Ot.includes(e)}const ie=Object.freeze(Object.defineProperty({__proto__:null,BAC_STATUS:K,DEVELOPER_UIDS:Ot,DRINK_PRESETS:te,getBACStatus:jt,isDeveloper:q},Symbol.toStringTag,{value:"Module"}));class Xe{constructor(){this.cache=new Map,this.timers=new Map}set(t,n,o=null){if(this.timers.has(t)&&(clearTimeout(this.timers.get(t)),this.timers.delete(t)),this.cache.set(t,{value:n,timestamp:Date.now()}),o&&o>0){const a=setTimeout(()=>{this.delete(t)},o);this.timers.set(t,a)}}get(t){const n=this.cache.get(t);return n?n.value:null}has(t){return this.cache.has(t)}delete(t){return this.timers.has(t)&&(clearTimeout(this.timers.get(t)),this.timers.delete(t)),this.cache.delete(t)}clear(){for(const t of this.timers.values())clearTimeout(t);this.timers.clear(),this.cache.clear()}size(){return this.cache.size}getAge(t){const n=this.cache.get(t);return n?Date.now()-n.timestamp:null}}const kt=new Xe,xt=new Xe,Ge={PARTY_DATA:3e4,LEADERBOARD:1e4,DEVICE_READINGS:5e3,FRIENDS_PARTIES:6e4,PUBLIC_PARTIES:12e4};function Ko(...e){return e.filter(Boolean).join(":")}class Jo extends Xe{setMany(t,n=null){for(const[o,a]of t)this.set(o,a,n)}getMany(t){const n=new Map;for(const o of t){const a=this.get(o);a!==null&&n.set(o,a)}return n}deletePattern(t){const n=[];for(const o of this.cache.keys())o.includes(t)&&n.push(o);for(const o of n)this.delete(o);return n.length}}const Et=new Jo;let g=null,L=[],Te=new Map,Z=[];async function Gt(e,t={}){try{const n=B.currentUser;if(!n)throw new Error("Not logged in");const a=b().userData.username||n.email.split("@")[0],r=Math.random().toString(36).substring(2,8).toUpperCase(),i=Je(C(I,"parties")),c={id:i.key,name:e,code:r,creatorId:n.uid,creatorName:a,privacy:t.privacy||"private",duration:t.duration||"24h",address:t.address||"",maxMembers:t.maxMembers||50,description:t.description||"",members:{[n.uid]:{name:a,joinedAt:Date.now(),role:"creator"}},pendingRequests:{},stats:{totalDrinks:0,avgBac:0,peakBac:0,safetyScore:100},createdAt:Date.now(),expiresAt:t.duration==="24h"?Date.now()+1440*60*1e3:null};return await he(i,c),ge(c),g=c,U(),ye(c.id),{success:!0,code:r,party:c}}catch(n){return console.error("Create party error:",n),{success:!1,error:n.message}}}async function et(e){try{const t=await F(C(I,"parties"));if(!t.exists())return null;let n=null;return t.forEach(o=>{const a=o.val();a.code===e.toUpperCase()&&(n={...a,id:o.key})}),n}catch(t){return console.error("Get party error:",t),null}}async function tt(e,t=!1){try{const n=B.currentUser;if(!n)throw new Error("Not logged in");const o=await et(e);if(!o)throw new Error("Invalid code");if(await Qt(o.id,n.uid)&&!q(n.uid))throw new Error("You have been banned from this party");if(o.locked&&!t&&!q(n.uid))throw new Error("This party is locked. No new members allowed.");if(o.members&&o.members[n.uid])return ge(o),g=o,U(),ye(o.id),{success:!0,alreadyMember:!0};if(Object.keys(o.members||{}).length>=(o.maxMembers||50))throw new Error("Party is full");if(o.expiresAt&&Date.now()>o.expiresAt)throw new Error("Party has expired");const c=b().userData.username||n.email.split("@")[0];if(o.privacy==="public"||t)return await re(C(I,`parties/${o.id}/members/${n.uid}`),{name:c,joinedAt:Date.now(),role:"member"}),ge(o),g=o,U(),ye(o.id),{success:!0};if(o.privacy==="friends-only"){if(!(await F(C(I,`users/${n.uid}/friends/${o.creatorId}`))).exists())throw new Error("This party is for friends only");return await re(C(I,`parties/${o.id}/members/${n.uid}`),{name:c,joinedAt:Date.now(),role:"friend"}),ge(o),g=o,U(),ye(o.id),{success:!0}}else return await re(C(I,`parties/${o.id}/pendingRequests/${n.uid}`),{name:c,requestedAt:Date.now()}),{success:!0,pending:!0,party:o}}catch(n){return console.error("Join party error:",n),{success:!1,error:n.message}}}async function _t(e=null){try{const t=e?L.find(o=>o.id===e):g;if(!t)return{success:!0};const n=B.currentUser;if(!n)throw new Error("Not logged in");return t.creatorId===n.uid?await Vt(t.id):(await he(C(I,`parties/${t.id}/members/${n.uid}`),null),ot(t.id),g&&g.id===t.id&&(g=L.length>0?L[0]:null),U(),nt(t.id),{success:!0})}catch(t){return console.error("Leave party error:",t),{success:!1,error:t.message}}}async function Vt(e=null){try{if(!B.currentUser)return{success:!1,error:"Not authenticated"};const t=e?L.find(o=>o.id===e):g;if(e&&!t&&q(B.currentUser.uid))return await De(C(I,`parties/${e}`)),{success:!0};if(!t)return{success:!1,error:"Party not found"};const n=B.currentUser;return t.creatorId!==n.uid&&!q(n.uid)?{success:!1,error:"Only the party creator can delete the party"}:(await De(C(I,`parties/${t.id}`)),ot(t.id),g&&g.id===t.id&&(g=L.length>0?L[0]:null),U(),nt(t.id),{success:!0})}catch(t){return console.error("Delete party error:",t),{success:!1,error:t.message}}}async function Qo(){try{const e=B.currentUser;if(!e){console.log("No authenticated user");return}const t=JSON.parse(localStorage.getItem("userParties")||"[]"),n=localStorage.getItem("currentPartyId");L=[],g=null;for(const o of t){const a=await F(C(I,`parties/${o}`));if(a.exists()){const r={...a.val(),id:o};r.members&&r.members[e.uid]&&(!r.expiresAt||Date.now()<=r.expiresAt)&&(L.push(r),ye(o),o===n&&(g=r))}}!g&&L.length>0&&(g=L[0]),U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()}catch(e){console.error("Load parties error:",e)}}function ye(e){if(Te.has(e))return;const t=bt(C(I,`parties/${e}`),o=>{if(o.exists()){const a=o.val(),r=B.currentUser;if(!a||!r){Ie();return}if(!a.members||!a.members[r.uid]){console.log("User no longer a member of party"),Ie(e);return}if(a.expiresAt&&Date.now()>a.expiresAt){console.log("Party has expired"),Ie(e);return}const i={...a,id:e};ge(i),g&&g.id===e&&(g=i),U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()}else console.log("Party no longer exists in Firebase"),Ie(e)});Te.set(e,t);const n=C(I,`parties/${e}/chat`);F(n).then(o=>{Z=[];const a=[];o.forEach(r=>{a.push({id:r.key,...r.val()})}),Z=a.slice(-50),a.length>0&&a[0].id,window.updatePartyChat&&window.updatePartyChat(Z)}),bt(n,o=>{if(!o.exists())return;const a=[];let r=!1;o.forEach(i=>{const c={id:i.key,...i.val()};Z.findIndex(d=>d.id===c.id)===-1&&(a.push(c),r=!0)}),r&&(Z=[...Z,...a].slice(-100),window.updatePartyChat&&window.updatePartyChat(Z.slice(-50)))})}function nt(e){const t=Te.get(e);t&&(t(),Te.delete(e))}function Ie(e){e&&(ot(e),g&&g.id===e&&(g=L.length>0?L[0]:null),U(),nt(e),setTimeout(()=>{typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()},100),typeof window<"u"&&window.showNotification&&window.showNotification("You have left the party","info"))}function ge(e){L=L.filter(t=>t.id!==e.id),L.push(e)}function ot(e){L=L.filter(t=>t.id!==e)}function U(){const e=L.map(t=>t.id);localStorage.setItem("userParties",JSON.stringify(e)),g?localStorage.setItem("currentPartyId",g.id):localStorage.removeItem("currentPartyId")}function Zo(e){const t=L.find(n=>n.id===e);return t?(g=t,U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay(),!0):!1}async function Yt(e){try{if(!g||!e.trim())return{success:!1};const t=B.currentUser;if(!t)return{success:!1};const o=b().userData.username||t.email.split("@")[0];return await Je(C(I,`parties/${g.id}/chat`),{userId:t.uid,userName:o,message:e.trim(),timestamp:Date.now()}),{success:!0}}catch(t){return console.error("Send message error:",t),{success:!1}}}function Xo(){if(!g)return null;const e=Object.keys(g.members||{}).length,t=Date.now()-g.createdAt,n=Math.floor(t/(1e3*60*60)),o=Math.floor(t%(1e3*60*60)/(1e3*60));return{memberCount:e,duration:n>0?`${n}h ${o}m`:`${o}m`,code:g.code}}async function ea(e,t){try{if(!g||g.creatorId!==B.currentUser.uid)throw new Error("Only party creator can manage requests");const n=C(I,`parties/${g.id}/pendingRequests/${e}`),o=await F(n);if(!o.exists())throw new Error("Request not found");const a=o.val();return t&&await re(C(I,`parties/${g.id}/members/${e}`),{name:a.name,joinedAt:Date.now(),role:"member"}),await De(n),{success:!0}}catch(n){return console.error("Handle join request error:",n),{success:!1,error:n.message}}}async function Kt(){if(!g)return[];const e=Ko("leaderboard",g.id),t=xt.get(e);if(t)return t;const n=[],o=Object.keys(g.members||{}),a=o.map(h=>F(C(I,`users/${h}/devices`))),r=await Promise.all(a),i=[],c=new Map;r.forEach((h,f)=>{const P=o[f];if(h.exists()){const N=Object.keys(h.val());c.set(P,N),i.push(...N)}else c.set(P,[])});const l=Et.getMany(i),d=i.filter(h=>!l.has(h)),m=d.map(h=>F(C(I,`readings/${h}`))),p=await Promise.all(m),v=new Map(l);d.forEach((h,f)=>{const P=p[f];if(P.exists()){const N=P.val().bac||0;v.set(h,N),Et.set(h,N,Ge.DEVICE_READINGS)}});for(const[h,f]of Object.entries(g.members||{})){let P=0;const N=c.get(h)||[];for(const so of N){const ft=v.get(so)||0;ft>P&&(P=ft)}n.push({userId:h,name:f.name,bac:P,joinedAt:f.joinedAt,role:f.role||"member"})}return n.sort((h,f)=>f.bac-h.bac),xt.set(e,n,Ge.LEADERBOARD),n}async function ta(){try{if(!B.currentUser)return[];const e=B.currentUser,n=(await F(C(I,`users/${e.uid}/friends`))).val()||{},o=Object.keys(n);if(o.length===0)return[];const r=(await F(C(I,"parties"))).val()||{},i=[],c=Date.now();return Object.entries(r).forEach(([l,d])=>{if(d.privacy==="friends-only"&&(!d.expiresAt||d.expiresAt>c)&&o.includes(d.creatorId)){const m=Object.keys(d.members||{}).length;i.push({...d,id:l,memberCount:m,code:d.code,creatorName:n[d.creatorId]?.name||"Friend"})}}),i.sort((l,d)=>d.memberCount-l.memberCount)}catch(e){return console.error("Error getting friends parties:",e),[]}}async function Jt(){try{const e="public:parties",t=kt.get(e);if(t)return t;const n=await F(C(I,"parties"));if(!n.exists())return[];const o=[],a=Date.now();return n.forEach(r=>{const i=r.val();i.privacy==="public"&&(!i.expiresAt||i.expiresAt>a)&&o.push({...i,id:r.key,memberCount:Object.keys(i.members||{}).length})}),o.sort((r,i)=>i.memberCount-r.memberCount),kt.set(e,o,Ge.PUBLIC_PARTIES),o}catch(e){return console.error("Get nearby parties error:",e),[]}}async function na(e,t=""){try{return!g||!B.currentUser?{success:!1,error:"Not in a party or not authenticated"}:g.creatorId!==B.currentUser.uid&&!q(B.currentUser.uid)?{success:!1,error:"Only the party creator can kick members"}:e===B.currentUser.uid?{success:!1,error:"Cannot kick yourself. Use delete party instead."}:!g.members||!g.members[e]?{success:!1,error:"Member not found in party"}:(await Je(C(I,`parties/${g.id}/moderation`),{action:"kick",targetId:e,targetName:g.members[e].name,moderatorId:B.currentUser.uid,reason:t,timestamp:Date.now()}),await De(C(I,`parties/${g.id}/members/${e}`)),await he(C(I,`parties/${g.id}/banned/${e}`),{bannedAt:Date.now(),bannedBy:B.currentUser.uid,reason:t}),{success:!0})}catch(n){return console.error("Kick member error:",n),{success:!1,error:n.message}}}async function oa(e){try{if(!g||!B.currentUser)return{success:!1,error:"Not in a party or not authenticated"};if(g.creatorId!==B.currentUser.uid&&!q(B.currentUser.uid))return{success:!1,error:"Only the party creator can update settings"};const t=["name","privacy","maxMembers","description","address","locked"],n={};for(const[o,a]of Object.entries(e))t.includes(o)&&(n[o]=a);return Object.keys(n).length===0?{success:!1,error:"No valid settings provided"}:(await re(C(I,`parties/${g.id}`),n),{success:!0})}catch(t){return console.error("Update party settings error:",t),{success:!1,error:t.message}}}async function aa(e){try{return!g||!B.currentUser?{success:!1,error:"Not in a party or not authenticated"}:g.creatorId!==B.currentUser.uid?{success:!1,error:"Only the party creator can lock/unlock the party"}:(await re(C(I,`parties/${g.id}`),{locked:e,lockedAt:e?Date.now():null}),{success:!0,locked:e})}catch(t){return console.error("Toggle party lock error:",t),{success:!1,error:t.message}}}async function Qt(e,t){try{return(await F(C(I,`parties/${e}/banned/${t}`))).exists()}catch(n){return console.error("Check ban status error:",n),!1}}function Zt(){return g?.id||null}async function Xt(e){return s("Friend system coming soon!","info"),{success:!1}}const Ct=Object.freeze(Object.defineProperty({__proto__:null,createParty:Gt,get currentParty(){return g},deleteParty:Vt,getCurrentPartyId:Zt,getFriendsParties:ta,getNearbyParties:Jt,getPartyByCode:et,getPartyLeaderboard:Kt,getPartyStats:Xo,handleJoinRequest:ea,isUserBanned:Qt,joinParty:tt,kickMember:na,leaveParty:_t,loadUserParties:Qo,quickAddFriend:Xt,sendPartyMessage:Yt,switchToParty:Zo,togglePartyLock:aa,updatePartySettings:oa,get userParties(){return L}},Symbol.toStringTag,{value:"Module"}));function ne(){try{ra(),ia(),sa(),ca(),da()}catch(e){console.error("UI update failed:",e)}}function ra(){const e=document.getElementById("friendsGrid");if(!e)return;const t=R("partyData")||{};e.innerHTML="",Object.entries(t).forEach(([n,o])=>{if(!(Date.now()-o.lastUpdate<864e5))return;const r=jt(o.bac),i=ma(o.lastUpdate),c=document.createElement("div");c.className="card friend-card",c.setAttribute("data-friend-id",o.friendId||n),c.onclick=()=>ua(o);const l=o.trend==="up"?"📈":o.trend==="down"?"📉":"➡️",d=o.trend==="up"?"trend-up":o.trend==="down"?"trend-down":"",m=o.isOwn?"👤":o.permission==="guardian"?"🛡️":"👥";c.innerHTML=`
            <div class="friend-avatar">${m}</div>
            <div class="friend-name">${o.name}</div>
            <div class="bac-value ${r.class}">
                ${o.bac.toFixed(3)}‰
                <span class="bac-trend ${d}">${l}</span>
            </div>
            <div class="friend-status">
                <span class="status-badge">${r.emoji} ${r.text}</span>
            </div>
            <div class="location-tag">
                <i class="fas fa-map-marker-alt"></i> ${o.location}
            </div>
            <div class="last-update" style="margin-top: 10px; opacity: 0.7; font-size: 0.9em;">
                Updated ${i}
            </div>
        `,o.bac>=.08&&c.classList.add("pulse"),e.appendChild(c)})}function ia(){const e=R("partyData")||{},t=Object.values(e).filter(l=>Date.now()-l.lastUpdate<1440*60*1e3),n=t.reduce((l,d)=>l+d.bac,0)/t.length||0,o=document.getElementById("partyAverage");o&&(o.textContent=n.toFixed(3)+"‰");const a=t.filter(l=>l.bac<.02).length,r=document.getElementById("safeFriends");r&&(r.textContent=a);const i=document.getElementById("hydrationTime"),c=document.getElementById("hydrationLabel");if(i)if(window.hydrationTimerInterval&&window.hydrationTargetTime){const l=Date.now(),d=Math.max(0,window.hydrationTargetTime-l),m=Math.ceil(d/6e4);i.textContent=m+"m",c&&(c.style.display="block",c.textContent="until water break")}else i.textContent="Stay hydrated",c&&(c.style.display="none")}async function sa(){const e=document.getElementById("leaderboardList");if(!e)return;e.innerHTML="";const t=Zt();let n=[];if(t)n=await Kt(),n=n.slice(0,5);else{const a=R("partyData")||{};n=Object.values(a).sort((r,i)=>i.bac-r.bac).slice(0,5)}const o=[a=>`🏆 ${a} is absolutely dominating the party! Living their best life!`,a=>`🥈 ${a} is so close! One more and they could take the crown!`,a=>`🥉 ${a} is holding strong! The podium suits them well!`,a=>`${a} is warming up! The night is still young!`,a=>`${a} is taking it easy... or are they just getting started? 🤔`];n.forEach((a,r)=>{const i=document.createElement("div");i.className="leaderboard-item",i.onclick=()=>{r===0&&window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}});const c=o[r]?o[r](a.name):`${a.name} is participating!`;window.showNotification(c)},i.innerHTML=`
            <span class="rank rank-${r+1}">#${r+1}</span>
            <span>${a.name}</span>
            <span>${a.bac.toFixed(3)}‰</span>
            ${t&&a.id?`<button class="quick-add-btn" onclick="window.quickAddPartyFriend('${a.id}')">+</button>`:""}
        `,e.appendChild(i)})}function ca(){const e=document.getElementById("visualizer");if(e){if(e.children.length===0)for(let t=0;t<20;t++){const n=document.createElement("div");n.className="bar",e.appendChild(n)}e.querySelectorAll(".bar").forEach(t=>{const n=Math.random()*150+20;t.style.height=n+"px"})}}let It=0;const la=300*1e3;function da(){const e=R("partyData")||{},t=Object.values(e).filter(o=>Date.now()-o.lastUpdate<1440*60*1e3&&o.bac>=.08&&o.isFriend===!0&&!o.isOwn);if(t.length>0){const o=Date.now();if(o-It>la){const a=t.map(r=>r.name).join(", ");showNotification(`⚠️ ${t.length} friend${t.length>1?"s have":" has"} high BAC: ${a}`,"warning"),It=o}t.forEach(a=>{const r=document.querySelector(`[data-friend-id="${a.friendId||a.deviceId}"]`);r&&r.classList.add("bac-warning")})}else document.querySelectorAll(".bac-warning").forEach(o=>{o.classList.remove("bac-warning")});const n=document.getElementById("alertBanner");n&&(n.style.display="none")}function ua(e){console.log("Show friend details:",e)}window.quickAddPartyFriend=async function(e){await Xt()};function ma(e){const t=Math.floor((Date.now()-e)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}window.updateUI=ne;let me,_e=!1;(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&(_e=!0);async function Bt(){return console.log("Service worker registration disabled"),null}function Dt(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),me=e,_e||pa()}),window.addEventListener("appinstalled",()=>{console.log("PWA was installed"),_e=!0,ya(),s("App installed successfully!","success")})}function pa(){let e=document.getElementById("installButton");if(!e){e=document.createElement("button"),e.id="installButton",e.className="btn btn-primary install-button",e.innerHTML='<i class="fas fa-download"></i> Install App',e.onclick=ga;const t=document.querySelector(".action-buttons");t&&t.appendChild(e)}e.style.display="inline-block"}function ya(){const e=document.getElementById("installButton");e&&(e.style.display="none")}async function ga(){if(!me){s("App is already installed or not available for installation","info");return}me.prompt();const{outcome:e}=await me.userChoice;console.log(`User response to install prompt: ${e}`),console.log(e==="accepted"?"User accepted the install prompt":"User dismissed the install prompt"),me=null}function Pt(){const e=indexedDB.open("BoozeLensDB",1);e.onerror=()=>{console.error("Failed to open IndexedDB")},e.onsuccess=t=>{t.target.result,console.log("IndexedDB opened successfully")},e.onupgradeneeded=t=>{const n=t.target.result;if(!n.objectStoreNames.contains("drinks")){const o=n.createObjectStore("drinks",{keyPath:"id",autoIncrement:!0});o.createIndex("timestamp","timestamp",{unique:!1}),o.createIndex("synced","synced",{unique:!1})}if(!n.objectStoreNames.contains("readings")){const o=n.createObjectStore("readings",{keyPath:"id",autoIncrement:!0});o.createIndex("timestamp","timestamp",{unique:!1}),o.createIndex("synced","synced",{unique:!1})}}}window.addEventListener("online",()=>{s("Back online! Syncing data...","success"),"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(e=>{"sync"in e&&e.sync.register("sync-all")})});window.addEventListener("offline",()=>{s("You are offline. Data will be saved locally.","warning")});function fa(e){try{if(!e){console.warn("Parties module not ready");return}const t=e.currentParty,n=e.userParties||[],o=document.getElementById("currentPartySection"),a=document.getElementById("dashboardPartyInfo");let r=null,i=!1,c=!1;try{r=x(),r&&(i=t&&t.creatorId===r.uid,c=q(r.uid))}catch(l){console.warn("Could not get current user:",l)}ha(n,t),t?ba(t,o,a,r,i,c,e):wa(o,a)}catch(t){console.error("Error in safeUpdatePartyDisplay:",t)}}function ha(e,t){const n=document.getElementById("partySwitcher");e.length>1?(n&&n.remove(),va(e,t)):n&&n.remove()}function va(e,t){const n=document.createElement("div");n.id="partySwitcher",n.style.cssText=`
        position: fixed; 
        top: 80px; 
        right: 20px; 
        background: rgba(0,0,0,0.95); 
        border: 2px solid #00ff88; 
        border-radius: 10px; 
        padding: 15px; 
        z-index: 1000; 
        max-width: 250px; 
        box-shadow: 0 4px 20px rgba(0,255,136,0.3); 
        max-height: 400px; 
        overflow-y: auto;
    `;const o=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4 style="margin: 0; color: #00ff88;">My Parties (${e.length})</h4>
            <button onclick="document.getElementById('partySwitcher').remove()" 
                    style="background: none; border: none; color: #fff; cursor: pointer; font-size: 20px;">×</button>
        </div>
    `,a=e.map(r=>{const i=r.members?Object.keys(r.members).length:0,c=t&&t.id===r.id;return`
            <button class="btn ${c?"btn-primary":""}" 
                    style="display: block; width: 100%; margin: 5px 0; text-align: left; padding: 10px;"
                    onclick="switchToParty('${r.id}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>🎉 ${r.name}</span>
                    <span style="font-size: 0.8em; opacity: 0.7;">${i} 👥</span>
                </div>
                ${c?'<small style="color: #00ff88;">Currently viewing</small>':""}
            </button>
        `}).join("");n.innerHTML=o+a,document.body.appendChild(n)}function ba(e,t,n,o,a,r,i){t&&(t.style.display="block"),n&&(n.style.display="block"),ka(e),xa(e,o,a,r),Ea(e,i),Ca(e,o,a),Ia(e,a,r),window.updatePartyLeaderboard&&window.updatePartyLeaderboard()}function wa(e,t){e&&(e.style.display="none"),t&&(t.style.display="none");const n=document.getElementById("creatorControlsSection");n&&(n.style.display="none");const o=document.getElementById("pendingRequestsSection");o&&(o.style.display="none")}function ka(e){const t=document.querySelectorAll("#currentPartyName, #dashboardPartyName"),n=document.querySelectorAll("#currentPartyCode, #dashboardPartyCode");t.forEach(o=>{if(o){const a=document.createElement("template");a.innerHTML='<span data-party-name></span> <span style="font-size: 0.8em; opacity: 0.7;">by <span data-creator-name></span></span>';const r=a.content.cloneNode(!0);r.querySelector("[data-party-name]").textContent=e.name,r.querySelector("[data-creator-name]").textContent=e.creatorName||"Unknown",o.innerHTML="",o.appendChild(r)}}),n.forEach(o=>{o&&(o.textContent=e.code)})}function xa(e,t,n,o){const a=document.getElementById("partyMembersList");if(!a||!e.members)return;const r=document.createElement("template");r.innerHTML=`
        <div class="friend-item">
            <div class="friend-info">
                <div class="friend-avatar-small" data-avatar></div>
                <div class="friend-details">
                    <h4 data-member-name></h4>
                    <p style="opacity: 0.7; font-size: 0.9em;" data-member-details></p>
                </div>
            </div>
            <div data-kick-button></div>
        </div>
    `,a.innerHTML="";for(const[i,c]of Object.entries(e.members)){const l=i===e.creatorId,d=t&&i===t.uid,m=(n||o)&&!d&&!l,p=r.content.cloneNode(!0);p.querySelector("[data-avatar]").textContent=l?"👑":"👤";const v=p.querySelector("[data-member-name]");if(v.textContent=c.name,l){const f=document.createElement("span");f.style.color="#00ff88",f.textContent=" (Host)",v.appendChild(f)}const h=(c.role==="creator"?"Party Host • ":"")+`Joined ${new Date(c.joinedAt).toLocaleTimeString()}`;if(p.querySelector("[data-member-details]").textContent=h,m){const f=document.createElement("button");f.className="btn btn-danger",f.style.cssText="padding: 5px 10px; font-size: 0.9em;",f.innerHTML='<i class="fas fa-user-times"></i> Kick',f.onclick=()=>kickMemberFromParty(i,c.name),p.querySelector("[data-kick-button]").appendChild(f)}a.appendChild(p)}}function Ea(e,t){const n=document.getElementById("partyStats");if(!n)return;const o=t.getPartyStats();o&&(n.innerHTML=`
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">👥</div>
            <div style="font-size: 1.5em; font-weight: bold;">${o.memberCount}</div>
            <div style="opacity: 0.7;">Members</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">⏱️</div>
            <div style="font-size: 1.5em; font-weight: bold;">${o.duration}</div>
            <div style="opacity: 0.7;">Duration</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">🎆</div>
            <div style="font-size: 1.5em; font-weight: bold;">${o.code}</div>
            <div style="opacity: 0.7;">Party Code</div>
        </div>
    `)}function Ca(e,t,n){const o=document.getElementById("leavePartyBtn");!o||!t||(n?(o.innerHTML='<i class="fas fa-trash"></i> Delete Party',o.className="btn btn-danger"):(o.innerHTML='<i class="fas fa-door-open"></i> Leave Party',o.className="btn btn-danger"))}function Ia(e,t,n){if(!t&&!n){const i=document.getElementById("creatorControlsSection");i&&(i.style.display="none");const c=document.getElementById("pendingRequestsSection");c&&(c.style.display="none");return}const o=document.getElementById("creatorControlsSection");if(o){o.style.display="block";const i=document.getElementById("lockPartyBtn");i&&(e.locked?i.innerHTML='<i class="fas fa-lock-open"></i> Unlock Party':i.innerHTML='<i class="fas fa-lock"></i> Lock Party')}const a=document.getElementById("pendingRequestsSection"),r=document.getElementById("pendingRequestsList");if(a&&r&&e.pendingRequests)if(Object.keys(e.pendingRequests).length>0){a.style.display="block";const c=document.createElement("template");c.innerHTML=`
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">👤</div>
                        <div class="friend-details">
                            <h4 data-request-name></h4>
                            <p style="opacity: 0.7;" data-request-time></p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-primary" data-approve-btn>
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn" data-decline-btn>
                            <i class="fas fa-times"></i> Decline
                        </button>
                    </div>
                </div>
            `,r.innerHTML="",Object.entries(e.pendingRequests).forEach(([l,d])=>{const m=c.content.cloneNode(!0);m.querySelector("[data-request-name]").textContent=d.name,m.querySelector("[data-request-time]").textContent=`Requested ${new Date(d.requestedAt).toLocaleTimeString()}`,m.querySelector("[data-approve-btn]").onclick=()=>handlePartyRequest(l,!0),m.querySelector("[data-decline-btn]").onclick=()=>handlePartyRequest(l,!1),r.appendChild(m)})}else a&&(a.style.display="none");else a&&(a.style.display="none")}const Ba="modulepreload",Da=function(e,t){return new URL(e,t).href},St={},se=function(t,n,o){let a=Promise.resolve();if(n&&n.length>0){let d=function(m){return Promise.all(m.map(p=>Promise.resolve(p).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};const i=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");a=d(n.map(m=>{if(m=Da(m,o),m in St)return;St[m]=!0;const p=m.endsWith(".css"),v=p?'[rel="stylesheet"]':"";if(!!o)for(let P=i.length-1;P>=0;P--){const N=i[P];if(N.href===m&&(!p||N.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${v}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":Ba,p||(f.as="script"),f.crossOrigin="",f.href=m,l&&f.setAttribute("nonce",l),document.head.appendChild(f),p)return new Promise((P,N)=>{f.addEventListener("load",P),f.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return a.then(i=>{for(const c of i||[])c.status==="rejected"&&r(c.reason);return t().catch(r)})};async function en(){const e=document.getElementById("friendSearchInput").value.trim().toLowerCase();if(!e||e.length<3){s("❌ Please enter at least 3 characters","error");return}const t=document.getElementById("searchResults");t.innerHTML="<p>Searching...</p>";try{const n=k(),o=x(),a=b().friendsData||{},r=[],i=Object.keys(a).map(async v=>{try{const f=(await H(y(n,"users/"+v))).val();if(f&&(f.username?.toLowerCase().includes(e)||f.email?.toLowerCase().includes(e)))return{uid:v,...f,isExistingFriend:!0}}catch{console.log("Could not read friend data for:",v)}return null});let c;try{c=await H(y(n,"usernames"))}catch{console.log("Could not read usernames collection"),c={val:()=>({})}}const l=c.val()||{},d=Object.entries(l).filter(([v,h])=>h!==o.uid&&!a[h]&&v.includes(e)).map(async([v,h])=>{try{const P=(await H(y(n,"users/"+h))).val();if(P&&P.settings?.publicProfile!==!1)return{uid:h,username:v,...P,isExistingFriend:!1}}catch{return console.log("Could not read user data for:",h,"- showing basic info only"),{uid:h,username:v,email:"User",isExistingFriend:!1}}return null}),[m,p]=await Promise.all([Promise.all(i),Promise.all(d)]);if(m.forEach(v=>v&&r.push(v)),p.forEach(v=>v&&r.push(v)),r.length===0)t.innerHTML='<p style="text-align: center; opacity: 0.7;">No users found</p>';else{const v=document.createElement("template");v.innerHTML=`
                <div class="friend-item">
                    <div class="friend-info">
                        <div class="friend-avatar-small" data-avatar></div>
                        <div class="friend-details">
                            <h4 data-username></h4>
                            <p data-email></p>
                        </div>
                    </div>
                    <div class="friend-actions" data-actions>
                        <button class="btn btn-primary" data-add-btn>
                            <i class="fas fa-user-plus"></i> Add Friend
                        </button>
                    </div>
                </div>
            `,t.innerHTML="<h4>Search Results:</h4>",r.forEach(h=>{const f=v.content.cloneNode(!0);f.querySelector("[data-avatar]").textContent=(h.username||h.email||"U").charAt(0).toUpperCase(),f.querySelector("[data-username]").textContent=h.username||"User",f.querySelector("[data-email]").textContent=h.email||"Phone user";const P=f.querySelector("[data-actions]");if(h.isExistingFriend)P.innerHTML='<span style="color: #00ff88;">✓ Friends</span>';else{const N=f.querySelector("[data-add-btn]");N.onclick=()=>tn(h.uid)}t.appendChild(f)})}}catch(n){console.error("Search error:",n),t.innerHTML='<p style="color: #ff4444;">Search failed. Try again.</p>'}}async function tn(e){try{const t=k(),n=x(),o=b().userData;if(b().friendsData[e]){s("ℹ️ Already friends");return}await T(y(t,"friendRequests/"+e+"/"+n.uid),{from:o.username||n.email,timestamp:j()}),s("📤 Friend request sent!","success"),en()}catch(t){console.error("Friend request error:",t),s("❌ Failed to send request","error")}}function nn(){const e=document.getElementById("friendRequests"),t=b().friendRequests||[];if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No pending requests</p>';return}e.innerHTML=t.map(n=>`
        <div class="friend-request">
            <div>
                <strong>${n.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${_a(n.timestamp)}
                </small>
            </div>
            <div>
                <button class="btn" onclick="acceptFriendRequest('${n.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="btn btn-danger" onclick="declineFriendRequest('${n.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join("")}async function Pa(e){try{const t=await Sa();if(!t)return;const n=k(),o=x();await T(y(n,"users/"+o.uid+"/friends/"+e),{permission:t,addedAt:j()}),await T(y(n,"users/"+e+"/friends/"+o.uid),{permission:t,addedAt:j()}),await M(y(n,"friendRequests/"+o.uid+"/"+e)),s("✅ Friend added!","success")}catch(t){console.error("Accept friend error:",t),s("❌ Failed to accept request","error")}}async function Sa(){return new Promise(e=>{const t=`
            <h2>Set Friend Permissions</h2>
            <p>Choose what this friend can see:</p>
            <div style="margin: 20px 0;">
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('observer')">
                    <div>
                        <h4>👀 Observer</h4>
                        <p>Can see if you're at a party (no BAC data)</p>
                    </div>
                </div>
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('buddy')">
                    <div>
                        <h4>🤝 Buddy</h4>
                        <p>Can see your BAC and get notifications</p>
                    </div>
                </div>
                <div class="friend-item" style="cursor: pointer; margin: 10px 0;" onclick="resolvePermission('guardian')">
                    <div>
                        <h4>🛡️ Guardian</h4>
                        <p>Full access including emergency info</p>
                    </div>
                </div>
            </div>
            <button class="btn" onclick="resolvePermission(null)">Cancel</button>
        `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show"),window.resolvePermission=n=>{window.closeModal(),e(n)}})}async function Ta(e){const t=k(),n=x();await M(y(t,"friendRequests/"+n.uid+"/"+e)),s("❌ Request declined")}function at(){const e=document.getElementById("friendsList");if(!e)return;const t=b().friendsData||{};if(e.innerHTML="",Object.keys(t).length===0){e.innerHTML='<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';return}Object.entries(t).forEach(async([n,o])=>{const a=k(),i=(await H(y(a,"users/"+n))).val();if(i){const c=document.createElement("template");c.innerHTML=`
                <div class="friend-item">
                    <div class="friend-info">
                        <div class="friend-avatar-small" data-avatar></div>
                        <div class="friend-details">
                            <h4 data-username></h4>
                            <p data-email></p>
                        </div>
                    </div>
                    <div class="friend-actions">
                        <select class="permission-select" data-permission>
                            <option value="observer">Observer</option>
                            <option value="buddy">Buddy</option>
                            <option value="guardian">Guardian</option>
                        </select>
                        <button class="btn btn-danger" data-remove-btn>
                            <i class="fas fa-user-minus"></i>
                        </button>
                    </div>
                </div>
            `;const l=c.content.cloneNode(!0);l.querySelector("[data-avatar]").textContent=(i.username||i.email||"U").charAt(0).toUpperCase(),l.querySelector("[data-username]").textContent=i.username||"Friend",l.querySelector("[data-email]").textContent=i.email||"Phone user";const d=l.querySelector("[data-permission]");d.value=o.permission||"observer",d.onchange=v=>on(n,v.target.value);const m=l.querySelector("[data-remove-btn]");m.onclick=()=>an(n);const p=l.querySelector(".friend-item");e.appendChild(p)}})}async function on(e,t){try{const n=k(),o=x();await T(y(n,"users/"+o.uid+"/friends/"+e+"/permission"),t),s("✅ Permission updated","success")}catch(n){console.error("Update permission error:",n),s("❌ Failed to update permission","error")}}async function an(e){if(confirm("Remove this friend?")){const t=k(),n=x();await M(y(t,"users/"+n.uid+"/friends/"+e)),await M(y(t,"users/"+e+"/friends/"+n.uid)),s("👋 Friend removed")}}async function rn(){const e=document.getElementById("chatInput"),t=e.value.trim();if(t)try{const n=x(),o=b().userData,{isDeveloper:a}=await se(async()=>{const{isDeveloper:i}=await Promise.resolve().then(()=>ie);return{isDeveloper:i}},void 0,import.meta.url);if(!a(n.uid)){s("❌ Only developers can send messages in the main chat","error"),e.value="";return}const r=k();await Le(y(r,"chat"),{text:t,author:o.username||n.email,authorId:n.uid,timestamp:j()}),e.value=""}catch(n){console.error("Send message error:",n),s("❌ Failed to send message","error")}}function La(e){e.key==="Enter"&&rn()}async function Ma(e){try{const t=k(),n=x(),{isDeveloper:o}=await se(async()=>{const{isDeveloper:a}=await Promise.resolve().then(()=>ie);return{isDeveloper:a}},void 0,import.meta.url);if(!o(n.uid)){s("❌ Only developers can delete messages","error");return}await M(y(t,`chat/${e}`))}catch(t){console.error("Delete message error:",t),s("❌ Failed to delete message","error")}}function sn(){const e=k(),t=y(e,"chat");W(t,async n=>{const o=n.val()||{},a=document.getElementById("chatMessages");if(!a)return;const r=x(),{isDeveloper:i}=await se(async()=>{const{isDeveloper:d}=await Promise.resolve().then(()=>ie);return{isDeveloper:d}},void 0,import.meta.url),c=r?i(r.uid):!1,l=Object.entries(o).map(([d,m])=>({id:d,...m})).sort((d,m)=>(d.timestamp||0)-(m.timestamp||0));a.innerHTML=l.length===0?`<div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! 🎉</div>
            </div>`:"",l.forEach(d=>{const m=document.createElement("div");m.className="chat-message",m.innerHTML=`
                <div class="chat-author">${J(d.author||"Unknown")}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">${J(d.text||"")}</div>
                    ${c?`<button class="btn btn-danger btn-sm" onclick="deleteMessage('${d.id}')" style="margin-left: 10px; padding: 2px 8px; font-size: 0.8em;">
                            <i class="fas fa-trash"></i>
                        </button>`:""}
                </div>
            `,a.appendChild(m)}),a.scrollTop=a.scrollHeight})}function cn(){s("💧 Time for a water break! Stay hydrated!"),window.confetti&&confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}});const e=parseInt(localStorage.getItem("hydrationCount")||"0")+1;if(localStorage.setItem("hydrationCount",e),e>=12){const t=b().achievements;t.hydroHomie=!0,rt("Hydro Homie")}}function rt(e){localStorage.getItem(`achievement_${e}`)||(localStorage.setItem(`achievement_${e}`,"true"),window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}}),s(`🏆 Achievement Unlocked: ${e}!`))}function $a(e){const t=b().locationHistory,n=b().userData;if(t.push({location:e,time:Date.now(),user:n.username}),s(`📍 Checked in at ${e}!`),t.length>=10){const o=b().achievements;o.partyAnimal=!0,rt("Party Animal")}window.closeModal()}function ln(){const e=it();let t='<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';return e.forEach((n,o)=>{const a=20+o%3*30,r=20+Math.floor(o/3)*30;t+=`
            <div class="location-dot" style="left: ${a}%; top: ${r}%;" title="${n.name}: ${n.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${n.name}</span>
            </div>
        `}),t+="</div>",t}function dn(){document.querySelectorAll(".location-dot").forEach(t=>{t.addEventListener("click",function(){const n=this.getAttribute("title");s(`📍 ${n}`)})})}function it(){const e=b().partyData||{},t={};return Object.values(e).forEach(n=>{t[n.location]||(t[n.location]={count:0,totalBac:0}),t[n.location].count++,t[n.location].totalBac+=n.bac}),Object.entries(t).map(([n,o])=>({name:n,count:o.count,avgBac:o.totalBac/o.count}))}function Aa(){const e=localStorage.getItem("homeAddress");if(e){const t=encodeURIComponent(e);s("🚕 Opening Uber with your home address..."),navigator.clipboard.writeText(e).then(()=>s("📋 Home address copied to clipboard!")).catch(()=>{}),window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${t}`,"_blank")}else s("🚕 Opening Uber app..."),window.open("https://m.uber.com/ul/","_blank")}function Na(e){switch(e){case"ambulance":confirm("Call emergency services (112)?")&&(window.location.href="tel:112");break;case"campus-security":confirm("Call HSG Campus Security?")&&(window.location.href="tel:+41712242424");break;case"taxi":s("🚕 Opening taxi options..."),setTimeout(()=>{Ra()},500);break}}function Ra(){const e=localStorage.getItem("homeAddress")||"",t=`
        <h2>🚕 Ride Options</h2>
        ${e?`<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${J(e)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${J(e)}').then(() => showNotification('📋 Address copied!'))">
                <i class="fas fa-copy"></i> Copy Address
            </button>
        </div>`:""}
        <div style="margin: 20px 0;">
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="callUber()">
                <i class="fab fa-uber"></i> Uber
            </button>
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="window.location.href='tel:+41712222222'">
                <i class="fas fa-taxi"></i> Local Taxi
            </button>
            <button class="btn" style="width: 100%; margin: 10px 0;" onclick="callSoberFriend()">
                <i class="fas fa-user-friends"></i> Call Sober Friend
            </button>
        </div>
        <button class="btn" onclick="closeModal()">Cancel</button>
    `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show")}function Fa(e){localStorage.setItem("buddy",e),s(`👥 ${e} is now your buddy!`);const t=b().achievements;t.guardianAngel=!0,rt("Guardian Angel"),window.closeModal()}function qa(){window.showModal("first-aid")}async function Wa(){const e=document.getElementById("username").value.trim();if(!e||e.length<3){s("❌ Username must be at least 3 characters","error");return}try{const t=k(),n=x(),o=b().userData;if(e.toLowerCase()!==o.username?.toLowerCase()){const a=await H(y(t,"usernames/"+e.toLowerCase()));if(a.exists()&&a.val()!==n.uid){s("❌ Username already taken","error");return}o.username&&await M(y(t,"usernames/"+o.username.toLowerCase())),await T(y(t,"usernames/"+e.toLowerCase()),n.uid)}await T(y(t,"users/"+n.uid+"/username"),e),s("✅ Profile updated!","success"),o.username=e,document.getElementById("profileName").textContent=e,document.querySelectorAll(".settings-username-display").forEach(a=>a.textContent=e),document.getElementById("profileInitial").textContent=e.charAt(0).toUpperCase()}catch(t){console.error("Update profile error:",t),s("❌ Failed to update profile","error")}}async function za(){const e=prompt("Enter new password (min 6 characters):");if(e&&e.length>=6)try{await x().updatePassword(e),s("✅ Password changed successfully","success")}catch(t){console.error("Password change error:",t),t.code==="auth/requires-recent-login"?s("❌ Please sign out and sign in again before changing password","error"):s("❌ Failed to change password","error")}}async function Ha(){const e=document.getElementById("homeAddress").value,t=document.getElementById("emergencyContact").value,n=document.getElementById("medicalInfo").value,o=document.getElementById("safetyNotes").value;try{const a=k(),r=x();await T(y(a,"users/"+r.uid+"/emergency"),{homeAddress:e,emergencyContact:t,medicalInfo:n,safetyNotes:o,updatedAt:j()}),localStorage.setItem("homeAddress",e),localStorage.setItem("emergencyContact",t),localStorage.setItem("medicalInfo",n),localStorage.setItem("safetyNotes",o),s("✅ Emergency information saved","success"),un()}catch(a){console.error("Save emergency info error:",a),s("❌ Failed to save emergency info","error")}}async function Ua(){const e=document.getElementById("shareLocation").checked,t=document.getElementById("notifications").checked,n=document.getElementById("publicProfile").checked;try{const o=k(),a=x();await T(y(o,"users/"+a.uid+"/settings"),{shareLocation:e,notifications:t,publicProfile:n}),localStorage.setItem("shareLocation",e),localStorage.setItem("notifications",t),s("✅ Privacy settings saved","success"),un()}catch(o){console.error("Save privacy settings error:",o),s("❌ Failed to save settings","error")}}function un(){const e=document.createElement("div");e.className="settings-saved",e.innerHTML="✅",document.body.appendChild(e),setTimeout(()=>e.remove(),1e3)}function mn(){document.querySelectorAll(".toggle-switch").forEach(e=>{const t=e.querySelector("input");t&&t.checked?e.classList.add("active"):e.classList.remove("active")})}async function ja(){if(confirm("Delete your account? This cannot be undone!")&&confirm("Are you absolutely sure? All your data will be permanently deleted."))try{const e=k(),t=x(),n=b().userData,o=b().friendsData;if(await M(y(e,"users/"+t.uid)),n.username&&await M(y(e,"usernames/"+n.username.toLowerCase())),o)for(const a in o)await M(y(e,"users/"+a+"/friends/"+t.uid));await t.delete(),s("Account deleted. Goodbye!"),location.reload()}catch(e){console.error("Delete account error:",e),e.code==="auth/requires-recent-login"?s("❌ Please sign out and sign in again before deleting account","error"):s("❌ Failed to delete account","error")}}function Oa(){const e=x(),t=b(),n={user:{email:e?.email,username:t.userData.username},settings:t.userData.settings,emergency:t.userData.emergency,devices:t.deviceData,friends:t.friendsData,drinkHistory:t.drinkHistory,achievements:t.achievements,partyData:t.partyData},o=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),a=window.URL.createObjectURL(o),r=document.createElement("a");r.href=a,r.download=`hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(a),s("📥 Data exported successfully!","success")}async function Ga(){const e=document.getElementById("modalDeviceId").value.trim().toUpperCase();if(!e){s("❌ Please enter a Device ID","error");return}try{const t=k(),n=x(),o=b().deviceData;if(!(await H(y(t,"readings/"+e))).exists()){s("❌ Device not found. Make sure it's connected.","error");return}if(o[e]){s("ℹ️ Device already paired"),window.closeModal();return}await T(y(t,"users/"+n.uid+"/devices/"+e),{pairedAt:j(),name:"My Breathalyzer"}),s("✅ Device paired successfully!","success"),window.closeModal()}catch(t){console.error("Pairing error:",t),s("❌ Pairing failed","error")}}function _a(e){const t=Math.floor((Date.now()-e)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}function J(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Va(e){console.log("Permission resolved:",e)}async function Ya(){const e=k(),{DEVELOPER_UIDS:t}=await se(async()=>{const{DEVELOPER_UIDS:n}=await Promise.resolve().then(()=>ie);return{DEVELOPER_UIDS:n}},void 0,import.meta.url);try{const n={};for(const o of t)n[`developers/${o}`]=!0;await T(y(e,"developers"),{});for(const o of t)await T(y(e,`developers/${o}`),!0);return s("✅ Developers node created in Firebase!","success"),console.log("Developers node set up with UIDs:",t),!0}catch(n){return console.error("Error setting up developers:",n),s("❌ Failed to set up developers node","error"),!1}}async function Ka(){const e=k(),{DEVELOPER_UIDS:t}=await se(async()=>{const{DEVELOPER_UIDS:n}=await Promise.resolve().then(()=>ie);return{DEVELOPER_UIDS:n}},void 0,import.meta.url);try{let n=0;for(let o=0;o<t.length;o++){const a=t[o],r=`TEST-DEV-${a.substring(0,6)}`;await T(y(e,`readings/${r}`),{bac:.045+Math.random()*.04,timestamp:Date.now()-o*6e4,trend:["rising","steady","falling"][Math.floor(Math.random()*3)]}),await T(y(e,`users/${a}/devices/${r}`),{name:`Test Device ${o+1}`,addedAt:Date.now()}),n++}return s(`🧪 Test BAC added to ${n} developer account${n>1?"s":""}!`,"success"),console.log(`Test devices added for ${n} developers`),setTimeout(()=>{window.location.reload&&window.location.reload()},1e3),n}catch(n){console.error("Error adding test data:",n),s("❌ Failed to add test data","error")}}async function Ja(){const e=k(),{DEVELOPER_UIDS:t}=await se(async()=>{const{DEVELOPER_UIDS:n}=await Promise.resolve().then(()=>ie);return{DEVELOPER_UIDS:n}},void 0,import.meta.url);x();try{let n=0;const o=["TEST-DEV-001","TEST-DEV-002","TEST-DEVICE-001","TEST-DEVICE-002"];for(const r of t)o.push(`TEST-DEV-${r.substring(0,6)}`);for(const r of o)try{await M(y(e,`readings/${r}`)),console.log(`Removed readings for ${r}`),n++}catch{}const a=await H(y(e,"users"));if(a.exists()){const r=a.val();for(const[i,c]of Object.entries(r))if(c.devices)for(const l of Object.keys(c.devices))l.startsWith("TEST-")&&l.includes("DEV")&&(await M(y(e,`users/${i}/devices/${l}`)),console.log(`Removed ${l} from user ${i}`),n++)}return s(`🧹 Cleaned up ${n} test entries from Firebase!`,"success"),console.log(`Total test entries removed: ${n}`),setTimeout(()=>{window.location.reload&&window.location.reload()},1e3),n}catch(n){console.error("Error removing test data:",n),s("❌ Failed to remove test data","error")}}const Qa=window.Chart;let Y=null,ee="24h";async function Za(){try{const e=document.getElementById("drinkType").value,t=parseInt(document.getElementById("drinkAmount").value)||0,n=parseFloat(document.getElementById("alcoholPercent").value)||0;if(t<=0){s("❌ Please enter a valid amount","error");return}const o={id:Date.now(),type:e,amount:t,alcoholPercent:n,pureAlcohol:(t*n/100).toFixed(1),time:new Date,emoji:te[e].emoji};let a=b().drinkHistory||[];a.unshift(o),D("drinkHistory",a),We(),Fe(),we(),ke(),qe();const r=k(),i=x();if(r&&i)try{await T(y(r,"users/"+i.uid+"/drinks/"+o.id),{...o,time:o.time.toISOString()})}catch(c){console.warn("Firebase save failed (non-critical):",c)}typeof onDrinkLogged=="function"&&onDrinkLogged(e,a),window.lastDrinkTime=Date.now(),e!=="water"&&!window.hydrationTimerInterval&&typeof window.startHydrationCountdown=="function"&&window.startHydrationCountdown(),e==="water"?(typeof window.confetti=="function"&&window.confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}}),s("💧 Great job staying hydrated!","success")):s(`${o.emoji} Drink logged!`),document.getElementById("drinkAmount").value=te[e].amount,document.getElementById("alcoholPercent").value=te[e].alcohol}catch(e){console.error("Error logging drink:",e),s("❌ Failed to log drink","error")}}function Fe(){try{const e=b().drinkHistory||[],n=Date.now()-36e5,o=e.filter(p=>p.type!=="water").length,a=e.filter(p=>p.type==="water").length,r=e.reduce((p,v)=>p+parseFloat(v.pureAlcohol||0),0),i=e.filter(p=>new Date(p.time).getTime()>n&&p.type!=="water").length,c=document.getElementById("totalDrinks");c&&(c.textContent=o);const l=document.getElementById("totalWater");l&&(l.textContent=a);const d=document.getElementById("totalAlcohol");d&&(d.textContent=r.toFixed(0)+"ml");const m=document.getElementById("drinkRate");m&&(m.textContent=i+"/hr")}catch(e){console.error("Error updating drink stats:",e)}}function we(){try{const e=document.getElementById("drinkHistory");if(!e)return;let t=b().drinkHistory||[];const n=Date.now(),o=ee==="24h"?n-1440*60*1e3:n-720*60*60*1e3;if(t=t.filter(a=>new Date(a.time).getTime()>o),t.length===0){e.innerHTML=`<p style="text-align: center; opacity: 0.7;">No drinks logged in the last ${ee==="24h"?"24 hours":"30 days"}</p>`;return}e.innerHTML=t.map(a=>`
            <div class="buddy-card" style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 2em;">${a.emoji}</div>
                        <div>
                            <div style="font-weight: bold;">${a.type.charAt(0).toUpperCase()+a.type.slice(1)}</div>
                            <div style="opacity: 0.7; font-size: 0.9em;">
                                ${a.amount}ml • ${a.alcoholPercent}% • ${a.pureAlcohol}ml pure
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.9em;">${st(a.time)}</div>
                        <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${a.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join("")}catch(e){console.error("Error updating drink history:",e)}}function ke(){try{const e=document.getElementById("drinkChart"),t=b().chartVisible;if(!e||!t)return;let n=b().drinkHistory||[];const o=Date.now(),a=ee==="24h"?o-1440*60*1e3:o-720*60*60*1e3;n=n.filter(d=>new Date(d.time).getTime()>a);const r={};if(n.forEach(d=>{r[d.type]||(r[d.type]=0),r[d.type]++}),Object.keys(r).length===0){Y&&(Y.destroy(),Y=null);return}const i=Object.keys(r),c=Object.values(r),l=i.map(d=>te[d]?.emoji||"🍹");Y?(Y.data.labels=i.map((d,m)=>`${l[m]} ${d}`),Y.data.datasets[0].data=c,Y.update()):Y=new Qa(e,{type:"doughnut",data:{labels:i.map((d,m)=>`${l[m]} ${d}`),datasets:[{data:c,backgroundColor:["#00ff88","#00d4ff","#ff00ff","#ffcc00","#ff4444","#0099ff","#00ccff","#ff0088"],borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"#fff",padding:10,font:{size:window.innerWidth<768?10:12}}}}}})}catch(e){console.error("Error updating drink chart:",e)}}function qe(){const e=document.getElementById("emergencySummary");if(!e)return;const t=b().drinkHistory||[],n=t.reduce((c,l)=>c+parseFloat(l.pureAlcohol),0),o=t.length>0?((Date.now()-t[t.length-1].time)/36e5).toFixed(1):0,a={};t.forEach(c=>{a[c.type]||(a[c.type]=0),a[c.type]++});const r=localStorage.getItem("medicalInfo")||"None provided",i=localStorage.getItem("safetyNotes")||"None provided";e.innerHTML=`
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
            <p><strong>Time Period:</strong> ${o} hours</p>
            <p><strong>Total Pure Alcohol:</strong> ${n.toFixed(0)}ml</p>
            <p><strong>Drink Breakdown:</strong></p>
            <ul style="margin-left: 20px;">
                ${Object.entries(a).map(([c,l])=>`<li>${te[c].emoji} ${c}: ${l}</li>`).join("")}
            </ul>
            <p><strong>Last Drink:</strong> ${t.length>0?st(t[0].time):"None"}</p>
            <p><strong>Estimated BAC:</strong> ${yn().toFixed(3)}‰</p>
            <p><strong>Medical Info:</strong> ${J(r)}</p>
            <p><strong>Safety Notes:</strong> ${J(i)}</p>
        </div>
    `}function Xa(e){let t=b().drinkHistory||[];t=t.filter(a=>a.id!==e),D("drinkHistory",t),We(),Fe(),we(),ke(),qe();const n=Date.now(),o=t.find(a=>a.type!=="water");if(!o)window.hydrationTimerInterval&&(clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=null,window.hydrationTargetTime=null,window.lastDrinkTime=null,typeof updateUI=="function"&&updateUI());else{const a=new Date(o.time).getTime();n-a>10800*1e3?window.hydrationTimerInterval&&(clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=null,window.hydrationTargetTime=null,window.lastDrinkTime=null,typeof updateUI=="function"&&updateUI()):window.lastDrinkTime=a}s("🗑️ Drink removed")}function er(){let e=b().chartVisible;e=!e,D("chartVisible",e);const t=document.getElementById("chartWrapper"),n=document.getElementById("chartToggleText");e?(t.classList.remove("collapsed"),n.textContent="Hide Chart"):(t.classList.add("collapsed"),n.textContent="Show Chart")}function tr(){const e=document.getElementById("timeRangeText");ee==="24h"?(ee="30d",e.textContent="24h View"):(ee="24h",e.textContent="30d History"),ke(),we(),s(`📊 Showing ${ee==="24h"?"last 24 hours":"last 30 days"}`)}function nr(){try{const e=b().drinkHistory||[],t=b().userData,n=x(),o={timestamp:new Date().toISOString(),estimatedBAC:yn().toFixed(3),drinkHistory:e,totalAlcohol:e.reduce((i,c)=>i+parseFloat(c.pureAlcohol||0),0),userData:{name:t.username||n?.email||"Unknown",address:localStorage.getItem("homeAddress")||"Not provided",emergencyContact:localStorage.getItem("emergencyContact")||"Not provided",medicalInfo:localStorage.getItem("medicalInfo")||"None",safetyNotes:localStorage.getItem("safetyNotes")||"None"}},a=`EMERGENCY MEDICAL REPORT
========================
Generated: ${new Date().toLocaleString()}
Patient: ${o.userData.name}
Address: ${o.userData.address}
Emergency Contact: ${o.userData.emergencyContact}

MEDICAL INFORMATION
-------------------
${o.userData.medicalInfo}

SAFETY NOTES
------------
${o.userData.safetyNotes}

ALCOHOL CONSUMPTION SUMMARY
---------------------------
Estimated BAC: ${o.estimatedBAC}‰
Total Pure Alcohol: ${o.totalAlcohol.toFixed(0)}ml
Number of Drinks: ${e.filter(i=>i.type!=="water").length}
Water Consumed: ${e.filter(i=>i.type==="water").length} glasses

DETAILED DRINK LOG
------------------
${e.map(i=>`${st(i.time)}: ${i.emoji} ${i.type} - ${i.amount}ml @ ${i.alcoholPercent}%`).join(`
`)}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`,r=`
            <h2>🚨 Emergency Medical Report</h2>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${J(a)}</pre>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="copyEmergencyReport()">
                    <i class="fas fa-copy"></i> Copy Report
                </button>
                <button class="btn btn-primary" onclick="downloadEmergencyReport()">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-danger" onclick="shareEmergencyReport()">
                    <i class="fas fa-share"></i> Share
                </button>
                <button class="btn" onclick="closeModal()">Close</button>
            </div>
        `;window.currentEmergencyReport=a,document.getElementById("modalBody").innerHTML=r,document.getElementById("modal").classList.add("show")}catch(e){console.error("Error generating emergency report:",e),s("❌ Error generating report","error")}}function pn(){window.currentEmergencyReport&&navigator.clipboard.writeText(window.currentEmergencyReport).then(()=>s("📋 Report copied to clipboard!","success")).catch(()=>{const e=document.createElement("textarea");e.value=window.currentEmergencyReport,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),s("📋 Report copied!","success")})}function or(){try{const e=new Blob([window.currentEmergencyReport],{type:"text/plain"}),t=window.URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download=`emergency_report_${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(n),n.click(),document.body.removeChild(n),window.URL.revokeObjectURL(t),s("📥 Report downloaded!","success")}catch(e){console.error("Download error:",e),s("❌ Download failed - use copy instead","error")}}function ar(){navigator.share&&window.currentEmergencyReport?navigator.share({title:"Emergency Medical Report",text:window.currentEmergencyReport}).then(()=>s("📤 Report shared!","success")).catch(()=>s("❌ Sharing cancelled")):(pn(),s("📋 Report copied - share manually"))}function rr(){if(confirm("Clear all drink history? This cannot be undone!")){D("drinkHistory",[]),We(),Fe(),we(),ke(),qe();const e=k(),t=x();e&&t&&M(y(e,"users/"+t.uid+"/drinks")),s("🗑️ Drink history cleared")}}function We(){const e=b().drinkHistory||[];localStorage.setItem("drinkHistory",JSON.stringify(e))}function ir(){const e=localStorage.getItem("drinkHistory");if(e)try{const t=JSON.parse(e);if(t.forEach(n=>{n.time=new Date(n.time)}),D("drinkHistory",t),t.length>0){const n=t.find(o=>o.type!=="water");if(n){const o=new Date(n.time).getTime(),a=Date.now();if(a-o<10800*1e3){window.lastDrinkTime=o;const r=a-10800*1e3,c=t.filter(l=>l.type!=="water"&&new Date(l.time).getTime()>r).pop();if(c){const l=new Date(c.time).getTime(),d=a-l,m=1800*1e3,p=d%m,v=a+(m-p);if(window.hydrationTargetTime=v,typeof window.startHydrationCountdown=="function"){const h=v;window.startHydrationCountdown(),window.hydrationTargetTime=h}}}}}}catch(t){console.error("Failed to load drink history:",t)}}function st(e){const t=new Date,n=new Date(e),o=Math.floor((t-n)/6e4);return o<1?"Just now":o<60?`${o}m ago`:o<1440?`${Math.floor(o/60)}h ago`:n.toLocaleDateString()}function yn(){const n=b().drinkHistory||[],o=n.reduce((c,l)=>c+parseFloat(l.pureAlcohol),0),a=n.length>0?(Date.now()-n[n.length-1].time)/36e5:0,r=o*.789;return Math.max(0,r/(70*1e3*.68)*100-.015*a)}const $=window.confetti;let E=[],_=0;const u={flipTimer:null,flipTime:0,bestFlipTime:null,triviaScore:0,currentTriviaIndex:0,tournament:{teams:[],bracket:[],currentRound:0,totalTeams:0,rounds:[]},beerPong:{currentMode:"normal",team1Name:"Team 1",team2Name:"Team 2",specialCups:{team1:[],team2:[]}},selectedCategory:"classic"};function V(e){_=e}function ce(){for(let e=E.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[E[e],E[t]]=[E[t],E[e]]}G()}function sr(e){return{"never-have-i-ever":"Never Have I Ever","truth-or-dare":"Truth or Dare","kings-cup":"King's Cup","beer-pong":"Beer Pong","flip-cup":"Flip Cup",trivia:"Trivia","would-you-rather":"Would You Rather","most-likely-to":"Most Likely To","spin-the-bottle":"Spin the Bottle"}[e]||"Party Game"}function Tt(e){const t=Math.floor(e/100),n=e%100,o=Math.floor(t/60),a=t%60;return`${o}:${a.toString().padStart(2,"0")}.${n.toString().padStart(2,"0")}`}function cr(e){D("currentGame",e);const t=document.createElement("div");t.className="game-overlay",t.id="gameOverlay";let n="";const o=window.gameModules[e];o&&o.createGame&&(n=o.createGame()),t.innerHTML=`
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${sr(e)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${n}
        </div>
    `,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),10),o&&o.initialize&&o.initialize(),$&&$({particleCount:100,spread:70,origin:{y:.6}})}function ze(){const e=document.getElementById("gameOverlay");e&&(e.classList.remove("show"),setTimeout(()=>e.remove(),500)),D("currentGame",null)}function gn(){const e=document.getElementById("playerNameInput"),t=e.value.trim();if(!t){s("Please enter a player name!","error");return}if(E.includes(t)){s("Player already added!","error");return}E.push(t),e.value="",G(),E.length>=2&&(document.getElementById("startGameBtn").style.display="block"),s(`${t} added!`,"success")}function fn(e){const t=E[e];E.splice(e,1),G(),E.length<2&&(document.getElementById("startGameBtn").style.display="none"),s(`${t} removed!`,"info")}function G(){const e=document.getElementById("playersList");e&&(e.innerHTML=E.map((t,n)=>`
        <div class="player-item">
            <span>${t}</span>
            <button class="btn btn-sm btn-danger" onclick="removePlayer(${n})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join(""))}function hn(){document.getElementById("gamePlay").style.display="none",document.getElementById("playerSetup").style.display="block",_=0}function vn(){const e=document.getElementById("currentPlayer");e&&E.length>0&&(e.textContent=E[_])}function bn(e,t){u.selectedCategory=e;const n=document.getElementById("categorySelection");n&&(n.style.display="none");const o=document.getElementById("playerSetup"),a=document.getElementById("gamePlay");(t==="neverHaveIEver"||t==="truthOrDare"||t==="wouldYouRather"||t==="mostLikelyTo"||t==="spinBottle")&&o?(o.style.display="block",G(),E.length>=2&&(document.getElementById("startGameBtn").style.display="block")):a&&(a.style.display="block",le())}function wn(e){document.getElementById("gamePlay").style.display="none",document.getElementById("categorySelection").style.display="block"}function le(){const e=document.getElementById("categoryBadge");if(e){const t={classic:"Classic",gettingStarted:"Getting Started",normal:"Normal",spicy:"Spicy 🔥",couples:"Couples 💕"};e.textContent=t[u.selectedCategory]||"Classic",e.style.background={classic:"linear-gradient(45deg, #00ff88, #00d4ff)",gettingStarted:"linear-gradient(45deg, #4CAF50, #8BC34A)",normal:"linear-gradient(45deg, #2196F3, #03A9F4)",spicy:"linear-gradient(45deg, #ff0088, #ff4444)",couples:"linear-gradient(45deg, #E91E63, #FF4081)"}[u.selectedCategory]||"linear-gradient(45deg, #00ff88, #00d4ff)"}}window.gameModules=window.gameModules||{};window.addPlayer=gn;window.removePlayer=fn;window.selectGameCategory=bn;window.changeCategoryMidGame=wn;window.resetToPlayerSetup=hn;window.closeGame=ze;const S={beerPongRules:{standard:{title:"📜 Standard Beer Pong Rules",description:"The official way to play Beer Pong",rules:[{name:"🔄 Balls Back",desc:"Both partners make cups = shoot again! No re-racks during bonus shots."},{name:"🔙 Behind-the-Back",desc:"Miss and grab the ball while it's on the table? Shoot behind your back for a bonus cup!"},{name:"⚡ Bouncing",desc:"Bounce shots count as 2 cups! But opponents can swat bounced shots away."},{name:"💪 Elbows",desc:"Keep those elbows behind the table edge when shooting. Breaking the plane = reshoot!"},{name:"👀 Eye-to-Eye",desc:"To decide who goes first, one player from each team shoots while making eye contact. First to make it wins!"},{name:"🔥 Fire",desc:"Make 2 in a row? Call 'heating up'. Make the 3rd? Call 'fire' and keep shooting until you miss!"},{name:"🏝️ Island",desc:"Once per game, call 'island' on an isolated cup. Make it = remove 2 cups!"},{name:"⏰ Overtime",desc:"Tied game? Each team sets up 3 cups in a triangle. No re-racks allowed!"},{name:"🙏 Redemption",desc:"Lost all cups? Keep shooting until you miss! Make them all = overtime!"},{name:"♻️ Re-racks",desc:"2 re-racks per game. Diamond, line, triangle - get creative!"},{name:"🧹 Tidying-up",desc:"Tighten those cups anytime! Keep the formation clean."}]},creator:{title:"🎯 Creator's Beer Pong Rules",description:"The way Beer Pong was meant to be played! 🍺",rules:[{name:"👀 Eye-to-Eye",desc:"Same as standard - stare into their soul while shooting to go first!"},{name:"♻️ Re-racks",desc:"2 per game - get creative with those formations!"},{name:"🎩 Gentleman",desc:"Call 'Gentleman' to tidy cups OR force opponent to line up their last 2 cups!"},{name:"🔄 Balls Back",desc:"Both make it = balls back baby! Keep that momentum going!"},{name:"⚡ Bouncing",desc:"Bounce = 2 cups removed! High risk, high reward!"},{name:"💪 Elbows",desc:"Watch those elbows - we're not playing reach pong!"},{name:"🏝️ Island",desc:"Isolated cup = 2 cups removed when made. Call it out!"},{name:"🎪 Trickshot",desc:"Ball on table after miss? Any creative shot = 2 cups! Behind back is for beginners!"},{name:"💥 Double Trouble",desc:"Same cup hit twice? That cup + ALL touching cups are gone! Legendary move!"},{name:"🎮 Redemption 2.0",desc:"Lost all cups? Make one to stay alive - but nothing gets removed! It's sudden death mode!"}]}},specialBeerPongRules:{classic:["🎯 Make a rule! Everyone must follow it for the rest of the game","🔄 Switch sides! Both teams swap positions","💃 Dance before shooting! Do a 10-second dance before each shot","🎵 Sing while shooting! Must sing during your entire turn","🎭 Accent round! Speak in an accent for 5 minutes","🤐 Silent round! No talking for 2 rounds","👯 Mirror mode! Copy everything your opponent does","🎯 Call your shot! Must call which cup you're aiming for","⏰ Speed round! 5-second shot clock for next 3 shots","🤡 Compliment battle! Compliment opponents before each shot"],gettingStarted:["🎯 Nice shot bonus! Make a cup = opponent drinks water","🤝 Team spirit! High five after every shot","🎵 Theme song! Pick a song to play during your turn","📣 Announce your shots! Describe your technique before shooting","🎪 Celebration dance! Do a victory dance after making a cup","👏 Applause rule! Everyone claps after a made cup","🎯 Practice shot! Get one practice shot per turn","🤗 Encouragement only! Only positive comments allowed","🎯 Second chance! Miss = get one retry per game","🏆 MVP! Best shot of the round gets to make a rule"],normal:["👁️ Blindfold shot! Next shot must be taken blindfolded","🤝 Partner shot! Both teammates must hold the ball together","🎪 Trick shot only! Next 3 shots must be trick shots","🚫 No elbows! Next round, elbows must stay at your sides","🦩 Flamingo stance! Stand on one leg for your next shot","🔄 Opposite hand! Use your non-dominant hand for 2 turns","🎪 Spin before shooting! Do 3 spins before taking your shot","💪 Push-up penalty! Do 5 push-ups if you miss","🎯 Behind the back only! All shots must be behind the back","🤸 Gymnastics shot! Do a cartwheel before shooting"],spicy:["👕 Strip pong! Remove clothing item when opponent makes cup","💋 Kiss for miss! Miss = kiss your teammate","🍑 Distraction allowed! Opponents can distract however they want","📱 Phone roulette! Text your ex 'I miss you'","🔥 Hot seat! Answer any question or take 2 shots","💃 Sexy dance! Do a lap dance if you miss","🎯 Body shots! Made cup = body shot off opponent","👅 Lick it! Lick the ball before shooting","🔥 Truth shot! Make cup = opponent answers truth question","💋 Make out break! Teams make out for 30 seconds"],couples:["💑 Couple shots! Partners must be touching while shooting","💋 Kiss for cups! Make a cup = kiss your partner","🤝 Trust shot! Partner guides your blindfolded shot","💕 Compliment rule! Compliment partner before each shot","🎯 Love wins! Make 2 in a row = opponents kiss","👫 Switch partners! Play with opponent's partner for 1 round","💑 Couple's choice! Make cup = give opponents a couple dare","❤️ Heart eyes! Maintain eye contact with partner while shooting","💋 Victory kiss! Kiss for 10 seconds after making a cup","🤗 Support system! Hug partner after every shot"]},specialBeerPongDares:{classic:["Take a shot chosen by opponents","Do 20 jumping jacks","Sing the alphabet backwards","Do your best impression of someone in the room","Tell your most embarrassing story","Do the chicken dance for 1 minute","Speak in rhymes for the next 5 minutes","Call a random contact and say 'I love you'","Do 10 push-ups","Let opponents choose your next drink"],gettingStarted:["Give someone a high five","Tell a joke","Do your best dance move","Sing your favorite song chorus","Give someone a compliment","Do 5 jumping jacks","Share a fun fact about yourself","Do your best animal impression","Tell us your hidden talent","Make everyone laugh"],normal:["Let opponents post something on your social media","Do 20 burpees right now","Let everyone go through your phone for 30 seconds","Show your last 5 Google searches","Let opponents give you a nickname for the night","Swap an item of clothing with an opponent","Let opponents draw on your face with marker","Chug a mystery drink made by opponents","Let everyone read your last text conversation","Freestyle rap for 30 seconds"],spicy:["Call your crush and tell them you're thinking of them","Send a nude to your ex (or pretend to)","Reveal your body count","Let opponents go through your dating apps","Do a strip tease for 30 seconds","Make out with someone chosen by opponents","Send a dirty text to someone","Reveal your biggest kink","Take a body shot off someone","Flash everyone for 3 seconds"],couples:["Kiss your partner for 30 seconds","Give your partner a lap dance","Reveal your partner's most annoying habit","Let your partner post on your social media","Switch clothes with your partner","Tell everyone your partner's biggest fear","Massage your partner for 1 minute","Share your wildest experience together","Feed your partner a shot","Whisper your fantasy to your partner"]},neverHaveIEver:{classic:["Never have I ever been kicked out of a bar or club","Never have I ever lied about my age to get into a club","Never have I ever karaoke'd while drunk","Never have I ever lost my phone on a night out","Never have I ever thrown up in public","Never have I ever called in sick when I wasn't","Never have I ever fallen asleep at work/in class","Never have I ever gotten a tattoo I regret","Never have I ever crashed a wedding or private party","Never have I ever danced on a table or bar"],gettingStarted:["Never have I ever traveled to another continent","Never have I ever gone skydiving","Never have I ever been on TV","Never have I ever met a celebrity","Never have I ever won a competition","Never have I ever been in a helicopter","Never have I ever gone surfing","Never have I ever stayed up for 24 hours straight","Never have I ever eaten something I couldn't identify","Never have I ever gotten lost in a foreign country"],normal:["Never have I ever ghosted someone","Never have I ever sent a risky text to the wrong person","Never have I ever walked into a glass door","Never have I ever farted loudly in a quiet room","Never have I ever tripped and fallen in front of a crowd","Never have I ever accidentally sent a screenshot to the person I was talking about","Never have I ever lied on my resume","Never have I ever eaten food off the floor","Never have I ever gone 3+ days without showering","Never have I ever broken something and blamed someone else"],spicy:["Never have I ever kissed someone I just met","Never have I ever had a one night stand","Never have I ever skinny dipped","Never have I ever done a body shot","Never have I ever slept with a coworker","Never have I ever hooked up with a professor/boss","Never have I ever been in a hot tub with strangers","Never have I ever woken up wearing someone else's clothes","Never have I ever dated two people at once","Never have I ever kissed someone to make someone else jealous"],couples:["Never have I ever been in love with my best friend","Never have I ever broken up with someone over text","Never have I ever stalked an ex on social media","Never have I ever been in love with two people at once","Never have I ever cheated or been cheated on","Never have I ever had a crush on my partner's friend","Never have I ever lied to my partner about where I was","Never have I ever kept a secret from my partner","Never have I ever dreamt about someone else while in a relationship","Never have I ever compared my partner to an ex"]},truths:{classic:["What's your most embarrassing drunk story?","What's the biggest lie you've ever told?","What's the most trouble you've gotten into?","Have you ever been caught doing something you shouldn't?","What's your worst habit that no one knows about?","Who in this room has the best style?","Who here would you want to switch lives with?","What's the most embarrassing thing on your phone right now?","What's the craziest thing you've done for money?","What's your most embarrassing moment?"],gettingStarted:["What's your dream vacation destination?","What's your biggest fear?","What's your hidden talent?","What's the best compliment you've ever received?","What's your favorite childhood memory?","If you could have dinner with anyone, who would it be?","What's your biggest pet peeve?","What's the best advice you've ever received?","What's your guilty pleasure TV show?","What's something you've never told anyone?"],normal:["What's the weirdest thing you do when you're alone?","What's your most embarrassing Google search?","Who here do you think has the biggest secret?","What's the last lie you told?","What's your most irrational fear?","What's the most childish thing you still do?","What's your worst dating app experience?","What's the most embarrassing thing your parents have caught you doing?","What's your biggest insecurity?","What's the meanest thing you've ever said to someone?"],spicy:["What's your biggest turn on?","Who was your worst kiss and why?","Who in this room would you most want to make out with?","What's the wildest place you've hooked up?","What's your wildest fantasy?","What's the most illegal thing you've done?","If you had to date someone here, who would it be?","What's your body count?","What's the kinkiest thing you've ever done?","Who in this room do you think is the best looking?"],couples:["What's the most embarrassing thing you've done for love?","Have you ever been in love with two people at once?","Have you ever cheated or been cheated on?","What's your biggest relationship regret?","What's the longest you've gone without sex in a relationship?","What's something your partner does that annoys you?","Have you ever faked an orgasm?","What's your partner's most annoying habit?","What's something you've lied to your partner about?","If you could change one thing about your partner, what would it be?"]},dares:{classic:["Do 10 pushups","Plank for 1 minute","Sing everything you say for the next 2 turns","Speak in an accent for the next 3 rounds","Act like a chicken for 1 minute","Do your best impression of someone in the room","Take a shot without using your hands","Finish your drink","Do 20 jumping jacks","Tell a joke and make someone laugh"],gettingStarted:["Show your best dance move","Sing the chorus of your favorite song","Do your best celebrity impression","Tell your most embarrassing story","Show the last photo in your camera roll","Do 5 pushups","Speak in a British accent for 2 turns","Make animal noises for 30 seconds","Do the robot dance","High five everyone in the room"],normal:["Let someone draw on your face with marker","Let someone style your hair however they want","Post an ugly selfie","Let someone text anyone from your phone","Eat a spoonful of hot sauce","Let the group choose someone for you to call and sing to","Make a gross drink combination and take a sip","Waterfall for 5 seconds","Let someone go through your phone for 30 seconds","Do the worm"],spicy:["Do your best twerk for 30 seconds","Give someone a lap dance for 10 seconds","Kiss the person to your left on the cheek","Give someone a 30 second massage","Switch an item of clothing with someone","Whisper something dirty to the person on your right","Post 'I'm pregnant' on your story for 1 minute","Like your crush's oldest Instagram photo","Send the last photo in your gallery to your ex","Take a body shot off someone"],couples:["Give your partner a 1 minute massage","Recreate your first kiss with your partner","Let your partner post something on your social media","Switch clothes with your partner for the rest of the game","Slow dance with your partner for 1 minute","Tell everyone your partner's most annoying habit","Let your partner draw on your face","Feed your partner a shot","Sit on your partner's lap for the next 3 rounds","Whisper your wildest fantasy to your partner"]},wouldYouRather:{classic:["Would you rather have to sing everything you say or dance everywhere you walk?","Would you rather be the funniest person in the room or the smartest?","Would you rather never be able to drink alcohol again or never be able to eat chocolate again?","Would you rather have a rewind button or a pause button for your life?","Would you rather go to a party where you know everyone or where you know no one?","Would you rather always smell like garlic or always smell like wet dog?","Would you rather be able to fly or be invisible?","Would you rather be rich or famous?","Would you rather lose your phone or your wallet?","Would you rather always be 10 minutes late or 20 minutes early?"],gettingStarted:["Would you rather have unlimited money or unlimited time?","Would you rather live in the city or the countryside?","Would you rather be able to read minds or see the future?","Would you rather travel to the past or the future?","Would you rather have a pet dragon or a pet unicorn?","Would you rather be a superhero or a supervillain?","Would you rather never use social media again or never watch TV again?","Would you rather always tell the truth or always lie?","Would you rather have super strength or super speed?","Would you rather live without music or without movies?"],normal:["Would you rather have fingers as long as legs or legs as short as fingers?","Would you rather drunk text your ex or your boss?","Would you rather throw up in front of your crush or pee yourself at a party?","Would you rather be able to fly but only 1 foot off the ground or be invisible but only when no one is looking?","Would you rather eat a live spider or a dead worm?","Would you rather swim in a pool of beer or a pool of wine?","Would you rather burp glitter or fart confetti?","Would you rather have a third arm or a third leg?","Would you rather always speak in rhymes or sing everything you say?","Would you rather have taste buds in your butt or poop through your mouth?"],spicy:["Would you rather date someone who's extremely hot but boring or average looking but hilarious?","Would you rather have sex with the lights on always or off always?","Would you rather be naked in public or have everyone read your texts?","Would you rather give up sex or give up food?","Would you rather have a threesome or be in an open relationship?","Would you rather sleep with your boss or your best friend's partner?","Would you rather be dominant or submissive?","Would you rather have great sex once a month or mediocre sex every day?","Would you rather be caught masturbating or catch your parents doing it?","Would you rather send nudes to your ex or your boss?"],couples:["Would you rather have your partner be best friends with their ex or hate their ex?","Would you rather catch your parents having sex or have them catch you?","Would you rather be in a relationship with someone who's too clingy or too distant?","Would you rather know when you're going to die or how you're going to die?","Would you rather have your partner forget your birthday or your anniversary?","Would you rather have a partner who's too jealous or not jealous at all?","Would you rather argue every day for a week or not talk for a week?","Would you rather have your partner be a bad kisser or bad in bed?","Would you rather live with your partner's parents or have them live with you?","Would you rather have your partner cheat emotionally or physically?"]},mostLikelyTo:{classic:["Who's most likely to get kicked out of a club?","Who's most likely to throw up tonight?","Who's most likely to become famous?","Who's most likely to become a millionaire?","Who's most likely to forget their own birthday?","Who's most likely to get lost in their own city?","Who's most likely to cry during a Disney movie?","Who's most likely to eat food off the floor?","Who's most likely to laugh at their own jokes?","Who's most likely to lose their phone tonight?"],gettingStarted:["Who's most likely to win a Nobel Prize?","Who's most likely to travel the world?","Who's most likely to write a book?","Who's most likely to start their own business?","Who's most likely to become a teacher?","Who's most likely to adopt a pet?","Who's most likely to learn a new language?","Who's most likely to run a marathon?","Who's most likely to become vegetarian?","Who's most likely to move to another country?"],normal:["Who's most likely to drunk text their ex?","Who's most likely to end up sleeping on the bathroom floor?","Who's most likely to go to jail?","Who's most likely to die first in a zombie apocalypse?","Who's most likely to have 10 kids?","Who's most likely to get a weird tattoo?","Who's most likely to join a cult?","Who's most likely to become a crazy cat person?","Who's most likely to marry for money?","Who's most likely to fake their own death?"],spicy:["Who's most likely to have a one night stand?","Who's most likely to have a secret crush on someone here?","Who's most likely to sleep with their boss?","Who's most likely to have a threesome?","Who's most likely to send nudes?","Who's most likely to have sex in public?","Who's most likely to date two people at once?","Who's most likely to have a sugar daddy/mommy?","Who's most likely to do porn?","Who's most likely to have the highest body count?"],couples:["Who's most likely to get married first?","Who's most likely to cheat on their partner?","Who's most likely to fall in love with their best friend?","Who's most likely to have kids first?","Who's most likely to forget their anniversary?","Who's most likely to get divorced?","Who's most likely to propose in public?","Who's most likely to have a destination wedding?","Who's most likely to elope?","Who's most likely to stay single forever?"]},spinBottleTasks:{classic:["Give a compliment","Share your most embarrassing moment","Do your best impression of someone here","Sing a song for 30 seconds","Tell them something you like about them","Do a silly dance together","Take a selfie together","Give them a high five","Tell a joke","Share a secret"],gettingStarted:["Give them a hug","Say something nice about them","Show them your best dance move","Teach them your secret handshake","Play rock paper scissors","Thumb wrestle","Staring contest for 30 seconds","Tell them your favorite thing about the party","Share your worst pickup line","Do 5 jumping jacks together"],normal:["Let them post something on your social media","Give a 30 second massage","Whisper something in their ear","Do a trust fall","Sit on their lap for the next round","Feed them a snack","Let them style your hair","Arm wrestle","Let them draw on your hand","Share an embarrassing photo from your phone"],spicy:["Kiss on the cheek","Give a lap dance for 10 seconds","Switch an item of clothing","Take a body shot","Play with their hair for 1 minute","Whisper your dirtiest thought","Lick their ear","Give them a hickey","Make out for 10 seconds","Remove an item of clothing"],couples:["Kiss for 30 seconds","Give your partner a 1 minute massage","Whisper what you want to do later","Share your favorite memory together","Recreate your first kiss","Slow dance for 1 minute","Feed each other a shot","Tell them what you love most about them","Give them a lap dance","Make out until the next turn"]},trivia:[{question:"When was HSG founded?",options:["1898","1923","1945","1967"],correct:0},{question:"What does HSG stand for?",options:["High School Gymnasium","Hochschule St. Gallen","Higher Studies Group","Helvetic Study Group"],correct:1},{question:"How many students attend HSG?",options:["5,000","9,000","12,000","15,000"],correct:1},{question:"What's the most popular major at HSG?",options:["Law","Business Administration","Computer Science","International Affairs"],correct:1}],triviaCategories:{sports:[{question:"Which country has won the most FIFA World Cups?",options:["Germany","Brazil","Argentina","Italy"],correct:1},{question:"How many players are on a basketball court at one time?",options:["8","10","12","14"],correct:1},{question:"In which year were the first modern Olympics held?",options:["1896","1900","1904","1912"],correct:0},{question:"What is the maximum score in 10-pin bowling?",options:["200","250","300","350"],correct:2},{question:"Which tennis player has won the most Grand Slam titles?",options:["Roger Federer","Rafael Nadal","Novak Djokovic","Pete Sampras"],correct:2},{question:"How long is a marathon?",options:["40.2 km","41.2 km","42.2 km","43.2 km"],correct:2},{question:"Which sport is known as 'The Beautiful Game'?",options:["Basketball","Football/Soccer","Tennis","Golf"],correct:1},{question:"How many rings are on the Olympic flag?",options:["4","5","6","7"],correct:1},{question:"In golf, what is an eagle?",options:["1 under par","2 under par","3 under par","Par"],correct:1},{question:"Which country invented ice hockey?",options:["USA","Russia","Canada","Sweden"],correct:2}],history:[{question:"In which year did World War II end?",options:["1943","1944","1945","1946"],correct:2},{question:"Who was the first President of the United States?",options:["Thomas Jefferson","George Washington","John Adams","Benjamin Franklin"],correct:1},{question:"The ancient city of Rome was built on how many hills?",options:["5","6","7","8"],correct:2},{question:"In which year did the Berlin Wall fall?",options:["1987","1988","1989","1990"],correct:2},{question:"Who painted the Mona Lisa?",options:["Michelangelo","Leonardo da Vinci","Raphael","Donatello"],correct:1},{question:"Which empire built Machu Picchu?",options:["Aztec","Maya","Inca","Olmec"],correct:2},{question:"In which year did Christopher Columbus reach the Americas?",options:["1490","1491","1492","1493"],correct:2},{question:"Who was known as the 'Iron Lady'?",options:["Queen Elizabeth II","Margaret Thatcher","Angela Merkel","Golda Meir"],correct:1},{question:"The French Revolution began in which year?",options:["1787","1788","1789","1790"],correct:2},{question:"Which ancient wonder of the world still stands today?",options:["Colossus of Rhodes","Great Pyramid of Giza","Hanging Gardens","Lighthouse of Alexandria"],correct:1}],science:[{question:"What is the chemical symbol for gold?",options:["Go","Gd","Au","Ag"],correct:2},{question:"How many bones are in an adult human body?",options:["196","206","216","226"],correct:1},{question:"What is the speed of light in vacuum?",options:["299,792 km/s","199,792 km/s","399,792 km/s","499,792 km/s"],correct:0},{question:"What is the largest planet in our solar system?",options:["Saturn","Jupiter","Uranus","Neptune"],correct:1},{question:"What is the powerhouse of the cell?",options:["Nucleus","Ribosome","Mitochondria","Chloroplast"],correct:2},{question:"What is the most abundant gas in Earth's atmosphere?",options:["Oxygen","Carbon Dioxide","Nitrogen","Argon"],correct:2},{question:"How many chambers does a human heart have?",options:["2","3","4","5"],correct:2},{question:"What is the study of earthquakes called?",options:["Geology","Seismology","Volcanology","Meteorology"],correct:1},{question:"What is the smallest unit of matter?",options:["Molecule","Atom","Electron","Quark"],correct:3},{question:"At what temperature does water boil at sea level?",options:["90°C","100°C","110°C","120°C"],correct:1}],flags:[{question:"ca",flagCode:"ca",options:["USA","Canada","Norway","Denmark"],correct:1},{question:"gb",flagCode:"gb",options:["Australia","New Zealand","United Kingdom","Ireland"],correct:2},{question:"in",flagCode:"in",options:["Pakistan","India","Bangladesh","Sri Lanka"],correct:1},{question:"us",flagCode:"us",options:["Malaysia","Liberia","United States","Puerto Rico"],correct:2},{question:"vn",flagCode:"vn",options:["China","Vietnam","Morocco","Turkey"],correct:1},{question:"jp",flagCode:"jp",options:["South Korea","Japan","Bangladesh","Palau"],correct:1},{question:"ch",flagCode:"ch",options:["Denmark","Switzerland","Austria","Poland"],correct:1},{question:"br",flagCode:"br",options:["Argentina","Brazil","Colombia","Venezuela"],correct:1},{question:"de",flagCode:"de",options:["Belgium","Germany","Netherlands","Luxembourg"],correct:1},{question:"fr",flagCode:"fr",options:["Italy","France","Netherlands","Russia"],correct:1},{question:"it",flagCode:"it",options:["Mexico","Hungary","Italy","Iran"],correct:2},{question:"es",flagCode:"es",options:["Portugal","Spain","Colombia","Venezuela"],correct:1},{question:"mx",flagCode:"mx",options:["Italy","Mexico","Hungary","Iran"],correct:1},{question:"au",flagCode:"au",options:["New Zealand","United Kingdom","Australia","Fiji"],correct:2},{question:"kr",flagCode:"kr",options:["North Korea","South Korea","Japan","China"],correct:1},{question:"se",flagCode:"se",options:["Norway","Finland","Sweden","Denmark"],correct:2},{question:"no",flagCode:"no",options:["Sweden","Norway","Denmark","Iceland"],correct:1},{question:"dk",flagCode:"dk",options:["Norway","Sweden","Denmark","Finland"],correct:2},{question:"fi",flagCode:"fi",options:["Sweden","Norway","Denmark","Finland"],correct:3},{question:"nl",flagCode:"nl",options:["Luxembourg","Netherlands","France","Belgium"],correct:1},{question:"be",flagCode:"be",options:["Germany","Netherlands","Belgium","Luxembourg"],correct:2},{question:"pt",flagCode:"pt",options:["Spain","Portugal","Italy","Brazil"],correct:1},{question:"gr",flagCode:"gr",options:["Uruguay","Greece","Israel","Finland"],correct:1},{question:"pl",flagCode:"pl",options:["Monaco","Indonesia","Poland","Singapore"],correct:2},{question:"at",flagCode:"at",options:["Latvia","Austria","Poland","Indonesia"],correct:1},{question:"ie",flagCode:"ie",options:["Italy","Ireland","Ivory Coast","India"],correct:1},{question:"cz",flagCode:"cz",options:["Slovakia","Slovenia","Czech Republic","Croatia"],correct:2},{question:"ar",flagCode:"ar",options:["Uruguay","Argentina","Honduras","Guatemala"],correct:1},{question:"cl",flagCode:"cl",options:["Texas","Chile","Cuba","Puerto Rico"],correct:1},{question:"co",flagCode:"co",options:["Venezuela","Ecuador","Colombia","Bolivia"],correct:2},{question:"pe",flagCode:"pe",options:["Canada","Austria","Peru","Lebanon"],correct:2},{question:"za",flagCode:"za",options:["South Africa","Central African Republic","Sudan","Namibia"],correct:0},{question:"eg",flagCode:"eg",options:["Syria","Yemen","Egypt","Iraq"],correct:2},{question:"ma",flagCode:"ma",options:["Turkey","Tunisia","Morocco","Vietnam"],correct:2},{question:"ng",flagCode:"ng",options:["Nigeria","Niger","Cameroon","Chad"],correct:0},{question:"ke",flagCode:"ke",options:["Uganda","Kenya","Tanzania","Ethiopia"],correct:1},{question:"nz",flagCode:"nz",options:["Australia","New Zealand","Fiji","United Kingdom"],correct:1},{question:"th",flagCode:"th",options:["Costa Rica","Thailand","Netherlands","Paraguay"],correct:1},{question:"sg",flagCode:"sg",options:["Indonesia","Poland","Singapore","Monaco"],correct:2},{question:"my",flagCode:"my",options:["Malaysia","United States","Liberia","Uruguay"],correct:0}],economy:[{question:"What does GDP stand for?",options:["General Domestic Product","Gross Domestic Product","Grand Domestic Price","Gross Domestic Price"],correct:1},{question:"What is inflation?",options:["Decrease in prices","Increase in supply","General increase in prices","Increase in demand only"],correct:2},{question:"Who wrote 'The Wealth of Nations'?",options:["Karl Marx","John Keynes","Adam Smith","Milton Friedman"],correct:2},{question:"What is the study of economics on a large scale called?",options:["Microeconomics","Macroeconomics","Econometrics","Finance"],correct:1},{question:"In economics, what does the term 'opportunity cost' mean?",options:["The cost of an opportunity","The next best alternative foregone","The total cost of production","The profit margin"],correct:1},{question:"What is a bull market?",options:["Falling prices","Rising prices","Stable prices","Volatile prices"],correct:1},{question:"Which organization sets monetary policy in the US?",options:["Treasury","Congress","Federal Reserve","World Bank"],correct:2},{question:"What does IPO stand for?",options:["International Purchase Order","Initial Public Offering","Internal Price Order","Investment Portfolio Option"],correct:1},{question:"What is the invisible hand theory associated with?",options:["Communism","Free market","Socialism","Mercantilism"],correct:1},{question:"What is a recession typically defined as?",options:["1 quarter negative growth","2 quarters negative growth","3 quarters negative growth","4 quarters negative growth"],correct:1}]}};function lr(){return`
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-flex; background: rgba(255,255,255,0.1); border-radius: 30px; padding: 5px;">
                <button class="btn" id="standardRulesBtn" onclick="showBeerPongRules('standard')" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    📜 Standard Rules
                </button>
                <button class="btn" id="creatorRulesBtn" onclick="showBeerPongRules('creator')" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🎯 Creator's Rules
                </button>
                <button class="btn btn-primary" id="playGameBtn" onclick="showBeerPongGame()" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🏓 Play Game
                </button>
                <button class="btn" id="tournamentBtn" onclick="showBeerPongTournament()" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🏆 Tournament
                </button>
            </div>
        </div>
        
        <div id="beerPongRules" style="display: none; max-height: 400px; overflow-y: auto; padding: 20px; 
            background: rgba(0,0,0,0.3); border-radius: 15px; margin-bottom: 20px;">
        </div>
        
        <div id="beerPongGame" style="display: block;">
            <div id="gameModeSelection" style="display: block;">
                <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Game Mode</h3>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="startNormalBeerPong()" 
                        style="padding: 20px 30px; font-size: 1.1em;">
                        <i class="fas fa-beer"></i> Normal Beer Pong
                    </button>
                    <button class="btn btn-danger" onclick="startSpecialBeerPong()" 
                        style="padding: 20px 30px; font-size: 1.1em;">
                        <i class="fas fa-dice"></i> Special Beer Pong
                    </button>
                </div>
                <p style="text-align: center; margin-top: 20px; opacity: 0.7;">
                    Special mode: Each cup has a dare or rule!
                </p>
            </div>
            
            <div id="teamNameSetup" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">Name Your Teams</h3>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div>
                        <label>Team 1:</label>
                        <input type="text" id="team1NameInput" placeholder="Enter team name" 
                            style="padding: 10px; background: rgba(255,255,255,0.1); 
                            border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                            color: white; width: 200px; margin-left: 10px;" value="Team 1">
                    </div>
                    <div>
                        <label>Team 2:</label>
                        <input type="text" id="team2NameInput" placeholder="Enter team name" 
                            style="padding: 10px; background: rgba(255,255,255,0.1); 
                            border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                            color: white; width: 200px; margin-left: 10px;" value="Team 2">
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="startGameWithNames()" style="padding: 10px 30px;">
                        <i class="fas fa-play"></i> Start Game
                    </button>
                </div>
            </div>
            
            <div id="normalGamePlay" style="display: none;">
                <div class="score-display">
                    <div class="team-score">
                        <div class="team-name" id="team1Display">Team 1</div>
                        <div class="team-points" id="team1Score">0</div>
                        <button class="btn" onclick="addScore('team1')">+1</button>
                    </div>
                    <div class="team-score">
                        <div class="team-name" id="team2Display">Team 2</div>
                        <div class="team-points" id="team2Score">0</div>
                        <button class="btn" onclick="addScore('team2')">+1</button>
                    </div>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" onclick="resetBeerPong()">
                        <i class="fas fa-redo"></i> New Game
                    </button>
                </div>
                <div id="gameStatus" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
            </div>
            
            <div id="specialGamePlay" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">
                    <span id="specialTeam1Name">Team 1</span> vs <span id="specialTeam2Name">Team 2</span>
                </h3>
                <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 40px;">
                    <div id="team1Cups" style="text-align: center;">
                        <h4 id="specialTeam1Display">Team 1</h4>
                        <div class="cup-formation" style="margin-top: 20px;">
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 3em;">🏓</div>
                        <button class="btn btn-primary" onclick="resetSpecialGame()" style="margin-top: 20px;">
                            <i class="fas fa-redo"></i> Reset
                        </button>
                    </div>
                    <div id="team2Cups" style="text-align: center;">
                        <h4 id="specialTeam2Display">Team 2</h4>
                        <div class="cup-formation" style="margin-top: 20px;">
                        </div>
                    </div>
                </div>
                <div id="ruleDisplay" style="display: none; margin-top: 30px; text-align: center; 
                    padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;">
                </div>
            </div>
        </div>
        
        <div id="beerPongTournament" style="display: none;">
            <div id="tournamentSetup" style="display: block;">
                <h3 style="text-align: center; margin-bottom: 20px;">🏆 Tournament Setup</h3>
                <div style="text-align: center; margin-bottom: 30px;">
                    <p style="margin-bottom: 15px;">Select number of teams:</p>
                    <div style="display: flex; justify-content: center; gap: 20px;">
                        <button class="btn btn-primary" onclick="setupTournament(4)" style="padding: 15px 30px;">
                            4 Teams
                        </button>
                        <button class="btn btn-primary" onclick="setupTournament(8)" style="padding: 15px 30px;">
                            8 Teams
                        </button>
                        <button class="btn btn-primary" onclick="setupTournament(16)" style="padding: 15px 30px;">
                            16 Teams
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="teamNaming" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">Name Your Teams</h3>
                <div id="teamInputs" style="max-height: 400px; overflow-y: auto; padding: 20px;">
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="startTournament()" style="padding: 10px 30px;">
                        <i class="fas fa-trophy"></i> Start Tournament
                    </button>
                </div>
            </div>
            
            <div id="tournamentBracket" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">
                    <span id="tournamentRoundTitle">Tournament Bracket</span>
                </h3>
                <div id="bracketDisplay" style="overflow-x: auto; padding: 20px;">
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn" onclick="resetTournament()" style="padding: 10px 20px;">
                        <i class="fas fa-redo"></i> New Tournament
                    </button>
                </div>
            </div>
        </div>
    `}function kn(e){const t=document.getElementById("beerPongRules"),n=document.getElementById("beerPongGame"),o=document.getElementById("beerPongTournament"),a=S.beerPongRules[e];document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.remove("btn-primary"),document.getElementById("tournamentBtn").classList.remove("btn-primary"),document.getElementById(`${e}RulesBtn`).classList.add("btn-primary"),n.style.display="none",o.style.display="none",t.style.display="block",t.innerHTML=`
        <h2 style="text-align: center; margin-bottom: 10px;">${a.title}</h2>
        <p style="text-align: center; opacity: 0.8; margin-bottom: 20px;">${a.description}</p>
        <div style="display: grid; gap: 15px;">
            ${a.rules.map((r,i)=>`
                <div class="rule-item" style="background: rgba(255,255,255,0.05); padding: 15px; 
                    border-radius: 10px; border-left: 3px solid ${e==="creator"?"#00ff88":"#00d4ff"};
                    animation: slideIn 0.3s ease-out ${i*.05}s both;">
                    <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 5px;">
                        ${r.name}
                    </div>
                    <div style="opacity: 0.9; line-height: 1.4;">
                        ${r.desc}
                    </div>
                </div>
            `).join("")}
        </div>
        <style>
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        </style>
    `,$&&e==="creator"&&$({particleCount:50,spread:60,origin:{y:.2},colors:["#00ff88","#00d4ff","#ff0088"]})}function ct(){const e=document.getElementById("beerPongRules"),t=document.getElementById("beerPongGame"),n=document.getElementById("beerPongTournament");document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.add("btn-primary"),document.getElementById("tournamentBtn").classList.remove("btn-primary"),e.style.display="none",n.style.display="none",t.style.display="block",document.getElementById("gameModeSelection").style.display="block",document.getElementById("teamNameSetup").style.display="none",document.getElementById("normalGamePlay").style.display="none",document.getElementById("specialGamePlay").style.display="none"}function lt(){const e=document.getElementById("beerPongRules"),t=document.getElementById("beerPongGame"),n=document.getElementById("beerPongTournament");document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.remove("btn-primary"),document.getElementById("tournamentBtn").classList.add("btn-primary"),e.style.display="none",t.style.display="none",n.style.display="block",document.getElementById("tournamentSetup").style.display="block",document.getElementById("teamNaming").style.display="none",document.getElementById("tournamentBracket").style.display="none"}function xn(e){u.tournament.totalTeams=e,u.tournament.teams=[],u.tournament.bracket=[],u.tournament.currentRound=0,document.getElementById("tournamentSetup").style.display="none",document.getElementById("teamNaming").style.display="block";const t=document.getElementById("teamInputs");t.innerHTML="";for(let n=1;n<=e;n++)t.innerHTML+=`
            <div style="margin-bottom: 15px;">
                <label style="display: inline-block; width: 100px;">Team ${n}:</label>
                <input type="text" id="team${n}Name" placeholder="Enter team name" 
                    style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                    color: white; width: 250px;" value="Team ${n}">
            </div>
        `;$&&$({particleCount:100,spread:70,origin:{y:.6},colors:["#FFD700","#FFA500","#FF6347"]})}function En(){const e=u.tournament.totalTeams;u.tournament.teams=[];for(let t=1;t<=e;t++){const n=document.getElementById(`team${t}Name`).value.trim()||`Team ${t}`;u.tournament.teams.push({id:t,name:n,eliminated:!1})}dr(),document.getElementById("teamNaming").style.display="none",document.getElementById("tournamentBracket").style.display="block",Cn()}function dr(){const e=[...u.tournament.teams],t=[];let n=[];for(let a=0;a<e.length;a+=2)n.push({team1:e[a],team2:e[a+1],winner:null,matchId:`R1M${Math.floor(a/2)+1}`});t.push(n);let o=2;for(;n.length>1;){const a=[];for(let r=0;r<n.length;r+=2)a.push({team1:null,team2:null,winner:null,matchId:`R${o}M${Math.floor(r/2)+1}`,previousMatch1:n[r].matchId,previousMatch2:n[r+1]?n[r+1].matchId:null});t.push(a),n=a,o++}u.tournament.rounds=t}function Cn(){const e=document.getElementById("bracketDisplay"),t=u.tournament.rounds;let n='<div style="display: flex; gap: 50px; align-items: center; min-width: max-content;">';t.forEach((o,a)=>{const r=In(a,t.length);n+=`
            <div style="flex-shrink: 0;">
                <h4 style="text-align: center; margin-bottom: 20px; color: #00ff88;">${r}</h4>
                <div style="display: flex; flex-direction: column; gap: ${30*(a+1)}px;">
        `,o.forEach(i=>{const c=i.team1?i.team1.name:"TBD",l=i.team2?i.team2.name:"TBD",d=i.team1&&i.team2&&!i.winner;n+=`
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;
                    border: 2px solid ${i.winner?"#00ff88":"rgba(255,255,255,0.2)"};">
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                            <span style="${i.winner===i.team1?"color: #00ff88; font-weight: bold;":""}">${c}</span>
                            ${d?`<button class="btn btn-sm" onclick="selectWinner('${i.matchId}', 1)" style="padding: 5px 10px;">Win</button>`:""}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="${i.winner===i.team2?"color: #00ff88; font-weight: bold;":""}">${l}</span>
                            ${d?`<button class="btn btn-sm" onclick="selectWinner('${i.matchId}', 2)" style="padding: 5px 10px;">Win</button>`:""}
                        </div>
                    </div>
                    ${i.winner?`<div style="text-align: center; font-size: 0.9em; color: #00ff88;">Winner: ${i.winner.name}</div>`:""}
                </div>
            `}),n+="</div></div>"}),n+="</div>",e.innerHTML=n,mr()}function In(e,t){return e===t-1?"🏆 FINAL":e===t-2?"🥈 Semi-Finals":e===t-3?"🥉 Quarter-Finals":`Round ${e+1}`}function Bn(e,t){const n=u.tournament.rounds;for(let o=0;o<n.length;o++){const a=n[o].find(r=>r.matchId===e);if(a){if(a.winner=t===1?a.team1:a.team2,o<n.length-1){const i=n[o+1].find(c=>c.previousMatch1===e||c.previousMatch2===e);i&&(i.previousMatch1===e?i.team1=a.winner:i.team2=a.winner)}o===n.length-1&&ur(a.winner);break}}Cn()}function ur(e){const t=document.getElementById("bracketDisplay");if(t.innerHTML=`
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">CHAMPIONS!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${e.name}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Congratulations on winning the Beer Pong Tournament!
            </p>
        </div>
    `,$){const n=["#FFD700","#FFA500","#FF6347","#00ff88","#00d4ff"];for(let o=0;o<5;o++)setTimeout(()=>{$({particleCount:150,spread:100,origin:{x:Math.random(),y:Math.random()*.5},colors:n})},o*200)}}function mr(){const e=u.tournament.rounds;let t=0;for(let o=0;o<e.length;o++)if(e[o].some(a=>a.team1&&a.team2&&!a.winner)){t=o;break}const n=In(t,e.length);document.getElementById("tournamentRoundTitle").textContent=`${n} - Beer Pong Tournament`}function Dn(){u.tournament={teams:[],bracket:[],currentRound:0,totalTeams:0,rounds:[]},lt()}function Pn(){u.beerPong.currentMode="normal",document.getElementById("gameModeSelection").style.display="none",document.getElementById("teamNameSetup").style.display="block"}function Sn(){u.beerPong.currentMode="special",document.getElementById("gameModeSelection").style.display="none";const e=document.createElement("div");e.id="specialCategorySelection",e.innerHTML=`
        <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
            <button class="btn btn-primary" onclick="selectSpecialBeerPongCategory('classic')">
                <i class="fas fa-beer"></i> Classic
            </button>
            <button class="btn" onclick="selectSpecialBeerPongCategory('gettingStarted')">
                <i class="fas fa-play-circle"></i> Getting Started
            </button>
            <button class="btn" onclick="selectSpecialBeerPongCategory('normal')">
                <i class="fas fa-dice"></i> Normal
            </button>
            <button class="btn btn-danger" onclick="selectSpecialBeerPongCategory('spicy')">
                <i class="fas fa-fire"></i> Spicy
            </button>
            <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                onclick="selectSpecialBeerPongCategory('couples')">
                <i class="fas fa-heart"></i> Couples
            </button>
        </div>
    `;const t=document.getElementById("beerPongGame");document.getElementById("specialCategorySelection")&&document.getElementById("specialCategorySelection").remove(),t.insertBefore(e,t.firstChild)}function Tn(e){u.selectedCategory=e,document.getElementById("specialCategorySelection").style.display="none",document.getElementById("teamNameSetup").style.display="block"}function Ln(){const e=document.getElementById("team1NameInput").value.trim()||"Team 1",t=document.getElementById("team2NameInput").value.trim()||"Team 2";u.beerPong.team1Name=e,u.beerPong.team2Name=t,document.getElementById("teamNameSetup").style.display="none",u.beerPong.currentMode==="normal"?(document.getElementById("team1Display").textContent=e,document.getElementById("team2Display").textContent=t,document.getElementById("normalGamePlay").style.display="block"):(Mn(e,t),document.getElementById("specialGamePlay").style.display="block")}function Mn(e,t){document.getElementById("specialTeam1Name").textContent=e,document.getElementById("specialTeam2Name").textContent=t,document.getElementById("specialTeam1Display").textContent=e,document.getElementById("specialTeam2Display").textContent=t,u.beerPong.specialCups.team1=Lt("team1"),u.beerPong.specialCups.team2=Lt("team2"),Ve("team1"),Ve("team2")}function Lt(e){const t=[],n=S.specialBeerPongRules[u.selectedCategory]||S.specialBeerPongRules.classic,o=S.specialBeerPongDares[u.selectedCategory]||S.specialBeerPongDares.classic;for(let a=0;a<10;a++){const r=Math.random()>.5,i=r?n[Math.floor(Math.random()*n.length)]:o[Math.floor(Math.random()*o.length)];t.push({id:`${e}-cup-${a}`,active:!0,type:r?"rule":"dare",content:i})}return t}function Ve(e){const t=u.beerPong.specialCups[e],n=document.querySelector(`#${e}Cups .cup-formation`),o=[4,3,2,1];let a=0,r="";o.forEach((i,c)=>{r+='<div style="display: flex; justify-content: center; margin-bottom: 5px;">';for(let l=0;l<i;l++){const d=t[a],m=d.active?"font-size: 2.5em; cursor: pointer; margin: 0 5px; transition: transform 0.2s;":"font-size: 2.5em; margin: 0 5px; opacity: 0.3;";r+=`
                <span id="${d.id}" 
                    style="${m}" 
                    onclick="${d.active?`hitCup('${e}', ${a})`:""}"
                    onmouseover="this.style.transform='scale(1.1)'"
                    onmouseout="this.style.transform='scale(1)'">
                    ${d.active?"🥤":"💨"}
                </span>
            `,a++}r+="</div>"}),n.innerHTML=r}function $n(e,t){const n=u.beerPong.specialCups[e][t];if(!n.active)return;n.active=!1;const o=document.getElementById("ruleDisplay");o.style.display="block",o.innerHTML=`
        <h3 style="color: ${n.type==="rule"?"#00ff88":"#ff0088"};">
            ${n.type==="rule"?"📜 NEW RULE!":"🎯 DARE TIME!"}
        </h3>
        <p style="font-size: 1.3em; margin: 20px 0;">
            ${n.content}
        </p>
        <button class="btn btn-primary" onclick="closeRuleDisplay()">
            Got it!
        </button>
    `,Ve(e),u.beerPong.specialCups[e].filter(r=>r.active).length===0&&pr(e==="team1"?u.beerPong.team2Name:u.beerPong.team1Name),$&&$({particleCount:50,spread:60,origin:{y:.6},colors:n.type==="rule"?["#00ff88","#00d4ff"]:["#ff0088","#ff4444"]})}function An(){document.getElementById("ruleDisplay").style.display="none"}function pr(e){if(document.getElementById("specialGamePlay").innerHTML=`
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">WINNER!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${e}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Conquered Special Beer Pong!
            </p>
            <button class="btn btn-primary" onclick="resetBeerPong()" style="margin-top: 30px;">
                <i class="fas fa-redo"></i> Play Again
            </button>
        </div>
    `,$)for(let t=0;t<3;t++)setTimeout(()=>{$({particleCount:100,spread:70,origin:{x:Math.random(),y:Math.random()*.5}})},t*300)}function Nn(){Mn(u.beerPong.team1Name,u.beerPong.team2Name),document.getElementById("ruleDisplay").style.display="none"}function Rn(e){let t=b().gameScores||{team1:0,team2:0};t[e]++,D("gameScores",t),Fn(),t[e]>=10&&(document.getElementById("gameStatus").textContent=`${e==="team1"?"Team 1":"Team 2"} Wins! 🏆`,$&&$({particleCount:200,spread:70,origin:{y:.6}}))}function Fn(){const e=b().gameScores||{team1:0,team2:0};document.getElementById("team1Score").textContent=e.team1,document.getElementById("team2Score").textContent=e.team2}function qn(){D("gameScores",{team1:0,team2:0}),Fn(),document.getElementById("gameStatus").textContent="",ct()}function yr(){}window.gameModules=window.gameModules||{};window.gameModules["beer-pong"]={createGame:lr,initialize:yr};window.showBeerPongRules=kn;window.showBeerPongGame=ct;window.showBeerPongTournament=lt;window.setupTournament=xn;window.startTournament=En;window.selectWinner=Bn;window.resetTournament=Dn;window.startNormalBeerPong=Pn;window.startSpecialBeerPong=Sn;window.selectSpecialBeerPongCategory=Tn;window.startGameWithNames=Ln;window.hitCup=$n;window.closeRuleDisplay=An;window.resetSpecialGame=Nn;window.addScore=Rn;window.resetBeerPong=qn;function gr(){return`
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'neverHaveIEver')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'neverHaveIEver')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'neverHaveIEver')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'neverHaveIEver')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'neverHaveIEver')">
                    <i class="fas fa-heart"></i> Couples
                </button>
            </div>
        </div>
        
        <div id="playerSetup" style="display: none;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startNeverHaveIEver()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div id="drinkingPlayers" style="margin: 20px 0; text-align: center; min-height: 60px;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" onclick="nextNeverHaveIEver()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('neverHaveIEver')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
            <div style="text-align: center; opacity: 0.7;">
                <p>Drink if you've done it! 🍻</p>
            </div>
        </div>
        
        <style>
            .category-badge {
                display: inline-block;
                padding: 5px 15px;
                background: linear-gradient(45deg, #00ff88, #00d4ff);
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
                color: #000;
                text-transform: uppercase;
            }
        </style>
    `}function Wn(){if(E.length<2){s("Add at least 2 players","error");return}ce(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",le()}function zn(){const e=S.neverHaveIEver[u.selectedCategory]||S.neverHaveIEver.classic,t=Math.floor(Math.random()*e.length);document.getElementById("gameQuestion").textContent=e[t]}function fr(){if(G(),E.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["never-have-i-ever"]={createGame:gr,initialize:fr};window.startNeverHaveIEver=Wn;window.nextNeverHaveIEver=zn;function hr(){return`
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'truthOrDare')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'truthOrDare')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'truthOrDare')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'truthOrDare')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'truthOrDare')">
                    <i class="fas fa-heart"></i> Couples
                </button>
            </div>
        </div>
        
        <div id="playerSetup" style="display: none;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startTruthOrDare()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div id="currentPlayer" style="text-align: center; font-size: 2em; margin: 20px 0; color: #00ff88;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" style="margin: 10px; width: 120px;" onclick="showTruth()">
                    <i class="fas fa-comment"></i> Truth
                </button>
                <button class="btn btn-danger" style="margin: 10px; width: 120px;" onclick="showDare()">
                    <i class="fas fa-fire"></i> Dare
                </button>
            </div>
            <div class="question-card" id="gameQuestion">
                Choose Truth or Dare!
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="nextTurnTruthOrDare()" style="display: none;" id="nextTurnBtn">
                    <i class="fas fa-arrow-right"></i> Next Player
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('truthOrDare')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
        </div>
    `}function Hn(){if(E.length<2){s("Add at least 2 players","error");return}ce(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",V(0),vn(),le()}function Un(){V((_+1)%E.length),vn(),document.getElementById("gameQuestion").textContent="Choose Truth or Dare!",document.getElementById("nextTurnBtn").style.display="none"}function jn(){const e=S.truths[u.selectedCategory]||S.truths.classic,t=e[Math.floor(Math.random()*e.length)];document.getElementById("gameQuestion").textContent=t,document.getElementById("nextTurnBtn").style.display="inline-block"}function On(){const e=S.dares[u.selectedCategory]||S.dares.classic,t=e[Math.floor(Math.random()*e.length)];document.getElementById("gameQuestion").textContent=t,document.getElementById("nextTurnBtn").style.display="inline-block"}function vr(){if(G(),E.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}V(0)}window.gameModules=window.gameModules||{};window.gameModules["truth-or-dare"]={createGame:hr,initialize:vr};window.startTruthOrDare=Hn;window.nextTurnTruthOrDare=Un;window.showTruth=jn;window.showDare=On;function br(){return`
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'wouldYouRather')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'wouldYouRather')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'wouldYouRather')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'wouldYouRather')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'wouldYouRather')">
                    <i class="fas fa-heart"></i> Couples
                </button>
            </div>
        </div>
        
        <div id="playerSetup" style="display: none;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startWouldYouRather()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                <button class="btn btn-primary" id="option1Btn" onclick="voteWouldYouRather(0)" style="padding: 20px;">
                    Option 1
                </button>
                <button class="btn btn-danger" id="option2Btn" onclick="voteWouldYouRather(1)" style="padding: 20px;">
                    Option 2
                </button>
            </div>
            <div id="voteResults" style="display: none; margin: 20px 0;"></div>
            <div style="text-align: center;">
                <button class="btn" onclick="nextWouldYouRather()" style="display: none;" id="nextQuestionBtn">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('wouldYouRather')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
        </div>
        
        <style>
            .category-badge {
                display: inline-block;
                padding: 5px 15px;
                background: linear-gradient(45deg, #00ff88, #00d4ff);
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
                color: #000;
                text-transform: uppercase;
            }
        </style>
    `}function Gn(){if(E.length<2){s("Add at least 2 players","error");return}ce(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",le(),dt()}function dt(){const e=S.wouldYouRather[u.selectedCategory]||S.wouldYouRather.classic,t=e[Math.floor(Math.random()*e.length)],n=t.split(" or "),o=n[0].replace("Would you rather ",""),a=n[1]||n[0];document.getElementById("gameQuestion").textContent=t,document.getElementById("option1Btn").textContent=o,document.getElementById("option2Btn").textContent=a,document.getElementById("voteResults").style.display="none",document.getElementById("nextQuestionBtn").style.display="none",document.getElementById("option1Btn").disabled=!1,document.getElementById("option2Btn").disabled=!1}function _n(e){document.getElementById("option1Btn").disabled=!0,document.getElementById("option2Btn").disabled=!0;const t=document.getElementById("voteResults");t.innerHTML=`
        <h3>Minority drinks! 🍺</h3>
        <p>In a real game, everyone votes and the minority drinks!</p>
    `,t.style.display="block",document.getElementById("nextQuestionBtn").style.display="inline-block"}function wr(){if(G(),E.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["would-you-rather"]={createGame:br,initialize:wr};window.startWouldYouRather=Gn;window.nextWouldYouRather=dt;window.voteWouldYouRather=_n;function kr(){return`
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'mostLikelyTo')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'mostLikelyTo')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'mostLikelyTo')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'mostLikelyTo')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'mostLikelyTo')">
                    <i class="fas fa-heart"></i> Couples
                </button>
            </div>
        </div>
        
        <div id="playerSetup" style="display: none;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startMostLikelyTo()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div style="text-align: center; margin: 30px 0;">
                <h3>Count to 3, then everyone point!</h3>
                <button class="btn btn-primary" onclick="showVotes()">
                    <i class="fas fa-eye"></i> Show Who Got Most Votes
                </button>
                <button class="btn" onclick="nextMostLikelyTo()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('mostLikelyTo')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
            <div id="votingPlayers" style="margin: 20px 0;"></div>
        </div>
        
        <style>
            .category-badge {
                display: inline-block;
                padding: 5px 15px;
                background: linear-gradient(45deg, #00ff88, #00d4ff);
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
                color: #000;
                text-transform: uppercase;
            }
        </style>
    `}function Vn(){if(E.length<3){s("Add at least 3 players","error");return}ce(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",le(),ut()}function ut(){const e=S.mostLikelyTo[u.selectedCategory]||S.mostLikelyTo.classic,t=e[Math.floor(Math.random()*e.length)];document.getElementById("gameQuestion").textContent=t;const n=document.getElementById("votingPlayers");n.innerHTML=`
        <h4>Players in the game:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            ${E.map(o=>`
                <div style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border-radius: 10px; text-align: center;">
                    ${o}
                </div>
            `).join("")}
        </div>
    `}function Yn(){s("Person with most votes drinks! 🍻","info")}function xr(){if(G(),E.length>=3){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["most-likely-to"]={createGame:kr,initialize:xr};window.startMostLikelyTo=Vn;window.nextMostLikelyTo=ut;window.showVotes=Yn;function Er(){return`
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'spinBottle')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'spinBottle')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'spinBottle')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'spinBottle')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'spinBottle')">
                    <i class="fas fa-heart"></i> Couples
                </button>
            </div>
        </div>
        
        <div id="playerSetup" style="display: none;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startSpinBottle()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div style="text-align: center;">
                <div id="bottleContainer" style="font-size: 6em; margin: 20px 0; position: relative;">
                    🍾
                </div>
                <button class="btn btn-primary" onclick="spinBottle()">
                    <i class="fas fa-sync"></i> Spin the Bottle
                </button>
            </div>
            <div id="spinResult" style="margin: 30px 0; text-align: center;"></div>
            <div class="question-card" id="gameTask" style="display: none;">
                Task will appear here
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('spinBottle')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
        </div>
        
        <style>
            .category-badge {
                display: inline-block;
                padding: 5px 15px;
                background: linear-gradient(45deg, #00ff88, #00d4ff);
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
                color: #000;
                text-transform: uppercase;
            }
        </style>
    `}function Kn(){if(E.length<3){s("Add at least 3 players","error");return}ce(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",V(0),le()}function Jn(){const e=document.getElementById("bottleContainer"),t=E[_],n=E.filter((a,r)=>r!==_),o=n[Math.floor(Math.random()*n.length)];e.style.transition="transform 2s ease-out",e.style.transform=`rotate(${720+Math.random()*360}deg)`,setTimeout(()=>{document.getElementById("spinResult").innerHTML=`
            <h3>${t} → ${o}</h3>
        `;const a=S.spinBottleTasks[u.selectedCategory]||S.spinBottleTasks.classic,r=a[Math.floor(Math.random()*a.length)];document.getElementById("gameTask").textContent=r,document.getElementById("gameTask").style.display="block",V((_+1)%E.length),setTimeout(()=>{e.style.transition="none",e.style.transform="rotate(0deg)"},100)},2e3)}function Cr(){if(G(),E.length>=3){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}V(0)}window.gameModules=window.gameModules||{};window.gameModules["spin-the-bottle"]={createGame:Er,initialize:Cr};window.startSpinBottle=Kn;window.spinBottle=Jn;function Ir(){return`
        <div id="playerSetup" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startKingsCup()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div id="currentPlayer" style="text-align: center; font-size: 1.5em; margin: 10px 0; color: #00ff88;"></div>
            <div style="text-align: center;">
                <div style="font-size: 6em; margin: 20px 0;" id="currentCard">🎴</div>
                <button class="btn btn-primary" onclick="drawCard()">
                    <i class="fas fa-clone"></i> Draw Card
                </button>
            </div>
            <div class="question-card" id="gameQuestion">
                Click "Draw Card" to start!
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
            </div>
        </div>
    `}function Br(){if(E.length<2){s("Add at least 2 players","error");return}ce(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",V(0),Qn()}function Qn(){const e=document.getElementById("currentPlayer");e&&E.length>0&&(e.textContent=`${E[_]}'s Turn`)}function Zn(){const e=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],t=["♠️","♥️","♦️","♣️"],n=e[Math.floor(Math.random()*e.length)],o=t[Math.floor(Math.random()*t.length)];document.getElementById("currentCard").textContent=n+o;const a={A:"🍉 Waterfall - Everyone drinks!",2:"👉 You - Choose someone to drink",3:"👈 Me - You drink!",4:"👯 Floor - Last to touch floor drinks",5:"🙋 Guys - All guys drink",6:"💃 Chicks - All girls drink",7:"🌈 Heaven - Last to raise hand drinks",8:"🤝 Mate - Choose a drinking buddy",9:"🎵 Rhyme - Say a word, others rhyme",10:"📏 Categories - Name things in category",J:"👑 Make a Rule",Q:"❓ Questions - Ask questions only",K:"🏆 King's Cup - Pour into center cup"};document.getElementById("gameQuestion").textContent=a[n],V((_+1)%E.length),Qn()}function Dr(){if(G(),E.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}V(0)}window.gameModules=window.gameModules||{};window.gameModules["kings-cup"]={createGame:Ir,initialize:Dr};window.startKingsCup=Br;window.drawCard=Zn;function Pr(){return`
        <div class="timer-display" id="flipTimer">00:00</div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" id="timerBtn" onclick="toggleFlipTimer()">
                <i class="fas fa-play"></i> Start Timer
            </button>
            <button class="btn" onclick="resetFlipTimer()">
                <i class="fas fa-redo"></i> Reset
            </button>
        </div>
        <div id="bestTime" style="text-align: center; font-size: 1.2em; margin-top: 20px;">
            Best Time: --:--
        </div>
        <div style="margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;">
            <h3 style="text-align: center; color: #00ff88;">How to Play Flip Cup</h3>
            <ol style="line-height: 1.8;">
                <li>🍺 Fill cup with drink (1/4 full)</li>
                <li>🏃 Drink the entire cup</li>
                <li>🔄 Place cup upside down on edge of table</li>
                <li>👆 Flip cup with one finger to land right-side up</li>
                <li>⏱️ Fastest time wins!</li>
            </ol>
        </div>
    `}function Xn(){const e=document.getElementById("timerBtn");u.flipTimer?(clearInterval(u.flipTimer),u.flipTimer=null,e.innerHTML='<i class="fas fa-play"></i> Start Timer',(!u.bestFlipTime||u.flipTime<u.bestFlipTime)&&(u.bestFlipTime=u.flipTime,document.getElementById("bestTime").textContent=`Best Time: ${Tt(u.bestFlipTime)}`,$&&$({particleCount:100,spread:70,origin:{y:.6}}))):(u.flipTime=0,u.flipTimer=setInterval(()=>{u.flipTime++,document.getElementById("flipTimer").textContent=Tt(u.flipTime)},10),e.innerHTML='<i class="fas fa-pause"></i> Stop Timer')}function eo(){u.flipTimer&&(clearInterval(u.flipTimer),u.flipTimer=null),u.flipTime=0,document.getElementById("flipTimer").textContent="00:00",document.getElementById("timerBtn").innerHTML='<i class="fas fa-play"></i> Start Timer'}function Sr(){u.flipTimer&&(clearInterval(u.flipTimer),u.flipTimer=null),u.flipTime=0}window.gameModules=window.gameModules||{};window.gameModules["flip-cup"]={createGame:Pr,initialize:Sr};window.toggleFlipTimer=Xn;window.resetFlipTimer=eo;function Tr(){return`
        <div id="categorySelection" style="display: block;">
            <div class="question-card" style="margin-bottom: 30px;">
                <h2 style="text-align: center; color: #00d4ff;">Choose Your Category</h2>
            </div>
            <div class="category-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 20px 0;">
                <button class="category-btn" onclick="selectCategory('sports')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #ff6b6b, #ee5a24); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-football-ball" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Sports</div>
                </button>
                <button class="category-btn" onclick="selectCategory('history')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #4834d4, #686de0); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-landmark" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">History</div>
                </button>
                <button class="category-btn" onclick="selectCategory('science')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #00d2d3, #01a3a4); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-flask" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Science</div>
                </button>
                <button class="category-btn" onclick="selectCategory('flags')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #f9ca24, #f0932b); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-flag" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Flags</div>
                </button>
                <button class="category-btn" onclick="selectCategory('economy')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #6ab04c, #badc58); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-chart-line" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Economy</div>
                </button>
            </div>
        </div>
        <div id="triviaGame" style="display: none;">
            <div class="question-card" id="gameQuestion">
                Select a category to start!
            </div>
            <div id="triviaOptions" style="margin: 20px 0;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" onclick="nextTrivia()" style="display: block; width: 100%; margin-bottom: 10px;">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn btn-secondary" onclick="backToCategories()" style="display: block; width: 100%;">
                    <i class="fas fa-arrow-left"></i> Change Category
                </button>
            </div>
            <div class="score-display">
                <div class="team-score">
                    <div class="team-name">Score</div>
                    <div class="team-points" id="triviaScore">0</div>
                </div>
            </div>
        </div>
    `}function Lr(e){if(u.currentCategory=e,u.currentTriviaIndex=0,e==="flags"){const n=[...S.triviaCategories.flags];for(let o=n.length-1;o>0;o--){const a=Math.floor(Math.random()*(o+1));[n[o],n[a]]=[n[a],n[o]]}u.shuffledFlags=n}document.getElementById("categorySelection").style.display="none",document.getElementById("triviaGame").style.display="block",s(`Category: ${{sports:"🏃 Sports",history:"📚 History",science:"🔬 Science",flags:"🌍 Flags",economy:"💰 Economy"}[e]}`),mt()}function Mr(){document.getElementById("categorySelection").style.display="block",document.getElementById("triviaGame").style.display="none",u.currentTriviaIndex=0}function mt(){const e=u.currentCategory||"sports";let t;if(e==="flags"&&u.shuffledFlags?t=u.shuffledFlags:t=S.triviaCategories[e]||S.trivia,u.currentTriviaIndex>=t.length&&(u.currentTriviaIndex=0,e==="flags")){const r=[...S.triviaCategories.flags];for(let i=r.length-1;i>0;i--){const c=Math.floor(Math.random()*(i+1));[r[i],r[c]]=[r[c],r[i]]}u.shuffledFlags=r,t=u.shuffledFlags}const n=t[u.currentTriviaIndex],o=document.getElementById("gameQuestion");e==="flags"&&n.flagCode?o.innerHTML=`
            <div style="text-align: center;">
                <img src="https://flagpedia.net/data/flags/w580/${n.flagCode}.png" 
                     alt="Flag" 
                     style="width: 320px; height: auto; display: block; margin: 0 auto 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 1.5em; font-weight: bold; color: #00d4ff;">Which country is this?</div>
            </div>
        `:o.textContent=n.question;const a=n.options.map((r,i)=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${i}, ${n.correct})">${r}</button>`).join("");document.getElementById("triviaOptions").innerHTML=a}function to(e,t){const n=document.getElementById("triviaOptions").querySelectorAll("button");e===t?(u.triviaScore++,document.getElementById("triviaScore").textContent=u.triviaScore,n[e].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",s("✅ Correct! +1 point")):(n[e].style.background="linear-gradient(45deg, #ff4444, #ff0088)",n[t].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",s("❌ Wrong answer!")),n.forEach(o=>o.disabled=!0),u.currentTriviaIndex++}function $r(){u.triviaScore=0,u.currentTriviaIndex=0,u.currentCategory=null;const e=document.getElementById("categorySelection"),t=document.getElementById("triviaGame");e&&(e.style.display="block"),t&&(t.style.display="none")}window.gameModules=window.gameModules||{};window.gameModules.trivia={createGame:Tr,initialize:$r};window.nextTrivia=mt;window.answerTrivia=to;window.selectCategory=Lr;window.backToCategories=Mr;window.closeGame=ze;const Mt={firstTimer:{name:"First Timer",icon:"🎉",description:"Joined your first party!",requirement:1,progress:0,unlocked:!1,category:"beginner"},responsible:{name:"Responsible",icon:"😇",description:"Stayed under 0.05 BAC all night",requirement:1,progress:0,unlocked:!1,category:"safety"},gameMaster:{name:"Game Master",icon:"🏆",description:"Win 5 party games",requirement:5,progress:0,unlocked:!1,category:"games"},partyAnimal:{name:"Party Animal",icon:"📍",description:"Check in at 10 parties",requirement:10,progress:0,unlocked:!1,category:"social"},guardianAngel:{name:"Guardian Angel",icon:"🦸",description:"Help 3 friends get home safe",requirement:3,progress:0,unlocked:!1,category:"safety"},hydroHomie:{name:"Hydro Homie",icon:"💧",description:"Stay hydrated for 3 hours",requirement:12,progress:0,unlocked:!1,category:"health"},danceMachine:{name:"Dance Machine",icon:"🕺",description:"Log 50 songs danced to",requirement:50,progress:0,unlocked:!1,category:"fun"},sunriseWarrior:{name:"Sunrise Warrior",icon:"🌅",description:"Party until sunrise (6+ hours)",requirement:1,progress:0,unlocked:!1,category:"endurance"},socialButterfly:{name:"Social Butterfly",icon:"🦋",description:"Add 20 friends",requirement:20,progress:0,unlocked:!1,category:"social"},safetyFirst:{name:"Safety First",icon:"🛡️",description:"Use emergency services 0 times in 10 parties",requirement:10,progress:0,unlocked:!1,category:"safety"},mixologist:{name:"Mixologist",icon:"🍸",description:"Try 15 different drink types",requirement:15,progress:0,unlocked:!1,category:"drinks"},designated:{name:"Designated Hero",icon:"🚗",description:"Be the designated driver 5 times",requirement:5,progress:0,unlocked:!1,category:"safety"}};let Q={};function Ar(){const e=x();if(!e)return;const t=k(),n=y(t,`users/${e.uid}/achievements`);W(n,o=>{const a=o.val()||{};Object.keys(Mt).forEach(r=>{Q[r]={...Mt[r],...a[r]}}),D("userAchievements",Q),He()})}function Nr(e){const t=x();if(!t)return;const n=k(),o=Q[e];o&&T(y(n,`users/${t.uid}/achievements/${e}`),{progress:o.progress,unlocked:o.unlocked,unlockedAt:o.unlockedAt||null})}function fe(e,t=1){if(!Q[e])return;const n=Q[e];n.unlocked||(n.progress=Math.min(n.progress+t,n.requirement),n.progress>=n.requirement&&(n.unlocked=!0,n.unlockedAt=Date.now(),Rr(n),no()),Nr(e),He())}function He(){const e=document.querySelector(".achievements-grid");if(!e)return;e.innerHTML="",Object.entries(Q).sort(([,n],[,o])=>n.unlocked&&!o.unlocked?-1:!n.unlocked&&o.unlocked?1:n.category.localeCompare(o.category)).forEach(([n,o])=>{const a=document.createElement("div");a.className=`achievement ${o.unlocked?"unlocked":""}`,a.setAttribute("data-achievement",n);const r=o.progress/o.requirement*100;a.innerHTML=`
            <div class="achievement-icon">${o.icon}</div>
            <div class="achievement-name">${o.name}</div>
            <div class="achievement-description">${o.description}</div>
            ${o.unlocked?`
                <div class="achievement-unlocked-date">
                    Unlocked ${new Date(o.unlockedAt).toLocaleDateString()}
                </div>
            `:`
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${r}%"></div>
                    </div>
                    <div class="progress-text">${o.progress}/${o.requirement}</div>
                </div>
            `}
        `,e.appendChild(a)}),no()}function no(){const e=Object.keys(Q).length,t=Object.values(Q).filter(o=>o.unlocked).length;document.querySelectorAll("[data-achievement-stats]").forEach(o=>{o.textContent=`${t}/${e}`})}function Rr(e){typeof confetti=="function"&&confetti({particleCount:100,spread:70,origin:{y:.6}});const t=document.createElement("div");t.className="achievement-notification",t.innerHTML=`
        <div class="achievement-popup">
            <div class="achievement-popup-icon">${e.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${e.name}</div>
                <div class="achievement-popup-description">${e.description}</div>
            </div>
        </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{t.remove()},500)},5e3)}function Fr(){const e=b(),t=e.partyData||{},n=e.friendsData||{},o=e.partyStartTime;Object.values(t).every(r=>r.bac<.05)&&Date.now()-o>36e5&&fe("responsible"),Date.now()-o>216e5&&fe("sunriseWarrior"),Object.keys(n).length>=20&&fe("socialButterfly",Object.keys(n).length)}function qr(){fe("firstTimer")}async function Wr(){const e=document.getElementById("partyName"),t=document.getElementById("partyPrivacy"),n=document.getElementById("partyDuration"),o=document.getElementById("partyAddress");if(!e||!e.value.trim()){s("Enter a party name","error");return}const a={privacy:t?t.value:"private",duration:n?n.value:"ongoing",address:o?o.value:""};try{const r=await Gt(e.value.trim(),a);r.success?(s(`Party created! Code: ${r.code}`,"success"),e.value="",o&&(o.value=""),window.updatePartyDisplay&&window.updatePartyDisplay()):s(r.error||"Failed to create party","error")}catch{s("Failed to create party","error")}}async function zr(){const e=document.getElementById("joinPartyCode");if(!e||!e.value.trim()){s("Enter a party code","error");return}const t=e.value.trim();try{s("Checking party...","info");const n=await et(t);if(!n){s("Invalid party code","error");return}const o=Object.keys(n.members||{}).length,a=`Join "${n.name}"?
👥 ${o} members
🔒 Privacy: ${n.privacy||"Unknown"}
📍 ${n.address||"No location set"}
⏱️ ${n.duration==="24h"?"24 hour party":"Ongoing party"}`;if(!confirm(a))return;const r=await tt(t);r.success?(r.pending?s("Join request sent! Waiting for approval.","info"):r.alreadyMember?s("Rejoined party!","success"):s("Joined party!","success"),e.value="",window.updatePartyDisplay&&window.updatePartyDisplay()):s(r.error||"Failed to join party","error")}catch{s("Failed to join party","error")}}async function Hr(){if(confirm("Leave this party?"))try{(await _t()).success&&(s("Left party","info"),window.updatePartyDisplay&&window.updatePartyDisplay())}catch{s("Failed to leave party","error")}}async function Ur(){const e=document.getElementById("partyChatInput");if(!(!e||!e.value.trim()))try{(await Yt(e.value)).success&&(e.value="")}catch{s("Failed to send message","error")}}async function jr(){const e=document.getElementById("publicPartiesList");if(e){e.innerHTML='<p style="opacity: 0.7;">Loading parties...</p>';try{const t=await Jt();if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No public parties found. Create one!</p>';return}const n=window.firebase?.auth?.currentUser,o=n&&window.isDeveloper&&window.isDeveloper(n.uid),a=document.createElement("template");a.innerHTML=`
            <div class="friend-item" style="margin-bottom: 15px;">
                <div class="friend-info">
                    <div class="friend-avatar-small">🎉</div>
                    <div class="friend-details">
                        <h4 data-party-name></h4>
                        <p style="opacity: 0.7;" data-party-details></p>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;" data-party-actions>
                    <button class="btn btn-primary" data-join-btn>Join</button>
                </div>
            </div>
        `,e.innerHTML="",t.forEach(r=>{const i=a.content.cloneNode(!0);i.querySelector("[data-party-name]").textContent=r.name;const c=`👥 ${r.memberCount} members`+(r.address?` • 📍 ${r.address}`:"")+(r.duration==="24h"?" • ⏰ 24h party":"");if(i.querySelector("[data-party-details]").textContent=c,i.querySelector("[data-join-btn]").onclick=()=>oo(r.code),o){const l=document.createElement("button");l.className="btn btn-danger",l.title="Developer: Delete this party",l.innerHTML='<i class="fas fa-trash"></i>',l.onclick=()=>deletePartyAsDev(r.id),i.querySelector("[data-party-actions]").appendChild(l)}e.appendChild(i)})}catch{e.innerHTML='<p style="opacity: 0.7;">Failed to load parties</p>'}}}async function oo(e){try{const t=await tt(e,!0);t.success?(s("Joined public party!","success"),window.updatePartyDisplay&&window.updatePartyDisplay()):s(t.error||"Failed to join party","error")}catch{s("Failed to join party","error")}}let Ue=null,X="all";function Or(){x()&&(pt(),ri(),ii(),setInterval(gt,3e4))}async function ao(e){try{const t=x();if(!t)throw new Error("User not authenticated");const n=document.getElementById("uploadStatus");n&&(n.style.display="block");const o=R("deviceData")||{},a=e.deviceId;if(!o[a])throw new Error("Device not paired with this account");const r=Jr(e.imageBase64,"image/jpeg"),i=await Gr(r),c=Ft(),l=Date.now(),d=`photos/${t.uid}/${l}_${a}.jpg`,m=Rt(c,d),p=await bo(m,i),v=await wo(p.ref),h=k(),f=Le(y(h,"photos"));return await T(f,{userId:t.uid,userName:t.displayName||"Anonymous",deviceId:a,photoUrl:v,thumbnailUrl:v,bac:e.bac||null,timestamp:j(),likes:{},comments:{},partyId:R("currentPartyId")||null,location:e.location||null,retro:!0}),n&&(n.style.display="none"),s("📸 Photo uploaded successfully!","success"),window.checkAchievements&&window.checkAchievements("photo_upload"),{success:!0,photoId:f.key}}catch(t){const n=document.getElementById("uploadStatus");n&&(n.style.display="none");const o=O(t,"Photo Upload");return s(o.message,"error"),{success:!1,error:o.message}}}async function Gr(e){return new Promise(t=>{const n=new Image,o=document.createElement("canvas"),a=o.getContext("2d");n.onload=()=>{o.width=n.width,o.height=n.height,a.drawImage(n,0,0);const r=a.getImageData(0,0,o.width,o.height),i=r.data;for(let m=0;m<i.length;m+=4){const p=i[m],v=i[m+1],h=i[m+2];i[m]=Math.min(255,p*.393+v*.769+h*.189),i[m+1]=Math.min(255,p*.349+v*.686+h*.168),i[m+2]=Math.min(255,p*.272+v*.534+h*.131)}const c=o.width/2,l=o.height/2,d=Math.min(c,l);for(let m=0;m<o.height;m++)for(let p=0;p<o.width;p++){const v=Math.sqrt(Math.pow(p-c,2)+Math.pow(m-l,2)),h=Math.max(0,1-v/d*.7),f=(m*o.width+p)*4;i[f]*=h,i[f+1]*=h,i[f+2]*=h}a.putImageData(r,0,0),o.toBlob(m=>{t(m)},"image/jpeg",.9)},n.src=URL.createObjectURL(e)})}function pt(){const e=k(),t=x();Ue&&Nt(y(e,"photos"),Ue),Ue=W(y(e,"photos"),async n=>{const o=n.val()||{},a=R("friendsList")||[],r=R("currentPartyId"),i=[],c=a.map(l=>l.id);c.push(t.uid);for(const[l,d]of Object.entries(o))c.includes(d.userId)&&(X==="all"||X==="recent"&&Qr(d.timestamp)||X==="party"&&d.partyId===r||X==="high-bac"&&d.bac!==null&&d.bac>=.08||X==="boozelens"&&d.source==="BoozeLens_ESP32")&&i.push({id:l,...d});i.sort((l,d)=>(d.timestamp||0)-(l.timestamp||0)),_r(i)})}function _r(e){const t=document.getElementById("photoFeed");if(t){if(e.length===0){t.innerHTML=`
            <div class="photo-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 4em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No photos to show. ${X!=="all"?"Try changing the filter!":"Connect your BoozeLens to start!"}</p>
            </div>
        `;return}t.innerHTML=e.map(n=>{const o=Zr(n.timestamp),a=Object.keys(n.likes||{}).length,r=Object.keys(n.comments||{}).length,i=n.likes&&n.likes[x().uid];return`
            <div class="photo-card" data-photo-id="${n.id}">
                <div class="photo-header">
                    <div class="photo-user">
                        <div class="user-avatar">${Xr(n.userName)}</div>
                        <div class="user-info">
                            <h4>${n.userName}</h4>
                            <p>${o} ${n.bac!==null&&n.bac!==void 0?`• ${n.bac.toFixed(3)}‰`:""}</p>
                        </div>
                    </div>
                    ${n.userId===x().uid?`
                        <button class="btn-icon" onclick="deletePhoto('${n.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    `:""}
                </div>
                
                <div class="photo-image" onclick="viewPhoto('${n.id}')">
                    <img src="${n.photoUrl}" alt="Party photo" loading="lazy">
                    ${n.bac!==null&&n.bac>=.08?'<div class="bac-badge">🔥 High BAC</div>':""}
                </div>
                
                <div class="photo-actions">
                    <button class="btn-icon ${i?"liked":""}" onclick="toggleLike('${n.id}')">
                        <i class="fas fa-heart"></i> ${a>0?a:""}
                    </button>
                    <button class="btn-icon" onclick="showComments('${n.id}')">
                        <i class="fas fa-comment"></i> ${r>0?r:""}
                    </button>
                    <button class="btn-icon" onclick="sharePhoto('${n.id}')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                
                <div class="photo-comments" id="comments-${n.id}" style="display: none;">
                    <!-- Comments will be loaded here -->
                </div>
            </div>
        `}).join(""),ei()}}async function Vr(e){try{const t=x(),n=k(),o=y(n,`photos/${e}/likes/${t.uid}`);(await H(o)).exists()?await M(o):(await T(o,{timestamp:j(),userName:t.displayName||"Anonymous"}),window.checkAchievements&&window.checkAchievements("give_likes"))}catch(t){O(t,"Toggle Like")}}async function Yr(e,t){try{const n=x(),o=k(),a=Le(y(o,`photos/${e}/comments`));await T(a,{userId:n.uid,userName:n.displayName||"Anonymous",text:t,timestamp:j()}),s("💬 Comment added!","success")}catch(n){O(n,"Add Comment")}}async function Kr(e){if(confirm("Delete this photo? This cannot be undone."))try{const t=k(),n=Ft(),a=(await H(y(t,`photos/${e}`))).val();if(!a)throw new Error("Photo not found");if(a.photoUrl)try{const r=Rt(n,a.photoUrl);await vo(r)}catch(r){console.error("Storage deletion failed:",r)}await M(y(t,`photos/${e}`)),s("📸 Photo deleted","info")}catch(t){O(t,"Delete Photo")}}function Jr(e,t){const n=atob(e),o=[];for(let a=0;a<n.length;a+=512){const r=n.slice(a,a+512),i=new Array(r.length);for(let l=0;l<r.length;l++)i[l]=r.charCodeAt(l);const c=new Uint8Array(i);o.push(c)}return new Blob(o,{type:t})}function Qr(e){const t=Date.now()-864e5;return e>t}function Zr(e){if(!e)return"Just now";const t=Math.floor((Date.now()-e)/1e3);return t<60?"Just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}function Xr(e){return e.split(" ").map(t=>t[0]).join("").toUpperCase().slice(0,2)}function ei(){if(document.getElementById("retro-photo-styles"))return;const e=document.createElement("style");e.id="retro-photo-styles",e.innerHTML=`
        .photo-feed {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .photo-card {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.2s;
        }
        
        .photo-card:hover {
            transform: scale(1.02);
            border-color: #00ff88;
        }
        
        .photo-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
        }
        
        .photo-user {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #00ff88;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #1a1a1a;
        }
        
        .user-info h4 {
            margin: 0;
            font-size: 1em;
        }
        
        .user-info p {
            margin: 0;
            font-size: 0.8em;
            opacity: 0.7;
        }
        
        .photo-image {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            aspect-ratio: 1;
        }
        
        .photo-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: contrast(1.1) brightness(0.9);
        }
        
        .bac-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
        }
        
        .photo-actions {
            display: flex;
            gap: 15px;
            padding: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .btn-icon {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            opacity: 0.7;
            transition: all 0.2s;
        }
        
        .btn-icon:hover {
            opacity: 1;
            color: #00ff88;
        }
        
        .btn-icon.liked {
            color: #ff0066;
            opacity: 1;
        }
        
        .photo-comments {
            padding: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .photo-controls {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            align-items: center;
        }
        
        .photo-filter {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: inherit;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
        }
        
        .upload-status {
            background: rgba(0, 255, 136, 0.1);
            border: 2px solid #00ff88;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        
        .upload-progress {
            color: #00ff88;
            font-weight: bold;
        }
    `,document.head.appendChild(e)}async function yt(){pt(),s("📸 Feed refreshed!","success")}function ti(){X=document.getElementById("photoFilter").value,pt()}async function ni(e){console.log("View photo:",e)}async function oi(e){const t=document.getElementById(`comments-${e}`);if(t)if(t.style.display==="none"){const n=k(),a=(await H(y(n,`photos/${e}/comments`))).val()||{},r=Object.entries(a).sort((i,c)=>(i[1].timestamp||0)-(c[1].timestamp||0)).map(([i,c])=>`
                <div class="comment">
                    <strong>${c.userName}:</strong> ${c.text}
                </div>
            `).join("");t.innerHTML=`
            ${r}
            <div class="comment-input">
                <input type="text" id="comment-input-${e}" placeholder="Add a comment..." 
                    onkeypress="if(event.key==='Enter') addComment('${e}', this.value)">
            </div>
        `,t.style.display="block"}else t.style.display="none"}async function ai(e){const t=`${window.location.origin}/#photo/${e}`;await navigator.clipboard.writeText(t),s("📋 Link copied!","success")}function ri(){window.handleBoozeLensUpload=ao}function ii(){gt()}function gt(){const e=document.getElementById("boozeLensStatus");if(e)try{const t=Ut(),n=Yo(),o=t.length;if(o===0){e.innerHTML=`
                <div class="status-message info">
                    <i class="fas fa-info-circle"></i>
                    <span>No BoozeLens devices paired. Go to Settings to pair your device!</span>
                </div>
            `;return}let a="success",r="fas fa-check-circle",i=`${n} of ${o} BoozeLens devices online`;n===0?(a="error",r="fas fa-exclamation-triangle",i=`All ${o} BoozeLens devices offline`):n<o&&(a="warning",r="fas fa-exclamation-circle"),e.innerHTML=`
            <div class="status-message ${a}">
                <i class="${r}"></i>
                <span>${i}</span>
                <div class="device-quick-list">
                    ${t.slice(0,3).map(c=>`
                            <span class="device-badge ${c.lastSeen&&Date.now()-c.lastSeen<3e5?"online":"offline"}">
                                <i class="fas fa-camera-retro"></i>
                                ${c.nickname||c.deviceId.slice(-4)}
                                <i class="fas fa-circle status-dot"></i>
                            </span>
                        `).join("")}
                    ${o>3?`<span class="device-count">+${o-3} more</span>`:""}
                </div>
            </div>
        `}catch(t){console.error("Failed to update BoozeLens status:",t),e.innerHTML=`
            <div class="status-message warning">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Unable to check device status</span>
            </div>
        `}}function si(e,t){const o=Ut().find(i=>i.deviceId===e),a=o?o.nickname:e;s(`📸 Photo uploaded from ${a}!`,"success");const r=document.getElementById("uploadStatus");r&&(r.style.display="none"),setTimeout(()=>{yt()},1e3)}function ci(){if(document.getElementById("boozelens-status-styles"))return;const e=document.createElement("style");e.id="boozelens-status-styles",e.innerHTML=`
        .boozelens-status {
            margin: 20px 0;
        }
        
        .status-message {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            border-radius: 10px;
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        
        .status-message.success {
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid rgba(0, 255, 136, 0.3);
            color: #00ff88;
        }
        
        .status-message.warning {
            background: rgba(255, 165, 0, 0.1);
            border: 1px solid rgba(255, 165, 0, 0.3);
            color: #ffa500;
        }
        
        .status-message.error {
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid rgba(255, 107, 107, 0.3);
            color: #ff6b6b;
        }
        
        .status-message.info {
            background: rgba(100, 149, 237, 0.1);
            border: 1px solid rgba(100, 149, 237, 0.3);
            color: #6495ed;
        }
        
        .device-quick-list {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: auto;
            flex-wrap: wrap;
        }
        
        .device-badge {
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(255, 255, 255, 0.1);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
        }
        
        .device-badge.online .status-dot {
            color: #00ff88;
        }
        
        .device-badge.offline .status-dot {
            color: #ff6b6b;
        }
        
        .device-count {
            opacity: 0.7;
            font-size: 0.8em;
        }
        
        .status-dot {
            font-size: 0.5em;
        }
    `,document.head.appendChild(e)}ci();let w=null;function li(){window.toggleAuthMode=Mo,window.signOut=Ao,window.updateUI=ne,window.switchSection=ro,window.toggleMobileMenu=vi,window.toggleMobileMore=bi,window.showNotification=s,window.showModal=Ei,window.closeModal=io,window.searchFriends=en,window.sendFriendRequest=tn,window.acceptFriendRequest=Pa,window.declineFriendRequest=Ta,window.updateFriendPermission=on,window.removeFriend=an,window.sendMessage=rn,window.handleChatEnter=La,window.showHydrationReminder=cn,window.checkInLocation=$a,window.callUber=Aa,window.callEmergency=Na,window.selectBuddy=Fa,window.showFirstAid=qa,window.updateProfile=Wa,window.changePassword=za,window.saveEmergencyInfo=Ha,window.savePrivacySettings=Ua,window.exportData=Oa,window.pairDeviceFromModal=Ga,window.resolvePermission=Va,window.logDrink=Za,window.toggleChart=er,window.toggleTimeRange=tr,window.removeDrink=Xa,window.showEmergencyReport=nr,window.copyEmergencyReport=pn,window.downloadEmergencyReport=or,window.shareEmergencyReport=ar,window.clearDrinkHistory=rr,window.deleteAccount=ja,window.deleteMessage=Ma,window.loadChatMessages=sn,w&&(window.createParty=w.createParty,window.joinParty=w.joinParty,window.leaveParty=w.leaveParty,window.deleteParty=w.deleteParty,window.sendPartyMessage=w.sendPartyMessage,window.getPartyByCode=w.getPartyByCode,window.getNearbyParties=w.getNearbyParties,window.getFriendsParties=w.getFriendsParties,window.updatePartyDisplay=z,window.kickMember=w.kickMember,window.updatePartySettings=w.updatePartySettings,window.togglePartyLock=w.togglePartyLock,window.switchToParty=w.switchToParty,window.getUserParties=()=>w.userParties),window.createNewParty=Wr,window.joinPartyByCode=zr,window.leaveCurrentParty=Hr,window.sendPartyChat=Ur,window.refreshPublicParties=jr,window.joinPublicParty=oo,window.isDeveloper=q,window.startGame=cr,window.closeGame=ze,window.nextNeverHaveIEver=zn,window.showTruth=jn,window.showDare=On,window.drawCard=Zn,window.addScore=Rn,window.resetBeerPong=qn,window.toggleFlipTimer=Xn,window.resetFlipTimer=eo,window.nextTrivia=mt,window.answerTrivia=to,window.addPlayer=gn,window.removePlayer=fn,window.resetToPlayerSetup=hn,window.startNeverHaveIEver=Wn,window.startTruthOrDare=Hn,window.nextTurnTruthOrDare=Un,window.startWouldYouRather=Gn,window.nextWouldYouRather=dt,window.voteWouldYouRather=_n,window.startMostLikelyTo=Vn,window.nextMostLikelyTo=ut,window.showVotes=Yn,window.startSpinBottle=Kn,window.spinBottle=Jn,window.showBeerPongRules=kn,window.showBeerPongGame=ct,window.showBeerPongTournament=lt,window.setupTournament=xn,window.startTournament=En,window.selectWinner=Bn,window.resetTournament=Dn,window.startNormalBeerPong=Pn,window.startSpecialBeerPong=Sn,window.startGameWithNames=Ln,window.hitCup=$n,window.closeRuleDisplay=An,window.resetSpecialGame=Nn,window.selectGameCategory=bn,window.changeCategoryMidGame=wn,window.selectSpecialBeerPongCategory=Tn,window.getActiveLocations=it,window.createLocationMap=ln,window.initializeLocationMap=dn,window.updateFriendRequests=nn,window.updateFriendsList=at,window.escapeHtml=J,window.updateAchievements=He,window.updateAchievementProgress=fe,window.checkAchievements=Fr,window.pairDeviceById=qt,window.unpairDevice=Wt,window.renameDevice=zt,window.pairBoozeLensDevice=Se,window.unpairBoozeLensDevice=Qe,window.renameBoozeLensDevice=Ze,window.refreshBoozeLensDevices=Vo,window.refreshPhotoFeed=yt,window.filterPhotos=ti,window.toggleLike=Vr,window.addComment=Yr,window.deletePhoto=Kr,window.updateBoozeLensStatus=gt,window.showBoozeLensUploadNotification=si,window.viewPhoto=ni,window.showComments=oi,window.sharePhoto=ai,window.handleBoozeLensUpload=ao,console.log("✅ All functions exposed globally including party functions")}class di{constructor(){this.initialized=!1,this.handlers=new Map,this.moduleReady=!1}async init(){this.initialized||(console.log("🎯 Initializing Party Event Manager"),await this.waitForModule(),this.setupEventDelegation(),this.setupFormHandlers(),this.initialized=!0,console.log("✅ Party Event Manager initialized"))}async waitForModule(){let n=0;for(;!window.Parties&&n<50;)await new Promise(o=>setTimeout(o,100)),n++;if(!window.Parties)throw new Error("Party module failed to load");this.moduleReady=!0}setupEventDelegation(){this.delegationHandler&&document.removeEventListener("click",this.delegationHandler),this.delegationHandler=async t=>{const n={"#createPartyBtn":()=>this.handleCreateParty(),"#joinPartyBtn":()=>this.handleJoinParty(),"#leavePartyBtn":()=>this.handleLeaveParty(),"#sendPartyChatBtn":()=>this.handleSendChat(),"#refreshPartiesBtn":()=>this.handleRefreshParties(),"#refreshFriendsPartiesBtn":()=>this.handleRefreshFriendsParties(),'[data-action="join-public-party"]':o=>this.handleJoinPublicParty(o.dataset.partyCode)};for(const[o,a]of Object.entries(n)){const r=t.target.closest(o);if(r){if(t.preventDefault(),t.stopPropagation(),!this.moduleReady){s("App still loading, please wait...","warning");return}try{await a(r)}catch(i){console.error("Event handler error:",i),s("An error occurred. Please try again.","error")}break}}},document.addEventListener("click",this.delegationHandler)}setupFormHandlers(){const t=document.getElementById("partyChatInput");t&&t.addEventListener("keypress",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),this.handleSendChat())});const n=document.getElementById("partyPrivacy"),o=document.getElementById("partyDuration");n&&o&&n.addEventListener("change",a=>{const r=o.querySelector('option[value="ongoing"]');r&&(a.target.value==="public"?(r.style.display="none",o.value==="ongoing"&&(o.value="24h")):r.style.display="")})}async handleCreateParty(){if(!x()){s("Please sign in to create a party","error");return}const t=document.getElementById("partyName"),n=document.getElementById("partyPrivacy"),o=document.getElementById("partyDuration"),a=document.getElementById("partyAddress");if(!t?.value.trim()){s("Please enter a party name","error");return}const r={privacy:n?.value||"private",duration:o?.value||"24h",address:a?.value||""};try{const i=await w.createParty(t.value.trim(),r);i.success?(s(`Party created! Code: ${i.code}`,"success"),t.value="",a&&(a.value=""),z()):s(i.error||"Failed to create party","error")}catch(i){console.error("Create party error:",i),s("Failed to create party","error")}}async handleJoinParty(){if(!x()){s("Please sign in to join a party","error");return}const t=document.getElementById("joinPartyCode");if(!t?.value.trim()){s("Please enter a party code","error");return}const n=t.value.trim().toUpperCase();try{s("Checking party...","info");const o=await w.getPartyByCode(n);if(!o){s("Invalid party code","error");return}const a=Object.keys(o.members||{}).length,r=`Join "${o.name}"?
👥 ${a} members
🔒 Privacy: ${o.privacy||"Unknown"}
📍 ${o.address||"No location set"}
⏱️ ${o.duration==="24h"?"24 hour party":"Ongoing party"}`;if(!confirm(r))return;const i=await w.joinParty(n);i.success?(i.pending?s("Join request sent! Waiting for approval.","info"):i.alreadyMember?s("Rejoined party!","success"):s("Joined party!","success"),t.value="",z()):s(i.error||"Failed to join party","error")}catch(o){console.error("Join party error:",o),s("Failed to join party","error")}}async handleLeaveParty(){const t=w.currentParty,n=x();if(!t)return;const o=n&&t.creatorId===n.uid;if(confirm(o?"Delete this party? This will remove all members.":"Leave this party?"))try{const r=o?await w.deleteParty():await w.leaveParty();r.success?(s(o?"Party deleted":"Left party","info"),z()):s(r.error||"Operation failed","error")}catch(r){console.error("Leave/delete party error:",r),s("Operation failed","error")}}async handleSendChat(){const t=document.getElementById("partyChatInput");if(t?.value.trim())try{(await w.sendPartyMessage(t.value.trim())).success&&(t.value="")}catch(n){console.error("Send chat error:",n),s("Failed to send message","error")}}async handleRefreshParties(){const t=document.getElementById("publicPartiesList");if(t){t.innerHTML='<p style="opacity: 0.7;">Loading parties...</p>';try{const n=await w.getNearbyParties();if(n.length===0){t.innerHTML='<p style="opacity: 0.7;">No public parties found. Create one!</p>';return}const o=document.createElement("template");o.innerHTML=`
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">🎉</div>
                        <div class="friend-details">
                            <h4 data-party-name></h4>
                            <p style="opacity: 0.7;" data-party-details>
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-primary" data-action="join-public-party" data-join-btn>
                        Join
                    </button>
                </div>
            `,t.innerHTML="",n.forEach(a=>{const r=o.content.cloneNode(!0);r.querySelector("[data-party-name]").textContent=a.name;const i=`👥 ${a.memberCount} members`+(a.address?` • 📍 ${a.address}`:"")+(a.duration==="24h"?" • ⏰ 24h party":"");r.querySelector("[data-party-details]").textContent=i,r.querySelector("[data-join-btn]").setAttribute("data-party-code",a.code),t.appendChild(r)})}catch(n){console.error("Refresh parties error:",n),t.innerHTML='<p style="opacity: 0.7;">Failed to load parties</p>'}}}async handleRefreshFriendsParties(){const t=document.getElementById("friendsPartiesList");if(t){t.innerHTML=`<p style="opacity: 0.7;">Loading friends' parties...</p>`;try{const n=await w.getFriendsParties();if(n.length===0){t.innerHTML=`<p style="opacity: 0.7;">No friends' parties found.</p>`;return}const o=document.createElement("template");o.innerHTML=`
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">🎉</div>
                        <div class="friend-details">
                            <h4 data-party-name></h4>
                            <p style="opacity: 0.7;" data-party-details>
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-primary" data-action="join-public-party" data-join-btn>
                        Join
                    </button>
                </div>
            `,t.innerHTML="",n.forEach(a=>{const r=o.content.cloneNode(!0);r.querySelector("[data-party-name]").textContent=a.name;const i=`👤 by ${a.creatorName} • 👥 ${a.memberCount} members`+(a.address?` • 📍 ${a.address}`:"")+(a.duration==="24h"?" • ⏰ 24h party":"");r.querySelector("[data-party-details]").textContent=i,r.querySelector("[data-join-btn]").setAttribute("data-party-code",a.code),t.appendChild(r)})}catch(n){console.error("Refresh friends parties error:",n),t.innerHTML=`<p style="opacity: 0.7;">Failed to load friends' parties</p>`}}}async handleJoinPublicParty(t){if(t)try{const n=await w.joinParty(t,!0);n.success?(s("Joined party!","success"),z(),await this.handleRefreshParties()):s(n.error||"Failed to join party","error")}catch(n){console.error("Join public party error:",n),s("Failed to join party","error")}}destroy(){this.delegationHandler&&document.removeEventListener("click",this.delegationHandler),this.handlers.clear(),this.initialized=!1}}const $t=new di;document.addEventListener("DOMContentLoaded",async()=>{console.log("🚀 Starting BoozeLens app initialization...");try{if(setTimeout(()=>{const a=document.getElementById("mobileLoadingScreen");a&&(a.classList.add("hide"),setTimeout(()=>{a.style.display="none"},500))},1500),!Eo()){console.error("Firebase failed to initialize!"),s("❌ Failed to connect to Firebase","error");return}console.log("✅ Firebase initialized"),w=Ct,window.Parties=Ct,console.log("✅ Party module references set"),li(),console.log("✅ Global functions exposed"),await $t.init().catch(a=>{console.error("Failed to initialize party event manager:",a),s("Party features may not work properly","warning")}),console.log("✅ Party event manager initialized"),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(a=>{if(a.length>0){a.forEach(r=>{r.unregister(),console.log("Unregistered old service worker:",r.scope)}),setTimeout(()=>{window.location.reload()},1e3);return}});try{Bt&&Bt().catch(a=>{console.warn("Service worker registration failed:",a)}),Dt&&Dt(),Pt&&Pt()}catch(a){console.warn("PWA initialization error (non-critical):",a)}const t=document.getElementById("authForm");t&&t.addEventListener("submit",$o),No(ui),wi(),setInterval(()=>{ki()},500),window.lastDrinkTime=null,window.hydrationTimerInterval=null,window.hydrationTargetTime=null,window.startHydrationCountdown=function(){window.hydrationTargetTime=Date.now()+1800*1e3,window.hydrationTimerInterval&&clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=setInterval(()=>{const a=Date.now();if(!window.lastDrinkTime||a-window.lastDrinkTime>10800*1e3){clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=null,window.hydrationTargetTime=null,ne();return}a>=window.hydrationTargetTime&&(cn(),window.hydrationTargetTime=a+1800*1e3),ne()},6e4),ne()},ir();const n=document.getElementById("drinkType");n&&n.addEventListener("change",function(){const a=te[this.value];document.getElementById("drinkAmount").value=a.amount,document.getElementById("alcoholPercent").value=a.alcohol}),document.querySelectorAll(".toggle-switch input").forEach(a=>{a.addEventListener("change",function(){const r=this.closest(".toggle-switch");this.checked?r.classList.add("active"):r.classList.remove("active")})}),window.onclick=a=>{a.target.className==="modal show"&&io(),a.target.className==="game-overlay show"&&ze()},window.addEventListener("beforeunload",()=>{We(),$t.destroy()}),window.addEventListener("unhandledrejection",a=>{console.error("Unhandled promise rejection:",a.reason),a.reason&&a.reason.code&&a.reason.code.includes("auth")&&s("⚠️ Authentication issue. Try refreshing.","error")});let o=0;window.addEventListener("scroll",()=>{const a=document.querySelector("nav"),r=window.pageYOffset;a&&(r>50?a.classList.add("scrolled"):a.classList.remove("scrolled")),o=r}),console.log("✅ App initialization complete!")}catch(e){console.error("❌ App initialization failed:",e),s("Failed to initialize app","error")}});async function ui(e){console.log("User authenticated:",e.email);try{To(),await Ro(e),Fo(),await Ht(),Or(),Ar(),mi(),Ci(),qr(),At(),ne(),await ro("dashboard"),await w.loadUserParties(),z(),sn(),setInterval(At,3600*1e3);const n=b().userData.username||e.email.split("@")[0];s(`🎉 Welcome, ${n}!`,"success"),console.log("🔑 Your Firebase UID:",e.uid),q(e.uid)?(console.log("✅ You have developer rights!"),s("🛠️ Developer mode active","info"),Ye(!0),window.addTestBACToFirebase=Ka,window.removeTestBACFromFirebase=Ja,window.setupDevelopersInFirebase=Ya,console.log("🔧 Developer test functions enabled: addTestBACToFirebase(), removeTestBACFromFirebase(), setupDevelopersInFirebase()")):(console.log("💡 To get developer rights, add this UID to DEVELOPER_UIDS in constants.js"),Ye(!1))}catch(t){console.error("Error during authentication:",t),s("⚠️ Error loading profile","error")}}function mi(){const e=k(),t=x();!e||!t||(W(y(e,"users/"+t.uid+"/friends"),n=>{const o=n.val()||{};D("friendsData",o),at(),document.getElementById("friendCount").textContent=Object.keys(o).length,Object.keys(o).forEach(a=>{pi(a)})}),W(y(e,"friendRequests/"+t.uid),n=>{const o=n.val()||{},a=Object.entries(o).map(([r,i])=>({id:r,...i}));D("friendRequests",a),nn()}),W(y(e,".info/connected"),n=>{const o=n.val();xi(o)}),W(y(e,"chat"),n=>{const o=document.getElementById("chatMessages");if(o&&(o.innerHTML=`
            <div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! Stay safe and have fun! 🎉</div>
            </div>
        `,n.exists())){const a=[];n.forEach(i=>{a.push({id:i.key,...i.val()})}),a.sort((i,c)=>(i.timestamp||0)-(c.timestamp||0)),a.slice(-50).forEach(i=>{const c=document.createElement("div");c.className="chat-message",c.style.position="relative",i.isDeveloper;const l=q(t.uid)?`<button onclick="deleteMessage('${i.id}')" style="position: absolute; right: 10px; top: 5px; background: rgba(255,68,68,0.2); border: 1px solid rgba(255,68,68,0.5); color: #ff4444; padding: 2px 8px; border-radius: 5px; cursor: pointer; font-size: 0.8em;">×</button>`:"",d=document.createElement("template");d.innerHTML=`
                    <div class="chat-author" data-author></div>
                    <div data-message></div>
                `;const m=d.content.cloneNode(!0);m.querySelector("[data-author]").textContent=(i.username||"Anonymous")+(i.isDeveloper?" 🛠️":""),m.querySelector("[data-message]").textContent=i.message||"",l?(c.innerHTML=l,c.appendChild(m)):(c.innerHTML="",c.appendChild(m)),o.appendChild(c)}),o.scrollTop=o.scrollHeight}}))}function pi(e){const t=k();(b().friendsData[e]?.permission||"observer")!=="none"&&W(y(t,"users/"+e),a=>{const r=a.val();r&&yi(e,r)})}function yi(e,t){const o=b().friendsData[e]?.permission||"observer";(o==="guardian"||o==="buddy")&&Object.keys(t.devices||{}).forEach(a=>{let r=b().partyData;r[a]||(r[a]={name:t.username,bac:0,lastUpdate:Date.now(),location:"Unknown",trend:"steady",history:[],isFriend:!0,friendId:e,permission:o},D("partyData",r)),gi(a)})}function At(){const e=b().partyData||{},t={};Object.entries(e).forEach(([n,o])=>{Date.now()-o.lastUpdate<1440*60*1e3&&(t[n]=o)}),D("partyData",t)}function gi(e){const t=k();W(y(t,"readings/"+e),n=>{const o=n.val();o&&fi(e,o)})}function fi(e,t){let n=b().partyData||{};const o=b().userData;n[e]||(n[e]={name:o.username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const a=n[e].bac;n[e].bac=t.bac||0,n[e].lastUpdate=Date.now(),n[e].trend=t.bac>a?"up":t.bac<a?"down":"steady",n[e].history.push({time:Date.now(),value:t.bac}),n[e].history.length>50&&n[e].history.shift(),D("partyData",n),ne(),Date.now()-t.timestamp<300*1e3&&t.bac>=.08&&s(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}async function hi(e){return await(await fetch(`./src/html/sections/${e}.html`)).text()}async function ro(e){try{const t=document.getElementById("section-container"),n=document.getElementById(e);if(n)document.querySelectorAll(".section").forEach(r=>r.classList.remove("active")),n.classList.add("active");else{document.querySelectorAll(".section").forEach(c=>c.classList.remove("active"));const r=await hi(e);t.innerHTML=r;const i=t.querySelector(".section");i&&i.classList.add("active")}document.querySelectorAll(".nav-item").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".nav-item").forEach(r=>{r.onclick&&r.onclick.toString().includes(e)&&r.classList.add("active")});const a=document.getElementById("navMenu");a&&a.classList.remove("show"),e==="achievements"?He():e==="drinks"?(Fe(),ke(),we(),qe()):e==="friends"?at():e==="photos"?yt():e==="settings"?mn():(e==="parties"||e==="dashboard")&&(z(),e==="parties"&&document.querySelector('button[onclick*="refreshPublicParties"]')?.click())}catch(t){console.error("Section switch failed:",t)}}function vi(){const e=document.getElementById("navMenu");e&&e.classList.toggle("show")}function bi(){const e=document.getElementById("mobileMoreMenu"),t=document.getElementById("mobileMoreBackdrop");e&&t&&(e.classList.contains("active")?(e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow=""):(e.classList.add("active"),t.classList.add("active"),document.body.style.overflow="hidden"))}function wi(){try{const e=document.getElementById("particles");if(!e)return;for(let t=0;t<50;t++){const n=document.createElement("div");n.className="particle",n.style.left=Math.random()*100+"%",n.style.animationDelay=Math.random()*20+"s",n.style.animationDuration=15+Math.random()*10+"s",e.appendChild(n)}}catch(e){console.error("Particle creation failed:",e)}}function ki(){const e=document.getElementById("visualizer");if(!(!e||!document.getElementById("dashboard").classList.contains("active"))){if(e.children.length===0)for(let t=0;t<20;t++){const n=document.createElement("div");n.className="bar",e.appendChild(n)}e.querySelectorAll(".bar").forEach(t=>{const n=Math.random()*150+20;t.style.height=n+"px"})}}function xi(e){const t=document.getElementById("connectionStatus"),n=document.querySelector(".status-dot");t&&n&&(e?(t.textContent="Connected",n.style.background="#00ff88"):(t.textContent="Offline",n.style.background="#ff4444"))}async function Ei(e,t=null){const n=document.getElementById("modal"),o=document.getElementById("modalBody");let a="";switch(e){case"pair-device":const r=b().deviceData||{};a=`
                <h2>📱 Pair New Device</h2>
                <p>After setting up your breathalyzer, enter the Device ID shown on its screen:</p>
                
                <div class="form-group" style="margin: 20px 0;">
                    <input type="text" id="modalDeviceId" placeholder="Enter Device ID (e.g., HSG_abc123)" style="text-transform: uppercase;">
                </div>
                
                <button class="btn btn-primary" onclick="pairDeviceFromModal()">
                    <i class="fas fa-link"></i> Pair Device
                </button>
                <button class="btn" onclick="closeModal()">Cancel</button>
                
                <div class="info-box" style="margin-top: 20px;">
                    <p><strong>Can't find your Device ID?</strong></p>
                    <ol>
                        <li>Power on your device</li>
                        <li>Double-flip the switch for setup mode</li>
                        <li>Connect to the device's WiFi</li>
                        <li>Complete setup to see your Device ID</li>
                    </ol>
                </div>
                
                ${Object.keys(r).length>0?`
                    <div class="paired-devices" style="margin-top: 30px;">
                        <h3>My Paired Devices</h3>
                        <div id="modalDeviceList">
                            ${Object.entries(r).map(([p,v])=>{const f=(b().partyData||{})[p];return`
                                    <div class="device-item" style="padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 10px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
                                            <div style="flex: 1;">
                                                <h4 style="margin: 0 0 5px 0;">${v.name||"My Breathalyzer"}</h4>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">ID: ${p}</p>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">Last Reading: ${f?f.bac.toFixed(3)+"‰":"No data"}</p>
                                            </div>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn" onclick="renameDevice('${p}')" title="Rename">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-danger" onclick="unpairDevice('${p}')" title="Unpair">
                                                    <i class="fas fa-unlink"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `}).join("")}
                        </div>
                    </div>
                `:""}
            `;break;case"checkin":const c=w.currentParty;a=`
                <h2>📍 Check In</h2>
                <p>Select your current location:</p>
                <div class="location-map" id="locationMap">
                    <!-- Simulated map -->
                </div>
                <div style="margin: 20px 0;">
                    ${c?`
                        <button class="btn btn-primary" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('Party: ${c.name}')">
                            <i class="fas fa-champagne-glasses"></i> ${c.name}
                        </button>
                    `:""}
                    ${["Dorm A - Room Party","Student Bar","Library Cafe","Sports Center","Main Campus","Off Campus"].map(p=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('${p}')">${p}</button>`).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Cancel</button>
            `;break;case"emergency":a=`
                <h2>🚨 Emergency Contacts</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Ambulance:</strong> 112</p>
                    <p><strong>HSG Security:</strong> +41 71 224 2424</p>
                    <p><strong>Poison Control:</strong> 145</p>
                    <p><strong>Mental Health Crisis:</strong> 143</p>
                </div>
                <button class="btn btn-danger" onclick="window.location.href='tel:112'">
                    <i class="fas fa-phone"></i> Call 112 Now
                </button>
                <button class="btn" onclick="showFirstAid()">
                    <i class="fas fa-medkit"></i> First Aid Guide
                </button>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"first-aid":a=`
                <h2>🏥 First Aid Guide</h2>
                <div class="first-aid-card">
                    <h3>Signs of Alcohol Poisoning:</h3>
                    <ul>
                        <li>Confusion, stupor</li>
                        <li>Vomiting</li>
                        <li>Seizures</li>
                        <li>Slow or irregular breathing</li>
                        <li>Unconsciousness</li>
                    </ul>
                </div>
                <div class="first-aid-card">
                    <h3>What to Do:</h3>
                    <div class="first-aid-step" data-step="1">Call 112 immediately</div>
                    <div class="first-aid-step" data-step="2">Keep them awake and sitting up</div>
                    <div class="first-aid-step" data-step="3">Give them water if conscious</div>
                    <div class="first-aid-step" data-step="4">Keep them warm</div>
                    <div class="first-aid-step" data-step="5">Stay with them</div>
                </div>
                <button class="btn btn-danger" onclick="window.location.href='tel:112'">Emergency Call</button>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"buddy-system":const l=b().partyData;a=`
                <h2>👥 Buddy System</h2>
                <p>Choose your buddy for tonight:</p>
                <div class="buddy-list">
                    ${Object.values(l).map(p=>`
                        <div class="buddy-card" onclick="selectBuddy('${p.name}')">
                            <div style="font-size: 2em; margin-bottom: 10px;">${p.isOwn?"👤":"👥"}</div>
                            <div>${p.name}</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"safe-friends":const d=b().partyData,m=Object.values(d).filter(p=>p.bac<.02);a=`
                <h2>✅ Friends Safe to Drive</h2>
                <div style="margin: 20px 0;">
                    ${m.length>0?m.map(p=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div>${p.name}</div>
                            <div>BAC: ${p.bac.toFixed(3)}‰</div>
                        </div>
                    `).join(""):"<p>No friends are currently safe to drive.</p>"}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"locations":a=`
                <h2>📍 Active Party Locations</h2>
                <div class="location-map" style="height: 400px;">
                    ${ln()}
                </div>
                <div style="margin: 20px 0;">
                    ${it().map(p=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${p.name}</strong></div>
                            <div>${p.count} people</div>
                            <div>Avg BAC: ${p.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break}o.innerHTML=a,n.classList.add("show"),(e==="checkin"||e==="locations")&&setTimeout(dn,100)}function io(){document.getElementById("modal").classList.remove("show")}function Ci(){const e=b().userData;if(e.settings){const t=e.settings;t.shareLocation!==void 0&&(document.getElementById("shareLocation").checked=t.shareLocation),t.notifications!==void 0&&(document.getElementById("notifications").checked=t.notifications),t.publicProfile!==void 0&&(document.getElementById("publicProfile").checked=t.publicProfile)}if(e.emergency){const t=e.emergency;t.homeAddress&&(document.getElementById("homeAddress").value=t.homeAddress,localStorage.setItem("homeAddress",t.homeAddress)),t.emergencyContact&&(document.getElementById("emergencyContact").value=t.emergencyContact,localStorage.setItem("emergencyContact",t.emergencyContact)),t.medicalInfo&&(document.getElementById("medicalInfo").value=t.medicalInfo,localStorage.setItem("medicalInfo",t.medicalInfo)),t.safetyNotes&&(document.getElementById("safetyNotes").value=t.safetyNotes,localStorage.setItem("safetyNotes",t.safetyNotes))}mn()}function z(){fa(w)}function Ii(e){const t=document.getElementById("partyChat");if(!t)return;const n=document.createElement("template");n.innerHTML=`
        <div style="margin-bottom: 10px;">
            <strong style="color: #00ff88;" data-username></strong>
            <span data-message></span>
            <span style="opacity: 0.5; font-size: 0.8em; margin-left: 10px;" data-timestamp></span>
        </div>
    `,t.innerHTML="",e.forEach(o=>{const a=n.content.cloneNode(!0);a.querySelector("[data-username]").textContent=(o.userName||"Anonymous")+":",a.querySelector("[data-message]").textContent=o.message||"",a.querySelector("[data-timestamp]").textContent=new Date(o.timestamp).toLocaleTimeString(),t.appendChild(a)}),t.scrollTop=t.scrollHeight}async function Bi(){const e=document.getElementById("partyLeaderboard");if(!e||!w||!w.currentParty)return;e.innerHTML='<p style="opacity: 0.7;">Loading leaderboard...</p>';const t=await w.getPartyLeaderboard();if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No BAC data yet</p>';return}const n=document.createElement("template");n.innerHTML=`
        <div class="friend-item" style="margin-bottom: 10px;">
            <div class="friend-info">
                <div style="font-size: 2em; margin-right: 15px;" data-badge></div>
                <div class="friend-avatar-small" data-avatar></div>
                <div class="friend-details">
                    <h4 data-name></h4>
                    <p style="opacity: 0.7;" data-bac></p>
                </div>
            </div>
        </div>
    `,e.innerHTML="",t.forEach((o,a)=>{const r=a+1;let i="";r===1?i="🥇":r===2?i="🥈":r===3&&(i="🥉");const c=n.content.cloneNode(!0);c.querySelector("[data-badge]").textContent=i||r,c.querySelector("[data-avatar]").textContent=o.role==="creator"?"👑":"👤",c.querySelector("[data-name]").textContent=o.name,c.querySelector("[data-bac]").textContent=`BAC: ${o.bac.toFixed(3)}‰`,e.appendChild(c)})}async function Di(e,t){const n=await w.handleJoinRequest(e,t);n.success?(s(t?"Request approved!":"Request declined","success"),z()):s(n.error||"Failed to handle request","error")}async function Pi(e,t){const n=`Kick ${t} from the party?`;if(!confirm(n))return;const o=prompt("Reason for kick (optional):")||"",a=await w.kickMember(e,o);a.success?(s(`${t} has been removed from the party`,"info"),z()):s(a.error||"Failed to kick member","error")}async function Si(){if(!w.currentParty)return;const e=w.currentParty.locked;if(!confirm(e?"Unlock the party? New members will be able to join.":"Lock the party? No new members will be able to join."))return;const n=await w.togglePartyLock(!e);n.success?(s(n.locked?"Party locked":"Party unlocked","info"),z()):s(n.error||"Failed to update party lock","error")}function Ti(){const e=w.currentParty;if(!e)return;const t=prompt("Party name:",e.name);t&&t!==e.name&&w.updatePartySettings({name:t}).then(n=>{n.success?(s("Party name updated","success"),z()):s(n.error||"Failed to update","error")})}function Ye(e){const t=document.getElementById("chatInput"),n=document.querySelector(".chat-input button");t&&n&&(e?(t.placeholder="Type a message... (Dev mode 🛠️)",t.disabled=!1,n.disabled=!1,t.style.opacity="1",n.style.opacity="1"):(t.placeholder="Chat is read-only (Developers only)",t.disabled=!0,n.disabled=!0,t.style.opacity="0.5",n.style.opacity="0.5"))}async function Li(e){const t=x();if(!t||!q(t.uid)){s("Not authorized","error");return}const n=k();if(n)try{await M(y(n,`chat/${e}`)),s("Message deleted","info")}catch(o){console.error("Delete message error:",o),s("Failed to delete message","error")}}window.updatePartyDisplay=z;window.updatePartyChat=Ii;window.updatePartyLeaderboard=Bi;window.handlePartyRequest=Di;window.kickMemberFromParty=Pi;window.updateChatUIForDeveloper=Ye;window.deleteMessage=Li;async function Mi(e){const t=x();if(!t||!q(t.uid)){s("Not authorized","error");return}if(confirm("Developer action: Delete this party permanently?"))try{const n=await w.deleteParty(e);n.success?(s("Party deleted","success"),window.refreshPublicParties&&window.refreshPublicParties()):s(n.error||"Failed to delete party","error")}catch{s("Failed to delete party","error")}}window.deletePartyAsDev=Mi;window.switchToParty=e=>{w&&w.switchToParty&&w.switchToParty(e)};window.togglePartyLockUI=Si;window.editPartySettings=Ti;
//# sourceMappingURL=index-CwuTLwlb.js.map
