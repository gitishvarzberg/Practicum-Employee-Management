import { Role } from "./Role.model";

export class EmployeePut {
    id: number;
    identity:string;
    firstName: string;
    lastName: string;
    startOfWorkDate: Date; 
    dateOfBirth: Date;
    gender: Gender;
    roles: Role[]; 
}

export enum Gender{
    Male,
    Female
}