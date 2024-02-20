export type Client = {
  category: string;
  id?: number;
  name: string | null;
  brand: string | null;
  email: string | null;
  phone: string | null;
  siren: string | null;
  // sessions?: Session[];
  createdAt?: Date;
  updatedAt?: Date;
};
