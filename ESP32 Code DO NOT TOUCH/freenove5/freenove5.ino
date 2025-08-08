// BoozeLens Camera - Professional Edition with Firebase
// Freenove ESP32-S3 with OV2640 Camera
// Version 3.0 - WiFi & Firebase Integration

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <FastLED.h>
#include "esp_camera.h"
#include "FS.h"
#include "SD_MMC.h"
#include <Preferences.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <esp_system.h>

// Firebase Configuration
const char* firebaseHost = "hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app";
const char* firebaseAuth = "AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg";

// Access Point settings for WiFi setup
const char* AP_SSID_PREFIX = "BoozeLens_";
const char* AP_PASS = "12345678";

// Pin Definitions - Freenove ESP32-S3
#define SDA_PIN 21
#define SCL_PIN 47
#define BUTTON1_PIN 1
#define BUTTON2_PIN 2
#define BUZZER_PIN 14
#define LED_PIN 48
#define MQ3_PIN 3
#define NUM_LEDS 8

// SD Card Pins
#define SD_MMC_CMD 38
#define SD_MMC_CLK 39
#define SD_MMC_D0  40

// Camera Pins - Freenove OV2640
#define PWDN_GPIO_NUM     -1
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM     15
#define SIOD_GPIO_NUM     4
#define SIOC_GPIO_NUM     5
#define Y9_GPIO_NUM       16
#define Y8_GPIO_NUM       17
#define Y7_GPIO_NUM       18
#define Y6_GPIO_NUM       12
#define Y5_GPIO_NUM       10
#define Y4_GPIO_NUM       8
#define Y3_GPIO_NUM       9
#define Y2_GPIO_NUM       11
#define VSYNC_GPIO_NUM    6
#define HREF_GPIO_NUM     7
#define PCLK_GPIO_NUM     13

// Objects
Adafruit_SSD1306 display(128, 64, &Wire, -1);
CRGB leds[NUM_LEDS];
Preferences preferences;
WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;

// Global State
bool sdReady = false;
bool cameraReady = false;
bool flashEnabled = false;
bool wifiConnected = false;
bool wifiSetupMode = false;
int mq3Baseline = 2048;
unsigned long photoNumber = 0;  // Persistent photo counter
unsigned long bacNumber = 0;    // Persistent BAC counter
String deviceId;
String apSSID;
String userName = "Anonymous";
String userEmail = "";
unsigned long lastWifiAttempt = 0;
const unsigned long WIFI_RETRY_INTERVAL = 30000;  // Retry WiFi every 30 seconds

// Operating Modes
enum Mode {
  MODE_CAMERA,
  MODE_ALCOHOL,
  MODE_INFO,
  MODE_WIFI_SETUP
};
Mode currentMode = MODE_CAMERA;

// Button tracking for WiFi setup
unsigned long button1PressStart = 0;
unsigned long button2PressStart = 0;
bool button1LongPressHandled = false;
bool button2LongPressHandled = false;
const unsigned long WIFI_SETUP_PRESS_TIME = 3000;  // 3 seconds for WiFi setup

