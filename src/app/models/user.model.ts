export class UserModel {
  id: number;
  email: string;
  nickname: string;
  title: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  sex: Sex;
  registerDate: Date;
  level: number;
  experience: number;
  isActive: boolean;
  isPremium: boolean;
  totalOperations: number;
}

export enum Sex {
  MALE,
  FEMALE,
}
