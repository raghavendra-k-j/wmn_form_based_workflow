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
  scanTechName: string = '';
  doctorName: string = '';
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

  setScanTechName(name: string) {
    this.scanTechName = name;
  }

  setDoctorName(name: string) {
    this.doctorName = name;
  }

  setScanReport(file: File | null) {
    this.scanReport = file;
  }

  updateFetusRecord(id: string, field: keyof FetusRecord, value: string | number) {
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
      nt: '',
      nb: '',
      biochem: '',
      uad: '',
      comments: '',
    });
  }

  removeFetusRecord(id: string) {
    this.fetusRecords = this.fetusRecords.filter(r => r.id !== id);
    // Renumber remaining
    this.fetusRecords.forEach((r, i) => {
      r.fetusNumber = i + 1;
    });
  }
}
