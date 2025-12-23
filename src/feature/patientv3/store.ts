/** Patient interface */
export interface Patient {
  name: string;
  uhid: string;
  email: string;
  phone: string;
  whatsapp?: string;
  alternativePhone?: string;
  dateOfBirth: string;
  age: number;
  bloodGroup: string;
  occupation: string;
  photo?: string;
  // Address
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  // Emergency
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  // Husband Information
  husbandName?: string;
  husbandOccupation?: string;
  husbandBloodGroup?: string;
}

/** Patient V3 Store - Manages patient details state */
export class PatientV3Store {
  patientId: string;

  patient: Patient = {
    name: 'Emily Davis',
    uhid: 'WMN100001',
    email: 'emily.davis@email.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    alternativePhone: '+91 87654 32109',
    dateOfBirth: '1995-05-15',
    age: 28,
    bloodGroup: 'O+',
    occupation: 'Software Engineer',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    addressLine1: 'Flat 402, Green Valley Apartments',
    addressLine2: 'HSR Layout, Sector 2',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    pinCode: '560102',
    emergencyContactName: 'Robert Davis',
    emergencyRelationship: 'Spouse',
    emergencyPhone: '+91 99887 76655',
    husbandName: 'Robert Davis',
    husbandOccupation: 'Business Analyst',
    husbandBloodGroup: 'A+',
  };

  private listeners: (() => void)[] = [];

  constructor(patientId: string) {
    this.patientId = patientId;
  }

  /** Subscribe to store changes */
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /** Notify listeners of changes */
  private notify() {
    this.listeners.forEach(l => l());
  }

  /** Load patient data */
  async loadPatient(): Promise<void> {
    // TODO: Implement API call to load patient data
    console.log(`Loading patient: ${this.patientId}`);
    this.notify();
  }

  /** Update patient data */
  async updatePatient(_data: Record<string, unknown>): Promise<void> {
    // TODO: Implement API call to update patient data
    console.log(`Updating patient: ${this.patientId}`);
    this.notify();
  }

  /** Refresh patient data */
  async refresh(): Promise<void> {
    await this.loadPatient();
  }
}
