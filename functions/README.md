# BoozeLens Firebase Cloud Functions

Diese Firebase Cloud Functions ermöglichen die Integration zwischen ESP32 BoozeLens Hardware und der Webseite.

## Funktionen

### `handleBoozeLensUpload`
- **Zweck**: Empfängt Photo-Uploads vom ESP32 und verarbeitet sie
- **Eingabe**: Device-ID, Base64-Bild, BAC-Wert, User-Credentials
- **Ausgabe**: Erfolgsmeldung mit Photo-ID
- **Sicherheit**: User-Authentication und Device-Pairing Prüfung

### `testBoozeLensConnection`
- **Zweck**: Test-Endpoint um zu prüfen ob Functions aktiv sind
- **Zugriff**: GET https://us-central1-hsg-party-tracker.cloudfunctions.net/testBoozeLensConnection

## Deployment

### 1. Dependencies installieren
```bash
cd functions
npm install
```

### 2. Firebase CLI installieren (falls nicht vorhanden)
```bash
npm install -g firebase-tools
```

### 3. Bei Firebase anmelden
```bash
firebase login
```

### 4. Functions deployen
```bash
# Aus dem Hauptverzeichnis (nicht functions/)
firebase deploy --only functions
```

### 5. Nur spezifische Function deployen
```bash
firebase deploy --only functions:handleBoozeLensUpload
```

## Testen

### 1. Test-Endpoint aufrufen
```bash
curl https://us-central1-hsg-party-tracker.cloudfunctions.net/testBoozeLensConnection
```

### 2. Logs anzeigen
```bash
firebase functions:log
```

### 3. Local Emulator (für Entwicklung)
```bash
firebase emulators:start --only functions
```

## Sicherheit

- User-Authentication via Firebase Auth
- Device-Pairing Prüfung
- Automatisches Device-Pairing für neue Geräte
- Sichere Storage-URLs mit Ablaufzeit

## Integration mit bestehender Webseite

Die Cloud Functions arbeiten **ohne Änderungen** an der bestehenden Webseite:
- Nutzen die gleiche Firebase-Konfiguration
- Speichern Fotos im gleichen Format wie die Webseite
- Triggern die gleichen Benachrichtigungen
- Respektieren die bestehenden Sicherheitsregeln

## Debugging

```bash
# Logs in Echtzeit anzeigen
firebase functions:log --only handleBoozeLensUpload

# Spezifische Function testen
firebase functions:shell
# Dann: handleBoozeLensUpload({deviceId: "TEST", imageBase64: "..."})
```