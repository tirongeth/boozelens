// boozelens_complete_fixed.ino
// Industrial-grade party safety and entertainment device
// Version 1.1 - Memory optimized

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <FastLED.h>
#include "esp_camera.h"
#include "FS.h"
#include "SD_MMC.h"
#include <Preferences.h>

// Pin Definitions
#define SDA_PIN 21
#define SCL_PIN 47
#define BUTTON1_PIN 1
#define BUTTON2_PIN 2
#define BUZZER_PIN 14
#define LED_PIN 48
#define MQ3_PIN 3
#define NUM_LEDS 8

// SD Card Pins (Freenove specific)
#define SD_MMC_CMD 38
#define SD_MMC_CLK 39
#define SD_MMC_D0  40

// Camera Pins (Freenove FNK0085)
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

// Global Variables
int pictureNumber = 0;
int bacTestNumber = 0;
float lastBAC = 0.0;
bool sdReady = false;
bool cameraReady = false;
bool mq3Ready = false;
int mq3Baseline = 2048;
unsigned long lastActivity = 0;
const unsigned long SCREEN_TIMEOUT = 30000; // 30 seconds

// Menu states
enum MenuState {
  MAIN_MENU,
  CAMERA_MODE,
  BAC_MODE,
  SETTINGS_MODE,
  GALLERY_MODE
};
MenuState currentMenu = MAIN_MENU;

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Memory optimization
  esp_camera_fb_get(); // Dummy call
  
  Serial.println("\n=== BoozeLens Starting ===");
  Serial.println("Industrial Party Safety Device v1.1");
  
  // Initialize storage
  preferences.begin("boozelens", false);
  pictureNumber = preferences.getInt("picNum", 0);
  bacTestNumber = preferences.getInt("bacNum", 0);
  
  // Initialize I2C
  Wire.begin(SDA_PIN, SCL_PIN);
  delay(100);
  
  // Initialize display
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED Failed - trying 0x3D");
    display.begin(SSD1306_SWITCHCAPVCC, 0x3D);
  }
  
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(2);
  display.setCursor(10, 10);
  display.println("BoozeLens");
  display.setTextSize(1);
  display.setCursor(25, 35);
  display.println("Initializing...");
  display.display();
  
  // Initialize pins
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(MQ3_PIN, INPUT);
  
  // Initialize LEDs
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(50);
  
  // Startup animation
  startupSequence();
  
  // Initialize SD Card with better error handling
display.setCursor(0, 45);
display.print("SD Card...");
display.display();

// Clear any previous SD state
SD_MMC.end();
delay(100);

