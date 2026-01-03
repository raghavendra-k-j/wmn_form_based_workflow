import { z } from "zod";
import { PatientFamilyHistorySchema } from "./patient-family-history";

export const FamilyHistoryRecordSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  hasFamilyHistory: z.boolean(),
  items: z.array(PatientFamilyHistorySchema),
  capturedDate: z.string(),
});

export type FamilyHistoryRecord = z.infer<typeof FamilyHistoryRecordSchema>;
