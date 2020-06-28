import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reactiveForms';
  myForm: FormGroup;
  countries = {
    IND: {
      code: 'IND',
      name: 'India',
      states: {
        AP: {
          code: 'AP',
          name: 'Andhra Pradesh',
          cities: [
            {
              code: 'VJ',
              name: 'Vijayawada',
            },
            {
              code: 'VZG',
              name: 'Vizag',
            },
          ],
        },
        TN: {
          code: 'TN',
          name: 'Tamil Nadu',
          cities: [
            {
              code: 'CH',
              name: 'Chennail',
            },
            {
              code: 'CMB',
              name: 'Coimbatore',
            },
          ],
        },
      },
    },
    NW: {
      code: 'NW',
      name: 'Norway',
      states: {
        S1: {
          code: 'S1',
          name: 'STATE 1',
          cities: [
            {
              code: 'C1',
              name: 'CITY 1',
            },
          ],
        },
        S2: {
          code: 'S2',
          name: 'STATE 2',
          cities: [
            {
              code: 'C2',
              name: 'CITY 2',
            },
          ],
        },
      },
    },
  };
  countryList=[];
  stateList = [];
  cityList = [];
      i:string;
  constructor(private fb: FormBuilder) {
    this.countryList = Object.keys(this.countries);
    this.myForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      pass: this.fb.control('', Validators.required),
      cnfrm_pass: this.fb.control('', Validators.required),
      address: this.fb.array([this.fb.group({
        country: this.fb.control('', Validators.required),
        state: this.fb.control('', Validators.required),
        city: this.fb.control('', Validators.required),
        add1:this.fb.control('', Validators.required),
        add2:this.fb.control('', Validators.required),
        zipCode:this.fb.control('', Validators.required)
      }),
   ]),
      gender: this.fb.control('', Validators.required),
      marital_status: this.fb.control('', Validators.required),
      favFood: this.fb.control('', Validators.required),
      favcolor: this.fb.control('', Validators.required),

    });
    // console.log(this.myForm.get('address').get('0'))
    for(let  i in this.myForm.get('address').value){
      this.myForm.get('address').get(i).get('country').valueChanges.subscribe((data) => {
        this.stateList[i] = Object.keys(this.countries[data].states).map((item) => {
          return this.countries[data].states[item];
        });
      });
    }
    for(let i in this.myForm.get('address').value){
      // console.log( this.myForm.get('address').get(i).get('state'))
      this.myForm.get('address').get(i).get('state').valueChanges.subscribe((data) => {
        this.cityList[i] = this.countries[this.myForm.get('address').get(i).get('country').value][
          'states'
        ][data]['cities'];
        // console.log(this.cityList);
      });
    }
    
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      alert('Form Submitted successfully');
    } else {
      alert('Fill the form properly and try re submitting');
    }
  }
}
