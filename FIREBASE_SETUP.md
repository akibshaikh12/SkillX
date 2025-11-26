# Firebase Setup Guide for Library Management System

This guide will help you set up Firebase for your library management system with authentication and database storage.

## Prerequisites
- A Google account
- Your library management files

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "Library Management System")
4. (Optional) Enable Google Analytics if desired
5. Click **"Create project"** and wait for it to finish

## Step 2: Register Your Web App

1. In your Firebase project, click the **web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "Library Web App")
3. **Do NOT** check "Firebase Hosting" (unless you plan to use it)
4. Click **"Register app"**
5. You'll see your Firebase configuration object - **keep this page open**

## Step 3: Update firebase-config.js

1. Open `firebase-config.js` in your library management folder
2. Copy the configuration values from Firebase Console
3. Replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY_FROM_FIREBASE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 4: Enable Authentication Methods

1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle **"Enable"** to ON
   - Click **"Save"**
5. Enable **Google**:
   - Click on "Google"
   - Toggle **"Enable"** to ON
   - Select a support email
   - Click **"Save"**

## Step 5: Create Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** for now (you'll update rules later)
4. Select a Cloud Firestore location (choose closest to your users)
5. Click **"Enable"**

## Step 6: Configure Firestore Security Rules

1. In Firestore Database, go to the **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Allow authenticated users to check if roll/serialNo/jisuId exists
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 7: Test Your Setup

1. Open `register.html` in your browser
2. Try registering with email/password
3. Check Firebase Console → Authentication to see the new user
4. Check Firestore Database → users collection to see user data
5. Try the "Sign up with Google" button
6. Try logging in with `login.html`

## Troubleshooting

### "Firebase not defined" error
- Make sure `firebase-config.js` is loaded correctly
- Check that Firebase SDK scripts are included before `firebase-config.js`

### Google Sign-In not working
- Verify Google authentication is enabled in Firebase Console
- Check that you have a support email configured
- Make sure you're testing on `http://localhost` or a proper domain (not `file://`)

### "Permission denied" errors
- Verify Firestore security rules are published
- Check that Authentication is working correctly

### User data not saving
- Check Browser Console for errors
- Verify Firestore Database is created and active
- Ensure `firebase-config.js` has correct project ID

## What's Been Integrated

✅ **Firebase Authentication**
- Email/Password registration and login
- Google Sign-In for both registration and login
- Session management

✅ **Cloud Firestore Database**
- User data stored in `users` collection
- Each user document contains: name, roll, serialNo, jisuId, email, memberSince, borrowed, history
- Real-time data synchronization

✅ **Enhanced Registration** (`register.html`)
- Google Sign-In button with automatic profile completion
- Firebase authentication validation
- Firestore data storage

✅ **Enhanced Login** (`login.html`)
- Email/password authentication via Firebase
- Google Sign-In integration
- Automatic user session management

## Next Steps

1. **Update Security Rules**: After testing, tighten Firestore security rules for production
2. **Add Password Reset**: Implement forgot password functionality using `auth.sendPasswordResetEmail()`
3. **Sync Other Pages**: Update `user.html` and other pages to read/write from Firestore instead of localStorage
4. **Enable Email Verification**: Require users to verify their email before accessing the system

## Important Notes

⚠️ **Security**: The current setup uses test mode security rules. Update them before deploying to production!

⚠️ **API Keys**: Your Firebase config contains API keys. This is safe for web apps as Firebase uses domain restrictions, but ensure you configure authorized domains in Firebase Console.

⚠️ **Backward Compatibility**: The system still stores user data in localStorage for compatibility with existing pages. You may want to migrate all pages to use Firestore.
