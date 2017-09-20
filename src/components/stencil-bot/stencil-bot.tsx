import { Component, State } from '@stencil/core';
import { ApiAiClient } from 'api-ai-javascript';

@Component({
  tag: 'stencil-bot',
  styleUrl: 'stencil-bot.scss'
})
export class StencilBot {

  @State() client   : any;
  @State() messages : any;

  componentDidLoad() {
    this.client = new ApiAiClient({accessToken: 'MY_TOKEN'});
  }

  sendMessage() {
    this.client
      .textRequest('Alo!')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color='primary'>
          <ion-title text-center>
              Stenciltron
          </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          {this.messages}
        </ion-content>
        <ion-footer>
          <ion-toolbar>
            <ion-input placeholder="Send some message to Stenciltron">
            </ion-input>
            <ion-button onClick={() => this.sendMessage()}>
              Send
            </ion-button>
          </ion-toolbar>
        </ion-footer>
      </ion-app>
    );
  }
}