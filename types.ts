export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isLocked: boolean;
  description?: string;
  galleryImages?: string[];
  link?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum EncryptionStatus {
  LOCKED = 'LOCKED',
  UNLOCKING = 'UNLOCKING',
  UNLOCKED = 'UNLOCKED',
  ERROR = 'ERROR'
}