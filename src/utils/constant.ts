import { User } from "@/store/types";
import { ColumnSizes } from "@/types";

export const tableHeaders: (keyof User)[] = [
  "firstName",
  "lastName",
  "maidenName",
  "gender",
  "phone",
  "address",
];

export const columnsHeaderNames: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  maidenName: "Maiden name",
  gender: "Gender",
  phone: "Phone",
  address: "Address",
};

export const columnSizes: ColumnSizes = {
  size: 200,
  minSize: 50,
  maxSize: 400,
};
