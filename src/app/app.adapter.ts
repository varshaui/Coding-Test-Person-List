import { Person } from './person.model';
import { xml2js } from 'xml-js' 

export class AppAdapter {
  // Logic to transform the xml response to person object
  static transformPersons(response: string): Person[] {
    try {
      const parseResponse: any = xml2js(response, {compact: true});
      return parseResponse.persons?.person?.map((item: any) => {
        const person: Person = {
          id: +item.id._text,
          firstName: item.firstName._text,
          lastName: item.lastName._text
        };
        return person;
      }) || [];
    }
    catch {
      console.warn('Error while parsing the response')
    }
    return [];
  }
}