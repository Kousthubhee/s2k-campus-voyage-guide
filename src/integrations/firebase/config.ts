
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6RPOMriLDmXMNiOHNnECCO53SvD9NsZs",
  authDomain: "pass2kampus-855ec.firebaseapp.com",
  projectId: "pass2kampus-855ec",
  appId: "1:962142115225:web:e0190cfa135bb719f6ef08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
