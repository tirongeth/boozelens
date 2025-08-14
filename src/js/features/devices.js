// ========================================
// DEVICE MANAGEMENT MODULE
// ========================================
// Handles ESP32 BoozeLens device pairing, management, and breathalyzer readings

import { getFirebaseDatabase, getFirebaseFunctions } from '../config/firebase.js';
import { getCurrentUser, getStateValue, setStateValue } from '../config/app-state.js';
import { ref, set, get, remove, onValue, off, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import { httpsCallable } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js';
import { showNotification } from '../ui/notifications.js';
import { handleError, validateInput, safeAsync } from '../utils/error-handler.js';

// Store device listeners
const deviceListeners = {};

// ESP32 BoozeLens device state
let boozeLensDevices = [];
let deviceStatsData = {};

// ========================================
// INITIALIZE DEVICES
// ========================================
export function initializeDevices() {
    const user = getCurrentUser();
    if (!user) return;
    
    const database = getFirebaseDatabase();
    
    // Listen for user's breathalyzer devices (original functionality)
    onValue(ref(database, 'users/' + user.uid + '/devices'), (snapshot) => {
        const devices = snapshot.val() || {};
        setStateValue('deviceData', devices);
        updateDeviceList();
        
        const deviceCount = document.getElementById('deviceCount');
        if (deviceCount) {
            deviceCount.textContent = Object.keys(devices).length;
        }
        
        // Start listening to each device
        Object.keys(devices).forEach(deviceId => {
            listenToDevice(deviceId);
        });
    });
    
    // Initialize ESP32 BoozeLens devices
    initializeBoozeLensDevices();
}

// ========================================
// PAIR NEW DEVICE
// ========================================
export async function pairDeviceById() {
    const deviceId = document.getElementById('deviceIdInput').value.trim().toUpperCase();
    
    // Validate device ID format
    const deviceIdErrors = validateInput(deviceId, 'deviceId', 'Device ID');
    if (deviceIdErrors.length > 0) {
        showNotification(deviceIdErrors[0], 'error');
        return;
    }
    
    try {
        const database = getFirebaseDatabase();
        const user = getCurrentUser();
        
        // Check if device exists in readings
        const deviceSnapshot = await get(ref(database, 'readings/' + deviceId));
        
        if (!deviceSnapshot.exists()) {
            showNotification('❌ Device not found. Make sure it\'s connected.', 'error');
            return;
        }
        
        // Check if already paired
        const deviceData = getStateValue('deviceData');
        if (deviceData[deviceId]) {
            showNotification('ℹ️ Device already paired');
            return;
        }
        
        // Add device to user
        await set(ref(database, 'users/' + user.uid + '/devices/' + deviceId), {
            pairedAt: serverTimestamp(),
            name: 'My Breathalyzer'
        });
        
        // Clear input
        document.getElementById('deviceIdInput').value = '';
        
        showNotification('✅ Device paired successfully!', 'success');
        
    } catch (error) {
        const errorInfo = handleError(error, 'Device Pairing');
        showNotification(errorInfo.message, 'error');
    }
}

// ========================================
// LISTEN TO DEVICE READINGS
// ========================================
function listenToDevice(deviceId) {
    // Don't create duplicate listeners
    if (deviceListeners[deviceId]) return;
    
    const database = getFirebaseDatabase();
    const listener = onValue(ref(database, 'readings/' + deviceId), (snapshot) => {
        const reading = snapshot.val();
        if (reading) {
            processDeviceReading(deviceId, reading);
        }
    });
    
    deviceListeners[deviceId] = listener;
}

// ========================================
// PROCESS DEVICE READING
// ========================================
function processDeviceReading(deviceId, reading) {
    let partyData = getStateValue('partyData') || {};
    
    if (!partyData[deviceId]) {
        partyData[deviceId] = {
            name: getStateValue('userData').username || 'You',
            bac: 0,
            lastUpdate: Date.now(),
            location: 'Party',
            trend: 'steady',
            history: [],
            isOwn: true
        };
    }
    
    const oldBac = partyData[deviceId].bac;
    partyData[deviceId].bac = reading.bac || 0;
    partyData[deviceId].lastUpdate = Date.now();
    partyData[deviceId].trend = reading.bac > oldBac ? 'up' : reading.bac < oldBac ? 'down' : 'steady';
    
    // Add to history
    partyData[deviceId].history.push({
        time: Date.now(),
        value: reading.bac
    });
    
    // Keep history reasonable
    if (partyData[deviceId].history.length > 50) {
        partyData[deviceId].history.shift();
    }
    
    setStateValue('partyData', partyData);
    
    // Update UI
    if (window.updateUI) {
        window.updateUI();
    }
    
    // Check for alerts only if reading is actually new (less than 5 minutes old)
    const isNewReading = Date.now() - reading.timestamp < 5 * 60 * 1000;
    if (isNewReading && reading.bac >= 0.08) {
        showNotification(`⚠️ Your BAC is too high: ${reading.bac.toFixed(3)}‰`, 'error');
    }
}

// ========================================
// UPDATE DEVICE LIST UI
// ========================================
function updateDeviceList() {
    const deviceList = document.getElementById('deviceList');
    if (!deviceList) return;
    
    const deviceData = getStateValue('deviceData') || {};
    deviceList.innerHTML = '';
    
    if (Object.keys(deviceData).length === 0) {
        deviceList.innerHTML = '<p style="text-align: center; opacity: 0.7;">No devices paired yet</p>';
        return;
    }
    
    const partyData = getStateValue('partyData') || {};
    
    Object.entries(deviceData).forEach(([deviceId, device]) => {
        const lastReading = partyData[deviceId];
        const item = document.createElement('div');
        item.className = 'device-item';
        item.innerHTML = `
            <div class="device-info">
                <h4>${device.name || 'Breathalyzer'}</h4>
                <p>ID: ${deviceId}</p>
                <p>Last Reading: ${lastReading ? lastReading.bac.toFixed(3) + '‰' : 'No data'}</p>
            </div>
            <div>
                <button class="btn" onclick="renameDevice('${deviceId}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="unpairDevice('${deviceId}')">
                    <i class="fas fa-unlink"></i>
                </button>
            </div>
        `;
        deviceList.appendChild(item);
    });
}

// ========================================
// DEVICE ACTIONS
// ========================================
export async function unpairDevice(deviceId) {
    if (confirm('Unpair this device?')) {
        const database = getFirebaseDatabase();
        const user = getCurrentUser();
        await remove(ref(database, 'users/' + user.uid + '/devices/' + deviceId));
        
        // Stop listening to this device
        if (deviceListeners[deviceId]) {
            const database = getFirebaseDatabase();
            off(ref(database, 'readings/' + deviceId), 'value', deviceListeners[deviceId]);
            delete deviceListeners[deviceId];
        }
        
        showNotification('🔓 Device unpaired');
    }
}

export async function renameDevice(deviceId) {
    const deviceData = getStateValue('deviceData');
    const newName = prompt('Enter new name for device:', deviceData[deviceId]?.name || 'My Breathalyzer');
    
    if (newName) {
        const database = getFirebaseDatabase();
        const user = getCurrentUser();
        await set(ref(database, 'users/' + user.uid + '/devices/' + deviceId + '/name'), newName);
        showNotification('✏️ Device renamed');
    }
}

// ========================================
// ESP32 BOOZELENS DEVICE MANAGEMENT
// ========================================

// Initialize ESP32 BoozeLens devices
export async function initializeBoozeLensDevices() {
    try {
        console.log('🔧 Initializing BoozeLens devices...');
        
        // Wait a bit for DOM to be fully loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await loadBoozeLensDevices();
        setupBoozeLensDeviceUI();
        console.log('✅ BoozeLens devices initialized');
    } catch (error) {
        console.error('Failed to initialize BoozeLens devices:', error);
    }
}

// Development mode detection
const isDevelopmentMode = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

// Local test server URL for development
const LOCAL_TEST_SERVER = 'http://localhost:5001';

// Local HTTP request for development testing
async function localBoozeLensRequest(action, data = {}) {
    const url = `${LOCAL_TEST_SERVER}/hsg-party-tracker/us-central1/manageBoozeLensDevice`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: action,
                ...data
            })
        });
        
        const result = await response.json();
        console.log('🧪 Local test server response:', result);
        return { data: result };
        
    } catch (error) {
        console.error('❌ Local test server error:', error);
        throw error;
    }
}

