import { makeAutoObservable } from 'mobx';

/** Result Options */
export type NormalAbnormal = '' | 'normal' | 'abnormal';

/** Fetus Record for Anomaly Scan */
export interface AnomalyScanFetusRecord {
  id: string;
  fetusNumber: number;
  fetus: NormalAbnormal;
  placenta: NormalAbnormal;
  cervix: NormalAbnormal;
  uad: NormalAbnormal;
  comments: string;
}

let fetusIdCounter = 1;
const generateFetusId = () => `as_fetus_${fetusIdCounter++}`;

/** Anomaly Scan Store */
export class AnomalyScanStore {
  // Header fields
  usgDate: string = '';
  scanTechName: string = '';
  doctorName: string = '';
  scanReport: File | null = null;

  // Fetus records
  fetusRecords: AnomalyScanFetusRecord[] = [
    { id: generateFetusId(), fetusNumber: 1, fetus: '', placenta: '', cervix: '', uad: '', comments: '' },
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

  updateFetusRecord(id: string, field: keyof AnomalyScanFetusRecord, value: string | number) {
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
      fetus: '',
      placenta: '',
      cervix: '',
      uad: '',
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
