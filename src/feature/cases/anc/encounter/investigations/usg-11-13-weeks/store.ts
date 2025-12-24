import { makeAutoObservable } from 'mobx';

/** Result Options */
export type NormalAbnormal = '' | 'normal' | 'abnormal';
export type PosNeg = '' | 'pos' | 'neg';

/** Fetus Record for 11-13 weeks scan */
export interface FetusRecord {
  id: string;
  fetusNumber: number;
  nt: NormalAbnormal;
  nb: NormalAbnormal;
  biochem: NormalAbnormal;
  uad: PosNeg;
  comments: string;
}

let fetusIdCounter = 1;
const generateFetusId = () => `fetus_${fetusIdCounter++}`;

/** USG 11-13 Weeks Store */
export class USG1113WeeksStore {
  // Header fields
  usgDate: string = '';
  scanEDD: string = '';
  scanReport: File | null = null;

  // Fetus records
  fetusRecords: FetusRecord[] = [
    { id: generateFetusId(), fetusNumber: 1, nt: '', nb: '', biochem: '', uad: '', comments: '' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setUSGDate(date: string) {
    this.usgDate = date;
  }

  setScanEDD(edd: string) {
    this.scanEDD = edd;
  }

  setScanReport(file: File | null) {
    this.scanReport = file;
  }

  /** Sync fetus records to match the shared fetus count */
  syncFetusCount(count: number) {
    const currentCount = this.fetusRecords.length;
    
    if (count > currentCount) {
      // Add more rows
      for (let i = currentCount; i < count; i++) {
        this.fetusRecords.push({
          id: generateFetusId(),
          fetusNumber: i + 1,
          nt: '',
          nb: '',
          biochem: '',
          uad: '',
          comments: '',
        });
      }
    } else if (count < currentCount) {
      // Remove extra rows
      this.fetusRecords = this.fetusRecords.slice(0, count);
    }
  }

  updateFetusRecord(id: string, field: keyof FetusRecord, value: string | number) {
    const record = this.fetusRecords.find(r => r.id === id);
    if (record) {
      (record as any)[field] = value;
    }
  }
}
