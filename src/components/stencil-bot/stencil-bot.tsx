import { Component, State, Listen } from '@stencil/core';
import { ApiAiClient } from 'api-ai-javascript';

const CLIENT_TOKEN = 'b8d5dda90b644be9961ad40d341effe2';

@Component({
  tag: 'stencil-bot',
  styleUrl: 'stencil-bot.scss'
})
export class StencilBot {

  @State() client    : any;
  @State() messages  : Array<{text: string, self: boolean}> = [];
  @State() messages2 : Array<{text: string, self: boolean}> = [];

  @Listen('keydown.enter')
  handleKeyDown(){
    this.sendMessage();
  }

  componentDidLoad() {
    this.client = new ApiAiClient({accessToken: CLIENT_TOKEN});
    this.client.textRequest('hello').then((response) => {
      // Add the response message to the array
      this.messages = [];
      this.messages2.push({text: response.result.fulfillment.speech, self: false});
      this.messages = this.messages2;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  sendMessage() {
    // Get input element
    let text = document.querySelector('input').value;
    document.querySelector('input').value = '';

    // Add my message to the array
    this.messages = [];
    this.messages2.push({text: text, self: true});
    this.messages = this.messages2;

    // Send the request to API.AI
    this.client.textRequest(text).then((response) => {

      // Add the response message to the array
      this.messages = [];
      this.messages2.push({text: response.result.fulfillment.speech, self: false});
      this.messages = this.messages2;

      // Scroll to bottom
      let scroll = document.querySelector('ion-scroll');
      let height = scroll.scrollHeight;
      scroll.scrollTo(0, height);
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
            { this.messages.map(message => {
              return <ion-bubble message={message.text} self={message.self}/>
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