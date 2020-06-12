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
  nickname?: string;
}

export enum Sex {
  MALE,
  FEMALE,
}
