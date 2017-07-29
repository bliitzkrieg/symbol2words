import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PuzzleComponent } from './puzzle';

@NgModule({
  declarations: [
    PuzzleComponent,
  ],
  imports: [
    IonicPageModule.forChild(PuzzleComponent),
  ],
  exports: [
    PuzzleComponent
  ]
})
export class PuzzleComponentModule {}
