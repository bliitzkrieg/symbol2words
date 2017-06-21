import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Level } from "../../app/levels";
import { UserState } from "../../reducer/user";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class Header {
  @Input() level: Level;
  @Input() user: UserState;
  @Output() settings = new EventEmitter<any>();

  constructor() {}

}
