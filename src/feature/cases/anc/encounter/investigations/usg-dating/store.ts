import { makeAutoObservable } from 'mobx';

/** Fetal Heart Status */
export type FetalHeartStatus = '' | 'present' | 'absent';

/** Per-Fetus Data */
export interface FetusData {
  fetusNumber: number;
  crl: string;  // Crown-Rump Length in mm
  fh: FetalHeartStatus;  // Fetal Heart
}

/** USG Dating Store */
export class USGDatingStore {
  usgDate: string = '';
  scanEDD: string = '';
  
  // Per-fetus data (CRL and FH for each fetus)
  fetusData: FetusData[] = [
    { fetusNumber: 1, crl: '', fh: '' }
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

  /** Sync fetus data array to match the shared fetus count */
  syncFetusCount(count: number) {
    const currentCount = this.fetusData.length;
    
    if (count > currentCount) {
      // Add more rows
      for (let i = currentCount; i < count; i++) {
        this.fetusData.push({ fetusNumber: i + 1, crl: '', fh: '' });
      }
    } else if (count < currentCount) {
      // Remove extra rows
      this.fetusData = this.fetusData.slice(0, count);
    }
  }

  updateFetusData(fetusNumber: number, field: 'crl' | 'fh', value: string) {
    const fetus = this.fetusData.find(f => f.fetusNumber === fetusNumber);
    if (fetus) {
      if (field === 'crl') {
        fetus.crl = value;
      } else if (field === 'fh') {
        fetus.fh = value as FetalHeartStatus;
      }
    }
  }
}
