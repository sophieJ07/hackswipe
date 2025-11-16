import { getProfiles } from "../utils/firestore.ts";
import type { User } from "../types/User.ts";

let profileDeck: User[] = [];
let currentIndex = 0;

export const resetProfileDeck = async (currentUserId: string) => {
  const allProfiles = await getProfiles();
  profileDeck = allProfiles.filter(u => u.id !== currentUserId);
  currentIndex = 0;
};

export const getNextProfile = (): User | null => {
  if (currentIndex >= profileDeck.length) return null; 
  const nextProfile = profileDeck[currentIndex];
  currentIndex += 1;
  return nextProfile;
};
