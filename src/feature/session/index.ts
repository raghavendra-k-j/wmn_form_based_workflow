// Session Module - User authentication and permissions

// Types
export type { CurrentUser, Persona } from './types';

// Store
export { SessionStore, sessionStore, DEFAULT_USERS } from './store';

// Context
export { SessionProvider, useSession, SessionContext } from './context';

// Permissions
export { canEditTab, canViewTab, getPermissionText } from './permissions';

// Components
export { UserSimulator } from './user-simulator';
