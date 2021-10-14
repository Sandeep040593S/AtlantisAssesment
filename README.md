# AtlantisAssesment

# AtlantisAssesment for Assignment-1(Facebook reaction)

## Getting Started
The application is beign tested only for Android as  of now

#### - Install Dependencies

`yarn install`

##### - Execute Project

`yarn android` <br />
`yarn ios`

##### - Pod Update for iOS

`yarn run pod-install`

##### - Generate APK
Step 1. Run below command
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

Step 2. Go to android directory
cd android

Step3. Now in this android folder, run below command
./gradlew assembleDebug

Step 4. Yu'll find the apk file in the following path:
assementPrject/android/app/build/outputs/apk/debug/app-debug.apk


## Packages

---

`yarn add @react-navigation/native` <br />
`yarn add react-native-gesture-handler` <br />
`yarn add @react-navigation/stack` <br />
`yarn add react-native-screens react-native-safe-area-context` <br />
`yarn add @react-navigation/bottom-tabs` <br />

---
