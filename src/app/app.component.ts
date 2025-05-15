import { Component } from '@angular/core';
import {JokeBookComponent} from './components/joke-book/joke-book.component';

@Component({
  selector: 'app-root',
  imports: [JokeBookComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
