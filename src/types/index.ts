import { User } from "@/store/types";

export interface ApiEndpoints {
  users: string;
}

// вместо отчества нашел матчество maidenName

export type PickedUserData = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "maidenName"
  | "gender"
  | "phone"
  | "address"
>;
