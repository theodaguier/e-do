import { z } from "zod";

export const EquipmentSchema = z.object({
  name: z.string().nonempty(),
  category: z.string().nonempty(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
});
