import localforage from "localforage";
import { api } from "./sample-data-api";
import type { DrugAllergyMaster, DrugAllergyRecord } from "../drug-allergies2/types";

const STORAGE_KEYS = {
  DRUG_ALLERGY_RECORDS: "drug_allergy_records",
};

localforage.config({
  name: "medical-history-db",
  storeName: "drug_allergies",
});

export const drugAllergyService = {
  async getMasterData(): Promise<DrugAllergyMaster[]> {
    try {
      const response = await api.get("/sample-data/drug-allergies-master.json");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch drug allergies master data:", error);
      throw error;
    }
  },

  async getPatientRecords(patientId: string): Promise<DrugAllergyRecord[]> {
    try {
      const allRecords = await localforage.getItem<Record<string, DrugAllergyRecord[]>>(
        STORAGE_KEYS.DRUG_ALLERGY_RECORDS
      );
      return allRecords?.[patientId] || [];
    } catch (error) {
      console.error("Failed to fetch patient drug allergy records:", error);
      return [];
    }
  },

  async saveRecord(patientId: string, record: DrugAllergyRecord): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, DrugAllergyRecord[]>>(
        STORAGE_KEYS.DRUG_ALLERGY_RECORDS
      );
      
      const updatedRecords = {
        ...allRecords,
        [patientId]: [...(allRecords?.[patientId] || []), record],
      };

      await localforage.setItem(STORAGE_KEYS.DRUG_ALLERGY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to save drug allergy record:", error);
      throw error;
    }
  },

  async deleteRecord(patientId: string, recordId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, DrugAllergyRecord[]>>(
        STORAGE_KEYS.DRUG_ALLERGY_RECORDS
      );

      if (!allRecords?.[patientId]) {
        throw new Error("No records found for patient");
      }

      const updatedRecords = {
        ...allRecords,
        [patientId]: allRecords[patientId].filter((r) => r.id !== recordId),
      };

      await localforage.setItem(STORAGE_KEYS.DRUG_ALLERGY_RECORDS, updatedRecords);
    } catch (error) {
      console.error("Failed to delete drug allergy record:", error);
      throw error;
    }
  },

  async clearAllRecords(patientId: string): Promise<void> {
    try {
      const allRecords = await localforage.getItem<Record<string, DrugAllergyRecord[]>>(
        STORAGE_KEYS.DRUG_ALLERGY_RECORDS
      );

      if (allRecords) {
        delete allRecords[patientId];
        await localforage.setItem(STORAGE_KEYS.DRUG_ALLERGY_RECORDS, allRecords);
      }
    } catch (error) {
      console.error("Failed to clear drug allergy records:", error);
      throw error;
    }
  },
};