// Load user's ESP32 BoozeLens devices
async function loadBoozeLensDevices() {
    try {
        // Use local test server in development mode
        if (isDevelopmentMode()) {
            console.log('🧪 Development mode: Using local test server');
            
            try {
                const result = await localBoozeLensRequest('list');
                
                if (result.data.success) {
                    boozeLensDevices = result.data.devices || [];
                    setStateValue('boozeLensDevices', boozeLensDevices);
                    updateBoozeLensDeviceList();
                    updateBoozeLensDeviceStats();
                    return;
                }
            } catch (error) {
                console.warn('🧪 Local test server not available, using fallback');
            }
        } else {
            // Production mode: Use Firebase Functions
            const functions = getFirebaseFunctions();
            
            if (functions) {
                const manageDevice = httpsCallable(functions, 'manageBoozeLensDevice');
                
                const result = await manageDevice({
                    action: 'list'
                });
                
                if (result.data.success) {
                    boozeLensDevices = result.data.devices || [];
                    setStateValue('boozeLensDevices', boozeLensDevices);
                    updateBoozeLensDeviceList();
                    updateBoozeLensDeviceStats();
                    return;
                }
            }
        }
        
        // Fallback: Show empty device list
        console.warn('No device management available - showing empty list');
        boozeLensDevices = [];
        setStateValue('boozeLensDevices', boozeLensDevices);
        updateBoozeLensDeviceList();
        updateBoozeLensDeviceStats();
        
    } catch (error) {
        console.warn('Error loading BoozeLens devices:', error.message);
        // Fallback: Show empty device list for now
        boozeLensDevices = [];
        setStateValue('boozeLensDevices', boozeLensDevices);
        updateBoozeLensDeviceList();
        updateBoozeLensDeviceStats();
    }
}

