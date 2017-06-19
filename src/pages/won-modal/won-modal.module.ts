import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WonModalPage } from './won-modal';

@NgModule({
  declarations: [
    WonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(WonModalPage),
  ],
  exports: [
    WonModalPage
  ]
})
export class WonModalPageModule {}
