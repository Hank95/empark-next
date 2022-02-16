import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

interface AuthContextValue {
  currentUser: any;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: any) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
}

interface UserInfo {
  admin: boolean;
  city: string;
  country: string;
  email: string;
  firstName: string;
  homeAddress1: string;
  homeAddress2: string;
  homePhone: string;
  lastName: string;
  mobilePhone: string;
  parkCottageName: string;
  state: string;
  zip: string;
  id: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  let context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setCurrentUser(user ? user : null);

      if (user) {
        let userDoc = await getDoc(doc(db, "users", user.uid));
        setUserInfo({ ...userDoc.data(), id: user.uid } as UserInfo);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    console.log("The user is", currentUser);
  }, [currentUser]);

  async function login(email: string, password: string) {
    let cred = await signInWithEmailAndPassword(auth, email, password);
    console.log("cred", cred);
    let userDoc = await getDoc(doc(db, "users", cred.user.uid));

    setUserInfo({ ...userDoc.data(), id: cred.user.uid } as UserInfo);
  }

  async function signup(email: string, password: string) {
    // first find if input email matches approved email
    const emailDoc = await getDoc(doc(db, "emails", email));

    if (emailDoc.exists()) {
      let cred = await createUserWithEmailAndPassword(auth, email, password);
      let userDoc = await setDoc(doc(db, "users", cred.user.uid), {
        email: email,
        admin: false,
      });
      setUserInfo(userDoc as unknown as UserInfo);
    } else {
      console.log("not authenticated");
    }
  }

  function forgotPassword(email: string) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    });
  }

  function resetPassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    userInfo,
    setUserInfo,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
  };
  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
