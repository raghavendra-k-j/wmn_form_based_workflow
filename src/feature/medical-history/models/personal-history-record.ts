import { z } from "zod";
import { PatientPersonalHistorySchema } from "./patient-personal-history";

export const PersonalHistoryRecordSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  hasPersonalHistory: z.boolean(),
  items: z.array(PatientPersonalHistorySchema),
  capturedDate: z.string(),
});

export type PersonalHistoryRecord = z.infer<typeof PersonalHistoryRecordSchema>;
