import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.html',
})

export class DynamicPage { 

  private readonly fb = inject(FormBuilder);
  public formUtils = FormUtils;
  public newFavorite = this.fb.control('', Validators.required);

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', [Validators.required]],
        ['Death Stranding', [Validators.required]]
      ],
      Validators.minLength(2)
    ),
  });


  onAddToFavorites(event: Event) {
    event.preventDefault();
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
    this.setFavoriteGames = this.favoriteGames;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    console.log(this.myForm.value);
    this.myForm.reset();
  }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  set setFavoriteGames(value: FormArray) {
    this.myForm.setControl('favoriteGames', value);
  }

}
