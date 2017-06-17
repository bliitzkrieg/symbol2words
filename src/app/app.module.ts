import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeaderModule } from "../components/header/header.module";
import { levelReducer } from "../reducer/levels";
import { KeyboardModule } from "../components/keyboard/keyboard.module";
import { SoundService } from "../providers/sound-service";
import { answerReducer } from "../reducer/answer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SolutionModule } from "../components/solution/solution.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      answer: answerReducer,
      levels: levelReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    IonicModule.forRoot(MyApp),
    HeaderModule,
    KeyboardModule,
    SolutionModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SoundService
  ]
})
export class AppModule {}
