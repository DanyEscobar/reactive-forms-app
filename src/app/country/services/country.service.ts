
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl: string = 'https://restcountries.com/v3.1';
  private readonly _regions: string[] = [
    'Africa', 
    'Americas', 
    'Asia', 
    'Europe', 
    'Oceania'
  ];

  get regions(): string[] {
    return [...this._regions];
  }


  getCountriesByRegion(region: string): Observable<Country[]> {
    if(!region) return of([]);

    console.log({region});

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.httpClient.get<Country[]>(url);
  }

  getCountryAlphaByCode(alphaCode: string): Observable<Country[]> {
    const url: string = `${this.baseUrl}/alpha/${alphaCode}`;
    return this.httpClient.get<Country[]>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country[]>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryAlphaByCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests).pipe(
      map((countries) => countries.flat())
    );
  }

  
}