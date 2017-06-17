import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Solution } from "../../app/solutions";
import { shuffleArray, buildRandomCharacters, MAX_CHARACTERS } from "../../app/utility";
import { SoundService } from "../../providers/sound-service";
import { Character } from "../../reducer/answer";
import { timeout } from "rxjs/operator/timeout";

// Suppresses Array.From TS error
interface ArrayConstructor {
  from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.html'
})
export class Keyboard {
  @Input() level: Solution;
  @Input() answer: Character[];
  @Output() add = new EventEmitter<Character>();

  public characters: Character[];

  constructor(private soundService: SoundService) {
  }

  public ngOnChanges(changes: any) {
    if (!changes.level) {
      return;
    }

    const characters = Array.from(changes.level.currentValue.answer)
        .filter(char => char != ' ');
    const extras = buildRandomCharacters(MAX_CHARACTERS - characters.length);

    this.characters = shuffleArray([...characters, ...Array.from(extras)]).map((char, index) => {
      return {
        letter: char,
        id: index
      };
    });
  }

  public isCharacterActive(character: Character): boolean {
    return this.answer ? this.answer.filter(item => item.id === character.id).length > 0 : false;
  }

  public doTap(character: Character): void {
    this.soundService.playClick();
    setTimeout(() => {
      this.add.emit(character);
    }, 40);
  }

}
