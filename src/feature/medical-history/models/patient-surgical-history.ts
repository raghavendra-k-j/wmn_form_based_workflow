import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const PatientSurgicalHistorySchema = z.object({
  id: z.string(),
  masterId: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
  selectedOption: z.union([z.string(), z.array(z.string())]),
  notes: z.string().optional(),
  isRisk: z.boolean(),
  planOfManagement: z.string().optional(),
});

export type PatientSurgicalHistory = z.infer<typeof PatientSurgicalHistorySchema>;

export const PatientSurgicalHistoryListSchema = z.array(PatientSurgicalHistorySchema);
export type PatientSurgicalHistoryList = z.infer<typeof PatientSurgicalHistoryListSchema>;