void setup() {
  Serial.begin(115200);
  delay(500);
  
  Serial.println("\n============================");
  Serial.println("BoozeLens Camera v3.0");
  Serial.println("WiFi & Firebase Edition");
  Serial.println("============================");
  
  // Generate unique device ID
  uint64_t chipid = ESP.getEfuseMac();
  deviceId = "BOOZE" + String((uint32_t)(chipid & 0xFFFFFF), HEX);
  deviceId.toUpperCase();
  apSSID = String(AP_SSID_PREFIX) + String((uint32_t)chipid, HEX);
  
  Serial.print("Device ID: ");
  Serial.println(deviceId);
  
  // Load persistent counters and settings
  preferences.begin("boozelens", false);
  photoNumber = preferences.getULong("photoNum", 0);
  bacNumber = preferences.getULong("bacNum", 0);
  userName = preferences.getString("userName", "Anonymous");
  userEmail = preferences.getString("userEmail", "");
  Serial.printf("Photo counter: %lu, BAC counter: %lu\n", photoNumber, bacNumber);
  
  // Initialize I2C
  Wire.begin(SDA_PIN, SCL_PIN);
  delay(100);
  
  // Initialize Display
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED at 0x3C failed, trying 0x3D");
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
      Serial.println("OLED initialization failed!");
    }
  }
  
  showBootScreen();
  
  // Initialize Hardware
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(MQ3_PIN, INPUT);
  
  // Initialize LEDs
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(30);
  setAllLeds(CRGB::Blue);
  
  // Initialize SD Card
  updateStatus("Init SD Card...");
  initSDCard();
  
  // Initialize Camera
  updateStatus("Init Camera...");
  initCamera();
  
  // Calibrate MQ3
  updateStatus("Calibrate Sensor...");
  calibrateMQ3();
  
  // Try to connect to saved WiFi
  updateStatus("Check WiFi...");
  connectToSavedWiFi();
  
  // Ready
  playTone(1000, 100);
  playTone(1500, 100);
  setAllLeds(CRGB::Green);
  delay(500);
  setAllLeds(CRGB::Black);
  
  showCameraMode();
}

void showBootScreen() {
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(2);
  display.setCursor(10, 15);
  display.print("BoozeLens");
  display.setTextSize(1);
  display.setCursor(30, 40);
  display.print("Starting...");
  display.display();
}

void updateStatus(const char* msg) {
  display.fillRect(0, 50, 128, 14, BLACK);
  display.setCursor(0, 54);
  display.setTextSize(1);
  display.print(msg);
  display.display();
  Serial.println(msg);
}

void initSDCard() {
  SD_MMC.end();
  delay(100);
  
  SD_MMC.setPins(SD_MMC_CLK, SD_MMC_CMD, SD_MMC_D0);
  
  if (!SD_MMC.begin("/sdcard", true, false, SDMMC_FREQ_DEFAULT, 5)) {
    Serial.println("SD Card mount failed!");
    sdReady = false;
    return;
  }
  
  uint8_t cardType = SD_MMC.cardType();
  if(cardType == CARD_NONE) {
    Serial.println("No SD card attached");
    sdReady = false;
    return;
  }
  
  sdReady = true;
  uint64_t cardSize = SD_MMC.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);
  
  // DO NOT CREATE FOLDERS - User must create them manually
  Serial.println("IMPORTANT: Manually create these folders on SD card:");
  Serial.println("  /photos");
  Serial.println("  /bac");
}

bool initCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.grab_mode = CAMERA_GRAB_LATEST;
  
  // Use PSRAM if available, otherwise use internal RAM
  if(psramFound()){
    config.frame_size = FRAMESIZE_UXGA;  // 1600x1200 - max quality for party photos!
    config.jpeg_quality = 8;             // Higher quality (lower number = better)
    config.fb_count = 2;
    config.fb_location = CAMERA_FB_IN_PSRAM;
  } else {
    config.frame_size = FRAMESIZE_SVGA;  // 800x600 fallback
    config.jpeg_quality = 10;
    config.fb_count = 1;
    config.fb_location = CAMERA_FB_IN_DRAM;
  }
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed: 0x%x\n", err);
    cameraReady = false;
    return false;
  }
  
  // Configure sensor for party photos - vibrant and sharp!
  sensor_t * s = esp_camera_sensor_get();
  s->set_brightness(s, 1);      // Slightly brighter for indoor parties
  s->set_contrast(s, 1);        // More contrast for pop
  s->set_saturation(s, 1);      // Vibrant colors for party mood
  s->set_special_effect(s, 0);  // No effect (retro filter on website later)
  s->set_whitebal(s, 1);        // Auto white balance on
  s->set_awb_gain(s, 1);        // Auto white balance gain on
  s->set_wb_mode(s, 0);         // Auto mode
  s->set_exposure_ctrl(s, 1);   // Auto exposure on
  s->set_aec2(s, 1);            // AEC DSP on
  s->set_gain_ctrl(s, 1);       // Auto gain on
  s->set_agc_gain(s, 6);        // Moderate gain for low light
  s->set_gainceiling(s, (gainceiling_t)6);  // Allow higher gain in dark
  s->set_bpc(s, 1);             // Black pixel correction on
  s->set_wpc(s, 1);             // White pixel correction on
  s->set_raw_gma(s, 1);         // Gamma correction on
  s->set_lenc(s, 1);            // Lens correction on
  s->set_hmirror(s, 0);         // No horizontal mirror
  s->set_vflip(s, 0);           // No vertical flip
  s->set_dcw(s, 1);             // DCW on for better quality
  
  cameraReady = true;
  Serial.println("Camera initialized successfully");
  return true;
}

