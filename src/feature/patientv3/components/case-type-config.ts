import { Users, Baby, Stethoscope } from 'lucide-react';

/** Case Type Definition */
export type CaseType = 'anc' | 'pnc' | 'gynae';

/** Case Interface */
export interface Case {
  id: string;
  type: CaseType;
  title: string;
  startDate: string;
  lastVisit: string;
  nextFollowUp: string;
  status: 'Active' | 'Closed' | 'On Hold';
  visitCount: number;
  complaints?: string;
}

/** Case Type Configuration */
export interface CaseTypeConfigItem {
  label: string;
  fullLabel: string;
  singularLabel: string;
  icon: typeof Users | typeof Baby | typeof Stethoscope;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

/** Case Type Configuration Map */
export const CASE_TYPE_CONFIG: Record<CaseType, CaseTypeConfigItem> = {
  anc: { 
    label: 'ANC', 
    fullLabel: 'Antenatal Visits',
    singularLabel: 'Antenatal Visit',
    icon: Users, 
    bgColor: 'bg-emerald-50', 
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200'
  },
  pnc: { 
    label: 'PNC', 
    fullLabel: 'Postnatal Visits',
    singularLabel: 'Postnatal Visit',
    icon: Baby, 
    bgColor: 'bg-rose-50', 
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200'
  },
  gynae: { 
    label: 'Gynae', 
    fullLabel: 'Gynaecological Visits',
    singularLabel: 'Gynae Visit',
    icon: Stethoscope, 
    bgColor: 'bg-amber-50', 
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200'
  },
};

/** Menu Visit Types - For Sidebar Navigation */
export const VISIT_TYPES = [
  { 
    id: 'anc' as const, 
    label: 'Antenatal Visits', 
    icon: Users, 
    bgColor: 'bg-emerald-50', 
    textColor: 'text-emerald-600' 
  },
  { 
    id: 'pnc' as const, 
    label: 'Postnatal Visits', 
    icon: Baby, 
    bgColor: 'bg-rose-50', 
    textColor: 'text-rose-600' 
  },
  { 
    id: 'gynae' as const, 
    label: 'Gynaecological Visits', 
    icon: Stethoscope, 
    bgColor: 'bg-amber-50', 
    textColor: 'text-amber-600' 
  },
];
