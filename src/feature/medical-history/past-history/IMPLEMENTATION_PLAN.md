# Past History 2 - Implementation Plan

## Overview

This document outlines the comprehensive implementation plan for the Past History 2 module with proper state management, simulation modes, and a fully-fledged workflow for doctors to manage patient past medical history.

---

## Current Problems Identified

1. **State Management Issues**
   - "Copy from Previous Visit" doesn't clear the previous visit banner after copying
   - State transitions between first visit and subsequent visits are not clean
   - Simulation mode changes don't reset the state properly

2. **UI/UX Issues**
   - Previous visit info persists in header after copying data
   - Empty states and loading states are not handled gracefully
   - No visual feedback when data is saved

3. **Workflow Gaps**
   - No localStorage persistence
   - No proper Save → Success flow
   - List tab doesn't integrate well with ADD tab

---

## Proposed Solution Architecture

### 1. State Model

```typescript
interface PastHistory2State {
  // === CURRENT VISIT STATE ===
  /** User's answer to "Past History?" - null means unanswered */
  hasPastHistory: boolean | null;
  
  /** Current conditions being edited */
  conditions: PastHistoryCondition[];
  
  /** Whether current visit data has been saved */
  isSaved: boolean;
  
  /** Current visit date */
  currentVisitDate: string;

  // === PREVIOUS VISIT STATE ===
  /** All historical visits (from localStorage or API) */
  visitHistory: PastHistoryVisit[];
  
  /** Whether to show the "previous visit" banner */
  showPreviousVisitBanner: boolean;
  
  /** Whether user copied from previous visit */
  copiedFromPrevious: boolean;

  // === UI STATE ===
  /** Active tab: 'add' | 'list' */
  activeTab: TabType;
  
  /** Modal state for viewing historical visit */
  viewingVisit: PastHistoryVisit | null;
  
  /** Simulation mode for testing */
  simulationMode: VisitSimulationMode;
}
```

### 2. Workflows Supported

#### Workflow A: First Time Visit (No Previous Data)
```
1. Doctor opens Past History 2 tab
2. "Past History?" question appears with Yes/No buttons
3. IF YES:
   - Table appears with default conditions (all set to "No")
   - Doctor marks relevant conditions as "Yes"
   - Doctor fills Since/Notes for "Yes" conditions
   - Doctor can add custom conditions
   - Doctor clicks SAVE
   - Data saved to localStorage + toast notification
   - Banner shows "Saved successfully"
4. IF NO:
   - Table appears with message "No past medical history"
   - SAVE button saves "No past history" record
```

#### Workflow B: Subsequent Visit (Has Previous Data)
```
1. Doctor opens Past History 2 tab
2. "Past History?" question appears with Yes/No buttons
3. Below that, Previous Visit Banner shows:
   - Date of last visit
   - List of active conditions from last visit
   - "Copy from Previous Visit" checkbox
4. IF "Copy" is checked:
   - All conditions from previous visit are copied
   - "Past History?" auto-sets to Yes
   - Previous Visit Banner HIDES (data has been copied)
   - Doctor can modify the copied data
5. IF "Copy" is NOT checked:
   - Doctor answers Yes/No fresh
   - Can enter conditions manually
6. On SAVE:
   - New visit record created
   - Added to visit history
   - Toast shows success
```

#### Workflow C: List Tab (View Historical Data)
```
1. Doctor clicks "List" tab
2. Timeline table shows all past visits:
   | Date | Conditions | Actions |
3. Doctor can click "View" on any visit
4. Modal opens showing full details of that visit
5. Modal has "Close" button only (read-only view)
```

---

## Implementation Steps

### Phase 1: Fix Core State Management

#### Step 1.1: Refactor Store State
- [ ] Add `showPreviousVisitBanner` flag (separate from `hasPreviousVisitData`)
- [ ] Add `copiedFromPrevious` flag to track if copy was used
- [ ] Add `isSaved` flag for current visit
- [ ] Add `currentVisitDate` for the current entry

#### Step 1.2: Fix Copy from Previous Visit
- [ ] When copy checkbox is checked:
  - Copy conditions to current state
  - Set `hasPastHistory = true`
  - Set `showPreviousVisitBanner = false` (hide the banner)
  - Set `copiedFromPrevious = true`
- [ ] Ensure UI reflects the hidden banner

#### Step 1.3: Fix Simulation Mode Transitions
- [ ] `first_visit` mode:
  - Clear all previous visit data
  - Reset `hasPastHistory` to null
  - Reset conditions to empty
  - Hide previous visit banner
- [ ] `has_previous_visit` mode:
  - Load mock previous visit data
  - Show previous visit banner
  - Reset current entry state

### Phase 2: Implement localStorage Persistence

#### Step 2.1: Storage Keys
```typescript
const STORAGE_KEYS = {
  VISIT_HISTORY: 'past_history_2_visits',
  CURRENT_DRAFT: 'past_history_2_draft',
};
```