SD_MMC.setPins(SD_MMC_CLK, SD_MMC_CMD, SD_MMC_D0);
if (!SD_MMC.begin("/sdcard", true, false, SDMMC_FREQ_DEFAULT, 5)) {
  Serial.println("SD Card Mount Failed");
  display.println(" FAIL");
  sdReady = false;
} else {
  sdReady = true;
  
  // Check card type
  uint8_t cardType = SD_MMC.cardType();
  if(cardType == CARD_NONE) {
    Serial.println("No SD card!");
    sdReady = false;
  } else {
    uint64_t cardSize = SD_MMC.cardSize() / (1024 * 1024);
    Serial.printf("SD Card OK: %lluMB\n", cardSize);
    display.println(" OK!");
    
    // Clean up any corrupt files
    File root = SD_MMC.open("/");
    File file = root.openNextFile();
    while(file) {
      String name = file.name();
      // Delete any files with weird names or 0 size
      if(name.indexOf("�") >= 0 || file.size() == 0 || file.size() > 10000000) {
        Serial.printf("Deleting corrupt file: %s (%d bytes)\n", name.c_str(), file.size());
        SD_MMC.remove(file.path());
      }
      file = root.openNextFile();
    }
    
    // Create directories
    SD_MMC.mkdir("/photos");
    SD_MMC.mkdir("/bac_tests");
  }
}
display.display();
delay(500);
  
  // Initialize Camera
  display.setCursor(0, 55);
  display.print("Camera...");
  display.display();
  
  if(initCamera()) {
    cameraReady = true;
    display.println(" OK!");
  } else {
    display.println(" FAIL");
  }
  display.display();
  delay(500);
  
  // Initialize MQ-3
  mq3Baseline = analogRead(MQ3_PIN);
  mq3Ready = true;
  
  // Success
  tone(BUZZER_PIN, 1000, 200);
  delay(300);
  tone(BUZZER_PIN, 1500, 200);
  
  delay(1000);
  showMainMenu();
  lastActivity = millis();
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
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  // Memory optimized settings
  if(psramFound()){
    config.frame_size = FRAMESIZE_SVGA;  // 800x600 instead of UXGA
    config.jpeg_quality = 12;
    config.fb_count = 1;                 // Single buffer
  } else {
    config.frame_size = FRAMESIZE_VGA;   // 640x480
    config.jpeg_quality = 15;
    config.fb_count = 1;
  }
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed: 0x%x\n", err);
    return false;
  }
  
  // Camera settings
  sensor_t * s = esp_camera_sensor_get();
  s->set_brightness(s, 0);
  s->set_contrast(s, 0);
  s->set_saturation(s, 0);
  s->set_special_effect(s, 0);
  s->set_whitebal(s, 1);
  s->set_awb_gain(s, 1);
  s->set_wb_mode(s, 0);
  s->set_exposure_ctrl(s, 1);
  s->set_aec2(s, 0);
  s->set_gain_ctrl(s, 1);
  s->set_agc_gain(s, 0);
  s->set_gainceiling(s, (gainceiling_t)0);
  s->set_bpc(s, 0);
  s->set_wpc(s, 1);
  s->set_raw_gma(s, 1);
  s->set_lenc(s, 1);
  s->set_hmirror(s, 0);
  s->set_vflip(s, 0);
  s->set_dcw(s, 1);
  s->set_colorbar(s, 0);
  
  return true;
}

void startupSequence() {
  // LED startup animation
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Blue;
    FastLED.show();
    tone(BUZZER_PIN, 500 + (i * 100), 30);
    delay(50);
  }
  
  // Flash
  fill_solid(leds, NUM_LEDS, CRGB::White);
  FastLED.setBrightness(100);
  FastLED.show();
  delay(100);
  
  // Fade out
  for(int brightness = 100; brightness >= 0; brightness -= 5) {
    FastLED.setBrightness(brightness);
    FastLED.show();
    delay(10);
  }
  
  FastLED.clear();
  FastLED.setBrightness(50);
  FastLED.show();
}

void showMainMenu() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== BOOZELENS ===");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 15);
  display.println("1. Camera Mode");
  display.println("2. BAC Test");
  display.println("3. Gallery");
  display.println("4. Settings");
  
  // Status bar
  display.drawLine(0, 50, 128, 50, WHITE);
  display.setCursor(0, 54);
  display.print("Pic:");
  display.print(pictureNumber);
  display.print(" BAC:");
  display.print(bacTestNumber);
  
  if(!sdReady) display.print(" !SD");
  if(!cameraReady) display.print(" !CAM");
  
  display.display();
  currentMenu = MAIN_MENU;
}

void loop() {
  // Auto screen off
  if(millis() - lastActivity > SCREEN_TIMEOUT) {
    display.clearDisplay();
    display.display();
  }
  
  // Button handling
  if(digitalRead(BUTTON1_PIN) == LOW || digitalRead(BUTTON2_PIN) == LOW) {
    lastActivity = millis();
    
    // Wake screen if off
    if(millis() - lastActivity > SCREEN_TIMEOUT) {
      showMainMenu();
      delay(300);
      return;
    }
  }
  
  // Menu navigation
  switch(currentMenu) {
    case MAIN_MENU:
      handleMainMenu();
      break;
    case CAMERA_MODE:
      handleCameraMode();
      break;
    case BAC_MODE:
      handleBACMode();
      break;
    case GALLERY_MODE:
      handleGalleryMode();
      break;
    case SETTINGS_MODE:
      handleSettingsMode();
      break;
  }
}

