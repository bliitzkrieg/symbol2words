import { Transition, Animation } from "ionic-angular/index";

export class CustomModalPopOutAnimation extends Transition {
    init() {
        super.init();

        const ele: HTMLElement = this.leavingView.pageRef().nativeElement;
        const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        const content = new Animation(this.plt, ele.querySelector('.scroll-content'));

        wrapper.fromTo('opacity', 0.99, 0);
        content.fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.5, 0);

        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop)
            .add(content)
            .add(wrapper);
    }
}