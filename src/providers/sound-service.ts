import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class SoundService {

  constructor(private vibration: Vibration) {

  }

  private howl = new Howl({
    src: ['./assets/audio/click.mp3']
  });

  public playClick(): void {
    this.howl.play();
    this.vibration.vibrate(50);
  }

}