void handleMainMenu() {
  static int menuSelection = 0;
  
  if(digitalRead(BUTTON1_PIN) == LOW) {
    menuSelection = (menuSelection + 1) % 4;
    
    // Update display with selection
    display.fillRect(0, 15, 10, 40, BLACK);
    display.setCursor(0, 15 + (menuSelection * 8));
    display.print(">");
    display.display();
    
    tone(BUZZER_PIN, 1000, 50);
    delay(200);
  }
  
  if(digitalRead(BUTTON2_PIN) == LOW) {
    tone(BUZZER_PIN, 1500, 100);
    
    switch(menuSelection) {
      case 0:
        if(cameraReady) {
          currentMenu = CAMERA_MODE;
          showCameraMode();
        } else {
          showError("Camera not ready!");
        }
        break;
      case 1:
        currentMenu = BAC_MODE;
        showBACMode();
        break;
      case 2:
        currentMenu = GALLERY_MODE;
        showGalleryMode();
        break;
      case 3:
        currentMenu = SETTINGS_MODE;
        showSettingsMode();
        break;
    }
    delay(300);
  }
}

void showCameraMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== CAMERA MODE ===");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 20);
  display.println("BTN1: Take Photo");
  display.println("BTN2: Flash Photo");
  display.println("");
  display.println("Hold BTN1: Exit");
  
  display.setCursor(0, 56);
  display.print("Photos: ");
  display.println(pictureNumber);
  
  display.display();
}

void handleCameraMode() {
  if(digitalRead(BUTTON1_PIN) == LOW) {
    unsigned long pressStart = millis();
    bool longPress = false;
    
    while(digitalRead(BUTTON1_PIN) == LOW) {
      if(millis() - pressStart > 2000) {
        longPress = true;
        break;
      }
    }
    
    if(longPress) {
      // Exit to main menu
      tone(BUZZER_PIN, 500, 200);
      showMainMenu();
      currentMenu = MAIN_MENU;
    } else {
      // Take photo without flash
      takePhoto(false);
    }
    delay(300);
  }
  
  if(digitalRead(BUTTON2_PIN) == LOW) {
    // Take photo with flash
    takePhoto(true);
    delay(300);
  }
}

void takePhoto(bool useFlash) {
  // IMPORTANT: Clear any existing camera buffer first
  camera_fb_t * fb = esp_camera_fb_get();
  if(fb) {
    esp_camera_fb_return(fb);
  }
  
  display.clearDisplay();
  
  // Countdown
  for(int i = 3; i > 0; i--) {
    display.clearDisplay();
    display.setTextSize(3);
    display.setCursor(55, 20);
    display.print(i);
    display.display();
    
    tone(BUZZER_PIN, 1000, 100);
    
    // Simple LED animation (less memory intensive)
    fill_solid(leds, NUM_LEDS, CRGB::Blue);
    FastLED.show();
    delay(900);
    FastLED.clear();
    FastLED.show();
    delay(100);
  }
  
  // "SMILE!"
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(20, 25);
  display.println("SMILE!");
  display.display();
  
  if(useFlash) {
    fill_solid(leds, NUM_LEDS, CRGB::White);
    FastLED.setBrightness(255);
    FastLED.show();
    delay(100);
  }
  
  // Capture with retry
  tone(BUZZER_PIN, 2000, 50);
  fb = esp_camera_fb_get();
  
  if(useFlash) {
    FastLED.setBrightness(50);
    FastLED.clear();
    FastLED.show();
  }
  
  if (!fb) {
    Serial.println("Camera capture failed - retrying");
    delay(100);
    fb = esp_camera_fb_get();
    
    if(!fb) {
      showError("Capture failed!");
      // Try to recover camera
      esp_camera_deinit();
      delay(100);
      initCamera();
      showCameraMode();
      return;
    }
  }
  
  // Save photo
  bool saved = false;
  if(sdReady && fb) {
    String filename = "/photos/IMG_" + String(pictureNumber) + ".jpg";
    
    // Use smaller write buffer to prevent memory issues
    File file = SD_MMC.open(filename, FILE_WRITE);
    
    if(file) {
      // Write in chunks to prevent memory issues
      size_t written = 0;
      size_t toWrite = fb->len;
      uint8_t * buf = fb->buf;
      
      while(written < toWrite) {
        size_t chunk = min((size_t)4096, toWrite - written);
        size_t result = file.write(buf + written, chunk);
        if(result != chunk) {
          Serial.println("Write error!");
          break;
        }
        written += chunk;
        yield(); // Let system breathe
      }
      
      file.close();
      
      if(written == toWrite) {
        saved = true;
        pictureNumber++;
        preferences.putInt("picNum", pictureNumber);
        
        // Success display
        display.clearDisplay();
        display.setTextSize(1);
        display.setCursor(0, 10);
        display.println("Photo Saved!");
        display.print("IMG_");
        display.print(pictureNumber - 1);
        display.println(".jpg");
        display.print("Size: ");
        display.print(fb->len / 1024);
        display.println(" KB");
        display.display();
        
        // Simple success indication
        fill_solid(leds, NUM_LEDS, CRGB::Green);
        FastLED.show();
        tone(BUZZER_PIN, 2000, 200);
        delay(1500);
        FastLED.clear();
        FastLED.show();
      }
    }
    
    if(!saved) {
      showError("Save failed!");
    }
  } else if(!sdReady) {
    showError("No SD Card!");
  }
  
  // CRITICAL: Always return the frame buffer!
  if(fb) {
    esp_camera_fb_return(fb);
    fb = NULL;
  }
  
  // Small delay to let system recover
  delay(100);
  
  showCameraMode();
}

void showBACMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== BAC TEST ===");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 20);
  display.println("BTN1: Start Test");
  display.println("BTN2: Calibrate");
  display.println("");
  display.println("Hold BTN1: Exit");
  
  display.setCursor(0, 48);
  display.print("Tests: ");
  display.println(bacTestNumber);
  display.print("Last: ");
  display.print(lastBAC, 1);
  display.println(" o/oo");
  
  display.display();
}

void handleBACMode() {
  if(digitalRead(BUTTON1_PIN) == LOW) {
    unsigned long pressStart = millis();
    bool longPress = false;
    
    while(digitalRead(BUTTON1_PIN) == LOW) {
      if(millis() - pressStart > 2000) {
        longPress = true;
        break;
      }
    }
    
    if(longPress) {
      tone(BUZZER_PIN, 500, 200);
      showMainMenu();
      currentMenu = MAIN_MENU;
    } else {
      performBACTest();
    }
    delay(300);
  }
  
  if(digitalRead(BUTTON2_PIN) == LOW) {
    calibrateMQ3();
    delay(300);
  }
}

void performBACTest() {
  // Warmup
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(20, 0);
  display.println("SENSOR WARMUP");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  for(int i = 10; i > 0; i--) {
    display.fillRect(0, 20, 128, 40, BLACK);
    display.setTextSize(3);
    display.setCursor(50, 25);
    display.print(i);
    display.setTextSize(1);
    display.display();
    
    // Animated warmup LEDs
    int led = (10 - i) % NUM_LEDS;
    for(int j = 0; j < NUM_LEDS; j++) {
      leds[j] = (j == led) ? CRGB::Orange : CRGB(20, 5, 0);
    }
    FastLED.show();
    
    tone(BUZZER_PIN, 500 + (i * 50), 50);
    delay(1000);
  }
  
  // Ready
  fill_solid(leds, NUM_LEDS, CRGB::Green);
  FastLED.show();
  tone(BUZZER_PIN, 1000, 500);
  
  // Get baseline
  int baseline = 0;
  for(int i = 0; i < 10; i++) {
    baseline += analogRead(MQ3_PIN);
    delay(10);
  }
  baseline /= 10;
  
  // Countdown to blow
  for(int i = 3; i > 0; i--) {
    display.clearDisplay();
    display.setTextSize(3);
    display.setCursor(55, 20);
    display.print(i);
    display.display();
    
    // Circle animation
    for(int j = 0; j < NUM_LEDS; j++) {
      leds[j] = CRGB::Blue;
      FastLED.show();
      delay(50);
      leds[j] = CRGB::Black;
    }
    
    tone(BUZZER_PIN, 800, 100);
  }
  
  // BLOW NOW!
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(5, 10);
  display.println("BLOW NOW!");
  display.setTextSize(1);
  display.setCursor(15, 40);
  display.println("Press any button");
  display.setCursor(30, 50);
  display.println("when done");
  display.display();
  
  // Flash LEDs
  fill_solid(leds, NUM_LEDS, CRGB::White);
  FastLED.setBrightness(150);
  FastLED.show();
  tone(BUZZER_PIN, 1500, 300);
  
  // Measurement
  float maxBAC = 0.0;
  int maxReading = baseline;
  bool measuring = true;
  unsigned long measureStart = millis();
  
  while(measuring) {
    int sensorValue = analogRead(MQ3_PIN);
    
    if(sensorValue > maxReading) {
      maxReading = sensorValue;
      
      // Calculate BAC
      float delta = (float)(maxReading - baseline);
      maxBAC = (delta / baseline) * 5.0;
      if(maxBAC > 5.0) maxBAC = 5.0;
      if(maxBAC < 0.0) maxBAC = 0.0;
    }
    
    // Live display
    display.fillRect(0, 20, 128, 30, BLACK);
    display.setTextSize(2);
    display.setCursor(20, 25);
    display.print(maxBAC, 1);
    display.setTextSize(1);
    display.print(" o/oo");
    display.display();
    
    // Breathing LED effect
    int brightness = 100 + (sin(millis() / 200.0) * 50);
    FastLED.setBrightness(brightness);
    FastLED.show();
    
    // Check for button press or timeout
    if(digitalRead(BUTTON1_PIN) == LOW || 
       digitalRead(BUTTON2_PIN) == LOW ||
       millis() - measureStart > 10000) {
      measuring = false;
    }
    
    delay(50);
  }
  
  // Save result
  lastBAC = maxBAC;
  bacTestNumber++;
  preferences.putInt("bacNum", bacTestNumber);
  
  // Save to file if SD ready
  if(sdReady) {
    String filename = "/bac_tests/test_" + String(bacTestNumber - 1) + ".txt";
    File file = SD_MMC.open(filename, FILE_WRITE);
    if(file) {
      file.print("BAC Test #");
      file.println(bacTestNumber - 1);
      file.print("Result: ");
      file.print(maxBAC, 2);
      file.println(" o/oo");
      file.print("Raw: ");
      file.println(maxReading);
      file.print("Baseline: ");
      file.println(baseline);
      file.close();
    }
  }
  
  // Show result
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(35, 0);
  display.println("RESULT");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  // Large BAC display
  display.setTextSize(3);
  display.setCursor(10, 20);
  display.print(maxBAC, 1);
  display.setTextSize(1);
  display.print(" o/oo");
  
  // Status
  display.setCursor(30, 50);
  if(maxBAC < 0.5) {
    display.println("SAFE");
    fill_solid(leds, NUM_LEDS, CRGB::Green);
  } else if(maxBAC < 0.8) {
    display.println("CAUTION");
    fill_solid(leds, NUM_LEDS, CRGB::Yellow);
  } else {
    display.println("DANGER");
    fill_solid(leds, NUM_LEDS, CRGB::Red);
  }
  
  FastLED.setBrightness(100);
  FastLED.show();
  display.display();
  
  // Result tone
  if(maxBAC < 0.5) {
    tone(BUZZER_PIN, 1000, 200);
  } else {
    for(int i = 0; i < 3; i++) {
      tone(BUZZER_PIN, 2000, 200);
      delay(300);
    }
  }
  
  delay(5000);
  
  FastLED.clear();
  FastLED.setBrightness(50);
  FastLED.show();
  
  showBACMode();
}

