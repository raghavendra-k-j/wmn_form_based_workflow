import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const PatientPersonalHistorySchema = z.object({
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

export type PatientPersonalHistory = z.infer<typeof PatientPersonalHistorySchema>;

export const PatientPersonalHistoryListSchema = z.array(PatientPersonalHistorySchema);
export type PatientPersonalHistoryList = z.infer<typeof PatientPersonalHistoryListSchema>;
