import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseApp from '../components/firebase';

const auth = getAuth(firebaseApp);

// Sign up function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

const googleProvider = new GoogleAuthProvider();
// google login function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Google Access Token, useful for other Google APIs if needed
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
    console.log("Google Sign-In Successful, User:", user);
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};
