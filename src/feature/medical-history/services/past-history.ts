import localforage from "localforage";
import { api } from "./sample-data-api";
import type { PastHistoryMaster } from "../models/past-history-master";
import type { PatientPastHistory } from "../models/patient-past-history";
import type { PastHistoryRecord } from "../models/past-history-record";

const STORAGE_KEYS = {
  PAST_HISTORY_RECORDS: "past_history_records",
};

localforage.config({
  name: "medical-history-db",
  storeName: "past_history",
});

export const pastHistoryService = {
  async getMasterData(): Promise<PastHistoryMaster[]> {
    try {
      const response = await api.get("/sample-data/past-history-master.json");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch past history master data:", error);
      throw error;
    }
  },

  async getPatientRecords(patientId: string): Promise<PastHistoryRecord[]> {
    try {
      const allRecords = await localforage.getItem<Record<string, PastHistoryRecord[]>>(
        STORAGE_KEYS.PAST_HISTORY_RECORDS
      );
      return allRecords?.[patientId] || [];
    } catch (error) {
      console.error("Failed to fetch patient past history records:", error);
      return [];
    }
  },

  async getLatestRecord(patientId: string): Promise<PastHistoryRecord | null> {
    try {
      const records = await this.getPatientRecords(patientId);
      if (records.length === 0) return null;
      return records[records.length - 1];
    } catch (error) {
      console.error("Failed to fetch latest past history record:", error);
      return null;
    }
  },

  async saveRecord(patientId: string, record: PastHistoryRecord): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, PastHistoryRecord[]>>(
        STORAGE_KEYS.PAST_HISTORY_RECORDS
      );
      
      const updatedRecords = {
        ...allRecords,
        [patientId]: [...(allRecords?.[patientId] || []), record],
      };

      await localforage.setItem(STORAGE_KEYS.PAST_HISTORY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to save past history record:", error);
      throw error;
    }
  },

  async updateRecord(
    patientId: string,
    recordId: string,
    updatedRecord: PastHistoryRecord
  ): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, PastHistoryRecord[]>>(
        STORAGE_KEYS.PAST_HISTORY_RECORDS
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

      await localforage.setItem(STORAGE_KEYS.PAST_HISTORY_RECORDS, allRecords);
    } catch (error) {
      console.error("Failed to update past history record:", error);
      throw error;
    }
  },

  async deleteRecord(patientId: string, recordId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, PastHistoryRecord[]>>(
        STORAGE_KEYS.PAST_HISTORY_RECORDS
      );

      if (!allRecords?.[patientId]) {
        throw new Error("No records found for patient");
      }

      const updatedRecords = {
        ...allRecords,
        [patientId]: allRecords[patientId].filter((r) => r.id !== recordId),
      };

      await localforage.setItem(STORAGE_KEYS.PAST_HISTORY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to delete past history record:", error);
      throw error;
    }
  },

  async clearAllRecords(patientId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, PastHistoryRecord[]>>(
        STORAGE_KEYS.PAST_HISTORY_RECORDS
      );

      if (allRecords) {
        delete allRecords[patientId];
        await localforage.setItem(STORAGE_KEYS.PAST_HISTORY_RECORDS, allRecords);
      }
    } catch (error) {
      console.error("Failed to clear past history records:", error);
      throw error;
    }
  },
};
