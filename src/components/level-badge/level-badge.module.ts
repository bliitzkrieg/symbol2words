import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelBadge } from './level-badge';

@NgModule({
  declarations: [
    LevelBadge,
  ],
  imports: [
    IonicPageModule.forChild(LevelBadge),
  ],
  exports: [
    LevelBadge
  ]
})
export class LevelBadgeModule {}
