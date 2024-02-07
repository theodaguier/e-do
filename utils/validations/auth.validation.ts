import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(3).nonempty(),
});
