import localforage from "localforage";
import { api } from "./sample-data-api";
import type { SurgicalHistoryMaster, SurgicalHistoryRecord } from "../surgical-history2/types";

const STORAGE_KEYS = {
  SURGICAL_HISTORY_RECORDS: "surgical_history_records",
};

localforage.config({
  name: "medical-history-db",
  storeName: "surgical_history",
});

export const surgicalHistoryService = {
  async getMasterData(): Promise<SurgicalHistoryMaster[]> {
    try {
      const response = await api.get("/sample-data/surgical-history-master.json");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch surgical history master data:", error);
      throw error;
    }
  },

  async getPatientRecords(patientId: string): Promise<SurgicalHistoryRecord[]> {
    try {
      const allRecords = await localforage.getItem<Record<string, SurgicalHistoryRecord[]>>(
        STORAGE_KEYS.SURGICAL_HISTORY_RECORDS
      );
      return allRecords?.[patientId] || [];
    } catch (error) {
      console.error("Failed to fetch patient surgical history records:", error);
      return [];
    }
  },

  async getLatestRecord(patientId: string): Promise<SurgicalHistoryRecord | null> {
    try {
      const records = await this.getPatientRecords(patientId);
      if (records.length === 0) return null;
      return records[records.length - 1];
    } catch (error) {
      console.error("Failed to fetch latest surgical history record:", error);
      return null;
    }
  },

  async saveRecord(patientId: string, record: SurgicalHistoryRecord): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, SurgicalHistoryRecord[]>>(
        STORAGE_KEYS.SURGICAL_HISTORY_RECORDS
      );
      
      const updatedRecords = {
        ...allRecords,
        [patientId]: [...(allRecords?.[patientId] || []), record],
      };

      await localforage.setItem(STORAGE_KEYS.SURGICAL_HISTORY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to save surgical history record:", error);
      throw error;
    }
  },

  async deleteRecord(patientId: string, recordId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, SurgicalHistoryRecord[]>>(
        STORAGE_KEYS.SURGICAL_HISTORY_RECORDS
      );

      if (!allRecords?.[patientId]) {
        throw new Error("No records found for patient");
      }

      const updatedRecords = {
        ...allRecords,
        [patientId]: allRecords[patientId].filter((r) => r.id !== recordId),
      };

      await localforage.setItem(STORAGE_KEYS.SURGICAL_HISTORY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to delete surgical history record:", error);
      throw error;
    }
  },

  async clearAllRecords(patientId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, SurgicalHistoryRecord[]>>(
        STORAGE_KEYS.SURGICAL_HISTORY_RECORDS
      );

      if (allRecords) {
        delete allRecords[patientId];
        await localforage.setItem(STORAGE_KEYS.SURGICAL_HISTORY_RECORDS, allRecords);
      }
    } catch (error) {
      console.error("Failed to clear surgical history records:", error);
      throw error;
    }
  },
};
