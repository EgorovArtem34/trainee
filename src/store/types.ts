type Coordinates = {
  lat: number;
  lng: number;
};

export type Address = {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
};

type Hair = {
  color: string;
  type: string;
};

type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type Company = {
  address: Address;
  department: string;
  name: string;
  title: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface UsersState {
  users: User[];
  errors: {
    fetchUsersErr: null | string;
    searchUsersErr: null | string;
  };
  isLoadings: {
    isFetchUsersLoading: boolean;
    isSearchUsersLoading: boolean;
  };
  searchQuery: string;
  modals: {
    isShowUserModal: boolean;
    activeUserId: number | null;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface PayloadShowModal {
  id: number;
}
