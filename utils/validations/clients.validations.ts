import { z } from "zod";

export const ClientSchema = z.object({
  name: z.string().nonempty(),
  brand: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  siren: z.string().nonempty(),
});
