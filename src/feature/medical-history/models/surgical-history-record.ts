import { z } from "zod";
import { PatientSurgicalHistorySchema } from "./patient-surgical-history";

export const SurgicalHistoryRecordSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  hasSurgicalHistory: z.boolean(),
  items: z.array(PatientSurgicalHistorySchema),
  capturedDate: z.string(),
});

export type SurgicalHistoryRecord = z.infer<typeof SurgicalHistoryRecordSchema>;
