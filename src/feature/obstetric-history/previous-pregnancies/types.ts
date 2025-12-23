// Types specific to Previous Pregnancies module
import type { PregnancyRecord } from '../shared/types';

/** Previous Pregnancies state - only past pregnancies, no current/ongoing */
export interface PreviousPregnanciesState {
  records: PregnancyRecord[];
}

/** Mock Previous Visit Data for copy-from functionality */
export const MOCK_PREVIOUS_VISIT_DATA: PregnancyRecord[] = [
  {
    id: 'prev-1',
    outcome: 'Live Birth',
    year: '2019',
    gestationWeeks: 39,
    deliveryMode: 'NVD',
    birthWeight: '3.1 kg',
    gender: 'Female',
    babyStatus: 'Living',
    complications: [],
    remarks: 'Uncomplicated delivery',
  },
  {
    id: 'prev-2',
    outcome: 'Miscarriage',
    year: '2021',
    gestationWeeks: 8,
    deliveryMode: 'NA',
    birthWeight: '',
    gender: 'NA',
    babyStatus: 'NA',
    complications: [],
    remarks: 'Spontaneous',
  },
];

export const MOCK_PREVIOUS_VISIT_DATE = '2024-12-15';
