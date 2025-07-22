
# Mobile Deployment Guide for pasS2Kampus

This guide will help you deploy the pasS2Kampus app to mobile devices using Capacitor.

## Prerequisites

- Node.js (version 16 or higher)
- Android Studio (for Android development)
- Xcode (for iOS development - Mac only)
- A physical device or emulator

## Initial Setup

1. **Export to GitHub**: Use the "Export to GitHub" button in Lovable to transfer your project to your own GitHub repository.

2. **Clone and Install**:
   ```bash
   git clone <your-repo-url>
   cd pass2kampus
   npm install
   ```

## Platform Setup

### Android Setup

1. **Add Android Platform**:
   ```bash
   npx cap add android
   ```

2. **Update Dependencies**:
   ```bash
   npx cap update android
   ```

3. **Build and Sync**:
   ```bash
   npm run build
   npx cap sync android
   ```

4. **Run on Device/Emulator**:
   ```bash
   npx cap run android
   ```

### iOS Setup (Mac only)

1. **Add iOS Platform**:
   ```bash
   npx cap add ios
   ```

2. **Update Dependencies**:
   ```bash
   npx cap update ios
   ```

3. **Build and Sync**:
   ```bash
   npm run build
   npx cap sync ios
   ```

4. **Run on Device/Simulator**:
   ```bash
   npx cap run ios
   ```

## Development Workflow

### Making Changes

1. **Edit Code**: Make your changes in the web app
2. **Build**: `npm run build`
3. **Sync**: `npx cap sync`
4. **Test**: `npx cap run android` or `npx cap run ios`

### Hot Reload (Development)

The app is configured to use hot reload during development, pointing to the Lovable sandbox URL. This means you can test changes instantly without rebuilding.

## App Store Deployment

### Android (Google Play Store)

1. **Generate Signed APK**:
   ```bash
   npx cap build android
   ```

2. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

3. **Configure signing and build for release in Android Studio**

### iOS (App Store)

1. **Open in Xcode**:
   ```bash
   npx cap open ios
   ```

2. **Configure signing, provisioning profiles, and build for release in Xcode**

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are installed and up to date
2. **Sync Issues**: Try `npx cap sync --force`
3. **Permission Issues**: Check platform-specific permission requirements

### Getting Help

- Check the [Capacitor Documentation](https://capacitorjs.com/docs)
- Visit the [Lovable Community Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Read the [Lovable Mobile Development Blog](https://lovable.dev/blogs/TODO)

## Configuration

The app is configured with:
- **App ID**: `app.lovable.c1ed4e7565954f9ca2a9573267e5e36f`
- **App Name**: `pass2kampus`
- **Hot Reload URL**: `https://c1ed4e75-6595-4f9c-a2a9-573267e5e36f.lovableproject.com`

## Features

The mobile app includes:
- Native mobile detection using Capacitor
- PWA support with manifest.json
- Mobile-optimized UI components
- Touch-friendly interactions
- Platform-specific styling

## Next Steps

1. Test the app thoroughly on both platforms
2. Configure app icons and splash screens
3. Set up push notifications if needed
4. Implement any platform-specific features
5. Submit to app stores

For more detailed information, refer to the Capacitor documentation and Lovable's mobile development resources.
