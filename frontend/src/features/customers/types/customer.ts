export interface Customer {
  id: string;

  name: string;

  type: "ARCHITECT" | "BUILDER" | "CONTRACTOR";

  email: string;
  phone: string;

  gstNumber: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
}