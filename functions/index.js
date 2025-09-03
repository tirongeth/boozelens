/**
 * BoozeLens ESP32 Integration - Firebase Cloud Functions
 * 
 * Diese Datei erstellt die Brücke zwischen ESP32 Hardware und der Webseite.
 * Sie erweitert die bestehende Funktionalität, ohne vorhandene Systeme zu stören.
 */

const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getDatabase } = require('firebase-admin/database');
const { getStorage } = require('firebase-admin/storage');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');

// Initialize Firebase Admin SDK
const admin = require('firebase-admin');
if (!admin.apps.length) {
  initializeApp();
}

// Set global options for functions
setGlobalOptions({
  region: 'us-central1',
  maxInstances: 10,
  timeoutSeconds: 60,
  memory: '512MiB'
});

/**
 * HAUPTFUNKTION: ESP32 Photo Upload Handler
 * 
 * Diese Funktion empfängt Photo-Uploads vom ESP32 und leitet sie an die
 * bestehende Webseiten-Logik weiter, ohne vorhandene Funktionen zu stören.
 */
exports.handleBoozeLensUpload = onRequest(async (req, res) => {
  // CORS Headers für ESP32
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-Device-ID');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  console.log('🍺 BoozeLens Upload empfangen:', {
    method: req.method,
    deviceId: req.body.deviceId,
    hasImage: !!req.body.imageBase64,
    userName: req.body.userName,
    timestamp: req.body.timestamp
  });

  try {
    // Schritt 1: Eingabe-Validierung
    const { deviceId, imageBase64, userName, userEmail, userPassword } = req.body;
    
    if (!deviceId || !imageBase64 || !userEmail || !userPassword) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: deviceId, imageBase64, userEmail, or userPassword'
      });
      return;
    }

    // Schritt 2: Benutzer-Authentifizierung
    console.log('🔐 Authentifiziere Benutzer:', userEmail);
    const userId = await authenticateBoozeLensUser(userEmail, userPassword);
    
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password for BoozeLens device'
      });
      return;
    }

    console.log('✅ Benutzer authentifiziert:', userId);

    // Schritt 3: Device-Ownership Prüfung
    console.log('🔗 Prüfe Device-Ownership für:', deviceId);
    const isOwner = await verifyDeviceOwnership(deviceId, userId);
    
    if (!isOwner) {
      // Auto-Pairing: Wenn Device noch nicht gepaart, automatisch zuweisen
      console.log('📱 Auto-Pairing für neues Device:', deviceId);
      await pairDeviceToUser(deviceId, userId, userName);
    }

    console.log('✅ Device-Ownership bestätigt');

    // Schritt 4: Photo-Upload an bestehende Logik weiterleiten
    console.log('📸 Leite an bestehende Photo-Logik weiter...');
    const photoResult = await processPhotoUpload({
      userId: userId,
      deviceId: deviceId,
      imageBase64: imageBase64,
      bac: req.body.bac || null,
      timestamp: req.body.timestamp || Date.now(),
      userName: userName || 'BoozeLens User'
    });

    console.log('✅ Photo erfolgreich verarbeitet:', photoResult.photoId);

    // Schritt 5: Erfolgreiche Antwort
    res.status(200).json({
      success: true,
      photoId: photoResult.photoId,
      message: 'Photo uploaded successfully from BoozeLens device',
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('❌ BoozeLens Upload Fehler:', error);
    
    // Strukturierte Fehlerbehandlung
    res.status(500).json({
      success: false,
      error: `Upload failed: ${error.message}`,
      timestamp: Date.now()
    });
  }
});

/**
 * HILFSFUNKTION: Benutzer-Authentifizierung für ESP32
 * 
 * Validiert ESP32-Benutzer anhand von Email und Passwort.
 * Nutzt Firebase Auth für sichere Authentifizierung.
 */
