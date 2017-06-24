import { ViewController } from "ionic-angular/index";
import { Renderer2 } from "@angular/core/core";

export class CustomModal {

    constructor(public renderer: Renderer2,
                public viewCtrl: ViewController) {}

    /**
     * This blocks adds a class to the modal to style it a custom way
     * and adds an event listener to the hacked backdrop to dismiss
     */
    public ionViewDidLoad(): void {
        const ele = this.viewCtrl.pageRef().nativeElement;
        this.renderer.addClass(ele, 'modal--small');
        this.renderer.listen(ele.querySelector('.fixed-content'), 'click', () => {
            this.viewCtrl.dismiss();
        });
    }

}
