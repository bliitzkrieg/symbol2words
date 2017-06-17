import { Component, Input } from '@angular/core';
import { Solution } from "../../app/solutions";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class Header {
  @Input() level: Solution;

  constructor() {
  }

}
