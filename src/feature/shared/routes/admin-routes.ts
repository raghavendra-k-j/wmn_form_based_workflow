export const homeRoute = '/';
export const patientsRoute = '/patientv3';
export const appointmentsRoute = '/appointments';
export const staffsRoute = '/staffs';
export const doctorsRoute = '/doctors';
export const settingsRoute = '/settings';
export const gyanyEncounterRoute = `${patientsRoute}/:patientId/encounter/gyany`;
export const pncEncounterRoute = `${patientsRoute}/:patientId/pnc/:encounterId/:tab?`;
