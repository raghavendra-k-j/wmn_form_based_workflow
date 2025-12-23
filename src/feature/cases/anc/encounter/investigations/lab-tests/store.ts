import { makeAutoObservable } from 'mobx';

/** Lab Test Record Interface */
export interface LabTestRecord {
  id: string;
  name: string;
  value: string;
  date: string;
  notes: string;
  isQualitative?: boolean;
  options?: string[];
  attachedFile?: File | null;
}

/** Uploaded File Record */
export interface UploadedFileRecord {
  id: string;
  file: File;
  uploadedAt: Date;
}

/** Default Lab Tests */
export const DEFAULT_LAB_TESTS: Omit<LabTestRecord, 'id'>[] = [
  { name: 'Hb', value: '', date: '', notes: '' },
  { name: 'PCV', value: '', date: '', notes: '' },
  { name: 'Platelets', value: '', date: '', notes: '' },
  { name: 'RBS', value: '', date: '', notes: '' },
  { name: 'FBS', value: '', date: '', notes: '' },
  { name: 'PPBS', value: '', date: '', notes: '' },
  { name: 'OGCT', value: '', date: '', notes: '' },
  { name: 'PT', value: '', date: '', notes: '' },
  { name: 'Urine Test', value: '', date: '', notes: '' },
  { name: 'TSH', value: '', date: '', notes: '' },
  { name: 'Rubella IgG', value: '', date: '', notes: '' },
  { name: 'VDRL', value: '', date: '', notes: '', isQualitative: true, options: ['Pos', 'Neg'] },
  { name: 'HIV', value: '', date: '', notes: '', isQualitative: true, options: ['Pos', 'Neg'] },
  { name: 'HbsAg', value: '', date: '', notes: '', isQualitative: true, options: ['Pos', 'Neg'] },
  { name: 'ICT', value: '', date: '', notes: '' },
  { name: 'GTT', value: '', date: '', notes: '' },
  { name: 'APTT', value: '', date: '', notes: '' },
];

let testIdCounter = 1;
const generateId = () => `test_${testIdCounter++}`;

/** Lab Tests Store */
export class LabTestsStore {
  tests: LabTestRecord[] = DEFAULT_LAB_TESTS.map(t => ({ ...t, id: generateId() }));
  globalDate: string = '';
  applyDateToAll: boolean = false;
  uploadedFiles: UploadedFileRecord[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateTest(id: string, field: keyof LabTestRecord, value: string | File | null) {
    const test = this.tests.find(t => t.id === id);
    if (test) {
      (test as any)[field] = value;
    }
  }

  setGlobalDate(date: string) {
    this.globalDate = date;
    if (this.applyDateToAll) {
      this.applyGlobalDateToAll();
    }
  }

  toggleApplyDateToAll(checked: boolean) {
    this.applyDateToAll = checked;
    if (checked && this.globalDate) {
      this.applyGlobalDateToAll();
    }
  }

  applyGlobalDateToAll() {
    this.tests.forEach(test => {
      test.date = this.globalDate;
    });
  }

  addTest(name: string = '') {
    this.tests.push({
      id: generateId(),
      name,
      value: '',
      date: this.applyDateToAll ? this.globalDate : '',
      notes: '',
    });
  }

  removeTest(id: string) {
    this.tests = this.tests.filter(t => t.id !== id);
  }

  attachFile(testId: string, file: File) {
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      test.attachedFile = file;
    }
  }

  removeAttachedFile(testId: string) {
    const test = this.tests.find(t => t.id === testId);
    if (test) {
      test.attachedFile = null;
    }
  }

  addUploadedFile(file: File) {
    this.uploadedFiles.push({
      id: `file_${Date.now()}`,
      file,
      uploadedAt: new Date(),
    });
  }

  removeUploadedFile(id: string) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== id);
  }
}
