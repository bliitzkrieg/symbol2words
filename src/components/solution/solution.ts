import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SolutionSlot } from "../../reducer/answer";
import { SoundService } from "../../providers/sound-service";

@Component({
  selector: 'solution',
  templateUrl: 'solution.html'
})
export class Solution {
  @Input() slots: SolutionSlot[];
  @Output() remove = new EventEmitter<SolutionSlot>();

  constructor(private soundService: SoundService) {}

  public isCharacterSpace(character: string): boolean {
    return character === ' ';
  }

  public removeSlot(slot: SolutionSlot): void {
    this.remove.emit(slot);
  }
}