void calibrateMQ3() {
  long sum = 0;
  for(int i = 0; i < 20; i++) {
    sum += analogRead(MQ3_PIN);
    delay(10);
  }
  mq3Baseline = sum / 20;
  Serial.printf("MQ3 Baseline: %d\n", mq3Baseline);
}

void showCameraMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("CAMERA MODE");
  if(flashEnabled) {
    display.print(" [FLASH]");
  }
  display.drawLine(0, 9, 128, 9, WHITE);
  
  // Clear instructions
  display.setCursor(0, 16);
  display.println("BTN1: Take Photo");
  display.println("BTN2: Toggle Flash");
  display.println("Hold BTN1: Next Mode");
  
  // Status
  display.drawLine(0, 42, 128, 42, WHITE);
  display.setCursor(0, 48);
  display.print("Photos: ");
  display.print(photoNumber);
  
  if(!sdReady) {
    display.setCursor(70, 48);
    display.print("[NO SD]");
  }
  
  display.setCursor(0, 56);
  if(wifiConnected) {
    display.print("WiFi OK");
  } else {
    display.print("Offline");
  }
  display.setCursor(70, 56);
  display.print("Hold BTN2:WiFi");
  
  display.display();
}

void showAlcoholMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("ALCOHOL TEST");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 16);
  display.println("BTN1: Start Test");
  display.println("BTN2: Calibrate");
  display.println("Hold BTN1: Next Mode");
  
  display.drawLine(0, 42, 128, 42, WHITE);
  display.setCursor(0, 48);
  display.print("Tests: ");
  display.print(bacNumber);
  display.setCursor(0, 56);
  display.print("Baseline: ");
  display.print(mq3Baseline);
  
  display.display();
}

void showInfoMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print("SYSTEM INFO");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 16);
  display.print("Camera: ");
  display.println(cameraReady ? "OK" : "FAIL");
  display.print("SD Card: ");
  display.println(sdReady ? "OK" : "FAIL");
  display.print("Uptime: ");
  display.print(millis() / 60000);
  display.println(" min");
  
  if(sdReady) {
    display.print("SD Free: ");
    uint64_t freeBytes = SD_MMC.totalBytes() - SD_MMC.usedBytes();
    display.print(freeBytes / 1024 / 1024);
    display.println(" MB");
  }
  
  display.setCursor(0, 56);
  display.print("Hold BTN1: Back");
  
  display.display();
}

