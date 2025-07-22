
# pasS2Kampus Mobile & Web Deployment Guide

## Overview
Your pasS2Kampus app is now ready for deployment as both a mobile app and web application using Capacitor technology.

## Prerequisites
- Node.js 18+ installed
- Git account
- For iOS: Mac with Xcode 14+
- For Android: Android Studio with SDK tools
- Google Play Console account ($25 one-time fee)
- Apple Developer account ($99/year)

## Step 1: Export and Setup Local Development

1. **Export to GitHub**
   - Click "Export to GitHub" button in Lovable
   - Clone the repository to your local machine
   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Capacitor** (if not already done)
   ```bash
   npx cap init
   ```

## Step 2: Add Mobile Platforms

### For Android
```bash
npx cap add android
npx cap update android
```

### For iOS (Mac only)
```bash
npx cap add ios
npx cap update ios
```

## Step 3: Build and Sync

1. **Build the web app**
   ```bash
   npm run build
   ```

2. **Sync with native platforms**
   ```bash
   npx cap sync
   ```

## Step 4: Development and Testing

### Run on Android
```bash
npx cap run android
```

### Run on iOS (Mac only)
```bash
npx cap run ios
```

### Live Reload (Development)
```bash
npx cap run android --livereload --external
npx cap run ios --livereload --external
```

## Step 5: Production Build Configuration

### Android Production
1. **Generate keystore**
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in android/app/build.gradle**
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('../../my-release-key.keystore')
               storePassword 'your-store-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-key-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

3. **Build AAB for Play Store**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

### iOS Production
1. **Open in Xcode**
   ```bash
   npx cap open ios
   ```

2. **Configure signing in Xcode**
   - Select your development team
   - Configure app identifier
   - Set up provisioning profiles

3. **Archive for App Store**
   - Product → Archive
   - Upload to App Store Connect

## Step 6: Web Deployment

### Deploy to Netlify/Vercel
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### Configure PWA
- Manifest is already configured in public/manifest.json
- Service worker will be added automatically
- Icons need to be added to public/icons/ directory

## App Store Submission

### Google Play Store
1. Create app in Google Play Console
2. Upload the AAB file from android/app/build/outputs/bundle/release/
3. Fill app information, screenshots, description
4. Submit for review

### Apple App Store
1. Create app in App Store Connect
2. Upload build using Xcode or Application Loader
3. Fill app metadata, screenshots, description
4. Submit for review

## Required Assets

### App Icons (create these in public/icons/)
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Screenshots
- Mobile: 390x844px (iPhone format)
- Desktop: 1280x720px (web format)

### Splash Screens
- Android: Configure in android/app/src/main/res/
- iOS: Configure in ios/App/App/Assets.xcassets/

## Configuration Files

### capacitor.config.ts
- Already configured for your app
- Update server.url for production builds
- Configure plugins as needed

### android/app/src/main/AndroidManifest.xml
- Configure permissions
- Set app name and theme

### ios/App/App/Info.plist
- Configure iOS-specific settings
- Set app display name and permissions

## Testing Checklist

- [ ] App launches correctly on both platforms
- [ ] Admin password protection works
- [ ] Navigation works smoothly
- [ ] All features accessible on mobile
- [ ] Haptic feedback works (native only)
- [ ] Camera integration works (if using documents)
- [ ] Offline functionality works
- [ ] PWA installable on web browsers

## Support and Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version and dependencies
2. **Platform errors**: Ensure Android Studio/Xcode properly configured
3. **Signing issues**: Verify certificates and provisioning profiles
4. **Performance**: Optimize bundle size with tree shaking

### Useful Commands
```bash
# Clean builds
npx cap clean

# Update Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest

# Check doctor for issues
npx cap doctor

# View logs
npx cap run android --consolelogs
npx cap run ios --consolelogs
```

Your pasS2Kampus app is now ready for global deployment! 🚀
