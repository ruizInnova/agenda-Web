import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* Servicios */
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent implements OnInit {
  isNewPerson = true;

  personData = this.fb.group({
    id: null,
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    phone: null,
    nick: [null],
    avatar: [null]
  });

  constructor(private fb: FormBuilder, private personService: PersonService, private router: Router) {}
  /* Variable localstorage creo que se podría utilizar un sessionStorage */
  ngOnInit(): void {
    const personToUpdate = JSON.parse(localStorage.getItem('person'));
    console.log(personToUpdate);
    if (personToUpdate !== null) {
      this.isNewPerson = false;
      this.personData.setValue(personToUpdate);
      localStorage.clear();
    }
  }


  onSubmit() {
    console.log(this.personData.value);
    if (this.isNewPerson) {
      this.personService
        .addPerson(this.personData.value)
        .subscribe(
          response => {
            console.log('OK: ', response);
            this.personData.reset();
            alert('Se dio de alta a tu nuevo amigo');
            this.router.navigate(['/personlist']);
          },
          error => {
            console.log('ERROR: ', error);
          }
        );
    } else {
      this.personService
        .updatePerson(this.personData.value)
        .subscribe(
          response => {
            console.log('OK: ', response);
            this.personData.reset();
            this.router.navigate(['/personlist']);
          },
          error => {
            console.log('ERROR: ', error);
          }
        );
    }
  }
}
