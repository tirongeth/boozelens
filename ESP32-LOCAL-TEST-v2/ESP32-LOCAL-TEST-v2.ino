// BoozeLens ESP32 - LOKALER TEST VERSION v2
// NUR FÜR TESTS MIT LOKALEN FIREBASE FUNCTIONS
// Basiert auf Original freenove5_boozelens_auto_upload.ino WiFi-Setup

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <base64.h>
#include <Preferences.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <esp_system.h>

// ========================================
// BOOZELENS PRODUCTION KONFIGURATION
// ========================================

// Firebase Functions URL (Production)
const char* FIREBASE_FUNCTIONS_URL = "https://us-central1-hsg-party-tracker.cloudfunctions.net/handleBoozeLensUpload";

// Alternative: Lokale Test-URL (für Development)
const char* LOCAL_TEST_URL = "http://192.168.1.115:5001/hsg-party-tracker/us-central1/handleBoozeLensUpload";

// Access Point settings für WiFi setup (aus Original-Code)
const char* AP_SSID_PREFIX = "BoozeLens_";
const char* AP_PASS = "12345678";

// User Credentials (werden über WiFi-Setup konfiguriert)
const char* DEFAULT_USER_EMAIL = "nico.hatze@gmx.ch";
const char* DEFAULT_USER_PASSWORD = "test123";
const char* DEFAULT_USER_NAME = "BoozeLens User";

// System Configuration
#define USE_PRODUCTION_URL false  // true = Firebase, false = lokaler Test (erstmal false für Testing ohne Firebase Functions)

// Globale Variablen (aus Original-Code)
String deviceId;
String apSSID;
String userName = "Anonymous";
String userEmail = "";
String userPassword = "";
bool wifiConnected = false;

// Web server für WiFi Konfiguration
Preferences preferences;
WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;

// Upload URL (wird nach WiFi-Setup gesetzt)
String webAppUploadUrl;

// ========================================
// SETUP & LOOP
// ========================================

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n============================");
  Serial.println("BoozeLens ESP32 - LOCAL TEST v2");
  Serial.println("WiFi Setup wie Original-Code");
  Serial.println("============================");
  
  // Generate unique device ID (aus Original)
  uint64_t chipid = ESP.getEfuseMac();
  deviceId = "BOOZE" + String((uint32_t)(chipid & 0xFFFFFF), HEX);
  deviceId.toUpperCase();
  apSSID = String(AP_SSID_PREFIX) + String((uint32_t)chipid, HEX);
  
  Serial.print("Device ID: ");
  Serial.println(deviceId);
  
  // Initialize preferences
  preferences.begin("boozelens_test", false);
  
  // Versuche gespeicherte WiFi Credentials zu laden
  connectToSavedWiFi();
  
  if(!wifiConnected) {
    // Starte WiFi Setup Portal
    startConfigPortal();
  } else {
    // Upload URL setzen (nach erfolgreicher WiFi Verbindung)
    if (USE_PRODUCTION_URL) {
      webAppUploadUrl = String(FIREBASE_FUNCTIONS_URL);
      Serial.println("🚀 Using PRODUCTION Firebase Functions");
    } else {
      webAppUploadUrl = String(LOCAL_TEST_URL);
      Serial.println("🧪 Using LOCAL test server");
    }
    
    Serial.print("Upload URL: ");
    Serial.println(webAppUploadUrl);
    
    // Starte Test Uploads
    delay(2000);
    testPhotoUpload();
  }
}

void loop() {
  if(wifiConnected) {
    // Alle 30 Sekunden Test Upload
    Serial.println("\n--- Nächster Test Upload in 30 Sekunden ---");
    delay(30000);
    testPhotoUpload();
  } else {
    // WiFi Setup Mode - handle Web Interface
    dnsServer.processNextRequest();
    server.handleClient();
    delay(10);
  }
}

// ========================================
// WIFI FUNKTIONEN (AUS ORIGINAL-CODE)
// ========================================

void connectToSavedWiFi() {
  String ssid = preferences.getString("wifi_ssid", "");
  String pass = preferences.getString("wifi_pass", "");
  userName = preferences.getString("userName", DEFAULT_USER_NAME);
  userEmail = preferences.getString("userEmail", DEFAULT_USER_EMAIL);
  userPassword = preferences.getString("userPassword", DEFAULT_USER_PASSWORD);
  
  if(ssid.length() == 0) {
    Serial.println("No saved WiFi credentials");
    wifiConnected = false;
    return;
  }
  
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());
  
  int attempts = 0;
  while(WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if(WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\n✅ WiFi Connected!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("User Authentication: ");
    Serial.println(userPassword.length() > 0 ? "Configured" : "NOT SET");
  } else {
    wifiConnected = false;
    Serial.println("\n❌ WiFi connection failed");
  }
}

