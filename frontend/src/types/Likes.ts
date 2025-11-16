interface User {
  id: string;
  name: string;
  role: "developer" | "designer" | "product" | "other";
  lookingFor: string[];
  skills: string[];
  bio: string;
  contact: string; 
  goals: string;
  links: { [key: string]: string };
  imageUrl?: string; 
}
