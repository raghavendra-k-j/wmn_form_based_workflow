import type { Persona } from './types';
import { GuyiniEncounterTab } from '../cases/gynae/encounter/store';

/** 
 * Tabs that staff (nurses, front desk) are allowed to edit.
 * All other tabs are doctor-only.
 */
const STAFF_EDITABLE_TABS: GuyiniEncounterTab[] = [
  GuyiniEncounterTab.EXAMINATIONS,
];

/**
 * Check if a persona can edit a specific tab
 * @param persona - The user's persona (staff or doctor)
 * @param tab - The encounter tab to check
 * @returns true if the persona can edit the tab
 */
export function canEditTab(persona: Persona, tab: GuyiniEncounterTab): boolean {
  // Doctors can edit all tabs
  if (persona === 'doctor') {
    return true;
  }
  
  // Staff can only edit specific tabs
  return STAFF_EDITABLE_TABS.includes(tab);
}

/**
 * Check if a persona can view a specific tab (all can view)
 * @param _persona - The user's persona
 * @param _tab - The encounter tab to check
 * @returns true (all users can view all tabs)
 */
export function canViewTab(_persona: Persona, _tab: GuyiniEncounterTab): boolean {
  // All users can view all tabs
  return true;
}

/**
 * Get display text for permission status
 * @param canEdit - Whether editing is allowed
 * @returns Display text for the permission status
 */
export function getPermissionText(canEdit: boolean): string {
  return canEdit ? 'Editable' : 'View Only';
}
