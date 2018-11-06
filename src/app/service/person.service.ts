import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://agenda-jsrs.now.sh/api/persons';

  /* El de la config lo quite por que no tiene nada que ver con el servicio de person */
  getPersons() {
    return this.http.get(this.apiUrl);
  }

  addPerson(person) {
    return this.http.post(this.apiUrl, person);
  }

  updatePerson(person) {
    return this.http.put(this.apiUrl + '/' + person.id, person);
  }

  deletePerson(idPerson) {
    return this.http.delete(this.apiUrl + '/' + idPerson);
  }

}