// Pair ESP32 BoozeLens device
export async function pairBoozeLensDevice(deviceId) {
    try {
        if (!deviceId || deviceId.trim().length === 0) {
            throw new Error('Please enter a valid Device ID');
        }
        
        // Validate device ID format (should start with BOOZE)
        const normalizedDeviceId = deviceId.toUpperCase().trim();
        if (!normalizedDeviceId.startsWith('BOOZE')) {
            throw new Error('Device ID should start with BOOZE (e.g., BOOZE12AB34)');
        }
        
        showNotification('📱 Pairing BoozeLens device...', 'info');
        
        let result;
        
        if (isDevelopmentMode()) {
            // Use local test server in development
            console.log('🧪 Development mode: Using local test server for pairing');
            result = await localBoozeLensRequest('pair', {
                deviceId: normalizedDeviceId
            });
        } else {
            // Use Firebase Functions in production
            const functions = getFirebaseFunctions();
            const manageDevice = httpsCallable(functions, 'manageBoozeLensDevice');
            
            result = await manageDevice({
                action: 'pair',
                deviceId: normalizedDeviceId
            });
        }
        
        if (result.data.success) {
            showNotification('✅ BoozeLens device paired successfully!', 'success');
            await loadBoozeLensDevices(); // Refresh device list
            clearBoozeLensDeviceForm();
            return true;
        } else {
            throw new Error(result.data.message || 'Pairing failed');
        }
        
    } catch (error) {
        const errorInfo = handleError(error, 'BoozeLens Device Pairing');
        showNotification(errorInfo.message, 'error');
        return false;
    }
}

// Unpair ESP32 BoozeLens device
export async function unpairBoozeLensDevice(deviceId) {
    if (!confirm('Are you sure you want to unpair this BoozeLens device? This cannot be undone.')) {
        return false;
    }
    
    try {
        let result;
        
        if (isDevelopmentMode()) {
            // Use local test server in development
            console.log('🧪 Development mode: Using local test server for unpair');
            result = await localBoozeLensRequest('unpair', {
                deviceId: deviceId
            });
        } else {
            // Use Firebase Functions in production
            const functions = getFirebaseFunctions();
            const manageDevice = httpsCallable(functions, 'manageBoozeLensDevice');
            
            result = await manageDevice({
                action: 'unpair',
                deviceId: deviceId
            });
        }
        
        if (result.data.success) {
            showNotification('📱 BoozeLens device unpaired', 'info');
            await loadBoozeLensDevices();
            return true;
        } else {
            throw new Error(result.data.message || 'Unpair failed');
        }
        
    } catch (error) {
        const errorInfo = handleError(error, 'BoozeLens Device Unpair');
        showNotification(errorInfo.message, 'error');
        return false;
    }
}

