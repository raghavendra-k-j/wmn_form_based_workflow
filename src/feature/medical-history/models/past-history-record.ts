import { z } from "zod";
import { PatientPastHistorySchema } from "./patient-past-history";

export const PastHistoryRecordSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  hasPastHistory: z.boolean(),
  items: z.array(PatientPastHistorySchema),
  capturedDate: z.string(),
});

export type PastHistoryRecord = z.infer<typeof PastHistoryRecordSchema>;
