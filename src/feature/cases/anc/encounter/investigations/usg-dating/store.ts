import { makeAutoObservable } from 'mobx';

/** Fetus Type Options */
export type FetusType = 'single' | 'twins' | 'triplets';

/** USG Dating Record */
export interface USGDatingRecord {
  usgDate: string;
  fetusType: FetusType;
  fetusCount: number;
  result: string;
  comments: string;
  scanReport: File | null;
  scanTechName: string;
  doctorName: string;
}

/** USG Dating Store */
export class USGDatingStore {
  usgDate: string = '';
  fetusType: FetusType = 'single';
  fetusCount: number = 1;
  result: string = '';
  comments: string = '';
  scanReport: File | null = null;
  scanTechName: string = '';
  doctorName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUSGDate(date: string) {
    this.usgDate = date;
  }

  setFetusType(type: FetusType) {
    this.fetusType = type;
    // Auto-set fetus count based on type
    switch (type) {
      case 'single': this.fetusCount = 1; break;
      case 'twins': this.fetusCount = 2; break;
      case 'triplets': this.fetusCount = 3; break;
    }
  }

  setFetusCount(count: number) {
    this.fetusCount = count;
    // Auto-set type based on count
    if (count === 1) this.fetusType = 'single';
    else if (count === 2) this.fetusType = 'twins';
    else if (count >= 3) this.fetusType = 'triplets';
  }

  setResult(result: string) {
    this.result = result;
  }

  setComments(comments: string) {
    this.comments = comments;
  }

  setScanReport(file: File | null) {
    this.scanReport = file;
  }

  setScanTechName(name: string) {
    this.scanTechName = name;
  }

  setDoctorName(name: string) {
    this.doctorName = name;
  }

  getData(): USGDatingRecord {
    return {
      usgDate: this.usgDate,
      fetusType: this.fetusType,
      fetusCount: this.fetusCount,
      result: this.result,
      comments: this.comments,
      scanReport: this.scanReport,
      scanTechName: this.scanTechName,
      doctorName: this.doctorName,
    };
  }
}
