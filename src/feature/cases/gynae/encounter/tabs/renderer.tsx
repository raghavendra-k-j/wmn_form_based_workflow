import { observer } from 'mobx-react-lite';
import { GuyiniEncounterTab } from '../store';
import {
  VisitFormContent,
  PastHistoryContent,
  SurgicalHistoryContent,
  FamilyHistoryContent,
  PersonalHistoryContent,
  CurrentMedicationsContent,
  AllergiesContent,
  ExaminationsContent,
  ManagementContent,
  MedicalHistoryOverviewContent,
} from './index';

interface TabContentProps {
  tab: GuyiniEncounterTab;
}

export const TabContent = observer(({ tab }: TabContentProps) => {
  switch (tab) {
    case GuyiniEncounterTab.VISIT_FORM:
      return <VisitFormContent />;
    case GuyiniEncounterTab.MEDICAL_HISTORY_OVERVIEW:
      return <MedicalHistoryOverviewContent />;
    case GuyiniEncounterTab.PAST_HISTORY:
      return <PastHistoryContent />;
    case GuyiniEncounterTab.SURGICAL_HISTORY:
      return <SurgicalHistoryContent />;
    case GuyiniEncounterTab.FAMILY_HISTORY:
      return <FamilyHistoryContent />;
    case GuyiniEncounterTab.PERSONAL_HISTORY:
      return <PersonalHistoryContent />;
    case GuyiniEncounterTab.CURRENT_MEDICATIONS:
      return <CurrentMedicationsContent />;
    case GuyiniEncounterTab.ALLERGIES:
      return <AllergiesContent />;
    case GuyiniEncounterTab.EXAMINATIONS:
      return <ExaminationsContent />;
    case GuyiniEncounterTab.MANAGEMENT:
      return <ManagementContent />;
    default:
      return null;
  }
});

