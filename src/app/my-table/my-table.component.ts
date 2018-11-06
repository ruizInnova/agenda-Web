import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PersonService } from '../service/person.service';



@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss'],
})
export class MyTableComponent implements OnInit {
 persons = new BehaviorSubject<any[]>([]);
 dataSource = new PersonDataSource(this.persons);
  displayedColumns = ['name',
                      'lastName',
                      'nick',
                      'actions'];

  constructor(private personService: PersonService, private router: Router) {
      this.personService.getPersons()
                        .subscribe((persons: any[]) => {
                          this.persons.next(persons);
                        });
  }

  ngOnInit() {}

  update(person) {
    localStorage.setItem('person', JSON.stringify(person));
    this.router.navigate(['/addperson']);
  }

  delete(person) {
    this.personService.deletePerson(person.id).subscribe(
      response => {
        console.log('OK: ', response);

        const tmp = this.persons.value.filter(
          p => p.id !== person.id
        );

        this.persons.next(tmp);
      },
      error => {
        console.log('ERROR: ', error);
      }
    );
  }
}
 
export class PersonDataSource extends DataSource<any> {
  persons: BehaviorSubject<any>;

  constructor(persons: BehaviorSubject<any>) {
    super();
    this.persons = persons;
  }

  connect(): Observable<any> {
    return this.persons;
  }

  disconnect() {}
}
