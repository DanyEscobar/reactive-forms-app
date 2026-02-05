import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "./shared/components/side-menu/side-menu";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SideMenu
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-forms-app';
}
