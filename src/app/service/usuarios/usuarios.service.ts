import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authentication, StorageInfo, User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  constructor(private http: HttpClient) { }

  getUsersList(usuarios: User){
    this.dataEdit.next(usuarios);
  }

  getUser(){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.get<User[]>(this.api_url + 'contactura', {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  createUser(usuarios: User){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.post<User>(this.api_url + 'contactura', usuarios, {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  deleteUser(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'contactura/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        userData => {
          return userData;
        }
      )
    );
  }

  updateUser(usuarios: User){
    const id = usuarios.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<User>(this.api_url + 'contactura/' + id, usuarios, {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData;
          }else{
            return [];
          }
        }
      )
    );
  }

  findContactById(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get(this.api_url + 'contactura/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        userData => {
          return userData;
        }
      )
    );
  }

  authentication(authentication: Authentication){
    const headers = new HttpHeaders ({ Authorization: 'Basic ' + btoa(authentication.username + ':' + authentication.password)});
    return this.http.get(this.api_url + 'user/login', {headers, responseType: 'text' as 'text'}).pipe(
      map(
        authData => {
          return authData;
        }
      )
    );
  }

  /*authentication(authentication: Authentication){
    const headers = new HttpHeaders ({Authentication: 'Basic' + btoa(authentication.username + ':' + authentication.password)});
    return this.http.get(this.api_url + 'user/login', {headers, responseType: 'text' as 'text'}).pipe(
      map(
        authData => {

          let storageInformation : StorageInfo = {
            admin: authData[0],
            token: authData[1]
          }

          console.log(storageInformation);
          return storageInformation;
        }
      )
    );
  }*/
  
}
