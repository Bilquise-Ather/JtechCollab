import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { findIndex } from 'lodash-es';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.css'],
})
export class TagViewComponent implements OnInit {
  @Input('isRequired') isRequired: boolean = false;
  @Input('isSubmitted') isSubmitted: boolean = false;
  @Input() selected: any = [];
  tags:[];
  current:"";
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    if (!this.tags) {
      this.tags = [];
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.tags = this.selected ? this.selected : [];
    }, 100);

  }
  focus() {
    document.getElementById('tagInput').focus();
  }

  blur() {
    if (this.current !== '' && this.current != undefined) {
      this.tags.push(this.current);
      this.current = '';
    }
    this.onChange.emit({ tags: this.tags });
  }
  remove(item){
    let findI = findIndex(this.tags, v => { return v == item})
    if(findI != -1) {
      this.tags.splice(findI,1);
    }
    this.onChange.emit({ tags: this.tags });
  }

}
