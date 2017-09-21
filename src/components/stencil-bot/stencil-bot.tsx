import { Component, State } from '@stencil/core';
import { ApiAiClient } from 'api-ai-javascript';

const CLIENT_TOKEN = 'b8d5dda90b644be9961ad40d341effe2';

@Component({
  tag: 'stencil-bot',
  styleUrl: 'stencil-bot.scss'
})
export class StencilBot {

  @State() client    : any;
  @State() messages  : Array<string> = [];
  @State() messages2 : Array<string> = [];

  componentDidLoad() {
    this.client = new ApiAiClient({accessToken: CLIENT_TOKEN});
  }

  sendMessage() {
    let text = document.querySelector('input').value;
    document.querySelector('input').value = '';

    this.client.textRequest(text).then((response) => {
      this.messages = [];
      this.messages2.push(response.result.fulfillment.speech);
      this.messages = this.messages2;
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
          <div>
            { this.messages.map(ele => {
              return <ion-bubble message={ele}/>
            })}
          </div>
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