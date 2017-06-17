import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Solution } from './solution';

@NgModule({
  declarations: [
    Solution,
  ],
  imports: [
    IonicPageModule.forChild(Solution),
  ],
  exports: [
    Solution
  ]
})
export class SolutionModule {}
