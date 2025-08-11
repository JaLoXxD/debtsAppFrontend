export interface RegisterModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  secondName: string | null;
  secondLastName: string | null;
  email: string;
  phone: string;
  salary: number | null;
}