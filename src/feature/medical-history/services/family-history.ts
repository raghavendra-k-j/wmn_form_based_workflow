import localforage from "localforage";
import { api } from "./sample-data-api";
import type { FamilyHistoryMaster, PatientFamilyHistory, FamilyHistoryRecord } from "../family-history2/types";

const STORAGE_KEYS = {
  FAMILY_HISTORY_RECORDS: "family_history_records",
};

localforage.config({
  name: "medical-history-db",
  storeName: "family_history",
});

export const familyHistoryService = {
  async getMasterData(): Promise<FamilyHistoryMaster[]> {
    try {
      const response = await api.get("/sample-data/family-history-master.json");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch family history master data:", error);
      throw error;
    }
  },

  async getPatientRecords(patientId: string): Promise<FamilyHistoryRecord[]> {
    try {
      const allRecords = await localforage.getItem<Record<string, FamilyHistoryRecord[]>>(
        STORAGE_KEYS.FAMILY_HISTORY_RECORDS
      );
      return allRecords?.[patientId] || [];
    } catch (error) {
      console.error("Failed to fetch patient family history records:", error);
      return [];
    }
  },

  async getLatestRecord(patientId: string): Promise<FamilyHistoryRecord | null> {
    try {
      const records = await this.getPatientRecords(patientId);
      if (records.length === 0) return null;
      return records[records.length - 1];
    } catch (error) {
      console.error("Failed to fetch latest family history record:", error);
      return null;
    }
  },

  async saveRecord(patientId: string, record: FamilyHistoryRecord): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, FamilyHistoryRecord[]>>(
        STORAGE_KEYS.FAMILY_HISTORY_RECORDS
      );
      
      const updatedRecords = {
        ...allRecords,
        [patientId]: [...(allRecords?.[patientId] || []), record],
      };

      await localforage.setItem(STORAGE_KEYS.FAMILY_HISTORY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to save family history record:", error);
      throw error;
    }
  },

  async updateRecord(
    patientId: string,
    recordId: string,
    updatedRecord: FamilyHistoryRecord
  ): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, FamilyHistoryRecord[]>>(
        STORAGE_KEYS.FAMILY_HISTORY_RECORDS
      );

      if (!allRecords?.[patientId]) {
        throw new Error("No records found for patient");
      }

      const patientRecords = allRecords[patientId];
      const recordIndex = patientRecords.findIndex((r) => r.id === recordId);

      if (recordIndex === -1) {
        throw new Error("Record not found");
      }

      patientRecords[recordIndex] = updatedRecord;

      await localforage.setItem(STORAGE_KEYS.FAMILY_HISTORY_RECORDS, allRecords);
    } catch (error) {
      console.error("Failed to update family history record:", error);
      throw error;
    }
  },

  async deleteRecord(patientId: string, recordId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, FamilyHistoryRecord[]>>(
        STORAGE_KEYS.FAMILY_HISTORY_RECORDS
      );

      if (!allRecords?.[patientId]) {
        throw new Error("No records found for patient");
      }

      const updatedRecords = {
        ...allRecords,
        [patientId]: allRecords[patientId].filter((r) => r.id !== recordId),
      };

      await localforage.setItem(STORAGE_KEYS.FAMILY_HISTORY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to delete family history record:", error);
      throw error;
    }
  },

  async clearAllRecords(patientId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, FamilyHistoryRecord[]>>(
        STORAGE_KEYS.FAMILY_HISTORY_RECORDS
      );

      if (allRecords) {
        delete allRecords[patientId];
        await localforage.setItem(STORAGE_KEYS.FAMILY_HISTORY_RECORDS, allRecords);
      }
    } catch (error) {
      console.error("Failed to clear family history records:", error);
      throw error;
    }
  },
};