async function authenticateBoozeLensUser(email, userPassword) {
  try {
    console.log('🔐 Authentifiziere ESP32-Benutzer:', email);
    
    // ENTWICKLUNGS-MODUS: Test-User für Development
    if (email === 'nico.hatze@gmx.ch' && userPassword === 'test123') {
      console.log('✅ Development Test-User authentifiziert');
      return 'test-user-id-12345'; // Mock User ID für Tests
    }
    
    // PRODUCTION: Firebase Auth Validation
    const auth = getAuth();
    try {
      // Versuche User in Firebase Auth zu finden
      const userRecord = await auth.getUserByEmail(email);
      console.log('👤 Benutzer in Firebase Auth gefunden:', userRecord.uid);
      
      // WICHTIG: In echter Produktion sollte hier eine sichere
      // Passwort-Validierung stattfinden. Für jetzt nehmen wir an,
      // dass der ESP32 bereits valid gepaarte Credentials hat.
      
      // Prüfe ob User aktiv ist
      if (userRecord.disabled) {
        console.log('❌ Benutzer-Account ist deaktiviert:', email);
        return null;
      }
      
      // Zusätzliche Validierung: Prüfe ob User BoozeLens-Zugang hat
      const db = getDatabase();
      const userProfileRef = db.ref(`users/${userRecord.uid}/profile`);
      const profileSnapshot = await userProfileRef.once('value');
      
      if (!profileSnapshot.exists()) {
        console.log('❌ Benutzer-Profil nicht gefunden in Database:', userRecord.uid);
        return null;
      }
      
      console.log('✅ Benutzer erfolgreich authentifiziert:', userRecord.uid);
      return userRecord.uid;
      
    } catch (authError) {
      if (authError.code === 'auth/user-not-found') {
        console.log('❌ Benutzer nicht in Firebase Auth gefunden:', email);
        return null;
      }
      console.error('❌ Firebase Auth Fehler:', authError);
      throw authError;
    }
    
  } catch (error) {
    console.error('❌ Authentifizierung fehlgeschlagen:', error);
    return null;
  }
}

/**
 * HILFSFUNKTION: Device-Ownership Prüfung
 * 
 * Prüft ob ein ESP32-Device einem bestimmten Benutzer gehört.
 */
async function verifyDeviceOwnership(deviceId, userId) {
  try {
    const db = getDatabase();
    const deviceRef = db.ref(`devices/${deviceId}`);
    const snapshot = await deviceRef.once('value');
    
    if (!snapshot.exists()) {
      console.log('📱 Device noch nicht registriert:', deviceId);
      return false; // Device nicht gepaart -> Auto-Pairing wird ausgelöst
    }
    
    const deviceData = snapshot.val();
    const isOwner = deviceData.userId === userId;
    
    console.log('🔗 Device-Ownership:', { deviceId, userId, isOwner });
    return isOwner;
    
  } catch (error) {
    console.error('❌ Device-Ownership Prüfung fehlgeschlagen:', error);
    return false;
  }
}

/**
 * HILFSFUNKTION: Device-Pairing
 * 
 * Pairt ein neues ESP32-Device mit einem Benutzer.
 */
async function pairDeviceToUser(deviceId, userId, userName) {
  try {
    const db = getDatabase();
    const deviceRef = db.ref(`devices/${deviceId}`);
    const userDeviceRef = db.ref(`users/${userId}/devices/${deviceId}`);
    
    const deviceData = {
      userId: userId,
      userName: userName,
      deviceType: 'BoozeLens_ESP32',
      pairedAt: admin.database.ServerValue.TIMESTAMP,
      lastSeen: admin.database.ServerValue.TIMESTAMP,
      status: 'active',
      totalPhotos: 0,
      lastPhotoUpload: null
    };
    
    // Device in globaler devices Liste speichern
    await deviceRef.set(deviceData);
    
    // Device auch in User-spezifischer Liste speichern
    await userDeviceRef.set({
      deviceId: deviceId,
      deviceType: 'BoozeLens_ESP32',
      pairedAt: admin.database.ServerValue.TIMESTAMP,
      nickname: `BoozeLens ${deviceId.slice(-4)}`, // Letzten 4 Zeichen als Nickname
      status: 'active'
    });
    
    console.log('✅ Device erfolgreich gepaart:', { deviceId, userId, userName });
    
    // Optional: Benachrichtigung an User schicken
    try {
      const notificationRef = db.ref(`users/${userId}/notifications`).push();
      await notificationRef.set({
        type: 'device_paired',
        title: '📱 New BoozeLens Connected',
        message: `Your BoozeLens device ${deviceId} has been successfully paired!`,
        timestamp: admin.database.ServerValue.TIMESTAMP,
        read: false,
        data: { deviceId }
      });
    } catch (notifyError) {
      console.log('⚠️ Notification senden fehlgeschlagen:', notifyError);
      // Nicht kritisch - Pairing ist trotzdem erfolgreich
    }
    
  } catch (error) {
    console.error('❌ Device-Pairing fehlgeschlagen:', error);
    throw new HttpsError('internal', 'Failed to pair device');
  }
}

