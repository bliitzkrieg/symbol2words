import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class SoundService {

  private howl = new Howl({
    src: ['./assets/audio/click.mp3']
  });

  constructor(private vibration: Vibration) {}

  public playClick(): void {
    this.howl.play();
    this.vibration.vibrate(50);
  }

  public playError(): void {
    this.howl.play();
    this.vibration.vibrate(50);
  }

}
