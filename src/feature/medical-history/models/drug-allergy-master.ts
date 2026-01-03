import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const DrugAllergyMasterSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  selectionType: SelectionTypeSchema,
  displayOrder: z.number(),
  isDefault: z.boolean(),
});

export type DrugAllergyMaster = z.infer<typeof DrugAllergyMasterSchema>;

export const DrugAllergyMasterListSchema = z.array(DrugAllergyMasterSchema);
export type DrugAllergyMasterList = z.infer<typeof DrugAllergyMasterListSchema>;
