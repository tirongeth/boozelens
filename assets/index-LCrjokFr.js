import{getApps as It,initializeApp as yn}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getAuth as gn,signInWithEmailAndPassword as fn,createUserWithEmailAndPassword as vn,onAuthStateChanged as bn,signOut as wn}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";import{getDatabase as kn,push as Me,ref as h,set as T,get as A,update as xn,remove as q,onValue as H,serverTimestamp as G,off as zt}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";import{getStorage as In,ref as Ut,deleteObject as Cn,uploadBytes as Bn,getDownloadURL as En}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";import{getFunctions as Sn,httpsCallable as Ne}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();const Dn={apiKey:"AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg",authDomain:"hsg-party-tracker.firebaseapp.com",databaseURL:"https://hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app",projectId:"hsg-party-tracker",storageBucket:"hsg-party-tracker.firebasestorage.app",messagingSenderId:"1047483086606",appId:"1:1047483086606:web:a02d77baacd21166fb095f",measurementId:"G-VFS4W30Z7P"};let re=null,S=null,B=null,_e=null,Ke=null,Ct=!1;function Pn(){if(Ct)return console.log("Firebase already initialized"),!0;try{return It().length?re=It()[0]:re=yn(Dn),S=gn(re),B=kn(re),_e=In(re),Ke=Sn(re),Ct=!0,console.log("✅ Firebase initialized successfully"),!0}catch(e){return console.error("❌ Firebase initialization error:",e),typeof window<"u"&&window.showNotification&&window.showNotification("Failed to connect to Firebase","error"),!1}}function Xe(){return S||(console.error("Firebase Auth not initialized. Call initializeFirebase() first."),null)}function k(){return B||(console.error("Firebase Database not initialized. Call initializeFirebase() first."),null)}function Gt(){return _e||(console.error("Firebase Storage not initialized. Call initializeFirebase() first."),null)}function $e(){return Ke||(console.error("Firebase Functions not initialized. Call initializeFirebase() first."),null)}const C=(e,t)=>{const o=k();return o?typeof e=="string"?h(o,e):t!==void 0?h(e,t):h(o,e):null},Bt=(e,t)=>{if(e)return H(e,t)},we=(e,t)=>e?T(e,t):Promise.reject("No ref provided"),R=e=>e?A(e):Promise.reject("No ref provided"),et=(e,t)=>e?Me(e,t):null,se=(e,t)=>e?xn(e,t):Promise.reject("No ref provided"),Te=e=>e?q(e):Promise.reject("No ref provided"),ke={currentUser:null,userData:{},partyData:{},partyStartTime:Date.now(),deviceData:{},friendsData:{},friendRequests:[],currentGame:null,gameScores:{team1:0,team2:0},achievements:{firstTimer:!0,responsible:!1,gameMaster:!1,partyAnimal:!1,guardianAngel:!1,hydroHomie:!1,danceMachine:!1,sunriseWarrior:!1},userAchievements:{},locationHistory:[],drinkHistory:[],chartVisible:!0,isSignUp:!1,isInitialized:!1};function b(){return ke}function $(e){return ke[e]}function P(e,t){ke[e]=t}function Et(e){ke.currentUser=e}function x(){return ke.currentUser}const ie={NETWORK:"network",AUTH:"auth",DATABASE:"database",VALIDATION:"validation",UNKNOWN:"unknown"},Be={"network/offline":"You appear to be offline. Please check your internet connection.","network/timeout":"The request took too long. Please try again.","network/server-error":"Server is having issues. Please try again later.","auth/invalid-email":"Please enter a valid email address.","auth/user-disabled":"This account has been disabled.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/email-already-in-use":"An account already exists with this email.","auth/weak-password":"Password should be at least 6 characters.","auth/invalid-credential":"Invalid login credentials. Please try again.","auth/too-many-requests":"Too many failed attempts. Please try again later.","auth/network-request-failed":"Network error. Please check your connection.","database/permission-denied":"You don't have permission to perform this action.","database/disconnected":"Lost connection to database. Reconnecting...","database/write-failed":"Failed to save data. Please try again.",unknown:"Something went wrong. Please try again."};function j(e,t=""){console.error(`Error in ${t}:`,e);const o=Tn(e),n=Ln(e),a=Wn(n,e);return qn(a),{type:o,code:n,message:a,originalError:e}}function Tn(e){return e?e.code==="network-request-failed"||e.message?.includes("network")||e.message?.includes("fetch")?ie.NETWORK:e.code?.startsWith("auth/")?ie.AUTH:e.code?.startsWith("database/")||e.code==="permission-denied"?ie.DATABASE:e.name==="ValidationError"?ie.VALIDATION:ie.UNKNOWN:ie.UNKNOWN}function Ln(e){return e?.code?e.code:e?.message?.includes("network")?"network/offline":e?.message?.includes("permission")?"database/permission-denied":"unknown"}function Wn(e,t){if(Be[e])return Be[e];if(t?.message&&typeof t.message=="string"){const o=t.message.replace(/Firebase: /g,"").replace(/Error \(auth\/[^)]+\): /g,"").replace(/\.$/,"");return o.includes("(")||o.includes(")")||o.length>100?Be.unknown:o}return Be.unknown}function qn(e,t){window.showNotification?window.showNotification(e,"error"):alert(`Error: ${e}`)}window.addEventListener("online",()=>{window.showNotification&&window.showNotification("Back online!","success")});window.addEventListener("offline",()=>{window.showNotification&&window.showNotification("You are offline. Some features may not work.","warning")});function Mn(e,t,o){const n=[];switch(t){case"email":e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||n.push("Please enter a valid email address"):n.push(`${o} is required`);break;case"password":e?e.length<6&&n.push("Password must be at least 6 characters"):n.push(`${o} is required`);break;case"username":e?e.length<3?n.push("Username must be at least 3 characters"):/^[a-zA-Z0-9_]+$/.test(e)||n.push("Username can only contain letters, numbers, and underscores"):n.push(`${o} is required`);break;case"deviceId":e?e.match(/^HSG_[a-zA-Z0-9]+$/)||n.push("Device ID must start with HSG_ followed by letters/numbers"):n.push(`${o} is required`);break}return n}let Pe=!1;function Nn(){document.getElementById("authContainer").style.display="flex",document.getElementById("userProfile").style.display="none",document.querySelector(".container").style.display="none"}function $n(){document.getElementById("authContainer").style.display="none",document.getElementById("userProfile").style.display="block",document.querySelector(".container").style.display="block"}function pe(e){const t=document.getElementById("authError");t.textContent=e,t.classList.add("show"),he(),setTimeout(()=>{t.classList.remove("show")},5e3)}function An(){document.getElementById("authLoading").classList.add("show"),document.getElementById("authSubmitBtn").disabled=!0}function he(){document.getElementById("authLoading").classList.remove("show"),document.getElementById("authSubmitBtn").disabled=!1}function Rn(){Pe=!Pe,Pe?(document.getElementById("authTitle").textContent="Create Your Account",document.getElementById("authButton").textContent="Sign Up",document.getElementById("usernameGroup").style.display="block",document.getElementById("authToggleText").textContent="Already have an account?",document.getElementById("authToggleLink").textContent="Login"):(document.getElementById("authTitle").textContent="Welcome Back",document.getElementById("authButton").textContent="Login",document.getElementById("usernameGroup").style.display="none",document.getElementById("authToggleText").textContent="Don't have an account?",document.getElementById("authToggleLink").textContent="Sign up")}async function Fn(e){e.preventDefault();const t=document.getElementById("authEmail").value.trim(),o=document.getElementById("authPassword").value,n=document.getElementById("authUsername").value.trim();if(!t||!o){pe("Please fill in all fields");return}if(o.length<6){pe("Password must be at least 6 characters");return}An();try{const a=Xe(),r=k();if(!Pe)await fn(a,t,o),Le("✅ Welcome back!","success");else{if(!n||n.length<3){pe("Username must be at least 3 characters"),he();return}if((await R(C(r,"usernames/"+n.toLowerCase()))).exists()){pe("Username already taken"),he();return}const l=(await vn(a,t,o)).user;await we(C(r,"users/"+l.uid),{username:n,email:t,createdAt:new Date().toISOString(),devices:{},friends:{},achievements:{},settings:{notifications:!0,shareLocation:!1,publicProfile:!0}}),await we(C(r,"usernames/"+n.toLowerCase()),l.uid),Le("✅ Account created successfully!","success")}he()}catch(a){he();const r=j(a,"Authentication");pe(r.message)}}async function Hn(){try{const e=Xe();await wn(e),Le("👋 Signed out successfully"),location.reload()}catch(e){const t=j(e,"Sign Out");Le(t.message,"error")}}function zn(e){const t=Xe();bn(t,o=>{o?(Et(o),e(o)):(Et(null),Nn())})}async function Un(e){try{const t=k(),n=(await R(C(t,"users/"+e.uid))).val()||{},a=n.username||e.email.split("@")[0];document.getElementById("profileName").textContent=a,document.getElementById("profileEmail").textContent=e.email,document.querySelectorAll(".settings-username-display").forEach(i=>i.textContent=a),document.querySelectorAll(".settings-email-display").forEach(i=>i.textContent=e.email),document.getElementById("username").value=n.username||"",document.getElementById("emailDisplay").value=e.email,document.getElementById("linkedEmail").textContent=e.email;const r=a.charAt(0).toUpperCase();return document.getElementById("profileInitial").textContent=r,P("userData",n),n}catch(t){throw console.error("Error loading user data:",t),t}}function Le(e,t="success"){const o=document.createElement("div");o.className=`notification ${t}`,o.textContent=e,o.onclick=()=>o.remove(),document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.remove()},4e3)}function s(e,t="success"){const o=document.createElement("div");o.className=`notification ${t}`,o.textContent=e,o.onclick=()=>o.remove(),document.body.appendChild(o),setTimeout(()=>{o.parentNode&&o.remove()},4e3)}window.showNotification=s;const ge={};let N=[];function Gn(){const e=x();if(!e)return;const t=k();H(h(t,"users/"+e.uid+"/devices"),o=>{const n=o.val()||{};P("deviceData",n),Vn();const a=document.getElementById("deviceCount");a&&(a.textContent=Object.keys(n).length),Object.keys(n).forEach(r=>{jn(r)})}),_t()}async function jt(){const e=document.getElementById("deviceIdInput").value.trim().toUpperCase(),t=Mn(e,"deviceId","Device ID");if(t.length>0){s(t[0],"error");return}try{const o=k(),n=x();if(!(await A(h(o,"readings/"+e))).exists()){s("❌ Device not found. Make sure it's connected.","error");return}if($("deviceData")[e]){s("ℹ️ Device already paired");return}await T(h(o,"users/"+n.uid+"/devices/"+e),{pairedAt:G(),name:"My Breathalyzer"}),document.getElementById("deviceIdInput").value="",s("✅ Device paired successfully!","success")}catch(o){const n=j(o,"Device Pairing");s(n.message,"error")}}function jn(e){if(ge[e])return;const t=k(),o=H(h(t,"readings/"+e),n=>{const a=n.val();a&&On(e,a)});ge[e]=o}function On(e,t){let o=$("partyData")||{};o[e]||(o[e]={name:$("userData").username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const n=o[e].bac;o[e].bac=t.bac||0,o[e].lastUpdate=Date.now(),o[e].trend=t.bac>n?"up":t.bac<n?"down":"steady",o[e].history.push({time:Date.now(),value:t.bac}),o[e].history.length>50&&o[e].history.shift(),P("partyData",o),window.updateUI&&window.updateUI(),Date.now()-t.timestamp<300*1e3&&t.bac>=.08&&s(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}function Vn(){const e=document.getElementById("deviceList");if(!e)return;const t=$("deviceData")||{};if(e.innerHTML="",Object.keys(t).length===0){e.innerHTML='<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';return}const o=$("partyData")||{};Object.entries(t).forEach(([n,a])=>{const r=o[n],i=document.createElement("div");i.className="device-item",i.innerHTML=`
            <div class="device-info">
                <h4>${a.name||"Breathalyzer"}</h4>
                <p>ID: ${n}</p>
                <p>Last Reading: ${r?r.bac.toFixed(3)+"‰":"No data"}</p>
            </div>
            <div>
                <button class="btn" onclick="renameDevice('${n}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="unpairDevice('${n}')">
                    <i class="fas fa-unlink"></i>
                </button>
            </div>
        `,e.appendChild(i)})}async function Ot(e){if(confirm("Unpair this device?")){const t=k(),o=x();if(await q(h(t,"users/"+o.uid+"/devices/"+e)),ge[e]){const n=k();zt(h(n,"readings/"+e),"value",ge[e]),delete ge[e]}s("🔓 Device unpaired")}}async function Vt(e){const t=$("deviceData"),o=prompt("Enter new name for device:",t[e]?.name||"My Breathalyzer");if(o){const n=k(),a=x();await T(h(n,"users/"+a.uid+"/devices/"+e+"/name"),o),s("✏️ Device renamed")}}async function _t(){try{console.log("🔧 Initializing BoozeLens devices..."),await new Promise(e=>setTimeout(e,1e3)),await xe(),Kn(),console.log("✅ BoozeLens devices initialized")}catch(e){console.error("Failed to initialize BoozeLens devices:",e)}}const Ae=()=>window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",_n="http://localhost:5001";async function Re(e,t={}){const o=`${_n}/hsg-party-tracker/us-central1/manageBoozeLensDevice`;try{const a=await(await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e,...t})})).json();return console.log("🧪 Local test server response:",a),{data:a}}catch(n){throw console.error("❌ Local test server error:",n),n}}async function xe(){try{if(Ae()){console.log("🧪 Development mode: Using local test server");try{const e=await Re("list");if(e.data.success){N=e.data.devices||[],P("boozeLensDevices",N),Ee(),Se();return}}catch{console.warn("🧪 Local test server not available, using fallback")}}else{const e=$e();if(e){const o=await Ne(e,"manageBoozeLensDevice")({action:"list"});if(o.data.success){N=o.data.devices||[],P("boozeLensDevices",N),Ee(),Se();return}}}console.warn("No device management available - showing empty list"),N=[],P("boozeLensDevices",N),Ee(),Se()}catch(e){console.warn("Error loading BoozeLens devices:",e.message),N=[],P("boozeLensDevices",N),Ee(),Se()}}async function We(e){try{if(!e||e.trim().length===0)throw new Error("Please enter a valid Device ID");const t=e.toUpperCase().trim();if(!t.startsWith("BOOZE"))throw new Error("Device ID should start with BOOZE (e.g., BOOZE12AB34)");s("📱 Pairing BoozeLens device...","info");let o;if(Ae())console.log("🧪 Development mode: Using local test server for pairing"),o=await Re("pair",{deviceId:t});else{const n=$e();o=await Ne(n,"manageBoozeLensDevice")({action:"pair",deviceId:t})}if(o.data.success)return s("✅ BoozeLens device paired successfully!","success"),await xe(),Yn(),!0;throw new Error(o.data.message||"Pairing failed")}catch(t){const o=j(t,"BoozeLens Device Pairing");return s(o.message,"error"),!1}}async function tt(e){if(!confirm("Are you sure you want to unpair this BoozeLens device? This cannot be undone."))return!1;try{let t;if(Ae())console.log("🧪 Development mode: Using local test server for unpair"),t=await Re("unpair",{deviceId:e});else{const o=$e();t=await Ne(o,"manageBoozeLensDevice")({action:"unpair",deviceId:e})}if(t.data.success)return s("📱 BoozeLens device unpaired","info"),await xe(),!0;throw new Error(t.data.message||"Unpair failed")}catch(t){const o=j(t,"BoozeLens Device Unpair");return s(o.message,"error"),!1}}async function ot(e,t){try{if(!t||t.trim().length===0)throw new Error("Please enter a valid nickname");let o;if(Ae())console.log("🧪 Development mode: Using local test server for rename"),o=await Re("rename",{deviceId:e,nickname:t.trim()});else{const n=$e();o=await Ne(n,"manageBoozeLensDevice")({action:"rename",deviceId:e,nickname:t.trim()})}if(o.data.success)return s("📝 BoozeLens device renamed","success"),await xe(),!0;throw new Error(o.data.message||"Rename failed")}catch(o){const n=j(o,"BoozeLens Device Rename");return s(n.message,"error"),!1}}function Kn(){document.addEventListener("click",async t=>{const o=t.target;if(o.id==="pairBoozeLensDeviceBtn"){t.preventDefault();const n=document.getElementById("boozeLensDeviceIdInput");n&&await We(n.value)}if(o.classList.contains("unpair-boozelens-device-btn")){t.preventDefault();const n=o.dataset.deviceId;n&&await tt(n)}if(o.classList.contains("rename-boozelens-device-btn")){t.preventDefault();const n=o.dataset.deviceId,a=o.dataset.currentNickname,r=prompt("Enter new nickname:",a);r&&r!==a&&await ot(n,r)}});const e=document.getElementById("boozeLensDevicePairForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("boozeLensDeviceIdInput");o&&await We(o.value)})}function Ee(){const e=document.getElementById("boozeLensDeviceList");if(console.log("📱 Updating BoozeLens device list, container found:",!!e),!e){console.warn("⚠️ boozeLensDeviceList container not found!");return}if(N.length===0){e.innerHTML=`
            <div class="device-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 3em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No BoozeLens devices paired yet.</p>
                <p style="opacity: 0.5;">Pair your first device below!</p>
            </div>
        `;return}e.innerHTML=N.map(t=>{const o=t.lastSeen?Jn(t.lastSeen):"Never",n=Zn(t.lastSeen),a=Fe(t.lastSeen);return`
            <div class="boozelens-device-card" data-device-id="${t.deviceId}">
                <div class="device-header">
                    <div class="device-info">
                        <div class="device-icon">
                            <i class="fas fa-camera-retro"></i>
                        </div>
                        <div class="device-details">
                            <h4>${t.nickname}</h4>
                            <p class="device-id">${t.deviceId}</p>
                            <p class="device-status" style="color: ${n}">
                                <i class="fas fa-circle" style="font-size: 0.6em;"></i>
                                ${a?"Online":"Offline"} • Last seen ${o}
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
                        <span class="stat-value">${Qn(t.pairedAt)}</span>
                        <span class="stat-label">Days paired</span>
                    </div>
                </div>
            </div>
        `}).join("")}function Se(){const e=document.getElementById("boozeLensDeviceStats");if(!e)return;const t=N.length,o=N.filter(a=>Fe(a.lastSeen)).length,n=N.reduce((a,r)=>a+(r.totalPhotos||0),0);e.innerHTML=`
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
                    <div class="stat-value">${o}</div>
                    <div class="stat-label">Online</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-images"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${n}</div>
                    <div class="stat-label">Photos</div>
                </div>
            </div>
        </div>
    `}function Yn(){const e=document.getElementById("boozeLensDeviceIdInput");e&&(e.value="")}function Jn(e){if(!e)return"never";const o=Date.now()-e,n=Math.floor(o/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)}m ago`:n<86400?`${Math.floor(n/3600)}h ago`:`${Math.floor(n/86400)}d ago`}function Qn(e){if(!e)return"0";const o=Date.now()-e;return Math.floor(o/(1e3*60*60*24)).toString()}function Fe(e){return e?(Date.now()-e)/(1e3*60)<5:!1}function Zn(e){return Fe(e)?"#00ff88":"#ff6b6b"}async function Xn(){await xe(),s("📱 BoozeLens devices refreshed","success")}function Kt(){return N}function ea(){return N.filter(e=>Fe(e.lastSeen)).length}window.pairDeviceById=jt;window.unpairDevice=Ot;window.renameDevice=Vt;window.pairBoozeLensDevice=We;window.unpairBoozeLensDevice=tt;window.renameBoozeLensDevice=ot;const J={beer:{amount:330,alcohol:5,emoji:"🍺"},wine:{amount:150,alcohol:12,emoji:"🍷"},shot:{amount:40,alcohol:40,emoji:"🥃"},cocktail:{amount:200,alcohol:15,emoji:"🍸"},mixed:{amount:250,alcohol:10,emoji:"🥤"},champagne:{amount:150,alcohol:12,emoji:"🥂"},water:{amount:250,alcohol:0,emoji:"💧"},other:{amount:200,alcohol:5,emoji:"🍹"}},Y={SOBER:{max:.02,class:"bac-safe",text:"Sober",emoji:"😊"},BUZZED:{max:.05,class:"bac-caution",text:"Buzzed",emoji:"😎"},IMPAIRED:{max:.08,class:"bac-danger",text:"No Driving!",emoji:"🚫"},DRUNK:{max:1/0,class:"bac-critical",text:"Too Much!",emoji:"🤢"}};function Yt(e){return e<Y.SOBER.max?Y.SOBER:e<Y.BUZZED.max?Y.BUZZED:e<Y.IMPAIRED.max?Y.IMPAIRED:Y.DRUNK}const Jt=["k1OvkYapqbZUAf9RbvfmnhgWcY23","kHNxyiqgsSfUHZArxbApGzxTlhO2"];function F(e){return Jt.includes(e)}const ce=Object.freeze(Object.defineProperty({__proto__:null,BAC_STATUS:Y,DEVELOPER_UIDS:Jt,DRINK_PRESETS:J,getBACStatus:Yt,isDeveloper:F},Symbol.toStringTag,{value:"Module"}));class nt{constructor(){this.cache=new Map,this.timers=new Map}set(t,o,n=null){if(this.timers.has(t)&&(clearTimeout(this.timers.get(t)),this.timers.delete(t)),this.cache.set(t,{value:o,timestamp:Date.now()}),n&&n>0){const a=setTimeout(()=>{this.delete(t)},n);this.timers.set(t,a)}}get(t){const o=this.cache.get(t);return o?o.value:null}has(t){return this.cache.has(t)}delete(t){return this.timers.has(t)&&(clearTimeout(this.timers.get(t)),this.timers.delete(t)),this.cache.delete(t)}clear(){for(const t of this.timers.values())clearTimeout(t);this.timers.clear(),this.cache.clear()}size(){return this.cache.size}getAge(t){const o=this.cache.get(t);return o?Date.now()-o.timestamp:null}}const St=new nt,Dt=new nt,Ye={PARTY_DATA:3e4,LEADERBOARD:1e4,DEVICE_READINGS:5e3,FRIENDS_PARTIES:6e4,PUBLIC_PARTIES:12e4};function ta(...e){return e.filter(Boolean).join(":")}class oa extends nt{setMany(t,o=null){for(const[n,a]of t)this.set(n,a,o)}getMany(t){const o=new Map;for(const n of t){const a=this.get(n);a!==null&&o.set(n,a)}return o}deletePattern(t){const o=[];for(const n of this.cache.keys())n.includes(t)&&o.push(n);for(const n of o)this.delete(n);return o.length}}const Pt=new oa;let y=null,L=[],qe=new Map,X=[];async function Qt(e,t={}){try{const o=S.currentUser;if(!o)throw new Error("Not logged in");const a=b().userData.username||o.email.split("@")[0],r=Math.random().toString(36).substring(2,8).toUpperCase(),i=et(C(B,"parties")),c={id:i.key,name:e,code:r,creatorId:o.uid,creatorName:a,privacy:t.privacy||"private",duration:t.duration||"24h",address:t.address||"",maxMembers:t.maxMembers||50,description:t.description||"",members:{[o.uid]:{name:a,joinedAt:Date.now(),role:"creator"}},pendingRequests:{},stats:{totalDrinks:0,avgBac:0,peakBac:0,safetyScore:100},createdAt:Date.now(),expiresAt:t.duration==="24h"?Date.now()+1440*60*1e3:null};return await we(i,c),ve(c),y=c,U(),fe(c.id),{success:!0,code:r,party:c}}catch(o){return console.error("Create party error:",o),{success:!1,error:o.message}}}async function at(e){try{const t=await R(C(B,"parties"));if(!t.exists())return null;let o=null;return t.forEach(n=>{const a=n.val();a.code===e.toUpperCase()&&(o={...a,id:n.key})}),o}catch(t){return console.error("Get party error:",t),null}}async function rt(e,t=!1){try{const o=S.currentUser;if(!o)throw new Error("Not logged in");const n=await at(e);if(!n)throw new Error("Invalid code");if(await no(n.id,o.uid)&&!F(o.uid))throw new Error("You have been banned from this party");if(n.locked&&!t&&!F(o.uid))throw new Error("This party is locked. No new members allowed.");if(n.members&&n.members[o.uid])return ve(n),y=n,U(),fe(n.id),{success:!0,alreadyMember:!0};if(Object.keys(n.members||{}).length>=(n.maxMembers||50))throw new Error("Party is full");if(n.expiresAt&&Date.now()>n.expiresAt)throw new Error("Party has expired");const c=b().userData.username||o.email.split("@")[0];if(n.privacy==="public"||t)return await se(C(B,`parties/${n.id}/members/${o.uid}`),{name:c,joinedAt:Date.now(),role:"member"}),ve(n),y=n,U(),fe(n.id),{success:!0};if(n.privacy==="friends-only"){if(!(await R(C(B,`users/${o.uid}/friends/${n.creatorId}`))).exists())throw new Error("This party is for friends only");return await se(C(B,`parties/${n.id}/members/${o.uid}`),{name:c,joinedAt:Date.now(),role:"friend"}),ve(n),y=n,U(),fe(n.id),{success:!0}}else return await se(C(B,`parties/${n.id}/pendingRequests/${o.uid}`),{name:c,requestedAt:Date.now()}),{success:!0,pending:!0,party:n}}catch(o){return console.error("Join party error:",o),{success:!1,error:o.message}}}async function Zt(e=null){try{const t=e?L.find(n=>n.id===e):y;if(!t)return{success:!0};const o=S.currentUser;if(!o)throw new Error("Not logged in");return t.creatorId===o.uid?await Xt(t.id):(await we(C(B,`parties/${t.id}/members/${o.uid}`),null),st(t.id),y&&y.id===t.id&&(y=L.length>0?L[0]:null),U(),it(t.id),{success:!0})}catch(t){return console.error("Leave party error:",t),{success:!1,error:t.message}}}async function Xt(e=null){try{if(!S.currentUser)return{success:!1,error:"Not authenticated"};const t=e?L.find(n=>n.id===e):y;if(e&&!t&&F(S.currentUser.uid))return await Te(C(B,`parties/${e}`)),{success:!0};if(!t)return{success:!1,error:"Party not found"};const o=S.currentUser;return t.creatorId!==o.uid&&!F(o.uid)?{success:!1,error:"Only the party creator can delete the party"}:(await Te(C(B,`parties/${t.id}`)),st(t.id),y&&y.id===t.id&&(y=L.length>0?L[0]:null),U(),it(t.id),{success:!0})}catch(t){return console.error("Delete party error:",t),{success:!1,error:t.message}}}async function na(){try{const e=S.currentUser;if(!e){console.log("No authenticated user");return}const t=JSON.parse(localStorage.getItem("userParties")||"[]"),o=localStorage.getItem("currentPartyId");L=[],y=null;for(const n of t){const a=await R(C(B,`parties/${n}`));if(a.exists()){const r={...a.val(),id:n};r.members&&r.members[e.uid]&&(!r.expiresAt||Date.now()<=r.expiresAt)&&(L.push(r),fe(n),n===o&&(y=r))}}!y&&L.length>0&&(y=L[0]),U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()}catch(e){console.error("Load parties error:",e)}}function fe(e){if(qe.has(e))return;const t=Bt(C(B,`parties/${e}`),n=>{if(n.exists()){const a=n.val(),r=S.currentUser;if(!a||!r){De();return}if(!a.members||!a.members[r.uid]){console.log("User no longer a member of party"),De(e);return}if(a.expiresAt&&Date.now()>a.expiresAt){console.log("Party has expired"),De(e);return}const i={...a,id:e};ve(i),y&&y.id===e&&(y=i),U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()}else console.log("Party no longer exists in Firebase"),De(e)});qe.set(e,t);const o=C(B,`parties/${e}/chat`);R(o).then(n=>{X=[];const a=[];n.forEach(r=>{a.push({id:r.key,...r.val()})}),X=a.slice(-50),a.length>0&&a[0].id,window.updatePartyChat&&window.updatePartyChat(X)}),Bt(o,n=>{if(!n.exists())return;const a=[];let r=!1;n.forEach(i=>{const c={id:i.key,...i.val()};X.findIndex(d=>d.id===c.id)===-1&&(a.push(c),r=!0)}),r&&(X=[...X,...a].slice(-100),window.updatePartyChat&&window.updatePartyChat(X.slice(-50)))})}function it(e){const t=qe.get(e);t&&(t(),qe.delete(e))}function De(e){e&&(st(e),y&&y.id===e&&(y=L.length>0?L[0]:null),U(),it(e),setTimeout(()=>{typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()},100),typeof window<"u"&&window.showNotification&&window.showNotification("You have left the party","info"))}function ve(e){L=L.filter(t=>t.id!==e.id),L.push(e)}function st(e){L=L.filter(t=>t.id!==e)}function U(){const e=L.map(t=>t.id);localStorage.setItem("userParties",JSON.stringify(e)),y?localStorage.setItem("currentPartyId",y.id):localStorage.removeItem("currentPartyId")}function aa(e){const t=L.find(o=>o.id===e);return t?(y=t,U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay(),!0):!1}async function eo(e){try{if(!y||!e.trim())return{success:!1};const t=S.currentUser;if(!t)return{success:!1};const n=b().userData.username||t.email.split("@")[0];return await et(C(B,`parties/${y.id}/chat`),{userId:t.uid,userName:n,message:e.trim(),timestamp:Date.now()}),{success:!0}}catch(t){return console.error("Send message error:",t),{success:!1}}}function ra(){if(!y)return null;const e=Object.keys(y.members||{}).length,t=Date.now()-y.createdAt,o=Math.floor(t/(1e3*60*60)),n=Math.floor(t%(1e3*60*60)/(1e3*60));return{memberCount:e,duration:o>0?`${o}h ${n}m`:`${n}m`,code:y.code}}async function ia(e,t){try{if(!y||y.creatorId!==S.currentUser.uid)throw new Error("Only party creator can manage requests");const o=C(B,`parties/${y.id}/pendingRequests/${e}`),n=await R(o);if(!n.exists())throw new Error("Request not found");const a=n.val();return t&&await se(C(B,`parties/${y.id}/members/${e}`),{name:a.name,joinedAt:Date.now(),role:"member"}),await Te(o),{success:!0}}catch(o){return console.error("Handle join request error:",o),{success:!1,error:o.message}}}async function to(){if(!y)return[];const e=ta("leaderboard",y.id),t=Dt.get(e);if(t)return t;const o=[],n=Object.keys(y.members||{}),a=n.map(v=>R(C(B,`users/${v}/devices`))),r=await Promise.all(a),i=[],c=new Map;r.forEach((v,g)=>{const D=n[g];if(v.exists()){const E=Object.keys(v.val());c.set(D,E),i.push(...E)}else c.set(D,[])});const l=Pt.getMany(i),d=i.filter(v=>!l.has(v)),m=d.map(v=>R(C(B,`readings/${v}`))),p=await Promise.all(m),f=new Map(l);d.forEach((v,g)=>{const D=p[g];if(D.exists()){const E=D.val().bac||0;f.set(v,E),Pt.set(v,E,Ye.DEVICE_READINGS)}});for(const[v,g]of Object.entries(y.members||{})){let D=0;const E=c.get(v)||[];for(const wt of E){const me=f.get(wt)||0;me>D&&(D=me)}o.push({userId:v,name:g.name,bac:D,joinedAt:g.joinedAt,role:g.role||"member"})}return o.sort((v,g)=>g.bac-v.bac),Dt.set(e,o,Ye.LEADERBOARD),o}async function sa(){try{if(!S.currentUser)return[];const e=S.currentUser,o=(await R(C(B,`users/${e.uid}/friends`))).val()||{},n=Object.keys(o);if(n.length===0)return[];const r=(await R(C(B,"parties"))).val()||{},i=[],c=Date.now();return Object.entries(r).forEach(([l,d])=>{if(d.privacy==="friends-only"&&(!d.expiresAt||d.expiresAt>c)&&n.includes(d.creatorId)){const m=Object.keys(d.members||{}).length;i.push({...d,id:l,memberCount:m,code:d.code,creatorName:o[d.creatorId]?.name||"Friend"})}}),i.sort((l,d)=>d.memberCount-l.memberCount)}catch(e){return console.error("Error getting friends parties:",e),[]}}async function oo(){try{const e="public:parties",t=St.get(e);if(t)return t;const o=await R(C(B,"parties"));if(!o.exists())return[];const n=[],a=Date.now();return o.forEach(r=>{const i=r.val();i.privacy==="public"&&(!i.expiresAt||i.expiresAt>a)&&n.push({...i,id:r.key,memberCount:Object.keys(i.members||{}).length})}),n.sort((r,i)=>i.memberCount-r.memberCount),St.set(e,n,Ye.PUBLIC_PARTIES),n}catch(e){return console.error("Get nearby parties error:",e),[]}}async function ca(e,t=""){try{return!y||!S.currentUser?{success:!1,error:"Not in a party or not authenticated"}:y.creatorId!==S.currentUser.uid&&!F(S.currentUser.uid)?{success:!1,error:"Only the party creator can kick members"}:e===S.currentUser.uid?{success:!1,error:"Cannot kick yourself. Use delete party instead."}:!y.members||!y.members[e]?{success:!1,error:"Member not found in party"}:(await et(C(B,`parties/${y.id}/moderation`),{action:"kick",targetId:e,targetName:y.members[e].name,moderatorId:S.currentUser.uid,reason:t,timestamp:Date.now()}),await Te(C(B,`parties/${y.id}/members/${e}`)),await we(C(B,`parties/${y.id}/banned/${e}`),{bannedAt:Date.now(),bannedBy:S.currentUser.uid,reason:t}),{success:!0})}catch(o){return console.error("Kick member error:",o),{success:!1,error:o.message}}}async function la(e){try{if(!y||!S.currentUser)return{success:!1,error:"Not in a party or not authenticated"};if(y.creatorId!==S.currentUser.uid&&!F(S.currentUser.uid))return{success:!1,error:"Only the party creator can update settings"};const t=["name","privacy","maxMembers","description","address","locked"],o={};for(const[n,a]of Object.entries(e))t.includes(n)&&(o[n]=a);return Object.keys(o).length===0?{success:!1,error:"No valid settings provided"}:(await se(C(B,`parties/${y.id}`),o),{success:!0})}catch(t){return console.error("Update party settings error:",t),{success:!1,error:t.message}}}async function da(e){try{return!y||!S.currentUser?{success:!1,error:"Not in a party or not authenticated"}:y.creatorId!==S.currentUser.uid?{success:!1,error:"Only the party creator can lock/unlock the party"}:(await se(C(B,`parties/${y.id}`),{locked:e,lockedAt:e?Date.now():null}),{success:!0,locked:e})}catch(t){return console.error("Toggle party lock error:",t),{success:!1,error:t.message}}}async function no(e,t){try{return(await R(C(B,`parties/${e}/banned/${t}`))).exists()}catch(o){return console.error("Check ban status error:",o),!1}}function ao(){return y?.id||null}async function ro(e){return s("Friend system coming soon!","info"),{success:!1}}const Tt=Object.freeze(Object.defineProperty({__proto__:null,createParty:Qt,get currentParty(){return y},deleteParty:Xt,getCurrentPartyId:ao,getFriendsParties:sa,getNearbyParties:oo,getPartyByCode:at,getPartyLeaderboard:to,getPartyStats:ra,handleJoinRequest:ia,isUserBanned:no,joinParty:rt,kickMember:ca,leaveParty:Zt,loadUserParties:na,quickAddFriend:ro,sendPartyMessage:eo,switchToParty:aa,togglePartyLock:da,updatePartySettings:la,get userParties(){return L}},Symbol.toStringTag,{value:"Module"}));function oe(){try{ua(),ma(),pa(),ha(),ga()}catch(e){console.error("UI update failed:",e)}}function ua(){const e=document.getElementById("friendsGrid");if(!e)return;const t=$("partyData")||{};e.innerHTML="",Object.entries(t).forEach(([o,n])=>{if(!(Date.now()-n.lastUpdate<864e5))return;const r=Yt(n.bac),i=va(n.lastUpdate),c=document.createElement("div");c.className="card friend-card",c.setAttribute("data-friend-id",n.friendId||o),c.onclick=()=>fa(n);const l=n.trend==="up"?"📈":n.trend==="down"?"📉":"➡️",d=n.trend==="up"?"trend-up":n.trend==="down"?"trend-down":"",m=n.isOwn?"👤":n.permission==="guardian"?"🛡️":"👥";c.innerHTML=`
            <div class="friend-avatar">${m}</div>
            <div class="friend-name">${n.name}</div>
            <div class="bac-value ${r.class}">
                ${n.bac.toFixed(3)}‰
                <span class="bac-trend ${d}">${l}</span>
            </div>
            <div class="friend-status">
                <span class="status-badge">${r.emoji} ${r.text}</span>
            </div>
            <div class="location-tag">
                <i class="fas fa-map-marker-alt"></i> ${n.location}
            </div>
            <div class="last-update" style="margin-top: 10px; opacity: 0.7; font-size: 0.9em;">
                Updated ${i}
            </div>
        `,n.bac>=.08&&c.classList.add("pulse"),e.appendChild(c)})}function ma(){const e=$("partyData")||{},t=Object.values(e).filter(l=>Date.now()-l.lastUpdate<1440*60*1e3),o=t.reduce((l,d)=>l+d.bac,0)/t.length||0,n=document.getElementById("partyAverage");n&&(n.textContent=o.toFixed(3)+"‰");const a=t.filter(l=>l.bac<.02).length,r=document.getElementById("safeFriends");r&&(r.textContent=a);const i=document.getElementById("hydrationTime"),c=document.getElementById("hydrationLabel");if(i)if(window.hydrationTimerInterval&&window.hydrationTargetTime){const l=Date.now(),d=Math.max(0,window.hydrationTargetTime-l),m=Math.ceil(d/6e4);i.textContent=m+"m",c&&(c.style.display="block",c.textContent="until water break")}else i.textContent="Stay hydrated",c&&(c.style.display="none")}async function pa(){const e=document.getElementById("leaderboardList");if(!e)return;e.innerHTML="";const t=ao();let o=[];if(t)o=await to(),o=o.slice(0,5);else{const a=$("partyData")||{};o=Object.values(a).sort((r,i)=>i.bac-r.bac).slice(0,5)}const n=[a=>`🏆 ${a} is absolutely dominating the party! Living their best life!`,a=>`🥈 ${a} is so close! One more and they could take the crown!`,a=>`🥉 ${a} is holding strong! The podium suits them well!`,a=>`${a} is warming up! The night is still young!`,a=>`${a} is taking it easy... or are they just getting started? 🤔`];o.forEach((a,r)=>{const i=document.createElement("div");i.className="leaderboard-item",i.onclick=()=>{r===0&&window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}});const c=n[r]?n[r](a.name):`${a.name} is participating!`;window.showNotification(c)},i.innerHTML=`
            <span class="rank rank-${r+1}">#${r+1}</span>
            <span>${a.name}</span>
            <span>${a.bac.toFixed(3)}‰</span>
            ${t&&a.id?`<button class="quick-add-btn" onclick="window.quickAddPartyFriend('${a.id}')">+</button>`:""}
        `,e.appendChild(i)})}function ha(){const e=document.getElementById("visualizer");if(e){if(e.children.length===0)for(let t=0;t<20;t++){const o=document.createElement("div");o.className="bar",e.appendChild(o)}e.querySelectorAll(".bar").forEach(t=>{const o=Math.random()*150+20;t.style.height=o+"px"})}}let Lt=0;const ya=300*1e3;function ga(){const e=$("partyData")||{},t=Object.values(e).filter(n=>Date.now()-n.lastUpdate<1440*60*1e3&&n.bac>=.08&&n.isFriend===!0&&!n.isOwn);if(t.length>0){const n=Date.now();if(n-Lt>ya){const a=t.map(r=>r.name).join(", ");showNotification(`⚠️ ${t.length} friend${t.length>1?"s have":" has"} high BAC: ${a}`,"warning"),Lt=n}t.forEach(a=>{const r=document.querySelector(`[data-friend-id="${a.friendId||a.deviceId}"]`);r&&r.classList.add("bac-warning")})}else document.querySelectorAll(".bac-warning").forEach(n=>{n.classList.remove("bac-warning")});const o=document.getElementById("alertBanner");o&&(o.style.display="none")}function fa(e){console.log("Show friend details:",e)}window.quickAddPartyFriend=async function(e){await ro()};function va(e){const t=Math.floor((Date.now()-e)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}window.updateUI=oe;let ye,Je=!1;(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&(Je=!0);async function Wt(){return console.log("Service worker registration disabled"),null}function qt(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),ye=e,Je||ba()}),window.addEventListener("appinstalled",()=>{console.log("PWA was installed"),Je=!0,wa(),s("App installed successfully!","success")})}function ba(){let e=document.getElementById("installButton");if(!e){e=document.createElement("button"),e.id="installButton",e.className="btn btn-primary install-button",e.innerHTML='<i class="fas fa-download"></i> Install App',e.onclick=ka;const t=document.querySelector(".action-buttons");t&&t.appendChild(e)}e.style.display="inline-block"}function wa(){const e=document.getElementById("installButton");e&&(e.style.display="none")}async function ka(){if(!ye){s("App is already installed or not available for installation","info");return}ye.prompt();const{outcome:e}=await ye.userChoice;console.log(`User response to install prompt: ${e}`),console.log(e==="accepted"?"User accepted the install prompt":"User dismissed the install prompt"),ye=null}function Mt(){const e=indexedDB.open("BoozeLensDB",1);e.onerror=()=>{console.error("Failed to open IndexedDB")},e.onsuccess=t=>{t.target.result,console.log("IndexedDB opened successfully")},e.onupgradeneeded=t=>{const o=t.target.result;if(!o.objectStoreNames.contains("drinks")){const n=o.createObjectStore("drinks",{keyPath:"id",autoIncrement:!0});n.createIndex("timestamp","timestamp",{unique:!1}),n.createIndex("synced","synced",{unique:!1})}if(!o.objectStoreNames.contains("readings")){const n=o.createObjectStore("readings",{keyPath:"id",autoIncrement:!0});n.createIndex("timestamp","timestamp",{unique:!1}),n.createIndex("synced","synced",{unique:!1})}}}window.addEventListener("online",()=>{s("Back online! Syncing data...","success"),"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(e=>{"sync"in e&&e.sync.register("sync-all")})});window.addEventListener("offline",()=>{s("You are offline. Data will be saved locally.","warning")});function xa(e){try{if(!e){console.warn("Parties module not ready");return}const t=e.currentParty,o=e.userParties||[],n=document.getElementById("currentPartySection"),a=document.getElementById("dashboardPartyInfo");let r=null,i=!1,c=!1;try{r=x(),r&&(i=t&&t.creatorId===r.uid,c=F(r.uid))}catch(l){console.warn("Could not get current user:",l)}Ia(o,t),t?Ba(t,n,a,r,i,c,e):Ea(n,a)}catch(t){console.error("Error in safeUpdatePartyDisplay:",t)}}function Ia(e,t){const o=document.getElementById("partySwitcher");e.length>1?(o&&o.remove(),Ca(e,t)):o&&o.remove()}function Ca(e,t){const o=document.createElement("div");o.id="partySwitcher",o.style.cssText=`
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
    `;const n=`
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
        `}).join("");o.innerHTML=n+a,document.body.appendChild(o)}function Ba(e,t,o,n,a,r,i){t&&(t.style.display="block"),o&&(o.style.display="block"),Sa(e),Da(e,n,a,r),Pa(e,i),Ta(e,n,a),La(e,a,r),window.updatePartyLeaderboard&&window.updatePartyLeaderboard()}function Ea(e,t){e&&(e.style.display="none"),t&&(t.style.display="none");const o=document.getElementById("creatorControlsSection");o&&(o.style.display="none");const n=document.getElementById("pendingRequestsSection");n&&(n.style.display="none")}function Sa(e){const t=document.querySelectorAll("#currentPartyName, #dashboardPartyName"),o=document.querySelectorAll("#currentPartyCode, #dashboardPartyCode");t.forEach(n=>{if(n){const a=document.createElement("template");a.innerHTML='<span data-party-name></span> <span style="font-size: 0.8em; opacity: 0.7;">by <span data-creator-name></span></span>';const r=a.content.cloneNode(!0);r.querySelector("[data-party-name]").textContent=e.name,r.querySelector("[data-creator-name]").textContent=e.creatorName||"Unknown",n.innerHTML="",n.appendChild(r)}}),o.forEach(n=>{n&&(n.textContent=e.code)})}function Da(e,t,o,n){const a=document.getElementById("partyMembersList");if(!a||!e.members)return;const r=document.createElement("template");r.innerHTML=`
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
    `,a.innerHTML="";for(const[i,c]of Object.entries(e.members)){const l=i===e.creatorId,d=t&&i===t.uid,m=(o||n)&&!d&&!l,p=r.content.cloneNode(!0);p.querySelector("[data-avatar]").textContent=l?"👑":"👤";const f=p.querySelector("[data-member-name]");if(f.textContent=c.name,l){const g=document.createElement("span");g.style.color="#00ff88",g.textContent=" (Host)",f.appendChild(g)}const v=(c.role==="creator"?"Party Host • ":"")+`Joined ${new Date(c.joinedAt).toLocaleTimeString()}`;if(p.querySelector("[data-member-details]").textContent=v,m){const g=document.createElement("button");g.className="btn btn-danger",g.style.cssText="padding: 5px 10px; font-size: 0.9em;",g.innerHTML='<i class="fas fa-user-times"></i> Kick',g.onclick=()=>kickMemberFromParty(i,c.name),p.querySelector("[data-kick-button]").appendChild(g)}a.appendChild(p)}}function Pa(e,t){const o=document.getElementById("partyStats");if(!o)return;const n=t.getPartyStats();n&&(o.innerHTML=`
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">👥</div>
            <div style="font-size: 1.5em; font-weight: bold;">${n.memberCount}</div>
            <div style="opacity: 0.7;">Members</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">⏱️</div>
            <div style="font-size: 1.5em; font-weight: bold;">${n.duration}</div>
            <div style="opacity: 0.7;">Duration</div>
        </div>
        <div style="text-align: center; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <div style="font-size: 2em;">🎆</div>
            <div style="font-size: 1.5em; font-weight: bold;">${n.code}</div>
            <div style="opacity: 0.7;">Party Code</div>
        </div>
    `)}function Ta(e,t,o){const n=document.getElementById("leavePartyBtn");!n||!t||(o?(n.innerHTML='<i class="fas fa-trash"></i> Delete Party',n.className="btn btn-danger"):(n.innerHTML='<i class="fas fa-door-open"></i> Leave Party',n.className="btn btn-danger"))}function La(e,t,o){if(!t&&!o){const i=document.getElementById("creatorControlsSection");i&&(i.style.display="none");const c=document.getElementById("pendingRequestsSection");c&&(c.style.display="none");return}const n=document.getElementById("creatorControlsSection");if(n){n.style.display="block";const i=document.getElementById("lockPartyBtn");i&&(e.locked?i.innerHTML='<i class="fas fa-lock-open"></i> Unlock Party':i.innerHTML='<i class="fas fa-lock"></i> Lock Party')}const a=document.getElementById("pendingRequestsSection"),r=document.getElementById("pendingRequestsList");if(a&&r&&e.pendingRequests)if(Object.keys(e.pendingRequests).length>0){a.style.display="block";const c=document.createElement("template");c.innerHTML=`
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
            `,r.innerHTML="",Object.entries(e.pendingRequests).forEach(([l,d])=>{const m=c.content.cloneNode(!0);m.querySelector("[data-request-name]").textContent=d.name,m.querySelector("[data-request-time]").textContent=`Requested ${new Date(d.requestedAt).toLocaleTimeString()}`,m.querySelector("[data-approve-btn]").onclick=()=>handlePartyRequest(l,!0),m.querySelector("[data-decline-btn]").onclick=()=>handlePartyRequest(l,!1),r.appendChild(m)})}else a&&(a.style.display="none");else a&&(a.style.display="none")}const Wa="modulepreload",qa=function(e,t){return new URL(e,t).href},Nt={},le=function(t,o,n){let a=Promise.resolve();if(o&&o.length>0){let d=function(m){return Promise.all(m.map(p=>Promise.resolve(p).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const i=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");a=d(o.map(m=>{if(m=qa(m,n),m in Nt)return;Nt[m]=!0;const p=m.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(!!n)for(let D=i.length-1;D>=0;D--){const E=i[D];if(E.href===m&&(!p||E.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${f}`))return;const g=document.createElement("link");if(g.rel=p?"stylesheet":Wa,p||(g.as="script"),g.crossOrigin="",g.href=m,l&&g.setAttribute("nonce",l),document.head.appendChild(g),p)return new Promise((D,E)=>{g.addEventListener("load",D),g.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(i){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=i,window.dispatchEvent(c),!c.defaultPrevented)throw i}return a.then(i=>{for(const c of i||[])c.status==="rejected"&&r(c.reason);return t().catch(r)})};async function io(){const e=document.getElementById("friendSearchInput").value.trim().toLowerCase();if(!e||e.length<3){s("❌ Please enter at least 3 characters","error");return}const t=document.getElementById("searchResults");t.innerHTML="<p>Searching...</p>";try{const o=k(),n=x(),a=b().friendsData||{},r=[],i=Object.keys(a).map(async f=>{try{const g=(await A(h(o,"users/"+f))).val();if(g&&(g.username?.toLowerCase().includes(e)||g.email?.toLowerCase().includes(e)))return{uid:f,...g,isExistingFriend:!0}}catch{console.log("Could not read friend data for:",f)}return null});let c;try{c=await A(h(o,"usernames"))}catch{console.log("Could not read usernames collection"),c={val:()=>({})}}const l=c.val()||{},d=Object.entries(l).filter(([f,v])=>v!==n.uid&&!a[v]&&f.includes(e)).map(async([f,v])=>{try{const D=(await A(h(o,"users/"+v))).val();if(D&&D.settings?.publicProfile!==!1)return{uid:v,username:f,...D,isExistingFriend:!1}}catch{return console.log("Could not read user data for:",v,"- showing basic info only"),{uid:v,username:f,email:"User",isExistingFriend:!1}}return null}),[m,p]=await Promise.all([Promise.all(i),Promise.all(d)]);if(m.forEach(f=>f&&r.push(f)),p.forEach(f=>f&&r.push(f)),r.length===0)t.innerHTML='<p style="text-align: center; opacity: 0.7;">No users found</p>';else{const f=document.createElement("template");f.innerHTML=`
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
            `,t.innerHTML="<h4>Search Results:</h4>",r.forEach(v=>{const g=f.content.cloneNode(!0);g.querySelector("[data-avatar]").textContent=(v.username||v.email||"U").charAt(0).toUpperCase(),g.querySelector("[data-username]").textContent=v.username||"User",g.querySelector("[data-email]").textContent=v.email||"Phone user";const D=g.querySelector("[data-actions]");if(v.isExistingFriend)D.innerHTML='<span style="color: #00ff88;">✓ Friends</span>';else{const E=g.querySelector("[data-add-btn]");E.onclick=()=>so(v.uid)}t.appendChild(g)})}}catch(o){console.error("Search error:",o),t.innerHTML='<p style="color: #ff4444;">Search failed. Try again.</p>'}}async function so(e){try{const t=k(),o=x(),n=b().userData;if(b().friendsData[e]){s("ℹ️ Already friends");return}await T(h(t,"friendRequests/"+e+"/"+o.uid),{from:n.username||o.email,timestamp:G()}),s("📤 Friend request sent!","success"),io()}catch(t){console.error("Friend request error:",t),s("❌ Failed to send request","error")}}function co(){const e=document.getElementById("friendRequests"),t=b().friendRequests||[];if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No pending requests</p>';return}e.innerHTML=t.map(o=>`
        <div class="friend-request">
            <div>
                <strong>${o.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${Za(o.timestamp)}
                </small>
            </div>
            <div>
                <button class="btn" onclick="acceptFriendRequest('${o.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="btn btn-danger" onclick="declineFriendRequest('${o.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join("")}async function Ma(e){try{const t=await Na();if(!t)return;const o=k(),n=x();await T(h(o,"users/"+n.uid+"/friends/"+e),{permission:t,addedAt:G()}),await T(h(o,"users/"+e+"/friends/"+n.uid),{permission:t,addedAt:G()}),await q(h(o,"friendRequests/"+n.uid+"/"+e)),s("✅ Friend added!","success")}catch(t){console.error("Accept friend error:",t),s("❌ Failed to accept request","error")}}async function Na(){return new Promise(e=>{const t=`
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
        `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show"),window.resolvePermission=o=>{window.closeModal(),e(o)}})}async function $a(e){const t=k(),o=x();await q(h(t,"friendRequests/"+o.uid+"/"+e)),s("❌ Request declined")}function ct(){const e=document.getElementById("friendsList");if(!e)return;const t=b().friendsData||{};if(e.innerHTML="",Object.keys(t).length===0){e.innerHTML='<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';return}Object.entries(t).forEach(async([o,n])=>{const a=k(),i=(await A(h(a,"users/"+o))).val();if(i){const c=document.createElement("template");c.innerHTML=`
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
            `;const l=c.content.cloneNode(!0);l.querySelector("[data-avatar]").textContent=(i.username||i.email||"U").charAt(0).toUpperCase(),l.querySelector("[data-username]").textContent=i.username||"Friend",l.querySelector("[data-email]").textContent=i.email||"Phone user";const d=l.querySelector("[data-permission]");d.value=n.permission||"observer",d.onchange=f=>lo(o,f.target.value);const m=l.querySelector("[data-remove-btn]");m.onclick=()=>uo(o);const p=l.querySelector(".friend-item");e.appendChild(p)}})}async function lo(e,t){try{const o=k(),n=x();await T(h(o,"users/"+n.uid+"/friends/"+e+"/permission"),t),s("✅ Permission updated","success")}catch(o){console.error("Update permission error:",o),s("❌ Failed to update permission","error")}}async function uo(e){if(confirm("Remove this friend?")){const t=k(),o=x();await q(h(t,"users/"+o.uid+"/friends/"+e)),await q(h(t,"users/"+e+"/friends/"+o.uid)),s("👋 Friend removed")}}async function mo(){const e=document.getElementById("chatInput"),t=e.value.trim();if(t)try{const o=x(),n=b().userData,{isDeveloper:a}=await le(async()=>{const{isDeveloper:i}=await Promise.resolve().then(()=>ce);return{isDeveloper:i}},void 0,import.meta.url);if(!a(o.uid)){s("❌ Only developers can send messages in the main chat","error"),e.value="";return}const r=k();await Me(h(r,"chat"),{text:t,author:n.username||o.email,authorId:o.uid,timestamp:G()}),e.value=""}catch(o){console.error("Send message error:",o),s("❌ Failed to send message","error")}}function Aa(e){e.key==="Enter"&&mo()}async function Ra(e){try{const t=k(),o=x(),{isDeveloper:n}=await le(async()=>{const{isDeveloper:a}=await Promise.resolve().then(()=>ce);return{isDeveloper:a}},void 0,import.meta.url);if(!n(o.uid)){s("❌ Only developers can delete messages","error");return}await q(h(t,`chat/${e}`))}catch(t){console.error("Delete message error:",t),s("❌ Failed to delete message","error")}}function po(){const e=k(),t=h(e,"chat");H(t,async o=>{const n=o.val()||{},a=document.getElementById("chatMessages");if(!a)return;const r=x(),{isDeveloper:i}=await le(async()=>{const{isDeveloper:d}=await Promise.resolve().then(()=>ce);return{isDeveloper:d}},void 0,import.meta.url),c=r?i(r.uid):!1,l=Object.entries(n).map(([d,m])=>({id:d,...m})).sort((d,m)=>(d.timestamp||0)-(m.timestamp||0));a.innerHTML=l.length===0?`<div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! 🎉</div>
            </div>`:"",l.forEach(d=>{const m=document.createElement("div");m.className="chat-message",m.innerHTML=`
                <div class="chat-author">${Q(d.author||"Unknown")}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">${Q(d.text||"")}</div>
                    ${c?`<button class="btn btn-danger btn-sm" onclick="deleteMessage('${d.id}')" style="margin-left: 10px; padding: 2px 8px; font-size: 0.8em;">
                            <i class="fas fa-trash"></i>
                        </button>`:""}
                </div>
            `,a.appendChild(m)}),a.scrollTop=a.scrollHeight})}function ho(){s("💧 Time for a water break! Stay hydrated!"),window.confetti&&confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}});const e=parseInt(localStorage.getItem("hydrationCount")||"0")+1;if(localStorage.setItem("hydrationCount",e),e>=12){const t=b().achievements;t.hydroHomie=!0,lt("Hydro Homie")}}function lt(e){localStorage.getItem(`achievement_${e}`)||(localStorage.setItem(`achievement_${e}`,"true"),window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}}),s(`🏆 Achievement Unlocked: ${e}!`))}function Fa(e){const t=b().locationHistory,o=b().userData;if(t.push({location:e,time:Date.now(),user:o.username}),s(`📍 Checked in at ${e}!`),t.length>=10){const n=b().achievements;n.partyAnimal=!0,lt("Party Animal")}window.closeModal()}function yo(){const e=dt();let t='<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';return e.forEach((o,n)=>{const a=20+n%3*30,r=20+Math.floor(n/3)*30;t+=`
            <div class="location-dot" style="left: ${a}%; top: ${r}%;" title="${o.name}: ${o.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${o.name}</span>
            </div>
        `}),t+="</div>",t}function go(){document.querySelectorAll(".location-dot").forEach(t=>{t.addEventListener("click",function(){const o=this.getAttribute("title");s(`📍 ${o}`)})})}function dt(){const e=b().partyData||{},t={};return Object.values(e).forEach(o=>{t[o.location]||(t[o.location]={count:0,totalBac:0}),t[o.location].count++,t[o.location].totalBac+=o.bac}),Object.entries(t).map(([o,n])=>({name:o,count:n.count,avgBac:n.totalBac/n.count}))}function Ha(){const e=localStorage.getItem("homeAddress");if(e){const t=encodeURIComponent(e);s("🚕 Opening Uber with your home address..."),navigator.clipboard.writeText(e).then(()=>s("📋 Home address copied to clipboard!")).catch(()=>{}),window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${t}`,"_blank")}else s("🚕 Opening Uber app..."),window.open("https://m.uber.com/ul/","_blank")}function za(e){switch(e){case"ambulance":confirm("Call emergency services (112)?")&&(window.location.href="tel:112");break;case"police":confirm("Call Swiss Police (117)?")&&(window.location.href="tel:117");break;case"taxi":s("🚕 Opening taxi options..."),setTimeout(()=>{Ua()},500);break}}function Ua(){const e=localStorage.getItem("homeAddress")||"",t=`
        <h2>🚕 Ride Options</h2>
        ${e?`<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${Q(e)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${Q(e)}').then(() => showNotification('📋 Address copied!'))">
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
    `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show")}function Ga(e){localStorage.setItem("buddy",e),s(`👥 ${e} is now your buddy!`);const t=b().achievements;t.guardianAngel=!0,lt("Guardian Angel"),window.closeModal()}function ja(){window.showModal("first-aid")}async function Oa(){const e=document.getElementById("username").value.trim();if(!e||e.length<3){s("❌ Username must be at least 3 characters","error");return}try{const t=k(),o=x(),n=b().userData;if(e.toLowerCase()!==n.username?.toLowerCase()){const a=await A(h(t,"usernames/"+e.toLowerCase()));if(a.exists()&&a.val()!==o.uid){s("❌ Username already taken","error");return}n.username&&await q(h(t,"usernames/"+n.username.toLowerCase())),await T(h(t,"usernames/"+e.toLowerCase()),o.uid)}await T(h(t,"users/"+o.uid+"/username"),e),s("✅ Profile updated!","success"),n.username=e,document.getElementById("profileName").textContent=e,document.querySelectorAll(".settings-username-display").forEach(a=>a.textContent=e),document.getElementById("profileInitial").textContent=e.charAt(0).toUpperCase()}catch(t){console.error("Update profile error:",t),s("❌ Failed to update profile","error")}}async function Va(){const e=prompt("Enter new password (min 6 characters):");if(e&&e.length>=6)try{await x().updatePassword(e),s("✅ Password changed successfully","success")}catch(t){console.error("Password change error:",t),t.code==="auth/requires-recent-login"?s("❌ Please sign out and sign in again before changing password","error"):s("❌ Failed to change password","error")}}async function _a(){const e=document.getElementById("homeAddress").value,t=document.getElementById("emergencyContact").value,o=document.getElementById("medicalInfo").value,n=document.getElementById("safetyNotes").value;try{const a=k(),r=x();await T(h(a,"users/"+r.uid+"/emergency"),{homeAddress:e,emergencyContact:t,medicalInfo:o,safetyNotes:n,updatedAt:G()}),localStorage.setItem("homeAddress",e),localStorage.setItem("emergencyContact",t),localStorage.setItem("medicalInfo",o),localStorage.setItem("safetyNotes",n),s("✅ Emergency information saved","success"),fo()}catch(a){console.error("Save emergency info error:",a),s("❌ Failed to save emergency info","error")}}async function Ka(){const e=document.getElementById("shareLocation").checked,t=document.getElementById("notifications").checked,o=document.getElementById("publicProfile").checked;try{const n=k(),a=x();await T(h(n,"users/"+a.uid+"/settings"),{shareLocation:e,notifications:t,publicProfile:o}),localStorage.setItem("shareLocation",e),localStorage.setItem("notifications",t),s("✅ Privacy settings saved","success"),fo()}catch(n){console.error("Save privacy settings error:",n),s("❌ Failed to save settings","error")}}function fo(){const e=document.createElement("div");e.className="settings-saved",e.innerHTML="✅",document.body.appendChild(e),setTimeout(()=>e.remove(),1e3)}function vo(){document.querySelectorAll(".toggle-switch").forEach(e=>{const t=e.querySelector("input");t&&t.checked?e.classList.add("active"):e.classList.remove("active")})}async function Ya(){if(confirm("Delete your account? This cannot be undone!")&&confirm("Are you absolutely sure? All your data will be permanently deleted."))try{const e=k(),t=x(),o=b().userData,n=b().friendsData;if(await q(h(e,"users/"+t.uid)),o.username&&await q(h(e,"usernames/"+o.username.toLowerCase())),n)for(const a in n)await q(h(e,"users/"+a+"/friends/"+t.uid));await t.delete(),s("Account deleted. Goodbye!"),location.reload()}catch(e){console.error("Delete account error:",e),e.code==="auth/requires-recent-login"?s("❌ Please sign out and sign in again before deleting account","error"):s("❌ Failed to delete account","error")}}function Ja(){const e=x(),t=b(),o={user:{email:e?.email,username:t.userData.username},settings:t.userData.settings,emergency:t.userData.emergency,devices:t.deviceData,friends:t.friendsData,drinkHistory:t.drinkHistory,achievements:t.achievements,partyData:t.partyData},n=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),a=window.URL.createObjectURL(n),r=document.createElement("a");r.href=a,r.download=`hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(a),s("📥 Data exported successfully!","success")}async function Qa(){const e=document.getElementById("modalDeviceId").value.trim().toUpperCase();if(!e){s("❌ Please enter a Device ID","error");return}try{const t=k(),o=x(),n=b().deviceData;if(!(await A(h(t,"readings/"+e))).exists()){s("❌ Device not found. Make sure it's connected.","error");return}if(n[e]){s("ℹ️ Device already paired"),window.closeModal();return}await T(h(t,"users/"+o.uid+"/devices/"+e),{pairedAt:G(),name:"My Breathalyzer"}),s("✅ Device paired successfully!","success"),window.closeModal()}catch(t){console.error("Pairing error:",t),s("❌ Pairing failed","error")}}function Za(e){const t=Math.floor((Date.now()-e)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}function Q(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Xa(e){console.log("Permission resolved:",e)}async function er(){const e=k(),{DEVELOPER_UIDS:t}=await le(async()=>{const{DEVELOPER_UIDS:o}=await Promise.resolve().then(()=>ce);return{DEVELOPER_UIDS:o}},void 0,import.meta.url);try{const o={};for(const n of t)o[`developers/${n}`]=!0;await T(h(e,"developers"),{});for(const n of t)await T(h(e,`developers/${n}`),!0);return s("✅ Developers node created in Firebase!","success"),console.log("Developers node set up with UIDs:",t),!0}catch(o){return console.error("Error setting up developers:",o),s("❌ Failed to set up developers node","error"),!1}}async function tr(){const e=k(),{DEVELOPER_UIDS:t}=await le(async()=>{const{DEVELOPER_UIDS:o}=await Promise.resolve().then(()=>ce);return{DEVELOPER_UIDS:o}},void 0,import.meta.url);try{let o=0;for(let n=0;n<t.length;n++){const a=t[n],r=`TEST-DEV-${a.substring(0,6)}`;await T(h(e,`readings/${r}`),{bac:.045+Math.random()*.04,timestamp:Date.now()-n*6e4,trend:["rising","steady","falling"][Math.floor(Math.random()*3)]}),await T(h(e,`users/${a}/devices/${r}`),{name:`Test Device ${n+1}`,addedAt:Date.now()}),o++}return s(`🧪 Test BAC added to ${o} developer account${o>1?"s":""}!`,"success"),console.log(`Test devices added for ${o} developers`),setTimeout(()=>{window.location.reload&&window.location.reload()},1e3),o}catch(o){console.error("Error adding test data:",o),s("❌ Failed to add test data","error")}}async function or(){const e=k(),{DEVELOPER_UIDS:t}=await le(async()=>{const{DEVELOPER_UIDS:o}=await Promise.resolve().then(()=>ce);return{DEVELOPER_UIDS:o}},void 0,import.meta.url);x();try{let o=0;const n=["TEST-DEV-001","TEST-DEV-002","TEST-DEVICE-001","TEST-DEVICE-002"];for(const r of t)n.push(`TEST-DEV-${r.substring(0,6)}`);for(const r of n)try{await q(h(e,`readings/${r}`)),console.log(`Removed readings for ${r}`),o++}catch{}const a=await A(h(e,"users"));if(a.exists()){const r=a.val();for(const[i,c]of Object.entries(r))if(c.devices)for(const l of Object.keys(c.devices))l.startsWith("TEST-")&&l.includes("DEV")&&(await q(h(e,`users/${i}/devices/${l}`)),console.log(`Removed ${l} from user ${i}`),o++)}return s(`🧹 Cleaned up ${o} test entries from Firebase!`,"success"),console.log(`Total test entries removed: ${o}`),setTimeout(()=>{window.location.reload&&window.location.reload()},1e3),o}catch(o){console.error("Error removing test data:",o),s("❌ Failed to remove test data","error")}}const nr=window.Chart;let K=null,te="24h";async function ar(){try{const e=document.getElementById("drinkType").value,t=parseInt(document.getElementById("drinkAmount").value)||0,o=parseFloat(document.getElementById("alcoholPercent").value)||0;if(t<=0){s("❌ Please enter a valid amount","error");return}const n={id:Date.now(),type:e,amount:t,alcoholPercent:o,pureAlcohol:(t*o/100).toFixed(1),time:new Date,emoji:J[e].emoji};let a=b().drinkHistory||[];a.unshift(n),P("drinkHistory",a),Ue(),He(),Ie(),Ce(),ze();const r=k(),i=x();if(r&&i)try{await T(h(r,"users/"+i.uid+"/drinks/"+n.id),{...n,time:n.time.toISOString()})}catch(c){console.warn("Firebase save failed (non-critical):",c)}typeof onDrinkLogged=="function"&&onDrinkLogged(e,a),window.lastDrinkTime=Date.now(),e!=="water"&&!window.hydrationTimerInterval&&typeof window.startHydrationCountdown=="function"&&window.startHydrationCountdown(),e==="water"?(typeof window.confetti=="function"&&window.confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}}),s("💧 Great job staying hydrated!","success")):s(`${n.emoji} Drink logged!`),document.getElementById("drinkAmount").value=J[e].amount,document.getElementById("alcoholPercent").value=J[e].alcohol}catch(e){console.error("Error logging drink:",e),s("❌ Failed to log drink","error")}}function He(){try{const e=b().drinkHistory||[],o=Date.now()-36e5,n=e.filter(p=>p.type!=="water").length,a=e.filter(p=>p.type==="water").length,r=e.reduce((p,f)=>p+parseFloat(f.pureAlcohol||0),0),i=e.filter(p=>new Date(p.time).getTime()>o&&p.type!=="water").length,c=document.getElementById("totalDrinks");c&&(c.textContent=n);const l=document.getElementById("totalWater");l&&(l.textContent=a);const d=document.getElementById("totalAlcohol");d&&(d.textContent=r.toFixed(0)+"ml");const m=document.getElementById("drinkRate");m&&(m.textContent=i+"/hr")}catch(e){console.error("Error updating drink stats:",e)}}function Ie(){try{const e=document.getElementById("drinkHistory");if(!e)return;let t=b().drinkHistory||[];const o=Date.now(),n=te==="24h"?o-1440*60*1e3:o-720*60*60*1e3;if(t=t.filter(a=>new Date(a.time).getTime()>n),t.length===0){e.innerHTML=`<p style="text-align: center; opacity: 0.7;">No drinks logged in the last ${te==="24h"?"24 hours":"30 days"}</p>`;return}e.innerHTML=t.map(a=>`
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
                        <div style="font-size: 0.9em;">${ut(a.time)}</div>
                        <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${a.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join("")}catch(e){console.error("Error updating drink history:",e)}}function Ce(){try{const e=document.getElementById("drinkChart"),t=b().chartVisible;if(!e||!t)return;let o=b().drinkHistory||[];const n=Date.now(),a=te==="24h"?n-1440*60*1e3:n-720*60*60*1e3;o=o.filter(d=>new Date(d.time).getTime()>a);const r={};if(o.forEach(d=>{r[d.type]||(r[d.type]=0),r[d.type]++}),Object.keys(r).length===0){K&&(K.destroy(),K=null);return}const i=Object.keys(r),c=Object.values(r),l=i.map(d=>J[d]?.emoji||"🍹");K?(K.data.labels=i.map((d,m)=>`${l[m]} ${d}`),K.data.datasets[0].data=c,K.update()):K=new nr(e,{type:"doughnut",data:{labels:i.map((d,m)=>`${l[m]} ${d}`),datasets:[{data:c,backgroundColor:["#00ff88","#00d4ff","#ff00ff","#ffcc00","#ff4444","#0099ff","#00ccff","#ff0088"],borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"#fff",padding:10,font:{size:window.innerWidth<768?10:12}}}}}})}catch(e){console.error("Error updating drink chart:",e)}}function ze(){const e=document.getElementById("emergencySummary");if(!e)return;let t=b().drinkHistory||[];const n=Date.now()-1440*60*1e3;t=t.filter(d=>new Date(d.time).getTime()>n);const a=t.reduce((d,m)=>d+parseFloat(m.pureAlcohol),0),r=t.length>0?((Date.now()-t[t.length-1].time)/36e5).toFixed(1):0,i={};t.forEach(d=>{i[d.type]||(i[d.type]=0),i[d.type]++});const c=localStorage.getItem("medicalInfo")||"None provided",l=localStorage.getItem("safetyNotes")||"None provided";e.innerHTML=`
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
            <p><strong>Time Period:</strong> Last 24 hours (${r} hours since last drink)</p>
            <p><strong>Total Pure Alcohol:</strong> ${a.toFixed(0)}ml</p>
            <p><strong>Drink Breakdown:</strong></p>
            <ul style="margin-left: 20px;">
                ${Object.entries(i).map(([d,m])=>`<li>${J[d].emoji} ${d}: ${m}</li>`).join("")}
            </ul>
            <p><strong>Last Drink:</strong> ${t.length>0?ut(t[0].time):"None in last 24h"}</p>
            <p><strong>Estimated BAC:</strong> ${wo().toFixed(3)}‰</p>
            <p><strong>Medical Info:</strong> ${Q(c)}</p>
            <p><strong>Safety Notes:</strong> ${Q(l)}</p>
        </div>
    `}function rr(e){let t=b().drinkHistory||[];t=t.filter(a=>a.id!==e),P("drinkHistory",t),Ue(),He(),Ie(),Ce(),ze();const o=Date.now(),n=t.find(a=>a.type!=="water");if(!n)window.hydrationTimerInterval&&(clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=null,window.hydrationTargetTime=null,window.lastDrinkTime=null,typeof updateUI=="function"&&updateUI());else{const a=new Date(n.time).getTime();o-a>10800*1e3?window.hydrationTimerInterval&&(clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=null,window.hydrationTargetTime=null,window.lastDrinkTime=null,typeof updateUI=="function"&&updateUI()):window.lastDrinkTime=a}s("🗑️ Drink removed")}function ir(){let e=b().chartVisible;e=!e,P("chartVisible",e);const t=document.getElementById("chartWrapper"),o=document.getElementById("chartToggleText");e?(t.classList.remove("collapsed"),o.textContent="Hide Chart"):(t.classList.add("collapsed"),o.textContent="Show Chart")}function sr(){const e=document.getElementById("timeRangeText");te==="24h"?(te="30d",e.textContent="24h View"):(te="24h",e.textContent="30d History"),Ce(),Ie(),s(`📊 Showing ${te==="24h"?"last 24 hours":"last 30 days"}`)}function cr(){try{let e=b().drinkHistory||[];const o=Date.now()-1440*60*1e3;e=e.filter(l=>new Date(l.time).getTime()>o);const n=b().userData,a=x(),r={timestamp:new Date().toISOString(),estimatedBAC:wo().toFixed(3),drinkHistory:e,totalAlcohol:e.reduce((l,d)=>l+parseFloat(d.pureAlcohol||0),0),userData:{name:n.username||a?.email||"Unknown",address:localStorage.getItem("homeAddress")||"Not provided",emergencyContact:localStorage.getItem("emergencyContact")||"Not provided",medicalInfo:localStorage.getItem("medicalInfo")||"None",safetyNotes:localStorage.getItem("safetyNotes")||"None"}},i=`EMERGENCY MEDICAL REPORT
========================
Generated: ${new Date().toLocaleString()}
Patient: ${r.userData.name}
Address: ${r.userData.address}
Emergency Contact: ${r.userData.emergencyContact}

MEDICAL INFORMATION
-------------------
${r.userData.medicalInfo}

SAFETY NOTES
------------
${r.userData.safetyNotes}

ALCOHOL CONSUMPTION SUMMARY (LAST 24 HOURS)
--------------------------------------------
Estimated BAC: ${r.estimatedBAC}‰
Total Pure Alcohol: ${r.totalAlcohol.toFixed(0)}ml
Number of Drinks: ${e.filter(l=>l.type!=="water").length}
Water Consumed: ${e.filter(l=>l.type==="water").length} glasses

DETAILED DRINK LOG (LAST 24 HOURS)
----------------------------------
${e.length>0?e.map(l=>`${ut(l.time)}: ${l.emoji} ${l.type} - ${l.amount}ml @ ${l.alcoholPercent}%`).join(`
`):"No drinks logged in the last 24 hours"}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`,c=`
            <h2>🚨 Emergency Medical Report</h2>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${Q(i)}</pre>
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
        `;window.currentEmergencyReport=i,document.getElementById("modalBody").innerHTML=c,document.getElementById("modal").classList.add("show")}catch(e){console.error("Error generating emergency report:",e),s("❌ Error generating report","error")}}function bo(){window.currentEmergencyReport&&navigator.clipboard.writeText(window.currentEmergencyReport).then(()=>s("📋 Report copied to clipboard!","success")).catch(()=>{const e=document.createElement("textarea");e.value=window.currentEmergencyReport,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),s("📋 Report copied!","success")})}function lr(){try{const e=new Blob([window.currentEmergencyReport],{type:"text/plain"}),t=window.URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download=`emergency_report_${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(t),s("📥 Report downloaded!","success")}catch(e){console.error("Download error:",e),s("❌ Download failed - use copy instead","error")}}function dr(){navigator.share&&window.currentEmergencyReport?navigator.share({title:"Emergency Medical Report",text:window.currentEmergencyReport}).then(()=>s("📤 Report shared!","success")).catch(()=>s("❌ Sharing cancelled")):(bo(),s("📋 Report copied - share manually"))}function ur(){if(confirm("Clear all drink history? This cannot be undone!")){P("drinkHistory",[]),Ue(),He(),Ie(),Ce(),ze();const e=k(),t=x();e&&t&&q(h(e,"users/"+t.uid+"/drinks")),s("🗑️ Drink history cleared")}}function Ue(){const e=b().drinkHistory||[];localStorage.setItem("drinkHistory",JSON.stringify(e))}function mr(){const e=localStorage.getItem("drinkHistory");if(e)try{const t=JSON.parse(e);if(t.forEach(o=>{o.time=new Date(o.time)}),P("drinkHistory",t),t.length>0){const o=t.find(n=>n.type!=="water");if(o){const n=new Date(o.time).getTime(),a=Date.now();if(a-n<10800*1e3){window.lastDrinkTime=n;const r=a-10800*1e3,c=t.filter(l=>l.type!=="water"&&new Date(l.time).getTime()>r).pop();if(c){const l=new Date(c.time).getTime(),d=a-l,m=1800*1e3,p=d%m,f=a+(m-p);if(window.hydrationTargetTime=f,typeof window.startHydrationCountdown=="function"){const v=f;window.startHydrationCountdown(),window.hydrationTargetTime=v}}}}}}catch(t){console.error("Failed to load drink history:",t)}}function ut(e){const t=new Date,o=new Date(e),n=Math.floor((t-o)/6e4);return n<1?"Just now":n<60?`${n}m ago`:n<1440?`${Math.floor(n/60)}h ago`:o.toLocaleDateString()}function wo(){const o=b().drinkHistory||[],n=o.reduce((c,l)=>c+parseFloat(l.pureAlcohol),0),a=o.length>0?(Date.now()-o[o.length-1].time)/36e5:0,r=n*.789;return Math.max(0,r/(70*1e3*.68)*100-.015*a)}const M=window.confetti;let I=[],V=0;const u={flipTimer:null,flipTime:0,bestFlipTime:null,triviaScore:0,currentTriviaIndex:0,tournament:{teams:[],bracket:[],currentRound:0,totalTeams:0,rounds:[]},beerPong:{currentMode:"normal",team1Name:"Team 1",team2Name:"Team 2",specialCups:{team1:[],team2:[]}},selectedCategory:"classic",questionQueues:{}};function _(e){V=e}function de(){for(let e=I.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[I[e],I[t]]=[I[t],I[e]]}O()}function pr(e){return{"never-have-i-ever":"Never Have I Ever","truth-or-dare":"Truth or Dare","kings-cup":"King's Cup","beer-pong":"Beer Pong","flip-cup":"Flip Cup",trivia:"Trivia","would-you-rather":"Would You Rather","most-likely-to":"Most Likely To","spin-the-bottle":"Spin the Bottle"}[e]||"Party Game"}function $t(e){const t=Math.floor(e/100),o=e%100,n=Math.floor(t/60),a=t%60;return`${n}:${a.toString().padStart(2,"0")}.${o.toString().padStart(2,"0")}`}function hr(e){P("currentGame",e);const t=document.createElement("div");t.className="game-overlay",t.id="gameOverlay";let o="";const n=window.gameModules[e];n&&n.createGame&&(o=n.createGame()),t.innerHTML=`
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${pr(e)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${o}
        </div>
    `,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),10),n&&n.initialize&&n.initialize(),M&&M({particleCount:100,spread:70,origin:{y:.6}})}function Ge(){const e=document.getElementById("gameOverlay");e&&(e.classList.remove("show"),setTimeout(()=>e.remove(),500)),P("currentGame",null)}function ko(){const e=document.getElementById("playerNameInput"),t=e.value.trim();if(!t){s("Please enter a player name!","error");return}if(I.includes(t)){s("Player already added!","error");return}I.push(t),e.value="",O(),I.length>=2&&(document.getElementById("startGameBtn").style.display="block"),s(`${t} added!`,"success")}function xo(e){const t=I[e];I.splice(e,1),O(),I.length<2&&(document.getElementById("startGameBtn").style.display="none"),s(`${t} removed!`,"info")}function O(){const e=document.getElementById("playersList");e&&(e.innerHTML=I.map((t,o)=>`
        <div class="player-item">
            <span>${t}</span>
            <button class="btn btn-sm btn-danger" onclick="removePlayer(${o})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join(""))}function Io(){document.getElementById("gamePlay").style.display="none",document.getElementById("playerSetup").style.display="block",V=0}function Co(){const e=document.getElementById("currentPlayer");e&&I.length>0&&(e.textContent=I[V])}function Bo(e,t){u.selectedCategory=e;const o=document.getElementById("categorySelection");o&&(o.style.display="none");const n=document.getElementById("playerSetup"),a=document.getElementById("gamePlay");(t==="neverHaveIEver"||t==="truthOrDare"||t==="wouldYouRather"||t==="mostLikelyTo"||t==="spinBottle")&&n?(n.style.display="block",O(),I.length>=2&&(document.getElementById("startGameBtn").style.display="block")):a&&(a.style.display="block",ue())}function Eo(e){document.getElementById("gamePlay").style.display="none",document.getElementById("categorySelection").style.display="block"}function ue(){const e=document.getElementById("categoryBadge");if(e){const t={classic:"Classic",gettingStarted:"Getting Started",normal:"Normal",spicy:"Spicy 🔥",couples:"Couples 💕"};e.textContent=t[u.selectedCategory]||"Classic",e.style.background={classic:"linear-gradient(45deg, #00ff88, #00d4ff)",gettingStarted:"linear-gradient(45deg, #4CAF50, #8BC34A)",normal:"linear-gradient(45deg, #2196F3, #03A9F4)",spicy:"linear-gradient(45deg, #ff0088, #ff4444)",couples:"linear-gradient(45deg, #E91E63, #FF4081)"}[u.selectedCategory]||"linear-gradient(45deg, #00ff88, #00d4ff)"}}function ae(e,t,o){const n=`${e}_${t}`;return(!u.questionQueues[n]||u.questionQueues[n].length===0)&&(u.questionQueues[n]=yr([...o])),u.questionQueues[n].shift()}function ne(e,t){const o=`${e}_${t}`;delete u.questionQueues[o]}function yr(e){const t=[...e];for(let o=t.length-1;o>0;o--){const n=Math.floor(Math.random()*(o+1));[t[o],t[n]]=[t[n],t[o]]}return t}window.gameModules=window.gameModules||{};window.addPlayer=ko;window.removePlayer=xo;window.selectGameCategory=Bo;window.changeCategoryMidGame=Eo;window.resetToPlayerSetup=Io;window.closeGame=Ge;const W={beerPongRules:{standard:{title:"📜 Standard Beer Pong Rules",description:"The official way to play Beer Pong",rules:[{name:"🔄 Balls Back",desc:"Both partners make cups = shoot again! No re-racks during bonus shots."},{name:"🔙 Behind-the-Back",desc:"Miss and grab the ball while it's on the table? Shoot behind your back for a bonus cup!"},{name:"⚡ Bouncing",desc:"Bounce shots count as 2 cups! But opponents can swat bounced shots away."},{name:"💪 Elbows",desc:"Keep those elbows behind the table edge when shooting. Breaking the plane = reshoot!"},{name:"👀 Eye-to-Eye",desc:"To decide who goes first, one player from each team shoots while making eye contact. First to make it wins!"},{name:"🔥 Fire",desc:"Make 2 in a row? Call 'heating up'. Make the 3rd? Call 'fire' and keep shooting until you miss!"},{name:"🏝️ Island",desc:"Once per game, call 'island' on an isolated cup. Make it = remove 2 cups!"},{name:"⏰ Overtime",desc:"Tied game? Each team sets up 3 cups in a triangle. No re-racks allowed!"},{name:"🙏 Redemption",desc:"Lost all cups? Keep shooting until you miss! Make them all = overtime!"},{name:"♻️ Re-racks",desc:"2 re-racks per game. Diamond, line, triangle - get creative!"},{name:"🧹 Tidying-up",desc:"Tighten those cups anytime! Keep the formation clean."}]},creator:{title:"🎯 Creator's Beer Pong Rules",description:"The way Beer Pong was meant to be played! 🍺",rules:[{name:"👀 Eye-to-Eye",desc:"Same as standard - stare into their soul while shooting to go first!"},{name:"♻️ Re-racks",desc:"2 per game - get creative with those formations!"},{name:"🎩 Gentleman",desc:"Call 'Gentleman' to tidy cups OR force opponent to line up their last 2 cups!"},{name:"🔄 Balls Back",desc:"Both make it = balls back baby! Keep that momentum going!"},{name:"⚡ Bouncing",desc:"Bounce = 2 cups removed! High risk, high reward!"},{name:"💪 Elbows",desc:"Watch those elbows - we're not playing reach pong!"},{name:"🏝️ Island",desc:"Isolated cup = 2 cups removed when made. Call it out!"},{name:"🎪 Trickshot",desc:"Ball on table after miss? Any creative shot = 2 cups! Behind back is for beginners!"},{name:"💥 Double Trouble",desc:"Same cup hit twice? That cup + ALL touching cups are gone! Legendary move!"},{name:"🎮 Redemption 2.0",desc:"Lost all cups? Make one to stay alive - but nothing gets removed! It's sudden death mode!"}]}},specialBeerPongRules:{classic:["🎯 Make a rule! Everyone must follow it for the rest of the game","🔄 Switch sides! Both teams swap positions","💃 Dance before shooting! Do a 10-second dance before each shot","🎵 Sing while shooting! Must sing during your entire turn","🎭 Accent round! Speak in an accent for 5 minutes","🤐 Silent round! No talking for 2 rounds","👯 Mirror mode! Copy everything your opponent does","🎯 Call your shot! Must call which cup you're aiming for","⏰ Speed round! 5-second shot clock for next 3 shots","🤡 Compliment battle! Compliment opponents before each shot"],gettingStarted:["🎯 Nice shot bonus! Make a cup = opponent drinks water","🤝 Team spirit! High five after every shot","🎵 Theme song! Pick a song to play during your turn","📣 Announce your shots! Describe your technique before shooting","🎪 Celebration dance! Do a victory dance after making a cup","👏 Applause rule! Everyone claps after a made cup","🎯 Practice shot! Get one practice shot per turn","🤗 Encouragement only! Only positive comments allowed","🎯 Second chance! Miss = get one retry per game","🏆 MVP! Best shot of the round gets to make a rule"],normal:["👁️ Blindfold shot! Next shot must be taken blindfolded","🤝 Partner shot! Both teammates must hold the ball together","🎪 Trick shot only! Next 3 shots must be trick shots","🚫 No elbows! Next round, elbows must stay at your sides","🦩 Flamingo stance! Stand on one leg for your next shot","🔄 Opposite hand! Use your non-dominant hand for 2 turns","🎪 Spin before shooting! Do 3 spins before taking your shot","💪 Push-up penalty! Do 5 push-ups if you miss","🎯 Behind the back only! All shots must be behind the back","🤸 Gymnastics shot! Do a cartwheel before shooting"],spicy:["👕 Strip pong! Remove clothing item when opponent makes cup","💋 Kiss for miss! Miss = kiss your teammate","🍑 Distraction allowed! Opponents can distract however they want","📱 Phone roulette! Text your ex 'I miss you'","🔥 Hot seat! Answer any question or take 2 shots","💃 Sexy dance! Do a lap dance if you miss","🎯 Body shots! Made cup = body shot off opponent","👅 Lick it! Lick the ball before shooting","🔥 Truth shot! Make cup = opponent answers truth question","💋 Make out break! Teams make out for 30 seconds"],couples:["💑 Couple shots! Partners must be touching while shooting","💋 Kiss for cups! Make a cup = kiss your partner","🤝 Trust shot! Partner guides your blindfolded shot","💕 Compliment rule! Compliment partner before each shot","🎯 Love wins! Make 2 in a row = opponents kiss","👫 Switch partners! Play with opponent's partner for 1 round","💑 Couple's choice! Make cup = give opponents a couple dare","❤️ Heart eyes! Maintain eye contact with partner while shooting","💋 Victory kiss! Kiss for 10 seconds after making a cup","🤗 Support system! Hug partner after every shot"]},specialBeerPongDares:{classic:["Take a shot chosen by opponents","Do 20 jumping jacks","Sing the alphabet backwards","Do your best impression of someone in the room","Tell your most embarrassing story","Do the chicken dance for 1 minute","Speak in rhymes for the next 5 minutes","Call a random contact and say 'I love you'","Do 10 push-ups","Let opponents choose your next drink"],gettingStarted:["Give someone a high five","Tell a joke","Do your best dance move","Sing your favorite song chorus","Give someone a compliment","Do 5 jumping jacks","Share a fun fact about yourself","Do your best animal impression","Tell us your hidden talent","Make everyone laugh"],normal:["Let opponents post something on your social media","Do 20 burpees right now","Let everyone go through your phone for 30 seconds","Show your last 5 Google searches","Let opponents give you a nickname for the night","Swap an item of clothing with an opponent","Let opponents draw on your face with marker","Chug a mystery drink made by opponents","Let everyone read your last text conversation","Freestyle rap for 30 seconds"],spicy:["Call your crush and tell them you're thinking of them","Send a nude to your ex (or pretend to)","Reveal your body count","Let opponents go through your dating apps","Do a strip tease for 30 seconds","Make out with someone chosen by opponents","Send a dirty text to someone","Reveal your biggest kink","Take a body shot off someone","Flash everyone for 3 seconds"],couples:["Kiss your partner for 30 seconds","Give your partner a lap dance","Reveal your partner's most annoying habit","Let your partner post on your social media","Switch clothes with your partner","Tell everyone your partner's biggest fear","Massage your partner for 1 minute","Share your wildest experience together","Feed your partner a shot","Whisper your fantasy to your partner"]},neverHaveIEver:{classic:["Never have I ever been kicked out of a bar or club","Never have I ever lied about my age to get into a club","Never have I ever karaoke'd while drunk","Never have I ever lost my phone on a night out","Never have I ever thrown up in public","Never have I ever called in sick when I wasn't","Never have I ever fallen asleep at work/in class","Never have I ever gotten a tattoo I regret","Never have I ever crashed a wedding or private party","Never have I ever danced on a table or bar","Never have I ever pretended to be someone else online","Never have I ever accidentally sent a text to the wrong person","Never have I ever forgotten someone's name right after being introduced","Never have I ever laughed at something I didn't understand","Never have I ever pretended to know a song I'd never heard","Never have I ever fallen asleep during a movie in theaters","Never have I ever googled myself","Never have I ever tried to look cool and failed miserably","Never have I ever pretended my phone was dead to avoid talking","Never have I ever used fake ID","Never have I ever been caught talking to myself","Never have I ever pretended to be sick to get out of something","Never have I ever accidentally liked an old photo while stalking someone","Never have I ever said 'I'm almost there' when I haven't left yet","Never have I ever fallen asleep on public transport and missed my stop","Never have I ever pretended to understand directions and gotten completely lost","Never have I ever waved back at someone who wasn't waving at me","Never have I ever practiced conversations in my head before making phone calls","Never have I ever pretended to text someone to avoid awkward situations","Never have I ever sang in the shower and thought I sounded amazing"],gettingStarted:["Never have I ever traveled to another continent","Never have I ever gone skydiving","Never have I ever been on TV","Never have I ever met a celebrity","Never have I ever won a competition","Never have I ever been in a helicopter","Never have I ever gone surfing","Never have I ever stayed up for 24 hours straight","Never have I ever eaten something I couldn't identify","Never have I ever gotten lost in a foreign country","Never have I ever tried a food I couldn't pronounce","Never have I ever been in a limousine","Never have I ever seen the ocean","Never have I ever been to a music festival","Never have I ever ridden a horse","Never have I ever been camping","Never have I ever been to a wedding","Never have I ever tried sushi","Never have I ever been on a blind date","Never have I ever been to a zoo","Never have I ever tried karaoke","Never have I ever been to a casino","Never have I ever been on a road trip longer than 8 hours","Never have I ever been to a professional sports game","Never have I ever tried ice skating","Never have I ever been to a museum","Never have I ever tried skiing or snowboarding","Never have I ever been to a comedy show","Never have I ever been to a farmers market","Never have I ever tried rock climbing","Never have I ever been to a drive-in movie","Never have I ever been on a boat","Never have I ever tried mini golf","Never have I ever been to a theme park","Never have I ever tried bowling","Never have I ever been to a library as an adult","Never have I ever tried fishing","Never have I ever been to a bookstore and stayed for hours","Never have I ever tried a cooking class"],normal:["Never have I ever ghosted someone","Never have I ever sent a risky text to the wrong person","Never have I ever walked into a glass door","Never have I ever farted loudly in a quiet room","Never have I ever tripped and fallen in front of a crowd","Never have I ever accidentally sent a screenshot to the person I was talking about","Never have I ever lied on my resume","Never have I ever eaten food off the floor","Never have I ever gone 3+ days without showering","Never have I ever broken something and blamed someone else","Never have I ever pretended to know how to cook something and completely messed it up","Never have I ever cried during a commercial","Never have I ever stalked someone on social media for hours","Never have I ever pretended to be asleep to avoid doing something","Never have I ever eaten an entire pizza by myself","Never have I ever Googled someone before a first date","Never have I ever pretended to be busy to avoid hanging out with someone","Never have I ever taken a selfie in a public bathroom","Never have I ever bought something expensive and hid it from family/friends","Never have I ever pretended to have read a book I never actually read","Never have I ever used someone else's Netflix password without asking","Never have I ever fallen asleep while someone was talking to me","Never have I ever pretended my internet was down to avoid video calls","Never have I ever eaten expired food because I was too lazy to go shopping","Never have I ever lied about my weight or height","Never have I ever pretended to like a gift I actually hated","Never have I ever checked my ex's social media obsessively","Never have I ever pretended to understand a movie that made no sense","Never have I ever bought clothes online in the wrong size and kept them anyway","Never have I ever pretended to be someone else's friend for personal benefit"],spicy:["Never have I ever kissed someone I just met","Never have I ever had a one night stand","Never have I ever skinny dipped","Never have I ever done a body shot","Never have I ever slept with a coworker","Never have I ever hooked up with a professor/boss","Never have I ever been in a hot tub with strangers","Never have I ever woken up wearing someone else's clothes","Never have I ever dated two people at once","Never have I ever kissed someone to make someone else jealous","Never have I ever sent a flirty text to the wrong person","Never have I ever had a crush on my friend's sibling","Never have I ever made out in a car","Never have I ever had a friends with benefits situation","Never have I ever kissed someone on the first date","Never have I ever had a romantic encounter at work","Never have I ever sent or received a sext","Never have I ever had a one night stand with someone I met online","Never have I ever fooled around in a public place","Never have I ever had a threesome fantasy","Never have I ever kissed someone the same night I met them","Never have I ever hooked up with someone significantly older/younger","Never have I ever had a romantic encounter while traveling","Never have I ever made the first move on someone","Never have I ever had a crush on a celebrity and fantasized about them","Never have I ever hooked up with someone I shouldn't have","Never have I ever been in a relationship for the wrong reasons","Never have I ever kissed multiple people in the same night","Never have I ever had a romantic encounter in an unusual location","Never have I ever pretended to be single when I wasn't"],couples:["Never have I ever been in love with my best friend","Never have I ever broken up with someone over text","Never have I ever stalked an ex on social media","Never have I ever been in love with two people at once","Never have I ever cheated or been cheated on","Never have I ever had a crush on my partner's friend","Never have I ever lied to my partner about where I was","Never have I ever kept a secret from my partner","Never have I ever dreamt about someone else while in a relationship","Never have I ever compared my partner to an ex","Never have I ever snooped through my partner's phone","Never have I ever pretended to like my partner's friends when I didn't","Never have I ever faked being happy about a gift my partner gave me","Never have I ever been jealous of my partner's ex","Never have I ever gone through my partner's social media","Never have I ever pretended to enjoy something my partner loves","Never have I ever had doubts about my relationship but stayed anyway","Never have I ever been tempted to cheat but didn't","Never have I ever lied about how much something cost to my partner","Never have I ever been embarrassed by something my partner did in public","Never have I ever fantasized about someone else during intimacy","Never have I ever pretended to be asleep to avoid intimacy","Never have I ever checked up on my partner without them knowing","Never have I ever been in love with two people at the same time","Never have I ever kept a major secret from my partner","Never have I ever regretted introducing my partner to my family","Never have I ever pretended my partner's cooking was good when it wasn't","Never have I ever been attracted to one of my partner's friends","Never have I ever thought about breaking up during a fight","Never have I ever wished my partner would change something about themselves"]},truths:{classic:["What's your most embarrassing drunk story?","What's the biggest lie you've ever told?","What's the most trouble you've gotten into?","Have you ever been caught doing something you shouldn't?","What's your worst habit that no one knows about?","Who in this room has the best style?","Who here would you want to switch lives with?","What's the most embarrassing thing on your phone right now?","What's the craziest thing you've done for money?","What's your most embarrassing moment?","What's the weirdest thing you've eaten and actually liked?","What's your most irrational fear?","What's the worst haircut you've ever had?","What's your most embarrassing childhood memory?","What's the strangest thing you believed as a child?","What's your worst fashion mistake?","What's the most embarrassing thing you've done in front of your parents?","What's your weirdest habit that no one knows about?","What's the most embarrassing thing you've said to someone you had a crush on?","What's your most awkward encounter with a celebrity or famous person?","What's the worst advice you've ever given someone?","What's your most embarrassing social media post?","What's the weirdest place you've fallen asleep?","What's your most embarrassing autocorrect fail?","What's the strangest compliment you've ever received?","What's your worst 'foot in mouth' moment?","What's the most embarrassing thing you've done while trying to impress someone?","What's your weirdest dream that you still remember?","What's the most childish thing you still secretly enjoy?"],gettingStarted:["What's your dream vacation destination?","What's your biggest fear?","What's your hidden talent?","What's the best compliment you've ever received?","What's your favorite childhood memory?","If you could have dinner with anyone, who would it be?","What's your biggest pet peeve?","What's the best advice you've ever received?","What's your guilty pleasure TV show?","What's something you've never told anyone?","What's your favorite memory from this year?","What's something you're really proud of?","What's your biggest goal for next year?","What's your favorite thing about yourself?","What's the nicest thing someone has ever done for you?","What's your favorite family tradition?","What's something you're grateful for today?","What's your favorite way to relax?","What's the best gift you've ever received?","What's your favorite season and why?","What's something you've always wanted to learn?","What's your favorite childhood toy?","What's the best book you've ever read?","What's your favorite type of music?","What's something that always makes you smile?","What's your favorite food that reminds you of home?","What's the most beautiful place you've ever been?","What's something you're looking forward to?","What's your favorite thing to do on weekends?"],normal:["What's the weirdest thing you do when you're alone?","What's your most embarrassing Google search?","Who here do you think has the biggest secret?","What's the last lie you told?","What's your most irrational fear?","What's the most childish thing you still do?","What's your worst dating app experience?","What's the most embarrassing thing your parents have caught you doing?","What's your biggest insecurity?","What's the meanest thing you've ever said to someone?","What's your most embarrassing browser history?","What's the weirdest thing in your fridge right now?","What's your most embarrassing habit when you think no one is watching?","What's the strangest thing you've done for attention?","What's your most embarrassing moment in school?","What's the weirdest thing you've googled recently?","What's your most embarrassing text message fail?","What's the strangest thing you've pretended to like to impress someone?","What's your most embarrassing moment at work?","What's the weirdest thing you've done when you couldn't sleep?","What's your most embarrassing social media stalking story?","What's the strangest thing you've done while home alone?","What's your most embarrassing moment in a public bathroom?","What's the weirdest thing you've done to avoid someone?","What's your most embarrassing shopping experience?","What's the strangest thing you've done to get out of a conversation?","What's your most embarrassing moment with technology?","What's the weirdest thing you've done while procrastinating?","What's your most embarrassing moment trying to be cool?"],spicy:["What's your biggest turn on?","Who was your worst kiss and why?","Who in this room would you most want to make out with?","What's the wildest place you've hooked up?","What's your wildest fantasy?","What's the most illegal thing you've done?","If you had to date someone here, who would it be?","What's your body count?","What's the kinkiest thing you've ever done?","Who in this room do you think is the best looking?","What's your most embarrassing sexual experience?","What's the most scandalous thing you've done in public?","What's your biggest sexual regret?","What's the wildest thing on your bucket list?","What's your most embarrassing bedroom story?","What's the most adventurous thing you've ever done?","What's your biggest secret crush right now?","What's the most inappropriate place you've been turned on?","What's your most embarrassing dating story?","What's the wildest thing you've done while drunk?","What's your biggest turn-off in bed?","What's the most embarrassing thing you've said during intimacy?","What's your most scandalous text message exchange?","What's the wildest place you've fantasized about someone?","What's your biggest relationship deal-breaker?","What's the most embarrassing thing you've done to get someone's attention?","What's your wildest 'what if' fantasy about someone you know?","What's the most inappropriate thought you've had about someone here?","What's your biggest secret that would shock everyone here?"],couples:["What's the most embarrassing thing you've done for love?","Have you ever been in love with two people at once?","Have you ever cheated or been cheated on?","What's your biggest relationship regret?","What's the longest you've gone without sex in a relationship?","What's something your partner does that annoys you?","Have you ever faked an orgasm?","What's your partner's most annoying habit?","What's something you've lied to your partner about?","If you could change one thing about your partner, what would it be?","What's the most romantic thing you've ever done for someone?","What's your biggest fear about relationships?","What's the worst breakup line you've ever used or heard?","What's your most embarrassing moment with your current or ex partner?","What's the biggest sacrifice you've made for love?","What's your biggest relationship insecurity?","What's the most embarrassing thing your partner has caught you doing?","What's your biggest turn-on about your partner?","What's something you wish your partner would do more of?","What's your most embarrassing couple's fight about?","What's the weirdest thing you and your partner do together?","What's your biggest relationship pet peeve?","What's the most embarrassing thing you've done while jealous?","What's your most cringe-worthy romantic gesture?","What's something you've never told your partner but want to?","What's your biggest relationship deal-breaker that you've overlooked?","What's the most embarrassing thing about your dating history?","What's your most irrational relationship worry?","What's the weirdest thing that turns you on about your partner?"]},dares:{classic:["Do 10 pushups","Plank for 1 minute","Sing everything you say for the next 2 turns","Speak in an accent for the next 3 rounds","Act like a chicken for 1 minute","Do your best impression of someone in the room","Take a shot without using your hands","Finish your drink","Do 20 jumping jacks","Tell a joke and make someone laugh","Do your best moonwalk","Sing the alphabet backwards","Do a cartwheel (or attempt one)","Pretend to be a weather reporter for 1 minute","Do your best zombie impression","Hop on one foot for 30 seconds","Do 15 sit-ups","Pretend to be a robot for 1 minute","Do your best opera singing voice","Act out your morning routine in fast forward","Do a dramatic reading of a text message","Pretend to be a news anchor reporting on the party","Do your best runway model walk","Act like you're underwater for 1 minute","Do 10 burpees","Pretend to be a mime stuck in a box","Do your best superhero pose and hold it for 30 seconds","Act out a movie scene without speaking","Do the funky chicken dance"],gettingStarted:["Show your best dance move","Sing the chorus of your favorite song","Do your best celebrity impression","Tell your most embarrassing story","Show the last photo in your camera roll","Do 5 pushups","Speak in a British accent for 2 turns","Make animal noises for 30 seconds","Do the robot dance","High five everyone in the room","Do a silly face for 10 seconds","Clap your hands above your head 20 times","Do your best ballerina spin","Make everyone laugh without speaking","Do 3 jumping jacks","Show your best thumbs up pose","Do a funny walk across the room","Make your silliest sound for 15 seconds","Do your best statue impression for 30 seconds","Show everyone your best smile","Do a gentle dance for 20 seconds","Make a toast to everyone in the room","Do your best wave like you're famous","Show your most creative hand gesture","Do a simple magic trick (or pretend to)","Give everyone a compliment","Do your best 'thinking' pose","Show your victory celebration dance","Make everyone say 'aww' without using words"],normal:["Let someone draw on your face with marker","Let someone style your hair however they want","Post an ugly selfie","Let someone text anyone from your phone","Eat a spoonful of hot sauce","Let the group choose someone for you to call and sing to","Make a gross drink combination and take a sip","Waterfall for 5 seconds","Let someone go through your phone for 30 seconds","Do the worm","Let someone pick your next Instagram story","Do a handstand against the wall for 10 seconds","Let the group give you a new nickname for the night","Eat a weird food combination chosen by the group","Let someone rearrange your hair with just their hands","Do your best impression of a baby for 1 minute","Let someone write something funny on your arm","Try to lick your own elbow for 30 seconds","Let the group choose your next profile picture","Do 25 jumping jacks while singing","Let someone apply makeup on you blindfolded","Try to touch your nose with your tongue for 15 seconds","Let someone mess up your outfit for 2 rounds","Do your best runway walk in slow motion","Let the group pick an embarrassing song for you to sing","Try to do a split (or your best attempt)","Let someone give you a temporary tattoo with a pen","Do your best interpretive dance for 45 seconds","Let the group choose a funny filter for your next selfie"],spicy:["Do your best twerk for 30 seconds","Give someone a lap dance for 10 seconds","Kiss the person to your left on the cheek","Give someone a 30 second massage","Switch an item of clothing with someone","Whisper something dirty to the person on your right","Post 'I'm pregnant' on your story for 1 minute","Like your crush's oldest Instagram photo","Send the last photo in your gallery to your ex","Take a body shot off someone","Do a sexy dance for 45 seconds","Let someone blindfold you and feed you something","Give someone a sensual shoulder massage for 1 minute","Do your best seductive walk across the room","Let someone tie your hands behind your back for 2 rounds","Whisper your biggest turn-on to the person next to you","Do a strip tease to your socks (keep clothes on!)","Let someone apply lipstick on you while blindfolded","Give someone a flirty compliment in a sexy voice","Do your best impression of a romantic movie scene","Let someone feed you whipped cream or chocolate","Dance seductively with an imaginary partner","Let someone give you a hickey on your arm","Do your sexiest runway model pose for 30 seconds","Let someone write something flirty on your body","Give someone bedroom eyes for 20 seconds","Do a sensual dance with the person to your right","Let someone mess up your hair in a 'just woke up' style","Recreate your most seductive selfie pose live"],couples:["Give your partner a 1 minute massage","Recreate your first kiss with your partner","Let your partner post something on your social media","Switch clothes with your partner for the rest of the game","Slow dance with your partner for 1 minute","Tell everyone your partner's most annoying habit","Let your partner draw on your face","Feed your partner a shot","Sit on your partner's lap for the next 3 rounds","Whisper your wildest fantasy to your partner","Give your partner a romantic kiss on the forehead","Let your partner style your hair however they want","Do a couple's dance together for 1 minute","Let your partner choose your next drink","Give your partner a piggyback ride across the room","Let your partner apply makeup on you","Share your most embarrassing couple moment with everyone","Let your partner pick your outfit for tomorrow","Do 10 couple push-ups together (facing each other)","Let your partner give you a new hairstyle using only their hands","Feed each other something blindfolded","Do your partner's signature dance move together","Let your partner choose your next social media post","Give your partner a foot massage for 1 minute","Let your partner draw a heart on your face","Do the lift from Dirty Dancing (safely!)","Let your partner choose a pet name for you to use all night","Give your partner your phone for them to text anyone","Let your partner give you a makeover using whatever's available"]},wouldYouRather:{classic:["Would you rather have to sing everything you say or dance everywhere you walk?","Would you rather be the funniest person in the room or the smartest?","Would you rather never be able to drink alcohol again or never be able to eat chocolate again?","Would you rather have a rewind button or a pause button for your life?","Would you rather go to a party where you know everyone or where you know no one?","Would you rather always smell like garlic or always smell like wet dog?","Would you rather be able to fly or be invisible?","Would you rather be rich or famous?","Would you rather lose your phone or your wallet?","Would you rather always be 10 minutes late or 20 minutes early?"],gettingStarted:["Would you rather have unlimited money or unlimited time?","Would you rather live in the city or the countryside?","Would you rather be able to read minds or see the future?","Would you rather travel to the past or the future?","Would you rather have a pet dragon or a pet unicorn?","Would you rather be a superhero or a supervillain?","Would you rather never use social media again or never watch TV again?","Would you rather always tell the truth or always lie?","Would you rather have super strength or super speed?","Would you rather live without music or without movies?"],normal:["Would you rather have fingers as long as legs or legs as short as fingers?","Would you rather drunk text your ex or your boss?","Would you rather throw up in front of your crush or pee yourself at a party?","Would you rather be able to fly but only 1 foot off the ground or be invisible but only when no one is looking?","Would you rather eat a live spider or a dead worm?","Would you rather swim in a pool of beer or a pool of wine?","Would you rather burp glitter or fart confetti?","Would you rather have a third arm or a third leg?","Would you rather always speak in rhymes or sing everything you say?","Would you rather have taste buds in your butt or poop through your mouth?"],spicy:["Would you rather date someone who's extremely hot but boring or average looking but hilarious?","Would you rather have sex with the lights on always or off always?","Would you rather be naked in public or have everyone read your texts?","Would you rather give up sex or give up food?","Would you rather have a threesome or be in an open relationship?","Would you rather sleep with your boss or your best friend's partner?","Would you rather be dominant or submissive?","Would you rather have great sex once a month or mediocre sex every day?","Would you rather be caught masturbating or catch your parents doing it?","Would you rather send nudes to your ex or your boss?"],couples:["Would you rather have your partner be best friends with their ex or hate their ex?","Would you rather catch your parents having sex or have them catch you?","Would you rather be in a relationship with someone who's too clingy or too distant?","Would you rather know when you're going to die or how you're going to die?","Would you rather have your partner forget your birthday or your anniversary?","Would you rather have a partner who's too jealous or not jealous at all?","Would you rather argue every day for a week or not talk for a week?","Would you rather have your partner be a bad kisser or bad in bed?","Would you rather live with your partner's parents or have them live with you?","Would you rather have your partner cheat emotionally or physically?"]},mostLikelyTo:{classic:["Who's most likely to get kicked out of a club?","Who's most likely to throw up tonight?","Who's most likely to become famous?","Who's most likely to become a millionaire?","Who's most likely to forget their own birthday?","Who's most likely to get lost in their own city?","Who's most likely to cry during a Disney movie?","Who's most likely to eat food off the floor?","Who's most likely to laugh at their own jokes?","Who's most likely to lose their phone tonight?"],gettingStarted:["Who's most likely to win a Nobel Prize?","Who's most likely to travel the world?","Who's most likely to write a book?","Who's most likely to start their own business?","Who's most likely to become a teacher?","Who's most likely to adopt a pet?","Who's most likely to learn a new language?","Who's most likely to run a marathon?","Who's most likely to become vegetarian?","Who's most likely to move to another country?"],normal:["Who's most likely to drunk text their ex?","Who's most likely to end up sleeping on the bathroom floor?","Who's most likely to go to jail?","Who's most likely to die first in a zombie apocalypse?","Who's most likely to have 10 kids?","Who's most likely to get a weird tattoo?","Who's most likely to join a cult?","Who's most likely to become a crazy cat person?","Who's most likely to marry for money?","Who's most likely to fake their own death?"],spicy:["Who's most likely to have a one night stand?","Who's most likely to have a secret crush on someone here?","Who's most likely to sleep with their boss?","Who's most likely to have a threesome?","Who's most likely to send nudes?","Who's most likely to have sex in public?","Who's most likely to date two people at once?","Who's most likely to have a sugar daddy/mommy?","Who's most likely to do porn?","Who's most likely to have the highest body count?"],couples:["Who's most likely to get married first?","Who's most likely to cheat on their partner?","Who's most likely to fall in love with their best friend?","Who's most likely to have kids first?","Who's most likely to forget their anniversary?","Who's most likely to get divorced?","Who's most likely to propose in public?","Who's most likely to have a destination wedding?","Who's most likely to elope?","Who's most likely to stay single forever?"]},spinBottleTasks:{classic:["Give a compliment","Share your most embarrassing moment","Do your best impression of someone here","Sing a song for 30 seconds","Tell them something you like about them","Do a silly dance together","Take a selfie together","Give them a high five","Tell a joke","Share a secret"],gettingStarted:["Give them a hug","Say something nice about them","Show them your best dance move","Teach them your secret handshake","Play rock paper scissors","Thumb wrestle","Staring contest for 30 seconds","Tell them your favorite thing about the party","Share your worst pickup line","Do 5 jumping jacks together"],normal:["Let them post something on your social media","Give a 30 second massage","Whisper something in their ear","Do a trust fall","Sit on their lap for the next round","Feed them a snack","Let them style your hair","Arm wrestle","Let them draw on your hand","Share an embarrassing photo from your phone"],spicy:["Kiss on the cheek","Give a lap dance for 10 seconds","Switch an item of clothing","Take a body shot","Play with their hair for 1 minute","Whisper your dirtiest thought","Lick their ear","Give them a hickey","Make out for 10 seconds","Remove an item of clothing"],couples:["Kiss for 30 seconds","Give your partner a 1 minute massage","Whisper what you want to do later","Share your favorite memory together","Recreate your first kiss","Slow dance for 1 minute","Feed each other a shot","Tell them what you love most about them","Give them a lap dance","Make out until the next turn"]},trivia:[{question:"When was HSG founded?",options:["1898","1923","1945","1967"],correct:0},{question:"What does HSG stand for?",options:["High School Gymnasium","Hochschule St. Gallen","Higher Studies Group","Helvetic Study Group"],correct:1},{question:"How many students attend HSG?",options:["5,000","9,000","12,000","15,000"],correct:1},{question:"What's the most popular major at HSG?",options:["Law","Business Administration","Computer Science","International Affairs"],correct:1}],triviaCategories:{sports:[{question:"Which country has won the most FIFA World Cups?",options:["Germany","Brazil","Argentina","Italy"],correct:1},{question:"How many players are on a basketball court at one time?",options:["8","10","12","14"],correct:1},{question:"In which year were the first modern Olympics held?",options:["1896","1900","1904","1912"],correct:0},{question:"What is the maximum score in 10-pin bowling?",options:["200","250","300","350"],correct:2},{question:"Which tennis player has won the most Grand Slam titles?",options:["Roger Federer","Rafael Nadal","Novak Djokovic","Pete Sampras"],correct:2},{question:"How long is a marathon?",options:["40.2 km","41.2 km","42.2 km","43.2 km"],correct:2},{question:"Which sport is known as 'The Beautiful Game'?",options:["Basketball","Football/Soccer","Tennis","Golf"],correct:1},{question:"How many rings are on the Olympic flag?",options:["4","5","6","7"],correct:1},{question:"In golf, what is an eagle?",options:["1 under par","2 under par","3 under par","Par"],correct:1},{question:"Which country invented ice hockey?",options:["USA","Russia","Canada","Sweden"],correct:2},{question:"Which footballer is known as 'CR7'?",options:["Messi","Ronaldo","Neymar","Mbappé"],correct:1},{question:"How many Grand Slam tournaments are there in tennis each year?",options:["3","4","5","6"],correct:1},{question:"In American football, how many points is a touchdown worth?",options:["5","6","7","8"],correct:1},{question:"Which city will host the 2028 Summer Olympics?",options:["Paris","Los Angeles","Brisbane","Tokyo"],correct:1},{question:"What is the term for scoring three goals in hockey?",options:["Triple","Hat trick","Three-pointer","Trilogy"],correct:1},{question:"Which sport uses terms like 'slam dunk' and 'alley-oop'?",options:["Volleyball","Basketball","Tennis","Badminton"],correct:1},{question:"How many periods are in a standard hockey game?",options:["2","3","4","5"],correct:1},{question:"Which boxer was known as 'The Greatest'?",options:["Mike Tyson","Muhammad Ali","Floyd Mayweather","Rocky Balboa"],correct:1},{question:"In which sport would you perform a slam dunk?",options:["Volleyball","Basketball","Tennis","Football"],correct:1},{question:"How long is a standard NFL game?",options:["90 minutes","60 minutes","120 minutes","80 minutes"],correct:1},{question:"Which country dominates in Formula 1 with the most constructor championships?",options:["Italy","Germany","United Kingdom","France"],correct:0},{question:"What is the maximum weight for heavyweight boxing?",options:["No limit","250 lbs","300 lbs","200 lbs"],correct:0},{question:"In baseball, what is it called when a batter hits all four bases in one play?",options:["Grand slam","Home run","Triple","Bases loaded"],correct:1},{question:"Which swimming stroke is fastest?",options:["Backstroke","Breaststroke","Freestyle","Butterfly"],correct:2},{question:"How many players are on a soccer field at one time per team?",options:["10","11","12","9"],correct:1},{question:"Which NBA team has won the most championships?",options:["Lakers","Celtics","Warriors","Bulls"],correct:1},{question:"What is the highest possible score in ten-pin bowling?",options:["250","300","350","400"],correct:1},{question:"In which sport is the Stanley Cup awarded?",options:["Basketball","Football","Ice Hockey","Baseball"],correct:2},{question:"How many points is a field goal worth in American football?",options:["2","3","6","7"],correct:1},{question:"Which sport features positions called 'scrum-half' and 'fly-half'?",options:["American Football","Rugby","Soccer","Australian Football"],correct:1},{question:"In tennis, what is the term for a score of 40-40?",options:["Match point","Deuce","Advantage","Set point"],correct:1},{question:"Which Formula 1 driver holds the record for most race wins?",options:["Michael Schumacher","Lewis Hamilton","Ayrton Senna","Sebastian Vettel"],correct:1},{question:"How many holes are played in a standard round of golf?",options:["16","18","20","22"],correct:1},{question:"In which sport would you find a 'libero'?",options:["Basketball","Volleyball","Soccer","Handball"],correct:1},{question:"What is the term for a perfect game in bowling?",options:["Strike out","Clean sweep","Perfect 300","All strikes"],correct:2},{question:"Which cyclist has won the most Tour de France titles?",options:["Lance Armstrong","Eddy Merckx","Miguel Indurain","Jacques Anquetil"],correct:1},{question:"In swimming, which stroke must you use in an Individual Medley first?",options:["Freestyle","Backstroke","Butterfly","Breaststroke"],correct:2},{question:"What is the term for scoring two under par on a golf hole?",options:["Birdie","Eagle","Albatross","Bogey"],correct:1},{question:"Which sport is played at Wimbledon?",options:["Cricket","Tennis","Badminton","Squash"],correct:1},{question:"How many substitutions are allowed in soccer during regular play?",options:["3","5","7","Unlimited"],correct:1},{question:"In which sport would you perform a 'slam dunk'?",options:["Volleyball","Basketball","Tennis","Badminton"],correct:1},{question:"What is the maximum number of sets in a men's tennis Grand Slam match?",options:["3","5","7","9"],correct:1},{question:"Which sport uses the term 'love' for a score of zero?",options:["Tennis","Badminton","Squash","All of the above"],correct:3},{question:"In basketball, how many personal fouls result in disqualification?",options:["5","6","7","8"],correct:1},{question:"What is the diameter of a basketball hoop?",options:["16 inches","18 inches","20 inches","22 inches"],correct:1},{question:"Which sport features the 'Fosbury Flop' technique?",options:["Long jump","High jump","Pole vault","Triple jump"],correct:1},{question:"How many minutes are in a standard soccer match including stoppage time?",options:["90+","100","120","80"],correct:0},{question:"In which sport would you use a shuttlecock?",options:["Tennis","Squash","Badminton","Table tennis"],correct:2},{question:"What is the term for hitting a golf ball into the water?",options:["Water hazard","Penalty stroke","Splash shot","Aqua bogey"],correct:0},{question:"Which sport is known as 'America's Pastime'?",options:["Basketball","Football","Baseball","Hockey"],correct:2},{question:"In track and field, what is the standard distance for a marathon?",options:["26.2 miles","25 miles","27 miles","30 miles"],correct:0},{question:"Which sport uses terms like 'spike' and 'dig'?",options:["Tennis","Volleyball","Badminton","Squash"],correct:1},{question:"How many points is a safety worth in American football?",options:["1","2","3","6"],correct:1},{question:"In which sport would you find a 'wicket'?",options:["Baseball","Cricket","Field Hockey","Lacrosse"],correct:1},{question:"What is the term for a score of one under par in golf?",options:["Eagle","Birdie","Bogey","Albatross"],correct:1},{question:"Which swimmer holds the most Olympic gold medals?",options:["Mark Spitz","Michael Phelps","Ian Thorpe","Katie Ledecky"],correct:1},{question:"In tennis, what surface is used at the French Open?",options:["Grass","Hard court","Clay","Synthetic"],correct:2},{question:"How many innings are in a standard baseball game?",options:["7","8","9","10"],correct:2},{question:"Which sport is Tiger Woods famous for?",options:["Tennis","Golf","Swimming","Athletics"],correct:1},{question:"What is the maximum score possible in a single frame of bowling?",options:["20","25","30","35"],correct:2}],history:[{question:"In which year did World War II end?",options:["1943","1944","1945","1946"],correct:2},{question:"Who was the first President of the United States?",options:["Thomas Jefferson","George Washington","John Adams","Benjamin Franklin"],correct:1},{question:"The ancient city of Rome was built on how many hills?",options:["5","6","7","8"],correct:2},{question:"In which year did the Berlin Wall fall?",options:["1987","1988","1989","1990"],correct:2},{question:"Who painted the Mona Lisa?",options:["Michelangelo","Leonardo da Vinci","Raphael","Donatello"],correct:1},{question:"Which empire built Machu Picchu?",options:["Aztec","Maya","Inca","Olmec"],correct:2},{question:"In which year did Christopher Columbus reach the Americas?",options:["1490","1491","1492","1493"],correct:2},{question:"Who was known as the 'Iron Lady'?",options:["Queen Elizabeth II","Margaret Thatcher","Angela Merkel","Golda Meir"],correct:1},{question:"The French Revolution began in which year?",options:["1787","1788","1789","1790"],correct:2},{question:"Which ancient wonder of the world still stands today?",options:["Colossus of Rhodes","Great Pyramid of Giza","Hanging Gardens","Lighthouse of Alexandria"],correct:1},{question:"Which emperor built the Roman Colosseum?",options:["Julius Caesar","Augustus","Vespasian","Nero"],correct:2},{question:"In which year did the Titanic sink?",options:["1910","1911","1912","1913"],correct:2},{question:"Who was the first man to walk on the moon?",options:["Buzz Aldrin","Neil Armstrong","John Glenn","Alan Shepard"],correct:1},{question:"Which war was fought from 1914 to 1918?",options:["World War II","World War I","Korean War","Vietnam War"],correct:1},{question:"Who was the last Pharaoh of Egypt?",options:["Tutankhamun","Cleopatra VII","Ramesses II","Akhenaten"],correct:1},{question:"In which year did the United States gain independence?",options:["1775","1776","1777","1778"],correct:1},{question:"Which civilization built Stonehenge?",options:["Romans","Celts","Neolithic Britons","Vikings"],correct:2},{question:"Who led the Mongol Empire?",options:["Attila the Hun","Genghis Khan","Tamerlane","Kublai Khan"],correct:1},{question:"In which century did the Renaissance begin?",options:["13th","14th","15th","16th"],correct:1},{question:"Which country was first to give women the right to vote?",options:["United States","United Kingdom","New Zealand","Australia"],correct:2},{question:"Who wrote the Communist Manifesto?",options:["Lenin","Stalin","Marx and Engels","Trotsky"],correct:2},{question:"Which battle ended Napoleon's rule?",options:["Battle of Trafalgar","Battle of Waterloo","Battle of Leipzig","Battle of Austerlitz"],correct:1},{question:"In which year did the Soviet Union collapse?",options:["1989","1990","1991","1992"],correct:2},{question:"Who was the first Roman Emperor?",options:["Julius Caesar","Augustus","Caligula","Claudius"],correct:1},{question:"Which explorer discovered the Pacific Ocean for Europeans?",options:["Magellan","Balboa","Columbus","Cortés"],correct:1},{question:"In which year was John F. Kennedy assassinated?",options:["1962","1963","1964","1965"],correct:1},{question:"Which ancient civilization invented writing?",options:["Egyptians","Greeks","Sumerians","Chinese"],correct:2},{question:"Who was known as the Sun King?",options:["Henry VIII","Louis XIV","Napoleon","Charles V"],correct:1},{question:"Which war lasted from 1955 to 1975?",options:["Korean War","Vietnam War","Cold War","World War III"],correct:1},{question:"In which year did Hitler come to power in Germany?",options:["1932","1933","1934","1935"],correct:1},{question:"Which city was the capital of the Byzantine Empire?",options:["Rome","Athens","Constantinople","Alexandria"],correct:2},{question:"Who discovered penicillin?",options:["Louis Pasteur","Alexander Fleming","Marie Curie","Joseph Lister"],correct:1},{question:"Which revolution happened in 1917?",options:["French Revolution","American Revolution","Russian Revolution","Chinese Revolution"],correct:2},{question:"Who was the first female Prime Minister of the UK?",options:["Margaret Thatcher","Theresa May","Elizabeth I","Victoria"],correct:0},{question:"In which year was the United Nations founded?",options:["1944","1945","1946","1947"],correct:1},{question:"Which ancient Greek philosopher taught Alexander the Great?",options:["Socrates","Plato","Aristotle","Pythagoras"],correct:2},{question:"What was the name of the ship Charles Darwin sailed on?",options:["HMS Victory","HMS Beagle","HMS Endeavour","HMS Bounty"],correct:1},{question:"Which pope called for the First Crusade?",options:["Urban II","Gregory VII","Innocent III","Alexander VI"],correct:0},{question:"In which year did the Black Death peak in Europe?",options:["1347","1348","1349","1350"],correct:1},{question:"Who unified Germany in 1871?",options:["Wilhelm I","Otto von Bismarck","Frederick III","Heinrich Himmler"],correct:1},{question:"Which treaty ended World War I?",options:["Treaty of Paris","Treaty of Versailles","Treaty of Vienna","Treaty of Ghent"],correct:1},{question:"Who was the first person to circumnavigate the globe?",options:["Ferdinand Magellan","Juan Sebastián Elcano","Francis Drake","James Cook"],correct:1},{question:"Which empire was ruled by Hammurabi?",options:["Egyptian","Babylonian","Assyrian","Persian"],correct:1},{question:"In which year was the printing press invented?",options:["1440","1450","1455","1460"],correct:0},{question:"Who led the Indian independence movement?",options:["Jawaharlal Nehru","Mahatma Gandhi","Subhas Chandra Bose","Sardar Patel"],correct:1},{question:"Which civilization built Petra?",options:["Romans","Greeks","Nabataeans","Phoenicians"],correct:2},{question:"In which battle was Admiral Nelson killed?",options:["Battle of the Nile","Battle of Copenhagen","Battle of Trafalgar","Battle of Cape St Vincent"],correct:2},{question:"Who painted the ceiling of the Sistine Chapel?",options:["Leonardo da Vinci","Raphael","Michelangelo","Donatello"],correct:2},{question:"Which Spanish conquistador conquered the Aztec Empire?",options:["Francisco Pizarro","Hernán Cortés","Diego Velázquez","Vasco Núñez de Balboa"],correct:1},{question:"In which year did apartheid end in South Africa?",options:["1992","1993","1994","1995"],correct:2},{question:"Who was the first person in space?",options:["Neil Armstrong","Yuri Gagarin","John Glenn","Alan Shepard"],correct:1},{question:"Which king signed the Magna Carta?",options:["King Henry VIII","King Richard I","King John","King Edward I"],correct:2},{question:"In which year did the Great Fire of London occur?",options:["1665","1666","1667","1668"],correct:1},{question:"Who was the first Holy Roman Emperor?",options:["Charlemagne","Otto I","Frederick Barbarossa","Charles V"],correct:0},{question:"Which war was triggered by the assassination of Archduke Franz Ferdinand?",options:["Franco-Prussian War","World War I","Crimean War","Balkan Wars"],correct:1},{question:"In which year was the Suez Canal opened?",options:["1867","1868","1869","1870"],correct:2},{question:"Who founded the Mongol Empire?",options:["Genghis Khan","Kublai Khan","Ögedei Khan","Tolui Khan"],correct:0},{question:"Which revolution overthrew the Russian Tsar?",options:["October Revolution","February Revolution","Decembrist Revolt","Revolution of 1905"],correct:1},{question:"In which year did the American Civil War end?",options:["1864","1865","1866","1867"],correct:1},{question:"Who was known as the 'Maid of Orléans'?",options:["Marie Antoinette","Joan of Arc","Eleanor of Aquitaine","Catherine de' Medici"],correct:1}],science:[{question:"What is the chemical symbol for gold?",options:["Go","Gd","Au","Ag"],correct:2},{question:"How many bones are in an adult human body?",options:["196","206","216","226"],correct:1},{question:"What is the speed of light in vacuum?",options:["299,792 km/s","199,792 km/s","399,792 km/s","499,792 km/s"],correct:0},{question:"What is the largest planet in our solar system?",options:["Saturn","Jupiter","Uranus","Neptune"],correct:1},{question:"What is the powerhouse of the cell?",options:["Nucleus","Ribosome","Mitochondria","Chloroplast"],correct:2},{question:"What is the most abundant gas in Earth's atmosphere?",options:["Oxygen","Carbon Dioxide","Nitrogen","Argon"],correct:2},{question:"How many chambers does a human heart have?",options:["2","3","4","5"],correct:2},{question:"What is the study of earthquakes called?",options:["Geology","Seismology","Volcanology","Meteorology"],correct:1},{question:"What is the smallest unit of matter?",options:["Molecule","Atom","Electron","Quark"],correct:3},{question:"At what temperature does water boil at sea level?",options:["90°C","100°C","110°C","120°C"],correct:1},{question:"How many hearts does an octopus have?",options:["1","2","3","4"],correct:2},{question:"What color is a polar bear's skin?",options:["White","Pink","Black","Brown"],correct:2},{question:"Which animal can't jump?",options:["Elephant","Hippo","Rhino","All of the above"],correct:3},{question:"What's the only mammal that can fly?",options:["Flying squirrel","Sugar glider","Bat","Flying lemur"],correct:2},{question:"How long is a day on Venus?",options:["24 hours","100 days","243 Earth days","1 year"],correct:2},{question:"What percentage of our brain do we actually use?",options:["10%","50%","Almost 100%","33%"],correct:2},{question:"Which came first: fire or the wheel?",options:["Fire","Wheel","Same time","Neither"],correct:0},{question:"What's the most abundant gas in the air we breathe?",options:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"],correct:2},{question:"How many bones do sharks have?",options:["Over 200","About 100","Zero","It depends"],correct:2},{question:"What's the loudest animal on Earth?",options:["Lion","Blue whale","Elephant","Howler monkey"],correct:1},{question:"Which planet spins backwards?",options:["Mars","Venus","Uranus","Neptune"],correct:1},{question:"What do you call a group of flamingos?",options:["Flock","Flamboyance","Pink parade","Colony"],correct:1},{question:"How many smell receptors does a dog have?",options:["6 million","300 million","1 billion","50 million"],correct:1},{question:"What's the fastest muscle in your body?",options:["Heart","Tongue","Eye","Leg"],correct:2},{question:"Which animal has the highest blood pressure?",options:["Elephant","Giraffe","Whale","Horse"],correct:1},{question:"How many times does a hummingbird's heart beat per minute?",options:["200","600","1200","2000"],correct:2},{question:"What's the only letter that doesn't appear in any US state name?",options:["Q","X","Z","J"],correct:0},{question:"How many teeth does a snail have?",options:["0","About 100","Over 25,000","Just 2"],correct:2},{question:"What's the most common element in the human body?",options:["Carbon","Hydrogen","Oxygen","Nitrogen"],correct:2},{question:"Which fruit has the most vitamin C?",options:["Orange","Lemon","Kiwi","Strawberry"],correct:2},{question:"How long can a cockroach live without its head?",options:["1 hour","1 day","1 week","1 month"],correct:2},{question:"What's the hardest substance in the human body?",options:["Bone","Tooth enamel","Cartilage","Nails"],correct:1},{question:"How many species of spiders exist?",options:["5,000","25,000","45,000","100,000"],correct:2},{question:"Which animal sleeps the most?",options:["Cat","Sloth","Koala","Brown bat"],correct:3},{question:"What's the smallest bone in your body?",options:["In your toe","In your finger","In your ear","In your nose"],correct:2},{question:"How many muscles do you use to smile?",options:["5","17","25","43"],correct:1},{question:"What's the only planet that rotates on its side?",options:["Mars","Jupiter","Uranus","Saturn"],correct:2},{question:"Which animal has fingerprints almost identical to humans?",options:["Chimpanzee","Gorilla","Koala","Orangutan"],correct:2},{question:"How many calories does your brain burn per day?",options:["100","320","500","800"],correct:1},{question:"What's the only food that never expires?",options:["Salt","Sugar","Honey","Rice"],correct:2},{question:"How many times per minute does a hummingbird flap its wings?",options:["200","800","3000","5000"],correct:2},{question:"What color is the 'black box' on airplanes?",options:["Black","Orange","Red","Yellow"],correct:1},{question:"Which animal has blue blood?",options:["Shark","Lobster","Dolphin","Penguin"],correct:1},{question:"How many cells die in your body every second?",options:["1,000","25,000","1 million","25 million"],correct:3},{question:"What's the most abundant protein in your body?",options:["Keratin","Collagen","Elastin","Actin"],correct:1},{question:"Which came first: the lighter or the match?",options:["Match","Lighter","Same time","Fire"],correct:1},{question:"How fast does a sneeze travel?",options:["50 mph","100 mph","160 mph","200 mph"],correct:2},{question:"What's the only mammal that can't sweat?",options:["Whale","Dolphin","Seal","All of the above"],correct:3},{question:"How many times can you fold a piece of paper in half?",options:["5","7","12","Unlimited"],correct:1},{question:"What's the most common phobia?",options:["Heights","Spiders","Public speaking","Flying"],correct:2},{question:"Which animal has the longest tongue relative to body size?",options:["Giraffe","Anteater","Chameleon","Pangolin"],correct:2},{question:"How many taste buds does the average person have?",options:["1,000","10,000","100,000","1 million"],correct:1},{question:"What's the fastest-growing plant?",options:["Sunflower","Bamboo","Corn","Grass"],correct:1},{question:"Which animal can run faster: a chicken or a T-Rex?",options:["Chicken","T-Rex","Same speed","Neither could run"],correct:0},{question:"How many different facial expressions can humans make?",options:["50","1,000","10,000","Unlimited"],correct:2},{question:"What's the only part of your body that has no blood supply?",options:["Hair","Nails","Eye cornea","Teeth"],correct:2},{question:"Which weighs more: a pound of feathers or a pound of gold?",options:["Feathers","Gold","Same weight","Depends on humidity"],correct:2},{question:"How many times does lightning strike the Earth per second?",options:["10","50","100","500"],correct:2},{question:"What's the most recycled material on Earth?",options:["Paper","Plastic","Glass","Steel"],correct:3},{question:"Which animal has the best memory?",options:["Elephant","Dolphin","Octopus","Human"],correct:0}],flags:[{question:"ca",flagCode:"ca",options:["USA","Canada","Norway","Denmark"],correct:1},{question:"gb",flagCode:"gb",options:["Australia","New Zealand","United Kingdom","Ireland"],correct:2},{question:"in",flagCode:"in",options:["Pakistan","India","Bangladesh","Sri Lanka"],correct:1},{question:"us",flagCode:"us",options:["Malaysia","Liberia","United States","Puerto Rico"],correct:2},{question:"vn",flagCode:"vn",options:["China","Vietnam","Morocco","Turkey"],correct:1},{question:"jp",flagCode:"jp",options:["South Korea","Japan","Bangladesh","Palau"],correct:1},{question:"ch",flagCode:"ch",options:["Denmark","Switzerland","Austria","Poland"],correct:1},{question:"br",flagCode:"br",options:["Argentina","Brazil","Colombia","Venezuela"],correct:1},{question:"de",flagCode:"de",options:["Belgium","Germany","Netherlands","Luxembourg"],correct:1},{question:"fr",flagCode:"fr",options:["Italy","France","Netherlands","Russia"],correct:1},{question:"it",flagCode:"it",options:["Mexico","Hungary","Italy","Iran"],correct:2},{question:"es",flagCode:"es",options:["Portugal","Spain","Colombia","Venezuela"],correct:1},{question:"mx",flagCode:"mx",options:["Italy","Mexico","Hungary","Iran"],correct:1},{question:"au",flagCode:"au",options:["New Zealand","United Kingdom","Australia","Fiji"],correct:2},{question:"kr",flagCode:"kr",options:["North Korea","South Korea","Japan","China"],correct:1},{question:"se",flagCode:"se",options:["Norway","Finland","Sweden","Denmark"],correct:2},{question:"no",flagCode:"no",options:["Sweden","Norway","Denmark","Iceland"],correct:1},{question:"dk",flagCode:"dk",options:["Norway","Sweden","Denmark","Finland"],correct:2},{question:"fi",flagCode:"fi",options:["Sweden","Norway","Denmark","Finland"],correct:3},{question:"nl",flagCode:"nl",options:["Luxembourg","Netherlands","France","Belgium"],correct:1},{question:"be",flagCode:"be",options:["Germany","Netherlands","Belgium","Luxembourg"],correct:2},{question:"pt",flagCode:"pt",options:["Spain","Portugal","Italy","Brazil"],correct:1},{question:"gr",flagCode:"gr",options:["Uruguay","Greece","Israel","Finland"],correct:1},{question:"pl",flagCode:"pl",options:["Monaco","Indonesia","Poland","Singapore"],correct:2},{question:"at",flagCode:"at",options:["Latvia","Austria","Poland","Indonesia"],correct:1},{question:"ie",flagCode:"ie",options:["Italy","Ireland","Ivory Coast","India"],correct:1},{question:"cz",flagCode:"cz",options:["Slovakia","Slovenia","Czech Republic","Croatia"],correct:2},{question:"ar",flagCode:"ar",options:["Uruguay","Argentina","Honduras","Guatemala"],correct:1},{question:"cl",flagCode:"cl",options:["Texas","Chile","Cuba","Puerto Rico"],correct:1},{question:"co",flagCode:"co",options:["Venezuela","Ecuador","Colombia","Bolivia"],correct:2},{question:"pe",flagCode:"pe",options:["Canada","Austria","Peru","Lebanon"],correct:2},{question:"za",flagCode:"za",options:["South Africa","Central African Republic","Sudan","Namibia"],correct:0},{question:"eg",flagCode:"eg",options:["Syria","Yemen","Egypt","Iraq"],correct:2},{question:"ma",flagCode:"ma",options:["Turkey","Tunisia","Morocco","Vietnam"],correct:2},{question:"ng",flagCode:"ng",options:["Nigeria","Niger","Cameroon","Chad"],correct:0},{question:"ke",flagCode:"ke",options:["Uganda","Kenya","Tanzania","Ethiopia"],correct:1},{question:"nz",flagCode:"nz",options:["Australia","New Zealand","Fiji","United Kingdom"],correct:1},{question:"th",flagCode:"th",options:["Costa Rica","Thailand","Netherlands","Paraguay"],correct:1},{question:"sg",flagCode:"sg",options:["Indonesia","Poland","Singapore","Monaco"],correct:2},{question:"my",flagCode:"my",options:["Malaysia","United States","Liberia","Uruguay"],correct:0},{question:"ua",flagCode:"ua",options:["Sweden","Ukraine","Kazakhstan","Belarus"],correct:1},{question:"tr",flagCode:"tr",options:["Tunisia","Turkey","Morocco","Algeria"],correct:1},{question:"sa",flagCode:"sa",options:["United Arab Emirates","Saudi Arabia","Qatar","Kuwait"],correct:1},{question:"is",flagCode:"is",options:["Ireland","Iceland","Estonia","Latvia"],correct:1},{question:"hr",flagCode:"hr",options:["Serbia","Slovenia","Croatia","Bosnia"],correct:2},{question:"lv",flagCode:"lv",options:["Lithuania","Latvia","Estonia","Finland"],correct:1},{question:"lt",flagCode:"lt",options:["Latvia","Lithuania","Estonia","Poland"],correct:1},{question:"ee",flagCode:"ee",options:["Latvia","Lithuania","Estonia","Finland"],correct:2},{question:"rs",flagCode:"rs",options:["Russia","Serbia","Slovenia","Slovakia"],correct:1},{question:"bg",flagCode:"bg",options:["Hungary","Bulgaria","Romania","Moldova"],correct:1},{question:"ro",flagCode:"ro",options:["Moldova","Romania","Bulgaria","Hungary"],correct:1},{question:"hu",flagCode:"hu",options:["Hungary","Romania","Bulgaria","Italy"],correct:0},{question:"sk",flagCode:"sk",options:["Slovenia","Slovakia","Czech Republic","Poland"],correct:1},{question:"si",flagCode:"si",options:["Slovakia","Slovenia","Serbia","Switzerland"],correct:1},{question:"lu",flagCode:"lu",options:["Netherlands","Belgium","Luxembourg","Germany"],correct:2},{question:"mt",flagCode:"mt",options:["Monaco","Malta","San Marino","Vatican"],correct:1},{question:"cy",flagCode:"cy",options:["Greece","Turkey","Cyprus","Malta"],correct:2},{question:"md",flagCode:"md",options:["Romania","Moldova","Ukraine","Bulgaria"],correct:1},{question:"by",flagCode:"by",options:["Bulgaria","Belarus","Belgium","Bosnia"],correct:1},{question:"ge",flagCode:"ge",options:["Armenia","Azerbaijan","Georgia","Turkey"],correct:2},{question:"am",flagCode:"am",options:["Armenia","Azerbaijan","Georgia","Iran"],correct:0},{question:"az",flagCode:"az",options:["Armenia","Azerbaijan","Turkmenistan","Kazakhstan"],correct:1}],economy:[{question:"What does GDP stand for?",options:["General Domestic Product","Gross Domestic Product","Grand Domestic Price","Gross Domestic Price"],correct:1},{question:"What is inflation?",options:["Decrease in prices","Increase in supply","General increase in prices","Increase in demand only"],correct:2},{question:"Who wrote 'The Wealth of Nations'?",options:["Karl Marx","John Keynes","Adam Smith","Milton Friedman"],correct:2},{question:"What is the study of economics on a large scale called?",options:["Microeconomics","Macroeconomics","Econometrics","Finance"],correct:1},{question:"In economics, what does the term 'opportunity cost' mean?",options:["The cost of an opportunity","The next best alternative foregone","The total cost of production","The profit margin"],correct:1},{question:"What is a bull market?",options:["Falling prices","Rising prices","Stable prices","Volatile prices"],correct:1},{question:"Which organization sets monetary policy in the US?",options:["Treasury","Congress","Federal Reserve","World Bank"],correct:2},{question:"What does IPO stand for?",options:["International Purchase Order","Initial Public Offering","Internal Price Order","Investment Portfolio Option"],correct:1},{question:"What is the invisible hand theory associated with?",options:["Communism","Free market","Socialism","Mercantilism"],correct:1},{question:"What is a recession typically defined as?",options:["1 quarter negative growth","2 quarters negative growth","3 quarters negative growth","4 quarters negative growth"],correct:1},{question:"What company was originally called 'Backrub'?",options:["Facebook","Google","Twitter","Apple"],correct:1},{question:"Which billionaire bought Twitter in 2022?",options:["Jeff Bezos","Elon Musk","Mark Zuckerberg","Bill Gates"],correct:1},{question:"What does the 'i' in iPhone stand for?",options:["Internet","Individual","Innovation","It doesn't stand for anything specific"],correct:3},{question:"Which company's slogan is 'Just Do It'?",options:["Adidas","Nike","Puma","Under Armour"],correct:1},{question:"What was Netflix's original business model?",options:["Streaming","DVD by mail","Movie theaters","Video stores"],correct:1},{question:"Which country has the most expensive Big Mac?",options:["USA","Switzerland","Norway","Denmark"],correct:1},{question:"What's the most valuable company in the world (2024)?",options:["Apple","Microsoft","Google","Amazon"],correct:0},{question:"How much did Instagram sell for to Facebook?",options:["$1 billion","$19 billion","$50 billion","$100 billion"],correct:0},{question:"What's the most expensive spice in the world?",options:["Vanilla","Cardamom","Saffron","Black truffle"],correct:2},{question:"Which company owns YouTube?",options:["Facebook","Google","Microsoft","Amazon"],correct:1},{question:"What was Amazon originally going to be called?",options:["Cadabra","Relentless","River","Both A and B"],correct:3},{question:"How much is a trillion dollars in $100 bills (weight)?",options:["1 ton","10 tons","100 tons","1000 tons"],correct:1},{question:"Which fast food chain has the most locations worldwide?",options:["McDonald's","Subway","KFC","Pizza Hut"],correct:1},{question:"What's the most traded currency after the US Dollar?",options:["Euro","Yen","Pound","Yuan"],correct:0},{question:"How much did the domain 'Pizza.com' sell for?",options:["$1 million","$2.6 million","$10 million","$50 million"],correct:1},{question:"Which company invented the first smartphone?",options:["Apple","IBM","Nokia","BlackBerry"],correct:1},{question:"What's the most expensive pizza ever made?",options:["$1,000","$5,000","$12,000","$70,000"],correct:2},{question:"How many hours does the average person work in their lifetime?",options:["50,000","90,000","150,000","200,000"],correct:1},{question:"What company owns Snapchat?",options:["Facebook","Google","Snap Inc.","Twitter"],correct:2},{question:"Which country invented paper money?",options:["USA","China","Italy","England"],correct:1},{question:"How much did WhatsApp sell to Facebook for?",options:["$5 billion","$19 billion","$50 billion","$100 billion"],correct:1},{question:"What's the most expensive NFT ever sold?",options:["$10 million","$30 million","$69 million","$200 million"],correct:2},{question:"Which company makes the most money per second?",options:["Apple","Saudi Aramco","Microsoft","Amazon"],correct:1},{question:"What's the world's most counterfeited brand?",options:["Rolex","Nike","Louis Vuitton","Gucci"],correct:1},{question:"How much does it cost to make a penny?",options:["0.5 cents","1 cent","2.4 cents","5 cents"],correct:2},{question:"Which company has the longest company name?",options:["Google","A 747-letter Welsh company","Microsoft","International Business Machines"],correct:1},{question:"What percentage of all US currency is in $100 bills?",options:["20%","50%","80%","95%"],correct:2},{question:"Which dating app makes the most money?",options:["Tinder","Bumble","Hinge","Match"],correct:0},{question:"How many Google searches happen per day?",options:["1 billion","8.5 billion","50 billion","100 billion"],correct:1},{question:"What's the most expensive coffee in the world?",options:["Jamaican Blue Mountain","Kopi Luwak","Black Ivory","Hawaiian Kona"],correct:2},{question:"Which company spends the most on advertising?",options:["Coca-Cola","Amazon","Apple","Procter & Gamble"],correct:1},{question:"How much money does the average person spend on coffee per year?",options:["$500","$1,100","$2,000","$5,000"],correct:1},{question:"What's the most expensive hotel room in the world per night?",options:["$50,000","$100,000","$500,000","$1 million"],correct:2},{question:"Which country has the most billionaires?",options:["China","USA","Germany","India"],correct:1},{question:"How much did the most expensive car ever sell for?",options:["$50 million","$100 million","$142 million","$500 million"],correct:2},{question:"What's the cheapest country to live in?",options:["India","Pakistan","Afghanistan","Nepal"],correct:2},{question:"Which company was the first to reach $1 trillion valuation?",options:["Microsoft","Apple","Amazon","Google"],correct:1},{question:"How much does the average wedding cost in the US?",options:["$15,000","$30,000","$50,000","$100,000"],correct:1},{question:"What's the most expensive Pokémon card ever sold?",options:["$1 million","$5.25 million","$10 million","$50 million"],correct:1},{question:"Which social media platform makes the most money per user?",options:["Facebook","TikTok","Snapchat","LinkedIn"],correct:3},{question:"How much money is spent on Black Friday annually in the US?",options:["$5 billion","$20 billion","$50 billion","$100 billion"],correct:1},{question:"What's the most valuable sports team in the world?",options:["Dallas Cowboys","Real Madrid","New York Yankees","Golden State Warriors"],correct:0},{question:"Which cryptocurrency was created as a joke?",options:["Bitcoin","Ethereum","Dogecoin","Litecoin"],correct:2},{question:"How much does the average person spend on their phone per year?",options:["$500","$1,000","$2,000","$5,000"],correct:1},{question:"What's the most expensive painting ever sold?",options:["$300 million","$450 million","$600 million","$1 billion"],correct:1},{question:"Which company has the most employees worldwide?",options:["Walmart","Amazon","McDonald's","US Department of Defense"],correct:0},{question:"How much does it cost to raise a child to 18 in the US?",options:["$100,000","$233,610","$500,000","$1 million"],correct:1},{question:"What's the most expensive thing ever stolen?",options:["Mona Lisa","Crown jewels","The Mona Lisa","Entire countries' GDP"],correct:3},{question:"Which app has been downloaded the most times?",options:["WhatsApp","Facebook","Instagram","TikTok"],correct:0},{question:"How much does the average American spend on food per year?",options:["$3,500","$7,700","$15,000","$25,000"],correct:1}]}};function gr(){return`
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
    `}function So(e){const t=document.getElementById("beerPongRules"),o=document.getElementById("beerPongGame"),n=document.getElementById("beerPongTournament"),a=W.beerPongRules[e];document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.remove("btn-primary"),document.getElementById("tournamentBtn").classList.remove("btn-primary"),document.getElementById(`${e}RulesBtn`).classList.add("btn-primary"),o.style.display="none",n.style.display="none",t.style.display="block",t.innerHTML=`
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
    `,M&&e==="creator"&&M({particleCount:50,spread:60,origin:{y:.2},colors:["#00ff88","#00d4ff","#ff0088"]})}function mt(){const e=document.getElementById("beerPongRules"),t=document.getElementById("beerPongGame"),o=document.getElementById("beerPongTournament");document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.add("btn-primary"),document.getElementById("tournamentBtn").classList.remove("btn-primary"),e.style.display="none",o.style.display="none",t.style.display="block",document.getElementById("gameModeSelection").style.display="block",document.getElementById("teamNameSetup").style.display="none",document.getElementById("normalGamePlay").style.display="none",document.getElementById("specialGamePlay").style.display="none"}function pt(){const e=document.getElementById("beerPongRules"),t=document.getElementById("beerPongGame"),o=document.getElementById("beerPongTournament");document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.remove("btn-primary"),document.getElementById("tournamentBtn").classList.add("btn-primary"),e.style.display="none",t.style.display="none",o.style.display="block",document.getElementById("tournamentSetup").style.display="block",document.getElementById("teamNaming").style.display="none",document.getElementById("tournamentBracket").style.display="none"}function Do(e){u.tournament.totalTeams=e,u.tournament.teams=[],u.tournament.bracket=[],u.tournament.currentRound=0,document.getElementById("tournamentSetup").style.display="none",document.getElementById("teamNaming").style.display="block";const t=document.getElementById("teamInputs");t.innerHTML="";for(let o=1;o<=e;o++)t.innerHTML+=`
            <div style="margin-bottom: 15px;">
                <label style="display: inline-block; width: 100px;">Team ${o}:</label>
                <input type="text" id="team${o}Name" placeholder="Enter team name" 
                    style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                    color: white; width: 250px;" value="Team ${o}">
            </div>
        `;M&&M({particleCount:100,spread:70,origin:{y:.6},colors:["#FFD700","#FFA500","#FF6347"]})}function Po(){const e=u.tournament.totalTeams;u.tournament.teams=[];for(let t=1;t<=e;t++){const o=document.getElementById(`team${t}Name`).value.trim()||`Team ${t}`;u.tournament.teams.push({id:t,name:o,eliminated:!1})}fr(),document.getElementById("teamNaming").style.display="none",document.getElementById("tournamentBracket").style.display="block",To()}function fr(){const e=[...u.tournament.teams],t=[];let o=[];for(let a=0;a<e.length;a+=2)o.push({team1:e[a],team2:e[a+1],winner:null,matchId:`R1M${Math.floor(a/2)+1}`});t.push(o);let n=2;for(;o.length>1;){const a=[];for(let r=0;r<o.length;r+=2)a.push({team1:null,team2:null,winner:null,matchId:`R${n}M${Math.floor(r/2)+1}`,previousMatch1:o[r].matchId,previousMatch2:o[r+1]?o[r+1].matchId:null});t.push(a),o=a,n++}u.tournament.rounds=t}function To(){const e=document.getElementById("bracketDisplay"),t=u.tournament.rounds;let o='<div style="display: flex; gap: 50px; align-items: center; min-width: max-content;">';t.forEach((n,a)=>{const r=Lo(a,t.length);o+=`
            <div style="flex-shrink: 0;">
                <h4 style="text-align: center; margin-bottom: 20px; color: #00ff88;">${r}</h4>
                <div style="display: flex; flex-direction: column; gap: ${30*(a+1)}px;">
        `,n.forEach(i=>{const c=i.team1?i.team1.name:"TBD",l=i.team2?i.team2.name:"TBD",d=i.team1&&i.team2&&!i.winner;o+=`
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
            `}),o+="</div></div>"}),o+="</div>",e.innerHTML=o,br()}function Lo(e,t){return e===t-1?"🏆 FINAL":e===t-2?"🥈 Semi-Finals":e===t-3?"🥉 Quarter-Finals":`Round ${e+1}`}function Wo(e,t){const o=u.tournament.rounds;for(let n=0;n<o.length;n++){const a=o[n].find(r=>r.matchId===e);if(a){if(a.winner=t===1?a.team1:a.team2,n<o.length-1){const i=o[n+1].find(c=>c.previousMatch1===e||c.previousMatch2===e);i&&(i.previousMatch1===e?i.team1=a.winner:i.team2=a.winner)}n===o.length-1&&vr(a.winner);break}}To()}function vr(e){const t=document.getElementById("bracketDisplay");if(t.innerHTML=`
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">CHAMPIONS!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${e.name}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Congratulations on winning the Beer Pong Tournament!
            </p>
        </div>
    `,M){const o=["#FFD700","#FFA500","#FF6347","#00ff88","#00d4ff"];for(let n=0;n<5;n++)setTimeout(()=>{M({particleCount:150,spread:100,origin:{x:Math.random(),y:Math.random()*.5},colors:o})},n*200)}}function br(){const e=u.tournament.rounds;let t=0;for(let n=0;n<e.length;n++)if(e[n].some(a=>a.team1&&a.team2&&!a.winner)){t=n;break}const o=Lo(t,e.length);document.getElementById("tournamentRoundTitle").textContent=`${o} - Beer Pong Tournament`}function qo(){u.tournament={teams:[],bracket:[],currentRound:0,totalTeams:0,rounds:[]},pt()}function Mo(){u.beerPong.currentMode="normal",document.getElementById("gameModeSelection").style.display="none",document.getElementById("teamNameSetup").style.display="block"}function No(){u.beerPong.currentMode="special",document.getElementById("gameModeSelection").style.display="none";const e=document.createElement("div");e.id="specialCategorySelection",e.innerHTML=`
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
    `;const t=document.getElementById("beerPongGame");document.getElementById("specialCategorySelection")&&document.getElementById("specialCategorySelection").remove(),t.insertBefore(e,t.firstChild)}function $o(e){u.selectedCategory=e,document.getElementById("specialCategorySelection").style.display="none",document.getElementById("teamNameSetup").style.display="block"}function Ao(){const e=document.getElementById("team1NameInput").value.trim()||"Team 1",t=document.getElementById("team2NameInput").value.trim()||"Team 2";u.beerPong.team1Name=e,u.beerPong.team2Name=t,document.getElementById("teamNameSetup").style.display="none",u.beerPong.currentMode==="normal"?(document.getElementById("team1Display").textContent=e,document.getElementById("team2Display").textContent=t,document.getElementById("normalGamePlay").style.display="block"):(Ro(e,t),document.getElementById("specialGamePlay").style.display="block")}function Ro(e,t){document.getElementById("specialTeam1Name").textContent=e,document.getElementById("specialTeam2Name").textContent=t,document.getElementById("specialTeam1Display").textContent=e,document.getElementById("specialTeam2Display").textContent=t,u.beerPong.specialCups.team1=At("team1"),u.beerPong.specialCups.team2=At("team2"),Qe("team1"),Qe("team2")}function At(e){const t=[],o=W.specialBeerPongRules[u.selectedCategory]||W.specialBeerPongRules.classic,n=W.specialBeerPongDares[u.selectedCategory]||W.specialBeerPongDares.classic;for(let a=0;a<10;a++){const r=Math.random()>.5,i=r?o[Math.floor(Math.random()*o.length)]:n[Math.floor(Math.random()*n.length)];t.push({id:`${e}-cup-${a}`,active:!0,type:r?"rule":"dare",content:i})}return t}function Qe(e){const t=u.beerPong.specialCups[e],o=document.querySelector(`#${e}Cups .cup-formation`),n=[4,3,2,1];let a=0,r="";n.forEach((i,c)=>{r+='<div style="display: flex; justify-content: center; margin-bottom: 5px;">';for(let l=0;l<i;l++){const d=t[a],m=d.active?"font-size: 2.5em; cursor: pointer; margin: 0 5px; transition: transform 0.2s;":"font-size: 2.5em; margin: 0 5px; opacity: 0.3;";r+=`
                <span id="${d.id}" 
                    style="${m}" 
                    onclick="${d.active?`hitCup('${e}', ${a})`:""}"
                    onmouseover="this.style.transform='scale(1.1)'"
                    onmouseout="this.style.transform='scale(1)'">
                    ${d.active?"🥤":"💨"}
                </span>
            `,a++}r+="</div>"}),o.innerHTML=r}function Fo(e,t){const o=u.beerPong.specialCups[e][t];if(!o.active)return;o.active=!1;const n=document.getElementById("ruleDisplay");n.style.display="block",n.innerHTML=`
        <h3 style="color: ${o.type==="rule"?"#00ff88":"#ff0088"};">
            ${o.type==="rule"?"📜 NEW RULE!":"🎯 DARE TIME!"}
        </h3>
        <p style="font-size: 1.3em; margin: 20px 0;">
            ${o.content}
        </p>
        <button class="btn btn-primary" onclick="closeRuleDisplay()">
            Got it!
        </button>
    `,Qe(e),u.beerPong.specialCups[e].filter(r=>r.active).length===0&&wr(e==="team1"?u.beerPong.team2Name:u.beerPong.team1Name),M&&M({particleCount:50,spread:60,origin:{y:.6},colors:o.type==="rule"?["#00ff88","#00d4ff"]:["#ff0088","#ff4444"]})}function Ho(){document.getElementById("ruleDisplay").style.display="none"}function wr(e){if(document.getElementById("specialGamePlay").innerHTML=`
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
    `,M)for(let t=0;t<3;t++)setTimeout(()=>{M({particleCount:100,spread:70,origin:{x:Math.random(),y:Math.random()*.5}})},t*300)}function zo(){Ro(u.beerPong.team1Name,u.beerPong.team2Name),document.getElementById("ruleDisplay").style.display="none"}function Uo(e){let t=b().gameScores||{team1:0,team2:0};t[e]++,P("gameScores",t),Go(),t[e]>=10&&(document.getElementById("gameStatus").textContent=`${e==="team1"?"Team 1":"Team 2"} Wins! 🏆`,M&&M({particleCount:200,spread:70,origin:{y:.6}}))}function Go(){const e=b().gameScores||{team1:0,team2:0};document.getElementById("team1Score").textContent=e.team1,document.getElementById("team2Score").textContent=e.team2}function jo(){P("gameScores",{team1:0,team2:0}),Go(),document.getElementById("gameStatus").textContent="",mt()}function kr(){}window.gameModules=window.gameModules||{};window.gameModules["beer-pong"]={createGame:gr,initialize:kr};window.showBeerPongRules=So;window.showBeerPongGame=mt;window.showBeerPongTournament=pt;window.setupTournament=Do;window.startTournament=Po;window.selectWinner=Wo;window.resetTournament=qo;window.startNormalBeerPong=Mo;window.startSpecialBeerPong=No;window.selectSpecialBeerPongCategory=$o;window.startGameWithNames=Ao;window.hitCup=Fo;window.closeRuleDisplay=Ho;window.resetSpecialGame=zo;window.addScore=Uo;window.resetBeerPong=jo;function xr(){return`
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
    `}function Oo(){if(I.length<2){s("Add at least 2 players","error");return}de(),ne("neverHaveIEver",u.selectedCategory),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",ue()}function Vo(){const e=W.neverHaveIEver[u.selectedCategory]||W.neverHaveIEver.classic,t=ae("neverHaveIEver",u.selectedCategory,e);document.getElementById("gameQuestion").textContent=t}function Ir(){if(O(),I.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["never-have-i-ever"]={createGame:xr,initialize:Ir};window.startNeverHaveIEver=Oo;window.nextNeverHaveIEver=Vo;function Cr(){return`
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
    `}function _o(){if(I.length<2){s("Add at least 2 players","error");return}de(),ne("truths",u.selectedCategory),ne("dares",u.selectedCategory),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",_(0),Co(),ue()}function Ko(){_((V+1)%I.length),Co(),document.getElementById("gameQuestion").textContent="Choose Truth or Dare!",document.getElementById("nextTurnBtn").style.display="none"}function Yo(){const e=W.truths[u.selectedCategory]||W.truths.classic,t=ae("truths",u.selectedCategory,e);document.getElementById("gameQuestion").textContent=t,document.getElementById("nextTurnBtn").style.display="inline-block"}function Jo(){const e=W.dares[u.selectedCategory]||W.dares.classic,t=ae("dares",u.selectedCategory,e);document.getElementById("gameQuestion").textContent=t,document.getElementById("nextTurnBtn").style.display="inline-block"}function Br(){if(O(),I.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}_(0)}window.gameModules=window.gameModules||{};window.gameModules["truth-or-dare"]={createGame:Cr,initialize:Br};window.startTruthOrDare=_o;window.nextTurnTruthOrDare=Ko;window.showTruth=Yo;window.showDare=Jo;function Er(){return`
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
    `}function Qo(){if(I.length<2){s("Add at least 2 players","error");return}de(),ne("wouldYouRather",u.selectedCategory),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",ue(),ht()}function ht(){const e=W.wouldYouRather[u.selectedCategory]||W.wouldYouRather.classic,t=ae("wouldYouRather",u.selectedCategory,e),o=t.split(" or "),n=o[0].replace("Would you rather ",""),a=o[1]||o[0];document.getElementById("gameQuestion").textContent=t,document.getElementById("option1Btn").textContent=n,document.getElementById("option2Btn").textContent=a,document.getElementById("voteResults").style.display="none",document.getElementById("nextQuestionBtn").style.display="none",document.getElementById("option1Btn").disabled=!1,document.getElementById("option2Btn").disabled=!1}function Zo(e){document.getElementById("option1Btn").disabled=!0,document.getElementById("option2Btn").disabled=!0;const t=document.getElementById("voteResults");t.innerHTML=`
        <h3>Minority drinks! 🍺</h3>
        <p>In a real game, everyone votes and the minority drinks!</p>
    `,t.style.display="block",document.getElementById("nextQuestionBtn").style.display="inline-block"}function Sr(){if(O(),I.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["would-you-rather"]={createGame:Er,initialize:Sr};window.startWouldYouRather=Qo;window.nextWouldYouRather=ht;window.voteWouldYouRather=Zo;function Dr(){return`
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
    `}function Xo(){if(I.length<3){s("Add at least 3 players","error");return}de(),ne("mostLikelyTo",u.selectedCategory),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",ue(),yt()}function yt(){const e=W.mostLikelyTo[u.selectedCategory]||W.mostLikelyTo.classic,t=ae("mostLikelyTo",u.selectedCategory,e);document.getElementById("gameQuestion").textContent=t;const o=document.getElementById("votingPlayers");o.innerHTML=`
        <h4>Players in the game:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            ${I.map(n=>`
                <div style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border-radius: 10px; text-align: center;">
                    ${n}
                </div>
            `).join("")}
        </div>
    `}function en(){s("Person with most votes drinks! 🍻","info")}function Pr(){if(O(),I.length>=3){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["most-likely-to"]={createGame:Dr,initialize:Pr};window.startMostLikelyTo=Xo;window.nextMostLikelyTo=yt;window.showVotes=en;function Tr(){return`
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
    `}function tn(){if(I.length<3){s("Add at least 3 players","error");return}de(),ne("spinBottleTasks",u.selectedCategory),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",_(0),ue()}function on(){const e=document.getElementById("bottleContainer"),t=I[V],o=I.filter((a,r)=>r!==V),n=o[Math.floor(Math.random()*o.length)];e.style.transition="transform 2s ease-out",e.style.transform=`rotate(${720+Math.random()*360}deg)`,setTimeout(()=>{document.getElementById("spinResult").innerHTML=`
            <h3>${t} → ${n}</h3>
        `;const a=W.spinBottleTasks[u.selectedCategory]||W.spinBottleTasks.classic,r=ae("spinBottleTasks",u.selectedCategory,a);document.getElementById("gameTask").textContent=r,document.getElementById("gameTask").style.display="block",_((V+1)%I.length),setTimeout(()=>{e.style.transition="none",e.style.transform="rotate(0deg)"},100)},2e3)}function Lr(){if(O(),I.length>=3){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}_(0)}window.gameModules=window.gameModules||{};window.gameModules["spin-the-bottle"]={createGame:Tr,initialize:Lr};window.startSpinBottle=tn;window.spinBottle=on;function Wr(){return`
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
    `}function qr(){if(I.length<2){s("Add at least 2 players","error");return}de(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",_(0),nn()}function nn(){const e=document.getElementById("currentPlayer");e&&I.length>0&&(e.textContent=`${I[V]}'s Turn`)}function an(){const e=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],t=["♠️","♥️","♦️","♣️"],o=e[Math.floor(Math.random()*e.length)],n=t[Math.floor(Math.random()*t.length)];document.getElementById("currentCard").textContent=o+n;const a={A:"🍉 Waterfall - Everyone drinks!",2:"👉 You - Choose someone to drink",3:"👈 Me - You drink!",4:"👯 Floor - Last to touch floor drinks",5:"🙋 Guys - All guys drink",6:"💃 Chicks - All girls drink",7:"🌈 Heaven - Last to raise hand drinks",8:"🤝 Mate - Choose a drinking buddy",9:"🎵 Rhyme - Say a word, others rhyme",10:"📏 Categories - Name things in category",J:"👑 Make a Rule",Q:"❓ Questions - Ask questions only",K:"🏆 King's Cup - Pour into center cup"};document.getElementById("gameQuestion").textContent=a[o],_((V+1)%I.length),nn()}function Mr(){if(O(),I.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}_(0)}window.gameModules=window.gameModules||{};window.gameModules["kings-cup"]={createGame:Wr,initialize:Mr};window.startKingsCup=qr;window.drawCard=an;function Nr(){return`
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
    `}function rn(){const e=document.getElementById("timerBtn");u.flipTimer?(clearInterval(u.flipTimer),u.flipTimer=null,e.innerHTML='<i class="fas fa-play"></i> Start Timer',(!u.bestFlipTime||u.flipTime<u.bestFlipTime)&&(u.bestFlipTime=u.flipTime,document.getElementById("bestTime").textContent=`Best Time: ${$t(u.bestFlipTime)}`,M&&M({particleCount:100,spread:70,origin:{y:.6}}))):(u.flipTime=0,u.flipTimer=setInterval(()=>{u.flipTime++,document.getElementById("flipTimer").textContent=$t(u.flipTime)},10),e.innerHTML='<i class="fas fa-pause"></i> Stop Timer')}function sn(){u.flipTimer&&(clearInterval(u.flipTimer),u.flipTimer=null),u.flipTime=0,document.getElementById("flipTimer").textContent="00:00",document.getElementById("timerBtn").innerHTML='<i class="fas fa-play"></i> Start Timer'}function $r(){u.flipTimer&&(clearInterval(u.flipTimer),u.flipTimer=null),u.flipTime=0}window.gameModules=window.gameModules||{};window.gameModules["flip-cup"]={createGame:Nr,initialize:$r};window.toggleFlipTimer=rn;window.resetFlipTimer=sn;function Ar(){return`
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
    `}function Rr(e){u.currentCategory=e,u.currentTriviaIndex=0,ne("trivia",e),document.getElementById("categorySelection").style.display="none",document.getElementById("triviaGame").style.display="block",s(`Category: ${{sports:"🏃 Sports",history:"📚 History",science:"🔬 Science",flags:"🌍 Flags",economy:"💰 Economy"}[e]}`),gt()}function Fr(){document.getElementById("categorySelection").style.display="block",document.getElementById("triviaGame").style.display="none",u.currentTriviaIndex=0}function gt(){const e=u.currentCategory||"sports",t=W.triviaCategories[e]||W.trivia,o=ae("trivia",e,t),n=document.getElementById("gameQuestion");e==="flags"&&o.flagCode?n.innerHTML=`
            <div style="text-align: center;">
                <img src="https://flagpedia.net/data/flags/w580/${o.flagCode}.png" 
                     alt="Flag" 
                     style="width: 320px; height: auto; display: block; margin: 0 auto 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 1.5em; font-weight: bold; color: #00d4ff;">Which country is this?</div>
            </div>
        `:n.textContent=o.question;const a=o.options.map((r,i)=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${i}, ${o.correct})">${r}</button>`).join("");document.getElementById("triviaOptions").innerHTML=a}function cn(e,t){const o=document.getElementById("triviaOptions").querySelectorAll("button");e===t?(u.triviaScore++,document.getElementById("triviaScore").textContent=u.triviaScore,o[e].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",s("✅ Correct! +1 point")):(o[e].style.background="linear-gradient(45deg, #ff4444, #ff0088)",o[t].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",s("❌ Wrong answer!")),o.forEach(n=>n.disabled=!0),u.currentTriviaIndex++}function Hr(){u.triviaScore=0,u.currentTriviaIndex=0,u.currentCategory=null;const e=document.getElementById("categorySelection"),t=document.getElementById("triviaGame");e&&(e.style.display="block"),t&&(t.style.display="none")}window.gameModules=window.gameModules||{};window.gameModules.trivia={createGame:Ar,initialize:Hr};window.nextTrivia=gt;window.answerTrivia=cn;window.selectCategory=Rr;window.backToCategories=Fr;window.closeGame=Ge;const Rt={firstTimer:{name:"First Timer",icon:"🎉",description:"Joined your first party!",requirement:1,progress:0,unlocked:!1,category:"beginner"},responsible:{name:"Responsible",icon:"😇",description:"Stayed under 0.05 BAC all night",requirement:1,progress:0,unlocked:!1,category:"safety"},gameMaster:{name:"Game Master",icon:"🏆",description:"Win 5 party games",requirement:5,progress:0,unlocked:!1,category:"games"},partyAnimal:{name:"Party Animal",icon:"📍",description:"Check in at 10 parties",requirement:10,progress:0,unlocked:!1,category:"social"},guardianAngel:{name:"Guardian Angel",icon:"🦸",description:"Help 3 friends get home safe",requirement:3,progress:0,unlocked:!1,category:"safety"},hydroHomie:{name:"Hydro Homie",icon:"💧",description:"Stay hydrated for 3 hours",requirement:12,progress:0,unlocked:!1,category:"health"},danceMachine:{name:"Dance Machine",icon:"🕺",description:"Log 50 songs danced to",requirement:50,progress:0,unlocked:!1,category:"fun"},sunriseWarrior:{name:"Sunrise Warrior",icon:"🌅",description:"Party until sunrise (6+ hours)",requirement:1,progress:0,unlocked:!1,category:"endurance"},socialButterfly:{name:"Social Butterfly",icon:"🦋",description:"Add 20 friends",requirement:20,progress:0,unlocked:!1,category:"social"},safetyFirst:{name:"Safety First",icon:"🛡️",description:"Use emergency services 0 times in 10 parties",requirement:10,progress:0,unlocked:!1,category:"safety"},mixologist:{name:"Mixologist",icon:"🍸",description:"Try 15 different drink types",requirement:15,progress:0,unlocked:!1,category:"drinks"},designated:{name:"Designated Hero",icon:"🚗",description:"Be the designated driver 5 times",requirement:5,progress:0,unlocked:!1,category:"safety"}};let Z={};function zr(){const e=x();if(!e)return;const t=k(),o=h(t,`users/${e.uid}/achievements`);H(o,n=>{const a=n.val()||{};Object.keys(Rt).forEach(r=>{Z[r]={...Rt[r],...a[r]}}),P("userAchievements",Z),je()})}function Ur(e){const t=x();if(!t)return;const o=k(),n=Z[e];n&&T(h(o,`users/${t.uid}/achievements/${e}`),{progress:n.progress,unlocked:n.unlocked,unlockedAt:n.unlockedAt||null})}function be(e,t=1){if(!Z[e])return;const o=Z[e];o.unlocked||(o.progress=Math.min(o.progress+t,o.requirement),o.progress>=o.requirement&&(o.unlocked=!0,o.unlockedAt=Date.now(),Gr(o),ln()),Ur(e),je())}function je(){const e=document.querySelector(".achievements-grid");if(!e)return;e.innerHTML="",Object.entries(Z).sort(([,o],[,n])=>o.unlocked&&!n.unlocked?-1:!o.unlocked&&n.unlocked?1:o.category.localeCompare(n.category)).forEach(([o,n])=>{const a=document.createElement("div");a.className=`achievement ${n.unlocked?"unlocked":""}`,a.setAttribute("data-achievement",o);const r=n.progress/n.requirement*100;a.innerHTML=`
            <div class="achievement-icon">${n.icon}</div>
            <div class="achievement-name">${n.name}</div>
            <div class="achievement-description">${n.description}</div>
            ${n.unlocked?`
                <div class="achievement-unlocked-date">
                    Unlocked ${new Date(n.unlockedAt).toLocaleDateString()}
                </div>
            `:`
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${r}%"></div>
                    </div>
                    <div class="progress-text">${n.progress}/${n.requirement}</div>
                </div>
            `}
        `,e.appendChild(a)}),ln()}function ln(){const e=Object.keys(Z).length,t=Object.values(Z).filter(n=>n.unlocked).length;document.querySelectorAll("[data-achievement-stats]").forEach(n=>{n.textContent=`${t}/${e}`})}function Gr(e){typeof confetti=="function"&&confetti({particleCount:100,spread:70,origin:{y:.6}});const t=document.createElement("div");t.className="achievement-notification",t.innerHTML=`
        <div class="achievement-popup">
            <div class="achievement-popup-icon">${e.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${e.name}</div>
                <div class="achievement-popup-description">${e.description}</div>
            </div>
        </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{t.remove()},500)},5e3)}function jr(){const e=b(),t=e.partyData||{},o=e.friendsData||{},n=e.partyStartTime;Object.values(t).every(r=>r.bac<.05)&&Date.now()-n>36e5&&be("responsible"),Date.now()-n>216e5&&be("sunriseWarrior"),Object.keys(o).length>=20&&be("socialButterfly",Object.keys(o).length)}function Or(){be("firstTimer")}async function Vr(){const e=document.getElementById("partyName"),t=document.getElementById("partyPrivacy"),o=document.getElementById("partyDuration"),n=document.getElementById("partyAddress");if(!e||!e.value.trim()){s("Enter a party name","error");return}const a={privacy:t?t.value:"private",duration:o?o.value:"ongoing",address:n?n.value:""};try{const r=await Qt(e.value.trim(),a);r.success?(s(`Party created! Code: ${r.code}`,"success"),e.value="",n&&(n.value=""),window.updatePartyDisplay&&window.updatePartyDisplay()):s(r.error||"Failed to create party","error")}catch{s("Failed to create party","error")}}async function _r(){const e=document.getElementById("joinPartyCode");if(!e||!e.value.trim()){s("Enter a party code","error");return}const t=e.value.trim();try{s("Checking party...","info");const o=await at(t);if(!o){s("Invalid party code","error");return}const n=Object.keys(o.members||{}).length,a=`Join "${o.name}"?
👥 ${n} members
🔒 Privacy: ${o.privacy||"Unknown"}
📍 ${o.address||"No location set"}
⏱️ ${o.duration==="24h"?"24 hour party":"Ongoing party"}`;if(!confirm(a))return;const r=await rt(t);r.success?(r.pending?s("Join request sent! Waiting for approval.","info"):r.alreadyMember?s("Rejoined party!","success"):s("Joined party!","success"),e.value="",window.updatePartyDisplay&&window.updatePartyDisplay()):s(r.error||"Failed to join party","error")}catch{s("Failed to join party","error")}}async function Kr(){if(confirm("Leave this party?"))try{(await Zt()).success&&(s("Left party","info"),window.updatePartyDisplay&&window.updatePartyDisplay())}catch{s("Failed to leave party","error")}}async function Yr(){const e=document.getElementById("partyChatInput");if(!(!e||!e.value.trim()))try{(await eo(e.value)).success&&(e.value="")}catch{s("Failed to send message","error")}}async function Jr(){const e=document.getElementById("publicPartiesList");if(e){e.innerHTML='<p style="opacity: 0.7;">Loading parties...</p>';try{const t=await oo();if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No public parties found. Create one!</p>';return}const o=window.firebase?.auth?.currentUser,n=o&&window.isDeveloper&&window.isDeveloper(o.uid),a=document.createElement("template");a.innerHTML=`
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
        `,e.innerHTML="",t.forEach(r=>{const i=a.content.cloneNode(!0);i.querySelector("[data-party-name]").textContent=r.name;const c=`👥 ${r.memberCount} members`+(r.address?` • 📍 ${r.address}`:"")+(r.duration==="24h"?" • ⏰ 24h party":"");if(i.querySelector("[data-party-details]").textContent=c,i.querySelector("[data-join-btn]").onclick=()=>dn(r.code),n){const l=document.createElement("button");l.className="btn btn-danger",l.title="Developer: Delete this party",l.innerHTML='<i class="fas fa-trash"></i>',l.onclick=()=>deletePartyAsDev(r.id),i.querySelector("[data-party-actions]").appendChild(l)}e.appendChild(i)})}catch{e.innerHTML='<p style="opacity: 0.7;">Failed to load parties</p>'}}}async function dn(e){try{const t=await rt(e,!0);t.success?(s("Joined public party!","success"),window.updatePartyDisplay&&window.updatePartyDisplay()):s(t.error||"Failed to join party","error")}catch{s("Failed to join party","error")}}let Ve=null,ee="all";function Qr(){x()&&(ft(),mi(),pi(),setInterval(bt,3e4))}async function un(e){try{const t=x();if(!t)throw new Error("User not authenticated");const o=document.getElementById("uploadStatus");o&&(o.style.display="block");const n=$("deviceData")||{},a=e.deviceId;if(!n[a])throw new Error("Device not paired with this account");const r=ni(e.imageBase64,"image/jpeg"),i=await Zr(r),c=Gt(),l=Date.now(),d=`photos/${t.uid}/${l}_${a}.jpg`,m=Ut(c,d),p=await Bn(m,i),f=await En(p.ref),v=k(),g=Me(h(v,"photos"));return await T(g,{userId:t.uid,userName:t.displayName||"Anonymous",deviceId:a,photoUrl:f,thumbnailUrl:f,bac:e.bac||null,timestamp:G(),likes:{},comments:{},partyId:$("currentPartyId")||null,location:e.location||null,retro:!0}),o&&(o.style.display="none"),s("📸 Photo uploaded successfully!","success"),window.checkAchievements&&window.checkAchievements("photo_upload"),{success:!0,photoId:g.key}}catch(t){const o=document.getElementById("uploadStatus");o&&(o.style.display="none");const n=j(t,"Photo Upload");return s(n.message,"error"),{success:!1,error:n.message}}}async function Zr(e){return new Promise(t=>{const o=new Image,n=document.createElement("canvas"),a=n.getContext("2d");o.onload=()=>{n.width=o.width,n.height=o.height,a.drawImage(o,0,0);const r=a.getImageData(0,0,n.width,n.height),i=r.data;for(let m=0;m<i.length;m+=4){const p=i[m],f=i[m+1],v=i[m+2];i[m]=Math.min(255,p*.393+f*.769+v*.189),i[m+1]=Math.min(255,p*.349+f*.686+v*.168),i[m+2]=Math.min(255,p*.272+f*.534+v*.131)}const c=n.width/2,l=n.height/2,d=Math.min(c,l);for(let m=0;m<n.height;m++)for(let p=0;p<n.width;p++){const f=Math.sqrt(Math.pow(p-c,2)+Math.pow(m-l,2)),v=Math.max(0,1-f/d*.7),g=(m*n.width+p)*4;i[g]*=v,i[g+1]*=v,i[g+2]*=v}a.putImageData(r,0,0),n.toBlob(m=>{t(m)},"image/jpeg",.9)},o.src=URL.createObjectURL(e)})}function ft(){const e=k(),t=x();Ve&&zt(h(e,"photos"),Ve),Ve=H(h(e,"photos"),async o=>{const n=o.val()||{},a=$("friendsList")||[],r=$("currentPartyId"),i=[],c=a.map(l=>l.id);c.push(t.uid);for(const[l,d]of Object.entries(n))c.includes(d.userId)&&(ee==="all"||ee==="recent"&&ai(d.timestamp)||ee==="party"&&d.partyId===r||ee==="high-bac"&&d.bac!==null&&d.bac>=.08||ee==="boozelens"&&d.source==="BoozeLens_ESP32")&&i.push({id:l,...d});i.sort((l,d)=>(d.timestamp||0)-(l.timestamp||0)),Xr(i)})}function Xr(e){const t=document.getElementById("photoFeed");if(t){if(e.length===0){t.innerHTML=`
            <div class="photo-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 4em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No photos to show. ${ee!=="all"?"Try changing the filter!":"Connect your BoozeLens to start!"}</p>
            </div>
        `;return}t.innerHTML=e.map(o=>{const n=ri(o.timestamp),a=Object.keys(o.likes||{}).length,r=Object.keys(o.comments||{}).length,i=o.likes&&o.likes[x().uid];return`
            <div class="photo-card" data-photo-id="${o.id}">
                <div class="photo-header">
                    <div class="photo-user">
                        <div class="user-avatar">${ii(o.userName)}</div>
                        <div class="user-info">
                            <h4>${o.userName}</h4>
                            <p>${n} ${o.bac!==null&&o.bac!==void 0?`• ${o.bac.toFixed(3)}‰`:""}</p>
                        </div>
                    </div>
                    ${o.userId===x().uid?`
                        <button class="btn-icon" onclick="deletePhoto('${o.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    `:""}
                </div>
                
                <div class="photo-image" onclick="viewPhoto('${o.id}')">
                    <img src="${o.photoUrl}" alt="Party photo" loading="lazy">
                    ${o.bac!==null&&o.bac>=.08?'<div class="bac-badge">🔥 High BAC</div>':""}
                </div>
                
                <div class="photo-actions">
                    <button class="btn-icon ${i?"liked":""}" onclick="toggleLike('${o.id}')">
                        <i class="fas fa-heart"></i> ${a>0?a:""}
                    </button>
                    <button class="btn-icon" onclick="showComments('${o.id}')">
                        <i class="fas fa-comment"></i> ${r>0?r:""}
                    </button>
                    <button class="btn-icon" onclick="sharePhoto('${o.id}')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                
                <div class="photo-comments" id="comments-${o.id}" style="display: none;">
                    <!-- Comments will be loaded here -->
                </div>
            </div>
        `}).join(""),si()}}async function ei(e){try{const t=x(),o=k(),n=h(o,`photos/${e}/likes/${t.uid}`);(await A(n)).exists()?await q(n):(await T(n,{timestamp:G(),userName:t.displayName||"Anonymous"}),window.checkAchievements&&window.checkAchievements("give_likes"))}catch(t){j(t,"Toggle Like")}}async function ti(e,t){try{const o=x(),n=k(),a=Me(h(n,`photos/${e}/comments`));await T(a,{userId:o.uid,userName:o.displayName||"Anonymous",text:t,timestamp:G()}),s("💬 Comment added!","success")}catch(o){j(o,"Add Comment")}}async function oi(e){if(confirm("Delete this photo? This cannot be undone."))try{const t=k(),o=Gt(),a=(await A(h(t,`photos/${e}`))).val();if(!a)throw new Error("Photo not found");if(a.photoUrl)try{const r=Ut(o,a.photoUrl);await Cn(r)}catch(r){console.error("Storage deletion failed:",r)}await q(h(t,`photos/${e}`)),s("📸 Photo deleted","info")}catch(t){j(t,"Delete Photo")}}function ni(e,t){const o=atob(e),n=[];for(let a=0;a<o.length;a+=512){const r=o.slice(a,a+512),i=new Array(r.length);for(let l=0;l<r.length;l++)i[l]=r.charCodeAt(l);const c=new Uint8Array(i);n.push(c)}return new Blob(n,{type:t})}function ai(e){const t=Date.now()-864e5;return e>t}function ri(e){if(!e)return"Just now";const t=Math.floor((Date.now()-e)/1e3);return t<60?"Just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}function ii(e){return e.split(" ").map(t=>t[0]).join("").toUpperCase().slice(0,2)}function si(){if(document.getElementById("retro-photo-styles"))return;const e=document.createElement("style");e.id="retro-photo-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}async function vt(){ft(),s("📸 Feed refreshed!","success")}function ci(){ee=document.getElementById("photoFilter").value,ft()}async function li(e){console.log("View photo:",e)}async function di(e){const t=document.getElementById(`comments-${e}`);if(t)if(t.style.display==="none"){const o=k(),a=(await A(h(o,`photos/${e}/comments`))).val()||{},r=Object.entries(a).sort((i,c)=>(i[1].timestamp||0)-(c[1].timestamp||0)).map(([i,c])=>`
                <div class="comment">
                    <strong>${c.userName}:</strong> ${c.text}
                </div>
            `).join("");t.innerHTML=`
            ${r}
            <div class="comment-input">
                <input type="text" id="comment-input-${e}" placeholder="Add a comment..." 
                    onkeypress="if(event.key==='Enter') addComment('${e}', this.value)">
            </div>
        `,t.style.display="block"}else t.style.display="none"}async function ui(e){const t=`${window.location.origin}/#photo/${e}`;await navigator.clipboard.writeText(t),s("📋 Link copied!","success")}function mi(){window.handleBoozeLensUpload=un}function pi(){bt()}function bt(){const e=document.getElementById("boozeLensStatus");if(e)try{const t=Kt(),o=ea(),n=t.length;if(n===0){e.innerHTML=`
                <div class="status-message info">
                    <i class="fas fa-info-circle"></i>
                    <span>No BoozeLens devices paired. Go to Settings to pair your device!</span>
                </div>
            `;return}let a="success",r="fas fa-check-circle",i=`${o} of ${n} BoozeLens devices online`;o===0?(a="error",r="fas fa-exclamation-triangle",i=`All ${n} BoozeLens devices offline`):o<n&&(a="warning",r="fas fa-exclamation-circle"),e.innerHTML=`
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
                    ${n>3?`<span class="device-count">+${n-3} more</span>`:""}
                </div>
            </div>
        `}catch(t){console.error("Failed to update BoozeLens status:",t),e.innerHTML=`
            <div class="status-message warning">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Unable to check device status</span>
            </div>
        `}}function hi(e,t){const n=Kt().find(i=>i.deviceId===e),a=n?n.nickname:e;s(`📸 Photo uploaded from ${a}!`,"success");const r=document.getElementById("uploadStatus");r&&(r.style.display="none"),setTimeout(()=>{vt()},1e3)}function yi(){if(document.getElementById("boozelens-status-styles"))return;const e=document.createElement("style");e.id="boozelens-status-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}yi();let w=null;function gi(){window.toggleAuthMode=Rn,window.signOut=Hn,window.updateUI=oe,window.switchSection=mn,window.toggleMobileMenu=Bi,window.toggleMobileMore=Ei,window.showNotification=s,window.showModal=Ti,window.closeModal=pn,window.searchFriends=io,window.sendFriendRequest=so,window.acceptFriendRequest=Ma,window.declineFriendRequest=$a,window.updateFriendPermission=lo,window.removeFriend=uo,window.sendMessage=mo,window.handleChatEnter=Aa,window.showHydrationReminder=ho,window.checkInLocation=Fa,window.callUber=Ha,window.callEmergency=za,window.selectBuddy=Ga,window.showFirstAid=ja,window.updateProfile=Oa,window.changePassword=Va,window.saveEmergencyInfo=_a,window.savePrivacySettings=Ka,window.exportData=Ja,window.pairDeviceFromModal=Qa,window.resolvePermission=Xa,window.logDrink=ar,window.toggleChart=ir,window.toggleTimeRange=sr,window.removeDrink=rr,window.showEmergencyReport=cr,window.copyEmergencyReport=bo,window.downloadEmergencyReport=lr,window.shareEmergencyReport=dr,window.clearDrinkHistory=ur,window.deleteAccount=Ya,window.deleteMessage=Ra,window.loadChatMessages=po,w&&(window.createParty=w.createParty,window.joinParty=w.joinParty,window.leaveParty=w.leaveParty,window.deleteParty=w.deleteParty,window.sendPartyMessage=w.sendPartyMessage,window.getPartyByCode=w.getPartyByCode,window.getNearbyParties=w.getNearbyParties,window.getFriendsParties=w.getFriendsParties,window.updatePartyDisplay=z,window.kickMember=w.kickMember,window.updatePartySettings=w.updatePartySettings,window.togglePartyLock=w.togglePartyLock,window.switchToParty=w.switchToParty,window.getUserParties=()=>w.userParties),window.createNewParty=Vr,window.joinPartyByCode=_r,window.leaveCurrentParty=Kr,window.sendPartyChat=Yr,window.refreshPublicParties=Jr,window.joinPublicParty=dn,window.isDeveloper=F,window.startGame=hr,window.closeGame=Ge,window.nextNeverHaveIEver=Vo,window.showTruth=Yo,window.showDare=Jo,window.drawCard=an,window.addScore=Uo,window.resetBeerPong=jo,window.toggleFlipTimer=rn,window.resetFlipTimer=sn,window.nextTrivia=gt,window.answerTrivia=cn,window.addPlayer=ko,window.removePlayer=xo,window.resetToPlayerSetup=Io,window.startNeverHaveIEver=Oo,window.startTruthOrDare=_o,window.nextTurnTruthOrDare=Ko,window.startWouldYouRather=Qo,window.nextWouldYouRather=ht,window.voteWouldYouRather=Zo,window.startMostLikelyTo=Xo,window.nextMostLikelyTo=yt,window.showVotes=en,window.startSpinBottle=tn,window.spinBottle=on,window.showBeerPongRules=So,window.showBeerPongGame=mt,window.showBeerPongTournament=pt,window.setupTournament=Do,window.startTournament=Po,window.selectWinner=Wo,window.resetTournament=qo,window.startNormalBeerPong=Mo,window.startSpecialBeerPong=No,window.startGameWithNames=Ao,window.hitCup=Fo,window.closeRuleDisplay=Ho,window.resetSpecialGame=zo,window.selectGameCategory=Bo,window.changeCategoryMidGame=Eo,window.selectSpecialBeerPongCategory=$o,window.getActiveLocations=dt,window.createLocationMap=yo,window.initializeLocationMap=go,window.updateFriendRequests=co,window.updateFriendsList=ct,window.escapeHtml=Q,window.updateAchievements=je,window.updateAchievementProgress=be,window.checkAchievements=jr,window.pairDeviceById=jt,window.unpairDevice=Ot,window.renameDevice=Vt,window.pairBoozeLensDevice=We,window.unpairBoozeLensDevice=tt,window.renameBoozeLensDevice=ot,window.refreshBoozeLensDevices=Xn,window.refreshPhotoFeed=vt,window.filterPhotos=ci,window.toggleLike=ei,window.addComment=ti,window.deletePhoto=oi,window.updateBoozeLensStatus=bt,window.showBoozeLensUploadNotification=hi,window.viewPhoto=li,window.showComments=di,window.sharePhoto=ui,window.handleBoozeLensUpload=un,console.log("✅ All functions exposed globally including party functions")}class fi{constructor(){this.initialized=!1,this.handlers=new Map,this.moduleReady=!1}async init(){this.initialized||(console.log("🎯 Initializing Party Event Manager"),await this.waitForModule(),this.setupEventDelegation(),this.setupFormHandlers(),this.initialized=!0,console.log("✅ Party Event Manager initialized"))}async waitForModule(){let o=0;for(;!window.Parties&&o<50;)await new Promise(n=>setTimeout(n,100)),o++;if(!window.Parties)throw new Error("Party module failed to load");this.moduleReady=!0}setupEventDelegation(){this.delegationHandler&&document.removeEventListener("click",this.delegationHandler),this.delegationHandler=async t=>{const o={"#createPartyBtn":()=>this.handleCreateParty(),"#joinPartyBtn":()=>this.handleJoinParty(),"#leavePartyBtn":()=>this.handleLeaveParty(),"#sendPartyChatBtn":()=>this.handleSendChat(),"#refreshPartiesBtn":()=>this.handleRefreshParties(),"#refreshFriendsPartiesBtn":()=>this.handleRefreshFriendsParties(),'[data-action="join-public-party"]':n=>this.handleJoinPublicParty(n.dataset.partyCode)};for(const[n,a]of Object.entries(o)){const r=t.target.closest(n);if(r){if(t.preventDefault(),t.stopPropagation(),!this.moduleReady){s("App still loading, please wait...","warning");return}try{await a(r)}catch(i){console.error("Event handler error:",i),s("An error occurred. Please try again.","error")}break}}},document.addEventListener("click",this.delegationHandler)}setupFormHandlers(){const t=document.getElementById("partyChatInput");t&&t.addEventListener("keypress",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),this.handleSendChat())});const o=document.getElementById("partyPrivacy"),n=document.getElementById("partyDuration");o&&n&&o.addEventListener("change",a=>{const r=n.querySelector('option[value="ongoing"]');r&&(a.target.value==="public"?(r.style.display="none",n.value==="ongoing"&&(n.value="24h")):r.style.display="")})}async handleCreateParty(){if(!x()){s("Please sign in to create a party","error");return}const t=document.getElementById("partyName"),o=document.getElementById("partyPrivacy"),n=document.getElementById("partyDuration"),a=document.getElementById("partyAddress");if(!t?.value.trim()){s("Please enter a party name","error");return}const r={privacy:o?.value||"private",duration:n?.value||"24h",address:a?.value||""};try{const i=await w.createParty(t.value.trim(),r);i.success?(s(`Party created! Code: ${i.code}`,"success"),t.value="",a&&(a.value=""),z()):s(i.error||"Failed to create party","error")}catch(i){console.error("Create party error:",i),s("Failed to create party","error")}}async handleJoinParty(){if(!x()){s("Please sign in to join a party","error");return}const t=document.getElementById("joinPartyCode");if(!t?.value.trim()){s("Please enter a party code","error");return}const o=t.value.trim().toUpperCase();try{s("Checking party...","info");const n=await w.getPartyByCode(o);if(!n){s("Invalid party code","error");return}const a=Object.keys(n.members||{}).length,r=`Join "${n.name}"?
👥 ${a} members
🔒 Privacy: ${n.privacy||"Unknown"}
📍 ${n.address||"No location set"}
⏱️ ${n.duration==="24h"?"24 hour party":"Ongoing party"}`;if(!confirm(r))return;const i=await w.joinParty(o);i.success?(i.pending?s("Join request sent! Waiting for approval.","info"):i.alreadyMember?s("Rejoined party!","success"):s("Joined party!","success"),t.value="",z()):s(i.error||"Failed to join party","error")}catch(n){console.error("Join party error:",n),s("Failed to join party","error")}}async handleLeaveParty(){const t=w.currentParty,o=x();if(!t)return;const n=o&&t.creatorId===o.uid;if(confirm(n?"Delete this party? This will remove all members.":"Leave this party?"))try{const r=n?await w.deleteParty():await w.leaveParty();r.success?(s(n?"Party deleted":"Left party","info"),z()):s(r.error||"Operation failed","error")}catch(r){console.error("Leave/delete party error:",r),s("Operation failed","error")}}async handleSendChat(){const t=document.getElementById("partyChatInput");if(t?.value.trim())try{(await w.sendPartyMessage(t.value.trim())).success&&(t.value="")}catch(o){console.error("Send chat error:",o),s("Failed to send message","error")}}async handleRefreshParties(){const t=document.getElementById("publicPartiesList");if(t){t.innerHTML='<p style="opacity: 0.7;">Loading parties...</p>';try{const o=await w.getNearbyParties();if(o.length===0){t.innerHTML='<p style="opacity: 0.7;">No public parties found. Create one!</p>';return}const n=document.createElement("template");n.innerHTML=`
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
            `,t.innerHTML="",o.forEach(a=>{const r=n.content.cloneNode(!0);r.querySelector("[data-party-name]").textContent=a.name;const i=`👥 ${a.memberCount} members`+(a.address?` • 📍 ${a.address}`:"")+(a.duration==="24h"?" • ⏰ 24h party":"");r.querySelector("[data-party-details]").textContent=i,r.querySelector("[data-join-btn]").setAttribute("data-party-code",a.code),t.appendChild(r)})}catch(o){console.error("Refresh parties error:",o),t.innerHTML='<p style="opacity: 0.7;">Failed to load parties</p>'}}}async handleRefreshFriendsParties(){const t=document.getElementById("friendsPartiesList");if(t){t.innerHTML=`<p style="opacity: 0.7;">Loading friends' parties...</p>`;try{const o=await w.getFriendsParties();if(o.length===0){t.innerHTML=`<p style="opacity: 0.7;">No friends' parties found.</p>`;return}const n=document.createElement("template");n.innerHTML=`
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
            `,t.innerHTML="",o.forEach(a=>{const r=n.content.cloneNode(!0);r.querySelector("[data-party-name]").textContent=a.name;const i=`👤 by ${a.creatorName} • 👥 ${a.memberCount} members`+(a.address?` • 📍 ${a.address}`:"")+(a.duration==="24h"?" • ⏰ 24h party":"");r.querySelector("[data-party-details]").textContent=i,r.querySelector("[data-join-btn]").setAttribute("data-party-code",a.code),t.appendChild(r)})}catch(o){console.error("Refresh friends parties error:",o),t.innerHTML=`<p style="opacity: 0.7;">Failed to load friends' parties</p>`}}}async handleJoinPublicParty(t){if(t)try{const o=await w.joinParty(t,!0);o.success?(s("Joined party!","success"),z(),await this.handleRefreshParties()):s(o.error||"Failed to join party","error")}catch(o){console.error("Join public party error:",o),s("Failed to join party","error")}}destroy(){this.delegationHandler&&document.removeEventListener("click",this.delegationHandler),this.handlers.clear(),this.initialized=!1}}const Ft=new fi;document.addEventListener("DOMContentLoaded",async()=>{console.log("🚀 Starting BoozeLens app initialization...");try{if(setTimeout(()=>{const a=document.getElementById("mobileLoadingScreen");a&&(a.classList.add("hide"),setTimeout(()=>{a.style.display="none"},500))},1500),!Pn()){console.error("Firebase failed to initialize!"),s("❌ Failed to connect to Firebase","error");return}console.log("✅ Firebase initialized"),w=Tt,window.Parties=Tt,console.log("✅ Party module references set"),gi(),console.log("✅ Global functions exposed"),await Ft.init().catch(a=>{console.error("Failed to initialize party event manager:",a),s("Party features may not work properly","warning")}),console.log("✅ Party event manager initialized"),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(a=>{if(a.length>0){a.forEach(r=>{r.unregister(),console.log("Unregistered old service worker:",r.scope)}),setTimeout(()=>{window.location.reload()},1e3);return}});try{Wt&&Wt().catch(a=>{console.warn("Service worker registration failed:",a)}),qt&&qt(),Mt&&Mt()}catch(a){console.warn("PWA initialization error (non-critical):",a)}const t=document.getElementById("authForm");t&&t.addEventListener("submit",Fn),zn(vi),Si(),setInterval(()=>{Di()},500),window.lastDrinkTime=null,window.hydrationTimerInterval=null,window.hydrationTargetTime=null,window.startHydrationCountdown=function(){window.hydrationTargetTime=Date.now()+1800*1e3,window.hydrationTimerInterval&&clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=setInterval(()=>{const a=Date.now();if(!window.lastDrinkTime||a-window.lastDrinkTime>10800*1e3){clearInterval(window.hydrationTimerInterval),window.hydrationTimerInterval=null,window.hydrationTargetTime=null,oe();return}a>=window.hydrationTargetTime&&(ho(),window.hydrationTargetTime=a+1800*1e3),oe()},6e4),oe()},mr();const o=document.getElementById("drinkType");o&&o.addEventListener("change",function(){const a=J[this.value];document.getElementById("drinkAmount").value=a.amount,document.getElementById("alcoholPercent").value=a.alcohol}),document.querySelectorAll(".toggle-switch input").forEach(a=>{a.addEventListener("change",function(){const r=this.closest(".toggle-switch");this.checked?r.classList.add("active"):r.classList.remove("active")})}),window.onclick=a=>{a.target.className==="modal show"&&pn(),a.target.className==="game-overlay show"&&Ge()},window.addEventListener("beforeunload",()=>{Ue(),Ft.destroy()}),window.addEventListener("unhandledrejection",a=>{console.error("Unhandled promise rejection:",a.reason),a.reason&&a.reason.code&&a.reason.code.includes("auth")&&s("⚠️ Authentication issue. Try refreshing.","error")});let n=0;window.addEventListener("scroll",()=>{const a=document.querySelector("nav"),r=window.pageYOffset;a&&(r>50?a.classList.add("scrolled"):a.classList.remove("scrolled")),n=r}),console.log("✅ App initialization complete!")}catch(e){console.error("❌ App initialization failed:",e),s("Failed to initialize app","error")}});async function vi(e){console.log("User authenticated:",e.email);try{$n(),await Un(e),Gn(),await _t(),Qr(),zr(),bi(),Li(),Or(),Ht(),oe(),await mn("dashboard"),await w.loadUserParties(),z(),po(),setInterval(Ht,3600*1e3);const o=b().userData.username||e.email.split("@")[0];s(`🎉 Welcome, ${o}!`,"success"),console.log("🔑 Your Firebase UID:",e.uid),F(e.uid)?(console.log("✅ You have developer rights!"),s("🛠️ Developer mode active","info"),Ze(!0),window.addTestBACToFirebase=tr,window.removeTestBACFromFirebase=or,window.setupDevelopersInFirebase=er,console.log("🔧 Developer test functions enabled: addTestBACToFirebase(), removeTestBACFromFirebase(), setupDevelopersInFirebase()")):(console.log("💡 To get developer rights, add this UID to DEVELOPER_UIDS in constants.js"),Ze(!1))}catch(t){console.error("Error during authentication:",t),s("⚠️ Error loading profile","error")}}function bi(){const e=k(),t=x();!e||!t||(H(h(e,"users/"+t.uid+"/friends"),o=>{const n=o.val()||{};P("friendsData",n),ct(),document.getElementById("friendCount").textContent=Object.keys(n).length,Object.keys(n).forEach(a=>{wi(a)})}),H(h(e,"friendRequests/"+t.uid),o=>{const n=o.val()||{},a=Object.entries(n).map(([r,i])=>({id:r,...i}));P("friendRequests",a),co()}),H(h(e,".info/connected"),o=>{const n=o.val();Pi(n)}),H(h(e,"chat"),o=>{const n=document.getElementById("chatMessages");if(n&&(n.innerHTML=`
            <div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! Stay safe and have fun! 🎉</div>
            </div>
        `,o.exists())){const a=[];o.forEach(i=>{a.push({id:i.key,...i.val()})}),a.sort((i,c)=>(i.timestamp||0)-(c.timestamp||0)),a.slice(-50).forEach(i=>{const c=document.createElement("div");c.className="chat-message",c.style.position="relative",i.isDeveloper;const l=F(t.uid)?`<button onclick="deleteMessage('${i.id}')" style="position: absolute; right: 10px; top: 5px; background: rgba(255,68,68,0.2); border: 1px solid rgba(255,68,68,0.5); color: #ff4444; padding: 2px 8px; border-radius: 5px; cursor: pointer; font-size: 0.8em;">×</button>`:"",d=document.createElement("template");d.innerHTML=`
                    <div class="chat-author" data-author></div>
                    <div data-message></div>
                `;const m=d.content.cloneNode(!0);m.querySelector("[data-author]").textContent=(i.username||"Anonymous")+(i.isDeveloper?" 🛠️":""),m.querySelector("[data-message]").textContent=i.message||"",l?(c.innerHTML=l,c.appendChild(m)):(c.innerHTML="",c.appendChild(m)),n.appendChild(c)}),n.scrollTop=n.scrollHeight}}))}function wi(e){const t=k();(b().friendsData[e]?.permission||"observer")!=="none"&&H(h(t,"users/"+e),a=>{const r=a.val();r&&ki(e,r)})}function ki(e,t){const n=b().friendsData[e]?.permission||"observer";(n==="guardian"||n==="buddy")&&Object.keys(t.devices||{}).forEach(a=>{let r=b().partyData;r[a]||(r[a]={name:t.username,bac:0,lastUpdate:Date.now(),location:"Unknown",trend:"steady",history:[],isFriend:!0,friendId:e,permission:n},P("partyData",r)),xi(a)})}function Ht(){const e=b().partyData||{},t={};Object.entries(e).forEach(([o,n])=>{Date.now()-n.lastUpdate<1440*60*1e3&&(t[o]=n)}),P("partyData",t)}function xi(e){const t=k();H(h(t,"readings/"+e),o=>{const n=o.val();n&&Ii(e,n)})}function Ii(e,t){let o=b().partyData||{};const n=b().userData;o[e]||(o[e]={name:n.username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const a=o[e].bac;o[e].bac=t.bac||0,o[e].lastUpdate=Date.now(),o[e].trend=t.bac>a?"up":t.bac<a?"down":"steady",o[e].history.push({time:Date.now(),value:t.bac}),o[e].history.length>50&&o[e].history.shift(),P("partyData",o),oe(),Date.now()-t.timestamp<300*1e3&&t.bac>=.08&&s(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}async function Ci(e){return await(await fetch(`./src/html/sections/${e}.html`)).text()}async function mn(e){try{const t=document.getElementById("section-container"),o=document.getElementById(e);if(o)document.querySelectorAll(".section").forEach(r=>r.classList.remove("active")),o.classList.add("active");else{document.querySelectorAll(".section").forEach(c=>c.classList.remove("active"));const r=await Ci(e);t.innerHTML=r;const i=t.querySelector(".section");i&&i.classList.add("active")}document.querySelectorAll(".nav-item").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".nav-item").forEach(r=>{r.onclick&&r.onclick.toString().includes(e)&&r.classList.add("active")});const a=document.getElementById("navMenu");if(a&&a.classList.remove("show"),e==="achievements")je();else if(e==="drinks"){const r=document.getElementById("drinkType");r&&r.addEventListener("change",function(){const i=J[this.value];document.getElementById("drinkAmount").value=i.amount,document.getElementById("alcoholPercent").value=i.alcohol}),He(),Ce(),Ie(),ze()}else e==="friends"?ct():e==="photos"?vt():e==="settings"?vo():(e==="parties"||e==="dashboard")&&(z(),e==="parties"&&document.querySelector('button[onclick*="refreshPublicParties"]')?.click())}catch(t){console.error("Section switch failed:",t)}}function Bi(){const e=document.getElementById("navMenu");e&&e.classList.toggle("show")}function Ei(){const e=document.getElementById("mobileMoreMenu"),t=document.getElementById("mobileMoreBackdrop");e&&t&&(e.classList.contains("active")?(e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow=""):(e.classList.add("active"),t.classList.add("active"),document.body.style.overflow="hidden"))}function Si(){try{const e=document.getElementById("particles");if(!e)return;for(let t=0;t<50;t++){const o=document.createElement("div");o.className="particle",o.style.left=Math.random()*100+"%",o.style.animationDelay=Math.random()*20+"s",o.style.animationDuration=15+Math.random()*10+"s",e.appendChild(o)}}catch(e){console.error("Particle creation failed:",e)}}function Di(){const e=document.getElementById("visualizer");if(!(!e||!document.getElementById("dashboard").classList.contains("active"))){if(e.children.length===0)for(let t=0;t<20;t++){const o=document.createElement("div");o.className="bar",e.appendChild(o)}e.querySelectorAll(".bar").forEach(t=>{const o=Math.random()*150+20;t.style.height=o+"px"})}}function Pi(e){const t=document.getElementById("connectionStatus"),o=document.querySelector(".status-dot");t&&o&&(e?(t.textContent="Connected",o.style.background="#00ff88"):(t.textContent="Offline",o.style.background="#ff4444"))}async function Ti(e,t=null){const o=document.getElementById("modal"),n=document.getElementById("modalBody");let a="";switch(e){case"pair-device":const r=b().deviceData||{};a=`
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
                            ${Object.entries(r).map(([p,f])=>{const g=(b().partyData||{})[p];return`
                                    <div class="device-item" style="padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 10px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
                                            <div style="flex: 1;">
                                                <h4 style="margin: 0 0 5px 0;">${f.name||"My Breathalyzer"}</h4>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">ID: ${p}</p>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">Last Reading: ${g?g.bac.toFixed(3)+"‰":"No data"}</p>
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
                    ${yo()}
                </div>
                <div style="margin: 20px 0;">
                    ${dt().map(p=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${p.name}</strong></div>
                            <div>${p.count} people</div>
                            <div>Avg BAC: ${p.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"sober-friend":a=`
                <h2>🤝 Call Sober Friend</h2>
                <p>Select a sober friend to call for help:</p>
                <div id="soberFriendsContainer" style="margin: 20px 0;">
                    <p style="opacity: 0.7;">Loading friends...</p>
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `,setTimeout(async()=>{const p=document.getElementById("soberFriendsContainer");if(!p)return;const f=b().friendsData||{},v=b().partyData||{},g=k();if(Object.keys(f).length===0){p.innerHTML=`
                        <div class="info-box" style="text-align: center; padding: 20px;">
                            <p style="opacity: 0.8;">🚫 No sober friends available</p>
                        </div>
                    `;return}const D=[];for(const[E,wt]of Object.entries(f))try{const Oe=(await A(h(g,"users/"+E))).val();if(Oe){const kt=Object.values(v).find(hn=>hn.friendId===E),xt=kt?kt.bac:0;xt<.02&&D.push({id:E,name:Oe.username||"Friend",bac:xt,phone:Oe.phone||null})}}catch(me){console.error("Error loading friend data:",me)}D.length>0?p.innerHTML=D.map(E=>`
                        <div class="friend-item" style="margin-bottom: 15px; padding: 15px; background: rgba(0,255,136,0.1); border-radius: 8px; border: 1px solid rgba(0,255,136,0.3);">
                            <div class="friend-info">
                                <div class="friend-avatar-small">✅</div>
                                <div class="friend-details">
                                    <h4>${E.name}</h4>
                                    <p style="opacity: 0.7;">BAC: ${E.bac.toFixed(3)}‰ - Safe to help</p>
                                    ${E.phone?`<p style="opacity: 0.8; font-size: 0.9em;">📞 ${E.phone}</p>`:""}
                                </div>
                            </div>
                            ${E.phone?`
                                <button class="btn btn-primary" onclick="window.location.href='tel:${E.phone}'">
                                    <i class="fas fa-phone"></i> Call ${E.name}
                                </button>
                            `:`
                                <button class="btn" onclick="showNotification('No phone number available for ${E.name}', 'info')">
                                    <i class="fas fa-phone-slash"></i> No Number
                                </button>
                            `}
                        </div>
                    `).join(""):p.innerHTML=`
                        <div class="info-box" style="text-align: center; padding: 20px;">
                            <p style="opacity: 0.8;">🚫 No sober friends available</p>
                        </div>
                    `},100);break}n.innerHTML=a,o.classList.add("show"),(e==="checkin"||e==="locations")&&setTimeout(go,100)}function pn(){document.getElementById("modal").classList.remove("show")}function Li(){const e=b().userData;if(e.settings){const t=e.settings;t.shareLocation!==void 0&&(document.getElementById("shareLocation").checked=t.shareLocation),t.notifications!==void 0&&(document.getElementById("notifications").checked=t.notifications),t.publicProfile!==void 0&&(document.getElementById("publicProfile").checked=t.publicProfile)}if(e.emergency){const t=e.emergency;t.homeAddress&&(document.getElementById("homeAddress").value=t.homeAddress,localStorage.setItem("homeAddress",t.homeAddress)),t.emergencyContact&&(document.getElementById("emergencyContact").value=t.emergencyContact,localStorage.setItem("emergencyContact",t.emergencyContact)),t.medicalInfo&&(document.getElementById("medicalInfo").value=t.medicalInfo,localStorage.setItem("medicalInfo",t.medicalInfo)),t.safetyNotes&&(document.getElementById("safetyNotes").value=t.safetyNotes,localStorage.setItem("safetyNotes",t.safetyNotes))}vo()}function z(){xa(w)}function Wi(e){const t=document.getElementById("partyChat");if(!t)return;const o=document.createElement("template");o.innerHTML=`
        <div style="margin-bottom: 10px;">
            <strong style="color: #00ff88;" data-username></strong>
            <span data-message></span>
            <span style="opacity: 0.5; font-size: 0.8em; margin-left: 10px;" data-timestamp></span>
        </div>
    `,t.innerHTML="",e.forEach(n=>{const a=o.content.cloneNode(!0);a.querySelector("[data-username]").textContent=(n.userName||"Anonymous")+":",a.querySelector("[data-message]").textContent=n.message||"",a.querySelector("[data-timestamp]").textContent=new Date(n.timestamp).toLocaleTimeString(),t.appendChild(a)}),t.scrollTop=t.scrollHeight}async function qi(){const e=document.getElementById("partyLeaderboard");if(!e||!w||!w.currentParty)return;e.innerHTML='<p style="opacity: 0.7;">Loading leaderboard...</p>';const t=await w.getPartyLeaderboard();if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No BAC data yet</p>';return}const o=document.createElement("template");o.innerHTML=`
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
    `,e.innerHTML="",t.forEach((n,a)=>{const r=a+1;let i="";r===1?i="🥇":r===2?i="🥈":r===3&&(i="🥉");const c=o.content.cloneNode(!0);c.querySelector("[data-badge]").textContent=i||r,c.querySelector("[data-avatar]").textContent=n.role==="creator"?"👑":"👤",c.querySelector("[data-name]").textContent=n.name,c.querySelector("[data-bac]").textContent=`BAC: ${n.bac.toFixed(3)}‰`,e.appendChild(c)})}async function Mi(e,t){const o=await w.handleJoinRequest(e,t);o.success?(s(t?"Request approved!":"Request declined","success"),z()):s(o.error||"Failed to handle request","error")}async function Ni(e,t){const o=`Kick ${t} from the party?`;if(!confirm(o))return;const n=prompt("Reason for kick (optional):")||"",a=await w.kickMember(e,n);a.success?(s(`${t} has been removed from the party`,"info"),z()):s(a.error||"Failed to kick member","error")}async function $i(){if(!w.currentParty)return;const e=w.currentParty.locked;if(!confirm(e?"Unlock the party? New members will be able to join.":"Lock the party? No new members will be able to join."))return;const o=await w.togglePartyLock(!e);o.success?(s(o.locked?"Party locked":"Party unlocked","info"),z()):s(o.error||"Failed to update party lock","error")}function Ai(){const e=w.currentParty;if(!e)return;const t=prompt("Party name:",e.name);t&&t!==e.name&&w.updatePartySettings({name:t}).then(o=>{o.success?(s("Party name updated","success"),z()):s(o.error||"Failed to update","error")})}function Ze(e){const t=document.getElementById("chatInput"),o=document.querySelector(".chat-input button");t&&o&&(e?(t.placeholder="Type a message... (Dev mode 🛠️)",t.disabled=!1,o.disabled=!1,t.style.opacity="1",o.style.opacity="1"):(t.placeholder="Chat is read-only (Developers only)",t.disabled=!0,o.disabled=!0,t.style.opacity="0.5",o.style.opacity="0.5"))}async function Ri(e){const t=x();if(!t||!F(t.uid)){s("Not authorized","error");return}const o=k();if(o)try{await q(h(o,`chat/${e}`)),s("Message deleted","info")}catch(n){console.error("Delete message error:",n),s("Failed to delete message","error")}}window.updatePartyDisplay=z;window.updatePartyChat=Wi;window.updatePartyLeaderboard=qi;window.handlePartyRequest=Mi;window.kickMemberFromParty=Ni;window.updateChatUIForDeveloper=Ze;window.deleteMessage=Ri;async function Fi(e){const t=x();if(!t||!F(t.uid)){s("Not authorized","error");return}if(confirm("Developer action: Delete this party permanently?"))try{const o=await w.deleteParty(e);o.success?(s("Party deleted","success"),window.refreshPublicParties&&window.refreshPublicParties()):s(o.error||"Failed to delete party","error")}catch{s("Failed to delete party","error")}}window.deletePartyAsDev=Fi;window.switchToParty=e=>{w&&w.switchToParty&&w.switchToParty(e)};window.togglePartyLockUI=$i;window.editPartySettings=Ai;
//# sourceMappingURL=index-LCrjokFr.js.map