void loop() {
  static unsigned long lastButton1 = 0;
  static unsigned long lastButton2 = 0;
  static bool button1Held = false;
  static bool button2Held = false;
  
  // Handle WiFi setup mode
  if(currentMode == MODE_WIFI_SETUP) {
    dnsServer.processNextRequest();
    server.handleClient();
    displayWiFiSetup();
    delay(10);
    return;
  }
  
  // Button 1 handling
  if(digitalRead(BUTTON1_PIN) == LOW) {
    if(lastButton1 == 0) {
      lastButton1 = millis();
    }
    
    // Check for long press (2 seconds)
    if(!button1Held && (millis() - lastButton1 > 2000)) {
      button1Held = true;
      playTone(500, 200);
      
      // Switch modes
      if(currentMode == MODE_CAMERA) {
        currentMode = MODE_ALCOHOL;
        showAlcoholMode();
      } else if(currentMode == MODE_ALCOHOL) {
        currentMode = MODE_INFO;
        showInfoMode();
      } else {
        currentMode = MODE_CAMERA;
        showCameraMode();
      }
    }
  } else {
    // Button released
    if(lastButton1 > 0 && !button1Held) {
      // Short press
      handleButton1Press();
    }
    lastButton1 = 0;
    button1Held = false;
  }
  
  // Button 2 handling with long press for WiFi setup
  if(digitalRead(BUTTON2_PIN) == LOW) {
    if(lastButton2 == 0) {
      lastButton2 = millis();
    }
    
    // Check for long press (3 seconds) for WiFi setup
    if(!button2Held && (millis() - lastButton2 > WIFI_SETUP_PRESS_TIME)) {
      button2Held = true;
      playTone(1000, 500);
      currentMode = MODE_WIFI_SETUP;
      startConfigPortal();
    }
  } else {
    // Button released
    if(lastButton2 > 0 && !button2Held) {
      // Short press
      handleButton2Press();
    }
    lastButton2 = 0;
    button2Held = false;
  }
  
  // Auto-check WiFi status (but don't auto-reconnect to avoid delays)
  static unsigned long lastWifiCheck = 0;
  if(millis() - lastWifiCheck > 10000) {  // Check every 10 seconds
    lastWifiCheck = millis();
    // Just update the status flag, don't try to reconnect
    if(WiFi.status() == WL_CONNECTED) {
      wifiConnected = true;
    } else {
      wifiConnected = false;
    }
  }
  
  delay(10);
}

void handleButton1Press() {
  playTone(1000, 50);
  
  switch(currentMode) {
    case MODE_CAMERA:
      takePhoto();
      break;
    case MODE_ALCOHOL:
      performAlcoholTest();
      break;
    case MODE_INFO:
      // No action on short press in info mode
      break;
  }
}

void handleButton2Press() {
  playTone(1500, 50);
  
  switch(currentMode) {
    case MODE_CAMERA:
      flashEnabled = !flashEnabled;
      showCameraMode();
      break;
    case MODE_ALCOHOL:
      calibrateMQ3();
      showAlcoholMode();
      break;
    case MODE_INFO:
      // No action
      break;
  }
}

