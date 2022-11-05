import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() selectedRating: number = 0;
  series_info: any = {};
  selected_rating: any = 0;
  rate_image_hover: any = 0;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.selected_rating = changes.selectedRating.currentValue;
  }

  ratingClick(selected) {
    this.selected_rating = selected;
    this.onChange.emit({ rating: this.selected_rating });
  }
}
