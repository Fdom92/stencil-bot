import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'ion-bubble',
    styleUrl: 'ion-bubble.scss'
})
export class IonBubble {

    @Prop() message: any;
    @Prop() self: any;

    render() {
        return (
            <div class="speech-bubble">
                <p>{this.message}</p>
            </div>
        );
    }
}