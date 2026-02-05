import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './country-page.html',
})

export class CountryPage { }
