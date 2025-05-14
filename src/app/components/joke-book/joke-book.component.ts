import {Component} from '@angular/core';
import {AsyncPipe, NgSwitch, NgSwitchCase} from '@angular/common';
import {JokeListComponent} from '../joke-list/joke-list.component';
import {JokeItem} from '../../shared/types';
import {ChuckNorrisService} from '../../shared/chuck-norris.service';
import {
  combineLatest, concat, concatMap,
  filter,
  interval, merge, mergeAll, mergeMap,
  Observable, of,
  scan,
  switchMap, tap
} from 'rxjs';

type AvailableTabs = 'FEED' | 'FAV';

@Component({
  selector: 'app-joke-book',
  imports: [
    NgSwitch,
    NgSwitchCase,
    JokeListComponent,
    AsyncPipe
  ],
  templateUrl: './joke-book.component.html',
  styleUrl: './joke-book.component.css'
})
export class JokeBookComponent {

  bufferAmount: number = 4;
  pauseFeed: boolean = false;
  favoriteJokes: JokeItem[] = new Array<JokeItem>(this.bufferAmount);
  currentTab: AvailableTabs = 'FEED';
  jokeFeedItems$: Observable<JokeItem[]>;

  constructor(private jokeService: ChuckNorrisService) {
    this.jokeFeedItems$ = concat(
      concat(
        ...(new Array<Observable<JokeItem>>(this.bufferAmount).fill(this.jokeService.getRandomJoke()))
      ).pipe(
        tap(x => console.log(x)),
      ),
      interval(5000).pipe(
        filter(() => !this.pauseFeed),
        switchMap(jokeFeedItems => this.jokeService.getRandomJoke()),
      )
    ).pipe(
      tap(x => console.log('scan: ', x)),
      scan((acc: JokeItem[], value) => [...acc.slice(1 - this.bufferAmount), value], []),
    );
  }

  setTab(tab: AvailableTabs) {
    this.currentTab = tab;
  }
}