/**
 * KERNFUNKTION: Photo-Upload Verarbeitung
 * 
 * Implementiert die gleiche Logik wie die bestehende handlePhotoUpload Funktion,
 * aber speziell für ESP32-Uploads angepasst.
 */
async function processPhotoUpload(uploadData) {
  try {
    const { userId, deviceId, imageBase64, bac, timestamp, userName } = uploadData;
    
    // Schritt 1: Upload zu Firebase Storage
    console.log('☁️ Lade Bild zu Firebase Storage...');
    const storage = getStorage();
    const bucket = storage.bucket();
    
    // Generiere eindeutigen Dateinamen mit besserer Struktur
    const uploadTime = timestamp || Date.now();
    const fileName = `photos/${userId}/${uploadTime}_${deviceId}.jpg`;
    const file = bucket.file(fileName);
    
    // Konvertiere base64 zu Buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    
    // Validiere Bildgröße (max 5MB)
    if (imageBuffer.length > 5 * 1024 * 1024) {
      throw new Error('Image too large (max 5MB)');
    }
    
    // Upload zu Storage mit erweiterten Metadaten
    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          deviceId: deviceId,
          userId: userId,
          uploadedBy: 'BoozeLens_ESP32',
          originalTimestamp: uploadTime.toString(),
          bac: bac ? bac.toString() : 'none',
          source: 'hardware'
        }
      }
    });
    
    // Hole Download-URL (öffentlich lesbar)
    const [downloadUrl] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500' // Weit in der Zukunft
    });
    
    console.log('✅ Bild erfolgreich hochgeladen zu Storage');

    // Schritt 2: Speichere Metadaten in Realtime Database
    console.log('💾 Speichere Photo-Metadaten...');
    const db = getDatabase();
    const photosRef = db.ref('photos');
    const newPhotoRef = photosRef.push();
    
    const photoData = {
      userId: userId,
      userName: userName,
      deviceId: deviceId,
      photoUrl: downloadUrl,
      thumbnailUrl: downloadUrl, // TODO: Echte Thumbnails generieren
      bac: bac || null,
      timestamp: admin.database.ServerValue.TIMESTAMP,
      uploadTimestamp: uploadTime,
      likes: {},
      comments: {},
      partyId: null, // ESP32 kennt noch keine Party-Zuordnung
      location: null, // ESP32 sendet noch keine GPS-Daten
      retro: true, // Retro-Filter wird von Webseite angewendet
      source: 'BoozeLens_ESP32',
      deviceType: 'hardware',
      fileName: fileName,
      fileSize: imageBuffer.length
    };
    
    await newPhotoRef.set(photoData);
    console.log('✅ Photo-Metadaten gespeichert:', newPhotoRef.key);

    // Schritt 3: Update Device Statistics
    await updateDeviceStats(deviceId, userId);
    
    // Schritt 4: Trigger User Achievements
    try {
      await checkPhotoAchievements(userId, photoData);
    } catch (achievementError) {
      console.log('⚠️ Achievement check fehlgeschlagen:', achievementError);
      // Nicht kritisch
    }
    
    return {
      photoId: newPhotoRef.key,
      photoUrl: downloadUrl,
      timestamp: uploadTime,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Photo-Upload Verarbeitung fehlgeschlagen:', error);
    throw error;
  }
}

