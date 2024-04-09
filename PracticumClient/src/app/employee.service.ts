import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee.model';
import { HttpClient } from '@angular/common/http';
import { EmployeePut } from './EmploeyeePut.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  public employee:EmployeePut

  constructor(private http: HttpClient) { }

  public getEmployeesFromServer(): Observable<EmployeePut[]> {
    return this.http.get<EmployeePut[]>("https://localhost:7229/api/Employees");
  }

  public save(e: Employee): Observable<any> {
    return this.http.post("https://localhost:7229/api/Employees", e)
  }

  putEmployee(e: EmployeePut): Observable<any> {
    const url = `https://localhost:7229/api/Employees/${e.id}`;
    return this.http.put(url, e);
  }
  public delete(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7229/api/Employees/${id}`)
  }



}