void calibrateMQ3() {
  display.clearDisplay();
  display.setCursor(0, 10);
  display.println("Calibrating...");
  display.println("Ensure clean air");
  display.display();
  
  long sum = 0;
  for(int i = 0; i < 50; i++) {
    sum += analogRead(MQ3_PIN);
    
    // Progress bar
    display.fillRect(10, 40, i * 2, 10, WHITE);
    display.display();
    delay(20);
  }
  
  mq3Baseline = sum / 50;
  
  display.clearDisplay();
  display.setCursor(0, 20);
  display.println("Calibrated!");
  display.print("Baseline: ");
  display.println(mq3Baseline);
  display.display();
  
  tone(BUZZER_PIN, 1500, 500);
  delay(2000);
}

void showGalleryMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== GALLERY ===");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 20);
  display.print("Photos: ");
  display.println(pictureNumber);
  display.print("BAC Tests: ");
  display.println(bacTestNumber);
  
  if(sdReady) {
    File root = SD_MMC.open("/photos");
    int count = 0;
    if(root) {
      File file = root.openNextFile();
      while(file) {
        count++;
        file = root.openNextFile();
      }
    }
    display.print("Files on SD: ");
    display.println(count);
  }
  
  display.setCursor(0, 55);
  display.println("BTN1: Back");
  display.display();
}