// Rename ESP32 BoozeLens device
export async function renameBoozeLensDevice(deviceId, newNickname) {
    try {
        if (!newNickname || newNickname.trim().length === 0) {
            throw new Error('Please enter a valid nickname');
        }
        
        let result;
        
        if (isDevelopmentMode()) {
            // Use local test server in development
            console.log('🧪 Development mode: Using local test server for rename');
            result = await localBoozeLensRequest('rename', {
                deviceId: deviceId,
                nickname: newNickname.trim()
            });
        } else {
            // Use Firebase Functions in production
            const functions = getFirebaseFunctions();
            const manageDevice = httpsCallable(functions, 'manageBoozeLensDevice');
            
            result = await manageDevice({
                action: 'rename',
                deviceId: deviceId,
                nickname: newNickname.trim()
            });
        }
        
        if (result.data.success) {
            showNotification('📝 BoozeLens device renamed', 'success');
            await loadBoozeLensDevices();
            return true;
        } else {
            throw new Error(result.data.message || 'Rename failed');
        }
        
    } catch (error) {
        const errorInfo = handleError(error, 'BoozeLens Device Rename');
        showNotification(errorInfo.message, 'error');
        return false;
    }
}

// Setup UI for ESP32 BoozeLens devices
function setupBoozeLensDeviceUI() {
    // Add event listeners for BoozeLens device management
    document.addEventListener('click', async (e) => {
        const target = e.target;
        
        // Pair BoozeLens device button
        if (target.id === 'pairBoozeLensDeviceBtn') {
            e.preventDefault();
            const deviceIdInput = document.getElementById('boozeLensDeviceIdInput');
            if (deviceIdInput) {
                await pairBoozeLensDevice(deviceIdInput.value);
            }
        }
        
        // Unpair BoozeLens device button
        if (target.classList.contains('unpair-boozelens-device-btn')) {
            e.preventDefault();
            const deviceId = target.dataset.deviceId;
            if (deviceId) {
                await unpairBoozeLensDevice(deviceId);
            }
        }
        
        // Rename BoozeLens device button
        if (target.classList.contains('rename-boozelens-device-btn')) {
            e.preventDefault();
            const deviceId = target.dataset.deviceId;
            const currentNickname = target.dataset.currentNickname;
            
            const newNickname = prompt('Enter new nickname:', currentNickname);
            if (newNickname && newNickname !== currentNickname) {
                await renameBoozeLensDevice(deviceId, newNickname);
            }
        }
    });
    
    // Form submission for BoozeLens devices
    const boozeLensDeviceForm = document.getElementById('boozeLensDevicePairForm');
    if (boozeLensDeviceForm) {
        boozeLensDeviceForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const deviceIdInput = document.getElementById('boozeLensDeviceIdInput');
            if (deviceIdInput) {
                await pairBoozeLensDevice(deviceIdInput.value);
            }
        });
    }
}

