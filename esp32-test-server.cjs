// Einfacher HTTP Server für ESP32 Tests
// Läuft auf 0.0.0.0:5001 und ist vom ESP32 erreichbar

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Device-ID');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  const parsedUrl = url.parse(req.url, true);
  console.log(`📥 ${req.method} ${req.url} from ${req.connection.remoteAddress}`);
  
  // Test Connection Endpoint
  if (parsedUrl.pathname === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: '🍺 ESP32 Test Server aktiv!',
      timestamp: new Date().toISOString(),
      ip: req.connection.remoteAddress,
      status: 'ready'
    }));
    return;
  }
  
  // Firebase Functions Compatible Upload Endpoint
  if (req.method === 'POST' && parsedUrl.pathname === '/hsg-party-tracker/us-central1/handleBoozeLensUpload') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      console.log('📸 BoozeLens Upload empfangen:');
      console.log('Body length:', body.length);
      
      try {
        const data = JSON.parse(body);
        console.log('Device ID:', data.deviceId);
        console.log('Auth Token:', data.idToken ? 'Present' : 'Missing');
        console.log('Has Image:', !!data.image);
        console.log('Metadata:', data.metadata);
        
        // Erfolgreiche Antwort im Firebase Functions Format
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'BoozeLens photo uploaded successfully (TEST MODE)',
          data: {
            deviceId: data.deviceId,
            uploadTime: new Date().toISOString(),
            imageSize: data.image ? data.image.length : 0,
            metadata: data.metadata || {},
            testMode: true
          }
        }));
        
      } catch (error) {
        console.error('❌ JSON Parse Error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid JSON: ' + error.message,
          testMode: true
        }));
      }
    });
    
    return;
  }
  
  // Device Management Endpoint
  if (req.method === 'POST' && parsedUrl.pathname === '/hsg-party-tracker/us-central1/manageBoozeLensDevice') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      console.log('🔧 Device Management Request:');
      
      try {
        const data = JSON.parse(body);
        console.log('Action:', data.action);
        console.log('Device ID:', data.deviceId);
        
        // Simple device storage for testing
        if (!global.pairedDevices) {
          global.pairedDevices = [];
        }
        
        // Simuliere device management responses
        let response = { success: true, testMode: true };
        
        switch(data.action) {
          case 'list':
            response.devices = global.pairedDevices.map(device => ({
              ...device,
              lastSeen: Date.now() - Math.random() * 600000, // Random last seen within 10 minutes
              totalPhotos: Math.floor(Math.random() * 20) + 1 // Random photo count
            }));
            break;
          case 'pair':
            // Add device to paired list if not already exists
            const existingDevice = global.pairedDevices.find(d => d.deviceId === data.deviceId);
            if (!existingDevice) {
              global.pairedDevices.push({
                deviceId: data.deviceId,
                nickname: `BoozeLens ${data.deviceId.slice(-4)}`,
                pairedAt: Date.now()
              });
              console.log(`✅ Device ${data.deviceId} added to paired devices`);
            } else {
              console.log(`ℹ️ Device ${data.deviceId} already paired`);
            }
            response.message = 'Device paired successfully (TEST)';
            break;
          case 'unpair':
            // Remove device from paired list
            const deviceIndex = global.pairedDevices.findIndex(d => d.deviceId === data.deviceId);
            if (deviceIndex > -1) {
              global.pairedDevices.splice(deviceIndex, 1);
              console.log(`🗑️ Device ${data.deviceId} removed from paired devices`);
            }
            response.message = 'Device unpaired successfully (TEST)';
            break;
          case 'rename':
            // Rename device in paired list
            const deviceToRename = global.pairedDevices.find(d => d.deviceId === data.deviceId);
            if (deviceToRename) {
              deviceToRename.nickname = data.nickname;
              console.log(`📝 Device ${data.deviceId} renamed to: ${data.nickname}`);
            }
            response.message = 'Device renamed successfully (TEST)';
            break;
          default:
            response.success = false;
            response.message = 'Unknown action';
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
        
      } catch (error) {
        console.error('❌ Error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: 'Error: ' + error.message,
          testMode: true
        }));
      }
    });
    
    return;
  }
  
  // 404 für alle anderen Requests
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    error: 'Not found',
    path: parsedUrl.pathname,
    method: req.method
  }));
});

// Server auf allen Interfaces starten (0.0.0.0)
server.listen(5001, '0.0.0.0', () => {
  console.log('🚀 BoozeLens ESP32 Test Server läuft auf:');
  console.log('   http://0.0.0.0:5001/test');
  console.log('   http://127.0.0.1:5001/test');
  console.log('');
  console.log('📸 BoozeLens Upload Endpoint:');
  console.log('   POST http://YOUR_LAPTOP_IP:5001/hsg-party-tracker/us-central1/handleBoozeLensUpload');
  console.log('');
  console.log('🔧 Device Management Endpoint:');
  console.log('   POST http://YOUR_LAPTOP_IP:5001/hsg-party-tracker/us-central1/manageBoozeLensDevice');
  console.log('');
  console.log('💡 ESP32 Setup:');
  console.log('   1. Update LOCAL_TEST_URL in ESP32 code');
  console.log('   2. Set USE_PRODUCTION_URL = false');
  console.log('   3. Replace YOUR_LAPTOP_IP with your actual IP');
  console.log('');
  console.log('🔄 Warte auf ESP32 Requests...');
});