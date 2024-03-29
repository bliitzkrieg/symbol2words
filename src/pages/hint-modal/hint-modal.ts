import { Component, Renderer2 } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CustomModal } from '../../misc/custom-modal';
import { PlayMenuAction, PlayPurchaseAction } from '../../actions/sounds';
import { Store } from '@ngrx/store';
import { UserState } from '../../reducer/user';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../../reducer';
import { UserWonAction, PurchaseAction } from '../../actions/user';
import { LevelState, getVisibleKeys } from '../../reducer/levels';
import { HideCharacterAction } from '../../actions/levels';
import { ResetAnswerAction, RevealCharacterAction, RevealCharacterFinishedAction } from '../../actions/answer';

export const REMOVE_COST: number = 50;
export const REVEAL_COST: number = 80;
export const SKIP_COST: number = 200;

interface HintCosts {
    remove: number;
    reveal: number;
    skip: number;
}

@IonicPage()
@Component({
    selector: 'page-hint-modal',
    templateUrl: 'hint-modal.html'
})
export class HintModalPage extends CustomModal {

    public cost: HintCosts = {
        remove: REMOVE_COST,
        reveal: REVEAL_COST,
        skip: SKIP_COST
    };

    public user$: Observable<UserState>;
    public user: UserState;

    public level$: Observable<LevelState>;
    public level: LevelState;

    constructor(public renderer: Renderer2,
                public viewCtrl: ViewController,
                private store: Store<fromRoot.State>) {
        super(renderer, viewCtrl);

        this.user$ = store.select('user');
        this.user$.subscribe(user => this.user = user);

        this.level$ = store.select('levels');
        this.level$.subscribe(level => this.level = level);
    }

    public get hasVisibleKeys(): boolean {
        return getVisibleKeys(this.level.keyboard).length > 0;
    }

    public userHasFunds(cost: number, user: UserState): boolean {
        return user.coins > cost;
    }

    public hideLetter(user: UserState, cost: number = this.cost.remove): void {
        if (!this.hasVisibleKeys) {
            return;
        }

        if (this.doPurchase(user, cost)) {
            this.store.dispatch(new ResetAnswerAction());
            this.store.dispatch(new HideCharacterAction());
            this.viewCtrl.dismiss();
        }
    }

    public revealLetter(user: UserState, cost: number = this.cost.reveal): void {
        if (this.doPurchase(user, cost)) {
            this.store.dispatch(new ResetAnswerAction());
            this.store.dispatch(new RevealCharacterAction());
            this.store.dispatch(new RevealCharacterFinishedAction());
            this.viewCtrl.dismiss();
        }
    }

    public skipLevel(user: UserState, cost: number = this.cost.skip): void {
        if (this.doPurchase(user, cost)) {
            this.viewCtrl.dismiss();
            this.store.dispatch(new UserWonAction(this.level.current));
        }
    }

    public dismiss(): void {
        this.store.dispatch(new PlayMenuAction());
        this.viewCtrl.dismiss();
    }

    private doPurchase(user: UserState, cost: number): boolean {
        if (!this.userHasFunds(cost, user)) {
            return false;
        }

        this.store.dispatch(new PlayPurchaseAction());
        this.store.dispatch(new PurchaseAction(cost));
        return true;
    }
}
