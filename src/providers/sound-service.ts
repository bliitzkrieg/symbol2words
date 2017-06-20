import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class SoundService {

  private click = new Howl({
    src: ['./assets/audio/Multi_wav/UI_multi_16.wav']
  });

  private error = new Howl({
    src: ['./assets/audio/Multi_wav/UI_multi_24.wav']
  });

  constructor(private vibration: Vibration) {}

  public playClick(): void {
    this.click.play();
    this.vibration.vibrate(50);
  }

  public playError(): void {
    this.error.play();
    this.vibration.vibrate(50);
  }

}
