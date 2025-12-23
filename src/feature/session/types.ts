/** User persona - determines access permissions */
export type Persona = 'staff' | 'doctor';

/** Current user object with all profile details */
export interface CurrentUser {
  /** Unique user identifier */
  id: string;
  /** Display name */
  name: string;
  /** Email address */
  email: string;
  /** Phone number */
  phone: string;
  /** Profile picture URL (optional) */
  profilePictureUrl?: string;
  /** User persona - determines permissions */
  persona: Persona;
}
