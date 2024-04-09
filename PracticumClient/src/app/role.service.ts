import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './Role.model';
import { RoleName, RoleNamePost } from './RoleName.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public getRoleNamesFromServer(): Observable<RoleName[]> {
    return this.http.get<RoleName[]>("https://localhost:7229/api/RoleNames");
  }

  public save(r : RoleNamePost): Observable<any> {
    return this.http.post("https://localhost:7229/api/RoleNames", r)
  }
}
