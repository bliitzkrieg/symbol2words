import { Animation, Transition } from 'ionic-angular';

export class CustomModalPopInAnimation extends Transition {
    init() {
        super.init();

        const ele: HTMLElement = this.enteringView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));

        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.5);

        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop)
            .add(wrapper);
    }
}