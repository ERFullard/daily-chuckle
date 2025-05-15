import {Component} from '@angular/core';
import {AsyncPipe, NgSwitch, NgSwitchCase} from '@angular/common';
import {JokeListComponent} from '../joke-list/joke-list.component';
import {JokeItem} from '../../shared/types';
import {ChuckNorrisService} from '../../shared/chuck-norris.service';
import {
  concat,
  filter,
  interval,
  Observable,
  scan,
  switchMap, tap
} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

type AvailableTabs = 'FEED' | 'FAV';

@Component({
  selector: 'app-joke-book',
  imports: [
    NgSwitch,
    NgSwitchCase,
    JokeListComponent,
    AsyncPipe,
  ],
  providers: [CookieService],
  templateUrl: './joke-book.component.html',
  styleUrl: './joke-book.component.css'
})
export class JokeBookComponent {

  private cookieName = 'COOKIE_NORRIS';
  bufferAmount: number = 4;
  pauseFeed: boolean = false;
  favoriteJokes: JokeItem[] = [];
  currentTab: AvailableTabs = 'FEED';
  jokeFeedItems$: Observable<JokeItem[]>;

  constructor(private jokeService: ChuckNorrisService, private cookieService: CookieService) {
    this.jokeFeedItems$ = concat(
      concat(
        ...(new Array<Observable<JokeItem>>(this.bufferAmount).fill(this.jokeService.getRandomJoke()))
      ),
      interval(5000).pipe(
        filter(() => !this.pauseFeed),
        switchMap(jokeFeedItems => this.jokeService.getRandomJoke()),
      )
    ).pipe(
      scan((acc: JokeItem[], value) => [...acc.slice(1 - this.bufferAmount), value], []),
    );

    if (this.cookieService.check(this.cookieName))
      this.favoriteJokes = JSON.parse(this.cookieService.get(this.cookieName));
  }

  itemClicked(item: JokeItem) {
    if (this.favoriteJokes.some(joke => joke.id === item.id)) {
      item.favorite = false;
      this.favoriteJokes.splice(this.favoriteJokes.indexOf(item), 1);
    } else if (this.favoriteJokes.length < this.bufferAmount) {
      item.favorite = true;
      this.favoriteJokes.push(item);
    }

    this.cookieService.set(this.cookieName, JSON.stringify(this.favoriteJokes));
  }

  setTab(tab: AvailableTabs) {
    this.currentTab = tab;
  }
}
