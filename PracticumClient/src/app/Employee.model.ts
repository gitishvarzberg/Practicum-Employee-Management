import { Role } from "./Role.model";

export class Employee {
    identity:string;
    firstName: string;
    lastName: string;
    startOfWorkDate: Date; 
    dateOfBirth: Date; 
    gender: Gender;
    roles: Role[]; 
    isDeleted: boolean;
}

export enum Gender{
    Male,
    Female
}
