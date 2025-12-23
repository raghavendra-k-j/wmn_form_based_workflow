import { makeAutoObservable } from 'mobx';

/** Result Options */
export type NormalAbnormal = '' | 'normal' | 'abnormal';
export type Presentation = '' | 'cephalic' | 'others';

/** Fetus Record for Growth Scan */
export interface GrowthScanFetusRecord {
  id: string;
  fetusNumber: number;
  ac: NormalAbnormal;
  afi: NormalAbnormal;
  dopler: NormalAbnormal;
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
  scanTechName: string = '';
  doctorName: string = '';
  scanReport: File | null = null;

  // Fetus records
  fetusRecords: GrowthScanFetusRecord[] = [
    { id: generateFetusId(), fetusNumber: 1, ac: '', afi: '', dopler: '', presentation: '', efw: '', comments: '' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setUSGDate(date: string) {
    this.usgDate = date;
  }

  setScanTechName(name: string) {
    this.scanTechName = name;
  }

  setDoctorName(name: string) {
    this.doctorName = name;
  }

  setScanReport(file: File | null) {
    this.scanReport = file;
  }

  updateFetusRecord(id: string, field: keyof GrowthScanFetusRecord, value: string | number) {
    const record = this.fetusRecords.find(r => r.id === id);
    if (record) {
      (record as any)[field] = value;
    }
  }

  addFetusRecord() {
    const nextNumber = this.fetusRecords.length + 1;
    this.fetusRecords.push({
      id: generateFetusId(),
      fetusNumber: nextNumber,
      ac: '',
      afi: '',
      dopler: '',
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
