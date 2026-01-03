import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const SurgicalHistoryMasterSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
});

export type SurgicalHistoryMaster = z.infer<typeof SurgicalHistoryMasterSchema>;

export const SurgicalHistoryMasterListSchema = z.array(SurgicalHistoryMasterSchema);
export type SurgicalHistoryMasterList = z.infer<typeof SurgicalHistoryMasterListSchema>;