void startConfigPortal() {
  Serial.println("Starting WiFi configuration portal...");
  Serial.println("\n🔧 WIFI SETUP ERFORDERLICH:");
  Serial.println("1. Verbinde dein Handy/Laptop mit WiFi:");
  Serial.print("   SSID: ");
  Serial.println(apSSID);
  Serial.println("   Password: 12345678");
  Serial.println("2. Öffne Browser: http://192.168.4.1");
  Serial.println("3. Wähle dein WiFi und gib Passwort ein");
  Serial.println("4. ESP32 startet neu und verbindet sich");
  
  WiFi.disconnect(true);
  delay(100);
  
  WiFi.mode(WIFI_AP);
  WiFi.softAP(apSSID.c_str(), AP_PASS);
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP: ");
  Serial.println(IP);
  
  dnsServer.start(DNS_PORT, "*", IP);
  
  server.on("/", handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.on("/scan", HTTP_GET, handleScan);
  server.onNotFound(handleRoot);
  
  server.begin();
  Serial.println("Configuration portal started");
}

// ========================================
// WEB INTERFACE HANDLER (AUS ORIGINAL)
// ========================================

void handleRoot() {
  String html = R"=====(
<!DOCTYPE html>
<html>
<head>
    <title>BoozeLens Test WiFi Setup</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial; background: #1a1a2e; color: white; padding: 20px; }
        .container { max-width: 400px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; }
        h1 { text-align: center; color: #00ff88; }
        .device-id { background: #00ff88; color: black; padding: 15px; border-radius: 10px; text-align: center; font-weight: bold; margin: 20px 0; }
        input, button { width: 100%; padding: 12px; margin: 10px 0; border: none; border-radius: 5px; font-size: 16px; }
        input { background: rgba(255,255,255,0.9); color: #333; }
        button { background: #00ff88; color: #000; font-weight: bold; cursor: pointer; }
        .networks { background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; margin: 15px 0; max-height: 200px; overflow-y: auto; }
        .network-item { padding: 8px; cursor: pointer; border-radius: 3px; margin: 5px 0; }
        .network-item:hover { background: rgba(255,255,255,0.2); }
        .note { background: rgba(255,136,0,0.2); padding: 15px; border-radius: 10px; margin: 20px 0; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍺 BoozeLens Test Setup</h1>
        <div class="device-id">TEST DEVICE: )=====";
  
  html += deviceId;
  html += R"=====(</div>
        <div class="note">
            <strong>📱 BOOZELENS SETUP</strong><br>
            Configure your BoozeLens device to connect to your account.
        </div>
        <form action="/save" method="POST">
            <h3>WiFi Configuration</h3>
            <div id="networks" class="networks">
                <div style="text-align: center; opacity: 0.7;">Scanning networks...</div>
            </div>
            <input type="text" name="ssid" id="ssid" placeholder="WiFi Network Name" required>
            <input type="password" name="pass" placeholder="WiFi Password" required>
            <h3>BoozeLens Account</h3>
            <input type="text" name="name" placeholder="Your Name" value=")=====";
  
  html += DEFAULT_USER_NAME;
  html += R"=====(">
            <input type="email" name="email" placeholder="Your Email" value=")=====";
  
  html += DEFAULT_USER_EMAIL;
  html += R"=====(">
            <input type="password" name="password" placeholder="Your Password" value=")=====";
  
  html += DEFAULT_USER_PASSWORD;
  html += R"=====(">
            <button type="submit">Save & Connect</button>
        </form>
    </div>
    <script>
        function selectNetwork(ssid) {
            document.getElementById('ssid').value = ssid;
        }
        
        fetch('/scan')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('networks');
                if(data.networks.length > 0) {
                    container.innerHTML = data.networks.map(net => 
                        `<div class="network-item" onclick="selectNetwork('${net.ssid}')">
                            ${net.ssid} (${net.rssi} dBm)
                        </div>`
                    ).join('');
                } else {
                    container.innerHTML = '<div style="text-align: center;">No networks found</div>';
                }
            })
            .catch(err => console.error('Scan failed:', err));
    </script>
</body>
</html>
)=====";
  
  server.send(200, "text/html", html);
}

void handleScan() {
  String json = "{\"networks\":[";
  int n = WiFi.scanNetworks();
  
  for(int i = 0; i < n; i++) {
    if(i > 0) json += ",";
    json += "{";
    json += "\"ssid\":\"" + WiFi.SSID(i) + "\",";
    json += "\"rssi\":" + String(WiFi.RSSI(i));
    json += "}";
  }
  
  json += "]}";
  server.send(200, "application/json", json);
}

void handleSave() {
  String ssid = server.arg("ssid");
  String pass = server.arg("pass");
  String name = server.arg("name");
  String email = server.arg("email");
  String password = server.arg("password");
  
  // Save credentials
  preferences.putString("wifi_ssid", ssid);
  preferences.putString("wifi_pass", pass);
  preferences.putString("userName", name.length() > 0 ? name : DEFAULT_USER_NAME);
  preferences.putString("userEmail", email.length() > 0 ? email : DEFAULT_USER_EMAIL);
  preferences.putString("userPassword", password.length() > 0 ? password : DEFAULT_USER_PASSWORD);
  
  server.send(200, "text/html", 
    "<html><body style='font-family:Arial;background:#1a1a2e;color:white;text-align:center;padding:50px;'>"
    "<h1>✅ Settings Saved!</h1>"
    "<p>ESP32 will restart and connect to WiFi.</p>"
    "<p>Check Serial Monitor for test results!</p>"
    "<p><strong>Device ID: " + deviceId + "</strong></p>"
    "</body></html>");
  
  delay(2000);
  ESP.restart();
}

// ========================================
// TEST PHOTO UPLOAD
// ========================================

void testPhotoUpload() {
  if(!wifiConnected) {
    Serial.println("❌ No WiFi - Upload skipped");
    return;
  }
  
  Serial.println("\n📸 Starting BoozeLens Photo Upload...");
  
  // TODO: Hier würde echte Kamera-Capture stattfinden
  // Für jetzt verwenden wir ein Test-Bild
  String photoBase64 = "";
  
  if (USE_PRODUCTION_URL) {
    // Für Production: Verwende größeres Test-JPEG
    photoBase64 = generateTestJPEG();
  } else {
    // Für lokale Tests: Kleines PNG
    photoBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
  }
  
  // Random BAC für Tests (0.000 bis 0.150)
  float testBAC = random(0, 150) / 1000.0;
  
  // JSON Payload mit vollständigen Daten
  StaticJsonDocument<8192> doc;
  doc["deviceId"] = deviceId;
  doc["imageBase64"] = photoBase64;
  doc["timestamp"] = millis();
  doc["userName"] = userName;
  doc["userEmail"] = userEmail;
  doc["userPassword"] = userPassword;
  doc["bac"] = testBAC;
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // HTTP POST mit erweiterten Headers
  HTTPClient http;
  http.setTimeout(30000); // 30 Sekunden Timeout
  http.begin(webAppUploadUrl);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-Device-ID", deviceId);
  http.addHeader("X-Device-Type", "BoozeLens_ESP32");
  http.addHeader("User-Agent", "BoozeLens/1.0");
  
  Serial.println("📤 Sending Photo Upload...");
  Serial.print("URL: ");
  Serial.println(webAppUploadUrl);
  Serial.print("Device ID: ");
  Serial.println(deviceId);
  Serial.print("BAC: ");
  Serial.println(testBAC, 3);
  Serial.print("User: ");
  Serial.println(userEmail);
  Serial.print("Payload Size: ");
  Serial.println(jsonString.length());
  
  unsigned long startTime = millis();
  int httpCode = http.POST(jsonString);
  unsigned long uploadTime = millis() - startTime;
  
  String response = http.getString();
  http.end();
  
  // Detaillierte Results
  Serial.println("\n📋 UPLOAD RESULT:");
  Serial.print("HTTP Code: ");
  Serial.println(httpCode);
  Serial.print("Upload Time: ");
  Serial.print(uploadTime);
  Serial.println("ms");
  Serial.print("Response: ");
  Serial.println(response);
  
  // Status-abhängige Behandlung
  switch(httpCode) {
    case 200:
      Serial.println("✅ Upload successful!");
      // Parse Response für PhotoID
      if(response.indexOf("photoId") > -1) {
        Serial.println("📸 Photo gespeichert in Firebase!");
      }
      break;
      
    case 401:
      Serial.println("❌ Authentication failed - Check user credentials");
      break;
      
    case 403:
      Serial.println("❌ Device not paired - Auto-pairing should occur");
      break;
      
    case 413:
      Serial.println("❌ Image too large - Reduce quality");
      break;
      
    case 500:
      Serial.println("❌ Server error - Retry later");
      break;
      
    case -1:
      Serial.println("❌ Network error - Check connection");
      break;
      
    default:
      Serial.print("❌ Upload failed with code: ");
      Serial.println(httpCode);
  }
  
  Serial.println("============================\n");
}

// Generiere ein einfaches Test-JPEG für Production Tests
String generateTestJPEG() {
  // Kleines JPEG-Bild (16x16 Pixel) als Base64
  // Dies simuliert ein echtes Kamerabild
  String testJPEG = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAgACAADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==";
  return testJPEG;
}