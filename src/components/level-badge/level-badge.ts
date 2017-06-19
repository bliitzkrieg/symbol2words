import { Component, Input } from '@angular/core';
import { Level } from "../../app/levels";

@Component({
  selector: 'level-badge',
  templateUrl: 'level-badge.html',
})
export class LevelBadge {
  @Input() value: Level;

  constructor() {}

}
