import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';
import { Vibration } from '@ionic-native/vibration';
import { EffectsModule } from '@ngrx/effects';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage
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
    HeaderModule,
    KeyboardModule,
    SolutionModule,

    //Todo: Move modals to modal module
    WonModalPageModule,
    SettingsModalPageModule,
    HintModalPageModule,

    // Todo: Move effects to effect module
    EffectsModule.run(WonEffects),
    EffectsModule.run(SoundEffects),
    EffectsModule.run(ModalEffects),
    EffectsModule.run(EmailEffects)
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
