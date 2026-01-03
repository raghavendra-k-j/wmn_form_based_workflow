import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const PastHistoryMasterSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
});

export type PastHistoryMaster = z.infer<typeof PastHistoryMasterSchema>;

export const PastHistoryMasterListSchema = z.array(PastHistoryMasterSchema);
export type PastHistoryMasterList = z.infer<typeof PastHistoryMasterListSchema>;
