export interface Contact {
  id: number;
  name: string;
  favorite: boolean;
  headerImage: string;
  email: string;
  phone: Phone[];
}

interface Phone {
  number: string;
  type: string;
}
