// ========================================
// ALL ORIGINAL FUNCTIONS FROM safe.html
// ========================================
// This file contains ALL the functions from your original app
// They're organized by category but maintain their original functionality

import { getFirebaseDatabase, getFirebaseAuth } from '../config/firebase.js';
import { getAppState, setStateValue, getCurrentUser } from '../config/app-state.js';
import { DRINK_PRESETS, getBACStatus } from '../config/constants.js';
import { showNotification } from '../ui/notifications.js';
import { ref, set, get, push, remove, onValue, off, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// ========================================
// FRIENDS SYSTEM FUNCTIONS
// ========================================
export async function searchFriends() {
    const searchTerm = document.getElementById('friendSearchInput').value.trim().toLowerCase();
    
    if (!searchTerm || searchTerm.length < 3) {
        showNotification('❌ Please enter at least 3 characters', 'error');
        return;
    }
    
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '<p>Searching...</p>';
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const friendsData = getAppState().friendsData || {};
        const results = [];
        
        // 1. Search through existing friends first (you can read their data)
        const friendPromises = Object.keys(friendsData).map(async (friendUid) => {
            try {
                const friendSnapshot = await get(ref(database, 'users/' + friendUid));
                const friendData = friendSnapshot.val();
                if (friendData && 
                    (friendData.username?.toLowerCase().includes(searchTerm) || 
                     friendData.email?.toLowerCase().includes(searchTerm))) {
                    return { uid: friendUid, ...friendData, isExistingFriend: true };
                }
            } catch (e) {
                console.log('Could not read friend data for:', friendUid);
            }
            return null;
        });
        
        // 2. Search through public usernames for new people to add
        let usernamesSnapshot;
        try {
            usernamesSnapshot = await get(ref(database, 'usernames'));
        } catch (e) {
            console.log('Could not read usernames collection');
            usernamesSnapshot = { val: () => ({}) };
        }
        
        const usernames = usernamesSnapshot.val() || {};
        const newUserPromises = Object.entries(usernames)
            .filter(([username, uid]) => 
                uid !== currentUser.uid && 
                !friendsData[uid] && 
                username.includes(searchTerm)
            )
            .map(async ([username, uid]) => {
                try {
                    const userSnapshot = await get(ref(database, 'users/' + uid));
                    const userData = userSnapshot.val();
                    if (userData && userData.settings?.publicProfile !== false) {
                        return { uid, username, ...userData, isExistingFriend: false };
                    }
                } catch (e) {
                    // Can't read full user data, but we can still show them with basic info
                    console.log('Could not read user data for:', uid, '- showing basic info only');
                    return { 
                        uid, 
                        username, 
                        email: 'User', // Placeholder since we can't read their email
                        isExistingFriend: false
                    };
                }
                return null;
            });
        
        // Wait for all searches to complete
        const [friendResults, newUserResults] = await Promise.all([
            Promise.all(friendPromises),
            Promise.all(newUserPromises)
        ]);
        
        // Combine results
        friendResults.forEach(result => result && results.push(result));
        newUserResults.forEach(result => result && results.push(result));
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">No users found</p>';
        } else {
            // Create template for friend search results
            const template = document.createElement('template');
            template.innerHTML = `
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
            `;
            
            // Clear and add header
            resultsDiv.innerHTML = '<h4>Search Results:</h4>';
            
            // Create each result safely
            results.forEach(user => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('[data-avatar]').textContent = (user.username || user.email || 'U').charAt(0).toUpperCase();
                clone.querySelector('[data-username]').textContent = user.username || 'User';
                clone.querySelector('[data-email]').textContent = user.email || 'Phone user';
                
                const actionsDiv = clone.querySelector('[data-actions]');
                if (user.isExistingFriend) {
                    actionsDiv.innerHTML = '<span style="color: #00ff88;">✓ Friends</span>';
                } else {
                    const addBtn = clone.querySelector('[data-add-btn]');
                    addBtn.onclick = () => sendFriendRequest(user.uid);
                }
                
                resultsDiv.appendChild(clone);
            });
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsDiv.innerHTML = '<p style="color: #ff4444;">Search failed. Try again.</p>';
    }
}

