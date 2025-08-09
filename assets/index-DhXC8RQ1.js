import{getApps as nt,initializeApp as Hn}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getAuth as jn,signInWithEmailAndPassword as Gn,createUserWithEmailAndPassword as On,onAuthStateChanged as zn,signOut as _n}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";import{getDatabase as Vn,push as Ie,ref as m,set as D,get as j,update as Yn,remove as M,onValue as W,serverTimestamp as H,off as wt}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";import{getStorage as Kn,ref as kt,deleteObject as Jn,uploadBytes as Qn,getDownloadURL as Zn}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const Xn={apiKey:"AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg",authDomain:"hsg-party-tracker.firebaseapp.com",databaseURL:"https://hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app",projectId:"hsg-party-tracker",storageBucket:"hsg-party-tracker.firebasestorage.app",messagingSenderId:"1047483086606",appId:"1:1047483086606:web:a02d77baacd21166fb095f",measurementId:"G-VFS4W30Z7P"};let se=null,I=null,x=null,Le=null,ot=!1;function eo(){if(ot)return console.log("Firebase already initialized"),!0;try{return nt().length?se=nt()[0]:se=Hn(Xn),I=jn(se),x=Vn(se),Le=Kn(se),ot=!0,console.log("✅ Firebase initialized successfully"),!0}catch(e){return console.error("❌ Firebase initialization error:",e),typeof window<"u"&&window.showNotification&&window.showNotification("Failed to connect to Firebase","error"),!1}}function We(){return I||(console.error("Firebase Auth not initialized. Call initializeFirebase() first."),null)}function b(){return x||(console.error("Firebase Database not initialized. Call initializeFirebase() first."),null)}function xt(){return Le||(console.error("Firebase Storage not initialized. Call initializeFirebase() first."),null)}const k=(e,t)=>{const n=b();return n?typeof e=="string"?m(n,e):t!==void 0?m(e,t):m(n,e):null},at=(e,t)=>{if(e)return W(e,t)},ge=(e,t)=>e?D(e,t):Promise.reject("No ref provided"),N=e=>e?j(e):Promise.reject("No ref provided"),qe=(e,t)=>e?Ie(e,t):null,ne=(e,t)=>e?Yn(e,t):Promise.reject("No ref provided"),xe=e=>e?M(e):Promise.reject("No ref provided"),he={currentUser:null,userData:{},partyData:{},partyStartTime:Date.now(),deviceData:{},friendsData:{},friendRequests:[],currentGame:null,gameScores:{team1:0,team2:0},achievements:{firstTimer:!0,responsible:!1,gameMaster:!1,partyAnimal:!1,guardianAngel:!1,hydroHomie:!1,danceMachine:!1,sunriseWarrior:!1},userAchievements:{},locationHistory:[],drinkHistory:[],chartVisible:!0,isSignUp:!1,isInitialized:!1};function h(){return he}function A(e){return he[e]}function T(e,t){he[e]=t}function rt(e){he.currentUser=e}function v(){return he.currentUser}const ee={NETWORK:"network",AUTH:"auth",DATABASE:"database",VALIDATION:"validation",UNKNOWN:"unknown"},ve={"network/offline":"You appear to be offline. Please check your internet connection.","network/timeout":"The request took too long. Please try again.","network/server-error":"Server is having issues. Please try again later.","auth/invalid-email":"Please enter a valid email address.","auth/user-disabled":"This account has been disabled.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/email-already-in-use":"An account already exists with this email.","auth/weak-password":"Password should be at least 6 characters.","auth/invalid-credential":"Invalid login credentials. Please try again.","auth/too-many-requests":"Too many failed attempts. Please try again later.","auth/network-request-failed":"Network error. Please check your connection.","database/permission-denied":"You don't have permission to perform this action.","database/disconnected":"Lost connection to database. Reconnecting...","database/write-failed":"Failed to save data. Please try again.",unknown:"Something went wrong. Please try again."};function X(e,t=""){console.error(`Error in ${t}:`,e);const n=to(e),o=no(e),a=oo(o,e);return ao(a),{type:n,code:o,message:a,originalError:e}}function to(e){return e?e.code==="network-request-failed"||e.message?.includes("network")||e.message?.includes("fetch")?ee.NETWORK:e.code?.startsWith("auth/")?ee.AUTH:e.code?.startsWith("database/")||e.code==="permission-denied"?ee.DATABASE:e.name==="ValidationError"?ee.VALIDATION:ee.UNKNOWN:ee.UNKNOWN}function no(e){return e?.code?e.code:e?.message?.includes("network")?"network/offline":e?.message?.includes("permission")?"database/permission-denied":"unknown"}function oo(e,t){if(ve[e])return ve[e];if(t?.message&&typeof t.message=="string"){const n=t.message.replace(/Firebase: /g,"").replace(/Error \(auth\/[^)]+\): /g,"").replace(/\.$/,"");return n.includes("(")||n.includes(")")||n.length>100?ve.unknown:n}return ve.unknown}function ao(e,t){window.showNotification?window.showNotification(e,"error"):alert(`Error: ${e}`)}window.addEventListener("online",()=>{window.showNotification&&window.showNotification("Back online!","success")});window.addEventListener("offline",()=>{window.showNotification&&window.showNotification("You are offline. Some features may not work.","warning")});function ro(e,t,n){const o=[];switch(t){case"email":e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||o.push("Please enter a valid email address"):o.push(`${n} is required`);break;case"password":e?e.length<6&&o.push("Password must be at least 6 characters"):o.push(`${n} is required`);break;case"username":e?e.length<3?o.push("Username must be at least 3 characters"):/^[a-zA-Z0-9_]+$/.test(e)||o.push("Username can only contain letters, numbers, and underscores"):o.push(`${n} is required`);break;case"deviceId":e?e.match(/^HSG_[a-zA-Z0-9]+$/)||o.push("Device ID must start with HSG_ followed by letters/numbers"):o.push(`${n} is required`);break}return o}let ke=!1;function io(){document.getElementById("authContainer").style.display="flex",document.getElementById("userProfile").style.display="none",document.querySelector(".container").style.display="none"}function so(){document.getElementById("authContainer").style.display="none",document.getElementById("userProfile").style.display="block",document.querySelector(".container").style.display="block"}function le(e){const t=document.getElementById("authError");t.textContent=e,t.classList.add("show"),ce(),setTimeout(()=>{t.classList.remove("show")},5e3)}function lo(){document.getElementById("authLoading").classList.add("show"),document.getElementById("authSubmitBtn").disabled=!0}function ce(){document.getElementById("authLoading").classList.remove("show"),document.getElementById("authSubmitBtn").disabled=!1}function co(){ke=!ke,ke?(document.getElementById("authTitle").textContent="Create Your Account",document.getElementById("authButton").textContent="Sign Up",document.getElementById("usernameGroup").style.display="block",document.getElementById("authToggleText").textContent="Already have an account?",document.getElementById("authToggleLink").textContent="Login"):(document.getElementById("authTitle").textContent="Welcome Back",document.getElementById("authButton").textContent="Login",document.getElementById("usernameGroup").style.display="none",document.getElementById("authToggleText").textContent="Don't have an account?",document.getElementById("authToggleLink").textContent="Sign up")}async function uo(e){e.preventDefault();const t=document.getElementById("authEmail").value.trim(),n=document.getElementById("authPassword").value,o=document.getElementById("authUsername").value.trim();if(!t||!n){le("Please fill in all fields");return}if(n.length<6){le("Password must be at least 6 characters");return}lo();try{const a=We(),r=b();if(!ke)await Gn(a,t,n),Ee("✅ Welcome back!","success");else{if(!o||o.length<3){le("Username must be at least 3 characters"),ce();return}if((await N(k(r,"usernames/"+o.toLowerCase()))).exists()){le("Username already taken"),ce();return}const c=(await On(a,t,n)).user;await ge(k(r,"users/"+c.uid),{username:o,email:t,createdAt:new Date().toISOString(),devices:{},friends:{},achievements:{},settings:{notifications:!0,shareLocation:!1,publicProfile:!0}}),await ge(k(r,"usernames/"+o.toLowerCase()),c.uid),Ee("✅ Account created successfully!","success")}ce()}catch(a){ce();const r=X(a,"Authentication");le(r.message)}}async function mo(){try{const e=We();await _n(e),Ee("👋 Signed out successfully"),location.reload()}catch(e){const t=X(e,"Sign Out");Ee(t.message,"error")}}function po(e){const t=We();zn(t,n=>{n?(rt(n),e(n)):(rt(null),io())})}async function yo(e){try{const t=b(),o=(await N(k(t,"users/"+e.uid))).val()||{},a=o.username||e.email.split("@")[0];document.getElementById("profileName").textContent=a,document.getElementById("profileEmail").textContent=e.email,document.getElementById("settingsUsername").textContent=a,document.getElementById("settingsEmail").textContent=e.email,document.getElementById("username").value=o.username||"",document.getElementById("emailDisplay").value=e.email,document.getElementById("linkedEmail").textContent=e.email;const r=a.charAt(0).toUpperCase();return document.getElementById("profileInitial").textContent=r,T("userData",o),o}catch(t){throw console.error("Error loading user data:",t),t}}function Ee(e,t="success"){const n=document.createElement("div");n.className=`notification ${t}`,n.textContent=e,n.onclick=()=>n.remove(),document.body.appendChild(n),setTimeout(()=>{n.parentNode&&n.remove()},4e3)}function s(e,t="success"){const n=document.createElement("div");n.className=`notification ${t}`,n.textContent=e,n.onclick=()=>n.remove(),document.body.appendChild(n),setTimeout(()=>{n.parentNode&&n.remove()},4e3)}window.showNotification=s;const ue={};function go(){const e=v();if(!e)return;const t=b();W(m(t,"users/"+e.uid+"/devices"),n=>{const o=n.val()||{};T("deviceData",o),bo(),document.getElementById("deviceCount").textContent=Object.keys(o).length,Object.keys(o).forEach(a=>{ho(a)})})}async function Et(){const e=document.getElementById("deviceIdInput").value.trim().toUpperCase(),t=ro(e,"deviceId","Device ID");if(t.length>0){s(t[0],"error");return}try{const n=b(),o=v();if(!(await j(m(n,"readings/"+e))).exists()){s("❌ Device not found. Make sure it's connected.","error");return}if(A("deviceData")[e]){s("ℹ️ Device already paired");return}await D(m(n,"users/"+o.uid+"/devices/"+e),{pairedAt:H(),name:"My Breathalyzer"}),document.getElementById("deviceIdInput").value="",s("✅ Device paired successfully!","success")}catch(n){const o=X(n,"Device Pairing");s(o.message,"error")}}function ho(e){if(ue[e])return;const t=b(),n=W(m(t,"readings/"+e),o=>{const a=o.val();a&&fo(e,a)});ue[e]=n}function fo(e,t){let n=A("partyData")||{};n[e]||(n[e]={name:A("userData").username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const o=n[e].bac;n[e].bac=t.bac||0,n[e].lastUpdate=Date.now(),n[e].trend=t.bac>o?"up":t.bac<o?"down":"steady",n[e].history.push({time:Date.now(),value:t.bac}),n[e].history.length>50&&n[e].history.shift(),T("partyData",n),window.updateUI&&window.updateUI(),Date.now()-t.timestamp<300*1e3&&t.bac>=.08&&s(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}function bo(){const e=document.getElementById("deviceList");if(!e)return;const t=A("deviceData")||{};if(e.innerHTML="",Object.keys(t).length===0){e.innerHTML='<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';return}const n=A("partyData")||{};Object.entries(t).forEach(([o,a])=>{const r=n[o],i=document.createElement("div");i.className="device-item",i.innerHTML=`
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
        `,e.appendChild(i)})}async function Ct(e){if(confirm("Unpair this device?")){const t=b(),n=v();if(await M(m(t,"users/"+n.uid+"/devices/"+e)),ue[e]){const o=b();wt(m(o,"readings/"+e),"value",ue[e]),delete ue[e]}s("🔓 Device unpaired")}}async function It(e){const t=A("deviceData"),n=prompt("Enter new name for device:",t[e]?.name||"My Breathalyzer");if(n){const o=b(),a=v();await D(m(o,"users/"+a.uid+"/devices/"+e+"/name"),n),s("✏️ Device renamed")}}window.pairDeviceById=Et;window.unpairDevice=Ct;window.renameDevice=It;const Z={beer:{amount:330,alcohol:5,emoji:"🍺"},wine:{amount:150,alcohol:12,emoji:"🍷"},shot:{amount:40,alcohol:40,emoji:"🥃"},cocktail:{amount:200,alcohol:15,emoji:"🍸"},mixed:{amount:250,alcohol:10,emoji:"🥤"},champagne:{amount:150,alcohol:12,emoji:"🥂"},water:{amount:250,alcohol:0,emoji:"💧"},other:{amount:200,alcohol:5,emoji:"🍹"}},V={SOBER:{max:.02,class:"bac-safe",text:"Sober",emoji:"😊"},BUZZED:{max:.05,class:"bac-caution",text:"Buzzed",emoji:"😎"},IMPAIRED:{max:.08,class:"bac-danger",text:"No Driving!",emoji:"🚫"},DRUNK:{max:1/0,class:"bac-critical",text:"Too Much!",emoji:"🤢"}};function Pt(e){return e<V.SOBER.max?V.SOBER:e<V.BUZZED.max?V.BUZZED:e<V.IMPAIRED.max?V.IMPAIRED:V.DRUNK}const Bt=["k1OvkYapqbZUAf9RbvfmnhgWcY23","kHNxyiqgsSfUHZArxbApGzxTlhO2"];function R(e){return Bt.includes(e)}const oe=Object.freeze(Object.defineProperty({__proto__:null,BAC_STATUS:V,DEVELOPER_UIDS:Bt,DRINK_PRESETS:Z,getBACStatus:Pt,isDeveloper:R},Symbol.toStringTag,{value:"Module"}));class Ue{constructor(){this.cache=new Map,this.timers=new Map}set(t,n,o=null){if(this.timers.has(t)&&(clearTimeout(this.timers.get(t)),this.timers.delete(t)),this.cache.set(t,{value:n,timestamp:Date.now()}),o&&o>0){const a=setTimeout(()=>{this.delete(t)},o);this.timers.set(t,a)}}get(t){const n=this.cache.get(t);return n?n.value:null}has(t){return this.cache.has(t)}delete(t){return this.timers.has(t)&&(clearTimeout(this.timers.get(t)),this.timers.delete(t)),this.cache.delete(t)}clear(){for(const t of this.timers.values())clearTimeout(t);this.timers.clear(),this.cache.clear()}size(){return this.cache.size}getAge(t){const n=this.cache.get(t);return n?Date.now()-n.timestamp:null}}const it=new Ue,st=new Ue,Ae={PARTY_DATA:3e4,LEADERBOARD:1e4,DEVICE_READINGS:5e3,FRIENDS_PARTIES:6e4,PUBLIC_PARTIES:12e4};function vo(...e){return e.filter(Boolean).join(":")}class wo extends Ue{setMany(t,n=null){for(const[o,a]of t)this.set(o,a,n)}getMany(t){const n=new Map;for(const o of t){const a=this.get(o);a!==null&&n.set(o,a)}return n}deletePattern(t){const n=[];for(const o of this.cache.keys())o.includes(t)&&n.push(o);for(const o of n)this.delete(o);return n.length}}const lt=new wo;let y=null,S=[],Ce=new Map,J=[];async function Dt(e,t={}){try{const n=I.currentUser;if(!n)throw new Error("Not logged in");const a=h().userData.username||n.email.split("@")[0],r=Math.random().toString(36).substring(2,8).toUpperCase(),i=qe(k(x,"parties")),l={id:i.key,name:e,code:r,creatorId:n.uid,creatorName:a,privacy:t.privacy||"private",duration:t.duration||"24h",address:t.address||"",maxMembers:t.maxMembers||50,description:t.description||"",members:{[n.uid]:{name:a,joinedAt:Date.now(),role:"creator"}},pendingRequests:{},stats:{totalDrinks:0,avgBac:0,peakBac:0,safetyScore:100},createdAt:Date.now(),expiresAt:t.duration==="24h"?Date.now()+1440*60*1e3:null};return await ge(i,l),pe(l),y=l,U(),me(l.id),{success:!0,code:r,party:l}}catch(n){return console.error("Create party error:",n),{success:!1,error:n.message}}}async function He(e){try{const t=await N(k(x,"parties"));if(!t.exists())return null;let n=null;return t.forEach(o=>{const a=o.val();a.code===e.toUpperCase()&&(n={...a,id:o.key})}),n}catch(t){return console.error("Get party error:",t),null}}async function je(e,t=!1){try{const n=I.currentUser;if(!n)throw new Error("Not logged in");const o=await He(e);if(!o)throw new Error("Invalid code");if(await At(o.id,n.uid)&&!R(n.uid))throw new Error("You have been banned from this party");if(o.locked&&!t&&!R(n.uid))throw new Error("This party is locked. No new members allowed.");if(o.members&&o.members[n.uid])return pe(o),y=o,U(),me(o.id),{success:!0,alreadyMember:!0};if(Object.keys(o.members||{}).length>=(o.maxMembers||50))throw new Error("Party is full");if(o.expiresAt&&Date.now()>o.expiresAt)throw new Error("Party has expired");const l=h().userData.username||n.email.split("@")[0];if(o.privacy==="public"||t)return await ne(k(x,`parties/${o.id}/members/${n.uid}`),{name:l,joinedAt:Date.now(),role:"member"}),pe(o),y=o,U(),me(o.id),{success:!0};if(o.privacy==="friends-only"){if(!(await N(k(x,`users/${n.uid}/friends/${o.creatorId}`))).exists())throw new Error("This party is for friends only");return await ne(k(x,`parties/${o.id}/members/${n.uid}`),{name:l,joinedAt:Date.now(),role:"friend"}),pe(o),y=o,U(),me(o.id),{success:!0}}else return await ne(k(x,`parties/${o.id}/pendingRequests/${n.uid}`),{name:l,requestedAt:Date.now()}),{success:!0,pending:!0,party:o}}catch(n){return console.error("Join party error:",n),{success:!1,error:n.message}}}async function St(e=null){try{const t=e?S.find(o=>o.id===e):y;if(!t)return{success:!0};const n=I.currentUser;if(!n)throw new Error("Not logged in");return t.creatorId===n.uid?await Tt(t.id):(await ge(k(x,`parties/${t.id}/members/${n.uid}`),null),Oe(t.id),y&&y.id===t.id&&(y=S.length>0?S[0]:null),U(),Ge(t.id),{success:!0})}catch(t){return console.error("Leave party error:",t),{success:!1,error:t.message}}}async function Tt(e=null){try{if(!I.currentUser)return{success:!1,error:"Not authenticated"};const t=e?S.find(o=>o.id===e):y;if(e&&!t&&R(I.currentUser.uid))return await xe(k(x,`parties/${e}`)),{success:!0};if(!t)return{success:!1,error:"Party not found"};const n=I.currentUser;return t.creatorId!==n.uid&&!R(n.uid)?{success:!1,error:"Only the party creator can delete the party"}:(await xe(k(x,`parties/${t.id}`)),Oe(t.id),y&&y.id===t.id&&(y=S.length>0?S[0]:null),U(),Ge(t.id),{success:!0})}catch(t){return console.error("Delete party error:",t),{success:!1,error:t.message}}}async function ko(){try{const e=I.currentUser;if(!e){console.log("No authenticated user");return}const t=JSON.parse(localStorage.getItem("userParties")||"[]"),n=localStorage.getItem("currentPartyId");S=[],y=null;for(const o of t){const a=await N(k(x,`parties/${o}`));if(a.exists()){const r={...a.val(),id:o};r.members&&r.members[e.uid]&&(!r.expiresAt||Date.now()<=r.expiresAt)&&(S.push(r),me(o),o===n&&(y=r))}}!y&&S.length>0&&(y=S[0]),U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()}catch(e){console.error("Load parties error:",e)}}function me(e){if(Ce.has(e))return;const t=at(k(x,`parties/${e}`),o=>{if(o.exists()){const a=o.val(),r=I.currentUser;if(!a||!r){we();return}if(!a.members||!a.members[r.uid]){console.log("User no longer a member of party"),we(e);return}if(a.expiresAt&&Date.now()>a.expiresAt){console.log("Party has expired"),we(e);return}const i={...a,id:e};pe(i),y&&y.id===e&&(y=i),U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()}else console.log("Party no longer exists in Firebase"),we(e)});Ce.set(e,t);const n=k(x,`parties/${e}/chat`);N(n).then(o=>{J=[];const a=[];o.forEach(r=>{a.push({id:r.key,...r.val()})}),J=a.slice(-50),a.length>0&&a[0].id,window.updatePartyChat&&window.updatePartyChat(J)}),at(n,o=>{if(!o.exists())return;const a=[];let r=!1;o.forEach(i=>{const l={id:i.key,...i.val()};J.findIndex(u=>u.id===l.id)===-1&&(a.push(l),r=!0)}),r&&(J=[...J,...a].slice(-100),window.updatePartyChat&&window.updatePartyChat(J.slice(-50)))})}function Ge(e){const t=Ce.get(e);t&&(t(),Ce.delete(e))}function we(e){e&&(Oe(e),y&&y.id===e&&(y=S.length>0?S[0]:null),U(),Ge(e),setTimeout(()=>{typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay()},100),typeof window<"u"&&window.showNotification&&window.showNotification("You have left the party","info"))}function pe(e){S=S.filter(t=>t.id!==e.id),S.push(e)}function Oe(e){S=S.filter(t=>t.id!==e)}function U(){const e=S.map(t=>t.id);localStorage.setItem("userParties",JSON.stringify(e)),y?localStorage.setItem("currentPartyId",y.id):localStorage.removeItem("currentPartyId")}function xo(e){const t=S.find(n=>n.id===e);return t?(y=t,U(),typeof window<"u"&&window.updatePartyDisplay&&window.updatePartyDisplay(),!0):!1}async function Mt(e){try{if(!y||!e.trim())return{success:!1};const t=I.currentUser;if(!t)return{success:!1};const o=h().userData.username||t.email.split("@")[0];return await qe(k(x,`parties/${y.id}/chat`),{userId:t.uid,userName:o,message:e.trim(),timestamp:Date.now()}),{success:!0}}catch(t){return console.error("Send message error:",t),{success:!1}}}function Eo(){if(!y)return null;const e=Object.keys(y.members||{}).length,t=Date.now()-y.createdAt,n=Math.floor(t/(1e3*60*60)),o=Math.floor(t%(1e3*60*60)/(1e3*60));return{memberCount:e,duration:n>0?`${n}h ${o}m`:`${o}m`,code:y.code}}async function Co(e,t){try{if(!y||y.creatorId!==I.currentUser.uid)throw new Error("Only party creator can manage requests");const n=k(x,`parties/${y.id}/pendingRequests/${e}`),o=await N(n);if(!o.exists())throw new Error("Request not found");const a=o.val();return t&&await ne(k(x,`parties/${y.id}/members/${e}`),{name:a.name,joinedAt:Date.now(),role:"member"}),await xe(n),{success:!0}}catch(n){return console.error("Handle join request error:",n),{success:!1,error:n.message}}}async function $t(){if(!y)return[];const e=vo("leaderboard",y.id),t=st.get(e);if(t)return t;const n=[],o=Object.keys(y.members||{}),a=o.map(E=>N(k(x,`users/${E}/devices`))),r=await Promise.all(a),i=[],l=new Map;r.forEach((E,C)=>{const L=o[C];if(E.exists()){const F=Object.keys(E.val());l.set(L,F),i.push(...F)}else l.set(L,[])});const c=lt.getMany(i),u=i.filter(E=>!c.has(E)),p=u.map(E=>N(k(x,`readings/${E}`))),g=await Promise.all(p),P=new Map(c);u.forEach((E,C)=>{const L=g[C];if(L.exists()){const F=L.val().bac||0;P.set(E,F),lt.set(E,F,Ae.DEVICE_READINGS)}});for(const[E,C]of Object.entries(y.members||{})){let L=0;const F=l.get(E)||[];for(const Un of F){const tt=P.get(Un)||0;tt>L&&(L=tt)}n.push({userId:E,name:C.name,bac:L,joinedAt:C.joinedAt,role:C.role||"member"})}return n.sort((E,C)=>C.bac-E.bac),st.set(e,n,Ae.LEADERBOARD),n}async function Io(){try{if(!I.currentUser)return[];const e=I.currentUser,n=(await N(k(x,`users/${e.uid}/friends`))).val()||{},o=Object.keys(n);if(o.length===0)return[];const r=(await N(k(x,"parties"))).val()||{},i=[],l=Date.now();return Object.entries(r).forEach(([c,u])=>{if(u.privacy==="friends-only"&&(!u.expiresAt||u.expiresAt>l)&&o.includes(u.creatorId)){const p=Object.keys(u.members||{}).length;i.push({...u,id:c,memberCount:p,code:u.code,creatorName:n[u.creatorId]?.name||"Friend"})}}),i.sort((c,u)=>u.memberCount-c.memberCount)}catch(e){return console.error("Error getting friends parties:",e),[]}}async function Lt(){try{const e="public:parties",t=it.get(e);if(t)return t;const n=await N(k(x,"parties"));if(!n.exists())return[];const o=[],a=Date.now();return n.forEach(r=>{const i=r.val();i.privacy==="public"&&(!i.expiresAt||i.expiresAt>a)&&o.push({...i,id:r.key,memberCount:Object.keys(i.members||{}).length})}),o.sort((r,i)=>i.memberCount-r.memberCount),it.set(e,o,Ae.PUBLIC_PARTIES),o}catch(e){return console.error("Get nearby parties error:",e),[]}}async function Po(e,t=""){try{return!y||!I.currentUser?{success:!1,error:"Not in a party or not authenticated"}:y.creatorId!==I.currentUser.uid&&!R(I.currentUser.uid)?{success:!1,error:"Only the party creator can kick members"}:e===I.currentUser.uid?{success:!1,error:"Cannot kick yourself. Use delete party instead."}:!y.members||!y.members[e]?{success:!1,error:"Member not found in party"}:(await qe(k(x,`parties/${y.id}/moderation`),{action:"kick",targetId:e,targetName:y.members[e].name,moderatorId:I.currentUser.uid,reason:t,timestamp:Date.now()}),await xe(k(x,`parties/${y.id}/members/${e}`)),await ge(k(x,`parties/${y.id}/banned/${e}`),{bannedAt:Date.now(),bannedBy:I.currentUser.uid,reason:t}),{success:!0})}catch(n){return console.error("Kick member error:",n),{success:!1,error:n.message}}}async function Bo(e){try{if(!y||!I.currentUser)return{success:!1,error:"Not in a party or not authenticated"};if(y.creatorId!==I.currentUser.uid&&!R(I.currentUser.uid))return{success:!1,error:"Only the party creator can update settings"};const t=["name","privacy","maxMembers","description","address","locked"],n={};for(const[o,a]of Object.entries(e))t.includes(o)&&(n[o]=a);return Object.keys(n).length===0?{success:!1,error:"No valid settings provided"}:(await ne(k(x,`parties/${y.id}`),n),{success:!0})}catch(t){return console.error("Update party settings error:",t),{success:!1,error:t.message}}}async function Do(e){try{return!y||!I.currentUser?{success:!1,error:"Not in a party or not authenticated"}:y.creatorId!==I.currentUser.uid?{success:!1,error:"Only the party creator can lock/unlock the party"}:(await ne(k(x,`parties/${y.id}`),{locked:e,lockedAt:e?Date.now():null}),{success:!0,locked:e})}catch(t){return console.error("Toggle party lock error:",t),{success:!1,error:t.message}}}async function At(e,t){try{return(await N(k(x,`parties/${e}/banned/${t}`))).exists()}catch(n){return console.error("Check ban status error:",n),!1}}function Nt(){return y?.id||null}async function Rt(e){return s("Friend system coming soon!","info"),{success:!1}}const ct=Object.freeze(Object.defineProperty({__proto__:null,createParty:Dt,get currentParty(){return y},deleteParty:Tt,getCurrentPartyId:Nt,getFriendsParties:Io,getNearbyParties:Lt,getPartyByCode:He,getPartyLeaderboard:$t,getPartyStats:Eo,handleJoinRequest:Co,isUserBanned:At,joinParty:je,kickMember:Po,leaveParty:St,loadUserParties:ko,quickAddFriend:Rt,sendPartyMessage:Mt,switchToParty:xo,togglePartyLock:Do,updatePartySettings:Bo,get userParties(){return S}},Symbol.toStringTag,{value:"Module"}));function Pe(){try{So(),To(),Mo(),$o(),Ao()}catch(e){console.error("UI update failed:",e)}}function So(){const e=document.getElementById("friendsGrid");if(!e)return;const t=A("partyData")||{};e.innerHTML="",Object.entries(t).forEach(([n,o])=>{if(!(Date.now()-o.lastUpdate<864e5))return;const r=Pt(o.bac),i=Ro(o.lastUpdate),l=document.createElement("div");l.className="card friend-card",l.setAttribute("data-friend-id",o.friendId||n),l.onclick=()=>No(o);const c=o.trend==="up"?"📈":o.trend==="down"?"📉":"➡️",u=o.trend==="up"?"trend-up":o.trend==="down"?"trend-down":"",p=o.isOwn?"👤":o.permission==="guardian"?"🛡️":"👥";l.innerHTML=`
            <div class="friend-avatar">${p}</div>
            <div class="friend-name">${o.name}</div>
            <div class="bac-value ${r.class}">
                ${o.bac.toFixed(3)}‰
                <span class="bac-trend ${u}">${c}</span>
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
        `,o.bac>=.08&&l.classList.add("pulse"),e.appendChild(l)})}function To(){const e=A("partyData")||{},t=Object.values(e).filter(c=>Date.now()-c.lastUpdate<1440*60*1e3),n=t.reduce((c,u)=>c+u.bac,0)/t.length||0,o=document.getElementById("partyAverage");o&&(o.textContent=n.toFixed(3)+"‰");const a=t.filter(c=>c.bac<.02).length,r=document.getElementById("safeFriends");r&&(r.textContent=a);const i=15-Date.now()%(900*1e3)/6e4,l=document.getElementById("hydrationTime");l&&(l.textContent=Math.floor(i)+"m")}async function Mo(){const e=document.getElementById("leaderboardList");if(!e)return;e.innerHTML="";const t=Nt();let n=[];if(t)n=await $t(),n=n.slice(0,5);else{const a=A("partyData")||{};n=Object.values(a).sort((r,i)=>i.bac-r.bac).slice(0,5)}const o=[a=>`🏆 ${a} is absolutely dominating the party! Living their best life!`,a=>`🥈 ${a} is so close! One more and they could take the crown!`,a=>`🥉 ${a} is holding strong! The podium suits them well!`,a=>`${a} is warming up! The night is still young!`,a=>`${a} is taking it easy... or are they just getting started? 🤔`];n.forEach((a,r)=>{const i=document.createElement("div");i.className="leaderboard-item",i.onclick=()=>{r===0&&window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}});const l=o[r]?o[r](a.name):`${a.name} is participating!`;window.showNotification(l)},i.innerHTML=`
            <span class="rank rank-${r+1}">#${r+1}</span>
            <span>${a.name}</span>
            <span>${a.bac.toFixed(3)}‰</span>
            ${t&&a.id?`<button class="quick-add-btn" onclick="window.quickAddPartyFriend('${a.id}')">+</button>`:""}
        `,e.appendChild(i)})}function $o(){const e=document.getElementById("visualizer");if(e){if(e.children.length===0)for(let t=0;t<20;t++){const n=document.createElement("div");n.className="bar",e.appendChild(n)}e.querySelectorAll(".bar").forEach(t=>{const n=Math.random()*150+20;t.style.height=n+"px"})}}let dt=0;const Lo=300*1e3;function Ao(){const e=A("partyData")||{},t=Object.values(e).filter(o=>Date.now()-o.lastUpdate<1440*60*1e3&&o.bac>=.08&&o.isFriend===!0&&!o.isOwn);if(t.length>0){const o=Date.now();if(o-dt>Lo){const a=t.map(r=>r.name).join(", ");showNotification(`⚠️ ${t.length} friend${t.length>1?"s have":" has"} high BAC: ${a}`,"warning"),dt=o}t.forEach(a=>{const r=document.querySelector(`[data-friend-id="${a.friendId||a.deviceId}"]`);r&&r.classList.add("bac-warning")})}else document.querySelectorAll(".bac-warning").forEach(o=>{o.classList.remove("bac-warning")});const n=document.getElementById("alertBanner");n&&(n.style.display="none")}function No(e){console.log("Show friend details:",e)}window.quickAddPartyFriend=async function(e){await Rt()};function Ro(e){const t=Math.floor((Date.now()-e)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}window.updateUI=Pe;let de,Ne=!1;(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0)&&(Ne=!0);async function ut(){return console.log("Service worker registration disabled"),null}function mt(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),de=e,Ne||Fo()}),window.addEventListener("appinstalled",()=>{console.log("PWA was installed"),Ne=!0,Wo(),s("App installed successfully!","success")})}function Fo(){let e=document.getElementById("installButton");if(!e){e=document.createElement("button"),e.id="installButton",e.className="btn btn-primary install-button",e.innerHTML='<i class="fas fa-download"></i> Install App',e.onclick=qo;const t=document.querySelector(".action-buttons");t&&t.appendChild(e)}e.style.display="inline-block"}function Wo(){const e=document.getElementById("installButton");e&&(e.style.display="none")}async function qo(){if(!de){s("App is already installed or not available for installation","info");return}de.prompt();const{outcome:e}=await de.userChoice;console.log(`User response to install prompt: ${e}`),console.log(e==="accepted"?"User accepted the install prompt":"User dismissed the install prompt"),de=null}function pt(){const e=indexedDB.open("BoozeLensDB",1);e.onerror=()=>{console.error("Failed to open IndexedDB")},e.onsuccess=t=>{t.target.result,console.log("IndexedDB opened successfully")},e.onupgradeneeded=t=>{const n=t.target.result;if(!n.objectStoreNames.contains("drinks")){const o=n.createObjectStore("drinks",{keyPath:"id",autoIncrement:!0});o.createIndex("timestamp","timestamp",{unique:!1}),o.createIndex("synced","synced",{unique:!1})}if(!n.objectStoreNames.contains("readings")){const o=n.createObjectStore("readings",{keyPath:"id",autoIncrement:!0});o.createIndex("timestamp","timestamp",{unique:!1}),o.createIndex("synced","synced",{unique:!1})}}}window.addEventListener("online",()=>{s("Back online! Syncing data...","success"),"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(e=>{"sync"in e&&e.sync.register("sync-all")})});window.addEventListener("offline",()=>{s("You are offline. Data will be saved locally.","warning")});function Uo(e){try{if(!e){console.warn("Parties module not ready");return}const t=e.currentParty,n=e.userParties||[],o=document.getElementById("currentPartySection"),a=document.getElementById("dashboardPartyInfo");let r=null,i=!1,l=!1;try{r=v(),r&&(i=t&&t.creatorId===r.uid,l=R(r.uid))}catch(c){console.warn("Could not get current user:",c)}Ho(n,t),t?Go(t,o,a,r,i,l,e):Oo(o,a)}catch(t){console.error("Error in safeUpdatePartyDisplay:",t)}}function Ho(e,t){const n=document.getElementById("partySwitcher");e.length>1?(n&&n.remove(),jo(e,t)):n&&n.remove()}function jo(e,t){const n=document.createElement("div");n.id="partySwitcher",n.style.cssText=`
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
    `,a=e.map(r=>{const i=r.members?Object.keys(r.members).length:0,l=t&&t.id===r.id;return`
            <button class="btn ${l?"btn-primary":""}" 
                    style="display: block; width: 100%; margin: 5px 0; text-align: left; padding: 10px;"
                    onclick="switchToParty('${r.id}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>🎉 ${r.name}</span>
                    <span style="font-size: 0.8em; opacity: 0.7;">${i} 👥</span>
                </div>
                ${l?'<small style="color: #00ff88;">Currently viewing</small>':""}
            </button>
        `}).join("");n.innerHTML=o+a,document.body.appendChild(n)}function Go(e,t,n,o,a,r,i){t&&(t.style.display="block"),n&&(n.style.display="block"),zo(e),_o(e,o,a,r),Vo(e,i),Yo(e,o,a),Ko(e,a,r),window.updatePartyLeaderboard&&window.updatePartyLeaderboard()}function Oo(e,t){e&&(e.style.display="none"),t&&(t.style.display="none");const n=document.getElementById("creatorControlsSection");n&&(n.style.display="none");const o=document.getElementById("pendingRequestsSection");o&&(o.style.display="none")}function zo(e){const t=document.querySelectorAll("#currentPartyName, #dashboardPartyName"),n=document.querySelectorAll("#currentPartyCode, #dashboardPartyCode");t.forEach(o=>{o&&(o.innerHTML=e.name+` <span style="font-size: 0.8em; opacity: 0.7;">by ${e.creatorName||"Unknown"}</span>`)}),n.forEach(o=>{o&&(o.textContent=e.code)})}function _o(e,t,n,o){const a=document.getElementById("partyMembersList");if(!a||!e.members)return;let r="";for(const[i,l]of Object.entries(e.members)){const c=i===e.creatorId,u=t&&i===t.uid,p=(n||o)&&!u&&!c;r+=`
            <div class="friend-item">
                <div class="friend-info">
                    <div class="friend-avatar-small">${c?"👑":"👤"}</div>
                    <div class="friend-details">
                        <h4>${l.name} ${c?'<span style="color: #00ff88;">(Host)</span>':""}</h4>
                        <p style="opacity: 0.7; font-size: 0.9em;">
                            ${l.role==="creator"?"Party Host • ":""}
                            Joined ${new Date(l.joinedAt).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                ${p?`
                    <button class="btn btn-danger" style="padding: 5px 10px; font-size: 0.9em;" 
                            onclick="kickMemberFromParty('${i}', '${l.name}')">
                        <i class="fas fa-user-times"></i> Kick
                    </button>
                `:""}
            </div>
        `}a.innerHTML=r}function Vo(e,t){const n=document.getElementById("partyStats");if(!n)return;const o=t.getPartyStats();o&&(n.innerHTML=`
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
    `)}function Yo(e,t,n){const o=document.getElementById("leavePartyBtn");!o||!t||(n?(o.innerHTML='<i class="fas fa-trash"></i> Delete Party',o.className="btn btn-danger"):(o.innerHTML='<i class="fas fa-door-open"></i> Leave Party',o.className="btn btn-danger"))}function Ko(e,t,n){if(!t&&!n){const i=document.getElementById("creatorControlsSection");i&&(i.style.display="none");const l=document.getElementById("pendingRequestsSection");l&&(l.style.display="none");return}const o=document.getElementById("creatorControlsSection");if(o){o.style.display="block";const i=document.getElementById("lockPartyBtn");i&&(e.locked?i.innerHTML='<i class="fas fa-lock-open"></i> Unlock Party':i.innerHTML='<i class="fas fa-lock"></i> Lock Party')}const a=document.getElementById("pendingRequestsSection"),r=document.getElementById("pendingRequestsList");a&&r&&e.pendingRequests&&Object.keys(e.pendingRequests).length>0?(a.style.display="block",r.innerHTML=Object.entries(e.pendingRequests).map(([l,c])=>`
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">👤</div>
                        <div class="friend-details">
                            <h4>${c.name}</h4>
                            <p style="opacity: 0.7;">Requested ${new Date(c.requestedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-primary" onclick="handlePartyRequest('${l}', true)">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn" onclick="handlePartyRequest('${l}', false)">
                            <i class="fas fa-times"></i> Decline
                        </button>
                    </div>
                </div>
            `).join("")):a&&(a.style.display="none")}const Jo="modulepreload",Qo=function(e,t){return new URL(e,t).href},yt={},ae=function(t,n,o){let a=Promise.resolve();if(n&&n.length>0){let u=function(p){return Promise.all(p.map(g=>Promise.resolve(g).then(P=>({status:"fulfilled",value:P}),P=>({status:"rejected",reason:P}))))};const i=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");a=u(n.map(p=>{if(p=Qo(p,o),p in yt)return;yt[p]=!0;const g=p.endsWith(".css"),P=g?'[rel="stylesheet"]':"";if(!!o)for(let L=i.length-1;L>=0;L--){const F=i[L];if(F.href===p&&(!g||F.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${P}`))return;const C=document.createElement("link");if(C.rel=g?"stylesheet":Jo,g||(C.as="script"),C.crossOrigin="",C.href=p,c&&C.setAttribute("nonce",c),document.head.appendChild(C),g)return new Promise((L,F)=>{C.addEventListener("load",L),C.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${p}`)))})}))}function r(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return a.then(i=>{for(const l of i||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};async function Ft(){const e=document.getElementById("friendSearchInput").value.trim().toLowerCase();if(!e||e.length<3){s("❌ Please enter at least 3 characters","error");return}const t=document.getElementById("searchResults");t.innerHTML="<p>Searching...</p>";try{const n=b(),o=v(),r=(await j(m(n,"users"))).val()||{},i=[];if(Object.entries(r).forEach(([l,c])=>{l!==o.uid&&c.settings?.publicProfile!==!1&&(c.username?.toLowerCase().includes(e)||c.email?.toLowerCase().includes(e))&&i.push({uid:l,...c})}),i.length===0)t.innerHTML='<p style="text-align: center; opacity: 0.7;">No users found</p>';else{const l=h().friendsData||{};t.innerHTML="<h4>Search Results:</h4>"+i.map(c=>`
                <div class="friend-item">
                    <div class="friend-info">
                        <div class="friend-avatar-small">
                            ${(c.username||c.email).charAt(0).toUpperCase()}
                        </div>
                        <div class="friend-details">
                            <h4>${c.username||"User"}</h4>
                            <p>${c.email||"Phone user"}</p>
                        </div>
                    </div>
                    <div class="friend-actions">
                        ${l[c.uid]?'<span style="color: #00ff88;">✓ Friends</span>':`<button class="btn btn-primary" onclick="sendFriendRequest('${c.uid}')">
                                <i class="fas fa-user-plus"></i> Add Friend
                            </button>`}
                    </div>
                </div>
            `).join("")}}catch(n){console.error("Search error:",n),t.innerHTML='<p style="color: #ff4444;">Search failed. Try again.</p>'}}async function Zo(e){try{const t=b(),n=v(),o=h().userData;if(h().friendsData[e]){s("ℹ️ Already friends");return}await D(m(t,"friendRequests/"+e+"/"+n.uid),{from:o.username||n.email,timestamp:H()}),s("📤 Friend request sent!","success"),Ft()}catch(t){console.error("Friend request error:",t),s("❌ Failed to send request","error")}}function Wt(){const e=document.getElementById("friendRequests"),t=h().friendRequests||[];if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No pending requests</p>';return}e.innerHTML=t.map(n=>`
        <div class="friend-request">
            <div>
                <strong>${n.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${va(n.timestamp)}
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
    `).join("")}async function Xo(e){try{const t=await ea();if(!t)return;const n=b(),o=v();await D(m(n,"users/"+o.uid+"/friends/"+e),{permission:t,addedAt:H()}),await D(m(n,"users/"+e+"/friends/"+o.uid),{permission:t,addedAt:H()}),await M(m(n,"friendRequests/"+o.uid+"/"+e)),s("✅ Friend added!","success")}catch(t){console.error("Accept friend error:",t),s("❌ Failed to accept request","error")}}async function ea(){return new Promise(e=>{const t=`
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
        `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show"),window.resolvePermission=n=>{window.closeModal(),e(n)}})}async function ta(e){const t=b(),n=v();await M(m(t,"friendRequests/"+n.uid+"/"+e)),s("❌ Request declined")}function ze(){const e=document.getElementById("friendsList");if(!e)return;const t=h().friendsData||{};if(e.innerHTML="",Object.keys(t).length===0){e.innerHTML='<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';return}Object.entries(t).forEach(async([n,o])=>{const a=b(),i=(await j(m(a,"users/"+n))).val();if(i){const l=document.createElement("div");l.className="friend-item",l.innerHTML=`
                <div class="friend-info">
                    <div class="friend-avatar-small">
                        ${(i.username||i.email||"U").charAt(0).toUpperCase()}
                    </div>
                    <div class="friend-details">
                        <h4>${i.username||"Friend"}</h4>
                        <p>${i.email||"Phone user"}</p>
                    </div>
                </div>
                <div class="friend-actions">
                    <select class="permission-select" onchange="updateFriendPermission('${n}', this.value)">
                        <option value="observer" ${o.permission==="observer"?"selected":""}>Observer</option>
                        <option value="buddy" ${o.permission==="buddy"?"selected":""}>Buddy</option>
                        <option value="guardian" ${o.permission==="guardian"?"selected":""}>Guardian</option>
                    </select>
                    <button class="btn btn-danger" onclick="removeFriend('${n}')">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            `,e.appendChild(l)}})}async function na(e,t){try{const n=b(),o=v();await D(m(n,"users/"+o.uid+"/friends/"+e+"/permission"),t),s("✅ Permission updated","success")}catch(n){console.error("Update permission error:",n),s("❌ Failed to update permission","error")}}async function oa(e){if(confirm("Remove this friend?")){const t=b(),n=v();await M(m(t,"users/"+n.uid+"/friends/"+e)),await M(m(t,"users/"+e+"/friends/"+n.uid)),s("👋 Friend removed")}}async function qt(){const e=document.getElementById("chatInput"),t=e.value.trim();if(t)try{const n=v(),o=h().userData,{isDeveloper:a}=await ae(async()=>{const{isDeveloper:i}=await Promise.resolve().then(()=>oe);return{isDeveloper:i}},void 0,import.meta.url);if(!a(n.uid)){s("❌ Only developers can send messages in the main chat","error"),e.value="";return}const r=b();await Ie(m(r,"chat"),{text:t,author:o.username||n.email,authorId:n.uid,timestamp:H()}),e.value=""}catch(n){console.error("Send message error:",n),s("❌ Failed to send message","error")}}function aa(e){e.key==="Enter"&&qt()}async function ra(e){try{const t=b(),n=v(),{isDeveloper:o}=await ae(async()=>{const{isDeveloper:a}=await Promise.resolve().then(()=>oe);return{isDeveloper:a}},void 0,import.meta.url);if(!o(n.uid)){s("❌ Only developers can delete messages","error");return}await M(m(t,`chat/${e}`))}catch(t){console.error("Delete message error:",t),s("❌ Failed to delete message","error")}}function Ut(){const e=b(),t=m(e,"chat");W(t,async n=>{const o=n.val()||{},a=document.getElementById("chatMessages");if(!a)return;const r=v(),{isDeveloper:i}=await ae(async()=>{const{isDeveloper:u}=await Promise.resolve().then(()=>oe);return{isDeveloper:u}},void 0,import.meta.url),l=r?i(r.uid):!1,c=Object.entries(o).map(([u,p])=>({id:u,...p})).sort((u,p)=>(u.timestamp||0)-(p.timestamp||0));a.innerHTML=c.length===0?`<div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! 🎉</div>
            </div>`:"",c.forEach(u=>{const p=document.createElement("div");p.className="chat-message",p.innerHTML=`
                <div class="chat-author">${Y(u.author||"Unknown")}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">${Y(u.text||"")}</div>
                    ${l?`<button class="btn btn-danger btn-sm" onclick="deleteMessage('${u.id}')" style="margin-left: 10px; padding: 2px 8px; font-size: 0.8em;">
                            <i class="fas fa-trash"></i>
                        </button>`:""}
                </div>
            `,a.appendChild(p)}),a.scrollTop=a.scrollHeight})}function Ht(){s("💧 Time for a water break! Stay hydrated!"),window.confetti&&confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}});const e=parseInt(localStorage.getItem("hydrationCount")||"0")+1;if(localStorage.setItem("hydrationCount",e),e>=12){const t=h().achievements;t.hydroHomie=!0,_e("Hydro Homie")}}function _e(e){localStorage.getItem(`achievement_${e}`)||(localStorage.setItem(`achievement_${e}`,"true"),window.confetti&&confetti({particleCount:100,spread:70,origin:{y:.6}}),s(`🏆 Achievement Unlocked: ${e}!`))}function ia(e){const t=h().locationHistory,n=h().userData;if(t.push({location:e,time:Date.now(),user:n.username}),s(`📍 Checked in at ${e}!`),t.length>=10){const o=h().achievements;o.partyAnimal=!0,_e("Party Animal")}window.closeModal()}function jt(){const e=Ve();let t='<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';return e.forEach((n,o)=>{const a=20+o%3*30,r=20+Math.floor(o/3)*30;t+=`
            <div class="location-dot" style="left: ${a}%; top: ${r}%;" title="${n.name}: ${n.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${n.name}</span>
            </div>
        `}),t+="</div>",t}function Gt(){document.querySelectorAll(".location-dot").forEach(t=>{t.addEventListener("click",function(){const n=this.getAttribute("title");s(`📍 ${n}`)})})}function Ve(){const e=h().partyData||{},t={};return Object.values(e).forEach(n=>{t[n.location]||(t[n.location]={count:0,totalBac:0}),t[n.location].count++,t[n.location].totalBac+=n.bac}),Object.entries(t).map(([n,o])=>({name:n,count:o.count,avgBac:o.totalBac/o.count}))}function sa(){const e=localStorage.getItem("homeAddress");if(e){const t=encodeURIComponent(e);s("🚕 Opening Uber with your home address..."),navigator.clipboard.writeText(e).then(()=>s("📋 Home address copied to clipboard!")).catch(()=>{}),window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${t}`,"_blank")}else s("🚕 Opening Uber app..."),window.open("https://m.uber.com/ul/","_blank")}function la(e){switch(e){case"ambulance":confirm("Call emergency services (112)?")&&(window.location.href="tel:112");break;case"campus-security":confirm("Call HSG Campus Security?")&&(window.location.href="tel:+41712242424");break;case"taxi":s("🚕 Opening taxi options..."),setTimeout(()=>{ca()},500);break}}function ca(){const e=localStorage.getItem("homeAddress")||"",t=`
        <h2>🚕 Ride Options</h2>
        ${e?`<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${Y(e)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${Y(e)}').then(() => showNotification('📋 Address copied!'))">
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
    `;document.getElementById("modalBody").innerHTML=t,document.getElementById("modal").classList.add("show")}function da(e){localStorage.setItem("buddy",e),s(`👥 ${e} is now your buddy!`);const t=h().achievements;t.guardianAngel=!0,_e("Guardian Angel"),window.closeModal()}function ua(){window.showModal("first-aid")}async function ma(){const e=document.getElementById("username").value.trim();if(!e||e.length<3){s("❌ Username must be at least 3 characters","error");return}try{const t=b(),n=v(),o=h().userData;if(e.toLowerCase()!==o.username?.toLowerCase()){const a=await j(m(t,"usernames/"+e.toLowerCase()));if(a.exists()&&a.val()!==n.uid){s("❌ Username already taken","error");return}o.username&&await M(m(t,"usernames/"+o.username.toLowerCase())),await D(m(t,"usernames/"+e.toLowerCase()),n.uid)}await D(m(t,"users/"+n.uid+"/username"),e),s("✅ Profile updated!","success"),o.username=e,document.getElementById("profileName").textContent=e,document.getElementById("settingsUsername").textContent=e,document.getElementById("profileInitial").textContent=e.charAt(0).toUpperCase()}catch(t){console.error("Update profile error:",t),s("❌ Failed to update profile","error")}}async function pa(){const e=prompt("Enter new password (min 6 characters):");if(e&&e.length>=6)try{await v().updatePassword(e),s("✅ Password changed successfully","success")}catch(t){console.error("Password change error:",t),t.code==="auth/requires-recent-login"?s("❌ Please sign out and sign in again before changing password","error"):s("❌ Failed to change password","error")}}async function ya(){const e=document.getElementById("homeAddress").value,t=document.getElementById("emergencyContact").value,n=document.getElementById("medicalInfo").value,o=document.getElementById("safetyNotes").value;try{const a=b(),r=v();await D(m(a,"users/"+r.uid+"/emergency"),{homeAddress:e,emergencyContact:t,medicalInfo:n,safetyNotes:o,updatedAt:H()}),localStorage.setItem("homeAddress",e),localStorage.setItem("emergencyContact",t),localStorage.setItem("medicalInfo",n),localStorage.setItem("safetyNotes",o),s("✅ Emergency information saved","success"),Ot()}catch(a){console.error("Save emergency info error:",a),s("❌ Failed to save emergency info","error")}}async function ga(){const e=document.getElementById("shareLocation").checked,t=document.getElementById("notifications").checked,n=document.getElementById("publicProfile").checked;try{const o=b(),a=v();await D(m(o,"users/"+a.uid+"/settings"),{shareLocation:e,notifications:t,publicProfile:n}),localStorage.setItem("shareLocation",e),localStorage.setItem("notifications",t),s("✅ Privacy settings saved","success"),Ot()}catch(o){console.error("Save privacy settings error:",o),s("❌ Failed to save settings","error")}}function Ot(){const e=document.createElement("div");e.className="settings-saved",e.innerHTML="✅",document.body.appendChild(e),setTimeout(()=>e.remove(),1e3)}function zt(){document.querySelectorAll(".toggle-switch").forEach(e=>{const t=e.querySelector("input");t&&t.checked?e.classList.add("active"):e.classList.remove("active")})}async function ha(){if(confirm("Delete your account? This cannot be undone!")&&confirm("Are you absolutely sure? All your data will be permanently deleted."))try{const e=b(),t=v(),n=h().userData,o=h().friendsData;if(await M(m(e,"users/"+t.uid)),n.username&&await M(m(e,"usernames/"+n.username.toLowerCase())),o)for(const a in o)await M(m(e,"users/"+a+"/friends/"+t.uid));await t.delete(),s("Account deleted. Goodbye!"),location.reload()}catch(e){console.error("Delete account error:",e),e.code==="auth/requires-recent-login"?s("❌ Please sign out and sign in again before deleting account","error"):s("❌ Failed to delete account","error")}}function fa(){const e=v(),t=h(),n={user:{email:e?.email,username:t.userData.username},settings:t.userData.settings,emergency:t.userData.emergency,devices:t.deviceData,friends:t.friendsData,drinkHistory:t.drinkHistory,achievements:t.achievements,partyData:t.partyData},o=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),a=window.URL.createObjectURL(o),r=document.createElement("a");r.href=a,r.download=`hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(a),s("📥 Data exported successfully!","success")}async function ba(){const e=document.getElementById("modalDeviceId").value.trim().toUpperCase();if(!e){s("❌ Please enter a Device ID","error");return}try{const t=b(),n=v(),o=h().deviceData;if(!(await j(m(t,"readings/"+e))).exists()){s("❌ Device not found. Make sure it's connected.","error");return}if(o[e]){s("ℹ️ Device already paired"),window.closeModal();return}await D(m(t,"users/"+n.uid+"/devices/"+e),{pairedAt:H(),name:"My Breathalyzer"}),s("✅ Device paired successfully!","success"),window.closeModal()}catch(t){console.error("Pairing error:",t),s("❌ Pairing failed","error")}}function va(e){const t=Math.floor((Date.now()-e)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:`${Math.floor(t/3600)}h ago`}function Y(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function wa(e){console.log("Permission resolved:",e)}async function ka(){const e=b(),{DEVELOPER_UIDS:t}=await ae(async()=>{const{DEVELOPER_UIDS:n}=await Promise.resolve().then(()=>oe);return{DEVELOPER_UIDS:n}},void 0,import.meta.url);try{const n={};for(const o of t)n[`developers/${o}`]=!0;await D(m(e,"developers"),{});for(const o of t)await D(m(e,`developers/${o}`),!0);return s("✅ Developers node created in Firebase!","success"),console.log("Developers node set up with UIDs:",t),!0}catch(n){return console.error("Error setting up developers:",n),s("❌ Failed to set up developers node","error"),!1}}async function xa(){const e=b(),{DEVELOPER_UIDS:t}=await ae(async()=>{const{DEVELOPER_UIDS:n}=await Promise.resolve().then(()=>oe);return{DEVELOPER_UIDS:n}},void 0,import.meta.url);try{let n=0;for(let o=0;o<t.length;o++){const a=t[o],r=`TEST-DEV-${a.substring(0,6)}`;await D(m(e,`readings/${r}`),{bac:.045+Math.random()*.04,timestamp:Date.now()-o*6e4,trend:["rising","steady","falling"][Math.floor(Math.random()*3)]}),await D(m(e,`users/${a}/devices/${r}`),{name:`Test Device ${o+1}`,addedAt:Date.now()}),n++}return s(`🧪 Test BAC added to ${n} developer account${n>1?"s":""}!`,"success"),console.log(`Test devices added for ${n} developers`),setTimeout(()=>{window.location.reload&&window.location.reload()},1e3),n}catch(n){console.error("Error adding test data:",n),s("❌ Failed to add test data","error")}}async function Ea(){const e=b(),{DEVELOPER_UIDS:t}=await ae(async()=>{const{DEVELOPER_UIDS:n}=await Promise.resolve().then(()=>oe);return{DEVELOPER_UIDS:n}},void 0,import.meta.url);v();try{let n=0;const o=["TEST-DEV-001","TEST-DEV-002","TEST-DEVICE-001","TEST-DEVICE-002"];for(const r of t)o.push(`TEST-DEV-${r.substring(0,6)}`);for(const r of o)try{await M(m(e,`readings/${r}`)),console.log(`Removed readings for ${r}`),n++}catch{}const a=await j(m(e,"users"));if(a.exists()){const r=a.val();for(const[i,l]of Object.entries(r))if(l.devices)for(const c of Object.keys(l.devices))c.startsWith("TEST-")&&c.includes("DEV")&&(await M(m(e,`users/${i}/devices/${c}`)),console.log(`Removed ${c} from user ${i}`),n++)}return s(`🧹 Cleaned up ${n} test entries from Firebase!`,"success"),console.log(`Total test entries removed: ${n}`),setTimeout(()=>{window.location.reload&&window.location.reload()},1e3),n}catch(n){console.error("Error removing test data:",n),s("❌ Failed to remove test data","error")}}const Ca=window.Chart;let _=null,Q="24h";async function Ia(){try{const e=document.getElementById("drinkType").value,t=parseInt(document.getElementById("drinkAmount").value)||0,n=parseFloat(document.getElementById("alcoholPercent").value)||0;if(t<=0){s("❌ Please enter a valid amount","error");return}const o={id:Date.now(),type:e,amount:t,alcoholPercent:n,pureAlcohol:(t*n/100).toFixed(1),time:new Date,emoji:Z[e].emoji};let a=h().drinkHistory||[];a.unshift(o),T("drinkHistory",a),Se(),Be(),fe(),be(),De();const r=b(),i=v();if(r&&i)try{await D(m(r,"users/"+i.uid+"/drinks/"+o.id),{...o,time:o.time.toISOString()})}catch(l){console.warn("Firebase save failed (non-critical):",l)}typeof onDrinkLogged=="function"&&onDrinkLogged(e,a),e==="water"?(typeof window.confetti=="function"&&window.confetti({particleCount:50,spread:60,colors:["#00d4ff","#0099ff","#0066ff"],origin:{y:.6}}),s("💧 Great job staying hydrated!","success")):s(`${o.emoji} Drink logged!`),document.getElementById("drinkAmount").value=Z[e].amount,document.getElementById("alcoholPercent").value=Z[e].alcohol}catch(e){console.error("Error logging drink:",e),s("❌ Failed to log drink","error")}}function Be(){try{const e=h().drinkHistory||[],n=Date.now()-36e5,o=e.filter(g=>g.type!=="water").length,a=e.filter(g=>g.type==="water").length,r=e.reduce((g,P)=>g+parseFloat(P.pureAlcohol||0),0),i=e.filter(g=>new Date(g.time).getTime()>n&&g.type!=="water").length,l=document.getElementById("totalDrinks");l&&(l.textContent=o);const c=document.getElementById("totalWater");c&&(c.textContent=a);const u=document.getElementById("totalAlcohol");u&&(u.textContent=r.toFixed(0)+"ml");const p=document.getElementById("drinkRate");p&&(p.textContent=i+"/hr")}catch(e){console.error("Error updating drink stats:",e)}}function fe(){try{const e=document.getElementById("drinkHistory");if(!e)return;let t=h().drinkHistory||[];const n=Date.now(),o=Q==="24h"?n-1440*60*1e3:n-720*60*60*1e3;if(t=t.filter(a=>new Date(a.time).getTime()>o),t.length===0){e.innerHTML=`<p style="text-align: center; opacity: 0.7;">No drinks logged in the last ${Q==="24h"?"24 hours":"30 days"}</p>`;return}e.innerHTML=t.map(a=>`
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
                        <div style="font-size: 0.9em;">${Ye(a.time)}</div>
                        <button class="btn" style="padding: 5px 10px; margin-top: 5px;" onclick="removeDrink(${a.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join("")}catch(e){console.error("Error updating drink history:",e)}}function be(){try{const e=document.getElementById("drinkChart"),t=h().chartVisible;if(!e||!t)return;let n=h().drinkHistory||[];const o=Date.now(),a=Q==="24h"?o-1440*60*1e3:o-720*60*60*1e3;n=n.filter(u=>new Date(u.time).getTime()>a);const r={};if(n.forEach(u=>{r[u.type]||(r[u.type]=0),r[u.type]++}),Object.keys(r).length===0){_&&(_.destroy(),_=null);return}const i=Object.keys(r),l=Object.values(r),c=i.map(u=>Z[u]?.emoji||"🍹");_?(_.data.labels=i.map((u,p)=>`${c[p]} ${u}`),_.data.datasets[0].data=l,_.update()):_=new Ca(e,{type:"doughnut",data:{labels:i.map((u,p)=>`${c[p]} ${u}`),datasets:[{data:l,backgroundColor:["#00ff88","#00d4ff","#ff00ff","#ffcc00","#ff4444","#0099ff","#00ccff","#ff0088"],borderColor:"rgba(255, 255, 255, 0.1)",borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"#fff",padding:10,font:{size:window.innerWidth<768?10:12}}}}}})}catch(e){console.error("Error updating drink chart:",e)}}function De(){const e=document.getElementById("emergencySummary");if(!e)return;const t=h().drinkHistory||[],n=t.reduce((l,c)=>l+parseFloat(c.pureAlcohol),0),o=t.length>0?((Date.now()-t[t.length-1].time)/36e5).toFixed(1):0,a={};t.forEach(l=>{a[l.type]||(a[l.type]=0),a[l.type]++});const r=localStorage.getItem("medicalInfo")||"None provided",i=localStorage.getItem("safetyNotes")||"None provided";e.innerHTML=`
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 10px 0;">
            <p><strong>Time Period:</strong> ${o} hours</p>
            <p><strong>Total Pure Alcohol:</strong> ${n.toFixed(0)}ml</p>
            <p><strong>Drink Breakdown:</strong></p>
            <ul style="margin-left: 20px;">
                ${Object.entries(a).map(([l,c])=>`<li>${Z[l].emoji} ${l}: ${c}</li>`).join("")}
            </ul>
            <p><strong>Last Drink:</strong> ${t.length>0?Ye(t[0].time):"None"}</p>
            <p><strong>Estimated BAC:</strong> ${Vt().toFixed(3)}‰</p>
            <p><strong>Medical Info:</strong> ${Y(r)}</p>
            <p><strong>Safety Notes:</strong> ${Y(i)}</p>
        </div>
    `}function Pa(e){let t=h().drinkHistory||[];t=t.filter(n=>n.id!==e),T("drinkHistory",t),Se(),Be(),fe(),be(),De(),s("🗑️ Drink removed")}function Ba(){let e=h().chartVisible;e=!e,T("chartVisible",e);const t=document.getElementById("chartWrapper"),n=document.getElementById("chartToggleText");e?(t.classList.remove("collapsed"),n.textContent="Hide Chart"):(t.classList.add("collapsed"),n.textContent="Show Chart")}function Da(){const e=document.getElementById("timeRangeText");Q==="24h"?(Q="30d",e.textContent="24h View"):(Q="24h",e.textContent="30d History"),be(),fe(),s(`📊 Showing ${Q==="24h"?"last 24 hours":"last 30 days"}`)}function Sa(){try{const e=h().drinkHistory||[],t=h().userData,n=v(),o={timestamp:new Date().toISOString(),estimatedBAC:Vt().toFixed(3),drinkHistory:e,totalAlcohol:e.reduce((i,l)=>i+parseFloat(l.pureAlcohol||0),0),userData:{name:t.username||n?.email||"Unknown",address:localStorage.getItem("homeAddress")||"Not provided",emergencyContact:localStorage.getItem("emergencyContact")||"Not provided",medicalInfo:localStorage.getItem("medicalInfo")||"None",safetyNotes:localStorage.getItem("safetyNotes")||"None"}},a=`EMERGENCY MEDICAL REPORT
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
${e.map(i=>`${Ye(i.time)}: ${i.emoji} ${i.type} - ${i.amount}ml @ ${i.alcoholPercent}%`).join(`
`)}

MEDICAL NOTES
-------------
- Monitor for signs of alcohol poisoning
- Ensure airway remains clear
- Check vitals regularly
- Consider IV fluids if dehydrated`,r=`
            <h2>🚨 Emergency Medical Report</h2>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; margin: 20px 0; max-height: 400px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em;">${Y(a)}</pre>
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
        `;window.currentEmergencyReport=a,document.getElementById("modalBody").innerHTML=r,document.getElementById("modal").classList.add("show")}catch(e){console.error("Error generating emergency report:",e),s("❌ Error generating report","error")}}function _t(){window.currentEmergencyReport&&navigator.clipboard.writeText(window.currentEmergencyReport).then(()=>s("📋 Report copied to clipboard!","success")).catch(()=>{const e=document.createElement("textarea");e.value=window.currentEmergencyReport,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),s("📋 Report copied!","success")})}function Ta(){try{const e=new Blob([window.currentEmergencyReport],{type:"text/plain"}),t=window.URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download=`emergency_report_${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(n),n.click(),document.body.removeChild(n),window.URL.revokeObjectURL(t),s("📥 Report downloaded!","success")}catch(e){console.error("Download error:",e),s("❌ Download failed - use copy instead","error")}}function Ma(){navigator.share&&window.currentEmergencyReport?navigator.share({title:"Emergency Medical Report",text:window.currentEmergencyReport}).then(()=>s("📤 Report shared!","success")).catch(()=>s("❌ Sharing cancelled")):(_t(),s("📋 Report copied - share manually"))}function $a(){if(confirm("Clear all drink history? This cannot be undone!")){T("drinkHistory",[]),Se(),Be(),fe(),be(),De();const e=b(),t=v();e&&t&&M(m(e,"users/"+t.uid+"/drinks")),s("🗑️ Drink history cleared")}}function Se(){const e=h().drinkHistory||[];localStorage.setItem("drinkHistory",JSON.stringify(e))}function La(){const e=localStorage.getItem("drinkHistory");if(e)try{const t=JSON.parse(e);t.forEach(n=>{n.time=new Date(n.time)}),T("drinkHistory",t)}catch(t){console.error("Failed to load drink history:",t)}}function Ye(e){const t=new Date,n=new Date(e),o=Math.floor((t-n)/6e4);return o<1?"Just now":o<60?`${o}m ago`:o<1440?`${Math.floor(o/60)}h ago`:n.toLocaleDateString()}function Vt(){const n=h().drinkHistory||[],o=n.reduce((l,c)=>l+parseFloat(c.pureAlcohol),0),a=n.length>0?(Date.now()-n[n.length-1].time)/36e5:0,r=o*.789;return Math.max(0,r/(70*1e3*.68)*100-.015*a)}const $=window.confetti;let w=[],O=0;const d={flipTimer:null,flipTime:0,bestFlipTime:null,triviaScore:0,currentTriviaIndex:0,tournament:{teams:[],bracket:[],currentRound:0,totalTeams:0,rounds:[]},beerPong:{currentMode:"normal",team1Name:"Team 1",team2Name:"Team 2",specialCups:{team1:[],team2:[]}},selectedCategory:"classic"};function z(e){O=e}function re(){for(let e=w.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[w[e],w[t]]=[w[t],w[e]]}G()}function Aa(e){return{"never-have-i-ever":"Never Have I Ever","truth-or-dare":"Truth or Dare","kings-cup":"King's Cup","beer-pong":"Beer Pong","flip-cup":"Flip Cup",trivia:"Trivia","would-you-rather":"Would You Rather","most-likely-to":"Most Likely To","spin-the-bottle":"Spin the Bottle"}[e]||"Party Game"}function gt(e){const t=Math.floor(e/100),n=e%100,o=Math.floor(t/60),a=t%60;return`${o}:${a.toString().padStart(2,"0")}.${n.toString().padStart(2,"0")}`}function Na(e){T("currentGame",e);const t=document.createElement("div");t.className="game-overlay",t.id="gameOverlay";let n="";const o=window.gameModules[e];o&&o.createGame&&(n=o.createGame()),t.innerHTML=`
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${Aa(e)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${n}
        </div>
    `,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),10),o&&o.initialize&&o.initialize(),$&&$({particleCount:100,spread:70,origin:{y:.6}})}function Te(){const e=document.getElementById("gameOverlay");e&&(e.classList.remove("show"),setTimeout(()=>e.remove(),500)),T("currentGame",null)}function Yt(){const e=document.getElementById("playerNameInput"),t=e.value.trim();if(!t){s("Please enter a player name!","error");return}if(w.includes(t)){s("Player already added!","error");return}w.push(t),e.value="",G(),w.length>=2&&(document.getElementById("startGameBtn").style.display="block"),s(`${t} added!`,"success")}function Kt(e){const t=w[e];w.splice(e,1),G(),w.length<2&&(document.getElementById("startGameBtn").style.display="none"),s(`${t} removed!`,"info")}function G(){const e=document.getElementById("playersList");e&&(e.innerHTML=w.map((t,n)=>`
        <div class="player-item">
            <span>${t}</span>
            <button class="btn btn-sm btn-danger" onclick="removePlayer(${n})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join(""))}function Jt(){document.getElementById("gamePlay").style.display="none",document.getElementById("playerSetup").style.display="block",O=0}function Qt(){const e=document.getElementById("currentPlayer");e&&w.length>0&&(e.textContent=w[O])}function Zt(e,t){d.selectedCategory=e;const n=document.getElementById("categorySelection");n&&(n.style.display="none");const o=document.getElementById("playerSetup"),a=document.getElementById("gamePlay");(t==="neverHaveIEver"||t==="truthOrDare"||t==="wouldYouRather"||t==="mostLikelyTo"||t==="spinBottle")&&o?(o.style.display="block",G(),w.length>=2&&(document.getElementById("startGameBtn").style.display="block")):a&&(a.style.display="block",ie())}function Xt(e){document.getElementById("gamePlay").style.display="none",document.getElementById("categorySelection").style.display="block"}function ie(){const e=document.getElementById("categoryBadge");if(e){const t={classic:"Classic",gettingStarted:"Getting Started",normal:"Normal",spicy:"Spicy 🔥",couples:"Couples 💕"};e.textContent=t[d.selectedCategory]||"Classic",e.style.background={classic:"linear-gradient(45deg, #00ff88, #00d4ff)",gettingStarted:"linear-gradient(45deg, #4CAF50, #8BC34A)",normal:"linear-gradient(45deg, #2196F3, #03A9F4)",spicy:"linear-gradient(45deg, #ff0088, #ff4444)",couples:"linear-gradient(45deg, #E91E63, #FF4081)"}[d.selectedCategory]||"linear-gradient(45deg, #00ff88, #00d4ff)"}}window.gameModules=window.gameModules||{};window.addPlayer=Yt;window.removePlayer=Kt;window.selectGameCategory=Zt;window.changeCategoryMidGame=Xt;window.resetToPlayerSetup=Jt;window.closeGame=Te;const B={beerPongRules:{standard:{title:"📜 Standard Beer Pong Rules",description:"The official way to play Beer Pong",rules:[{name:"🔄 Balls Back",desc:"Both partners make cups = shoot again! No re-racks during bonus shots."},{name:"🔙 Behind-the-Back",desc:"Miss and grab the ball while it's on the table? Shoot behind your back for a bonus cup!"},{name:"⚡ Bouncing",desc:"Bounce shots count as 2 cups! But opponents can swat bounced shots away."},{name:"💪 Elbows",desc:"Keep those elbows behind the table edge when shooting. Breaking the plane = reshoot!"},{name:"👀 Eye-to-Eye",desc:"To decide who goes first, one player from each team shoots while making eye contact. First to make it wins!"},{name:"🔥 Fire",desc:"Make 2 in a row? Call 'heating up'. Make the 3rd? Call 'fire' and keep shooting until you miss!"},{name:"🏝️ Island",desc:"Once per game, call 'island' on an isolated cup. Make it = remove 2 cups!"},{name:"⏰ Overtime",desc:"Tied game? Each team sets up 3 cups in a triangle. No re-racks allowed!"},{name:"🙏 Redemption",desc:"Lost all cups? Keep shooting until you miss! Make them all = overtime!"},{name:"♻️ Re-racks",desc:"2 re-racks per game. Diamond, line, triangle - get creative!"},{name:"🧹 Tidying-up",desc:"Tighten those cups anytime! Keep the formation clean."}]},creator:{title:"🎯 Creator's Beer Pong Rules",description:"The way Beer Pong was meant to be played! 🍺",rules:[{name:"👀 Eye-to-Eye",desc:"Same as standard - stare into their soul while shooting to go first!"},{name:"♻️ Re-racks",desc:"2 per game - get creative with those formations!"},{name:"🎩 Gentleman",desc:"Call 'Gentleman' to tidy cups OR force opponent to line up their last 2 cups!"},{name:"🔄 Balls Back",desc:"Both make it = balls back baby! Keep that momentum going!"},{name:"⚡ Bouncing",desc:"Bounce = 2 cups removed! High risk, high reward!"},{name:"💪 Elbows",desc:"Watch those elbows - we're not playing reach pong!"},{name:"🏝️ Island",desc:"Isolated cup = 2 cups removed when made. Call it out!"},{name:"🎪 Trickshot",desc:"Ball on table after miss? Any creative shot = 2 cups! Behind back is for beginners!"},{name:"💥 Double Trouble",desc:"Same cup hit twice? That cup + ALL touching cups are gone! Legendary move!"},{name:"🎮 Redemption 2.0",desc:"Lost all cups? Make one to stay alive - but nothing gets removed! It's sudden death mode!"}]}},specialBeerPongRules:{classic:["🎯 Make a rule! Everyone must follow it for the rest of the game","🔄 Switch sides! Both teams swap positions","💃 Dance before shooting! Do a 10-second dance before each shot","🎵 Sing while shooting! Must sing during your entire turn","🎭 Accent round! Speak in an accent for 5 minutes","🤐 Silent round! No talking for 2 rounds","👯 Mirror mode! Copy everything your opponent does","🎯 Call your shot! Must call which cup you're aiming for","⏰ Speed round! 5-second shot clock for next 3 shots","🤡 Compliment battle! Compliment opponents before each shot"],gettingStarted:["🎯 Nice shot bonus! Make a cup = opponent drinks water","🤝 Team spirit! High five after every shot","🎵 Theme song! Pick a song to play during your turn","📣 Announce your shots! Describe your technique before shooting","🎪 Celebration dance! Do a victory dance after making a cup","👏 Applause rule! Everyone claps after a made cup","🎯 Practice shot! Get one practice shot per turn","🤗 Encouragement only! Only positive comments allowed","🎯 Second chance! Miss = get one retry per game","🏆 MVP! Best shot of the round gets to make a rule"],normal:["👁️ Blindfold shot! Next shot must be taken blindfolded","🤝 Partner shot! Both teammates must hold the ball together","🎪 Trick shot only! Next 3 shots must be trick shots","🚫 No elbows! Next round, elbows must stay at your sides","🦩 Flamingo stance! Stand on one leg for your next shot","🔄 Opposite hand! Use your non-dominant hand for 2 turns","🎪 Spin before shooting! Do 3 spins before taking your shot","💪 Push-up penalty! Do 5 push-ups if you miss","🎯 Behind the back only! All shots must be behind the back","🤸 Gymnastics shot! Do a cartwheel before shooting"],spicy:["👕 Strip pong! Remove clothing item when opponent makes cup","💋 Kiss for miss! Miss = kiss your teammate","🍑 Distraction allowed! Opponents can distract however they want","📱 Phone roulette! Text your ex 'I miss you'","🔥 Hot seat! Answer any question or take 2 shots","💃 Sexy dance! Do a lap dance if you miss","🎯 Body shots! Made cup = body shot off opponent","👅 Lick it! Lick the ball before shooting","🔥 Truth shot! Make cup = opponent answers truth question","💋 Make out break! Teams make out for 30 seconds"],couples:["💑 Couple shots! Partners must be touching while shooting","💋 Kiss for cups! Make a cup = kiss your partner","🤝 Trust shot! Partner guides your blindfolded shot","💕 Compliment rule! Compliment partner before each shot","🎯 Love wins! Make 2 in a row = opponents kiss","👫 Switch partners! Play with opponent's partner for 1 round","💑 Couple's choice! Make cup = give opponents a couple dare","❤️ Heart eyes! Maintain eye contact with partner while shooting","💋 Victory kiss! Kiss for 10 seconds after making a cup","🤗 Support system! Hug partner after every shot"]},specialBeerPongDares:{classic:["Take a shot chosen by opponents","Do 20 jumping jacks","Sing the alphabet backwards","Do your best impression of someone in the room","Tell your most embarrassing story","Do the chicken dance for 1 minute","Speak in rhymes for the next 5 minutes","Call a random contact and say 'I love you'","Do 10 push-ups","Let opponents choose your next drink"],gettingStarted:["Give someone a high five","Tell a joke","Do your best dance move","Sing your favorite song chorus","Give someone a compliment","Do 5 jumping jacks","Share a fun fact about yourself","Do your best animal impression","Tell us your hidden talent","Make everyone laugh"],normal:["Let opponents post something on your social media","Do 20 burpees right now","Let everyone go through your phone for 30 seconds","Show your last 5 Google searches","Let opponents give you a nickname for the night","Swap an item of clothing with an opponent","Let opponents draw on your face with marker","Chug a mystery drink made by opponents","Let everyone read your last text conversation","Freestyle rap for 30 seconds"],spicy:["Call your crush and tell them you're thinking of them","Send a nude to your ex (or pretend to)","Reveal your body count","Let opponents go through your dating apps","Do a strip tease for 30 seconds","Make out with someone chosen by opponents","Send a dirty text to someone","Reveal your biggest kink","Take a body shot off someone","Flash everyone for 3 seconds"],couples:["Kiss your partner for 30 seconds","Give your partner a lap dance","Reveal your partner's most annoying habit","Let your partner post on your social media","Switch clothes with your partner","Tell everyone your partner's biggest fear","Massage your partner for 1 minute","Share your wildest experience together","Feed your partner a shot","Whisper your fantasy to your partner"]},neverHaveIEver:{classic:["Never have I ever been kicked out of a bar or club","Never have I ever lied about my age to get into a club","Never have I ever karaoke'd while drunk","Never have I ever lost my phone on a night out","Never have I ever thrown up in public","Never have I ever called in sick when I wasn't","Never have I ever fallen asleep at work/in class","Never have I ever gotten a tattoo I regret","Never have I ever crashed a wedding or private party","Never have I ever danced on a table or bar"],gettingStarted:["Never have I ever traveled to another continent","Never have I ever gone skydiving","Never have I ever been on TV","Never have I ever met a celebrity","Never have I ever won a competition","Never have I ever been in a helicopter","Never have I ever gone surfing","Never have I ever stayed up for 24 hours straight","Never have I ever eaten something I couldn't identify","Never have I ever gotten lost in a foreign country"],normal:["Never have I ever ghosted someone","Never have I ever sent a risky text to the wrong person","Never have I ever walked into a glass door","Never have I ever farted loudly in a quiet room","Never have I ever tripped and fallen in front of a crowd","Never have I ever accidentally sent a screenshot to the person I was talking about","Never have I ever lied on my resume","Never have I ever eaten food off the floor","Never have I ever gone 3+ days without showering","Never have I ever broken something and blamed someone else"],spicy:["Never have I ever kissed someone I just met","Never have I ever had a one night stand","Never have I ever skinny dipped","Never have I ever done a body shot","Never have I ever slept with a coworker","Never have I ever hooked up with a professor/boss","Never have I ever been in a hot tub with strangers","Never have I ever woken up wearing someone else's clothes","Never have I ever dated two people at once","Never have I ever kissed someone to make someone else jealous"],couples:["Never have I ever been in love with my best friend","Never have I ever broken up with someone over text","Never have I ever stalked an ex on social media","Never have I ever been in love with two people at once","Never have I ever cheated or been cheated on","Never have I ever had a crush on my partner's friend","Never have I ever lied to my partner about where I was","Never have I ever kept a secret from my partner","Never have I ever dreamt about someone else while in a relationship","Never have I ever compared my partner to an ex"]},truths:{classic:["What's your most embarrassing drunk story?","What's the biggest lie you've ever told?","What's the most trouble you've gotten into?","Have you ever been caught doing something you shouldn't?","What's your worst habit that no one knows about?","Who in this room has the best style?","Who here would you want to switch lives with?","What's the most embarrassing thing on your phone right now?","What's the craziest thing you've done for money?","What's your most embarrassing moment?"],gettingStarted:["What's your dream vacation destination?","What's your biggest fear?","What's your hidden talent?","What's the best compliment you've ever received?","What's your favorite childhood memory?","If you could have dinner with anyone, who would it be?","What's your biggest pet peeve?","What's the best advice you've ever received?","What's your guilty pleasure TV show?","What's something you've never told anyone?"],normal:["What's the weirdest thing you do when you're alone?","What's your most embarrassing Google search?","Who here do you think has the biggest secret?","What's the last lie you told?","What's your most irrational fear?","What's the most childish thing you still do?","What's your worst dating app experience?","What's the most embarrassing thing your parents have caught you doing?","What's your biggest insecurity?","What's the meanest thing you've ever said to someone?"],spicy:["What's your biggest turn on?","Who was your worst kiss and why?","Who in this room would you most want to make out with?","What's the wildest place you've hooked up?","What's your wildest fantasy?","What's the most illegal thing you've done?","If you had to date someone here, who would it be?","What's your body count?","What's the kinkiest thing you've ever done?","Who in this room do you think is the best looking?"],couples:["What's the most embarrassing thing you've done for love?","Have you ever been in love with two people at once?","Have you ever cheated or been cheated on?","What's your biggest relationship regret?","What's the longest you've gone without sex in a relationship?","What's something your partner does that annoys you?","Have you ever faked an orgasm?","What's your partner's most annoying habit?","What's something you've lied to your partner about?","If you could change one thing about your partner, what would it be?"]},dares:{classic:["Do 10 pushups","Plank for 1 minute","Sing everything you say for the next 2 turns","Speak in an accent for the next 3 rounds","Act like a chicken for 1 minute","Do your best impression of someone in the room","Take a shot without using your hands","Finish your drink","Do 20 jumping jacks","Tell a joke and make someone laugh"],gettingStarted:["Show your best dance move","Sing the chorus of your favorite song","Do your best celebrity impression","Tell your most embarrassing story","Show the last photo in your camera roll","Do 5 pushups","Speak in a British accent for 2 turns","Make animal noises for 30 seconds","Do the robot dance","High five everyone in the room"],normal:["Let someone draw on your face with marker","Let someone style your hair however they want","Post an ugly selfie","Let someone text anyone from your phone","Eat a spoonful of hot sauce","Let the group choose someone for you to call and sing to","Make a gross drink combination and take a sip","Waterfall for 5 seconds","Let someone go through your phone for 30 seconds","Do the worm"],spicy:["Do your best twerk for 30 seconds","Give someone a lap dance for 10 seconds","Kiss the person to your left on the cheek","Give someone a 30 second massage","Switch an item of clothing with someone","Whisper something dirty to the person on your right","Post 'I'm pregnant' on your story for 1 minute","Like your crush's oldest Instagram photo","Send the last photo in your gallery to your ex","Take a body shot off someone"],couples:["Give your partner a 1 minute massage","Recreate your first kiss with your partner","Let your partner post something on your social media","Switch clothes with your partner for the rest of the game","Slow dance with your partner for 1 minute","Tell everyone your partner's most annoying habit","Let your partner draw on your face","Feed your partner a shot","Sit on your partner's lap for the next 3 rounds","Whisper your wildest fantasy to your partner"]},wouldYouRather:{classic:["Would you rather have to sing everything you say or dance everywhere you walk?","Would you rather be the funniest person in the room or the smartest?","Would you rather never be able to drink alcohol again or never be able to eat chocolate again?","Would you rather have a rewind button or a pause button for your life?","Would you rather go to a party where you know everyone or where you know no one?","Would you rather always smell like garlic or always smell like wet dog?","Would you rather be able to fly or be invisible?","Would you rather be rich or famous?","Would you rather lose your phone or your wallet?","Would you rather always be 10 minutes late or 20 minutes early?"],gettingStarted:["Would you rather have unlimited money or unlimited time?","Would you rather live in the city or the countryside?","Would you rather be able to read minds or see the future?","Would you rather travel to the past or the future?","Would you rather have a pet dragon or a pet unicorn?","Would you rather be a superhero or a supervillain?","Would you rather never use social media again or never watch TV again?","Would you rather always tell the truth or always lie?","Would you rather have super strength or super speed?","Would you rather live without music or without movies?"],normal:["Would you rather have fingers as long as legs or legs as short as fingers?","Would you rather drunk text your ex or your boss?","Would you rather throw up in front of your crush or pee yourself at a party?","Would you rather be able to fly but only 1 foot off the ground or be invisible but only when no one is looking?","Would you rather eat a live spider or a dead worm?","Would you rather swim in a pool of beer or a pool of wine?","Would you rather burp glitter or fart confetti?","Would you rather have a third arm or a third leg?","Would you rather always speak in rhymes or sing everything you say?","Would you rather have taste buds in your butt or poop through your mouth?"],spicy:["Would you rather date someone who's extremely hot but boring or average looking but hilarious?","Would you rather have sex with the lights on always or off always?","Would you rather be naked in public or have everyone read your texts?","Would you rather give up sex or give up food?","Would you rather have a threesome or be in an open relationship?","Would you rather sleep with your boss or your best friend's partner?","Would you rather be dominant or submissive?","Would you rather have great sex once a month or mediocre sex every day?","Would you rather be caught masturbating or catch your parents doing it?","Would you rather send nudes to your ex or your boss?"],couples:["Would you rather have your partner be best friends with their ex or hate their ex?","Would you rather catch your parents having sex or have them catch you?","Would you rather be in a relationship with someone who's too clingy or too distant?","Would you rather know when you're going to die or how you're going to die?","Would you rather have your partner forget your birthday or your anniversary?","Would you rather have a partner who's too jealous or not jealous at all?","Would you rather argue every day for a week or not talk for a week?","Would you rather have your partner be a bad kisser or bad in bed?","Would you rather live with your partner's parents or have them live with you?","Would you rather have your partner cheat emotionally or physically?"]},mostLikelyTo:{classic:["Who's most likely to get kicked out of a club?","Who's most likely to throw up tonight?","Who's most likely to become famous?","Who's most likely to become a millionaire?","Who's most likely to forget their own birthday?","Who's most likely to get lost in their own city?","Who's most likely to cry during a Disney movie?","Who's most likely to eat food off the floor?","Who's most likely to laugh at their own jokes?","Who's most likely to lose their phone tonight?"],gettingStarted:["Who's most likely to win a Nobel Prize?","Who's most likely to travel the world?","Who's most likely to write a book?","Who's most likely to start their own business?","Who's most likely to become a teacher?","Who's most likely to adopt a pet?","Who's most likely to learn a new language?","Who's most likely to run a marathon?","Who's most likely to become vegetarian?","Who's most likely to move to another country?"],normal:["Who's most likely to drunk text their ex?","Who's most likely to end up sleeping on the bathroom floor?","Who's most likely to go to jail?","Who's most likely to die first in a zombie apocalypse?","Who's most likely to have 10 kids?","Who's most likely to get a weird tattoo?","Who's most likely to join a cult?","Who's most likely to become a crazy cat person?","Who's most likely to marry for money?","Who's most likely to fake their own death?"],spicy:["Who's most likely to have a one night stand?","Who's most likely to have a secret crush on someone here?","Who's most likely to sleep with their boss?","Who's most likely to have a threesome?","Who's most likely to send nudes?","Who's most likely to have sex in public?","Who's most likely to date two people at once?","Who's most likely to have a sugar daddy/mommy?","Who's most likely to do porn?","Who's most likely to have the highest body count?"],couples:["Who's most likely to get married first?","Who's most likely to cheat on their partner?","Who's most likely to fall in love with their best friend?","Who's most likely to have kids first?","Who's most likely to forget their anniversary?","Who's most likely to get divorced?","Who's most likely to propose in public?","Who's most likely to have a destination wedding?","Who's most likely to elope?","Who's most likely to stay single forever?"]},spinBottleTasks:{classic:["Give a compliment","Share your most embarrassing moment","Do your best impression of someone here","Sing a song for 30 seconds","Tell them something you like about them","Do a silly dance together","Take a selfie together","Give them a high five","Tell a joke","Share a secret"],gettingStarted:["Give them a hug","Say something nice about them","Show them your best dance move","Teach them your secret handshake","Play rock paper scissors","Thumb wrestle","Staring contest for 30 seconds","Tell them your favorite thing about the party","Share your worst pickup line","Do 5 jumping jacks together"],normal:["Let them post something on your social media","Give a 30 second massage","Whisper something in their ear","Do a trust fall","Sit on their lap for the next round","Feed them a snack","Let them style your hair","Arm wrestle","Let them draw on your hand","Share an embarrassing photo from your phone"],spicy:["Kiss on the cheek","Give a lap dance for 10 seconds","Switch an item of clothing","Take a body shot","Play with their hair for 1 minute","Whisper your dirtiest thought","Lick their ear","Give them a hickey","Make out for 10 seconds","Remove an item of clothing"],couples:["Kiss for 30 seconds","Give your partner a 1 minute massage","Whisper what you want to do later","Share your favorite memory together","Recreate your first kiss","Slow dance for 1 minute","Feed each other a shot","Tell them what you love most about them","Give them a lap dance","Make out until the next turn"]},trivia:[{question:"When was HSG founded?",options:["1898","1923","1945","1967"],correct:0},{question:"What does HSG stand for?",options:["High School Gymnasium","Hochschule St. Gallen","Higher Studies Group","Helvetic Study Group"],correct:1},{question:"How many students attend HSG?",options:["5,000","9,000","12,000","15,000"],correct:1},{question:"What's the most popular major at HSG?",options:["Law","Business Administration","Computer Science","International Affairs"],correct:1}],triviaCategories:{sports:[{question:"Which country has won the most FIFA World Cups?",options:["Germany","Brazil","Argentina","Italy"],correct:1},{question:"How many players are on a basketball court at one time?",options:["8","10","12","14"],correct:1},{question:"In which year were the first modern Olympics held?",options:["1896","1900","1904","1912"],correct:0},{question:"What is the maximum score in 10-pin bowling?",options:["200","250","300","350"],correct:2},{question:"Which tennis player has won the most Grand Slam titles?",options:["Roger Federer","Rafael Nadal","Novak Djokovic","Pete Sampras"],correct:2},{question:"How long is a marathon?",options:["40.2 km","41.2 km","42.2 km","43.2 km"],correct:2},{question:"Which sport is known as 'The Beautiful Game'?",options:["Basketball","Football/Soccer","Tennis","Golf"],correct:1},{question:"How many rings are on the Olympic flag?",options:["4","5","6","7"],correct:1},{question:"In golf, what is an eagle?",options:["1 under par","2 under par","3 under par","Par"],correct:1},{question:"Which country invented ice hockey?",options:["USA","Russia","Canada","Sweden"],correct:2}],history:[{question:"In which year did World War II end?",options:["1943","1944","1945","1946"],correct:2},{question:"Who was the first President of the United States?",options:["Thomas Jefferson","George Washington","John Adams","Benjamin Franklin"],correct:1},{question:"The ancient city of Rome was built on how many hills?",options:["5","6","7","8"],correct:2},{question:"In which year did the Berlin Wall fall?",options:["1987","1988","1989","1990"],correct:2},{question:"Who painted the Mona Lisa?",options:["Michelangelo","Leonardo da Vinci","Raphael","Donatello"],correct:1},{question:"Which empire built Machu Picchu?",options:["Aztec","Maya","Inca","Olmec"],correct:2},{question:"In which year did Christopher Columbus reach the Americas?",options:["1490","1491","1492","1493"],correct:2},{question:"Who was known as the 'Iron Lady'?",options:["Queen Elizabeth II","Margaret Thatcher","Angela Merkel","Golda Meir"],correct:1},{question:"The French Revolution began in which year?",options:["1787","1788","1789","1790"],correct:2},{question:"Which ancient wonder of the world still stands today?",options:["Colossus of Rhodes","Great Pyramid of Giza","Hanging Gardens","Lighthouse of Alexandria"],correct:1}],science:[{question:"What is the chemical symbol for gold?",options:["Go","Gd","Au","Ag"],correct:2},{question:"How many bones are in an adult human body?",options:["196","206","216","226"],correct:1},{question:"What is the speed of light in vacuum?",options:["299,792 km/s","199,792 km/s","399,792 km/s","499,792 km/s"],correct:0},{question:"What is the largest planet in our solar system?",options:["Saturn","Jupiter","Uranus","Neptune"],correct:1},{question:"What is the powerhouse of the cell?",options:["Nucleus","Ribosome","Mitochondria","Chloroplast"],correct:2},{question:"What is the most abundant gas in Earth's atmosphere?",options:["Oxygen","Carbon Dioxide","Nitrogen","Argon"],correct:2},{question:"How many chambers does a human heart have?",options:["2","3","4","5"],correct:2},{question:"What is the study of earthquakes called?",options:["Geology","Seismology","Volcanology","Meteorology"],correct:1},{question:"What is the smallest unit of matter?",options:["Molecule","Atom","Electron","Quark"],correct:3},{question:"At what temperature does water boil at sea level?",options:["90°C","100°C","110°C","120°C"],correct:1}],flags:[{question:"ca",flagCode:"ca",options:["USA","Canada","Norway","Denmark"],correct:1},{question:"gb",flagCode:"gb",options:["Australia","New Zealand","United Kingdom","Ireland"],correct:2},{question:"in",flagCode:"in",options:["Pakistan","India","Bangladesh","Sri Lanka"],correct:1},{question:"us",flagCode:"us",options:["Malaysia","Liberia","United States","Puerto Rico"],correct:2},{question:"vn",flagCode:"vn",options:["China","Vietnam","Morocco","Turkey"],correct:1},{question:"jp",flagCode:"jp",options:["South Korea","Japan","Bangladesh","Palau"],correct:1},{question:"ch",flagCode:"ch",options:["Denmark","Switzerland","Austria","Poland"],correct:1},{question:"br",flagCode:"br",options:["Argentina","Brazil","Colombia","Venezuela"],correct:1},{question:"de",flagCode:"de",options:["Belgium","Germany","Netherlands","Luxembourg"],correct:1},{question:"fr",flagCode:"fr",options:["Italy","France","Netherlands","Russia"],correct:1},{question:"it",flagCode:"it",options:["Mexico","Hungary","Italy","Iran"],correct:2},{question:"es",flagCode:"es",options:["Portugal","Spain","Colombia","Venezuela"],correct:1},{question:"mx",flagCode:"mx",options:["Italy","Mexico","Hungary","Iran"],correct:1},{question:"au",flagCode:"au",options:["New Zealand","United Kingdom","Australia","Fiji"],correct:2},{question:"kr",flagCode:"kr",options:["North Korea","South Korea","Japan","China"],correct:1},{question:"se",flagCode:"se",options:["Norway","Finland","Sweden","Denmark"],correct:2},{question:"no",flagCode:"no",options:["Sweden","Norway","Denmark","Iceland"],correct:1},{question:"dk",flagCode:"dk",options:["Norway","Sweden","Denmark","Finland"],correct:2},{question:"fi",flagCode:"fi",options:["Sweden","Norway","Denmark","Finland"],correct:3},{question:"nl",flagCode:"nl",options:["Luxembourg","Netherlands","France","Belgium"],correct:1},{question:"be",flagCode:"be",options:["Germany","Netherlands","Belgium","Luxembourg"],correct:2},{question:"pt",flagCode:"pt",options:["Spain","Portugal","Italy","Brazil"],correct:1},{question:"gr",flagCode:"gr",options:["Uruguay","Greece","Israel","Finland"],correct:1},{question:"pl",flagCode:"pl",options:["Monaco","Indonesia","Poland","Singapore"],correct:2},{question:"at",flagCode:"at",options:["Latvia","Austria","Poland","Indonesia"],correct:1},{question:"ie",flagCode:"ie",options:["Italy","Ireland","Ivory Coast","India"],correct:1},{question:"cz",flagCode:"cz",options:["Slovakia","Slovenia","Czech Republic","Croatia"],correct:2},{question:"ar",flagCode:"ar",options:["Uruguay","Argentina","Honduras","Guatemala"],correct:1},{question:"cl",flagCode:"cl",options:["Texas","Chile","Cuba","Puerto Rico"],correct:1},{question:"co",flagCode:"co",options:["Venezuela","Ecuador","Colombia","Bolivia"],correct:2},{question:"pe",flagCode:"pe",options:["Canada","Austria","Peru","Lebanon"],correct:2},{question:"za",flagCode:"za",options:["South Africa","Central African Republic","Sudan","Namibia"],correct:0},{question:"eg",flagCode:"eg",options:["Syria","Yemen","Egypt","Iraq"],correct:2},{question:"ma",flagCode:"ma",options:["Turkey","Tunisia","Morocco","Vietnam"],correct:2},{question:"ng",flagCode:"ng",options:["Nigeria","Niger","Cameroon","Chad"],correct:0},{question:"ke",flagCode:"ke",options:["Uganda","Kenya","Tanzania","Ethiopia"],correct:1},{question:"nz",flagCode:"nz",options:["Australia","New Zealand","Fiji","United Kingdom"],correct:1},{question:"th",flagCode:"th",options:["Costa Rica","Thailand","Netherlands","Paraguay"],correct:1},{question:"sg",flagCode:"sg",options:["Indonesia","Poland","Singapore","Monaco"],correct:2},{question:"my",flagCode:"my",options:["Malaysia","United States","Liberia","Uruguay"],correct:0}],economy:[{question:"What does GDP stand for?",options:["General Domestic Product","Gross Domestic Product","Grand Domestic Price","Gross Domestic Price"],correct:1},{question:"What is inflation?",options:["Decrease in prices","Increase in supply","General increase in prices","Increase in demand only"],correct:2},{question:"Who wrote 'The Wealth of Nations'?",options:["Karl Marx","John Keynes","Adam Smith","Milton Friedman"],correct:2},{question:"What is the study of economics on a large scale called?",options:["Microeconomics","Macroeconomics","Econometrics","Finance"],correct:1},{question:"In economics, what does the term 'opportunity cost' mean?",options:["The cost of an opportunity","The next best alternative foregone","The total cost of production","The profit margin"],correct:1},{question:"What is a bull market?",options:["Falling prices","Rising prices","Stable prices","Volatile prices"],correct:1},{question:"Which organization sets monetary policy in the US?",options:["Treasury","Congress","Federal Reserve","World Bank"],correct:2},{question:"What does IPO stand for?",options:["International Purchase Order","Initial Public Offering","Internal Price Order","Investment Portfolio Option"],correct:1},{question:"What is the invisible hand theory associated with?",options:["Communism","Free market","Socialism","Mercantilism"],correct:1},{question:"What is a recession typically defined as?",options:["1 quarter negative growth","2 quarters negative growth","3 quarters negative growth","4 quarters negative growth"],correct:1}]}};function Ra(){return`
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
    `}function en(e){const t=document.getElementById("beerPongRules"),n=document.getElementById("beerPongGame"),o=document.getElementById("beerPongTournament"),a=B.beerPongRules[e];document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.remove("btn-primary"),document.getElementById("tournamentBtn").classList.remove("btn-primary"),document.getElementById(`${e}RulesBtn`).classList.add("btn-primary"),n.style.display="none",o.style.display="none",t.style.display="block",t.innerHTML=`
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
    `,$&&e==="creator"&&$({particleCount:50,spread:60,origin:{y:.2},colors:["#00ff88","#00d4ff","#ff0088"]})}function Ke(){const e=document.getElementById("beerPongRules"),t=document.getElementById("beerPongGame"),n=document.getElementById("beerPongTournament");document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.add("btn-primary"),document.getElementById("tournamentBtn").classList.remove("btn-primary"),e.style.display="none",n.style.display="none",t.style.display="block",document.getElementById("gameModeSelection").style.display="block",document.getElementById("teamNameSetup").style.display="none",document.getElementById("normalGamePlay").style.display="none",document.getElementById("specialGamePlay").style.display="none"}function Je(){const e=document.getElementById("beerPongRules"),t=document.getElementById("beerPongGame"),n=document.getElementById("beerPongTournament");document.getElementById("standardRulesBtn").classList.remove("btn-primary"),document.getElementById("creatorRulesBtn").classList.remove("btn-primary"),document.getElementById("playGameBtn").classList.remove("btn-primary"),document.getElementById("tournamentBtn").classList.add("btn-primary"),e.style.display="none",t.style.display="none",n.style.display="block",document.getElementById("tournamentSetup").style.display="block",document.getElementById("teamNaming").style.display="none",document.getElementById("tournamentBracket").style.display="none"}function tn(e){d.tournament.totalTeams=e,d.tournament.teams=[],d.tournament.bracket=[],d.tournament.currentRound=0,document.getElementById("tournamentSetup").style.display="none",document.getElementById("teamNaming").style.display="block";const t=document.getElementById("teamInputs");t.innerHTML="";for(let n=1;n<=e;n++)t.innerHTML+=`
            <div style="margin-bottom: 15px;">
                <label style="display: inline-block; width: 100px;">Team ${n}:</label>
                <input type="text" id="team${n}Name" placeholder="Enter team name" 
                    style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                    color: white; width: 250px;" value="Team ${n}">
            </div>
        `;$&&$({particleCount:100,spread:70,origin:{y:.6},colors:["#FFD700","#FFA500","#FF6347"]})}function nn(){const e=d.tournament.totalTeams;d.tournament.teams=[];for(let t=1;t<=e;t++){const n=document.getElementById(`team${t}Name`).value.trim()||`Team ${t}`;d.tournament.teams.push({id:t,name:n,eliminated:!1})}Fa(),document.getElementById("teamNaming").style.display="none",document.getElementById("tournamentBracket").style.display="block",on()}function Fa(){const e=[...d.tournament.teams],t=[];let n=[];for(let a=0;a<e.length;a+=2)n.push({team1:e[a],team2:e[a+1],winner:null,matchId:`R1M${Math.floor(a/2)+1}`});t.push(n);let o=2;for(;n.length>1;){const a=[];for(let r=0;r<n.length;r+=2)a.push({team1:null,team2:null,winner:null,matchId:`R${o}M${Math.floor(r/2)+1}`,previousMatch1:n[r].matchId,previousMatch2:n[r+1]?n[r+1].matchId:null});t.push(a),n=a,o++}d.tournament.rounds=t}function on(){const e=document.getElementById("bracketDisplay"),t=d.tournament.rounds;let n='<div style="display: flex; gap: 50px; align-items: center; min-width: max-content;">';t.forEach((o,a)=>{const r=an(a,t.length);n+=`
            <div style="flex-shrink: 0;">
                <h4 style="text-align: center; margin-bottom: 20px; color: #00ff88;">${r}</h4>
                <div style="display: flex; flex-direction: column; gap: ${30*(a+1)}px;">
        `,o.forEach(i=>{const l=i.team1?i.team1.name:"TBD",c=i.team2?i.team2.name:"TBD",u=i.team1&&i.team2&&!i.winner;n+=`
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;
                    border: 2px solid ${i.winner?"#00ff88":"rgba(255,255,255,0.2)"};">
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                            <span style="${i.winner===i.team1?"color: #00ff88; font-weight: bold;":""}">${l}</span>
                            ${u?`<button class="btn btn-sm" onclick="selectWinner('${i.matchId}', 1)" style="padding: 5px 10px;">Win</button>`:""}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="${i.winner===i.team2?"color: #00ff88; font-weight: bold;":""}">${c}</span>
                            ${u?`<button class="btn btn-sm" onclick="selectWinner('${i.matchId}', 2)" style="padding: 5px 10px;">Win</button>`:""}
                        </div>
                    </div>
                    ${i.winner?`<div style="text-align: center; font-size: 0.9em; color: #00ff88;">Winner: ${i.winner.name}</div>`:""}
                </div>
            `}),n+="</div></div>"}),n+="</div>",e.innerHTML=n,qa()}function an(e,t){return e===t-1?"🏆 FINAL":e===t-2?"🥈 Semi-Finals":e===t-3?"🥉 Quarter-Finals":`Round ${e+1}`}function rn(e,t){const n=d.tournament.rounds;for(let o=0;o<n.length;o++){const a=n[o].find(r=>r.matchId===e);if(a){if(a.winner=t===1?a.team1:a.team2,o<n.length-1){const i=n[o+1].find(l=>l.previousMatch1===e||l.previousMatch2===e);i&&(i.previousMatch1===e?i.team1=a.winner:i.team2=a.winner)}o===n.length-1&&Wa(a.winner);break}}on()}function Wa(e){const t=document.getElementById("bracketDisplay");if(t.innerHTML=`
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">CHAMPIONS!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${e.name}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Congratulations on winning the Beer Pong Tournament!
            </p>
        </div>
    `,$){const n=["#FFD700","#FFA500","#FF6347","#00ff88","#00d4ff"];for(let o=0;o<5;o++)setTimeout(()=>{$({particleCount:150,spread:100,origin:{x:Math.random(),y:Math.random()*.5},colors:n})},o*200)}}function qa(){const e=d.tournament.rounds;let t=0;for(let o=0;o<e.length;o++)if(e[o].some(a=>a.team1&&a.team2&&!a.winner)){t=o;break}const n=an(t,e.length);document.getElementById("tournamentRoundTitle").textContent=`${n} - Beer Pong Tournament`}function sn(){d.tournament={teams:[],bracket:[],currentRound:0,totalTeams:0,rounds:[]},Je()}function ln(){d.beerPong.currentMode="normal",document.getElementById("gameModeSelection").style.display="none",document.getElementById("teamNameSetup").style.display="block"}function cn(){d.beerPong.currentMode="special",document.getElementById("gameModeSelection").style.display="none";const e=document.createElement("div");e.id="specialCategorySelection",e.innerHTML=`
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
    `;const t=document.getElementById("beerPongGame");document.getElementById("specialCategorySelection")&&document.getElementById("specialCategorySelection").remove(),t.insertBefore(e,t.firstChild)}function dn(e){d.selectedCategory=e,document.getElementById("specialCategorySelection").style.display="none",document.getElementById("teamNameSetup").style.display="block"}function un(){const e=document.getElementById("team1NameInput").value.trim()||"Team 1",t=document.getElementById("team2NameInput").value.trim()||"Team 2";d.beerPong.team1Name=e,d.beerPong.team2Name=t,document.getElementById("teamNameSetup").style.display="none",d.beerPong.currentMode==="normal"?(document.getElementById("team1Display").textContent=e,document.getElementById("team2Display").textContent=t,document.getElementById("normalGamePlay").style.display="block"):(mn(e,t),document.getElementById("specialGamePlay").style.display="block")}function mn(e,t){document.getElementById("specialTeam1Name").textContent=e,document.getElementById("specialTeam2Name").textContent=t,document.getElementById("specialTeam1Display").textContent=e,document.getElementById("specialTeam2Display").textContent=t,d.beerPong.specialCups.team1=ht("team1"),d.beerPong.specialCups.team2=ht("team2"),Re("team1"),Re("team2")}function ht(e){const t=[],n=B.specialBeerPongRules[d.selectedCategory]||B.specialBeerPongRules.classic,o=B.specialBeerPongDares[d.selectedCategory]||B.specialBeerPongDares.classic;for(let a=0;a<10;a++){const r=Math.random()>.5,i=r?n[Math.floor(Math.random()*n.length)]:o[Math.floor(Math.random()*o.length)];t.push({id:`${e}-cup-${a}`,active:!0,type:r?"rule":"dare",content:i})}return t}function Re(e){const t=d.beerPong.specialCups[e],n=document.querySelector(`#${e}Cups .cup-formation`),o=[4,3,2,1];let a=0,r="";o.forEach((i,l)=>{r+='<div style="display: flex; justify-content: center; margin-bottom: 5px;">';for(let c=0;c<i;c++){const u=t[a],p=u.active?"font-size: 2.5em; cursor: pointer; margin: 0 5px; transition: transform 0.2s;":"font-size: 2.5em; margin: 0 5px; opacity: 0.3;";r+=`
                <span id="${u.id}" 
                    style="${p}" 
                    onclick="${u.active?`hitCup('${e}', ${a})`:""}"
                    onmouseover="this.style.transform='scale(1.1)'"
                    onmouseout="this.style.transform='scale(1)'">
                    ${u.active?"🥤":"💨"}
                </span>
            `,a++}r+="</div>"}),n.innerHTML=r}function pn(e,t){const n=d.beerPong.specialCups[e][t];if(!n.active)return;n.active=!1;const o=document.getElementById("ruleDisplay");o.style.display="block",o.innerHTML=`
        <h3 style="color: ${n.type==="rule"?"#00ff88":"#ff0088"};">
            ${n.type==="rule"?"📜 NEW RULE!":"🎯 DARE TIME!"}
        </h3>
        <p style="font-size: 1.3em; margin: 20px 0;">
            ${n.content}
        </p>
        <button class="btn btn-primary" onclick="closeRuleDisplay()">
            Got it!
        </button>
    `,Re(e),d.beerPong.specialCups[e].filter(r=>r.active).length===0&&Ua(e==="team1"?d.beerPong.team2Name:d.beerPong.team1Name),$&&$({particleCount:50,spread:60,origin:{y:.6},colors:n.type==="rule"?["#00ff88","#00d4ff"]:["#ff0088","#ff4444"]})}function yn(){document.getElementById("ruleDisplay").style.display="none"}function Ua(e){if(document.getElementById("specialGamePlay").innerHTML=`
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
    `,$)for(let t=0;t<3;t++)setTimeout(()=>{$({particleCount:100,spread:70,origin:{x:Math.random(),y:Math.random()*.5}})},t*300)}function gn(){mn(d.beerPong.team1Name,d.beerPong.team2Name),document.getElementById("ruleDisplay").style.display="none"}function hn(e){let t=h().gameScores||{team1:0,team2:0};t[e]++,T("gameScores",t),fn(),t[e]>=10&&(document.getElementById("gameStatus").textContent=`${e==="team1"?"Team 1":"Team 2"} Wins! 🏆`,$&&$({particleCount:200,spread:70,origin:{y:.6}}))}function fn(){const e=h().gameScores||{team1:0,team2:0};document.getElementById("team1Score").textContent=e.team1,document.getElementById("team2Score").textContent=e.team2}function bn(){T("gameScores",{team1:0,team2:0}),fn(),document.getElementById("gameStatus").textContent="",Ke()}function Ha(){}window.gameModules=window.gameModules||{};window.gameModules["beer-pong"]={createGame:Ra,initialize:Ha};window.showBeerPongRules=en;window.showBeerPongGame=Ke;window.showBeerPongTournament=Je;window.setupTournament=tn;window.startTournament=nn;window.selectWinner=rn;window.resetTournament=sn;window.startNormalBeerPong=ln;window.startSpecialBeerPong=cn;window.selectSpecialBeerPongCategory=dn;window.startGameWithNames=un;window.hitCup=pn;window.closeRuleDisplay=yn;window.resetSpecialGame=gn;window.addScore=hn;window.resetBeerPong=bn;function ja(){return`
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
    `}function vn(){if(w.length<2){s("Add at least 2 players","error");return}re(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",ie()}function wn(){const e=B.neverHaveIEver[d.selectedCategory]||B.neverHaveIEver.classic,t=Math.floor(Math.random()*e.length);document.getElementById("gameQuestion").textContent=e[t]}function Ga(){if(G(),w.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["never-have-i-ever"]={createGame:ja,initialize:Ga};window.startNeverHaveIEver=vn;window.nextNeverHaveIEver=wn;function Oa(){return`
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
    `}function kn(){if(w.length<2){s("Add at least 2 players","error");return}re(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",z(0),Qt(),ie()}function xn(){z((O+1)%w.length),Qt(),document.getElementById("gameQuestion").textContent="Choose Truth or Dare!",document.getElementById("nextTurnBtn").style.display="none"}function En(){const e=B.truths[d.selectedCategory]||B.truths.classic,t=e[Math.floor(Math.random()*e.length)];document.getElementById("gameQuestion").textContent=t,document.getElementById("nextTurnBtn").style.display="inline-block"}function Cn(){const e=B.dares[d.selectedCategory]||B.dares.classic,t=e[Math.floor(Math.random()*e.length)];document.getElementById("gameQuestion").textContent=t,document.getElementById("nextTurnBtn").style.display="inline-block"}function za(){if(G(),w.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}z(0)}window.gameModules=window.gameModules||{};window.gameModules["truth-or-dare"]={createGame:Oa,initialize:za};window.startTruthOrDare=kn;window.nextTurnTruthOrDare=xn;window.showTruth=En;window.showDare=Cn;function _a(){return`
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
    `}function In(){if(w.length<2){s("Add at least 2 players","error");return}re(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",ie(),Qe()}function Qe(){const e=B.wouldYouRather[d.selectedCategory]||B.wouldYouRather.classic,t=e[Math.floor(Math.random()*e.length)],n=t.split(" or "),o=n[0].replace("Would you rather ",""),a=n[1]||n[0];document.getElementById("gameQuestion").textContent=t,document.getElementById("option1Btn").textContent=o,document.getElementById("option2Btn").textContent=a,document.getElementById("voteResults").style.display="none",document.getElementById("nextQuestionBtn").style.display="none",document.getElementById("option1Btn").disabled=!1,document.getElementById("option2Btn").disabled=!1}function Pn(e){document.getElementById("option1Btn").disabled=!0,document.getElementById("option2Btn").disabled=!0;const t=document.getElementById("voteResults");t.innerHTML=`
        <h3>Minority drinks! 🍺</h3>
        <p>In a real game, everyone votes and the minority drinks!</p>
    `,t.style.display="block",document.getElementById("nextQuestionBtn").style.display="inline-block"}function Va(){if(G(),w.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["would-you-rather"]={createGame:_a,initialize:Va};window.startWouldYouRather=In;window.nextWouldYouRather=Qe;window.voteWouldYouRather=Pn;function Ya(){return`
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
    `}function Bn(){if(w.length<3){s("Add at least 3 players","error");return}re(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",ie(),Ze()}function Ze(){const e=B.mostLikelyTo[d.selectedCategory]||B.mostLikelyTo.classic,t=e[Math.floor(Math.random()*e.length)];document.getElementById("gameQuestion").textContent=t;const n=document.getElementById("votingPlayers");n.innerHTML=`
        <h4>Players in the game:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            ${w.map(o=>`
                <div style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border-radius: 10px; text-align: center;">
                    ${o}
                </div>
            `).join("")}
        </div>
    `}function Dn(){s("Person with most votes drinks! 🍻","info")}function Ka(){if(G(),w.length>=3){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}}window.gameModules=window.gameModules||{};window.gameModules["most-likely-to"]={createGame:Ya,initialize:Ka};window.startMostLikelyTo=Bn;window.nextMostLikelyTo=Ze;window.showVotes=Dn;function Ja(){return`
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
    `}function Sn(){if(w.length<3){s("Add at least 3 players","error");return}re(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",z(0),ie()}function Tn(){const e=document.getElementById("bottleContainer"),t=w[O],n=w.filter((a,r)=>r!==O),o=n[Math.floor(Math.random()*n.length)];e.style.transition="transform 2s ease-out",e.style.transform=`rotate(${720+Math.random()*360}deg)`,setTimeout(()=>{document.getElementById("spinResult").innerHTML=`
            <h3>${t} → ${o}</h3>
        `;const a=B.spinBottleTasks[d.selectedCategory]||B.spinBottleTasks.classic,r=a[Math.floor(Math.random()*a.length)];document.getElementById("gameTask").textContent=r,document.getElementById("gameTask").style.display="block",z((O+1)%w.length),setTimeout(()=>{e.style.transition="none",e.style.transform="rotate(0deg)"},100)},2e3)}function Qa(){if(G(),w.length>=3){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}z(0)}window.gameModules=window.gameModules||{};window.gameModules["spin-the-bottle"]={createGame:Ja,initialize:Qa};window.startSpinBottle=Sn;window.spinBottle=Tn;function Za(){return`
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
    `}function Xa(){if(w.length<2){s("Add at least 2 players","error");return}re(),document.getElementById("playerSetup").style.display="none",document.getElementById("gamePlay").style.display="block",z(0),Mn()}function Mn(){const e=document.getElementById("currentPlayer");e&&w.length>0&&(e.textContent=`${w[O]}'s Turn`)}function $n(){const e=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],t=["♠️","♥️","♦️","♣️"],n=e[Math.floor(Math.random()*e.length)],o=t[Math.floor(Math.random()*t.length)];document.getElementById("currentCard").textContent=n+o;const a={A:"🍉 Waterfall - Everyone drinks!",2:"👉 You - Choose someone to drink",3:"👈 Me - You drink!",4:"👯 Floor - Last to touch floor drinks",5:"🙋 Guys - All guys drink",6:"💃 Chicks - All girls drink",7:"🌈 Heaven - Last to raise hand drinks",8:"🤝 Mate - Choose a drinking buddy",9:"🎵 Rhyme - Say a word, others rhyme",10:"📏 Categories - Name things in category",J:"👑 Make a Rule",Q:"❓ Questions - Ask questions only",K:"🏆 King's Cup - Pour into center cup"};document.getElementById("gameQuestion").textContent=a[n],z((O+1)%w.length),Mn()}function er(){if(G(),w.length>=2){const e=document.getElementById("startGameBtn");e&&(e.style.display="block")}z(0)}window.gameModules=window.gameModules||{};window.gameModules["kings-cup"]={createGame:Za,initialize:er};window.startKingsCup=Xa;window.drawCard=$n;function tr(){return`
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
    `}function Ln(){const e=document.getElementById("timerBtn");d.flipTimer?(clearInterval(d.flipTimer),d.flipTimer=null,e.innerHTML='<i class="fas fa-play"></i> Start Timer',(!d.bestFlipTime||d.flipTime<d.bestFlipTime)&&(d.bestFlipTime=d.flipTime,document.getElementById("bestTime").textContent=`Best Time: ${gt(d.bestFlipTime)}`,$&&$({particleCount:100,spread:70,origin:{y:.6}}))):(d.flipTime=0,d.flipTimer=setInterval(()=>{d.flipTime++,document.getElementById("flipTimer").textContent=gt(d.flipTime)},10),e.innerHTML='<i class="fas fa-pause"></i> Stop Timer')}function An(){d.flipTimer&&(clearInterval(d.flipTimer),d.flipTimer=null),d.flipTime=0,document.getElementById("flipTimer").textContent="00:00",document.getElementById("timerBtn").innerHTML='<i class="fas fa-play"></i> Start Timer'}function nr(){d.flipTimer&&(clearInterval(d.flipTimer),d.flipTimer=null),d.flipTime=0}window.gameModules=window.gameModules||{};window.gameModules["flip-cup"]={createGame:tr,initialize:nr};window.toggleFlipTimer=Ln;window.resetFlipTimer=An;function or(){return`
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
    `}function ar(e){if(d.currentCategory=e,d.currentTriviaIndex=0,e==="flags"){const n=[...B.triviaCategories.flags];for(let o=n.length-1;o>0;o--){const a=Math.floor(Math.random()*(o+1));[n[o],n[a]]=[n[a],n[o]]}d.shuffledFlags=n}document.getElementById("categorySelection").style.display="none",document.getElementById("triviaGame").style.display="block",s(`Category: ${{sports:"🏃 Sports",history:"📚 History",science:"🔬 Science",flags:"🌍 Flags",economy:"💰 Economy"}[e]}`),Xe()}function rr(){document.getElementById("categorySelection").style.display="block",document.getElementById("triviaGame").style.display="none",d.currentTriviaIndex=0}function Xe(){const e=d.currentCategory||"sports";let t;if(e==="flags"&&d.shuffledFlags?t=d.shuffledFlags:t=B.triviaCategories[e]||B.trivia,d.currentTriviaIndex>=t.length&&(d.currentTriviaIndex=0,e==="flags")){const r=[...B.triviaCategories.flags];for(let i=r.length-1;i>0;i--){const l=Math.floor(Math.random()*(i+1));[r[i],r[l]]=[r[l],r[i]]}d.shuffledFlags=r,t=d.shuffledFlags}const n=t[d.currentTriviaIndex],o=document.getElementById("gameQuestion");e==="flags"&&n.flagCode?o.innerHTML=`
            <div style="text-align: center;">
                <img src="https://flagpedia.net/data/flags/w580/${n.flagCode}.png" 
                     alt="Flag" 
                     style="width: 320px; height: auto; display: block; margin: 0 auto 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
                <div style="font-size: 1.5em; font-weight: bold; color: #00d4ff;">Which country is this?</div>
            </div>
        `:o.textContent=n.question;const a=n.options.map((r,i)=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${i}, ${n.correct})">${r}</button>`).join("");document.getElementById("triviaOptions").innerHTML=a}function Nn(e,t){const n=document.getElementById("triviaOptions").querySelectorAll("button");e===t?(d.triviaScore++,document.getElementById("triviaScore").textContent=d.triviaScore,n[e].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",s("✅ Correct! +1 point")):(n[e].style.background="linear-gradient(45deg, #ff4444, #ff0088)",n[t].style.background="linear-gradient(45deg, #00ff88, #00d4ff)",s("❌ Wrong answer!")),n.forEach(o=>o.disabled=!0),d.currentTriviaIndex++}function ir(){d.triviaScore=0,d.currentTriviaIndex=0,d.currentCategory=null;const e=document.getElementById("categorySelection"),t=document.getElementById("triviaGame");e&&(e.style.display="block"),t&&(t.style.display="none")}window.gameModules=window.gameModules||{};window.gameModules.trivia={createGame:or,initialize:ir};window.nextTrivia=Xe;window.answerTrivia=Nn;window.selectCategory=ar;window.backToCategories=rr;window.closeGame=Te;const ft={firstTimer:{name:"First Timer",icon:"🎉",description:"Joined your first party!",requirement:1,progress:0,unlocked:!1,category:"beginner"},responsible:{name:"Responsible",icon:"😇",description:"Stayed under 0.05 BAC all night",requirement:1,progress:0,unlocked:!1,category:"safety"},gameMaster:{name:"Game Master",icon:"🏆",description:"Win 5 party games",requirement:5,progress:0,unlocked:!1,category:"games"},partyAnimal:{name:"Party Animal",icon:"📍",description:"Check in at 10 parties",requirement:10,progress:0,unlocked:!1,category:"social"},guardianAngel:{name:"Guardian Angel",icon:"🦸",description:"Help 3 friends get home safe",requirement:3,progress:0,unlocked:!1,category:"safety"},hydroHomie:{name:"Hydro Homie",icon:"💧",description:"Stay hydrated for 3 hours",requirement:12,progress:0,unlocked:!1,category:"health"},danceMachine:{name:"Dance Machine",icon:"🕺",description:"Log 50 songs danced to",requirement:50,progress:0,unlocked:!1,category:"fun"},sunriseWarrior:{name:"Sunrise Warrior",icon:"🌅",description:"Party until sunrise (6+ hours)",requirement:1,progress:0,unlocked:!1,category:"endurance"},socialButterfly:{name:"Social Butterfly",icon:"🦋",description:"Add 20 friends",requirement:20,progress:0,unlocked:!1,category:"social"},safetyFirst:{name:"Safety First",icon:"🛡️",description:"Use emergency services 0 times in 10 parties",requirement:10,progress:0,unlocked:!1,category:"safety"},mixologist:{name:"Mixologist",icon:"🍸",description:"Try 15 different drink types",requirement:15,progress:0,unlocked:!1,category:"drinks"},designated:{name:"Designated Hero",icon:"🚗",description:"Be the designated driver 5 times",requirement:5,progress:0,unlocked:!1,category:"safety"}};let K={};function sr(){const e=v();if(!e)return;const t=b(),n=m(t,`users/${e.uid}/achievements`);W(n,o=>{const a=o.val()||{};Object.keys(ft).forEach(r=>{K[r]={...ft[r],...a[r]}}),T("userAchievements",K),Me()})}function lr(e){const t=v();if(!t)return;const n=b(),o=K[e];o&&D(m(n,`users/${t.uid}/achievements/${e}`),{progress:o.progress,unlocked:o.unlocked,unlockedAt:o.unlockedAt||null})}function ye(e,t=1){if(!K[e])return;const n=K[e];n.unlocked||(n.progress=Math.min(n.progress+t,n.requirement),n.progress>=n.requirement&&(n.unlocked=!0,n.unlockedAt=Date.now(),cr(n),Rn()),lr(e),Me())}function Me(){const e=document.querySelector(".achievements-grid");if(!e)return;e.innerHTML="",Object.entries(K).sort(([,n],[,o])=>n.unlocked&&!o.unlocked?-1:!n.unlocked&&o.unlocked?1:n.category.localeCompare(o.category)).forEach(([n,o])=>{const a=document.createElement("div");a.className=`achievement ${o.unlocked?"unlocked":""}`,a.setAttribute("data-achievement",n);const r=o.progress/o.requirement*100;a.innerHTML=`
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
        `,e.appendChild(a)}),Rn()}function Rn(){const e=Object.keys(K).length,t=Object.values(K).filter(o=>o.unlocked).length;document.querySelectorAll("[data-achievement-stats]").forEach(o=>{o.textContent=`${t}/${e}`})}function cr(e){typeof confetti=="function"&&confetti({particleCount:100,spread:70,origin:{y:.6}});const t=document.createElement("div");t.className="achievement-notification",t.innerHTML=`
        <div class="achievement-popup">
            <div class="achievement-popup-icon">${e.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">Achievement Unlocked!</div>
                <div class="achievement-popup-name">${e.name}</div>
                <div class="achievement-popup-description">${e.description}</div>
            </div>
        </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{t.remove()},500)},5e3)}function dr(){const e=h(),t=e.partyData||{},n=e.friendsData||{},o=e.partyStartTime;Object.values(t).every(r=>r.bac<.05)&&Date.now()-o>36e5&&ye("responsible"),Date.now()-o>216e5&&ye("sunriseWarrior"),Object.keys(n).length>=20&&ye("socialButterfly",Object.keys(n).length)}function ur(){ye("firstTimer")}async function mr(){const e=document.getElementById("partyName"),t=document.getElementById("partyPrivacy"),n=document.getElementById("partyDuration"),o=document.getElementById("partyAddress");if(!e||!e.value.trim()){s("Enter a party name","error");return}const a={privacy:t?t.value:"private",duration:n?n.value:"ongoing",address:o?o.value:""};try{const r=await Dt(e.value.trim(),a);r.success?(s(`Party created! Code: ${r.code}`,"success"),e.value="",o&&(o.value=""),window.updatePartyDisplay&&window.updatePartyDisplay()):s(r.error||"Failed to create party","error")}catch{s("Failed to create party","error")}}async function pr(){const e=document.getElementById("joinPartyCode");if(!e||!e.value.trim()){s("Enter a party code","error");return}const t=e.value.trim();try{s("Checking party...","info");const n=await He(t);if(!n){s("Invalid party code","error");return}const o=Object.keys(n.members||{}).length,a=`Join "${n.name}"?
👥 ${o} members
🔒 Privacy: ${n.privacy||"Unknown"}
📍 ${n.address||"No location set"}
⏱️ ${n.duration==="24h"?"24 hour party":"Ongoing party"}`;if(!confirm(a))return;const r=await je(t);r.success?(r.pending?s("Join request sent! Waiting for approval.","info"):r.alreadyMember?s("Rejoined party!","success"):s("Joined party!","success"),e.value="",window.updatePartyDisplay&&window.updatePartyDisplay()):s(r.error||"Failed to join party","error")}catch{s("Failed to join party","error")}}async function yr(){if(confirm("Leave this party?"))try{(await St()).success&&(s("Left party","info"),window.updatePartyDisplay&&window.updatePartyDisplay())}catch{s("Failed to leave party","error")}}async function gr(){const e=document.getElementById("partyChatInput");if(!(!e||!e.value.trim()))try{(await Mt(e.value)).success&&(e.value="")}catch{s("Failed to send message","error")}}async function hr(){const e=document.getElementById("publicPartiesList");if(e){e.innerHTML='<p style="opacity: 0.7;">Loading parties...</p>';try{const t=await Lt();if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No public parties found. Create one!</p>';return}const n=window.firebase?.auth?.currentUser,o=n&&window.isDeveloper&&window.isDeveloper(n.uid);e.innerHTML=t.map(a=>`
            <div class="friend-item" style="margin-bottom: 15px;">
                <div class="friend-info">
                    <div class="friend-avatar-small">🎉</div>
                    <div class="friend-details">
                        <h4>${a.name}</h4>
                        <p style="opacity: 0.7;">
                            👥 ${a.memberCount} members
                            ${a.address?`• 📍 ${a.address}`:""}
                            ${a.duration==="24h"?"• ⏰ 24h party":""}
                        </p>
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="joinPublicParty('${a.code}')">
                        Join
                    </button>
                    ${o?`
                        <button class="btn btn-danger" onclick="deletePartyAsDev('${a.id}')" title="Developer: Delete this party">
                            <i class="fas fa-trash"></i>
                        </button>
                    `:""}
                </div>
            </div>
        `).join("")}catch{e.innerHTML='<p style="opacity: 0.7;">Failed to load parties</p>'}}}async function fr(e){try{const t=await je(e,!0);t.success?(s("Joined public party!","success"),window.updatePartyDisplay&&window.updatePartyDisplay()):s(t.error||"Failed to join party","error")}catch{s("Failed to join party","error")}}let $e=null,te="all";function br(){v()&&(et(),Lr())}async function Fn(e){try{const t=v();if(!t)throw new Error("User not authenticated");const n=document.getElementById("uploadStatus");n&&(n.style.display="block");const o=A("deviceData")||{},a=e.deviceId;if(!o[a])throw new Error("Device not paired with this account");const r=Cr(e.imageBase64,"image/jpeg"),i=await vr(r),l=xt(),c=Date.now(),u=`photos/${t.uid}/${c}_${a}.jpg`,p=kt(l,u),g=await Qn(p,i),P=await Zn(g.ref),E=b(),C=Ie(m(E,"photos"));return await D(C,{userId:t.uid,userName:t.displayName||"Anonymous",deviceId:a,photoUrl:P,thumbnailUrl:P,bac:e.bac||null,timestamp:H(),likes:{},comments:{},partyId:A("currentPartyId")||null,location:e.location||null,retro:!0}),n&&(n.style.display="none"),s("📸 Photo uploaded successfully!","success"),window.checkAchievements&&window.checkAchievements("photo_upload"),{success:!0,photoId:C.key}}catch(t){const n=document.getElementById("uploadStatus");n&&(n.style.display="none");const o=X(t,"Photo Upload");return s(o.message,"error"),{success:!1,error:o.message}}}async function vr(e){return new Promise(t=>{const n=new Image,o=document.createElement("canvas"),a=o.getContext("2d");n.onload=()=>{o.width=n.width,o.height=n.height,a.drawImage(n,0,0);const r=a.getImageData(0,0,o.width,o.height),i=r.data;for(let p=0;p<i.length;p+=4){const g=i[p],P=i[p+1],E=i[p+2];i[p]=Math.min(255,g*.393+P*.769+E*.189),i[p+1]=Math.min(255,g*.349+P*.686+E*.168),i[p+2]=Math.min(255,g*.272+P*.534+E*.131)}const l=o.width/2,c=o.height/2,u=Math.min(l,c);for(let p=0;p<o.height;p++)for(let g=0;g<o.width;g++){const P=Math.sqrt(Math.pow(g-l,2)+Math.pow(p-c,2)),E=Math.max(0,1-P/u*.7),C=(p*o.width+g)*4;i[C]*=E,i[C+1]*=E,i[C+2]*=E}a.putImageData(r,0,0),o.toBlob(p=>{t(p)},"image/jpeg",.9)},n.src=URL.createObjectURL(e)})}function et(){const e=b(),t=v();$e&&wt(m(e,"photos"),$e),$e=W(m(e,"photos"),async n=>{const o=n.val()||{},a=A("friendsList")||[],r=A("currentPartyId"),i=[],l=a.map(c=>c.id);l.push(t.uid);for(const[c,u]of Object.entries(o))l.includes(u.userId)&&(te==="all"||te==="recent"&&Ir(u.timestamp)||te==="party"&&u.partyId===r||te==="high-bac"&&u.bac!==null&&u.bac>=.08)&&i.push({id:c,...u});i.sort((c,u)=>(u.timestamp||0)-(c.timestamp||0)),wr(i)})}function wr(e){const t=document.getElementById("photoFeed");if(t){if(e.length===0){t.innerHTML=`
            <div class="photo-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 4em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No photos to show. ${te!=="all"?"Try changing the filter!":"Connect your BoozeLens to start!"}</p>
            </div>
        `;return}t.innerHTML=e.map(n=>{const o=Pr(n.timestamp),a=Object.keys(n.likes||{}).length,r=Object.keys(n.comments||{}).length,i=n.likes&&n.likes[v().uid];return`
            <div class="photo-card" data-photo-id="${n.id}">
                <div class="photo-header">
                    <div class="photo-user">
                        <div class="user-avatar">${Br(n.userName)}</div>
                        <div class="user-info">
                            <h4>${n.userName}</h4>
                            <p>${o} ${n.bac!==null&&n.bac!==void 0?`• ${n.bac.toFixed(3)}‰`:""}</p>
                        </div>
                    </div>
                    ${n.userId===v().uid?`
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
        `}).join(""),Dr()}}async function kr(e){try{const t=v(),n=b(),o=m(n,`photos/${e}/likes/${t.uid}`);(await j(o)).exists()?await M(o):(await D(o,{timestamp:H(),userName:t.displayName||"Anonymous"}),window.checkAchievements&&window.checkAchievements("give_likes"))}catch(t){X(t,"Toggle Like")}}async function xr(e,t){try{const n=v(),o=b(),a=Ie(m(o,`photos/${e}/comments`));await D(a,{userId:n.uid,userName:n.displayName||"Anonymous",text:t,timestamp:H()}),s("💬 Comment added!","success")}catch(n){X(n,"Add Comment")}}async function Er(e){if(confirm("Delete this photo? This cannot be undone."))try{const t=b(),n=xt(),a=(await j(m(t,`photos/${e}`))).val();if(!a)throw new Error("Photo not found");if(a.photoUrl)try{const r=kt(n,a.photoUrl);await Jn(r)}catch(r){console.error("Storage deletion failed:",r)}await M(m(t,`photos/${e}`)),s("📸 Photo deleted","info")}catch(t){X(t,"Delete Photo")}}function Cr(e,t){const n=atob(e),o=[];for(let a=0;a<n.length;a+=512){const r=n.slice(a,a+512),i=new Array(r.length);for(let c=0;c<r.length;c++)i[c]=r.charCodeAt(c);const l=new Uint8Array(i);o.push(l)}return new Blob(o,{type:t})}function Ir(e){const t=Date.now()-864e5;return e>t}function Pr(e){if(!e)return"Just now";const t=Math.floor((Date.now()-e)/1e3);return t<60?"Just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}function Br(e){return e.split(" ").map(t=>t[0]).join("").toUpperCase().slice(0,2)}function Dr(){if(document.getElementById("retro-photo-styles"))return;const e=document.createElement("style");e.id="retro-photo-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}async function Wn(){et(),s("📸 Feed refreshed!","success")}function Sr(){te=document.getElementById("photoFilter").value,et()}async function Tr(e){console.log("View photo:",e)}async function Mr(e){const t=document.getElementById(`comments-${e}`);if(t)if(t.style.display==="none"){const n=b(),a=(await j(m(n,`photos/${e}/comments`))).val()||{},r=Object.entries(a).sort((i,l)=>(i[1].timestamp||0)-(l[1].timestamp||0)).map(([i,l])=>`
                <div class="comment">
                    <strong>${l.userName}:</strong> ${l.text}
                </div>
            `).join("");t.innerHTML=`
            ${r}
            <div class="comment-input">
                <input type="text" id="comment-input-${e}" placeholder="Add a comment..." 
                    onkeypress="if(event.key==='Enter') addComment('${e}', this.value)">
            </div>
        `,t.style.display="block"}else t.style.display="none"}async function $r(e){const t=`${window.location.origin}/#photo/${e}`;await navigator.clipboard.writeText(t),s("📋 Link copied!","success")}function Lr(){window.handleBoozeLensUpload=Fn}let f=null;function Ar(){window.toggleAuthMode=co,window.signOut=mo,window.updateUI=Pe,window.switchSection=Gr,window.toggleMobileMenu=Or,window.toggleMobileMore=zr,window.showNotification=s,window.showModal=Kr,window.closeModal=qn,window.searchFriends=Ft,window.sendFriendRequest=Zo,window.acceptFriendRequest=Xo,window.declineFriendRequest=ta,window.updateFriendPermission=na,window.removeFriend=oa,window.sendMessage=qt,window.handleChatEnter=aa,window.showHydrationReminder=Ht,window.checkInLocation=ia,window.callUber=sa,window.callEmergency=la,window.selectBuddy=da,window.showFirstAid=ua,window.updateProfile=ma,window.changePassword=pa,window.saveEmergencyInfo=ya,window.savePrivacySettings=ga,window.exportData=fa,window.pairDeviceFromModal=ba,window.resolvePermission=wa,window.logDrink=Ia,window.toggleChart=Ba,window.toggleTimeRange=Da,window.removeDrink=Pa,window.showEmergencyReport=Sa,window.copyEmergencyReport=_t,window.downloadEmergencyReport=Ta,window.shareEmergencyReport=Ma,window.clearDrinkHistory=$a,window.deleteAccount=ha,window.deleteMessage=ra,window.loadChatMessages=Ut,f&&(window.createParty=f.createParty,window.joinParty=f.joinParty,window.leaveParty=f.leaveParty,window.deleteParty=f.deleteParty,window.sendPartyMessage=f.sendPartyMessage,window.getPartyByCode=f.getPartyByCode,window.getNearbyParties=f.getNearbyParties,window.getFriendsParties=f.getFriendsParties,window.updatePartyDisplay=q,window.kickMember=f.kickMember,window.updatePartySettings=f.updatePartySettings,window.togglePartyLock=f.togglePartyLock,window.switchToParty=f.switchToParty,window.getUserParties=()=>f.userParties),window.createNewParty=mr,window.joinPartyByCode=pr,window.leaveCurrentParty=yr,window.sendPartyChat=gr,window.refreshPublicParties=hr,window.joinPublicParty=fr,window.isDeveloper=R,window.startGame=Na,window.closeGame=Te,window.nextNeverHaveIEver=wn,window.showTruth=En,window.showDare=Cn,window.drawCard=$n,window.addScore=hn,window.resetBeerPong=bn,window.toggleFlipTimer=Ln,window.resetFlipTimer=An,window.nextTrivia=Xe,window.answerTrivia=Nn,window.addPlayer=Yt,window.removePlayer=Kt,window.resetToPlayerSetup=Jt,window.startNeverHaveIEver=vn,window.startTruthOrDare=kn,window.nextTurnTruthOrDare=xn,window.startWouldYouRather=In,window.nextWouldYouRather=Qe,window.voteWouldYouRather=Pn,window.startMostLikelyTo=Bn,window.nextMostLikelyTo=Ze,window.showVotes=Dn,window.startSpinBottle=Sn,window.spinBottle=Tn,window.showBeerPongRules=en,window.showBeerPongGame=Ke,window.showBeerPongTournament=Je,window.setupTournament=tn,window.startTournament=nn,window.selectWinner=rn,window.resetTournament=sn,window.startNormalBeerPong=ln,window.startSpecialBeerPong=cn,window.startGameWithNames=un,window.hitCup=pn,window.closeRuleDisplay=yn,window.resetSpecialGame=gn,window.selectGameCategory=Zt,window.changeCategoryMidGame=Xt,window.selectSpecialBeerPongCategory=dn,window.getActiveLocations=Ve,window.createLocationMap=jt,window.initializeLocationMap=Gt,window.updateFriendRequests=Wt,window.updateFriendsList=ze,window.escapeHtml=Y,window.updateAchievements=Me,window.updateAchievementProgress=ye,window.checkAchievements=dr,window.pairDeviceById=Et,window.unpairDevice=Ct,window.renameDevice=It,window.refreshPhotoFeed=Wn,window.filterPhotos=Sr,window.toggleLike=kr,window.addComment=xr,window.deletePhoto=Er,window.viewPhoto=Tr,window.showComments=Mr,window.sharePhoto=$r,window.handleBoozeLensUpload=Fn,console.log("✅ All functions exposed globally including party functions")}class Nr{constructor(){this.initialized=!1,this.handlers=new Map,this.moduleReady=!1}async init(){this.initialized||(console.log("🎯 Initializing Party Event Manager"),await this.waitForModule(),this.setupEventDelegation(),this.setupFormHandlers(),this.initialized=!0,console.log("✅ Party Event Manager initialized"))}async waitForModule(){let n=0;for(;!window.Parties&&n<50;)await new Promise(o=>setTimeout(o,100)),n++;if(!window.Parties)throw new Error("Party module failed to load");this.moduleReady=!0}setupEventDelegation(){this.delegationHandler&&document.removeEventListener("click",this.delegationHandler),this.delegationHandler=async t=>{const n={"#createPartyBtn":()=>this.handleCreateParty(),"#joinPartyBtn":()=>this.handleJoinParty(),"#leavePartyBtn":()=>this.handleLeaveParty(),"#sendPartyChatBtn":()=>this.handleSendChat(),"#refreshPartiesBtn":()=>this.handleRefreshParties(),"#refreshFriendsPartiesBtn":()=>this.handleRefreshFriendsParties(),'[data-action="join-public-party"]':o=>this.handleJoinPublicParty(o.dataset.partyCode)};for(const[o,a]of Object.entries(n)){const r=t.target.closest(o);if(r){if(t.preventDefault(),t.stopPropagation(),!this.moduleReady){s("App still loading, please wait...","warning");return}try{await a(r)}catch(i){console.error("Event handler error:",i),s("An error occurred. Please try again.","error")}break}}},document.addEventListener("click",this.delegationHandler)}setupFormHandlers(){const t=document.getElementById("partyChatInput");t&&t.addEventListener("keypress",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),this.handleSendChat())});const n=document.getElementById("partyPrivacy"),o=document.getElementById("partyDuration");n&&o&&n.addEventListener("change",a=>{const r=o.querySelector('option[value="ongoing"]');r&&(a.target.value==="public"?(r.style.display="none",o.value==="ongoing"&&(o.value="24h")):r.style.display="")})}async handleCreateParty(){if(!v()){s("Please sign in to create a party","error");return}const t=document.getElementById("partyName"),n=document.getElementById("partyPrivacy"),o=document.getElementById("partyDuration"),a=document.getElementById("partyAddress");if(!t?.value.trim()){s("Please enter a party name","error");return}const r={privacy:n?.value||"private",duration:o?.value||"24h",address:a?.value||""};try{const i=await f.createParty(t.value.trim(),r);i.success?(s(`Party created! Code: ${i.code}`,"success"),t.value="",a&&(a.value=""),q()):s(i.error||"Failed to create party","error")}catch(i){console.error("Create party error:",i),s("Failed to create party","error")}}async handleJoinParty(){if(!v()){s("Please sign in to join a party","error");return}const t=document.getElementById("joinPartyCode");if(!t?.value.trim()){s("Please enter a party code","error");return}const n=t.value.trim().toUpperCase();try{s("Checking party...","info");const o=await f.getPartyByCode(n);if(!o){s("Invalid party code","error");return}const a=Object.keys(o.members||{}).length,r=`Join "${o.name}"?
👥 ${a} members
🔒 Privacy: ${o.privacy||"Unknown"}
📍 ${o.address||"No location set"}
⏱️ ${o.duration==="24h"?"24 hour party":"Ongoing party"}`;if(!confirm(r))return;const i=await f.joinParty(n);i.success?(i.pending?s("Join request sent! Waiting for approval.","info"):i.alreadyMember?s("Rejoined party!","success"):s("Joined party!","success"),t.value="",q()):s(i.error||"Failed to join party","error")}catch(o){console.error("Join party error:",o),s("Failed to join party","error")}}async handleLeaveParty(){const t=f.currentParty,n=v();if(!t)return;const o=n&&t.creatorId===n.uid;if(confirm(o?"Delete this party? This will remove all members.":"Leave this party?"))try{const r=o?await f.deleteParty():await f.leaveParty();r.success?(s(o?"Party deleted":"Left party","info"),q()):s(r.error||"Operation failed","error")}catch(r){console.error("Leave/delete party error:",r),s("Operation failed","error")}}async handleSendChat(){const t=document.getElementById("partyChatInput");if(t?.value.trim())try{(await f.sendPartyMessage(t.value.trim())).success&&(t.value="")}catch(n){console.error("Send chat error:",n),s("Failed to send message","error")}}async handleRefreshParties(){const t=document.getElementById("publicPartiesList");if(t){t.innerHTML='<p style="opacity: 0.7;">Loading parties...</p>';try{const n=await f.getNearbyParties();if(n.length===0){t.innerHTML='<p style="opacity: 0.7;">No public parties found. Create one!</p>';return}t.innerHTML=n.map(o=>`
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">🎉</div>
                        <div class="friend-details">
                            <h4>${o.name}</h4>
                            <p style="opacity: 0.7;">
                                👥 ${o.memberCount} members
                                ${o.address?`• 📍 ${o.address}`:""}
                                ${o.duration==="24h"?"• ⏰ 24h party":""}
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-primary" data-action="join-public-party" data-party-code="${o.code}">
                        Join
                    </button>
                </div>
            `).join("")}catch(n){console.error("Refresh parties error:",n),t.innerHTML='<p style="opacity: 0.7;">Failed to load parties</p>'}}}async handleRefreshFriendsParties(){const t=document.getElementById("friendsPartiesList");if(t){t.innerHTML=`<p style="opacity: 0.7;">Loading friends' parties...</p>`;try{const n=await f.getFriendsParties();if(n.length===0){t.innerHTML=`<p style="opacity: 0.7;">No friends' parties found.</p>`;return}t.innerHTML=n.map(o=>`
                <div class="friend-item" style="margin-bottom: 15px;">
                    <div class="friend-info">
                        <div class="friend-avatar-small">🎉</div>
                        <div class="friend-details">
                            <h4>${o.name}</h4>
                            <p style="opacity: 0.7;">
                                👤 by ${o.creatorName} • 
                                👥 ${o.memberCount} members
                                ${o.address?` • 📍 ${o.address}`:""}
                                ${o.duration==="24h"?" • ⏰ 24h party":""}
                            </p>
                        </div>
                    </div>
                    <button class="btn btn-primary" data-action="join-public-party" data-party-code="${o.code}">
                        Join
                    </button>
                </div>
            `).join("")}catch(n){console.error("Refresh friends parties error:",n),t.innerHTML=`<p style="opacity: 0.7;">Failed to load friends' parties</p>`}}}async handleJoinPublicParty(t){if(t)try{const n=await f.joinParty(t,!0);n.success?(s("Joined party!","success"),q(),await this.handleRefreshParties()):s(n.error||"Failed to join party","error")}catch(n){console.error("Join public party error:",n),s("Failed to join party","error")}}destroy(){this.delegationHandler&&document.removeEventListener("click",this.delegationHandler),this.handlers.clear(),this.initialized=!1}}const bt=new Nr;document.addEventListener("DOMContentLoaded",async()=>{console.log("🚀 Starting BoozeLens app initialization...");try{if(setTimeout(()=>{const a=document.getElementById("mobileLoadingScreen");a&&(a.classList.add("hide"),setTimeout(()=>{a.style.display="none"},500))},1500),!eo()){console.error("Firebase failed to initialize!"),s("❌ Failed to connect to Firebase","error");return}console.log("✅ Firebase initialized"),f=ct,window.Parties=ct,console.log("✅ Party module references set"),Ar(),console.log("✅ Global functions exposed"),await bt.init().catch(a=>{console.error("Failed to initialize party event manager:",a),s("Party features may not work properly","warning")}),console.log("✅ Party event manager initialized"),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(a=>{if(a.length>0){a.forEach(r=>{r.unregister(),console.log("Unregistered old service worker:",r.scope)}),setTimeout(()=>{window.location.reload()},1e3);return}});try{ut&&ut().catch(a=>{console.warn("Service worker registration failed:",a)}),mt&&mt(),pt&&pt()}catch(a){console.warn("PWA initialization error (non-critical):",a)}const t=document.getElementById("authForm");t&&t.addEventListener("submit",uo),po(Rr),_r(),setInterval(()=>{Vr()},500),La();const n=document.getElementById("drinkType");n&&n.addEventListener("change",function(){const a=Z[this.value];document.getElementById("drinkAmount").value=a.amount,document.getElementById("alcoholPercent").value=a.alcohol}),document.querySelectorAll(".toggle-switch input").forEach(a=>{a.addEventListener("change",function(){const r=this.closest(".toggle-switch");this.checked?r.classList.add("active"):r.classList.remove("active")})}),setInterval(()=>{new Date().getMinutes()%15===0&&Ht()},6e4),window.onclick=a=>{a.target.className==="modal show"&&qn(),a.target.className==="game-overlay show"&&Te()},window.addEventListener("beforeunload",()=>{Se(),bt.destroy()}),window.addEventListener("unhandledrejection",a=>{console.error("Unhandled promise rejection:",a.reason),a.reason&&a.reason.code&&a.reason.code.includes("auth")&&s("⚠️ Authentication issue. Try refreshing.","error")});let o=0;window.addEventListener("scroll",()=>{const a=document.querySelector("nav"),r=window.pageYOffset;a&&(r>50?a.classList.add("scrolled"):a.classList.remove("scrolled")),o=r}),console.log("✅ App initialization complete!")}catch(e){console.error("❌ App initialization failed:",e),s("Failed to initialize app","error")}});async function Rr(e){console.log("User authenticated:",e.email);try{so(),await yo(e),go(),br(),sr(),Fr(),Jr(),ur(),vt(),Pe(),await f.loadUserParties(),q(),Ut(),setInterval(vt,3600*1e3);const n=h().userData.username||e.email.split("@")[0];s(`🎉 Welcome, ${n}!`,"success"),console.log("🔑 Your Firebase UID:",e.uid),R(e.uid)?(console.log("✅ You have developer rights!"),s("🛠️ Developer mode active","info"),Fe(!0),window.addTestBACToFirebase=xa,window.removeTestBACFromFirebase=Ea,window.setupDevelopersInFirebase=ka,console.log("🔧 Developer test functions enabled: addTestBACToFirebase(), removeTestBACFromFirebase(), setupDevelopersInFirebase()")):(console.log("💡 To get developer rights, add this UID to DEVELOPER_UIDS in constants.js"),Fe(!1))}catch(t){console.error("Error during authentication:",t),s("⚠️ Error loading profile","error")}}function Fr(){const e=b(),t=v();!e||!t||(W(m(e,"users/"+t.uid+"/friends"),n=>{const o=n.val()||{};T("friendsData",o),ze(),document.getElementById("friendCount").textContent=Object.keys(o).length,Object.keys(o).forEach(a=>{qr(a)})}),W(m(e,"friendRequests/"+t.uid),n=>{const o=n.val()||{},a=Object.entries(o).map(([r,i])=>({id:r,...i}));T("friendRequests",a),Wt()}),W(m(e,".info/connected"),n=>{const o=n.val();Yr(o)}),W(m(e,"chat"),n=>{const o=document.getElementById("chatMessages");if(o&&(o.innerHTML=`
            <div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! Stay safe and have fun! 🎉</div>
            </div>
        `,n.exists())){const a=[];n.forEach(i=>{a.push({id:i.key,...i.val()})}),a.sort((i,l)=>(i.timestamp||0)-(l.timestamp||0)),a.slice(-50).forEach(i=>{const l=document.createElement("div");l.className="chat-message",l.style.position="relative";const c=i.isDeveloper?' <span style="color: #00ff88;">🛠️</span>':"",u=R(t.uid)?`<button onclick="deleteMessage('${i.id}')" style="position: absolute; right: 10px; top: 5px; background: rgba(255,68,68,0.2); border: 1px solid rgba(255,68,68,0.5); color: #ff4444; padding: 2px 8px; border-radius: 5px; cursor: pointer; font-size: 0.8em;">×</button>`:"";l.innerHTML=`
                    ${u}
                    <div class="chat-author">${i.username||"Anonymous"}${c}</div>
                    <div>${Wr(i.message||"")}</div>
                `,o.appendChild(l)}),o.scrollTop=o.scrollHeight}}))}function Wr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function qr(e){const t=b();(h().friendsData[e]?.permission||"observer")!=="none"&&W(m(t,"users/"+e),a=>{const r=a.val();r&&Ur(e,r)})}function Ur(e,t){const o=h().friendsData[e]?.permission||"observer";(o==="guardian"||o==="buddy")&&Object.keys(t.devices||{}).forEach(a=>{let r=h().partyData;r[a]||(r[a]={name:t.username,bac:0,lastUpdate:Date.now(),location:"Unknown",trend:"steady",history:[],isFriend:!0,friendId:e,permission:o},T("partyData",r)),Hr(a)})}function vt(){const e=h().partyData||{},t={};Object.entries(e).forEach(([n,o])=>{Date.now()-o.lastUpdate<1440*60*1e3&&(t[n]=o)}),T("partyData",t)}function Hr(e){const t=b();W(m(t,"readings/"+e),n=>{const o=n.val();o&&jr(e,o)})}function jr(e,t){let n=h().partyData||{};const o=h().userData;n[e]||(n[e]={name:o.username||"You",bac:0,lastUpdate:Date.now(),location:"Party",trend:"steady",history:[],isOwn:!0});const a=n[e].bac;n[e].bac=t.bac||0,n[e].lastUpdate=Date.now(),n[e].trend=t.bac>a?"up":t.bac<a?"down":"steady",n[e].history.push({time:Date.now(),value:t.bac}),n[e].history.length>50&&n[e].history.shift(),T("partyData",n),Pe(),Date.now()-t.timestamp<300*1e3&&t.bac>=.08&&s(`⚠️ Your BAC is too high: ${t.bac.toFixed(3)}‰`,"error")}function Gr(e){try{document.querySelectorAll(".section").forEach(a=>a.classList.remove("active")),document.querySelectorAll(".nav-item").forEach(a=>a.classList.remove("active"));const t=document.getElementById(e);t&&t.classList.add("active"),document.querySelectorAll(".nav-item").forEach(a=>{a.onclick&&a.onclick.toString().includes(e)&&a.classList.add("active")});const o=document.getElementById("navMenu");o&&o.classList.remove("show"),e==="achievements"?Me():e==="drinks"?(Be(),be(),fe(),De()):e==="friends"?ze():e==="photos"?Wn():e==="settings"?zt():e==="parties"&&(q(),document.querySelector('button[onclick*="refreshPublicParties"]')?.click())}catch(t){console.error("Section switch failed:",t)}}function Or(){const e=document.getElementById("navMenu");e&&e.classList.toggle("show")}function zr(){const e=document.getElementById("mobileMoreMenu"),t=document.getElementById("mobileMoreBackdrop");e&&t&&(e.classList.contains("active")?(e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow=""):(e.classList.add("active"),t.classList.add("active"),document.body.style.overflow="hidden"))}function _r(){try{const e=document.getElementById("particles");if(!e)return;for(let t=0;t<50;t++){const n=document.createElement("div");n.className="particle",n.style.left=Math.random()*100+"%",n.style.animationDelay=Math.random()*20+"s",n.style.animationDuration=15+Math.random()*10+"s",e.appendChild(n)}}catch(e){console.error("Particle creation failed:",e)}}function Vr(){const e=document.getElementById("visualizer");if(!(!e||!document.getElementById("dashboard").classList.contains("active"))){if(e.children.length===0)for(let t=0;t<20;t++){const n=document.createElement("div");n.className="bar",e.appendChild(n)}e.querySelectorAll(".bar").forEach(t=>{const n=Math.random()*150+20;t.style.height=n+"px"})}}function Yr(e){const t=document.getElementById("connectionStatus"),n=document.querySelector(".status-dot");t&&n&&(e?(t.textContent="Connected",n.style.background="#00ff88"):(t.textContent="Offline",n.style.background="#ff4444"))}async function Kr(e,t=null){const n=document.getElementById("modal"),o=document.getElementById("modalBody");let a="";switch(e){case"pair-device":const r=h().deviceData||{};a=`
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
                            ${Object.entries(r).map(([g,P])=>{const C=(h().partyData||{})[g];return`
                                    <div class="device-item" style="padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 10px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
                                            <div style="flex: 1;">
                                                <h4 style="margin: 0 0 5px 0;">${P.name||"My Breathalyzer"}</h4>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">ID: ${g}</p>
                                                <p style="margin: 0; opacity: 0.7; font-size: 0.9em;">Last Reading: ${C?C.bac.toFixed(3)+"‰":"No data"}</p>
                                            </div>
                                            <div style="display: flex; gap: 8px;">
                                                <button class="btn" onclick="renameDevice('${g}')" title="Rename">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-danger" onclick="unpairDevice('${g}')" title="Unpair">
                                                    <i class="fas fa-unlink"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `}).join("")}
                        </div>
                    </div>
                `:""}
            `;break;case"checkin":const l=f.currentParty;a=`
                <h2>📍 Check In</h2>
                <p>Select your current location:</p>
                <div class="location-map" id="locationMap">
                    <!-- Simulated map -->
                </div>
                <div style="margin: 20px 0;">
                    ${l?`
                        <button class="btn btn-primary" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('Party: ${l.name}')">
                            <i class="fas fa-champagne-glasses"></i> ${l.name}
                        </button>
                    `:""}
                    ${["Dorm A - Room Party","Student Bar","Library Cafe","Sports Center","Main Campus","Off Campus"].map(g=>`<button class="btn" style="width: 100%; margin: 10px 0;" onclick="checkInLocation('${g}')">${g}</button>`).join("")}
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
            `;break;case"buddy-system":const c=h().partyData;a=`
                <h2>👥 Buddy System</h2>
                <p>Choose your buddy for tonight:</p>
                <div class="buddy-list">
                    ${Object.values(c).map(g=>`
                        <div class="buddy-card" onclick="selectBuddy('${g.name}')">
                            <div style="font-size: 2em; margin-bottom: 10px;">${g.isOwn?"👤":"👥"}</div>
                            <div>${g.name}</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"safe-friends":const u=h().partyData,p=Object.values(u).filter(g=>g.bac<.02);a=`
                <h2>✅ Friends Safe to Drive</h2>
                <div style="margin: 20px 0;">
                    ${p.length>0?p.map(g=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div>${g.name}</div>
                            <div>BAC: ${g.bac.toFixed(3)}‰</div>
                        </div>
                    `).join(""):"<p>No friends are currently safe to drive.</p>"}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break;case"locations":a=`
                <h2>📍 Active Party Locations</h2>
                <div class="location-map" style="height: 400px;">
                    ${jt()}
                </div>
                <div style="margin: 20px 0;">
                    ${Ve().map(g=>`
                        <div class="buddy-card" style="margin: 10px 0;">
                            <div><strong>${g.name}</strong></div>
                            <div>${g.count} people</div>
                            <div>Avg BAC: ${g.avgBac.toFixed(3)}‰</div>
                        </div>
                    `).join("")}
                </div>
                <button class="btn" onclick="closeModal()">Close</button>
            `;break}o.innerHTML=a,n.classList.add("show"),(e==="checkin"||e==="locations")&&setTimeout(Gt,100)}function qn(){document.getElementById("modal").classList.remove("show")}function Jr(){const e=h().userData;if(e.settings){const t=e.settings;t.shareLocation!==void 0&&(document.getElementById("shareLocation").checked=t.shareLocation),t.notifications!==void 0&&(document.getElementById("notifications").checked=t.notifications),t.publicProfile!==void 0&&(document.getElementById("publicProfile").checked=t.publicProfile)}if(e.emergency){const t=e.emergency;t.homeAddress&&(document.getElementById("homeAddress").value=t.homeAddress,localStorage.setItem("homeAddress",t.homeAddress)),t.emergencyContact&&(document.getElementById("emergencyContact").value=t.emergencyContact,localStorage.setItem("emergencyContact",t.emergencyContact)),t.medicalInfo&&(document.getElementById("medicalInfo").value=t.medicalInfo,localStorage.setItem("medicalInfo",t.medicalInfo)),t.safetyNotes&&(document.getElementById("safetyNotes").value=t.safetyNotes,localStorage.setItem("safetyNotes",t.safetyNotes))}zt()}function q(){Uo(f)}function Qr(e){const t=document.getElementById("partyChat");t&&(t.innerHTML=e.map(n=>`
        <div style="margin-bottom: 10px;">
            <strong style="color: #00ff88;">${n.userName}:</strong>
            <span>${n.message}</span>
            <span style="opacity: 0.5; font-size: 0.8em; margin-left: 10px;">
                ${new Date(n.timestamp).toLocaleTimeString()}
            </span>
        </div>
    `).join(""),t.scrollTop=t.scrollHeight)}async function Zr(){const e=document.getElementById("partyLeaderboard");if(!e||!f||!f.currentParty)return;e.innerHTML='<p style="opacity: 0.7;">Loading leaderboard...</p>';const t=await f.getPartyLeaderboard();if(t.length===0){e.innerHTML='<p style="opacity: 0.7;">No BAC data yet</p>';return}e.innerHTML=t.map((n,o)=>{const a=o+1;let r="";return a===1?r="🥇":a===2?r="🥈":a===3&&(r="🥉"),`
            <div class="friend-item" style="margin-bottom: 10px;">
                <div class="friend-info">
                    <div style="font-size: 2em; margin-right: 15px;">${r||a}</div>
                    <div class="friend-avatar-small">${n.role==="creator"?"👑":"👤"}</div>
                    <div class="friend-details">
                        <h4>${n.name}</h4>
                        <p style="opacity: 0.7;">BAC: ${n.bac.toFixed(3)}‰</p>
                    </div>
                </div>
            </div>
        `}).join("")}async function Xr(e,t){const n=await f.handleJoinRequest(e,t);n.success?(s(t?"Request approved!":"Request declined","success"),q()):s(n.error||"Failed to handle request","error")}async function ei(e,t){const n=`Kick ${t} from the party?`;if(!confirm(n))return;const o=prompt("Reason for kick (optional):")||"",a=await f.kickMember(e,o);a.success?(s(`${t} has been removed from the party`,"info"),q()):s(a.error||"Failed to kick member","error")}async function ti(){if(!f.currentParty)return;const e=f.currentParty.locked;if(!confirm(e?"Unlock the party? New members will be able to join.":"Lock the party? No new members will be able to join."))return;const n=await f.togglePartyLock(!e);n.success?(s(n.locked?"Party locked":"Party unlocked","info"),q()):s(n.error||"Failed to update party lock","error")}function ni(){const e=f.currentParty;if(!e)return;const t=prompt("Party name:",e.name);t&&t!==e.name&&f.updatePartySettings({name:t}).then(n=>{n.success?(s("Party name updated","success"),q()):s(n.error||"Failed to update","error")})}function Fe(e){const t=document.getElementById("chatInput"),n=document.querySelector(".chat-input button");t&&n&&(e?(t.placeholder="Type a message... (Dev mode 🛠️)",t.disabled=!1,n.disabled=!1,t.style.opacity="1",n.style.opacity="1"):(t.placeholder="Chat is read-only (Developers only)",t.disabled=!0,n.disabled=!0,t.style.opacity="0.5",n.style.opacity="0.5"))}async function oi(e){const t=v();if(!t||!R(t.uid)){s("Not authorized","error");return}const n=b();if(n)try{await M(m(n,`chat/${e}`)),s("Message deleted","info")}catch(o){console.error("Delete message error:",o),s("Failed to delete message","error")}}window.updatePartyDisplay=q;window.updatePartyChat=Qr;window.updatePartyLeaderboard=Zr;window.handlePartyRequest=Xr;window.kickMemberFromParty=ei;window.updateChatUIForDeveloper=Fe;window.deleteMessage=oi;async function ai(e){const t=v();if(!t||!R(t.uid)){s("Not authorized","error");return}if(confirm("Developer action: Delete this party permanently?"))try{const n=await f.deleteParty(e);n.success?(s("Party deleted","success"),window.refreshPublicParties&&window.refreshPublicParties()):s(n.error||"Failed to delete party","error")}catch{s("Failed to delete party","error")}}window.deletePartyAsDev=ai;window.switchToParty=e=>{f&&f.switchToParty&&f.switchToParty(e)};window.togglePartyLockUI=ti;window.editPartySettings=ni;
//# sourceMappingURL=index-DhXC8RQ1.js.map
