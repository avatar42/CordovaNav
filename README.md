# CordovaNav
Example of top and side nave in single app based on [this set of blog posts](http://codingfix.com/cordova-application-navigation-system/).


Most of the libs and APIs required are included in the repo to make things easier.
Tools I have installed:
Java 1.8 JSK
Android Studio 3.1.2 with path pointed to the assocated SDK with build tools 28-rx2


To get running
cd to the CordovaNav folder
run 

**cordova platform add android**

**cordova emulate android**


I've notice Cordova hangs sometimes waiting for a response from the android emulator. Especially if the app is not on the phone already or the build tools seem to think it is not.To get around this run

**adb uninstall com.dea42.cordovaNav**

**adb install platforms\android\app\build\outputs\apk\debug\app-debug.apk**