// Update ESP32 BoozeLens device list UI
function updateBoozeLensDeviceList() {
    const deviceListContainer = document.getElementById('boozeLensDeviceList');
    console.log('📱 Updating BoozeLens device list, container found:', !!deviceListContainer);
    if (!deviceListContainer) {
        console.warn('⚠️ boozeLensDeviceList container not found!');
        // Don't retry indefinitely - just return
        return;
    }
    
    if (boozeLensDevices.length === 0) {
        deviceListContainer.innerHTML = `
            <div class="device-placeholder">
                <i class="fas fa-camera-retro" style="font-size: 3em; opacity: 0.3;"></i>
                <p style="opacity: 0.5;">No BoozeLens devices paired yet.</p>
                <p style="opacity: 0.5;">Pair your first device below!</p>
            </div>
        `;
        return;
    }
    
    deviceListContainer.innerHTML = boozeLensDevices.map(device => {
        const lastSeenTime = device.lastSeen ? getTimeAgo(device.lastSeen) : 'Never';
        const statusColor = getDeviceStatusColor(device.lastSeen);
        const isOnline = isDeviceOnline(device.lastSeen);
        
        return `
            <div class="boozelens-device-card" data-device-id="${device.deviceId}">
                <div class="device-header">
                    <div class="device-info">
                        <div class="device-icon">
                            <i class="fas fa-camera-retro"></i>
                        </div>
                        <div class="device-details">
                            <h4>${device.nickname}</h4>
                            <p class="device-id">${device.deviceId}</p>
                            <p class="device-status" style="color: ${statusColor}">
                                <i class="fas fa-circle" style="font-size: 0.6em;"></i>
                                ${isOnline ? 'Online' : 'Offline'} • Last seen ${lastSeenTime}
                            </p>
                        </div>
                    </div>
                    <div class="device-actions">
                        <button class="btn-icon rename-boozelens-device-btn" 
                                data-device-id="${device.deviceId}" 
                                data-current-nickname="${device.nickname}"
                                title="Rename device">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon unpair-boozelens-device-btn" 
                                data-device-id="${device.deviceId}"
                                title="Unpair device">
                            <i class="fas fa-unlink"></i>
                        </button>
                    </div>
                </div>
                
                <div class="device-stats">
                    <div class="stat">
                        <span class="stat-value">${device.totalPhotos || 0}</span>
                        <span class="stat-label">Photos</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${getTimeSincePaired(device.pairedAt)}</span>
                        <span class="stat-label">Days paired</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update ESP32 BoozeLens device stats UI
function updateBoozeLensDeviceStats() {
    const statsContainer = document.getElementById('boozeLensDeviceStats');
    if (!statsContainer) return;
    
    const totalDevices = boozeLensDevices.length;
    const onlineDevices = boozeLensDevices.filter(d => isDeviceOnline(d.lastSeen)).length;
    const totalPhotos = boozeLensDevices.reduce((sum, d) => sum + (d.totalPhotos || 0), 0);
    
    statsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-camera-retro"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${totalDevices}</div>
                    <div class="stat-label">BoozeLens Devices</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-wifi" style="color: #00ff88;"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${onlineDevices}</div>
                    <div class="stat-label">Online</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-images"></i>
                </div>
                <div class="stat-info">
                    <div class="stat-value">${totalPhotos}</div>
                    <div class="stat-label">Photos</div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions for BoozeLens devices
function clearBoozeLensDeviceForm() {
    const deviceIdInput = document.getElementById('boozeLensDeviceIdInput');
    if (deviceIdInput) {
        deviceIdInput.value = '';
    }
}

function getTimeAgo(timestamp) {
    if (!timestamp) return 'never';
    
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

function getTimeSincePaired(timestamp) {
    if (!timestamp) return '0';
    
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    return days.toString();
}

function isDeviceOnline(lastSeen) {
    if (!lastSeen) return false;
    
    const now = Date.now();
    const diff = now - lastSeen;
    const minutes = diff / (1000 * 60);
    
    // Consider device online if last seen within 5 minutes
    return minutes < 5;
}

function getDeviceStatusColor(lastSeen) {
    if (isDeviceOnline(lastSeen)) {
        return '#00ff88'; // Green
    } else {
        return '#ff6b6b'; // Red
    }
}

// Export functions for BoozeLens devices
export async function refreshBoozeLensDevices() {
    await loadBoozeLensDevices();
    showNotification('📱 BoozeLens devices refreshed', 'success');
}

export function getBoozeLensDeviceList() {
    return boozeLensDevices;
}

export function getBoozeLensDeviceCount() {
    return boozeLensDevices.length;
}

export function getOnlineBoozeLensDeviceCount() {
    return boozeLensDevices.filter(d => isDeviceOnline(d.lastSeen)).length;
}

// Make functions available globally for onclick handlers
window.pairDeviceById = pairDeviceById;
window.unpairDevice = unpairDevice;
window.renameDevice = renameDevice;

// Make BoozeLens functions available globally
window.pairBoozeLensDevice = pairBoozeLensDevice;
window.unpairBoozeLensDevice = unpairBoozeLensDevice;
window.renameBoozeLensDevice = renameBoozeLensDevice;