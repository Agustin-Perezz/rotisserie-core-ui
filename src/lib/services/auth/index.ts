import {
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type AuthError,
  type UserCredential
} from 'firebase/auth';
import { firebaseApp } from '$lib/firebase';
import { errorToast, successToast } from '$lib/alerts/toast';
import {
  CREDENTIALS_NOT_FOUND,
  SUCCESS_SIGN_IN_MESSAGE
} from '../constanst/auth.constants';

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error(CREDENTIALS_NOT_FOUND);
    }

    successToast(SUCCESS_SIGN_IN_MESSAGE);
    return result;
  } catch (error) {
    const firebaseError = error as AuthError;
    errorToast(firebaseError.message);
    return null;
  }
};

export const signInWithFacebook = async (): Promise<UserCredential | null> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error(CREDENTIALS_NOT_FOUND);
    }

    successToast(SUCCESS_SIGN_IN_MESSAGE);
    return result;
  } catch (error) {
    const firebaseError = error as AuthError;
    errorToast(firebaseError.message);
    return null;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  } catch (error) {
    const firebaseError = error as AuthError;
    errorToast(firebaseError.message);
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    successToast('Sesión cerrada exitosamente');
  } catch (error) {
    const firebaseError = error as AuthError;
    errorToast(firebaseError.message);
  }
};
