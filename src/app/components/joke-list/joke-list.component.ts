import {Component, EventEmitter, Input, Output} from '@angular/core';
import {JokeListItemComponent} from '../joke-list-item/joke-list-item.component';
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
  ],
  templateUrl: './joke-list.component.html',
  styleUrl: './joke-list.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms', style({ transform: 'translateX(0)'})),
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }),
        animate('300ms', style({ transform: 'translateX(-100%)', height: 0})),
      ]),
    ])
  ]
})
export class JokeListComponent {
  @Input()
  items!: JokeItem[];

  @Output()
  itemClicked = new EventEmitter<JokeItem>();
}
