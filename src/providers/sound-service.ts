import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable()
export class SoundService {

  private howl = new Howl({
    src: ['./assets/audio/click.mp3']
  });

  public playClick(): void {
    this.howl.play();
  }

}
