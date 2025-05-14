import {Component, Input} from '@angular/core';
import {JokeItem} from '../../shared/types';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-joke-list-item',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './joke-list-item.component.html',
  styleUrl: './joke-list-item.component.css'
})
export class JokeListItemComponent {
  @Input()
  item!: JokeItem;
}
