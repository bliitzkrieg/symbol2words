import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';
import { Vibration } from '@ionic-native/vibration';
import { EffectsModule } from '@ngrx/effects';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeaderModule } from "../components/header/header.module";
import { levelReducer } from "../reducer/levels";
import { KeyboardModule } from "../components/keyboard/keyboard.module";
import { answerReducer } from "../reducer/answer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SolutionModule } from "../components/solution/solution.module";
import { userReducer } from "../reducer/user";
import { WonModalPageModule } from "../pages/won-modal/won-modal.module";
import { WonEffects } from "../effects/won";
import { SoundEffects } from "../effects/sounds";
import { ModalEffects } from "../effects/modal";
import { SettingsModalPageModule } from "../pages/settings-modal/settings-modal.module";
import { HintModalPageModule } from "../pages/hint-modal/hint-modal.module";
import { EmailEffects } from "../effects/email";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AlertEffects } from "../effects/alert";
import { WinConditionEffects } from "../effects/winCondition";
import { SetupEffects } from '../effects/setup';
import { PersistEffects } from '../effects/persist';
import { ResetEffects } from '../effects/reset';
import { PuzzleComponent } from '../components/puzzle/puzzle';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PuzzleComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      answer: answerReducer,
      levels: levelReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HeaderModule,
    KeyboardModule,
    SolutionModule,

    //Todo: Move modals to modal module
    WonModalPageModule,
    SettingsModalPageModule,
    HintModalPageModule,

    // Todo: Move effects to effect module
    EffectsModule.run(SetupEffects),
    EffectsModule.run(WinConditionEffects),
    EffectsModule.run(WonEffects),
    EffectsModule.run(SoundEffects),
    EffectsModule.run(ModalEffects),
    EffectsModule.run(EmailEffects),
    EffectsModule.run(AlertEffects),
    EffectsModule.run(PersistEffects),
    EffectsModule.run(ResetEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
