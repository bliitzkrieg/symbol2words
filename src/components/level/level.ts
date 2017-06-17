import { Component, Input } from '@angular/core';
import { Solution } from "../../app/solutions";

@Component({
  selector: 'level',
  templateUrl: 'level.html',
})
export class Level {
  @Input() value: Solution;

  constructor() {
  }

}
