import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Keyboard } from './keyboard';

@NgModule({
  declarations: [
    Keyboard,
  ],
  imports: [
    IonicPageModule.forChild(Keyboard),
  ],
  exports: [
    Keyboard
  ]
})
export class KeyboardModule {}
