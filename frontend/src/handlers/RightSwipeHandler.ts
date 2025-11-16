import { addLike, checkMatch, getUserById } from "../utils/firestore.ts";
import type { User } from "../types/User";

export const handleRightSwipe = async (currentUserId: string, targetUserId: string): Promise<User | null> => {
  await addLike(currentUserId, targetUserId);

  const isMatch = await checkMatch(currentUserId, targetUserId);
  if (!isMatch) return null;

  const matchedUser = await getUserById(targetUserId);
  return matchedUser; 
};
