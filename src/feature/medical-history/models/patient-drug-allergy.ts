import { z } from "zod";
import { SelectionTypeSchema } from "./common";

export const PatientDrugAllergySchema = z.object({
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

export type PatientDrugAllergy = z.infer<typeof PatientDrugAllergySchema>;

export const PatientDrugAllergyListSchema = z.array(PatientDrugAllergySchema);
export type PatientDrugAllergyList = z.infer<typeof PatientDrugAllergyListSchema>;
