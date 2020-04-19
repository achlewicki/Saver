export interface EmailModel {
  email: string;
}

export interface PasswordModel {
  password: string;
}

export interface InfoModel {
  firstName: string;
  lastName: string;
  birthDate: Date;
  sex: number;
}

export enum Sex {
  MALE,
  FEMALE,
}