#### Step 2.2: Save Operations
- [ ] `saveVisit()`: Save current conditions as a new visit
  - Add to visit history array
  - Persist to localStorage
  - Show success toast
  - Reset current entry for next visit

#### Step 2.3: Load Operations
- [ ] `loadVisitHistory()`: Load all visits from localStorage
- [ ] `loadDraft()`: Load any unsaved draft (optional)

### Phase 3: UI Improvements

#### Step 3.1: Previous Visit Banner Logic
```typescript
// Show banner only when:
// 1. Has previous visit data AND
// 2. User hasn't copied the data yet AND
// 3. User hasn't answered Yes/No yet (or said Yes but not saved)
const showBanner = 
  visitHistory.length > 0 && 
  !copiedFromPrevious && 
  showPreviousVisitBanner;
```

#### Step 3.2: Table Display Logic
```typescript
// Show table when:
// 1. User answered Yes → Show full editable table
// 2. User answered No → Show simple "No history" message with save
// 3. User hasn't answered → Don't show table
```

#### Step 3.3: Save Button States
- [ ] Disabled when no changes made
- [ ] Shows "Saving..." during save
- [ ] Shows "Saved ✓" briefly after success
- [ ] Returns to "Save" after 2 seconds

### Phase 4: Testing Scenarios

#### Scenario 1: First Visit - No History
```
1. Simulation: "1st" (first visit)
2. Click "No" on Past History question
3. Should show: "No past medical history" message
4. Click Save
5. Should: Save record, show success
6. Switch to List tab
7. Should: Show the saved record with "No conditions"
```

#### Scenario 2: First Visit - Has History
```
1. Simulation: "1st" (first visit)
2. Click "Yes" on Past History question
3. Should show: Table with default conditions
4. Toggle "Diabetes" to Yes, add "Since: 2020"
5. Toggle "Hypertension" to Yes
6. Click Save
7. Should: Save record, show success
8. Switch to List tab
9. Should: Show "Diabetes, Hypertension" in the timeline
```

#### Scenario 3: Subsequent Visit - Copy Previous
```
1. Simulation: "Prev" (has previous visit)
2. Should show: Previous visit banner with conditions
3. Check "Copy from Previous Visit"
4. Should: 
   - Hide previous visit banner
   - Auto-select "Yes" for Past History
   - Show table with copied conditions
5. Modify if needed
6. Click Save
7. Switch to List tab
8. Should: Show both visits in timeline
```

#### Scenario 4: Subsequent Visit - Fresh Entry
```
1. Simulation: "Prev" (has previous visit)
2. Should show: Previous visit banner
3. DO NOT check "Copy from Previous Visit"
4. Click "Yes" on Past History question
5. Should: Show table with fresh default conditions
6. Fill in conditions
7. Click Save
8. Switch to List tab
9. Should: Show all visits including new one
```

#### Scenario 5: View Historical Visit
```
1. Go to List tab
2. Click "View" on any visit
3. Should: Open modal with full visit details
4. Should: Be read-only
5. Click Close
6. Should: Return to list view
```

---

## File Changes Required

### store.ts (Major Refactor)
1. Add new state properties
2. Add localStorage persistence methods
3. Fix `setCopyFromPreviousVisit()` to hide banner
4. Fix `setSimulationMode()` to reset properly
5. Add `saveVisit()` method with localStorage
6. Add `loadFromStorage()` method

### view.tsx (UI Updates)
1. Update `HeaderControls` to respect `showPreviousVisitBanner`
2. Add save success feedback
3. Improve empty states
4. Add loading states if needed

### types.ts (Minor Updates)
1. Add `isSaved` field to visit record if needed
2. Add any new type definitions

### styles.module.css (Polish)
1. Add success state styles
2. Add disabled button styles
3. Add transition animations

---

## Success Criteria

1. ✅ First visit simulation works end-to-end without errors
2. ✅ Subsequent visit simulation works with copy functionality
3. ✅ "Copy from Previous Visit" hides the banner after copying
4. ✅ Data persists in localStorage across page refreshes
5. ✅ List tab shows all saved visits accurately
6. ✅ View modal shows complete visit details
7. ✅ No console errors or warnings
8. ✅ Smooth transitions between states
9. ✅ Doctor can complete full workflow without confusion

---

## Estimated Implementation Time

| Phase | Description | Time |
|-------|-------------|------|
| Phase 1 | Fix Core State Management | 30 mins |
| Phase 2 | localStorage Persistence | 20 mins |
| Phase 3 | UI Improvements | 30 mins |
| Phase 4 | Testing & Polish | 20 mins |
| **Total** | | **~100 mins** |

---

## Next Steps

1. Review this plan and confirm the approach
2. Implement Phase 1 (core state fixes)
3. Test each simulation scenario
4. Implement Phase 2 (localStorage)
5. Polish UI in Phase 3
6. Final testing in Phase 4

---

*Created: 2025-12-26*
*Module: Past History 2*
*Status: Planning*
