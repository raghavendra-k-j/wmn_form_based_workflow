import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const PatientPastHistorySchema = z.object({
  id: z.string(),
  masterId: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
  selectedOption: z.union([z.string(), z.array(z.string())]),
  since: z.string().optional(),
  notes: z.string().optional(),
  isRisk: z.boolean(),
  planOfManagement: z.string().optional(),
});

export type PatientPastHistory = z.infer<typeof PatientPastHistorySchema>;

export const PatientPastHistoryListSchema = z.array(PatientPastHistorySchema);
export type PatientPastHistoryList = z.infer<typeof PatientPastHistoryListSchema>;
