import { FormGroup, FormArray, ValidationErrors, AbstractControl } from "@angular/forms";



async function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

export class FormUtils {

  static readonly namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe de tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El campo debe de ser ${errors['min'].min} o mayor`;
        case 'email':
          return `El campo debe de ser un email válido`;
        case 'pattern': 
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return `El correo electrónico debe de ser válido`;
          }
          if (errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return `El nombre y apellido debe de ser válido`;
          }
          if (errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern) {
            return `El username debe de ser válido`;
          }
          return `Error en el patrón`;
        case 'notStrider':
          return `El username no puede ser Strider`;
        case 'passwordsDontMatch':
          return `Las contraseñas no coinciden`;
        case 'emailTaken':
          return `El correo electrónico ya está en uso`;
      }
    }
    return null;
  }
  
  static isValidField( form: FormGroup, fieldName: string ): boolean | null {
    return (
      form.controls[fieldName].errors && 
      form.controls[fieldName].touched
    );
  }

  static getFieldError( form: FormGroup, fieldName: string ): string | null {
    if (!form.controls[fieldName].errors) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && 
      formArray.controls[index].touched
    );
  } 

  static getFieldErrorInArray(formArray: FormArray, index: number) {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }

  static passwordsMatch(passwordField: string, password2Field: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordField)?.value;
      const password2 = formGroup.get(password2Field)?.value;

      if (password !== password2) {
        formGroup.get(password2Field)?.setErrors({ passwordsDontMatch: true });
      } else {
        formGroup.get(password2Field)?.setErrors(null);
      }
    };
  }

  // static passwordsMatch(passwordField: string, password2Field: string) {
  //   return (formGroup: AbstractControl) => {
  //     const password = formGroup.get(passwordField)?.value;
  //     const password2 = formGroup.get(password2Field)?.value;
      
  //     return password === password2 ? null : { passwordsDontMatch: true };
  //   };
  // }

  static async chenkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    
    await sleep(2500);

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { 
        emailTaken: true 
      };
    }
    
    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    
    const formValue = control.value.toLowerCase();

    if (formValue === 'strider') {
      return { 
        notStrider: true 
      };
    }
    
    return null;
  }
}


