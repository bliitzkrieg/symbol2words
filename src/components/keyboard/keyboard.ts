import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character, SolutionSlot } from "../../reducer/answer";


@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.html'
})
export class Keyboard {
  @Input() keyboard: Character[];
  @Input() slots: SolutionSlot[];
  @Output() add = new EventEmitter<{ character: Character }>();

  constructor() {}

  public isCharacterActive(character: Character): boolean {
    return this.slots ? this.slots.filter(slot => slot.entered && slot.entered.id === character.id).length > 0 : false;
  }

  public doTap(character: Character): void {
    setTimeout(() => {
      this.add.emit({ character });
    }, 40);
  }

}
