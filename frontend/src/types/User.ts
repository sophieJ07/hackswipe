interface User {
  id?: string;           // Firestore document ID
  name: string;          // Name
  bio: string;           // Short bio
  skills: string[];      // Skills / role
  goal: string;          // What they hope to get out of the hackathon
  projectIdea: string;   // What they want to build
  links: string[];       // Social links (LinkedIn, Instagram, etc.)
  contact: string;       // Preferred contact info (Discord/email)
  imageUrl?: string;     // Profile picture or default placeholder
}