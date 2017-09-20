import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'ion-bubble',
    styleUrl: 'ion-bubble.scss'
})
export class IonBubble {

    @Prop() message: any;
    @Prop() self: any;

    render() {
        if (this.self) {
            return (
                <div class="speech-bubble-self">
                    <p>{this.message}</p>
                </div>
            );
        } else {
            return (
                <div class="speech-bubble">
                    <p>{this.message}</p>
                </div>
            );    
        }
    }
}