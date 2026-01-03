import { z } from "zod";

export const SelectionTypeSchema = z.enum(["single", "multi"]);
export type SelectionType = z.infer<typeof SelectionTypeSchema>;
