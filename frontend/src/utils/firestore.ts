import { db } from "../firebase/firebaseConfig.ts";
import { collection, addDoc, getDocs } from "firebase/firestore";
import type { User } from "../types/User";

export const addUser = async (user: User): Promise<string> => {
  const docRef = await addDoc(collection(db, "users"), user);
  return docRef.id; // Firestore document ID
};


export const getProfiles = async (): Promise<User[]> => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};


export const addLike = async (fromId: string, toId: string) => {
  await addDoc(collection(db, "likes"), {
    from: fromId,
    to: toId,
    timestamp: Date.now()
  });
};


import { query, where } from "firebase/firestore";

export const checkMatch = async (fromId: string, toId: string): Promise<boolean> => {
  const q = query(
    collection(db, "likes"),
    where("from", "==", toId),
    where("to", "==", fromId)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};
