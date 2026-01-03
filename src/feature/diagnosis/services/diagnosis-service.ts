import localforage from "localforage";
import type { ICDCode, DiagnosisCategory, DiagnosisRecord, PatientDiagnosis, DiagnosisStatus } from "../types";

const STORAGE_KEYS = {
  DIAGNOSIS_RECORDS: "diagnosis_records",
};

localforage.config({
  name: "medical-history-db",
  storeName: "diagnosis",
});

export const diagnosisService = {
  async searchICDCodes(query: string): Promise<ICDCode[]> {
    try {
      const response = await fetch("/sample-data/icd10-gynae.json");
      const allCodes: ICDCode[] = await response.json();
      
      if (!query.trim()) return allCodes.slice(0, 10);
      
      const lowerQuery = query.toLowerCase();
      return allCodes.filter(
        code => code.code.toLowerCase().includes(lowerQuery) || 
                code.name.toLowerCase().includes(lowerQuery)
      ).slice(0, 15);
    } catch (error) {
      console.error("Failed to search ICD codes:", error);
      return [];
    }
  },

  async getCategories(): Promise<DiagnosisCategory[]> {
    try {
      const response = await fetch("/sample-data/diagnosis-categories.json");
      return response.json();
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  },

  async getPatientRecords(patientId: string): Promise<DiagnosisRecord[]> {
    try {
      const allRecords = await localforage.getItem<Record<string, DiagnosisRecord[]>>(
        STORAGE_KEYS.DIAGNOSIS_RECORDS
      );
      return allRecords?.[patientId] || [];
    } catch (error) {
      console.error("Failed to fetch diagnosis records:", error);
      return [];
    }
  },

  async getPreviousDiagnoses(patientId: string): Promise<PatientDiagnosis[]> {
    try {
      const records = await this.getPatientRecords(patientId);
      
      // Flatten all diagnoses from all encounters (including current if saved)
      const allDiagnoses: PatientDiagnosis[] = [];
      records.forEach(record => {
        record.diagnoses.forEach(d => {
          // Check if this diagnosis already exists (by ICD code)
          const existing = allDiagnoses.find(ad => ad.icdCode === d.icdCode);
          if (!existing) {
            allDiagnoses.push({ ...d, encounterId: record.encounterId });
          } else if (new Date(d.capturedDate) > new Date(existing.capturedDate)) {
            // Use the most recent version
            const index = allDiagnoses.indexOf(existing);
            allDiagnoses[index] = { ...d, encounterId: record.encounterId };
          }
        });
      });
      
      return allDiagnoses;
    } catch (error) {
      console.error("Failed to fetch previous diagnoses:", error);
      return [];
    }
  },

  async saveRecord(patientId: string, record: DiagnosisRecord): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, DiagnosisRecord[]>>(
        STORAGE_KEYS.DIAGNOSIS_RECORDS
      );
      
      const patientRecords = allRecords?.[patientId] || [];
      const existingIndex = patientRecords.findIndex(r => r.encounterId === record.encounterId);
      
      if (existingIndex >= 0) {
        patientRecords[existingIndex] = record;
      } else {
        patientRecords.push(record);
      }
      
      const updatedRecords = {
        ...allRecords,
        [patientId]: patientRecords,
      };

      await localforage.setItem(STORAGE_KEYS.DIAGNOSIS_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to save diagnosis record:", error);
      throw error;
    }
  },

  async updatePreviousDiagnosisStatus(
    patientId: string, 
    diagnosisId: string, 
    newStatus: DiagnosisStatus
  ): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, DiagnosisRecord[]>>(
        STORAGE_KEYS.DIAGNOSIS_RECORDS
      );
      
      if (!allRecords?.[patientId]) return;
      
      // Find and update the diagnosis in any record
      allRecords[patientId] = allRecords[patientId].map(record => ({
        ...record,
        diagnoses: record.diagnoses.map(d => 
          d.id === diagnosisId ? { ...d, status: newStatus } : d
        )
      }));
      
      await localforage.setItem(STORAGE_KEYS.DIAGNOSIS_RECORDS, allRecords);
    } catch (error) {
      console.error("Failed to update diagnosis status:", error);
      throw error;
    }
  },

  async clearAllRecords(patientId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, DiagnosisRecord[]>>(
        STORAGE_KEYS.DIAGNOSIS_RECORDS
      );

      if (allRecords) {
        delete allRecords[patientId];
        await localforage.setItem(STORAGE_KEYS.DIAGNOSIS_RECORDS, allRecords);
      }
    } catch (error) {
      console.error("Failed to clear diagnosis records:", error);
      throw error;
    }
  },
};
