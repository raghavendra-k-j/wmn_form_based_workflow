import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const PersonalHistoryMasterSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
});

export type PersonalHistoryMaster = z.infer<typeof PersonalHistoryMasterSchema>;

export const PersonalHistoryMasterListSchema = z.array(PersonalHistoryMasterSchema);
export type PersonalHistoryMasterList = z.infer<typeof PersonalHistoryMasterListSchema>;
