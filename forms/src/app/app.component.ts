import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet'; //one of the available options
  answer = "";
  genders = ['male', 'female'];
  user = {
    usernmae: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ""
    //   },
    //   secret: "pet",
    //   questionAnswer: "",
    //   gender: "male"
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    }); // available to the NgForm.form
  }

  // onSubmit(form: NgForm) {
  //   //whatever the user entered
  //   console.log(form);
  // }

  //ViewChild
  // onSubmit() {
  //   console.log(this.signupForm);
  // }

  onSubmit() {
    this.user.usernmae = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.submitted = true;

    this.signupForm.reset();
  }
}