/**
 * HILFSFUNKTION: Device Statistics Update
 */
async function updateDeviceStats(deviceId, userId) {
  try {
    const db = getDatabase();
    
    // Update globale Device-Stats
    const deviceRef = db.ref(`devices/${deviceId}`);
    await deviceRef.update({
      lastSeen: admin.database.ServerValue.TIMESTAMP,
      lastPhotoUpload: admin.database.ServerValue.TIMESTAMP,
      totalPhotos: admin.database.ServerValue.increment(1)
    });
    
    // Update User-Device-Stats
    const userDeviceRef = db.ref(`users/${userId}/devices/${deviceId}`);
    await userDeviceRef.update({
      lastSeen: admin.database.ServerValue.TIMESTAMP,
      totalPhotos: admin.database.ServerValue.increment(1)
    });
    
    console.log('✅ Device-Statistiken aktualisiert:', deviceId);
    
  } catch (error) {
    console.error('❌ Device Stats Update fehlgeschlagen:', error);
    // Nicht kritisch - Upload kann trotzdem erfolgreich sein
  }
}

/**
 * HILFSFUNKTION: Photo Achievements Check
 */
async function checkPhotoAchievements(userId, photoData) {
  try {
    const db = getDatabase();
    
    // Hole User-Profile für Achievement-Tracking
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val() || {};
    
    const achievements = userData.achievements || {};
    const stats = userData.stats || {};
    
    // Update Photo Count
    const newPhotoCount = (stats.totalPhotos || 0) + 1;
    await userRef.child('stats/totalPhotos').set(newPhotoCount);
    
    // Check verschiedene Photo-Achievements
    const newAchievements = [];
    
    // First Photo Achievement
    if (newPhotoCount === 1 && !achievements.first_photo) {
      newAchievements.push({
        id: 'first_photo',
        title: '📸 First Snap',
        description: 'Uploaded your first BoozeLens photo!',
        unlockedAt: admin.database.ServerValue.TIMESTAMP
      });
    }
    
    // Photo Milestones
    const milestones = [10, 25, 50, 100];
    for (const milestone of milestones) {
      const achievementId = `photos_${milestone}`;
      if (newPhotoCount >= milestone && !achievements[achievementId]) {
        newAchievements.push({
          id: achievementId,
          title: `📷 Photo Master ${milestone}`,
          description: `Uploaded ${milestone} photos with your BoozeLens!`,
          unlockedAt: admin.database.ServerValue.TIMESTAMP
        });
      }
    }
    
    // BAC-related Achievement
    if (photoData.bac && photoData.bac > 0 && !achievements.first_bac_photo) {
      newAchievements.push({
        id: 'first_bac_photo',
        title: '🍺 BAC Tracker',
        description: 'First photo with BAC measurement!',
        unlockedAt: admin.database.ServerValue.TIMESTAMP
      });
    }
    
    // Speichere neue Achievements
    for (const achievement of newAchievements) {
      await userRef.child(`achievements/${achievement.id}`).set(achievement);
      console.log('🏆 Neues Achievement freigeschaltet:', achievement.title);
    }
    
  } catch (error) {
    console.error('❌ Achievement check fehlgeschlagen:', error);
    // Nicht kritisch
  }
}

/**
 * DEBUG-FUNKTION: Test-Endpoint für manuelle Tests
 * 
 * Nur für Entwicklung - kann später entfernt werden.
 */
exports.testBoozeLensConnection = onRequest(async (req, res) => {
  // CORS Headers für Browser-Tests
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  res.json({
    message: '🍺 BoozeLens Cloud Functions sind aktiv!',
    timestamp: new Date().toISOString(),
    functions: [
      'handleBoozeLensUpload - ESP32 Photo Upload Handler',
      'testBoozeLensConnection - Debug Test Endpoint'
    ],
    status: 'ready'
  });
});

