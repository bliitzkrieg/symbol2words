import { Component } from '@angular/core';
import { Solutions } from "../../app/solutions";
import { Observable } from "rxjs/Rx";
import { Store } from "@ngrx/store";
import { INCREMENT_LEVEL } from "../../reducer/levels";
import { RESET_ANSWER, Character } from "../../reducer/answer";
import * as fromRoot from '../../reducer';
import * as answer from '../../actions/answer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public levels: Observable<Solutions>;
  public answer: Observable<Character[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.levels = store.select('levels');
    this.answer = store.select('answer');
  }

  public addCharacterToAnswer(character: Character) {
    this.store.dispatch(new answer.AddCharacterAction(character));
  }

  public doInc() {
    this.store.dispatch({ type: INCREMENT_LEVEL });
    this.store.dispatch({ type: RESET_ANSWER });
  }

  public removeCharacterFromAnswer(character: Character): void {
    this.store.dispatch(new answer.RemoveCharacterAction(character));
  }

}
