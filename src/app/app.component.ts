import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';

import { HomePage } from '../pages/home/home';
import { CustomModalPopInAnimation } from '../animations/CustomModalPopInAnimation';
import { CustomModalPopOutAnimation } from '../animations/CustomModalPopOutAnimation';
import * as fromRoot from '../reducer';
import { InitializeAppAction } from '../actions/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private store: Store<fromRoot.State>,
              public config: Config) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level-badge native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.store.dispatch(new InitializeAppAction());
    this.config.setTransition('modal-pop-in-enter', CustomModalPopInAnimation);
    this.config.setTransition('modal-pop-out-leave', CustomModalPopOutAnimation);
  }
}

