import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Header } from './header';
import { LevelBadgeModule } from "../level-badge/level-badge.module";

@NgModule({
  declarations: [
    Header,
  ],
  imports: [
    IonicPageModule.forChild(Header),
    LevelBadgeModule
  ],
  exports: [
    Header
  ]
})
export class HeaderModule {}
