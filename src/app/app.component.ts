import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JokeBookComponent} from './components/joke-book/joke-book.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JokeBookComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daily-chuck-le';
}