void takePhoto() {
  if(!cameraReady) {
    showError("Camera not ready!");
    return;
  }
  
  // Clear any old buffer
  camera_fb_t * fb = esp_camera_fb_get();
  if(fb) {
    esp_camera_fb_return(fb);
    fb = NULL;
  }
  
  // Countdown
  for(int i = 3; i > 0; i--) {
    display.clearDisplay();
    display.setTextSize(4);
    display.setCursor(50, 16);
    display.print(i);
    display.display();
    
    playTone(800, 100);
    setAllLeds(CRGB::Blue);
    delay(700);
    setAllLeds(CRGB::Black);
    delay(200);
  }
  
  // Flash if enabled
  if(flashEnabled) {
    fill_solid(leds, NUM_LEDS, CRGB::White);
    FastLED.setBrightness(255);
    FastLED.show();
  }
  
  // Capture
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(20, 20);
  display.print("CAPTURE!");
  display.display();
  
  playTone(2000, 100);
  fb = esp_camera_fb_get();
  
  // Turn off flash
  if(flashEnabled) {
    FastLED.setBrightness(30);
    setAllLeds(CRGB::Black);
  }
  
  if (!fb) {
    showError("Capture failed!");
    return;
  }
  
  // Save to SD if available
  bool saved = false;
  if(sdReady) {
    // Generate unique filename using persistent counter
    char filename[32];
    sprintf(filename, "/photos/IMG_%06lu.jpg", photoNumber);
    
    File file = SD_MMC.open(filename, FILE_WRITE);
    if(file) {
      size_t written = file.write(fb->buf, fb->len);
      file.close();
      
      if(written == fb->len) {
        saved = true;
        photoNumber++;
        preferences.putULong("photoNum", photoNumber);
        Serial.printf("Photo saved: %s (%d bytes)\n", filename, fb->len);
        
        // Send metadata to Firebase
        sendPhotoMetadataToFirebase(filename, fb->len);
      }
    }
  }
  
  // Store size before returning buffer
  size_t photoSize = fb->len;
  
  // Always return buffer
  esp_camera_fb_return(fb);
  
  // Show result
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 20);
  if(saved) {
    display.println("Photo Saved!");
    display.print("Size: ");
    display.print(photoSize / 1024);
    display.println(" KB");
    display.print("Total: ");
    display.print(photoNumber);
    setAllLeds(CRGB::Green);
    playTone(1500, 200);
  } else {
    display.println("Save Failed!");
    if(!sdReady) {
      display.println("No SD Card");
      display.println("");
      display.println("Insert SD with:");
      display.println("  /photos folder");
      display.println("  /bac folder");
    }
    setAllLeds(CRGB::Red);
    playTone(500, 500);
  }
  display.display();
  
  delay(2000);
  setAllLeds(CRGB::Black);
  showCameraMode();
}

void performAlcoholTest() {
  // Warmup phase
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(20, 0);
  display.println("SENSOR WARMUP");
  display.drawLine(0, 10, 128, 10, WHITE);
  
  for(int i = 5; i > 0; i--) {
    display.fillRect(40, 20, 50, 30, BLACK);
    display.setTextSize(3);
    display.setCursor(50, 22);
    display.print(i);
    display.display();
    
    // Warming animation
    int ledIndex = (5 - i) % NUM_LEDS;
    leds[ledIndex] = CRGB::Orange;
    FastLED.show();
    
    playTone(600 + (i * 100), 50);
    delay(1000);
  }
  
  // Ready to blow
  setAllLeds(CRGB::Green);
  playTone(1000, 500);
  
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(10, 10);
  display.println("BLOW NOW!");
  display.setTextSize(1);
  display.setCursor(15, 40);
  display.println("Press any button");
  display.setCursor(25, 50);
  display.println("when done");
  display.display();
  
  // Measure
  int maxReading = mq3Baseline;
  unsigned long startTime = millis();
  bool measuring = true;
  
  while(measuring) {
    int reading = analogRead(MQ3_PIN);
    if(reading > maxReading) {
      maxReading = reading;
    }
    
    // Breathing LED effect
    int brightness = 50 + (sin(millis() / 200.0) * 30);
    FastLED.setBrightness(brightness);
    FastLED.show();
    
    // Check for button or timeout
    if(digitalRead(BUTTON1_PIN) == LOW || 
       digitalRead(BUTTON2_PIN) == LOW ||
       millis() - startTime > 8000) {
      measuring = false;
    }
    
    delay(50);
  }
  
  // Calculate result
  float ratio = (float)(maxReading - mq3Baseline) / mq3Baseline;
  float bacEstimate = ratio * 3.0;  // Simplified conversion
  if(bacEstimate < 0) bacEstimate = 0;
  if(bacEstimate > 5) bacEstimate = 5;
  
  // Save result if SD ready
  if(sdReady) {
    char filename[32];
    sprintf(filename, "/bac/TEST_%06lu.txt", bacNumber);
    
    File file = SD_MMC.open(filename, FILE_WRITE);
    if(file) {
      file.printf("BAC Test Result\n");
      file.printf("Timestamp: %lu\n", millis());
      file.printf("Baseline: %d\n", mq3Baseline);
      file.printf("Max Reading: %d\n", maxReading);
      file.printf("Estimated BAC: %.2f\n", bacEstimate);
      file.close();
      bacNumber++;
      preferences.putULong("bacNum", bacNumber);
    }
  }
  
  // Send to Firebase
  sendBACToFirebase(bacEstimate);
  
  // Display result
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(35, 0);
  display.println("RESULT");
  display.drawLine(0, 10, 128, 10, WHITE);
  
  display.setTextSize(3);
  display.setCursor(15, 20);
  display.print(bacEstimate, 1);
  display.setTextSize(1);
  display.print(" o/oo");
  
  display.setCursor(30, 52);
  if(bacEstimate < 0.5) {
    display.print("SAFE");
    setAllLeds(CRGB::Green);
    playTone(1000, 200);
  } else if(bacEstimate < 0.8) {
    display.print("CAUTION");
    setAllLeds(CRGB::Yellow);
    playTone(800, 300);
    delay(200);
    playTone(800, 300);
  } else {
    display.print("DANGER!");
    setAllLeds(CRGB::Red);
    for(int i = 0; i < 5; i++) {
      playTone(2000, 200);
      delay(100);
    }
  }
  
  display.display();
  FastLED.setBrightness(100);
  FastLED.show();
  
  delay(4000);
  
  FastLED.setBrightness(30);
  setAllLeds(CRGB::Black);
  showAlcoholMode();
}

