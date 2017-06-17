import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Header } from './header';
import { LevelModule } from "../level/level.module";

@NgModule({
  declarations: [
    Header,
  ],
  imports: [
    IonicPageModule.forChild(Header),
    LevelModule
  ],
  exports: [
    Header
  ]
})
export class HeaderModule {}
