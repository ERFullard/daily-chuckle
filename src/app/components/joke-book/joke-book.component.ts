import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {JokeListComponent} from '../joke-list/joke-list.component';
import {JokeItem} from '../../shared/types';
import {ChuckNorrisService} from '../../shared/chuck-norris.service';
import {
  Observable,
} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

type AvailableTabs = 'FEED' | 'FAV';

@Component({
  selector: 'app-joke-book',
  imports: [
    JokeListComponent,
    AsyncPipe,
  ],
  providers: [CookieService],
  templateUrl: './joke-book.component.html',
  styleUrl: './joke-book.component.css',
})
export class JokeBookComponent {

  feedStatus: boolean;
  favoriteJokes: JokeItem[] = [];
  favoriteLimit: number = 10;
  currentTab: AvailableTabs = 'FEED';
  jokeFeedItems$: Observable<JokeItem[]>;

  private cookieName = 'COOKIE_NORRIS';

  constructor(private jokeService: ChuckNorrisService, private cookieService: CookieService) {
    this.jokeFeedItems$ = this.jokeService.getJokeFeed();
    this.feedStatus = this.jokeService.getFeedStatus();

    if (this.cookieService.check(this.cookieName)) {
      this.favoriteJokes = JSON.parse(this.cookieService.get(this.cookieName));
    }
  }

  toggleFeed() {
    this.jokeService.toggleFeed();
    this.feedStatus = this.jokeService.getFeedStatus();
  }

  itemClicked(item: JokeItem) {
    if (this.favoriteJokes.some(joke => joke.id === item.id)) {
      item.favorite = false;
      this.favoriteJokes.splice(this.favoriteJokes.indexOf(item), 1);
    } else if (this.favoriteJokes.length < this.favoriteLimit) {
      item.favorite = true;
      this.favoriteJokes.push(item);
    }

    this.cookieService.set(this.cookieName, JSON.stringify(this.favoriteJokes));
  }

  setTab(tab: AvailableTabs) {
    this.currentTab = tab;
  }
}
