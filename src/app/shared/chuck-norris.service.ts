import { Injectable } from '@angular/core';
import {JokeItem} from './types';
import {HttpClient} from '@angular/common/http';
import {concat, filter, interval, Observable, scan, shareReplay, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService {

  constructor(private http: HttpClient) {
    console.log('ChuckNorrisService');
    this.feed$ = concat(
      concat(
        ...(this.getListOfJokes(this.bufferAmount))
      ),
      interval(this.feedRate).pipe(
        filter(() => !this.pauseFeed),
        switchMap(() => this.getRandomJoke()),
      )
    ).pipe(
      scan((acc: JokeItem[], value) => [...acc.slice(1 - this.bufferAmount), value], []),
      shareReplay(1),
    );
  }

  private feedRate: number = 5000;
  private bufferAmount: number = 10;
  private pauseFeed: boolean = false;
  private feed$: Observable<JokeItem[]>;
  private randomJokeUrl = 'https://api.chucknorris.io/jokes/random';

  getFeedStatus() {
    return this.pauseFeed;
  }

  toggleFeed() {
    this.pauseFeed = !this.pauseFeed;
  }

  getRandomJoke() {
    return this.http.get<JokeItem>(this.randomJokeUrl);
  }

  getListOfJokes(count: number) {
    return new Array<Observable<JokeItem>>(count).fill(this.getRandomJoke())
  }

  getJokeFeed() {
    return this.feed$;
  }
}
