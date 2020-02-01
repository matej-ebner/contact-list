export interface Contact {
  id: number;
  name: string;
  favorite: boolean;
  headerImage: string;
  email: string;
  phone: PhoneNumber[];
}

export interface PhoneNumber {
  number: string;
  type: string;
}
