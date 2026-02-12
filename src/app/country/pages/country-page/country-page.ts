import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './country-page.html',
})

export class CountryPage { 

  private readonly fb = inject(FormBuilder);
  private readonly countryService = inject(CountryService);

  public regions = signal<string[]>(this.countryService.regions);
  public countriesByRegion = signal<Country[]>([]);
  public borders = signal<Country[]>([]);

  public myForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges.pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.countriesByRegion.set([]);
        this.borders.set([]);
      }),
      switchMap((region) => this.countryService.getCountriesByRegion(region ?? '')),
    ).subscribe((countries) => {
      console.log(countries);
      this.countriesByRegion.set(countries);
    });
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges.pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter((value) => value!.length > 0),
      switchMap((alphaCode) => this.countryService.getCountryAlphaByCode(alphaCode ?? '')),
      switchMap((country) => this.countryService.getCountryNamesByCodeArray(country[0].borders ?? [])),
    ).subscribe((borders) => {
      console.log(borders);
      this.borders.set(borders ?? []);
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
