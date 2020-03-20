export class UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  sex: Sex;
  registerDate: Date;
  level: number;
  experience: number;
  isActive: boolean;
  isPremium: boolean;
}

export enum Sex {
  MALE,
  FEMALE,
}
