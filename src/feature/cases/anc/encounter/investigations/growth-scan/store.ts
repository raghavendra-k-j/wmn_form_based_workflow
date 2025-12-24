import { makeAutoObservable } from 'mobx';

/** Result Options */
export type NormalAbnormal = '' | 'normal' | 'abnormal';
export type NormalBorderlineAbnormal = '' | 'normal' | 'borderline' | 'abnormal';
export type Presentation = '' | 'cephalic' | 'others';

/** Doppler Abnormality Types */
export type DopplerAbnormality = '' 
  | 'absent_eddv' 
  | 'reversed_eddv' 
  | 'increased_pi' 
  | 'increased_ri' 
  | 'notched_uterine' 
  | 'raised_mca_pi'
  | 'low_cpr'
  | 'other';

export const DOPPLER_ABNORMALITY_OPTIONS: { value: DopplerAbnormality; label: string }[] = [
  { value: '', label: 'Select Type' },
  { value: 'absent_eddv', label: 'Absent End-Diastolic Flow (AEDF)' },
  { value: 'reversed_eddv', label: 'Reversed End-Diastolic Flow (REDF)' },
  { value: 'increased_pi', label: 'Increased Pulsatility Index (PI)' },
  { value: 'increased_ri', label: 'Increased Resistance Index (RI)' },
  { value: 'notched_uterine', label: 'Notched Uterine Artery' },
  { value: 'raised_mca_pi', label: 'Raised MCA PI' },
  { value: 'low_cpr', label: 'Low CPR (Cerebro-Placental Ratio)' },
  { value: 'other', label: 'Other' },
];

/** Fetus Record for Growth Scan */
export interface GrowthScanFetusRecord {
  id: string;
  fetusNumber: number;
  afi: NormalBorderlineAbnormal;
  dopler: NormalAbnormal;
  doplerAbnormalityType: DopplerAbnormality; // New: specific abnormality type
  presentation: Presentation;
  efw: string;
  comments: string;
}

let fetusIdCounter = 1;
const generateFetusId = () => `gs_fetus_${fetusIdCounter++}`;

/** Growth Scan Store */
export class GrowthScanStore {
  // Header fields
  usgDate: string = '';
  scanReport: File | null = null;

  // Fetus records
  fetusRecords: GrowthScanFetusRecord[] = [
    { id: generateFetusId(), fetusNumber: 1, afi: '', dopler: '', doplerAbnormalityType: '', presentation: '', efw: '', comments: '' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setUSGDate(date: string) {
    this.usgDate = date;
  }

  setScanReport(file: File | null) {
    this.scanReport = file;
  }

  updateFetusRecord(id: string, field: keyof GrowthScanFetusRecord, value: string | number) {
    const record = this.fetusRecords.find(r => r.id === id);
    if (record) {
      (record as any)[field] = value;
      // Clear doppler abnormality type if doppler is changed to normal or empty
      if (field === 'dopler' && value !== 'abnormal') {
        record.doplerAbnormalityType = '';
      }
    }
  }

  addFetusRecord() {
    const nextNumber = this.fetusRecords.length + 1;
    this.fetusRecords.push({
      id: generateFetusId(),
      fetusNumber: nextNumber,
      afi: '',
      dopler: '',
      doplerAbnormalityType: '',
      presentation: '',
      efw: '',
      comments: '',
    });
  }

  removeFetusRecord(id: string) {
    this.fetusRecords = this.fetusRecords.filter(r => r.id !== id);
    this.fetusRecords.forEach((r, i) => {
      r.fetusNumber = i + 1;
    });
  }
}
