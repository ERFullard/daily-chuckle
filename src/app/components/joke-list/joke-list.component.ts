import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JokeListItemComponent} from '../joke-list-item/joke-list-item.component';
import {NgForOf} from '@angular/common';
import {JokeItem} from '../../shared/types';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-joke-list',
  imports: [
    JokeListItemComponent,
    NgForOf
  ],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ overflow: 'hidden', height: '0', transform: 'translateX(100%)', opacity: '0' }),
        animate('150ms', style({ height: '*'})),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1})),
      ]),
      transition(':leave', [
        style({ overflow: 'hidden'}),
        animate('300ms', style({ transform: 'translateX(-100%)', opacity: 0})),
        animate('150ms', style({ height: '0'})),
      ]),
    ])
  ]
})
export class JokeListComponent {
  @Input()
  items!: JokeItem[];

  @Output()
  itemClicked = new EventEmitter<JokeItem>();

  trackByFn(index: number, item: JokeItem) {
    return item.id;
  }
}
