import { z } from "zod";
import { PatientDrugAllergySchema } from "./patient-drug-allergy";

export const DrugAllergyRecordSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  hasDrugAllergies: z.boolean(),
  items: z.array(PatientDrugAllergySchema),
  capturedDate: z.string(),
});

export type DrugAllergyRecord = z.infer<typeof DrugAllergyRecordSchema>;