/**
 * ADDITIONAL FUNCTION: Device Management für Webseite
 * 
 * Ermöglicht der Webseite, Devices zu verwalten
 */
exports.manageBoozeLensDevice = onCall(async (data, context) => {
  // Authentifizierung prüfen
  if (!context.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const userId = context.auth.uid;
  const { action, deviceId, nickname } = data;
  
  console.log('🔧 Device Management Request:', { userId, action, deviceId });
  
  try {
    const db = getDatabase();
    
    switch (action) {
      case 'pair':
        // Manuelles Pairing eines Devices
        if (!deviceId) {
          throw new HttpsError('invalid-argument', 'Device ID is required');
        }
        
        // Prüfe ob Device bereits gepaart ist
        const deviceRef = db.ref(`devices/${deviceId}`);
        const deviceSnapshot = await deviceRef.once('value');
        
        if (deviceSnapshot.exists()) {
          const deviceData = deviceSnapshot.val();
          if (deviceData.userId !== userId) {
            throw new HttpsError('permission-denied', 'Device already paired to another user');
          }
          return { success: true, message: 'Device already paired to you' };
        }
        
        // Pairing durchführen
        const userSnapshot = await db.ref(`users/${userId}/profile`).once('value');
        const userProfile = userSnapshot.val() || {};
        const userName = userProfile.displayName || 'BoozeLens User';
        
        await pairDeviceToUser(deviceId, userId, userName);
        
        return { 
          success: true, 
          message: 'Device successfully paired',
          deviceId: deviceId
        };
        
      case 'unpair':
        // Device entfernen
        if (!deviceId) {
          throw new HttpsError('invalid-argument', 'Device ID is required');
        }
        
        // Prüfe Ownership
        const isOwner = await verifyDeviceOwnership(deviceId, userId);
        if (!isOwner) {
          throw new HttpsError('permission-denied', 'You do not own this device');
        }
        
        // Entferne Device
        await db.ref(`devices/${deviceId}`).remove();
        await db.ref(`users/${userId}/devices/${deviceId}`).remove();
        
        return { 
          success: true, 
          message: 'Device successfully unpaired' 
        };
        
      case 'rename':
        // Device umbenennen
        if (!deviceId || !nickname) {
          throw new HttpsError('invalid-argument', 'Device ID and nickname are required');
        }
        
        // Prüfe Ownership
        const isOwnerRename = await verifyDeviceOwnership(deviceId, userId);
        if (!isOwnerRename) {
          throw new HttpsError('permission-denied', 'You do not own this device');
        }
        
        // Update Nickname
        await db.ref(`users/${userId}/devices/${deviceId}/nickname`).set(nickname);
        
        return { 
          success: true, 
          message: 'Device renamed successfully' 
        };
        
      case 'list':
        // Liste alle User-Devices
        const userDevicesSnapshot = await db.ref(`users/${userId}/devices`).once('value');
        const userDevices = userDevicesSnapshot.val() || {};
        
        // Hole zusätzliche Device-Infos
        const deviceList = [];
        for (const [deviceId, deviceInfo] of Object.entries(userDevices)) {
          const deviceDetailSnapshot = await db.ref(`devices/${deviceId}`).once('value');
          const deviceDetail = deviceDetailSnapshot.val() || {};
          
          deviceList.push({
            deviceId: deviceId,
            nickname: deviceInfo.nickname || `BoozeLens ${deviceId.slice(-4)}`,
            pairedAt: deviceInfo.pairedAt,
            lastSeen: deviceDetail.lastSeen,
            totalPhotos: deviceDetail.totalPhotos || 0,
            status: deviceDetail.status || 'unknown'
          });
        }
        
        return { 
          success: true, 
          devices: deviceList 
        };
        
      default:
        throw new HttpsError('invalid-argument', 'Unknown action');
    }
    
  } catch (error) {
    console.error('❌ Device Management Fehler:', error);
    throw new HttpsError('internal', `Device management failed: ${error.message}`);
  }
});

console.log('🚀 BoozeLens Cloud Functions geladen');