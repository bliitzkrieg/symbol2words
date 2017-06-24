import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardCharacter, SolutionSlot } from "../../reducer/answer";


@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.html'
})
export class Keyboard {
  @Input() keyboard: KeyboardCharacter[];
  @Input() slots: SolutionSlot[];
  @Output() add = new EventEmitter<{ character: KeyboardCharacter }>();

  constructor() {}

  public isCharacterActive(character: KeyboardCharacter): boolean {
    return this.slots ? this.slots.filter(slot => slot.entered && slot.entered.id === character.id).length > 0 : false;
  }

  public isCharacterHidden(character: KeyboardCharacter): boolean {
    return character.hidden;
  }

  public doTap(character: KeyboardCharacter): void {
    setTimeout(() => {
      this.add.emit({ character });
    }, 40);
  }

}
