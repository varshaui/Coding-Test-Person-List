import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Person } from './person.model';
import { AppAdapter } from './app.adapter';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  // API1 returns JSON and takes 5 seconds to return the response.
  // Added delay of 5 seconds using rxjs delay
  getUsers(): Observable<Person[]> {
   return this.httpClient.get('/assets/persons.json').pipe(delay(5000)).pipe(map((res: any) => res.persons as Person[]));
  }

  // API2 returns XML and takes takes 10 seconds.
  // Added delay of 10 seconds using rxjs delay
  // transforming xml response to Person object using Adapter
  getUsersInXml() {
    return this.httpClient.get('/assets/persons.xml', {
      responseType: 'text',
      observe: 'body'
    }).pipe(delay(10000)).pipe(map((res: any) => AppAdapter.transformPersons(res) as Person[]));
  }
}
