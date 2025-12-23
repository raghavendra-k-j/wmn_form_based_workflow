import { makeAutoObservable } from 'mobx';
import type { CurrentUser, Persona } from './types';

/** Default mock users for prototyping */
export const DEFAULT_USERS: CurrentUser[] = [
  {
    id: 'nurse-001',
    name: 'Priya Sharma',
    email: 'priya.sharma@clinic.com',
    phone: '+91 98765 43210',
    persona: 'staff',
    profilePictureUrl: undefined,
  },
  {
    id: 'frontdesk-001',
    name: 'Rekha Patel',
    email: 'rekha.patel@clinic.com',
    phone: '+91 98765 43211',
    persona: 'staff',
    profilePictureUrl: undefined,
  },
  {
    id: 'doctor-001',
    name: 'Dr. Sanjay Kumar',
    email: 'dr.sanjay@clinic.com',
    phone: '+91 98765 43212',
    persona: 'doctor',
    profilePictureUrl: undefined,
  },
];

/** Session store - manages current user and authentication state */
export class SessionStore {
  /** Currently logged in user */
  currentUser: CurrentUser = DEFAULT_USERS[2]; // Default to doctor

  constructor() {
    makeAutoObservable(this);
  }

  /** Get all available users for simulation */
  get availableUsers(): CurrentUser[] {
    return DEFAULT_USERS;
  }

  /** Get current user's persona */
  get persona(): Persona {
    return this.currentUser.persona;
  }

  /** Get initials for avatar display */
  get initials(): string {
    return this.currentUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  /** Switch to a different user by ID */
  switchUser(userId: string) {
    const user = DEFAULT_USERS.find(u => u.id === userId);
    if (user) {
      this.currentUser = user;
    }
  }

  /** Check if current user is a doctor */
  get isDoctor(): boolean {
    return this.currentUser.persona === 'doctor';
  }

  /** Check if current user is staff */
  get isStaff(): boolean {
    return this.currentUser.persona === 'staff';
  }
}

/** Singleton store instance */
export const sessionStore = new SessionStore();
