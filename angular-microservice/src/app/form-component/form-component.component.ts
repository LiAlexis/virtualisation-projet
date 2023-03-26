import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent {

  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
  hobby: string;

  constructor(private http: HttpClient) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.dob = '';
    this.phone = '';
    this.hobby = '';
  }

  onSubmit(): void {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      dob: this.dob,
      phone: this.phone,
      hobby: this.hobby
    };

    this.http.post('http://express-microservice:3000/data', data)
      .subscribe(() => {
        alert('Data submitted successfully');
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.dob = '';
        this.phone = '';
        this.hobby = '';
      });
  }
}