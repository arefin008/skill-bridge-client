export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  image?: string | null;
}