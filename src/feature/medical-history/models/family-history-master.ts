import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const FamilyHistoryMasterSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
});

export type FamilyHistoryMaster = z.infer<typeof FamilyHistoryMasterSchema>;

export const FamilyHistoryMasterListSchema = z.array(FamilyHistoryMasterSchema);
export type FamilyHistoryMasterList = z.infer<typeof FamilyHistoryMasterListSchema>;