void showError(const char* msg) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.println("ERROR:");
  display.println(msg);
  display.display();
  
  setAllLeds(CRGB::Red);
  for(int i = 0; i < 3; i++) {
    playTone(500, 100);
    delay(150);
  }
  
  delay(2000);
  setAllLeds(CRGB::Black);
}

void playTone(int freq, int duration) {
  tone(BUZZER_PIN, freq, duration);
}

void setAllLeds(CRGB color) {
  fill_solid(leds, NUM_LEDS, color);
  FastLED.show();
}

// WiFi Configuration Portal HTML
const char configPage[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
<head>
    <title>BoozeLens WiFi Setup</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            max-width: 400px;
            width: 100%;
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
        }
        .device-id {
            background: rgba(0,255,136,0.2);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0;
            font-family: monospace;
        }
        input, button {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
        input {
            background: rgba(255,255,255,0.9);
            color: #333;
        }
        button {
            background: #00ff88;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            background: #00cc6a;
            transform: translateY(-2px);
        }
        .networks {
            max-height: 200px;
            overflow-y: auto;
            margin: 15px 0;
            background: rgba(255,255,255,0.1);
            border-radius: 5px;
            padding: 10px;
        }
        .network-item {
            padding: 8px;
            cursor: pointer;
            border-radius: 3px;
            margin: 5px 0;
            transition: background 0.3s;
        }
        .network-item:hover {
            background: rgba(255,255,255,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍺 BoozeLens Setup</h1>
        <div class="device-id">Device: %DEVICE_ID%</div>
        <form action="/save" method="POST">
            <h3>WiFi Configuration</h3>
            <div id="networks" class="networks">
                <div style="text-align: center; opacity: 0.7;">Scanning networks...</div>
            </div>
            <input type="text" name="ssid" id="ssid" placeholder="WiFi Network Name" required>
            <input type="password" name="pass" placeholder="WiFi Password" required>
            <h3>User Info (Optional)</h3>
            <input type="text" name="name" placeholder="Your Name">
            <input type="email" name="email" placeholder="Your Email">
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
            .catch(err => {
                console.error('Scan failed:', err);
            });
    </script>
</body>
</html>
)=====";

// WiFi and Firebase Functions
void connectToSavedWiFi() {
  String ssid = preferences.getString("wifi_ssid", "");
  String pass = preferences.getString("wifi_pass", "");
  userName = preferences.getString("userName", "Anonymous");
  userEmail = preferences.getString("userEmail", "");
  
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
    Serial.println("\nWiFi Connected!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    wifiConnected = false;
    Serial.println("\nWiFi connection failed");
  }
}

void startConfigPortal() {
  Serial.println("Starting WiFi configuration portal...");
  
  // Disconnect any existing connection
  WiFi.disconnect(true);
  delay(100);
  
  // Start Access Point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(apSSID.c_str(), AP_PASS);
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP: ");
  Serial.println(IP);
  Serial.print("AP SSID: ");
  Serial.println(apSSID);
  
  // Start DNS server for captive portal
  dnsServer.start(DNS_PORT, "*", IP);
  
  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.on("/scan", HTTP_GET, handleScan);
  server.onNotFound(handleRoot);
  
  server.begin();
  Serial.println("Configuration portal started");
}

void stopConfigPortal() {
  server.stop();
  dnsServer.stop();
  WiFi.softAPdisconnect(true);
  WiFi.mode(WIFI_STA);
  currentMode = MODE_CAMERA;
  showCameraMode();
}

void handleRoot() {
  String html = String(configPage);
  html.replace("%DEVICE_ID%", deviceId);
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
  
  // Save credentials
  preferences.putString("wifi_ssid", ssid);
  preferences.putString("wifi_pass", pass);
  preferences.putString("userName", name.length() > 0 ? name : "Anonymous");
  preferences.putString("userEmail", email);
  
  // Send success page
  server.send(200, "text/html", "<html><body><h1>Settings Saved!</h1><p>Device will restart...</p></body></html>");
  
  delay(2000);
  ESP.restart();
}

void displayWiFiSetup() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== WiFi SETUP ===");
  display.println("");
  display.println("Connect to WiFi:");
  display.println(apSSID);
  display.println("");
  display.println("Password: 12345678");
  display.println("");
  display.println("Open: 192.168.4.1");
  display.display();
}

void sendBACToFirebase(float bacValue) {
  // Double-check WiFi is actually connected
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("No WiFi - BAC saved locally only");
    wifiConnected = false;
    return;
  }
  
  HTTPClient http;
  http.setTimeout(2000);  // 2 second timeout instead of default
  
  String url = "https://" + String(firebaseHost) + "/readings/" + deviceId + ".json?auth=" + String(firebaseAuth);
  
  StaticJsonDocument<256> doc;
  JsonObject bacData = doc.createNestedObject("bac_" + String(bacNumber));
  bacData["value"] = bacValue;
  bacData["device"] = deviceId;
  bacData["user"] = userName;
  bacData["email"] = userEmail;
  bacData["timestamp"] = millis();
  bacData["type"] = "bac_test";
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.print("Uploading BAC to Firebase... ");
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PATCH(jsonString);  // Use PATCH to append data
  
  if(httpCode == 200) {
    Serial.println("Success!");
  } else {
    Serial.printf("Failed (code: %d)\n", httpCode);
  }
  
  http.end();
}

void sendPhotoMetadataToFirebase(const char* filename, size_t fileSize) {
  // Double-check WiFi is actually connected
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("No WiFi - Photo metadata not uploaded");
    wifiConnected = false;
    return;
  }
  
  HTTPClient http;
  http.setTimeout(2000);  // 2 second timeout instead of default
  
  String url = "https://" + String(firebaseHost) + "/readings/" + deviceId + ".json?auth=" + String(firebaseAuth);
  
  StaticJsonDocument<256> doc;
  JsonObject photoData = doc.createNestedObject("photo_" + String(photoNumber));
  photoData["filename"] = filename;
  photoData["size"] = fileSize;
  photoData["device"] = deviceId;
  photoData["user"] = userName;
  photoData["email"] = userEmail;
  photoData["timestamp"] = millis();
  photoData["type"] = "photo_metadata";
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.print("Uploading photo metadata... ");
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PATCH(jsonString);  // Use PATCH to append data
  
  if(httpCode == 200) {
    Serial.println("Success!");
  } else {
    Serial.printf("Failed (code: %d)\n", httpCode);
  }
  
  http.end();
}