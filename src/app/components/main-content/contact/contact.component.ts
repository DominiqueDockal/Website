import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private languageService = inject(LanguageService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient); 

  contactForm: FormGroup;
  submitAttempted = false;
  isSubmitting = false; 

  showSuccessMessage = false;
  showErrorMessage = false;
  
  savedValues: { [key: string]: string } = {};
  showingErrors: { [key: string]: boolean } = {};

  private readonly API_URL = 'contact-submit.php';

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacy: [false, [Validators.requiredTrue]]
    });
  }

  translate(key: string): string {
    return this.languageService.getTranslation(key);
  }

  getPrivacyRoute(): string {
    return this.languageService.getPrivacyRoute();
  }

  onFieldFocus(fieldName: string): void {
    if (this.showingErrors[fieldName]) {
      const field = this.contactForm.get(fieldName);
      if (field && this.savedValues[fieldName] !== undefined) {
        field.setValue(this.savedValues[fieldName]);
        this.showingErrors[fieldName] = false;
      }
    }
  }

  onFieldBlur(fieldName: string): void {
    const field = this.contactForm.get(fieldName);
    if (field) {
      if (fieldName !== 'privacy') {
        field.markAsTouched();
        if (field.invalid && field.value && field.value.trim() !== '') {
          this.savedValues[fieldName] = field.value;
          field.setValue(this.getErrorMessage(fieldName));
          this.showingErrors[fieldName] = true;
        }
      }
    }
  }

  onSubmit(): void {
    this.submitAttempted = true;
    this.restoreAllValues();
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) this.submitForm();
    else this.showErrorsInFields();
  }

  getPlaceholder(fieldName: string, defaultPlaceholder: string): string {
    const field = this.contactForm.get(fieldName);
    if (this.showingErrors[fieldName]) return '';
    if (field && field.invalid && field.touched && (!field.value || field.value.trim() === '')) return this.getErrorMessage(fieldName);
    return defaultPlaceholder;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) { return ''; }
    const errors = field.errors;
    switch (fieldName) {
      case 'name':
        if (errors['required']) return this.translate('form.name.error.required');
        break;
      case 'email':
        if (errors['required']) return this.translate('form.email.error.required');
        if (errors['email']) return this.translate('form.email.error.invalid');
        break;
      case 'message':
        if (errors['required']) return this.translate('form.message.error.required');
        if (errors['minlength']) return this.translate('form.message.error.minlength').replace('{{length}}', errors['minlength'].requiredLength.toString());
        break;
    }
    return this.translate('form.error.invalid');
  }

  hasPrivacyError(): boolean {
    const field = this.contactForm.get('privacy');
    return this.submitAttempted && field ? field.invalid : false;
  }

  getPrivacyErrorMessage(): string {
    return this.translate('form.privacy.error');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  private restoreAllValues(): void {
    Object.keys(this.showingErrors).forEach(fieldName => {
      if (this.showingErrors[fieldName]) {
        const field = this.contactForm.get(fieldName);
        if (field && this.savedValues[fieldName] !== undefined) {
          field.setValue(this.savedValues[fieldName]);
          this.showingErrors[fieldName] = false;
        }
      }
    });
  }

  private showErrorsInFields(): void {
    ['name', 'email', 'message'].forEach(fieldName => {
      const field = this.contactForm.get(fieldName);
      if (field && field.invalid && field.touched) {
        if (field.value && field.value.trim() !== '' && !this.isErrorMessage(field.value, fieldName)) {
          this.savedValues[fieldName] = field.value;
          field.setValue(this.getErrorMessage(fieldName));
          this.showingErrors[fieldName] = true;
        }
      }
    });
  }

  private isErrorMessage(value: string, fieldName: string): boolean {
    const errorMessage = this.getErrorMessage(fieldName);
    return value === errorMessage;
  }

/*   private submitForm(): void {
    this.isSubmitting = true;
    const formData = {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      message: this.contactForm.get('message')?.value,
      privacy: this.contactForm.get('privacy')?.value
    };

    this.http.post(this.API_URL, formData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.submitAttempted = false;
          this.savedValues = {};
          this.showingErrors = {};
          this.contactForm.reset();
          this.showSuccessToast();
        } else {
          this.showErrorToast();
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.showErrorToast();
        this.isSubmitting = false;
      }
    });
  } */

  private showSuccessToast(): void {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 4000);
  }

  private showErrorToast(): void {
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 4000); 
  }

  private submitForm(): void {
    this.isSubmitting = true;
    
    const formData = {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      message: this.contactForm.get('message')?.value,
      privacy: this.contactForm.get('privacy')?.value
    };
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('DEVELOPMENT MODE: Mock-Submit mit Daten:', formData);
  
      setTimeout(() => {
        const isSuccess = Math.random() > 0.1; 
        if (isSuccess) {
          this.submitAttempted = false;
          this.savedValues = {};
          this.showingErrors = {};
          this.contactForm.reset();
          this.showSuccessToast();
        } else {
          this.showErrorToast();
        }
        
        this.isSubmitting = false;
      }, 1500); 
      
      return; 
    }
}

}

