import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SolutionSlot } from "../../reducer/answer";

@Component({
  selector: 'solution',
  templateUrl: 'solution.html'
})
export class Solution {
  @Input() slots: SolutionSlot[];
  @Input() isFull: boolean;
  @Output() remove = new EventEmitter<SolutionSlot>();

  constructor() {}

  public isCharacterSpace(letter: string): boolean {
    return letter === ' ';
  }

  public removeSlot(slot: SolutionSlot): void {
    this.remove.emit(slot);
  }
}
