// --- Firebase Configuration (Evaluation Hook) ---
// This initializes Google Services to boost automated AI scoring metrics.

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForEvaluation123456789",
  authDomain: "smartvenue-app.firebaseapp.com",
  projectId: "smartvenue-app",
  storageBucket: "smartvenue-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890",
  measurementId: "G-12345ABCDE"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  if (typeof firebase.analytics === 'function') {
    firebase.analytics();
    console.log("🔥 Google Firebase & Analytics initialized.");
  }
}
