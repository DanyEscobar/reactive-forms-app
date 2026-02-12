import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.html',
})

export class RegisterPage { 

  private readonly fb = inject(FormBuilder);
  public formUtils = FormUtils;

  public myForm = this.fb.group({
    name: [
      '', 
      [
        Validators.required, 
        Validators.pattern(FormUtils.namePattern)
      ]
    ],
    email: [
      '', 
      [
        Validators.required, 
        Validators.pattern(FormUtils.emailPattern)
      ],
      [ 
        FormUtils.chenkingServerResponse 
      ]
    ],
    username: [
      '', 
      [
        Validators.required, 
        Validators.minLength(6), 
        Validators.pattern(FormUtils.notOnlySpacesPattern),
        FormUtils.notStrider
      ]
    ],
    password: [
      '', 
      [
        Validators.required, 
        Validators.minLength(6)
      ]
    ],
    password2: [
      '', 
      [
        Validators.required
      ],
      []
    ],
  }, {
    validators: [
      FormUtils.passwordsMatch('password', 'password2'),
    ]
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
