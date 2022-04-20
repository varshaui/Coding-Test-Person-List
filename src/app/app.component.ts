import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { combineLatest, Subscription } from 'rxjs';
import { Person } from './person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'api-app';
  sub: Subscription | undefined;
  persons: Person[] = [];
  isLoading = true;
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    // Firing the two call parallely - JSON ans XML APi
    this.sub = combineLatest([this.appService.getUsers(), this.appService.getUsersInXml()])
    .subscribe(([personList1, personList2]) => {
      // Merging the data from both the API's and sorting it by id in ascending order of id
      this.persons = [...personList1, ...personList2].sort((p1, p2) => p1.id > p2.id ? 1 : -1);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
