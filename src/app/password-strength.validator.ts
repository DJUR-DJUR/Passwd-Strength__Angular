import { AbstractControl, ValidationErrors } from "@angular/forms";


export const PasswdStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';

  if (!value) {
    return null
  }

  let hasCaseCharacters = /[A-Za-z]+/g.test(value);
  let hasNumberCharacters = /[0-9]+/g.test(value);
  let hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

  switch (true) {
    case
      hasCaseCharacters &&
      hasNumberCharacters &&
      hasSpecialCharacters:
        return {passwordStrength: 'strong'};
    case
      hasCaseCharacters && hasNumberCharacters ||
      hasCaseCharacters && hasSpecialCharacters ||
      hasNumberCharacters && hasSpecialCharacters:
        return {passwordStrength: 'medium'};
    case
      hasCaseCharacters ||
      hasNumberCharacters ||
      hasSpecialCharacters:
        return {passwordStrength: 'easy'};
    default:
      return null;
  }
}
