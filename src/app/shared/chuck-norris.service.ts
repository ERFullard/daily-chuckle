import { Injectable } from '@angular/core';
import {JokeItem} from './types';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisService {

  constructor(private http: HttpClient) { }

  randomJokeUrl = 'https://api.chucknorris.io/jokes/random';

  getRandomJoke() {
    return this.http.get<JokeItem>(this.randomJokeUrl);
  }
}
