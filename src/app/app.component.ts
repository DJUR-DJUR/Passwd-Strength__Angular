import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PasswdStrengthValidator } from './password-strength.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public userPasswd!: FormControl;
  public sectionsStatus: string[] = ['default', 'default', 'default'];

  ngOnInit(): void {
    this.userPasswd = new FormControl('', [
      Validators.minLength(8),
      PasswdStrengthValidator
    ]);
  }

  public checkPasswd(): string[] {
    let minLengthValidatorStatus = this.userPasswd?.errors?.['minlength'];
    let passwdStrengthValidatorStatus = this.userPasswd?.errors?.['passwordStrength'];

    if (minLengthValidatorStatus) {
      return this.sectionsStatus = ['danger', 'danger', 'danger'];
    }
    switch (true) {
      case passwdStrengthValidatorStatus === 'easy':
        return this.sectionsStatus =
          ['danger', 'default', 'default'];
      case passwdStrengthValidatorStatus === 'medium':
        return this.sectionsStatus =
          ['warning', 'warning', 'default'];
      case passwdStrengthValidatorStatus === 'strong':
        return this.sectionsStatus =
          ['success', 'success', 'success'];
      default:
        return this.sectionsStatus =
          ['default', 'default', 'default'];
    }
  }
}
