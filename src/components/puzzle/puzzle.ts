import { Component, Input } from '@angular/core';

@Component({
  selector: 'puzzle',
  templateUrl: 'puzzle.html'
})
export class PuzzleComponent {
  @Input() items: string[];

  constructor() {}
}
