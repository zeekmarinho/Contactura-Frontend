import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contacts } from 'src/app/models/contacts';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<Contacts>(null);
  botaoEdit = this.dataEdit.asObservable();
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');

  constructor(private http: HttpClient) { }

  getContactsList(contatos: Contacts){
    this.dataEdit.next(contatos);
  }

  getContacts(){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.get<Contacts[]>(this.api_url + 'contactura', {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }

  createContacts(contatos: Contacts){
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(this.username + ':' + this.password)});
    return this.http.post<Contacts>(this.api_url + 'contactura', contatos, {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }

  deleteContacts(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'contactura/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        contactData => {
          return contactData;
        }
      )
    );
  }

  updateContacts(contact: Contacts){
    const id = contact.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<Contacts>(this.api_url + 'contactura/' + id, contact, {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
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

}