export async function sendFriendRequest(friendId) {
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        const friendsData = getAppState().friendsData;
        
        if (friendsData[friendId]) {
            showNotification('ℹ️ Already friends');
            return;
        }
        
        await set(ref(database, 'friendRequests/' + friendId + '/' + currentUser.uid), {
            from: userData.username || currentUser.email,
            timestamp: serverTimestamp()
        });
        
        showNotification('📤 Friend request sent!', 'success');
        searchFriends();
        
    } catch (error) {
        console.error('Friend request error:', error);
        showNotification('❌ Failed to send request', 'error');
    }
}

export function updateFriendRequests() {
    const container = document.getElementById('friendRequests');
    const friendRequests = getAppState().friendRequests || [];
    
    if (friendRequests.length === 0) {
        container.innerHTML = '<p style="opacity: 0.7;">No pending requests</p>';
        return;
    }
    
    container.innerHTML = friendRequests.map(request => `
        <div class="friend-request">
            <div>
                <strong>${request.from}</strong>
                <small style="opacity: 0.7; margin-left: 10px;">
                    ${getTimeSince(request.timestamp)}
                </small>
            </div>
            <div>
                <button class="btn" onclick="acceptFriendRequest('${request.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="btn btn-danger" onclick="declineFriendRequest('${request.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
}

export async function acceptFriendRequest(friendId) {
    try {
        const permission = await selectFriendPermission();
        if (!permission) return;
        
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        await set(ref(database, 'users/' + currentUser.uid + '/friends/' + friendId), {
            permission: permission,
            addedAt: serverTimestamp()
        });
        
        await set(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid), {
            permission: permission,
            addedAt: serverTimestamp()
        });
        
        await remove(ref(database, 'friendRequests/' + currentUser.uid + '/' + friendId));
        
        showNotification('✅ Friend added!', 'success');
        
    } catch (error) {
        console.error('Accept friend error:', error);
        showNotification('❌ Failed to accept request', 'error');
    }
}

export async function selectFriendPermission() {
    return new Promise((resolve) => {
        const modalContent = `
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
        `;
        
        document.getElementById('modalBody').innerHTML = modalContent;
        document.getElementById('modal').classList.add('show');
        
        window.resolvePermission = (permission) => {
            window.closeModal();
            resolve(permission);
        };
    });
}

export async function declineFriendRequest(friendId) {
    const database = getFirebaseDatabase();
    const currentUser = getCurrentUser();
    await remove(ref(database, 'friendRequests/' + currentUser.uid + '/' + friendId));
    showNotification('❌ Request declined');
}

export function updateFriendsList() {
    const friendsList = document.getElementById('friendsList');
    if (!friendsList) return;
    
    const friendsData = getAppState().friendsData || {};
    friendsList.innerHTML = '';
    
    if (Object.keys(friendsData).length === 0) {
        friendsList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No friends added yet</p>';
        return;
    }
    
    Object.entries(friendsData).forEach(async ([friendId, friend]) => {
        const database = getFirebaseDatabase();
        const friendSnapshot = await get(ref(database, 'users/' + friendId));
        const friendInfo = friendSnapshot.val();
        
        if (friendInfo) {
            // Create template for friend item
            const template = document.createElement('template');
            template.innerHTML = `
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
            `;
            
            const clone = template.content.cloneNode(true);
            clone.querySelector('[data-avatar]').textContent = (friendInfo.username || friendInfo.email || 'U').charAt(0).toUpperCase();
            clone.querySelector('[data-username]').textContent = friendInfo.username || 'Friend';
            clone.querySelector('[data-email]').textContent = friendInfo.email || 'Phone user';
            
            const permissionSelect = clone.querySelector('[data-permission]');
            permissionSelect.value = friend.permission || 'observer';
            permissionSelect.onchange = (e) => updateFriendPermission(friendId, e.target.value);
            
            const removeBtn = clone.querySelector('[data-remove-btn]');
            removeBtn.onclick = () => removeFriend(friendId);
            
            const friendDiv = clone.querySelector('.friend-item');
            friendsList.appendChild(friendDiv);
        }
    });
}

export async function updateFriendPermission(friendId, newPermission) {
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        // Only update the current user's friend role - each user manages their own friend roles
        await set(ref(database, 'users/' + currentUser.uid + '/friends/' + friendId + '/permission'), newPermission);
        showNotification('✅ Permission updated', 'success');
    } catch (error) {
        console.error('Update permission error:', error);
        showNotification('❌ Failed to update permission', 'error');
    }
}

export async function removeFriend(friendId) {
    if (confirm('Remove this friend?')) {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        await remove(ref(database, 'users/' + currentUser.uid + '/friends/' + friendId));
        await remove(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid));
        showNotification('👋 Friend removed');
    }
}

// ========================================
// CHAT FUNCTIONS
// ========================================
export async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    try {
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        
        // Check if user is developer
        const { isDeveloper } = await import('../config/constants.js');
        if (!isDeveloper(currentUser.uid)) {
            showNotification('❌ Only developers can send messages in the main chat', 'error');
            input.value = '';
            return;
        }
        
        // Save to Firebase
        const database = getFirebaseDatabase();
        await push(ref(database, 'chat'), {
            text: message,
            author: userData.username || currentUser.email,
            authorId: currentUser.uid,
            timestamp: serverTimestamp()
        });
        
        input.value = '';
        
    } catch (error) {
        console.error('Send message error:', error);
        showNotification('❌ Failed to send message', 'error');
    }
}

export function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

export async function deleteMessage(messageId) {
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        const { isDeveloper } = await import('../config/constants.js');
        if (!isDeveloper(currentUser.uid)) {
            showNotification('❌ Only developers can delete messages', 'error');
            return;
        }
        
        await remove(ref(database, `chat/${messageId}`));
    } catch (error) {
        console.error('Delete message error:', error);
        showNotification('❌ Failed to delete message', 'error');
    }
}

export function loadChatMessages() {
    const database = getFirebaseDatabase();
    const chatRef = ref(database, 'chat');
    
    onValue(chatRef, async (snapshot) => {
        const messages = snapshot.val() || {};
        const chatContainer = document.getElementById('chatMessages');
        if (!chatContainer) return;
        
        const currentUser = getCurrentUser();
        const { isDeveloper } = await import('../config/constants.js');
        const hasDevRights = currentUser ? isDeveloper(currentUser.uid) : false;
        
        const messageArray = Object.entries(messages)
            .map(([id, msg]) => ({ id, ...msg }))
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        
        chatContainer.innerHTML = messageArray.length === 0 ? 
            `<div class="chat-message">
                <div class="chat-author">System</div>
                <div>Welcome to BoozeLens Chat! 🎉</div>
            </div>` : '';
        
        messageArray.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message';
            messageDiv.innerHTML = `
                <div class="chat-author">${escapeHtml(msg.author || 'Unknown')}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">${escapeHtml(msg.text || '')}</div>
                    ${hasDevRights ? 
                        `<button class="btn btn-danger btn-sm" onclick="deleteMessage('${msg.id}')" style="margin-left: 10px; padding: 2px 8px; font-size: 0.8em;">
                            <i class="fas fa-trash"></i>
                        </button>` : ''
                    }
                </div>
            `;
            chatContainer.appendChild(messageDiv);
        });
        
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
}

// ========================================
// HYDRATION & ACHIEVEMENTS
// ========================================
export function showHydrationReminder() {
    showNotification('💧 Time for a water break! Stay hydrated!');
    if (window.confetti) {
        confetti({
            particleCount: 50,
            spread: 60,
            colors: ['#00d4ff', '#0099ff', '#0066ff'],
            origin: { y: 0.6 }
        });
    }
    
    const hydrationCount = parseInt(localStorage.getItem('hydrationCount') || '0') + 1;
    localStorage.setItem('hydrationCount', hydrationCount);
    
    if (hydrationCount >= 12) {
        const achievements = getAppState().achievements;
        achievements.hydroHomie = true;
        showAchievementUnlocked('Hydro Homie');
    }
}

export function updateAchievements() {
    const achievements = getAppState().achievements;
    const achievementElements = document.querySelectorAll('.achievement');
    
    Object.entries(achievements).forEach(([key, unlocked]) => {
        if (unlocked) {
            const element = document.querySelector(`.achievement[data-achievement="${key}"]`);
            if (element && !element.classList.contains('unlocked')) {
                element.classList.add('unlocked');
            }
        }
    });
}

export function showAchievementUnlocked(name) {
    if (!localStorage.getItem(`achievement_${name}`)) {
        localStorage.setItem(`achievement_${name}`, 'true');
        
        if (window.confetti) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        
        showNotification(`🏆 Achievement Unlocked: ${name}!`);
    }
}

// ========================================
// LOCATION FUNCTIONS
// ========================================
export function checkInLocation(location) {
    const locationHistory = getAppState().locationHistory;
    const userData = getAppState().userData;
    
    locationHistory.push({
        location: location,
        time: Date.now(),
        user: userData.username
    });
    
    showNotification(`📍 Checked in at ${location}!`);
    
    if (locationHistory.length >= 10) {
        const achievements = getAppState().achievements;
        achievements.partyAnimal = true;
        showAchievementUnlocked('Party Animal');
    }
    
    window.closeModal();
}

export function createLocationMap() {
    const locations = getActiveLocations();
    let mapHtml = '<div style="position: relative; width: 100%; height: 100%; background: rgba(255,255,255,0.05); border-radius: 20px;">';
    
    locations.forEach((loc, index) => {
        const x = 20 + (index % 3) * 30;
        const y = 20 + Math.floor(index / 3) * 30;
        mapHtml += `
            <div class="location-dot" style="left: ${x}%; top: ${y}%;" title="${loc.name}: ${loc.count} people">
                <span style="position: absolute; top: -20px; left: -20px; font-size: 0.8em; white-space: nowrap;">${loc.name}</span>
            </div>
        `;
    });
    
    mapHtml += '</div>';
    return mapHtml;
}

export function initializeLocationMap() {
    const dots = document.querySelectorAll('.location-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const location = this.getAttribute('title');
            showNotification(`📍 ${location}`);
        });
    });
}

export function getActiveLocations() {
    const partyData = getAppState().partyData || {};
    const locationCounts = {};
    
    Object.values(partyData).forEach(friend => {
        if (!locationCounts[friend.location]) {
            locationCounts[friend.location] = { count: 0, totalBac: 0 };
        }
        locationCounts[friend.location].count++;
        locationCounts[friend.location].totalBac += friend.bac;
    });
    
    return Object.entries(locationCounts).map(([name, data]) => ({
        name,
        count: data.count,
        avgBac: data.totalBac / data.count
    }));
}

// ========================================
// UBER & EMERGENCY FUNCTIONS
// ========================================
export function callUber() {
    const address = localStorage.getItem('homeAddress');
    
    if (address) {
        const encodedAddress = encodeURIComponent(address);
        showNotification('🚕 Opening Uber with your home address...');
        
        navigator.clipboard.writeText(address)
            .then(() => showNotification('📋 Home address copied to clipboard!'))
            .catch(() => {});
        
        window.open(`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodedAddress}`, '_blank');
    } else {
        showNotification('🚕 Opening Uber app...');
        window.open('https://m.uber.com/ul/', '_blank');
    }
}

export function callEmergency(type) {
    switch(type) {
        case 'ambulance':
            if (confirm('Call emergency services (112)?')) {
                window.location.href = 'tel:112';
            }
            break;
        case 'police':
            if (confirm('Call Swiss Police (117)?')) {
                window.location.href = 'tel:117';
            }
            break;
        case 'taxi':
            showNotification('🚕 Opening taxi options...');
            setTimeout(() => {
                showTaxiOptions();
            }, 500);
            break;
    }
}

export function showTaxiOptions() {
    const address = localStorage.getItem('homeAddress') || '';
    const options = `
        <h2>🚕 Ride Options</h2>
        ${address ? `<div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;">
            <p><strong>Your Home Address:</strong></p>
            <p>${escapeHtml(address)}</p>
            <button class="btn" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${escapeHtml(address)}').then(() => showNotification('📋 Address copied!'))">
                <i class="fas fa-copy"></i> Copy Address
            </button>
        </div>` : ''}
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
    `;
    
    document.getElementById('modalBody').innerHTML = options;
    document.getElementById('modal').classList.add('show');
}

export function callSoberFriend() {
    const partyData = getAppState().partyData || {};
    const soberFriends = Object.values(partyData).filter(f => f.bac < 0.02);
    if (soberFriends.length > 0) {
        const friend = soberFriends[0];
        showNotification(`📞 Calling ${friend.name}...`);
    } else {
        showNotification('❌ No sober friends available right now');
    }
}

export function selectBuddy(buddyName) {
    localStorage.setItem('buddy', buddyName);
    showNotification(`👥 ${buddyName} is now your buddy!`);
    
    const achievements = getAppState().achievements;
    achievements.guardianAngel = true;
    showAchievementUnlocked('Guardian Angel');
    
    window.closeModal();
}

export function showFirstAid() {
    window.showModal('first-aid');
}

// ========================================
// SETTINGS & PROFILE FUNCTIONS
// ========================================
export async function updateProfile() {
    const username = document.getElementById('username').value.trim();
    
    if (!username || username.length < 3) {
        showNotification('❌ Username must be at least 3 characters', 'error');
        return;
    }
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        
        if (username.toLowerCase() !== userData.username?.toLowerCase()) {
            const usernameCheck = await get(ref(database, 'usernames/' + username.toLowerCase()));
            if (usernameCheck.exists() && usernameCheck.val() !== currentUser.uid) {
                showNotification('❌ Username already taken', 'error');
                return;
            }
            
            if (userData.username) {
                await remove(ref(database, 'usernames/' + userData.username.toLowerCase()));
            }
            
            await set(ref(database, 'usernames/' + username.toLowerCase()), currentUser.uid);
        }
        
        await set(ref(database, 'users/' + currentUser.uid + '/username'), username);
        
        showNotification('✅ Profile updated!', 'success');
        
        userData.username = username;
        document.getElementById('profileName').textContent = username;
        document.querySelectorAll('.settings-username-display').forEach(el => el.textContent = username);
        document.getElementById('profileInitial').textContent = username.charAt(0).toUpperCase();
        
    } catch (error) {
        console.error('Update profile error:', error);
        showNotification('❌ Failed to update profile', 'error');
    }
}

export async function changePassword() {
    const newPassword = prompt('Enter new password (min 6 characters):');
    if (newPassword && newPassword.length >= 6) {
        try {
            const currentUser = getCurrentUser();
            await currentUser.updatePassword(newPassword);
            showNotification('✅ Password changed successfully', 'success');
        } catch (error) {
            console.error('Password change error:', error);
            if (error.code === 'auth/requires-recent-login') {
                showNotification('❌ Please sign out and sign in again before changing password', 'error');
            } else {
                showNotification('❌ Failed to change password', 'error');
            }
        }
    }
}

export async function saveEmergencyInfo() {
    const homeAddress = document.getElementById('homeAddress').value;
    const emergencyContact = document.getElementById('emergencyContact').value;
    const medicalInfo = document.getElementById('medicalInfo').value;
    const safetyNotes = document.getElementById('safetyNotes').value;
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        await set(ref(database, 'users/' + currentUser.uid + '/emergency'), {
            homeAddress,
            emergencyContact,
            medicalInfo,
            safetyNotes,
            updatedAt: serverTimestamp()
        });
        
        localStorage.setItem('homeAddress', homeAddress);
        localStorage.setItem('emergencyContact', emergencyContact);
        localStorage.setItem('medicalInfo', medicalInfo);
        localStorage.setItem('safetyNotes', safetyNotes);
        
        showNotification('✅ Emergency information saved', 'success');
        showSettingsSaved();
    } catch (error) {
        console.error('Save emergency info error:', error);
        showNotification('❌ Failed to save emergency info', 'error');
    }
}

export async function savePrivacySettings() {
    const shareLocation = document.getElementById('shareLocation').checked;
    const notifications = document.getElementById('notifications').checked;
    const publicProfile = document.getElementById('publicProfile').checked;
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        
        await set(ref(database, 'users/' + currentUser.uid + '/settings'), {
            shareLocation,
            notifications,
            publicProfile
        });
        
        localStorage.setItem('shareLocation', shareLocation);
        localStorage.setItem('notifications', notifications);
        
        showNotification('✅ Privacy settings saved', 'success');
        showSettingsSaved();
    } catch (error) {
        console.error('Save privacy settings error:', error);
        showNotification('❌ Failed to save settings', 'error');
    }
}

export function showSettingsSaved() {
    const savedIcon = document.createElement('div');
    savedIcon.className = 'settings-saved';
    savedIcon.innerHTML = '✅';
    document.body.appendChild(savedIcon);
    
    setTimeout(() => savedIcon.remove(), 1000);
}

export function updateToggleSwitches() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        const input = toggle.querySelector('input');
        if (input && input.checked) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    });
}

export async function deleteAccount() {
    if (!confirm('Delete your account? This cannot be undone!')) return;
    if (!confirm('Are you absolutely sure? All your data will be permanently deleted.')) return;
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const userData = getAppState().userData;
        const friendsData = getAppState().friendsData;
        
        await remove(ref(database, 'users/' + currentUser.uid));
        
        if (userData.username) {
            await remove(ref(database, 'usernames/' + userData.username.toLowerCase()));
        }
        
        if (friendsData) {
            for (const friendId in friendsData) {
                await remove(ref(database, 'users/' + friendId + '/friends/' + currentUser.uid));
            }
        }
        
        await currentUser.delete();
        
        showNotification('Account deleted. Goodbye!');
        location.reload();
    } catch (error) {
        console.error('Delete account error:', error);
        if (error.code === 'auth/requires-recent-login') {
            showNotification('❌ Please sign out and sign in again before deleting account', 'error');
        } else {
            showNotification('❌ Failed to delete account', 'error');
        }
    }
}

// ========================================
// DATA EXPORT
// ========================================
export function exportData() {
    const currentUser = getCurrentUser();
    const appState = getAppState();
    
    const data = {
        user: {
            email: currentUser?.email,
            username: appState.userData.username
        },
        settings: appState.userData.settings,
        emergency: appState.userData.emergency,
        devices: appState.deviceData,
        friends: appState.friendsData,
        drinkHistory: appState.drinkHistory,
        achievements: appState.achievements,
        partyData: appState.partyData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hsg_party_tracker_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('📥 Data exported successfully!', 'success');
}

// ========================================
// DEVICE PAIRING FROM MODAL
// ========================================
export async function pairDeviceFromModal() {
    const deviceId = document.getElementById('modalDeviceId').value.trim().toUpperCase();
    
    if (!deviceId) {
        showNotification('❌ Please enter a Device ID', 'error');
        return;
    }
    
    try {
        const database = getFirebaseDatabase();
        const currentUser = getCurrentUser();
        const deviceData = getAppState().deviceData;
        
        const deviceSnapshot = await get(ref(database, 'readings/' + deviceId));
        
        if (!deviceSnapshot.exists()) {
            showNotification('❌ Device not found. Make sure it\'s connected.', 'error');
            return;
        }
        
        if (deviceData[deviceId]) {
            showNotification('ℹ️ Device already paired');
            window.closeModal();
            return;
        }
        
        await set(ref(database, 'users/' + currentUser.uid + '/devices/' + deviceId), {
            pairedAt: serverTimestamp(),
            name: 'My Breathalyzer'
        });
        
        showNotification('✅ Device paired successfully!', 'success');
        window.closeModal();
        
    } catch (error) {
        console.error('Pairing error:', error);
        showNotification('❌ Pairing failed', 'error');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
export function getTimeSince(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
}

export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

export function resolvePermission(permission) {
    // This will be set dynamically when modal is shown
    console.log('Permission resolved:', permission);
}


// ========================================
// DEVELOPER TEST DATA FUNCTIONS
// ========================================
export async function setupDevelopersInFirebase() {
    const database = getFirebaseDatabase();
    const { DEVELOPER_UIDS } = await import('../config/constants.js');
    
    try {
        // Set up developers node in Firebase
        const updates = {};
        for (const uid of DEVELOPER_UIDS) {
            updates[`developers/${uid}`] = true;
        }
        
        await set(ref(database, 'developers'), {});
        for (const uid of DEVELOPER_UIDS) {
            await set(ref(database, `developers/${uid}`), true);
        }
        
        showNotification('✅ Developers node created in Firebase!', 'success');
        console.log('Developers node set up with UIDs:', DEVELOPER_UIDS);
        return true;
    } catch (error) {
        console.error('Error setting up developers:', error);
        showNotification('❌ Failed to set up developers node', 'error');
        return false;
    }
}

export async function addTestBACToFirebase() {
    const database = getFirebaseDatabase();
    const { DEVELOPER_UIDS } = await import('../config/constants.js');
    
    try {
        let addedCount = 0;
        
        // Add a test device for each developer
        for (let i = 0; i < DEVELOPER_UIDS.length; i++) {
            const devUid = DEVELOPER_UIDS[i];
            const deviceId = `TEST-DEV-${devUid.substring(0, 6)}`;
            
            // Add test BAC reading
            await set(ref(database, `readings/${deviceId}`), {
                bac: 0.045 + (Math.random() * 0.04), // Random BAC between 0.045 and 0.085
                timestamp: Date.now() - (i * 60000), // Stagger timestamps by 1 minute
                trend: ['rising', 'steady', 'falling'][Math.floor(Math.random() * 3)]
            });
            
            // Add device to developer's device list
            await set(ref(database, `users/${devUid}/devices/${deviceId}`), {
                name: `Test Device ${i + 1}`,
                addedAt: Date.now()
            });
            
            addedCount++;
        }
        
        showNotification(`🧪 Test BAC added to ${addedCount} developer account${addedCount > 1 ? 's' : ''}!`, 'success');
        console.log(`Test devices added for ${addedCount} developers`);
        
        // Force refresh after a short delay
        setTimeout(() => {
            if (window.location.reload) {
                window.location.reload();
            }
        }, 1000);
        
        return addedCount;
    } catch (error) {
        console.error('Error adding test data:', error);
        showNotification('❌ Failed to add test data', 'error');
    }
}

export async function removeTestBACFromFirebase() {
    const database = getFirebaseDatabase();
    const { DEVELOPER_UIDS } = await import('../config/constants.js');
    const currentUser = getCurrentUser();
    
    try {
        let removedCount = 0;
        
        // List of ALL possible test device IDs (old and new patterns)
        const testDevicePatterns = [
            'TEST-DEV-001',
            'TEST-DEV-002',
            'TEST-DEVICE-001',
            'TEST-DEVICE-002'
        ];
        
        // Also add the new pattern for each developer
        for (const devUid of DEVELOPER_UIDS) {
            testDevicePatterns.push(`TEST-DEV-${devUid.substring(0, 6)}`);
        }
        
        // Remove ALL test devices from readings
        for (const deviceId of testDevicePatterns) {
            try {
                await remove(ref(database, `readings/${deviceId}`));
                console.log(`Removed readings for ${deviceId}`);
                removedCount++;
            } catch (e) {
                // Device might not exist, that's ok
            }
        }
        
        // Remove test devices from ALL users (not just developers)
        const usersSnapshot = await get(ref(database, 'users'));
        if (usersSnapshot.exists()) {
            const users = usersSnapshot.val();
            
            for (const [uid, userData] of Object.entries(users)) {
                if (userData.devices) {
                    for (const deviceId of Object.keys(userData.devices)) {
                        // Remove any device that starts with TEST- (safety check for test devices only)
                        if (deviceId.startsWith('TEST-') && deviceId.includes('DEV')) {
                            await remove(ref(database, `users/${uid}/devices/${deviceId}`));
                            console.log(`Removed ${deviceId} from user ${uid}`);
                            removedCount++;
                        }
                    }
                }
            }
        }
        
        showNotification(`🧹 Cleaned up ${removedCount} test entries from Firebase!`, 'success');
        console.log(`Total test entries removed: ${removedCount}`);
        
        // Force refresh after a short delay
        setTimeout(() => {
            if (window.location.reload) {
                window.location.reload();
            }
        }, 1000);
        
        return removedCount;
    } catch (error) {
        console.error('Error removing test data:', error);
        showNotification('❌ Failed to remove test data', 'error');
    }
}