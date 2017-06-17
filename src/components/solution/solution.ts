import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from "../../reducer/answer";
import { SoundService } from "../../providers/sound-service";

@Component({
  selector: 'solution',
  templateUrl: 'solution.html'
})
export class Solution {
  @Input() level: Solution;
  @Input() answer: Character[];
  @Output() remove = new EventEmitter<Character>();

  constructor(private soundService: SoundService) {}

  public doTap(character: Character): void {
    this.soundService.playClick();
    this.remove.emit(character);
  }

}
