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
import { SoundService } from "../providers/sound-service";
import { answerReducer } from "../reducer/answer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SolutionModule } from "../components/solution/solution.module";
import { userReducer } from "../reducer/user";
import { WonModalPageModule } from "../pages/won-modal/won-modal.module";
import { WonEffects } from "../effects/won";

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
    WonModalPageModule,
    EffectsModule.run(WonEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SoundService,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