void handleGalleryMode() {
  if(digitalRead(BUTTON1_PIN) == LOW) {
    tone(BUZZER_PIN, 1000, 50);
    showMainMenu();
    currentMenu = MAIN_MENU;
    delay(300);
  }
}

void showSettingsMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== SETTINGS ===");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 15);
  display.println("1. Reset counters");
  display.println("2. Format SD");
  display.println("3. System info");
  display.println("4. Back");
  
  display.display();
}

void handleSettingsMode() {
  static int settingSelection = 0;
  
  if(digitalRead(BUTTON1_PIN) == LOW) {
    settingSelection = (settingSelection + 1) % 4;
    
    display.fillRect(0, 15, 10, 40, BLACK);
    display.setCursor(0, 15 + (settingSelection * 8));
    display.print(">");
    display.display();
    
    tone(BUZZER_PIN, 1000, 50);
    delay(200);
  }
  
  if(digitalRead(BUTTON2_PIN) == LOW) {
    tone(BUZZER_PIN, 1500, 100);
    
    switch(settingSelection) {
      case 0: // Reset counters
        pictureNumber = 0;
        bacTestNumber = 0;
        preferences.putInt("picNum", 0);
        preferences.putInt("bacNum", 0);
        showMessage("Counters Reset!");
        break;
        
      case 1: // Format SD
        showMessage("Not implemented");
        break;
        
      case 2: // System info
        showSystemInfo();
        break;
        
      case 3: // Back
        showMainMenu();
        currentMenu = MAIN_MENU;
        break;
    }
    delay(300);
  }
}

void showSystemInfo() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== SYSTEM INFO ===");
  display.drawLine(0, 9, 128, 9, WHITE);
  
  display.setCursor(0, 15);
  display.print("Chip: ");
  display.println(ESP.getChipModel());
  display.print("PSRAM: ");
  display.print(ESP.getPsramSize() / 1024 / 1024);
  display.println(" MB");
  display.print("Flash: ");
  display.print(ESP.getFlashChipSize() / 1024 / 1024);
  display.println(" MB");
  
  if(sdReady) {
    display.print("SD: ");
    display.print(SD_MMC.totalBytes() / 1024 / 1024);
    display.print("/");
    display.print(SD_MMC.usedBytes() / 1024 / 1024);
    display.println(" MB");
  }
  
  display.setCursor(0, 55);
  display.println("BTN1: Back");
  display.display();
  
  while(digitalRead(BUTTON1_PIN) == HIGH) {
    delay(10);
  }
  
  showSettingsMode();
}

void showError(String message) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.println("ERROR:");
  display.println(message);
  display.display();
  
  fill_solid(leds, NUM_LEDS, CRGB::Red);
  FastLED.show();
  
  for(int i = 0; i < 3; i++) {
    tone(BUZZER_PIN, 500, 100);
    delay(200);
  }
  
  delay(2000);
  FastLED.clear();
  FastLED.show();
}

void showMessage(String message) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 25);
  display.println(message);
  display.display();
  
  tone(BUZZER_PIN, 1000, 200);
  delay(2000);
}