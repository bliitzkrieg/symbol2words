import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Level } from './level';

@NgModule({
  declarations: [
    Level,
  ],
  imports: [
    IonicPageModule.forChild(Level),
  ],
  exports: [
    Level
  ]
})
export class LevelModule {}
